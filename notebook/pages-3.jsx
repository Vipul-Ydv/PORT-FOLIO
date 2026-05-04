/* Notebook — Blog, Contact */
const { Underline, ScribbleCircle, ArrowCurved, ArrowWavy, StarBurst,
        Tape, StickyTag, Margin, Marker, COL } = window.Scribbles;
const { Spread, PageL, PageR, SectionTitle } = window.NPages1;

// ── BLOG — notebook clipping spread ────────────────────────────────────
const BlogPage = () => {
  const blog = window.ndata.blog;
  const featured = blog[0];
  const rest = blog.slice(1);
  return (
    <Spread style={{ minHeight: 680 }}>
      <PageL num="11">
        <SectionTitle num="07" title="notes" subtitle="things I figured out" />

        <Margin angle={-2} color={COL.blue} style={{ fontSize: 19, marginTop: 16, marginLeft: 4 }}>
          (slow & infrequent — quality over reach)
        </Margin>

        <article style={{
          marginTop: 32, position: 'relative',
          background: '#fffcf2', border: `1.5px solid ${COL.ink}25`,
          padding: '28px 30px 30px', boxShadow: '3px 4px 0 rgba(0,0,0,0.07)',
          transform: 'rotate(-0.5deg)',
        }}>
          <div style={{ position: 'absolute', top: -16, right: 30 }}>
            <Tape w={90} color="#f7d36b" angle={8} />
          </div>
          <div style={{ position: 'absolute', top: -16, left: 36 }}>
            <Tape w={70} color="#a3c4f5" angle={-12} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, marginBottom: 14 }}>
            <span>{featured.date} '25 ✱ latest</span>
            <span style={{ color: COL.pencil }}>{featured.read} min</span>
          </div>
          <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 38, color: COL.ink, lineHeight: 1.05, margin: '0 0 14px' }}>
            {featured.title}
          </h3>
          <Underline w={300} color={COL.red} thick={2} />
          <p style={{ marginTop: 18, fontFamily: '"Special Elite", monospace', fontSize: 15, color: COL.ink, lineHeight: 1.7 }}>
            {featured.excerpt}
          </p>
          <div style={{ marginTop: 18, fontFamily: '"Caveat", cursive', fontSize: 22, color: COL.red, display: 'flex', alignItems: 'center', gap: 6 }}>
            read on <ArrowWavy w={36} color={COL.red} />
          </div>
        </article>
      </PageL>

      <PageR num="12" style={{ paddingTop: 56 }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: COL.ink, marginBottom: 4, transform: 'rotate(-1deg)', display: 'inline-block' }}>
          + the archive
        </div>
        <Underline w={180} color={COL.ink} thick={2} />

        <Margin angle={-2} color={COL.pencil} style={{ fontSize: 18, marginTop: 14, marginLeft: 4 }}>
          (older notebooks, filed away)
        </Margin>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {rest.map((b, i) => (
            <article key={i} style={{
              position: 'relative', background: '#fff',
              borderLeft: `4px solid ${COL.red}`,
              padding: '14px 18px 16px',
              transform: `rotate(${i % 2 ? 0.3 : -0.4}deg)`,
              boxShadow: '2px 3px 0 rgba(0,0,0,0.06)',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Caveat", cursive', fontSize: 18, color: COL.red, marginBottom: 4 }}>
                <span>{b.date} '25</span>
                <span style={{ color: COL.pencil }}>{b.read} min</span>
              </div>
              <h4 style={{ fontFamily: '"Caveat", cursive', fontSize: 26, color: COL.ink, margin: '0 0 8px', lineHeight: 1.1 }}>
                {b.title}
              </h4>
              <p style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.pencil, margin: 0, lineHeight: 1.5 }}>
                {b.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 28, paddingTop: 14, borderTop: `1.5px dashed ${COL.pencil}50`, fontFamily: '"Patrick Hand", cursive', fontSize: 17, color: COL.pencil, display: 'flex', justifyContent: 'space-between' }}>
          <span>↑ enjoy. take notes.</span>
          <span style={{ color: COL.red }}>RSS coming when I feel like it</span>
        </div>
      </PageR>
    </Spread>
  );
};

// ── CONTACT — envelope spread ────────────────────────────────────────────
const ContactPage = ({ onHiren }) => (
  <Spread style={{ minHeight: 660 }}>
    <PageL num="13">
      <SectionTitle num="08" title="say hi" subtitle="open for summer '26" />

      <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: 64, lineHeight: 0.95, color: COL.ink, margin: '40px 0 12px', transform: 'rotate(-1deg)' }}>
        let's <span style={{ color: COL.red }}>talk.</span>
      </h3>
      <Underline w={260} color={COL.red} thick={3} />

      <div style={{ marginTop: 28, fontFamily: '"Special Elite", monospace', fontSize: 16, color: COL.ink, lineHeight: 1.75, maxWidth: 460 }}>
        Looking for a Summer '26 SE internship — <Marker>remote, hybrid or onsite</Marker>.
        Strong on full-stack + applied AI. I read DMs, I reply within a day,
        and I'm not afraid of take-homes.
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href="mailto:vipul.yadav@coloredcow.in" className="nb-btn nb-btn-primary">
          send an email <ArrowWavy w={32} color="#fff" />
        </a>
        <button onClick={onHiren} className="nb-btn">
          ask HIREN first
        </button>
      </div>

      <Margin angle={-3} color={COL.blue} style={{ fontSize: 19, marginTop: 24, marginLeft: 4 }}>
        (HIREN can answer "what's your stack?" for you)
      </Margin>

      <div style={{ marginTop: 60, fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.ink, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
        — Vipul ✎
      </div>
    </PageL>

    <PageR num="14" style={{ paddingTop: 80 }}>
      <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto' }}>
        <div style={{
          background: '#fff', padding: '28px 32px 32px',
          border: `1.5px solid ${COL.ink}30`,
          boxShadow: '4px 5px 0 rgba(0,0,0,0.07)',
          transform: 'rotate(-1deg)',
          position: 'relative',
        }}>
          {/* Stamp */}
          <div style={{
            position: 'absolute', top: 18, right: 24,
            width: 70, height: 84, background: '#fffcf2',
            border: `1.5px dashed ${COL.red}`, padding: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Caveat", cursive', fontSize: 14, color: COL.red,
            textAlign: 'center', lineHeight: 1.1, transform: 'rotate(4deg)',
          }}>
            ✱ priority<br/>haridwar<br/>'26
          </div>

          <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.pencil, marginBottom: 8 }}>FROM:</div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: COL.ink, marginBottom: 24, lineHeight: 1.1 }}>
            Vipul Yadav<br/>
            <span style={{ fontSize: 18, color: COL.pencil }}>BTKIT '27 · Haridwar, IN</span>
          </div>

          <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 16, color: COL.pencil, marginBottom: 6 }}>TO: ↓</div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: COL.ink, lineHeight: 1.2, padding: '0 0 10px' }}>
            (whoever's reading this)
          </div>

          <div style={{ borderTop: `1.5px dashed ${COL.pencil}80`, marginTop: 8, paddingTop: 16 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {window.ndata.contact.map((r, i, arr) => (
                <li key={r.k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: i < arr.length - 1 ? `1px dotted ${COL.pencil}50` : 'none',
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
          </div>
        </div>

        {/* Wax-seal-ish red dot */}
        <div style={{
          position: 'absolute', bottom: -20, left: '50%',
          transform: 'translateX(-50%) rotate(-12deg)',
          width: 64, height: 64, borderRadius: '50%',
          background: COL.red, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Caveat", cursive', fontSize: 18, lineHeight: 1, textAlign: 'center',
          boxShadow: '0 4px 10px rgba(200,48,48,0.3)',
        }}>
          v.y.<br/>'26
        </div>
      </div>

      <div style={{ marginTop: 60, paddingTop: 18, borderTop: `1.5px dashed ${COL.pencil}60`, fontFamily: '"Caveat", cursive', fontSize: 20, color: COL.pencil, display: 'flex', justifyContent: 'space-between' }}>
        <span>— end of notebook —</span>
        <span style={{ color: COL.red }}>thanks for reading ✱</span>
      </div>
    </PageR>
  </Spread>
);

window.NPages3 = { BlogPage, ContactPage };
