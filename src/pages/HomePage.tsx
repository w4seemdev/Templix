import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Eye, MonitorPlay, Search, Sparkles, Star } from 'lucide-react';
import { templates, categories } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';

/* Derived, data-driven numbers — update automatically as templates.ts grows */
const freeCount     = templates.filter(t => t.isFree).length;
const categoryCount = categories.filter(c => c.id !== 'all').length;
const countFor      = (id: string) =>
  id === 'all' ? templates.length : templates.filter(t => t.category === id).length;

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <CategoryStrip />
      <FeaturedSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const trustBadges = [
  { icon: <Download size={14} />,    label: '12,000+ downloads' },
  { icon: <MonitorPlay size={14} />, label: `${templates.length} live previews` },
  { icon: <Sparkles size={14} />,    label: `${freeCount} free template${freeCount !== 1 ? 's' : ''}` },
];

function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#020617' }}>

      {/* Keyframes for the subtle animated gradient accents */}
      <style>{`
        @keyframes tmxHeroDrift {
          0%   { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.75; }
          50%  { transform: translateX(-46%) translateY(-18px) scale(1.06); opacity: 1; }
          100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.75; }
        }
        @keyframes tmxHeroDrift2 {
          0%   { transform: translateY(0) scale(1); opacity: 0.5; }
          50%  { transform: translateY(20px) scale(1.1); opacity: 0.9; }
          100% { transform: translateY(0) scale(1); opacity: 0.5; }
        }
        @keyframes tmxPulseDot {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
      `}</style>

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
        backgroundSize: '72px 72px', pointerEvents: 'none',
      }} />

      {/* Glow — slow drifting accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        width: '700px', height: '400px',
        background: 'rgba(14,165,233,0.1)', borderRadius: '9999px',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'tmxHeroDrift 9s ease-in-out infinite',
      }} />

      {/* Secondary glow — faint counter-drift, bottom left */}
      <div style={{
        position: 'absolute', bottom: '-120px', left: '-80px',
        width: '420px', height: '320px',
        background: 'rgba(56,189,248,0.06)', borderRadius: '9999px',
        filter: 'blur(90px)', pointerEvents: 'none',
        animation: 'tmxHeroDrift2 12s ease-in-out infinite',
      }} />

      <Container style={{
        position: 'relative',
        paddingTop: '7rem', paddingBottom: '7rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          borderRadius: '9999px',
          border: '1px solid rgba(56,189,248,0.25)',
          background: 'rgba(56,189,248,0.08)',
          padding: '6px 14px', marginBottom: '1.75rem',
          fontSize: '13px', fontWeight: 500, color: '#7dd3fc',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '9999px',
            background: '#38bdf8', flexShrink: 0,
            animation: 'tmxPulseDot 2.2s ease-in-out infinite',
          }} />
          New templates added every week
        </div>

        {/* Headline */}
        <h1 style={{
          maxWidth: '900px',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 900, letterSpacing: '-0.03em',
          lineHeight: 1.08, color: '#ffffff', margin: 0,
        }}>
          The best templates to{' '}
          <span style={{
            backgroundImage: 'linear-gradient(100deg, #7dd3fc 0%, #38bdf8 45%, #0ea5e9 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          }}>launch your</span>{' '}
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
            boxShadow: '0 0 32px rgba(56,189,248,0.35)',
          }}>
            Browse templates
            <ArrowRight size={16} strokeWidth={2.5} />
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

        {/* Trust badges */}
        <div style={{
          marginTop: '3rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '0.75rem',
        }}>
          {trustBadges.map(b => (
            <span key={b.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              padding: '8px 16px',
              fontSize: '13px', fontWeight: 500, color: '#94a3b8',
            }}>
              <span style={{ color: '#38bdf8', display: 'inline-flex' }}>{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const stats = [
  { value: `${templates.length}+`, label: 'Templates' },
  { value: `${categoryCount}`,     label: 'Categories' },
  { value: `${freeCount}`,         label: 'Free templates' },
  { value: '1×',                   label: 'Pay once, use forever' },
];

function StatsSection() {
  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
                {s.value}
              </p>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY QUICK-BROWSE STRIP
───────────────────────────────────────────── */
function CategoryStrip() {
  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>

        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
            Browse by category
          </h2>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
            {templates.length} templates across {categoryCount} categories
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map(cat => {
            const count = countFor(cat.id);
            const isAll = cat.id === 'all';
            return (
              <Link
                key={cat.id}
                to={isAll ? '/templates' : `/templates?category=${cat.id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  borderRadius: '9999px',
                  border: isAll ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  background: isAll ? 'rgba(56,189,248,0.08)' : 'rgba(255,255,255,0.03)',
                  padding: '9px 16px',
                  fontSize: '14px', fontWeight: 500,
                  color: isAll ? '#7dd3fc' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                {cat.label}
                <span style={{
                  fontSize: '12px', fontWeight: 600,
                  color: isAll ? '#38bdf8' : '#64748b',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '9999px', padding: '2px 8px',
                }}>
                  {count}
                </span>
              </Link>
            );
          })}
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
            View all {templates.length} templates
            <ArrowRight size={16} strokeWidth={2.5} />
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
   HOW IT WORKS
───────────────────────────────────────────── */
const steps = [
  {
    n: '01',
    icon: <Search size={20} />,
    title: 'Browse the library',
    desc: 'Filter by category, price, or tech stack to find the perfect starting point for your project.',
  },
  {
    n: '02',
    icon: <Eye size={20} />,
    title: 'Preview the live demo',
    desc: 'Every template ships with a full live preview. Click through real pages before you commit.',
  },
  {
    n: '03',
    icon: <Download size={20} />,
    title: 'Download & ship',
    desc: 'Grab the zip, drop in your content, and deploy. You can be live in minutes, not weeks.',
  },
];

function HowItWorksSection() {
  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            How it works
          </p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            From browsing to live in three steps
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.0625rem', maxWidth: '520px', margin: '1rem auto 0' }}>
            No subscriptions, no lock-in. Find a template you love and make it yours.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {steps.map(s => (
            <div key={s.n} style={{
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              padding: '1.75rem',
            }}>
              <span style={{
                position: 'absolute', top: '1.25rem', right: '1.5rem',
                fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em',
                color: 'rgba(56,189,248,0.18)',
              }}>
                {s.n}
              </span>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.2)',
                borderRadius: '12px', color: '#38bdf8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
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
    <section style={{ background: '#0a1628', borderTop: '1px solid #1e293b' }}>
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

/* ─────────────────────────────────────────────
   TESTIMONIALS / SOCIAL PROOF
───────────────────────────────────────────── */
const testimonials = [
  {
    quote: 'I shipped a client site over a single weekend with one of these templates. The code was so clean I barely had to touch it — just swapped the content and deployed.',
    name: 'Maya Chen',
    role: 'Frontend Developer, Nova Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80',
  },
  {
    quote: 'We launched our SaaS landing page in two days instead of two sprints. The live preview meant zero surprises — what we saw is exactly what we got.',
    name: 'Daniel Okafor',
    role: 'Founder, Brightstack',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&q=80',
  },
  {
    quote: 'As a designer, I am picky about typography and spacing. These are the first templates I have bought that I did not feel the need to redesign from scratch.',
    name: 'Sofia Marin',
    role: 'Freelance Product Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&q=80',
  },
];

function TestimonialsSection() {
  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Social proof
          </p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Loved by builders worldwide
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.0625rem', maxWidth: '520px', margin: '1rem auto 0' }}>
            Developers, founders, and designers ship faster with Templix.
          </p>
        </div>

        {/* Quote cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map(t => (
            <figure key={t.name} style={{
              display: 'flex', flexDirection: 'column',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              padding: '1.75rem', margin: 0,
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" strokeWidth={1} />
                ))}
              </div>

              <blockquote style={{ flex: 1, margin: 0, fontSize: '14.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
                “{t.quote}”
              </blockquote>

              <figcaption style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '1.5rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  style={{
                    width: '40px', height: '40px', borderRadius: '9999px',
                    objectFit: 'cover', border: '1px solid rgba(56,189,248,0.3)',
                  }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEWSLETTER
───────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section style={{ background: '#020617', borderTop: '1px solid #1e293b' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{
          borderRadius: '24px',
          border: '1px solid #1e293b',
          background: 'linear-gradient(135deg, #0f172a 0%, #0c1a2e 100%)',
          padding: '3.5rem 2.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '200px',
            background: 'rgba(56,189,248,0.06)', borderRadius: '9999px',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '0.75rem' }}>
            Stay in the loop
          </p>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            New templates every month
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
            Subscribe and be the first to know when new templates drop. No spam, ever.
          </p>

          {submitted ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              borderRadius: '12px', background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              padding: '14px 28px', fontSize: '15px', fontWeight: 500, color: '#34d399',
            }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You're on the list!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  borderRadius: '12px', border: '1px solid #334155',
                  background: '#020617', padding: '12px 18px',
                  fontSize: '14px', color: '#ffffff', outline: 'none',
                  minWidth: '260px',
                }}
              />
              <button type="submit" style={{
                borderRadius: '12px', background: '#38bdf8',
                border: 'none', padding: '12px 24px',
                fontSize: '14px', fontWeight: 600, color: '#020617',
                cursor: 'pointer',
              }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
