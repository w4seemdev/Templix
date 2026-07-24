/* ============================================================
   PIXELFORGE — Indie Game Studio Template
   Near-black with neon magenta & cyan. Fully responsive.
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
  bg: '#0a0812',
  surface: '#14101f',
  ink: '#f2eefb',
  muted: '#a29bbd',
  faint: '#6b6486',
  line: 'rgba(255,255,255,0.08)',
  magenta: '#f0399f',
  cyan: '#22d3ee',
};
const sans = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";
const container: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', width: '100%' };

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '1px' }} aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? C.cyan : 'none'} stroke={s <= Math.round(rating) ? C.cyan : '#3a3550'} strokeWidth="1.5"><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>
      ))}
    </span>
  );
}

const genres = ['All', 'Roguelike', 'Puzzle', 'Adventure', 'Platformer'];
const games = [
  { name: 'Neon Drifter', genre: 'Roguelike', status: 'Out now', price: '$19.99', rating: 4.8, platforms: ['PC', 'Switch'], from: '#f0399f', to: '#3a0a2e' },
  { name: 'Lumen', genre: 'Puzzle', status: 'Out now', price: '$14.99', rating: 4.9, platforms: ['PC', 'iOS'], from: '#22d3ee', to: '#0a2e3a' },
  { name: 'Hollow Peaks', genre: 'Adventure', status: 'Early access', price: '$24.99', rating: 4.6, platforms: ['PC'], from: '#8b5cf6', to: '#2a1a4a' },
  { name: 'Byte Jumper', genre: 'Platformer', status: 'Out now', price: '$9.99', rating: 4.7, platforms: ['PC', 'Switch', 'Xbox'], from: '#f59e0b', to: '#3a2607' },
  { name: 'Starfall', genre: 'Roguelike', status: 'Wishlist', price: 'Soon', rating: 4.9, platforms: ['PC', 'PS5'], from: '#3b82f6', to: '#0a1e3a' },
  { name: 'Glitchward', genre: 'Puzzle', status: 'Out now', price: '$12.99', rating: 4.5, platforms: ['PC', 'iOS'], from: '#ec4899', to: '#3a0a26' },
];

export default function PixelGameStudioPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Games />
      <Featured />
      <Community />
      <Wishlist />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
      <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: `linear-gradient(135deg,${C.magenta},${C.cyan})`, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px', padding: '5px' }}>
        {[0, 1, 2, 3].map((i) => <span key={i} style={{ background: i === 1 ? 'transparent' : 'rgba(10,8,18,0.55)', borderRadius: '1px' }} />)}
      </span>
      <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em' }}>PixelForge</span>
    </span>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Games', 'Studio', 'Community'];
  const anchors = ['games', 'featured', 'community'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,8,18,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none', color: C.ink }}><Logo /></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#wishlist" style={{ background: C.magenta, color: '#fff', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Wishlist</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 400px at 20% 0%, rgba(240,57,159,0.2), transparent 60%), radial-gradient(700px 400px at 90% 20%, rgba(34,211,238,0.16), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '52px 20px' : '92px 20px', position: 'relative', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '36px' : '48px', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.1em', color: C.cyan, textTransform: 'uppercase' }}>// independent studio · est. 2019</span>
          <h1 style={{ fontSize: m ? '2.8rem' : '4.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '18px 0 20px' }}>We make games with <span style={{ color: C.magenta }}>soul</span>.</h1>
          <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.65, maxWidth: '440px', margin: '0 0 28px' }}>A tiny team crafting hand-built worlds — neon roguelikes, tactile puzzles and stories worth staying up for.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#games" style={{ background: C.magenta, color: '#fff', borderRadius: '8px', padding: '14px 30px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Play our games</a>
            <a href="#featured" style={{ border: `1px solid ${C.cyan}`, color: C.cyan, borderRadius: '8px', padding: '14px 30px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Watch trailer
            </a>
          </div>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', background: `linear-gradient(150deg,${C.magenta},#1a0a2e 70%)`, border: `1px solid ${C.line}` }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
            <span style={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.4)', borderRadius: '999px', padding: '5px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em' }}>NOW PLAYING</span>
            <div>
              <span style={{ fontSize: '1.7rem', fontWeight: 800, display: 'block' }}>Neon Drifter</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Roguelike · PC & Switch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Games() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? games : games.filter((g) => g.genre === active);
  const statusColor = (s: string) => (s === 'Out now' ? C.cyan : s === 'Early access' ? '#f59e0b' : C.magenta);
  return (
    <section id="games" style={{ ...container, padding: m ? '48px 20px' : '84px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Our games</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {genres.map((g) => (
            <button key={g} onClick={() => setActive(g)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '8px', padding: '9px 16px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === g ? C.magenta : C.line}`, background: active === g ? C.magenta : 'transparent', color: active === g ? '#fff' : C.muted }}>{g}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '16px' : '24px' }}>
        {list.map((g) => (
          <article key={g.name} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '16/10', background: `linear-gradient(150deg,${g.from},${g.to})`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '14px' }}>
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.45)', color: statusColor(g.status), borderRadius: '999px', padding: '4px 10px', fontSize: '11px', fontWeight: 700 }}>{g.status}</span>
            </div>
            <div style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{g.name}</h3>
                <span style={{ fontSize: '14px', fontWeight: 700, color: C.cyan }}>{g.price}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}><Stars rating={g.rating} /><span style={{ fontSize: '12px', color: C.faint }}>{g.genre}</span></div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {g.platforms.map((p) => <span key={p} style={{ fontFamily: mono, fontSize: '10px', color: C.muted, border: `1px solid ${C.line}`, borderRadius: '4px', padding: '3px 8px' }}>{p}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const m = useIsMobile();
  return (
    <section id="featured" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '32px' : '52px', alignItems: 'center' }}>
        <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', background: `linear-gradient(150deg,${C.cyan},#0a1e2e 75%)`, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </div>
        <div>
          <span style={{ fontFamily: mono, fontSize: '12px', color: C.magenta, letterSpacing: '0.08em', textTransform: 'uppercase' }}>// coming 2025</span>
          <h2 style={{ fontSize: m ? '2rem' : '2.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08, margin: '14px 0 16px' }}>Starfall — our biggest world yet</h2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.75, margin: '0 0 24px' }}>A hand-drawn roguelike across a dying galaxy. Procedural star systems, permadeath that matters, and a soundtrack recorded with a live orchestra. Two years in the making.</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
            {[['48', 'Star systems'], ['200+', 'Weapons'], ['12hr', 'Original score']].map(([n, l]) => (
              <div key={l}><div style={{ fontSize: '1.5rem', fontWeight: 800, color: C.cyan }}>{n}</div><div style={{ fontSize: '12px', color: C.faint }}>{l}</div></div>
            ))}
          </div>
          <a href="#wishlist" style={{ background: C.magenta, color: '#fff', borderRadius: '8px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Wishlist on Steam</a>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const m = useIsMobile();
  const items = [['1.4M', 'Players worldwide'], ['92%', 'Positive reviews'], ['38', 'Awards & nominations'], ['180k', 'Discord members']];
  return (
    <section id="community" style={{ ...container, padding: m ? '52px 20px' : '84px 20px' }}>
      <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 40px' }}>Built with our community</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: '18px' }}>
        {items.map(([n, l]) => (
          <div key={l} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: '14px', padding: '26px', textAlign: 'center' }}>
            <div style={{ fontSize: m ? '1.9rem' : '2.4rem', fontWeight: 900, background: `linear-gradient(135deg,${C.magenta},${C.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
            <div style={{ fontSize: '13px', color: C.muted, marginTop: '6px' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Wishlist() {
  const m = useIsMobile();
  return (
    <section id="wishlist" style={{ ...container, padding: m ? '20px 20px 56px' : '40px 20px 88px' }}>
      <div style={{ borderRadius: '20px', border: `1px solid ${C.line}`, background: 'linear-gradient(135deg,rgba(240,57,159,0.16),rgba(34,211,238,0.12))', padding: m ? '36px 24px' : '52px', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.8rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Never miss a release</h2>
        <p style={{ fontSize: m ? '1rem' : '1.1rem', color: C.muted, margin: '0 0 26px' }}>Join the mailing list for launch dates, playtests and behind-the-scenes devlogs.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexDirection: m ? 'column' : 'row' }}>
          <input type="email" placeholder="player@email.com" style={{ flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: '8px', padding: '13px 16px', color: C.ink, fontSize: '14px' }} />
          <button type="submit" style={{ background: C.magenta, color: '#fff', border: 'none', borderRadius: '8px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Sign me up</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '250px' }}><Logo /><p style={{ fontSize: '14px', color: C.faint, marginTop: '12px', lineHeight: 1.7 }}>A tiny independent studio making hand-built worlds.</p></div>
        {[{ h: 'Games', l: ['Neon Drifter', 'Lumen', 'Hollow Peaks', 'Starfall'] }, { h: 'Studio', l: ['About', 'Careers', 'Press kit', 'Devlog'] }, { h: 'Connect', l: ['Discord', 'Steam', 'YouTube', 'Contact'] }].map((col) => (
          <div key={col.h}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.faint, margin: '0 0 14px' }}>{col.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>{col.l.map((l) => <li key={l}><a href="#games" style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}>{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div style={{ ...container, marginTop: '32px', paddingTop: '20px', borderTop: `1px solid ${C.line}` }}><span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} PixelForge Studio. All rights reserved.</span></div>
    </footer>
  );
}
