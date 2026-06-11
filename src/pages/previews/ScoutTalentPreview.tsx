import { useState } from 'react';

/* ============================================================
   SCOUT — Talent & Modeling Agency Template
   Editorial white/black · gold accent #b45309 · serif display
   ============================================================ */

const GOLD = '#b45309';
const INK = '#111111';
const GREY = '#6b7280';
const BORDER = '#e5e5e5';
const SERIF = "Georgia, 'Times New Roman', serif";

const navLinks = ['Talent', 'Services', 'News', 'About', 'Contact'];

const divisions = ['Women', 'Men', 'New Faces'] as const;

const talent = [
  { name: 'Imani Okafor', division: 'Women', stats: '178cm · Paris / Lagos', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80' },
  { name: 'Vera Lindholm', division: 'Women', stats: '180cm · Copenhagen', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80' },
  { name: 'Mateo Ruiz', division: 'Men', stats: '188cm · Madrid', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' },
  { name: 'Sasha Volkov', division: 'Men', stats: '190cm · Berlin', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
  { name: 'June Park', division: 'New Faces', stats: '176cm · Seoul', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80' },
  { name: 'Theo Mensah', division: 'New Faces', stats: '186cm · Accra / London', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
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

export default function ScoutTalentPreview() {
  const [division, setDivision] = useState<typeof divisions[number]>('Women');
  const filtered = talent.filter(t => t.division === division);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 700, letterSpacing: '0.02em' }}>Scout<span style={{ color: GOLD }}>.</span></span>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ border: `1px solid ${INK}`, color: INK, padding: '10px 22px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Book Talent</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1.25rem' }}>Talent Agency · Est. 2009</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(3rem, 7vw, 5.2rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0 }}>
              Faces that<br />carry the<br /><em style={{ color: GOLD }}>collection.</em>
            </h1>
            <p style={{ fontSize: '1.05rem', color: GREY, lineHeight: 1.8, maxWidth: '440px', margin: '1.75rem 0 2.25rem' }}>
              Scout represents a deliberately small board of models and muses across four continents — managed personally, booked globally.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: INK, color: '#fff', padding: '14px 30px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>View the board</a>
              <a href="#" style={{ borderBottom: `1px solid ${INK}`, color: INK, padding: '14px 4px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Become talent →</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80" alt="Editorial portrait" style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '-18px', left: '-18px', background: '#fff', border: `1px solid ${BORDER}`, padding: '1rem 1.4rem' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: GREY, margin: '0 0 4px' }}>Now booking</p>
              <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 700, margin: 0 }}>SS27 Campaign Season</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Press logos ── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2.25rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3.5rem', flexWrap: 'wrap' }}>
          {pressLogos.map(name => (
            <span key={name} style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: '#c9c9c9', letterSpacing: '0.06em' }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── Talent board with division tabs ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 0.75rem' }}>The Board</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0 }}>Our talent</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {divisions.map(d => (
                <button key={d} onClick={() => setDivision(d)}
                  style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'inherit', background: division === d ? INK : 'transparent', color: division === d ? '#fff' : GREY, border: division === d ? `1px solid ${INK}` : `1px solid ${BORDER}` }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(t => (
              <a key={t.name} href="#" style={{ textDecoration: 'none', color: INK }}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.9rem 0 0' }}>
                  <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '11.5px', color: GREY, margin: 0, letterSpacing: '0.04em' }}>{t.stats}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured talent strip ── */}
      <section style={{ background: INK, color: '#fff', padding: '4.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80" alt="Imani Okafor" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1rem' }}>Featured · Women</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, margin: '0 0 1.25rem' }}>Imani Okafor</h2>
            <p style={{ fontSize: '1rem', color: '#bdbdbd', lineHeight: 1.85, margin: '0 0 1.75rem', maxWidth: '460px' }}>
              From our 2021 Lagos open call to opening couture week in Paris — Imani’s board spans nine countries, four fragrance campaigns, and two magazine covers this season alone.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2rem' }}>
              <div><p style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, margin: 0, color: GOLD }}>32</p><p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8a8a8a', margin: '4px 0 0' }}>Shows SS27</p></div>
              <div><p style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, margin: 0, color: GOLD }}>4</p><p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8a8a8a', margin: '4px 0 0' }}>Global campaigns</p></div>
              <div><p style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, margin: 0, color: GOLD }}>2</p><p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8a8a8a', margin: '4px 0 0' }}>Covers 2026</p></div>
            </div>
            <a href="#" style={{ border: '1px solid #fff', color: '#fff', padding: '12px 26px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>View portfolio</a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 0.75rem' }}>For Brands</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 3rem' }}>What we do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
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

      {/* ── News ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#fafafa', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, margin: 0 }}>Agency news</h2>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em', borderBottom: `1px solid ${INK}`, paddingBottom: '2px' }}>All news →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {news.map(n => (
              <a key={n.title} href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '2rem', padding: '1.4rem 0', borderTop: `1px solid ${BORDER}`, textDecoration: 'none', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: GREY, minWidth: '110px', letterSpacing: '0.04em' }}>{n.date}</span>
                  <span style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 700, color: INK }}>{n.title}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD }}>{n.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking form mock ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: GOLD, margin: '0 0 1rem' }}>Bookings</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 1.25rem' }}>Request a casting package</h2>
            <p style={{ fontSize: '1rem', color: GREY, lineHeight: 1.8, margin: '0 0 1.5rem', maxWidth: '420px' }}>
              Tell us your brief, dates, and usage. A booker replies within one business day with a curated selection and day rates.
            </p>
            <p style={{ fontSize: '14px', color: INK, margin: 0 }}>bookings@scoutagency.com · +1 (212) 555-0148</p>
          </div>
          <div style={{ border: `1px solid ${BORDER}`, padding: '2rem' }}>
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

      {/* ── Footer ── */}
      <footer style={{ background: INK, color: '#fff', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <span style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700 }}>Scout<span style={{ color: GOLD }}>.</span></span>
              <p style={{ fontSize: '13.5px', color: '#9c9c9c', lineHeight: 1.75, margin: '1rem 0 0' }}>
                A boutique talent agency representing models and muses worldwide since 2009.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a7a7a', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: '#bdbdbd', textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #2c2c2c', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: '#7a7a7a', margin: 0 }}>© 2026 Scout Talent Group LLC</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'TikTok', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12px', color: '#7a7a7a', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
