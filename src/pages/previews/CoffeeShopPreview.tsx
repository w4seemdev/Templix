/* ============================================================
   ROASTED — Specialty Coffee Shop Template
   Warm cream with terracotta & roast-brown accents. Responsive.
   ============================================================ */

import { useState, useEffect } from 'react';

function useIsMobile() {
  const [m, setM] = useState(false);
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
  bg: '#f7f1e8',
  surface: '#fffdf9',
  ink: '#2b211a',
  muted: '#6f5f52',
  faint: '#9c8b7c',
  line: '#e5d8c8',
  accent: '#b5551d',
  brown: '#3f2d22',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1120px', margin: '0 auto', width: '100%' };

const groups = ['Espresso', 'Filter', 'Kitchen'];
const menu: Record<string, { name: string; desc: string; price: string }[]> = {
  Espresso: [
    { name: 'Flat White', desc: 'Double ristretto, silky steamed milk', price: '3.80' },
    { name: 'Cortado', desc: 'Equal parts espresso and warm milk', price: '3.40' },
    { name: 'Cappuccino', desc: 'Espresso, textured milk, cocoa dust', price: '3.60' },
    { name: 'Mocha', desc: 'Single-origin cocoa, espresso, milk', price: '4.20' },
  ],
  Filter: [
    { name: 'V60 Pour-over', desc: 'Rotating single origin, brewed to order', price: '4.50' },
    { name: 'Batch Brew', desc: 'Bright, clean, endlessly refillable', price: '3.20' },
    { name: 'Cold Brew', desc: '18-hour steep, served over ice', price: '4.00' },
    { name: 'Iced Latte', desc: 'Double shot, cold milk, big ice', price: '4.20' },
  ],
  Kitchen: [
    { name: 'Sourdough Toast', desc: 'Cultured butter, sea salt, honey', price: '4.50' },
    { name: 'Avocado Smash', desc: 'Chilli, lime, poached egg, dukkah', price: '9.50' },
    { name: 'Banana Bread', desc: 'Toasted, whipped mascarpone', price: '4.80' },
    { name: 'Almond Croissant', desc: 'Baked fresh each morning', price: '3.90' },
  ],
};

export default function CoffeeShopPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Menu />
      <Beans />
      <Visit />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Menu', 'Beans', 'Visit'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(247,241,232,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: C.ink }}>
          <BeanMark />
          <span style={{ fontFamily: serif, fontSize: '21px', fontWeight: 700, letterSpacing: '0.02em' }}>Roasted</span>
        </a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#visit" style={{ background: C.accent, color: '#fff', borderRadius: '999px', padding: '9px 20px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Order ahead</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function BeanMark() {
  return (
    <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: C.brown, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.bg} strokeWidth="1.6"><ellipse cx="12" cy="12" rx="8" ry="9" /><path d="M12 4c-3 3-3 13 0 16" /></svg>
    </span>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '44px 20px 52px' : '84px 20px 92px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
      <div>
        <span style={{ display: 'inline-block', background: 'rgba(181,85,29,0.12)', color: C.accent, borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '20px' }}>Neighbourhood roastery · since 2015</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.7rem' : '4.4rem', fontWeight: 700, lineHeight: 1.04, margin: '0 0 20px' }}>Coffee worth<br />slowing down for.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.125rem', color: C.muted, lineHeight: 1.7, maxWidth: '440px', margin: '0 0 30px' }}>We roast small batches in-house every week, pull each shot by hand, and pair it with a kitchen that bakes from scratch each morning.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#menu" style={{ background: C.accent, color: '#fff', borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>See the menu</a>
          <a href="#visit" style={{ border: `1px solid ${C.brown}`, color: C.brown, borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Find us</a>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: m ? '4/3' : '1/1', borderRadius: '18px', overflow: 'hidden', background: 'linear-gradient(155deg,#8a5a34,#2b1a10)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>This week's roast</span>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: '6px' }}>Ethiopia Guji</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginTop: '4px' }}>Peach · jasmine · honey</span>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const m = useIsMobile();
  const [tab, setTab] = useState('Espresso');
  return (
    <section id="menu" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: '0 0 8px' }}>On the menu</h2>
          <p style={{ color: C.muted, margin: 0 }}>Prices in GBP. Oat, soy and almond always available.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {groups.map((g) => (
            <button key={g} onClick={() => setTab(g)} style={{ cursor: 'pointer', borderRadius: '999px', padding: '9px 20px', fontSize: '13px', fontWeight: 600, border: `1px solid ${tab === g ? C.accent : C.line}`, background: tab === g ? C.accent : 'transparent', color: tab === g ? '#fff' : C.muted }}>{g}</button>
          ))}
        </div>
        <div style={{ maxWidth: '780px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '18px' : '20px 40px' }}>
          {menu[tab].map((d) => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 3px' }}>{d.name}</h3>
                <p style={{ fontSize: '13px', color: C.muted, margin: 0 }}>{d.desc}</p>
              </div>
              <span style={{ fontSize: '15px', color: C.accent, fontWeight: 700 }}>£{d.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beans() {
  const m = useIsMobile();
  const steps = [
    { n: '01', t: 'Sourced direct', d: 'We buy green coffee straight from farms and co-ops we visit each harvest.' },
    { n: '02', t: 'Roasted weekly', d: 'Small drums, tight profiles, roasted to order so nothing sits on a shelf.' },
    { n: '03', t: 'Brewed with care', d: 'Trained baristas, calibrated grinders, and water dialled in daily.' },
  ];
  return (
    <section id="beans" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, margin: '0 0 10px' }}>From cherry to cup</p>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, margin: 0 }}>How we do coffee</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '22px' }}>
        {steps.map((s) => (
          <div key={s.n} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '14px', padding: '28px' }}>
            <span style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 700, color: C.accent }}>{s.n}</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '10px 0 8px' }}>{s.t}</h3>
            <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Visit() {
  const m = useIsMobile();
  return (
    <section id="visit" style={{ background: C.brown, color: '#f4e9dc' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e0a878', margin: '0 0 14px' }}>Come say hi</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '0 0 24px' }}>Open daily on Baker Lane</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
            {[['Mon–Fri', '7:00 – 18:00'], ['Saturday', '8:00 – 18:00'], ['Sunday', '8:00 – 16:00']].map(([d, h]) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '320px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ opacity: 0.85 }}>{d}</span><span style={{ fontWeight: 600 }}>{h}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '15px', marginTop: '22px', opacity: 0.85 }}>24 Baker Lane, Bristol BS1 · +44 117 946 0180</p>
        </div>
        <div style={{ aspectRatio: m ? '4/3' : '4/3', borderRadius: '16px', background: 'linear-gradient(155deg,#7a5232,#2b1a10)', display: 'flex', alignItems: 'flex-end', padding: '22px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>Corner of Baker Lane & Quay Street</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ padding: '40px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}><BeanMark /><span style={{ fontFamily: serif, fontSize: '18px', fontWeight: 700 }}>Roasted</span></div>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Roasted Coffee. All rights reserved.</span>
        {!m && <span style={{ fontSize: '13px', color: C.faint }}>Instagram · TikTok · Newsletter</span>}
      </div>
    </footer>
  );
}
