/* ============================================================
   ORBIT — Mobile App Landing Template
   Dark with blue/indigo accent + phone mockups. Self-contained,
   inline styles only, fully responsive (375px → 1280px).
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

const T = { bg: '#070a14', panel: '#0d1220', line: 'rgba(255,255,255,0.08)', ink: '#eef3ff', mut: '#93a1c4', dim: '#5a6789', a: '#3b82f6', a2: '#6366f1' };
const grad = 'linear-gradient(135deg, #3b82f6, #6366f1)';
const NAV = [['Features', 'features'], ['Screens', 'screens'], ['Reviews', 'reviews'], ['Get app', 'download']] as const;

export default function AppLandingPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Features mobile={mobile} />
      <Screens mobile={mobile} />
      <Reviews mobile={mobile} />
      <Download mobile={mobile} />
      <Foot mobile={mobile} />
    </div>
  );
}

function StoreButtons({ compact }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: compact ? 'flex-start' : 'center' }}>
      {[['Apple', 'App Store'], ['Google', 'Google Play']].map(([top, bot]) => (
        <a key={bot} href="#download" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#0b1020', borderRadius: 12, padding: '10px 18px', textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0b1020">{top === 'Apple' ? <path d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.7 2.3 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.2c.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.6zM14.3 5.6c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.6-.9 2.6 1 0 2-.5 2.5-1.2z" /> : <path d="M4 3l11 9L4 21V3zm13 7.5l3 1.5-3 1.5-2-1.5 2-1.5z" />}</svg>
          <span style={{ textAlign: 'left' }}><span style={{ display: 'block', fontSize: 10, opacity: 0.7 }}>Download on</span><span style={{ display: 'block', fontSize: 14, fontWeight: 700, marginTop: -1 }}>{bot}</span></span>
        </a>
      ))}
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(7,10,20,0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(45 12 12)" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Orbit</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <a href="#download" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Download</a>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</div>}
    </header>
  );
}

function Phone({ tone, children, tilt }: { tone: string; children: React.ReactNode; tilt?: number }) {
  return (
    <div style={{ width: 210, borderRadius: 34, border: '8px solid #1a2236', background: '#0a0f1c', padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', transform: tilt ? `rotate(${tilt}deg)` : undefined }}>
      <div style={{ borderRadius: 26, overflow: 'hidden', background: tone, minHeight: 400, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 70, height: 18, background: '#0a0f1c', borderRadius: 10 }} />
        {children}
      </div>
    </div>
  );
}

function AppScreen() {
  return (
    <div style={{ padding: '38px 16px 16px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div><div style={{ fontSize: 11, opacity: 0.7 }}>Good evening</div><div style={{ fontSize: 17, fontWeight: 800 }}>Your day</div></div>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
      </div>
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.14)', padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 11, opacity: 0.8 }}>Focus streak</div>
        <div style={{ fontSize: 26, fontWeight: 900, margin: '2px 0' }}>12 days</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{[70, 90, 55, 100, 80, 95, 60].map((h, i) => <div key={i} style={{ flex: 1, height: 30, borderRadius: 4, background: 'rgba(255,255,255,0.25)', position: 'relative' }}><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${h}%`, borderRadius: 4, background: '#fff' }} /></div>)}</div>
      </div>
      {['Morning routine', 'Deep work · 2h', 'Read 20 pages'].map((t, i) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12, background: 'rgba(255,255,255,0.1)', padding: '11px 12px', marginBottom: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: 6, border: '2px solid rgba(255,255,255,0.6)', background: i === 0 ? '#fff' : 'transparent' }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, textDecoration: i === 0 ? 'line-through' : 'none', opacity: i === 0 ? 0.6 : 1 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '48px 20px 40px' : '72px 20px 56px' }}>
      <div style={{ position: 'absolute', top: -100, right: -60, width: 460, height: 460, background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center', position: 'relative' }}>
        <div style={{ textAlign: mobile ? 'center' : 'left' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(59,130,246,0.08)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a }}>Apple Editor's Choice 2025</span>
          <h1 style={{ fontSize: mobile ? '2.4rem' : '3.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '20px 0 0' }}>
            Build better habits, <span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>one day at a time</span>
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px auto 0', maxWidth: 460, marginLeft: mobile ? 'auto' : 0, marginRight: mobile ? 'auto' : 0 }}>
            Orbit turns your goals into simple daily rituals — with gentle reminders, streaks, and insights that actually keep you going.
          </p>
          <div style={{ marginTop: 26, display: 'flex', justifyContent: mobile ? 'center' : 'flex-start' }}><StoreButtons compact={!mobile} /></div>
          <div style={{ display: 'flex', gap: 20, marginTop: 24, justifyContent: mobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
            {[['2M+', 'downloads'], ['4.9★', 'App Store'], ['86%', 'stick past 30d']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: 20, fontWeight: 800 }}>{v}</div><div style={{ fontSize: 12, color: T.dim }}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 40 : 0 }}>
          <Phone tone={grad}><AppScreen /></Phone>
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.5-1.1 2.5-2.5 0-1-.6-1.9-1.2-2.7C11.5 11 11 10 11 9c-2 1-3.5 3-3.5 5.5zM12 2C9 6 6 8 6 13a6 6 0 0 0 12 0c0-2-1-3.5-2-5-.5 1.5-1.5 2-2.5 2C12 8 13 5 12 2z',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  cloud: 'M18 10a4 4 0 0 0-7.7-1.3A3.5 3.5 0 1 0 6 15h12a3 3 0 0 0 0-6z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
};
function OIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['target', 'Goals that stick', 'Break big ambitions into tiny daily actions you can actually complete.'],
    ['flame', 'Streaks & rewards', 'Stay motivated with streaks, milestones, and satisfying little wins.'],
    ['bell', 'Smart reminders', 'Nudges that adapt to your routine — never annoying, always on time.'],
    ['chart', 'Real insights', 'See your progress with clear weekly trends and honest, useful stats.'],
    ['cloud', 'Syncs everywhere', 'Your habits follow you across iPhone, iPad, Android, and web.'],
    ['users', 'Accountability', 'Share goals with a friend and cheer each other on to the finish.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="Features" title="Everything you need to follow through" sub="Thoughtfully designed to make good habits effortless.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><OIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Screens({ mobile }: { mobile: boolean }) {
  const tones = ['linear-gradient(160deg,#6366f1,#8b5cf6)', 'linear-gradient(160deg,#3b82f6,#06b6d4)', 'linear-gradient(160deg,#0ea5e9,#6366f1)'];
  return (
    <Section id="screens" mobile={mobile} alt tag="Screens" title="Beautiful, and a joy to use" sub="Every screen is crafted to feel calm and focused.">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: mobile ? 16 : 28, flexWrap: 'wrap' }}>
        {tones.map((tone, i) => (
          <Phone key={i} tone={tone} tilt={mobile ? 0 : (i - 1) * 4}>
            <AppScreen />
          </Phone>
        )).slice(0, mobile ? 1 : 3)}
      </div>
    </Section>
  );
}

function Reviews({ mobile }: { mobile: boolean }) {
  const t = [
    ['The only habit app that ever stuck for me. The streaks are weirdly addictive in the best way.', 'Maya T.'],
    ['Clean, calm, and it just works. I have kept a 90-day meditation streak thanks to Orbit.', 'Chris D.'],
    ['Reminders are smart enough that I actually listen to them. Worth every penny.', 'Sam O.'],
  ];
  return (
    <Section id="reviews" mobile={mobile} tag="Reviews" title="Loved on the App Store" sub="4.9 stars across 120,000+ ratings.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
        {t.map(([q, n]) => (
          <div key={n} style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.panel, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 3 }}>{[0, 1, 2, 3, 4].map(i => <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={T.a}><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6 3.5 1.6-6.8L2 9.1l7-.6z" /></svg>)}</div>
            <p style={{ fontSize: 14.5, color: T.mut, lineHeight: 1.7, margin: 0, flex: 1 }}>“{q}”</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{n}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Download({ mobile }: { mobile: boolean }) {
  return (
    <section id="download" style={{ padding: mobile ? '52px 20px 64px' : '72px 20px 80px', borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(59,130,246,0.28)', background: 'linear-gradient(135deg, rgba(59,130,246,0.14), rgba(99,102,241,0.08))', padding: mobile ? '40px 24px' : '56px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Start your first streak today</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Free to download. Orbit Plus unlocks unlimited goals and insights.</p>
        <StoreButtons />
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#0b0f1c' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: T.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['App', ['Features', 'Screens', 'Pricing', 'What\'s new']], ['Support', ['Help center', 'Contact', 'Status', 'Privacy']], ['Company', ['About', 'Blog', 'Careers', 'Press']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Orbit</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>The calm habit tracker that helps you follow through.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#3a4463', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#33405f' }}>© {new Date().getFullYear()} Orbit App.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'Instagram', 'TikTok'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#33405f', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
