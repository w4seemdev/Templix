/* ============================================================
   RELATE — CRM Dashboard Template
   Dark CRM app shell with indigo accent. Responsive:
   topbar + sidebar + KPIs + pipeline + inline-SVG chart + deals.
   ============================================================ */

import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const C = { bg: '#0b1020', panel: 'rgba(255,255,255,0.02)', line: 'rgba(255,255,255,0.07)', ink: '#eef2ff', mut: '#a5b0d0', dim: '#6b7699', a: '#6366f1', a2: '#818cf8' };

export default function CRMDashboardPreview() {
  const mobile = useIsMobile();
  const [nav, setNav] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.ink, minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Topbar mobile={mobile} onMenu={() => setNav(o => !o)} />
      <div style={{ display: 'flex', flex: 1 }}>
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
        {mobile && <button aria-label="Menu" onClick={onMenu} style={{ background: 'transparent', border: `1px solid ${C.line}`, borderRadius: 8, padding: 7, cursor: 'pointer' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg></button>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${C.a}, ${C.a2})`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8" /></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Relate</span>
        </div>
      </div>
      {!mobile && <div style={{ flex: 1, maxWidth: 400, margin: '0 24px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: 8, padding: '8px 12px' }}><svg width="14" height="14" fill="none" stroke={C.dim} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg><span style={{ fontSize: 13, color: C.dim }}>Search contacts, deals…</span></div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: C.a, border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ New deal</button>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.a}, ${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RS</div>
      </div>
    </header>
  );
}

function Sidebar({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  const items: [string, string, boolean?][] = [['grid', 'Dashboard', true], ['funnel', 'Pipeline'], ['users', 'Contacts'], ['mail', 'Inbox'], ['cal', 'Tasks'], ['chart', 'Reports'], ['gear', 'Settings']];
  return (
    <aside style={{ width: 220, borderRight: `1px solid ${C.line}`, padding: '18px 12px', flexShrink: 0, background: C.bg, ...(mobile ? { position: 'fixed', top: 60, bottom: 0, left: 0, zIndex: 45, boxShadow: '4px 0 30px rgba(0,0,0,0.5)' } : {}) }}>
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3a4568', margin: '0 0 8px', padding: '0 10px' }}>Workspace</p>
      {items.map(([ic, l, active]) => (
        <a key={l} href="#" onClick={e => { e.preventDefault(); if (mobile) onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: active ? 'rgba(99,102,241,0.15)' : 'transparent', color: active ? C.a2 : C.dim, fontSize: 13, fontWeight: active ? 600 : 400 }}>
          <Ic name={ic} /><span>{l}</span>
        </a>
      ))}
    </aside>
  );
}

const P: Record<string, string> = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  funnel: 'M22 3H2l8 9.46V19l4 2v-8.54z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  mail: 'M4 4h16v16H4zM4 6l8 6 8-6',
  cal: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22',
};
function Ic({ name }: { name: string }) { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={P[name]} /></svg>; }

function Main({ mobile }: { mobile: boolean }) {
  const kpis = [['Pipeline value', '$1.24M', '+18%', true], ['Deals won (Q)', '86', '+11%', true], ['Win rate', '32%', '+3pt', true], ['Avg. cycle', '21d', '-2d', true]] as const;
  const stages: [string, number, string][] = [['Lead', 42, '#6366f1'], ['Qualified', 28, '#818cf8'], ['Proposal', 17, '#a78bfa'], ['Negotiation', 9, '#f59e0b'], ['Won', 12, '#10b981']];
  const maxStage = Math.max(...stages.map(s => s[1]));
  const deals = [
    ['Acme Corp — Platform', 'Sarah Chen', '$48,000', 'Negotiation', '#f59e0b', '82%'],
    ['Northwind — Renewal', 'Diego Ruiz', '$120,000', 'Proposal', '#a78bfa', '64%'],
    ['Orbital — Expansion', 'Amy Okafor', '$36,500', 'Qualified', '#818cf8', '40%'],
    ['Cascade — New logo', 'Tom Vega', '$22,000', 'Won', '#10b981', '100%'],
  ] as const;
  return (
    <main style={{ flex: 1, padding: mobile ? 16 : 26, minWidth: 0 }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Sales dashboard</h1>
        <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>Q3 performance across your team.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {kpis.map(([l, v, c, up]) => (
          <div key={l} style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 16 }}>
            <span style={{ fontSize: 12, color: C.dim }}>{l}</span>
            <div style={{ fontSize: mobile ? '1.3rem' : '1.55rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '6px 0 4px' }}>{v}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: up ? '#10b981' : '#ef4444' }}>{c} vs last Q</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 16, marginBottom: 18 }}>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px' }}>Revenue trend</h3>
          <p style={{ fontSize: 12, color: C.dim, margin: '0 0 14px' }}>Closed-won, last 8 months</p>
          <Bars mobile={mobile} />
        </div>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>Pipeline by stage</h3>
          {stages.map(([n, v, col]) => (
            <div key={n} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}><span style={{ fontSize: 13, color: C.mut }}>{n}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span></div>
              <div style={{ height: 7, borderRadius: 9999, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${(v / maxStage) * 100}%`, height: '100%', borderRadius: 9999, background: col }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Deals to close this week</h3>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 12, color: C.a2, textDecoration: 'none' }}>All deals →</a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse' }}>
            <thead><tr>{['Deal', 'Owner', 'Value', 'Stage', 'Confidence'].map(h => <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 600, color: C.dim, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px 10px 0', borderBottom: `1px solid ${C.line}` }}>{h}</th>)}</tr></thead>
            <tbody>
              {deals.map(([name, owner, val, stage, col, conf], i) => (
                <tr key={name}>
                  <td style={{ fontSize: 13, fontWeight: 600, padding: '13px 12px 13px 0', borderBottom: i < deals.length - 1 ? `1px solid ${C.line}` : 'none', whiteSpace: 'nowrap' }}>{name}</td>
                  <td style={{ fontSize: 13, color: C.mut, padding: '13px 12px 13px 0', borderBottom: i < deals.length - 1 ? `1px solid ${C.line}` : 'none', whiteSpace: 'nowrap' }}>{owner}</td>
                  <td style={{ fontSize: 13, fontWeight: 600, padding: '13px 12px 13px 0', borderBottom: i < deals.length - 1 ? `1px solid ${C.line}` : 'none' }}>{val}</td>
                  <td style={{ padding: '13px 12px 13px 0', borderBottom: i < deals.length - 1 ? `1px solid ${C.line}` : 'none' }}><span style={{ fontSize: 11, fontWeight: 600, background: `${col}22`, color: col, borderRadius: 9999, padding: '3px 10px', whiteSpace: 'nowrap' }}>{stage}</span></td>
                  <td style={{ padding: '13px 0', borderBottom: i < deals.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 54, height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.08)' }}><div style={{ width: conf, height: '100%', borderRadius: 9999, background: C.a2 }} /></div><span style={{ fontSize: 12, color: C.mut }}>{conf}</span></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Bars({ mobile }: { mobile: boolean }) {
  const data = [58, 72, 65, 88, 79, 94, 83, 108];
  const labels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const w = 560, h = mobile ? 150 : 190, max = 120, bw = w / data.length;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <defs><linearGradient id="cbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.a2} /><stop offset="100%" stopColor={C.a} stopOpacity="0.4" /></linearGradient></defs>
        {data.map((d, i) => {
          const bh = (d / max) * (h - 16);
          return <rect key={i} x={i * bw + bw * 0.2} y={h - bh} width={bw * 0.6} height={bh} rx="4" fill={i === data.length - 1 ? 'url(#cbg)' : 'rgba(129,140,248,0.25)'} />;
        })}
      </svg>
      <div style={{ display: 'flex', marginTop: 6 }}>{labels.map(l => <span key={l} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#3a4568' }}>{l}</span>)}</div>
    </div>
  );
}
