/* ============================================================
   HAVEN — Interior Design Studio Template
   Warm oat & terracotta on charcoal. Fully responsive.
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
  bg: '#f2ede6',
  surface: '#fbf8f3',
  ink: '#2a2622',
  muted: '#726a5f',
  faint: '#a39a8c',
  line: '#e3dbcf',
  terra: '#b5623f',
  charcoal: '#2a2622',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1180px', margin: '0 auto', width: '100%' };

const rooms = ['All', 'Living', 'Kitchen', 'Bedroom', 'Commercial'];
const projects = [
  { name: 'Ashford Townhouse', room: 'Living', place: 'Georgian restoration', from: '#c69a72', to: '#6b4a30', big: true },
  { name: 'Marsh Lane Kitchen', room: 'Kitchen', place: 'Warm minimal', from: '#8a9a7b', to: '#3f4a34', big: false },
  { name: 'The Quiet Bedroom', room: 'Bedroom', place: 'Soft neutrals', from: '#b58e88', to: '#5a3d38', big: false },
  { name: 'Copper & Co. Office', room: 'Commercial', place: 'Studio workspace', from: '#b5623f', to: '#5a2c18', big: true },
  { name: 'Harbourside Loft', room: 'Living', place: 'Industrial calm', from: '#7d8790', to: '#3a4148', big: false },
  { name: 'Elm House Suite', room: 'Bedroom', place: 'Layered texture', from: '#c2a878', to: '#6b5730', big: false },
];

export default function HavenInteriorPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Projects', 'Services', 'Process', 'Contact'];
  const anchors = ['portfolio', 'services', 'process', 'contact'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(242,237,230,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontFamily: serif, fontSize: '23px', fontWeight: 700, letterSpacing: '0.14em', color: C.ink, textDecoration: 'none' }}>HAVEN</a>
        {!m && <nav style={{ display: 'flex', gap: '32px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#contact" style={{ background: C.terra, color: '#fff', borderRadius: '2px', padding: '10px 22px', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>Enquire</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '48px 20px 44px' : '84px 20px 72px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '32px' : '56px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.terra, fontWeight: 600 }}>Interior design & styling</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.8rem' : '4.4rem', fontWeight: 700, lineHeight: 1.04, margin: '18px 0 20px' }}>Rooms that feel like home.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.7, maxWidth: '440px', margin: '0 0 30px' }}>A design studio for people who want their spaces to work as beautifully as they look. Full-service interiors, from first sketch to final cushion.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#portfolio" style={{ background: C.charcoal, color: '#fff', borderRadius: '2px', padding: '15px 32px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>View projects</a>
          <a href="#contact" style={{ border: `1px solid ${C.charcoal}`, color: C.charcoal, borderRadius: '2px', padding: '15px 32px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>Book a consult</a>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: m ? '4/3' : '4/5', borderRadius: '4px', overflow: 'hidden', background: 'linear-gradient(155deg,#c69a72,#5a3d28)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Latest project</span>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>Ashford Townhouse</span>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? projects : projects.filter((p) => p.room === active);
  return (
    <section id="portfolio" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: '0 0 16px' }}>Selected projects</h2>
          <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {rooms.map((r) => (
              <button key={r} onClick={() => setActive(r)} style={{ cursor: 'pointer', borderRadius: '2px', padding: '8px 18px', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, border: `1px solid ${active === r ? C.terra : C.line}`, background: active === r ? C.terra : 'transparent', color: active === r ? '#fff' : C.muted }}>{r}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2,1fr)', gap: m ? '16px' : '22px' }}>
          {list.map((p) => (
            <a key={p.name} href="#portfolio" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ aspectRatio: p.big && !m ? '16/10' : '4/3', borderRadius: '4px', background: `linear-gradient(155deg,${p.from},${p.to})`, marginBottom: '14px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{p.name}</h3>
                <span style={{ fontSize: '12px', color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.room}</span>
              </div>
              <p style={{ fontSize: '14px', color: C.muted, margin: '4px 0 0' }}>{p.place}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const m = useIsMobile();
  const items = [
    { t: 'Full-service design', d: 'End-to-end interiors — concept, sourcing, project management and styling.' },
    { t: 'Room refresh', d: 'A single space reimagined with a considered scheme and shopping list.' },
    { t: 'Renovation support', d: 'Space planning, joinery and finishes that get the bones right.' },
    { t: 'Commercial spaces', d: 'Studios, cafés and offices designed to feel as good as they work.' },
  ];
  return (
    <section id="services" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '0.8fr 1.2fr', gap: m ? '28px' : '56px', alignItems: 'start' }}>
        <div>
          <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.terra, fontWeight: 600 }}>What we offer</span>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '14px 0 0' }}>Design at every scale</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '2px', background: C.line, border: `1px solid ${C.line}`, borderRadius: '4px', overflow: 'hidden' }}>
          {items.map((i) => (
            <div key={i.t} style={{ background: C.surface, padding: m ? '24px' : '30px' }}>
              <h3 style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 700, margin: '0 0 10px' }}>{i.t}</h3>
              <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: 0 }}>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const m = useIsMobile();
  const steps = [
    { n: '01', t: 'Consultation', d: 'We visit, listen, and get a feel for how you want to live.' },
    { n: '02', t: 'Concept', d: 'Mood boards, palettes and layouts to align on a direction.' },
    { n: '03', t: 'Detailed design', d: 'Every finish, fixture and piece specified and sourced.' },
    { n: '04', t: 'Install & style', d: 'We manage the fit-out and style it down to the last detail.' },
  ];
  return (
    <section id="process" style={{ background: C.charcoal, color: '#f2ede6' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 44px' }}>Our process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4,1fr)', gap: '26px' }}>
          {steps.map((s) => (
            <div key={s.n}>
              <span style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 700, color: C.terra }}>{s.n}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '10px 0 8px' }}>{s.t}</h3>
              <p style={{ fontSize: '14px', color: '#b9b0a3', lineHeight: 1.7, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const m = useIsMobile();
  const data = [
    { text: 'Haven understood our home better than we did. Every room now works exactly as we hoped.', a: 'The Ashfords', c: 'Townhouse restoration' },
    { text: 'Calm, organised and endlessly creative. The renovation came in on time and on budget.', a: 'Priya & Sam', c: 'Full renovation' },
    { text: 'Our café has doubled its dwell time since the redesign. Guests genuinely linger now.', a: 'Copper & Co.', c: 'Commercial fit-out' },
  ];
  return (
    <section style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>Words from clients</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '4px', padding: '28px' }}>
            <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '14px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={C.terra} stroke={C.terra}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
            <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 18px' }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.c}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const m = useIsMobile();
  return (
    <section id="contact" style={{ background: C.terra, color: '#fff' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '84px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: '0 0 14px' }}>Let's design your haven</h2>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', opacity: 0.9, margin: '0 0 28px', maxWidth: '460px', marginInline: 'auto' }}>We take on a limited number of projects each season. Tell us about yours.</p>
        <a href="#contact" style={{ display: 'inline-block', background: '#fff', color: C.terra, borderRadius: '2px', padding: '15px 36px', fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>studio@haveninteriors.com</a>
      </div>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <span style={{ fontFamily: serif, fontSize: '20px', fontWeight: 700, letterSpacing: '0.14em', width: m ? '100%' : 'auto' }}>HAVEN</span>
        <span style={{ fontSize: '14px', color: C.muted }}>Studio 9, Warehouse Yard, Bristol</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Haven Interiors</span>
      </div>
    </footer>
  );
}
