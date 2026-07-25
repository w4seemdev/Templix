/* ============================================================
   FORM& - Creative Studio Template
   Off-black with coral & lime pops. Fully responsive.
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
  bg: '#0e0e10',
  surface: '#17171b',
  ink: '#f4f4f5',
  muted: '#a1a1aa',
  faint: '#6b6b74',
  line: 'rgba(255,255,255,0.09)',
  coral: '#ff5a3c',
  lime: '#d6f24d',
};
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1220px', margin: '0 auto', width: '100%' };

const disciplines = ['All', 'Branding', 'Web', 'Motion', 'Packaging'];
const work = [
  { name: 'Arca', type: 'Branding', year: '2024', from: '#ff5a3c', to: '#5a1a10' },
  { name: 'Bloom OS', type: 'Web', year: '2024', from: '#6366f1', to: '#1e1a4a' },
  { name: 'Nomad Films', type: 'Motion', year: '2023', from: '#d6f24d', to: '#3a4212' },
  { name: 'Rye & Co.', type: 'Packaging', year: '2024', from: '#f59e0b', to: '#3a2607' },
  { name: 'Halcyon', type: 'Branding', year: '2023', from: '#22d3ee', to: '#0a2e3a' },
  { name: 'Field Notes', type: 'Web', year: '2024', from: '#ec4899', to: '#3a0a26' },
];

export default function CreativeStudioPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Work />
      <Services />
      <Process />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Work', 'Services', 'Process', 'Contact'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(14,14,16,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontSize: '21px', fontWeight: 900, letterSpacing: '-0.04em', color: C.ink, textDecoration: 'none' }}>Form<span style={{ color: C.coral }}>&</span></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#contact" style={{ background: C.lime, color: '#0e0e10', borderRadius: '999px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Start a project</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '56px 20px 48px' : '104px 20px 88px' }}>
      <span style={{ display: 'inline-block', border: `1px solid ${C.line}`, color: C.muted, borderRadius: '999px', padding: '6px 16px', fontSize: '13px', marginBottom: '28px' }}>Branding · Digital · Motion - since 2016</span>
      <h1 style={{ fontSize: m ? '2.9rem' : '6rem', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 0.98, margin: '0 0 24px', maxWidth: '900px' }}>
        We build brands people <span style={{ color: C.coral }}>remember</span>.
      </h1>
      <p style={{ fontSize: m ? '1.05rem' : '1.3rem', color: C.muted, lineHeight: 1.6, maxWidth: '540px', margin: '0 0 34px' }}>A creative studio for founders who refuse to be forgettable. Strategy, identity and interfaces, made with obsessive care.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href="#work" style={{ background: C.coral, color: '#fff', borderRadius: '999px', padding: '15px 34px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>See the work</a>
        <a href="#contact" style={{ border: `1px solid ${C.line}`, color: C.ink, borderRadius: '999px', padding: '15px 34px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Work with us</a>
      </div>
    </section>
  );
}

function Work() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? work : work.filter((w) => w.type === active);
  return (
    <section id="work" style={{ ...container, padding: m ? '40px 20px' : '56px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
        <h2 style={{ fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Selected work</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {disciplines.map((d) => (
            <button key={d} onClick={() => setActive(d)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '999px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === d ? C.coral : C.line}`, background: active === d ? C.coral : 'transparent', color: active === d ? '#fff' : C.muted }}>{d}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2,1fr)', gap: m ? '16px' : '22px' }}>
        {list.map((w) => (
          <a key={w.name} href="#work" style={{ textDecoration: 'none', color: 'inherit', borderRadius: '18px', overflow: 'hidden', border: `1px solid ${C.line}`, display: 'block' }}>
            <div style={{ aspectRatio: '16/10', background: `linear-gradient(150deg,${w.from},${w.to})`, display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{w.type}</span>
            </div>
            <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.surface }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{w.name}</h3>
              <span style={{ fontSize: '13px', color: C.faint }}>{w.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const m = useIsMobile();
  const items = [
    { t: 'Brand strategy', d: 'Positioning, naming, messaging and the story that ties it together.', tags: ['Research', 'Naming', 'Voice'] },
    { t: 'Visual identity', d: 'Logos, type systems and design languages built to scale.', tags: ['Logo', 'Type', 'Guidelines'] },
    { t: 'Digital & web', d: 'Sites and products designed and built to convert and delight.', tags: ['UX', 'UI', 'Build'] },
    { t: 'Motion & film', d: 'Launch films, social systems and animation with attitude.', tags: ['Animation', 'Edit', 'Sound'] },
  ];
  return (
    <section id="services" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 44px' }}>What we do</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {items.map((i) => (
            <div key={i.t} style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: '16px', padding: m ? '24px' : '32px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px' }}>{i.t}</h3>
              <p style={{ fontSize: '15px', color: C.muted, lineHeight: 1.7, margin: '0 0 18px' }}>{i.d}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>{i.tags.map((t) => <span key={t} style={{ fontSize: '12px', color: C.lime, border: `1px solid ${C.line}`, borderRadius: '999px', padding: '5px 12px' }}>{t}</span>)}</div>
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
    { n: '01', t: 'Discover', d: 'We dig into your market, audience and ambitions until it clicks.' },
    { n: '02', t: 'Define', d: 'Strategy and direction, agreed before a single pixel is drawn.' },
    { n: '03', t: 'Design', d: 'Concepts, iteration and craft - the part we love the most.' },
    { n: '04', t: 'Deliver', d: 'Roll-out, guidelines and support so it lands and lasts.' },
  ];
  return (
    <section id="process" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontSize: m ? '2rem' : '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 44px' }}>How we work</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4,1fr)', gap: '24px' }}>
        {steps.map((s) => (
          <div key={s.n} style={{ borderTop: `2px solid ${C.coral}`, paddingTop: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: C.coral, letterSpacing: '0.08em' }}>{s.n}</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '8px 0 10px' }}>{s.t}</h3>
            <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Clients() {
  const m = useIsMobile();
  return (
    <section style={{ background: C.lime, color: '#0e0e10' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ maxWidth: '820px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Client, Arca</span>
          <blockquote style={{ fontSize: m ? '1.6rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '18px 0 24px' }}>
            "Form& gave us an identity that finally matched our ambition. We doubled inbound in a quarter."
          </blockquote>
          <p style={{ fontSize: '15px', fontWeight: 600 }}>Dana Okoye · Founder & CEO</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: m ? '20px 28px' : '28px 48px', marginTop: '44px', opacity: 0.7 }}>
          {['ARCA', 'BLOOM', 'NOMAD', 'HALCYON', 'RYE&CO', 'FIELD'].map((b) => <span key={b} style={{ fontSize: m ? '1.1rem' : '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{b}</span>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const m = useIsMobile();
  return (
    <section id="contact" style={{ ...container, padding: m ? '56px 20px' : '96px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: m ? '2.4rem' : '4rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 20px' }}>Got something worth building?</h2>
      <p style={{ fontSize: m ? '1.05rem' : '1.25rem', color: C.muted, margin: '0 0 32px', maxWidth: '480px', marginInline: 'auto' }}>Tell us about your project. We take on a handful of new partners each quarter.</p>
      <a href="#contact" style={{ display: 'inline-block', background: C.coral, color: '#fff', borderRadius: '999px', padding: '16px 40px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>hello@formand.studio</a>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '40px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.04em', width: m ? '100%' : 'auto' }}>Form<span style={{ color: C.coral }}>&</span></span>
        <span style={{ fontSize: '14px', color: C.muted }}>London · Lisbon · Remote</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Form& Studio</span>
      </div>
    </footer>
  );
}
