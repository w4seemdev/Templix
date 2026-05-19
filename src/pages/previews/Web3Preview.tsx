const roadmap = [
  { q: 'Q1 2025', items: ['Smart contract audit', 'Token launch', 'DEX listing'], done: true },
  { q: 'Q2 2025', items: ['Mobile wallet', 'DAO governance', 'Bridge launch'], done: true },
  { q: 'Q3 2025', items: ['Layer 2 scaling', 'NFT marketplace', 'Partner integrations'], done: false },
  { q: 'Q4 2025', items: ['Mainnet v2', 'Cross-chain expansion', 'SDK release'], done: false },
];

export default function Web3Preview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#050508', color: '#e8e8f0', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(5,5,8,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.15)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '14px' }}>⬡</span>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.01em' }}>NEXUS<span style={{ color: '#8b5cf6' }}>fi</span></span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Token', 'Roadmap', 'Tokenomics', 'Docs', 'Community'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#a78bfa', cursor: 'pointer' }}>Docs</button>
          <button style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Launch App</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '7rem 2rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-100px', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50px', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '9999px', padding: '6px 16px', marginBottom: '2rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 600 }}>Presale Live — 3,200 ETH raised</span>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 1.5rem' }}>
            The Future of<br />
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Decentralized Finance
            </span>
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#6b7280', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            NexusFi is a next-generation DeFi protocol enabling seamless cross-chain swaps, yield optimization, and on-chain governance.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Buy $NXF Token</button>
            <button style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, color: '#e8e8f0', cursor: 'pointer' }}>Read Whitepaper</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {[['$48M', 'Total Value Locked'], ['120K+', 'Holders'], ['3.2K', 'ETH Raised'], ['0.8s', 'Avg Block Time']].map(([v, l]) => (
          <div key={l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a78bfa', margin: '0 0 6px', letterSpacing: '-0.02em' }}>{v}</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Tokenomics */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Tokenomics</h2>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 2rem' }}>Total supply: 1,000,000,000 $NXF</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[['40%', 'Public Sale', '#8b5cf6'], ['20%', 'Ecosystem Fund', '#3b82f6'], ['15%', 'Team & Advisors', '#06b6d4'], ['15%', 'Liquidity', '#10b981'], ['10%', 'Marketing', '#f59e0b']].map(([pct, label, color]) => (
            <div key={label as string} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ height: '4px', background: color as string, borderRadius: '9999px', marginBottom: '0.875rem', width: pct as string }} />
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: color as string, margin: '0 0 4px' }}>{pct}</p>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>Roadmap</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {roadmap.map(phase => (
            <div key={phase.q} style={{ background: phase.done ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid', borderColor: phase.done ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: phase.done ? '#a78bfa' : '#6b7280' }}>{phase.q}</span>
                {phase.done && <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>Done</span>}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {phase.items.map(item => (
                  <li key={item} style={{ fontSize: '13px', color: phase.done ? '#c4b5fd' : '#9ca3af', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: phase.done ? '#a78bfa' : '#4b5563' }}>{phase.done ? '✓' : '○'}</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
