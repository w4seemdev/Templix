/* ============================================================
   FOLIO — Portfolio Template
   Minimal dark, white accent, for designers & developers
   ============================================================ */

export default function FolioPortfolioPreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0c0c0c', color: '#ffffff', minHeight: '100vh' }}>
      <FolioNav />
      <FolioHero />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      <FolioFooter />
    </div>
  );
}

function FolioNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em' }}>alex<span style={{ color: '#a3a3a3' }}>.dev</span></span>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['Work', 'About', 'Skills', 'Contact'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#737373', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
          padding: '7px 18px', fontSize: '13px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
        }}>
          Hire me
        </a>
      </div>
    </header>
  );
}

function FolioHero() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '7rem 2rem 5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: '13px', color: '#737373' }}>Available for freelance work</span>
      </div>
      <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem', maxWidth: '800px' }}>
        I design &amp; build{' '}
        <span style={{ color: '#737373' }}>digital experiences</span>{' '}
        that matter.
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#525252', lineHeight: 1.75, maxWidth: '520px', marginBottom: '2.5rem' }}>
        Full-stack developer &amp; UI designer crafting clean, performant products for startups and growing companies.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ffffff', borderRadius: '10px', padding: '12px 24px',
          fontSize: '14px', fontWeight: 700, color: '#0c0c0c', textDecoration: 'none',
        }}>
          View my work ↓
        </a>
        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 24px',
          fontSize: '14px', fontWeight: 600, color: '#a3a3a3', textDecoration: 'none',
        }}>
          Download CV
        </a>
      </div>
    </section>
  );
}

const projects = [
  { title: 'Lumify Dashboard', category: 'SaaS · UI Design', year: '2024', color: '#7c3aed', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80' },
  { title: 'ShopEasy App', category: 'Mobile · Ecommerce', year: '2024', color: '#0891b2', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80' },
  { title: 'Bloom Magazine', category: 'Web · Editorial', year: '2023', color: '#059669', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80' },
  { title: 'Nexus Brand', category: 'Branding · Identity', year: '2023', color: '#b45309', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
];

function ProjectsSection() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>Selected work</h2>
        <a href="#" style={{ fontSize: '13px', color: '#525252', textDecoration: 'none' }}>View all →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '1.5rem' }}>
        {projects.map(p => (
          <a key={p.title} href="#" style={{
            display: 'block', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none',
            position: 'relative', aspectRatio: '16/10', background: '#1a1a1a',
          }}>
            <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{
              position: 'absolute', inset: 0, padding: '1.5rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#a3a3a3' }}>{p.category}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>{p.title}</h3>
                <span style={{ fontSize: '12px', color: '#525252' }}>{p.year}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    { label: 'React / Next.js', level: 95 },
    { label: 'TypeScript', level: 90 },
    { label: 'UI / UX Design', level: 88 },
    { label: 'Node.js', level: 82 },
    { label: 'Figma', level: 92 },
    { label: 'CSS / Tailwind', level: 96 },
  ];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '2.5rem' }}>Skills &amp; tools</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {skills.map(s => (
            <div key={s.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#a3a3a3' }}>{s.label}</span>
                <span style={{ fontSize: '13px', color: '#525252' }}>{s.level}%</span>
              </div>
              <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ height: '100%', borderRadius: '9999px', background: '#ffffff', width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#525252' }}>About me</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1.25rem', color: '#ffffff' }}>
            Building with purpose since 2018
          </h2>
          <p style={{ fontSize: '15px', color: '#737373', lineHeight: 1.8, marginBottom: '1rem' }}>
            I'm a developer and designer based in San Francisco. I love creating products that are both beautiful and functional — the kind of software people genuinely enjoy using.
          </p>
          <p style={{ fontSize: '15px', color: '#737373', lineHeight: 1.8 }}>
            When I'm not at my desk I'm hiking, reading about design history, or experimenting with new cooking recipes.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { value: '50+', label: 'Projects delivered' },
            { value: '6yr', label: 'Experience' },
            { value: '30+', label: 'Happy clients' },
            { value: '12', label: 'Open source repos' },
          ].map(s => (
            <div key={s.label} style={{
              borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)', padding: '1.5rem',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#525252', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', margin: '0 0 1rem' }}>
          Let's work together
        </h2>
        <p style={{ color: '#525252', fontSize: '1.0625rem', marginBottom: '2.5rem' }}>
          Got a project in mind? I'd love to hear about it.
        </p>
        <a href="mailto:hello@alex.dev" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ffffff', borderRadius: '12px', padding: '14px 32px',
          fontSize: '15px', fontWeight: 700, color: '#0c0c0c', textDecoration: 'none',
        }}>
          Send me a message ✉️
        </a>
      </div>
    </section>
  );
}

function FolioFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>alex.dev</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Twitter', 'GitHub', 'Dribbble', 'LinkedIn'].map(s => (
            <a key={s} href="#" style={{ fontSize: '13px', color: '#525252', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#262626' }}>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
