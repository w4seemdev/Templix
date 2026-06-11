/* ============================================================
   IRONPEAK — Gym & Fitness Template
   Near-black theme (#0a0a0a) · electric lime accent (#a3e635)
   Bold condensed uppercase headings · skewed diagonal breaks
   ============================================================ */

import { useState } from 'react';

const BLACK = '#0a0a0a';
const LIME = '#a3e635';
const LIME_DIM = 'rgba(163,230,53,0.12)';
const PANEL = '#121212';
const BORDER = '1px solid #242424';
const MUTED = '#9ca3af';
const FAINT = '#6b7280';
const display = "'Anton', 'Oswald', Impact, 'Arial Narrow', sans-serif";
const body = "'Inter', system-ui, sans-serif";

const navLinks = ['Home', 'Classes', 'Trainers', 'Plans', 'Book', 'Locations'];

const marqueeWords = ['NO SHORTCUTS', 'EARN THE PEAK', 'SHOW UP', 'LIFT HEAVY', 'GO AGAIN'];

const stats = [
  { value: '12,500+', label: 'Active members' },
  { value: '240', label: 'Classes every week' },
  { value: '6', label: 'Locations citywide' },
  { value: '38', label: 'Certified coaches' },
];

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
type Intensity = 'All levels' | 'Intermediate' | 'Advanced';

const days: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const intensityColor: Record<Intensity, string> = {
  'All levels': '#a3e635',
  Intermediate: '#fbbf24',
  Advanced: '#f87171',
};

const schedule: Record<Day, { time: string; name: string; coach: string; intensity: Intensity; spots: number }[]> = {
  Mon: [
    { time: '06:00', name: 'Iron Strength', coach: 'Marcus Vale', intensity: 'Intermediate', spots: 6 },
    { time: '07:30', name: 'Peak HIIT 45', coach: 'Tasha Okoro', intensity: 'Advanced', spots: 3 },
    { time: '12:15', name: 'Lunch Burn', coach: 'Dani Reyes', intensity: 'All levels', spots: 11 },
    { time: '18:00', name: 'Barbell Club', coach: 'Marcus Vale', intensity: 'Advanced', spots: 2 },
    { time: '19:30', name: 'Mobility & Core', coach: 'June Park', intensity: 'All levels', spots: 14 },
  ],
  Tue: [
    { time: '06:00', name: 'Sprint Engine', coach: 'Tasha Okoro', intensity: 'Intermediate', spots: 8 },
    { time: '09:00', name: 'Kettlebell Flow', coach: 'June Park', intensity: 'All levels', spots: 10 },
    { time: '17:30', name: 'Boxing Fundamentals', coach: 'Dani Reyes', intensity: 'All levels', spots: 5 },
    { time: '19:00', name: 'Hypertrophy Lab', coach: 'Marcus Vale', intensity: 'Advanced', spots: 4 },
  ],
  Wed: [
    { time: '06:00', name: 'Iron Strength', coach: 'Marcus Vale', intensity: 'Intermediate', spots: 7 },
    { time: '07:30', name: 'Peak HIIT 45', coach: 'Tasha Okoro', intensity: 'Advanced', spots: 1 },
    { time: '12:15', name: 'Lunch Burn', coach: 'June Park', intensity: 'All levels', spots: 9 },
    { time: '18:00', name: 'Olympic Lifting', coach: 'Marcus Vale', intensity: 'Advanced', spots: 3 },
    { time: '19:30', name: 'Yoga for Lifters', coach: 'June Park', intensity: 'All levels', spots: 16 },
  ],
  Thu: [
    { time: '06:00', name: 'Sprint Engine', coach: 'Tasha Okoro', intensity: 'Intermediate', spots: 6 },
    { time: '09:00', name: 'Kettlebell Flow', coach: 'Dani Reyes', intensity: 'All levels', spots: 12 },
    { time: '17:30', name: 'Boxing Sparring', coach: 'Dani Reyes', intensity: 'Advanced', spots: 2 },
    { time: '19:00', name: 'Hypertrophy Lab', coach: 'Marcus Vale', intensity: 'Advanced', spots: 5 },
  ],
  Fri: [
    { time: '06:00', name: 'Iron Strength', coach: 'Marcus Vale', intensity: 'Intermediate', spots: 4 },
    { time: '12:15', name: 'Lunch Burn', coach: 'Tasha Okoro', intensity: 'All levels', spots: 8 },
    { time: '17:00', name: 'Friday Throwdown', coach: 'Tasha Okoro', intensity: 'Advanced', spots: 0 },
    { time: '18:30', name: 'Mobility & Core', coach: 'June Park', intensity: 'All levels', spots: 13 },
  ],
  Sat: [
    { time: '08:00', name: 'Summit Saturday', coach: 'Full coach team', intensity: 'All levels', spots: 22 },
    { time: '10:00', name: 'Barbell Club', coach: 'Marcus Vale', intensity: 'Intermediate', spots: 6 },
    { time: '11:30', name: 'Boxing Fundamentals', coach: 'Dani Reyes', intensity: 'All levels', spots: 9 },
    { time: '13:00', name: 'Open Gym Coaching', coach: 'June Park', intensity: 'All levels', spots: 18 },
  ],
};

const trainers = [
  {
    name: 'Marcus Vale',
    role: 'Head of Strength',
    specialties: ['Powerlifting', 'Olympic lifting', 'Programming'],
    record: '14 yrs coaching · 3× national meet podium',
    img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',
  },
  {
    name: 'Tasha Okoro',
    role: 'Conditioning Lead',
    specialties: ['HIIT', 'Sprint mechanics', 'Fat loss'],
    record: 'Former 400m sprinter · 2,100+ classes led',
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
  },
  {
    name: 'Dani Reyes',
    role: 'Combat Coach',
    specialties: ['Boxing', 'Kickboxing', 'Footwork'],
    record: '11–2 amateur record · Golden Gloves regional',
    img: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80',
  },
  {
    name: 'June Park',
    role: 'Mobility & Recovery',
    specialties: ['Mobility', 'Yoga for lifters', 'Rehab prep'],
    record: 'DPT-certified · keeps 12,500 members moving',
    img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80',
  },
];

const plans = [
  {
    name: 'Base Camp',
    price: '$39',
    period: '/month',
    desc: 'Full gym floor access at your home location. Train on your own terms.',
    features: ['One home location', 'Open gym 05:00–23:00', 'Locker room & sauna', 'Free intro assessment', 'IronPeak app tracking'],
    cta: 'Start at Base Camp',
    highlight: false,
  },
  {
    name: 'Ascent',
    price: '$69',
    period: '/month',
    desc: 'Every class, every location. The plan 8 out of 10 members choose.',
    features: ['All 6 locations', 'Unlimited classes (240/wk)', 'Class booking priority', '2 guest passes monthly', 'Quarterly progress testing', 'Recovery zone access'],
    cta: 'Claim free week',
    highlight: true,
  },
  {
    name: 'Summit',
    price: '$129',
    period: '/month',
    desc: 'Personal programming and a coach in your corner, every week.',
    features: ['Everything in Ascent', '2 PT sessions monthly', 'Custom training program', 'Nutrition check-ins', '24/7 keycard access', 'Comp prep support'],
    cta: 'Go Summit',
    highlight: false,
  },
];

const transformations = [
  {
    result: '-28 KG',
    window: 'in 11 months',
    quote: 'I walked in terrified of the weight room. Marcus handed me an empty bar and a plan, and the plan just kept working. Now Friday Throwdown is the highlight of my week.',
    name: 'Priya Nandakumar',
    detail: 'Member since 2024 · Riverside',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    result: '+185 KG',
    window: 'deadlift PR',
    quote: 'Three gyms told me to “take it easy” after my back injury. June rebuilt my hinge from scratch and Barbell Club did the rest. Pulled 185 at my first meet this spring.',
    name: 'Tomas Lindgren',
    detail: 'Member since 2023 · Downtown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    result: '5:12 → 4:18',
    window: 'mile time, 9 months',
    quote: 'Tasha’s Sprint Engine class is brutal and I mean that as the highest compliment. I came for general fitness and accidentally became a runner. My team noticed before I did.',
    name: 'Aisha Bello',
    detail: 'Member since 2025 · Northgate',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
];

const locations = [
  { name: 'Downtown', tag: 'Flagship', address: '440 Granite Ave', hours: '05:00 – 23:00', sqft: '24,000 sq ft' },
  { name: 'Riverside', tag: '24/7', address: '88 Mill River Rd', hours: 'Always open', sqft: '15,500 sq ft' },
  { name: 'Northgate', tag: 'New', address: '12 Summit Pkwy', hours: '05:00 – 23:00', sqft: '19,200 sq ft' },
  { name: 'Eastfield', tag: 'Combat hub', address: '301 Anvil St', hours: '06:00 – 22:00', sqft: '11,800 sq ft' },
  { name: 'Westbrook', tag: '24/7', address: '67 Ridgeline Blvd', hours: 'Always open', sqft: '13,400 sq ft' },
  { name: 'Harbor Point', tag: 'Pool + gym', address: '5 Quayside Walk', hours: '05:30 – 22:30', sqft: '21,000 sq ft' },
];

const footerCols = [
  { title: 'Train', links: ['Class schedule', 'Trainers', 'Membership plans', 'Personal training', 'Day passes'] },
  { title: 'Club', links: ['Locations', 'About IronPeak', 'Careers', 'Community events', 'Press kit'] },
  { title: 'Support', links: ['Contact', 'Member portal', 'Freeze membership', 'Gift cards', 'FAQ'] },
];

export default function IronPeakGymPreview() {
  const [activeDay, setActiveDay] = useState<Day>('Mon');
  const slots = schedule[activeDay];

  return (
    <div style={{ fontFamily: body, background: BLACK, color: '#f5f5f4', minHeight: '100vh' }}>

      {/* ── 1. STICKY NAV ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', background: LIME, transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: display, fontWeight: 900, fontSize: '20px', color: BLACK, transform: 'skewX(10deg)' }}>▲</span>
            </div>
            <span style={{ fontFamily: display, fontSize: '22px', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Iron<span style={{ color: LIME }}>Peak</span></span>
          </div>
          <nav style={{ display: 'flex', gap: '1.8rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: LIME, color: BLACK, padding: '11px 24px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block' }}>
            <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>Free week →</span>
          </a>
        </div>
      </header>

      {/* ── 2. HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '640px', display: 'flex', alignItems: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
          alt="IronPeak gym floor"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(35%) contrast(1.1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,10,10,0.96) 30%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.85))' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem', position: 'relative', width: '100%' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: '1px solid rgba(163,230,53,0.4)', background: LIME_DIM, padding: '7px 16px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: LIME }}>
            <span style={{ width: '7px', height: '7px', background: LIME, boxShadow: '0 0 10px rgba(163,230,53,0.9)' }} />
            Northgate flagship now open
          </span>
          <h1 style={{ fontFamily: display, fontSize: 'clamp(3.4rem, 9vw, 7rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '1.6rem 0 0', maxWidth: '820px' }}>
            The mountain<br />doesn{'’'}t care.<br /><span style={{ color: LIME }}>Climb anyway.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d4d4d4', lineHeight: 1.7, maxWidth: '520px', margin: '1.8rem 0 0' }}>
            IronPeak is a gym for people who show up. 240 coached classes a week, 38 coaches who know your name, and six locations that never let you make the “too far away” excuse.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.4rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: LIME, color: BLACK, padding: '16px 34px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block', boxShadow: '0 0 50px rgba(163,230,53,0.35)' }}>
              <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>Claim your free week</span>
            </a>
            <a href="#" style={{ border: '2px solid #f5f5f4', color: '#f5f5f4', padding: '14px 32px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block' }}>
              <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>View schedule</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. SKEWED MARQUEE BREAK ── */}
      <div style={{ background: LIME, transform: 'skewY(-1.5deg)', margin: '-26px 0 0', padding: '16px 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', whiteSpace: 'nowrap' }}>
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={`${w}-${i}`} style={{ fontFamily: display, fontSize: '18px', fontWeight: 900, letterSpacing: '0.05em', color: BLACK, textTransform: 'uppercase' }}>
              {w} <span style={{ margin: '0 0 0 2.5rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 4. STATS STRIP ── */}
      <section style={{ padding: '5rem 2rem 4rem', borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderLeft: `4px solid ${LIME}`, paddingLeft: '1.4rem' }}>
              <div style={{ fontFamily: display, fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#f5f5f4' }}>{s.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: FAINT, marginTop: '10px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CLASS SCHEDULE (filterable by day) ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Classes</span>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>
                This week on the floor
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {days.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  style={{ fontFamily: body, cursor: 'pointer', border: activeDay === d ? `1px solid ${LIME}` : BORDER, background: activeDay === d ? LIME : 'transparent', color: activeDay === d ? BLACK : MUTED, padding: '10px 18px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', transform: 'skewX(-8deg)' }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>{d}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1rem' }}>
            {slots.map(slot => (
              <div key={`${activeDay}-${slot.time}-${slot.name}`} style={{ background: PANEL, border: BORDER, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: display, fontSize: '2rem', fontWeight: 900, color: LIME, lineHeight: 1, letterSpacing: '0.01em' }}>{slot.time}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: intensityColor[slot.intensity], border: `1px solid ${intensityColor[slot.intensity]}`, padding: '4px 10px' }}>
                    {slot.intensity}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: display, fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.01em', margin: 0 }}>{slot.name}</h3>
                  <p style={{ fontSize: '13px', color: MUTED, margin: '5px 0 0' }}>Coach {slot.coach} · 45 min</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: BORDER, paddingTop: '0.9rem' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: slot.spots === 0 ? '#f87171' : slot.spots <= 3 ? '#fbbf24' : MUTED }}>
                    {slot.spots === 0 ? 'Waitlist only' : `${slot.spots} spots left`}
                  </span>
                  <a href="#" style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: slot.spots === 0 ? FAINT : LIME, textDecoration: 'none' }}>
                    {slot.spots === 0 ? 'Join waitlist' : 'Book →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: FAINT, marginTop: '1.5rem' }}>
            Showing {slots.length} classes for {activeDay} at Downtown flagship. Members can book up to 7 days ahead in the IronPeak app.
          </p>
        </div>
      </section>

      {/* ── 6. TRAINERS ── */}
      <section style={{ padding: '5.5rem 2rem', background: PANEL, borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.8rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Trainers</span>
            <h2 style={{ fontFamily: display, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0.9rem', lineHeight: 1 }}>
              Coaches who count your last rep
            </h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '560px', lineHeight: 1.7, margin: 0 }}>
              Every IronPeak coach is nationally certified and re-tested every year. They program, they spot, they remember your knee — and they will absolutely notice if you skip Tuesday.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {trainers.map(t => (
              <div key={t.name} style={{ background: BLACK, border: BORDER, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(55%) contrast(1.08)' }} />
                  <div style={{ position: 'absolute', left: 0, bottom: 0, background: LIME, color: BLACK, padding: '6px 14px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {t.role}
                  </div>
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <h3 style={{ fontFamily: display, fontSize: '21px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 6px', letterSpacing: '0.01em' }}>{t.name}</h3>
                  <p style={{ fontSize: '12.5px', color: FAINT, margin: '0 0 1rem', lineHeight: 1.6 }}>{t.record}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {t.specialties.map(s => (
                      <span key={s} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED, border: BORDER, padding: '4px 10px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MEMBERSHIP PLANS ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Plans</span>
            <h2 style={{ fontFamily: display, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0.9rem', lineHeight: 1 }}>
              Pick your altitude
            </h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              No joining fees, no 12-month traps. Every plan starts with a free week and a coached assessment, and you can freeze or cancel from the app.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.3rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ position: 'relative', background: plan.highlight ? LIME_DIM : PANEL, border: plan.highlight ? `2px solid ${LIME}` : BORDER, padding: '2.2rem', boxShadow: plan.highlight ? '0 0 60px rgba(163,230,53,0.15)' : 'none' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%) skewX(-8deg)', background: LIME, color: BLACK, padding: '5px 16px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    Most chosen
                  </div>
                )}
                <h3 style={{ fontFamily: display, fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 6px', letterSpacing: '0.01em' }}>{plan.name}</h3>
                <p style={{ fontSize: '13.5px', color: MUTED, margin: '0 0 1.4rem', lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '1.6rem' }}>
                  <span style={{ fontFamily: display, fontSize: '3.4rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: plan.highlight ? LIME : '#f5f5f4' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: FAINT, marginBottom: '7px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', padding: '14px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.6rem', background: plan.highlight ? LIME : 'transparent', color: plan.highlight ? BLACK : '#f5f5f4', border: plan.highlight ? 'none' : '2px solid #3a3a3a' }}>
                  {plan.cta}
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '13.5px', color: '#d4d4d4' }}>
                      <span style={{ color: LIME, fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TRANSFORMATIONS ── */}
      <section style={{ padding: '5.5rem 2rem', background: PANEL, borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.8rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Transformations</span>
            <h2 style={{ fontFamily: display, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>
              Receipts, not promises
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.3rem' }}>
            {transformations.map(t => (
              <div key={t.name} style={{ background: BLACK, border: BORDER, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                <div>
                  <div style={{ fontFamily: display, fontSize: '3rem', fontWeight: 900, color: LIME, lineHeight: 1, letterSpacing: '-0.01em' }}>{t.result}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: FAINT, marginTop: '7px' }}>{t.window}</div>
                </div>
                <p style={{ fontSize: '14.5px', color: '#d4d4d4', lineHeight: 1.8, margin: 0, flex: 1 }}>{'“'}{t.quote}{'”'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: BORDER, paddingTop: '1.2rem' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${LIME}` }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: FAINT, margin: 0 }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. LOCATIONS STRIP ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Locations</span>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>
                Six peaks, one membership
              </h2>
            </div>
            <a href="#" style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: LIME, textDecoration: 'none' }}>Find your nearest →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1rem' }}>
            {locations.map(loc => (
              <div key={loc.name} style={{ background: PANEL, border: BORDER, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: display, fontSize: '21px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.01em' }}>{loc.name}</h3>
                  <span style={{ fontSize: '10.5px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', background: LIME, color: BLACK, padding: '4px 10px', transform: 'skewX(-8deg)' }}>
                    <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>{loc.tag}</span>
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: MUTED, margin: 0 }}>{loc.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: BORDER, paddingTop: '0.8rem', fontSize: '12.5px', color: FAINT }}>
                  <span>{loc.hours}</span>
                  <span>{loc.sqft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. BOOK / CTA ── */}
      <section style={{ padding: '0 0 6rem', position: 'relative' }}>
        <div style={{ background: LIME, transform: 'skewY(-1.5deg)', padding: '5rem 2rem', margin: '2rem 0 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', transform: 'skewY(1.5deg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 0.98, color: BLACK, margin: 0 }}>
                Book your first session. Free.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(10,10,10,0.75)', lineHeight: 1.7, margin: '1.3rem 0 0', maxWidth: '460px', fontWeight: 500 }}>
                Seven days, every class, any location — and a 1-on-1 assessment with a coach to map your first eight weeks. No card required. The only thing we hold is your spot.
              </p>
            </div>
            <div style={{ background: BLACK, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: LIME }}>Start here</span>
              <input placeholder="Full name" style={{ fontFamily: body, background: PANEL, border: BORDER, color: '#f5f5f4', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
              <input placeholder="Email address" style={{ fontFamily: body, background: PANEL, border: BORDER, color: '#f5f5f4', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
              <select defaultValue="Downtown" style={{ fontFamily: body, background: PANEL, border: BORDER, color: '#f5f5f4', padding: '14px 16px', fontSize: '14px', outline: 'none' }}>
                {locations.map(loc => <option key={loc.name} value={loc.name}>{loc.name}</option>)}
              </select>
              <button style={{ fontFamily: body, cursor: 'pointer', background: LIME, color: BLACK, border: 'none', padding: '15px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                Claim my free week
              </button>
              <p style={{ fontSize: '11.5px', color: FAINT, margin: 0, lineHeight: 1.6 }}>A coach will text you within one business day to book your assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer style={{ borderTop: BORDER, padding: '3.5rem 2rem 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', background: LIME, transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: display, fontWeight: 900, fontSize: '16px', color: BLACK, transform: 'skewX(10deg)' }}>▲</span>
                </div>
                <span style={{ fontFamily: display, fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Iron<span style={{ color: LIME }}>Peak</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: FAINT, lineHeight: 1.7, margin: 0 }}>
                Six gyms, 38 coaches, zero excuses. Training this city harder since 2012 — one earned rep at a time.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: LIME, margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '13.5px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: BORDER, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: FAINT, margin: 0 }}>© 2026 IronPeak Athletics Ltd. The mountain doesn{'’'}t care. Climb anyway.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'TikTok', 'YouTube', 'Strava'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12.5px', color: FAINT, textDecoration: 'none', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
