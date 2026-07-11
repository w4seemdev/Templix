/* ============================================================
   SHOPDROP — Streetwear Ecommerce Template
   Dark charcoal with orange accent. Fully responsive.
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
  bg: '#0a0a0a',
  surface: '#141414',
  border: 'rgba(255,255,255,0.08)',
  text: '#fafafa',
  muted: '#a1a1aa',
  faint: '#6b6b70',
  accent: '#f97316',
  accent2: '#fb923c',
};

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '1px' }} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? C.accent : 'none'}
          stroke={s <= Math.round(rating) ? C.accent : '#3f3f46'} strokeWidth="1.5">
          <path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" />
        </svg>
      ))}
    </span>
  );
}

const categories = ['All', 'Tops', 'Outerwear', 'Bottoms', 'Footwear', 'Accessories'];

const products = [
  { name: 'Oversized Drop Tee', cat: 'Tops', price: 45, was: 0, rating: 4.8, reviews: 312, badge: 'New', from: '#f97316', to: '#7c2d12' },
  { name: 'Arch Logo Hoodie', cat: 'Outerwear', price: 110, was: 0, rating: 4.9, reviews: 508, badge: '', from: '#404040', to: '#0a0a0a' },
  { name: 'Street Cargo Pants', cat: 'Bottoms', price: 89, was: 120, rating: 4.7, reviews: 204, badge: 'Sale', from: '#57534e', to: '#1c1917' },
  { name: 'Air Runner 2.0', cat: 'Footwear', price: 160, was: 0, rating: 4.9, reviews: 521, badge: 'New', from: '#fb923c', to: '#7c2d12' },
  { name: 'Ribbed Knit Vest', cat: 'Tops', price: 55, was: 0, rating: 4.6, reviews: 96, badge: '', from: '#78716c', to: '#292524' },
  { name: 'Track Jacket', cat: 'Outerwear', price: 95, was: 130, rating: 4.9, reviews: 187, badge: 'Sale', from: '#ea580c', to: '#431407' },
  { name: 'Mini Shoulder Bag', cat: 'Accessories', price: 65, was: 0, rating: 4.7, reviews: 143, badge: '', from: '#525252', to: '#171717' },
  { name: 'High-Top Canvas', cat: 'Footwear', price: 120, was: 0, rating: 4.8, reviews: 402, badge: '', from: '#f59e0b', to: '#78350f' },
];

const container: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', width: '100%' };

export default function ShopDropEcommercePreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Shop />
      <Promo />
      <Reviews />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Shop', 'New', 'Reviews', 'About'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...container, padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.04em', color: C.text, textDecoration: 'none' }}>SHOP<span style={{ color: C.accent }}>DROP</span></a>
        {!m && (
          <nav style={{ display: 'flex', gap: '30px' }}>
            {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}
          </nav>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="#shop" aria-label="Cart" style={{ position: 'relative', color: C.text, display: 'flex' }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', minWidth: '17px', height: '17px', padding: '0 4px', borderRadius: '9px', background: C.accent, fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>3</span>
          </a>
          {m && (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.text, cursor: 'pointer', display: 'flex', padding: 0 }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg>
            </button>
          )}
        </div>
      </div>
      {m && open && (
        <nav style={{ borderTop: `1px solid ${C.border}`, padding: '10px 20px 18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1000px 480px at 78% -10%, rgba(249,115,22,0.28), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '56px 20px 64px' : '92px 20px 104px', position: 'relative' }}>
        <span style={{ display: 'inline-block', background: C.accent, borderRadius: '4px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', marginBottom: '22px' }}>New Collection · FW</span>
        <h1 style={{ fontSize: m ? '2.6rem' : '4.6rem', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.02, margin: '0 0 20px', maxWidth: '640px' }}>Wear what moves you.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.125rem', color: C.muted, lineHeight: 1.65, maxWidth: '460px', margin: '0 0 30px' }}>Bold, minimal streetwear built for daily wear. Designed in-house, dropped in limited runs, shipped worldwide.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#shop" style={{ background: C.accent, color: '#000', borderRadius: '10px', padding: '14px 30px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Shop the drop</a>
          <a href="#reviews" style={{ border: `1px solid ${C.border}`, color: C.text, borderRadius: '10px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>See reviews</a>
        </div>
        <div style={{ display: 'flex', gap: m ? '24px' : '44px', marginTop: '48px', flexWrap: 'wrap' }}>
          {[['40k+', 'Orders shipped'], ['4.9★', 'Avg. rating'], ['48h', 'Delivery'], ['30d', 'Free returns']].map(([n, l]) => (
            <div key={l}><div style={{ fontSize: m ? '1.4rem' : '1.75rem', fontWeight: 800 }}>{n}</div><div style={{ fontSize: '13px', color: C.faint }}>{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? products : products.filter((p) => p.cat === active);
  return (
    <section id="shop" style={{ ...container, padding: m ? '48px 20px' : '80px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: m ? '1.7rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 6px' }}>The latest drop</h2>
          <p style={{ color: C.muted, margin: 0, fontSize: '15px' }}>Fresh cuts, limited stock. Filter by category below.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '28px' }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setActive(c)} style={{
            flexShrink: 0, cursor: 'pointer', borderRadius: '999px', padding: '9px 18px', fontSize: '13px', fontWeight: 600,
            border: `1px solid ${active === c ? C.accent : C.border}`, background: active === c ? C.accent : 'transparent', color: active === c ? '#000' : C.muted,
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '14px' : '22px' }}>
        {list.map((p) => (
          <article key={p.name} style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ aspectRatio: '3/4', position: 'relative', background: `linear-gradient(150deg, ${p.from}, ${p.to})`, display: 'flex', alignItems: 'flex-end', padding: '14px' }}>
              {p.badge && <span style={{ position: 'absolute', top: '12px', left: '12px', background: p.badge === 'Sale' ? '#ef4444' : '#000', color: '#fff', borderRadius: '5px', padding: '3px 9px', fontSize: '11px', fontWeight: 700 }}>{p.badge}</span>}
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{p.cat}</span>
            </div>
            <div style={{ padding: m ? '12px' : '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 6px' }}>{p.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}><Stars rating={p.rating} /><span style={{ fontSize: '12px', color: C.faint }}>({p.reviews})</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: p.was ? C.accent : C.text }}>${p.price}</span>
                  {p.was ? <span style={{ fontSize: '13px', color: C.faint, textDecoration: 'line-through' }}>${p.was}</span> : null}
                </div>
                <button aria-label="Add to cart" style={{ width: '34px', height: '34px', borderRadius: '9px', border: `1px solid ${C.border}`, background: 'transparent', color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Promo() {
  const m = useIsMobile();
  return (
    <section id="new" style={{ background: C.accent, padding: m ? '48px 20px' : '72px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.55)', margin: '0 0 12px' }}>Limited time</p>
      <h2 style={{ fontSize: m ? '2rem' : '3.2rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#0a0a0a', margin: '0 0 14px' }}>30% off your first order</h2>
      <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.05rem', margin: '0 0 26px' }}>Use code <b>NEWDROP</b> at checkout.</p>
      <a href="#shop" style={{ display: 'inline-block', background: '#0a0a0a', color: '#fff', borderRadius: '10px', padding: '14px 34px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Claim the offer</a>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'The most comfortable hoodie I own. Quality is insane for the price and it washed perfectly.', author: 'Jordan K.', item: 'Arch Logo Hoodie' },
    { text: 'Fast shipping, perfect fit. The cargos are fire — everyone asks me where they are from.', author: 'Mia T.', item: 'Street Cargo Pants' },
    { text: 'ShopDrop replaced all my old brands. The runners are the best sneakers I have bought online.', author: 'Alex R.', item: 'Air Runner 2.0' },
  ];
  return (
    <section id="reviews" style={{ ...container, padding: m ? '48px 20px' : '80px 20px' }}>
      <h2 style={{ fontSize: m ? '1.7rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 6px' }}>Loved by 40,000+ customers</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}><Stars rating={5} size={16} /><span style={{ fontSize: '14px', color: C.muted }}>4.9 out of 5 · 2,847 verified reviews</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '18px' }}>
        {data.map((r) => (
          <div key={r.author} style={{ borderRadius: '14px', border: `1px solid ${C.border}`, background: C.surface, padding: '24px' }}>
            <Stars rating={5} />
            <p style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: 1.7, margin: '12px 0 18px' }}>"{r.text}"</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{r.author}</span>
              <span style={{ fontSize: '11px', color: C.faint, background: C.bg, padding: '3px 9px', borderRadius: '5px' }}>{r.item}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const m = useIsMobile();
  const items = [
    { t: 'Free shipping', d: 'On all orders over $80', p: 'M1 3h15v13H1zM16 8h4l3 3v5h-7z M5.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { t: 'Free returns', d: '30-day no-questions policy', p: 'M3 7v6h6M21 17a9 9 0 0 0-15-6.7L3 13' },
    { t: 'Secure checkout', d: 'SSL-encrypted payments', p: 'M5 11V7a5 5 0 0 1 10 0v4M4 11h12v9H4z' },
    { t: 'Human support', d: 'Real people, 7 days a week', p: 'M4 4h16v12H8l-4 4z' },
  ];
  return (
    <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...container, padding: m ? '36px 20px' : '48px 20px', display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: '26px' }}>
        {items.map((i) => (
          <div key={i.t} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', background: 'rgba(249,115,22,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" stroke={C.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={i.p} /></svg>
            </div>
            <div><div style={{ fontSize: '14px', fontWeight: 700 }}>{i.t}</div><div style={{ fontSize: '13px', color: C.faint, marginTop: '2px' }}>{i.d}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const m = useIsMobile();
  return (
    <section style={{ ...container, padding: m ? '48px 20px' : '72px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: m ? '1.7rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 10px' }}>Get early access to drops</h2>
      <p style={{ color: C.muted, margin: '0 0 24px', fontSize: '15px' }}>Join the list and never miss a restock.</p>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexDirection: m ? 'column' : 'row' }}>
        <input type="email" placeholder="you@email.com" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '13px 16px', color: C.text, fontSize: '14px' }} />
        <button type="submit" style={{ background: C.accent, color: '#000', border: 'none', borderRadius: '10px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about" style={{ borderTop: `1px solid ${C.border}`, padding: '48px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '36px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '260px' }}>
          <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.04em' }}>SHOP<span style={{ color: C.accent }}>DROP</span></span>
          <p style={{ fontSize: '14px', color: C.faint, marginTop: '12px', lineHeight: 1.7 }}>Bold streetwear for those who refuse to blend in. Designed and shipped worldwide.</p>
        </div>
        {[{ h: 'Shop', l: ['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'] }, { h: 'Help', l: ['Sizing Guide', 'Shipping', 'Returns', 'FAQ'] }, { h: 'Company', l: ['About', 'Careers', 'Sustainability', 'Contact'] }].map((col) => (
          <div key={col.h}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.faint, margin: '0 0 14px' }}>{col.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.l.map((l) => <li key={l}><a href="#shop" style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ ...container, marginTop: '36px', paddingTop: '22px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} ShopDrop. All rights reserved.</span>
        <span style={{ fontSize: '13px', color: C.faint }}>Visa · Mastercard · PayPal · Apple Pay</span>
      </div>
    </footer>
  );
}
