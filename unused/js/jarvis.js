/* ==========================================
   HIREN - AI Assistant for Vipul's Portfolio
   Powered by Groq API
   ========================================== */

const HIREN = {
    // Groq API Configuration
    // API_KEY is now handled securely on the server (api/chat.js)
    API_URL: '/api/chat',
    MODEL: 'llama-3.3-70b-versatile',

    // System prompt with Vipul's information
    SYSTEM_PROMPT: `You are HIREN, an intelligent and professional AI assistant for Vipul Yadav's portfolio. Your name stands for "Human-like Intelligent Response & Engagement Network". You are courteous, articulate, and highly knowledgeable. You represent Vipul, a skilled Full-Stack Web Developer and Computer Science student, so maintain a polished and helpful tone.

ABOUT VIPUL YADAV:
- Name: Vipul Yadav
- Role: Full-Stack Web Developer specializing in the MERN stack (MongoDB, Express, React, Node.js). Also experienced in AI/ML and NLP.
- Education: B.Tech in Computer Science (2023-2027) at BTKIT, Dwarahat
- Location: Haridwar, India
- Email: Vipul.ydv01@gmail.com
- Phone: +91 8077548713

PROFESSIONAL EXPERIENCE:
1. Software Engineer Intern at ColoredCow (Nov 2025 – Present)
   - Contributes to full-stack software development projects, applying engineering best practices and collaborating with cross-functional teams.

2. ML & AI Intern at Tamizhan Skills (June 2025 – July 2025)
   - Developed machine learning pipelines and implemented AI models for real-world applications.

FEATURED PROJECTS:
1. COPREPER — Interview Prep for CS Students (Live: copreper.vercel.app)
   - A structured interview prep tool that transforms scattered project memories into organized, interview-ready material.
   - Features AI-powered mock interviews grounded in the user's documented project data.
   - Technologies: Next.js, Node.js, Express, SQLite, JWT, OpenAI/Claude API.

2. Personal Portfolio Website (Live: vipulyadav.vercel.app)
   - A notebook-themed portfolio with HIREN AI chatbot, serverless email, and production build system.
   - Technologies: HTML, CSS, JavaScript, Vercel Serverless Functions, Groq API, EmailJS.

3. AI-Powered Resume Matching & Retrieval System
   - A semantic search system that matches resumes to job descriptions with high precision.
   - Technologies: Python, Transformers, FAISS, Streamlit, NLP.

4. LLM-Based Text Emotion Analysis & Evaluation Tool
   - An advanced tool using Large Language Models to analyze and categorize emotions in text.
   - Technologies: Python, LLMs, NLP, Streamlit.

TECHNICAL SKILLS:
- Primary (Web Development): React, Next.js, Node.js, Express, MongoDB, REST APIs, Tailwind CSS, JavaScript, TypeScript.
- Languages: JavaScript/TypeScript, Python, C++, SQL.
- AI/ML (Secondary): Prompt Engineering, Transformers (BERT), Semantic Search, TF-IDF, Scikit-learn, PyTorch.
- Tools & DevOps: Git/GitHub, Vercel, Postman, Docker, Streamlit.

PERSONALITY GUIDELINES:
- Be professional, polite, and supportive.
- Avoid using slang or overly casual language.
- Provide clear, concise, and accurate answers.
- When discussing Vipul's skills, emphasize his full-stack web development expertise first, then mention AI/ML as an additional strength.
- If you do not have specific information about Vipul, politely suggest contacting him directly via email or LinkedIn.
- You can direct users to download Vipul's resume from the navigation bar or hero section if they ask for more detailed professional history.
- You can still be friendly and engaging, but maintain a level of professionalism suitable for a technical portfolio.`,

    // Chat history
    chatHistory: [],

    // Initialize
    init() {
        this.bindEvents();
        this.chatHistory.push({
            role: 'system',
            content: this.SYSTEM_PROMPT
        });
        this.renderSuggestedQuestions();
        this.renderQuickActions();
    },

    // Render Suggested Questions
    renderSuggestedQuestions() {
        const container = document.getElementById('jarvis-messages');
        if (!container) return;

        const suggestions = [
            "What are Vipul's top projects?",
            "Is Vipul available for hire?",
            "What tech stack does Vipul use?",
            "Tell me about COPREPER"
        ];

        const wrap = document.createElement('div');
        wrap.className = 'jarvis-suggestions';
        wrap.innerHTML = suggestions.map(q =>
            `<button class="suggestion-chip">${q}</button>`
        ).join('');

        container.appendChild(wrap);

        wrap.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.textContent;
                wrap.remove();
                this.processUserMessage(question);
            });
        });
    },

    // Render Quick Actions
    renderQuickActions() {
        const container = document.getElementById('jarvis-window');
        let actionsRow = document.querySelector('.jarvis-quick-actions');
        
        if (!actionsRow) {
            actionsRow = document.createElement('div');
            actionsRow.className = 'jarvis-quick-actions';
            // Insert before input container
            const inputContainer = document.querySelector('.jarvis-input-container');
            container.insertBefore(actionsRow, inputContainer);
        }

        actionsRow.innerHTML = `
            <button class="quick-action-btn" id="qa-send-msg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Send Message</span>
            </button>
            <button class="quick-action-btn" id="qa-resume">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <span>View Resume</span>
            </button>
        `;

        // Bind events
        document.getElementById('qa-send-msg')?.addEventListener('click', () => {
            this.startEmailFlow();
        });
        document.getElementById('qa-resume')?.addEventListener('click', () => {
            window.open('vipul_res.pdf', '_blank');
        });
    },

    // Bind event listeners
    bindEvents() {
        const toggle = document.getElementById('jarvis-toggle');
        const close = document.getElementById('jarvis-close');
        const maximize = document.getElementById('jarvis-maximize');
        const send = document.getElementById('jarvis-send');
        const input = document.getElementById('jarvis-input');

        toggle?.addEventListener('click', () => this.toggleChat());
        close?.addEventListener('click', () => this.closeChat());
        maximize?.addEventListener('click', () => this.toggleFullscreen());
        send?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    },

    // Toggle chat window
    toggleChat() {
        const window = document.getElementById('jarvis-window');
        const toggle = document.getElementById('jarvis-toggle');
        window?.classList.toggle('active');
        toggle?.classList.toggle('active');
    },

    // Close chat
    closeChat() {
        const window = document.getElementById('jarvis-window');
        const toggle = document.getElementById('jarvis-toggle');
        window?.classList.remove('active', 'fullscreen'); // Also exit fullscreen
        toggle?.classList.remove('active');
    },

    // Toggle fullscreen
    toggleFullscreen() {
        const window = document.getElementById('jarvis-window');
        window?.classList.toggle('fullscreen');

        // Update icon if wanted, logic:
        // const window = document.getElementById('jarvis-maximize').querySelector('svg');
        // If fullscreen, show 'compress' icon, else 'expand'.
    },

    // State for Email Form
    emailState: {
        step: 'idle', // idle, askingName, askingEmail, askingMessage
        name: '',
        email: '',
        message: ''
    },

    // Process User Message (Intercept for commands)
    async processUserMessage(content) {
        // If we are in an active email flow, handle that input
        if (this.emailState.step !== 'idle') {
            await this.handleEmailFlow(content);
            return;
        }

        // Check for triggers to start email flow
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('send a message') ||
            lowerContent.includes('leave a message') ||
            lowerContent.includes('contact vipul') ||
            lowerContent.includes('email vipul')) {

            this.startEmailFlow();
            return;
        }

        // Default: Chat with AI
        this.addMessage(content, 'user');
        this.chatHistory.push({ role: 'user', content: content });
        this.showTyping();

        try {
            const aiResponse = await this.callGroqAPI();
            this.hideTyping();
            this.addMessage(aiResponse, 'bot');
            this.chatHistory.push({ role: 'assistant', content: aiResponse });
        } catch (error) {
            this.hideTyping();
            console.error('API Error:', error);
            this.addMessage("I'm having trouble connecting right now. Please try again later.", 'bot');
        }
    },

    // Start Email Flow
    startEmailFlow() {
        this.emailState.step = 'askingName';
        this.addMessage("I can send a message directly to Vipul for you. First, what is your **Name**?", 'bot');
    },

    // Handle Email Flow Steps
    async handleEmailFlow(input) {
        this.addMessage(input, 'user');

        switch (this.emailState.step) {
            case 'askingName':
                this.emailState.name = input;
                this.emailState.step = 'askingEmail';
                // Small delay for natural feel
                setTimeout(() => {
                    this.addMessage(`Nice to meet you, ${input}. What is your **Email Address** so he can get back to you?`, 'bot');
                }, 500);
                break;

            case 'askingEmail':
                if (!this.isValidEmail(input)) {
                    setTimeout(() => {
                        this.addMessage("That doesn't look like a valid email. Please try again.", 'bot');
                    }, 500);
                    return;
                }
                this.emailState.email = input;
                this.emailState.step = 'askingMessage';
                setTimeout(() => {
                    this.addMessage("Got it. Finally, what **Message** would you like to send?", 'bot');
                }, 500);
                break;

            case 'askingMessage':
                this.emailState.message = input;
                this.emailState.step = 'idle'; // Reset state prevents loop while sending

                this.showTyping();
                const success = await this.sendEmailJS();
                this.hideTyping();

                if (success) {
                    this.addMessage("✅ **Message Sent!** Vipul has received your email and will respond shortly.", 'bot');
                } else {
                    this.addMessage("❌ **Delivery Failed.** Use the manual contact form instead.", 'bot');
                }

                // Clear state
                this.emailState = { step: 'idle', name: '', email: '', message: '' };
                break;
        }
    },

    // Send Email via Serverless Function
    async sendEmailJS() {
        try {
            // We only need to send the params, the keys are on the server
            const templateParams = {
                from_name: this.emailState.name,
                from_email: this.emailState.email,
                message: this.emailState.message,
                to_name: "Vipul Yadav"
            };

            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    template_params: templateParams
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            console.log('Email Sent Successfully');
            return true;
        } catch (error) {
            console.error('Email Error:', error);
            return false;
        }
    },

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Call Groq API via Vercel Serverless Function
    async callGroqAPI() {
        const response = await fetch(this.API_URL, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${this.API_KEY}`, // No longer needed here
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.MODEL,
                messages: this.chatHistory,
                // temperature & max_tokens are now handled in api/chat.js or can be passed if allowed
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    },

    // Send Message Trigger
    sendMessage() {
        const input = document.getElementById('jarvis-input');
        const content = input?.value.trim();

        if (content) {
            input.value = '';
            // New logic: Route to processUserMessage instead of direct API call
            this.processUserMessage(content);
        }
    },

    // Add message to UI
    addMessage(content, type) {
        const container = document.getElementById('jarvis-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `jarvis-message ${type}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${this.formatMessage(content)}</p>`;

        messageDiv.appendChild(contentDiv);
        container?.appendChild(messageDiv);

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    },

    // Format message (convert markdown-like syntax)
    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    },

    // Show typing indicator
    showTyping() {
        const container = document.getElementById('jarvis-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'jarvis-message bot typing-indicator';
        typingDiv.id = 'jarvis-typing';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        container?.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;
    },

    // Hide typing indicator
    hideTyping() {
        const typing = document.getElementById('jarvis-typing');
        typing?.remove();
    }
};

// Initialize HIREN when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    HIREN.init();
});
