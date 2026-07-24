/* ============================================================
   IRONPEAK — Gym & fitness template
   Near-black theme · electric lime accent · bold condensed display
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const BLACK = '#0a0a0a';
const LIME = '#a3e635';
const LIME_DIM = 'rgba(163,230,53,0.12)';
const PANEL = '#121212';
const BORDER = '1px solid #242424';
const MUTED = '#9ca3af';
const FAINT = '#6b7280';
const display = "'Oswald', 'Arial Narrow', Impact, sans-serif";
const body = "'Inter', system-ui, sans-serif";

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

const navLinks = ['Classes', 'Trainers', 'Plans', 'Locations', 'Book'];
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
const intensityColor: Record<Intensity, string> = { 'All levels': '#a3e635', Intermediate: '#fbbf24', Advanced: '#f87171' };

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
  { name: 'Marcus Vale', role: 'Head of Strength', specialties: ['Powerlifting', 'Olympic lifting', 'Programming'], record: '14 yrs coaching · 3× national meet podium', c1: '#1a2a0a', c2: '#65a30d' },
  { name: 'Tasha Okoro', role: 'Conditioning Lead', specialties: ['HIIT', 'Sprint mechanics', 'Fat loss'], record: 'Former 400m sprinter · 2,100+ classes led', c1: '#0a1a1a', c2: '#0d9488' },
  { name: 'Dani Reyes', role: 'Combat Coach', specialties: ['Boxing', 'Kickboxing', 'Footwork'], record: '11–2 amateur record · Golden Gloves regional', c1: '#2a0a0a', c2: '#dc2626' },
  { name: 'June Park', role: 'Mobility & Recovery', specialties: ['Mobility', 'Yoga for lifters', 'Rehab prep'], record: 'DPT-certified · keeps 12,500 members moving', c1: '#1a1030', c2: '#7c3aed' },
];

const plans = [
  { name: 'Base Camp', price: '$39', period: '/month', desc: 'Full gym floor access at your home location. Train on your own terms.', features: ['One home location', 'Open gym 05:00–23:00', 'Locker room & sauna', 'Free intro assessment', 'IronPeak app tracking'], cta: 'Start at Base Camp', highlight: false },
  { name: 'Ascent', price: '$69', period: '/month', desc: 'Every class, every location. The plan 8 out of 10 members choose.', features: ['All 6 locations', 'Unlimited classes (240/wk)', 'Class booking priority', '2 guest passes monthly', 'Quarterly progress testing', 'Recovery zone access'], cta: 'Claim free week', highlight: true },
  { name: 'Summit', price: '$129', period: '/month', desc: 'Personal programming and a coach in your corner, every week.', features: ['Everything in Ascent', '2 PT sessions monthly', 'Custom training program', 'Nutrition check-ins', '24/7 keycard access', 'Comp prep support'], cta: 'Go Summit', highlight: false },
];

const transformations = [
  { result: '-28 KG', window: 'in 11 months', quote: 'I walked in terrified of the weight room. Marcus handed me an empty bar and a plan, and the plan just kept working. Now Friday Throwdown is the highlight of my week.', name: 'Priya Nandakumar', detail: 'Member since 2024 · Riverside', c1: '#1a2a0a', c2: '#65a30d' },
  { result: '+185 KG', window: 'deadlift PR', quote: 'Three gyms told me to take it easy after my back injury. June rebuilt my hinge from scratch and Barbell Club did the rest. Pulled 185 at my first meet this spring.', name: 'Tomas Lindgren', detail: 'Member since 2023 · Downtown', c1: '#0a1a1a', c2: '#0d9488' },
  { result: '5:12 → 4:18', window: 'mile, 9 months', quote: 'Tasha’s Sprint Engine class is brutal and I mean that as the highest compliment. I came for general fitness and accidentally became a runner. My team noticed before I did.', name: 'Aisha Bello', detail: 'Member since 2025 · Northgate', c1: '#2a0a0a', c2: '#dc2626' },
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

function TrainerArt({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <div style={{ aspectRatio: '4 / 3', background: `linear-gradient(150deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: display, fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.85)' }}>{initials}</span>
    </div>
  );
}

export default function IronPeakGymPreview() {
  const m = useIsMobile();
  const [activeDay, setActiveDay] = useState<Day>('Mon');
  const [open, setOpen] = useState(false);
  const slots = schedule[activeDay];
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: body, background: BLACK, color: '#f5f5f4', minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', background: LIME, transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={BLACK} style={{ transform: 'skewX(10deg)' }}><path d="M12 3l9 16H3z" /></svg>
            </div>
            <span style={{ fontFamily: display, fontSize: '22px', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Iron<span style={{ color: LIME }}>Peak</span></span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.8rem' }}>{navLinks.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a href="#Book" style={{ background: LIME, color: BLACK, padding: m ? '9px 14px' : '11px 24px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block' }}><span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>Free week →</span></a>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: BORDER, padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: LIME, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: BORDER }}>
            {navLinks.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f5f5f4', textDecoration: 'none', borderBottom: BORDER }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: m ? 'auto' : '620px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, #050505 30%, #14210a 75%, #0a0a0a)' }} />
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          <path d="M0 300 L120 90 L200 200 L300 40 L400 160 V300z" fill="none" stroke={LIME} strokeWidth="2" />
        </svg>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3.25rem 1.25rem' : '5rem 2rem', position: 'relative', width: '100%' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: '1px solid rgba(163,230,53,0.4)', background: LIME_DIM, padding: '7px 16px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: LIME }}>
            <span style={{ width: '7px', height: '7px', background: LIME, boxShadow: '0 0 10px rgba(163,230,53,0.9)' }} />Northgate flagship now open
          </span>
          <h1 style={{ fontFamily: display, fontSize: m ? '2.9rem' : 'clamp(3.4rem, 9vw, 7rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '1.6rem 0 0', maxWidth: '820px' }}>
            The mountain<br />doesn&rsquo;t care.<br /><span style={{ color: LIME }}>Climb anyway.</span>
          </h1>
          <p style={{ fontSize: m ? '1rem' : '1.1rem', color: '#d4d4d4', lineHeight: 1.7, maxWidth: '520px', margin: '1.8rem 0 0' }}>IronPeak is a gym for people who show up. 240 coached classes a week, 38 coaches who know your name, and six locations that never let you make the &ldquo;too far away&rdquo; excuse.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.4rem', flexWrap: 'wrap' }}>
            <a href="#Book" style={{ background: LIME, color: BLACK, padding: '16px 30px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block', boxShadow: '0 0 50px rgba(163,230,53,0.35)' }}><span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>Claim your free week</span></a>
            <a href="#Classes" style={{ border: '2px solid #f5f5f4', color: '#f5f5f4', padding: '14px 28px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transform: 'skewX(-8deg)', display: 'inline-block' }}><span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>View schedule</span></a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: LIME, transform: 'skewY(-1.5deg)', margin: '-26px 0 0', padding: '16px 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', whiteSpace: 'nowrap', flexWrap: m ? 'wrap' : 'nowrap' }}>
          {marqueeWords.map((w, i) => (
            <span key={`${w}-${i}`} style={{ fontFamily: display, fontSize: m ? '15px' : '18px', fontWeight: 900, letterSpacing: '0.05em', color: BLACK, textTransform: 'uppercase' }}>{w}<span style={{ margin: '0 0 0 1.5rem', color: 'rgba(10,10,10,0.5)' }}>/</span></span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0 4rem', borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.5rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderLeft: `4px solid ${LIME}`, paddingLeft: '1.2rem' }}>
              <div style={{ fontFamily: display, fontSize: m ? '2.4rem' : 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#f5f5f4' }}>{s.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: FAINT, marginTop: '10px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section id="Classes" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Classes</span>
              <h2 style={{ fontFamily: display, fontSize: m ? '2.2rem' : 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>This week on the floor</h2>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {days.map(d => (
                <button key={d} onClick={() => setActiveDay(d)} style={{ fontFamily: body, cursor: 'pointer', border: activeDay === d ? `1px solid ${LIME}` : BORDER, background: activeDay === d ? LIME : 'transparent', color: activeDay === d ? BLACK : MUTED, padding: '10px 16px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', transform: 'skewX(-8deg)' }}><span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>{d}</span></button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1rem' }}>
            {slots.map(slot => (
              <div key={`${activeDay}-${slot.time}-${slot.name}`} style={{ background: PANEL, border: BORDER, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: display, fontSize: '2rem', fontWeight: 900, color: LIME, lineHeight: 1 }}>{slot.time}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: intensityColor[slot.intensity], border: `1px solid ${intensityColor[slot.intensity]}`, padding: '4px 10px' }}>{slot.intensity}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: display, fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>{slot.name}</h3>
                  <p style={{ fontSize: '13px', color: MUTED, margin: '5px 0 0' }}>Coach {slot.coach} · 45 min</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: BORDER, paddingTop: '0.9rem' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: slot.spots === 0 ? '#f87171' : slot.spots <= 3 ? '#fbbf24' : MUTED }}>{slot.spots === 0 ? 'Waitlist only' : `${slot.spots} spots left`}</span>
                  <a href="#Book" style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: slot.spots === 0 ? FAINT : LIME, textDecoration: 'none' }}>{slot.spots === 0 ? 'Join waitlist' : 'Book →'}</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: FAINT, marginTop: '1.5rem' }}>Showing {slots.length} classes for {activeDay} at Downtown flagship. Members can book up to 7 days ahead in the IronPeak app.</p>
        </div>
      </section>

      {/* Trainers */}
      <section id="Trainers" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: PANEL, borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ marginBottom: m ? '2rem' : '2.8rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Trainers</span>
            <h2 style={{ fontFamily: display, fontSize: m ? '2.2rem' : 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0.9rem', lineHeight: 1 }}>Coaches who count your last rep</h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '560px', lineHeight: 1.7, margin: 0 }}>Every IronPeak coach is nationally certified and re-tested every year. They program, they spot, they remember your knee — and they will notice if you skip Tuesday.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: m ? '0.9rem' : '1.2rem' }}>
            {trainers.map(t => (
              <div key={t.name} style={{ background: BLACK, border: BORDER, overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <TrainerArt c1={t.c1} c2={t.c2} name={t.name} />
                  <div style={{ position: 'absolute', left: 0, bottom: 0, background: LIME, color: BLACK, padding: '6px 12px', fontSize: '10.5px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.role}</div>
                </div>
                <div style={{ padding: m ? '1rem' : '1.4rem' }}>
                  <h3 style={{ fontFamily: display, fontSize: m ? '17px' : '21px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 6px' }}>{t.name}</h3>
                  <p style={{ fontSize: '12.5px', color: FAINT, margin: '0 0 1rem', lineHeight: 1.6 }}>{t.record}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {t.specialties.map(s => <span key={s} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED, border: BORDER, padding: '4px 9px' }}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="Plans" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Plans</span>
            <h2 style={{ fontFamily: display, fontSize: m ? '2.2rem' : 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0.9rem', lineHeight: 1 }}>Pick your altitude</h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>No joining fees, no 12-month traps. Every plan starts with a free week and a coached assessment, and you can freeze or cancel from the app.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.3rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ position: 'relative', background: plan.highlight ? LIME_DIM : PANEL, border: plan.highlight ? `2px solid ${LIME}` : BORDER, padding: m ? '1.75rem' : '2.2rem', boxShadow: plan.highlight ? '0 0 60px rgba(163,230,53,0.15)' : 'none' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%) skewX(-8deg)', background: LIME, color: BLACK, padding: '5px 16px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most chosen</div>}
                <h3 style={{ fontFamily: display, fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 6px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13.5px', color: MUTED, margin: '0 0 1.4rem', lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '1.6rem' }}>
                  <span style={{ fontFamily: display, fontSize: '3.4rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: plan.highlight ? LIME : '#f5f5f4' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: FAINT, marginBottom: '7px' }}>{plan.period}</span>
                </div>
                <a href="#Book" style={{ display: 'block', textAlign: 'center', padding: '14px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.6rem', background: plan.highlight ? LIME : 'transparent', color: plan.highlight ? BLACK : '#f5f5f4', border: plan.highlight ? 'none' : '2px solid #3a3a3a' }}>{plan.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '13.5px', color: '#d4d4d4' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations */}
      <section style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: PANEL, borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ marginBottom: m ? '2rem' : '2.8rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Transformations</span>
            <h2 style={{ fontFamily: display, fontSize: m ? '2.2rem' : 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>Receipts, not promises</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.3rem' }}>
            {transformations.map(t => (
              <div key={t.name} style={{ background: BLACK, border: BORDER, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                <div>
                  <div style={{ fontFamily: display, fontSize: '3rem', fontWeight: 900, color: LIME, lineHeight: 1 }}>{t.result}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: FAINT, marginTop: '7px' }}>{t.window}</div>
                </div>
                <p style={{ fontSize: '14.5px', color: '#d4d4d4', lineHeight: 1.8, margin: 0, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: BORDER, paddingTop: '1.2rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(150deg, ${t.c1}, ${t.c2})`, border: `2px solid ${LIME}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 800, flexShrink: 0 }}>{t.name.split(' ').map(w => w[0]).join('')}</div>
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

      {/* Locations */}
      <section id="Locations" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: LIME }}>Locations</span>
              <h2 style={{ fontFamily: display, fontSize: m ? '2.2rem' : 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0.6rem 0 0', lineHeight: 1 }}>Six peaks, one membership</h2>
            </div>
            <a href="#" style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: LIME, textDecoration: 'none' }}>Find your nearest →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1rem' }}>
            {locations.map(loc => (
              <div key={loc.name} style={{ background: PANEL, border: BORDER, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: display, fontSize: '21px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>{loc.name}</h3>
                  <span style={{ fontSize: '10.5px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', background: LIME, color: BLACK, padding: '4px 10px', transform: 'skewX(-8deg)' }}><span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>{loc.tag}</span></span>
                </div>
                <p style={{ fontSize: '13.5px', color: MUTED, margin: 0 }}>{loc.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: BORDER, paddingTop: '0.8rem', fontSize: '12.5px', color: FAINT }}>
                  <span>{loc.hours}</span><span>{loc.sqft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="Book" style={{ padding: '0 0 6rem', position: 'relative' }}>
        <div style={{ background: LIME, transform: 'skewY(-1.5deg)', padding: m ? '3.5rem 0' : '5rem 0', margin: '2rem 0 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: pad, transform: 'skewY(1.5deg)', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: display, fontSize: m ? '2.4rem' : 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 0.98, color: BLACK, margin: 0 }}>Book your first session. Free.</h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(10,10,10,0.75)', lineHeight: 1.7, margin: '1.3rem 0 0', maxWidth: '460px', fontWeight: 500 }}>Seven days, every class, any location — and a 1-on-1 assessment with a coach to map your first eight weeks. No card required. The only thing we hold is your spot.</p>
            </div>
            <div style={{ background: BLACK, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: LIME }}>Start here</span>
              <div style={{ background: PANEL, border: BORDER, color: FAINT, padding: '14px 16px', fontSize: '14px' }}>Full name</div>
              <div style={{ background: PANEL, border: BORDER, color: FAINT, padding: '14px 16px', fontSize: '14px' }}>Email address</div>
              <div style={{ background: PANEL, border: BORDER, color: '#f5f5f4', padding: '14px 16px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Downtown<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></div>
              <button style={{ fontFamily: body, cursor: 'pointer', background: LIME, color: BLACK, border: 'none', padding: '15px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.3rem' }}>Claim my free week</button>
              <p style={{ fontSize: '11.5px', color: FAINT, margin: 0, lineHeight: 1.6 }}>A coach will text you within one business day to book your assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: BORDER, padding: m ? '3rem 0 2rem' : '3.5rem 0 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', background: LIME, transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={BLACK} style={{ transform: 'skewX(10deg)' }}><path d="M12 3l9 16H3z" /></svg>
                </div>
                <span style={{ fontFamily: display, fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>Iron<span style={{ color: LIME }}>Peak</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: FAINT, lineHeight: 1.7, margin: 0 }}>Six gyms, 38 coaches, zero excuses. Training this city harder since 2012 — one earned rep at a time.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: LIME, margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13.5px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: BORDER, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: FAINT, margin: 0 }}>© 2026 IronPeak Athletics Ltd. Climb anyway.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'TikTok', 'YouTube', 'Strava'].map(s => <a key={s} href="#" style={{ fontSize: '12.5px', color: FAINT, textDecoration: 'none', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
