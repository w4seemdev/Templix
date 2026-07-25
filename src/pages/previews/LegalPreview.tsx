/* ============================================================
   LAW & CO - Attorneys at law template
   Deep navy + gold · authoritative, editorial
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const NAVY = '#0f1923';
const GOLD = '#b8960c';
const INK = '#111827';
const MUTED = '#6b7280';
const BORDER = '#e5e7eb';
const FAINT = '#f7f6f2';

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

const nav = ['Practice', 'Attorneys', 'Results', 'Contact'];

const areas = [
  { icon: 'building', name: 'Corporate Law', desc: 'M&A, joint ventures, restructuring, and governance for mid-market and Fortune 500 companies.' },
  { icon: 'scale', name: 'Commercial Litigation', desc: 'Trial-tested advocates for complex disputes, arbitration, and appellate proceedings.' },
  { icon: 'briefcase', name: 'Employment & Labor', desc: 'Wrongful termination, discrimination, wage claims, and executive employment agreements.' },
  { icon: 'home', name: 'Real Estate', desc: 'Commercial acquisitions, leasing, development, and real estate finance transactions.' },
  { icon: 'bulb', name: 'Intellectual Property', desc: 'Trademark, patent, copyright, and trade-secret protection for your ideas and brand.' },
  { icon: 'globe', name: 'International', desc: 'Cross-border transactions, regulatory compliance, and global dispute resolution.' },
];

const stats = [
  { v: '$4B+', l: 'In transactions' },
  { v: '98%', l: 'Case success rate' },
  { v: '25+', l: 'Years of practice' },
  { v: '180+', l: 'Industry awards' },
];

const attorneys = [
  { name: 'Margaret L. Hayes', role: 'Senior Partner', spec: 'Corporate Law', bar: 'NY Bar · 2001', c1: '#0f1923', c2: '#334155' },
  { name: 'David K. Okafor', role: 'Partner', spec: 'Litigation', bar: 'NY Bar · 2008', c1: '#7c2d12', c2: '#b8960c' },
  { name: 'Sofia Reyes', role: 'Associate', spec: 'Employment Law', bar: 'CA Bar · 2015', c1: '#1e3a5f', c2: '#64748b' },
];

const results = [
  { amt: '$120M', desc: 'Recovered in a cross-border breach-of-contract arbitration for a manufacturing client.' },
  { amt: 'Dismissed', desc: 'Class-action securities claim dismissed with prejudice at the pleadings stage.' },
  { amt: '$45M', desc: 'Negotiated acquisition and integration of a regional healthcare group.' },
];

function AreaIcon({ name }: { name: string }) {
  const s = { fill: 'none', stroke: GOLD, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...s}>
      {name === 'building' && <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" /></>}
      {name === 'scale' && <><path d="M12 3v18M7 21h10M4 8h16M4 8l-2 6a3 3 0 0 0 6 0zM20 8l-2 6a3 3 0 0 0 6 0z" /></>}
      {name === 'briefcase' && <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" /></>}
      {name === 'home' && <path d="M4 10l8-6 8 6v10a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />}
      {name === 'bulb' && <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z" /></>}
      {name === 'globe' && <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>}
    </svg>
  );
}

function Portrait({ c1, c2, name, tall }: { c1: string; c2: string; name: string; tall?: boolean }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return (
    <div style={{ aspectRatio: tall ? '4 / 5' : '1 / 1', background: `linear-gradient(160deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '0.04em', opacity: 0.9 }}>{initials}</span>
    </div>
  );
}

export default function LegalPreview() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 2.5rem';

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: NAVY }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>LAW &amp; CO</span>
            <span style={{ display: 'block', fontSize: '9px', color: '#9ca3af', letterSpacing: '0.22em', marginTop: '-2px', fontFamily: 'system-ui, sans-serif' }}>ATTORNEYS AT LAW</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '2rem' }}>{nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '12px', fontWeight: 500, color: '#9ca3af', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: '3px', padding: m ? '9px 14px' : '10px 20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>{m ? 'Consult' : 'Free consultation'}</button>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '3px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: '#fff', display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
            {nav.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '12px', fontWeight: 500, color: '#e5e7eb', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(120deg, ${NAVY} 55%, #1c2f40 100%)`, position: 'relative', overflow: 'hidden' }}>
        <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="rgba(184,150,12,0.14)" strokeWidth="0.5" style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', display: m ? 'none' : 'block' }}>
          <path d="M12 3v18M7 21h10M4 8h16M4 8l-2 6a3 3 0 0 0 6 0zM20 8l-2 6a3 3 0 0 0 6 0z" />
        </svg>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3rem 1.25rem 3.5rem' : '5.5rem 2.5rem', position: 'relative' }}>
          <div style={{ maxWidth: '620px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: GOLD, textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif' }}>Founded 1998 · New York · Los Angeles</p>
            <h1 style={{ fontSize: m ? '2.3rem' : 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, margin: '0 0 1.25rem' }}>
              Principled counsel.<br />Proven results.
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 2rem', maxWidth: '500px', fontFamily: 'system-ui, sans-serif' }}>
              For 25 years, Law &amp; Co has represented clients in more than $4 billion of transactions and high-stakes litigation across the United States.
            </p>
            <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: '3px', padding: '13px 26px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Schedule a consultation</button>
              <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '13px 26px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Our practice</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: GOLD }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '1.5rem 1.25rem' : '1.75rem 2.5rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.25rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: m ? '1.5rem' : '1.75rem', fontWeight: 800, color: '#fff', margin: '0 0 2px' }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practice areas */}
      <section id="Practice" style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.5rem', fontFamily: 'system-ui, sans-serif' }}>Practice areas</p>
        <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 2.5rem' }}>Comprehensive counsel for complex matters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
          {areas.map(a => (
            <div key={a.name} style={{ padding: '2rem', border: `1px solid ${BORDER}`, borderTop: `3px solid ${GOLD}`, background: '#fff' }}>
              <div style={{ marginBottom: '1rem' }}><AreaIcon name={a.icon} /></div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 0.6rem' }}>{a.name}</h3>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.75, margin: '0 0 1.1rem', fontFamily: 'system-ui, sans-serif' }}>{a.desc}</p>
              <span style={{ fontSize: '12px', color: GOLD, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Attorneys */}
      <section id="Attorneys" style={{ background: FAINT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2.5rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.5rem', fontFamily: 'system-ui, sans-serif' }}>Our attorneys</p>
          <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 2.5rem' }}>Experience you can rely on</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.75rem' }}>
            {attorneys.map(a => (
              <div key={a.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                <Portrait c1={a.c1} c2={a.c2} name={a.name} tall />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{a.name}</h3>
                  <p style={{ fontSize: '13px', color: GOLD, fontWeight: 600, margin: '0 0 4px', fontFamily: 'system-ui, sans-serif' }}>{a.role} · {a.spec}</p>
                  <p style={{ fontSize: '12px', color: MUTED, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{a.bar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="Results" style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.5rem', fontFamily: 'system-ui, sans-serif' }}>Representative results</p>
        <h2 style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 2.5rem' }}>A record of decisive outcomes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.5rem' }}>
          {results.map(r => (
            <div key={r.amt} style={{ padding: '2rem', background: NAVY, color: '#fff' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: GOLD, margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>{r.amt}</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: 0, fontFamily: 'system-ui, sans-serif' }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: MUTED, marginTop: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>Prior results do not guarantee a similar outcome. Matters described are illustrative.</p>
      </section>

      {/* CTA */}
      <section id="Contact" style={{ background: `linear-gradient(120deg, ${NAVY}, #1c2f40)` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: m ? '3rem 1.25rem' : '4.5rem 2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: m ? '1.8rem' : '2.4rem', fontWeight: 700, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>Discuss your matter in confidence</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>Every consultation is privileged and free of charge. Tell us about your situation and we will respond within one business day.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
            <button style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: '3px', padding: '13px 28px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Request consultation</button>
            <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '13px 28px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Call (212) 555-0180</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0a1119', padding: m ? '2.5rem 0 1.75rem' : '3rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>LAW &amp; CO</span>
            <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginTop: '2px', fontFamily: 'system-ui, sans-serif' }}>1180 Avenue of the Americas, New York, NY</span>
          </div>
          <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, fontFamily: 'system-ui, sans-serif' }}>© 2026 Law &amp; Co LLP · Attorney advertising</p>
        </div>
      </footer>
    </div>
  );
}
