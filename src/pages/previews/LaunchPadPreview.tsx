/* ============================================================
   LAUNCHPAD — Startup Landing Template
   Warm dark with coral/orange gradient. Self-contained, inline
   styles only, fully responsive (375px → 1280px).
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

const T = { bg: '#0f0a10', panel: '#180f18', line: 'rgba(255,255,255,0.08)', ink: '#fdf2f4', mut: '#c8a8ad', dim: '#7d5f66', a: '#fb7185', a2: '#f97316' };
const grad = 'linear-gradient(120deg, #fb7185, #f97316)';
const NAV = [['Features', 'features'], ['Results', 'results'], ['Pricing', 'pricing'], ['FAQ', 'faq']] as const;

export default function LaunchPadPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Logos />
      <Features mobile={mobile} />
      <Results mobile={mobile} />
      <Pricing mobile={mobile} />
      <Faq mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(15,10,16,0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2a0f08" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5L3 21l4.5-1.5M12 15l-3-3a10 10 0 0 1 9-9 10 10 0 0 1-9 9zM15 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>LaunchPad</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>Sign in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 700, color: '#2a0f08', textDecoration: 'none' }}>Start free</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, color: '#2a0f08', textDecoration: 'none' }}>Start free</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '48px 20px 36px' : '80px 20px 56px', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 700, maxWidth: '120%', height: 420, background: 'radial-gradient(ellipse, rgba(251,113,133,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.03)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a }}>Backed by 2,000+ founders</span>
        <h1 style={{ fontSize: mobile ? '2.4rem' : '4rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '20px auto 0', maxWidth: 720 }}>
          Launch your startup<br /><span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in a weekend</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: T.mut, lineHeight: 1.7, margin: '18px auto 0', maxWidth: 540 }}>
          Auth, payments, email, and analytics — pre-wired and production-ready. Skip the boilerplate and go straight to building what makes you different.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 700, color: '#2a0f08', textDecoration: 'none' }}>Get the kit</a>
          <a href="#features" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>See what's inside</a>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: `${mobile ? 34 : 52}px auto 0`, position: 'relative', borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.5), 0 0 60px rgba(251,113,133,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderBottom: `1px solid ${T.line}` }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ padding: mobile ? 20 : 32, textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 14 }}>
            {[['Auth ready', 'Email, OAuth, magic links'], ['Payments', 'Stripe subscriptions wired'], ['Emails', 'Transactional + drip flows']].map(([t, d]) => (
              <div key={t} style={{ borderRadius: 12, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.02)', padding: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: grad, marginBottom: 12 }} />
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 12, color: T.dim, marginTop: 3 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '30px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 12, color: T.dim, marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Shipped by teams from</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px 40px', flexWrap: 'wrap' }}>
          {['Nova', 'Kettle', 'Bramble', 'Ollie', 'Wispr', 'Tandem'].map(n => <span key={n} style={{ fontSize: 17, fontWeight: 700, color: '#4a3238', letterSpacing: '-0.02em' }}>{n}</span>)}
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  card: 'M3 5h18v14H3zM3 10h18',
  mail: 'M4 4h16v16H4zM4 6l8 6 8-6',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  db: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5',
  ship: 'M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M19 12l-7-3-7 3M12 2v7',
};
function LIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['lock', 'Authentication', 'Email/password, OAuth, and magic links with sessions and roles built in.'],
    ['card', 'Payments', 'Stripe subscriptions, one-time payments, and a billing portal ready to go.'],
    ['mail', 'Transactional email', 'Beautiful welcome, receipt, and reset emails wired to a reliable provider.'],
    ['db', 'Database & ORM', 'Type-safe schema, migrations, and seed data so you ship features, not plumbing.'],
    ['chart', 'Analytics', 'Privacy-friendly product analytics and a founder dashboard from day one.'],
    ['ship', 'One-command deploy', 'Push to deploy with preview environments and rollbacks preconfigured.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="What's inside" title="The boring parts, already done" sub="A production-grade foundation so you can focus on your idea.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><LIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Results({ mobile }: { mobile: boolean }) {
  const stats: [string, string][] = [['3 days', 'avg. time to launch'], ['$0', 'boilerplate to write'], ['2,000+', 'startups shipped'], ['4.9/5', 'founder rating']];
  return (
    <Section id="results" mobile={mobile} alt tag="Results" title="Founders ship weeks sooner" sub="Real outcomes from teams who started with LaunchPad.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.bg, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: mobile ? '1.7rem' : '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
            <div style={{ fontSize: 13, color: T.mut, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', borderRadius: 18, border: `1px solid ${T.line}`, background: T.bg, padding: mobile ? 24 : 32, textAlign: 'center' }}>
        <p style={{ fontSize: mobile ? '1.1rem' : '1.35rem', fontWeight: 600, lineHeight: 1.5, margin: '0 0 18px' }}>“We went from idea to paying customers in 9 days. LaunchPad saved us at least a month of setup.”</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#2a0f08' }}>JM</div>
          <div style={{ textAlign: 'left' }}><div style={{ fontSize: 14, fontWeight: 600 }}>Jordan Meyer</div><div style={{ fontSize: 12, color: T.dim }}>Founder, Kettle</div></div>
        </div>
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const plans = [
    { name: 'Starter', price: '$0', note: '', desc: 'Kick the tires.', feats: ['Core starter kit', '1 project', 'Community Discord'], hot: false },
    { name: 'Pro', price: '$99', note: 'one-time', desc: 'Everything to launch.', feats: ['All modules & UI', 'Unlimited projects', 'Stripe & email flows', 'Lifetime updates'], hot: true },
    { name: 'Team', price: '$299', note: 'one-time', desc: 'For agencies & teams.', feats: ['Everything in Pro', 'Team license (10 devs)', 'Priority support', 'Onboarding call'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} tag="Pricing" title="Pay once, ship forever" sub="No subscriptions. One purchase, lifetime updates.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(251,113,133,0.5)' : `1px solid ${T.line}`, background: p.hot ? 'rgba(251,113,133,0.06)' : T.panel, padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 700, color: '#2a0f08' }}>Best value</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.3rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{p.price}</span><span style={{ fontSize: 13, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: p.hot ? grad : 'rgba(255,255,255,0.06)', color: p.hot ? '#2a0f08' : '#fff', marginBottom: 20 }}>{p.price === '$0' ? 'Download' : 'Get ' + p.name}</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Faq({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(0);
  const qs = [
    ['What tech stack does it use?', 'React 19, TypeScript, and Vite with a type-safe database layer — the modern, boring, reliable choices.'],
    ['Do I own what I build?', 'Yes. You get the full source and a license to build unlimited products. You only cannot resell the kit itself.'],
    ['Are updates really free?', 'Every Pro and Team purchase includes lifetime updates. New modules and fixes land in your repo.'],
    ['Can I get a refund?', 'If the kit is not for you, email us within 14 days for a no-questions-asked refund.'],
  ];
  return (
    <Section id="faq" mobile={mobile} alt tag="FAQ" title="Questions, answered" sub="Everything you might want to know before buying.">
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {qs.map(([q, a], i) => (
          <div key={q} style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: T.bg, overflow: 'hidden' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', padding: '18px 20px', textAlign: 'left', color: T.ink }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{q}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}><path d="M12 5v14M5 12h14" /></svg>
            </button>
            {open === i && <div style={{ padding: '0 20px 18px', fontSize: 14, color: T.mut, lineHeight: 1.7 }}>{a}</div>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(251,113,133,0.28)', background: 'linear-gradient(120deg, rgba(251,113,133,0.12), rgba(249,115,22,0.08))', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Your weekend project starts now</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Grab the kit, clone the repo, and have something live by Sunday.</p>
        <a href="#pricing" style={{ display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, color: '#2a0f08', textDecoration: 'none' }}>Get LaunchPad</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#160d16' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 50 }}>
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
  const cols = [['Product', ['Features', 'Pricing', 'Changelog', 'Roadmap']], ['Resources', ['Docs', 'Guides', 'Blog', 'Support']], ['Company', ['About', 'Affiliates', 'Terms', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>LaunchPad</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>The starter kit that gets your startup live in a weekend.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#5a3f45', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#4a3238' }}>© {new Date().getFullYear()} LaunchPad Kit.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'GitHub', 'YouTube'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#4a3238', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
