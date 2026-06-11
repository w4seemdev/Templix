import { useState } from 'react';

const albums = [
  { title: 'Neon Drift', year: '2024', tracks: 11, img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
  { title: 'Static Hours', year: '2022', tracks: 9, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80' },
  { title: 'Coastline', year: '2020', tracks: 12, img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80' },
];

const tours = [
  { city: 'Los Angeles, CA', venue: 'The Wiltern', date: 'Jul 12, 2025', status: 'On Sale' },
  { city: 'New York, NY', venue: 'Brooklyn Steel', date: 'Jul 18, 2025', status: 'Few Left' },
  { city: 'Chicago, IL', venue: 'Thalia Hall', date: 'Jul 25, 2025', status: 'On Sale' },
  { city: 'Austin, TX', venue: 'Stubb\'s Waller Creek', date: 'Aug 1, 2025', status: 'Sold Out' },
  { city: 'Seattle, WA', venue: 'The Showbox', date: 'Aug 8, 2025', status: 'On Sale' },
];

export default function MusicPreview() {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#000', color: '#fafafa', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>VEGA</span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Music', 'Tour', 'Store', 'Videos', 'Press'].map(item => (
            <span key={item} style={{ fontSize: '12px', color: '#737373', cursor: 'pointer', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['🎵', '📺', '📸'].map((icon, i) => (
            <div key={i} style={{ width: '34px', height: '34px', background: '#111', border: '1px solid #222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>
              {icon}
            </div>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)' }} />
        <div style={{ position: 'relative', padding: '0 3rem 4rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#737373', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>New Album Out Now</p>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, margin: '0 0 1.5rem', textTransform: 'uppercase' }}>
                Neon<br />Drift
              </h1>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setPlaying(!playing)} style={{ background: '#fff', border: 'none', borderRadius: '9999px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{playing ? '⏸' : '▶'}</span> {playing ? 'Pause' : 'Play Now'}
                </button>
                <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px', padding: '12px 28px', fontSize: '14px', fontWeight: 600, color: '#fafafa', cursor: 'pointer' }}>
                  Pre-save
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '3rem', textAlign: 'center' }}>
              {[['2.4M', 'Monthly Listeners'], ['11', 'New Tracks'], ['58m', 'Total Plays']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 4px' }}>{v}</p>
                  <p style={{ fontSize: '11px', color: '#737373', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Albums */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373', margin: '0 0 1.5rem' }}>Discography</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {albums.map(album => (
            <div key={album.title} style={{ cursor: 'pointer', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                <img src={album.img} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{album.title}</h3>
                  <p style={{ fontSize: '12px', color: '#a3a3a3', margin: 0 }}>{album.year} · {album.tracks} tracks</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tour */}
      <section style={{ borderTop: '1px solid #111', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373', margin: '0 0 1.5rem' }}>Tour Dates</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tours.map(tour => (
              <div key={tour.city} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', borderBottom: '1px solid #111', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#737373', minWidth: '100px', fontWeight: 500 }}>{tour.date}</span>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 2px' }}>{tour.city}</p>
                    <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{tour.venue}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: tour.status === 'Sold Out' ? '#ef4444' : tour.status === 'Few Left' ? '#f59e0b' : '#22c55e' }}>{tour.status}</span>
                  {tour.status !== 'Sold Out' && (
                    <button style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '7px 18px', fontSize: '12px', fontWeight: 700, color: '#000', cursor: 'pointer' }}>Tickets</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
