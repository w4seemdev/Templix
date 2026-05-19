const episodes = [
  { num: 142, title: 'The Future of AI in Product Design', guest: 'Sarah Chen', duration: '1h 12m', date: 'May 15', plays: '84K', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80' },
  { num: 141, title: 'Building a $10M SaaS Without VC Funding', guest: 'Tom Hargrove', duration: '58m', date: 'May 8', plays: '112K', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { num: 140, title: 'Founder Mental Health — the Honest Truth', guest: 'Anya Patel', duration: '1h 4m', date: 'May 1', plays: '96K', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80' },
  { num: 139, title: 'Distribution Beats Product Every Time', guest: 'Marcus Webb', duration: '47m', date: 'Apr 24', plays: '78K', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
];

export default function PodcastPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0a0f', color: '#fafafa', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" fill="none" stroke="#fff" strokeWidth="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>Signal</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Episodes', 'Guests', 'Newsletter', 'Merch'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['spotify', 'apple', 'google'].map(p => (
            <div key={p} style={{ width: '32px', height: '32px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '12px' }}>{p === 'spotify' ? '🎵' : p === 'apple' ? '🎙️' : '🔊'}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Hero — latest episode */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 2rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '9999px', padding: '4px 14px', marginBottom: '1.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Latest Episode</span>
            </div>
            <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: 600, margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>EP. {episodes[0].num} · {episodes[0].date}</p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1rem' }}>
              {episodes[0].title}
            </h1>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 0.5rem' }}>Guest: <span style={{ color: '#c4b5fd' }}>{episodes[0].guest}</span></p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 2rem' }}>{episodes[0].duration} · {episodes[0].plays} plays</p>
            {/* Player */}
            <div style={{ background: '#111125', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ height: '4px', background: '#1e1e3f', borderRadius: '9999px', marginBottom: '1rem', position: 'relative' }}>
                <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', borderRadius: '9999px' }} />
                <div style={{ position: 'absolute', top: '-4px', left: '35%', width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '50%', transform: 'translateX(-50%)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', marginBottom: '1rem' }}>
                <span>24:18</span><span>{episodes[0].duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                <svg width="20" height="20" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
                <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                </div>
                <svg width="20" height="20" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1', boxShadow: '0 40px 80px rgba(139,92,246,0.25)' }}>
            <img src={episodes[0].img} alt={episodes[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Episode list */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.25rem', letterSpacing: '-0.02em' }}>All Episodes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {episodes.slice(1).map((ep, i) => (
            <div key={ep.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1.125rem', borderRadius: '12px', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', cursor: 'pointer', border: '1px solid transparent' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={ep.img} alt={ep.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>EP. {ep.num} · {ep.date}</p>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px', color: '#f9fafb' }}>{ep.title}</h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>w/ {ep.guest} · {ep.duration} · {ep.plays} plays</p>
              </div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg width="14" height="14" fill="#a78bfa" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe strip */}
        <div style={{ marginTop: '3.5rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.1) 100%)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Never miss an episode</h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '1.5rem' }}>New episodes every Wednesday. Interviews with founders, PMs, and builders.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input type="email" placeholder="your@email.com" style={{ borderRadius: '8px', border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(10,10,15,0.8)', padding: '10px 16px', fontSize: '14px', color: '#fafafa', outline: 'none', minWidth: '240px' }} />
            <button style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
