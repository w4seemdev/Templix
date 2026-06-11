import { useState } from 'react';

/* ============================================================
   SWIFT — Food Delivery App Landing Template
   Bright white theme · tangerine accent (#f97316) · playful
   rounded shapes, pill badges, and a CSS-built phone mockup
   ============================================================ */

const TANGERINE = '#f97316';
const TANGERINE_DARK = '#ea580c';
const INK = '#1c1917';
const MUTED = '#78716c';
const BORDER = '#f0e9e1';
const CREAM = '#fff7ed';

const navLinks = ['Home', 'How It Works', 'Restaurants', 'Download', 'FAQ'];

const stats = [
  { value: '2,400+', label: 'Partner restaurants' },
  { value: '28 min', label: 'Average delivery' },
  { value: '120', label: 'Cities served' },
  { value: '4.8 ★', label: 'App Store rating' },
];

const phoneRows = [
  { emoji: '🍔', name: 'Smash Bros Burgers', meta: '4.8 ★ · 15–25 min · Free delivery' },
  { emoji: '🍕', name: 'Margherita Mia', meta: '4.9 ★ · 20–30 min · $1.49' },
  { emoji: '🍣', name: 'Tokyo Drift Sushi', meta: '4.7 ★ · 25–35 min · $2.49' },
];

const orderStages = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

const steps = [
  { num: '1', icon: '📍', title: 'Drop your pin', desc: 'Type your address once and Swift remembers it. We instantly show every restaurant that can reach you while the food is still hot.' },
  { num: '2', icon: '🛒', title: 'Build your order', desc: 'Browse menus with real photos, stack your cart from multiple spots, and pay in two taps with card, wallet, or cash on delivery.' },
  { num: '3', icon: '🛵', title: 'Watch it fly', desc: 'A nearby courier grabs your order and you follow them block by block on a live map — down to the minute they ring your bell.' },
];

const cuisines = ['All', 'Burgers', 'Pizza', 'Sushi', 'Mexican', 'Healthy', 'Dessert'];

const restaurants = [
  { name: 'Smash Bros Burgers', cuisine: 'Burgers', rating: '4.8', eta: '15–25 min', fee: 'Free delivery', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
  { name: 'Margherita Mia', cuisine: 'Pizza', rating: '4.9', eta: '20–30 min', fee: '$1.49 delivery', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80' },
  { name: 'Tokyo Drift Sushi', cuisine: 'Sushi', rating: '4.7', eta: '25–35 min', fee: '$2.49 delivery', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80' },
  { name: 'La Taquería Verde', cuisine: 'Mexican', rating: '4.8', eta: '15–25 min', fee: '$0.99 delivery', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80' },
  { name: 'Greenhouse Bowls', cuisine: 'Healthy', rating: '4.9', eta: '10–20 min', fee: 'Free delivery', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
  { name: 'Sugar Rush Bakery', cuisine: 'Dessert', rating: '4.6', eta: '20–30 min', fee: '$1.99 delivery', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80' },
  { name: 'Patty Cab Co.', cuisine: 'Burgers', rating: '4.7', eta: '20–30 min', fee: '$1.29 delivery', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80' },
  { name: 'Brooklyn Slice Club', cuisine: 'Pizza', rating: '4.8', eta: '25–35 min', fee: '$1.99 delivery', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80' },
];

const trackEvents = [
  { time: '7:42 PM', label: 'Order confirmed', desc: 'Margherita Mia accepted your order.', done: true },
  { time: '7:48 PM', label: 'Kitchen fired it up', desc: 'Two woodfired margheritas in the oven.', done: true },
  { time: '7:59 PM', label: 'Marco picked it up', desc: 'Your courier is 1.2 miles away on Cedar St.', done: true },
  { time: '8:07 PM', label: 'Arriving soon', desc: 'Estimated at your door in 6 minutes.', done: false },
];

const testimonials = [
  { quote: 'Friday night, four hungry kids, zero plans. Swift had pizza on our porch in 24 minutes and the tracker kept the kids glued to the map instead of asking me every 30 seconds.', name: 'Priya Raman', role: 'Orders 3x a week · Austin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { quote: 'I work night shifts and Swift is the only app where the ETA actually means something. If it says 28 minutes, my ramen shows up in 28 minutes. Every single time.', name: 'Marcus Webb', role: 'Swift+ member · Chicago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { quote: 'The multi-restaurant cart is genius. Tacos for me, salad for my roommate, one courier, one delivery fee. We deleted the other two apps within a week.', name: 'Sofia Delgado', role: 'Top reviewer · Miami', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
];

const courierPerks = [
  { icon: '💸', title: 'Earn up to $26/hr', desc: 'Base pay plus 100% of tips, paid out same day if you want it.' },
  { icon: '🗓', title: 'No shifts, no boss', desc: 'Tap online whenever you feel like it — lunch rush, late nights, or just weekends.' },
  { icon: '🛡', title: 'Covered on the road', desc: 'Free accident insurance and gear discounts for every active courier.' },
];

const faqs = [
  { q: 'How fast is delivery, really?', a: 'Our network-wide average is 28 minutes from tap to doorbell. Swift only shows you restaurants inside your speed radius, so we never promise an ETA we can’t keep. If we’re ever more than 10 minutes late, your delivery fee comes back automatically.' },
  { q: 'What does Swift+ include?', a: 'Swift+ is $7.99/month and gets you $0 delivery fees on every order over $12, 5% back in Swift credits, and priority courier matching at peak hours. Members save an average of $21 a month — and you can cancel anytime in two taps.' },
  { q: 'Can I order from more than one restaurant?', a: 'Yes — that’s our favorite trick. Add items from up to three nearby restaurants to a single cart. One courier collects everything along an optimized route, and you pay one delivery fee for the whole haul.' },
  { q: 'What if something is wrong with my order?', a: 'Open the order, tap “Something’s wrong,” and snap a photo. Missing or incorrect items are refunded as Swift credits instantly — no chat queue, no phone call, no interrogation. Cold or damaged food gets a full refund.' },
  { q: 'Which cities is Swift in?', a: 'We’re live in 120 cities across the US and Canada, with 8–10 new launches every quarter. Type your address on the home screen — if we’re not there yet, join the waitlist and we’ll email you the day we switch your zone on.' },
];

const footerCols = [
  { title: 'Get food', links: ['Browse restaurants', 'Cuisines near you', 'Swift+ membership', 'Gift cards'] },
  { title: 'Partners', links: ['Add your restaurant', 'Become a courier', 'Swift for Business', 'Partner portal'] },
  { title: 'Company', links: ['About us', 'Careers', 'Press kit', 'Blog'] },
  { title: 'Support', links: ['Help center', 'Safety', 'Terms', 'Privacy'] },
];

export default function SwiftDeliveryPreview() {
  const [cuisine, setCuisine] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const visibleRestaurants = cuisine === 'All' ? restaurants : restaurants.filter(r => r.cuisine === cuisine);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '14px', background: `linear-gradient(135deg, ${TANGERINE}, #fb923c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 6px 16px rgba(249,115,22,0.35)' }}>🛵</div>
            <span style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.04em' }}>swift<span style={{ color: TANGERINE }}>.</span></span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 600, color: MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: INK, textDecoration: 'none' }}>Sign in</a>
            <a href="#" style={{ background: TANGERINE, color: '#fff', borderRadius: '9999px', padding: '10px 22px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(249,115,22,0.35)' }}>Get the app</a>
          </div>
        </div>
      </header>

      {/* ── Hero with phone mockup ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '4.5rem 1.5rem 5rem', background: `radial-gradient(circle at 85% 20%, rgba(249,115,22,0.1), transparent 50%), #ffffff` }}>
        <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(249,115,22,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-160px', right: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(251,146,60,0.09)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: CREAM, border: '1px solid rgba(249,115,22,0.3)', borderRadius: '9999px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, color: TANGERINE_DARK, marginBottom: '1.5rem' }}>
              🔥 Now live in 120 cities — average drop-off 28 min
            </span>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1.05, margin: 0 }}>
              Hot food, <span style={{ color: TANGERINE }}>swift</span> doorsteps.
            </h1>
            <p style={{ fontSize: '1.125rem', color: MUTED, lineHeight: 1.75, maxWidth: '480px', margin: '1.4rem 0 0' }}>
              Swift connects you to 2,400+ local kitchens with live couriers, minute-accurate ETAs, and a tracker so satisfying you’ll watch the whole ride. Dinner is one thumb away.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: TANGERINE, color: '#fff', borderRadius: '9999px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 26px rgba(249,115,22,0.4)' }}>Order now →</a>
              <a href="#" style={{ background: '#fff', color: INK, border: `1.5px solid ${BORDER}`, borderRadius: '9999px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Become a courier</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '2.25rem' }}>
              <div style={{ display: 'flex' }}>
                {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'].map((src, i) => (
                  <img key={src} src={src} alt="Happy Swift customer" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', marginLeft: i === 0 ? 0 : '-12px' }} />
                ))}
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, margin: 0 }}><strong style={{ color: INK }}>1.2M+ hungry people</strong> ordered with Swift last month</p>
            </div>
          </div>

          {/* CSS phone mockup — delivery order screen */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '300px', borderRadius: '42px', background: INK, padding: '12px', boxShadow: '0 40px 90px rgba(28,25,23,0.28), 0 12px 30px rgba(249,115,22,0.18)' }}>
              <div style={{ borderRadius: '32px', background: '#fff', overflow: 'hidden' }}>
                {/* Notch + status bar */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
                  <div style={{ width: '92px', height: '22px', borderRadius: '9999px', background: INK }} />
                </div>
                {/* App header */}
                <div style={{ padding: '10px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: TANGERINE, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Deliver to</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: INK }}>418 Maple Ave 📍</div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🧡</div>
                </div>
                {/* Search bar */}
                <div style={{ margin: '12px 16px 0', background: '#faf7f2', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '9px 13px', fontSize: '12px', color: '#a8a29e' }}>
                  🔍 Craving tacos? Search away…
                </div>
                {/* Restaurant rows */}
                <div style={{ padding: '12px 16px 4px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: INK, marginBottom: '8px' }}>Near you now</div>
                  {phoneRows.map(r => (
                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{r.emoji}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                        <div style={{ fontSize: '10.5px', color: MUTED }}>{r.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Order status card with progress bar */}
                <div style={{ margin: '12px 14px 16px', borderRadius: '18px', background: `linear-gradient(135deg, ${TANGERINE}, #fb923c)`, padding: '14px 15px', color: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800 }}>🛵 Marco is on the way</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(255,255,255,0.22)', borderRadius: '9999px', padding: '3px 9px' }}>ETA 6 min</span>
                  </div>
                  <div style={{ height: '7px', borderRadius: '9999px', background: 'rgba(255,255,255,0.28)', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: '72%', height: '100%', borderRadius: '9999px', background: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {orderStages.map((s, i) => (
                      <span key={s} style={{ fontSize: '8.5px', fontWeight: 700, opacity: i <= 2 ? 1 : 0.55, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section style={{ background: CREAM, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2.75rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '22px', padding: '1.4rem 1rem' }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', color: TANGERINE }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>How it works</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 1rem' }}>From craving to doorbell in three taps</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>No phone calls, no “your driver may be nearby,” no mystery fees at checkout. Just food, moving fast.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {steps.map(step => (
              <div key={step.num} style={{ background: CREAM, borderRadius: '28px', padding: '2.25rem 1.75rem', textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '22px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(249,115,22,0.15)' }}>{step.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: TANGERINE, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Step {step.num}</div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Restaurants (filterable grid) ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#fdfaf6', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>Restaurants</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 1rem' }}>Tonight’s most-loved kitchens</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Real ratings from real orders this week. Pick a craving and we’ll handle the rest.</p>
          </div>
          {/* Cuisine filter pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {cuisines.map(c => {
              const active = cuisine === c;
              return (
                <button key={c} onClick={() => setCuisine(c)} style={{ border: active ? `1.5px solid ${TANGERINE}` : `1.5px solid ${BORDER}`, background: active ? TANGERINE : '#fff', color: active ? '#fff' : MUTED, borderRadius: '9999px', padding: '9px 20px', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: active ? '0 6px 16px rgba(249,115,22,0.3)' : 'none', transition: 'all 0.15s' }}>
                  {c}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: '1.25rem' }}>
            {visibleRestaurants.map(r => (
              <div key={r.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(28,25,23,0.05)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={r.img} alt={r.name} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.95)', borderRadius: '9999px', padding: '5px 12px', fontSize: '11.5px', fontWeight: 800, color: INK }}>⏱ {r.eta}</span>
                  {r.fee === 'Free delivery' && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: TANGERINE, color: '#fff', borderRadius: '9999px', padding: '5px 12px', fontSize: '11px', fontWeight: 800 }}>FREE</span>
                  )}
                </div>
                <div style={{ padding: '1rem 1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{r.name}</h3>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: TANGERINE_DARK, background: CREAM, borderRadius: '9999px', padding: '3px 9px' }}>★ {r.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: MUTED, background: '#faf7f2', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '3px 11px' }}>{r.cuisine}</span>
                    <span style={{ fontSize: '12.5px', color: MUTED }}>{r.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Order Tracking ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#ffffff', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>Live tracking</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 1rem' }}>Watch dinner travel, minute by minute</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
              Every Swift order streams its journey live: when the kitchen fires it up, the second your courier rolls out, and a countdown that updates with real traffic. Set the table at exactly the right moment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {trackEvents.map((e, i) => (
                <div key={e.label} style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: e.done ? TANGERINE : '#fff', border: e.done ? 'none' : `2px dashed ${TANGERINE}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>{e.done ? '✓' : ''}</div>
                    {i < trackEvents.length - 1 && <div style={{ width: '2px', flex: 1, background: e.done ? 'rgba(249,115,22,0.4)' : BORDER, margin: '4px 0' }} />}
                  </div>
                  <div style={{ paddingBottom: i < trackEvents.length - 1 ? '1.4rem' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800 }}>{e.label}</span>
                      <span style={{ fontSize: '12px', color: '#a8a29e', fontWeight: 600 }}>{e.time}</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: MUTED, margin: '3px 0 0', lineHeight: 1.6 }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Map mock */}
          <div style={{ borderRadius: '28px', border: `1px solid ${BORDER}`, background: 'linear-gradient(135deg, #fdf6ee, #fef3e6)', padding: '1.25rem', boxShadow: '0 24px 60px rgba(28,25,23,0.1)' }}>
            <div style={{ position: 'relative', borderRadius: '20px', background: '#fbf3ea', height: '300px', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(249,115,22,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.07) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
              <div style={{ position: 'absolute', top: '52px', left: '40px', width: '64%', height: '160px', borderRight: '3px dashed rgba(249,115,22,0.55)', borderBottom: '3px dashed rgba(249,115,22,0.55)', borderRadius: '0 0 40px 0', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '34px', left: '24px', width: '40px', height: '40px', borderRadius: '14px', background: '#fff', boxShadow: '0 6px 16px rgba(28,25,23,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>🍕</div>
              <div style={{ position: 'absolute', top: '180px', left: '58%', width: '44px', height: '44px', borderRadius: '50%', background: TANGERINE, boxShadow: '0 0 0 8px rgba(249,115,22,0.18), 0 8px 18px rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🛵</div>
              <div style={{ position: 'absolute', bottom: '26px', right: '24px', width: '40px', height: '40px', borderRadius: '14px', background: '#fff', boxShadow: '0 6px 16px rgba(28,25,23,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>🏠</div>
              <div style={{ position: 'absolute', bottom: '18px', left: '18px', background: '#fff', borderRadius: '14px', padding: '9px 14px', boxShadow: '0 8px 20px rgba(28,25,23,0.12)', fontSize: '12.5px', fontWeight: 800, color: INK }}>
                Arriving in <span style={{ color: TANGERINE }}>6 min</span> 🎉
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 6px 4px' }}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" alt="Marco, your courier" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${TANGERINE}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 800 }}>Marco V. · ★ 4.97</div>
                <div style={{ fontSize: '12px', color: MUTED }}>2,184 deliveries · e-bike</div>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: CREAM, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💬</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: CREAM, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>Happy & full</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 0' }}>1.2 million dinners can’t be wrong</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '26px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 4px 14px rgba(28,25,23,0.05)' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{ color: TANGERINE, fontSize: '15px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '14.5px', color: '#44403c', lineHeight: 1.75, margin: 0, flex: 1 }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Download Band ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${TANGERINE}, #fb923c)`, borderRadius: '32px', padding: '3.75rem 3rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 28px 70px rgba(249,115,22,0.35)' }}>
            <div style={{ position: 'absolute', top: '-70px', right: '-70px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-90px', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', margin: '0 0 1rem' }}>Get the app. Get $10 off your first order.</h2>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.0625rem', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: '460px' }}>
                Scan the menu, not a QR code. Download Swift, drop your address, and use code <strong>HUNGRY10</strong> at checkout — dinner is on its way before the credits roll.
              </p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '11px', background: INK, color: '#fff', borderRadius: '16px', padding: '11px 22px', textDecoration: 'none' }}>
                  <span style={{ fontSize: '22px' }}>🍎</span>
                  <span>
                    <span style={{ display: 'block', fontSize: '10.5px', opacity: 0.75, fontWeight: 600 }}>Download on the</span>
                    <span style={{ display: 'block', fontSize: '16px', fontWeight: 800, letterSpacing: '-0.01em' }}>App Store</span>
                  </span>
                </a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '11px', background: INK, color: '#fff', borderRadius: '16px', padding: '11px 22px', textDecoration: 'none' }}>
                  <span style={{ fontSize: '20px' }}>▶</span>
                  <span>
                    <span style={{ display: 'block', fontSize: '10.5px', opacity: 0.75, fontWeight: 600 }}>Get it on</span>
                    <span style={{ display: 'block', fontSize: '16px', fontWeight: 800, letterSpacing: '-0.01em' }}>Google Play</span>
                  </span>
                </a>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Fresh delivery meal" style={{ width: '100%', maxWidth: '360px', height: '280px', objectFit: 'cover', borderRadius: '24px', border: '5px solid rgba(255,255,255,0.35)', boxShadow: '0 20px 50px rgba(28,25,23,0.3)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Courier Signup Band ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#fdfaf6', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3.5rem', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80" alt="Swift courier on a bike" style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '28px', boxShadow: '0 24px 60px rgba(28,25,23,0.15)' }} />
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>Ride with Swift</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 1rem' }}>Your city. Your hours. Your money.</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
              Join 38,000 couriers who turned a bike, scooter, or hatchback into flexible income. Sign up in 10 minutes, get verified in a day, start earning the same week.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2rem' }}>
              {courierPerks.map(p => (
                <div key={p.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '16px', background: '#fff', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', flexShrink: 0, boxShadow: '0 4px 12px rgba(249,115,22,0.12)' }}>{p.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, margin: '0 0 3px' }}>{p.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" style={{ display: 'inline-block', background: INK, color: '#fff', borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Apply to ride →</a>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#ffffff', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: TANGERINE }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.75rem 0 0' }}>Hungry minds want to know</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ background: open ? CREAM : '#fff', border: open ? `1.5px solid rgba(249,115,22,0.45)` : `1.5px solid ${BORDER}`, borderRadius: '20px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                  >
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: INK }}>{faq.q}</span>
                    <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: open ? TANGERINE : '#faf7f2', color: open ? '#fff' : MUTED, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, flexShrink: 0, transition: 'all 0.2s' }}>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open && (
                    <p style={{ margin: 0, padding: '0 1.4rem 1.3rem', fontSize: '14px', color: '#57534e', lineHeight: 1.75 }}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#fdfaf6', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '12px', background: `linear-gradient(135deg, ${TANGERINE}, #fb923c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🛵</div>
                <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.04em' }}>swift<span style={{ color: TANGERINE }}>.</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>
                Hot food, swift doorsteps. Delivering from 2,400+ local kitchens across 120 cities — and counting.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a8a29e', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#a8a29e', margin: 0 }}>© 2026 Swift Delivery Inc. Made with 🧡 and extra napkins.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'TikTok', 'Twitter'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
