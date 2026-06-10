const work = [
  { name: 'Arca Branding', type: 'Brand Identity', img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80', color: '#ff5733' },
  { name: 'Bloom App UI', type: 'UI / UX Design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', color: '#6366f1' },
  { name: 'Nomad Campaign', type: 'Motion & Print', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80', color: '#f59e0b' },
  { name: 'Peaks Packaging', type: 'Packaging', img: 'https://images.unsplash.com/photo-1586495777744-4e6a5f5b5ee3?w=600&q=80', color: '#22c55e' },
  { name: 'Signal Typeface', type: 'Typography', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', color: '#ec4899' },
  { name: 'Tempo Web Design', type: 'Web Design', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80', color: '#06b6d4' },
];

export default function CreativeStudioPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0c0c0c', color: '#f5f5f5', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '0 2.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)' }}>
        <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>PIXEL<span style={{ color: '#f59e0b' }}>+</span></span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Work', 'Services', 'Studio', 'Clients', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '12px', color: '#737373', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#f5f5f5', border: 'none', borderRadius: '6px', padding: '9px 20px', fontSize: '12px', fontWeight: 700, color: '#0c0c0c', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Let's Talk
        </button>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '64px', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 2rem 4rem' }}>
        <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Branding', 'Motion', 'UI/UX', 'Print', 'Web'].map((tag) => (
            <span key={tag} style={{ fontSize: '11px', padding: '5px 14px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.12)', color: '#737373', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{tag}</span>
          ))}
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, margin: '0 0 1.5rem', textTransform: 'uppercase' }}>
          We Make<br /><span style={{ color: '#f59e0b' }}>Great</span><br />Design.
        </h1>
        <p style={{ fontSize: '15px', color: '#737373', maxWidth: '480px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Award-winning creative studio specializing in brand identity, digital experiences, and motion design.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: '#f5f5f5', border: 'none', borderRadius: '9999px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, color: '#0c0c0c', cursor: 'pointer' }}>See Our Work</button>
          <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#f5f5f5', cursor: 'pointer' }}>Start a Project</button>
        </div>
      </section>

      {/* Portfolio grid */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {work.map((item, i) => (
            <div key={item.name} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.3s' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', transform: 'translateY(8px)', opacity: 0, transition: 'all 0.3s' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: item.color, margin: '0 0 4px', fontWeight: 700 }}>{item.type}</p>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>{item.name}</h3>
              </div>
              {/* Always visible label */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                <span style={{ fontSize: '10px', background: item.color, color: '#0c0c0c', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ background: '#111', borderTop: '1px solid #1a1a1a', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373', margin: '0 0 2.5rem' }}>What We Do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1a1a1a' }}>
            {[['01', 'Brand Identity', 'Logo, guidelines, voice & positioning'], ['02', 'UI / UX Design', 'Apps, dashboards & design systems'], ['03', 'Motion Design', 'Animation, video & interactive media'], ['04', 'Web Design', 'Marketing sites, landing pages & stores']].map(([num, name, desc]) => (
              <div key={name} style={{ background: '#111', padding: '2.5rem 2rem' }}>
                <p style={{ fontSize: '11px', color: '#737373', margin: '0 0 0.75rem', fontWeight: 700 }}>{num}</p>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 0.625rem' }}>{name}</h3>
                <p style={{ fontSize: '13px', color: '#737373', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
