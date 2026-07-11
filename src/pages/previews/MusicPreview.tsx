/* ============================================================
   NOVA SKY — Music artist / album
   Near-black canvas, crimson→amber sunset gradient
   Styled (non-functional) player with inline-SVG controls
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

const BG = '#0b0a0d';
const CARD = '#15131a';
const FG = '#f4eef2';
const MUTE = '#8f8794';
const HOT = '#ff5470';
const AMBER = '#ffab5e';
const LINE = 'rgba(244,238,242,0.09)';
const SUNSET = `linear-gradient(135deg,${HOT},${AMBER})`;

const NAV = [
  { label: 'Music', href: '#music' },
  { label: 'Tour', href: '#tour' },
  { label: 'About', href: '#about' },
];

const tracks = [
  { n: '01', t: 'Midnight Signal', d: '3:42' },
  { n: '02', t: 'Paper Lanterns', d: '4:05' },
  { n: '03', t: 'Static Bloom', d: '3:18' },
  { n: '04', t: 'Coastline (feat. Rú)', d: '4:51' },
  { n: '05', t: 'Slow Dissolve', d: '3:37' },
];

const tour = [
  { city: 'Berlin', venue: 'Astra Kulturhaus', date: 'Jun 12', status: 'Sold out' },
  { city: 'Amsterdam', venue: 'Paradiso', date: 'Jun 15', status: 'Tickets' },
  { city: 'London', venue: 'Village Underground', date: 'Jun 19', status: 'Tickets' },
  { city: 'Paris', venue: 'La Maroquinerie', date: 'Jun 23', status: 'Low stock' },
];

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>;
}
const PLAY = 'M8 5v14l11-7z';
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
const PREV = 'M6 6h2v12H6zm3.5 6l8.5 6V6z';
const NEXT = 'M16 6h2v12h-2zM6 18l8.5-6L6 6z';

export default function MusicPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(11,10,13,0.8)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.14em', color: FG, textDecoration: 'none' }}>NOVA SKY</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#tour" style={{ background: SUNSET, color: BG, borderRadius: '999px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Get tickets</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '3rem 1.25rem' : '5rem 2rem', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOT }}>New album · Out now</span>
          <h1 style={{ fontSize: mobile ? '3rem' : 'clamp(3.4rem,8vw,5.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.98, margin: '1rem 0 1.25rem' }}>
            SLOW<br /><span style={{ background: SUNSET, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>DISSOLVE</span>
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.1rem', color: MUTE, lineHeight: 1.7, maxWidth: '420px', margin: '0 0 2rem' }}>
            The third record from Nova Sky — ten tracks of neon-soaked dream-pop written on the road between Reykjavík and Lisbon.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href="#music" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: SUNSET, color: BG, borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}><Icon d={PLAY} size={16} /> Listen now</a>
            <a href="#music" style={{ border: `1px solid ${LINE}`, color: FG, borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Add to library</a>
          </div>
        </div>
        <div style={{ aspectRatio: '1/1', borderRadius: '20px', background: `radial-gradient(circle at 30% 25%, ${AMBER}, ${HOT} 45%, #3a1030 100%)`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.18), transparent 45%)' }} />
          <span style={{ position: 'absolute', left: '1.5rem', bottom: '1.5rem', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.06em', color: 'rgba(11,10,13,0.75)' }}>NOVA SKY</span>
        </div>
      </section>

      {/* Now-playing bar */}
      <section id="music" style={{ maxWidth: '1120px', margin: '0 auto', padding: mobile ? '0 1.25rem 3.5rem' : '0 2rem 5rem' }}>
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: '18px', padding: mobile ? '1.25rem' : '1.5rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '0.9rem' : '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ width: mobile ? '52px' : '60px', height: mobile ? '52px' : '60px', borderRadius: '10px', background: SUNSET, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>Coastline (feat. Rú)</div>
              <div style={{ fontSize: '13px', color: MUTE }}>Nova Sky — Slow Dissolve</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '0.5rem' : '0.9rem' }}>
              <button aria-label="Previous" style={{ background: 'none', border: 'none', color: MUTE, cursor: 'pointer', padding: 0, display: 'flex' }}><Icon d={PREV} /></button>
              <button onClick={() => setPlaying(!playing)} aria-label="Play/pause" style={{ width: '46px', height: '46px', borderRadius: '50%', background: SUNSET, color: BG, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={playing ? PAUSE : PLAY} size={22} /></button>
              <button aria-label="Next" style={{ background: 'none', border: 'none', color: MUTE, cursor: 'pointer', padding: 0, display: 'flex' }}><Icon d={NEXT} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: MUTE, fontVariantNumeric: 'tabular-nums' }}>1:38</span>
            <div style={{ flex: 1, height: '4px', borderRadius: '999px', background: 'rgba(244,238,242,0.1)' }}>
              <div style={{ width: '38%', height: '100%', borderRadius: '999px', background: SUNSET }} />
            </div>
            <span style={{ fontSize: '11px', color: MUTE, fontVariantNumeric: 'tabular-nums' }}>4:51</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {tracks.map((t, i) => (
            <div key={t.n} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 0.5rem', borderBottom: `1px solid ${LINE}`, borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: MUTE, width: '24px', fontVariantNumeric: 'tabular-nums' }}>{t.n}</span>
              <button aria-label="Play track" style={{ background: 'none', border: 'none', color: i === 3 ? HOT : MUTE, cursor: 'pointer', padding: 0, display: 'flex' }}><Icon d={PLAY} size={16} /></button>
              <span style={{ flex: 1, fontSize: '15px', fontWeight: i === 3 ? 700 : 500, color: i === 3 ? FG : FG }}>{t.t}</span>
              <span style={{ fontSize: '13px', color: MUTE, fontVariantNumeric: 'tabular-nums' }}>{t.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="tour" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 2rem' }}>On tour</h2>
          <div>
            {tour.map(s => (
              <div key={s.city} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: mobile ? '1rem 0' : '1.25rem 0', borderTop: `1px solid ${LINE}` }}>
                <div style={{ width: mobile ? '56px' : '72px', flexShrink: 0 }}>
                  <div style={{ fontSize: mobile ? '1.1rem' : '1.3rem', fontWeight: 800, color: AMBER }}>{s.date.split(' ')[1]}</div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTE }}>{s.date.split(' ')[0]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: mobile ? '1.05rem' : '1.2rem', fontWeight: 700 }}>{s.city}</div>
                  <div style={{ fontSize: '13px', color: MUTE }}>{s.venue}</div>
                </div>
                <a href="#tour" style={{ fontSize: '13px', fontWeight: 700, textDecoration: 'none', color: s.status === 'Sold out' ? MUTE : BG, background: s.status === 'Sold out' ? 'transparent' : SUNSET, border: s.status === 'Sold out' ? `1px solid ${LINE}` : 'none', borderRadius: '999px', padding: '8px 16px', whiteSpace: 'nowrap' }}>{s.status}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Never miss a drop</h2>
          <p style={{ color: MUTE, fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 2rem' }}>New singles, tour dates, and the occasional demo — straight to your inbox.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0.6rem', maxWidth: '420px', margin: '0 auto', flexDirection: mobile ? 'column' : 'row' }}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, padding: '14px 16px', borderRadius: '999px', border: `1px solid ${LINE}`, background: CARD, color: FG, fontSize: '15px', outline: 'none' }} />
            <button type="submit" style={{ background: SUNSET, color: BG, border: 'none', borderRadius: '999px', padding: '14px 26px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Sign up</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.12em' }}>NOVA SKY</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Spotify', 'Apple Music', 'Bandcamp', 'YouTube'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(244,238,242,0.3)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
