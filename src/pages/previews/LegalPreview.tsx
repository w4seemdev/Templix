const attorneys = [
  { name: 'Margaret L. Hayes', role: 'Senior Partner', specialty: 'Corporate Law', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', bar: 'NY Bar 2001' },
  { name: 'David K. Okafor', role: 'Partner', specialty: 'Litigation', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bar: 'NY Bar 2008' },
  { name: 'Sofia Reyes', role: 'Associate', specialty: 'Employment Law', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', bar: 'CA Bar 2015' },
];

const areas = [
  { icon: '🏢', name: 'Corporate Law', desc: 'M&A, joint ventures, restructuring, and corporate governance for mid-market to Fortune 500 companies.' },
  { icon: '⚖️', name: 'Commercial Litigation', desc: 'Trial-tested advocates for complex disputes, arbitration, and appellate proceedings.' },
  { icon: '👔', name: 'Employment & Labor', desc: 'Wrongful termination, discrimination, wage claims, and executive employment agreements.' },
  { icon: '🏠', name: 'Real Estate', desc: 'Commercial acquisitions, leasing, development, and real estate finance transactions.' },
  { icon: '📋', name: 'Intellectual Property', desc: 'Trademark, patent, copyright and trade secret protection for your ideas and brand.' },
  { icon: '🌐', name: 'International', desc: 'Cross-border transactions, regulatory compliance, and global dispute resolution.' },
];

export default function LegalPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', color: '#111827', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#0f1923', padding: '0 2.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>LAW & CO</span>
          <span style={{ fontSize: '10px', color: '#9ca3af', display: 'block', letterSpacing: '0.15em', marginTop: '-2px' }}>ATTORNEYS AT LAW</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Practice Areas', 'Our Team', 'Results', 'Blog', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '12px', color: '#9ca3af', cursor: 'pointer', fontWeight: 500, letterSpacing: '0.04em' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#b8960c', border: 'none', borderRadius: '4px', padding: '10px 22px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Free Consultation
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '560px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,25,35,0.95) 45%, rgba(15,25,35,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', padding: '5rem 4rem', maxWidth: '640px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#b8960c', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>Founded 1998 · New York · Los Angeles</p>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 1.25rem' }}>
            Principled counsel.<br />Proven results.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Law & Co has represented clients in over $4B in transactions and litigation over 25 years of practice across the United States.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: '#b8960c', border: 'none', borderRadius: '4px', padding: '13px 28px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Schedule Consultation</button>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '13px 28px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Our Practice</button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: '#b8960c', padding: '1.5rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '4rem', justifyContent: 'center' }}>
          {[['$4B+', 'In Transactions'], ['98%', 'Case Success Rate'], ['25+', 'Years of Practice'], ['180+', 'Awards Won']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0 0 2px' }}>{v}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practice areas */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Practice Areas</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2.5rem' }}>Comprehensive legal services for businesses and individuals</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {areas.map(area => (
            <div key={area.name} style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{area.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 0.625rem' }}>{area.name}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{area.desc}</p>
              <span style={{ fontSize: '13px', color: '#b8960c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Attorneys */}
      <section style={{ background: '#f9fafb', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Our Attorneys</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2.5rem' }}>Experience and expertise you can rely on</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {attorneys.map(a => (
              <div key={a.name} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={a.img} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>{a.name}</h3>
                  <p style={{ fontSize: '13px', color: '#b8960c', fontWeight: 600, margin: '0 0 4px' }}>{a.role} · {a.specialty}</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{a.bar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
