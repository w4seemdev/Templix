const arrangements = [
  { name: 'Garden Romance', price: '$85', img: 'https://images.unsplash.com/photo-1487530811015-780d61a5e7a1?w=400&q=80', tag: 'Bestseller', desc: 'Peonies, roses & eucalyptus' },
  { name: 'Sunlit Joy', price: '$65', img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=400&q=80', tag: '', desc: 'Sunflowers, daisies & lavender' },
  { name: 'Midnight Blue', price: '$110', img: 'https://images.unsplash.com/photo-1462530260150-162092dbf011?w=400&q=80', tag: 'New', desc: 'Irises, thistles & black dahlias' },
  { name: 'Spring Blush', price: '$75', img: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&q=80', tag: '', desc: 'Tulips, ranunculus & baby\'s breath' },
];

export default function FloristPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fdfaf6', color: '#1c120a', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0e8dc', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🌸</span>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.01em' }}>Petal</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Shop', 'Occasions', 'Custom', 'Subscriptions', 'About'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#7a5a3a', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid #e8d5c0', borderRadius: '50px', padding: '8px 18px', fontSize: '13px', color: '#1c120a', cursor: 'pointer' }}>🛒 Cart (2)</button>
          <button style={{ background: '#b87245', border: 'none', borderRadius: '50px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>
        <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fdf0e6' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#b87245', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Same-day delivery · Handcrafted daily</p>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
            Flowers that<br />tell your story.
          </h1>
          <p style={{ fontSize: '15px', color: '#7a5a3a', lineHeight: 1.75, maxWidth: '380px', marginBottom: '2rem' }}>
            Seasonal blooms, custom arrangements, and weekly subscriptions — crafted by our expert florists.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#b87245', border: 'none', borderRadius: '50px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Shop Now</button>
            <button style={{ background: 'transparent', border: '1px solid #d4b08a', borderRadius: '50px', padding: '13px 28px', fontSize: '14px', fontWeight: 500, color: '#1c120a', cursor: 'pointer' }}>Custom Bouquet</button>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem' }}>
            {[['Free', 'Delivery $75+'], ['Same-day', 'Order by 1pm'], ['100%', 'Fresh Flowers']].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#b87245', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: '11px', color: '#7a5a3a', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1487530811015-780d61a5e7a1?w=900&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Products */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Fresh This Week</h2>
          <span style={{ fontSize: '13px', color: '#b87245', cursor: 'pointer', fontWeight: 600 }}>View all →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {arrangements.map(item => (
            <div key={item.name} style={{ background: '#fff', border: '1px solid #f0e8dc', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.tag && <span style={{ position: 'absolute', top: '12px', left: '12px', background: item.tag === 'New' ? '#22c55e' : '#b87245', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>{item.tag}</span>}
              </div>
              <div style={{ padding: '1.125rem' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#7a5a3a', margin: '0 0 0.875rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#b87245' }}>{item.price}</span>
                  <button style={{ background: '#1c120a', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section style={{ background: '#fdf0e6', padding: '4rem 2rem', textAlign: 'center' }}>
        <span style={{ fontSize: '2.5rem' }}>🌷</span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.5rem 0 0.75rem', letterSpacing: '-0.02em' }}>Weekly Flower Subscription</h2>
        <p style={{ fontSize: '14px', color: '#7a5a3a', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>Fresh seasonal blooms delivered to your door every week. Starting at $45/week. Pause or cancel anytime.</p>
        <button style={{ background: '#b87245', border: 'none', borderRadius: '50px', padding: '13px 32px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Start My Subscription</button>
      </section>
    </div>
  );
}
