const projects = [
  { name: 'Meridian Commercial Plaza', type: 'Commercial', value: '$24M', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', status: 'Completed' },
  { name: 'Oakwood Residential Complex', type: 'Residential', value: '$8.5M', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80', status: 'Completed' },
  { name: 'Northgate Bridge Expansion', type: 'Infrastructure', value: '$42M', img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80', status: 'In Progress' },
];

export default function ConstructionPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', color: '#0f172a', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#0f172a', padding: '0 2.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: '#f59e0b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px' }}>🏗️</span>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>BRIX</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Services', 'Projects', 'About', 'Safety', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#94a3b8', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#f59e0b', border: 'none', borderRadius: '6px', padding: '10px 22px', fontSize: '13px', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>
          Request Quote
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '580px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.92) 45%, rgba(15,23,42,0.4))' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#f59e0b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>Est. 1988 · Licensed & Bonded</p>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
              Building what<br />matters most.
            </h1>
            <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.75, marginBottom: '2rem' }}>
              35+ years of delivering complex commercial, residential, and infrastructure projects on time and on budget.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: '#f59e0b', border: 'none', borderRadius: '6px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>Our Projects</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Free Estimate</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#f59e0b', padding: '1.75rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '4rem', justifyContent: 'center' }}>
          {[['500+', 'Projects Completed'], ['$1.2B+', 'Total Project Value'], ['35+', 'Years Experience'], ['98%', 'On-Time Delivery']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>{v}</p>
              <p style={{ fontSize: '11px', color: 'rgba(15,23,42,0.65)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>What We Build</h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 2.5rem' }}>End-to-end construction services from concept to completion</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {[['🏢', 'Commercial', 'Office towers, retail centers, hotels and industrial facilities.'], ['🏘️', 'Residential', 'Custom homes, apartments and mixed-use developments.'], ['🌉', 'Infrastructure', 'Bridges, highways, utilities and public works projects.']].map(([icon, name, desc]) => (
            <div key={name as string} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', cursor: 'pointer' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 0.625rem' }}>{name as string}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {projects.map(p => (
            <div key={p.name} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: p.status === 'Completed' ? '#16a34a' : '#f59e0b', color: p.status === 'Completed' ? '#fff' : '#0f172a', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>{p.status}</span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 0.5rem' }}>{p.type}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#f59e0b', margin: 0 }}>Contract Value: {p.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
