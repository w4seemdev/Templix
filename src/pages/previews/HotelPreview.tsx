import { useState } from 'react';

const rooms = [
  { name: 'Deluxe King Room', size: '42 m²', guests: 2, price: '$420', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', features: ['City View', 'King Bed', 'Mini Bar'] },
  { name: 'Junior Suite', size: '68 m²', guests: 2, price: '$680', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', features: ['Ocean View', 'Lounge Area', 'Jacuzzi'] },
  { name: 'Grand Suite', size: '120 m²', guests: 4, price: '$1,200', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80', features: ['Panoramic View', 'Dining Room', 'Butler Service'] },
];

export default function HotelPreview() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0a0a08', color: '#f5f0e8', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,8,0.8)', backdropFilter: 'blur(20px)', padding: '0 3rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(197,168,110,0.15)' }}>
        <div>
          <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '0.2em', color: '#c5a86e', textTransform: 'uppercase' }}>LUXE</span>
          <span style={{ fontSize: '10px', display: 'block', letterSpacing: '0.35em', color: 'rgba(197,168,110,0.6)', textTransform: 'uppercase', marginTop: '-2px', fontFamily: 'Inter, sans-serif' }}>COLLECTION</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Rooms', 'Dining', 'Spa', 'Events', 'Gallery'].map(item => (
            <span key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(245,240,232,0.5)', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <button style={{ fontFamily: 'Inter, sans-serif', background: '#c5a86e', border: 'none', borderRadius: '3px', padding: '10px 24px', fontSize: '11px', fontWeight: 600, color: '#0a0a08', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Book Now
        </button>
      </nav>

      {/* Hero */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,8,0.55)' }} />
        </div>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.4em', color: '#c5a86e', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Monaco · Paris · Dubai</p>
          <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', fontWeight: 400, letterSpacing: '0.05em', color: '#f5f0e8', margin: '0 0 1rem', lineHeight: 1, textTransform: 'uppercase' }}>
            Luxe<br />Collection
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(245,240,232,0.65)', margin: '0 0 3rem', letterSpacing: '0.04em' }}>Where luxury meets timeless elegance.</p>
          <a href="#rooms" style={{ fontFamily: 'Inter, sans-serif', background: 'transparent', border: '1px solid #c5a86e', borderRadius: '3px', padding: '13px 36px', fontSize: '11px', color: '#c5a86e', cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
            Explore Rooms
          </a>
        </div>
      </section>

      {/* Booking bar */}
      <div style={{ background: '#c5a86e', padding: '1.75rem 3rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(10,10,8,0.65)', display: 'block', marginBottom: '4px' }}>Check-in</label>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(10,10,8,0.4)', padding: '6px 0', fontSize: '14px', color: '#0a0a08', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(10,10,8,0.65)', display: 'block', marginBottom: '4px' }}>Check-out</label>
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(10,10,8,0.4)', padding: '6px 0', fontSize: '14px', color: '#0a0a08', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(10,10,8,0.65)', display: 'block', marginBottom: '4px' }}>Guests</label>
            <select style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(10,10,8,0.4)', padding: '6px 0', fontSize: '14px', color: '#0a0a08', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              <option>2 Guests</option><option>1 Guest</option><option>3 Guests</option><option>4 Guests</option>
            </select>
          </div>
          <button style={{ background: '#0a0a08', border: 'none', borderRadius: '3px', padding: '12px 32px', fontSize: '11px', fontWeight: 700, color: '#c5a86e', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
            Check Availability
          </button>
        </div>
      </div>

      {/* Rooms */}
      <section id="rooms" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.3em', color: '#c5a86e', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Accommodations</p>
          <h2 style={{ fontSize: '2.75rem', fontWeight: 400, margin: 0, letterSpacing: '0.04em' }}>Rooms &amp; Suites</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {rooms.map(room => (
            <div key={room.name} style={{ cursor: 'pointer' }}>
              <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem', aspectRatio: '4/3' }}>
                <img src={room.img} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, margin: 0 }}>{room.name}</h3>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#c5a86e', fontWeight: 600 }}>{room.price}<span style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)' }}>/night</span></span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(245,240,232,0.5)', margin: '0 0 0.75rem' }}>{room.size} · Up to {room.guests} guests</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {room.features.map(f => (
                  <span key={f} style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#c5a86e', border: '1px solid rgba(197,168,110,0.3)', borderRadius: '2px', padding: '3px 8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section style={{ background: '#0f0f0c', borderTop: '1px solid rgba(197,168,110,0.1)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.3em', color: '#c5a86e', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Experience</p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 400, margin: '0 0 3rem' }}>World-Class Amenities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
            {[['🍽️', 'Fine Dining', '3 Michelin-starred restaurants'], ['💆', 'Spa & Wellness', '2,000 sqm luxury spa'], ['🏊', 'Infinity Pool', 'Rooftop pool with city views'], ['🏋️', 'Fitness', 'State-of-the-art gym & studio']].map(([icon, title, desc]) => (
              <div key={title as string}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, margin: '0 0 0.5rem' }}>{title as string}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(245,240,232,0.45)', margin: 0, lineHeight: 1.6 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
