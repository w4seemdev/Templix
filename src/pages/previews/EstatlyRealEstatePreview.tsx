/* ============================================================
   ESTATLY — Real Estate Template
   Sophisticated light theme · navy & brass · serif display
   ============================================================ */

import { useState } from 'react';

type ListingTab = 'Buy' | 'Rent' | 'Sold';

const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const navy = '#0f172a';
const gold = '#b08d57';
const ink = '#475569';
const paper = '#faf8f4';
const line = '#e8e2d6';

interface Listing {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  img: string;
  badge: string;
}

const listingsByTab: Record<ListingTab, Listing[]> = {
  Buy: [
    { id: 'b1', title: 'The Larchmont Estate', address: '18 Crescent Hill Rd, The Heights', price: '$2,450,000', beds: 5, baths: 4, sqft: '4,820', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', badge: 'For Sale' },
    { id: 'b2', title: 'Willow Lane Craftsman', address: '204 Willow Ln, Old Town', price: '$1,185,000', beds: 4, baths: 3, sqft: '2,940', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', badge: 'For Sale' },
    { id: 'b3', title: 'Skyline Loft No. 9', address: '901 Meridian Tower, Downtown', price: '$845,000', beds: 2, baths: 2, sqft: '1,610', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', badge: 'New' },
    { id: 'b4', title: 'Casa del Sol Villa', address: '7 Solana Ct, Marina District', price: '$3,200,000', beds: 6, baths: 5, sqft: '5,400', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', badge: 'For Sale' },
    { id: 'b5', title: 'The Garrison Residence', address: '42 Garrison Ave, Lakeview', price: '$1,640,000', beds: 4, baths: 3, sqft: '3,275', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', badge: 'Open House' },
    { id: 'b6', title: 'Glasshouse Modern', address: '310 Ridgeline Dr, The Heights', price: '$2,980,000', beds: 5, baths: 5, sqft: '4,150', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', badge: 'For Sale' },
  ],
  Rent: [
    { id: 'r1', title: 'Meridian Two-Bedroom', address: '512 Meridian Tower, Downtown', price: '$4,200/mo', beds: 2, baths: 2, sqft: '1,380', img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80', badge: 'For Rent' },
    { id: 'r2', title: 'Old Town Brownstone', address: '88 Cobble St, Old Town', price: '$6,800/mo', beds: 3, baths: 2, sqft: '2,210', img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80', badge: 'For Rent' },
    { id: 'r3', title: 'Harborline Penthouse', address: '1 Pier View Pl, Marina District', price: '$11,500/mo', beds: 3, baths: 3, sqft: '2,860', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', badge: 'Featured' },
  ],
  Sold: [
    { id: 's1', title: 'Ashford Manor', address: '23 Ashford Way, Lakeview', price: '$2,115,000', beds: 5, baths: 4, sqft: '4,030', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', badge: 'Sold' },
    { id: 's2', title: 'The Concord Flat', address: '77 Concord Sq, Downtown', price: '$960,000', beds: 2, baths: 2, sqft: '1,540', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', badge: 'Sold' },
    { id: 's3', title: 'Juniper Hill House', address: '5 Juniper Hill Rd, The Heights', price: '$1,875,000', beds: 4, baths: 3, sqft: '3,420', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', badge: 'Sold' },
  ],
};

const neighborhoods = [
  { name: 'The Heights', listings: 42, median: '$2.1M', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { name: 'Marina District', listings: 31, median: '$1.7M', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { name: 'Old Town', listings: 56, median: '$985K', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80' },
  { name: 'Lakeview', listings: 24, median: '$1.4M', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
];

const agents = [
  { name: 'Victoria Lang', title: 'Principal Broker', volume: '$310M career sales', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' },
  { name: 'Marcus Bell', title: 'Luxury Specialist', volume: '$185M career sales', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80' },
  { name: 'Elena Petrov', title: 'Buyer Advocate', volume: '$142M career sales', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80' },
  { name: 'James Okafor', title: 'New Developments', volume: '$98M career sales', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80' },
];

const stats = [
  { value: '$2.4B', label: 'Total sales volume' },
  { value: '1,900+', label: 'Homes sold' },
  { value: '98%', label: 'List-to-sale price' },
  { value: '27', label: 'Years of expertise' },
];

const whyUs = [
  { icon: '⌂', title: 'Hyper-Local Expertise', desc: 'Our agents live in the neighborhoods they sell. Street-level knowledge, school-district nuance, and off-market whispers — all working for you.' },
  { icon: '✦', title: 'White-Glove Service', desc: 'From staging consultations to closing-day champagne, every detail is handled by a dedicated team of three per listing.' },
  { icon: '◈', title: 'Data-Driven Pricing', desc: 'Proprietary comparable analysis across 14 years of transaction data means your home is priced to move — and to maximize.' },
  { icon: '❖', title: 'Global Buyer Network', desc: 'Listings are syndicated to 40+ international portals and a private registry of 12,000 qualified buyers.' },
];

const searchFields = [
  { label: 'Location', value: 'The Heights, Carraway' },
  { label: 'Property Type', value: 'Single-Family Home' },
  { label: 'Price Range', value: '$800K – $3.5M' },
];

const footerCols = [
  { title: 'Explore', links: ['All Listings', 'Neighborhoods', 'New Developments', 'Mortgage Calculator'] },
  { title: 'Company', links: ['About Estatly', 'Our Agents', 'Careers', 'Press'] },
  { title: 'Resources', links: ['Buyer’s Guide', 'Seller’s Guide', 'Market Reports', 'Contact'] },
];

const tabs: ListingTab[] = ['Buy', 'Rent', 'Sold'];

export default function EstatlyRealEstatePreview() {
  const [tab, setTab] = useState<ListingTab>('Buy');

  return (
    <div style={{ fontFamily: sans, background: paper, color: navy, minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontFamily: serif, fontSize: '24px', fontWeight: 700, letterSpacing: '0.01em', color: navy }}>Estatly</span>
            <span style={{ width: '6px', height: '6px', background: gold, borderRadius: '50%', display: 'inline-block' }} />
          </div>
          <div style={{ display: 'flex', gap: '2.25rem' }}>
            {['Listings', 'Neighborhoods', 'Agents', 'About', 'Contact'].map(item => (
              <a key={item} href="#" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ink, textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
          <button style={{ fontFamily: sans, background: navy, color: '#fff', border: 'none', borderRadius: '2px', padding: '11px 24px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
            List Your Home
          </button>
        </div>
      </nav>

      {/* ── Hero + Glassmorphism Search ── */}
      <section style={{ position: 'relative', height: '88vh', minHeight: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" alt="Luxury home at dusk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.25) 45%, rgba(15,23,42,0.6) 100%)' }} />
        </div>
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 2rem', maxWidth: '900px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#d8bf94', marginBottom: '1.25rem' }}>Carraway County’s Premier Brokerage</p>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem, 6.5vw, 5.25rem)', fontWeight: 400, color: '#fdfcf9', lineHeight: 1.08, margin: '0 0 1.25rem', letterSpacing: '0.005em' }}>
            Find the home your<br />life deserves.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(253,252,249,0.78)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Curated listings, neighborhood intelligence, and agents who answer the phone. Buying or selling, we’re with you to the keys.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#listings" style={{ background: gold, color: '#fff', borderRadius: '2px', padding: '14px 32px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Browse Listings</a>
            <a href="#agents" style={{ background: 'transparent', color: '#fdfcf9', border: '1px solid rgba(253,252,249,0.5)', borderRadius: '2px', padding: '13px 32px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Meet Our Agents</a>
          </div>

          {/* Glass search bar */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '4px', overflow: 'hidden', textAlign: 'left', boxShadow: '0 24px 60px rgba(15,23,42,0.35)' }}>
            {searchFields.map(f => (
              <div key={f.label} style={{ flex: 1, padding: '16px 22px', borderRight: '1px solid rgba(255,255,255,0.25)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(253,252,249,0.65)', marginBottom: '5px' }}>{f.label}</div>
                <div style={{ fontSize: '14px', color: '#fdfcf9', whiteSpace: 'nowrap' }}>{f.value}</div>
              </div>
            ))}
            <button style={{ background: navy, color: '#fff', border: 'none', padding: '0 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section style={{ background: navy }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: serif, fontSize: '2.5rem', color: '#d8bf94', lineHeight: 1, marginBottom: '0.5rem' }}>{s.value}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(253,252,249,0.55)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Listings + Buy/Rent/Sold tabs ── */}
      <section id="listings" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Featured Properties</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: 0, color: navy }}>Homes worth coming home to</h2>
          </div>
          <div style={{ display: 'inline-flex', border: `1px solid ${line}`, borderRadius: '2px', overflow: 'hidden', background: '#fff' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '10px 28px', border: 'none', cursor: 'pointer', fontFamily: sans,
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: tab === t ? navy : 'transparent',
                color: tab === t ? '#d8bf94' : ink,
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {listingsByTab[tab].map(l => (
            <div key={l.id} style={{ background: '#fff', border: `1px solid ${line}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={l.img} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: tab === 'Sold' ? 'saturate(0.6)' : 'none' }} />
                <span style={{ position: 'absolute', top: '14px', left: '14px', background: l.badge === 'Sold' ? navy : gold, color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '2px' }}>{l.badge}</span>
                <span style={{ position: 'absolute', bottom: '14px', left: '14px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)', color: '#fdfcf9', fontFamily: serif, fontSize: '18px', padding: '7px 14px', borderRadius: '2px' }}>{l.price}</span>
              </div>
              <div style={{ padding: '1.4rem 1.5rem 1.5rem' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.35rem', color: navy }}>{l.title}</h3>
                <p style={{ fontSize: '13px', color: ink, margin: '0 0 1.1rem' }}>{l.address}</p>
                <div style={{ display: 'flex', gap: '1.4rem', borderTop: `1px solid ${line}`, paddingTop: '1rem' }}>
                  <span style={{ fontSize: '12px', color: ink, letterSpacing: '0.04em' }}><strong style={{ color: navy }}>{l.beds}</strong> Beds</span>
                  <span style={{ fontSize: '12px', color: ink, letterSpacing: '0.04em' }}><strong style={{ color: navy }}>{l.baths}</strong> Baths</span>
                  <span style={{ fontSize: '12px', color: ink, letterSpacing: '0.04em' }}><strong style={{ color: navy }}>{l.sqft}</strong> Sq Ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Neighborhoods Showcase ── */}
      <section style={{ background: '#fff', borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Where to Live</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: '0 0 1rem', color: navy }}>Neighborhoods we know by heart</h2>
            <p style={{ fontSize: '15px', color: ink, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>Four distinct districts, one promise — an agent who can tell you where the morning light falls on every street.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {neighborhoods.map(n => (
              <div key={n.name} style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer' }}>
                <img src={n.img} alt={n.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0) 35%, rgba(15,23,42,0.85) 100%)' }} />
                <div style={{ position: 'absolute', left: '1.4rem', right: '1.4rem', bottom: '1.4rem' }}>
                  <h3 style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 400, color: '#fdfcf9', margin: '0 0 0.4rem' }}>{n.name}</h3>
                  <p style={{ fontSize: '12px', color: '#d8bf94', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{n.listings} listings · median {n.median}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Estatly ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Why Estatly</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 400, margin: '0 0 1.25rem', color: navy, lineHeight: 1.2 }}>A brokerage built on patience, not pressure</h2>
            <p style={{ fontSize: '15px', color: ink, lineHeight: 1.75, margin: 0 }}>
              The average Estatly client works with us for 11 years across multiple homes. That doesn’t happen by closing fast — it happens by closing right.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {whyUs.map(w => (
              <div key={w.title} style={{ background: '#fff', border: `1px solid ${line}`, borderRadius: '4px', padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.35)', color: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '1.1rem' }}>{w.icon}</div>
                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 400, margin: '0 0 0.6rem', color: navy }}>{w.title}</h3>
                <p style={{ fontSize: '13.5px', color: ink, lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents Grid ── */}
      <section id="agents" style={{ background: '#fff', borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>The Team</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 400, margin: 0, color: navy }}>Agents who answer the phone</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
            {agents.map(a => (
              <div key={a.name} style={{ textAlign: 'center' }}>
                <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/5', marginBottom: '1.25rem' }}>
                  <img src={a.img} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.3rem', color: navy }}>{a.name}</h3>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, margin: '0 0 0.5rem' }}>{a.title}</p>
                <p style={{ fontSize: '13px', color: ink, margin: 0 }}>{a.volume}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section style={{ borderTop: `1px solid ${line}`, background: paper }}>
        <div style={{ maxWidth: '840px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ fontFamily: serif, fontSize: '4.5rem', color: gold, lineHeight: 0.5, marginBottom: '1.5rem' }}>“</div>
          <blockquote style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', fontWeight: 400, color: navy, lineHeight: 1.55, margin: '0 0 2.25rem', fontStyle: 'italic' }}>
            We toured 31 homes over eight months and Victoria never once rushed us. When the right one finally appeared, she negotiated $140K under asking. Estatly isn’t a brokerage — it’s an unfair advantage.
          </blockquote>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80" alt="Amara Whitfield" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${gold}` }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: navy }}>Amara Whitfield</div>
              <div style={{ fontSize: '12px', color: ink }}>Purchased in The Heights, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Band ── */}
      <section style={{ background: navy, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(176,141,87,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5.5rem 2rem', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d8bf94', marginBottom: '1rem' }}>Thinking of Selling?</p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.1rem)', fontWeight: 400, color: '#fdfcf9', margin: '0 0 1.25rem', lineHeight: 1.15 }}>
            Know what your home is really worth.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(253,252,249,0.65)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Request a complimentary valuation and receive a 22-page market analysis within 48 hours. No obligation, no follow-up calls you didn’t ask for.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: gold, color: '#fff', borderRadius: '2px', padding: '15px 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Get Free Valuation</a>
            <a href="#" style={{ background: 'transparent', color: '#fdfcf9', border: '1px solid rgba(253,252,249,0.35)', borderRadius: '2px', padding: '14px 36px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Speak to an Agent</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0a1020', padding: '4rem 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '1rem' }}>
                <span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700, color: '#fdfcf9' }}>Estatly</span>
                <span style={{ width: '5px', height: '5px', background: gold, borderRadius: '50%', display: 'inline-block' }} />
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(253,252,249,0.45)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
                A boutique brokerage serving Carraway County since 1999. Licensed in three states, trusted in every zip code we touch.
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(253,252,249,0.35)', margin: 0, letterSpacing: '0.04em' }}>12 Meridian Plaza, Suite 400<br />Carraway, CA 90210 · (555) 014-7700</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d8bf94', margin: '0 0 1.1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '13px', color: 'rgba(253,252,249,0.5)', textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(253,252,249,0.08)', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: 'rgba(253,252,249,0.3)', margin: 0 }}>© 2026 Estatly Realty Group. All rights reserved. DRE #01999274.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'LinkedIn', 'YouTube'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12px', color: 'rgba(253,252,249,0.3)', textDecoration: 'none', letterSpacing: '0.06em' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
