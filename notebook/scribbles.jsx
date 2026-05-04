/* Notebook — SVG scribble primitives & marginalia helpers */

const ink = '#1a1f2e';
const red = '#c83030';
const blue = '#2a4a8a';
const pencil = '#5a6070';

const Underline = ({ w = 200, color = red, thick = 2.4, style = {} }) => (
  <svg width={w} height="14" viewBox={`0 0 ${w} 14`} style={{ display: 'block', overflow: 'visible', ...style }}>
    <path d={`M 4 8 Q ${w*0.15} 4 ${w*0.3} 7 T ${w*0.6} 8 T ${w*0.85} 6 T ${w-4} 9`}
      fill="none" stroke={color} strokeWidth={thick} strokeLinecap="round" />
  </svg>
);

const DoubleUnderline = ({ w = 200, color = red, style = {} }) => (
  <svg width={w} height="16" viewBox={`0 0 ${w} 16`} style={{ display: 'block', overflow: 'visible', ...style }}>
    <path d={`M 4 6 Q ${w*0.2} 3 ${w*0.45} 5 T ${w-4} 7`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d={`M 6 11 Q ${w*0.25} 8 ${w*0.5} 10 T ${w-6} 12`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ScribbleCircle = ({ w = 120, h = 50, color = red, style = {} }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible', ...style }}>
    <path d={`M ${w*0.95} ${h*0.5}
              C ${w*0.95} ${h*0.15}, ${w*0.6} ${h*0.05}, ${w*0.45} ${h*0.08}
              S ${w*0.05} ${h*0.3},  ${w*0.06} ${h*0.55}
              S ${w*0.3} ${h*0.95}, ${w*0.55} ${h*0.92}
              S ${w*0.92} ${h*0.78}, ${w*0.94} ${h*0.5}
              Z`}
      fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowCurved = ({ w = 100, h = 80, color = red, flip = false, style = {} }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible', transform: flip ? 'scaleX(-1)' : 'none', ...style }}>
    <path d={`M ${w*0.1} ${h*0.15}
              Q ${w*0.5} ${h*0.05}, ${w*0.65} ${h*0.5}
              T ${w*0.85} ${h*0.85}`}
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d={`M ${w*0.85} ${h*0.85} L ${w*0.7} ${h*0.78} M ${w*0.85} ${h*0.85} L ${w*0.78} ${h*0.66}`}
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowWavy = ({ w = 80, color = red, style = {} }) => (
  <svg width={w} height="22" viewBox={`0 0 ${w} 22`} style={{ display: 'inline-block', verticalAlign: 'middle', overflow: 'visible', ...style }}>
    <path d={`M 4 11 Q ${w*0.2} 4, ${w*0.4} 11 T ${w*0.75} 11 L ${w-8} 11`}
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d={`M ${w-8} 11 L ${w-16} 5 M ${w-8} 11 L ${w-16} 17`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const StarBurst = ({ s = 30, color = red, style = {} }) => (
  <svg width={s} height={s} viewBox="0 0 30 30" style={{ display: 'block', overflow: 'visible', ...style }}>
    <g stroke={color} strokeWidth="2" strokeLinecap="round" fill="none">
      <line x1="15" y1="3"  x2="15" y2="27" />
      <line x1="3"  y1="15" x2="27" y2="15" />
      <line x1="6"  y1="6"  x2="24" y2="24" />
      <line x1="24" y1="6"  x2="6"  y2="24" />
    </g>
  </svg>
);

const Checkbox = ({ checked = false, s = 18, color = ink, style = {} }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" style={{ display: 'inline-block', verticalAlign: '-3px', overflow: 'visible', ...style }}>
    <path d="M 2 3 L 17 2 L 18 16 L 3 17 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    {checked && (
      <path d="M 5 9 L 9 13 L 16 4" fill="none" stroke={red} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

const Strikethrough = ({ w = 100, color = red, style = {} }) => (
  <svg width={w} height="6" viewBox={`0 0 ${w} 6`} style={{ display: 'block', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-2px)', overflow: 'visible', ...style }}>
    <path d={`M 2 3 Q ${w*0.3} 1, ${w*0.5} 3 T ${w-2} 3`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Bracket = ({ h = 100, side = 'left', color = ink, style = {} }) => {
  const w = 18;
  const d = side === 'left'
    ? `M ${w-2} 3 Q 2 4, 3 ${h*0.5} T ${w-2} ${h-3}`
    : `M 3 3 Q ${w-2} 4, ${w-3} ${h*0.5} T 3 ${h-3}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', ...style }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

const TornEdge = ({ w = 600, color = '#fdfcf6', flip = false, style = {} }) => {
  const seg = 18;
  const pts = [];
  for (let i = 0; i <= seg; i++) {
    const x = (i / seg) * w;
    const y = 4 + (((i * 37) % 11) - 5) * 0.9 + (((i * 13) % 7) - 3) * 0.6;
    pts.push([x, Math.max(2, y)]);
  }
  let d = `M 0 14 L 0 ${pts[0][1]} `;
  for (const [x, y] of pts) d += `L ${x} ${y} `;
  d += `L ${w} 14 Z`;
  return (
    <svg width={w} height="14" viewBox={`0 0 ${w} 14`} preserveAspectRatio="none"
      style={{ display: 'block', transform: flip ? 'scaleY(-1)' : 'none', ...style }}>
      <path d={d} fill={color} />
    </svg>
  );
};

const Tape = ({ w = 100, color = '#f7d36b', angle = -8, style = {} }) => (
  <div style={{
    width: w, height: 22,
    background: `${color}cc`,
    transform: `rotate(${angle}deg)`,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 9px)`,
    clipPath: 'polygon(2% 30%, 98% 0%, 100% 70%, 0% 100%)',
    ...style,
  }} />
);

const StickyTag = ({ children, color = '#f7d36b', angle = -2, style = {} }) => (
  <span style={{
    display: 'inline-block', padding: '4px 10px',
    background: color, color: ink,
    fontFamily: '"Patrick Hand", "Caveat", sans-serif',
    fontSize: 16, lineHeight: 1.1,
    transform: `rotate(${angle}deg)`,
    boxShadow: '1px 1.5px 0 rgba(0,0,0,0.1)',
    ...style,
  }}>{children}</span>
);

const Margin = ({ children, angle = -3, color = red, style = {} }) => (
  <div style={{
    fontFamily: '"Caveat", "Patrick Hand", sans-serif',
    fontSize: 22, lineHeight: 1.15, color,
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'left center',
    ...style,
  }}>{children}</div>
);

const Marker = ({ children, color = '#fff48a' }) => (
  <span style={{
    background: `linear-gradient(180deg, transparent 50%, ${color} 50%, ${color} 92%, transparent 92%)`,
    padding: '0 2px',
  }}>{children}</span>
);

window.Scribbles = {
  Underline, DoubleUnderline, ScribbleCircle,
  ArrowCurved, ArrowWavy, StarBurst, Checkbox,
  Strikethrough, Bracket, TornEdge, Tape, StickyTag,
  Margin, Marker, COL: { ink, red, blue, pencil },
};
