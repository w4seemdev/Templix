/* ============================================================
   AGENCY PRO — Agency Website Template
   Pure black with electric blue accent — bold & modern
   ============================================================ */

export default function AgencyProPreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <AgencyNav />
      <AgencyHero />
      <ClientLogos />
      <ServicesSection />
      <WorkSection />
      <TeamSection />
      <AgencyCTA />
      <AgencyFooter />
    </div>
  );
}

function AgencyNav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#3b82f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>VOLT STUDIO</span>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {['Work', 'Services', 'About', 'Journal'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#737373', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{ background: '#3b82f6', borderRadius: '8px', padding: '9px 20px', fontSize: '14px', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>
          Start a project
        </a>
      </div>
    </header>
  );
}

function AgencyHero() {
  return (
    <section style={{ padding: '7rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '2rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }} />
          <span style={{ fontSize: '13px', color: '#93c5fd' }}>Now booking for Q3 2024</span>
        </div>
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 2rem', maxWidth: '900px' }}>
          We build brands<br />
          <span style={{ color: '#3b82f6' }}>people remember.</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: '900px' }}>
          <p style={{ fontSize: '1.0625rem', color: '#737373', lineHeight: 1.75, margin: 0 }}>
            Volt Studio is a full-service creative agency specializing in brand identity, digital design, and web development for ambitious companies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: '#3b82f6', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>See our work ↓</a>
            <a href="#" style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>Our services</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  const logos = ['Spotify', 'Airbnb', 'Shopify', 'Figma', 'Notion', 'Linear'];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
        {logos.map(l => <span key={l} style={{ fontSize: '15px', fontWeight: 700, color: '#262626', letterSpacing: '-0.02em' }}>{l}</span>)}
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { num: '01', title: 'Brand Identity', desc: 'Strategy, naming, logo design, visual systems, and full brand guidelines.' },
    { num: '02', title: 'Web Design', desc: 'Beautiful, high-converting websites built on modern technology.' },
    { num: '03', title: 'Development', desc: 'React, Next.js, and headless CMS solutions built to scale.' },
    { num: '04', title: 'Motion & Video', desc: 'Brand films, animations, and social content that moves people.' },
  ];
  return (
    <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: 0 }}>What we do</h2>
          <a href="#" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>All services →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
          {services.map(s => (
            <div key={s.num} style={{ background: '#000000', padding: '2.5rem 2rem' }}>
              <span style={{ display: 'block', fontSize: '12px', color: '#3b82f6', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em' }}>{s.num}</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem', color: '#ffffff' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const works = [
  { title: 'Aura — Brand Identity', type: 'Branding', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { title: 'Crest — Web Design', type: 'Web', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80' },
  { title: 'Meld — App UI', type: 'Product', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
];

function WorkSection() {
  return (
    <section style={{ padding: '2rem 0 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: 0 }}>Selected work</h2>
          <a href="#" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>All projects →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {works.map(w => (
            <a key={w.title} href="#" style={{ display: 'block', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', position: 'relative', aspectRatio: '4/3' }}>
              <img src={w.img} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'opacity 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.opacity = '0.7'}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.opacity = '0.5'}
              />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>{w.title}</h3>
                <span style={{ fontSize: '12px', background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '6px', padding: '3px 10px' }}>{w.type}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    { name: 'Marco Torres', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { name: 'Yuki Tanaka', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
    { name: 'Dev Patel', role: 'Head of Dev', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
    { name: 'Ines Leroy', role: 'Brand Strategist', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80' },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#050505' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '3rem' }}>The team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {team.map(t => (
            <div key={t.name}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1/1', marginBottom: '1rem', background: '#111' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{t.name}</h3>
              <p style={{ fontSize: '13px', color: '#525252' }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgencyCTA() {
  return (
    <section style={{ padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 2rem' }}>
        Ready to build<br /><span style={{ color: '#3b82f6' }}>something great?</span>
      </h2>
      <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#3b82f6', borderRadius: '12px', padding: '16px 36px', fontSize: '16px', fontWeight: 700, color: '#ffffff', textDecoration: 'none', boxShadow: '0 0 60px rgba(59,130,246,0.3)' }}>
        Let's talk →
      </a>
    </section>
  );
}

function AgencyFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em' }}>VOLT STUDIO</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Work', 'Services', 'About', 'Contact'].map(l => <a key={l} href="#" style={{ fontSize: '13px', color: '#404040', textDecoration: 'none' }}>{l}</a>)}
        </div>
        <span style={{ fontSize: '13px', color: '#262626' }}>© {new Date().getFullYear()} Volt Studio</span>
      </div>
    </footer>
  );
}
