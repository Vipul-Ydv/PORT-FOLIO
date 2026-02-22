// api/email.js
// Securely sends emails using EmailJS REST API without exposing keys.

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    const {
        service_id,
        template_id,
        template_params
    } = request.body;

    // Read secrets from environment variables
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    // Note: For REST API, we typically need the Private Key if using the full API,
    // but EmailJS "send" endpoint usually works with Public Key + Service/Template ID if origin is allowed.
    // HOWEVER, to be truly secure and "server-side", we should use the private key or just proxy the public parameters from env.
    // The SDK uses the Public Key. The REST API usually requires: service_id, template_id, user_id (public key), template_params.

    // We will pull the IDs from env to verify/override what the client sends, or just use them directly.
    const envServiceId = process.env.EMAILJS_SERVICE_ID;
    const envTemplateId = process.env.EMAILJS_TEMPLATE_ID;

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!publicKey || !envServiceId || !envTemplateId || !privateKey) {
        return response.status(500).json({
            error: 'Server Misconfiguration: EmailJS keys missing (Private Key required for server-side)'
        });
    }

    try {
        const emailResp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: envServiceId,
                template_id: envTemplateId,
                user_id: publicKey,
                accessToken: privateKey,
                template_params: template_params
            })
        });

        if (!emailResp.ok) {
            const errorText = await emailResp.text();
            throw new Error(`EmailJS Error: ${errorText}`);
        }

        return response.status(200).send('OK');

    } catch (error) {
        console.error('Email Handler Error:', error);
        return response.status(500).json({
            error: `Failed to send email: ${error.message}`
        });
    }
}
