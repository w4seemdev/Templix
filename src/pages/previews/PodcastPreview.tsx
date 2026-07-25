/* ============================================================
   THE LONG TABLE - Podcast
   Warm espresso canvas, amber accent, cream type
   Styled (non-functional) player with inline-SVG controls
   Self-contained, responsive single-page site
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

const BG = '#1a1512';
const CARD = '#241d18';
const FG = '#f2e9de';
const MUTE = '#a3948a';
const AMBER = '#f2953a';
const LINE = 'rgba(242,233,222,0.09)';

const NAV = [
  { label: 'Episodes', href: '#episodes' },
  { label: 'Hosts', href: '#hosts' },
  { label: 'Subscribe', href: '#subscribe' },
];

const episodes = [
  { n: 142, t: 'Making things people actually want', guest: 'Sarah Chen · design lead at Foundry', dur: '1:12', plays: '84K' },
  { n: 141, t: 'Building a $10M business without raising a cent', guest: 'Tom Hargrove · founder, Ledgerly', dur: '0:58', plays: '112K' },
  { n: 140, t: 'The craft of writing that people finish', guest: 'Amara Boyd · essayist', dur: '1:04', plays: '76K' },
  { n: 139, t: 'What burnout taught me about ambition', guest: 'Devon Ruiz · ex-CTO', dur: '1:21', plays: '91K' },
];

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>;
}
const PLAY = 'M8 5v14l11-7z';
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
const BACK = 'M12.5 8V4l-6 6 6 6v-4c3.3 0 6 2.7 6 6a6 6 0 0 0-6-10z';

export default function PodcastPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(26,21,18,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: FG, textDecoration: 'none' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: AMBER, color: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zm7 8a7 7 0 0 1-14 0M12 18v3" size={15} /></span>
            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>The Long Table</span>
          </a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#subscribe" style={{ background: AMBER, color: BG, borderRadius: '999px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Subscribe</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1080px', margin: '0 auto', padding: mobile ? '3rem 1.25rem' : '5rem 2rem', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 1fr', gap: mobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER }}>Conversations · New every Tuesday</span>
          <h1 style={{ fontSize: mobile ? '2.7rem' : 'clamp(2.8rem,7vw,4.6rem)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '1rem 0 1.25rem' }}>
            Honest talk over<br />the long table.
          </h1>
          <p style={{ fontSize: mobile ? '1.02rem' : '1.15rem', color: MUTE, lineHeight: 1.7, maxWidth: '440px', margin: '0 0 2rem' }}>
            Long-form conversations with makers, founders, and writers about the work behind the work. Hosted by Jules Ferrand and Nia Osei.
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <a href="#episodes" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: AMBER, color: BG, borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}><Icon d={PLAY} size={16} /> Play latest</a>
            <a href="#subscribe" style={{ border: `1px solid ${LINE}`, color: FG, borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Where to listen</a>
          </div>
        </div>
        <div style={{ aspectRatio: '1/1', borderRadius: '20px', background: `linear-gradient(150deg,#3a2a1c,#f2953a 130%)`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.12), transparent 50%)' }} />
          <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '38%' }}>
            {[40, 70, 55, 90, 65, 100, 50, 80, 45, 72, 60].map((h, i) => (
              <span key={i} style={{ width: mobile ? '5px' : '7px', height: `${h}%`, borderRadius: '4px', background: 'rgba(26,21,18,0.6)' }} />
            ))}
          </div>
        </div>
      </section>

      <section id="episodes" style={{ maxWidth: '1080px', margin: '0 auto', padding: mobile ? '0 1.25rem 3.5rem' : '0 2rem 5rem' }}>
        {/* featured player */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: '18px', padding: mobile ? '1.25rem' : '1.75rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '0.9rem' : '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ width: mobile ? '54px' : '64px', height: mobile ? '54px' : '64px', borderRadius: '12px', background: `linear-gradient(150deg,#3a2a1c,${AMBER})`, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', color: AMBER, fontWeight: 700 }}>EP 142 · NOW PLAYING</div>
              <div style={{ fontSize: mobile ? '15px' : '17px', fontWeight: 700, lineHeight: 1.25 }}>Making things people actually want</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setPlaying(!playing)} aria-label="Play/pause" style={{ width: '46px', height: '46px', borderRadius: '50%', background: AMBER, color: BG, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon d={playing ? PAUSE : PLAY} size={22} /></button>
            <button aria-label="Skip back" style={{ background: 'none', border: 'none', color: MUTE, cursor: 'pointer', padding: 0, display: 'flex' }}><Icon d={BACK} /></button>
            <span style={{ fontSize: '11px', color: MUTE, fontVariantNumeric: 'tabular-nums' }}>18:04</span>
            <div style={{ flex: 1, height: '4px', borderRadius: '999px', background: 'rgba(242,233,222,0.1)' }}>
              <div style={{ width: '25%', height: '100%', borderRadius: '999px', background: AMBER }} />
            </div>
            <span style={{ fontSize: '11px', color: MUTE, fontVariantNumeric: 'tabular-nums' }}>1:12:30</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: mobile ? '1.6rem' : '2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>All episodes</h2>
          <a href="#episodes" style={{ fontSize: '13px', color: AMBER, fontWeight: 600, textDecoration: 'none' }}>Archive →</a>
        </div>
        {episodes.map(e => (
          <div key={e.n} style={{ display: 'flex', alignItems: 'center', gap: mobile ? '0.9rem' : '1.25rem', padding: '1rem 0', borderTop: `1px solid ${LINE}` }}>
            <button aria-label="Play episode" style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${LINE}`, background: 'none', color: AMBER, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon d={PLAY} size={16} /></button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: mobile ? '15px' : '16px', fontWeight: 700, lineHeight: 1.3 }}>{e.n}. {e.t}</div>
              <div style={{ fontSize: '13px', color: MUTE }}>{e.guest}</div>
            </div>
            {!mobile && <span style={{ fontSize: '12px', color: MUTE }}>{e.plays} plays</span>}
            <span style={{ fontSize: '13px', color: MUTE, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{e.dur}</span>
          </div>
        ))}
      </section>

      <section id="hosts" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 0' : '5rem 0', background: '#20191410' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)' }}>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 2rem' }}>Your hosts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
            {[
              { n: 'Jules Ferrand', r: 'Writer & former product lead', i: 'JF', c: '#f2953a' },
              { n: 'Nia Osei', r: 'Founder & essayist', i: 'NO', c: '#d98a5a' },
            ].map(h => (
              <div key={h.n} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', border: `1px solid ${LINE}`, borderRadius: '16px', background: CARD, padding: '1.5rem' }}>
                <span style={{ width: '58px', height: '58px', borderRadius: '50%', background: h.c, color: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>{h.i}</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 700 }}>{h.n}</div>
                  <div style={{ fontSize: '14px', color: MUTE }}>{h.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="subscribe" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Listen wherever you are</h2>
          <p style={{ color: MUTE, fontSize: '1.05rem', margin: '0 0 2rem' }}>New episodes every Tuesday morning. Follow the show so you never miss one.</p>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Apple Podcasts', 'Spotify', 'Overcast', 'RSS'].map(p => (
              <a key={p} href="#subscribe" style={{ border: `1px solid ${LINE}`, borderRadius: '999px', padding: '11px 20px', fontSize: '14px', fontWeight: 600, color: FG, textDecoration: 'none' }}>{p}</a>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '15px', fontWeight: 800 }}>The Long Table</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Twitter', 'Newsletter', 'Contact'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(242,233,222,0.3)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
