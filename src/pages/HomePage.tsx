import { Link } from 'react-router-dom';
import { templates } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <FeaturesSection />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#020617' }}>

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
        backgroundSize: '72px 72px', pointerEvents: 'none',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'rgba(14,165,233,0.1)', borderRadius: '9999px',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <Container style={{
        position: 'relative',
        paddingTop: '7rem', paddingBottom: '7rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>


        {/* Headline */}
        <h1 style={{
          maxWidth: '900px',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 900, letterSpacing: '-0.03em',
          lineHeight: 1.08, color: '#ffffff', margin: 0,
        }}>
          The best templates to{' '}
          <span style={{ color: '#38bdf8' }}>launch your</span>{' '}
          next project
        </h1>

        {/* Subtitle */}
        <p style={{
          marginTop: '1.75rem', maxWidth: '600px',
          fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7,
        }}>
          Browse our library of professionally designed website templates.
          Pick one, customize it, and ship in minutes.
        </p>

        {/* CTA Buttons */}
        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/templates" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            borderRadius: '12px', background: '#38bdf8',
            padding: '14px 28px', fontSize: '15px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            Browse templates
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link to="/templates?filter=free" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            borderRadius: '12px', border: '1px solid #334155',
            background: 'rgba(30,41,59,0.6)',
            padding: '14px 28px', fontSize: '15px', fontWeight: 600,
            color: '#ffffff', textDecoration: 'none',
          }}>
            View free templates
          </Link>
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURED TEMPLATES
───────────────────────────────────────────── */
function FeaturedSection() {
  const featured = templates.filter(t => t.isFeatured);

  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
              Featured
            </p>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              Handpicked templates
            </h2>
            <p style={{ marginTop: '8px', color: '#94a3b8', fontSize: '15px' }}>
              Carefully selected for quality and design.
            </p>
          </div>
          <Link to="/templates" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '14px', fontWeight: 500, color: '#38bdf8', textDecoration: 'none',
          }}>
            View all
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {featured.map(t => <TemplateCard key={t.id} template={t} />)}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES / WHY US
───────────────────────────────────────────── */
const features = [
  {
    emoji: '⚡',
    title: 'Ready to use',
    desc: 'Every template is production-ready. Download, customize, and go live in minutes.',
  },
  {
    emoji: '🎨',
    title: 'Beautiful design',
    desc: 'Crafted by professional designers with pixel-perfect attention to detail.',
  },
  {
    emoji: '📦',
    title: 'Clean code',
    desc: 'Built with modern tech — React, Next.js, HTML/CSS. Easy to read and extend.',
  },
  {
    emoji: '🔄',
    title: 'Free updates',
    desc: 'Buy once and receive all future updates and improvements for free.',
  },
  {
    emoji: '🛡️',
    title: 'Commercial license',
    desc: 'Use any template for client projects or your own business without restrictions.',
  },
  {
    emoji: '💬',
    title: 'Support included',
    desc: 'Got a question? Our team is ready to help you set up and customize your template.',
  },
];

function FeaturesSection() {
  return (
    <section style={{ background: '#0a1628', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Why Templix
          </p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Everything you need to ship faster
          </h2>
          <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '1.0625rem', maxWidth: '520px', margin: '1rem auto 0' }}>
            Our templates come packed with everything to get your project live quickly.
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div key={f.title} style={{
              borderRadius: '16px',
              border: '1px solid #1e293b',
              background: '#020617',
              padding: '1.5rem',
            }}>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.2)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '1rem',
              }}>
                {f.emoji}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

