// api/chat.js
// Proxies HIREN's questions to Groq. The API key stays server-side.

import { HIREN_SYSTEM_PROMPT } from './_prompt.js';

// Pinned server-side: callers pick the question, never the model.
const MODEL = 'llama-3.3-70b-versatile';

const ALLOWED_ORIGINS = [
    'https://www.vipulydv.me',
    'https://vipulydv.me',
    'http://localhost:3000',
];

const MAX_MESSAGES = 12;      // ~6 turns of context
const MAX_CHARS = 1500;       // per message
const RATE_LIMIT = { windowMs: 60_000, max: 12 };

// Per-instance counter. Vercel runs several instances, so this throttles
// casual abuse rather than a determined attacker — good enough to stop a
// script from burning the whole Groq quota in one go.
const hits = new Map();

function rateLimited(ip) {
    const now = Date.now();
    const rec = hits.get(ip);
    if (!rec || now - rec.start > RATE_LIMIT.windowMs) {
        hits.set(ip, { start: now, count: 1 });
        if (hits.size > 5000) hits.clear();
        return false;
    }
    rec.count += 1;
    return rec.count > RATE_LIMIT.max;
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    // Only the portfolio itself may call this. Browsers always send Origin on
    // a cross-origin-capable POST, so a missing Origin means it is not the site.
    const origin = request.headers.origin;
    if (!ALLOWED_ORIGINS.includes(origin)) {
        return response.status(403).json({ error: 'Forbidden' });
    }

    const ip = (request.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
        return response.status(429).json({ error: 'Too many questions — give HIREN a minute.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('[chat] GROQ_API_KEY is not set');
        return response.status(500).json({ error: 'Server Misconfiguration', reason: 'missing_api_key' });
    }

    // request.body is parsed lazily by the runtime and throws on malformed
    // JSON, so read it before anything else and answer with a real 400.
    let body;
    try {
        body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    } catch {
        return response.status(400).json({ error: 'Bad Request', reason: 'invalid_json' });
    }
    if (!body || typeof body !== 'object') {
        return response.status(400).json({ error: 'Bad Request', reason: 'missing_body' });
    }

    // Accept only the conversation itself; the system prompt is added here.
    const incoming = Array.isArray(body.messages) ? body.messages : null;
    if (!incoming || incoming.length === 0) {
        return response.status(400).json({ error: 'Bad Request', reason: 'missing_messages' });
    }

    const messages = incoming
        .slice(-MAX_MESSAGES)
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    if (messages.length === 0) {
        return response.status(400).json({ error: 'Bad Request', reason: 'no_valid_messages' });
    }

    try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'system', content: HIREN_SYSTEM_PROMPT }, ...messages],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!groqResponse.ok) {
            const detail = await groqResponse.text();
            // Logged in full for the Vercel dashboard; the client gets the
            // status and a short reason so an outage is diagnosable from the
            // browser without digging through logs.
            console.error(`[chat] Groq responded ${groqResponse.status}: ${detail}`);
            return response.status(502).json({
                error: 'Upstream error',
                upstream_status: groqResponse.status,
                reason: detail.slice(0, 300),
            });
        }

        const data = await groqResponse.json();
        const text = data?.choices?.[0]?.message?.content;
        if (typeof text !== 'string') {
            console.error('[chat] Unexpected Groq payload:', JSON.stringify(data).slice(0, 500));
            return response.status(502).json({ error: 'Upstream error', reason: 'empty_completion' });
        }

        return response.status(200).json(data);

    } catch (error) {
        // The previous version collapsed every failure into a bare 500, which
        // made a production outage impossible to diagnose from outside.
        console.error('[chat] Handler error:', error);
        return response.status(500).json({
            error: 'Internal Server Error',
            reason: error?.name || 'unknown',
            detail: String(error?.message || '').slice(0, 200),
        });
    }
}
