/* ============================================================
   TEMPO - Productivity App Landing Template
   Warm dark with amber/rose accent + kanban board mock.
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

const T = { bg: '#12100e', panel: '#1c1815', line: 'rgba(255,255,255,0.08)', ink: '#faf5ef', mut: '#c6b3a3', dim: '#7d6a5c', a: '#f59e0b', a2: '#f43f5e' };
const grad = 'linear-gradient(120deg, #f59e0b, #f43f5e)';
const NAV = [['Features', 'features'], ['Workflow', 'workflow'], ['Reviews', 'reviews'], ['Pricing', 'pricing']] as const;

export default function ProductivityPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
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
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(18,16,14,0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2a1400" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Tempo</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>Sign in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 700, color: '#2a1400', textDecoration: 'none' }}>Try free</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, color: '#2a1400', textDecoration: 'none' }}>Try free</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '48px 20px 36px' : '78px 20px 52px', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 700, maxWidth: '120%', height: 400, background: 'radial-gradient(ellipse, rgba(245,158,11,0.16), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.03)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a }}>Your work, finally in one calm place</span>
        <h1 style={{ fontSize: mobile ? '2.4rem' : '3.9rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '20px auto 0', maxWidth: 720 }}>
          Plan less, <span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>finish more</span>
        </h1>
        <p style={{ fontSize: mobile ? '1rem' : '1.15rem', color: T.mut, lineHeight: 1.7, margin: '18px auto 0', maxWidth: 520 }}>
          Tempo blends tasks, notes, and a calendar into one flowing workspace - so you spend your energy doing the work, not organizing it.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 700, color: '#2a1400', textDecoration: 'none' }}>Get started free</a>
          <a href="#workflow" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Watch the tour</a>
        </div>
      </div>
      <Board mobile={mobile} />
    </section>
  );
}

function Board({ mobile }: { mobile: boolean }) {
  const cols: [string, string, [string, string][]][] = [
    ['To do', T.dim, [['Draft Q3 plan', 'Today'], ['Review designs', 'Tomorrow']]],
    ['In progress', T.a, [['Ship onboarding', '2 subtasks'], ['Write changelog', 'Due Fri']]],
    ['Done', '#22c55e', [['Fix billing bug', ''], ['Team sync notes', '']]],
  ];
  return (
    <div style={{ maxWidth: 900, margin: `${mobile ? 34 : 52}px auto 0`, borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.5), 0 0 60px rgba(245,158,11,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderBottom: `1px solid ${T.line}` }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        <span style={{ marginLeft: 10, fontSize: 12, color: T.dim }}>Product board · This week</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 14, padding: mobile ? 16 : 22, textAlign: 'left' }}>
        {cols.map(([title, col, cards]) => (
          <div key={title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: col }} /><span style={{ fontSize: 12, fontWeight: 700, color: T.mut }}>{title}</span><span style={{ fontSize: 11, color: T.dim, marginLeft: 'auto' }}>{cards.length}</span></div>
            {cards.map(([t, meta]) => (
              <div key={t} style={{ borderRadius: 11, border: `1px solid ${T.line}`, background: T.bg, padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                {meta && <div style={{ display: 'inline-block', marginTop: 8, fontSize: 11, color: col, background: `${col}22`, borderRadius: 6, padding: '2px 8px' }}>{meta}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const ICONS: Record<string, string> = {
  check: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  note: 'M4 4h13l3 3v13H4zM17 4v4h4M8 13h8M8 17h5',
  cal: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  focus: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
};
function PIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['check', 'Tasks that flow', 'Boards, lists, and subtasks that adapt to how you actually work - not the other way around.'],
    ['note', 'Notes built in', 'Rich docs live right next to your tasks, so context is always one click away.'],
    ['cal', 'Time-blocked calendar', 'Drag any task onto your calendar and Tempo protects the time to do it.'],
    ['focus', 'Focus mode', 'Silence everything but the one thing that matters right now.'],
    ['bolt', 'Quick capture', 'Add anything from anywhere in a keystroke. Sort it later - or let Tempo suggest.'],
    ['link', 'Connects your stack', 'Two-way sync with GitHub, Slack, and Google Calendar keeps everything in step.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="Features" title="One workspace for everything" sub="Stop juggling five apps. Tempo brings it together.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><PIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Workflow({ mobile }: { mobile: boolean }) {
  const steps = [
    ['01', 'Capture everything', 'Dump every task, idea, and note into Tempo in seconds. Nothing slips through.'],
    ['02', 'Plan your day', 'Drag what matters onto your calendar and let Tempo balance your workload.'],
    ['03', 'Enter flow', 'Start focus mode and work through your plan one calm block at a time.'],
  ];
  return (
    <Section id="workflow" mobile={mobile} alt tag="Workflow" title="A rhythm that keeps you moving" sub="Three simple steps, every single day.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 26 }}>
        {steps.map(([n, t, d]) => (
          <div key={n}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.a, marginBottom: 12 }}>{n}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.7, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews({ mobile }: { mobile: boolean }) {
  const t = [
    ['I finally closed my other five apps. Tempo is the first tool that matches how my brain works.', 'Renee A.', 'Freelance designer'],
    ['Time-blocking inside the same app I plan in changed my whole week. I get home on time now.', 'Ben H.', 'Engineering manager'],
    ['Quick capture is magic. Every stray thought lands somewhere useful instead of getting lost.', 'Ola F.', 'Founder'],
  ];
  return (
    <Section id="reviews" mobile={mobile} tag="Reviews" title="People get their time back" sub="Rated 4.8/5 by 30,000+ makers and teams.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
        {t.map(([q, n, r]) => (
          <div key={n} style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.panel, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 3 }}>{[0, 1, 2, 3, 4].map(i => <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={T.a}><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6 3.5 1.6-6.8L2 9.1l7-.6z" /></svg>)}</div>
            <p style={{ fontSize: 14.5, color: T.mut, lineHeight: 1.7, margin: 0, flex: 1 }}>“{q}”</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#2a1400' }}>{n.split(' ').map(w => w[0]).join('')}</div>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: T.dim }}>{r}</div></div>
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
    { name: 'Free', price: 0, note: 'forever', desc: 'For personal projects.', feats: ['Unlimited tasks', 'Notes & calendar', '2 boards', 'Mobile & web'], hot: false },
    { name: 'Pro', price: annual ? 6 : 9, note: '/mo', desc: 'For focused individuals.', feats: ['Everything free', 'Unlimited boards', 'Focus mode', 'Integrations', 'Priority support'], hot: true },
    { name: 'Team', price: annual ? 10 : 14, note: '/user/mo', desc: 'For small teams.', feats: ['Everything Pro', 'Shared workspaces', 'Roles & permissions', 'Admin dashboard'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} alt tag="Pricing" title="Fair pricing for calm work" sub="Start free. Upgrade when you're ready.">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
        <div style={{ display: 'inline-flex', gap: 4, background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.line}`, borderRadius: 9999, padding: 4 }}>
          {[['Monthly', false], ['Annual −33%', true]].map(([l, v]) => <button key={String(v)} onClick={() => setAnnual(v as boolean)} style={{ padding: '7px 18px', borderRadius: 9999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: annual === v ? grad : 'transparent', color: annual === v ? '#2a1400' : T.dim }}>{l}</button>)}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(245,158,11,0.5)' : `1px solid ${T.line}`, background: p.hot ? 'rgba(245,158,11,0.06)' : T.bg, padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 700, color: '#2a1400' }}>Most popular</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.3rem', fontWeight: 800, letterSpacing: '-0.03em' }}>${p.price}</span><span style={{ fontSize: 13, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: p.hot ? grad : 'rgba(255,255,255,0.06)', color: p.hot ? '#2a1400' : '#fff', marginBottom: 20 }}>{p.price === 0 ? 'Get started' : 'Choose ' + p.name}</a>
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
      <div style={{ maxWidth: 940, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(245,158,11,0.28)', background: 'linear-gradient(120deg, rgba(245,158,11,0.12), rgba(244,63,94,0.08))', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Find your tempo</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Join 300,000+ people doing their best work with less stress.</p>
        <a href="#pricing" style={{ display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, color: '#2a1400', textDecoration: 'none' }}>Start free today</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#1a1613' : T.bg, borderTop: `1px solid ${T.line}` }}>
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
  const cols = [['Product', ['Features', 'Pricing', 'Changelog', 'Roadmap']], ['Resources', ['Docs', 'Templates', 'Blog', 'Community']], ['Company', ['About', 'Careers', 'Privacy', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Tempo</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>The calm workspace for tasks, notes, and time.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#5a4a3f', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#4a3d33' }}>© {new Date().getFullYear()} Tempo App.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'GitHub', 'LinkedIn'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#4a3d33', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
