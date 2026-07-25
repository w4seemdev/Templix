/* ============================================================
   ARIA - Fine-art & wedding photography
   Ivory editorial, serif display, muted terracotta accent
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

const IVORY = '#faf7f1';
const INK = '#2a2520';
const MUTE = '#8c8378';
const CLAY = '#b06a4f';
const LINE = 'rgba(42,37,32,0.1)';
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

const NAV = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Weddings', href: '#weddings' },
  { label: 'Investment', href: '#investment' },
  { label: 'Contact', href: '#contact' },
];

const FRAMES = [
  'linear-gradient(150deg,#d9c4b0,#a98a72)',
  'linear-gradient(150deg,#c9d2cb,#8ba090)',
  'linear-gradient(150deg,#e2cabc,#bd917c)',
  'linear-gradient(150deg,#cdc3d1,#9d8ea6)',
  'linear-gradient(150deg,#dcd3c2,#b3a688)',
  'linear-gradient(150deg,#d6c2be,#ab8481)',
];

export default function AriaPhotographyPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: IVORY, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(250,247,241,0.9)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '26px', letterSpacing: '0.14em', color: INK, textDecoration: 'none' }}>ARIA</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2.25rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#contact" style={{ border: `1px solid ${INK}`, borderRadius: '2px', padding: '9px 20px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK, textDecoration: 'none' }}>Enquire</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '4px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '1.5px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: mobile ? '3.5rem 1.25rem 2.5rem' : '6rem 2rem 3.5rem' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: CLAY }}>Wedding &amp; portrait photography · Tuscany</span>
        <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '3rem' : 'clamp(3.2rem,8vw,6rem)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.05, margin: '1.5rem 0 1.5rem' }}>
          Timeless images of<br /><span style={{ fontStyle: 'italic', color: CLAY }}>the love you live.</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: MUTE, lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
          I&rsquo;m Elena - a photographer capturing warm, unhurried, film-inspired portraits for couples who want to remember exactly how it felt.
        </p>
      </section>

      <section id="portfolio" style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '0 1.25rem 3.5rem' : '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: mobile ? '0.6rem' : '1rem' }}>
          {FRAMES.map((g, i) => (
            <div key={i} style={{ aspectRatio: i % 2 === 0 ? '4/5' : '4/3', borderRadius: '3px', background: g }} />
          ))}
        </div>
      </section>

      <section id="weddings" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5.5rem 0', background: '#f3ede3' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '2.5rem' : '4.5rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', borderRadius: '3px', background: FRAMES[2] }} />
          <div>
            <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CLAY }}>The experience</span>
            <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : '2.9rem', fontWeight: 500, letterSpacing: '-0.01em', margin: '0.75rem 0 1.25rem' }}>A calm, guided day from start to last dance</h2>
            <p style={{ fontSize: '15px', color: MUTE, lineHeight: 1.85, margin: '0 0 1.75rem' }}>
              We begin months before with a plan built around your story. On the day I stay quietly present - gently guiding when it helps, and stepping back when the real moments arrive on their own.
            </p>
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {['Pre-wedding consultation & timeline', 'Two photographers, up to 10 hours', 'Hand-edited gallery within 4 weeks', 'Heirloom album, designed with you'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: CLAY, fontFamily: SERIF, fontSize: '20px', lineHeight: 1 }}>·</span>
                  <span style={{ fontSize: '14px', color: INK }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: mobile ? '1.5rem' : '2rem', lineHeight: 1.5, color: INK, margin: '0 0 1.5rem' }}>
            &ldquo;Elena felt less like a photographer and more like a friend who happened to make the most beautiful pictures we&rsquo;ve ever seen of ourselves.&rdquo;
          </p>
          <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTE }}>Sofia &amp; Marco - Val d&rsquo;Orcia</p>
        </div>
      </section>

      <section id="investment" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : '2.9rem', fontWeight: 500, textAlign: 'center', margin: '0 0 2.5rem' }}>Investment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {[
              { t: 'Elopement', p: '€2,400', d: 'Up to 4 hours · online gallery · 250+ images' },
              { t: 'The Full Day', p: '€3,900', d: 'Up to 10 hours · two shooters · fine-art album' },
              { t: 'Destination', p: '€5,600', d: 'Multi-day · travel included · film & digital' },
            ].map((p, i) => (
              <div key={p.t} style={{ border: `1px solid ${i === 1 ? CLAY : LINE}`, borderRadius: '4px', padding: '2rem 1.75rem', textAlign: 'center', background: i === 1 ? '#f6efe6' : 'transparent' }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTE, marginBottom: '1rem' }}>{p.t}</div>
                <div style={{ fontFamily: SERIF, fontSize: '2.6rem', fontWeight: 500, color: i === 1 ? CLAY : INK }}>{p.p}</div>
                <p style={{ fontSize: '13px', color: MUTE, lineHeight: 1.7, margin: '0.75rem 0 1.75rem' }}>{p.d}</p>
                <a href="#contact" style={{ display: 'block', padding: '11px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', background: i === 1 ? CLAY : 'transparent', color: i === 1 ? IVORY : INK, border: `1px solid ${i === 1 ? CLAY : INK}` }}>Check my date</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem', background: '#f3ede3' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.4rem' : '3.4rem', fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 1rem' }}>Let&rsquo;s begin</h2>
          <p style={{ color: MUTE, fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 2.25rem' }}>Tell me your date and your story. I take a limited number of weddings each year.</p>
          <a href="#contact" style={{ display: 'inline-block', background: INK, color: IVORY, borderRadius: '3px', padding: '14px 34px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>hello@aria-studio.com</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '20px', letterSpacing: '0.14em' }}>ARIA</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Pinterest', 'Journal'].map(s => <a key={s} href="#top" style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '12px', color: 'rgba(42,37,32,0.35)' }}>© {new Date().getFullYear()} Elena Rossi</span>
        </div>
      </footer>
    </div>
  );
}
