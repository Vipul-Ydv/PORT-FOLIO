/* Notebook — Hero, About, Experience as varied spreads */
const { Underline, DoubleUnderline, ScribbleCircle, ArrowCurved, ArrowWavy,
        StarBurst, Checkbox, Strikethrough, Bracket, TornEdge, Tape, StickyTag,
        Margin, Marker, COL } = window.Scribbles;

const Spread = ({ children, style = {} }) => (
  <div className="nb-spread" style={{
    position: 'relative',
    background: '#fdfcf6',
    boxShadow: '0 1px 0 rgba(0,0,0,0.05), 0 8px 24px rgba(40,30,15,0.08), 0 30px 60px -20px rgba(40,30,15,0.12)',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    minHeight: 720,
    ...style,
  }}>
    {/* Spine */}
    <div style={{
      position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
      transform: 'translateX(-1px)', pointerEvents: 'none',
      background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.18) 60%, transparent 100%)',
      boxShadow: '0 0 18px rgba(0,0,0,0.18)',
      zIndex: 5,
    }} />
    <div style={{ position: 'absolute', top: -1, left: 0, right: 0 }}><TornEdge w={1300} flip /></div>
    <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}><TornEdge w={1300} /></div>
    {children}
  </div>
);

const PageL = ({ children, num, style = {} }) => (
  <div style={{ position: 'relative', padding: '46px 40px 60px 56px', ...style }}>
    {num && <div style={{ position: 'absolute', bottom: 22, left: 36, fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.pencil }}>— {num} —</div>}
    {children}
  </div>
);
const PageR = ({ children, num, style = {} }) => (
  <div style={{ position: 'relative', padding: '46px 56px 60px 40px', ...style }}>
    {num && <div style={{ position: 'absolute', bottom: 22, right: 36, fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.pencil }}>— {num} —</div>}
    {children}
  </div>
);

// ── HERO SPREAD ──────────────────────────────────────────────────────────
const HeroPage = ({ onHiren, onJump }) => {
  const d = window.ndata.identity;
  return (
    <Spread style={{ minHeight: 760 }}>
      <PageL num="i">
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.pencil, transform: 'rotate(-1deg)' }}>
          Mon · 04 May '26 · ~9:42pm
        </div>

        <h1 style={{
          fontFamily: '"Caveat", cursive', fontWeight: 700,
          fontSize: 124, lineHeight: 0.88, color: COL.ink,
          margin: '20px 0 0', letterSpacing: '-0.01em',
        }}>
          Vipul<br/>Yadav<span style={{ color: COL.red }}>.</span>
        </h1>
        <div style={{ marginTop: -2, marginLeft: 6 }}>
          <DoubleUnderline w={420} color={COL.red} />
        </div>

        <div style={{ marginTop: 32, fontFamily: '"Special Elite", monospace', fontSize: 18, color: COL.ink, lineHeight: 1.6, maxWidth: 460 }}>
          Full-Stack + AI engineer. <Marker>I ship.</Marker> Mock-interview platforms,
          evidence vaults, BERT classifiers — built end-to-end, run in prod, used by
          strangers.
        </div>

        <div style={{ marginTop: 18, fontFamily: '"Patrick Hand", cursive', fontSize: 18, color: COL.pencil }}>
          B.Tech CSE · BTKIT '27 · Haridwar, IN
        </div>

        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 18 }}>
          <StickyTag color="#a8d4a8" angle={-3} style={{ fontSize: 18 }}>
            ● open · summer '26
          </StickyTag>
          <Margin angle={-4} color={COL.red} style={{ fontSize: 22 }}>
            ← talk to me!
          </Margin>
        </div>

        <div style={{ marginTop: 44, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onJump('projects')} className="nb-btn nb-btn-primary">
            see the work <ArrowWavy w={36} color="#fff" style={{ marginLeft: 4 }} />
          </button>
          <button onClick={onHiren} className="nb-btn">
            ask HIREN <span style={{ marginLeft: 6, color: COL.red, fontFamily: '"Caveat", cursive', fontSize: 22 }}>⌘K</span>
          </button>
        </div>

        <Margin angle={5} color={COL.blue} style={{ fontSize: 19, marginTop: 16, marginLeft: 6 }}>
          (HIREN = it's me, but a bot)
        </Margin>
      </PageL>

      <PageR num="ii">
        <div style={{
          position: 'relative', width: 280, height: 340, margin: '8px 0 0 32px',
          transform: 'rotate(3.5deg)',
          background: '#fff', padding: '12px 12px 50px',
          boxShadow: '0 6px 22px rgba(0,0,0,0.18), 0 1px 0 rgba(0,0,0,0.06)',
        }}>
          <div style={{ position: 'absolute', top: -18, left: 32, zIndex: 2 }}>
            <Tape w={84} color="#a3c4f5" angle={-12} />
          </div>
          <div style={{ position: 'absolute', top: -12, right: 22, zIndex: 2 }}>
            <Tape w={56} color="#f3a3a3" angle={18} />
          </div>
          <img src="assets/vipul.jpeg" alt="Vipul Yadav" style={{
            width: '100%', height: 270, objectFit: 'cover', objectPosition: 'center 28%',
            display: 'block', filter: 'contrast(1.04) saturate(0.95)',
          }} />
          <div style={{
            position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
            fontFamily: '"Caveat", cursive', color: COL.pencil, fontSize: 24, lineHeight: 1,
          }}>
            "vipul, freshman year"
          </div>
        </div>

        <div style={{ marginTop: 28, marginLeft: -10, position: 'relative', height: 220 }}>
          <Scrap angle={-5} top={0}   left={20}  color="#fffcf2">
            <strong style={{ color: COL.red, fontSize: 32 }}>50+</strong>
            <span style={{ fontSize: 16, color: COL.pencil, marginLeft: 6 }}>users on COPREPER</span>
          </Scrap>
          <Scrap angle={4} top={42} left={210} color="#fff8e6">
            <strong style={{ color: COL.red, fontSize: 32 }}>1,247</strong>
            <span style={{ fontSize: 16, color: COL.pencil, marginLeft: 6 }}>commits this yr</span>
          </Scrap>
          <Scrap angle={-3} top={104} left={64} color="#eef4ff">
            <strong style={{ color: COL.red, fontSize: 32 }}>412</strong>
            <span style={{ fontSize: 16, color: COL.pencil, marginLeft: 6 }}>LeetCode solved</span>
          </Scrap>
          <Scrap angle={6} top={148} left={240} color="#eafff0">
            <strong style={{ color: COL.red, fontSize: 26 }}>0 bugs</strong>
            <span style={{ fontSize: 14, color: COL.pencil, marginLeft: 6 }}>(in this résumé)</span>
          </Scrap>
        </div>
      </PageR>
    </Spread>
  );
};

const Scrap = ({ children, angle = 0, top = 0, left = 0, color = '#fff' }) => (
  <div style={{
    position: 'absolute', top, left,
    background: color, padding: '6px 14px',
    fontFamily: '"Caveat", cursive',
    transform: `rotate(${angle}deg)`,
    boxShadow: '2px 2px 0 rgba(0,0,0,0.06), 0 6px 12px rgba(0,0,0,0.06)',
    border: `1px solid rgba(0,0,0,0.05)`,
    display: 'inline-flex', alignItems: 'baseline',
    whiteSpace: 'nowrap',
  }}>{children}</div>
);

// ── ABOUT SPREAD ─────────────────────────────────────────────────────────
const AboutPage = () => {
  const m = window.ndata.manifesto;
  return (
    <Spread>
      <PageL num="01">
        <SectionTitle num="01" title="about" subtitle="who, what, why" />

        <div style={{ marginTop: 30, fontFamily: '"Special Elite", monospace', fontSize: 16, lineHeight: 1.85, color: COL.ink, maxWidth: 480 }}>
          <p style={{ margin: '0 0 16px' }}>
            <span style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.red }}>Hello,</span>
          </p>
          <p style={{ margin: '0 0 14px' }}>
            I'm a full-stack engineer who fell hard for the AI side. React + Node by day,
            BERT classifiers and prompt-chain evaluators by night, and I genuinely don't
            see the seam — it's all one product.
          </p>
          <p style={{ margin: '0 0 14px' }}>
            Currently <Marker>SE intern at ColoredCow</Marker>, shipping client work on
            real deadlines. Before that: hackathon finalist at ThoughtWorks Gurugram,
            second place at BTKIT CodeFest, a stack of certificates I actually finished.
          </p>
          <p style={{ margin: '0 0 14px' }}>
            I read papers, then build the toy. I write README first. I'm not afraid of
            a 24h hackathon.
          </p>
          <p style={{ margin: '24px 0 0', fontFamily: '"Caveat", cursive', fontSize: 30, color: COL.red, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
            — Vipul
          </p>
        </div>
      </PageL>

      <PageR num="02" style={{ background: 'linear-gradient(to bottom, transparent 0, transparent 100%)' }}>
        <div style={{
          position: 'absolute', inset: '60px 56px 80px 40px',
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 33px, ${COL.pencil}30 33px, ${COL.pencil}30 34px)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 92, width: 1.5, background: COL.red, opacity: 0.35 }} />

        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 44, color: COL.ink, lineHeight: 1, marginBottom: 4 }}>
            rules I try
            <br/>to keep
          </div>
          <Underline w={250} color={COL.red} thick={3} />

          <Margin angle={-3} color={COL.blue} style={{ fontSize: 20, position: 'absolute', top: 8, right: 10 }}>
            (mostly)
          </Margin>

          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
            {m.map((it, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, height: 34, marginBottom: 0 }}>
                <span style={{ flexShrink: 0, paddingTop: 4 }}>
                  <Checkbox checked={it.done} s={20} color={COL.ink} />
                </span>
                <span style={{
                  fontFamily: '"Patrick Hand", cursive', fontSize: 22, lineHeight: 1.45,
                  color: it.done ? COL.ink : COL.pencil,
                  textDecoration: it.done ? 'line-through' : 'none',
                  textDecorationColor: COL.red,
                  textDecorationThickness: '2.4px',
                  textDecorationSkipInk: 'none',
                }}>{it.text}</span>
              </li>
            ))}
          </ul>

          <Margin angle={-2} color={COL.red} style={{ fontSize: 19, marginTop: 28, marginLeft: 16 }}>
            ↑ work in progress, always
          </Margin>
        </div>
      </PageR>
    </Spread>
  );
};

// ── EXPERIENCE — ledger spread ────────────────────────────────────────────
const ExperiencePage = () => {
  const exp = window.ndata.experience;
  return (
    <Spread>
      <PageL num="03">
        <SectionTitle num="03" title="experience" subtitle="the receipts" />

        <Margin angle={-2} color={COL.blue} style={{ fontSize: 18, marginTop: 18, marginLeft: 4 }}>
          (in chronological order — newest on right →)
        </Margin>

        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink, marginBottom: 6 }}>
            timeline at a glance
          </div>
          <Underline w={220} color={COL.ink} thick={2} />

          <div style={{ marginTop: 22, fontFamily: '"Special Elite", monospace', fontSize: 14, color: COL.ink, lineHeight: 2 }}>
            <LedgerRow date="May '26" tag="present" body="ColoredCow · SE Intern" red />
            <LedgerRow date="Sep '25" tag="finalist" body="HACKGROUND INDIA 2K25" />
            <LedgerRow date="Nov '24" tag="2nd" body="BTKIT CodeFest" />
            <LedgerRow date="2024 →" tag="study" body="B.Tech CSE @ BTKIT" />
            <LedgerRow date="—" tag="next" body="open for summer '26" red dashed />
          </div>
        </div>

        <Margin angle={-3} color={COL.red} style={{ fontSize: 22, marginTop: 32, marginLeft: 6 }}>
          ✱ next stop = your team?
        </Margin>
      </PageL>

      <PageR num="04" style={{ paddingTop: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {exp.map((e, i) => (
            <article key={i} style={{
              position: 'relative',
              background: i === 0 ? '#fffcf2' : '#fff',
              padding: '22px 24px 24px',
              border: `1.5px solid ${COL.ink}25`,
              transform: `rotate(${i % 2 ? 0.6 : -0.5}deg)`,
              boxShadow: '3px 4px 0 rgba(0,0,0,0.07)',
            }}>
              <div style={{ position: 'absolute', top: -14, left: 24 }}>
                <Tape w={90} color={e.tape} angle={e.tapeAngle} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, color: COL.ink, margin: 0, lineHeight: 1 }}>
                  {e.co}
                </h3>
                <span style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: COL.red }}>
                  {e.date.split(' · ')[0]}
                </span>
              </div>
              <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 19, color: COL.pencil, marginBottom: 10 }}>
                {e.role}{e.date.includes('·') ? <> · {e.date.split(' · ')[1]}</> : null}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: '"Special Elite", monospace', fontSize: 14, color: COL.ink, lineHeight: 1.7 }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 2 }}>
                    <span style={{ color: COL.red, fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 0.9 }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {e.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.pencil,
                    background: '#fff48a80', padding: '1px 8px',
                    transform: `rotate(${(t.length % 3 - 1) * 0.8}deg)`, display: 'inline-block',
                  }}>#{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageR>
    </Spread>
  );
};

const LedgerRow = ({ date, tag, body, red, dashed }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '78px 80px 1fr',
    gap: 14, alignItems: 'baseline',
    padding: '4px 0',
    borderBottom: dashed ? `1.5px dashed ${COL.pencil}80` : `1px solid ${COL.pencil}40`,
  }}>
    <span style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: red ? COL.red : COL.ink }}>{date}</span>
    <span style={{
      fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: red ? '#fff' : COL.ink, background: red ? COL.red : 'transparent',
      border: red ? 'none' : `1px solid ${COL.ink}`,
      padding: '1px 6px', textAlign: 'center', justifySelf: 'start',
    }}>{tag}</span>
    <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 19, color: COL.ink }}>{body}</span>
  </div>
);

const SectionTitle = ({ num, title, subtitle }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
      <span style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.red, transform: 'rotate(-2deg)', display: 'inline-block' }}>§ {num}</span>
      <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: 60, fontWeight: 700, margin: 0, color: COL.ink, lineHeight: 0.95 }}>
        {title}
      </h2>
    </div>
    <Underline w={Math.max(180, title.length * 36)} color={COL.ink} thick={3} style={{ marginLeft: 4, marginTop: -2 }} />
    <div style={{ marginTop: 8, fontFamily: '"Patrick Hand", cursive', fontSize: 19, color: COL.pencil }}>
      ↳ {subtitle}
    </div>
  </div>
);

const PageHeader = ({ num, title, subtitle }) => (
  <SectionTitle num={num} title={title} subtitle={subtitle} />
);

window.NPages1 = { Spread, PageL, PageR, HeroPage, AboutPage, ExperiencePage, PageHeader, SectionTitle };
window.Page = ({ children, style = {}, ...rest }) => (
  <div style={{ position: 'relative', background: '#fdfcf6', padding: '46px 56px 60px', boxShadow: '0 1px 0 rgba(0,0,0,0.05), 0 8px 24px rgba(40,30,15,0.08), 0 30px 60px -20px rgba(40,30,15,0.12)', ...style }}>
    <div style={{ position: 'absolute', top: -1, left: 0, right: 0 }}><TornEdge w={1300} flip /></div>
    <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}><TornEdge w={1300} /></div>
    {children}
  </div>
);
