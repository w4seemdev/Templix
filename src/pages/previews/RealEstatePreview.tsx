import { useState } from 'react';

const listings = [
  { title: 'Modern Penthouse', location: 'Downtown Manhattan, NY', price: '$2,850,000', beds: 3, baths: 2, sqft: '2,400', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', tag: 'Featured' },
  { title: 'Cozy Family Home', location: 'Brooklyn, NY', price: '$1,200,000', beds: 4, baths: 3, sqft: '3,100', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', tag: 'New' },
  { title: 'Luxury Condo', location: 'Upper East Side, NY', price: '$1,750,000', beds: 2, baths: 2, sqft: '1,800', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', tag: '' },
  { title: 'Townhouse with Garden', location: 'Hoboken, NJ', price: '$980,000', beds: 3, baths: 2, sqft: '2,200', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', tag: 'Price Drop' },
  { title: 'Studio Loft', location: 'Tribeca, NY', price: '$650,000', beds: 1, baths: 1, sqft: '900', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', tag: '' },
  { title: 'Waterfront Villa', location: 'Long Island, NY', price: '$4,200,000', beds: 5, baths: 4, sqft: '5,800', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', tag: 'Luxury' },
];

export default function RealEstatePreview() {
  const [tab, setTab] = useState('Buy');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>NestFind</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Buy', 'Rent', 'Sell', 'Agents', 'Mortgage'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#64748b', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#0f172a', cursor: 'pointer', fontWeight: 500 }}>Sign in</button>
          <button style={{ background: '#0ea5e9', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>List Property</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Find your perfect home
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '2.5rem' }}>
            Browse thousands of properties in your dream location.
          </p>

          {/* Search box */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              {['Buy', 'Rent', 'Commercial'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', background: tab === t ? '#0ea5e9' : '#f1f5f9', color: tab === t ? '#fff' : '#64748b' }}>{t}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input placeholder="City, neighborhood, or address..." style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', color: '#0f172a' }} />
              <select style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', background: '#fff', outline: 'none' }}>
                <option>Any Price</option>
                <option>Under $500k</option>
                <option>$500k–$1M</option>
                <option>$1M–$2M</option>
                <option>$2M+</option>
              </select>
              <select style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', background: '#fff', outline: 'none' }}>
                <option>Any Beds</option>
                <option>1+ Beds</option>
                <option>2+ Beds</option>
                <option>3+ Beds</option>
              </select>
              <button style={{ background: '#0ea5e9', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
          {[['12,400+', 'Active Listings'], ['8,200+', 'Homes Sold'], ['1,400+', 'Agents'], ['4.9★', 'Avg Rating']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0ea5e9', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Listings */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Featured Listings</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Handpicked properties in top locations</p>
          </div>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#0f172a', cursor: 'pointer', fontWeight: 500 }}>View all listings</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {listings.map(l => (
            <div key={l.title} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={l.img} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {l.tag && <span style={{ position: 'absolute', top: '12px', left: '12px', background: l.tag === 'Luxury' ? '#f59e0b' : l.tag === 'Price Drop' ? '#ef4444' : '#0ea5e9', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>{l.tag}</span>}
                <button style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0ea5e9', margin: '0 0 4px' }}>{l.price}</p>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: '0 0 4px' }}>{l.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {l.location}
                </p>
                <div style={{ display: 'flex', gap: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                  {[['🛏', l.beds + ' Beds'], ['🚿', l.baths + ' Baths'], ['📐', l.sqft + ' sqft']].map(([icon, val]) => (
                    <span key={val} style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>{icon} {val}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
