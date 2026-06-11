import { useState } from 'react';

/* ============================================================
   HAVEN — Interior Design Studio Template
   Linen #f7f4ef · taupe/charcoal · terracotta accent #9a6a4f
   Serif display · calm, spacious, editorial
   ============================================================ */

const TERRA = '#9a6a4f';
const LINEN = '#f7f4ef';
const CHARCOAL = '#2d2a26';
const TAUPE = '#8a8178';
const BORDER = '#e6e1d8';
const SERIF = "Georgia, 'Times New Roman', serif";

const navLinks = ['Projects', 'Services', 'Process', 'Studio', 'Journal'];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'] as const;

const projects = [
  { title: 'Hearthstone Residence', cat: 'Residential', place: 'Marin County', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80' },
  { title: 'The Quiet Office', cat: 'Commercial', place: 'Portland', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80' },
  { title: 'Casa Alba Boutique Hotel', cat: 'Hospitality', place: 'Santa Fe', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80' },
  { title: 'Linden Street Loft', cat: 'Residential', place: 'Brooklyn', img: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=900&q=80' },
  { title: 'Fern & Oak Café', cat: 'Hospitality', place: 'Seattle', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80' },
  { title: 'Atelier West Gallery', cat: 'Commercial', place: 'Los Angeles', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80' },
];

const services = [
  { title: 'Full-service design', price: 'from $18,000', desc: 'Concept to installation — space planning, custom millwork, procurement, and styling, fully managed.' },
  { title: 'Design & styling', price: 'from $6,500', desc: 'A complete design direction with curated furnishings you can implement at your own pace.' },
  { title: 'Renovation consulting', price: 'from $3,200', desc: 'Material palettes, layouts, and contractor-ready drawings for kitchens, baths, and additions.' },
];

const processSteps = [
  { num: 'I', title: 'Listen', desc: 'A long conversation about how you actually live — mornings, gatherings, quiet corners, clutter.' },
  { num: 'II', title: 'Compose', desc: 'Floor plans, palettes, and a material story presented as one cohesive vision, not a mood board.' },
  { num: 'III', title: 'Craft', desc: 'We commission makers, manage trades, and obsess over the seams so you never have to.' },
  { num: 'IV', title: 'Reveal', desc: 'One installation day. You leave in the morning, and come home to a finished house that evening.' },
];

const palette = ['#f7f4ef', '#e6ddd0', '#c9b8a3', '#9a6a4f', '#5d534a', '#2d2a26'];

const testimonials = [
  {
    quote: 'Haven understood our house better than we did. Every room feels inevitable now — as if it could never have been anything else.',
    name: 'Claire & Jonas Whitfield', project: 'Hearthstone Residence',
  },
  {
    quote: 'Our café revenue rose 22% after the redesign. Guests stay longer, photograph everything, and ask who did the interiors.',
    name: 'Marisol Vega', project: 'Fern & Oak Café',
  },
];

const press = ['Architectural Digest', 'Dwell', 'Elle Decor', 'Dezeen'];

const footerCols = [
  { title: 'Studio', links: ['Projects', 'Services', 'Process', 'About'] },
  { title: 'Resources', links: ['Journal', 'Press', 'Trade program', 'FAQ'] },
  { title: 'Connect', links: ['Instagram', 'Pinterest', 'Newsletter', 'Contact'] },
];

export default function HavenInteriorPreview() {
  const [cat, setCat] = useState<typeof categories[number]>('All');
  const filtered = cat === 'All' ? projects : projects.filter(p => p.cat === cat);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: LINEN, color: CHARCOAL, minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '74px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: SERIF, fontSize: '23px', fontWeight: 700, letterSpacing: '0.01em' }}>Haven<span style={{ color: TERRA }}>.</span></span>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13px', fontWeight: 500, color: TAUPE, textDecoration: 'none', letterSpacing: '0.04em' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ border: `1px solid ${CHARCOAL}`, color: CHARCOAL, borderRadius: '9999px', padding: '10px 24px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' }}>Book consultation</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80" alt="Sunlit living room" style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'relative', background: LINEN, maxWidth: '560px', margin: '-120px 0 0 0', padding: '2.5rem 2.5rem 0 0' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 1rem' }}>Interior Design Studio</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '0 0 1.25rem' }}>
              Rooms that hold a life well lived
            </h1>
            <p style={{ fontSize: '1.05rem', color: TAUPE, lineHeight: 1.85, margin: '0 0 2rem', maxWidth: '460px' }}>
              Haven is a small studio designing warm, considered interiors across the West Coast — homes, hotels, and the occasional very good café.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: CHARCOAL, color: LINEN, borderRadius: '9999px', padding: '14px 30px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' }}>View projects</a>
              <a href="#" style={{ color: CHARCOAL, padding: '14px 4px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', borderBottom: `1px solid ${CHARCOAL}` }}>Our process →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Press ── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b5ab9e' }}>As seen in</span>
          {press.map(p => (
            <span key={p} style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: '#c5bcae', fontStyle: 'italic' }}>{p}</span>
          ))}
        </div>
      </section>

      {/* ── Projects grid with filter ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 0.75rem' }}>Selected work</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0 }}>Projects</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{ padding: '9px 18px', borderRadius: '9999px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.03em', background: cat === c ? CHARCOAL : 'transparent', color: cat === c ? LINEN : TAUPE, border: cat === c ? `1px solid ${CHARCOAL}` : `1px solid ${BORDER}` }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filtered.map(p => (
              <a key={p.title} href="#" style={{ textDecoration: 'none', color: CHARCOAL }}>
                <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: TERRA, margin: '0 0 6px' }}>{p.cat} · {p.place}</p>
                <h3 style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 700, margin: 0 }}>{p.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fffdf9', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 0.75rem' }}>Services</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 3rem' }}>Three ways to work together</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}>
            {services.map(s => (
              <div key={s.title} style={{ borderTop: `2px solid ${TERRA}`, paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700, margin: 0 }}>{s.title}</h3>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: TERRA, letterSpacing: '0.04em' }}>{s.price}</span>
                </div>
                <p style={{ fontSize: '14.5px', color: TAUPE, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 0.75rem' }}>Process</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0 }}>Slow design, swift delivery</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {processSteps.map(s => (
              <div key={s.num}>
                <p style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 700, color: TERRA, margin: '0 0 0.9rem' }}>{s.num}</p>
                <div style={{ height: '1px', background: BORDER, marginBottom: '1.1rem' }} />
                <h3 style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, margin: '0 0 0.6rem' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: TAUPE, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Studio / founder ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fffdf9', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80" alt="Studio founder portrait" style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 1rem' }}>The studio</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 700, margin: '0 0 1.25rem' }}>“A home should ask nothing of you.”</h2>
            <p style={{ fontSize: '1rem', color: TAUPE, lineHeight: 1.9, margin: '0 0 1.25rem' }}>
              Founded by Elena Marsh in 2014, Haven is a deliberately small practice — eight designers, one workshop, and a long waiting list we are grateful for. We believe calm is a material, and we specify it generously.
            </p>
            <p style={{ fontSize: '1rem', color: TAUPE, lineHeight: 1.9, margin: '0 0 2rem' }}>
              Every project begins with how light moves through your rooms, and ends with the things you touch every day feeling inevitable.
            </p>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b5ab9e', margin: '0 0 0.9rem' }}>The Haven palette</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {palette.map(c => (
                  <span key={c} style={{ width: '38px', height: '38px', borderRadius: '50%', background: c, border: `1px solid ${BORDER}`, display: 'inline-block' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: '#fffdf9', border: `1px solid ${BORDER}`, padding: '2.5rem' }}>
              <p style={{ fontFamily: SERIF, fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.8, color: CHARCOAL, margin: '0 0 1.5rem' }}>“{t.quote}”</p>
              <p style={{ fontSize: '13.5px', fontWeight: 700, margin: 0 }}>{t.name}</p>
              <p style={{ fontSize: '12.5px', color: TERRA, margin: '3px 0 0' }}>{t.project}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Consultation CTA ── */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ background: CHARCOAL, padding: '4.5rem 2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: TERRA, margin: '0 0 1rem' }}>Now booking · Autumn 2026</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: LINEN, margin: '0 0 1rem' }}>Tell us about your rooms</h2>
            <p style={{ color: '#b5ab9e', fontSize: '1.02rem', maxWidth: '460px', margin: '0 auto 2.25rem', lineHeight: 1.8 }}>
              A 45-minute consultation — your space, your habits, and an honest conversation about scope and budget.
            </p>
            <a href="#" style={{ display: 'inline-block', background: LINEN, color: CHARCOAL, borderRadius: '9999px', padding: '14px 34px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em' }}>Book a consultation</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <span style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 700 }}>Haven<span style={{ color: TERRA }}>.</span></span>
              <p style={{ fontSize: '13.5px', color: TAUPE, lineHeight: 1.8, margin: '1rem 0 0' }}>
                Interior design studio · 1180 Alder Row, Oakland CA · By appointment
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b5ab9e', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: TAUPE, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: '#b5ab9e', margin: 0 }}>© 2026 Haven Studio LLC</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'Pinterest'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12.5px', color: '#b5ab9e', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
