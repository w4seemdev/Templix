import { useState } from 'react';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Built for speed. Sub-second load times on any device, anywhere.' },
  { icon: '🔒', title: 'Secure by Default', desc: 'End-to-end encryption keeps your data private and protected.' },
  { icon: '🤖', title: 'AI Powered', desc: 'Smart suggestions that learn from your workflow over time.' },
  { icon: '🌐', title: 'Works Everywhere', desc: 'Native apps for iOS, Android, Mac, Windows, and the web.' },
  { icon: '🔄', title: 'Real-time Sync', desc: 'All your devices stay in sync instantly, no manual saves needed.' },
  { icon: '🎨', title: 'Fully Customizable', desc: 'Themes, layouts, and shortcuts — make it yours.' },
];

const reviews = [
  { name: 'Alex K.', role: 'Product Designer', text: 'This app completely changed how I manage my work. Absolutely love it.', stars: 5 },
  { name: 'Sarah M.', role: 'Startup Founder', text: 'We switched our whole team to this. The AI features are mind-blowing.', stars: 5 },
  { name: 'James T.', role: 'Developer', text: 'Finally an app that gets out of my way and lets me focus.', stars: 5 },
];

export default function AppLandingPreview() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#030712', color: '#fff', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px' }} />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Floww</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Features', 'Pricing', 'Blog', 'Download'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#9ca3af', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
          Get Started Free
        </button>
      </nav>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '9999px', padding: '6px 16px', fontSize: '12px', color: '#818cf8', fontWeight: 600, marginBottom: '2rem' }}>
          ✨ Now with AI Assistant — Try it free
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          The app that helps you{' '}
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            do more
          </span>
          {' '}with less
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#9ca3af', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Floww combines task management, notes, and AI to give you one focused space for deep work.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: '12px', padding: '12px 24px', cursor: 'pointer', color: '#fff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Download on the</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>App Store</div>
            </div>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: '12px', padding: '12px 24px', cursor: 'pointer', color: '#fff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.31.17.67.19 1.01.07L15.34 12 4.19.17C3.85.05 3.49.07 3.18.24 2.55.6 2.17 1.29 2.17 2.09v19.82c0 .8.38 1.49 1.01 1.85zM16.55 13.2l2.47 2.47-8.93 5.07 6.46-7.54zM21.12 10.5c.52.29.88.83.88 1.5s-.36 1.21-.88 1.5l-2.05 1.16-2.74-2.66 2.74-2.66 2.05 1.16zM10.09 12 3.63 4.26l8.93 5.07-2.47 2.67z"/></svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Get it on</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Google Play</div>
            </div>
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#4b5563' }}>Free forever · No credit card required</p>

        {/* App mockup */}
        <div style={{ maxWidth: '720px', margin: '3rem auto 0', background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', borderRadius: '20px', border: '1px solid rgba(99,102,241,0.2)', padding: '1.5rem', boxShadow: '0 40px 80px rgba(99,102,241,0.15)' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '1rem' }}>
              {['Today', 'Inbox', 'Projects', 'Notes', 'Calendar'].map(item => (
                <div key={item} style={{ padding: '6px 8px', borderRadius: '6px', fontSize: '12px', color: item === 'Today' ? '#818cf8' : '#475569', background: item === 'Today' ? 'rgba(99,102,241,0.1)' : 'transparent', marginBottom: '2px', cursor: 'pointer' }}>{item}</div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#4b5563', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today · 4 tasks</p>
              {['Design review meeting', 'Update landing page copy', 'Ship v2.1 release', 'Write weekly report'].map((task, i) => (
                <div key={task} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid', borderColor: i === 0 ? '#6366f1' : '#334155', background: i === 0 ? '#6366f1' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i === 0 && <svg width="8" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontSize: '13px', color: i === 0 ? '#4b5563' : '#94a3b8', textDecoration: i === 0 ? 'line-through' : 'none' }}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>Everything you need</h2>
          <p style={{ color: '#6b7280', fontSize: '1.0625rem' }}>Powerful features wrapped in a beautiful, focused interface.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontSize: '28px', marginBottom: '0.875rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(99,102,241,0.03)', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 2.5rem', letterSpacing: '-0.02em' }}>Loved by thousands</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {reviews.map(r => (
              <div key={r.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '0.875rem' }}>
                  {Array(r.stars).fill(0).map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.65, margin: '0 0 1rem' }}>"{r.text}"</p>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>{r.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 3rem' }}>Up and running in seconds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[{ num: '1', title: 'Download', desc: 'Get Floww from the App Store or Google Play. Takes 30 seconds.' }, { num: '2', title: 'Set up your space', desc: 'Add your tasks, notes, and projects. Import from other apps with one click.' }, { num: '3', title: 'Get in the flow', desc: 'Let our AI learn your patterns and help you focus on what matters most.' }].map(s => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 auto 1rem' }}>{s.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.75rem', textAlign: 'center' }}>Simple pricing</h2>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '3rem', fontSize: '1.0625rem' }}>Start free, upgrade when you need more.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { name: 'Free', price: '$0', period: 'forever', features: ['Up to 100 tasks', 'Basic AI suggestions', '1 workspace', 'Mobile apps'], highlight: false },
              { name: 'Pro', price: '$9', period: '/month', features: ['Unlimited tasks', 'Advanced AI assistant', '5 workspaces', 'Priority support', 'Integrations'], highlight: true },
              { name: 'Team', price: '$29', period: '/month', features: ['Everything in Pro', 'Shared workspaces', 'Admin controls', 'Analytics', 'SSO'], highlight: false },
            ].map(plan => (
              <div key={plan.name} style={{ borderRadius: '16px', border: plan.highlight ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.06)', background: plan.highlight ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)', padding: '1.75rem', position: 'relative' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '9999px', padding: '3px 14px', fontSize: '11px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>Most popular</div>}
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 0.5rem' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280', paddingBottom: '4px' }}>{plan.period}</span>
                </div>
                <button style={{ width: '100%', background: plan.highlight ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', marginBottom: '1.5rem' }}>Get started</button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                      <span style={{ color: '#6366f1', fontSize: '12px' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Start for free today</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.0625rem' }}>No credit card. No commitment. Just flow.</p>
        {sent ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '14px 28px', color: '#818cf8', fontWeight: 600 }}>
            ✓ Check your inbox!
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ borderRadius: '10px', border: '1px solid #374151', background: 'rgba(255,255,255,0.05)', padding: '12px 18px', fontSize: '14px', color: '#fff', outline: 'none', minWidth: '260px' }} />
            <button onClick={() => { if (email) setSent(true); }} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
              Get Early Access
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
