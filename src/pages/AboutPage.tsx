import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Designer',
    avatar: 'AR',
    color: '#38bdf8',
  },
  {
    name: 'Sam Chen',
    role: 'Lead Developer',
    avatar: 'SC',
    color: '#a78bfa',
  },
  {
    name: 'Jordan Lee',
    role: 'Template Creator',
    avatar: 'JL',
    color: '#34d399',
  },
];

const values = [
  {
    title: 'Quality first',
    desc: 'Every template goes through a rigorous design and code review before it reaches our marketplace.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="1.75" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Developer experience',
    desc: 'Clean, well-documented code so you spend time building features — not deciphering someone else\'s spaghetti.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="1.75" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Fair pricing',
    desc: 'Buy once, use forever. No subscriptions, no seat limits — just honest one-time pricing.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="1.75" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  useSEO({ title: 'About', description: 'Learn about Templix — who we are, our mission, and the team behind the templates.' });

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid #1e293b', background: '#020617' }}>
        <Container style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '760px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '0.875rem' }}>
            About us
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 1.25rem' }}>
            We build templates so you can build products
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>
            Templix started with a simple frustration — spending days on boilerplate instead of shipping features.
            We build high-quality, production-ready templates so developers and founders can skip the setup and get straight to building.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section style={{ borderBottom: '1px solid #1e293b' }}>
        <Container style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            What we believe
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {values.map(v => (
              <div key={v.title} style={{
                borderRadius: '16px', border: '1px solid #1e293b',
                background: '#0f172a', padding: '1.5rem',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.15)',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section style={{ borderBottom: '1px solid #1e293b' }}>
        <Container style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            The team
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {team.map(member => (
              <div key={member.name} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                borderRadius: '16px', border: '1px solid #1e293b',
                background: '#0f172a', padding: '1.25rem 1.5rem',
                minWidth: '220px',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, color: '#020617',
                }}>
                  {member.avatar}
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{member.name}</p>
                  <p style={{ fontSize: '13px', color: '#475569', margin: '2px 0 0' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container style={{ paddingTop: '4rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            Ready to build faster?
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '1.75rem' }}>
            Browse our library of professionally designed templates.
          </p>
          <Link to="/templates" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            borderRadius: '12px', background: '#38bdf8',
            padding: '13px 28px', fontSize: '15px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            Browse templates
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Container>
      </section>

    </div>
  );
}
