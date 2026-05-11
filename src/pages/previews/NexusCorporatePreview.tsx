/* ============================================================
   NEXUS — Corporate Website Template
   Dark navy with steel blue accent — professional & trustworthy
   ============================================================ */

export default function NexusCorporatePreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#030f1f', color: '#ffffff', minHeight: '100vh' }}>
      <NexusNav />
      <NexusHero />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <TeamSection />
      <NexusCTA />
      <NexusFooter />
    </div>
  );
}

function NexusNav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(3,15,31,0.92)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#60a5fa"/>
            <path d="M14 6L6 10v8l8 4 8-4v-8L14 6z" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M6 10l8 4 8-4M14 14v8" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>Nexus</span>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {['Services', 'About', 'Case Studies', 'Blog', 'Contact'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{ background: '#60a5fa', borderRadius: '8px', padding: '9px 22px', fontSize: '14px', fontWeight: 600, color: '#03162e', textDecoration: 'none' }}>
          Get a quote
        </a>
      </div>
    </header>
  );
}

function NexusHero() {
  return (
    <section style={{ padding: '6rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '13px', color: '#93c5fd' }}>🏆 Best Business Solutions 2024</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
            Strategic solutions for{' '}
            <span style={{ color: '#60a5fa' }}>sustainable growth</span>
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '480px' }}>
            Nexus partners with Fortune 500 companies and ambitious startups to solve complex business challenges through strategy, technology, and operations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: '#60a5fa', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#03162e', textDecoration: 'none' }}>
              Explore our services
            </a>
            <a href="#" style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#94a3b8', textDecoration: 'none' }}>
              View case studies
            </a>
          </div>
        </div>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '4/3' }}>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80" alt="office" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '20+', label: 'Years of experience' },
    { value: '450+', label: 'Projects completed' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '$2B+', label: 'Revenue generated' },
  ];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '3.5rem 0', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#60a5fa' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: '📊', title: 'Strategy Consulting', desc: 'Business transformation, market entry strategy, and organizational design for lasting competitive advantage.' },
    { icon: '💻', title: 'Digital Transformation', desc: 'Technology roadmaps, digital operations, and enterprise software implementation at scale.' },
    { icon: '📈', title: 'Financial Advisory', desc: 'M&A advisory, valuation, capital structure optimization, and financial performance management.' },
    { icon: '🔍', title: 'Market Research', desc: 'Deep consumer insights, competitive analysis, and market sizing to inform your strategic decisions.' },
    { icon: '⚙️', title: 'Operations Excellence', desc: 'Process optimization, supply chain, and lean methodology to reduce costs and improve efficiency.' },
    { icon: '🌐', title: 'Global Expansion', desc: 'Localization strategy, regulatory guidance, and partner networks in 40+ countries worldwide.' },
  ];
  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#60a5fa', marginBottom: '8px' }}>What we do</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Services designed for impact</h2>
          <p style={{ color: '#64748b', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto' }}>
            From strategy to execution, we help organizations navigate complexity and deliver sustainable results.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
          {services.map(s => (
            <div key={s.title} style={{ background: '#030f1f', padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '28px', marginBottom: '1rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.75 }}>{s.desc}</p>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '13px', color: '#60a5fa', textDecoration: 'none' }}>Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: 'Nexus helped us identify $40M in operational savings within the first 6 months. Their team brings rare depth and a practical, results-first mindset.', name: 'Catherine Moore', role: 'CEO, Meridian Group', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80' },
    { quote: 'Our digital transformation was complex and high stakes. Nexus delivered on every commitment, on time, and made the transition seamless for our 5,000-person organization.', name: 'Robert Chen', role: 'CTO, Apex Industries', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Client success stories</h2>
          <a href="#" style={{ fontSize: '14px', color: '#60a5fa', textDecoration: 'none' }}>All case studies →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '2.5rem' }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="#60a5fa" opacity={0.4} style={{ marginBottom: '1.25rem' }}>
                <path d="M0 20V12C0 5.373 4.477 1.22 13.43 0L14 2.86C9.9 3.7 7.67 6.15 7.5 10H12V20H0zm16 0V12C16 5.373 20.477 1.22 29.43 0L30 2.86C25.9 3.7 23.67 6.15 23.5 10H28V20H16z"/>
              </svg>
              <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.75, marginBottom: '2rem', fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={t.img} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    { name: 'Dr. William Hayes', role: 'Managing Partner', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
    { name: 'Sarah Park', role: 'VP Strategy', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
    { name: 'Lucas Ferreira', role: 'Head of Digital', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
    { name: 'Emma Thornton', role: 'Head of Finance', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Leadership team</h2>
          <a href="#" style={{ fontSize: '14px', color: '#60a5fa', textDecoration: 'none' }}>Full team →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {team.map(t => (
            <div key={t.name}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/5', marginBottom: '1rem', background: '#0d1e33' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(20%)' }} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{t.name}</h3>
              <p style={{ fontSize: '13px', color: '#60a5fa' }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NexusCTA() {
  return (
    <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', borderRadius: '20px', border: '1px solid rgba(96,165,250,0.2)', background: 'rgba(96,165,250,0.04)', padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem', position: 'relative' }}>
          Ready to transform your business?
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.0625rem', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem', position: 'relative' }}>
          Schedule a complimentary 60-minute consultation with one of our senior partners.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          <a href="#" style={{ background: '#60a5fa', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, color: '#03162e', textDecoration: 'none' }}>
            Schedule a consultation
          </a>
          <a href="#" style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: '#94a3b8', textDecoration: 'none' }}>
            Download company profile
          </a>
        </div>
      </div>
    </section>
  );
}

function NexusFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3.5rem 0 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', marginBottom: '3rem' }}>
        <div style={{ maxWidth: '260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#60a5fa"/><path d="M14 6L6 10v8l8 4 8-4v-8L14 6z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M6 10l8 4 8-4M14 14v8" stroke="white" strokeWidth="1.5"/></svg>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>Nexus</span>
          </div>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.7 }}>Global management consulting firm helping organizations achieve transformational growth.</p>
        </div>
        {[
          { title: 'Services', links: ['Strategy', 'Digital', 'Finance', 'Operations'] },
          { title: 'Company', links: ['About', 'Team', 'Careers', 'Press'] },
          { title: 'Resources', links: ['Case Studies', 'Blog', 'White Papers', 'Events'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', marginBottom: '1rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: '#334155', textDecoration: 'none' }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 2rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '13px', color: '#1e293b', margin: 0 }}>© {new Date().getFullYear()} Nexus Consulting Group. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Privacy Policy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" style={{ fontSize: '13px', color: '#1e293b', textDecoration: 'none' }}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}
