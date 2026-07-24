/* ============================================================
   SWIFT — Food Delivery Template
   Fresh green with lime pop. Fully responsive.
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
  bg: '#f4f7f4',
  surface: '#ffffff',
  ink: '#10231a',
  muted: '#5b6f63',
  faint: '#93a498',
  line: '#e2eae4',
  green: '#17a34a',
  dark: '#0e1a12',
  lime: '#c6f24d',
};
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', width: '100%' };

const cuisines = ['All', 'Pizza', 'Sushi', 'Burgers', 'Healthy', 'Dessert'];
const spots = [
  { name: 'Napoli Slice', cuisine: 'Pizza', rating: 4.8, time: '20–30', fee: 'Free', from: '#e0553a', to: '#7a2416' },
  { name: 'Kaito Sushi', cuisine: 'Sushi', rating: 4.9, time: '25–35', fee: '$1.99', from: '#2e6f5e', to: '#123329' },
  { name: 'Smash & Co.', cuisine: 'Burgers', rating: 4.7, time: '15–25', fee: 'Free', from: '#c58a3a', to: '#5f3f16' },
  { name: 'Green Bowl', cuisine: 'Healthy', rating: 4.8, time: '20–30', fee: 'Free', from: '#4a8f3a', to: '#1f4118' },
  { name: 'Sugar Lab', cuisine: 'Dessert', rating: 4.9, time: '30–40', fee: '$0.99', from: '#c05a86', to: '#5f223e' },
  { name: 'Taco Norte', cuisine: 'Burgers', rating: 4.6, time: '20–30', fee: 'Free', from: '#d08a2a', to: '#6b4310' },
];

export default function SwiftDeliveryPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Restaurants />
      <How />
      <Stats />
      <AppCta />
      <Footer />
    </div>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: light ? '#fff' : C.ink }}>
      <span style={{ width: '30px', height: '30px', borderRadius: '9px', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
      </span>
      <span style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.03em' }}>Swift</span>
    </span>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Restaurants', 'How it works', 'Get the app'];
  const anchors = ['restaurants', 'how', 'app'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,247,244,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><Logo /></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#restaurants" style={{ background: C.green, color: '#fff', borderRadius: '999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Order now</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '48px 20px' : '84px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '36px' : '48px', alignItems: 'center' }}>
      <div>
        <span style={{ display: 'inline-block', background: C.lime, color: C.dark, borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 800, marginBottom: '20px' }}>Delivered in under 30 minutes</span>
        <h1 style={{ fontSize: m ? '2.8rem' : '4.6rem', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.03, margin: '0 0 20px' }}>Your city's best food, at your door.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.65, maxWidth: '440px', margin: '0 0 28px' }}>Order from 3,000+ local restaurants and track every step from kitchen to doorstep. No surprises, no cold food.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', maxWidth: '460px', flexDirection: m ? 'column' : 'row' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: C.surface, border: `1px solid ${C.line}`, borderRadius: '12px', padding: '0 14px' }}>
            <svg width="18" height="18" fill="none" stroke={C.faint} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <input placeholder="Enter your delivery address" style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: C.ink, padding: '14px 0', width: '100%' }} />
          </div>
          <button type="submit" style={{ background: C.green, color: '#fff', border: 'none', borderRadius: '12px', padding: '15px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Find food</button>
        </form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Phone m={m} />
      </div>
    </section>
  );
}

function Phone({ m }: { m: boolean }) {
  return (
    <div style={{ width: m ? '220px' : '270px', borderRadius: '34px', background: C.dark, padding: '12px', boxShadow: '0 30px 70px rgba(16,35,26,0.28)' }}>
      <div style={{ borderRadius: '24px', background: C.surface, overflow: 'hidden' }}>
        <div style={{ background: C.green, padding: '18px 16px', color: '#fff' }}>
          <div style={{ fontSize: '11px', opacity: 0.85 }}>Delivering to</div>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>42 Elm Street</div>
        </div>
        <div style={{ padding: '14px' }}>
          {[['Napoli Slice', '4.8 · 22 min', '#e0553a'], ['Kaito Sushi', '4.9 · 28 min', '#2e6f5e'], ['Green Bowl', '4.8 · 24 min', '#4a8f3a']].map(([n, s, col]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: `1px solid ${C.line}` }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: col as string, flexShrink: 0 }} />
              <div><div style={{ fontSize: '13px', fontWeight: 700 }}>{n}</div><div style={{ fontSize: '11px', color: C.muted }}>{s}</div></div>
            </div>
          ))}
          <div style={{ marginTop: '12px', background: C.lime, color: C.dark, borderRadius: '12px', padding: '10px', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>Order arriving in 6 min</div>
        </div>
      </div>
    </div>
  );
}

function Restaurants() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? spots : spots.filter((s) => s.cuisine === active);
  return (
    <section id="restaurants" style={{ ...container, padding: m ? '40px 20px' : '64px 20px' }}>
      <h2 style={{ fontSize: m ? '1.9rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Popular near you</h2>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '24px' }}>
        {cuisines.map((c) => (
          <button key={c} onClick={() => setActive(c)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '999px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === c ? C.green : C.line}`, background: active === c ? C.green : C.surface, color: active === c ? '#fff' : C.muted }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: m ? '14px' : '22px' }}>
        {list.map((s) => (
          <article key={s.name} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '16/10', background: `linear-gradient(150deg,${s.from},${s.to})`, position: 'relative' }}>
              <span style={{ position: 'absolute', top: '10px', left: '10px', background: C.surface, borderRadius: '999px', padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: s.fee === 'Free' ? C.green : C.ink }}>{s.fee === 'Free' ? 'Free delivery' : `${s.fee} delivery`}</span>
            </div>
            <div style={{ padding: m ? '12px' : '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px' }}>{s.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: C.muted }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: C.ink, fontWeight: 600 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={C.green} stroke={C.green}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>{s.rating}
                </span>
                <span>·</span><span>{s.cuisine}</span><span>·</span><span>{s.time} min</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function How() {
  const m = useIsMobile();
  const steps = [
    { n: '1', t: 'Pick your food', d: 'Browse thousands of local menus and add to your basket in a tap.' },
    { n: '2', t: 'We cook & collect', d: 'Your order goes straight to the kitchen and a nearby courier.' },
    { n: '3', t: 'Track to your door', d: 'Watch your rider on the map, right down to the last minute.' },
  ];
  return (
    <section id="how" style={{ background: C.dark, color: '#fff' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 44px' }}>Hot food in three steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '26px' }}>
          {steps.map((s) => (
            <div key={s.n}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: C.lime, color: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px' }}>{s.n}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px' }}>{s.t}</h3>
              <p style={{ fontSize: '14px', color: '#aab8ae', lineHeight: 1.7, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const m = useIsMobile();
  const items = [['3,000+', 'Restaurants'], ['28 min', 'Avg. delivery'], ['1.2M', 'Orders delivered'], ['4.9★', 'App rating']];
  return (
    <section style={{ ...container, padding: m ? '40px 20px' : '64px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: '20px' }}>
        {items.map(([n, l]) => (
          <div key={l} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: m ? '1.8rem' : '2.2rem', fontWeight: 800, color: C.green }}>{n}</div>
            <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppCta() {
  const m = useIsMobile();
  return (
    <section id="app" style={{ ...container, padding: m ? '20px 20px 56px' : '40px 20px 88px' }}>
      <div style={{ background: 'linear-gradient(135deg,#17a34a,#0c6e33)', borderRadius: '24px', color: '#fff', padding: m ? '36px 24px' : '56px', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Get Swift on your phone</h2>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', opacity: 0.9, margin: '0 0 28px' }}>Exclusive deals, faster reorders and live tracking. Free on iOS and Android.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['App Store', 'Google Play'].map((s) => (
            <a key={s} href="#app" style={{ background: C.dark, color: '#fff', borderRadius: '12px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm-5 18.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z" /></svg>{s}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '250px' }}><Logo /><p style={{ fontSize: '14px', color: C.faint, marginTop: '12px', lineHeight: 1.7 }}>Your city's best food, delivered fast and fresh.</p></div>
        {[{ h: 'Company', l: ['About', 'Careers', 'Newsroom', 'Blog'] }, { h: 'For partners', l: ['Add your restaurant', 'Become a courier', 'Swift for Business'] }, { h: 'Support', l: ['Help centre', 'Order issues', 'Contact', 'Privacy'] }].map((col) => (
          <div key={col.h}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.faint, margin: '0 0 14px' }}>{col.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>{col.l.map((l) => <li key={l}><a href="#restaurants" style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}>{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div style={{ ...container, marginTop: '32px', paddingTop: '20px', borderTop: `1px solid ${C.line}` }}><span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Swift Delivery. All rights reserved.</span></div>
    </footer>
  );
}
