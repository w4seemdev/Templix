/* ============================================================
   MAISON — Fashion Boutique Template
   Light editorial ivory with plum accent. Fully responsive.
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
  bg: '#faf6f0',
  surface: '#ffffff',
  ink: '#1c1714',
  muted: '#6b5d53',
  faint: '#a89a8e',
  line: '#e7ddd1',
  accent: '#6d213c',
  gold: '#a67c3d',
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', width: '100%' };

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }} aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? C.gold : 'none'} stroke={s <= Math.round(rating) ? C.gold : '#d9cdbd'} strokeWidth="1.5">
          <path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" />
        </svg>
      ))}
    </span>
  );
}

const collections = ['All', 'Dresses', 'Knitwear', 'Outerwear', 'Accessories'];
const pieces = [
  { name: 'Silk Slip Dress', cat: 'Dresses', price: 189, rating: 4.9, from: '#8a3a52', to: '#3d1522' },
  { name: 'Cashmere Wrap Coat', cat: 'Outerwear', price: 340, rating: 5.0, from: '#c9a97a', to: '#7d5b34' },
  { name: 'Merino Rib Sweater', cat: 'Knitwear', price: 128, rating: 4.8, from: '#b6a894', to: '#6d5f4d' },
  { name: 'Pleated Midi Skirt', cat: 'Dresses', price: 145, rating: 4.7, from: '#9a7d8a', to: '#4a3340' },
  { name: 'Structured Blazer', cat: 'Outerwear', price: 275, rating: 4.9, from: '#5a5148', to: '#26221d' },
  { name: 'Leather Tote', cat: 'Accessories', price: 210, rating: 4.9, from: '#8f6a4a', to: '#4a3320' },
  { name: 'Alpaca Cardigan', cat: 'Knitwear', price: 165, rating: 4.6, from: '#c4b8a6', to: '#7a6b56' },
  { name: 'Silk Neck Scarf', cat: 'Accessories', price: 78, rating: 4.8, from: '#a4405c', to: '#5a1f30' },
];

export default function FashionStorePreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Marquee />
      <Shop />
      <Editorial />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Shop', 'Editorial', 'Reviews', 'About'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,246,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontFamily: serif, fontSize: '24px', fontWeight: 700, letterSpacing: '0.02em', color: C.ink, textDecoration: 'none' }}>Maison</a>
        {!m && <nav style={{ display: 'flex', gap: '34px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!m && <a href="#shop" style={{ fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.accent, textDecoration: 'none', fontWeight: 600 }}>Bag (2)</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '40px 20px 48px' : '72px 20px 84px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 600 }}>The Autumn Edit</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.8rem' : '4.4rem', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.01em', margin: '18px 0 20px' }}>Timeless pieces, quietly made.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.1rem', color: C.muted, lineHeight: 1.7, maxWidth: '440px', margin: '0 0 30px' }}>A considered wardrobe of natural fibres and enduring silhouettes — cut in small batches by independent European ateliers.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#shop" style={{ background: C.accent, color: '#fff', borderRadius: '2px', padding: '15px 34px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>Shop the edit</a>
          <a href="#editorial" style={{ border: `1px solid ${C.ink}`, color: C.ink, borderRadius: '2px', padding: '15px 34px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>The lookbook</a>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: m ? '4/3' : '4/5', borderRadius: '4px', overflow: 'hidden', background: 'linear-gradient(155deg,#8a3a52,#3d1522)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Featured</span>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>Silk Slip Dress</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginTop: '4px' }}>$189</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['Ethically sourced fibres', 'Free shipping over $150', 'Carbon-neutral delivery', 'Complimentary alterations'];
  return (
    <div style={{ background: C.ink, color: C.bg, padding: '13px 20px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '26px', justifyContent: 'center', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {items.map((i) => <span key={i}>{i}</span>)}
      </div>
    </div>
  );
}

function Shop() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? pieces : pieces.filter((p) => p.cat === active);
  return (
    <section id="shop" style={{ ...container, padding: m ? '48px 20px' : '84px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.6rem', fontWeight: 700, margin: '0 0 14px' }}>The collection</h2>
        <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {collections.map((c) => (
            <button key={c} onClick={() => setActive(c)} style={{ cursor: 'pointer', borderRadius: '999px', padding: '8px 18px', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, border: `1px solid ${active === c ? C.accent : C.line}`, background: active === c ? C.accent : 'transparent', color: active === c ? '#fff' : C.muted }}>{c}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '16px' : '26px' }}>
        {list.map((p) => (
          <article key={p.name}>
            <div style={{ aspectRatio: '3/4', borderRadius: '4px', background: `linear-gradient(155deg,${p.from},${p.to})`, marginBottom: '12px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ fontFamily: serif, fontSize: '15px', fontWeight: 600, margin: 0 }}>{p.name}</h3>
              <span style={{ fontSize: '14px', fontWeight: 600, color: C.accent, whiteSpace: 'nowrap' }}>${p.price}</span>
            </div>
            <div style={{ marginTop: '6px' }}><Stars rating={p.rating} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Editorial() {
  const m = useIsMobile();
  return (
    <section id="editorial" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '48px 20px' : '84px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '0.9fr 1.1fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
        <div style={{ aspectRatio: m ? '4/3' : '1/1', borderRadius: '4px', background: 'linear-gradient(155deg,#c9a97a,#7d5b34)' }} />
        <div>
          <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 600 }}>Our philosophy</span>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '16px 0 20px' }}>Fewer, finer things — built to be kept.</h2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.75, margin: '0 0 16px' }}>Every Maison piece begins with the cloth. We work only with mills that can trace their fibres, and with ateliers that pay a living wage. The result is clothing designed to outlast the season — and the trend.</p>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.75, margin: '0 0 24px' }}>Complimentary alterations and lifetime repairs come standard, because well-made clothes deserve a long life.</p>
          <a href="#shop" style={{ color: C.accent, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', borderBottom: `1px solid ${C.accent}`, paddingBottom: '3px' }}>Read our story</a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const m = useIsMobile();
  const data = [
    { text: 'The cashmere coat is the single best purchase I made this year. It looks more expensive than it was.', a: 'Eleanor V.', c: 'London' },
    { text: 'Impeccable tailoring and the alterations service is a dream. My blazer fits like it was made for me.', a: 'Priya N.', c: 'Toronto' },
    { text: 'Beautiful, restrained pieces that never date. Maison has quietly taken over my wardrobe.', a: 'Camille D.', c: 'Paris' },
  ];
  return (
    <section id="reviews" style={{ ...container, padding: m ? '48px 20px' : '84px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.6rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>From our clients</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '22px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '4px', padding: '28px' }}>
            <Stars rating={5} />
            <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', lineHeight: 1.6, margin: '16px 0 20px', fontStyle: 'italic' }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.c}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const m = useIsMobile();
  return (
    <section style={{ background: C.accent, color: '#fff' }}>
      <div style={{ ...container, padding: m ? '48px 20px' : '72px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : '2.4rem', fontWeight: 700, margin: '0 0 10px' }}>Join the atelier list</h2>
        <p style={{ opacity: 0.85, fontSize: '15px', margin: '0 0 26px' }}>Early access to new collections and private sales.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexDirection: m ? 'column' : 'row' }}>
          <input type="email" placeholder="Your email address" style={{ flex: 1, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px', padding: '14px 16px', color: '#fff', fontSize: '14px' }} />
          <button type="submit" style={{ background: '#fff', color: C.accent, border: 'none', borderRadius: '2px', padding: '14px 28px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about" style={{ padding: '48px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '36px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '260px' }}>
          <span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700 }}>Maison</span>
          <p style={{ fontSize: '14px', color: C.faint, marginTop: '12px', lineHeight: 1.7 }}>Considered clothing in natural fibres, made to be kept.</p>
        </div>
        {[{ h: 'Shop', l: ['New In', 'Dresses', 'Knitwear', 'Accessories'] }, { h: 'Client care', l: ['Shipping', 'Returns', 'Alterations', 'Size guide'] }, { h: 'House', l: ['Our story', 'Ateliers', 'Sustainability', 'Contact'] }].map((col) => (
          <div key={col.h}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.faint, margin: '0 0 14px' }}>{col.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>{col.l.map((l) => <li key={l}><a href="#shop" style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}>{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div style={{ ...container, marginTop: '36px', paddingTop: '22px', borderTop: `1px solid ${C.line}` }}>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Maison. All rights reserved.</span>
      </div>
    </footer>
  );
}
