/* ============================================================
   NESTFIND - Property-search marketplace template
   Confident indigo · listing portal layout
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const INDIGO = '#4f46e5';
const INK = '#141728';
const MUTED = '#64708a';
const BORDER = '#e5e7f2';
const AMBER = '#f59e0b';

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

const nav = ['Buy', 'Rent', 'Sell', 'Agents', 'Guides'];

const listings = [
  { title: 'Maple Ridge Family Home', loc: 'Bellevue, WA', price: '$1,240,000', beds: 4, baths: 3, sqft: '3,100', tag: 'New', c1: '#4f46e5', c2: '#818cf8' },
  { title: 'Harbor View Condo', loc: 'Seattle, WA', price: '$865,000', beds: 2, baths: 2, sqft: '1,450', tag: 'Featured', c1: '#0d9488', c2: '#5eead4' },
  { title: 'Cedar Craftsman Bungalow', loc: 'Portland, OR', price: '$720,000', beds: 3, baths: 2, sqft: '1,980', tag: '', c1: '#ea580c', c2: '#fdba74' },
  { title: 'Lakeside Modern Retreat', loc: 'Lake Oswego, OR', price: '$2,150,000', beds: 5, baths: 4, sqft: '4,600', tag: 'Luxury', c1: '#7c3aed', c2: '#c4b5fd' },
  { title: 'Downtown Loft No. 4', loc: 'Tacoma, WA', price: '$540,000', beds: 1, baths: 1, sqft: '980', tag: 'Price drop', c1: '#0891b2', c2: '#67e8f9' },
  { title: 'Garden Row Townhouse', loc: 'Vancouver, WA', price: '$610,000', beds: 3, baths: 2, sqft: '1,720', tag: '', c1: '#16a34a', c2: '#86efac' },
];

const stats = [
  { v: '12,400+', l: 'Active listings' },
  { v: '8,200+', l: 'Homes sold' },
  { v: '1,400+', l: 'Trusted agents' },
  { v: '4.9★', l: 'Buyer rating' },
];

const agents = [
  { name: 'Dana Whitfield', area: 'Bellevue & Eastside', deals: '210 homes sold', c1: '#4f46e5', c2: '#a5b4fc' },
  { name: 'Marcus Tan', area: 'Downtown Seattle', deals: '178 homes sold', c1: '#0d9488', c2: '#5eead4' },
  { name: 'Priya Anand', area: 'Portland Metro', deals: '156 homes sold', c1: '#db2777', c2: '#f9a8d4' },
];

const steps = [
  { n: '01', t: 'Search with confidence', d: 'Filter by price, schools, commute time, and 40+ neighborhood signals.' },
  { n: '02', t: 'Tour on your schedule', d: 'Book in-person or 3D video tours directly with the listing agent.' },
  { n: '03', t: 'Make a winning offer', d: 'Get local market data and a dedicated agent to negotiate for you.' },
];

function HouseArt({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div style={{ aspectRatio: '3 / 2', background: `linear-gradient(135deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
        <path d="M20 44 L60 18 L100 44 V72 H20 Z" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="52" y="52" width="16" height="20" fill="none" stroke="#fff" strokeWidth="2.5" />
        <rect x="30" y="50" width="12" height="10" fill="none" stroke="#fff" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Avatar({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: `linear-gradient(135deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: '#fff', fontSize: '19px', fontWeight: 800 }}>{initials}</span>
    </div>
  );
}

export default function RealEstatePreview() {
  const m = useIsMobile();
  const [tab, setTab] = useState('Buy');
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f7f8fc', color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round"><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>Nest<span style={{ color: INDIGO }}>Find</span></span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.6rem' }}>{nav.map(l => <a key={l} href="#listings" style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button style={{ background: INDIGO, color: '#fff', border: 'none', borderRadius: '10px', padding: m ? '8px 14px' : '9px 18px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>{m ? 'List' : 'List a property'}</button>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: `1px solid ${BORDER}` }}>
            {nav.map(l => <a key={l} href="#listings" onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '15px', fontWeight: 500, color: INK, textDecoration: 'none', borderBottom: `1px solid ${BORDER}` }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero + search */}
      <section style={{ background: `linear-gradient(135deg, ${INK} 0%, #2e2a6e 100%)`, padding: m ? '2.75rem 1.25rem 3rem' : '4.5rem 2rem 4rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: m ? '2.1rem' : 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#fff', margin: '0 0 1rem' }}>
            Find the place<br />you&apos;ll call home
          </h1>
          <p style={{ fontSize: m ? '1rem' : '1.1rem', color: 'rgba(255,255,255,0.72)', margin: '0 auto 2.25rem', maxWidth: '520px', lineHeight: 1.6 }}>
            Search 12,000+ homes across the Pacific Northwest with real neighborhood data and agents who actually pick up the phone.
          </p>
          <div style={{ background: '#fff', borderRadius: '16px', padding: m ? '0.85rem' : '1rem', boxShadow: '0 24px 60px rgba(0,0,0,0.35)', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '0.85rem' }}>
              {['Buy', 'Rent', 'Sell'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 18px', borderRadius: '9px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', background: tab === t ? INDIGO : '#f1f2f9', color: tab === t ? '#fff' : MUTED }}>{t}</button>
              ))}
            </div>
            <div style={{ display: m ? 'grid' : 'flex', gridTemplateColumns: m ? '1fr' : undefined, gap: '8px' }}>
              <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                <span style={{ fontSize: '14px', color: MUTED }}>City, neighborhood, or ZIP…</span>
              </div>
              <div style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: MUTED, fontWeight: 500 }}>Any price</div>
              <button style={{ background: INDIGO, color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: m ? '1.75rem 1.25rem' : '2rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.25rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: m ? '1.6rem' : '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: INDIGO }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '3px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" style={{ maxWidth: '1180px', margin: '0 auto', padding: m ? '3rem 1.25rem' : '4.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: m ? '1.75rem' : '2.5rem' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>Featured homes</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0' }}>Just listed near you</h2>
          </div>
          {!m && <button style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', color: INK }}>View all listings</button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.4rem' }}>
          {listings.map(l => (
            <div key={l.title} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <div style={{ position: 'relative' }}>
                <HouseArt c1={l.c1} c2={l.c2} />
                {l.tag && <span style={{ position: 'absolute', top: '12px', left: '12px', background: l.tag === 'Luxury' ? AMBER : l.tag === 'Price drop' ? '#ef4444' : '#fff', color: l.tag === 'Luxury' ? '#451a03' : l.tag === 'Price drop' ? '#fff' : INK, fontSize: '11px', fontWeight: 700, padding: '4px 11px', borderRadius: '9999px' }}>{l.tag}</span>}
              </div>
              <div style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '1.35rem', fontWeight: 800, color: INK, margin: '0 0 5px', letterSpacing: '-0.02em' }}>{l.price}</p>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{l.title}</h3>
                <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 0.9rem' }}>{l.loc}</p>
                <div style={{ display: 'flex', gap: '1.25rem', paddingTop: '0.9rem', borderTop: `1px solid ${BORDER}`, fontSize: '13px', color: MUTED }}>
                  <span><strong style={{ color: INK }}>{l.beds}</strong> beds</span>
                  <span><strong style={{ color: INK }}>{l.baths}</strong> baths</span>
                  <span><strong style={{ color: INK }}>{l.sqft}</strong> sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: m ? '3rem 0' : '4.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>How NestFind works</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0' }}>From search to keys in hand</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '1.25rem' : '2rem' }}>
            {steps.map(s => (
              <div key={s.n} style={{ padding: '1.75rem', border: `1px solid ${BORDER}`, borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: INDIGO, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{s.n}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: m ? '3rem 1.25rem' : '4.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>Top agents</span>
          <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0' }}>Local experts on your side</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.4rem' }}>
          {agents.map(a => (
            <div key={a.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.6rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Avatar c1={a.c1} c2={a.c2} name={a.name} />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 3px' }}>{a.name}</h3>
                <p style={{ fontSize: '13px', color: INDIGO, fontWeight: 600, margin: '0 0 3px' }}>{a.area}</p>
                <p style={{ fontSize: '12px', color: MUTED, margin: 0 }}>{a.deals}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: m ? '0 1.25rem 3.5rem' : '0 2rem 5rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${INDIGO}, #7c3aed)`, borderRadius: '22px', padding: m ? '2.5rem 1.5rem' : '3.5rem 3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.6vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 0.9rem' }}>Thinking of selling?</h2>
            <p style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.8)', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.6 }}>Get a free, no-obligation home valuation in 60 seconds and see what buyers are paying nearby.</p>
            <button style={{ background: '#fff', color: INDIGO, border: 'none', borderRadius: '12px', padding: '13px 30px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Get my home value</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, padding: m ? '2.5rem 0 1.75rem' : '3rem 0 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round"><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800 }}>Nest<span style={{ color: INDIGO }}>Find</span></span>
          </div>
          <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>Homes across WA · OR · ID</p>
          <p style={{ fontSize: '13px', color: '#9aa3ba', margin: 0 }}>© 2026 NestFind, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
