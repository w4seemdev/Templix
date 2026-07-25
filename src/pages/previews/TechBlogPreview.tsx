/* ============================================================
   OVERFLOW - Engineering blog
   Near-black dev aesthetic, cyan + indigo accents, mono labels
   Self-contained, responsive single-page site
   ============================================================ */
import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const BG = '#0b0e14';
const CARD = '#12161f';
const FG = '#e6e9ef';
const MUTE = '#7b8494';
const CYAN = '#37d0c4';
const INDIGO = '#7c8cf8';
const LINE = 'rgba(230,233,239,0.08)';
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

const NAV = [
  { label: 'Latest', href: '#latest' },
  { label: 'Engineering', href: '#latest' },
  { label: 'Architecture', href: '#latest' },
  { label: 'Newsletter', href: '#newsletter' },
];

const posts = [
  { t: 'Designing a type-safe event bus in 120 lines', tag: 'TypeScript', read: '9 min', date: '2026-05-14', a: 'Dan Meyer', accent: CYAN },
  { t: 'We deleted our Redux store. Here is what replaced it', tag: 'Frontend', read: '12 min', date: '2026-05-09', a: 'Yuki Tanaka', accent: INDIGO },
  { t: 'A pragmatic guide to database connection pooling', tag: 'Backend', read: '15 min', date: '2026-05-03', a: 'Priya Rao', accent: '#f0a35e' },
  { t: 'Rendering 100k rows without dropping a frame', tag: 'Performance', read: '11 min', date: '2026-04-27', a: 'Marco Silva', accent: CYAN },
  { t: 'Zero-downtime migrations for the anxious engineer', tag: 'Databases', read: '10 min', date: '2026-04-21', a: 'Priya Rao', accent: INDIGO },
  { t: 'The observability stack that actually paged us right', tag: 'Infra', read: '13 min', date: '2026-04-15', a: 'Dan Meyer', accent: '#f0a35e' },
];

export default function TechBlogPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(11,14,20,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: MONO, fontWeight: 700, fontSize: '17px', color: FG, textDecoration: 'none' }}><span style={{ color: CYAN }}>{'>'}</span> overflow</a>
          {!mobile && <nav style={{ display: 'flex', gap: '1.75rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#newsletter" style={{ background: CYAN, color: BG, borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Subscribe</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '3rem 1.25rem 2rem' : '5rem 2rem 3rem' }}>
        <span style={{ fontFamily: MONO, fontSize: '13px', color: CYAN }}>// notes on building software that lasts</span>
        <h1 style={{ fontSize: mobile ? '2.4rem' : 'clamp(2.6rem,6vw,4.4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '1rem 0 1.25rem', maxWidth: '820px' }}>
          Deep-dives on the systems behind fast, reliable products.
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: MUTE, lineHeight: 1.7, maxWidth: '560px' }}>
          Practical engineering essays from a small team shipping to millions of users - architecture, performance, and the trade-offs nobody warns you about.
        </p>
      </section>

      <section id="latest" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '1rem 1.25rem 3.5rem' : '2rem 2rem 5rem' }}>
        <a href="#latest" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '1.25rem' : '2.5rem', alignItems: 'center', textDecoration: 'none', color: FG, border: `1px solid ${LINE}`, borderRadius: '16px', padding: mobile ? '1.25rem' : '2rem', background: CARD, marginBottom: '3rem' }}>
          <div style={{ aspectRatio: '16/10', borderRadius: '10px', background: `linear-gradient(135deg,${INDIGO},${CYAN})`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 22px)` }} />
          </div>
          <div>
            <span style={{ fontFamily: MONO, fontSize: '12px', color: CYAN }}>FEATURED · Distributed Systems · 18 min</span>
            <h2 style={{ fontSize: mobile ? '1.7rem' : '2.1rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0.75rem 0 0.9rem' }}>How we cut p99 latency by 60% with a boring cache</h2>
            <p style={{ fontSize: '15px', color: MUTE, lineHeight: 1.7, margin: '0 0 1.25rem' }}>No new database, no rewrite - just careful measurement, one request-coalescing layer, and a very stubborn refusal to guess.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: INDIGO, color: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>DM</span>
              <span style={{ fontSize: '13px', color: MUTE }}>Dan Meyer · 2026-05-16</span>
            </div>
          </div>
        </a>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.5rem' }}>
          {posts.map(p => (
            <a key={p.t} href="#latest" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: FG, border: `1px solid ${LINE}`, borderRadius: '14px', overflow: 'hidden', background: CARD }}>
              <div style={{ height: '6px', background: p.accent }} />
              <div style={{ padding: '1.4rem' }}>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: p.accent }}>{p.tag} · {p.read}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, margin: '0.5rem 0 0.9rem' }}>{p.t}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: MUTE }}>{p.a}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(230,233,239,0.35)' }}>{p.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="newsletter" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: MONO, fontSize: '13px', color: CYAN }}>~/subscribe</span>
          <h2 style={{ fontSize: mobile ? '1.9rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0.75rem 0 0.75rem' }}>The weekly build log</h2>
          <p style={{ color: MUTE, fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.75rem' }}>One in-depth engineering read every Thursday. Join 24,000 developers. No spam, unsubscribe anytime.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', flexDirection: mobile ? 'column' : 'row' }}>
            <input type="email" placeholder="dev@company.com" style={{ flex: 1, fontFamily: MONO, padding: '13px 16px', borderRadius: '9px', border: `1px solid ${LINE}`, background: CARD, color: FG, fontSize: '14px', outline: 'none' }} />
            <button type="submit" style={{ background: CYAN, color: BG, border: 'none', borderRadius: '9px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: MONO, fontSize: '15px', fontWeight: 700 }}><span style={{ color: CYAN }}>{'>'}</span> overflow</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['GitHub', 'RSS', 'Mastodon'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontFamily: MONO, fontSize: '12px', color: 'rgba(230,233,239,0.3)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
