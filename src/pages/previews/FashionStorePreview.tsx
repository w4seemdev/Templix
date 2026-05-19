import { useState } from 'react';

const products = [
  { name: 'Oversized Linen Blazer', price: '$189', tag: 'New', color: '#f1f5f9', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  { name: 'Silk Slip Dress', price: '$145', tag: 'Trending', color: '#fce7f3', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { name: 'Wide Leg Trousers', price: '$98', tag: '', color: '#f0fdf4', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80' },
  { name: 'Cropped Knit Cardigan', price: '$76', tag: 'Sale', color: '#fef3c7', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80' },
  { name: 'Leather Mini Skirt', price: '$134', tag: 'New', color: '#f1f5f9', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80' },
  { name: 'Ribbed Tank Top', price: '$42', tag: '', color: '#f0f9ff', img: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80' },
];

export default function FashionStorePreview() {
  const [cart, setCart] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fafaf9', minHeight: '100vh', color: '#1c1917' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Women', 'Men', 'Accessories', 'Sale'].map(item => (
              <span key={item} style={{ fontSize: '13px', fontWeight: 500, color: '#78716c', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item}</span>
            ))}
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.04em', color: '#1c1917' }}>MAISON</span>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <svg width="18" height="18" fill="none" stroke="#78716c" strokeWidth="1.75" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setCart(c => c + 1)}>
              <svg width="18" height="18" fill="none" stroke="#78716c" strokeWidth="1.75" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cart > 0 && <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#1c1917', fontSize: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{cart}</div>}
            </div>
            <svg width="18" height="18" fill="none" stroke="#78716c" strokeWidth="1.75" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#1c1917', color: '#fff', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4c5a9', marginBottom: '1rem' }}>Summer 2026 Collection</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1.5rem', lineHeight: 1.05 }}>Effortless<br />Elegance</h1>
          <button style={{ background: '#fff', color: '#1c1917', border: 'none', borderRadius: '9999px', padding: '14px 36px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Products */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>New Arrivals</h2>
          <span style={{ fontSize: '13px', color: '#78716c', cursor: 'pointer', textDecoration: 'underline' }}>View all</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {products.map(p => (
            <div key={p.name} style={{ cursor: 'pointer' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '3/4', position: 'relative', background: p.color, marginBottom: '0.875rem' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.tag && (
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: p.tag === 'Sale' ? '#ef4444' : '#1c1917', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.tag}</span>
                )}
                <button onClick={() => setCart(c => c + 1)} style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#1c1917', border: 'none', borderRadius: '9999px', padding: '10px 24px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', opacity: 0.95, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Quick Add
                </button>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#1c1917', margin: '0 0 4px' }}>{p.name}</p>
              <p style={{ fontSize: '14px', color: '#78716c', margin: 0 }}>{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section style={{ background: '#1c1917', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.75rem' }}>Limited time</p>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem', letterSpacing: '-0.02em' }}>End of Season Sale — Up to 40% Off</h2>
        <button style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '9999px', padding: '12px 32px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Shop Sale
        </button>
      </section>
    </div>
  );
}
