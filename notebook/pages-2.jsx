/* Notebook — Projects, Skills, Certs */
const { Underline, ScribbleCircle, ArrowCurved, ArrowWavy, StarBurst, Checkbox,
        Bracket, Tape, StickyTag, Margin, Marker, COL } = window.Scribbles;
const { Spread, PageL, PageR, SectionTitle } = window.NPages1;

// ── PROJECTS — gallery wall spread ──────────────────────────────────────
const ProjectsPage = ({ focus, setFocus }) => {
  const all = window.ndata.projects;
  const hero = all[0];
  const rest = all.slice(1);
  return (
    <Spread style={{ minHeight: 820 }}>
      <PageL num="05">
        <SectionTitle num="04" title="projects" subtitle="the work, pinned" />

        <Margin angle={-2} color={COL.red} style={{ fontSize: 19, marginTop: 14, marginLeft: 4 }}>
          ↓ favorite first — built end-to-end, in prod
        </Margin>

        <div style={{ marginTop: 30, position: 'relative' }}>
          <ProjectCard p={hero} open={focus === hero.slug} setFocus={setFocus} big />
        </div>
      </PageL>

      <PageR num="06" style={{ paddingTop: 56 }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.ink, marginBottom: 4, transform: 'rotate(-1deg)', display: 'inline-block' }}>
          + more from the wall
        </div>
        <Underline w={220} color={COL.ink} thick={2} />

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 24px',
          marginTop: 28,
        }}>
          {rest.map(p => (
            <ProjectCard key={p.slug} p={p} open={focus === p.slug} setFocus={setFocus} />
          ))}
        </div>

        <div style={{ marginTop: 28, fontFamily: '"Patrick Hand", cursive', fontSize: 18, color: COL.pencil, display: 'flex', justifyContent: 'space-between', borderTop: `1.5px dashed ${COL.pencil}50`, paddingTop: 14 }}>
          <span>↑ tap any polaroid to peek behind</span>
          <span style={{ color: COL.red }}>more on github ↗</span>
        </div>
      </PageR>
    </Spread>
  );
};

const ProjectCard = ({ p, open, setFocus, big = false }) => (
  <article onClick={() => setFocus(open ? null : p.slug)} style={{
    position: 'relative', background: '#fff', padding: big ? '14px 14px 22px' : '12px 12px 16px',
    boxShadow: '0 2px 0 rgba(0,0,0,0.06), 0 10px 24px rgba(40,30,15,0.12)',
    transform: `rotate(${p.angle}deg) ${open ? 'translateY(-4px) scale(1.01)' : ''}`,
    cursor: 'pointer', transition: 'transform .25s, box-shadow .25s',
    border: open ? `2px solid ${COL.red}` : '1px solid rgba(0,0,0,0.05)',
  }}>
    <div style={{ position: 'absolute', top: -10, left: -8 }}>
      <Tape w={big ? 100 : 70} color={p.angle > 0 ? '#a3c4f5' : '#f7d36b'} angle={p.angle > 0 ? -16 : 12} />
    </div>
    <div style={{
      height: big ? 280 : 150,
      background: p.polaroid,
      backgroundImage: p.img ? 'none' : 'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 6px, transparent 6px, transparent 14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Caveat", cursive', fontSize: big ? 44 : 28, color: COL.ink,
      overflow: 'hidden', position: 'relative',
    }}>
      {p.img
        ? <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) saturate(0.95)' }} />
        : p.title}
    </div>
    <div style={{ padding: big ? '14px 6px 4px' : '10px 4px 2px', fontFamily: '"Caveat", cursive', fontSize: big ? 32 : 22, color: COL.ink, lineHeight: 1.05 }}>
      {p.title}
      {p.link && <span style={{ fontSize: 14, color: COL.red, marginLeft: 8 }}>↗ live</span>}
    </div>
    <div style={{ padding: big ? '0 6px 6px' : '0 4px 4px', fontFamily: '"Patrick Hand", cursive', fontSize: big ? 17 : 14, color: COL.pencil, lineHeight: 1.3 }}>
      {p.caption}
    </div>
    <div style={{ padding: big ? '8px 6px 0' : '6px 4px 0', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {p.stack.slice(0, big ? 99 : 3).map(s => (
        <span key={s} style={{
          fontFamily: '"Patrick Hand", cursive', fontSize: big ? 13 : 12, color: COL.ink,
          background: '#fff48a', padding: '0 6px',
        }}>{s}</span>
      ))}
    </div>
    <div style={{ marginTop: 8, padding: big ? '0 6px' : '0 4px', fontFamily: '"Caveat", cursive', fontSize: big ? 20 : 16, color: COL.red }}>
      {p.metric}
    </div>
    {open && big && (
      <div style={{ marginTop: 12, padding: '12px 8px 4px', borderTop: `1.5px dashed ${COL.pencil}80` }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: COL.ink, marginBottom: 4 }}>notes from the build:</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: '"Special Elite", monospace', fontSize: 13, color: COL.ink, lineHeight: 1.6 }}>
          {p.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 2 }}><span style={{ color: COL.red }}>→</span>{b}</li>
          ))}
        </ul>
      </div>
    )}
  </article>
);

// ── SKILLS — packing-list spread ─────────────────────────────────────────
const SkillsPage = () => {
  const s = window.ndata.skills;
  return (
    <Spread style={{ minHeight: 680 }}>
      <PageL num="07">
        <SectionTitle num="05" title="stack" subtitle="what I bring to the table" />

        <Margin angle={-2} color={COL.blue} style={{ fontSize: 19, marginTop: 16, marginLeft: 4 }}>
          (tools, not religions — I pick whatever ships)
        </Margin>

        <div style={{ marginTop: 36, fontFamily: '"Caveat", cursive', fontSize: 38, color: COL.ink, lineHeight: 1.1, transform: 'rotate(-1deg)' }}>
          "MERN by day,<br/>
          <span style={{ color: COL.red }}>PyTorch</span> by night."
        </div>
        <Underline w={300} color={COL.red} thick={3} style={{ marginTop: 6 }} />

        <div style={{ marginTop: 40, fontFamily: '"Patrick Hand", cursive', fontSize: 22, color: COL.ink, marginBottom: 10 }}>
          every day:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {s.daily.map((it, i) => (
            <span key={it} style={{
              fontFamily: '"Patrick Hand", cursive', fontSize: 19, color: COL.ink,
              background: '#fff', border: `1.5px solid ${COL.ink}`, padding: '3px 12px',
              transform: `rotate(${((i * 37) % 5 - 2) * 1}deg)`, display: 'inline-block',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
            }}>{it}</span>
          ))}
        </div>
      </PageL>

      <PageR num="08" style={{ paddingTop: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
          <StickyCol title="favorite ★" items={s.favorite} color="#fff48a" angle={-2} marker />
          <StickyCol title="learning" items={s.learning} color="#a3c4f5" angle={1.5} />
          <StickyCol title="rusty" items={s.rusty} color="#f3a3a3" angle={-1} strike />
        </div>

        <div style={{ marginTop: 36, paddingTop: 18, borderTop: `1.5px dashed ${COL.pencil}50`, fontFamily: '"Patrick Hand", cursive', fontSize: 18, color: COL.pencil, display: 'flex', justifyContent: 'space-between' }}>
          <span>↑ pinned to the wall above the desk</span>
          <span style={{ color: COL.red }}>* yellow = real love</span>
        </div>
      </PageR>
    </Spread>
  );
};

const StickyCol = ({ title, items, color, angle = 0, marker, strike }) => (
  <div style={{
    background: color, padding: '18px 16px 22px',
    transform: `rotate(${angle}deg)`,
    boxShadow: '3px 4px 0 rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.08)',
    minHeight: 220, position: 'relative',
  }}>
    <div style={{ position: 'absolute', top: -12, left: 20 }}>
      <Tape w={50} color="#ffffff" angle={-6} />
    </div>
    <div style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink, marginBottom: 6 }}>{title}</div>
    <div style={{ width: '70%', height: 1.5, background: COL.ink, opacity: 0.4, marginBottom: 12 }} />
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: '"Patrick Hand", cursive', fontSize: 20, color: COL.ink, lineHeight: 1.55 }}>
      {items.map(it => (
        <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: COL.red, width: 14 }}>—</span>
          {strike
            ? <span style={{
                color: COL.ink, opacity: 0.7,
                textDecoration: 'line-through',
                textDecorationColor: COL.red,
                textDecorationThickness: '2px',
                textDecorationSkipInk: 'none',
              }}>{it}</span>
            : it}
        </li>
      ))}
    </ul>
  </div>
);

// ── CERTS — ticket-stub spread ────────────────────────────────────────────
const CertsPage = () => {
  const certs = window.ndata.certs;
  return (
    <Spread style={{ minHeight: 700 }}>
      <PageL num="09">
        <SectionTitle num="06" title="receipts" subtitle="certs, wins, paper trail" />

        <Margin angle={-2} color={COL.blue} style={{ fontSize: 19, marginTop: 16, marginLeft: 4 }}>
          (pinned to the corkboard, not framed)
        </Margin>

        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: COL.red, marginBottom: 4, transform: 'rotate(-1deg)', display: 'inline-block' }}>
            ★ wins
          </div>
          <Underline w={120} color={COL.red} thick={2} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
            {certs.filter(c => c.gold).map((c, i) => (
              <div key={i} style={{
                background: '#fffcf2', padding: '18px 22px',
                border: `2px solid ${COL.red}`, position: 'relative',
                transform: `rotate(${i % 2 ? 0.5 : -0.7}deg)`,
                boxShadow: '3px 4px 0 rgba(200, 48, 48, 0.15)',
              }}>
                <div style={{ position: 'absolute', top: -14, right: 24 }}>
                  <Tape w={70} color="#f7d36b" angle={6} />
                </div>
                <div style={{ position: 'absolute', top: 12, right: 14, fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, transform: 'rotate(-6deg)', border: `2px solid ${COL.red}`, padding: '1px 8px', letterSpacing: '0.06em' }}>WIN</div>
                <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, marginBottom: 4 }}>{c.date}</div>
                <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 22, color: COL.ink, lineHeight: 1.25, paddingRight: 70 }}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageL>

      <PageR num="10" style={{ paddingTop: 56 }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: COL.ink, marginBottom: 4, transform: 'rotate(-1deg)', display: 'inline-block' }}>
          + certs collected
        </div>
        <Underline w={220} color={COL.ink} thick={2} />

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {certs.filter(c => !c.gold).map((c, i) => (
            <TicketStub key={i} c={c} i={i} />
          ))}
        </div>

        <Margin angle={-2} color={COL.red} style={{ fontSize: 20, marginTop: 28, marginLeft: 8 }}>
          ✱ I finish what I start
        </Margin>
      </PageR>
    </Spread>
  );
};

const TicketStub = ({ c, i }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '90px 14px 1fr 60px',
    background: '#fff', border: `1.5px solid ${COL.ink}40`,
    transform: `rotate(${i % 2 ? 0.3 : -0.4}deg)`,
    boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
    overflow: 'visible', alignItems: 'stretch',
  }}>
    <div style={{
      background: '#fffcf2', padding: '10px 8px',
      fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red,
      borderRight: `1.5px dashed ${COL.pencil}80`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{c.date}</div>
    <div style={{ background: 'transparent', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 7px 7px, ${COL.pencil}40 1.5px, transparent 1.6px)`,
        backgroundSize: '14px 14px', backgroundPosition: '0 4px',
      }} />
    </div>
    <div style={{ padding: '10px 14px', fontFamily: '"Patrick Hand", cursive', fontSize: 18, color: COL.ink, lineHeight: 1.3, display: 'flex', alignItems: 'center' }}>
      {c.label}
    </div>
    <div style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, borderLeft: `1.5px dashed ${COL.pencil}80` }}>
      cert.
    </div>
  </div>
);

window.NPages2 = { ProjectsPage, SkillsPage, CertsPage };
