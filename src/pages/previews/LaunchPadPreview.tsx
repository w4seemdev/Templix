/* ============================================================
   LAUNCHPAD — Landing Page Template
   Dark with coral/orange gradient — high-converting marketing page
   ============================================================ */

export default function LaunchPadPreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#060612', color: '#ffffff', minHeight: '100vh' }}>
      <LaunchNav />
      <LaunchHero />
      <SocialProof />
      <LaunchFeatures />
      <TestimonialsSection />
      <FaqSection />
      <LaunchCTA />
      <LaunchFooter />
    </div>
  );
}

function LaunchNav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(6,6,18,0.9)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f97316, #ec4899)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>LaunchPad</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['Features', 'Pricing', 'Testimonials', 'FAQ'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Log in</a>
          <a href="#" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', borderRadius: '10px', padding: '8px 20px', fontSize: '14px', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>
            Start free →
          </a>
        </div>
      </div>
    </header>
  );
}

function LaunchHero() {
  return (
    <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '2rem' }}>
          <span style={{ fontSize: '14px' }}>🚀</span>
          <span style={{ fontSize: '13px', color: '#fdba74' }}>Trusted by 15,000+ marketers worldwide</span>
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem' }}>
          Launch campaigns that{' '}
          <span style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            actually convert
          </span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          LaunchPad helps marketing teams create, test, and optimize landing pages in minutes — no coding required. Built for speed, designed for results.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <a href="#" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', borderRadius: '12px', padding: '15px 32px', fontSize: '16px', fontWeight: 700, color: '#ffffff', textDecoration: 'none', boxShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            Start for free — no card needed
          </a>
        </div>
        <p style={{ fontSize: '13px', color: '#475569' }}>14-day free trial · Cancel anytime · No credit card required</p>
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: '900px', margin: '3.5rem auto 0', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 80px rgba(249,115,22,0.1)' }}>
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="dashboard" style={{ width: '100%', display: 'block', opacity: 0.8 }} />
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: '15K+', label: 'Active users' },
    { value: '2.4M', label: 'Leads generated' },
    { value: '38%', label: 'Avg. conversion lift' },
    { value: '4.9/5', label: 'Customer rating' },
  ];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LaunchFeatures() {
  const features = [
    { icon: '⚡', title: 'Build in minutes', desc: 'Drag-and-drop editor with 200+ pre-built blocks. Go from idea to live page faster than ever.' },
    { icon: '🧪', title: 'A/B testing built-in', desc: 'Test headlines, CTAs, and layouts automatically. Let data decide what works.' },
    { icon: '📈', title: 'Analytics & insights', desc: 'Track clicks, scrolls, form fills, and conversions with our beautiful analytics dashboard.' },
    { icon: '🎯', title: 'Smart targeting', desc: 'Show different content to different audiences based on source, device, or behavior.' },
    { icon: '🔗', title: 'Integrations', desc: 'Connect with HubSpot, Mailchimp, Salesforce, Zapier, and 100+ more tools.' },
    { icon: '🛡️', title: 'GDPR compliant', desc: 'Built-in consent management, cookie controls, and data privacy tools out of the box.' },
  ];
  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f97316', marginBottom: '8px' }}>Features</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1rem' }}>
            Everything you need to convert
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.0625rem', maxWidth: '500px', margin: '0 auto' }}>
            From building to optimizing, LaunchPad covers the full lifecycle of your landing page campaigns.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div key={f.title} style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.75rem' }}>
              <div style={{ fontSize: '24px', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: 'We went from a 2% to 7% conversion rate in the first month. LaunchPad paid for itself 20x over.', name: 'Rachel Kim', role: 'CMO at GrowFast', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80' },
    { quote: "The A/B testing feature is a game-changer. Our team ships 3x more experiments than we did before.", name: 'Tom Hargreaves', role: 'Growth Lead at Kono', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
    { quote: 'Finally a landing page tool that doesn\'t require a developer. Our marketing team is fully independent now.', name: 'Priya Mehta', role: 'VP Marketing at Bloom', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80' },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
          Loved by marketing teams
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f97316', fontSize: '16px' }}>★</span>)}
              </div>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={t.img} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    { q: 'Do I need to know how to code?', a: 'Not at all. LaunchPad is built for marketers. Our drag-and-drop editor makes it easy for anyone to create professional pages.' },
    { q: 'Can I use my own domain?', a: 'Yes! You can connect any custom domain with just a few clicks. We handle all the SSL certificates automatically.' },
    { q: 'How does A/B testing work?', a: 'Create variants of your page, set traffic splits, and LaunchPad automatically tracks conversions and tells you the winner.' },
    { q: 'What integrations are available?', a: 'We integrate with 100+ tools including HubSpot, Salesforce, Mailchimp, Zapier, Google Analytics, and more.' },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Frequently asked</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={faq.q} style={{ background: '#060612', padding: '1.5rem 1.75rem', borderBottom: i < faqs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: '0 0 0.75rem' }}>{faq.q}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchCTA() {
  return (
    <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', borderRadius: '24px', border: '1px solid rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.05)', padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem', position: 'relative' }}>
          Start your free trial today
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.0625rem', marginBottom: '2.5rem', position: 'relative' }}>
          Join 15,000+ teams. No credit card required.
        </p>
        <a href="#" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #f97316, #ec4899)', borderRadius: '12px', padding: '15px 36px', fontSize: '16px', fontWeight: 700, color: '#ffffff', textDecoration: 'none', position: 'relative', boxShadow: '0 0 50px rgba(249,115,22,0.3)' }}>
          Get started free →
        </a>
      </div>
    </section>
  );
}

function LaunchFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '16px', fontWeight: 700 }}>LaunchPad</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Features', 'Pricing', 'Privacy', 'Terms'].map(l => <a key={l} href="#" style={{ fontSize: '13px', color: '#475569', textDecoration: 'none' }}>{l}</a>)}
        </div>
        <span style={{ fontSize: '13px', color: '#1e293b' }}>© {new Date().getFullYear()} LaunchPad, Inc.</span>
      </div>
    </footer>
  );
}
