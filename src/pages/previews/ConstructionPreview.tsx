/* ============================================================
   BRIX — Commercial construction & contracting template
   Industrial slate + safety amber
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const SLATE = '#0f172a';
const AMBER = '#f59e0b';
const INK = '#0f172a';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';

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

const nav = ['Services', 'Projects', 'Safety', 'About', 'Contact'];

const services = [
  { icon: 'building', name: 'Commercial', desc: 'Office towers, retail centers, hotels, and industrial facilities delivered turnkey.' },
  { icon: 'home', name: 'Residential', desc: 'Custom homes, multifamily, and mixed-use developments built to last.' },
  { icon: 'bridge', name: 'Infrastructure', desc: 'Bridges, highways, utilities, and public works engineered for scale.' },
  { icon: 'wrench', name: 'Renovation', desc: 'Structural retrofits, tenant improvements, and adaptive re-use projects.' },
];

const stats = [
  { v: '500+', l: 'Projects completed' },
  { v: '$1.2B+', l: 'Total project value' },
  { v: '35+', l: 'Years in business' },
  { v: '98%', l: 'On-time delivery' },
];

const projects = [
  { name: 'Meridian Commercial Plaza', type: 'Commercial', value: '$24M', status: 'Completed', c1: '#0f172a', c2: '#475569' },
  { name: 'Oakwood Residential Complex', type: 'Residential', value: '$8.5M', status: 'Completed', c1: '#7c2d12', c2: '#f59e0b' },
  { name: 'Northgate Bridge Expansion', type: 'Infrastructure', value: '$42M', status: 'In progress', c1: '#1e293b', c2: '#0ea5e9' },
];

const process = [
  { n: '01', t: 'Pre-construction', d: 'Estimating, value engineering, and constructability review before a shovel hits the ground.' },
  { n: '02', t: 'Build', d: 'Self-perform crews, vetted subcontractors, and weekly owner reporting.' },
  { n: '03', t: 'Closeout', d: 'Commissioning, warranties, and a punch list closed before final walkthrough.' },
];

function SvcIcon({ name }: { name: string }) {
  const s = { fill: 'none', stroke: AMBER, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...s}>
      {name === 'building' && <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2M10 22v-4h4v4" /></>}
      {name === 'home' && <path d="M4 10l8-6 8 6v10a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />}
      {name === 'bridge' && <><path d="M2 8h20M4 8v10M20 8v10M8 8v4a4 4 0 0 0 8 0V8M2 18h20" /></>}
      {name === 'wrench' && <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-1.6-1.6z" />}
    </svg>
  );
}

function ProjArt({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div style={{ aspectRatio: '3 / 2', background: `linear-gradient(135deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
        <path d="M15 70 V30 H35 V70 M45 70 V18 H70 V70 M80 70 V38 H105 V70" fill="none" stroke="#fff" strokeWidth="2.5" />
        <path d="M22 30 L30 60 M55 18 L48 55" fill="none" stroke="#fff" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function ConstructionPreview() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: SLATE }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '6px', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SLATE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V10l8-5 8 5v10M9 20v-6h6v6" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '0.02em' }}>BRIX</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '2rem' }}>{nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button style={{ background: AMBER, color: SLATE, border: 'none', borderRadius: '6px', padding: m ? '9px 14px' : '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Request quote</button>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '6px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: '#fff', display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            {nav.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 500, color: '#e2e8f0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(120deg, ${SLATE} 55%, #1e293b 100%)`, position: 'relative', overflow: 'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <path d="M40 300 V120 H120 V300 M160 300 V60 H260 V300 M300 300 V150 H380 V300" fill="none" stroke="#fff" strokeWidth="3" />
        </svg>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3rem 1.25rem 3.5rem' : '5.5rem 2rem', position: 'relative' }}>
          <div style={{ maxWidth: '620px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.18em', color: AMBER, textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>Est. 1988 · Licensed &amp; bonded</p>
            <h1 style={{ fontSize: m ? '2.3rem' : 'clamp(2.5rem, 5.5vw, 3.9rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.08, margin: '0 0 1.25rem' }}>
              Building what<br />matters most
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.1rem', color: '#94a3b8', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: '500px' }}>
              35 years delivering complex commercial, residential, and infrastructure projects on time, on budget, and without shortcuts.
            </p>
            <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button style={{ background: AMBER, color: SLATE, border: 'none', borderRadius: '6px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>View our projects</button>
              <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '13px 26px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Get a free estimate</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: AMBER }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '1.5rem 1.25rem' : '1.75rem 2rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.25rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: m ? '1.5rem' : '1.75rem', fontWeight: 900, color: SLATE, margin: '0 0 2px' }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: 'rgba(15,23,42,0.7)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="Services" style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2rem' }}>
        <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>What we build</h2>
        <p style={{ fontSize: '15px', color: MUTED, margin: '0 0 2.5rem' }}>End-to-end construction from first estimate to final walkthrough.</p>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4,1fr)', gap: '1.25rem' }}>
          {services.map(s => (
            <div key={s.name} style={{ padding: '1.75rem', border: `1px solid ${BORDER}`, borderRadius: '12px', background: '#fff' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><SvcIcon name={s.icon} /></div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 0.5rem' }}>{s.name}</h3>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="Projects" style={{ background: '#f8fafc', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2rem' }}>
          <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 2.5rem' }}>Featured projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.5rem' }}>
            {projects.map(p => (
              <div key={p.name} style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <ProjArt c1={p.c1} c2={p.c2} />
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: p.status === 'Completed' ? '#16a34a' : AMBER, color: p.status === 'Completed' ? '#fff' : SLATE, fontSize: '11px', fontWeight: 700, padding: '4px 11px', borderRadius: '9999px' }}>{p.status}</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{p.name}</h3>
                  <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 0.5rem' }}>{p.type}</p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: AMBER, margin: 0 }}>Contract value · {p.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="About" style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2rem' }}>
        <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 2.5rem' }}>How we deliver</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '1.25rem' : '2rem' }}>
          {process.map(p => (
            <div key={p.n} style={{ borderTop: `3px solid ${AMBER}`, paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: SLATE, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{p.n}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 0.5rem' }}>{p.t}</h3>
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety CTA */}
      <section id="Safety" style={{ background: SLATE }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: m ? '3rem 1.25rem' : '4.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '1.25rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: AMBER }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: AMBER }}>OSHA · 0.4 EMR · Safety first, always</span>
          </div>
          <h2 style={{ fontSize: m ? '1.8rem' : '2.4rem', fontWeight: 800, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>Have a project in mind?</h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>Tell us your scope and timeline. We&apos;ll return a detailed, no-obligation estimate within five business days.</p>
          <button style={{ background: AMBER, color: SLATE, border: 'none', borderRadius: '6px', padding: '13px 30px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Request a free estimate</button>
        </div>
      </section>

      {/* Footer */}
      <footer id="Contact" style={{ background: '#0a0f1a', padding: m ? '2.5rem 0 1.75rem' : '3rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={SLATE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V10l8-5 8 5v10M9 20v-6h6v6" /></svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 900, color: '#fff', letterSpacing: '0.02em' }}>BRIX</span>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>General Contractor · Lic. #C-104882 · Bonded &amp; insured</p>
          <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>© 2026 BRIX Construction Co.</p>
        </div>
      </footer>
    </div>
  );
}
