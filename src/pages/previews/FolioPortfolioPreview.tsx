/* ============================================================
   FOLIO — Portfolio template for designers & developers
   Minimal charcoal canvas, warm off-white accent
   Self-contained, responsive single-page site
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

const INK = '#0c0c0c';
const PAPER = '#f5f2ec';
const MUTE = '#8a8578';
const LINE = 'rgba(245,242,236,0.09)';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export default function FolioPortfolioPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: INK, color: PAPER, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(12,12,12,0.88)', backdropFilter: 'blur(16px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', color: PAPER, textDecoration: 'none' }}>alex<span style={{ color: MUTE }}>.studio</span></a>
          {!mobile && (
            <nav style={{ display: 'flex', gap: '2rem' }}>
              {NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}
            </nav>
          )}
          {!mobile ? (
            <a href="#contact" style={{ border: `1px solid ${LINE}`, borderRadius: '9px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: PAPER, textDecoration: 'none' }}>Hire me</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: PAPER, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && (
          <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>
            {NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: PAPER, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}
          </nav>
        )}
      </header>

      <section id="top" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '4rem 1.25rem 3rem' : '7rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.75rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7cc47c' }} />
          <span style={{ fontSize: '13px', color: MUTE }}>Available for freelance — Spring 2026</span>
        </div>
        <h1 style={{ fontSize: mobile ? '2.6rem' : 'clamp(3rem,7vw,5.4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.04, margin: '0 0 1.5rem', maxWidth: '820px' }}>
          I design &amp; build <span style={{ color: MUTE }}>digital products</span> people love to use.
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.125rem', color: MUTE, lineHeight: 1.7, maxWidth: '520px', margin: '0 0 2.5rem' }}>
          Product designer and front-end engineer helping startups ship clean, fast, considered interfaces — from first sketch to production.
        </p>
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
          <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: PAPER, borderRadius: '10px', padding: '12px 22px', fontSize: '14px', fontWeight: 700, color: INK, textDecoration: 'none' }}>View my work <ArrowDown /></a>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '12px 22px', fontSize: '14px', fontWeight: 600, color: PAPER, textDecoration: 'none' }}>Get in touch</a>
        </div>
      </section>

      <section id="work" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '1rem 1.25rem 4rem' : '2rem 2rem 6rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Selected work</h2>
          <span style={{ fontSize: '13px', color: MUTE }}>2023 — 2026</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: '1.4rem' }}>
          {[
            { title: 'Lumify Analytics', cat: 'SaaS · Product design', year: '2025', c1: '#3b3f7a', c2: '#7c81c4' },
            { title: 'Cadence Mobile', cat: 'iOS · Design & build', year: '2025', c1: '#0e5f5a', c2: '#2fb3a6' },
            { title: 'Meridian Journal', cat: 'Editorial · Web', year: '2024', c1: '#6b3f1e', c2: '#c78a4c' },
            { title: 'Northwind Identity', cat: 'Brand · Systems', year: '2024', c1: '#4a1f3d', c2: '#b0557f' },
          ].map(p => (
            <a key={p.title} href="#work" style={{ display: 'block', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${LINE}`, textDecoration: 'none', position: 'relative', aspectRatio: '16/10' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.c1}, ${p.c2})`, opacity: 0.85 }} />
              <div style={{ position: 'absolute', inset: 0, padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '5px' }}>{p.cat}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{p.title}</h3>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{p.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="skills" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2.25rem' }}>Skills &amp; tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: '1rem 2.5rem' }}>
            {[
              { label: 'Interface & interaction design', level: 95 },
              { label: 'React & TypeScript', level: 92 },
              { label: 'Design systems', level: 90 },
              { label: 'Prototyping (Figma)', level: 94 },
              { label: 'Motion & micro-interaction', level: 84 },
              { label: 'Accessibility (WCAG)', level: 88 },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <span style={{ fontSize: '13px', color: PAPER }}>{s.label}</span>
                  <span style={{ fontSize: '13px', color: MUTE }}>{s.level}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(245,242,236,0.08)' }}>
                  <div style={{ height: '100%', borderRadius: '9999px', background: PAPER, width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2.25rem' }}>Kind words</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.2rem' }}>
            {[
              { q: 'Alex delivered our product redesign in three weeks — the craft was far beyond what we hoped for.', n: 'Rachel Kim', r: 'CEO, Lumify' },
              { q: 'Clean code, sharp instincts, and a rare eye for detail. Easily one of the best I have worked with.', n: 'Tom Hendricks', r: 'CTO, Cadence' },
              { q: 'Turned our vague brief into a product that just feels right. I would hire again in a heartbeat.', n: 'Priya Shah', r: 'Founder, Meridian' },
            ].map(t => (
              <div key={t.n} style={{ borderRadius: '16px', border: `1px solid ${LINE}`, background: 'rgba(245,242,236,0.02)', padding: '1.7rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <p style={{ fontSize: '14px', color: PAPER, lineHeight: 1.7, margin: 0, flex: 1 }}>&ldquo;{t.q}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: PAPER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>{t.n.split(' ').map(w => w[0]).join('')}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{t.n}</p>
                    <p style={{ fontSize: '12px', color: MUTE, margin: 0 }}>{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 1fr', gap: mobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: MUTE }}>About me</span>
            <h2 style={{ fontSize: mobile ? '1.8rem' : 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1.25rem' }}>Building with intent since 2018</h2>
            <p style={{ fontSize: '15px', color: MUTE, lineHeight: 1.8, margin: '0 0 1rem' }}>I&rsquo;m a designer-engineer based in Lisbon. I care about the whole arc of a product — how it looks, how it feels, and how it holds up under real use.</p>
            <p style={{ fontSize: '15px', color: MUTE, lineHeight: 1.8, margin: 0 }}>Off the clock you&rsquo;ll find me sketching type, trail-running, or restoring an old film camera.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[{ v: '60+', l: 'Projects shipped' }, { v: '8yr', l: 'Experience' }, { v: '35+', l: 'Happy clients' }, { v: '14', l: 'Open-source repos' }].map(s => (
              <div key={s.l} style={{ borderRadius: '14px', border: `1px solid ${LINE}`, background: 'rgba(245,242,236,0.02)', padding: '1.4rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em' }}>{s.v}</div>
                <div style={{ fontSize: '13px', color: MUTE, marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobile ? '2.2rem' : 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 1rem' }}>Let&rsquo;s work together</h2>
          <p style={{ color: MUTE, fontSize: '1.05rem', margin: '0 0 2.5rem' }}>Got a project in mind? I&rsquo;d love to hear about it.</p>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: PAPER, borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, color: INK, textDecoration: 'none' }}>hello@alex.studio</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '14px', fontWeight: 700 }}>alex.studio</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Twitter', 'GitHub', 'Dribbble', 'LinkedIn'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}
          </div>
          <span style={{ fontSize: '13px', color: 'rgba(245,242,236,0.25)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
