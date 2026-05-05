/* Notebook v2 — App shell */
const { CoverSpread, WhyIBuildSpread } = window.NPagesA;
const { ProblemSpread, ReadingSpread } = window.NPagesB;
const { ProofSpread, ScrapheapSpread } = window.NPagesC;
const { WhatNextSpread } = window.NPagesD;
const { COL } = window.Scribbles;

const NAV = [
  { key: 'cover',   label: 'cover',     id: 's-cover'   },
  { key: 'why',     label: '01 why',    id: 's-why'     },
  { key: 'problem', label: '02 problem', id: 's-problem' },
  { key: 'reading', label: '03 desk',   id: 's-reading' },
  { key: 'proof',   label: '04 proof',  id: 's-proof'   },
  { key: 'scrap',   label: '05 scrap',  id: 's-scrap'   },
  { key: 'next',    label: '06 next',   id: 's-next'    },
];

const NotebookV2App = () => {
  const [hirenOpen, setHirenOpen] = React.useState(false);
  const [focusedProject, setFocusedProject] = React.useState(null);
  const [active, setActive] = React.useState('cover');

  const jump = (key) => {
    const n = NAV.find(x => x.key === key);
    if (!n) return;
    const el = document.getElementById(n.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setHirenOpen(true); }
      else if (e.key === '/' || e.key === '?') { e.preventDefault(); setHirenOpen(true); }
      else if (e.key === 'Escape') setHirenOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const k = NAV.find(n => n.id === en.target.id)?.key;
          if (k) setActive(k);
        }
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    NAV.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="nb-root">
      <div className="nb-topbar">
        <div className="nb-topbar-inner">
          <span style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: COL.ink }}>
            Field Notes<span style={{ color: COL.red }}>.</span> <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 11, color: COL.pencil, marginLeft: 6, letterSpacing: '0.1em' }}>by V.YDV</span>
          </span>
          <nav style={{ display: 'flex', gap: 14, flex: 1, justifyContent: 'center' }}>
            {NAV.map(n => (
              <button key={n.key} onClick={() => jump(n.key)} className={`nb-tab ${active === n.key ? 'is-active' : ''}`}>
                {n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setHirenOpen(true)} className="nb-btn nb-btn-small">
            ✎ ask HIREN
            <span style={{ marginLeft: 8, padding: '0 5px', border: `1.5px solid ${COL.ink}50`, fontSize: 12, fontFamily: '"Special Elite", monospace' }}>⌘K</span>
          </button>
        </div>
      </div>

      <main className="nb-main">
        <CoverSpread onJump={jump} onHiren={() => setHirenOpen(true)} />
        <WhyIBuildSpread />
        <ProblemSpread />
        <ReadingSpread />
        <ProofSpread focus={focusedProject} setFocus={setFocusedProject} />
        <ScrapheapSpread />
        <WhatNextSpread onHiren={() => setHirenOpen(true)} />
      </main>

      <button onClick={() => setHirenOpen(true)} className="nb-fab" aria-label="Ask HIREN">
        <span style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, lineHeight: 1 }}>got a Q?</span>
        <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.red, marginTop: 2 }}>ask HIREN ✎</span>
      </button>

      <window.NotebookHiren open={hirenOpen} onClose={() => setHirenOpen(false)} onJump={jump} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<NotebookV2App />);
