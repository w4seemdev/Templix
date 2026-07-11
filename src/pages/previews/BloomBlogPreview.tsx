/* ============================================================
   BLOOM — Lifestyle blog & magazine
   Warm cream, serif display, blush + sage accents
   Self-contained, responsive single-page site
   ============================================================ */
import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const CREAM = '#fbf7f0';
const INK = '#33302b';
const MUTE = '#8f887d';
const BLUSH = '#c9756b';
const SAGE = '#7a8b6f';
const LINE = 'rgba(51,48,43,0.09)';
const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Living', href: '#latest' },
  { label: 'Food', href: '#latest' },
  { label: 'Travel', href: '#latest' },
  { label: 'About', href: '#about' },
];

const posts = [
  { t: 'A slow morning ritual that changed how I work', cat: 'Living', read: '6 min', g: 'linear-gradient(150deg,#e7cfc2,#c99f8c)', a: 'Maya Ford' },
  { t: 'One-pot autumn minestrone worth the wait', cat: 'Food', read: '8 min', g: 'linear-gradient(150deg,#d3ddc6,#93a683)', a: 'Ines Park' },
  { t: 'Three days off-grid in the Dolomites', cat: 'Travel', read: '11 min', g: 'linear-gradient(150deg,#cdd7de,#8ea3b0)', a: 'Leo Márquez' },
  { t: 'The case for keeping a paper notebook', cat: 'Living', read: '5 min', g: 'linear-gradient(150deg,#e3d4c0,#bfa07e)', a: 'Maya Ford' },
  { t: 'Small-batch marmalade, two ways', cat: 'Food', read: '7 min', g: 'linear-gradient(150deg,#eccfb5,#d09a6a)', a: 'Ines Park' },
  { t: 'How to pack for two weeks in one bag', cat: 'Travel', read: '9 min', g: 'linear-gradient(150deg,#c9d5d0,#869a90)', a: 'Leo Márquez' },
];

const catColor: Record<string, string> = { Living: BLUSH, Food: SAGE, Travel: '#7f93a8' };

export default function BloomBlogPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: CREAM, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(251,247,240,0.9)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '25px', letterSpacing: '-0.01em', color: INK, textDecoration: 'none' }}>Bloom<span style={{ color: BLUSH }}>.</span></a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#newsletter" style={{ background: INK, color: CREAM, borderRadius: '999px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Subscribe</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '2.5rem 1.25rem' : '4rem 2rem' }}>
        <a href="#latest" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 1fr', gap: mobile ? '1.5rem' : '3rem', alignItems: 'center', textDecoration: 'none', color: INK }}>
          <div style={{ aspectRatio: mobile ? '16/10' : '4/3', borderRadius: '14px', background: 'linear-gradient(150deg,#e7cfc2,#b98873)' }} />
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUSH }}>Featured · Living</span>
            <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : 'clamp(2.4rem,4.5vw,3.6rem)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1, margin: '0.75rem 0 1rem' }}>
              Making a home that feels like a slow exhale
            </h1>
            <p style={{ fontSize: mobile ? '1rem' : '1.1rem', color: MUTE, lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              On soft light, second-hand furniture, and the quiet art of building rooms you actually want to be in.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: SAGE, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>MF</span>
              <span style={{ fontSize: '13px', color: MUTE }}>Maya Ford · 10 min read</span>
            </div>
          </div>
        </a>
      </section>

      <section id="latest" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '1rem 1.25rem 3rem' : '2rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '1.7rem' : '2rem', fontWeight: 500, margin: 0 }}>Latest stories</h2>
          <a href="#latest" style={{ fontSize: '13px', color: BLUSH, textDecoration: 'none', fontWeight: 600 }}>All posts →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: mobile ? '1.75rem' : '2rem' }}>
          {posts.map(p => (
            <a key={p.t} href="#latest" style={{ textDecoration: 'none', color: INK }}>
              <div style={{ aspectRatio: '16/11', borderRadius: '12px', background: p.g, marginBottom: '1rem' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: catColor[p.cat] }}>{p.cat} · {p.read}</span>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.35rem', fontWeight: 500, lineHeight: 1.25, margin: '0.5rem 0 0.5rem' }}>{p.t}</h3>
              <span style={{ fontSize: '13px', color: MUTE }}>by {p.a}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="about" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: '#f4ede2', padding: mobile ? '3rem 1.25rem' : '4.5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SAGE }}>About Bloom</span>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 500, lineHeight: 1.2, margin: '0.75rem 0 1.25rem' }}>A quiet corner of the internet for a life made by hand</h2>
          <p style={{ fontSize: '1.05rem', color: MUTE, lineHeight: 1.85 }}>
            Bloom is a small independent magazine about living well and slowly — from the food on the table to the miles between here and somewhere new. Three writers, one shared belief: the ordinary is worth paying attention to.
          </p>
        </div>
      </section>

      <section id="newsletter" style={{ padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 500, margin: '0 0 0.75rem' }}>The Sunday letter</h2>
          <p style={{ color: MUTE, fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.75rem' }}>One thoughtful essay and a small recipe in your inbox each week. No noise, ever.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', flexDirection: mobile ? 'column' : 'row' }}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, padding: '13px 16px', borderRadius: '999px', border: `1px solid ${LINE}`, background: CREAM, color: INK, fontSize: '14px', outline: 'none' }} />
            <button type="submit" style={{ background: BLUSH, color: CREAM, border: 'none', borderRadius: '999px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 600 }}>Bloom<span style={{ color: BLUSH }}>.</span></span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Pinterest', 'RSS'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(51,48,43,0.35)' }}>© {new Date().getFullYear()} Bloom Magazine</span>
        </div>
      </footer>
    </div>
  );
}
