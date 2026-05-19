const projects = [
  { name: 'Casa Minerva', location: 'Barcelona, Spain', type: 'Residential', year: '2024', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { name: 'Nexus Office Tower', location: 'Singapore', type: 'Commercial', year: '2023', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { name: 'The Ridge Retreat', location: 'Aspen, CO', type: 'Residential', year: '2023', img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80' },
  { name: 'Maritime Cultural Centre', location: 'Oslo, Norway', type: 'Cultural', year: '2022', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' },
];

export default function ArchitecturePreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8f8f6', color: '#1a1a18', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#f8f8f6', borderBottom: '1px solid #e0e0d8', padding: '0 3rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a1a18' }}>FORMA STUDIO</span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Projects', 'Process', 'Studio', 'Awards', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '12px', color: '#737370', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#1a1a18', border: 'none', borderRadius: '4px', padding: '9px 20px', fontSize: '12px', color: '#f8f8f6', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Get In Touch
        </button>
      </nav>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh' }}>
        <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#737370', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Est. 2008 · Barcelona · New York</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 1.5rem', color: '#1a1a18' }}>
            Building<br />with<br />purpose.
          </h1>
          <p style={{ fontSize: '15px', color: '#737370', lineHeight: 1.8, maxWidth: '380px', marginBottom: '2.5rem' }}>
            We design spaces that inspire. From private residences to cultural institutions, every project is a dialogue between form, function, and place.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ background: '#1a1a18', border: 'none', borderRadius: '4px', padding: '13px 28px', fontSize: '13px', fontWeight: 600, color: '#f8f8f6', cursor: 'pointer', letterSpacing: '0.04em' }}>View Projects</button>
            <button style={{ background: 'transparent', border: '1px solid #c4c4bc', borderRadius: '4px', padding: '13px 28px', fontSize: '13px', fontWeight: 500, color: '#1a1a18', cursor: 'pointer' }}>Our Process</button>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#1a1a18', padding: '2.5rem 4rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '5rem', justifyContent: 'center' }}>
          {[['140+', 'Projects Built'], ['18', 'Countries'], ['60+', 'Awards'], ['16', 'Years']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#f8f8f6', margin: '0 0 4px', letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ fontSize: '11px', color: '#737370', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737370', margin: 0 }}>Selected Work</h2>
          <span style={{ fontSize: '12px', color: '#737370', cursor: 'pointer', letterSpacing: '0.06em' }}>View all projects →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '12px' }}>
          {projects.map((p, i) => (
            <div key={p.name} style={{ gridColumn: i === 0 ? '1' : 'auto', gridRow: i === 0 ? '1 / 3' : 'auto', position: 'relative', overflow: 'hidden', borderRadius: '4px', cursor: 'pointer', aspectRatio: i === 0 ? '4/5' : '4/3' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.type} · {p.year}</p>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
