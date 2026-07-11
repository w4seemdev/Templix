/* ============================================================
   DASHIFY — Admin Dashboard Template
   Dark analytics dashboard, teal/cyan accent. Responsive app
   shell: topbar + sidebar + KPI cards + inline-SVG charts.
   ============================================================ */

import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const C = { bg: '#0a0f1a', panel: 'rgba(255,255,255,0.02)', line: 'rgba(255,255,255,0.07)', ink: '#f1f5f9', mut: '#94a3b8', dim: '#64748b', a: '#14b8a6', a2: '#06b6d4' };

export default function DashifyPreview() {
  const mobile = useIsMobile();
  const [nav, setNav] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.ink, minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Topbar mobile={mobile} onMenu={() => setNav(o => !o)} />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {(!mobile || nav) && <Sidebar mobile={mobile} onClose={() => setNav(false)} />}
        <Main mobile={mobile} />
      </div>
    </div>
  );
}

function Topbar({ mobile, onMenu }: { mobile: boolean; onMenu: () => void }) {
  return (
    <header style={{ borderBottom: `1px solid ${C.line}`, background: C.bg, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0, position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {mobile && (
          <button aria-label="Menu" onClick={onMenu} style={{ background: 'transparent', border: `1px solid ${C.line}`, borderRadius: 8, padding: 7, cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 28, height: 28, background: C.a, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04201d" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Dashify</span>
        </div>
      </div>
      {!mobile && (
        <div style={{ flex: 1, maxWidth: 420, margin: '0 24px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: 8, padding: '8px 12px' }}>
          <svg width="14" height="14" fill="none" stroke={C.dim} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <span style={{ fontSize: 13, color: C.dim }}>Search orders, customers…</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative' }}>
          <svg width="18" height="18" fill="none" stroke={C.mut} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: C.a, borderRadius: '50%' }} />
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.a}, ${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#04201d' }}>JD</div>
      </div>
    </header>
  );
}

function Sidebar({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  const sections: [string, [string, string, boolean?][]][] = [
    ['Main', [['grid', 'Overview', true], ['chart', 'Analytics'], ['cash', 'Revenue'], ['users', 'Customers']]],
    ['Manage', [['box', 'Products'], ['list', 'Orders'], ['tag', 'Discounts']]],
    ['System', [['gear', 'Settings'], ['shield', 'Security']]],
  ];
  return (
    <aside style={{ width: 224, borderRight: `1px solid ${C.line}`, padding: '18px 12px', flexShrink: 0, background: C.bg, ...(mobile ? { position: 'fixed', top: 60, bottom: 0, left: 0, zIndex: 45, boxShadow: '4px 0 30px rgba(0,0,0,0.5)' } : {}) }}>
      {sections.map(([label, items]) => (
        <div key={label} style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#334155', margin: '0 0 6px', padding: '0 10px' }}>{label}</p>
          {items.map(([ic, l, active]) => (
            <a key={l} href="#" onClick={e => { e.preventDefault(); if (mobile) onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: active ? 'rgba(20,184,166,0.12)' : 'transparent', color: active ? C.a : C.dim, fontSize: 13, fontWeight: active ? 600 : 400 }}>
              <NavIcon name={ic} /><span>{l}</span>
              {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.a, marginLeft: 'auto' }} />}
            </a>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 8, padding: 14, borderRadius: 12, background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(6,182,212,0.08))', border: `1px solid ${C.line}` }}>
        <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 4px' }}>Upgrade to Pro</p>
        <p style={{ fontSize: 11, color: C.mut, margin: '0 0 10px', lineHeight: 1.5 }}>Unlock cohorts & exports.</p>
        <button style={{ width: '100%', background: C.a, border: 'none', borderRadius: 7, padding: '7px', fontSize: 12, fontWeight: 600, color: '#04201d', cursor: 'pointer' }}>Upgrade</button>
      </div>
    </aside>
  );
}

const PATHS: Record<string, string> = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  cash: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  box: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.32.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
};
function NavIcon({ name }: { name: string }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={PATHS[name]} /></svg>;
}

function Main({ mobile }: { mobile: boolean }) {
  const kpis = [
    ['Total Revenue', '$84,320', '+12.5%', true, C.a],
    ['Active Users', '12,843', '+8.2%', true, C.a2],
    ['New Orders', '1,284', '+5.1%', true, '#8b5cf6'],
    ['Refund Rate', '2.4%', '-0.3%', false, '#f97316'],
  ] as const;
  const orders = [
    ['#4821', 'Alice Johnson', 'Pro Plan', '$99', 'Paid', C.a],
    ['#4820', 'Marcus Webb', 'Starter', '$29', 'Pending', '#f59e0b'],
    ['#4819', 'Sofia Reyes', 'Enterprise', '$499', 'Paid', C.a],
    ['#4818', 'James Liu', 'Pro Plan', '$99', 'Refunded', '#ef4444'],
    ['#4817', 'Yuki Tanaka', 'Pro Plan', '$99', 'Paid', C.a],
  ] as const;
  return (
    <main style={{ flex: 1, padding: mobile ? 16 : 26, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 12, marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Overview</h1>
          <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>Welcome back — here's your store today.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: C.mut }}>Last 30 days</div>
          <button style={{ background: C.a, border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#04201d', cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {kpis.map(([l, v, c, up, col]) => (
          <div key={l} style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: C.dim }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: up ? C.a : '#ef4444', background: up ? 'rgba(20,184,166,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: 9999, padding: '2px 7px' }}>{c}</span>
            </div>
            <div style={{ fontSize: mobile ? '1.3rem' : '1.55rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{v}</div>
            <div style={{ marginTop: 10, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: '68%', height: '100%', borderRadius: 3, background: col }} /></div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 16, marginBottom: 18 }}>
        <Card title="Revenue over time" right={<Segmented options={['1W', '1M', '1Y']} active={1} />}>
          <AreaChart mobile={mobile} />
        </Card>
        <Card title="Top plans">
          {[['Enterprise', '$42,000', 50], ['Pro Plan', '$28,000', 33], ['Starter', '$14,320', 17]].map(([n, r, p]) => (
            <div key={n as string} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.mut }}>{n}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{r}</span>
              </div>
              <div style={{ height: 6, borderRadius: 9999, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${p}%`, height: '100%', borderRadius: 9999, background: `linear-gradient(90deg, ${C.a}, ${C.a2})` }} /></div>
            </div>
          ))}
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
            <p style={{ fontSize: 12, color: C.dim, margin: '0 0 6px' }}>Conversion rate</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 24, fontWeight: 800 }}>3.8%</span><span style={{ fontSize: 12, color: C.a }}>+0.6pt</span></div>
          </div>
        </Card>
      </div>

      <Card title="Recent orders" right={<a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 12, color: C.a, textDecoration: 'none' }}>View all →</a>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 480, borderCollapse: 'collapse' }}>
            <thead><tr>{['Order', 'Customer', 'Plan', 'Amount', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 600, color: C.dim, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px 10px 0', borderBottom: `1px solid ${C.line}` }}>{h}</th>)}</tr></thead>
            <tbody>
              {orders.map(([id, cust, plan, amt, st, col], i) => (
                <tr key={id}>
                  {[id, cust, plan, amt].map((cell, j) => <td key={j} style={{ fontSize: 13, color: j === 0 ? C.mut : C.ink, padding: '12px 12px 12px 0', borderBottom: i < orders.length - 1 ? `1px solid ${C.line}` : 'none', whiteSpace: 'nowrap' }}>{cell}</td>)}
                  <td style={{ padding: '12px 0', borderBottom: i < orders.length - 1 ? `1px solid ${C.line}` : 'none' }}><span style={{ fontSize: 11, fontWeight: 600, background: `${col}22`, color: col, borderRadius: 9999, padding: '3px 10px', whiteSpace: 'nowrap' }}>{st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}

function Card({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{title}</h3>{right}
      </div>
      {children}
    </div>
  );
}

function Segmented({ options, active }: { options: string[]; active: number }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {options.map((o, i) => <span key={o} style={{ background: i === active ? C.a : 'transparent', border: i === active ? 'none' : `1px solid ${C.line}`, borderRadius: 6, padding: '3px 9px', fontSize: 11, fontWeight: 600, color: i === active ? '#04201d' : C.dim }}>{o}</span>)}
    </div>
  );
}

function AreaChart({ mobile }: { mobile: boolean }) {
  const data = [42, 58, 47, 72, 61, 88, 73, 95, 68, 84, 77, 91];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const w = 640, h = mobile ? 140 : 180, pad = 6, max = 100;
  const step = (w - pad * 2) / (data.length - 1);
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * step} ${h - (d / max) * (h - 20) - 4}`).join(' ');
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.a} stopOpacity="0.32" /><stop offset="100%" stopColor={C.a} stopOpacity="0" /></linearGradient></defs>
        {[0.25, 0.5, 0.75].map(f => <line key={f} x1="0" y1={h * f} x2={w} y2={h * f} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
        <path d={`${line} L ${w - pad} ${h} L ${pad} ${h} Z`} fill="url(#dg)" />
        <path d={line} fill="none" stroke={C.a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => <circle key={i} cx={pad + i * step} cy={h - (d / max) * (h - 20) - 4} r={i === 7 ? 4 : 0} fill={C.a} />)}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {months.map((m, i) => (mobile && i % 2 ? <span key={m} style={{ flex: 1 }} /> : <span key={m} style={{ flex: mobile ? 2 : 1, textAlign: 'center', fontSize: 10, color: '#334155' }}>{m}</span>))}
      </div>
    </div>
  );
}
