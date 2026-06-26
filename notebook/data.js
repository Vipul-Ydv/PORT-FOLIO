/* Notebook — Content data */
window.ndata = {
  identity: {
    name: "Vipul Yadav",
    role: "Full-Stack + AI Engineer",
    pitch: "I ship AI-powered web apps. The rest is noise.",
    sub: "B.Tech CSE · BTKIT '27 · Haridwar, IN",
    status: "open · SE internship",
  },

  manifesto: [
    { done: true,  text: "Ship before it's pretty. Polish on the next branch." },
    { done: true,  text: "Reading papers ≠ understanding. Build the toy." },
    { done: true,  text: "MERN + AI is one product, not two stacks." },
    { done: false, text: "Stop optimizing prematurely. Stop." },
    { done: false, text: "Write the README first." },
  ],

  experience: [
    {
      co: "ColoredCow",
      role: "Software Engineer Intern",
      date: "Nov 2025 — present",
      tape: '#a8d4a8', tapeAngle: -3,
      bullets: [
        "Production WordPress + React on real client work",
        "First PR merged in week 2",
        "Pairing daily with senior engineers on REST integrations",
      ],
      tags: ["react", "wordpress", "rest"],
    },
    {
      co: "HACKGROUND INDIA 2K25",
      role: "Hackathon Finalist",
      date: "Sep 2025 · ThoughtWorks Gurugram",
      tape: '#f7d36b', tapeAngle: 4,
      bullets: [
        "Top finalist · 24h hackathon · AI prototype",
        "Pitched MVP in front of 30+ judges",
        "Got real users on day one",
      ],
      tags: ["llm", "rapid", "pitch"],
    },
  ],

  projects: [
    {
      slug: "copreper", title: "COPREPER",
      caption: "AI mock-interview platform. 50+ real sessions.",
      stack: ["react", "node", "openai", "whisper"],
      angle: -3, polaroid: '#fff8e6', img: 'notebook/assets/copreper.png',
      bullets: [
        "Real-time Whisper transcript + GPT-4 evaluator chain",
        "Custom rubric scoring across 5 dimensions",
        "Session replay with timestamped feedback overlay",
      ],
      metric: "50+ sessions · 1.4s latency",
      live: "https://copreper.vercel.app",
      repo: "https://github.com/Vipul-Ydv/copreper",
    },
    {
      slug: "nishaan", title: "Nishaan",
      caption: "Decentralized digital evidence vault. Tamper-proof.",
      stack: ["solidity", "ipfs", "next.js"],
      angle: 2.5, polaroid: '#eef4ff', img: 'notebook/assets/nishaan.png',
      bullets: [
        "ZK access proofs for evidence chain",
        "ERC-721 evidence tokens with full provenance",
        "Audit trail visible to courts, immutable",
      ],
      metric: "-38% gas · 200+ txs",
      repo: "https://github.com/Vipul-Ydv/nishaan",
    },
    {
      slug: "bert-emotion", title: "BERT Emotion",
      caption: "Fine-tuned BERT, 7-class sentiment, F1 0.89.",
      stack: ["pytorch", "huggingface", "fastapi"],
      angle: -1.5, polaroid: '#fff0f0', img: 'notebook/assets/bert-emotion.png',
      bullets: [
        "12k labeled reviews + active learning loop",
        "FastAPI inference, 80ms p50",
        "SHAP attributions per token for debugging",
      ],
      metric: "F1 0.89 · 80ms p50",
      repo: "https://github.com/Vipul-Ydv/bert-emotion",
    },
    {
      slug: "tfidf-resume", title: "Resume Matcher",
      caption: "Classic NLP beats GPT-3.5 on 200-pair benchmark.",
      stack: ["python", "sklearn", "spacy"],
      angle: 3, polaroid: '#eafff0',
      bullets: [
        "90%+ accuracy vs hand-labeled gold set",
        "Streamlit explanation: top contributing terms",
        "Drop-in CLI for ATS pipelines",
      ],
      metric: "90%+ acc · $0 cost",
      repo: "https://github.com/Vipul-Ydv/resume-matcher",
    },
  ],

  skills: {
    daily:    ["React", "Next.js", "Node", "TypeScript", "Python", "MongoDB"],
    favorite: ["PyTorch", "BERT", "LangChain", "OpenAI"],
    learning: ["Rust", "Solidity", "tRPC"],
    rusty:    ["Java", "C++"],
  },

  certs: [
    certs: [
    { date: "Mar '26", label: "TechFest 2026, BTKUIT — 1st Place Hackathon (Nishaan, solo)", gold: true },
    { date: "Mar '26", label: "TechFest 2026, BTKUIT — 2nd Place Aerobotics" },
    { date: "Mar '26", label: "TechFest 2026, BTKUIT — 3rd Place Project Exhibition" },
    { date: "Sep '25", label: "HACKGROUND INDIA — Finalist",        gold: true },
    { date: "Jul '25", label: "Meta · Front-End Developer (Coursera)" },
    { date: "Apr '25", label: "AWS Cloud Practitioner Essentials" },
    { date: "Feb '25", label: "Deep Learning Specialization · deeplearning.ai" },
    { date: "Nov '24", label: "BTKIT CodeFest — 2nd of 200+",        gold: true },
    { date: "Aug '24", label: "Full-Stack Open · MERN · U. Helsinki" },
  ],

  blog: [
    { date: "Sep 14",  read: 7, title: "Why I stopped using vector DBs for small RAGs",      excerpt: "Postgres + pgvector beats every dedicated DB under 100k chunks." },
    { date: "Aug 02",  read: 4, title: "The tiniest useful Whisper wrapper",                  excerpt: "60 lines of FastAPI gets you 90% of the way to a real product." },
    { date: "Jun 21",  read: 9, title: "Notes on shipping COPREPER to 50 strangers",          excerpt: "Real users break onboarding in ways you can't anticipate." },
  ],

  contact: [
    { k: "email",    v: "vipul.ydv01@gmail.com",               primary: true,  href: "mailto:vipul.ydv01@gmail.com" },
    { k: "github",   v: "github.com/Vipul-Ydv",               href: "https://github.com/Vipul-Ydv" },
    { k: "linkedin", v: "in/vipul-ydv",                        href: "https://linkedin.com/in/vipul-ydv" },
    { k: "x",        v: "@vipulbuilds",                         href: "https://x.com/vipulbuilds" },
    { k: "instagram", v: "@vipul.01_",                          href: "https://instagram.com/vipul.01_" },
    { k: "site",     v: "vipulydv.me",                          href: "https://vipulydv.me" },
  ],

  hirenSuggestions: [
    { label: "Show me COPREPER",                target: "proof" },
    { label: "Jump to experience",              target: "proof" },
    { label: "What's his strongest stack?",     ask: true },
    { label: "Is he open for internships?",     ask: true },
    { label: "Tell me about Nishaan",           ask: true },
  ],
};
