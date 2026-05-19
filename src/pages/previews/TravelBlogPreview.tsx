const destinations = [
  { name: 'Santorini, Greece', tag: 'Europe', reads: '14K', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', desc: '10 days in the Aegean — what no one tells you' },
  { name: 'Kyoto, Japan', tag: 'Asia', reads: '22K', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', desc: 'Cherry blossoms, temples, and the bullet train' },
  { name: 'Patagonia, Chile', tag: 'South America', reads: '9K', img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80', desc: 'Trekking Torres del Paine: the complete guide' },
  { name: 'Marrakech, Morocco', tag: 'Africa', reads: '17K', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80', desc: 'Getting lost (on purpose) in the medina' },
  { name: 'Amalfi Coast, Italy', tag: 'Europe', reads: '31K', img: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=600&q=80', desc: 'The most scenic drive in the world — is it worth it?' },
];

const tags = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Budget Tips', 'Guides'];

export default function TravelBlogPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fafaf8', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e8e0', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🌍</span>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1a1a' }}>Wanderlog</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Destinations', 'Guides', 'Budget Tips', 'About', 'Newsletter'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#737373', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#1a1a1a', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Subscribe</button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '540px', overflow: 'hidden' }}>
        <img src={destinations[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 3rem' }}>
          <div style={{ maxWidth: '700px' }}>
            <span style={{ background: '#16a34a', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', marginBottom: '1rem', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Featured</span>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: '0 0 0.75rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {destinations[0].desc}
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', margin: '0 0 0.5rem' }}>{destinations[0].name} · {destinations[0].reads} reads</p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e8e0', padding: '0 2rem', display: 'flex', gap: '2rem', overflowX: 'auto' }}>
        {tags.map((tag, i) => (
          <span key={tag} style={{ fontSize: '13px', fontWeight: 600, color: i === 0 ? '#1a1a1a' : '#737373', padding: '1rem 0', borderBottom: i === 0 ? '2px solid #1a1a1a' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tag}</span>
        ))}
      </div>

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Large feature */}
          <div style={{ cursor: 'pointer' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '300px', marginBottom: '1.25rem' }}>
              <img src={destinations[1].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{destinations[1].tag}</span>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: '0.375rem 0 0.5rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{destinations[1].desc}</h2>
            <p style={{ fontSize: '13px', color: '#737373', margin: 0 }}>{destinations[1].name} · {destinations[1].reads} reads</p>
          </div>
          {/* Side list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {destinations.slice(2, 4).map(d => (
              <div key={d.name} style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}>
                <div style={{ width: '100px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={d.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d.tag}</span>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '3px 0 4px', lineHeight: 1.35 }}>{d.desc}</h3>
                  <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{d.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', borderTop: '1px solid #e8e8e0', paddingTop: '2rem' }}>
          {destinations.slice(3).map(d => (
            <div key={d.name} style={{ display: 'flex', gap: '1.25rem', cursor: 'pointer' }}>
              <div style={{ width: '120px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={d.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d.tag}</span>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '4px 0 6px', lineHeight: 1.35 }}>{d.desc}</h3>
                <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{d.name} · {d.reads} reads</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: '#1a1a1a', padding: '4rem 2rem', textAlign: 'center' }}>
        <span style={{ fontSize: '2rem' }}>✈️</span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0', letterSpacing: '-0.02em' }}>Get travel inspiration weekly</h2>
        <p style={{ fontSize: '14px', color: '#737373', marginBottom: '1.5rem' }}>50,000+ readers. No spam. Unsubscribe anytime.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input type="email" placeholder="your@email.com" style={{ borderRadius: '8px', border: '1px solid #333', background: '#222', padding: '11px 18px', fontSize: '14px', color: '#fff', outline: 'none', minWidth: '260px' }} />
          <button style={{ background: '#16a34a', border: 'none', borderRadius: '8px', padding: '11px 24px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Subscribe</button>
        </div>
      </section>
    </div>
  );
}
