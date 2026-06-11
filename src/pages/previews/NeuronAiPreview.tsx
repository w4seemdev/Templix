import { useState } from 'react';

/* ============================================================
   NEURON — AI Platform Template
   Futuristic dark #030712 · blue→violet gradients · glow orbs
   ============================================================ */

const BLUE = '#3b82f6';
const VIOLET = '#8b5cf6';
const BG = '#030712';
const PANEL = '#0b1020';
const BORDER = 'rgba(139,92,246,0.18)';
const DIM = '#8b93ab';
const MONO = "'JetBrains Mono', 'Courier New', monospace";
const GRAD = `linear-gradient(135deg, ${BLUE}, ${VIOLET})`;

const navLinks = ['Product', 'Playground', 'Pricing', 'Docs', 'Blog'];

const logos = ['Vantage', 'Corelink', 'Driftwave', 'Synthex', 'Opaline', 'Kapsule'];

const capabilities = [
  { icon: '💬', title: 'Conversation', desc: 'Long-context dialogue with tool calling, memory, and structured JSON output out of the box.' },
  { icon: '👁️', title: 'Vision', desc: 'Charts, screenshots, documents — Neuron reads pixels as fluently as it reads prose.' },
  { icon: '⚙️', title: 'Function calling', desc: 'Typed tool schemas with parallel calls and automatic retries baked into the runtime.' },
  { icon: '📚', title: 'Retrieval', desc: 'Managed embeddings and hybrid search — connect your docs and ground every answer.' },
  { icon: '🧮', title: 'Reasoning', desc: 'Extended thinking mode for math, code, and multi-step plans when accuracy beats latency.' },
  { icon: '🛡️', title: 'Guardrails', desc: 'Policy filters, PII redaction, and audit logs that satisfy your security review the first time.' },
];

const benchmarks = [
  { name: 'Neuron-2 Pro', score: 94, color: GRAD, highlight: true },
  { name: 'GPT-class rival', score: 87, color: '#334155', highlight: false },
  { name: 'OSS 70B', score: 74, color: '#334155', highlight: false },
  { name: 'Previous Neuron-1', score: 69, color: '#334155', highlight: false },
];

const useCases = [
  { title: 'Support copilots', desc: 'Resolve 64% of tickets before a human reads them.' },
  { title: 'Code review', desc: 'Inline PR feedback trained on your conventions.' },
  { title: 'Document intelligence', desc: 'Contracts, invoices, and forms to clean JSON.' },
  { title: 'Agent workflows', desc: 'Multi-step tool use with checkpoints and replay.' },
];

const plans = [
  {
    name: 'Hobby', price: '$0', period: '/mo', highlight: false,
    desc: 'Prototype with generous free credits.',
    features: ['500k tokens / mo', 'Neuron-2 Mini', 'Community Discord', 'Rate limit: 10 RPM'],
    cta: 'Start building',
  },
  {
    name: 'Pro', price: '$49', period: '/mo + usage', highlight: true,
    desc: 'Production apps with priority routing.',
    features: ['20M tokens included', 'Neuron-2 Pro + Vision', 'Function calling', '99.9% uptime SLA', 'Email support'],
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Scale', price: 'Custom', period: '', highlight: false,
    desc: 'Dedicated capacity and compliance.',
    features: ['Dedicated clusters', 'Fine-tuning', 'SSO + HIPAA BAA', 'VPC peering', 'Solutions architect'],
    cta: 'Contact sales',
  },
];

const testimonials = [
  {
    quote: 'We swapped our previous provider for Neuron in a weekend. Latency dropped 40% and our eval scores went up, not down.',
    name: 'Lina Falk', role: 'CTO, Driftwave', handle: '@linafalk',
  },
  {
    quote: 'The structured-output mode alone saved us a quarter of prompt-engineering toil. It just returns the schema. Every time.',
    name: 'Devon Carter', role: 'Staff Engineer, Vantage', handle: '@devbuilds',
  },
];

const codeLines = [
  { t: 'import', c: '#c084fc' }, { t: ' neuron ', c: '#e2e8f0' }, { t: 'from', c: '#c084fc' }, { t: ' "@neuron/sdk"', c: '#86efac' },
];

const footerCols = [
  { title: 'Product', links: ['Models', 'Playground', 'Fine-tuning', 'Pricing'] },
  { title: 'Developers', links: ['Documentation', 'API reference', 'SDKs', 'Status'] },
  { title: 'Company', links: ['About', 'Research', 'Careers', 'Trust center'] },
];

export default function NeuronAiPreview() {
  const [tab, setTab] = useState<'chat' | 'code'>('chat');

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: '#e5e9f2', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '17px', boxShadow: '0 0 22px rgba(139,92,246,0.5)' }}>N</div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em', color: '#f3f5fa' }}>Neuron</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.6rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: DIM, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href="#" style={{ fontSize: '14px', color: DIM, textDecoration: 'none' }}>Sign in</a>
            <a href="#" style={{ background: GRAD, color: '#fff', borderRadius: '10px', padding: '9px 18px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Get API key</a>
          </div>
        </div>
      </header>

      {/* ── Hero with playground mock ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 1.5rem 4.5rem' }}>
        <div style={{ position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '760px', height: '460px', background: 'radial-gradient(ellipse, rgba(139,92,246,0.28), transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', border: `1px solid ${BORDER}`, background: 'rgba(139,92,246,0.08)', borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, color: '#c4b5fd', marginBottom: '1.5rem' }}>
            ✦ Introducing Neuron-2 Pro — 1M context
          </span>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, margin: '0 auto', maxWidth: '800px', color: '#f8fafc' }}>
            Intelligence,{' '}
            <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>on tap</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: DIM, lineHeight: 1.75, maxWidth: '560px', margin: '1.5rem auto 2.25rem' }}>
            Neuron is the AI platform for product teams: frontier models, retrieval, and guardrails behind one clean API. Ship your first feature before lunch.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a href="#" style={{ background: GRAD, color: '#fff', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(139,92,246,0.4)' }}>Start free →</a>
            <a href="#" style={{ border: `1px solid ${BORDER}`, color: '#e5e9f2', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Open playground</a>
          </div>

          {/* Playground mock */}
          <div style={{ maxWidth: '780px', margin: '0 auto', background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '18px', overflow: 'hidden', textAlign: 'left', boxShadow: '0 30px 90px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['chat', 'code'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: tab === t ? 'rgba(139,92,246,0.18)' : 'transparent', color: tab === t ? '#c4b5fd' : DIM }}>
                    {t === 'chat' ? 'Playground' : 'API'}
                  </button>
                ))}
              </div>
              <span style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>neuron-2-pro · temp 0.7</span>
            </div>
            {tab === 'chat' ? (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '230px' }}>
                <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '14px 14px 4px 14px', padding: '12px 16px', fontSize: '14px', color: '#dbeafe' }}>
                  Summarize this 80-page vendor contract and flag any auto-renewal clauses.
                </div>
                <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: 'rgba(139,92,246,0.10)', border: `1px solid ${BORDER}`, borderRadius: '14px 14px 14px 4px', padding: '12px 16px', fontSize: '14px', color: '#e5e9f2', lineHeight: 1.65 }}>
                  Done. The contract contains <strong style={{ color: '#c4b5fd' }}>2 auto-renewal clauses</strong> (§4.2, §11.7) — both renew for 24 months unless cancelled 90 days prior. Key terms: net-45 payment, 99.5% SLA with service credits, and a unilateral price-increase cap of 7%…
                  <span style={{ display: 'inline-block', width: '8px', height: '15px', background: VIOLET, marginLeft: '4px', verticalAlign: 'text-bottom' }} />
                </div>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', fontFamily: MONO, fontSize: '13px', lineHeight: 1.9, minHeight: '230px' }}>
                <div>{codeLines.map(s => <span key={s.t} style={{ color: s.c }}>{s.t}</span>)}</div>
                <div><span style={{ color: '#c084fc' }}>const</span><span style={{ color: '#e2e8f0' }}> res = </span><span style={{ color: '#c084fc' }}>await</span><span style={{ color: '#e2e8f0' }}> neuron.chat(&#123;</span></div>
                <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#7dd3fc' }}>model</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86efac' }}>"neuron-2-pro"</span><span style={{ color: '#e2e8f0' }}>,</span></div>
                <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#7dd3fc' }}>messages</span><span style={{ color: '#e2e8f0' }}>: [&#123; </span><span style={{ color: '#7dd3fc' }}>role</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86efac' }}>"user"</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#7dd3fc' }}>content</span><span style={{ color: '#e2e8f0' }}>: prompt &#125;],</span></div>
                <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#7dd3fc' }}>response_format</span><span style={{ color: '#e2e8f0' }}>: &#123; </span><span style={{ color: '#7dd3fc' }}>type</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86efac' }}>"json_schema"</span><span style={{ color: '#e2e8f0' }}> &#125;,</span></div>
                <div><span style={{ color: '#e2e8f0' }}>&#125;);</span></div>
                <div style={{ marginTop: '0.6rem', color: '#64748b' }}>// 312ms · 1,840 tokens · $0.0021</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Logos ── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2rem 1.5rem', background: 'rgba(11,16,32,0.6)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {logos.map(name => (
            <span key={name} style={{ fontSize: '16px', fontWeight: 700, color: '#2d3650' }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa' }}>Capabilities</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0', color: '#f8fafc' }}>
              One model family, every modality
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {capabilities.map(c => (
              <div key={c.title} style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ fontSize: '24px', marginBottom: '1rem' }}>{c.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px', color: '#f1f5f9' }}>{c.title}</h3>
                <p style={{ fontSize: '14px', color: DIM, lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benchmarks ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(11,16,32,0.6)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa' }}>Benchmarks</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0.75rem', color: '#f8fafc' }}>AgentBench-Hard, May 2026</h2>
            <p style={{ color: DIM, fontSize: '0.95rem', margin: 0 }}>Composite score across reasoning, tool use, and long-context retrieval.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {benchmarks.map(b => (
              <div key={b.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: b.highlight ? 800 : 500, color: b.highlight ? '#c4b5fd' : DIM }}>{b.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, fontFamily: MONO, color: b.highlight ? '#c4b5fd' : DIM }}>{b.score}</span>
                </div>
                <div style={{ height: '12px', borderRadius: '9999px', background: '#111827', overflow: 'hidden' }}>
                  <div style={{ width: `${b.score}%`, height: '100%', borderRadius: '9999px', background: b.color, boxShadow: b.highlight ? '0 0 16px rgba(139,92,246,0.6)' : 'none' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa' }}>In production</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0', color: '#f8fafc' }}>What teams build on Neuron</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {useCases.map(u => (
              <div key={u.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.6rem', background: 'linear-gradient(160deg, rgba(59,130,246,0.06), rgba(139,92,246,0.05))' }}>
                <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: '0 0 8px', color: '#f1f5f9' }}>{u.title}</h3>
                <p style={{ fontSize: '13.5px', color: DIM, lineHeight: 1.65, margin: 0 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(11,16,32,0.6)', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa' }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0', color: '#f8fafc' }}>Pay for output, not seats</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: PANEL, borderRadius: '18px', padding: '2rem', border: plan.highlight ? '2px solid transparent' : `1px solid ${BORDER}`, backgroundImage: plan.highlight ? `linear-gradient(${PANEL}, ${PANEL}), ${GRAD}` : 'none', backgroundOrigin: 'border-box', backgroundClip: plan.highlight ? 'padding-box, border-box' : 'border-box', boxShadow: plan.highlight ? '0 20px 60px rgba(139,92,246,0.25)' : 'none' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px', color: '#f1f5f9' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: DIM, margin: '0 0 1.25rem', lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f8fafc' }}>{plan.price}</span>
                  <span style={{ fontSize: '13px', color: DIM, marginBottom: '4px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '11px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '1.5rem', background: plan.highlight ? GRAD : 'rgba(139,146,171,0.12)', color: '#fff' }}>{plan.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#c7cddc' }}>
                      <span style={{ color: '#a78bfa', fontWeight: 800, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '18px', padding: '2rem' }}>
              <p style={{ fontSize: '15px', color: '#c7cddc', lineHeight: 1.8, margin: '0 0 1.5rem' }}>“{t.quote}”</p>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>{t.name} <span style={{ fontFamily: MONO, fontSize: '12px', color: '#a78bfa', fontWeight: 500 }}>{t.handle}</span></p>
                <p style={{ fontSize: '12.5px', color: DIM, margin: '2px 0 0' }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ position: 'relative', overflow: 'hidden', background: GRAD, borderRadius: '24px', padding: '4rem 2.5rem', textAlign: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
            <h2 style={{ position: 'relative', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>
              Your API key is 30 seconds away
            </h2>
            <p style={{ position: 'relative', color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Free credits, no card. If you can call an API, you can ship AI this afternoon.
            </p>
            <a href="#" style={{ position: 'relative', display: 'inline-block', background: '#fff', color: '#4c1d95', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Get your API key →</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '3.5rem 1.5rem 2rem', background: PANEL }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px' }}>N</div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#f3f5fa' }}>Neuron</span>
              </div>
              <p style={{ fontSize: '13.5px', color: DIM, lineHeight: 1.7, margin: 0 }}>
                The AI platform for product teams. SOC 2 Type II, GDPR, and HIPAA ready.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3d4663', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: DIM, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#3d4663', margin: 0 }}>© 2026 Neuron Labs, Inc.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['X', 'GitHub', 'Discord', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#3d4663', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
