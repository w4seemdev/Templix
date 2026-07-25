/* ============================================================
   LUMINARY - SaaS Landing Page Template
   Premium dark SaaS with violet/indigo accent. Self-contained,
   inline styles only, fully responsive (375px → 1280px).
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

const V = { bg: '#05070f', panel: '#0b0e1a', line: 'rgba(255,255,255,0.08)', ink: '#f8fafc', mut: '#94a3b8', dim: '#64748b', a1: '#8b5cf6', a2: '#6366f1' };
const grad = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
const NAV = [['Features', 'features'], ['Workflow', 'workflow'], ['Pricing', 'pricing'], ['Reviews', 'reviews']] as const;

export default function LuminarySaasPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: V.bg, color: V.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Logos />
      <Features mobile={mobile} />
      <Workflow mobile={mobile} />
      <Reviews mobile={mobile} />
      <Pricing mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${V.line}`, background: 'rgba(5,7,15,0.82)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Luminary</span>
        </div>
        {!mobile && (
          <nav style={{ display: 'flex', gap: 28 }}>
            {NAV.map(([l, h]) => <a key={h} href={`#${h}`} style={{ fontSize: 14, color: V.mut, textDecoration: 'none' }}>{l}</a>)}
          </nav>
        )}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: V.mut, textDecoration: 'none' }}>Sign in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get started</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${V.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg>
          </button>
        )}
      </div>
      {mobile && open && (
        <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${V.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(([l, h]) => <a key={h} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: V.mut, textDecoration: 'none' }}>{l}</a>)}
          <a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: '11px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get started free</a>
        </div>
      )}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '52px 20px 40px' : '84px 20px 64px' }}>
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 760, height: 460, maxWidth: '120%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)', borderRadius: 9999, padding: '6px 15px', fontSize: 13, color: '#c4b5fd' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: V.a1 }} /> New - AI sprint planning is live
        </span>
        <h1 style={{ fontSize: mobile ? '2.3rem' : '4.2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '22px auto 0', maxWidth: 820 }}>
          The workspace where teams<br />ship <span style={{ background: 'linear-gradient(135deg,#a78bfa,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>10x faster</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: V.mut, lineHeight: 1.7, maxWidth: 560, margin: '20px auto 0' }}>
          Plan sprints, track work, and ship on time - Luminary unifies your roadmap, issues, and docs in one fast, beautiful platform.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
          <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>Start free trial</a>
          <a href="#workflow" style={{ border: `1px solid ${V.line}`, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>See how it works</a>
        </div>
        <p style={{ fontSize: 13, color: V.dim, marginTop: 16 }}>No credit card required · 14-day Pro trial</p>
      </div>

      {/* Product mock */}
      <div style={{ maxWidth: 980, margin: `${mobile ? 36 : 56}px auto 0`, position: 'relative', borderRadius: 16, border: `1px solid ${V.line}`, background: V.panel, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 70px rgba(139,92,246,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderBottom: `1px solid ${V.line}`, background: '#0a0e1a' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
          <span style={{ flex: 1, marginLeft: 10, background: '#161b2e', borderRadius: 6, height: 20, display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 11, color: V.dim }}>app.luminary.io/sprint</span>
        </div>
        <div style={{ display: mobile ? 'block' : 'flex', minHeight: mobile ? 'auto' : 380 }}>
          {!mobile && (
            <div style={{ width: 190, borderRight: `1px solid ${V.line}`, padding: 16, flexShrink: 0 }}>
              {['Inbox', 'My issues', 'Sprint 24', 'Roadmap', 'Docs'].map((x, i) => (
                <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8, marginBottom: 3, background: i === 2 ? 'rgba(139,92,246,0.15)' : 'transparent', color: i === 2 ? '#a78bfa' : V.dim, fontSize: 13 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: i === 2 ? V.a1 : '#334155' }} />{x}
                </div>
              ))}
            </div>
          )}
          <div style={{ flex: 1, padding: mobile ? 16 : 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
              {[['In progress', '18', V.a1], ['In review', '7', '#f59e0b'], ['Done', '124', '#10b981']].map(([l, v, c]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${V.line}`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11, color: V.dim }}>{l}</div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{v}</div>
                  <div style={{ height: 3, borderRadius: 3, marginTop: 8, background: c as string, opacity: 0.5 }} />
                </div>
              ))}
            </div>
            <SparkChart color={V.a1} h={mobile ? 90 : 130} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkChart({ color, h }: { color: string; h: number }) {
  const pts = [22, 30, 26, 40, 34, 52, 46, 64, 58, 72];
  const w = 560, max = 80;
  const step = w / (pts.length - 1);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`).join(' ');
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${V.line}`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: V.mut, marginBottom: 10 }}>Sprint velocity · last 10 days</div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.35" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <path d={area} fill="url(#lg)" />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Logos() {
  return (
    <section style={{ borderTop: `1px solid ${V.line}`, borderBottom: `1px solid ${V.line}`, padding: '34px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 12, color: V.dim, marginBottom: 22, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Trusted by fast-moving product teams</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px 40px', flexWrap: 'wrap' }}>
          {['Northwind', 'Cascade', 'Orbital', 'Meridian', 'Voyager', 'Lumen'].map(n => <span key={n} style={{ fontSize: 17, fontWeight: 700, color: '#2b3650', letterSpacing: '-0.02em' }}>{n}</span>)}
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  plug: 'M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
};
function Icon({ name, color }: { name: string; color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>;
}

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['bolt', 'Blazing fast', 'Keyboard-first UI with sub-100ms navigation. Never wait on a spinner again.'],
    ['chart', 'Sprint analytics', 'Burndown, velocity, and cycle-time charts that update the moment work moves.'],
    ['users', 'Real-time by default', 'Live cursors, inline comments, and instant sync keep everyone on the same page.'],
    ['plug', '80+ integrations', 'Two-way sync with GitHub, Slack, Figma, and the tools your team already lives in.'],
    ['lock', 'Enterprise-ready', 'SOC 2 Type II, SSO/SAML, audit logs, and granular role-based permissions.'],
    ['spark', 'AI assist', 'Draft specs, summarize threads, and auto-triage issues with one command.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="Features" title="Everything your team needs to ship" sub="One tool that replaces the tangle of trackers, docs, and spreadsheets.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${V.line}`, background: 'rgba(255,255,255,0.02)', padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Icon name={ic} color="#a78bfa" /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: V.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Workflow({ mobile }: { mobile: boolean }) {
  const steps = [
    ['01', 'Plan the sprint', 'Drag issues into the sprint, set estimates, and let capacity planning flag overload before it happens.'],
    ['02', 'Track the work', 'A live board and timeline show exactly what is moving, what is blocked, and who owns what.'],
    ['03', 'Ship & review', 'Auto-generated changelogs and velocity reports close the loop so the next sprint starts sharper.'],
  ];
  return (
    <Section id="workflow" mobile={mobile} alt tag="Workflow" title="From backlog to shipped in three moves" sub="A rhythm your team will actually keep.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 26 }}>
        {steps.map(([n, t, d]) => (
          <div key={n}>
            <div style={{ fontSize: 13, fontWeight: 800, color: V.a1, marginBottom: 12 }}>{n}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: V.dim, lineHeight: 1.7, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews({ mobile }: { mobile: boolean }) {
  const t = [
    ['Luminary cut our planning time in half. The whole team finally knows what is going on.', 'Sarah Chen', 'Eng Lead, Cascade'],
    ['We evaluated six tools. The analytics alone were worth the switch - nothing else compares.', 'Marcus Webb', 'VP Product, Orbital'],
    ['Onboarded 40 people in a week. Fast, thoughtful, and it just works.', 'Priya Nair', 'Chief of Staff, Meridian'],
  ];
  return (
    <Section id="reviews" mobile={mobile} tag="Reviews" title="Loved by teams who ship" sub="Rated 4.9/5 across 2,000+ reviews.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
        {t.map(([q, n, r]) => (
          <div key={n} style={{ borderRadius: 18, border: `1px solid ${V.line}`, background: 'rgba(255,255,255,0.02)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 3 }}>{[0, 1, 2, 3, 4].map(i => <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6 3.5 1.6-6.8L2 9.1l7-.6z" /></svg>)}</div>
            <p style={{ fontSize: 14.5, color: V.mut, lineHeight: 1.7, margin: 0, flex: 1 }}>“{q}”</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{n.split(' ').map(w => w[0]).join('')}</div>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: V.dim }}>{r}</div></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { name: 'Free', price: 0, note: 'forever', desc: 'For solo makers and side projects.', feats: ['Up to 5 members', '3 active projects', 'Core boards & docs', 'Community support'], hot: false },
    { name: 'Pro', price: annual ? 8 : 12, note: '/seat/mo', desc: 'For teams shipping every week.', feats: ['Unlimited projects', 'Sprint analytics', '80+ integrations', 'AI assist', 'Priority support'], hot: true },
    { name: 'Enterprise', price: null, note: 'custom', desc: 'For orgs with scale & compliance.', feats: ['SSO & SAML', 'Audit logs', 'SLA guarantee', 'Dedicated CSM'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} alt tag="Pricing" title="Simple pricing that scales" sub="Start free, upgrade when your team grows.">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', gap: 4, background: 'rgba(255,255,255,0.04)', border: `1px solid ${V.line}`, borderRadius: 9999, padding: 4 }}>
          {[['Monthly', false], ['Annual −33%', true]].map(([l, v]) => (
            <button key={String(v)} onClick={() => setAnnual(v as boolean)} style={{ padding: '7px 18px', borderRadius: 9999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: annual === v ? grad : 'transparent', color: annual === v ? '#fff' : V.dim }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(139,92,246,0.5)' : `1px solid ${V.line}`, background: p.hot ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.02)', padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 600 }}>Most popular</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: V.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}>
              {p.price !== null ? <><span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>${p.price}</span><span style={{ fontSize: 14, color: V.dim, marginBottom: 8 }}>{p.note}</span></> : <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>Let's talk</span>}
            </div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#fff', background: p.hot ? grad : 'rgba(255,255,255,0.06)', marginBottom: 20 }}>{p.price === null ? 'Contact sales' : 'Choose ' + p.name}</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: V.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(139,92,246,0.3)', background: 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(99,102,241,0.08))', padding: '56px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 300, maxWidth: '100%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', position: 'relative' }}>Ready to ship faster?</h2>
        <p style={{ color: V.mut, fontSize: '1.05rem', maxWidth: 460, margin: '0 auto 26px', position: 'relative' }}>Join 10,000+ teams building with Luminary. Free for your first 5 seats.</p>
        <a href="#pricing" style={{ position: 'relative', display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>Start free trial</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '80px 20px', background: alt ? '#080b16' : V.bg, borderTop: `1px solid ${V.line}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: V.a1 }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: V.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Product', ['Features', 'Pricing', 'Changelog', 'Roadmap']], ['Company', ['About', 'Blog', 'Careers', 'Press']], ['Legal', ['Privacy', 'Terms', 'Security', 'DPA']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${V.line}`, background: V.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Luminary</span>
            </div>
            <p style={{ fontSize: 13, color: V.dim, lineHeight: 1.7 }}>The modern workspace for high-performing product teams.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}>
                <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: V.dim, marginBottom: 12 }}>{t}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#334155', textDecoration: 'none' }}>{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${V.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#2b3650' }}>© {new Date().getFullYear()} Luminary, Inc.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'GitHub', 'LinkedIn'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#2b3650', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
