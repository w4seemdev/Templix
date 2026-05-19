import { useState } from 'react';

const services = [
  { name: 'Signature Facial', duration: '60 min', price: '$120', desc: 'Deep cleanse, exfoliation & glow mask', category: 'Skin' },
  { name: 'Swedish Massage', duration: '90 min', price: '$145', desc: 'Full-body relaxation massage with oils', category: 'Body' },
  { name: 'Gel Manicure', duration: '45 min', price: '$55', desc: 'Long-lasting shine with cuticle care', category: 'Nails' },
  { name: 'Balayage', duration: '3 hr', price: '$280', desc: 'Natural sun-kissed color by our colorists', category: 'Hair' },
  { name: 'Deep Tissue Massage', duration: '60 min', price: '$130', desc: 'Targeted muscle relief & tension release', category: 'Body' },
  { name: 'Hydra Facial', duration: '45 min', price: '$160', desc: 'HydraFacial MD device treatment', category: 'Skin' },
];

const cats = ['All', 'Skin', 'Body', 'Nails', 'Hair'];

export default function BeautySpaPreview() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? services : services.filter(s => s.category === active);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fcf9f6', color: '#2c1f14', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(252,249,246,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #ede4d8', padding: '0 2.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '22px' }}>🌸</div>
          <span style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '-0.01em', color: '#2c1f14' }}>Glow Studio</span>
        </div>
        <div style={{ display: 'flex', gap: '2.25rem' }}>
          {['Services', 'Book', 'Gift Cards', 'About', 'Blog'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#7a5c42', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#b07a5a', border: 'none', borderRadius: '50px', padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Book Appointment</button>
      </nav>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '560px' }}>
        <div style={{ padding: '5rem 3rem 5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#b07a5a', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Beauty · Wellness · Self-care</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 1.25rem', color: '#2c1f14' }}>
            You deserve<br />to <em style={{ fontStyle: 'italic', color: '#b07a5a' }}>glow.</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#7a5c42', lineHeight: 1.75, maxWidth: '400px', marginBottom: '2rem' }}>
            A sanctuary for beauty and wellness in the heart of the city. Expert therapists, premium products, and total relaxation.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: '#b07a5a', border: 'none', borderRadius: '50px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Book Now</button>
            <button style={{ background: 'transparent', border: '1px solid #d4b8a0', borderRadius: '50px', padding: '13px 28px', fontSize: '14px', fontWeight: 500, color: '#2c1f14', cursor: 'pointer' }}>View Services</button>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #ede4d8' }}>
            {[['5★', 'Rating'], ['1,200+', 'Clients'], ['12', 'Specialists']].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b07a5a', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: '12px', color: '#7a5c42', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Our Services</h2>
            <p style={{ fontSize: '13px', color: '#7a5c42', margin: 0 }}>Handcrafted treatments for every need</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{ padding: '7px 18px', borderRadius: '50px', border: '1px solid', borderColor: active === cat ? '#b07a5a' : '#d4b8a0', background: active === cat ? '#b07a5a' : 'transparent', color: active === cat ? '#fff' : '#7a5c42', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(s => (
            <div key={s.name} style={{ background: '#fff', border: '1px solid #ede4d8', borderRadius: '16px', padding: '1.5rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#b07a5a', background: 'rgba(176,122,90,0.1)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.category}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0.5rem 0 4px' }}>{s.name}</h3>
                </div>
                <span style={{ fontSize: '17px', fontWeight: 700, color: '#b07a5a' }}>{s.price}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#7a5c42', margin: '0 0 0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#a08060' }}>⏱ {s.duration}</span>
                <button style={{ background: '#2c1f14', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
