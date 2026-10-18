/* Notebook — HIREN as a folded note that drops in from off-page */
const { Underline, ArrowWavy, StarBurst, Tape, Margin, Marker, prefersStill, COL } = window.Scribbles;

// Writes a reply out letter by letter, in at most ~1.6s however long it is.
const TypeOut = ({ text, onTick, onDone }) => {
  const [n, setN] = React.useState(prefersStill() ? text.length : 0);
  React.useEffect(() => {
    if (n >= text.length) { onDone(); return; }
    const t0 = performance.now();
    const total = Math.min(1600, text.length * 18);
    const id = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / total);
      setN(Math.ceil(k * text.length));
      onTick();
      if (k === 1) { clearInterval(id); onDone(); }
    }, 16);
    return () => clearInterval(id);
  }, []);
  return <>{text.slice(0, n)}</>;
};

// HIREN's system prompt lives server-side in api/_prompt.js — it is not
// shipped to the browser and cannot be swapped out by a caller.

const NotebookHiren = ({ open, onClose, onJump }) => {
  const [query, setQuery] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'hiren', fresh: true, text: "Hey — I'm HIREN. I'm Vipul's notebook-shaped AI. Ask me anything about him, or pick a shortcut below." },
  ]);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const dialogRef = React.useRef(null);

  // Focus the input on open, and hand focus back to whatever opened HIREN
  // (the ⌘K button, the sticky note…) on close.
  React.useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => { clearTimeout(t); opener?.focus?.(); };
  }, [open]);

  // Keep Tab inside the dialog while it is open.
  const trapTab = (e) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = [...dialogRef.current.querySelectorAll('button:not([disabled]), input, a[href]')];
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const toBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  React.useEffect(toBottom, [messages, busy]);

  // A reply is typed out once; after that it renders in full.
  const settle = (i) => setMessages(ms => ms.map((m, j) => j === i ? { ...m, fresh: false } : m));

  const ask = async (q) => {
    if (!q.trim() || busy) return;
    const history = messages
      .slice(1)                                   // skip the canned greeting
      .slice(-8)
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));
    setMessages(m => [...m, { role: 'user', text: q }]);
    setQuery('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: q }] }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error('[HIREN] /api/chat failed', res.status, data);
        throw new Error(`chat ${res.status}`);
      }
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text !== 'string') throw new Error('empty completion');
      setMessages(m => [...m, { role: 'hiren', fresh: true, text: text.trim() }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'hiren', fresh: true, text: "I can't reach my brain right now \u2014 that's on me, not you. Vipul is a full-stack + AI engineer, currently an SE intern at BizBhai; email him at vipul.ydv01@gmail.com and he'll answer properly." }]);
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
      <div ref={dialogRef} onClick={e => e.stopPropagation()} onKeyDown={trapTab}
        role="dialog" aria-modal="true" aria-labelledby="hiren-title" style={{
        position: 'relative', width: 'min(580px, calc(100vw - 24px))', maxHeight: '82vh',
        background: '#fdfcf6',
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 27px, ${COL.pencil}25 27px, ${COL.pencil}25 28px)`,
        boxShadow: '0 30px 80px rgba(40,30,15,0.5), 0 0 0 1px rgba(0,0,0,0.05)',
        padding: 'clamp(18px, 4vw, 28px) clamp(16px, 4vw, 32px) 24px',
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
          <h2 id="hiren-title" style={{ fontFamily: '"Caveat", cursive', fontSize: 'clamp(38px, 9vw, 52px)', color: COL.ink, margin: 0, lineHeight: 0.9 }}>
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
              }}>{m.fresh
                ? <TypeOut text={m.text} onTick={toBottom} onDone={() => settle(i)} />
                : m.text}</div>
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
              // minWidth:0 lets the field shrink; without it the flex item
              // keeps its content width and pushes send past the modal edge.
              flex: 1, minWidth: 0,
              background: 'transparent', border: 'none',
              fontFamily: '"Caveat", cursive', fontSize: 'clamp(20px, 5vw, 26px)', color: COL.ink,
              outline: 'none', borderBottom: `1.5px solid ${COL.pencil}80`, paddingBottom: 4,
            }}
          />
          <button onClick={() => ask(query)} disabled={!query.trim() || busy} style={{
            background: COL.red, color: '#fff', border: 'none',
            fontFamily: '"Caveat", cursive', fontSize: 22, padding: '4px 14px',
            flexShrink: 0, whiteSpace: 'nowrap',
            cursor: query.trim() && !busy ? 'pointer' : 'not-allowed',
            opacity: query.trim() && !busy ? 1 : 0.4,
          }}>send →</button>
        </div>

        <div style={{ marginTop: 10, fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, display: 'flex', justifyContent: 'space-between' }}>
          <span>↵ to send · ESC to close</span>
          <span>powered by groq</span>
        </div>
      </div>
    </div>
  );
};

window.NotebookHiren = NotebookHiren;
