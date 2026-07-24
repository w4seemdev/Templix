/* ============================================================
   LUMEN — Photography portfolio
   Gallery-first, near-black canvas with warm amber accent
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

const BG = '#0a0a0a';
const FG = '#ededea';
const MUTE = '#7c7a74';
const AMBER = '#d9a441';
const LINE = 'rgba(237,237,234,0.08)';

const NAV = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Series', href: '#series' },
  { label: 'Prints', href: '#prints' },
  { label: 'Contact', href: '#contact' },
];

const GRADS = [
  'linear-gradient(160deg,#2b3540,#5c6b74)',
  'linear-gradient(160deg,#4a2f22,#a4713f)',
  'linear-gradient(160deg,#1f3330,#4f7a6a)',
  'linear-gradient(160deg,#33262f,#7c5266)',
  'linear-gradient(160deg,#2e2b1c,#8a7b3e)',
  'linear-gradient(160deg,#22303f,#496b8c)',
];

export default function PhotographyPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontWeight: 700, fontSize: '19px', letterSpacing: '0.32em', color: FG, textDecoration: 'none' }}>LUMEN</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '13px', letterSpacing: '0.04em', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#contact" style={{ fontSize: '13px', fontWeight: 600, color: AMBER, textDecoration: 'none', letterSpacing: '0.04em' }}>Book a session →</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1200px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem 2.5rem' : '6rem 2rem 4rem' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: AMBER }}>Portrait &amp; landscape · Since 2012</span>
        <h1 style={{ fontSize: mobile ? '2.7rem' : 'clamp(3rem,8vw,6rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '1.25rem 0 1.5rem', maxWidth: '900px' }}>
          Light, honestly<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>observed.</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: MUTE, lineHeight: 1.7, maxWidth: '540px' }}>
          Mara Ellison is a documentary and portrait photographer based between Reykjavík and Lisbon, chasing quiet, unrepeatable moments across three continents.
        </p>
      </section>

      <section id="portfolio" style={{ maxWidth: '1200px', margin: '0 auto', padding: mobile ? '0 1.25rem 3.5rem' : '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: mobile ? '0.5rem' : '0.75rem' }}>
          {GRADS.map((g, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: i % 3 === 0 ? '3/4' : '4/5', borderRadius: '4px', overflow: 'hidden', background: g }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)' }} />
              <span style={{ position: 'absolute', left: '12px', bottom: '10px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>Frame {String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="series" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.2rem', fontWeight: 300, letterSpacing: '-0.02em', margin: '0 0 2.25rem' }}>Selected series</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.5rem' }}>
            {[
              { t: 'Northern Silence', d: 'Iceland · 2024', g: GRADS[0] },
              { t: 'City After Rain', d: 'Lisbon · 2023', g: GRADS[3] },
              { t: 'Salt & Field', d: 'Portugal · 2022', g: GRADS[2] },
            ].map(s => (
              <a key={s.t} href="#portfolio" style={{ textDecoration: 'none', color: FG }}>
                <div style={{ aspectRatio: '4/3', borderRadius: '6px', background: s.g, marginBottom: '0.9rem' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 500, margin: '0 0 3px' }}>{s.t}</h3>
                <p style={{ fontSize: '13px', color: MUTE, margin: 0 }}>{s.d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="prints" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: mobile ? '1.7rem' : '2.2rem', fontWeight: 300, letterSpacing: '-0.02em', margin: 0 }}>Fine-art prints</h2>
            <span style={{ fontSize: '13px', color: MUTE }}>Archival giclée · signed &amp; numbered</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {[
              { t: 'A3 Open Edition', p: '€120', d: '297 × 420 mm · Hahnemühle rag' },
              { t: 'A2 Limited /50', p: '€260', d: '420 × 594 mm · museum grade' },
              { t: 'Collector 1/10', p: '€640', d: '700 × 1000 mm · framed to order' },
            ].map((p, i) => (
              <div key={p.t} style={{ border: `1px solid ${i === 1 ? AMBER : LINE}`, borderRadius: '12px', padding: '1.75rem' }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 1 ? AMBER : MUTE, marginBottom: '0.75rem' }}>{p.t}</div>
                <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.4rem' }}>{p.p}</div>
                <p style={{ fontSize: '13px', color: MUTE, lineHeight: 1.6, margin: '0 0 1.5rem' }}>{p.d}</p>
                <a href="#contact" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', background: i === 1 ? AMBER : 'transparent', color: i === 1 ? BG : FG, border: i === 1 ? 'none' : `1px solid ${LINE}` }}>Enquire</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobile ? '2.1rem' : 'clamp(2rem,5vw,3.4rem)', fontWeight: 300, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Let&rsquo;s make something<br />worth keeping.</h2>
          <p style={{ color: MUTE, fontSize: '1.05rem', margin: '0 0 2.25rem' }}>Weddings, editorial commissions, and private sessions worldwide.</p>
          <a href="#contact" style={{ display: 'inline-block', background: AMBER, color: BG, borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>studio@lumen.photo</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '14px', letterSpacing: '0.24em', fontWeight: 700 }}>LUMEN</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Behance', 'Journal'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(237,237,234,0.25)' }}>© {new Date().getFullYear()} Mara Ellison</span>
        </div>
      </footer>
    </div>
  );
}
