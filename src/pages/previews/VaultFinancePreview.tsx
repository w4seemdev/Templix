export default function VaultFinancePreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#03080f', color: '#e2f0ff', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(3,8,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.12)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏦</div>
          <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.01em' }}>Vault<span style={{ color: '#22c55e' }}>Fi</span></span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Product', 'Pricing', 'Security', 'API Docs', 'Blog'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#22c55e', cursor: 'pointer', fontWeight: 500 }}>Sign in</button>
          <button style={{ background: '#22c55e', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, color: '#03080f', cursor: 'pointer' }}>Start Free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '9999px', padding: '6px 16px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>🔒 Bank-grade security · SOC 2 Type II certified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem' }}>
            Modern finance<br />infrastructure for{' '}
            <span style={{ color: '#22c55e' }}>your business.</span>
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#64748b', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Issue cards, automate payments, manage treasury, and build financial products — all through one API.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '3rem' }}>
            <button style={{ background: '#22c55e', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, color: '#03080f', cursor: 'pointer' }}>Start for free →</button>
            <button style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, color: '#e2f0ff', cursor: 'pointer' }}>View API Docs</button>
          </div>
          {/* Dashboard mockup */}
          <div style={{ background: '#0a1220', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '16px', padding: '1.5rem', maxWidth: '900px', margin: '0 auto', boxShadow: '0 40px 100px rgba(34,197,94,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[['$842K', 'Balance', '+4.2%'], ['$124K', 'Revenue', '+12%'], ['$28K', 'Expenses', '-3%'], ['98.9%', 'Uptime', '+0.1%']].map(([v, l, c]) => (
                <div key={l} style={{ background: '#0f1929', border: '1px solid rgba(34,197,94,0.1)', borderRadius: '10px', padding: '1rem' }}>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 6px' }}>{l}</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e2f0ff', margin: '0 0 4px' }}>{v}</p>
                  <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ height: '80px', background: '#0f1929', borderRadius: '10px', display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '10px', border: '1px solid rgba(34,197,94,0.08)' }}>
              {[40,65,45,80,55,90,70,85,60,95,75,88].map((h, i) => (
                <div key={i} style={{ flex: 1, background: i === 11 ? '#22c55e' : 'rgba(34,197,94,0.2)', borderRadius: '3px 3px 0 0', height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {[
            { icon: '💳', title: 'Programmable Cards', desc: 'Issue virtual and physical cards with real-time spend controls and instant notifications.' },
            { icon: '⚡', title: 'Instant Transfers', desc: 'Move money globally with sub-second settlement. ACH, SWIFT, and crypto support.' },
            { icon: '📊', title: 'Treasury Management', desc: 'Optimize idle cash with automated sweeps into high-yield accounts.' },
            { icon: '🔌', title: 'Developer API', desc: 'RESTful API with SDKs for Node, Python, Ruby, and Go. 99.99% uptime SLA.' },
            { icon: '🛡️', title: 'Fraud Prevention', desc: 'ML-powered fraud detection with custom rules and real-time blocking.' },
            { icon: '📋', title: 'Compliance', desc: 'Built-in KYC/AML, SOC 2 Type II, PCI DSS Level 1 out of the box.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0a1220', border: '1px solid rgba(34,197,94,0.1)', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
