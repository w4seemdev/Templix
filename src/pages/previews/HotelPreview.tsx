/* ============================================================
   THE MERIDIAN - Boutique Hotel Template
   Deep navy with brass accent. Fully responsive.
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
  bg: '#0e1622',
  surface: '#16202e',
  ink: '#eef2f7',
  muted: '#9fb0c3',
  faint: '#6c7d90',
  line: 'rgba(200,161,90,0.16)',
  brass: '#c8a15a',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1160px', margin: '0 auto', width: '100%' };

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }} aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? C.brass : 'none'} stroke={s <= Math.round(rating) ? C.brass : '#3a4655'} strokeWidth="1.5"><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>
      ))}
    </span>
  );
}

const rooms = [
  { name: 'Garden Deluxe', size: '38 m²', guests: 2, price: 240, tags: ['Garden view', 'King bed', 'Rain shower'], from: '#2a3648', to: '#12202e' },
  { name: 'Harbour Suite', size: '56 m²', guests: 3, price: 420, tags: ['Sea view', 'Living area', 'Soaking tub'], from: '#2f4a63', to: '#132434' },
  { name: 'The Loft', size: '72 m²', guests: 4, price: 640, tags: ['Terrace', 'Two bedrooms', 'Fireplace'], from: '#3a3a52', to: '#171a2a' },
];

export default function HotelPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Rooms />
      <Amenities />
      <Gallery />
      <Reviews />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Rooms', 'Amenities', 'Gallery', 'Reviews'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(14,22,34,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none', color: C.ink }}>
          <span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em' }}>THE MERIDIAN</span>
        </a>
        {!m && <nav style={{ display: 'flex', gap: '32px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#rooms" style={{ border: `1px solid ${C.brass}`, color: C.brass, borderRadius: '2px', padding: '9px 20px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>Book now</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  const field: React.CSSProperties = { background: C.bg, border: `1px solid ${C.line}`, borderRadius: '2px', padding: '12px 12px', color: C.ink, fontSize: '14px', width: '100%' };
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg,#1a2a3d,#0b121c)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(760px 420px at 82% 8%, rgba(200,161,90,0.16), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '58px 20px 40px' : '104px 20px 72px', position: 'relative' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.brass }}>Coastal retreat · Cornwall</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.9rem' : '4.8rem', fontWeight: 700, lineHeight: 1.03, margin: '20px 0 20px', maxWidth: '720px' }}>An unhurried stay by the sea.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.7, maxWidth: '480px', margin: '0 0 34px' }}>Twenty-two individually designed rooms, a sea-view restaurant and a spa built into the cliffside. Rest is the whole point.</p>
      </div>
      <div style={{ ...container, padding: '0 20px', position: 'relative', marginTop: m ? '0' : '-8px', paddingBottom: m ? '48px' : '72px' }}>
        <form onSubmit={(e) => e.preventDefault()} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '6px', padding: m ? '18px' : '20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end', boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}>
          <label style={{ fontSize: '12px', color: C.faint }}>Check in<input type="date" style={field} /></label>
          <label style={{ fontSize: '12px', color: C.faint }}>Check out<input type="date" style={field} /></label>
          <label style={{ fontSize: '12px', color: C.faint }}>Guests<select style={field} defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></label>
          <button type="submit" style={{ background: C.brass, color: '#0e1622', border: 'none', borderRadius: '2px', padding: '13px 26px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', height: '43px' }}>Check availability</button>
        </form>
      </div>
    </section>
  );
}

function Rooms() {
  const m = useIsMobile();
  return (
    <section id="rooms" style={{ ...container, padding: m ? '52px 20px' : '92px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.brass, margin: '0 0 12px' }}>Where you'll stay</p>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: 0 }}>Rooms & suites</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '22px' }}>
        {rooms.map((r) => (
          <article key={r.name} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', background: `linear-gradient(155deg,${r.from},${r.to})` }} />
            <div style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{r.name}</h3>
                <span style={{ fontSize: '12px', color: C.faint }}>{r.size} · {r.guests} guests</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {r.tags.map((t) => <span key={t} style={{ fontSize: '11px', color: C.muted, border: `1px solid ${C.line}`, borderRadius: '999px', padding: '4px 10px' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><span style={{ fontFamily: serif, fontSize: '1.5rem', fontWeight: 700, color: C.brass }}>£{r.price}</span><span style={{ fontSize: '13px', color: C.faint }}> / night</span></span>
                <a href="#rooms" style={{ background: C.brass, color: '#0e1622', borderRadius: '2px', padding: '9px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none' }}>Reserve</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Amenities() {
  const m = useIsMobile();
  const items = [
    { t: 'Cliffside spa', d: 'Sauna, hammam and sea-facing treatment rooms.', p: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z M12 6v6' },
    { t: 'Sea-view dining', d: 'Daily-changing menu built on the day\'s catch.', p: 'M4 3v7a4 4 0 0 0 8 0V3 M8 3v18 M17 3c-1.5 2-1.5 6 0 8v10' },
    { t: 'Heated pool', d: 'Year-round outdoor pool warmed to 30°C.', p: 'M2 16c2 0 2 1.5 4 1.5S8 16 10 16s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 M2 20c2 0 2 1.5 4 1.5S8 20 10 20' },
    { t: 'Private cove', d: 'Steps to a sheltered beach kept just for guests.', p: 'M3 20h18 M6 20V9l6-4 6 4v11' },
  ];
  return (
    <section id="amenities" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 40px' }}>Time well spent</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4,1fr)', gap: '24px' }}>
          {items.map((i) => (
            <div key={i.t} style={{ textAlign: m ? 'left' : 'center', display: m ? 'flex' : 'block', gap: '14px' }}>
              <div style={{ width: '46px', height: '46px', flexShrink: 0, borderRadius: '50%', border: `1px solid ${C.brass}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: m ? '0' : '0 auto 14px' }}>
                <svg width="22" height="22" fill="none" stroke={C.brass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={i.p} /></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px' }}>{i.t}</h3>
                <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.65, margin: 0 }}>{i.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const m = useIsMobile();
  const tiles = [
    { l: 'The terrace', g: 'linear-gradient(155deg,#2f4a63,#132434)', span: 2 },
    { l: 'Spa', g: 'linear-gradient(155deg,#3a3a52,#171a2a)', span: 1 },
    { l: 'Restaurant', g: 'linear-gradient(155deg,#2a3648,#12202e)', span: 1 },
    { l: 'The cove', g: 'linear-gradient(155deg,#26506a,#0f2130)', span: 2 },
  ];
  return (
    <section id="gallery" style={{ ...container, padding: m ? '52px 20px' : '92px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>A look around</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(3,1fr)', gap: m ? '12px' : '18px' }}>
        {tiles.map((t) => (
          <div key={t.l} style={{ gridColumn: m ? 'span 1' : `span ${t.span}`, aspectRatio: m ? '1/1' : t.span === 2 ? '16/9' : '3/4', borderRadius: '8px', background: t.g, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', bottom: '14px', left: '14px', fontSize: '12px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{t.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'The most restful weekend we have had in years. The room, the food, the sea - flawless.', a: 'Helena & Marc', s: 'Harbour Suite' },
    { text: 'Staff remembered our names and our coffee order by day two. Genuinely special place.', a: 'Dev P.', s: 'Garden Deluxe' },
    { text: 'Worth every penny. The cliffside spa alone is reason enough to come back.', a: 'Sofia L.', s: 'The Loft' },
  ];
  return (
    <section id="reviews" style={{ background: C.surface, borderTop: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Stars rating={5} />
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, margin: '12px 0 6px' }}>9.6 / 10 guest rating</h2>
          <p style={{ color: C.muted, margin: 0 }}>From 1,240 verified stays</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
          {data.map((r) => (
            <figure key={r.a} style={{ margin: 0, background: C.bg, border: `1px solid ${C.line}`, borderRadius: '10px', padding: '26px' }}>
              <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 18px' }}>"{r.text}"</blockquote>
              <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.s}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ padding: '48px 20px 30px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <div>
          <span style={{ fontFamily: serif, fontSize: '20px', fontWeight: 700, letterSpacing: '0.06em' }}>THE MERIDIAN</span>
          <p style={{ fontSize: '14px', color: C.muted, margin: '10px 0 0' }}>Cliff Road, St Ives, Cornwall TR26 · +44 1736 796 000</p>
        </div>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} The Meridian Hotel. All rights reserved.</span>
      </div>
    </footer>
  );
}
