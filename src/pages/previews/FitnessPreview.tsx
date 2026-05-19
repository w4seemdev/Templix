import { useState } from 'react';

const plans = [
  { name: 'Starter', price: '$29', period: '/mo', features: ['3 classes/week', 'Locker access', 'App access', 'Progress tracking'], highlight: false },
  { name: 'Pro', price: '$59', period: '/mo', features: ['Unlimited classes', 'Personal trainer (2×/mo)', 'Nutrition plan', 'Priority booking', 'Guest passes'], highlight: true },
  { name: 'Elite', price: '$99', period: '/mo', features: ['Everything in Pro', 'Daily PT sessions', 'Custom meal plans', 'Recovery suite', 'VIP lounge'], highlight: false },
];

const classes = [
  { name: 'HIIT Blast', trainer: 'Marcus J.', time: '6:00 AM', spots: 4, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80', intensity: 'High' },
  { name: 'Yoga Flow', trainer: 'Priya S.', time: '8:00 AM', spots: 12, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', intensity: 'Low' },
  { name: 'Spin Cycle', trainer: 'Dana K.', time: '7:00 AM', spots: 6, img: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=400&q=80', intensity: 'High' },
  { name: 'Pilates Core', trainer: 'Elena R.', time: '9:30 AM', spots: 8, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', intensity: 'Med' },
];

const intensityColor: Record<string, string> = { High: '#ef4444', Med: '#f59e0b', Low: '#22c55e' };

export default function FitnessPreview() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Strength', 'Cardio', 'Yoga', 'Recovery'];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#09090b', color: '#fafafa', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #18181b', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #ef4444, #f97316)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M6.5 6.5h11M6.5 17.5h11M12 2v20M2 12h20"/><circle cx="6.5" cy="6.5" r="2" fill="#fff"/><circle cx="17.5" cy="6.5" r="2" fill="#fff"/><circle cx="6.5" cy="17.5" r="2" fill="#fff"/><circle cx="17.5" cy="17.5" r="2" fill="#fff"/></svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>IronPeak</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Classes', 'Trainers', 'Plans', 'Locations'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#71717a', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <button style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          Join Now
        </button>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,9,11,0.95) 40%, rgba(9,9,11,0.3) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '9999px', padding: '4px 14px', marginBottom: '1.5rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>NOW OPEN — 3 Locations</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.25rem' }}>
              Forge your<br /><span style={{ color: '#ef4444' }}>peak</span> self.
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#71717a', lineHeight: 1.7, marginBottom: '2rem' }}>
              World-class trainers, premium equipment, and a community that pushes you further than you thought possible.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Start Free Trial</button>
              <button style={{ background: 'transparent', border: '1px solid #27272a', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#fafafa', cursor: 'pointer' }}>View Classes</button>
            </div>
          </div>
        </div>
        {/* Stats overlay */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '4rem', display: 'flex', gap: '2rem' }}>
          {[['2,400+', 'Members'], ['45+', 'Classes/week'], ['18', 'Elite Trainers']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', background: 'rgba(9,9,11,0.8)', border: '1px solid #27272a', borderRadius: '12px', padding: '12px 20px' }}>
              <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#ef4444', margin: '0 0 2px' }}>{v}</p>
              <p style={{ fontSize: '11px', color: '#71717a', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Classes */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Today's Classes</h2>
            <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>Book your spot before they fill up</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '6px 14px', borderRadius: '9999px', border: '1px solid', borderColor: activeTab === tab ? '#ef4444' : '#27272a', background: activeTab === tab ? 'rgba(239,68,68,0.1)' : 'transparent', color: activeTab === tab ? '#ef4444' : '#71717a', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {classes.map(cls => (
            <div key={cls.name} style={{ background: '#18181b', borderRadius: '16px', overflow: 'hidden', border: '1px solid #27272a', cursor: 'pointer' }}>
              <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img src={cls.img} alt={cls.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: intensityColor[cls.intensity], color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{cls.intensity}</span>
              </div>
              <div style={{ padding: '1.125rem' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{cls.name}</h3>
                <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 0.875rem' }}>with {cls.trainer} · {cls.time}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: cls.spots <= 5 ? '#ef4444' : '#22c55e' }}>{cls.spots} spots left</span>
                  <button style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: '#0c0c0e', padding: '4rem 2rem', borderTop: '1px solid #18181b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem' }}>Simple pricing</h2>
          <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '2.5rem' }}>No contracts. Cancel anytime.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: plan.highlight ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.1))' : '#18181b', border: plan.highlight ? '1px solid rgba(239,68,68,0.4)' : '1px solid #27272a', borderRadius: '16px', padding: '2rem', textAlign: 'left', position: 'relative' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #ef4444, #f97316)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 14px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 0.5rem', fontWeight: 600 }}>{plan.name}</p>
                <p style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 1.5rem', letterSpacing: '-0.03em' }}>{plan.price}<span style={{ fontSize: '14px', fontWeight: 400, color: '#71717a' }}>{plan.period}</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontSize: '13px', color: '#a1a1aa', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#ef4444', fontSize: '14px' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', background: plan.highlight ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'transparent', border: plan.highlight ? 'none' : '1px solid #3f3f46', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 700, color: plan.highlight ? '#fff' : '#a1a1aa', cursor: 'pointer' }}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
