import { useState } from 'react';

/* ============================================================
   ROAM — Airbnb-Style Vacation Rental Template
   White theme · coral accent (#f43f5e) · rounded-2xl cards
   Next.js · TypeScript · Mapbox · Stripe
   Pages mocked: Home · Search · Listing · Book · Dashboard · Messages
   ============================================================ */

const CORAL = '#f43f5e';
const INK = '#1f2937';
const MUTED = '#6b7280';
const BORDER = '#e5e7eb';
const SOFT = '#fff1f2';

const categories = [
  { icon: '🏖️', label: 'Beach' },
  { icon: '🌲', label: 'Cabins' },
  { icon: '🏙️', label: 'City' },
  { icon: '⛷️', label: 'Ski' },
  { icon: '🌊', label: 'Lakefront' },
  { icon: '🌴', label: 'Tropical' },
  { icon: '🏕️', label: 'Camping' },
  { icon: '🛋️', label: 'Design' },
];

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  superhost: boolean;
  category: string;
  img: string;
};

const properties: Property[] = [
  { id: 1, title: 'Glasshouse on the Dunes', location: 'Montauk, New York', price: 312, rating: 4.97, reviews: 184, superhost: true, category: 'Beach', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80' },
  { id: 2, title: 'Cedar A-Frame Hideaway', location: 'Lake Arrowhead, California', price: 189, rating: 4.92, reviews: 263, superhost: true, category: 'Cabins', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80' },
  { id: 3, title: 'Skyline Loft with Terrace', location: 'Chicago, Illinois', price: 245, rating: 4.88, reviews: 97, superhost: false, category: 'City', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },
  { id: 4, title: 'Powder Ridge Chalet', location: 'Park City, Utah', price: 428, rating: 4.99, reviews: 152, superhost: true, category: 'Ski', img: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80' },
  { id: 5, title: 'Stillwater Lake House', location: 'Lake Placid, New York', price: 276, rating: 4.95, reviews: 211, superhost: true, category: 'Lakefront', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80' },
  { id: 6, title: 'Palm Villa with Pool', location: 'Tulum, Mexico', price: 198, rating: 4.91, reviews: 318, superhost: false, category: 'Tropical', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80' },
  { id: 7, title: 'Canvas Tent Under the Pines', location: 'Big Sur, California', price: 142, rating: 4.86, reviews: 76, superhost: false, category: 'Camping', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80' },
  { id: 8, title: 'The Architect’s Courtyard', location: 'Palm Springs, California', price: 359, rating: 4.98, reviews: 129, superhost: true, category: 'Design', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
];

const amenities = [
  { icon: '📶', label: 'Fast wifi · 480 Mbps' },
  { icon: '🏊', label: 'Private heated pool' },
  { icon: '🍳', label: 'Chef-grade kitchen' },
  { icon: '🚗', label: 'Free parking on premises' },
  { icon: '🔥', label: 'Indoor fireplace' },
  { icon: '🧺', label: 'Washer & dryer' },
  { icon: '🐕', label: 'Pets welcome' },
  { icon: '🧖', label: 'Cedar sauna' },
];

const whyRoam = [
  { icon: '🗺️', title: 'Search the map, not a list', desc: 'Mapbox-powered search redraws results as you pan. Draw a radius around the beach, the lifts, or grandma’s house — and book inside it.' },
  { icon: '🛡️', title: 'Every booking covered', desc: 'RoamCover protects every stay with $1M damage protection, verified IDs on both sides, and 24/7 human support in 12 languages.' },
  { icon: '💳', title: 'Checkout in one tap', desc: 'Stripe-powered payments with Apple Pay, Google Pay, and split-pay for groups. Reserve now, settle up with friends later.' },
  { icon: '💬', title: 'Hosts who answer fast', desc: 'Built-in messaging with read receipts and saved replies. Our average host responds in under 19 minutes — before you finish packing.' },
];

const dashboardStats = [
  { label: 'Upcoming check-ins', value: '4' },
  { label: 'Occupancy this month', value: '92%' },
  { label: 'Earnings in June', value: '$6,418' },
  { label: 'Average rating', value: '4.96' },
];

const messages = [
  { name: 'Priya Raman', preview: 'Hi! Is early check-in possible on the 14th? Our flight lands at 9am…', time: '2m', unread: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
  { name: 'Tom Becker', preview: 'The sauna was incredible. Left you a 5-star review — thank you!', time: '1h', unread: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Roam Support', preview: 'Your July payout schedule has been confirmed. View details…', time: '3h', unread: false, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80' },
  { name: 'Elena Vasquez', preview: 'Booking confirmed for Aug 2–9. Any restaurant recommendations?', time: '1d', unread: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const nightOptions = [5, 10, 15, 20, 25];

const reviews = [
  { quote: 'We booked the A-frame for a long weekend and ended up extending twice from the app. The map search found us a cabin 200 feet from the trailhead — no other platform could do that.', name: 'Hannah Liu', place: 'Stayed in Lake Arrowhead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { quote: 'Split-pay saved our group trip. Eight friends, one villa, zero awkward Venmo math. Booking took ninety seconds and the host messaged us before we’d even closed the tab.', name: 'Marcus Webb', place: 'Stayed in Tulum', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { quote: 'As a host, the dashboard is the best I’ve used — pricing tips, instant payouts through Stripe, and guest messages that actually thread properly. My occupancy went from 61% to 94%.', name: 'Ingrid Solberg', place: 'Hosts in Park City', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
];

const footerCols = [
  { title: 'Support', links: ['Help Center', 'RoamCover', 'Anti-discrimination', 'Cancellation options', 'Report a concern'] },
  { title: 'Hosting', links: ['Host your home', 'RoamCover for Hosts', 'Hosting resources', 'Community forum', 'Hosting responsibly'] },
  { title: 'Roam', links: ['Newsroom', 'Careers', 'Investors', 'Gift cards', 'Roam.org'] },
];

export default function RoamRentalsPreview() {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set([2, 5]));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [nights, setNights] = useState<number>(15);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const visibleProperties = activeCategory ? properties.filter(p => p.category === activeCategory) : properties;
  const monthlyEarnings = nights * 214;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Sticky Nav with search pill ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem', height: '74px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${CORAL}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 6px 16px rgba(244,63,94,0.35)' }}>🧭</div>
            <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.04em', color: CORAL }}>roam</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '7px 8px 7px 22px', boxShadow: '0 3px 12px rgba(31,41,55,0.08)', background: '#fff' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Anywhere</span>
            <span style={{ width: '1px', height: '22px', background: BORDER, margin: '0 16px' }} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Any week</span>
            <span style={{ width: '1px', height: '22px', background: BORDER, margin: '0 16px' }} />
            <span style={{ fontSize: '14px', color: MUTED }}>Add guests</span>
            <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: CORAL, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', marginLeft: '14px' }}>🔍</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: INK, textDecoration: 'none' }}>Become a host</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '6px 8px 6px 14px' }}>
              <span style={{ fontSize: '13px', color: MUTED }}>☰</span>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero with destination search bar ── */}
      <section style={{ position: 'relative', padding: '4.5rem 1.5rem 5.5rem', background: `radial-gradient(circle at 80% 10%, ${SOFT}, transparent 50%), radial-gradient(circle at 10% 80%, ${SOFT}, transparent 45%), #ffffff` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: SOFT, border: '1px solid rgba(244,63,94,0.25)', borderRadius: '9999px', padding: '7px 18px', fontSize: '13px', fontWeight: 600, color: '#be123c', marginBottom: '1.5rem' }}>
            🌍 2.4M stays across 190 countries
          </span>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, margin: '0 auto', maxWidth: '820px' }}>
            Stay somewhere worth <span style={{ color: CORAL }}>roaming</span> for
          </h1>
          <p style={{ fontSize: '1.125rem', color: MUTED, lineHeight: 1.75, maxWidth: '560px', margin: '1.4rem auto 0' }}>
            Beach houses, cedar cabins, and city lofts from hosts who actually answer. Search the map, book in a tap, and let the trip do the rest.
          </p>

          {/* Destination search bar */}
          <div style={{ maxWidth: '880px', margin: '2.75rem auto 0', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9999px', boxShadow: '0 18px 50px rgba(31,41,55,0.12)', display: 'flex', alignItems: 'stretch', padding: '8px', textAlign: 'left' }}>
            <div style={{ flex: 1.3, padding: '10px 26px', borderRadius: '9999px', background: SOFT }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Where</div>
              <div style={{ fontSize: '14px', color: INK, fontWeight: 600, marginTop: '2px' }}>Joshua Tree, California</div>
            </div>
            <div style={{ flex: 1, padding: '10px 26px', borderLeft: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Check in</div>
              <div style={{ fontSize: '14px', color: MUTED, marginTop: '2px' }}>Jul 12</div>
            </div>
            <div style={{ flex: 1, padding: '10px 26px', borderLeft: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Check out</div>
              <div style={{ fontSize: '14px', color: MUTED, marginTop: '2px' }}>Jul 17</div>
            </div>
            <div style={{ flex: 1, padding: '10px 26px', borderLeft: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Who</div>
                <div style={{ fontSize: '14px', color: MUTED, marginTop: '2px' }}>4 guests</div>
              </div>
              <span style={{ background: CORAL, color: '#fff', borderRadius: '9999px', padding: '13px 22px', fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(244,63,94,0.35)' }}>Search</span>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: MUTED, marginTop: '1.25rem' }}>
            Popular right now: <span style={{ color: CORAL, fontWeight: 600 }}>Lisbon</span> · <span style={{ color: CORAL, fontWeight: 600 }}>Kyoto</span> · <span style={{ color: CORAL, fontWeight: 600 }}>Banff</span> · <span style={{ color: CORAL, fontWeight: 600 }}>Oaxaca</span>
          </p>
        </div>
      </section>

      {/* ── Category icon row (filters the grid) ── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, background: '#fff', padding: '1.5rem 1.5rem 0.5rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(c => {
            const active = activeCategory === c.label;
            return (
              <button key={c.label} onClick={() => setActiveCategory(active ? null : c.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 18px', borderRadius: '16px', border: active ? `2px solid ${CORAL}` : '2px solid transparent', background: active ? SOFT : 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ fontSize: '24px' }}>{c.icon}</span>
                <span style={{ fontSize: '12.5px', fontWeight: active ? 700 : 500, color: active ? CORAL : MUTED }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Property card grid with wishlist hearts ── */}
      <section style={{ padding: '2.5rem 1.5rem 4.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              {activeCategory ? `${activeCategory} stays guests love` : 'Stays guests can’t stop saving'}
            </h2>
            <span style={{ fontSize: '14px', color: MUTED }}>{visibleProperties.length} of 2,400,000+ homes · prices include all fees</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {visibleProperties.map(p => {
              const saved = wishlist.has(p.id);
              return (
                <div key={p.id} style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#fff', boxShadow: '0 2px 10px rgba(31,41,55,0.05)' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }} />
                    <button onClick={() => toggleWishlist(p.id)} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', boxShadow: '0 3px 10px rgba(31,41,55,0.2)', color: saved ? CORAL : '#9ca3af' }}>
                      {saved ? '♥' : '♡'}
                    </button>
                    {p.superhost && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', borderRadius: '9999px', padding: '5px 12px', fontSize: '11.5px', fontWeight: 700, color: INK }}>★ Superhost</span>
                    )}
                  </div>
                  <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</h3>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: INK, display: 'inline-flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                        <span style={{ color: '#f59e0b' }}>★</span>{p.rating}
                      </span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: MUTED, margin: '4px 0 10px' }}>{p.location} · {p.reviews} reviews</p>
                    <p style={{ fontSize: '15px', margin: 0 }}><span style={{ fontWeight: 800 }}>${p.price}</span> <span style={{ color: MUTED, fontSize: '13.5px' }}>night</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured listing detail + booking widget ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#fafafa', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Listing page</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.6rem 0 0.4rem' }}>Powder Ridge Chalet · Park City, Utah</h2>
            <p style={{ fontSize: '14.5px', color: MUTED, margin: 0 }}>★ 4.99 · 152 reviews · Superhost · 8 guests · 4 bedrooms · 3 baths · Ski-in / ski-out</p>
          </div>

          {/* Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2.5rem' }}>
            <img src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80" alt="Chalet exterior" style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" alt="Primary bedroom" style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }} />
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" alt="Living room" style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left: host + amenities */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '1.5rem', borderBottom: `1px solid ${BORDER}`, marginBottom: '1.5rem' }}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" alt="Host Ingrid" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Hosted by Ingrid</p>
                  <p style={{ fontSize: '13.5px', color: MUTED, margin: '2px 0 0' }}>Superhost · 6 years hosting · responds in ~12 min</p>
                </div>
              </div>
              <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.8, margin: '0 0 1.75rem' }}>
                Wake up to first tracks. This cedar chalet sits 90 seconds from the Quicksilver gondola, with a wall of glass facing the ridgeline, a cedar sauna off the mudroom, and a kitchen the last three guests fought over cooking in. After the lifts close, the fire pit and hot tub take the night shift.
              </p>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 1.1rem', letterSpacing: '-0.01em' }}>What this place offers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {amenities.map(a => (
                  <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '12px 16px' }}>
                    <span style={{ fontSize: '19px' }}>{a.icon}</span>
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: booking widget */}
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '1.75rem', boxShadow: '0 14px 40px rgba(31,41,55,0.1)', position: 'sticky', top: '94px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                <p style={{ margin: 0 }}><span style={{ fontSize: '24px', fontWeight: 800 }}>$428</span> <span style={{ fontSize: '14px', color: MUTED }}>night</span></p>
                <span style={{ fontSize: '13px', color: MUTED }}>★ 4.99 · 152 reviews</span>
              </div>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ padding: '10px 14px', borderRight: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Check-in</div>
                    <div style={{ fontSize: '13.5px', marginTop: '2px' }}>Feb 8, 2027</div>
                  </div>
                  <div style={{ padding: '10px 14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Checkout</div>
                    <div style={{ fontSize: '13.5px', marginTop: '2px' }}>Feb 13, 2027</div>
                  </div>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Guests</div>
                  <div style={{ fontSize: '13.5px', marginTop: '2px' }}>6 guests</div>
                </div>
              </div>
              <a href="#" style={{ display: 'block', textAlign: 'center', background: `linear-gradient(135deg, ${CORAL}, #fb7185)`, color: '#fff', borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 22px rgba(244,63,94,0.35)', marginBottom: '1rem' }}>Reserve</a>
              <p style={{ textAlign: 'center', fontSize: '12.5px', color: MUTED, margin: '0 0 1.25rem' }}>You won’t be charged yet</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#4b5563' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ textDecoration: 'underline' }}>$428 × 5 nights</span><span>$2,140</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ textDecoration: 'underline' }}>Cleaning fee</span><span>$120</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ textDecoration: 'underline' }}>Roam service fee</span><span>$262</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${BORDER}`, paddingTop: '12px', fontWeight: 800, color: INK }}><span>Total before taxes</span><span>$2,522</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Roam features ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Why Roam</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Booking that feels like a vacation</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>From the first map pan to the welcome message, every step is built to get you from “someday” to “checked in.”</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {whyRoam.map(f => (
              <div key={f.title} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '1.75rem', boxShadow: '0 2px 10px rgba(31,41,55,0.05)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '1.1rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Host dashboard + messages mock ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fafafa', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Dashboard &amp; Messages</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Run your stays from one calm screen</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>Earnings, occupancy, and every guest conversation — threaded, searchable, and synced to the app in your pocket.</p>
          </div>
          <div style={{ borderRadius: '24px', border: `1px solid ${BORDER}`, background: '#fff', overflow: 'hidden', boxShadow: '0 26px 70px rgba(31,41,55,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: '#fafafa' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fda4af' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fcd34d' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#86efac' }} />
              <div style={{ flex: 1, marginLeft: '12px', maxWidth: '300px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>roam.travel/hosting/dashboard</span>
              </div>
            </div>
            <div style={{ display: 'flex', minHeight: '340px' }}>
              <div style={{ width: '180px', borderRight: `1px solid ${BORDER}`, padding: '1.1rem 0.85rem', flexShrink: 0, background: '#fafafa' }}>
                {['Dashboard', 'Calendar', 'Listings', 'Messages', 'Payouts'].map((item, i) => (
                  <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderRadius: '12px', marginBottom: '3px', fontSize: '13px', fontWeight: i === 0 ? 700 : 500, background: i === 0 ? SOFT : 'transparent', color: i === 0 ? CORAL : MUTED }}>
                    {item}
                    {item === 'Messages' && <span style={{ background: CORAL, color: '#fff', borderRadius: '9999px', fontSize: '10px', fontWeight: 800, padding: '2px 7px' }}>2</span>}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, padding: '1.4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                    {dashboardStats.map(s => (
                      <div key={s.label} style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '14px' }}>
                        <div style={{ fontSize: '11px', color: MUTED, marginBottom: '6px' }}>{s.label}</div>
                        <div style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '14px', background: SOFT }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#be123c', marginBottom: '4px' }}>Pricing tip</div>
                    <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>Sundance week demand is up 38%. Raising your Feb rate to $465 could add ~$1,100.</div>
                  </div>
                </div>
                <div style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, fontSize: '13px', fontWeight: 700 }}>Messages</div>
                  {messages.map(m => (
                    <div key={m.name} style={{ display: 'flex', gap: '11px', padding: '11px 16px', borderBottom: `1px solid ${BORDER}`, background: m.unread ? '#fff' : '#fafafa' }}>
                      <img src={m.avatar} alt={m.name} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: m.unread ? 800 : 600 }}>{m.name}</span>
                          <span style={{ fontSize: '11px', color: m.unread ? CORAL : '#9ca3af', fontWeight: m.unread ? 700 : 500 }}>{m.time}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: MUTED, margin: '3px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.preview}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Host with us band + earnings calculator ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Become a host</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Your spare key could be worth <span style={{ color: CORAL }}>${monthlyEarnings.toLocaleString()}</span> a month</h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
              Hosts in your area earn an average of $214 a night. List in under 30 minutes, set your own rules, and get paid out through Stripe within 24 hours of every check-in.
            </p>
            <a href="#" style={{ display: 'inline-block', background: `linear-gradient(135deg, ${CORAL}, #fb7185)`, color: '#fff', borderRadius: '14px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,63,94,0.35)' }}>Estimate your earnings →</a>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2.25rem', boxShadow: '0 20px 55px rgba(31,41,55,0.1)' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 0.4rem' }}>Nights hosted per month</p>
            <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 1.25rem' }}>Entire place · 2 bedrooms · Park City, UT</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              {nightOptions.map(n => (
                <button key={n} onClick={() => setNights(n)} style={{ flex: 1, minWidth: '54px', padding: '11px 0', borderRadius: '12px', border: nights === n ? `2px solid ${CORAL}` : `1px solid ${BORDER}`, background: nights === n ? SOFT : '#fff', color: nights === n ? CORAL : INK, fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {n}
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', background: SOFT, borderRadius: '18px', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em', color: CORAL }}>${monthlyEarnings.toLocaleString()}</div>
              <div style={{ fontSize: '13.5px', color: MUTED, marginTop: '4px' }}>estimated for {nights} nights at $214 / night</div>
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '1.1rem 0 0', textAlign: 'center' }}>Estimates use trailing 12-month booking data for similar listings nearby.</p>
          </div>
        </div>
      </section>

      {/* ── Guest reviews ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fafafa', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Reviews</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>4.9 stars across 1.8 million stays</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {reviews.map(r => (
              <div key={r.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 2px 10px rgba(31,41,55,0.05)' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(star => <span key={star} style={{ color: CORAL, fontSize: '15px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14.5px', color: '#374151', lineHeight: 1.75, margin: 0, flex: 1 }}>“{r.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={r.avatar} alt={r.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: 0 }}>{r.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App band ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${CORAL}, #fb7185)`, borderRadius: '28px', padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem', alignItems: 'center', boxShadow: '0 26px 70px rgba(244,63,94,0.35)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>The trip lives in your pocket</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.0625rem', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: '460px' }}>
                Offline maps, door codes, host chat, and last-minute deals within 50 miles. Scan to download — your next weekend is already waiting.
              </p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <a href="#" style={{ background: '#1f2937', color: '#fff', borderRadius: '14px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}> App Store</a>
                <a href="#" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.45)', color: '#fff', borderRadius: '14px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>▶ Google Play</a>
              </div>
            </div>
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', maxWidth: '320px', justifySelf: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" alt="Tonight nearby stay" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '16px', display: 'block' }} />
              <div style={{ padding: '1rem 0.25rem 0.25rem' }}>
                <p style={{ fontSize: '12px', fontWeight: 800, color: CORAL, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Tonight · 12 mi away</p>
                <p style={{ fontSize: '15px', fontWeight: 700, color: INK, margin: '0 0 4px' }}>Garden Studio in Old Town</p>
                <p style={{ fontSize: '13.5px', color: MUTED, margin: 0 }}><span style={{ fontWeight: 800, color: INK }}>$96</span> night · ★ 4.93 · Instant Book</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#fafafa', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '270px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${CORAL}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🧭</div>
                <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.04em', color: CORAL }}>roam</span>
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>
                Stays worth roaming for, from 4 million hosts who treat your trip like their own. Built on Next.js, Mapbox, and Stripe.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>© 2026 Roam Travel, Inc. · Privacy · Terms · Sitemap</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['English (US)', '$ USD', 'Instagram', 'X', 'TikTok'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none', fontWeight: 600 }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
