/* ============================================================
   KINETIC - Digital Agency Template
   Near-black with electric lime accent - bold & editorial.
   Self-contained, inline styles only, fully responsive.
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

const T = { bg: '#0a0a0a', panel: '#121212', line: 'rgba(255,255,255,0.1)', ink: '#fafafa', mut: '#a3a3a3', dim: '#6b6b6b', a: '#a3e635' };
const NAV = [['Work', 'work'], ['Services', 'services'], ['Process', 'process'], ['Contact', 'contact']] as const;

export default function AgencyProPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Marquee mobile={mobile} />
      <Work mobile={mobile} />
      <Services mobile={mobile} />
      <Process mobile={mobile} />
      <Stats mobile={mobile} />
      <Contact mobile={mobile} />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(14px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: T.a, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L20 4M9 4h11v11" /></svg>
          </div>
          <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: '-0.03em' }}>KINETIC</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 30 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, fontWeight: 500, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <a href="#contact" style={{ background: T.a, borderRadius: 9999, padding: '9px 20px', fontSize: 14, fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>Start a project</a>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 24px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#contact" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: T.a, borderRadius: 9999, padding: 11, fontSize: 14, fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>Start a project</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? '52px 24px 40px' : '92px 24px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.a, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Brand · Web · Product</span>
        <h1 style={{ fontSize: mobile ? '3rem' : '6rem', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, margin: '18px 0 0', textTransform: 'uppercase' }}>
          We build<br />brands that <span style={{ color: T.a }}>move</span>
        </h1>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 30, gap: 24 }}>
          <p style={{ fontSize: mobile ? '1.05rem' : '1.2rem', color: T.mut, lineHeight: 1.6, maxWidth: 460, margin: 0 }}>
            Kinetic is an independent design studio crafting brand identities, websites, and digital products for ambitious companies.
          </p>
          <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: mobile ? 24 : 0, background: T.a, borderRadius: 9999, padding: '14px 26px', fontSize: 15, fontWeight: 700, color: '#0a0a0a', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            See our work <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Marquee({ mobile }: { mobile: boolean }) {
  const words = ['Strategy', 'Branding', 'Web Design', 'Development', 'Motion', 'Art Direction'];
  return (
    <div style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '18px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', padding: '0 24px' }}>
        {words.map(w => <span key={w} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: mobile ? 15 : 18, fontWeight: 700, color: T.dim, textTransform: 'uppercase', letterSpacing: '-0.01em' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: T.a }} />{w}</span>)}
      </div>
    </div>
  );
}

function Work({ mobile }: { mobile: boolean }) {
  const projects: [string, string, string][] = [
    ['Nova Health', 'Brand + Web', 'linear-gradient(135deg,#a3e635,#22c55e)'],
    ['Fable Studios', 'Identity', 'linear-gradient(135deg,#f472b6,#a855f7)'],
    ['Voyage', 'Product Design', 'linear-gradient(135deg,#38bdf8,#6366f1)'],
    ['Ember Coffee', 'Brand + Packaging', 'linear-gradient(135deg,#fb923c,#ef4444)'],
  ];
  return (
    <section id="work" style={{ padding: mobile ? '52px 24px' : '84px 24px', borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 34 }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '3rem', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', margin: 0 }}>Selected work</h2>
          <span style={{ fontSize: 13, color: T.dim }}>2024 - 2025</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
          {projects.map(([name, tag, bg]) => (
            <a key={name} href="#work" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ borderRadius: 18, background: bg, height: mobile ? 200 : 280, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: 22 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55))' }} />
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(0,0,0,0.4)', color: '#fff', borderRadius: 9999, padding: '4px 12px' }}>{tag}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{name}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ mobile }: { mobile: boolean }) {
  const services: [string, string, string[]][] = [
    ['01', 'Brand strategy', ['Positioning', 'Naming', 'Messaging', 'Guidelines']],
    ['02', 'Visual identity', ['Logo systems', 'Type & color', 'Art direction', 'Collateral']],
    ['03', 'Web & product', ['UX/UI design', 'Development', 'CMS & commerce', 'Motion']],
  ];
  return (
    <section id="services" style={{ padding: mobile ? '52px 24px' : '84px 24px', borderTop: `1px solid ${T.line}`, background: T.panel }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: mobile ? '2rem' : '3rem', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', margin: '0 0 34px' }}>What we do</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
          {services.map(([n, title, items]) => (
            <div key={n} style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.bg, padding: 26 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.a, marginBottom: 16 }}>{n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 16px' }}>{title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(it => <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: T.mut, paddingBottom: 10, borderBottom: `1px solid ${T.line}` }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: T.a }} />{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ mobile }: { mobile: boolean }) {
  const steps: [string, string, string][] = [
    ['Discover', 'We dig into your goals, audience, and market to find the real opportunity.', '01'],
    ['Define', 'We shape a clear strategy and creative direction everyone can rally behind.', '02'],
    ['Design', 'We craft the identity and experience, refining every detail with you.', '03'],
    ['Deliver', 'We build, launch, and hand over a system your team can run with.', '04'],
  ];
  return (
    <section id="process" style={{ padding: mobile ? '52px 24px' : '84px 24px', borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: mobile ? '2rem' : '3rem', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', margin: '0 0 34px' }}>How we work</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(4,1fr)', gap: mobile ? 20 : 24 }}>
          {steps.map(([t, d, n]) => (
            <div key={n} style={{ borderTop: `2px solid ${T.a}`, paddingTop: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.dim, marginBottom: 10 }}>{n}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 10px' }}>{t}</h3>
              <p style={{ fontSize: 14, color: T.mut, lineHeight: 1.65, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ mobile }: { mobile: boolean }) {
  const stats: [string, string][] = [['120+', 'Projects shipped'], ['14', 'Design awards'], ['40+', 'Happy clients'], ['9 yrs', 'In business']];
  return (
    <section style={{ padding: mobile ? '44px 24px' : '64px 24px', borderTop: `1px solid ${T.line}`, background: T.a }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 24 }}>
        {stats.map(([v, l]) => (
          <div key={l}>
            <div style={{ fontSize: mobile ? '2.4rem' : '3.4rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#0a0a0a' }}>{v}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(10,10,10,0.7)' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ mobile }: { mobile: boolean }) {
  return (
    <section id="contact" style={{ padding: mobile ? '56px 24px' : '96px 24px', borderTop: `1px solid ${T.line}`, textAlign: 'center' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.a, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Let's talk</span>
        <h2 style={{ fontSize: mobile ? '2.4rem' : '4rem', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1, margin: '16px 0 22px' }}>Have a project<br />in mind?</h2>
        <p style={{ fontSize: '1.1rem', color: T.mut, maxWidth: 460, margin: '0 auto 30px' }}>Tell us what you're building. We reply to every inquiry within one business day.</p>
        <a href="#contact" style={{ display: 'inline-block', background: T.a, borderRadius: 9999, padding: '16px 34px', fontSize: 16, fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>hello@kinetic.studio</a>
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '40px 24px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: mobile ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <div style={{ marginBottom: mobile ? 20 : 0 }}>
          <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: '-0.03em' }}>KINETIC</span>
          <p style={{ fontSize: 13, color: T.dim, marginTop: 6 }}>Independent design studio. Everywhere & remote.</p>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>{['Instagram', 'Behance', 'Dribbble', 'LinkedIn'].map(s => <a key={s} href="#work" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{s}</a>)}</div>
      </div>
      <div style={{ maxWidth: 1200, margin: '24px auto 0', paddingTop: 20, borderTop: `1px solid ${T.line}`, fontSize: 13, color: T.dim }}>© {new Date().getFullYear()} Kinetic Studio. All rights reserved.</div>
    </footer>
  );
}
