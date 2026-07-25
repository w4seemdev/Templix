/* ============================================================
   WANDERLINE - Travel journal & guides
   Airy off-white, deep teal + warm sand accents
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

const PAPER = '#f7f5f0';
const INK = '#1f3b3a';
const MUTE = '#6f7d78';
const TEAL = '#0f8177';
const SAND = '#d9915a';
const LINE = 'rgba(31,59,58,0.1)';
const SERIF = "'Playfair Display', Georgia, serif";

const NAV = [
  { label: 'Guides', href: '#guides' },
  { label: 'Destinations', href: '#guides' },
  { label: 'About', href: '#about' },
  { label: 'Newsletter', href: '#newsletter' },
];

const dests = [
  { n: 'Santorini, Greece', region: 'Europe', reads: '14K', d: '10 slow days in the Aegean - the caldera villages worth the climb', g: 'linear-gradient(150deg,#2f7db0,#9fc6dd)' },
  { n: 'Kyoto, Japan', region: 'Asia', reads: '22K', d: 'Temples at dawn, back-alley kissaten, and the last cherry blossoms', g: 'linear-gradient(150deg,#c66a72,#e6b3ad)' },
  { n: 'Chefchaouen, Morocco', region: 'Africa', reads: '9K', d: 'A blue city in the Rif Mountains, and how to reach it by bus', g: 'linear-gradient(150deg,#2f7d8b,#8fc0c6)' },
  { n: 'Patagonia, Chile', region: 'Americas', reads: '18K', d: 'The W trek, unhurried - five days, four refugios, zero regrets', g: 'linear-gradient(150deg,#5b8b5a,#b6cf9f)' },
];

export default function TravelBlogPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(247,245,240,0.9)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '23px', letterSpacing: '-0.01em', color: INK, textDecoration: 'none' }}>Wander<span style={{ color: TEAL }}>line</span></a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#newsletter" style={{ background: TEAL, color: PAPER, borderRadius: '999px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Follow along</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ position: 'relative', maxWidth: '1140px', margin: mobile ? '1.25rem auto 0' : '1.5rem auto 0', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: mobile ? '360px' : '460px', background: 'linear-gradient(135deg,#0f6b74,#39a0a0 55%,#e0b070)', display: 'flex', alignItems: 'flex-end', padding: mobile ? '1.75rem' : '3rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)' }} />
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Field notes · Coastal Vietnam</span>
            <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '2.4rem' : 'clamp(2.6rem,6vw,4.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, margin: '0.75rem 0 1rem' }}>
              The long way to Hội An
            </h1>
            <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '520px' }}>
              Two weeks by motorbike down the coast - lantern-lit alleys, roadside phở, and the case for taking the road with more potholes.
            </p>
          </div>
        </div>
      </section>

      <section id="guides" style={{ maxWidth: '1140px', margin: '0 auto', padding: mobile ? '3rem 1.25rem' : '4.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '1.8rem' : '2.2rem', fontWeight: 700, margin: 0 }}>Latest guides</h2>
          <a href="#guides" style={{ fontSize: '13px', color: TEAL, fontWeight: 600, textDecoration: 'none' }}>Browse all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: mobile ? '1.75rem' : '2rem' }}>
          {dests.map(d => (
            <a key={d.n} href="#guides" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '150px 1fr', gap: '1.25rem', textDecoration: 'none', color: INK, alignItems: 'center' }}>
              <div style={{ aspectRatio: mobile ? '16/9' : '1/1', borderRadius: '14px', background: d.g }} />
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: SAND }}>{d.region} · {d.reads} reads</span>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.2, margin: '0.4rem 0 0.5rem' }}>{d.n}</h3>
                <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.55, margin: 0 }}>{d.d}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: '#eef0e9', padding: mobile ? '3rem 1.25rem' : '4.5rem 2rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.4fr', gap: mobile ? '1.5rem' : '3rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: mobile ? '16/10' : '1/1', borderRadius: '18px', background: 'linear-gradient(150deg,#2f7d8b,#d9915a)' }} />
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEAL }}>Behind Wanderline</span>
            <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 700, lineHeight: 1.2, margin: '0.75rem 0 1rem' }}>34 countries, one carry-on, and a lot of wrong turns</h2>
            <p style={{ fontSize: '1.02rem', color: MUTE, lineHeight: 1.8, margin: '0 0 1.25rem' }}>
              I&rsquo;m Noor - a full-time traveller writing honest, budget-aware guides for people who&rsquo;d rather get lost than tick boxes. Everything here is first-hand and self-funded.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[{ v: '34', l: 'Countries' }, { v: '210+', l: 'Guides' }, { v: '96K', l: 'Readers/mo' }].map(s => (
                <div key={s.l}><div style={{ fontFamily: SERIF, fontSize: '1.9rem', fontWeight: 700, color: INK }}>{s.v}</div><div style={{ fontSize: '12px', color: MUTE }}>{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" style={{ padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 700, margin: '0 0 0.75rem' }}>Postcards</h2>
          <p style={{ color: MUTE, fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.75rem' }}>A short dispatch from the road every other week - one place, one meal, one thing I got wrong.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', flexDirection: mobile ? 'column' : 'row' }}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, padding: '13px 16px', borderRadius: '999px', border: `1px solid ${LINE}`, background: '#fff', color: INK, fontSize: '14px', outline: 'none' }} />
            <button type="submit" style={{ background: TEAL, color: PAPER, border: 'none', borderRadius: '999px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Send me postcards</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700 }}>Wander<span style={{ color: TEAL }}>line</span></span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'YouTube', 'Pinterest'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(31,59,58,0.35)' }}>© {new Date().getFullYear()} Wanderline</span>
        </div>
      </footer>
    </div>
  );
}
