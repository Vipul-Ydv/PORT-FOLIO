/* Notebook v2 — Spread 06 (what next + contact) */
const { Underline, ArrowWavy, Tape, StickyTag, Margin, Marker, COL } = window.Scribbles;
const { Spread, PageL, PageR, SpreadLabel } = window.NPagesA;

const WhatNextSpread = ({ onHiren }) => (
  <Spread id="s-next">
    {/* LEFT — open for summer '26 */}
    <PageL num="11">
      <SpreadLabel ch="06" title="what next." kicker="open for summer '26" />

      <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 56, lineHeight: 1, color: COL.ink, margin: '8px 0 6px' }}>
        let's <span style={{ color: COL.red }}>talk</span>.
      </h3>
      <Underline w={260} color={COL.red} thick={3} />

      <p style={{ fontFamily: '"Special Elite", monospace', fontSize: 16, color: COL.ink, lineHeight: 1.75, marginTop: 22, maxWidth: 460 }}>
        Looking for a Summer '26 SE internship — <Marker>remote, hybrid or onsite</Marker>.
        Strong on full-stack + applied AI. I read DMs, I reply within a day,
        and I'm not afraid of take-homes.
      </p>

      <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href="mailto:vipul.ydv01@gmail.com" className="nb-btn nb-btn-primary" style={{ fontSize: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>
          send email <ArrowWavy w={28} color="#fff" />
        </a>
        <button onClick={onHiren} className="nb-btn" style={{ fontSize: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>
          ask HIREN
        </button>
      </div>

      <Margin angle={-3} color={COL.blue} style={{ fontSize: 18, marginTop: 22, marginLeft: 4 }}>
        (HIREN can answer most "what's your stack?" questions for you)
      </Margin>

      <div style={{ marginTop: 36, padding: 16, background: '#fffcf2', border: `1.5px dashed ${COL.pencil}80`, transform: 'rotate(-0.6deg)' }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, marginBottom: 6 }}>
          good problems to talk about <span style={{ color: COL.red }}>:</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.ink, lineHeight: 1.85 }}>
          <li style={{ marginBottom: 4 }}>→ AI features that need real evals, not just vibes</li>
          <li style={{ marginBottom: 4 }}>→ small RAG systems that have to be cheap & fast</li>
          <li style={{ marginBottom: 4 }}>→ fullstack from-zero MVPs with a 4-week deadline</li>
          <li>→ anything with a "but does it actually work?" question</li>
        </ul>
      </div>
    </PageL>

    {/* RIGHT — taped contact card */}
    <PageR num="12">
      <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
        contact card · pinned
      </div>
      <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, lineHeight: 0.95, margin: 0, color: COL.ink }}>
        find me here.
      </h3>
      <Underline w={260} color={COL.red} thick={2.8} style={{ marginLeft: 4, marginTop: -2 }} />

      <aside style={{
        marginTop: 32,
        background: '#fff', padding: '22px 24px',
        border: `1.5px solid ${COL.ink}25`,
        boxShadow: '3px 4px 0 rgba(0,0,0,0.06)',
        transform: 'rotate(-1.2deg)', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -16, left: 18 }}>
          <Tape w={120} color="#f3a3a3" angle={-6} />
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {window.ndata.contact.map((r, i, arr) => (
            <li key={r.k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i < arr.length-1 ? `1px dashed ${COL.pencil}50` : 'none',
              fontFamily: '"Patrick Hand", cursive', fontSize: 18,
            }}>
              <span style={{ color: COL.pencil }}>{r.k}</span>
              <a href={r.href} target="_blank" rel="noopener" style={{
                color: r.primary ? COL.red : COL.ink, textDecoration: 'none',
                borderBottom: `1.5px solid ${r.primary ? COL.red : 'transparent'}`,
              }}>{r.v}</a>
            </li>
          ))}
        </ul>
      </aside>

      <div style={{ marginTop: 50, textAlign: 'center', fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.pencil }}>
        — end of notebook —
      </div>
      <div style={{ marginTop: 4, textAlign: 'center', fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red }}>
        thanks for reading ✱
      </div>
    </PageR>
  </Spread>
);

window.NPagesD = { WhatNextSpread };
