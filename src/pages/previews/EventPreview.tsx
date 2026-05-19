const speakers = [
  { name: 'Dr. Lena Park', role: 'Head of AI, Google DeepMind', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', tag: 'Keynote' },
  { name: 'James Thornton', role: 'CEO, Stripe', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', tag: 'Keynote' },
  { name: 'Aisha Rahman', role: 'Founder, Notion', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', tag: 'Workshop' },
  { name: 'Felix Gruber', role: 'CTO, Vercel', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', tag: 'Panel' },
  { name: 'Nina Scott', role: 'Design Partner, a16z', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', tag: 'Workshop' },
  { name: 'Omar Khalil', role: 'Author, Zero to One', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', tag: 'Panel' },
];

const schedule = [
  { time: '9:00 AM', title: 'Opening Keynote', speaker: 'Dr. Lena Park', track: 'Main Stage', duration: '45m' },
  { time: '10:00 AM', title: 'Building the Next Billion-Dollar Startup', speaker: 'James Thornton', track: 'Main Stage', duration: '40m' },
  { time: '11:00 AM', title: 'The Future of Remote Product Teams', speaker: 'Aisha Rahman', track: 'Workshop Hall A', duration: '60m' },
  { time: '1:00 PM', title: 'Deployment at Scale', speaker: 'Felix Gruber', track: 'Tech Track', duration: '35m' },
  { time: '2:30 PM', title: 'Founder Panel: Lessons from 0→1', speaker: 'Multiple Speakers', track: 'Main Stage', duration: '90m' },
];

export default function EventPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#050510', color: '#fafafa', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '20px' }}>⚡</div>
          <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>LaunchConf <span style={{ color: '#6366f1' }}>2025</span></span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Speakers', 'Schedule', 'Tickets', 'Venue', 'Sponsors'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          Get Tickets
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '6rem 2rem 5rem', overflow: 'hidden', textAlign: 'center' }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '9999px', padding: '6px 18px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '12px', color: '#818cf8', fontWeight: 700 }}>📍 San Francisco · Sept 18–20, 2025</span>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 1.5rem' }}>
            Launch<span style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conf</span><br />2025
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#9ca3af', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            The premier conference for founders, product leaders, and engineers building the next generation of software.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Register Now →</button>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, color: '#fafafa', cursor: 'pointer' }}>View Schedule</button>
          </div>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem' }}>
            {[['60+', 'Speakers'], ['1,200', 'Attendees'], ['3', 'Days'], ['8', 'Tracks']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#818cf8', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Featured Speakers</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2rem' }}>World-class minds, one stage.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {speakers.map(sp => (
            <div key={sp.name} style={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 0.875rem', border: '2px solid rgba(99,102,241,0.3)' }}>
                <img src={sp.img} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.12)', padding: '2px 10px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{sp.tag}</span>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0.5rem 0 4px', color: '#f9fafb' }}>{sp.name}</h3>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>{sp.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Day 1 Schedule</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 1.5rem' }}>September 18, 2025</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {schedule.map(item => (
            <div key={item.title} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.125rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ minWidth: '80px', fontSize: '13px', fontWeight: 600, color: '#818cf8' }}>{item.time}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 3px', color: '#f9fafb' }}>{item.title}</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{item.speaker}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '3px 10px', borderRadius: '9999px', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.track}</span>
                <span style={{ fontSize: '11px', color: '#4b5563', whiteSpace: 'nowrap' }}>{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
