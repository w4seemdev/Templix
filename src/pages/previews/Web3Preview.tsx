/* ============================================================
   HELIX — Web3 / DeFi Landing Template
   Near-black with neon mint/violet accent. Self-contained,
   inline styles only, fully responsive (375px → 1280px).
   ============================================================ */

import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const T = { bg: '#050507', panel: '#0c0c12', line: 'rgba(255,255,255,0.09)', ink: '#f2f2f7', mut: '#a6a6b8', dim: '#65657a', a: '#34d399', a2: '#a855f7' };
const grad = 'linear-gradient(120deg, #34d399, #a855f7)';
const NAV = [['Protocol', 'protocol'], ['Tokenomics', 'token'], ['Roadmap', 'roadmap'], ['Community', 'community']] as const;

export default function Web3Preview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Stats mobile={mobile} />
      <Protocol mobile={mobile} />
      <Tokenomics mobile={mobile} />
      <Roadmap mobile={mobile} />
      <Community />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04120c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7c4 4 12 4 16 0M4 12c4 4 12 4 16 0M4 17c4 4 12 4 16 0" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Helix</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <a href="#community" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 700, color: '#04120c', textDecoration: 'none' }}>Launch app</a>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#community" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, color: '#04120c', textDecoration: 'none' }}>Launch app</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '48px 20px 36px' : '78px 20px 52px' }}>
      <div style={{ position: 'absolute', top: -120, left: '30%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(168,85,247,0.16), transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 60, right: -80, width: 420, height: 420, background: 'radial-gradient(circle, rgba(52,211,153,0.14), transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 44, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.03)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a }}>Audited by 3 leading security firms</span>
          <h1 style={{ fontSize: mobile ? '2.3rem' : '3.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '20px 0 0' }}>
            Earn yield on-chain, <span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>fully non-custodial</span>
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 470 }}>
            Helix is a decentralized liquidity protocol. Supply assets, earn real yield, and keep full control of your keys — no middlemen, no lockups.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a href="#community" style={{ background: grad, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 700, color: '#04120c', textDecoration: 'none' }}>Connect wallet</a>
            <a href="#protocol" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Read docs</a>
          </div>
        </div>
        <WalletCard mobile={mobile} />
      </div>
    </section>
  );
}

function WalletCard({ mobile }: { mobile: boolean }) {
  const assets: [string, string, string, string][] = [['ETH', 'Ethereum', '4.2%', '#8b5cf6'], ['USDC', 'USD Coin', '8.1%', '#22c55e'], ['WBTC', 'Wrapped BTC', '3.4%', '#f59e0b']];
  return (
    <div style={{ marginTop: mobile ? 34 : 0, borderRadius: 18, border: `1px solid ${T.line}`, background: T.panel, padding: 20, boxShadow: '0 40px 90px rgba(0,0,0,0.6), 0 0 60px rgba(168,85,247,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: T.a, boxShadow: `0 0 8px ${T.a}` }} /><span style={{ fontSize: 12, color: T.mut, fontFamily: 'ui-monospace, monospace' }}>0x7f…3a9c</span></div>
        <span style={{ fontSize: 12, color: T.a2 }}>Ethereum</span>
      </div>
      <div style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(52,211,153,0.08))', padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: T.mut }}>Net supplied</div>
        <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', margin: '4px 0' }}>$48,210.55</div>
        <div style={{ fontSize: 13, color: T.a }}>+$1,204 earned (30d)</div>
      </div>
      {assets.map(([sym, name, apy, col]) => (
        <div key={sym} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderTop: `1px solid ${T.line}` }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${col}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: col }}>{sym.slice(0, 2)}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{sym}</div><div style={{ fontSize: 11, color: T.dim }}>{name}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 13, fontWeight: 700, color: T.a }}>{apy} APY</div><div style={{ fontSize: 11, color: T.dim }}>supply</div></div>
        </div>
      ))}
    </div>
  );
}

function Stats({ mobile }: { mobile: boolean }) {
  const stats: [string, string][] = [['$2.4B', 'Total value locked'], ['180K', 'Active wallets'], ['0', 'Exploits to date'], ['12', 'Chains supported']];
  return (
    <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '30px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 20 }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: mobile ? '1.6rem' : '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
            <div style={{ fontSize: 12, color: T.dim, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  vote: 'M9 12l2 2 4-4M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  chain: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
};
function WIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Protocol({ mobile }: { mobile: boolean }) {
  const items = [
    ['lock', 'Non-custodial', 'You always hold your keys. Helix never takes custody of your funds — ever.'],
    ['bolt', 'Real yield', 'Returns come from protocol fees, not token emissions or Ponzi mechanics.'],
    ['eye', 'Fully audited', 'Three independent audits and an ongoing bug bounty of up to $2M.'],
    ['chain', 'Omnichain', 'Supply and borrow across 12 chains from a single, unified interface.'],
    ['layers', 'Composable', 'Open contracts and clean SDKs make Helix easy to build on top of.'],
    ['vote', 'DAO governed', 'HLX holders vote on every parameter, upgrade, and treasury decision.'],
  ];
  return (
    <Section id="protocol" mobile={mobile} tag="Protocol" title="DeFi that earns your trust" sub="Secure, transparent, and controlled by its community.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><WIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Tokenomics({ mobile }: { mobile: boolean }) {
  const segs: [string, number, string][] = [['Community & LPs', 45, '#34d399'], ['Treasury / DAO', 25, '#a855f7'], ['Core team', 18, '#f59e0b'], ['Investors', 12, '#3b82f6']];
  const r = 52, cx = 70, cy = 70, circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <Section id="token" mobile={mobile} alt tag="Tokenomics" title="A token built for the community" sub="1B HLX, distributed to those who use and govern Helix.">
      <div style={{ maxWidth: 760, margin: '0 auto', display: mobile ? 'block' : 'grid', gridTemplateColumns: '160px 1fr', gap: 40, alignItems: 'center' }}>
        <svg viewBox="0 0 140 140" width="160" height="160" style={{ display: 'block', margin: mobile ? '0 auto 28px' : 0 }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
          {segs.map(([, p, col], i) => {
            const len = (p / 100) * circ, el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="16" strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} transform={`rotate(-90 ${cx} ${cy})`} />;
            off += len;
            return el;
          })}
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="20" fontWeight="800" fill="#f2f2f7">1B</text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" fill="#65657a">HLX supply</text>
        </svg>
        <div>
          {segs.map(([n, p, col]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.line}` }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: col }} />
              <span style={{ flex: 1, fontSize: 14, color: T.mut }}>{n}</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{p}%</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Roadmap({ mobile }: { mobile: boolean }) {
  const phases: [string, string[], boolean][] = [
    ['Q1 — Foundation', ['Mainnet launch', 'Security audits', 'ETH & L2 support'], true],
    ['Q2 — Growth', ['HLX token generation', 'DAO governance live', '6 new chains'], true],
    ['Q3 — Expansion', ['Fixed-rate lending', 'Mobile app', 'Fiat on-ramp'], false],
    ['Q4 — Scale', ['Cross-chain vaults', 'Institutional access', 'Grants program'], false],
  ];
  return (
    <Section id="roadmap" mobile={mobile} tag="Roadmap" title="Where Helix is headed" sub="A transparent path from launch to omnichain scale.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(4,1fr)', gap: 16 }}>
        {phases.map(([title, items, done]) => (
          <div key={title} style={{ borderRadius: 16, border: done ? '1px solid rgba(52,211,153,0.4)' : `1px solid ${T.line}`, background: done ? 'rgba(52,211,153,0.05)' : T.panel, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: done ? T.a : T.dim, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{done ? 'Shipped' : 'Planned'}</span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>{title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {items.map(it => <li key={it} style={{ display: 'flex', gap: 8, fontSize: 13, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={done ? T.a : T.dim} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">{done ? <polyline points="20 6 9 17 4 12" /> : <circle cx="12" cy="12" r="9" />}</svg>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Community() {
  return (
    <section id="community" style={{ padding: '20px 20px 72px', borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 980, margin: '40px auto 0', borderRadius: 24, border: '1px solid rgba(168,85,247,0.28)', background: 'linear-gradient(120deg, rgba(168,85,247,0.12), rgba(52,211,153,0.08))', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Join 180,000 Helix users</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Connect your wallet and start earning real yield in under a minute.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href="#community" style={{ background: grad, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, color: '#04120c', textDecoration: 'none' }}>Launch app</a>
          <a href="#community" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Join Discord</a>
        </div>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#0a0a0f' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 50 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: T.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Protocol', ['Markets', 'Governance', 'Docs', 'Audits']], ['Developers', ['SDK', 'API', 'GitHub', 'Bug bounty']], ['Community', ['Discord', 'X', 'Forum', 'Blog']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Helix</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>A non-custodial liquidity protocol governed by its community.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#protocol" style={{ fontSize: 14, color: '#4a4a5e', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#3a3a4a' }}>© {new Date().getFullYear()} Helix Protocol. Not financial advice.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['X', 'Discord', 'Mirror'].map(s => <a key={s} href="#protocol" style={{ fontSize: 13, color: '#3a3a4a', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
