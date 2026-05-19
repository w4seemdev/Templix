const gallery = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
];

const timeline = [
  { time: '3:00 PM', event: 'Ceremony Begins', icon: '💐', location: 'Rose Garden' },
  { time: '4:30 PM', event: 'Cocktail Hour', icon: '🥂', location: 'Grand Terrace' },
  { time: '6:00 PM', event: 'Reception Dinner', icon: '🍽️', location: 'The Grand Hall' },
  { time: '8:00 PM', event: 'First Dance & Speeches', icon: '💃', location: 'The Grand Hall' },
  { time: '9:00 PM', event: 'Dancing & Celebration', icon: '🎶', location: 'The Grand Hall' },
];

export default function WeddingPreview() {
  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: '#fdf8f4', color: '#2d1b0e', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(253,248,244,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #f0e6d9', padding: '0 2rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#8b6b4a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          S & J
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Our Story', 'Gallery', 'Schedule', 'RSVP', 'Travel'].map(item => (
            <span key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#8b6b4a', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <button style={{ fontFamily: 'Inter, sans-serif', background: 'transparent', border: '1px solid #c9a882', borderRadius: '4px', padding: '8px 20px', fontSize: '12px', color: '#8b6b4a', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          RSVP
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,27,14,0.38)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(253,248,244,0.8)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>WE'RE GETTING MARRIED</p>
          <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 700, color: '#fdf8f4', letterSpacing: '-0.01em', lineHeight: 1.05, margin: '0 0 0.75rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Sofia &amp; James
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'rgba(253,248,244,0.5)' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(253,248,244,0.85)', letterSpacing: '0.12em', margin: 0 }}>JUNE 14, 2025 · VILLA BELLAGIO, LAKE COMO</p>
            <div style={{ height: '1px', width: '60px', background: 'rgba(253,248,244,0.5)' }} />
          </div>
          <button style={{ fontFamily: 'Inter, sans-serif', background: 'rgba(253,248,244,0.15)', border: '1px solid rgba(253,248,244,0.5)', borderRadius: '4px', padding: '12px 32px', fontSize: '12px', color: '#fdf8f4', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
            RSVP NOW
          </button>
        </div>
        {/* Countdown */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1.5rem' }}>
          {[['28', 'Days'], ['14', 'Hours'], ['32', 'Minutes'], ['10', 'Seconds']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', background: 'rgba(253,248,244,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(253,248,244,0.2)', borderRadius: '8px', padding: '10px 18px', minWidth: '64px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fdf8f4', margin: '0 0 2px' }}>{v}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(253,248,244,0.7)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story section */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#c9a882', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our Story</p>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, margin: '0 0 1.5rem', color: '#2d1b0e', letterSpacing: '-0.02em' }}>How it all began</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#78583a', lineHeight: 1.9, marginBottom: '1rem' }}>
          We met on a rainy Tuesday in a small bookshop in Florence. James was looking for Hemingway; Sofia was hiding from the rain. A cup of coffee became five hours of conversation, and five years later, here we are.
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#78583a', lineHeight: 1.9 }}>
          We can't wait to celebrate with the people we love most in the most beautiful place on earth.
        </p>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#c9a882', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '2rem' }}>Gallery</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {gallery.map((src, i) => (
            <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#2d1b0e', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#c9a882', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Big Day</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 3rem', color: '#fdf8f4', letterSpacing: '-0.02em' }}>Day of Events</h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(201,168,130,0.25)', transform: 'translateX(-50%)' }} />
            {timeline.map((item, i) => (
              <div key={item.event} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#c9a882', margin: '0 0 3px', letterSpacing: '0.06em' }}>{item.time}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#fdf8f4', margin: '0 0 2px' }}>{item.event}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#78583a', margin: 0 }}>{item.location}</p>
                </div>
                <div style={{ width: '40px', height: '40px', background: '#3d2512', border: '2px solid #c9a882', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, fontSize: '16px' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
