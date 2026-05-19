import { useState } from 'react';

const menu = [
  { name: 'Flat White', price: '$5.50', desc: 'Double ristretto with steamed milk', category: 'Coffee', img: 'https://images.unsplash.com/photo-1572286258217-215cf8e6b57a?w=300&q=80' },
  { name: 'Matcha Latte', price: '$6.00', desc: 'Ceremonial grade matcha with oat milk', category: 'Specialty', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80' },
  { name: 'Cold Brew', price: '$5.00', desc: '18-hour steeped Colombian blend', category: 'Coffee', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80' },
  { name: 'Avocado Toast', price: '$12.00', desc: 'Sourdough, smashed avo, chili flakes', category: 'Food', img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=300&q=80' },
  { name: 'Croissant', price: '$4.50', desc: 'Butter croissant, baked fresh daily', category: 'Food', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80' },
  { name: 'Chai Latte', price: '$5.50', desc: 'House-blended spices with steamed milk', category: 'Specialty', img: 'https://images.unsplash.com/photo-1549281899-f75600a24107?w=300&q=80' },
];

export default function CoffeeShopPreview() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Coffee', 'Specialty', 'Food'];
  const filtered = activeTab === 'All' ? menu : menu.filter(m => m.category === activeTab);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#faf7f2', minHeight: '100vh', color: '#2c1a0e' }}>
      {/* Nav */}
      <nav style={{ background: '#2c1a0e', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '22px' }}>☕</div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#f5e6c8', letterSpacing: '-0.02em' }}>Grind & Co.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Menu', 'Our Story', 'Locations', 'Order Online'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#a8845c', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#c8956c', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          Order Now
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,26,14,0.55)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8956c', marginBottom: '1rem', fontWeight: 600 }}>Specialty Coffee · Est. 2018</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#faf7f2', letterSpacing: '-0.03em', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
              Coffee worth<br />waking up for.
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#d4b896', maxWidth: '420px', marginBottom: '2rem', lineHeight: 1.65 }}>
              Ethically sourced single-origins, brewed to perfection by our baristas.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: '#c8956c', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Order Online</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px', padding: '12px 28px', fontSize: '14px', fontWeight: 600, color: '#faf7f2', cursor: 'pointer' }}>Find a Location</button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8956c', fontWeight: 600, marginBottom: '0.5rem' }}>What we serve</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1.5rem' }}>Our Menu</h2>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 20px', borderRadius: '9999px', border: '1px solid', borderColor: activeTab === tab ? '#c8956c' : '#e0d5c5', background: activeTab === tab ? '#c8956c' : 'transparent', color: activeTab === tab ? '#fff' : '#78583a', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(item => (
            <div key={item.name} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ede8df' }}>
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#c8956c' }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#78583a', margin: '0 0 0.875rem', lineHeight: 1.5 }}>{item.desc}</p>
                <button style={{ width: '100%', background: '#2c1a0e', border: 'none', borderRadius: '8px', padding: '9px', fontSize: '13px', fontWeight: 600, color: '#f5e6c8', cursor: 'pointer' }}>
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section style={{ background: '#2c1a0e', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5e6c8', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>Sourced with care. Brewed with love.</h2>
        <p style={{ fontSize: '15px', color: '#a8845c', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          We partner directly with farmers in Ethiopia, Colombia, and Guatemala. Every cup tells a story.
        </p>
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['3', 'Origin Countries'], ['12', 'Seasonal Blends'], ['8', 'Locations'], ['4.9★', 'Avg Rating']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#c8956c', margin: '0 0 4px' }}>{v}</p>
              <p style={{ fontSize: '13px', color: '#78583a', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
