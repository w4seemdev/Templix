import { useState } from 'react';

/* ============================================================
   HOPE — Nonprofit & Charity Template
   Warm white · rose accent #e11d48 · amber highlights #f59e0b
   ============================================================ */

const ROSE = '#e11d48';
const AMBER = '#f59e0b';
const INK = '#1c1917';
const GREY = '#78716c';
const BORDER = '#e7e5e4';
const SOFT = '#faf9f7';

const navLinks = ['Causes', 'Stories', 'Volunteer', 'About', 'Contact'];

const impactStats = [
  { value: '1.2M', label: 'Meals served' },
  { value: '4,800', label: 'Families housed' },
  { value: '23k', label: 'Active volunteers' },
  { value: '96¢', label: 'Of every $1 to programs' },
];

const causes = [
  { title: 'Clean water for Kibera', raised: 84200, goal: 100000, pct: 84, img: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&q=80', tag: 'Water' },
  { title: 'School meals in rural Honduras', raised: 41650, goal: 60000, pct: 69, img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80', tag: 'Education' },
  { title: 'Winter shelter expansion, Detroit', raised: 112400, goal: 150000, pct: 75, img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80', tag: 'Housing' },
];

const tiers = [25, 50, 100];

const stories = [
  {
    quote: 'The well changed everything. My daughters walk ten minutes for water now, not three hours. Both are back in school.',
    name: 'Amina W.', place: 'Nairobi County, Kenya',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  },
  {
    quote: 'I came to the shelter with two kids and one suitcase. Eight months later I have keys to our own apartment.',
    name: 'Danielle R.', place: 'Detroit, Michigan',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

const volunteerRoles = [
  { title: 'Weekend meal crew', loc: 'Detroit, MI', commit: '4 hrs / week' },
  { title: 'Remote grant writer', loc: 'Anywhere', commit: '6 hrs / month' },
  { title: 'Field photographer', loc: 'Travel required', commit: 'Per project' },
  { title: 'Tutoring & mentorship', loc: 'Chicago, IL', commit: '2 hrs / week' },
];

const fundsBreakdown = [
  { label: 'Direct programs', pct: 78, color: ROSE },
  { label: 'Community operations', pct: 12, color: AMBER },
  { label: 'Fundraising', pct: 6, color: '#fda4af' },
  { label: 'Administration', pct: 4, color: '#d6d3d1' },
];

const partners = ['UNICEF', 'WaterAid', 'Feeding America', 'Habitat', 'GlobalGiving', 'CharityWatch'];

const footerCols = [
  { title: 'Get involved', links: ['Donate', 'Volunteer', 'Fundraise', 'Corporate giving'] },
  { title: 'About', links: ['Our mission', 'Financials', 'Annual report', 'Leadership'] },
  { title: 'Resources', links: ['Stories', 'Newsroom', 'FAQ', 'Contact'] },
];

export default function HopeNonprofitPreview() {
  const [amount, setAmount] = useState<number>(50);
  const [monthly, setMonthly] = useState(true);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>🤍</div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>Hope</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: GREY, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: ROSE, color: '#fff', borderRadius: '9999px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(225,29,72,0.3)' }}>Donate</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '5rem 1.5rem 4rem', background: SOFT }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(225,29,72,0.08)', color: ROSE, borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem' }}>
              ❤ 17 years of community-led change
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>
              Small gifts. <span style={{ color: ROSE }}>Whole lives</span> changed.
            </h1>
            <p style={{ fontSize: '1.125rem', color: GREY, lineHeight: 1.75, margin: '1.5rem 0 2.25rem', maxWidth: '480px' }}>
              Hope funds water, meals, and shelter projects designed and run by the communities they serve. 96 cents of every dollar goes straight to programs.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: ROSE, color: '#fff', borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(225,29,72,0.3)' }}>Give now →</a>
              <a href="#" style={{ border: `1px solid ${BORDER}`, background: '#fff', color: INK, borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>See our impact</a>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80" alt="Volunteers working together" style={{ width: '100%', height: '440px', objectFit: 'cover', borderRadius: '24px', display: 'block' }} />
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {impactStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: ROSE }}>{s.value}</div>
              <div style={{ fontSize: '13.5px', color: GREY, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Active causes ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Active causes</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Where your gift goes to work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {causes.map(c => (
              <div key={c.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '20px', overflow: 'hidden', background: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <img src={c.img} alt={c.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff', color: INK, borderRadius: '9999px', padding: '5px 13px', fontSize: '11.5px', fontWeight: 700 }}>{c.tag}</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 1rem' }}>{c.title}</h3>
                  <div style={{ height: '8px', borderRadius: '9999px', background: '#f5f5f4', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: '9999px', background: `linear-gradient(90deg, ${ROSE}, #fb7185)` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700 }}>${c.raised.toLocaleString()} raised</span>
                    <span style={{ fontSize: '13px', color: GREY }}>of ${c.goal.toLocaleString()}</span>
                  </div>
                  <a href="#" style={{ display: 'block', textAlign: 'center', border: `1.5px solid ${ROSE}`, color: ROSE, borderRadius: '9999px', padding: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Support this cause</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation widget ── */}
      <section style={{ padding: '5rem 1.5rem', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2.5rem', boxShadow: '0 24px 60px rgba(28,25,23,0.08)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', margin: '0 0 0.5rem' }}>Make a difference today</h2>
          <p style={{ fontSize: '14px', color: GREY, textAlign: 'center', margin: '0 0 1.75rem' }}>Your gift is tax-deductible. Cancel monthly giving anytime.</p>
          <div style={{ display: 'flex', borderRadius: '12px', border: `1px solid ${BORDER}`, overflow: 'hidden', marginBottom: '1.25rem' }}>
            {[true, false].map(m => (
              <button key={String(m)} onClick={() => setMonthly(m)}
                style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: monthly === m ? ROSE : '#fff', color: monthly === m ? '#fff' : GREY }}>
                {m ? 'Monthly ♥' : 'One-time'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
            {tiers.map(t => (
              <button key={t} onClick={() => setAmount(t)}
                style={{ padding: '14px 0', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', border: amount === t ? `2px solid ${ROSE}` : `1px solid ${BORDER}`, background: amount === t ? 'rgba(225,29,72,0.06)' : '#fff', color: amount === t ? ROSE : INK }}>
                ${t}
              </button>
            ))}
            <button onClick={() => setAmount(0)}
              style={{ padding: '14px 0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: amount === 0 ? `2px solid ${ROSE}` : `1px solid ${BORDER}`, background: amount === 0 ? 'rgba(225,29,72,0.06)' : '#fff', color: amount === 0 ? ROSE : GREY }}>
              Other
            </button>
          </div>
          <p style={{ fontSize: '13px', color: GREY, textAlign: 'center', margin: '0 0 1.25rem' }}>
            {amount > 0
              ? `$${amount} ${monthly ? 'a month' : ''} provides ${amount >= 100 ? 'a family with a month of clean water' : amount >= 50 ? '125 school meals' : '62 school meals'}.`
              : 'Enter any amount on the next step.'}
          </p>
          <a href="#" style={{ display: 'block', textAlign: 'center', background: ROSE, color: '#fff', borderRadius: '9999px', padding: '15px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 24px rgba(225,29,72,0.3)' }}>
            Donate {amount > 0 ? `$${amount}` : ''} {monthly ? 'monthly' : 'now'} →
          </a>
        </div>
      </section>

      {/* ── Impact stories ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Stories</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>The people behind the numbers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {stories.map(s => (
              <div key={s.name} style={{ background: SOFT, border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '2.25rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#44403c', margin: '0 0 1.5rem', fontStyle: 'italic' }}>“{s.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={s.img} alt={s.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>{s.name}</p>
                    <p style={{ fontSize: '13px', color: GREY, margin: 0 }}>{s.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Volunteer ── */}
      <section style={{ padding: '5rem 1.5rem', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Volunteer</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Give time, not just money</h2>
            <p style={{ color: GREY, fontSize: '1rem', lineHeight: 1.8, margin: '0 0 1.5rem', maxWidth: '420px' }}>
              23,000 volunteers power our programs — from weekend meal crews to remote grant writers. There is a seat for every schedule and skill.
            </p>
            <a href="#" style={{ display: 'inline-block', background: AMBER, color: '#451a03', borderRadius: '9999px', padding: '13px 28px', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>Browse all roles →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {volunteerRoles.map(r => (
              <div key={r.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '1.1rem 1.4rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 2px' }}>{r.title}</p>
                  <p style={{ fontSize: '12.5px', color: GREY, margin: 0 }}>{r.loc} · {r.commit}</p>
                </div>
                <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: ROSE, textDecoration: 'none' }}>Apply →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparency ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Transparency</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0.75rem' }}>How every dollar is used</h2>
            <p style={{ color: GREY, fontSize: '0.95rem', margin: 0 }}>Audited annually. Full financials published every March.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {fundsBreakdown.map(f => (
              <div key={f.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{f.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: f.color === '#d6d3d1' ? GREY : f.color }}>{f.pct}%</span>
                </div>
                <div style={{ height: '10px', borderRadius: '9999px', background: '#f5f5f4', overflow: 'hidden' }}>
                  <div style={{ width: `${f.pct}%`, height: '100%', borderRadius: '9999px', background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section style={{ padding: '2.5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 1.5rem' }}>In partnership with</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {partners.map(name => (
              <span key={name} style={{ fontSize: '16px', fontWeight: 700, color: '#d6d3d1' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA band ── */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, borderRadius: '28px', padding: '4rem 2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>Hope is a monthly habit</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Join 41,000 monthly givers funding long-term change — and get one honest letter from the field each month.
            </p>
            <a href="#" style={{ display: 'inline-block', background: '#fff', color: ROSE, borderRadius: '9999px', padding: '14px 34px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Become a monthly giver</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: SOFT, padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🤍</div>
                <span style={{ fontSize: '18px', fontWeight: 800 }}>Hope</span>
              </div>
              <p style={{ fontSize: '13.5px', color: GREY, lineHeight: 1.7, margin: 0 }}>
                A registered 501(c)(3) nonprofit. EIN 82-5550193. Donations are tax-deductible in the US.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a8a29e', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: GREY, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#a8a29e', margin: 0 }}>© 2026 Hope Foundation. With love, worldwide.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'Facebook', 'YouTube'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
