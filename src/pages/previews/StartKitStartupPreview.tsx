import { useState } from 'react';

/* ============================================================
   STARTKIT — Free Startup Landing Template
   Light theme · white/slate · indigo accent · rounded-xl cards
   ============================================================ */

const INDIGO = '#6366f1';
const SLATE_900 = '#0f172a';
const SLATE_500 = '#64748b';
const BORDER = '#e2e8f0';

const navLinks = ['Home', 'Features', 'Pricing', 'FAQ', 'Contact'];

const logos = ['Acme Co', 'Northwind', 'Pixelo', 'Cloudloop', 'Brightside', 'Mochi Labs'];

const stats = [
  { value: '12,400+', label: 'Downloads' },
  { value: '4.9 / 5', label: 'Average rating' },
  { value: '38', label: 'Ready-made blocks' },
  { value: 'MIT', label: 'Open license' },
];

const features = [
  { icon: '⚡', title: 'Launch-ready hero', desc: 'A conversion-tested hero with headline, sub-copy, and dual CTAs you can rewrite in minutes.' },
  { icon: '🧩', title: 'Modular sections', desc: 'Every block is independent — reorder features, pricing, and FAQs like building bricks.' },
  { icon: '📱', title: 'Responsive by default', desc: 'Fluid type and flexible grids keep your page sharp from phones to ultrawide monitors.' },
  { icon: '🎨', title: 'One-variable theming', desc: 'Swap a single accent color and the whole template re-paints itself to match your brand.' },
  { icon: '🚀', title: 'Performance first', desc: 'No heavy frameworks or trackers — just clean markup that scores green on Lighthouse.' },
  { icon: '💌', title: 'Contact form included', desc: 'A simple, friendly contact section wired up and ready for your form provider of choice.' },
];

const steps = [
  { num: '1', title: 'Download the kit', desc: 'Grab the free template — no signup, no credit card, no catch. It’s yours forever.' },
  { num: '2', title: 'Make it yours', desc: 'Replace the copy, drop in your logo, and pick your accent color. About 20 minutes, tops.' },
  { num: '3', title: 'Ship your page', desc: 'Deploy to any static host and start collecting signups before lunch.' },
];

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', highlight: true, badge: 'Start here',
    desc: 'Everything you need to launch your first landing page.',
    features: ['All core sections', 'Responsive layout', 'FAQ accordion', 'MIT license', 'Community support'],
    cta: 'Download free',
  },
  {
    name: 'Pro', price: '$29', period: 'one-time', highlight: false, badge: null,
    desc: 'Extra blocks and variants for growing startups.',
    features: ['Everything in Free', '24 extra sections', 'Blog + changelog pages', 'Dark mode variant', 'Email support'],
    cta: 'Get Pro',
  },
  {
    name: 'Bundle', price: '$79', period: 'one-time', highlight: false, badge: null,
    desc: 'The whole StartKit family for agencies and tinkerers.',
    features: ['Everything in Pro', 'All 6 StartKit themes', 'Figma source files', 'Lifetime updates', 'Priority support'],
    cta: 'Get the bundle',
  },
];

const testimonials = [
  {
    quote: 'I had a real landing page live the same afternoon I found StartKit. For a free template, the polish is honestly absurd.',
    name: 'Amira Soto', role: 'Founder, Mochi Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    quote: 'We used the Free tier to validate our idea, then upgraded once we raised. The code is so clean our devs kept it as-is.',
    name: 'Daniel Reyes', role: 'CEO, Cloudloop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: 'Every indie hacker friend I have gets the same link from me now. It’s the fastest zero-to-launch kit I’ve tried.',
    name: 'Lena Brandt', role: 'Maker, Brightside',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

const faqs = [
  { q: 'Is StartKit really free?', a: 'Yes — the core template is free forever under the MIT license. Use it for personal projects, client work, or your next unicorn. The Pro and Bundle tiers just add extra sections and themes.' },
  { q: 'Do I need to credit StartKit?', a: 'No attribution required. A shout-out is always appreciated, but your footer is yours. Ship it, rebrand it, sell with it.' },
  { q: 'What do I need to know to use it?', a: 'Basic HTML and CSS will get you all the way there. Every section is commented, the colors live in one variable block, and the copy is written to be replaced.' },
  { q: 'Can I use it for client projects?', a: 'Absolutely. The MIT license covers commercial use, and the Bundle tier even includes Figma files so you can present mockups before you build.' },
  { q: 'How do I get updates?', a: 'Free users can re-download the latest version anytime. Pro and Bundle customers get an email whenever new sections or themes land — lifetime updates included.' },
];

const footerCols = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
  { title: 'Resources', links: ['Documentation', 'Starter guide', 'Figma files', 'Showcase'] },
  { title: 'Company', links: ['About', 'Blog', 'Contact', 'License'] },
];

const mockBars = [38, 56, 44, 72, 60, 88, 76];
const mockRows = [
  { name: 'Waitlist signups', value: '1,284', delta: '+18%' },
  { name: 'Demo requests', value: '312', delta: '+9%' },
  { name: 'Newsletter subs', value: '942', delta: '+24%' },
];

export default function StartKitStartupPreview() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: SLATE_900, minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `linear-gradient(135deg, ${INDIGO}, #818cf8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '17px', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>S</div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>Start<span style={{ color: INDIGO }}>Kit</span></span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: SLATE_500, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: INDIGO, color: '#fff', borderRadius: '12px', padding: '9px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
            Download free
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 1.5rem 4rem', background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 55%), #ffffff' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)', backgroundSize: '26px 26px', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 70%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, color: '#4f46e5', marginBottom: '1.5rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
            100% free starter template — MIT licensed
          </span>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.07, margin: '0 auto', maxWidth: '780px' }}>
            Launch your startup’s page <span style={{ color: INDIGO }}>this afternoon</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: SLATE_500, lineHeight: 1.75, maxWidth: '560px', margin: '1.5rem auto 0' }}>
            StartKit is a friendly, free landing page kit for indie founders. Hero, features, pricing, and FAQ — all assembled, all yours, no strings attached.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: INDIGO, color: '#fff', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}>
              Download free →
            </a>
            <a href="#" style={{ background: '#fff', color: SLATE_900, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
              See live demo
            </a>
          </div>

          {/* Product screenshot mock */}
          <div style={{ maxWidth: '920px', margin: '3.5rem auto 0', borderRadius: '20px', border: `1px solid ${BORDER}`, background: '#fff', overflow: 'hidden', boxShadow: '0 30px 80px rgba(15,23,42,0.12), 0 8px 24px rgba(99,102,241,0.08)', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: '#f8fafc' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fda4af' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fcd34d' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#86efac' }} />
              <div style={{ flex: 1, marginLeft: '12px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>app.startkit.dev/launch</span>
              </div>
            </div>
            <div style={{ display: 'flex', height: '320px' }}>
              <div style={{ width: '190px', borderRight: `1px solid ${BORDER}`, padding: '1.1rem 0.85rem', flexShrink: 0, background: '#f8fafc' }}>
                {['Overview', 'Audience', 'Pages', 'Forms', 'Settings'].map((item, i) => (
                  <div key={item} style={{ padding: '8px 12px', borderRadius: '10px', marginBottom: '3px', fontSize: '13px', fontWeight: i === 0 ? 600 : 500, background: i === 0 ? 'rgba(99,102,241,0.1)' : 'transparent', color: i === 0 ? '#4f46e5' : SLATE_500 }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, padding: '1.25rem', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1rem' }}>
                  {mockRows.map(row => (
                    <div key={row.name} style={{ border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '11px', color: SLATE_500, marginBottom: '5px' }}>{row.name}</div>
                      <div style={{ fontSize: '20px', fontWeight: 700 }}>{row.value}</div>
                      <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '3px' }}>{row.delta} this week</div>
                    </div>
                  ))}
                </div>
                <div style={{ border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: SLATE_900 }}>Visitors</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Last 7 days</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '110px' }}>
                    {mockBars.map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '6px 6px 0 0', background: i === 5 ? INDIGO : 'rgba(99,102,241,0.18)' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo Cloud ── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: '#f8fafc', padding: '2.25rem 1.5rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 1.5rem' }}>
            Powering launches at indie teams everywhere
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {logos.map(name => (
              <span key={name} style={{ fontSize: '17px', fontWeight: 700, color: '#cbd5e1', letterSpacing: '-0.02em' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section style={{ padding: '3.25rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.5rem 1rem', background: '#fff' }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', color: INDIGO }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: SLATE_500, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8fafc', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>Features</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>
              Everything a launch page needs
            </h2>
            <p style={{ color: SLATE_500, fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto' }}>
              No bloat, no lock-in. Just the sections that turn curious visitors into your first hundred users.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '21px', marginBottom: '1.1rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: SLATE_500, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>How it works</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>
              From download to deployed in three steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {steps.map(step => (
              <div key={step.num} style={{ textAlign: 'center', padding: '0 0.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: `linear-gradient(135deg, ${INDIGO}, #818cf8)`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(99,102,241,0.3)' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: SLATE_500, lineHeight: 1.75, margin: 0, maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8fafc', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>
              Free to start. Cheap to grow.
            </h2>
            <p style={{ color: SLATE_500, fontSize: '1.0625rem', maxWidth: '460px', margin: '0 auto' }}>
              One-time payments, no subscriptions. The Free tier isn’t a trial — it’s the product.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ position: 'relative', background: '#fff', borderRadius: '20px', padding: '2rem', border: plan.highlight ? `2px solid ${INDIGO}` : `1px solid ${BORDER}`, boxShadow: plan.highlight ? '0 20px 50px rgba(99,102,241,0.18)' : '0 1px 3px rgba(15,23,42,0.04)' }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: INDIGO, color: '#fff', borderRadius: '9999px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: SLATE_500, margin: '0 0 1.25rem', lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: '13px', color: SLATE_500, marginBottom: '5px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '1.5rem', background: plan.highlight ? INDIGO : '#f1f5f9', color: plan.highlight ? '#fff' : SLATE_900, boxShadow: plan.highlight ? '0 6px 16px rgba(99,102,241,0.3)' : 'none' }}>
                  {plan.cta}
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#475569' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', color: INDIGO, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>Wall of love</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>
              Founders ship faster with StartKit
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#f8fafc', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{ color: '#f59e0b', fontSize: '15px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.75, margin: 0, flex: 1 }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: SLATE_500, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8fafc', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INDIGO }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>
              Questions? We’ve got answers.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ background: '#fff', border: open ? `1px solid ${INDIGO}` : `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden', boxShadow: open ? '0 8px 24px rgba(99,102,241,0.1)' : 'none' }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.15rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 600, color: SLATE_900 }}>{faq.q}</span>
                    <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: open ? INDIGO : '#f1f5f9', color: open ? '#fff' : SLATE_500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0, transition: 'all 0.2s' }}>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open && (
                    <p style={{ margin: 0, padding: '0 1.4rem 1.25rem', fontSize: '14px', color: SLATE_500, lineHeight: 1.75 }}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${INDIGO}, #818cf8)`, borderRadius: '24px', padding: '4rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px rgba(99,102,241,0.35)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
            <h2 style={{ position: 'relative', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>
              Your launch is one download away
            </h2>
            <p style={{ position: 'relative', color: 'rgba(255,255,255,0.85)', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Join 12,000+ founders who skipped the blank page and shipped with StartKit. Free forever, friendly forever.
            </p>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: '#fff', color: '#4f46e5', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                Download StartKit free
              </a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
                Browse all themes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f8fafc', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `linear-gradient(135deg, ${INDIGO}, #818cf8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px' }}>S</div>
                <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.03em' }}>Start<span style={{ color: INDIGO }}>Kit</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: SLATE_500, lineHeight: 1.7, margin: 0 }}>
                The free, friendly landing page kit for indie founders. Built with care, shared with everyone.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: SLATE_500, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>© 2026 StartKit. Free forever under the MIT license.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Twitter', 'GitHub', 'Dribbble'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
