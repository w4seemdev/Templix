/* ============================================================
   LUMINARY — SaaS Landing Page Template
   A premium dark SaaS template with violet/blue accent
   ============================================================ */

import { useState } from 'react';

export default function LuminarySaasPreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#05070f', color: '#ffffff', minHeight: '100vh' }}>
      <LuminaryNav />
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <LuminaryFooter />
    </div>
  );
}

/* ─── NAV ─── */
function LuminaryNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(5,7,15,0.85)', backdropFilter: 'blur(16px)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 2rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>Luminary</span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['Features', 'Pricing', 'Docs', 'Blog'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Sign in</a>
          <a href="#" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '10px', padding: '8px 18px',
            fontSize: '14px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
          }}>
            Get started free
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '6rem', paddingBottom: '5rem' }}>

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '200px', left: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(139,92,246,0.4)',
            background: 'rgba(139,92,246,0.1)',
            borderRadius: '9999px', padding: '6px 16px',
            fontSize: '13px', color: '#c4b5fd',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
            Now in beta — Try for free, no credit card required
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          textAlign: 'center', maxWidth: '820px', margin: '0 auto',
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08,
        }}>
          Ship your product{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            10x faster
          </span>
          {' '}than before
        </h1>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center', maxWidth: '560px', margin: '1.5rem auto 0',
          fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.75,
        }}>
          Luminary gives your team the tools to collaborate, ship, and scale — all in one beautiful platform built for modern teams.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '12px', padding: '14px 28px',
            fontSize: '15px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
            boxShadow: '0 0 40px rgba(139,92,246,0.3)',
          }}>
            Start for free
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '12px', padding: '14px 28px',
            fontSize: '15px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
            </svg>
            Watch demo
          </a>
        </div>

        {/* Dashboard mockup */}
        <div style={{
          marginTop: '4rem',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#0d1117',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(139,92,246,0.15), 0 40px 100px rgba(0,0,0,0.5)',
        }}>
          {/* Window bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: '#0a0e1a',
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
            <div style={{ flex: 1, marginLeft: '12px', background: '#1a2035', borderRadius: '6px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', color: '#475569' }}>app.luminary.io/dashboard</span>
            </div>
          </div>

          {/* App layout */}
          <div style={{ display: 'flex', height: '420px' }}>
            {/* Sidebar */}
            <div style={{ width: '220px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem 1rem', flexShrink: 0 }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Workspace</div>
                {[
                  { icon: '▦', label: 'Dashboard', active: true },
                  { icon: '◈', label: 'Projects' },
                  { icon: '◎', label: 'Analytics' },
                  { icon: '◷', label: 'Timeline' },
                  { icon: '◻', label: 'Team' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '7px 10px', borderRadius: '8px', marginBottom: '2px',
                    background: item.active ? 'rgba(139,92,246,0.15)' : 'transparent',
                    color: item.active ? '#a78bfa' : '#475569', fontSize: '13px',
                  }}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Recent</div>
                {['Website Redesign', 'Mobile App v2', 'API Migration'].map(p => (
                  <div key={p} style={{ padding: '6px 10px', fontSize: '12px', color: '#334155', borderRadius: '6px', marginBottom: '2px' }}>{p}</div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '1.5rem', overflow: 'hidden' }}>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Active Tasks', value: '142', change: '+12%', color: '#8b5cf6' },
                  { label: 'Completed', value: '891', change: '+8%', color: '#10b981' },
                  { label: 'Team Members', value: '24', change: '+2', color: '#3b82f6' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px', padding: '14px',
                  }}>
                    <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>{stat.label}</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', color: stat.color, marginTop: '4px' }}>{stat.change} this week</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px', padding: '16px', marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Velocity Overview</span>
                  <span style={{ fontSize: '11px', color: '#475569' }}>Last 7 days</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                  {[45, 65, 40, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0',
                      background: i === 5
                        ? 'linear-gradient(180deg, #8b5cf6, rgba(139,92,246,0.3))'
                        : 'rgba(139,92,246,0.2)',
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <span key={d} style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: '#334155' }}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
                {[
                  { title: 'Design system v2', status: 'In Progress', color: '#8b5cf6' },
                  { title: 'API rate limiting', status: 'Review', color: '#f59e0b' },
                  { title: 'Onboarding flow', status: 'Done', color: '#10b981' },
                ].map(task => (
                  <div key={task.title} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.color }} />
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{task.title}</span>
                    </div>
                    <span style={{
                      fontSize: '11px', padding: '2px 8px', borderRadius: '9999px',
                      background: `${task.color}20`, color: task.color,
                    }}>{task.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── LOGOS ─── */
function LogosSection() {
  const logos = ['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma', 'Supabase'];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#334155', marginBottom: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Trusted by teams at world-class companies
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {logos.map(name => (
            <span key={name} style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.02em' }}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
const features = [
  { icon: '⚡', title: 'Blazing Fast', desc: 'Built on cutting-edge infrastructure to ensure your team never waits. Sub-100ms response times globally.' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'SOC2 Type II certified with end-to-end encryption, SSO, and granular permission controls.' },
  { icon: '🤝', title: 'Real-time Collaboration', desc: 'Work together seamlessly with live cursors, comments, and instant notifications for every change.' },
  { icon: '📊', title: 'Powerful Analytics', desc: 'Understand your team\'s performance with beautiful charts, velocity tracking, and custom reports.' },
  { icon: '🔗', title: '100+ Integrations', desc: 'Connect with the tools you already use — GitHub, Slack, Figma, Jira, and many more.' },
  { icon: '🤖', title: 'AI-Powered', desc: 'Let AI write your docs, summarize threads, auto-assign tasks, and predict project timelines.' },
];

function FeaturesSection() {
  return (
    <section style={{ padding: '6rem 0', background: '#05070f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b5cf6' }}>
            Features
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem', color: '#ffffff' }}>
            Everything your team needs
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto' }}>
            A complete platform that handles all the complexity so your team can focus on what matters.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div key={f.title} style={{
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.75rem',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '1.25rem',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Create your workspace', desc: 'Sign up and set up your team workspace in under 2 minutes. Invite your team and you\'re ready to go.' },
    { num: '02', title: 'Organize your work', desc: 'Create projects, break them down into tasks, assign owners, and set due dates with a few clicks.' },
    { num: '03', title: 'Ship with confidence', desc: 'Track progress in real time, spot blockers early, and celebrate your team\'s wins — all in one place.' },
  ];
  return (
    <section style={{ padding: '6rem 0', background: '#080b18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b5cf6' }}>How it works</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0', color: '#ffffff' }}>
            Up and running in minutes
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: '22px', left: 'calc(100% - 0px)', width: '2rem',
                  height: '1px', background: 'rgba(139,92,246,0.3)',
                  display: 'none',
                }} />
              )}
              <div style={{
                fontSize: '13px', fontWeight: 700, color: '#8b5cf6',
                fontVariantNumeric: 'tabular-nums', marginBottom: '1rem',
                letterSpacing: '0.05em',
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.75 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
const testimonials = [
  {
    quote: "Luminary cut our sprint planning time in half. Our team ships 3x faster and everyone finally knows what's going on.",
    name: 'Sarah Chen', role: 'Engineering Lead', company: 'Vercel', avatar: 'SC',
  },
  {
    quote: "We evaluated 6 tools before choosing Luminary. The analytics alone are worth the price — nothing else comes close.",
    name: 'Marcus Webb', role: 'VP of Product', company: 'Linear', avatar: 'MW',
  },
  {
    quote: "Onboarding took 10 minutes. Our entire 40-person org was fully migrated in a week. Incredible product.",
    name: 'Priya Nair', role: 'Chief of Staff', company: 'Notion', avatar: 'PN',
  },
];

function TestimonialsSection() {
  return (
    <section style={{ padding: '6rem 0', background: '#080b18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b5cf6' }}>Testimonials</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0', color: '#ffffff' }}>
            Loved by 10,000+ teams
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              padding: '2rem',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                ))}
              </div>
              {/* Quote */}
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.75, margin: 0, flex: 1 }}>
                "{t.quote}"
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#ffffff', flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter', price: annual ? 0 : 0, label: 'Free forever',
      desc: 'Perfect for small teams and side projects.',
      features: ['Up to 5 members', '3 projects', '1GB storage', 'Basic integrations', 'Community support'],
      cta: 'Start for free', highlight: false,
    },
    {
      name: 'Pro', price: annual ? 19 : 29, label: '/month per seat',
      desc: 'For growing teams that need more power.',
      features: ['Unlimited members', 'Unlimited projects', '50GB storage', '100+ integrations', 'Priority support', 'Advanced analytics', 'Custom workflows'],
      cta: 'Start free trial', highlight: true,
    },
    {
      name: 'Enterprise', price: null, label: 'Custom pricing',
      desc: 'For large organizations with custom needs.',
      features: ['Everything in Pro', 'SSO & SAML', 'SLA guarantee', 'Dedicated manager', 'Custom contracts', 'On-premise option'],
      cta: 'Contact sales', highlight: false,
    },
  ];

  return (
    <section style={{ padding: '6rem 0', background: '#05070f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b5cf6' }}>Pricing</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem', color: '#ffffff' }}>
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '4px' }}>
            {['Monthly', 'Annual'].map(opt => (
              <button key={opt} onClick={() => setAnnual(opt === 'Annual')} style={{
                padding: '6px 20px', borderRadius: '9999px', border: 'none',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                background: (opt === 'Annual') === annual ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'transparent',
                color: (opt === 'Annual') === annual ? '#ffffff' : '#64748b',
              }}>
                {opt} {opt === 'Annual' && <span style={{ color: '#86efac', fontSize: '11px' }}>−34%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              borderRadius: '20px',
              border: plan.highlight ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
              background: plan.highlight ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.02)',
              padding: '2rem',
              position: 'relative',
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  borderRadius: '9999px', padding: '4px 16px',
                  fontSize: '12px', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap',
                }}>
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{plan.desc}</p>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                {plan.price !== null ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em' }}>
                      ${plan.price}
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748b', marginBottom: '6px' }}>{plan.label}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>{plan.label}</span>
                )}
              </div>

              <a href="#" style={{
                display: 'block', textAlign: 'center',
                borderRadius: '10px', padding: '11px',
                fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                background: plan.highlight ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                marginBottom: '1.75rem',
              }}>
                {plan.cta}
              </a>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <section style={{ padding: '6rem 0', background: '#080b18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          borderRadius: '24px', border: '1px solid rgba(139,92,246,0.3)',
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))',
          padding: '4rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1rem', position: 'relative' }}>
            Ready to ship faster?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto 2.5rem', position: 'relative' }}>
            Join 10,000+ teams who use Luminary to build and ship products faster than ever before.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              borderRadius: '12px', padding: '14px 28px',
              fontSize: '15px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
              boxShadow: '0 0 40px rgba(139,92,246,0.3)',
            }}>
              Get started for free
            </a>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', padding: '14px 28px',
              fontSize: '15px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
            }}>
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function LuminaryFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#05070f', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ maxWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>Luminary</span>
            </div>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.7 }}>The modern project management platform for high-performing teams.</p>
          </div>

          {/* Links */}
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', marginBottom: '1rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontSize: '14px', color: '#334155', textDecoration: 'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '13px', color: '#1e293b', margin: 0 }}>© {new Date().getFullYear()} Luminary, Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
              <a key={s} href="#" style={{ fontSize: '13px', color: '#1e293b', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
