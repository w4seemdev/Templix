/* ============================================================
   PULSE — Analytics SaaS Template
   Dark product-led theme (#0a0e1a) with electric green accent
   ============================================================ */

import { useState } from 'react';

type Range = '24h' | '7d' | '30d';

const ranges: Range[] = ['24h', '7d', '30d'];

const chartData: Record<Range, {
  bars: number[];
  labels: string[];
  visitors: string;
  views: string;
  bounce: string;
  duration: string;
  live: number;
  pages: { path: string; views: string; pct: number }[];
}> = {
  '24h': {
    bars: [22, 18, 14, 10, 8, 12, 20, 34, 52, 68, 74, 81, 78, 85, 92, 88, 80, 72, 64, 58, 50, 42, 34, 28],
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    visitors: '8,241', views: '21,508', bounce: '38%', duration: '2m 41s', live: 142,
    pages: [
      { path: '/pricing', views: '3,204', pct: 88 },
      { path: '/', views: '2,871', pct: 79 },
      { path: '/blog/launch-week', views: '1,460', pct: 40 },
      { path: '/docs/get-started', views: '982', pct: 27 },
    ],
  },
  '7d': {
    bars: [44, 58, 51, 72, 66, 90, 78],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    visitors: '54,902', views: '148,330', bounce: '41%', duration: '2m 12s', live: 142,
    pages: [
      { path: '/', views: '22,114', pct: 92 },
      { path: '/pricing', views: '17,488', pct: 73 },
      { path: '/docs/get-started', views: '9,051', pct: 38 },
      { path: '/blog/launch-week', views: '6,420', pct: 27 },
    ],
  },
  '30d': {
    bars: [38, 42, 35, 48, 52, 46, 60, 55, 49, 63, 70, 58, 66, 74, 68, 62, 77, 71, 65, 80, 73, 84, 78, 70, 86, 81, 90, 84, 92, 88],
    labels: ['May 12', 'May 19', 'May 26', 'Jun 02', 'Jun 09'],
    visitors: '231,847', views: '612,019', bounce: '43%', duration: '1m 58s', live: 142,
    pages: [
      { path: '/', views: '96,330', pct: 95 },
      { path: '/pricing', views: '71,205', pct: 70 },
      { path: '/blog/launch-week', views: '40,887', pct: 40 },
      { path: '/docs/get-started', views: '32,114', pct: 32 },
    ],
  },
};

const appTabs = ['Dashboard', 'Realtime', 'Pages', 'Sources', 'Funnels', 'Settings'];

const stats = [
  { value: '12,400+', label: 'Sites tracked' },
  { value: '4.2B', label: 'Events / month' },
  { value: '99.99%', label: 'Ingest uptime' },
  { value: '<45ms', label: 'Median latency' },
];

const logos = ['Northwind', 'Acme Corp', 'Helio Labs', 'Driftwood', 'Quanta', 'Mode.fm'];

const features = [
  { icon: '⚡', title: 'Realtime by default', desc: 'Watch visitors land, scroll, and convert the second it happens. No sampling, no 24-hour processing delay — every event streams in under 50ms.' },
  { icon: '▼', title: 'Funnels that explain why', desc: 'Build multi-step funnels in three clicks, see exactly where users drop, and segment every step by source, device, or country.' },
  { icon: '◉', title: 'Heatmaps & session replay', desc: 'Click maps, scroll depth, and privacy-safe replays show you what dashboards can’t — how people actually use each page.' },
  { icon: '🛡', title: 'Privacy-first, cookie-free', desc: 'No cookies, no fingerprinting, no consent banner required. Fully GDPR, CCPA, and PECR compliant out of the box.' },
];

const comparison = [
  { feature: 'Script size', pulse: '< 1 KB', legacy: '45+ KB' },
  { feature: 'Data freshness', pulse: 'Realtime', legacy: '24–48h delay' },
  { feature: 'Cookie banner required', pulse: 'Never', legacy: 'Yes' },
  { feature: 'Data sampling', pulse: 'None — 100% of events', legacy: 'Sampled on free tier' },
  { feature: 'You own your data', pulse: 'Yes, export anytime', legacy: 'No' },
  { feature: 'Time to first insight', pulse: '2 minutes', legacy: 'Hours of setup' },
];

const plans = [
  { name: 'Hobby', price: '$0', period: 'forever', desc: 'For side projects and personal sites.', features: ['10k events / month', '1 website', 'Realtime dashboard', '6-month data retention', 'Community support'], cta: 'Start free', highlight: false },
  { name: 'Growth', price: '$19', period: '/month', desc: 'For startups and growing products.', features: ['1M events / month', '10 websites', 'Funnels & goals', 'Heatmaps included', '3-year data retention', 'Email support'], cta: 'Start 14-day trial', highlight: true },
  { name: 'Scale', price: '$79', period: '/month', desc: 'For high-traffic teams and agencies.', features: ['10M+ events / month', 'Unlimited websites', 'Session replay', 'API & raw data export', 'Forever data retention', 'Priority support & SLA'], cta: 'Talk to sales', highlight: false },
];

const testimonials = [
  { quote: 'We deleted Google Analytics the same afternoon we installed Pulse. The realtime view alone changed how our team ships — we watch launches live now.', name: 'Maya Lindqvist', role: 'Head of Growth, Helio Labs', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { quote: 'The funnel builder found a checkout step that was silently losing 22% of mobile users. That single insight paid for ten years of Pulse.', name: 'Daniel Okafor', role: 'CTO, Driftwood', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { quote: 'Our legal team approved it in one day — no cookies, no consent banner, EU hosting. And it’s genuinely the nicest dashboard I open every morning.', name: 'Sofia Marchetti', role: 'VP Product, Quanta', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const footerCols = [
  { title: 'Product', links: ['Dashboard', 'Realtime', 'Funnels', 'Heatmaps', 'Sources'] },
  { title: 'Resources', links: ['Documentation', 'API reference', 'Status', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'GDPR', 'DPA'] },
];

const green = '#22c55e';
const panel = 'rgba(255,255,255,0.025)';
const border = '1px solid rgba(255,255,255,0.07)';
const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";

export default function PulseAnalyticsPreview() {
  const [range, setRange] = useState<Range>('7d');
  const d = chartData[range];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0e1a', color: '#e6ebf4', minHeight: '100vh', letterSpacing: '-0.01em' }}>

      {/* ─── NAV ─── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(14px)', borderBottom: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 12 6 12 9 4 15 20 18 12 22 12" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>pulse</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.9rem' }}>
            {['Product', 'Customers', 'Pricing', 'Docs', 'Blog'].map(l => (
              <a key={l} href="#" style={{ fontSize: '13.5px', color: '#8b95ab', textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <a href="#" style={{ fontSize: '13.5px', color: '#8b95ab', textDecoration: 'none' }}>Sign in</a>
            <a href="#" style={{ background: green, color: '#04140a', borderRadius: '8px', padding: '8px 17px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>Start free trial</a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 5rem' }}>
        <div style={{ position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '520px', background: 'radial-gradient(ellipse, rgba(34,197,94,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(34,197,94,0.35)', background: 'rgba(34,197,94,0.08)', borderRadius: '9999px', padding: '6px 15px', fontSize: '12.5px', color: '#86efac', fontFamily: mono }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: green, boxShadow: '0 0 10px rgba(34,197,94,0.9)' }} />
              142 people are on this page right now
            </span>
          </div>
          <h1 style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto', fontSize: 'clamp(2.6rem, 5.6vw, 4.2rem)', fontWeight: 850, letterSpacing: '-0.045em', lineHeight: 1.06 }}>
            Know your traffic.{' '}
            <span style={{ background: 'linear-gradient(120deg, #4ade80, #22c55e 55%, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>In real time.</span>
          </h1>
          <p style={{ textAlign: 'center', maxWidth: '560px', margin: '1.4rem auto 0', fontSize: '1.1rem', color: '#8b95ab', lineHeight: 1.7 }}>
            Pulse is the privacy-first web analytics platform with live visitors, conversion funnels, and heatmaps — in one fast dashboard your whole team will actually open.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', marginTop: '2.4rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: green, color: '#04140a', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 45px rgba(34,197,94,0.35)' }}>Start tracking free</a>
            <a href="#" style={{ border: '1px solid rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: '#e6ebf4', textDecoration: 'none' }}>Live demo →</a>
          </div>

          {/* Dashboard mockup */}
          <div style={{ marginTop: '4rem', borderRadius: '16px', border, background: '#0c1120', overflow: 'hidden', boxShadow: '0 0 90px rgba(34,197,94,0.1), 0 40px 90px rgba(0,0,0,0.55)' }}>
            {/* Browser bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 15px', borderBottom: border, background: '#0a0e1a' }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, marginLeft: '12px', maxWidth: '320px', background: '#141b30', borderRadius: '6px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#56627a', fontFamily: mono }}>app.usepulse.io/acme.com</span>
              </div>
            </div>
            {/* App tab bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 16px', borderBottom: border }}>
              {appTabs.map((t, i) => (
                <span key={t} style={{ fontSize: '12.5px', fontWeight: i === 0 ? 700 : 500, padding: '6px 13px', borderRadius: '7px', background: i === 0 ? 'rgba(34,197,94,0.13)' : 'transparent', color: i === 0 ? '#4ade80' : '#56627a' }}>{t}</span>
              ))}
              {/* Time range switcher */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.04)', border, borderRadius: '8px', padding: '3px' }}>
                {ranges.map(r => (
                  <button key={r} onClick={() => setRange(r)} style={{ border: 'none', cursor: 'pointer', borderRadius: '6px', padding: '5px 14px', fontSize: '12px', fontWeight: 700, fontFamily: mono, background: range === r ? green : 'transparent', color: range === r ? '#04140a' : '#8b95ab' }}>{r}</button>
                ))}
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.25rem 1.4rem' }}>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '11px', marginBottom: '1.1rem' }}>
                {[
                  { label: 'Live visitors', value: String(d.live), accent: true },
                  { label: 'Unique visitors', value: d.visitors, accent: false },
                  { label: 'Pageviews', value: d.views, accent: false },
                  { label: 'Bounce rate', value: d.bounce, accent: false },
                  { label: 'Avg. visit', value: d.duration, accent: false },
                ].map(s => (
                  <div key={s.label} style={{ background: s.accent ? 'rgba(34,197,94,0.08)' : panel, border: s.accent ? '1px solid rgba(34,197,94,0.35)' : border, borderRadius: '11px', padding: '13px 14px' }}>
                    <div style={{ fontSize: '11px', color: s.accent ? '#86efac' : '#56627a', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {s.accent && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: green, boxShadow: '0 0 8px rgba(34,197,94,0.9)' }} />}
                      {s.label}
                    </div>
                    <div style={{ fontSize: '21px', fontWeight: 700, fontFamily: mono, color: s.accent ? '#4ade80' : '#e6ebf4', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '11px' }}>
                {/* Bar chart */}
                <div style={{ background: panel, border, borderRadius: '11px', padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#8b95ab' }}>Visitors</span>
                    <span style={{ fontSize: '11px', color: '#56627a', fontFamily: mono }}>last {range}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: range === '30d' ? '3px' : '6px', height: '130px' }}>
                    {d.bars.map((h, i) => (
                      <div key={`${range}-${i}`} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === d.bars.length - 2 ? 'linear-gradient(180deg, #4ade80, rgba(34,197,94,0.25))' : 'rgba(34,197,94,0.28)' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    {d.labels.map(l => <span key={l} style={{ fontSize: '10px', color: '#3d4burn'.length > 0 ? '#3d4860' : '#3d4860', fontFamily: mono }}>{l}</span>)}
                  </div>
                </div>
                {/* Top pages w/ sparkbar rows */}
                <div style={{ background: panel, border, borderRadius: '11px', padding: '15px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#8b95ab', marginBottom: '13px' }}>Top pages</div>
                  {d.pages.map(p => (
                    <div key={p.path} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '12px', color: '#aeb8cc', fontFamily: mono }}>{p.path}</span>
                        <span style={{ fontSize: '12px', color: '#4ade80', fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>{p.views}</span>
                      </div>
                      <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        <div style={{ width: `${p.pct}%`, height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, rgba(34,197,94,0.45), #22c55e)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BY + STATS ─── */}
      <section style={{ borderTop: border, borderBottom: border, padding: '3rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#56627a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1.6rem' }}>Trusted by data-driven teams</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2.8rem' }}>
            {logos.map(l => <span key={l} style={{ fontSize: '16px', fontWeight: 700, color: '#2c3550', letterSpacing: '-0.02em' }}>{l}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center', borderLeft: '1px solid rgba(34,197,94,0.18)', padding: '0.3rem 0' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, fontFamily: mono, color: '#4ade80', letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: '#56627a', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: green, fontFamily: mono }}>Everything that matters</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Analytics without the agony</h2>
            <p style={{ color: '#8b95ab', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>Four pillars, one lightweight script. Drop in a single line of code and get answers — not a part-time job configuring reports.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem' }}>
            {features.map(f => (
              <div key={f.title} style={{ borderRadius: '16px', border, background: panel, padding: '1.9rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', color: '#4ade80', marginBottom: '1.2rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 9px', letterSpacing: '-0.02em' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#8b95ab', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section style={{ padding: '6rem 0', background: '#0c1120', borderTop: border, borderBottom: border }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.2rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: green, fontFamily: mono }}>The switch</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Life after legacy analytics</h2>
            <p style={{ color: '#8b95ab', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>You shouldn’t need a certification to read your own traffic. Here’s how Pulse compares to the old way.</p>
          </div>
          <div style={{ borderRadius: '16px', border, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#56627a' }}>Capability</div>
              <div style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 800, color: '#4ade80', background: 'rgba(34,197,94,0.07)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 12 6 12 9 4 15 20 18 12 22 12" /></svg>
                Pulse
              </div>
              <div style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#56627a' }}>Legacy analytics</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', borderTop: border, background: i % 2 === 1 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
                <div style={{ padding: '15px 20px', fontSize: '14px', color: '#aeb8cc', fontWeight: 500 }}>{row.feature}</div>
                <div style={{ padding: '15px 20px', fontSize: '13.5px', color: '#4ade80', fontWeight: 600, background: 'rgba(34,197,94,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: green, fontWeight: 800 }}>✓</span>{row.pulse}
                </div>
                <div style={{ padding: '15px 20px', fontSize: '13.5px', color: '#56627a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#7f1d1d', fontWeight: 800 }}>✕</span>{row.legacy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: green, fontFamily: mono }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Pay for events, not seats</h2>
            <p style={{ color: '#8b95ab', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>Every plan includes unlimited team members, all core reports, and EU data residency.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.3rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ borderRadius: '18px', border: plan.highlight ? '1px solid rgba(34,197,94,0.5)' : border, background: plan.highlight ? 'rgba(34,197,94,0.06)' : panel, padding: '2rem', position: 'relative', boxShadow: plan.highlight ? '0 0 60px rgba(34,197,94,0.12)' : 'none' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: green, color: '#04140a', borderRadius: '9999px', padding: '4px 15px', fontSize: '11.5px', fontWeight: 800, whiteSpace: 'nowrap' }}>Most popular</div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 5px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: '#8b95ab', margin: '0 0 1.4rem' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '1.6rem' }}>
                  <span style={{ fontSize: '2.6rem', fontWeight: 800, fontFamily: mono, letterSpacing: '-0.05em' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: '#56627a', marginBottom: '8px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: plan.highlight ? green : 'rgba(255,255,255,0.06)', color: plan.highlight ? '#04140a' : '#e6ebf4', marginBottom: '1.7rem' }}>{plan.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#aeb8cc' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '6rem 0', background: '#0c1120', borderTop: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: green, fontFamily: mono }}>Customers</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>Teams that switched and stayed</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.3rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ borderRadius: '18px', border, background: panel, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ fontSize: '26px', color: green, lineHeight: 1, fontFamily: 'Georgia, serif' }}>“</div>
                <p style={{ fontSize: '14.5px', color: '#aeb8cc', lineHeight: 1.8, margin: 0, flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(34,197,94,0.4)' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: '#56627a', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '6rem 0', borderTop: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ borderRadius: '24px', border: '1px solid rgba(34,197,94,0.3)', background: 'linear-gradient(140deg, rgba(34,197,94,0.12), rgba(34,197,94,0.03) 60%)', padding: '4.2rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '560px', height: '320px', background: 'radial-gradient(ellipse, rgba(34,197,94,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem', position: 'relative' }}>Your traffic is happening right now</h2>
            <p style={{ color: '#8b95ab', fontSize: '1.05rem', maxWidth: '470px', margin: '0 auto 2.4rem', lineHeight: 1.7, position: 'relative' }}>
              Install the 1 KB snippet and watch your first live visitor in under two minutes. Free for 10k events a month — no credit card, no cookie banner.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap', position: 'relative' }}>
              <a href="#" style={{ background: green, color: '#04140a', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 45px rgba(34,197,94,0.35)' }}>Start tracking free</a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, color: '#e6ebf4', textDecoration: 'none' }}>Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: border, padding: '3.5rem 0 2.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 12 6 12 9 4 15 20 18 12 22 12" /></svg>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800 }}>pulse</span>
              </div>
              <p style={{ fontSize: '13px', color: '#3d4860', lineHeight: 1.7, margin: 0 }}>Privacy-first web analytics for teams who’d rather build than configure. Made in the EU.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#56627a', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13.5px', color: '#3d4860', textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: border, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: '#2c3550', margin: 0, fontFamily: mono }}>© 2026 Pulse Analytics OÜ — all data stays yours.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Twitter', 'GitHub', 'Mastodon'].map(s => <a key={s} href="#" style={{ fontSize: '12.5px', color: '#2c3550', textDecoration: 'none' }}>{s}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
