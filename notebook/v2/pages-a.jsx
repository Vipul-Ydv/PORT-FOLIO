/* Notebook v2 — Cover + TOC + Spread 01 (why I build), 02 (the COPREPER problem) */
const { Underline, DoubleUnderline, ScribbleCircle, ArrowCurved, ArrowWavy,
        StarBurst, Checkbox, Bracket, TornEdge, Tape, StickyTag,
        Margin, Marker, COL } = window.Scribbles;

// ───── Spread shell — full-bleed, no card edges, stitched into the page ─
const Spread = ({ children, style = {}, id, dashedTop = true }) => (
  <section id={id} className="nb-spread" style={{
    position: 'relative',
    background: '#fdfcf6',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    minHeight: '100vh',
    borderTop: dashedTop ? '1.5px dashed rgba(26, 31, 46, 0.18)' : 'none',
    ...style,
  }}>
    {/* Center spine */}
    <div style={{
      position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
      transform: 'translateX(-0.5px)', pointerEvents: 'none',
      background: 'linear-gradient(to bottom, transparent 0, rgba(26,31,46,0.18) 60px, rgba(26,31,46,0.18) calc(100% - 60px), transparent 100%)',
      zIndex: 5,
    }} />
    {children}
  </section>
);

const PageL = ({ children, num, style = {} }) => (
  <div style={{ position: 'relative', padding: '72px 56px 72px 8vw', ...style }}>
    {num && <div style={{ position: 'absolute', bottom: 28, left: '8vw', fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.pencil }}>— {num} —</div>}
    {children}
  </div>
);
const PageR = ({ children, num, style = {} }) => (
  <div style={{ position: 'relative', padding: '72px 8vw 72px 56px', ...style }}>
    {num && <div style={{ position: 'absolute', bottom: 28, right: '8vw', fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.pencil }}>— {num} —</div>}
    {children}
  </div>
);

const SpreadLabel = ({ ch, title, kicker }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
      Ch. {ch}{kicker ? ` · ${kicker}` : ''}
    </div>
    <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: 56, fontWeight: 700, lineHeight: 0.95, margin: 0, color: COL.ink }}>
      {title}
    </h2>
    <Underline w={Math.max(180, title.length * 22)} color={COL.red} thick={3} style={{ marginLeft: 4, marginTop: -2 }} />
  </div>
);

// ───── COVER + TOC ──────────────────────────────────────────────────────
const CoverSpread = ({ onJump, onHiren }) => (
  <Spread id="s-cover" dashedTop={false}>
    {/* LEFT — cover */}
    <PageL num="cover">
      <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase' }}>
        property of —
      </div>
      <div style={{ marginTop: 6, fontFamily: '"Caveat", cursive', fontSize: 30, color: COL.ink }}>
        Vipul Yadav<span style={{ color: COL.red }}>.</span>
      </div>

      <div style={{ marginTop: 60, position: 'relative' }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.pencil, marginBottom: 6, transform: 'rotate(-1deg)' }}>
          notebook nº 03 ✱ '24 — '26
        </div>
        <h1 style={{
          fontFamily: '"Caveat", cursive', fontWeight: 700,
          fontSize: 132, lineHeight: 0.85, color: COL.ink,
          margin: 0, letterSpacing: '-0.01em',
        }}>
          Field<br/>Notes<span style={{ color: COL.red }}>.</span>
        </h1>
        <DoubleUnderline w={460} color={COL.red} style={{ marginLeft: 4, marginTop: 2 }} />

        <div style={{ marginTop: 32, fontFamily: '"Special Elite", monospace', fontSize: 17, color: COL.ink, lineHeight: 1.65, maxWidth: 460 }}>
          on building things at the messy intersection of full-stack web,
          applied AI, and 3am ideas. <Marker>not a résumé.</Marker> read in any order.
        </div>
      </div>

      {/* Stamps */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, display: 'flex', gap: 18 }}>
        <StickyTag color="#a8d4a8" angle={-3} style={{ fontSize: 18 }}>● open · summer '26</StickyTag>
        <Margin angle={-4} color={COL.red} style={{ fontSize: 22 }}>← talk to me!</Margin>
      </div>
    </PageL>

    {/* RIGHT — Table of Contents */}
    <PageR num="toc">
      <SpreadLabel ch="00" title="contents" kicker="read in any order" />

      <ol style={{ listStyle: 'none', padding: 0, margin: '6px 0 36px', counterReset: 'toc' }}>
        {window.toc.map((t, i) => (
          <li key={t.key} onClick={() => onJump(t.key)} style={{
            cursor: 'pointer', display: 'grid',
            gridTemplateColumns: '36px 1fr 60px',
            gap: 14, alignItems: 'baseline',
            padding: '14px 0',
            borderBottom: `1.5px dotted ${COL.pencil}80`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 244, 138, 0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <span style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.red }}>{t.num}</span>
            <span style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.ink, lineHeight: 1.05 }}>
              {t.title}
              <span style={{ display: 'block', fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.pencil, marginTop: 2 }}>
                {t.note}
              </span>
            </span>
            <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 13, color: COL.pencil, textAlign: 'right' }}>
              p. {t.page}
            </span>
          </li>
        ))}
      </ol>

      <div style={{
        marginTop: 8, padding: '14px 16px',
        background: '#fff48a', transform: 'rotate(-0.8deg)',
        boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} onClick={onHiren}>
        <div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink }}>
            ✎ ask the notebook
          </div>
          <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.pencil }}>
            HIREN can answer questions about Vipul, in his voice
          </div>
        </div>
        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, color: COL.ink, padding: '4px 8px', border: `1.5px solid ${COL.ink}` }}>⌘K</div>
      </div>
    </PageR>
  </Spread>
);

// ───── Ch. 01 · why I build ─────────────────────────────────────────────
const WhyIBuildSpread = () => {
  const m = window.ndata.manifesto;
  return (
    <Spread id="s-why">
      {/* LEFT — typed letter */}
      <PageL num="01">
        <SpreadLabel ch="01" title="why I build." kicker="opening note" />

        <div style={{ marginTop: 10, fontFamily: '"Special Elite", monospace', fontSize: 16, color: COL.ink, lineHeight: 1.85, maxWidth: 480 }}>
          <p style={{ margin: '0 0 16px' }}>
            I'm a full-stack engineer who fell hard for the AI side. I write
            React + Node by day, train BERT classifiers and prompt-chain
            evaluators by night, and I genuinely don't see the seam — it's all
            <Marker> one product</Marker>.
          </p>
          <p style={{ margin: 0 }}>
            I build because the only way I actually understand something is to
            make a working version of it. Read the paper, ship the toy, watch
            it break in front of strangers. Repeat.
          </p>
        </div>

        <div style={{ marginTop: 32, fontFamily: '"Caveat", cursive', fontSize: 32, color: COL.red, lineHeight: 1.15, transform: 'rotate(-1deg)', maxWidth: 460 }}>
          "I learn fast, I ship faster, and I'm not afraid of a 24h hackathon."
        </div>
        <div style={{ marginLeft: 12, marginTop: 2 }}><Underline w={300} color={COL.red} /></div>

        <div style={{ marginTop: 36, fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
          — Vipul ✎
        </div>
      </PageL>

      {/* RIGHT — bracket-grouped manifesto + photo on top */}
      <PageR num="02" style={{ position: 'relative' }}>
        {/* Tilted photo top right */}
        <div style={{
          position: 'relative', width: 180, height: 220, marginLeft: 'auto', marginBottom: 24,
          transform: 'rotate(4deg)',
          background: '#fff', padding: '8px 8px 32px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
        }}>
          <div style={{ position: 'absolute', top: -12, left: 24, zIndex: 2 }}>
            <Tape w={64} color="#a3c4f5" angle={-12} />
          </div>
          <img src="notebook/assets/vipul.jpeg" alt="Vipul" style={{
            width: '100%', height: 170, objectFit: 'cover', objectPosition: 'center 28%',
            display: 'block', filter: 'contrast(1.04) saturate(0.95)',
          }} />
          <div style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
            fontFamily: '"Caveat", cursive', color: COL.pencil, fontSize: 18, lineHeight: 1,
          }}>"the author"</div>
        </div>

        <div style={{ position: 'relative', paddingLeft: 22 }}>
          <div style={{ position: 'absolute', left: 0, top: 6, bottom: 0 }}>
            <Bracket h={360} side="left" color={COL.ink} />
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, color: COL.ink, marginBottom: 4 }}>
            rules I try to keep
          </div>
          <Underline w={210} color={COL.red} />
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
            {m.map((it, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ flexShrink: 0, paddingTop: 4 }}>
                  <Checkbox checked={it.done} s={20} color={COL.ink} />
                </span>
                <span style={{
                  fontFamily: '"Patrick Hand", cursive', fontSize: 19, lineHeight: 1.4,
                  color: it.done ? COL.ink : COL.pencil,
                  textDecoration: it.done ? 'line-through' : 'none',
                  textDecorationColor: COL.red,
                  textDecorationThickness: '2.4px',
                  textDecorationSkipInk: 'none',
                }}>{it.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Margin angle={-3} color={COL.blue} style={{ fontSize: 18, marginTop: 36, marginLeft: 4 }}>
          ↑ ongoing. self-reviewed nightly.
        </Margin>
      </PageR>
    </Spread>
  );
};

window.NPagesA = { Spread, PageL, PageR, SpreadLabel, CoverSpread, WhyIBuildSpread };
