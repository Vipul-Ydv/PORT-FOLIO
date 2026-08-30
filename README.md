# 🚀 Vipul Yadav — Personal Portfolio

A modern, visually rich personal portfolio website showcasing projects, skills, experience, certifications, and a blog — built with a unique **notebook/hand-drawn aesthetic**. Features an integrated **AI chatbot (HIREN)** powered by Groq's LLaMA model and a secure serverless contact form via EmailJS.

🔗 **Live Site:** [vipulydv.me](https://www.vipulydv.me/)

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
- **Build Tools:** Babel (build-time JSX), Terser, HTML Minifier Terser
- **Deployment:** Vercel

---

## 📁 Project Structure

```
PORT-FOLIO/
├── index.html              # Page shell — fonts, base styles, responsive rules, script tags
├── notebook/
│   ├── data.js             # All site content (identity, projects, skills, certs, contact)
│   ├── scribbles.js        # Hand-drawn SVG primitives (underlines, tape, arrows)
│   ├── hiren.js            # HIREN chat modal
│   ├── assets/             # Project + profile images
│   └── v2/                 # The Field Notes spreads
│       ├── toc.js          # Table-of-contents data
│       ├── app.jsx         # App shell, top nav, scroll spy
│       └── pages-a..d.jsx  # The six chapter spreads
├── api/
│   ├── chat.js             # Groq proxy for HIREN (key + model + prompt stay server-side)
│   ├── email.js            # EmailJS proxy
│   └── _prompt.js          # HIREN's system prompt (never sent to the browser)
├── img/                    # favicon + og:image
├── 404.html                # Custom not-found page
├── robots.txt, sitemap.xml
├── build.js                # Compiles JSX + minifies into public/
├── vercel.json             # Deployment config
└── vipul_res.pdf           # Downloadable resume
```

> Files starting with `_` in `api/` are helpers, not routed as functions.
> `css/` and `js/` are leftovers from the pre-v2 design; nothing references
> them and they are not deployed.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Vercel CLI](https://vercel.com/docs/cli) (for local dev with serverless functions)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vipul-Ydv/PORT-FOLIO.git
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

Generates `public/` containing:

- **One compiled bundle** (`assets/app.min.js`) — JSX is transpiled at build
  time with Babel and minified with Terser, so the browser never downloads a
  compiler and the site is not served as a tree of readable source files.
- Minified `index.html` and `404.html`.
- Only the assets named in `COPY_AS_IS` in `build.js`. The copy list is an
  **allowlist**: nothing is published unless it is listed. `api/` is
  deliberately excluded so the serverless sources are not downloadable.

> ⚠️ Minification is obscurity, not privacy. Anything the browser runs can be
> read by whoever runs it — secrets belong in `api/`, never in the page.

> Your original source stays untouched; the build only writes to `public/`.

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

- **Email:** vipul.ydv01@gmail.com
- **GitHub:** [@Vipul-Ydv](https://github.com/Vipul-Ydv)
- **LinkedIn:** [vipul-ydv](https://linkedin.com/in/vipul-ydv)
