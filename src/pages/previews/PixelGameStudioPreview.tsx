import { useState } from 'react';

/* ============================================================
   PIXEL — Game Studio Template
   Dark #0c0a14 · neon magenta #e879f9 + neon green #4ade80
   Retro scanlines · monospace labels · glow shadows
   ============================================================ */

const MAGENTA = '#e879f9';
const GREEN = '#4ade80';
const BG = '#0c0a14';
const PANEL = '#161225';
const BORDER = 'rgba(232,121,249,0.18)';
const DIM = '#8b85a0';
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const navLinks = ['Games', 'Studio', 'Press', 'Careers', 'Blog'];

const games = [
  { title: 'Neon Drift Zero', genre: 'Arcade Racer', status: 'OUT NOW', platforms: ['PC', 'PS5', 'Switch'], img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', accent: MAGENTA },
  { title: 'Starforge Tactics', genre: 'Turn-Based Strategy', status: 'OUT NOW', platforms: ['PC', 'Xbox'], img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', accent: GREEN },
  { title: 'Hollow Signal', genre: 'Atmospheric Horror', status: '2027', platforms: ['PC', 'PS5'], img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80', accent: MAGENTA },
  { title: 'Mecha Garden', genre: 'Cozy Builder', status: 'WISHLIST', platforms: ['PC', 'Switch'], img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', accent: GREEN },
];

const screenshots = [
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
  'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
];

const sysReqs = [
  { part: 'OS', min: 'Windows 10 64-bit', rec: 'Windows 11 64-bit' },
  { part: 'CPU', min: 'Ryzen 5 3600', rec: 'Ryzen 7 5800X' },
  { part: 'GPU', min: 'GTX 1660 Super', rec: 'RTX 4070' },
  { part: 'RAM', min: '8 GB', rec: '16 GB' },
  { part: 'Storage', min: '40 GB SSD', rec: '40 GB NVMe' },
];

const team = [
  { name: 'Rosa Lindqvist', role: 'Studio Director', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Kenji Mori', role: 'Creative Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Ada Nwosu', role: 'Lead Engineer', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
  { name: 'Tom Becker', role: 'Art Director', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
];

const pressAssets = [
  { name: 'Logo pack', desc: 'SVG + PNG, light and dark lockups', size: '4.2 MB' },
  { name: 'Key art', desc: '4K stills for all released titles', size: '188 MB' },
  { name: 'Fact sheet', desc: 'Studio history, founder bios, awards', size: '0.3 MB' },
  { name: 'B-roll', desc: '1080p60 gameplay capture reels', size: '1.1 GB' },
];

const jobs = [
  { title: 'Senior Gameplay Programmer', dept: 'Engineering', loc: 'Remote (EU)' },
  { title: 'Technical Artist', dept: 'Art', loc: 'Stockholm / Hybrid' },
  { title: 'Narrative Designer', dept: 'Design', loc: 'Remote (Worldwide)' },
];

const stats = [
  { value: '4', label: 'Shipped titles' },
  { value: '6.5M', label: 'Players worldwide' },
  { value: '94%', label: 'Steam positive' },
  { value: '12', label: 'Industry awards' },
];

const footerCols = [
  { title: 'Games', links: ['Neon Drift Zero', 'Starforge Tactics', 'Hollow Signal', 'Mecha Garden'] },
  { title: 'Studio', links: ['About', 'Team', 'Awards', 'Contact'] },
  { title: 'More', links: ['Press kit', 'Careers', 'Merch store', 'Discord'] },
];

export default function PixelGameStudioPreview() {
  const [activeShot, setActiveShot] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: '#ece9f6', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(12,10,20,0.88)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `linear-gradient(135deg, ${MAGENTA}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a0a1f', fontWeight: 800, fontSize: '16px', boxShadow: `0 0 18px rgba(232,121,249,0.5)` }}>P</div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.14em', fontFamily: MONO }}>PIXEL</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.6rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13px', fontWeight: 600, color: DIM, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: MONO }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: GREEN, color: '#06220f', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', fontFamily: MONO, boxShadow: '0 0 18px rgba(74,222,128,0.35)' }}>WISHLIST</a>
        </div>
      </header>

      {/* ── Hero: flagship game ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80" alt="Neon Drift Zero key art" style={{ width: '100%', height: '560px', objectFit: 'cover', display: 'block', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0c0a14 8%, rgba(12,10,20,0.3) 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem 3.5rem', width: '100%' }}>
            <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: GREEN, letterSpacing: '0.18em' }}>// FLAGSHIP TITLE · OUT NOW</span>
            <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 0.98, margin: '0.8rem 0 1rem', textShadow: `0 0 40px rgba(232,121,249,0.45)` }}>
              NEON DRIFT <span style={{ color: MAGENTA }}>ZERO</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#c9c3dd', maxWidth: '520px', lineHeight: 1.7, margin: '0 0 1.8rem' }}>
              Outrun the grid. An anti-gravity arcade racer set in a city that rebuilds itself every lap — 6.5 million drifters and counting.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: MAGENTA, color: '#1a0a1f', borderRadius: '8px', padding: '13px 28px', fontSize: '14px', fontWeight: 800, textDecoration: 'none', fontFamily: MONO, boxShadow: '0 0 24px rgba(232,121,249,0.45)' }}>▶ PLAY TRAILER</a>
              <a href="#" style={{ border: `1px solid ${MAGENTA}`, color: MAGENTA, borderRadius: '8px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: MONO }}>BUY — $29.99</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ borderBottom: `1px solid ${BORDER}`, padding: '2.5rem 1.5rem', background: PANEL }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: MONO, color: GREEN }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: DIM, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Games grid ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: MAGENTA, letterSpacing: '0.18em' }}>// OUR GAMES</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0.6rem 0 0' }}>Worlds we have shipped</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {games.map(g => (
              <div key={g.title} style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <img src={g.img} alt={g.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: g.accent, color: '#120818', fontFamily: MONO, fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', borderRadius: '5px', padding: '4px 9px' }}>{g.status}</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{g.title}</h3>
                  <p style={{ fontSize: '12.5px', color: DIM, margin: '0 0 0.9rem', fontFamily: MONO }}>{g.genre}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {g.platforms.map(p => (
                      <span key={p} style={{ border: `1px solid ${BORDER}`, borderRadius: '5px', padding: '3px 8px', fontSize: '10.5px', fontFamily: MONO, color: '#b5aecb' }}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured detail: screenshots + sys reqs ── */}
      <section style={{ padding: '5rem 1.5rem', background: PANEL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: GREEN, letterSpacing: '0.18em' }}>// INSIDE THE GRID</span>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 900, margin: '0.6rem 0 2.5rem' }}>Neon Drift Zero — up close</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            <div>
              <img src={screenshots[activeShot]} alt={`Screenshot ${activeShot + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', border: `1px solid ${BORDER}`, display: 'block' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                {screenshots.map((s, i) => (
                  <button key={s} onClick={() => setActiveShot(i)} style={{ padding: 0, border: i === activeShot ? `2px solid ${MAGENTA}` : `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: 'none', opacity: i === activeShot ? 1 : 0.55 }}>
                    <img src={s} alt={`Thumb ${i + 1}`} style={{ width: '90px', height: '54px', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color: '#b5aecb', margin: '0 0 1rem' }}>SYSTEM REQUIREMENTS</h3>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', background: 'rgba(232,121,249,0.08)', padding: '10px 14px', fontFamily: MONO, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: MAGENTA }}>
                  <span>PART</span><span>MINIMUM</span><span>RECOMMENDED</span>
                </div>
                {sysReqs.map(r => (
                  <div key={r.part} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', padding: '11px 14px', borderTop: `1px solid ${BORDER}`, fontSize: '13px' }}>
                    <span style={{ fontFamily: MONO, color: DIM, fontSize: '12px' }}>{r.part}</span>
                    <span style={{ color: '#c9c3dd' }}>{r.min}</span>
                    <span style={{ color: GREEN }}>{r.rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Studio / team ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: MAGENTA, letterSpacing: '0.18em' }}>// THE STUDIO</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, margin: '0.6rem 0 1rem' }}>Small team. Loud games.</h2>
            <p style={{ color: DIM, fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
              Pixel is a 28-person independent studio founded in Stockholm in 2018. We make tightly-scoped games with strong aesthetics and stronger feel — and we ship them when they are ready.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {team.map(m => (
              <div key={m.name} style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
                <img src={m.avatar} alt={m.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.9rem', display: 'block', border: `2px solid ${MAGENTA}` }} />
                <p style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 3px' }}>{m.name}</p>
                <p style={{ fontSize: '12px', color: GREEN, margin: 0, fontFamily: MONO }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press kit ── */}
      <section style={{ padding: '5rem 1.5rem', background: PANEL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: GREEN, letterSpacing: '0.18em' }}>// PRESS</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 900, margin: '0.6rem 0 0.6rem' }}>Press kit</h2>
            <p style={{ color: DIM, fontSize: '0.95rem', margin: 0 }}>Writing about our games? Everything you need, ready to download. No emails required.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {pressAssets.map(a => (
              <div key={a.name} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>{a.name}</h3>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>{a.size}</span>
                </div>
                <p style={{ fontSize: '13px', color: DIM, lineHeight: 1.6, margin: '0 0 1rem' }}>{a.desc}</p>
                <a href="#" style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: MAGENTA, textDecoration: 'none', letterSpacing: '0.08em' }}>↓ DOWNLOAD</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: MAGENTA, letterSpacing: '0.18em' }}>// JOIN US</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 900, margin: '0.6rem 0 0' }}>Open roles</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {jobs.map(j => (
              <a key={j.title} href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '1.25rem 1.5rem', textDecoration: 'none', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 3px', color: '#ece9f6' }}>{j.title}</p>
                  <p style={{ fontSize: '12px', color: DIM, margin: 0, fontFamily: MONO }}>{j.dept} · {j.loc}</p>
                </div>
                <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: GREEN }}>APPLY →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ border: `1px solid ${BORDER}`, background: `linear-gradient(135deg, rgba(232,121,249,0.12), rgba(74,222,128,0.08))`, borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 900, margin: '0 0 0.9rem' }}>Get patch notes before the patch</h2>
            <p style={{ color: DIM, fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Dev logs, beta keys, and the occasional synthwave playlist. One email a month, zero spam.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '12px 18px', fontSize: '13px', color: DIM, fontFamily: MONO, minWidth: '240px', textAlign: 'left' }}>player@email.gg</span>
              <a href="#" style={{ background: GREEN, color: '#06220f', borderRadius: '8px', padding: '12px 26px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', fontFamily: MONO }}>SUBSCRIBE</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '3.5rem 1.5rem 2rem', background: PANEL }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: `linear-gradient(135deg, ${MAGENTA}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a0a1f', fontWeight: 800, fontSize: '14px' }}>P</div>
                <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '0.14em', fontFamily: MONO }}>PIXEL</span>
              </div>
              <p style={{ fontSize: '13.5px', color: DIM, lineHeight: 1.7, margin: 0 }}>
                Independent game studio. Stockholm born, internet raised.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5c5570', margin: '0 0 1rem', fontFamily: MONO }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: DIM, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: '#5c5570', margin: 0, fontFamily: MONO }}>© 2026 PIXEL INTERACTIVE AB</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Discord', 'Steam', 'YouTube', 'Bluesky'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12px', color: '#5c5570', textDecoration: 'none', fontFamily: MONO }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
