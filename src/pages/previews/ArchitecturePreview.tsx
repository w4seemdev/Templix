/* ============================================================
   FORMA STUDIO - Architecture practice template
   Minimal editorial · warm stone + off-white
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const STONE = '#1a1a18';
const PAPER = '#f8f8f6';
const MUTED = '#737370';
const LINE = '#e0e0d8';

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

const nav = ['Projects', 'Process', 'Studio', 'Awards', 'Contact'];

const projects = [
  { name: 'Casa Minerva', loc: 'Barcelona, ES', type: 'Residential', year: '2024', c1: '#3a3a34', c2: '#8a8a7e', big: true },
  { name: 'Nexus Office Tower', loc: 'Singapore', type: 'Commercial', year: '2023', c1: '#2b3a3a', c2: '#7d9c9c' },
  { name: 'The Ridge Retreat', loc: 'Aspen, US', type: 'Residential', year: '2023', c1: '#4a3f34', c2: '#b0a082' },
  { name: 'Maritime Cultural Centre', loc: 'Oslo, NO', type: 'Cultural', year: '2022', c1: '#2f3540', c2: '#8590a0' },
];

const stats = [
  { v: '140+', l: 'Projects built' },
  { v: '18', l: 'Countries' },
  { v: '60+', l: 'Awards' },
  { v: '16', l: 'Years' },
];

const process = [
  { n: '01', t: 'Listen', d: 'Every commission begins with the people, the site, and the light - never a template.' },
  { n: '02', t: 'Draw', d: 'We test hundreds of options in model and section before a single line is fixed.' },
  { n: '03', t: 'Build', d: 'We stay on site through construction so the built work matches the drawn intent.' },
];

const awards = [
  { name: 'RIBA International Prize', year: '2024', proj: 'Casa Minerva' },
  { name: 'Dezeen Award - Cultural', year: '2023', proj: 'Maritime Cultural Centre' },
  { name: 'AIA Honor Award', year: '2022', proj: 'The Ridge Retreat' },
  { name: 'Architizer A+ Award', year: '2021', proj: 'Nexus Office Tower' },
];

function ProjArt({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(150deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
        <path d="M10 90 V35 H45 V90 M45 55 H80 V90 M45 35 L62 20 L80 35" fill="none" stroke="#fff" strokeWidth="1.2" />
        <path d="M18 90 V45 M26 90 V45 M34 90 V45" fill="none" stroke="#fff" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

export default function ArchitecturePreview() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 3rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: STONE, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: PAPER, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: pad, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Forma Studio</span>
          {!m && <nav style={{ display: 'flex', gap: '2.25rem' }}>{nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '11px', color: MUTED, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button style={{ background: STONE, color: PAPER, border: 'none', borderRadius: '2px', padding: m ? '8px 14px' : '9px 18px', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m ? 'Contact' : 'Get in touch'}</button>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '2px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: STONE, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: `1px solid ${LINE}` }}>
            {nav.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '11px', color: STONE, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${LINE}` }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="Studio" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', minHeight: m ? 'auto' : '80vh' }}>
        <div style={{ padding: m ? '3rem 1.25rem 2.5rem' : '6rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: MUTED, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Est. 2008 · Barcelona · New York</p>
          <h1 style={{ fontSize: m ? '2.6rem' : 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.98, margin: '0 0 1.5rem' }}>
            Building<br />with<br />purpose.
          </h1>
          <p style={{ fontSize: m ? '1rem' : '15px', color: MUTED, lineHeight: 1.8, maxWidth: '380px', margin: '0 0 2.25rem' }}>
            We design spaces that inspire. From private residences to cultural institutions, every project is a dialogue between form, function, and place.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button style={{ background: STONE, color: PAPER, border: 'none', borderRadius: '2px', padding: '13px 26px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.06em' }}>View projects</button>
            <button style={{ background: 'transparent', color: STONE, border: `1px solid #c4c4bc`, borderRadius: '2px', padding: '13px 26px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.06em' }}>Our process</button>
          </div>
        </div>
        <div style={{ minHeight: m ? '260px' : 'auto', order: m ? -1 : 0 }}>
          <ProjArt c1="#3a3a34" c2="#9a9a8c" />
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: STONE }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '2rem 1.25rem' : '2.5rem 3rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.5rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: m ? '1.8rem' : '2rem', fontWeight: 800, color: PAPER, margin: '0 0 4px', letterSpacing: '-0.03em' }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: '#8a8a82', margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section id="Projects" style={{ maxWidth: '1280px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, margin: 0 }}>Selected Work</h2>
          <a href="#Projects" style={{ fontSize: '11px', color: MUTED, textDecoration: 'none', letterSpacing: '0.08em' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '2fr 1fr 1fr', gridAutoRows: m ? 'auto' : '260px', gap: '12px' }}>
          {projects.map((p, i) => (
            <div key={p.name} style={{ gridColumn: !m && p.big ? '1' : 'auto', gridRow: !m && p.big ? 'span 2' : 'auto', position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: m ? (p.big ? '300px' : '200px') : 'auto' }}>
              <ProjArt c1={p.c1} c2={p.c2} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.type} · {p.year}</p>
                <h3 style={{ fontSize: i === 0 ? '20px' : '15px', fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{p.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="Process" style={{ background: '#fff', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 3rem' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, margin: '0 0 2.5rem' }}>Our Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '2rem' : '3rem' }}>
            {process.map(p => (
              <div key={p.n}>
                <div style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{p.n}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>{p.t}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.8, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="Awards" style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 3rem' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, margin: '0 0 2rem' }}>Recognition</h2>
        <div>
          {awards.map(a => (
            <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: m ? 'flex-start' : 'center', flexDirection: m ? 'column' : 'row', gap: m ? '4px' : 0, padding: m ? '1.1rem 0' : '1.35rem 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontSize: m ? '1.05rem' : '1.25rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{a.name}</span>
              <span style={{ fontSize: '13px', color: MUTED }}>{a.proj} · {a.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="Contact" style={{ background: STONE }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '5rem 3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: m ? '2rem' : '2.75rem', fontWeight: 800, color: PAPER, letterSpacing: '-0.03em', margin: '0 0 1rem', lineHeight: 1.05 }}>Let&apos;s design<br />something lasting.</h2>
          <p style={{ fontSize: '14px', color: '#a3a39a', maxWidth: '420px', margin: '0 auto 2.25rem', lineHeight: 1.8 }}>We take on a small number of commissions each year. Tell us about your site and ambitions.</p>
          <button style={{ background: PAPER, color: STONE, border: 'none', borderRadius: '2px', padding: '13px 30px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Start a conversation</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#141412', padding: m ? '2.5rem 0' : '2.75rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: PAPER, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Forma Studio</span>
          <p style={{ fontSize: '11px', color: '#6a6a62', margin: 0, letterSpacing: '0.06em' }}>© 2026 Forma Studio · Barcelona · New York</p>
        </div>
      </footer>
    </div>
  );
}
