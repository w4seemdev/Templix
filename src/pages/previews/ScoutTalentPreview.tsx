/* ============================================================
   SCOUT — Talent & modeling agency template
   Editorial white/black · gold accent · serif display
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const GOLD = '#b45309';
const INK = '#111111';
const GREY = '#6b7280';
const BORDER = '#e5e5e5';
const SERIF = "Georgia, 'Times New Roman', serif";

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

const navLinks = ['Talent', 'Services', 'News', 'About', 'Contact'];
const divisions = ['Women', 'Men', 'New Faces'] as const;

const talent = [
  { name: 'Imani Okafor', division: 'Women', stats: '178cm · Paris / Lagos', c1: '#3a2f28', c2: '#8a7a68' },
  { name: 'Vera Lindholm', division: 'Women', stats: '180cm · Copenhagen', c1: '#2c3038', c2: '#7f8794' },
  { name: 'Mateo Ruiz', division: 'Men', stats: '188cm · Madrid', c1: '#3a2c26', c2: '#9c7a5e' },
  { name: 'Sasha Volkov', division: 'Men', stats: '190cm · Berlin', c1: '#26282c', c2: '#6e727a' },
  { name: 'June Park', division: 'New Faces', stats: '176cm · Seoul', c1: '#332a30', c2: '#8a7480' },
  { name: 'Theo Mensah', division: 'New Faces', stats: '186cm · Accra / London', c1: '#2f2a22', c2: '#8a7c5e' },
];

const services = [
  { num: '01', title: 'Campaigns', desc: 'Global casting and talent management for fashion, beauty, and lifestyle campaigns — from concept to contract.' },
  { num: '02', title: 'Runway', desc: 'Seasonal show packages across Paris, Milan, London, and New York with full itinerary and chaperone support.' },
  { num: '03', title: 'E-commerce', desc: 'Reliable, repeatable e-comm casting with day-rate transparency and same-week availability windows.' },
];

const pressLogos = ['VOGUE', 'ELLE', 'GQ', 'Dazed', 'i-D', 'W'];

const news = [
  { date: 'May 28, 2026', title: 'Imani Okafor opens the Maison Verre couture show in Paris', tag: 'Runway' },
  { date: 'May 12, 2026', title: 'Scout New Faces: six signings from our Seoul open call', tag: 'Agency' },
  { date: 'Apr 30, 2026', title: 'Mateo Ruiz fronts the Estrato SS27 global campaign', tag: 'Campaign' },
];

const formFields = [
  { label: 'Full name', placeholder: 'Jane Doe' },
  { label: 'Email', placeholder: 'jane@studio.com' },
  { label: 'Company / Brand', placeholder: 'Studio or brand name' },
  { label: 'Booking dates', placeholder: 'June 24–28, 2026' },
];

const footerCols = [
  { title: 'Divisions', links: ['Women', 'Men', 'New Faces', 'Influence'] },
  { title: 'Agency', links: ['About', 'Services', 'News', 'Careers'] },
  { title: 'Offices', links: ['New York', 'Paris', 'London', 'Tokyo'] },
];

function Portrait({ c1, c2, name, height }: { c1: string; c2: string; name: string; height?: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <div style={{ width: '100%', aspectRatio: height ? undefined : '3 / 4', height, background: `linear-gradient(160deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <span style={{ fontFamily: SERIF, fontSize: '3rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>{initials}</span>
    </div>
  );
}

export default function ScoutTalentPreview() {
  const m = useIsMobile();
  const [division, setDivision] = useState<typeof divisions[number]>('Women');
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 1.5rem';
  const filtered = talent.filter(t => t.division === division);
  const featured = talent[0];

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 700, letterSpacing: '0.02em' }}>Scout<span style={{ color: GOLD }}>.</span></span>
          {!m && <nav style={{ display: 'flex', gap: '2rem' }}>{navLinks.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a href="#Contact" style={{ border: `1px solid ${INK}`, color: INK, padding: m ? '8px 14px' : '10px 22px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Book Talent</a>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: `1px solid ${BORDER}`, padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: `1px solid ${BORDER}` }}>
            {navLinks.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.16em', borderBottom: `1px solid ${BORDER}` }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="About" style={{ padding: m ? '3rem 0' : '5rem 0 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2.5rem' : '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1.25rem' }}>Talent Agency · Est. 2009</p>
            <h1 style={{ fontFamily: SERIF, fontSize: m ? '3rem' : 'clamp(3rem, 7vw, 5.2rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0 }}>
              Faces that<br />carry the<br /><em style={{ color: GOLD }}>collection.</em>
            </h1>
            <p style={{ fontSize: '1.05rem', color: GREY, lineHeight: 1.8, maxWidth: '440px', margin: '1.75rem 0 2.25rem' }}>Scout represents a deliberately small board of models and muses across four continents — managed personally, booked globally.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#Talent" style={{ background: INK, color: '#fff', padding: '14px 30px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>View the board</a>
              <a href="#Contact" style={{ borderBottom: `1px solid ${INK}`, color: INK, padding: '14px 4px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Become talent →</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Portrait c1={featured.c1} c2={featured.c2} name={featured.name} height={m ? '360px' : '540px'} />
            <div style={{ position: 'absolute', bottom: '-18px', left: '-18px', background: '#fff', border: `1px solid ${BORDER}`, padding: '1rem 1.4rem' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: GREY, margin: '0 0 4px' }}>Now booking</p>
              <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 700, margin: 0 }}>SS27 Campaign Season</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press logos */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2.25rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: m ? '1.75rem' : '3.5rem', flexWrap: 'wrap' }}>
          {pressLogos.map(n => <span key={n} style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: '#c9c9c9', letterSpacing: '0.06em' }}>{n}</span>)}
        </div>
      </section>

      {/* Talent board */}
      <section id="Talent" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 0.75rem' }}>The Board</p>
              <h2 style={{ fontFamily: SERIF, fontSize: m ? '2rem' : 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0 }}>Our talent</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {divisions.map(d => (
                <button key={d} onClick={() => setDivision(d)} style={{ padding: '10px 18px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'inherit', background: division === d ? INK : 'transparent', color: division === d ? '#fff' : GREY, border: division === d ? `1px solid ${INK}` : `1px solid ${BORDER}` }}>{d}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: m ? '1rem' : '1.5rem' }}>
            {filtered.map(t => (
              <a key={t.name} href="#" style={{ textDecoration: 'none', color: INK }}>
                <Portrait c1={t.c1} c2={t.c2} name={t.name} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.9rem 0 0', flexWrap: 'wrap', gap: '4px' }}>
                  <p style={{ fontFamily: SERIF, fontSize: m ? '16px' : '18px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '11.5px', color: GREY, margin: 0, letterSpacing: '0.04em' }}>{t.stats}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section style={{ background: INK, color: '#fff', padding: m ? '3.25rem 0' : '4.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3rem', alignItems: 'center' }}>
          <Portrait c1={featured.c1} c2={featured.c2} name={featured.name} height={m ? '340px' : '420px'} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1rem' }}>Featured · Women</p>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '2rem' : 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, margin: '0 0 1.25rem' }}>Imani Okafor</h2>
            <p style={{ fontSize: '1rem', color: '#bdbdbd', lineHeight: 1.85, margin: '0 0 1.75rem', maxWidth: '460px' }}>From our 2021 Lagos open call to opening couture week in Paris — Imani&apos;s board spans nine countries, four fragrance campaigns, and two magazine covers this season alone.</p>
            <div style={{ display: 'flex', gap: m ? '1.75rem' : '2.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {[['32', 'Shows SS27'], ['4', 'Global campaigns'], ['2', 'Covers 2026']].map(([v, l]) => (
                <div key={l}><p style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, margin: 0, color: GOLD }}>{v}</p><p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8a8a8a', margin: '4px 0 0' }}>{l}</p></div>
              ))}
            </div>
            <a href="#" style={{ border: '1px solid #fff', color: '#fff', padding: '12px 26px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>View portfolio</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="Services" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 0.75rem' }}>For Brands</p>
          <h2 style={{ fontFamily: SERIF, fontSize: m ? '2rem' : 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 3rem' }}>What we do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? '2rem' : '2.5rem' }}>
            {services.map(s => (
              <div key={s.num} style={{ borderTop: `2px solid ${INK}`, paddingTop: '1.5rem' }}>
                <p style={{ fontFamily: SERIF, fontSize: '15px', color: GOLD, margin: '0 0 0.75rem' }}>{s.num}</p>
                <h3 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700, margin: '0 0 0.75rem' }}>{s.title}</h3>
                <p style={{ fontSize: '14.5px', color: GREY, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section id="News" style={{ padding: m ? '3.25rem 0' : '4.5rem 0', background: '#fafafa', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, margin: 0 }}>Agency news</h2>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em', borderBottom: `1px solid ${INK}`, paddingBottom: '2px' }}>All news →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {news.map(n => (
              <a key={n.title} href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: m ? '0.75rem' : '2rem', padding: '1.4rem 0', borderTop: `1px solid ${BORDER}`, textDecoration: 'none', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: m ? '0.75rem' : '2rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: GREY, minWidth: m ? 'auto' : '110px', letterSpacing: '0.04em' }}>{n.date}</span>
                  <span style={{ fontFamily: SERIF, fontSize: m ? '16px' : '18px', fontWeight: 700, color: INK }}>{n.title}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD }}>{n.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="Contact" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3.5rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1rem' }}>Bookings</p>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '2rem' : 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 1.25rem' }}>Request a casting package</h2>
            <p style={{ fontSize: '1rem', color: GREY, lineHeight: 1.8, margin: '0 0 1.5rem', maxWidth: '420px' }}>Tell us your brief, dates, and usage. A booker replies within one business day with a curated selection and day rates.</p>
            <p style={{ fontSize: '14px', color: INK, margin: 0 }}>bookings@scoutagency.com · +1 (212) 555-0148</p>
          </div>
          <div style={{ border: `1px solid ${BORDER}`, padding: m ? '1.5rem' : '2rem' }}>
            {formFields.map(f => (
              <div key={f.label} style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: GREY, margin: '0 0 6px' }}>{f.label}</p>
                <div style={{ border: `1px solid ${BORDER}`, padding: '12px 14px', fontSize: '14px', color: '#a3a3a3' }}>{f.placeholder}</div>
              </div>
            ))}
            <a href="#" style={{ display: 'block', textAlign: 'center', background: INK, color: '#fff', padding: '14px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Submit request</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: INK, color: '#fff', padding: m ? '3rem 0 2rem' : '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <span style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700 }}>Scout<span style={{ color: GOLD }}>.</span></span>
              <p style={{ fontSize: '13.5px', color: '#9c9c9c', lineHeight: 1.75, margin: '1rem 0 0' }}>A boutique talent agency representing models and muses worldwide since 2009.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a7a7a', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: '#bdbdbd', textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #2c2c2c', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: '#7a7a7a', margin: 0 }}>© 2026 Scout Talent Group LLC</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'TikTok', 'LinkedIn'].map(s => <a key={s} href="#" style={{ fontSize: '12px', color: '#7a7a7a', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
