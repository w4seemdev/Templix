/* ============================================================
   SIGNAL '26 — Product & engineering conference
   Deep midnight navy, electric lime + cyan accents
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

const BG = '#080b16';
const CARD = '#10152a';
const FG = '#eef1fb';
const MUTE = '#8a93b2';
const LIME = '#c6f24e';
const CYAN = '#38e1d6';
const LINE = 'rgba(238,241,251,0.09)';

const NAV = [
  { label: 'Speakers', href: '#speakers' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Venue', href: '#venue' },
];

const speakers = [
  { n: 'Dr. Lena Voss', r: 'VP Research, Helix AI', c: 'linear-gradient(150deg,#38e1d6,#1e6b8c)' },
  { n: 'Marcus Bell', r: 'Founder, Groundwork', c: 'linear-gradient(150deg,#c6f24e,#5a8a2e)' },
  { n: 'Priya Anand', r: 'Principal Eng, Northwind', c: 'linear-gradient(150deg,#8a7cf2,#3a2e8c)' },
  { n: 'Tomás Rivera', r: 'Design Director, Foundry', c: 'linear-gradient(150deg,#f28a5a,#8c3e1e)' },
  { n: 'Aiko Nakamura', r: 'CTO, Signal Labs', c: 'linear-gradient(150deg,#5ad0f2,#1e5a8c)' },
  { n: 'Jonah Okafor', r: 'Head of Data, Ledgerly', c: 'linear-gradient(150deg,#f25a9e,#8c1e52)' },
];

const agenda = [
  { time: '09:00', t: 'Doors & coffee', s: 'The Atrium', tag: 'Break' },
  { time: '10:00', t: 'Opening keynote: Building for the next billion', s: 'Dr. Lena Voss', tag: 'Keynote' },
  { time: '11:30', t: 'Scaling teams without scaling chaos', s: 'Marcus Bell', tag: 'Talk' },
  { time: '13:00', t: 'Lunch & hallway track', s: 'The Atrium', tag: 'Break' },
  { time: '14:15', t: 'The design systems that survive rewrites', s: 'Tomás Rivera', tag: 'Talk' },
  { time: '16:00', t: 'Panel: What we got wrong about AI in 2025', s: 'All speakers', tag: 'Panel' },
];

const tagColor: Record<string, string> = { Keynote: LIME, Talk: CYAN, Panel: '#8a7cf2', Break: MUTE };

export default function LaunchConfEventPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(8,11,22,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.02em', color: FG, textDecoration: 'none' }}>SIGNAL<span style={{ color: LIME }}>&rsquo;26</span></a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#tickets" style={{ background: LIME, color: BG, borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>Get tickets</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ position: 'relative', maxWidth: '1160px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem 2.5rem' : '6rem 2rem 4rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '620px', maxWidth: '100%', height: '620px', background: `radial-gradient(circle, rgba(56,225,214,0.14), transparent 60%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: CYAN, border: `1px solid ${LINE}`, borderRadius: '999px', padding: '6px 16px', marginBottom: '1.75rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: LIME }} /> Oct 8–9, 2026 · Berlin & online
          </span>
          <h1 style={{ fontSize: mobile ? '3rem' : 'clamp(3.4rem,9vw,6.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 1.25rem' }}>
            The conference for<br /><span style={{ background: `linear-gradient(90deg,${LIME},${CYAN})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>people who ship.</span>
          </h1>
          <p style={{ fontSize: mobile ? '1.05rem' : '1.2rem', color: MUTE, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2rem' }}>
            Two days of talks, workshops, and hallway conversations with the builders behind the products you use every day.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#tickets" style={{ background: LIME, color: BG, borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Get your ticket</a>
            <a href="#agenda" style={{ border: `1px solid ${LINE}`, color: FG, borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>See the agenda</a>
          </div>
          <div style={{ display: 'flex', gap: mobile ? '1.5rem' : '3rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[{ v: '40+', l: 'Speakers' }, { v: '2', l: 'Days' }, { v: '1,800', l: 'Attendees' }, { v: '12', l: 'Workshops' }].map(s => (
              <div key={s.l}><div style={{ fontSize: mobile ? '1.8rem' : '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', color: FG }}>{s.v}</div><div style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTE }}>{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="speakers" style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '2.5rem 1.25rem' : '4rem 2rem' }}>
        <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 2rem' }}>Speakers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: mobile ? '1rem' : '1.5rem' }}>
          {speakers.map(s => (
            <div key={s.n} style={{ border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden', background: CARD }}>
              <div style={{ aspectRatio: mobile ? '1/1' : '4/3', background: s.c }} />
              <div style={{ padding: mobile ? '0.9rem' : '1.25rem' }}>
                <h3 style={{ fontSize: mobile ? '15px' : '17px', fontWeight: 700, margin: '0 0 3px' }}>{s.n}</h3>
                <p style={{ fontSize: '13px', color: MUTE, margin: 0 }}>{s.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="agenda" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 2rem' }}>Day one</h2>
          {agenda.map(a => (
            <div key={a.time} style={{ display: 'flex', alignItems: mobile ? 'flex-start' : 'center', gap: mobile ? '0.9rem' : '1.5rem', padding: '1.15rem 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontSize: mobile ? '14px' : '16px', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: CYAN, width: mobile ? '48px' : '64px', flexShrink: 0 }}>{a.time}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: mobile ? '15px' : '17px', fontWeight: 700, lineHeight: 1.3, margin: '0 0 3px' }}>{a.t}</h3>
                <p style={{ fontSize: '13px', color: MUTE, margin: 0 }}>{a.s}</p>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor[a.tag], border: `1px solid ${LINE}`, borderRadius: '999px', padding: '4px 10px', flexShrink: 0, alignSelf: mobile ? 'flex-start' : 'center' }}>{a.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="tickets" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 2.5rem' }}>Tickets</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {[
              { t: 'Online', p: '€99', d: ['Live-streamed talks', 'On-demand recordings', 'Discord community'], hot: false },
              { t: 'Conference', p: '€349', d: ['Everything in Online', 'Both days on-site', 'Hallway track & lunch', 'Speaker Q&As'], hot: true },
              { t: 'Workshop Pass', p: '€599', d: ['Everything in Conference', '2 hands-on workshops', 'Reserved seating', 'Speaker dinner'], hot: false },
            ].map(t => (
              <div key={t.t} style={{ border: `1px solid ${t.hot ? LIME : LINE}`, borderRadius: '18px', background: CARD, padding: '2rem 1.75rem', position: 'relative' }}>
                {t.hot && <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: LIME, color: BG, fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '999px', padding: '4px 12px' }}>Most popular</span>}
                <div style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE, marginBottom: '0.75rem' }}>{t.t}</div>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>{t.p}</div>
                <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '1.75rem' }}>
                  {t.d.map(f => (
                    <div key={f} style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.hot ? LIME : CYAN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      <span style={{ fontSize: '14px', color: FG }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#tickets" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px', fontSize: '14px', fontWeight: 800, textDecoration: 'none', background: t.hot ? LIME : 'transparent', color: t.hot ? BG : FG, border: t.hot ? 'none' : `1px solid ${LINE}` }}>Get {t.t}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '2rem' : '3.5rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '16/10', borderRadius: '18px', background: 'linear-gradient(135deg,#12213a,#1e6b8c 130%)' }} />
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: CYAN }}>The venue</span>
            <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Kraftwerk, Berlin</h2>
            <p style={{ fontSize: '1.05rem', color: MUTE, lineHeight: 1.75, margin: '0 0 1.5rem' }}>
              A converted power station in the heart of Mitte — soaring concrete halls, fast wifi everywhere, and a rooftop bar for the after-party. Fully accessible, ten minutes from the main station.
            </p>
            <a href="#venue" style={{ color: LIME, fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>Get directions →</a>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '16px', fontWeight: 900 }}>SIGNAL<span style={{ color: LIME }}>&rsquo;26</span></span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Twitter', 'Code of Conduct', 'Sponsor', 'Contact'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(238,241,251,0.3)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
