/* Notebook — HIREN as a folded note that drops in from off-page */
const { Underline, ArrowWavy, StarBurst, Tape, Margin, Marker, COL } = window.Scribbles;

const NotebookHiren = ({ open, onClose, onJump }) => {
  const [query, setQuery] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'hiren', text: "Hey — I'm HIREN. I'm Vipul's notebook-shaped AI. Ask me anything about him, or pick a shortcut below." },
  ]);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const ask = async (q) => {
    if (!q.trim() || busy) return;
    setMessages(m => [...m, { role: 'user', text: q }]);
    setQuery('');
    setBusy(true);
    try {
      const ctx = `You are HIREN, Vipul Yadav's portfolio AI assistant — written in handwriting style, conversational, sometimes wry. Answer in 2-3 short sentences. Vipul: Full-Stack + AI/ML engineer (MERN + PyTorch), B.Tech CSE BTKIT '27, currently SE Intern at ColoredCow. Open for Summer 2026. Strongest stack: React, Next.js, Node, Python, PyTorch, BERT. Notable projects: COPREPER (AI mock interviews, 50+ users), Nishaan (decentralized evidence, Solidity+IPFS), BERT Emotion (F1 0.89), TF-IDF Resume Matcher (90%+). Hackathon finalist HACKGROUND INDIA 2K25 ThoughtWorks Gurugram.`;
      const text = await window.claude.complete({ messages: [{ role: 'user', content: ctx + '\n\nQuestion: ' + q }] });
      setMessages(m => [...m, { role: 'hiren', text: text.trim() }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'hiren', text: "Lost the connection — but the short answer: full-stack + AI engineer, open for Summer '26." }]);
    }
    setBusy(false);
  };

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(40,30,15,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'nb-fade .25s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', width: 580, maxHeight: '82vh',
        background: '#fdfcf6',
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 27px, ${COL.pencil}25 27px, ${COL.pencil}25 28px)`,
        boxShadow: '0 30px 80px rgba(40,30,15,0.5), 0 0 0 1px rgba(0,0,0,0.05)',
        padding: '28px 32px 24px',
        transform: 'rotate(-1deg)',
        animation: 'nb-drop .35s cubic-bezier(.2,.9,.3,1.2)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%) rotate(-4deg)' }}>
          <Tape w={160} color="#f7d36b" angle={0} />
        </div>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 18,
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: '"Caveat", cursive', fontSize: 24, color: COL.pencil,
        }}>✕ close</button>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
          <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: 52, color: COL.ink, margin: 0, lineHeight: 0.9 }}>
            HIREN
          </h2>
          <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 18, color: COL.pencil }}>
            (vipul, but a bot)
          </span>
        </div>
        <Underline w={170} color={COL.red} thick={3} />

        <div ref={scrollRef} style={{
          flex: 1, overflowY: 'auto', minHeight: 80, maxHeight: 280,
          marginTop: 18, paddingRight: 6,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: m.role === 'user' ? COL.blue : COL.red, marginBottom: 2 }}>
                {m.role === 'user' ? 'you →' : 'hiren ←'}
              </div>
              <div style={{
                fontFamily: m.role === 'user' ? '"Caveat", cursive' : '"Patrick Hand", cursive',
                fontSize: m.role === 'user' ? 22 : 19,
                color: COL.ink, lineHeight: 1.45, paddingLeft: 6,
              }}>{m.text}</div>
            </div>
          ))}
          {busy && (
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: COL.pencil, paddingLeft: 6 }}>
              ✎ thinking<span className="nb-dots">...</span>
            </div>
          )}
        </div>

        {messages.length < 3 && !busy && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '14px 0 16px', paddingTop: 12, borderTop: `1.5px dashed ${COL.pencil}80` }}>
            {window.ndata.hirenSuggestions.map((s, i) => (
              <button key={i}
                onClick={() => s.target ? (onJump(s.target), onClose()) : ask(s.label)}
                style={{
                  background: '#fff48a', color: COL.ink,
                  border: `1.5px solid ${COL.ink}40`, padding: '4px 10px',
                  fontFamily: '"Patrick Hand", cursive', fontSize: 16,
                  cursor: 'pointer', transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
                  boxShadow: '1.5px 1.5px 0 rgba(0,0,0,0.08)',
                }}>{s.target ? '→ ' : '? '}{s.label}</button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1.5px solid ${COL.ink}30` }}>
          <span style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.red }}>✎</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') ask(query); else if (e.key === 'Escape') onClose(); }}
            placeholder="write your question…"
            style={{
              flex: 1, background: 'transparent', border: 'none',
              fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink,
              outline: 'none', borderBottom: `1.5px solid ${COL.pencil}80`, paddingBottom: 4,
            }}
          />
          <button onClick={() => ask(query)} disabled={!query.trim() || busy} style={{
            background: COL.red, color: '#fff', border: 'none',
            fontFamily: '"Caveat", cursive', fontSize: 22, padding: '4px 14px',
            cursor: query.trim() && !busy ? 'pointer' : 'not-allowed',
            opacity: query.trim() && !busy ? 1 : 0.4,
          }}>send →</button>
        </div>

        <div style={{ marginTop: 10, fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, display: 'flex', justifyContent: 'space-between' }}>
          <span>↵ to send · ESC to close</span>
          <span>powered by claude</span>
        </div>
      </div>
    </div>
  );
};

window.NotebookHiren = NotebookHiren;
