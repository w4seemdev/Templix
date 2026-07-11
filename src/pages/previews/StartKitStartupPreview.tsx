/* ============================================================
   STARTKIT — SaaS starter kit / boilerplate (landing)
   Dark slate, electric blue primary, coral secondary, mono code
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

const BG = '#0d1018';
const CARD = '#141926';
const FG = '#e9edf6';
const MUTE = '#8790a6';
const BLUE = '#5b8def';
const CORAL = '#ff7a59';
const LINE = 'rgba(233,237,246,0.09)';
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Stack', href: '#stack' },
  { label: 'Pricing', href: '#pricing' },
];

export default function StartKitStartupPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: FG, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(13,16,24,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: FG, textDecoration: 'none' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: `linear-gradient(135deg,${BLUE},${CORAL})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px', color: BG }}>S</span>
            <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.02em' }}>StartKit</span>
          </a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#pricing" style={{ background: BLUE, color: BG, borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>Get StartKit</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FG, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: FG, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '1140px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5.5rem 2rem', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.05fr 1fr', gap: mobile ? '2.5rem' : '3.5rem', alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: MONO, fontSize: '12px', color: CORAL, border: `1px solid ${LINE}`, borderRadius: '999px', padding: '5px 14px', marginBottom: '1.5rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: CORAL }} /> v3.0 — now with billing built in
          </span>
          <h1 style={{ fontSize: mobile ? '2.7rem' : 'clamp(2.8rem,6.5vw,4.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.03, margin: '0 0 1.25rem' }}>
            Ship your SaaS in a <span style={{ color: BLUE }}>weekend</span>, not a quarter.
          </h1>
          <p style={{ fontSize: mobile ? '1.05rem' : '1.2rem', color: MUTE, lineHeight: 1.65, margin: '0 0 2rem', maxWidth: '480px' }}>
            The production-ready starter kit with auth, payments, teams, and emails already wired up — so you can build the part that&rsquo;s actually yours.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <a href="#pricing" style={{ background: BLUE, color: BG, borderRadius: '10px', padding: '14px 26px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Get the kit — $199</a>
            <a href="#features" style={{ border: `1px solid ${LINE}`, color: FG, borderRadius: '10px', padding: '14px 26px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>See what&rsquo;s inside</a>
          </div>
          <p style={{ fontSize: '13px', color: MUTE }}>One-time purchase · Lifetime updates · 3,400+ founders shipping</p>
        </div>
        {/* terminal card */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 14px', borderBottom: `1px solid ${LINE}` }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
            <span style={{ marginLeft: '10px', fontFamily: MONO, fontSize: '12px', color: MUTE }}>zsh — startkit</span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: mobile ? '12px' : '13px', lineHeight: 1.9, padding: '1.25rem 1.4rem' }}>
            <div style={{ color: MUTE }}><span style={{ color: CORAL }}>$</span> npx create-startkit my-saas</div>
            <div style={{ color: BLUE }}>✔ Cloning template</div>
            <div style={{ color: BLUE }}>✔ Installing dependencies</div>
            <div style={{ color: BLUE }}>✔ Wiring auth + Stripe + email</div>
            <div style={{ color: '#28c840' }}>✔ Ready in 42s</div>
            <div style={{ color: MUTE, marginTop: '8px' }}><span style={{ color: CORAL }}>$</span> npm run dev</div>
            <div style={{ color: FG }}>▲ Local: http://localhost:3000</div>
            <div style={{ color: MUTE }}>  <span style={{ background: 'rgba(91,141,239,0.18)', color: BLUE, padding: '1px 5px', borderRadius: '4px' }}>ready</span> compiled in 1.2s</div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: mobile ? '2rem 1.25rem' : '2rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', gap: mobile ? '1.5rem' : '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ v: '40+', l: 'Pre-built pages' }, { v: '12k', l: 'Lines saved' }, { v: '3,400', l: 'Founders' }, { v: '4.9/5', l: 'Rated' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}><div style={{ fontSize: mobile ? '1.6rem' : '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{s.v}</div><div style={{ fontSize: '12px', color: MUTE }}>{s.l}</div></div>
          ))}
        </div>
      </section>

      <section id="features" style={{ maxWidth: '1140px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>The boring parts, already done</h2>
          <p style={{ fontSize: '1.05rem', color: MUTE, maxWidth: '460px', margin: '0 auto' }}>Everything a SaaS needs on day one — batteries included.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
          {[
            { t: 'Auth & sessions', d: 'Email, magic links, and social login with secure sessions and password reset flows.', p: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2' },
            { t: 'Payments & billing', d: 'Stripe subscriptions, one-off charges, customer portal, and webhook handling.', p: 'M3 10h18M3 6h18v12H3zM7 15h4' },
            { t: 'Teams & roles', d: 'Multi-tenant workspaces, invitations, and role-based permissions out of the box.', p: 'M17 21v-2a4 4 0 0 0-3-3.87M9 21v-2a4 4 0 0 1 3-3.87M12 7a3 3 0 1 0 0-4 3 3 0 0 0 0 4z' },
            { t: 'Transactional email', d: 'Beautiful, tested templates for welcome, receipts, and password resets.', p: 'M4 4h16v16H4zM4 7l8 6 8-6' },
            { t: 'Admin dashboard', d: 'Charts, tables, and settings pages built with an accessible component library.', p: 'M3 3v18h18M7 14l4-4 3 3 5-6' },
            { t: 'Type-safe API', d: 'End-to-end typed data layer, validation, and error handling you can trust.', p: 'M8 3H5v18h3M16 3h3v18h-3M9 12h6' },
          ].map(f => (
            <div key={f.t} style={{ border: `1px solid ${LINE}`, borderRadius: '16px', padding: '1.75rem', background: CARD }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'rgba(91,141,239,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.p} /></svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>{f.t}</h3>
              <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.65, margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: MONO, fontSize: '13px', color: CORAL }}>// built on a stack you already know</span>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.75rem 0 2.25rem' }}>Modern, boring, and battle-tested</h2>
          <div style={{ display: 'flex', gap: mobile ? '0.6rem' : '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'Vite', 'Tailwind', 'Postgres', 'Stripe', 'Prisma', 'Vitest'].map(t => (
              <span key={t} style={{ fontFamily: MONO, fontSize: mobile ? '13px' : '14px', color: FG, border: `1px solid ${LINE}`, background: CARD, borderRadius: '9px', padding: '9px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 0.75rem' }}>Pay once. Ship forever.</h2>
          <p style={{ fontSize: '1.05rem', color: MUTE, textAlign: 'center', margin: '0 0 2.75rem' }}>No subscriptions. Buy the license, keep the code.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {[
              { t: 'Solo', p: '$199', sub: 'one project', d: ['Full source code', 'Lifetime updates', 'Community Discord'], hot: false },
              { t: 'Pro', p: '$399', sub: 'unlimited projects', d: ['Everything in Solo', 'Unlimited projects', 'Admin + billing modules', 'Priority support'], hot: true },
              { t: 'Team', p: '$899', sub: 'up to 10 devs', d: ['Everything in Pro', 'Team license', 'Onboarding call', 'Private issue tracker'], hot: false },
            ].map(t => (
              <div key={t.t} style={{ border: `1.5px solid ${t.hot ? BLUE : LINE}`, borderRadius: '18px', padding: '2rem 1.75rem', background: CARD, position: 'relative' }}>
                {t.hot && <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: BLUE, color: BG, fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '999px', padding: '4px 12px' }}>Best value</span>}
                <div style={{ fontSize: '14px', fontWeight: 700, color: MUTE, marginBottom: '0.5rem' }}>{t.t}</div>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{t.p}</div>
                <p style={{ fontSize: '13px', color: MUTE, margin: '0.25rem 0 1.5rem' }}>{t.sub}</p>
                <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '1.75rem' }}>
                  {t.d.map(f => <div key={f} style={{ display: 'flex', gap: '9px', alignItems: 'center' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg><span style={{ fontSize: '14px' }}>{f}</span></div>)}
                </div>
                <a href="#pricing" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px', fontSize: '14px', fontWeight: 800, textDecoration: 'none', background: t.hot ? BLUE : 'transparent', color: t.hot ? BG : FG, border: t.hot ? 'none' : `1px solid ${LINE}` }}>Get {t.t}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '5.5rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: mobile ? '1.3rem' : '1.6rem', fontWeight: 600, lineHeight: 1.5, letterSpacing: '-0.01em', margin: '0 0 1.25rem' }}>
            &ldquo;I launched my MVP in a weekend and had my first paying customer by Monday. StartKit paid for itself ten times over.&rdquo;
          </p>
          <p style={{ fontSize: '13px', color: MUTE, margin: 0 }}>— Dana Whitfield, founder of Trackly</p>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '16px', fontWeight: 800 }}>StartKit</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Docs', 'Changelog', 'GitHub', 'License'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(233,237,246,0.3)' }}>© {new Date().getFullYear()} StartKit</span>
        </div>
      </footer>
    </div>
  );
}
