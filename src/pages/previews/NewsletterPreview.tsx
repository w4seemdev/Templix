import { useState } from 'react';

const issues = [
  { num: 48, title: 'The Attention Economy is Broken (Here\'s What Comes Next)', date: 'May 12', reads: '18K', preview: 'We've been fed a lie about productivity. This week, I dig into why the tools meant to help us focus are making things worse...' },
  { num: 47, title: '7 Mental Models That Changed How I Think About Business', date: 'May 5', reads: '24K', preview: 'From Charlie Munger to Shane Parrish — the frameworks that separate good decisions from lucky ones...' },
  { num: 46, title: 'The Startup That Grew 0→$1M ARR in 11 Months (With No VC)', date: 'Apr 28', reads: '31K', preview: 'I sat down with the founder of a bootstrapped SaaS that hit seven figures through one very boring channel...' },
];

export default function NewsletterPreview() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', color: '#111', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #f0f0f0', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em' }}>The Brief</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Archive', 'About', 'Sponsor'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#737373', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#111', border: 'none', borderRadius: '6px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Subscribe Free</button>
      </nav>

      {/* Hero / CTA */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', borderRadius: '9999px', padding: '4px 14px', marginBottom: '1.5rem' }}>
          <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>42,000 readers · Published every Monday</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.15, margin: '0 0 1rem' }}>
          Ideas worth thinking about.
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
          A weekly newsletter on business, mental models, and building things. 10 minutes to read. Always free.
        </p>
        {!subscribed ? (
          <div style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto 1rem' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', outline: 'none', color: '#111' }} />
            <button onClick={() => email && setSubscribed(true)} style={{ background: '#111', border: 'none', borderRadius: '8px', padding: '12px 22px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe →</button>
          </div>
        ) : (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1rem', maxWidth: '440px', margin: '0 auto 1rem', color: '#15803d', fontSize: '14px', fontWeight: 600 }}>
            ✅ You're in! Check your inbox to confirm.
          </div>
        )}
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>No spam. Unsubscribe anytime with one click.</p>
      </section>

      {/* Social proof */}
      <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
          {[['42K+', 'Subscribers'], ['48', 'Issues Published'], ['4.9/5', 'Avg Rating'], ['23%', 'Open Rate']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent issues */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>Recent Issues</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {issues.map((issue, i) => (
            <div key={issue.num} style={{ paddingBottom: '2rem', marginBottom: '2rem', borderBottom: i < issues.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', fontWeight: 600 }}>Issue #{issue.num} · {issue.date} · {issue.reads} reads</p>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{issue.title}</h3>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{issue.preview}</p>
              <span style={{ fontSize: '13px', color: '#111', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Read issue →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
