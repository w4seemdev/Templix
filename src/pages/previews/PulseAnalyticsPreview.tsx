/* ============================================================
   PULSE — Product Analytics Dashboard Template
   Dark app shell, magenta/violet accent. Responsive:
   topbar + sidebar + metrics + SVG line chart + funnel + cohort.
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

const C = { bg: '#0c0a14', panel: 'rgba(255,255,255,0.02)', line: 'rgba(255,255,255,0.07)', ink: '#f6f0fb', mut: '#c0aed0', dim: '#7a6b8f', a: '#ec4899', a2: '#a855f7' };

export default function PulseAnalyticsPreview() {
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Pulse</span>
        </div>
      </div>
      {!mobile && <div style={{ display: 'flex', gap: 8 }}>{['Product', 'Web', 'Mobile'].map((t, i) => <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, background: i === 0 ? 'rgba(236,72,153,0.14)' : 'transparent', color: i === 0 ? C.a : C.dim }}>{t}</span>)}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.mut }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: C.a, boxShadow: `0 0 8px ${C.a}` }} />Live</div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.a}, ${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>PL</div>
      </div>
    </header>
  );
}

function Sidebar({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  const items: [string, string, boolean?][] = [['grid', 'Dashboard', true], ['funnel', 'Funnels'], ['retain', 'Retention'], ['flow', 'User paths'], ['seg', 'Segments'], ['bell', 'Alerts'], ['gear', 'Settings']];
  return (
    <aside style={{ width: 220, borderRight: `1px solid ${C.line}`, padding: '18px 12px', flexShrink: 0, background: C.bg, ...(mobile ? { position: 'fixed', top: 60, bottom: 0, left: 0, zIndex: 45, boxShadow: '4px 0 30px rgba(0,0,0,0.5)' } : {}) }}>
      {items.map(([ic, l, active]) => (
        <a key={l} href="#" onClick={e => { e.preventDefault(); if (mobile) onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: active ? 'rgba(168,85,247,0.15)' : 'transparent', color: active ? C.a2 : C.dim, fontSize: 13, fontWeight: active ? 600 : 400 }}>
          <Ic name={ic} /><span>{l}</span>
        </a>
      ))}
    </aside>
  );
}

const P: Record<string, string> = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  funnel: 'M22 3H2l8 9.46V19l4 2v-8.54z',
  retain: 'M3 12a9 9 0 1 0 9-9M3 3v6h6',
  flow: 'M5 3v18M19 3v18M5 8h14M5 14h14',
  seg: 'M12 2a10 10 0 1 0 10 10H12z M12 2v10h10',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22',
};
function Ic({ name }: { name: string }) { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={P[name]} /></svg>; }

function Main({ mobile }: { mobile: boolean }) {
  const metrics = [['Active users', '48.2K', '+12.4%', true], ['Sessions', '196K', '+6.1%', true], ['Avg. session', '4m 12s', '+18s', true], ['Bounce rate', '31.8%', '−2.2pt', true]] as const;
  const funnel: [string, number][] = [['Visited', 100], ['Signed up', 62], ['Activated', 41], ['Subscribed', 18]];
  return (
    <main style={{ flex: 1, padding: mobile ? 16 : 26, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 12, marginBottom: 22 }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Product overview</h1><p style={{ fontSize: 13, color: C.dim, margin: 0 }}>Real-time engagement across your app.</p></div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: C.mut }}>Last 14 days</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {metrics.map(([l, v, c, up]) => (
          <div key={l} style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 16 }}>
            <span style={{ fontSize: 12, color: C.dim }}>{l}</span>
            <div style={{ fontSize: mobile ? '1.3rem' : '1.55rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '6px 0 4px' }}>{v}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: up ? C.a : '#ef4444' }}>{c}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.6fr 1fr', gap: 16, marginBottom: 18 }}>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Daily active users</h3>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: C.mut }}><span><b style={{ color: C.a }}>—</b> This period</span><span><b style={{ color: C.dim }}>—</b> Previous</span></div>
          </div>
          <TwoLine mobile={mobile} />
        </div>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>Activation funnel</h3>
          {funnel.map(([n, p], i) => (
            <div key={n} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}><span style={{ fontSize: 13, color: C.mut }}>{n}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{p}%</span></div>
              <div style={{ height: 10, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${p}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${C.a2}, ${C.a})`, opacity: 1 - i * 0.12 }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>Weekly retention cohorts</h3>
        <p style={{ fontSize: 12, color: C.dim, margin: '0 0 14px' }}>% of users returning by week since signup</p>
        <Cohort mobile={mobile} />
      </div>
    </main>
  );
}

function TwoLine({ mobile }: { mobile: boolean }) {
  const cur = [30, 42, 38, 55, 48, 66, 60, 78, 72, 90];
  const prev = [26, 34, 33, 44, 40, 52, 49, 58, 55, 64];
  const w = 620, h = mobile ? 150 : 200, pad = 6, max = 100;
  const step = (w - pad * 2) / (cur.length - 1);
  const toLine = (arr: number[]) => arr.map((d, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * step} ${h - (d / max) * (h - 16) - 6}`).join(' ');
  const cl = toLine(cur);
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.a} stopOpacity="0.28" /><stop offset="100%" stopColor={C.a} stopOpacity="0" /></linearGradient></defs>
        {[0.25, 0.5, 0.75].map(f => <line key={f} x1="0" y1={h * f} x2={w} y2={h * f} stroke="rgba(255,255,255,0.05)" />)}
        <path d={`${cl} L ${w - pad} ${h} L ${pad} ${h} Z`} fill="url(#pg)" />
        <path d={toLine(prev)} fill="none" stroke={C.dim} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
        <path d={cl} fill="none" stroke={C.a} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Cohort({ mobile }: { mobile: boolean }) {
  const rows = [
    ['Wk 1', [100, 68, 52, 44, 39, 35]],
    ['Wk 2', [100, 71, 55, 47, 41]],
    ['Wk 3', [100, 66, 50, 43]],
    ['Wk 4', [100, 73, 58]],
    ['Wk 5', [100, 70]],
  ] as const;
  const cell = (v: number) => `rgba(236,72,153,${(v / 100) * 0.85 + 0.05})`;
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: mobile ? 420 : 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(6, 1fr)', gap: 5, marginBottom: 5 }}>
          <span />{['W0', 'W1', 'W2', 'W3', 'W4', 'W5'].map(h => <span key={h} style={{ fontSize: 10, color: C.dim, textAlign: 'center' }}>{h}</span>)}
        </div>
        {rows.map(([label, vals]) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '56px repeat(6, 1fr)', gap: 5, marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: C.mut, display: 'flex', alignItems: 'center' }}>{label}</span>
            {Array.from({ length: 6 }).map((_, i) => {
              const v = (vals as readonly number[])[i];
              return <div key={i} style={{ height: 34, borderRadius: 6, background: v == null ? 'transparent' : cell(v), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: v != null && v > 45 ? '#fff' : '#c0aed0' }}>{v == null ? '' : `${v}%`}</div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
