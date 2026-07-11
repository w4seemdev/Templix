/* ============================================================
   THE MERIDIAN — Daily news
   Classic broadsheet: white, ink black, editorial red accent
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

const PAPER = '#ffffff';
const INK = '#1a1a1a';
const MUTE = '#6b6b6b';
const RED = '#c8102e';
const LINE = '#e2e2e0';
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const SECTIONS = ['World', 'Politics', 'Business', 'Tech', 'Culture', 'Sport'];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const side = [
  { k: 'Politics', t: 'Coalition talks stretch into third week as budget deadline looms' },
  { k: 'Business', t: 'Central bank holds rates, signals patience amid cooling inflation' },
  { k: 'Tech', t: 'Chipmakers race to secure rare-earth supply after export curbs' },
];

const opinion = [
  { t: 'The quiet return of the local newspaper', a: 'Editorial Board' },
  { t: 'Why the four-day week keeps failing upward', a: 'H. Okafor' },
  { t: 'We are measuring the wrong things in schools', a: 'D. Lindqvist' },
];

const more = [
  { k: 'Culture', t: 'A restored 1920s cinema reopens to sold-out crowds', g: 'linear-gradient(150deg,#8a6d4b,#c8a578)' },
  { k: 'Sport', t: 'Underdogs clinch the cup in extra-time thriller', g: 'linear-gradient(150deg,#3d6b4a,#7fa78a)' },
  { k: 'World', t: 'Coastal cities trial floating defenses against rising seas', g: 'linear-gradient(150deg,#3a5a78,#88a6bd)' },
  { k: 'Business', t: 'Small exporters find footing in regional trade blocs', g: 'linear-gradient(150deg,#6b4a5a,#a5849a)' },
];

export default function DailyNewsPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: INK, minHeight: '100vh' }}>
      <div style={{ background: INK, color: '#fff', fontSize: '12px', letterSpacing: '0.02em' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '7px clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ background: RED, borderRadius: '3px', padding: '2px 6px', fontWeight: 800, letterSpacing: '0.06em' }}>LIVE</span>Markets open higher on easing trade tensions</span>
          {!mobile && <span style={{ color: 'rgba(255,255,255,0.7)' }}>{today}</span>}
        </div>
      </div>

      <header style={{ borderBottom: `2px solid ${INK}`, textAlign: 'center', padding: mobile ? '1.25rem 1.25rem 0' : '1.75rem 2rem 0' }}>
        <a href="#top" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: mobile ? '2.6rem' : '4rem', letterSpacing: '-0.02em', color: INK, textDecoration: 'none', display: 'block' }}>The Meridian</a>
        <p style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE, margin: '0.35rem 0 1rem' }}>Independent journalism since 1946</p>
      </header>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '46px', display: 'flex', alignItems: 'center', justifyContent: mobile ? 'space-between' : 'center', gap: '2rem' }}>
          {!mobile ? SECTIONS.map(s => <a key={s} href="#more" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', color: INK, textDecoration: 'none' }}>{s}</a>)
            : (<>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Sections</span>
              <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', display: 'grid', gap: '3px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '16px', height: '2px', background: INK, display: 'block' }} />)}
              </button>
            </>)}
        </div>
        {mobile && open && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{SECTIONS.map(s => <a key={s} href="#more" onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: '14px', color: INK, textDecoration: 'none' }}>{s}</a>)}</div>}
      </nav>

      <main id="top" style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '1.75rem 1.25rem' : '2.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr', gap: mobile ? '2rem' : '2.5rem' }}>
          <article style={{ borderRight: mobile ? 'none' : `1px solid ${LINE}`, paddingRight: mobile ? 0 : '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: RED }}>World · Analysis</span>
            <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '2.1rem' : '3.1rem', fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.08, margin: '0.6rem 0 1rem' }}>
              A fragile ceasefire holds as diplomats push for a lasting accord
            </h1>
            <div style={{ aspectRatio: '16/9', borderRadius: '6px', background: 'linear-gradient(150deg,#37506b,#8ba0b5)', margin: '0 0 0.75rem' }} />
            <p style={{ fontSize: '12px', color: MUTE, margin: '0 0 1.25rem', fontStyle: 'italic' }}>Delegations gather ahead of the third round of talks. — Meridian staff</p>
            <p style={{ fontSize: mobile ? '1.02rem' : '1.1rem', color: '#33322f', lineHeight: 1.8, margin: '0 0 1rem' }}>
              After forty days of negotiation, envoys emerged cautiously optimistic that a framework agreement could be reached within the week. Observers warn that the hardest questions — borders, reconstruction, and the return of the displaced — remain unresolved.
            </p>
            <p style={{ fontSize: '1rem', color: '#33322f', lineHeight: 1.8, margin: 0 }}>
              &ldquo;This is a beginning, not an ending,&rdquo; said one senior mediator, speaking on condition of anonymity. Aid convoys resumed for the first time in six weeks as the guns fell silent along the northern corridor.
            </p>
          </article>

          <aside>
            <h2 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: INK, borderBottom: `2px solid ${INK}`, paddingBottom: '6px', margin: '0 0 1rem' }}>Top stories</h2>
            {side.map((s) => (
              <a key={s.t} href="#more" style={{ display: 'block', textDecoration: 'none', color: INK, padding: '0.9rem 0', borderBottom: `1px solid ${LINE}` }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: RED }}>{s.k}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.25, margin: '0.35rem 0 0' }}>{s.t}</h3>
              </a>
            ))}
            <div style={{ background: '#f6f5f2', borderRadius: '6px', padding: '1.25rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE, margin: '0 0 0.9rem' }}>Opinion</h3>
              {opinion.map(o => (
                <a key={o.t} href="#more" style={{ display: 'block', textDecoration: 'none', color: INK, marginBottom: '0.85rem' }}>
                  <p style={{ fontFamily: SERIF, fontSize: '1.02rem', fontWeight: 600, lineHeight: 1.3, fontStyle: 'italic', margin: '0 0 2px' }}>{o.t}</p>
                  <span style={{ fontSize: '12px', color: MUTE }}>{o.a}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>

        <section id="more" style={{ marginTop: mobile ? '2.5rem' : '3.5rem', borderTop: `2px solid ${INK}`, paddingTop: '1.5rem' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: INK, margin: '0 0 1.5rem' }}>More to read</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(4,1fr)', gap: '1.5rem' }}>
            {more.map(m => (
              <a key={m.t} href="#more" style={{ textDecoration: 'none', color: INK }}>
                <div style={{ aspectRatio: '16/10', borderRadius: '6px', background: m.g, marginBottom: '0.75rem' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: RED }}>{m.k}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.25, margin: '0.35rem 0 0' }}>{m.t}</h3>
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginTop: mobile ? '2.5rem' : '3.5rem', background: INK, color: '#fff', borderRadius: '10px', padding: mobile ? '2rem 1.5rem' : '2.75rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '1.7rem' : '2.2rem', fontWeight: 700, margin: '0 0 0.6rem' }}>Journalism worth paying for</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: '0 0 1.5rem' }}>Support independent reporting. Cancel anytime. First month on us.</p>
          <a href="#top" style={{ display: 'inline-block', background: RED, color: '#fff', borderRadius: '6px', padding: '13px 30px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Subscribe for $4/month</a>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2rem 0', marginTop: '1rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 800 }}>The Meridian</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['About', 'Ethics', 'Contact', 'Careers'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: '#aaa' }}>© {new Date().getFullYear()} The Meridian</span>
        </div>
      </footer>
    </div>
  );
}
