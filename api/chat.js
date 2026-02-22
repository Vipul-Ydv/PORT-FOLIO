// api/chat.js
// This function runs on Vercel's servers, keeping your API key safe.

export default async function handler(request, response) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    // Get the API Key from environment variables (Server-side)
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return response.status(500).json({
            error: 'Server Misconfiguration: API Key not found'
        });
    }

    try {
        const {
            messages,
            model = 'llama-3.3-70b-versatile'
        } = request.body;

        // Call Groq API
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            throw new Error(`Groq API Error: ${errorData.error?.message || groqResponse.statusText}`);
        }

        const data = await groqResponse.json();
        return response.status(200).json(data);

    } catch (error) {
        console.error('API Handler Error:', error);
        return response.status(500).json({
            error: 'Internal Server Error'
        });
    }
}
