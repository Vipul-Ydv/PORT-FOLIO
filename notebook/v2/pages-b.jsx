/* Notebook v2 — Spread 02 (the COPREPER problem) + Spread 03 (what I'm reading) */
const { Underline, ScribbleCircle, ArrowCurved, ArrowWavy, Tape, StickyTag,
        Margin, Marker, Bracket, COL } = window.Scribbles;
const { Spread, PageL, PageR, SpreadLabel } = window.NPagesA;

// ───── Ch. 02 · the COPREPER problem ────────────────────────────────────
const ProblemSpread = () => (
  <Spread id="s-problem">
    {/* LEFT — the problem statement, sketched diagram */}
    <PageL num="03">
      <SpreadLabel ch="02" title="a problem" kicker="I keep coming back to" />

      <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, color: COL.ink, lineHeight: 1.15, marginTop: 6 }}>
        How do you tell someone <span style={{ color: COL.red }}>they're bad</span> at interviews,<br/>
        in a way they actually <Marker color="#fff48a">believe</Marker>?
      </div>

      <div style={{ marginTop: 22, fontFamily: '"Special Elite", monospace', fontSize: 15, color: COL.ink, lineHeight: 1.7, maxWidth: 460 }}>
        Most mock-interview tools score you and move on. The score is fine —
        nobody changes from a score. They change from <Marker>specific evidence,
        played back at the moment they messed up</Marker>.
      </div>

      {/* Sketched system diagram */}
      <div style={{
        marginTop: 28, padding: 22,
        background: '#fffcf2',
        border: `2px dashed ${COL.pencil}80`,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -12, left: 16, background: '#fdfcf6', padding: '0 8px', fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.pencil, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          fig 1 · the loop
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr 24px 1fr', gap: 10, alignItems: 'center', textAlign: 'center', fontFamily: '"Patrick Hand", cursive', fontSize: 15, color: COL.ink }}>
          <div style={{ padding: '10px 6px', background: '#fff', border: `1.5px solid ${COL.ink}`, transform: 'rotate(-0.6deg)' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, lineHeight: 1 }}>1.</div>
            user speaks<br/>(real-time)
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.red }}>→</div>
          <div style={{ padding: '10px 6px', background: '#fff', border: `1.5px solid ${COL.ink}`, transform: 'rotate(0.4deg)' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, lineHeight: 1 }}>2.</div>
            whisper<br/>transcript
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.red }}>→</div>
          <div style={{ padding: '10px 6px', background: '#fff48a', border: `1.5px solid ${COL.ink}`, transform: 'rotate(-0.5deg)' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, lineHeight: 1 }}>3.</div>
            <Marker color="#fff48a">GPT-4 evaluator</Marker><br/>per-rubric
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '40px 1fr', gap: 8, alignItems: 'start' }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.red, lineHeight: 1 }}>↓</div>
          <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.ink, lineHeight: 1.4 }}>
            replay <Marker color="#a8d4a8">timestamp-anchored feedback</Marker> over the
            session video. you watch yourself fumble at <span style={{ fontFamily: 'monospace', background: '#fff', padding: '0 4px' }}>04:32</span> while it
            highlights <span style={{ color: COL.red }}>"weak STAR structure — no Result"</span>.
          </div>
        </div>
      </div>

      <Margin angle={-2} color={COL.red} style={{ marginTop: 16, fontSize: 18 }}>
        ✱ score-as-feedback is a UX failure, not a model failure
      </Margin>
    </PageL>

    {/* RIGHT — receipts: numbers, screenshot, what surprised me */}
    <PageR num="04">
      <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
        receipts · COPREPER · live
      </div>
      <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, lineHeight: 0.95, margin: 0, color: COL.ink }}>
        what actually happened.
      </h3>
      <Underline w={300} color={COL.red} thick={2.8} style={{ marginLeft: 4, marginTop: -2 }} />
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a href="https://copreper.vercel.app" target="_blank" rel="noopener" className="nb-chip nb-chip-red">
          ↗ visit live
        </a>
        <a href="https://github.com/Vipul-Ydv/copreper" target="_blank" rel="noopener" className="nb-chip">
          ⌥ view code
        </a>
      </div>

      {/* Screenshot taped */}
      <div style={{
        position: 'relative', marginTop: 24,
        background: '#fff', padding: '10px 10px 14px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
        transform: 'rotate(-1.2deg)', maxWidth: 440,
      }}>
        <div style={{ position: 'absolute', top: -12, left: 30 }}>
          <Tape w={80} color="#f7d36b" angle={-8} />
        </div>
        <div style={{ position: 'absolute', top: -10, right: 30 }}>
          <Tape w={70} color="#a3c4f5" angle={10} />
        </div>
        <img src="notebook/assets/copreper.png" alt="COPREPER screenshot" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
        <div style={{ marginTop: 6, fontFamily: '"Caveat", cursive', fontSize: 17, color: COL.pencil, textAlign: 'center', lineHeight: 1 }}>
          session replay — feedback overlay
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { n: '50+',   l: 'real sessions' },
          { n: '1.4s',  l: 'avg latency' },
          { n: '5',     l: 'rubric dims' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fffcf2', border: `1.5px solid ${COL.ink}25`,
            padding: '12px 10px', textAlign: 'center',
            transform: `rotate(${(i-1) * 0.6}deg)`,
            boxShadow: '2px 2px 0 rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 38, color: COL.red, lineHeight: 0.9 }}>{s.n}</div>
            <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.pencil, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* What surprised me */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1.5px dashed ${COL.pencil}50` }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, marginBottom: 8 }}>
          what surprised me <span style={{ color: COL.red }}>:</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: '"Patrick Hand", cursive', fontSize: 17, color: COL.ink, lineHeight: 1.6 }}>
          <li style={{ marginBottom: 6 }}>
            <span style={{ color: COL.red }}>→</span> users replayed sessions <Marker>3.4× on average</Marker>. score alone got 1.1×.
          </li>
          <li style={{ marginBottom: 6 }}>
            <span style={{ color: COL.red }}>→</span> the rubric dimensions matter more than the model.
          </li>
          <li>
            <span style={{ color: COL.red }}>→</span> people don't want a number. they want to <span style={{ color: COL.blue }}>watch themselves</span>.
          </li>
        </ul>
      </div>
    </PageR>
  </Spread>
);

// ───── Ch. 03 · what I'm reading right now ──────────────────────────────
const ReadingSpread = () => {
  const reading = [
    { title: 'Designing Data-Intensive Applications', author: 'Kleppmann', tag: 'systems', progress: 0.62, note: 'finally getting why distributed transactions are a footgun' },
    { title: 'The Pragmatic Programmer', author: 'Hunt + Thomas', tag: 're-read', progress: 1.0, note: 'a re-read every 6 months. always finds new shame.' },
    { title: 'Attention Is All You Need', author: 'Vaswani et al.', tag: 'paper', progress: 0.4, note: 'rebuilt mini-transformer in pytorch — 89 LOC, painful' },
  ];

  return (
    <Spread id="s-reading">
      {/* LEFT — what's on the desk right now */}
      <PageL num="05">
        <SpreadLabel ch="03" title="on the desk" kicker="reading + half-finished thoughts" />

        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 14, color: COL.pencil, marginBottom: 18 }}>
          updated weekly · last touched 02 May
        </div>

        {reading.map((b, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '34px 1fr',
            gap: 14, padding: '14px 0',
            borderBottom: i < reading.length - 1 ? `1.5px dashed ${COL.pencil}60` : 'none',
          }}>
            {/* Spine */}
            <div style={{
              height: 60, width: 28,
              background: ['#c83030', '#2a4a8a', '#5a6070'][i],
              boxShadow: '1px 1px 0 rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `rotate(${(i % 2 ? 1 : -1)}deg)`,
            }}>
              <div style={{ writingMode: 'vertical-rl', fontFamily: '"Caveat", cursive', fontSize: 12, color: '#fff', letterSpacing: '0.05em' }}>
                {b.author.split(' ')[0]}
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: COL.ink, margin: 0, lineHeight: 1 }}>
                  {b.title}
                </h3>
                <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, padding: '0 6px', background: '#fff48a' }}>
                  {b.tag}
                </span>
              </div>
              <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 15, color: COL.pencil, marginTop: 1 }}>
                {b.author}
              </div>
              <div style={{ marginTop: 8, fontFamily: '"Special Elite", monospace', fontSize: 13, color: COL.ink, lineHeight: 1.5, fontStyle: 'italic' }}>
                "{b.note}"
              </div>
              {/* Progress bar */}
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: `${COL.pencil}30`, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${b.progress * 100}%`, background: COL.red }} />
                </div>
                <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 11, color: COL.pencil }}>
                  {Math.round(b.progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </PageL>

      {/* RIGHT — half-finished thoughts (formerly "blog") */}
      <PageR num="06">
        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
          working notes — public-ish
        </div>
        <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, lineHeight: 0.95, margin: 0, color: COL.ink }}>
          half-finished thoughts.
        </h3>
        <Underline w={350} color={COL.red} thick={2.8} style={{ marginLeft: 4, marginTop: -2 }} />

        <div style={{ marginTop: 24 }}>
          {window.ndata.blog.map((b, i) => (
            <div key={i} style={{
              padding: '16px 0',
              borderBottom: i < window.ndata.blog.length - 1 ? `1.5px dashed ${COL.pencil}60` : 'none',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Special Elite", monospace', fontSize: 11, color: COL.pencil, marginBottom: 4, letterSpacing: '0.05em' }}>
                <span>{b.date} · {b.read} min</span>
                <span>↗</span>
              </div>
              <h4 style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink, margin: 0, lineHeight: 1.05 }}>
                {b.title}
              </h4>
              <p style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.pencil, lineHeight: 1.5, margin: '6px 0 0' }}>
                {b.excerpt}
              </p>
            </div>
          ))}
        </div>

        <Margin angle={-2} color={COL.red} style={{ marginTop: 28, fontSize: 18 }}>
          ↑ slow & infrequent. quality over reach.
        </Margin>
      </PageR>
    </Spread>
  );
};

window.NPagesB = { ProblemSpread, ReadingSpread };
