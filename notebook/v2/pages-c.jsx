/* Notebook v2 — Spread 04 (proof I shipped) + Spread 05 (scrapheap) */
const { Underline, ScribbleCircle, Tape, StickyTag, Margin, Marker, COL } = window.Scribbles;
const { Spread, PageL, PageR, SpreadLabel } = window.NPagesA;

// ───── Ch. 04 · proof I shipped ─────────────────────────────────────────
const ProofSpread = ({ focus, setFocus }) => {
  const featured = window.ndata.projects.slice(0, 2);
  const minor = window.ndata.projects.slice(2);

  return (
    <Spread id="s-proof">
      {/* LEFT — selected work */}
      <PageL num="07">
        <SpreadLabel ch="04" title="proof I shipped." kicker="selected work" />

        {/* Two big polaroids */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 36 }}>
          {featured.map((p, i) => {
            const open = focus === p.slug;
            return (
              <div key={p.slug}
                onClick={() => setFocus(open ? null : p.slug)}
                style={{
                  position: 'relative', background: '#fff', padding: '10px 10px 14px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.06), 0 8px 18px rgba(40,30,15,0.12)',
                  transform: `rotate(${p.angle}deg)`,
                  cursor: 'pointer', transition: 'transform .2s',
                  border: open ? `2px solid ${COL.red}` : '1px solid rgba(0,0,0,0.05)',
                }}>
                <div style={{ position: 'absolute', top: -10, left: -6 }}>
                  <Tape w={70} color={i ? '#a3c4f5' : '#f7d36b'} angle={i ? -14 : 12} />
                </div>
                <div style={{
                  height: 130, background: p.polaroid, overflow: 'hidden',
                }}>
                  {p.img && <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ marginTop: 8, fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, lineHeight: 1 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, lineHeight: 1.35, marginTop: 4 }}>
                  {p.caption}
                </div>
                <div style={{ marginTop: 8, fontFamily: '"Caveat", cursive', fontSize: 16, color: COL.red }}>
                  {p.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Smaller projects as clipping list */}
        <div style={{ marginTop: 28, paddingTop: 16, borderTop: `1.5px dashed ${COL.pencil}60` }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, marginBottom: 10 }}>
            also in the file <span style={{ color: COL.red }}>:</span>
          </div>
          {minor.map(p => (
            <div key={p.slug} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 14, padding: '10px 0',
              borderBottom: `1px dotted ${COL.pencil}80`,
            }}>
              <div>
                <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.ink, lineHeight: 1 }}>
                  {p.title}
                  <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, color: COL.pencil, marginLeft: 10 }}>
                    — {p.caption}
                  </span>
                </div>
                <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.stack.map(s => (
                    <span key={s} style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 12, color: COL.ink, background: '#fff48a', padding: '0 6px' }}>{s}</span>
                  ))}
                </div>
              </div>
              <span style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.red, alignSelf: 'center' }}>
                {p.metric}
              </span>
            </div>
          ))}
        </div>
      </PageL>

      {/* RIGHT — what I did, where (timeline of work) */}
      <PageR num="08">
        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
          where I shipped it
        </div>
        <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, lineHeight: 0.95, margin: 0, color: COL.ink }}>
          the receipts.
        </h3>
        <Underline w={260} color={COL.red} thick={2.8} style={{ marginLeft: 4, marginTop: -2 }} />

        <div style={{ marginTop: 28, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 70, top: 14, bottom: 0, width: 0, borderLeft: `2px dashed ${COL.pencil}` }} />

          {window.ndata.experience.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 22, marginBottom: 30 }}>
              <div style={{ paddingTop: 6, fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.red, textAlign: 'right' }}>
                {e.date.split(' — ')[0].split(' · ')[0]}
              </div>
              <div style={{
                position: 'relative', background: '#fffcf2',
                border: `1.5px solid ${COL.ink}25`,
                padding: '14px 18px', marginLeft: 16,
                transform: `rotate(${i % 2 ? 0.4 : -0.5}deg)`,
                boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
              }}>
                <div style={{ position: 'absolute', top: -10, left: 18 }}>
                  <Tape w={66} color={e.tape} angle={e.tapeAngle} />
                </div>
                <div style={{ position: 'absolute', left: -23, top: 22, width: 12, height: 12, borderRadius: '50%', background: COL.red, border: '3px solid #fdfcf6' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <h4 style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: COL.ink, margin: 0, lineHeight: 1.1 }}>
                    {e.co}
                  </h4>
                  <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 15, color: COL.pencil, lineHeight: 1.2 }}>
                    — {e.role}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontFamily: '"Special Elite", monospace', fontSize: 13, color: COL.ink, lineHeight: 1.55 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 8 }}>
                      <span style={{ color: COL.red, fontFamily: '"Caveat", cursive', fontSize: 18, lineHeight: 0.9 }}>→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <Margin angle={-3} color={COL.red} style={{ marginTop: 18, fontSize: 18, marginLeft: 80 }}>
          ✱ next entry: yours?
        </Margin>
      </PageR>
    </Spread>
  );
};

// ───── Ch. 05 · the scrapheap ───────────────────────────────────────────
const ScrapheapSpread = () => {
  const s = window.ndata.skills;

  const Block = ({ title, items, color, marker, strike, sub }) => (
    <div>
      <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color, marginBottom: 2, lineHeight: 1 }}>{title}</div>
      <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 13, color: COL.pencil, marginBottom: 6 }}>{sub}</div>
      <Underline w={Math.min(180, title.length * 14)} color={color} thick={2} />
      <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', fontFamily: '"Patrick Hand", cursive', fontSize: 17, color: COL.ink, lineHeight: 1.55 }}>
        {items.map(it => (
          <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: COL.red, fontSize: 16, width: 12 }}>—</span>
            {marker
              ? <Marker color="#fff48a">{it}</Marker>
              : strike
                ? <span style={{ color: COL.pencil, textDecoration: 'line-through', textDecorationColor: COL.red, textDecorationThickness: '2px' }}>{it}</span>
                : it}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Spread id="s-scrap">
      {/* LEFT — tools on the desk */}
      <PageL num="09">
        <SpreadLabel ch="05" title="the scrapheap." kicker="tools, half-knowledge, paper trail" />

        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 14, color: COL.ink, lineHeight: 1.7, maxWidth: 460, marginBottom: 24 }}>
          Not a stack ranking. Just what's <Marker>actually on the desk</Marker> right now,
          what's coming next, and what I keep forgetting because I never use it.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, alignItems: 'start' }}>
          <Block title="every day" sub="warm, used this week" items={s.daily} color={COL.ink} />
          <Block title="favorites" sub="real love, real hours" items={s.favorite} color={COL.red} marker />
          <Block title="learning" sub="reading + toy projects" items={s.learning} color={COL.blue} />
          <Block title="rusty" sub="cobwebs. don't ask." items={s.rusty} color={COL.pencil} strike />
        </div>

        <Margin angle={-2} color={COL.red} style={{ marginTop: 22, fontSize: 17 }}>
          ↑ tools, not religions. I'll pick whatever ships fastest.
        </Margin>
      </PageL>

      {/* RIGHT — paper trail (certs, wins) */}
      <PageR num="10">
        <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '0.18em', color: COL.pencil, textTransform: 'uppercase', marginBottom: 4 }}>
          paper trail
        </div>
        <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, lineHeight: 0.95, margin: 0, color: COL.ink }}>
          stamps & wins.
        </h3>
        <Underline w={260} color={COL.red} thick={2.8} style={{ marginLeft: 4, marginTop: -2 }} />

        <div style={{ marginTop: 22 }}>
          {window.ndata.certs.map((c, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '70px 1fr 70px',
              gap: 16, alignItems: 'center',
              padding: '12px 4px',
              borderBottom: i < window.ndata.certs.length - 1 ? `1.5px dashed ${COL.pencil}60` : 'none',
              transform: `rotate(${i % 2 ? 0.2 : -0.2}deg)`,
            }}>
              <span style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: COL.red }}>{c.date}</span>
              <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 17, color: COL.ink, lineHeight: 1.3 }}>
                {c.gold && '★ '}{c.label}
              </span>
              {c.gold ? (
                <span style={{
                  border: `2px solid ${COL.red}`, color: COL.red,
                  fontFamily: '"Caveat", cursive', fontSize: 18,
                  textAlign: 'center', padding: '1px 6px',
                  transform: 'rotate(-6deg)', letterSpacing: '0.05em',
                }}>WIN</span>
              ) : (
                <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 11, color: COL.pencil, textAlign: 'center' }}>cert.</span>
              )}
            </div>
          ))}
        </div>
      </PageR>
    </Spread>
  );
};

window.NPagesC = { ProofSpread, ScrapheapSpread };
