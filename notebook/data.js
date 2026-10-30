/* Notebook — Content data */
window.ndata = {
  identity: {
    name: "Vipul Yadav",
    role: "Full-Stack + AI Engineer",
    pitch: "I ship AI-powered web apps. The rest is noise.",
    sub: "B.Tech CSE · BTKIT '27 · open to SDE roles · Haridwar, IN",
    status: "now · SE intern @ BizBhai",
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
      co: "BizBhai",
      role: "Software Engineer Intern",
      date: "Sep 2026 — present",
      tape: '#9ec5e8', tapeAngle: 2,
      bullets: [],
      tags: [],
    },
    {
      co: "ColoredCow",
      role: "Software Developer Intern",
      date: "Dec 2025 — Sep 2026",
      tape: '#a8d4a8', tapeAngle: -3,
      bullets: [
        "Owned critical flows on a blockchain-backed platform for secure document access (Next.js, TypeScript)",
        "Integrated APIs with smart contracts; automated PDF generation",
        "i18n and project-management flows for an AI-first enterprise PM system",
        "Cut bundle size ~15% by cleaning up routing and middleware",
      ],
      tags: ["next.js", "typescript", "web3"],
    },
    {
      co: "HACKGROUND INDIA 2K25",
      role: "Hackathon Finalist",
      date: "Sep 2025 · ThoughtWorks Gurugram",
      tape: '#f7d36b', tapeAngle: 4,
      bullets: [
        "Top finalist · 24h hackathon · AI prototype",
      ],
      tags: ["llm", "rapid", "pitch"],
    },
  ],

  projects: [
    {
      slug: "messloop", title: "MessLoop",
      caption: "AI finds the dish being wasted. A human decides. Then it measures.",
      stack: ["aws", "lambda", "step-functions", "typescript"],
      angle: -3, polaroid: '#eef8ee',
      sketch: "meal logged → agent checks the dish → AI explains → manager approves → impact measured",
      bullets: [
        "Event-driven agent: DynamoDB Streams → Lambda → Step Functions",
        "Own LLM (Qwen3-4B on EC2); code checks every number it writes",
        "Pauses on a task token until the manager approves",
        "Hindi voice logging via Polly + Transcribe",
      ],
      metric: "Environmental Hacks 2026",
      repo: "https://github.com/Vipul-Ydv/messloop",
    },
    {
      slug: "nishaan", title: "Nishaan",
      caption: "Tamper-evident evidence vault for law enforcement.",
      stack: ["solidity", "ipfs", "next.js"],
      angle: 2.5, polaroid: '#eef4ff', img: 'notebook/assets/nishaan.webp',
      bullets: [
        "Files encrypted in the browser (AES-256-GCM) before they reach IPFS",
        "CID hashes anchored on Ethereum; Police / Court / Admin roles enforced in the contract",
        "Immutable access log; a status change needs a recorded reason",
      ],
      metric: "1st place · TechFest 2026",
      live: "https://hack-n-win-3-0-theta.vercel.app",
      repo: "https://github.com/Vipul-Ydv/NISHAAN",
    },
    {
      slug: "copreper", title: "COPREPER",
      caption: "Never forget your project details before an interview.",
      stack: ["next.js", "node", "sqlite", "openai"],
      angle: -3, polaroid: '#fff8e6', img: 'notebook/assets/copreper.webp',
      bullets: [
        "Document projects with 'chose X over Y' trade-offs",
        "AI interviewer asks questions grounded in your notes",
        "Scores answers on 5 criteria",
      ],
      metric: "5 criteria · FTS5 search",
      live: "https://copreper.vercel.app",
      repo: "https://github.com/Vipul-Ydv/COPREPER",
    },
    {
      slug: "hackmatch", title: "HackMatch",
      caption: "Find the teammate your hackathon team is missing.",
      stack: ["react", "aws", "dynamodb", "bedrock"],
      angle: 3, polaroid: '#f4eeff',
      bullets: [
        "AI extracts competition details and writes the 'why this match' line",
        "Team formation and accept / reject are plain deterministic code",
      ],
      metric: "AWS First Commit",
      repo: "https://github.com/Vipul-Ydv/first-commit",
    },
    {
      slug: "bert-emotion", title: "BERT Emotion",
      caption: "Fine-tuned BERT for multi-label emotion detection.",
      stack: ["pytorch", "transformers", "streamlit"],
      angle: -1.5, polaroid: '#fff0f0', img: 'notebook/assets/bert-emotion.webp',
      bullets: [
        "Streamlit app with charts, intensity heatmaps, CSV export",
        "Also ships as a CLI",
      ],
      metric: "web app + CLI",
      repo: "https://github.com/Vipul-Ydv/BERT_EMOTION",
    },
    {
      slug: "resume-matcher", title: "Resume Matcher",
      caption: "Upload a resume, get live job listings ranked by similarity.",
      stack: ["python", "scikit-learn", "streamlit"],
      angle: 3, polaroid: '#eafff0',
      bullets: [
        "TF-IDF + cosine similarity between resume and job text",
        "Pulls live Google Jobs listings via SerpAPI",
      ],
      metric: "match % per listing",
      repo: "https://github.com/Vipul-Ydv/RESUME_PARSER",
    },
  ],

  skills: {
    daily:    ["React", "Next.js", "Node", "TypeScript", "Python", "MongoDB"],
    favorite: ["PyTorch", "BERT", "LangChain", "OpenAI"],
    learning: ["Rust", "Solidity", "tRPC"],
    rusty:    ["Java", "C++"],
  },

  certs: [
    { date: "Mar '26", label: "TechFest 2026, BTKIT — 1st Place Hackathon (Nishaan, solo)", gold: true },
    { date: "Mar '26", label: "TechFest 2026, BTKIT — 2nd Place Aerobotics" },
    { date: "Mar '26", label: "TechFest 2026, BTKIT — 3rd Place Project Exhibition" },
    { date: "Sep '25", label: "HACKGROUND INDIA — Finalist",        gold: true },
    { date: "Jul '25", label: "Meta · Front-End Developer (Coursera)" },
    { date: "Apr '25", label: "AWS Cloud Practitioner Essentials (course)" },
    { date: "Feb '25", label: "Deep Learning Specialization · deeplearning.ai" },
    { date: "Nov '24", label: "BTKIT CodeFest — 2nd of 200+",        gold: true },
    { date: "Aug '24", label: "Full-Stack Open · MERN · U. Helsinki" },
  ],

  blog: [
    { date: "Oct 11", read: 3, title: "Why MessLoop never lets the model write a number", excerpt: "A small model put vote shares on the wrong dish. Now code checks every figure and falls back to a template.", href: "https://github.com/Vipul-Ydv/messloop/blob/main/DECISIONS.md" },
    { date: "Oct 16", read: 2, title: "lineage: every answer shows the path behind it", excerpt: "People, PRs and issues in a graph, and an agent whose answers are checked against what it actually found.", href: "https://github.com/Vipul-Ydv/lineage" },
  ],

  contact: [
    { k: "email",    v: "vipul.ydv01@gmail.com",               primary: true,  href: "mailto:vipul.ydv01@gmail.com" },
    { k: "github",   v: "github.com/Vipul-Ydv",               href: "https://github.com/Vipul-Ydv" },
    { k: "linkedin", v: "in/vipulydvv",                        href: "https://www.linkedin.com/in/vipulydvv/" },
  ],

  hirenSuggestions: [
    { label: "Show me MessLoop",                target: "proof" },
    { label: "Jump to experience",              target: "proof" },
    { label: "What's his strongest stack?",     ask: true },
    { label: "Where does he work now?",         ask: true },
    { label: "Tell me about Nishaan",           ask: true },
  ],
};
