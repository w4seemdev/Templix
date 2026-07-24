/* ============================================================
   THE DISPATCH — Personal newsletter landing
   Deep ink canvas, marigold accent, editorial serif
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

const BG = '#16161a';
const CARD = '#1e1e24';
const FG = '#f2f0ea';
const MUTE = '#94908a';
const GOLD = '#ffd23f';
const LINE = 'rgba(242,240,234,0.09)';
const SERIF = "'Fraunces', Georgia, serif";

const NAV = [
  { label: 'Issues', href: '#issues' },
  { label: 'What you get', href: '#inside' },
  { label: 'About', href: '#about' },
];

const issues = [
  { n: '#84', t: 'The compounding power of boring habits', d: 'On systems over goals, and why the dull option usually wins.', read: '6 min' },
  { n: '#83', t: 'How to think in bets', d: 'Decision-making when you can’t see the whole board.', read: '7 min' },
  { n: '#82', t: 'The myth of the productive morning', d: 'Chronotypes, energy, and designing a day that fits you.', read: '5 min' },
];

export default function NewsletterPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(22,22,26,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '22px', letterSpacing: '-0.01em', color: FG, textDecoration: 'none' }}>The Dispatch</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#top" style={{ background: GOLD, color: BG, borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Subscribe</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', padding: mobile ? '3.5rem 1.25rem 3rem' : '6rem 2rem 4rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: GOLD, border: `1px solid ${LINE}`, borderRadius: '999px', padding: '5px 14px', marginBottom: '1.75rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD }} />Every Sunday · Free
        </span>
        <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '2.6rem' : 'clamp(2.8rem,7vw,4.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 1.25rem' }}>
          Ideas that make you<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>think clearer.</span>
        </h1>
        <p style={{ fontSize: mobile ? '1.05rem' : '1.2rem', color: MUTE, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 2rem' }}>
          One essay a week on decisions, focus, and building a working life that doesn&rsquo;t run you into the ground. Read by 38,000 curious people.
        </p>
        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', maxWidth: '440px', margin: '0 auto', flexDirection: mobile ? 'column' : 'row' }}>
          <input type="email" placeholder="you@email.com" style={{ flex: 1, padding: '14px 16px', borderRadius: '10px', border: `1px solid ${LINE}`, background: CARD, color: FG, fontSize: '15px', outline: 'none' }} />
          <button type="submit" style={{ background: GOLD, color: BG, border: 'none', borderRadius: '10px', padding: '14px 24px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Join free</button>
        </form>
        <p style={{ fontSize: '12px', color: 'rgba(242,240,234,0.4)', marginTop: '0.9rem' }}>No spam. Unsubscribe in one click.</p>
      </section>

      <section id="inside" style={{ maxWidth: '1040px', margin: '0 auto', padding: mobile ? '1rem 1.25rem 3.5rem' : '2rem 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
          {[
            { t: 'One clear idea', d: 'A single, well-argued essay — never a link dump or a listicle.' },
            { t: 'Under 7 minutes', d: 'Respect for your time. Tight writing, no padding, no fluff.' },
            { t: 'Genuinely yours', d: 'Written by one person, for real readers. Reply and I read it.' },
          ].map(f => (
            <div key={f.t} style={{ border: `1px solid ${LINE}`, borderRadius: '14px', background: CARD, padding: '1.75rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,210,63,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: GOLD }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>{f.t}</h3>
              <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.65, margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="issues" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '1.9rem' : '2.4rem', fontWeight: 500, margin: '0 0 2rem' }}>Recent issues</h2>
          {issues.map(is => (
            <a key={is.n} href="#top" style={{ display: 'block', textDecoration: 'none', color: FG, borderBottom: `1px solid ${LINE}`, padding: '1.25rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '5px' }}>
                <span style={{ fontFamily: SERIF, fontSize: '15px', color: GOLD }}>{is.n}</span>
                <span style={{ fontSize: '12px', color: MUTE }}>{is.read} read</span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: mobile ? '1.4rem' : '1.7rem', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2, margin: '0 0 0.4rem' }}>{is.t}</h3>
              <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.6, margin: 0 }}>{is.d}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="about" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: mobile ? '1.5rem' : '2rem', lineHeight: 1.45, margin: '0 0 1.5rem' }}>
            &ldquo;The one newsletter I actually open every week. Short, sharp, and it always leaves me thinking.&rdquo;
          </p>
          <p style={{ fontSize: '13px', color: MUTE, margin: '0 0 3rem' }}>— Alicia Vaughn, product lead</p>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 500, margin: '0 0 1rem' }}>Start reading Sunday</h2>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', maxWidth: '440px', margin: '0 auto', flexDirection: mobile ? 'column' : 'row' }}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, padding: '14px 16px', borderRadius: '10px', border: `1px solid ${LINE}`, background: CARD, color: FG, fontSize: '15px', outline: 'none' }} />
            <button type="submit" style={{ background: GOLD, color: BG, border: 'none', borderRadius: '10px', padding: '14px 24px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Join free</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 600 }}>The Dispatch</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Twitter', 'Archive', 'RSS'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(242,240,234,0.3)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
