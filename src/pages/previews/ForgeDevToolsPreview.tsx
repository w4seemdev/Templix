/* ============================================================
   FORGE - Developer Tools Landing Template
   Charcoal/zinc theme with amber accent + terminal aesthetic.
   Self-contained, inline styles only, fully responsive.
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

const T = { bg: '#09090b', panel: '#131316', line: 'rgba(255,255,255,0.09)', ink: '#fafafa', mut: '#a1a1aa', dim: '#71717a', a: '#f59e0b', gr: '#4ade80' };
const mono = "'SF Mono', ui-monospace, 'Fira Code', monospace";
const NAV = [['Features', 'features'], ['CLI', 'cli'], ['Pricing', 'pricing'], ['Docs', 'features']] as const;

export default function ForgeDevToolsPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Features mobile={mobile} />
      <Cli mobile={mobile} />
      <Compare mobile={mobile} />
      <Pricing mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(14px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: T.a, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1400" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 7l5 5-5 5M6 7l-4 5 4 5" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: mono }}>forge</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 26 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#features" style={{ fontSize: 14, color: T.mut, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.300-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.9 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" /></svg>Star</a>
            <a href="#pricing" style={{ background: T.a, borderRadius: 9, padding: '8px 16px', fontSize: 14, fontWeight: 700, color: '#1c1400', textDecoration: 'none' }}>Start free</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: T.a, borderRadius: 9, padding: 11, fontSize: 14, fontWeight: 700, color: '#1c1400', textDecoration: 'none' }}>Start free</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? '48px 20px 36px' : '78px 20px 52px', textAlign: 'center' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.gr, fontFamily: mono }}>v3.2 · now with edge deploys</span>
        <h1 style={{ fontSize: mobile ? '2.3rem' : '3.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, margin: '20px auto 0', maxWidth: 700 }}>
          The build pipeline that <span style={{ color: T.a }}>ships itself</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px auto 0', maxWidth: 520 }}>
          Forge compiles, tests, and deploys every push in seconds. Zero-config caching, instant rollbacks, and preview URLs for every branch.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
          <a href="#pricing" style={{ background: T.a, borderRadius: 11, padding: '13px 24px', fontSize: 15, fontWeight: 700, color: '#1c1400', textDecoration: 'none' }}>Deploy your first repo</a>
          <a href="#cli" style={{ border: `1px solid ${T.line}`, borderRadius: 11, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Read the docs</a>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: `${mobile ? 34 : 48}px auto 0`, borderRadius: 12, border: `1px solid ${T.line}`, background: '#0c0c0f', overflow: 'hidden', textAlign: 'left', fontFamily: mono, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: `1px solid ${T.line}` }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
          <span style={{ marginLeft: 10, fontSize: 11, color: T.dim }}>~/app - forge deploy</span>
        </div>
        <div style={{ padding: 18, fontSize: 12.5, lineHeight: 1.9 }}>
          <div><span style={{ color: T.a }}>$</span> <span style={{ color: T.ink }}>forge deploy --prod</span></div>
          <div style={{ color: T.dim }}>→ building 4 packages…</div>
          <div style={{ color: T.gr }}>✓ cache hit (3.1s saved)</div>
          <div style={{ color: T.gr }}>✓ 214 tests passed</div>
          <div style={{ color: T.gr }}>✓ deployed to edge · 41 regions</div>
          <div style={{ marginTop: 6, color: T.ink }}>▸ https://app.forge.dev <span style={{ color: T.dim }}>· ready in 6.2s</span></div>
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  cache: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7',
  branch: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9',
  rollback: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
};
function FIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['bolt', 'Sub-10s builds', 'Incremental compilation and a global build cache turn cold builds into instant ones.'],
    ['branch', 'Preview per branch', 'Every push gets a shareable preview URL with its own isolated database.'],
    ['rollback', 'Instant rollbacks', 'Bad deploy? Roll back to any previous build in one click - no rebuild needed.'],
    ['cache', 'Smart caching', 'Content-addressed artifacts are shared across your whole team automatically.'],
    ['globe', 'Edge deploys', 'Ship to 41 regions at once. Static assets and functions run close to users.'],
    ['shield', 'Secure by default', 'Signed artifacts, secret scanning, and SOC 2 Type II compliance built in.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="Features" title="Everything a shipping team needs" sub="Batteries included, zero YAML required.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><FIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cli({ mobile }: { mobile: boolean }) {
  const cmds: [string, string][] = [
    ['forge init', 'Detect your framework and scaffold config'],
    ['forge dev', 'Hot-reloading local server with edge emulation'],
    ['forge test --affected', 'Run only the tests your change touched'],
    ['forge deploy --prod', 'Build, test, and ship to production'],
  ];
  return (
    <Section id="cli" mobile={mobile} alt tag="CLI" title="Four commands, whole lifecycle" sub="A CLI that gets out of your way.">
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cmds.map(([cmd, desc]) => (
          <div key={cmd} style={{ display: mobile ? 'block' : 'flex', alignItems: 'center', gap: 18, borderRadius: 12, border: `1px solid ${T.line}`, background: T.panel, padding: '16px 20px' }}>
            <code style={{ fontFamily: mono, fontSize: 14, color: T.a, whiteSpace: 'nowrap' }}><span style={{ color: T.dim }}>$ </span>{cmd}</code>
            <span style={{ display: 'block', fontSize: 14, color: T.mut, marginTop: mobile ? 6 : 0, marginLeft: mobile ? 0 : 'auto' }}>{desc}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Compare({ mobile }: { mobile: boolean }) {
  const rows: [string, string, boolean][] = [['Cold build time', '6s vs 3m+', true], ['Zero-config setup', 'Auto-detected', true], ['Preview databases', 'Per branch', true], ['Monthly minutes', 'Unmetered on Pro', true]];
  return (
    <Section id="compare" mobile={mobile} tag="Why Forge" title="Faster where it counts" sub="What teams gain after switching.">
      <div style={{ maxWidth: 640, margin: '0 auto', borderRadius: 14, border: `1px solid ${T.line}`, background: T.panel, overflow: 'hidden' }}>
        {rows.map(([label, val], i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderTop: i ? `1px solid ${T.line}` : 'none' }}>
            <span style={{ fontSize: 14, color: T.mut, display: 'flex', alignItems: 'center', gap: 10 }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.gr} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: mono }}>{val}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const plans = [
    { name: 'Free', price: '$0', note: '', desc: 'For side projects.', feats: ['3 projects', '100 build min/mo', 'Preview URLs', 'Community support'], hot: false },
    { name: 'Pro', price: '$20', note: '/user/mo', desc: 'For serious teams.', feats: ['Unlimited projects', 'Unmetered builds', 'Preview databases', 'Priority support'], hot: true },
    { name: 'Enterprise', price: 'Custom', note: '', desc: 'For platform teams.', feats: ['Self-hosted runners', 'SSO & audit logs', 'SLA & support', 'Onboarding'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} alt tag="Pricing" title="Pricing that scales with your team" sub="Start free. Upgrade when you ship every day.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 18, border: p.hot ? `1px solid ${T.a}` : `1px solid ${T.line}`, background: p.hot ? 'rgba(245,158,11,0.06)' : T.panel, padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: T.a, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 700, color: '#1c1400' }}>Recommended</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{p.price}</span><span style={{ fontSize: 13, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: p.hot ? T.a : 'rgba(255,255,255,0.06)', color: p.hot ? '#1c1400' : '#fff', marginBottom: 20 }}>{p.name === 'Enterprise' ? 'Contact sales' : 'Get started'}</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: 20, border: `1px solid ${T.line}`, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)', padding: '52px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Ship on your next push</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 22px' }}>Connect a repo and watch Forge build, test, and deploy it in seconds.</p>
        <code style={{ display: 'inline-block', fontFamily: mono, fontSize: 14, color: T.a, background: '#0c0c0f', border: `1px solid ${T.line}`, borderRadius: 10, padding: '11px 18px' }}><span style={{ color: T.dim }}>$ </span>npx forge init</code>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#0c0c0f' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 50 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a, fontFamily: mono }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: T.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Product', ['Features', 'CLI', 'Pricing', 'Changelog']], ['Resources', ['Docs', 'Guides', 'Status', 'API']], ['Company', ['About', 'Blog', 'Careers', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 26, height: 26, borderRadius: 7, background: T.a }} /><span style={{ fontWeight: 800, fontSize: 16, fontFamily: mono }}>forge</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>The build and deploy platform for teams that ship constantly.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#52525b', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#3f3f46' }}>© {new Date().getFullYear()} Forge Labs, Inc.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['GitHub', 'X', 'Discord'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#3f3f46', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
