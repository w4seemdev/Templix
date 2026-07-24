/* ============================================================
   ESTATLY — Luxury real-estate brokerage template
   Sophisticated light theme · navy & brass · serif display
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

type ListingTab = 'Buy' | 'Rent' | 'Sold';

const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const navy = '#0f172a';
const gold = '#b08d57';
const ink = '#475569';
const paper = '#faf8f4';
const line = '#e8e2d6';

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

interface Listing { id: string; title: string; address: string; price: string; beds: number; baths: number; sqft: string; badge: string; c1: string; c2: string; }

const listingsByTab: Record<ListingTab, Listing[]> = {
  Buy: [
    { id: 'b1', title: 'The Larchmont Estate', address: '18 Crescent Hill Rd, The Heights', price: '$2,450,000', beds: 5, baths: 4, sqft: '4,820', badge: 'For Sale', c1: '#1e293b', c2: '#64748b' },
    { id: 'b2', title: 'Willow Lane Craftsman', address: '204 Willow Ln, Old Town', price: '$1,185,000', beds: 4, baths: 3, sqft: '2,940', badge: 'For Sale', c1: '#3f3222', c2: '#b08d57' },
    { id: 'b3', title: 'Skyline Loft No. 9', address: '901 Meridian Tower, Downtown', price: '$845,000', beds: 2, baths: 2, sqft: '1,610', badge: 'New', c1: '#26323f', c2: '#7d8ea0' },
    { id: 'b4', title: 'Casa del Sol Villa', address: '7 Solana Ct, Marina District', price: '$3,200,000', beds: 6, baths: 5, sqft: '5,400', badge: 'For Sale', c1: '#4a3826', c2: '#c8a97a' },
    { id: 'b5', title: 'The Garrison Residence', address: '42 Garrison Ave, Lakeview', price: '$1,640,000', beds: 4, baths: 3, sqft: '3,275', badge: 'Open House', c1: '#22303a', c2: '#6b8290' },
    { id: 'b6', title: 'Glasshouse Modern', address: '310 Ridgeline Dr, The Heights', price: '$2,980,000', beds: 5, baths: 5, sqft: '4,150', badge: 'For Sale', c1: '#2b2b33', c2: '#8a8a96' },
  ],
  Rent: [
    { id: 'r1', title: 'Meridian Two-Bedroom', address: '512 Meridian Tower, Downtown', price: '$4,200/mo', beds: 2, baths: 2, sqft: '1,380', badge: 'For Rent', c1: '#26323f', c2: '#7d8ea0' },
    { id: 'r2', title: 'Old Town Brownstone', address: '88 Cobble St, Old Town', price: '$6,800/mo', beds: 3, baths: 2, sqft: '2,210', badge: 'For Rent', c1: '#3f3222', c2: '#b08d57' },
    { id: 'r3', title: 'Harborline Penthouse', address: '1 Pier View Pl, Marina District', price: '$11,500/mo', beds: 3, baths: 3, sqft: '2,860', badge: 'Featured', c1: '#1e293b', c2: '#64748b' },
  ],
  Sold: [
    { id: 's1', title: 'Ashford Manor', address: '23 Ashford Way, Lakeview', price: '$2,115,000', beds: 5, baths: 4, sqft: '4,030', badge: 'Sold', c1: '#33383e', c2: '#6a6f76' },
    { id: 's2', title: 'The Concord Flat', address: '77 Concord Sq, Downtown', price: '$960,000', beds: 2, baths: 2, sqft: '1,540', badge: 'Sold', c1: '#33383e', c2: '#6a6f76' },
    { id: 's3', title: 'Juniper Hill House', address: '5 Juniper Hill Rd, The Heights', price: '$1,875,000', beds: 4, baths: 3, sqft: '3,420', badge: 'Sold', c1: '#33383e', c2: '#6a6f76' },
  ],
};

const neighborhoods = [
  { name: 'The Heights', listings: 42, median: '$2.1M', c1: '#1e293b', c2: '#7d8ea0' },
  { name: 'Marina District', listings: 31, median: '$1.7M', c1: '#22303a', c2: '#6b8290' },
  { name: 'Old Town', listings: 56, median: '$985K', c1: '#3f3222', c2: '#b08d57' },
  { name: 'Lakeview', listings: 24, median: '$1.4M', c1: '#26323f', c2: '#8a8a96' },
];

const agents = [
  { name: 'Victoria Lang', title: 'Principal Broker', volume: '$310M career sales', c1: '#1e293b', c2: '#64748b' },
  { name: 'Marcus Bell', title: 'Luxury Specialist', volume: '$185M career sales', c1: '#3f3222', c2: '#b08d57' },
  { name: 'Elena Petrov', title: 'Buyer Advocate', volume: '$142M career sales', c1: '#26323f', c2: '#7d8ea0' },
  { name: 'James Okafor', title: 'New Developments', volume: '$98M career sales', c1: '#4a3826', c2: '#c8a97a' },
];

const stats = [
  { value: '$2.4B', label: 'Total sales volume' },
  { value: '1,900+', label: 'Homes sold' },
  { value: '98%', label: 'List-to-sale price' },
  { value: '27', label: 'Years of expertise' },
];

const whyUs = [
  { icon: 'home', title: 'Hyper-Local Expertise', desc: 'Our agents live in the neighborhoods they sell. Street-level knowledge, school-district nuance, and off-market whispers — all working for you.' },
  { icon: 'star', title: 'White-Glove Service', desc: 'From staging consultations to closing-day champagne, every detail is handled by a dedicated team of three per listing.' },
  { icon: 'chart', title: 'Data-Driven Pricing', desc: 'Proprietary comparable analysis across 14 years of transaction data means your home is priced to move — and to maximize.' },
  { icon: 'globe', title: 'Global Buyer Network', desc: 'Listings are syndicated to 40+ international portals and a private registry of 12,000 qualified buyers.' },
];

const searchFields = [
  { label: 'Location', value: 'The Heights, Carraway' },
  { label: 'Property Type', value: 'Single-Family Home' },
  { label: 'Price Range', value: '$800K – $3.5M' },
];

const tabs: ListingTab[] = ['Buy', 'Rent', 'Sold'];

function WhyIcon({ name }: { name: string }) {
  const s = { fill: 'none', stroke: gold, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      {name === 'home' && <path d="M4 10l8-6 8 6v10a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />}
      {name === 'star' && <path d="M12 3l2.6 5.6L21 9.3l-4.5 4.3 1.1 6L12 17l-5.6 2.6 1.1-6L3 9.3l6.4-.7z" />}
      {name === 'chart' && <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>}
      {name === 'globe' && <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>}
    </svg>
  );
}

function Art({ c1, c2, ratio, muted }: { c1: string; c2: string; ratio: string; muted?: boolean }) {
  return (
    <div style={{ aspectRatio: ratio, background: `linear-gradient(150deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden', filter: muted ? 'saturate(0.7)' : 'none' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <path d="M20 82 V40 H50 V82 M55 82 V28 H92 V82 M55 28 L73 14 L92 28" fill="none" stroke="#fff" strokeWidth="1.4" />
        <path d="M28 40 V82 M36 40 V82 M64 34 V82 M74 34 V82 M84 34 V82" fill="none" stroke="#fff" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

function Portrait({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <div style={{ aspectRatio: '4 / 5', background: `linear-gradient(150deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
      <span style={{ color: '#fdfcf9', fontFamily: serif, fontSize: '2.4rem', opacity: 0.9 }}>{initials}</span>
    </div>
  );
}

export default function EstatlyRealEstatePreview() {
  const m = useIsMobile();
  const [tab, setTab] = useState<ListingTab>('Buy');
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: sans, background: paper, color: navy, minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontFamily: serif, fontSize: '24px', fontWeight: 700, color: navy }}>Estatly</span>
            <span style={{ width: '6px', height: '6px', background: gold, borderRadius: '50%', display: 'inline-block' }} />
          </div>
          {!m && <div style={{ display: 'flex', gap: '2.25rem' }}>{['Listings', 'Neighborhoods', 'Agents', 'About', 'Contact'].map(i => <a key={i} href="#listings" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ink, textDecoration: 'none' }}>{i}</a>)}</div>}
          <button style={{ fontFamily: sans, background: navy, color: '#fff', border: 'none', borderRadius: '2px', padding: m ? '9px 14px' : '11px 24px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{m ? 'List' : 'List Your Home'}</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: m ? 'auto' : '86vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, #0b1220 0%, #1c2740 55%, #2a2416 100%)` }} />
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <path d="M40 300 V150 H110 V300 M130 300 V90 H240 V300 M130 90 L185 55 L240 90 M270 300 V170 H360 V300" fill="none" stroke="#d8bf94" strokeWidth="1.5" />
        </svg>
        <div style={{ position: 'relative', textAlign: 'center', padding: m ? '3.5rem 1.25rem' : '5rem 2rem', maxWidth: '900px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#d8bf94', marginBottom: '1.25rem' }}>Carraway County&apos;s Premier Brokerage</p>
          <h1 style={{ fontFamily: serif, fontSize: m ? '2.6rem' : 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 400, color: '#fdfcf9', lineHeight: 1.08, margin: '0 0 1.25rem' }}>
            Find the home your<br />life deserves.
          </h1>
          <p style={{ fontSize: m ? '15px' : '16px', color: 'rgba(253,252,249,0.78)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Curated listings, neighborhood intelligence, and agents who answer the phone. Buying or selling, we&apos;re with you to the keys.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: m ? '2rem' : '3rem' }}>
            <a href="#listings" style={{ background: gold, color: '#fff', borderRadius: '2px', padding: '14px 32px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Browse Listings</a>
            <a href="#agents" style={{ background: 'transparent', color: '#fdfcf9', border: '1px solid rgba(253,252,249,0.5)', borderRadius: '2px', padding: '13px 32px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Meet Our Agents</a>
          </div>
          {/* Search */}
          <div style={{ display: m ? 'grid' : 'flex', gridTemplateColumns: m ? '1fr' : undefined, alignItems: 'stretch', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '4px', overflow: 'hidden', textAlign: 'left', boxShadow: '0 24px 60px rgba(15,23,42,0.35)' }}>
            {searchFields.map(f => (
              <div key={f.label} style={{ flex: 1, padding: '16px 22px', borderRight: m ? 'none' : '1px solid rgba(255,255,255,0.25)', borderBottom: m ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(253,252,249,0.65)', marginBottom: '5px' }}>{f.label}</div>
                <div style={{ fontSize: '14px', color: '#fdfcf9' }}>{f.value}</div>
              </div>
            ))}
            <button style={{ background: navy, color: '#fff', border: 'none', padding: m ? '14px' : '0 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans }}>Search</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: navy }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: m ? '2.5rem 1.25rem' : '3rem 2rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.5rem', color: '#d8bf94', lineHeight: 1, marginBottom: '0.5rem' }}>{s.value}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(253,252,249,0.55)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: m ? '2rem' : '3rem' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Featured Properties</p>
            <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: 0, color: navy }}>Homes worth coming home to</h2>
          </div>
          <div style={{ display: 'inline-flex', border: `1px solid ${line}`, borderRadius: '2px', overflow: 'hidden', background: '#fff' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: m ? '9px 18px' : '10px 28px', border: 'none', cursor: 'pointer', fontFamily: sans, fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', background: tab === t ? navy : 'transparent', color: tab === t ? '#d8bf94' : ink }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: m ? '1.25rem' : '2rem' }}>
          {listingsByTab[tab].map(l => (
            <div key={l.id} style={{ background: '#fff', border: `1px solid ${line}`, borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}>
              <div style={{ position: 'relative' }}>
                <Art c1={l.c1} c2={l.c2} ratio="4 / 3" muted={tab === 'Sold'} />
                <span style={{ position: 'absolute', top: '14px', left: '14px', background: l.badge === 'Sold' ? navy : gold, color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '2px' }}>{l.badge}</span>
                <span style={{ position: 'absolute', bottom: '14px', left: '14px', background: 'rgba(15,23,42,0.85)', color: '#fdfcf9', fontFamily: serif, fontSize: '18px', padding: '7px 14px', borderRadius: '2px' }}>{l.price}</span>
              </div>
              <div style={{ padding: '1.4rem 1.5rem 1.5rem' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.35rem', color: navy }}>{l.title}</h3>
                <p style={{ fontSize: '13px', color: ink, margin: '0 0 1.1rem' }}>{l.address}</p>
                <div style={{ display: 'flex', gap: '1.4rem', borderTop: `1px solid ${line}`, paddingTop: '1rem' }}>
                  <span style={{ fontSize: '12px', color: ink }}><strong style={{ color: navy }}>{l.beds}</strong> Beds</span>
                  <span style={{ fontSize: '12px', color: ink }}><strong style={{ color: navy }}>{l.baths}</strong> Baths</span>
                  <span style={{ fontSize: '12px', color: ink }}><strong style={{ color: navy }}>{l.sqft}</strong> Sq Ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section style={{ background: '#fff', borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '6rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.5rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Where to Live</p>
            <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: '0 0 1rem', color: navy }}>Neighborhoods we know by heart</h2>
            <p style={{ fontSize: '15px', color: ink, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>Four distinct districts, one promise — an agent who can tell you where the morning light falls on every street.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: m ? '0.9rem' : '1.5rem' }}>
            {neighborhoods.map(n => (
              <div key={n.name} style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                <Art c1={n.c1} c2={n.c2} ratio="3 / 4" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0) 35%, rgba(15,23,42,0.85) 100%)' }} />
                <div style={{ position: 'absolute', left: '1.1rem', right: '1.1rem', bottom: '1.1rem' }}>
                  <h3 style={{ fontFamily: serif, fontSize: m ? '1.15rem' : '1.4rem', fontWeight: 400, color: '#fdfcf9', margin: '0 0 0.4rem' }}>{n.name}</h3>
                  <p style={{ fontSize: '11px', color: '#d8bf94', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{n.listings} listings · {n.median}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Estatly */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'minmax(260px, 1fr) 2fr', gap: m ? '2rem' : '4rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Why Estatly</p>
            <h2 style={{ fontFamily: serif, fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 400, margin: '0 0 1.25rem', color: navy, lineHeight: 1.2 }}>A brokerage built on patience, not pressure</h2>
            <p style={{ fontSize: '15px', color: ink, lineHeight: 1.75, margin: 0 }}>The average Estatly client works with us for 11 years across multiple homes. That doesn&apos;t happen by closing fast — it happens by closing right.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {whyUs.map(w => (
              <div key={w.title} style={{ background: '#fff', border: `1px solid ${line}`, borderRadius: '4px', padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><WhyIcon name={w.icon} /></div>
                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 400, margin: '0 0 0.6rem', color: navy }}>{w.title}</h3>
                <p style={{ fontSize: '13.5px', color: ink, lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" style={{ background: '#fff', borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '6rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.5rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>The Team</p>
            <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: 0, color: navy }}>Agents who answer the phone</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: m ? '1.25rem' : '2rem' }}>
            {agents.map(a => (
              <div key={a.name} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '1.25rem' }}><Portrait c1={a.c1} c2={a.c2} name={a.name} /></div>
                <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.3rem', color: navy }}>{a.name}</h3>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, margin: '0 0 0.5rem' }}>{a.title}</p>
                <p style={{ fontSize: '13px', color: ink, margin: 0 }}>{a.volume}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ borderTop: `1px solid ${line}`, background: paper }}>
        <div style={{ maxWidth: '840px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '6rem 2rem', textAlign: 'center' }}>
          <div style={{ fontFamily: serif, fontSize: '4.5rem', color: gold, lineHeight: 0.5, marginBottom: '1.5rem' }}>&ldquo;</div>
          <blockquote style={{ fontFamily: serif, fontSize: m ? '1.35rem' : 'clamp(1.4rem, 2.8vw, 1.9rem)', fontWeight: 400, color: navy, lineHeight: 1.55, margin: '0 0 2.25rem', fontStyle: 'italic' }}>
            We toured 31 homes over eight months and Victoria never once rushed us. When the right one finally appeared, she negotiated $140K under asking. Estatly isn&apos;t a brokerage — it&apos;s an unfair advantage.
          </blockquote>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(150deg, #3f3222, ${gold})`, border: `2px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: serif, fontSize: '18px' }}>AW</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: navy }}>Amara Whitfield</div>
              <div style={{ fontSize: '12px', color: ink }}>Purchased in The Heights, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: navy, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(176,141,87,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '5.5rem 2rem', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d8bf94', marginBottom: '1rem' }}>Thinking of Selling?</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : 'clamp(2rem, 4.5vw, 3.1rem)', fontWeight: 400, color: '#fdfcf9', margin: '0 0 1.25rem', lineHeight: 1.15 }}>Know what your home is really worth.</h2>
          <p style={{ fontSize: '15px', color: 'rgba(253,252,249,0.65)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>Request a complimentary valuation and receive a 22-page market analysis within 48 hours. No obligation, no follow-up calls you didn&apos;t ask for.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: gold, color: '#fff', borderRadius: '2px', padding: '15px 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Get Free Valuation</a>
            <a href="#" style={{ background: 'transparent', color: '#fdfcf9', border: '1px solid rgba(253,252,249,0.35)', borderRadius: '2px', padding: '14px 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Speak to an Agent</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0a1020', padding: m ? '3rem 0 0' : '4rem 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', paddingBottom: m ? '2rem' : '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '1rem' }}>
                <span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700, color: '#fdfcf9' }}>Estatly</span>
                <span style={{ width: '5px', height: '5px', background: gold, borderRadius: '50%', display: 'inline-block' }} />
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(253,252,249,0.45)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>A boutique brokerage serving Carraway County since 1999. Licensed in three states, trusted in every zip code we touch.</p>
              <p style={{ fontSize: '12px', color: 'rgba(253,252,249,0.35)', margin: 0 }}>12 Meridian Plaza, Suite 400<br />Carraway, CA 90210 · (555) 014-7700</p>
            </div>
            {[{ title: 'Explore', links: ['All Listings', 'Neighborhoods', 'New Developments', 'Mortgage Calculator'] }, { title: 'Company', links: ['About Estatly', 'Our Agents', 'Careers', 'Press'] }, { title: 'Resources', links: ['Buyer’s Guide', 'Seller’s Guide', 'Market Reports', 'Contact'] }].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d8bf94', margin: '0 0 1.1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13px', color: 'rgba(253,252,249,0.5)', textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(253,252,249,0.08)', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: 'rgba(253,252,249,0.3)', margin: 0 }}>© 2026 Estatly Realty Group · DRE #01999274</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'LinkedIn', 'YouTube'].map(s => <a key={s} href="#" style={{ fontSize: '12px', color: 'rgba(253,252,249,0.3)', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
