/* Notebook — App shell */
const { HeroPage, AboutPage, ExperiencePage } = window.NPages1;
const { ProjectsPage, SkillsPage, CertsPage } = window.NPages2;
const { BlogPage, ContactPage } = window.NPages3;
const { COL } = window.Scribbles;

const SECTIONS = [
  { key: 'about',      label: 'about',      anchor: 'p-about' },
  { key: 'experience', label: 'experience', anchor: 'p-experience' },
  { key: 'projects',   label: 'projects',   anchor: 'p-projects' },
  { key: 'skills',     label: 'stack',      anchor: 'p-skills' },
  { key: 'certs',      label: 'receipts',   anchor: 'p-certs' },
  { key: 'blog',       label: 'notes',      anchor: 'p-blog' },
  { key: 'contact',    label: 'say hi',     anchor: 'p-contact' },
];

const NotebookApp = () => {
  const [hirenOpen, setHirenOpen] = React.useState(false);
  const [focusedProject, setFocusedProject] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState('hero');

  const scrollTo = (key) => {
    const s = SECTIONS.find(x => x.key === key);
    if (!s) return;
    const el = document.getElementById(s.anchor);
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
          const k = en.target.id.replace('p-', '');
          setActiveSection(k);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.anchor);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="nb-root">
      <div className="nb-topbar">
        <div className="nb-topbar-inner">
          <span style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink }}>
            v.ydv's notebook<span style={{ color: COL.red }}>.</span>
          </span>
          <nav style={{ display: 'flex', gap: 18 }}>
            {SECTIONS.slice(0, 5).map(s => (
              <button key={s.key} onClick={() => scrollTo(s.key)} className={`nb-tab ${activeSection === s.key ? 'is-active' : ''}`}>
                {s.label}
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
        <div id="p-hero"><HeroPage onHiren={() => setHirenOpen(true)} onJump={scrollTo} /></div>
        <div id="p-about"><AboutPage /></div>
        <div id="p-experience"><ExperiencePage /></div>
        <div id="p-projects"><ProjectsPage focus={focusedProject} setFocus={setFocusedProject} /></div>
        <div id="p-skills"><SkillsPage /></div>
        <div id="p-certs"><CertsPage /></div>
        <div id="p-blog"><BlogPage /></div>
        <div id="p-contact"><ContactPage onHiren={() => setHirenOpen(true)} /></div>
      </main>

      <button onClick={() => setHirenOpen(true)} className="nb-fab" aria-label="Ask HIREN">
        <span style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, lineHeight: 1 }}>got a Q?</span>
        <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.red, marginTop: 2 }}>ask HIREN ✎</span>
      </button>

      <window.NotebookHiren open={hirenOpen} onClose={() => setHirenOpen(false)} onJump={scrollTo} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<NotebookApp />);
