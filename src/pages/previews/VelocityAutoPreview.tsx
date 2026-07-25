/* ============================================================
   VELOCITY - Performance Auto Dealership Template
   Carbon black with electric crimson. Fully responsive.
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

const C = {
  bg: '#0b0c0e',
  surface: '#14161a',
  ink: '#f4f5f7',
  muted: '#9aa1ad',
  faint: '#636975',
  line: 'rgba(255,255,255,0.08)',
  red: '#e01e37',
};
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1220px', margin: '0 auto', width: '100%' };

const bodies = ['All', 'Coupé', 'SUV', 'Electric', 'Roadster'];
const cars = [
  { name: 'Velocity GT-R', body: 'Coupé', price: '128,900', hp: 612, zero: '3.2s', top: '198', from: '#c11f34', to: '#3a0a12' },
  { name: 'Apex Electric', body: 'Electric', price: '96,400', hp: 560, zero: '3.5s', top: '162', from: '#1f5fc1', to: '#0a1a3a' },
  { name: 'Terra SUV', body: 'SUV', price: '84,200', hp: 468, zero: '4.6s', top: '155', from: '#3a3f45', to: '#141619' },
  { name: 'Spyder R', body: 'Roadster', price: '142,000', hp: 640, zero: '3.0s', top: '205', from: '#c1841f', to: '#3a2607' },
  { name: 'Coupé S', body: 'Coupé', price: '72,500', hp: 402, zero: '4.9s', top: '168', from: '#5a5f66', to: '#1a1c1f' },
  { name: 'Volt SUV', body: 'Electric', price: '78,900', hp: 512, zero: '4.1s', top: '149', from: '#1fa38a', to: '#0a3329' },
];

export default function VelocityAutoPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Fleet />
      <Why />
      <TradeIn />
      <Reviews />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17h2l1.5-4h9L18 17h2M6 17v2M18 17v2M8 9l1-3h6l1 3" /><circle cx="8" cy="17" r="1.4" fill={C.red} /><circle cx="16" cy="17" r="1.4" fill={C.red} /></svg>
      <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Velocity</span>
    </span>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Fleet', 'Why us', 'Trade-in', 'Reviews'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,12,14,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none', color: C.ink }}><Logo /></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase().replace(/[^a-z]/g, '')}`} style={{ fontSize: '13px', letterSpacing: '0.04em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', fontWeight: 600 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#fleet" style={{ background: C.red, color: '#fff', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Book a test drive</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase().replace(/[^a-z]/g, '')}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 480px at 76% 0%, rgba(224,30,55,0.22), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '52px 20px 56px' : '92px 20px 104px', position: 'relative' }}>
        <span style={{ display: 'inline-block', border: `1px solid ${C.red}`, color: C.red, borderRadius: '999px', padding: '5px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '22px' }}>New 2025 lineup</span>
        <h1 style={{ fontSize: m ? '2.8rem' : '5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 20px', maxWidth: '660px' }}>Engineered to move you.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.65, maxWidth: '460px', margin: '0 0 30px' }}>A curated fleet of performance and electric machines, backed by transparent pricing and a five-year warranty on every drive.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#fleet" style={{ background: C.red, color: '#fff', borderRadius: '8px', padding: '15px 32px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Explore the fleet</a>
          <a href="#tradein" style={{ border: `1px solid ${C.line}`, color: C.ink, borderRadius: '8px', padding: '15px 32px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Value my trade-in</a>
        </div>
        <div style={{ display: 'flex', gap: m ? '26px' : '48px', marginTop: '48px', flexWrap: 'wrap' }}>
          {[['4,200+', 'Cars delivered'], ['4.9★', 'Owner rating'], ['5 yr', 'Warranty'], ['0%', 'APR available']].map(([n, l]) => (
            <div key={l}><div style={{ fontSize: m ? '1.5rem' : '1.9rem', fontWeight: 800 }}>{n}</div><div style={{ fontSize: '13px', color: C.muted }}>{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)' }}>
      <div style={{ fontSize: '14px', fontWeight: 800, color: C.ink }}>{value}</div>
      <div style={{ fontSize: '10px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{label}</div>
    </div>
  );
}

function Fleet() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? cars : cars.filter((c) => c.body === active);
  return (
    <section id="fleet" style={{ ...container, padding: m ? '48px 20px' : '84px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>The current fleet</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {bodies.map((b) => (
            <button key={b} onClick={() => setActive(b)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '6px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === b ? C.red : C.line}`, background: active === b ? C.red : 'transparent', color: active === b ? '#fff' : C.muted }}>{b}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '16px' : '24px' }}>
        {list.map((c) => (
          <article key={c.name} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '16/10', background: `linear-gradient(150deg,${c.from},${c.to})`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
              <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{c.body}</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{c.name}</h3>
                <span style={{ fontSize: '14px', fontWeight: 700, color: C.red }}>${c.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                <SpecChip label="Horsepower" value={`${c.hp}`} />
                <SpecChip label="0-100" value={c.zero} />
                <SpecChip label="Top mph" value={c.top} />
              </div>
              <a href="#fleet" style={{ display: 'block', textAlign: 'center', border: `1px solid ${C.line}`, color: C.ink, borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Book a test drive</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const m = useIsMobile();
  const items = [
    { t: 'Transparent pricing', d: 'One fair price on every car - no haggling, no hidden add-ons.', p: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { t: '200-point inspection', d: 'Every vehicle is fully reconditioned and certified before sale.', p: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
    { t: '7-day return', d: 'Change your mind within a week and we take it back, no fuss.', p: 'M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8' },
    { t: 'Flexible finance', d: 'Rates from 0% APR with instant online pre-approval.', p: 'M3 10h18M3 6h18v12H3zM7 15h4' },
  ];
  return (
    <section id="whyus" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '84px 20px' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 44px' }}>Buying, done properly</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4,1fr)', gap: '24px' }}>
          {items.map((i) => (
            <div key={i.t}>
              <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(224,30,55,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="22" height="22" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={i.p} /></svg>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px' }}>{i.t}</h3>
              <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.65, margin: 0 }}>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeIn() {
  const m = useIsMobile();
  const field: React.CSSProperties = { background: C.bg, border: `1px solid ${C.line}`, borderRadius: '8px', padding: '13px 14px', color: C.ink, fontSize: '14px', width: '100%' };
  return (
    <section id="tradein" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ background: 'linear-gradient(135deg,#e01e37,#7a0f1e)', borderRadius: '20px', padding: m ? '32px 24px' : '52px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '28px' : '48px', alignItems: 'center', color: '#fff' }}>
        <div>
          <h2 style={{ fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>Trade in and drive out the same day.</h2>
          <p style={{ fontSize: m ? '1rem' : '1.1rem', opacity: 0.92, lineHeight: 1.6, margin: 0, maxWidth: '420px' }}>Get a firm online valuation in under two minutes and put it straight toward your next Velocity.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ background: C.surface, borderRadius: '14px', padding: m ? '22px' : '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input placeholder="Registration plate" style={field} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}><input placeholder="Make" style={field} /><input placeholder="Mileage" style={field} /></div>
          <button type="submit" style={{ background: C.red, color: '#fff', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Get my valuation</button>
        </form>
      </div>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'Bought the GT-R sight-unseen and it arrived flawless. The 7-day return meant zero risk.', a: 'Marcus D.', c: 'GT-R owner' },
    { text: 'Best car-buying experience I have had. No pressure, honest pricing, sorted my finance in minutes.', a: 'Elena F.', c: 'Apex Electric owner' },
    { text: 'They gave me more for my trade-in than three other dealers. Drove home the same afternoon.', a: 'Raj P.', c: 'Terra SUV owner' },
  ];
  return (
    <section id="reviews" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 36px' }}>What owners say</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '16px', padding: '26px' }}>
            <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '12px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={C.red} stroke={C.red}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
            <blockquote style={{ fontSize: '1rem', lineHeight: 1.65, margin: '0 0 16px' }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.c}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <div style={{ width: m ? '100%' : 'auto', display: 'flex', justifyContent: m ? 'center' : 'flex-start' }}><Logo /></div>
        <span style={{ fontSize: '14px', color: C.muted }}>Unit 4, Speedway Park, Birmingham · +44 121 496 0140</span>
        <span style={{ fontSize: '13px', color: C.muted }}>© {new Date().getFullYear()} Velocity Motors</span>
      </div>
    </footer>
  );
}
