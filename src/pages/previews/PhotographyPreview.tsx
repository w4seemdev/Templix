import { useState } from 'react';

const categories = ['All', 'Wedding', 'Portrait', 'Editorial', 'Landscape'];

const photos = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', cat: 'Wedding', span: 2 },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', cat: 'Portrait', span: 1 },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', cat: 'Landscape', span: 1 },
  { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', cat: 'Wedding', span: 1 },
  { src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80', cat: 'Editorial', span: 1 },
  { src: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600&q=80', cat: 'Landscape', span: 2 },
  { src: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600&q=80', cat: 'Portrait', span: 1 },
  { src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80', cat: 'Editorial', span: 1 },
];

export default function PhotographyPreview() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? photos : photos.filter(p => p.cat === active);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0a0a', color: '#f5f5f5', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '0 2.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)' }}>
        <span style={{ fontSize: '15px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f5f5f5' }}>ARIA CHEN</span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Work', 'About', 'Services', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '12px', color: '#737373', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '3px', padding: '8px 20px', fontSize: '11px', color: '#f5f5f5', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Book Session
        </button>
      </nav>

      {/* Hero fullscreen */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=1400&q=80" alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        </div>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '1rem' }}>Documentary Wedding & Portrait</p>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, letterSpacing: '0.08em', color: '#f5f5f5', margin: '0 0 1.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
            Aria Chen<br />Photography
          </h1>
          <div style={{ height: '1px', width: '60px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>Based in San Francisco · Available worldwide</p>
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </section>

      {/* Portfolio */}
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373', margin: 0 }}>Selected Work</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{ background: 'transparent', border: 'none', fontSize: '12px', color: active === cat ? '#f5f5f5' : '#737373', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 0', borderBottom: active === cat ? '1px solid #f5f5f5' : '1px solid transparent' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ columns: '3', columnGap: '10px' }}>
          {filtered.map((photo, i) => (
            <div key={i} style={{ breakInside: 'avoid', marginBottom: '10px', cursor: 'pointer', overflow: 'hidden', borderRadius: '3px' }}>
              <img src={photo.src} alt="" style={{ width: '100%', display: 'block', transition: 'transform 0.5s', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ borderTop: '1px solid #1a1a1a', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373', margin: '0 0 2.5rem' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a' }}>
            {[
              { name: 'Wedding', desc: 'Full-day coverage. Candid moments, fine detail.', price: 'From $3,800' },
              { name: 'Portrait', desc: 'Individual, couple and family sessions.', price: 'From $480' },
              { name: 'Editorial', desc: 'Brand, commercial and editorial work.', price: 'From $1,200' },
            ].map(service => (
              <div key={service.name} style={{ background: '#0a0a0a', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>{service.name}</h3>
                <p style={{ fontSize: '13px', color: '#737373', lineHeight: 1.7, margin: '0 0 1.5rem' }}>{service.desc}</p>
                <p style={{ fontSize: '14px', color: '#f5f5f5', margin: 0 }}>{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
