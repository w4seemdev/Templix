/* ============================================================
   PETALWORKS — Florist & Flower Studio Template
   Soft blush with sage-green accents. Fully responsive.
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
  bg: '#fbf6f4',
  surface: '#ffffff',
  ink: '#3a2b2f',
  muted: '#7d6a6e',
  faint: '#a99ba0',
  line: '#eeddd8',
  rose: '#c25a72',
  sage: '#7f9b7a',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1140px', margin: '0 auto', width: '100%' };

const occasions = ['All', 'Weddings', 'Birthday', 'Sympathy', 'Just because'];
const bouquets = [
  { name: 'Garden Romance', occ: 'Weddings', price: 85, note: 'Peonies, garden roses, eucalyptus', from: '#e79ab0', to: '#a04a63' },
  { name: 'Sunlit Joy', occ: 'Birthday', price: 65, note: 'Ranunculus, daisies, craspedia', from: '#f0c46a', to: '#b07a2a' },
  { name: 'Quiet Comfort', occ: 'Sympathy', price: 95, note: 'White lilies, stock, dusty miller', from: '#d7dbe0', to: '#8a9199' },
  { name: 'Wildflower Bundle', occ: 'Just because', price: 55, note: 'Cosmos, scabiosa, seasonal greens', from: '#c88fb4', to: '#6d3f60' },
  { name: 'Blush Cascade', occ: 'Weddings', price: 120, note: 'Roses, sweet peas, jasmine vine', from: '#eaa1ac', to: '#9c4552' },
  { name: 'Meadow Morning', occ: 'Just because', price: 60, note: 'Tulips, anemones, ranunculus', from: '#d97a86', to: '#7a2f3c' },
];

export default function FloristPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Shop />
      <Subscription />
      <Story />
      <Reviews />
      <Footer />
    </div>
  );
}

function Bloom() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="3" /><path d="M12 12v9M9 21c0-2 1.5-3 3-3M15 21c0-2-1.5-3-3-3" /><path d="M12 6c0-2 1.5-3 3-3M12 6c0-2-1.5-3-3-3" />
    </svg>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Shop', 'Weekly flowers', 'Our story'];
  const anchors = ['shop', 'subscription', 'story'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,246,244,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: C.ink }}><Bloom /><span style={{ fontFamily: serif, fontSize: '21px', fontWeight: 700 }}>Petalworks</span></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#shop" style={{ background: C.rose, color: '#fff', borderRadius: '999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Order flowers</a>}
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
    <section id="top" style={{ ...container, padding: m ? '44px 20px 48px' : '80px 20px 88px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '32px' : '52px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage, fontWeight: 700 }}>Seasonal · locally grown</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.7rem' : '4.4rem', fontWeight: 700, lineHeight: 1.04, margin: '16px 0 20px' }}>Flowers that say it better.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.125rem', color: C.muted, lineHeight: 1.7, maxWidth: '430px', margin: '0 0 30px' }}>Hand-tied arrangements made each morning from the best of the season, delivered across the city the same day.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#shop" style={{ background: C.rose, color: '#fff', borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Shop bouquets</a>
          <a href="#subscription" style={{ border: `1px solid ${C.sage}`, color: C.sage, borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Weekly flowers</a>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: m ? '4/3' : '1/1', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(155deg,#eaa1ac,#8f3f54)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>This week's bloom</span>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: '6px' }}>Garden Romance</span>
        </div>
      </div>
    </section>
  );
}

function Shop() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? bouquets : bouquets.filter((b) => b.occ === active);
  return (
    <section id="shop" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: '0 0 14px' }}>Shop by occasion</h2>
          <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {occasions.map((o) => (
              <button key={o} onClick={() => setActive(o)} style={{ cursor: 'pointer', borderRadius: '999px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === o ? C.rose : C.line}`, background: active === o ? C.rose : 'transparent', color: active === o ? '#fff' : C.muted }}>{o}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: m ? '16px' : '26px' }}>
          {list.map((b) => (
            <article key={b.name} style={{ borderRadius: '18px', overflow: 'hidden', border: `1px solid ${C.line}`, background: C.bg }}>
              <div style={{ aspectRatio: '4/5', background: `linear-gradient(155deg,${b.from},${b.to})` }} />
              <div style={{ padding: m ? '14px' : '18px' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 700, margin: '0 0 5px' }}>{b.name}</h3>
                <p style={{ fontSize: '13px', color: C.muted, margin: '0 0 12px', lineHeight: 1.5 }}>{b.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '17px', fontWeight: 700, color: C.rose }}>${b.price}</span>
                  <button aria-label="Add to basket" style={{ border: `1px solid ${C.line}`, background: 'transparent', color: C.ink, borderRadius: '999px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subscription() {
  const m = useIsMobile();
  const plans = [
    { name: 'Petite', price: 32, freq: 'every other week', feats: ['Seasonal stems', 'Free local delivery', 'Pause anytime'], hot: false },
    { name: 'Classic', price: 48, freq: 'every week', feats: ['Fuller arrangement', 'Free local delivery', 'Vase every 4th week'], hot: true },
    { name: 'Grand', price: 72, freq: 'every week', feats: ['Statement bouquet', 'Priority delivery', 'Complimentary vase'], hot: false },
  ];
  return (
    <section id="subscription" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage, fontWeight: 700 }}>Fresh, on a schedule</span>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, margin: '12px 0 0' }}>Weekly flower subscriptions</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '22px', alignItems: 'stretch' }}>
        {plans.map((p) => (
          <div key={p.name} style={{ background: p.hot ? C.rose : C.surface, color: p.hot ? '#fff' : C.ink, border: `1px solid ${p.hot ? C.rose : C.line}`, borderRadius: '18px', padding: '30px', position: 'relative' }}>
            {p.hot && <span style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}>Most loved</span>}
            <h3 style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px' }}>{p.name}</h3>
            <div style={{ margin: '0 0 20px' }}><span style={{ fontSize: '2.4rem', fontWeight: 800 }}>${p.price}</span><span style={{ fontSize: '14px', opacity: 0.85 }}> / {p.freq}</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {p.feats.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '14px' }}>
                  <svg width="16" height="16" fill="none" stroke={p.hot ? '#fff' : C.sage} strokeWidth="2.4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>{f}
                </li>
              ))}
            </ul>
            <a href="#subscription" style={{ display: 'block', textAlign: 'center', background: p.hot ? '#fff' : C.rose, color: p.hot ? C.rose : '#fff', borderRadius: '999px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Choose {p.name}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const m = useIsMobile();
  return (
    <section id="story" style={{ background: C.sage, color: '#f4f7f2' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
        <div style={{ aspectRatio: m ? '4/3' : '4/5', borderRadius: '18px', background: 'linear-gradient(155deg,#a7c19f,#4a5e46)' }} />
        <div>
          <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e7d3d8', fontWeight: 700 }}>Our studio</span>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '14px 0 18px' }}>Grown close to home</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.92, margin: '0 0 16px' }}>We started Petalworks with a single market stall and a simple rule: only sell flowers we would put on our own table. Most of our stems come from growers within an hour of the studio.</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.92, margin: 0 }}>Everything is arranged by hand the morning it goes out, wrapped in recycled paper, and delivered by bike wherever we can.</p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'The wedding flowers brought me to tears. Every table looked like a painting.', a: 'Grace & Tom' },
    { text: 'My weekly delivery is the highlight of my Monday. Always fresh, always beautiful.', a: 'Yusuf A.' },
    { text: 'Ordered sympathy flowers last-minute and they handled it with such kindness.', a: 'Marianne L.' },
  ];
  return (
    <section style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>Kind words</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '18px', padding: '28px' }}>
            <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '12px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={C.rose} stroke={C.rose}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
            <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 16px' }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', fontWeight: 600, color: C.muted }}>{r.a}</figcaption>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', justifyContent: m ? 'center' : 'flex-start', width: m ? '100%' : 'auto' }}><Bloom /><span style={{ fontFamily: serif, fontSize: '19px', fontWeight: 700 }}>Petalworks</span></div>
        <span style={{ fontSize: '14px', color: C.muted }}>112 Blossom Row, Sheffield · Open Tue–Sun</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Petalworks Studio</span>
      </div>
    </footer>
  );
}
