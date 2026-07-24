/* ============================================================
   LEDGER — Finance Dashboard Template
   Dark app shell, emerald accent. Responsive:
   topbar + sidebar + balance cards + inline-SVG chart + txns.
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

const C = { bg: '#081210', panel: 'rgba(255,255,255,0.02)', line: 'rgba(255,255,255,0.07)', ink: '#eafff4', mut: '#9fc7b6', dim: '#5d7d70', a: '#22c55e', a2: '#10b981' };

export default function FinanceDashboardPreview() {
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#03130c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Ledger</span>
        </div>
      </div>
      {!mobile && <div style={{ flex: 1, maxWidth: 380, margin: '0 24px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: 8, padding: '8px 12px' }}><svg width="14" height="14" fill="none" stroke={C.dim} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg><span style={{ fontSize: 13, color: C.dim }}>Search transactions…</span></div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: C.a, border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: '#03130c', cursor: 'pointer' }}>Send</button>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.a}, ${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#03130c' }}>AR</div>
      </div>
    </header>
  );
}

function Sidebar({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  const items: [string, string, boolean?][] = [['grid', 'Overview', true], ['wallet', 'Accounts'], ['swap', 'Transfers'], ['card', 'Cards'], ['chart', 'Investments'], ['gear', 'Settings']];
  return (
    <aside style={{ width: 220, borderRight: `1px solid ${C.line}`, padding: '18px 12px', flexShrink: 0, background: C.bg, ...(mobile ? { position: 'fixed', top: 60, bottom: 0, left: 0, zIndex: 45, boxShadow: '4px 0 30px rgba(0,0,0,0.5)' } : {}) }}>
      {items.map(([ic, l, active]) => (
        <a key={l} href="#" onClick={e => { e.preventDefault(); if (mobile) onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: active ? 'rgba(34,197,94,0.14)' : 'transparent', color: active ? C.a : C.dim, fontSize: 13, fontWeight: active ? 600 : 400 }}>
          <Ic name={ic} /><span>{l}</span>
        </a>
      ))}
      <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: 'linear-gradient(135deg, #0f2a1e, #0a1c15)', border: `1px solid ${C.line}` }}>
        <p style={{ fontSize: 11, color: C.dim, margin: '0 0 4px' }}>Virtual card</p>
        <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.08em', margin: '0 0 10px' }}>•••• 4291</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.mut }}><span>A. Rivera</span><span>12/28</span></div>
      </div>
    </aside>
  );
}

const P: Record<string, string> = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  wallet: 'M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4z',
  swap: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3',
  card: 'M3 5h18v14H3zM3 10h18',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22',
};
function Ic({ name }: { name: string }) { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={P[name]} /></svg>; }

function Main({ mobile }: { mobile: boolean }) {
  const cards = [['Total balance', '$128,540.20', '+4.2% this month', C.a], ['Income (Jun)', '$14,220.00', '+8.1%', C.a2], ['Expenses (Jun)', '$6,410.55', '−2.3%', '#f59e0b']] as const;
  const txns = [
    ['Stripe payout', 'Income', '+$4,200.00', '#22c55e', 'Jun 24'],
    ['AWS', 'Infrastructure', '−$318.40', '#ef4444', 'Jun 23'],
    ['Figma', 'Software', '−$45.00', '#ef4444', 'Jun 22'],
    ['Client — Northwind', 'Income', '+$9,000.00', '#22c55e', 'Jun 21'],
    ['Payroll', 'Team', '−$6,100.00', '#ef4444', 'Jun 20'],
  ] as const;
  return (
    <main style={{ flex: 1, padding: mobile ? 16 : 26, minWidth: 0 }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Good morning, Alex</h1>
        <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>Here's your money at a glance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
        {cards.map(([l, v, c, col]) => (
          <div key={l} style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
            <span style={{ fontSize: 12, color: C.dim }}>{l}</span>
            <div style={{ fontSize: mobile ? '1.5rem' : '1.7rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '8px 0 4px' }}>{v}</div>
            <span style={{ fontSize: 12, color: col }}>{c}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 300px', gap: 16, marginBottom: 18 }}>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Cash flow</h3>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: C.mut }}><span><b style={{ color: C.a }}>■</b> In</span><span><b style={{ color: '#f59e0b' }}>■</b> Out</span></div>
          </div>
          <p style={{ fontSize: 12, color: C.dim, margin: '0 0 14px' }}>Last 6 months</p>
          <Flow mobile={mobile} />
        </div>
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>Budget used</h3>
          <Donut />
          {[['Housing', 42, '#22c55e'], ['Software', 27, '#10b981'], ['Team', 31, '#f59e0b']].map(([n, p, col]) => (
            <div key={n as string} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 12 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: col as string }} /><span style={{ color: C.mut, flex: 1 }}>{n}</span><span style={{ fontWeight: 600 }}>{p}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: C.panel, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Recent transactions</h3>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 12, color: C.a, textDecoration: 'none' }}>View all →</a>
        </div>
        {txns.map(([name, cat, amt, col, date], i) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < txns.length - 1 ? `1px solid ${C.line}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: C.mut }}>{name[0]}</div>
              <div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div><div style={{ fontSize: 11, color: C.dim }}>{cat} · {date}</div></div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: col, whiteSpace: 'nowrap', marginLeft: 10 }}>{amt}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function Flow({ mobile }: { mobile: boolean }) {
  const income = [9, 11, 10, 13, 12, 14];
  const expense = [6, 5, 7, 6, 6, 6.4];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const w = 540, h = mobile ? 150 : 190, max = 16, group = w / income.length;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        {income.map((v, i) => {
          const ih = (v / max) * (h - 14), eh = (expense[i] / max) * (h - 14), x = i * group + group * 0.18, bw = group * 0.28;
          return <g key={i}><rect x={x} y={h - ih} width={bw} height={ih} rx="3" fill={C.a} /><rect x={x + bw + 4} y={h - eh} width={bw} height={eh} rx="3" fill="#f59e0b" opacity="0.85" /></g>;
        })}
      </svg>
      <div style={{ display: 'flex', marginTop: 6 }}>{labels.map(l => <span key={l} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#3a5548' }}>{l}</span>)}</div>
    </div>
  );
}

function Donut() {
  const segs = [[42, '#22c55e'], [27, '#10b981'], [31, '#f59e0b']] as const;
  const r = 40, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" style={{ display: 'block', margin: '0 auto 6px' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
      {segs.map(([p, col], i) => {
        const len = (p / 100) * circ, el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="14" strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />;
        off += len;
        return el;
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="20" fontWeight="800" fill="#eafff4">62%</text>
      <text x={cx} y={cy + 15} textAnchor="middle" fontSize="9" fill="#5d7d70">of budget</text>
    </svg>
  );
}
