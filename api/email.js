// api/email.js
// Sends mail through the EmailJS REST API without exposing any key.

const ALLOWED_ORIGINS = [
    'https://www.vipulydv.me',
    'https://vipulydv.me',
    'http://localhost:3000',
];

const RATE_LIMIT = { windowMs: 10 * 60_000, max: 3 };
const MAX_FIELD = 5000;

// Accept the site's own origin — which covers production, Vercel preview
// deployments and local dev without naming each host — plus the canonical
// domains. A missing Origin is rejected: browsers always send it on a
// cross-origin-capable POST, so its absence means the caller is not the site.
function isAllowedOrigin(origin, host) {
    if (!origin) return false;
    if (ALLOWED_ORIGINS.includes(origin)) return true;
    try {
        return new URL(origin).host === host;
    } catch {
        return false;
    }
}

// Per-instance, same caveat as api/chat.js: slows casual abuse, not a
// determined attacker. Without it this endpoint is an open mail relay.
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

    if (!isAllowedOrigin(request.headers.origin, request.headers.host)) {
        return response.status(403).json({ error: 'Forbidden' });
    }

    const ip = (request.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
        return response.status(429).json({ error: 'Too many messages — try again later.' });
    }

    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;

    if (!publicKey || !privateKey || !serviceId || !templateId) {
        console.error('[email] EmailJS environment variables are incomplete');
        return response.status(500).json({ error: 'Server Misconfiguration', reason: 'missing_emailjs_config' });
    }

    let body;
    try {
        body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    } catch {
        return response.status(400).json({ error: 'Bad Request', reason: 'invalid_json' });
    }

    const params = body?.template_params;
    if (!params || typeof params !== 'object') {
        return response.status(400).json({ error: 'Bad Request', reason: 'missing_template_params' });
    }

    // Only forward the fields the template actually uses, capped in length, so
    // the endpoint cannot be driven as a general-purpose mailer.
    const template_params = {};
    for (const key of ['from_name', 'reply_to', 'subject', 'message']) {
        if (params[key] != null) template_params[key] = String(params[key]).slice(0, MAX_FIELD);
    }
    if (!template_params.message) {
        return response.status(400).json({ error: 'Bad Request', reason: 'empty_message' });
    }

    try {
        const emailResp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                accessToken: privateKey,
                template_params,
            }),
        });

        if (!emailResp.ok) {
            const detail = await emailResp.text();
            console.error(`[email] EmailJS responded ${emailResp.status}: ${detail}`);
            return response.status(502).json({
                error: 'Upstream error',
                upstream_status: emailResp.status,
                reason: detail.slice(0, 300),
            });
        }

        return response.status(200).json({ ok: true });

    } catch (error) {
        console.error('[email] Handler error:', error);
        return response.status(500).json({
            error: 'Internal Server Error',
            reason: error?.name || 'unknown',
            detail: String(error?.message || '').slice(0, 200),
        });
    }
}
