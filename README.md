# 🚀 Vipul Yadav — Personal Portfolio

A modern, visually rich personal portfolio website showcasing projects, skills, experience, certifications, and a blog — built with a unique **notebook/hand-drawn aesthetic**. Features an integrated **AI chatbot (HIREN)** powered by Groq's LLaMA model and a secure serverless contact form via EmailJS.

🔗 **Live Site:** [vipulyadav.vercel.app](https://vipulyadav.vercel.app/)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Hero Section** | Animated introduction with typing effect, floating shapes, and CTA buttons |
| **About Me** | Personal bio with education details and profile photo |
| **Experience Timeline** | Interactive timeline of professional experience (ColoredCow, Tamizhan Skills) |
| **Projects Showcase** | Featured project cards for full-stack and AI/ML projects with live demo links |
| **Skills Grid** | Categorized skills — Web Development, Programming, AI/ML & NLP, Tools & DevOps |
| **Certificates & Achievements** | Tabbed section (Hackathons, Courses, Open Source) with image lightbox viewer |
| **Learning Log / Blog** | Styled blog entries with a torn-paper notebook aesthetic |
| **Contact Flyer** | Unique tear-off tab design for email, phone, GitHub, and LinkedIn |
| **HIREN AI Chatbot** | AI assistant powered by Groq (LLaMA 3.3 70B) via serverless API — answers questions about skills, projects, and experience |
| **Serverless Email** | Secure email sending through a Vercel serverless function using EmailJS |
| **Production Build** | Minification, obfuscation, and anti-DevTools protection via a custom build script |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile devices |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Primary Stack:** MERN — MongoDB, Express, React, Node.js, Next.js
- **Fonts:** Google Fonts — Inter, Playfair Display, Indie Flower, Permanent Marker, Patrick Hand
- **AI Chatbot:** Groq API (LLaMA 3.3 70B Versatile)
- **Email Service:** EmailJS (via REST API)
- **Serverless Functions:** Vercel Serverless Functions (Node.js)
- **Build Tools:** Terser, CleanCSS, JavaScript Obfuscator, HTML Minifier Terser
- **Deployment:** Vercel

---

## 📁 Project Structure

```
PORT-FOLIO-main/
├── index.html              # Main HTML — all sections (Hero, About, Experience, Projects, Skills, Certificates, Blog, Contact)
├── css/
│   ├── styles.css          # Primary stylesheet (notebook aesthetic, responsive design, animations)
│   └── flyer-styles.css    # Styles for the tear-off contact flyer
├── js/
│   ├── main.js             # Core interactions — navigation, scroll reveal, tabs, parallax, lightbox, counters
│   └── jarvis.js           # HIREN AI chatbot — Groq API integration, email flow, chat UI
├── api/
│   ├── chat.js             # Vercel serverless function — proxies Groq API calls (keeps API key secure)
│   └── email.js            # Vercel serverless function — proxies EmailJS calls (keeps keys secure)
├── img/                    # Images, icons, certificate screenshots, SVG avatar
├── build.js                # Production build script — minifies HTML/CSS/JS, obfuscates code, injects anti-DevTools
├── vercel.json             # Vercel deployment configuration
├── package.json            # Project metadata and dev dependencies
├── Resume_vipul_final (1).pdf  # Downloadable resume
└── .gitignore              # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Vercel CLI](https://vercel.com/docs/cli) (for local dev with serverless functions)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VIPUL-YDV/PORT-FOLIO.git
   cd PORT-FOLIO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (create a `.env` file in the root):
   ```env
   GROQ_API_KEY=your_groq_api_key
   EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   EMAILJS_PRIVATE_KEY=your_emailjs_private_key
   EMAILJS_SERVICE_ID=your_emailjs_service_id
   EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   ```

4. **Run with Vercel CLI** (needed for serverless functions):
   ```bash
   npx vercel dev
   ```

5. **Or simply open `index.html`** in a browser for a static preview (AI chatbot and email features won't work without the serverless backend).

### Production Build

```bash
npm run build
```

This generates an optimized `public/` folder with:
- Minified HTML, CSS, and JavaScript
- Obfuscated JS (variable renaming, dead code injection, string encoding)
- Anti-DevTools script injection (disables right-click and common shortcuts)

> ⚠️ **Note:** Your original source code remains untouched — the build outputs to `public/`.

---

## 🌐 Deployment

This project is configured for **Vercel**:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add the environment variables listed above in the Vercel dashboard
4. Vercel will automatically use `vercel.json` to build and deploy

---

## 🤖 HIREN — AI Assistant

HIREN is an embedded AI chatbot that answers visitor questions about Vipul's skills, projects, and experience. It uses:

- **Model:** LLaMA 3.3 70B Versatile (via Groq)
- **System Prompt:** Pre-loaded with detailed context about Vipul's background
- **Email Flow:** Built-in guided flow to send emails directly from the chat
- **Secure:** API key is never exposed to the client — all calls go through `/api/chat.js`

---

## 📜 License

© 2026 Vipul Yadav. All rights reserved.

---

## 📬 Contact

- **Email:** Vipul.ydv01@gmail.com
- **GitHub:** [@VIPUL-YDV](https://github.com/VIPUL-YDV)
- **LinkedIn:** [vipulydvv](https://linkedin.com/in/vipulydvv)
