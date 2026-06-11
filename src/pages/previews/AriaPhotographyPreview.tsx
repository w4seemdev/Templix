import { useState } from 'react';

/* ============================================================
   ARIA — Photography Portfolio Template
   Minimal gallery aesthetic · pure white · near-black #111
   Thin serif (Georgia) display headings · zero border radius
   Uppercase letter-spaced micro labels · generous whitespace
   ============================================================ */

const INK = '#111111';
const MUTED = '#767676';
const FAINT = '#9a9a9a';
const HAIRLINE = '1px solid #e6e6e6';
const serif = "Georgia, 'Times New Roman', serif";

const micro = {
  fontSize: '11px',
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
  fontWeight: 500,
};

const navLinks = ['Home', 'Work', 'About', 'Services', 'Contact'];

const heroImage = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80';

const stats = [
  { value: '12', label: 'Years behind the lens' },
  { value: '340+', label: 'Weddings photographed' },
  { value: '27', label: 'Countries traveled' },
  { value: '18', label: 'Editorial covers' },
];

const publications = ['Vogue Weddings', 'Kinfolk', 'Cereal Magazine', 'Harper’s Bazaar', 'The Lane', 'Rock My Wedding'];

const categories = ['All', 'Weddings', 'Editorial', 'Portrait', 'Travel'];

const photos = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Elena & Marcus', location: 'Lake Como, Italy', category: 'Weddings', h: 520 },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', title: 'Linen Issue No. 4', location: 'Paris, France', category: 'Editorial', h: 380 },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', title: 'Nadia', location: 'Studio, Copenhagen', category: 'Portrait', h: 460 },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title: 'Dolomites at First Light', location: 'South Tyrol, Italy', category: 'Travel', h: 320 },
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', title: 'Sofia & Theo', location: 'Santorini, Greece', category: 'Weddings', h: 410 },
  { src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80', title: 'Wool & Smoke', location: 'Milan, Italy', category: 'Editorial', h: 500 },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', title: 'Jonas', location: 'Studio, Copenhagen', category: 'Portrait', h: 360 },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', title: 'Still Water', location: 'Lofoten, Norway', category: 'Travel', h: 450 },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', title: 'Amara & David', location: 'Provence, France', category: 'Weddings', h: 470 },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', title: 'Golden Hour Series', location: 'Lisbon, Portugal', category: 'Editorial', h: 340 },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', title: 'Ines', location: 'Natural light, Berlin', category: 'Portrait', h: 430 },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', title: 'Valley Mist', location: 'Yosemite, USA', category: 'Travel', h: 390 },
];

const aboutPortrait = 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&q=80';

const services = [
  {
    num: '01',
    name: 'Weddings',
    price: 'from €2,900',
    desc: 'Full-day documentary coverage that follows the day as it actually happens — the quiet glances, the chaos of getting ready, the last dance. Includes a second shooter, 600+ hand-edited images, and a private online gallery delivered within six weeks.',
  },
  {
    num: '02',
    name: 'Editorial',
    price: 'from €1,400 / day',
    desc: 'Campaigns, lookbooks, and magazine features for brands that value restraint. Concept development, art direction on set, and full usage licensing are part of every editorial engagement — no surprise invoices after the shoot.',
  },
  {
    num: '03',
    name: 'Portraits',
    price: 'from €450',
    desc: 'A slow 90-minute session in the studio or on location, built around honest light and unforced expressions. Two looks, gentle direction for people who hate being photographed, and 30 fully retouched images.',
  },
];

const clientWords = [
  {
    quote: 'Aria photographed our wedding like a guest who happened to see everything. Months later we still find details in the gallery we never knew were captured.',
    name: 'Elena Rossi',
    role: 'Bride, Lake Como',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    quote: 'We have commissioned four campaigns now. The work needs no retouching direction, no mood-board babysitting — it arrives exactly as elegant as it was pitched.',
    name: 'Mathilde Berg',
    role: 'Creative Director, Linen Atelier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    quote: 'I dread cameras. Aria made the portrait session feel like an unhurried conversation, and the photographs are the first of myself I have ever framed.',
    name: 'Jonas Vetter',
    role: 'Architect, Berlin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

const sessionTypes = [
  {
    name: 'Wedding — Full Day',
    duration: '10 hours of coverage',
    price: '€2,900',
    includes: ['Second photographer', '600+ edited images', 'Private online gallery', 'Engagement mini-session', 'Fine-art print credit'],
  },
  {
    name: 'Editorial — Half Day',
    duration: '4 hours on set',
    price: '€1,400',
    includes: ['Pre-shoot art direction call', 'Full usage licensing', '80+ delivered selects', '48-hour preview edit', 'On-set tethered review'],
  },
  {
    name: 'Portrait Session',
    duration: '90 minutes, studio or location',
    price: '€450',
    includes: ['Two looks / outfit changes', '30 retouched images', 'Gentle posing direction', 'Same-week sneak peek', 'Print-ready files'],
  },
];

const footerCols = [
  { title: 'Explore', links: ['Home', 'Work', 'About', 'Services'] },
  { title: 'Studio', links: ['Contact', 'Book Session', 'Journal', 'Print Shop'] },
  { title: 'Elsewhere', links: ['Instagram', 'Pinterest', 'Behance', 'Vimeo'] },
];

export default function AriaPhotographyPreview() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSession, setActiveSession] = useState<number>(0);

  const visiblePhotos = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);
  const session = sessionTypes[activeSession];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderBottom: HAIRLINE }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: serif, fontSize: '24px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Aria</span>
          <nav style={{ display: 'flex', gap: '2.25rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ ...micro, color: l === 'Home' ? INK : MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ ...micro, background: INK, color: '#fff', padding: '12px 26px', textDecoration: 'none' }}>Book Session</a>
        </div>
      </header>

      {/* ── Full-bleed Hero ── */}
      <section style={{ position: 'relative', height: '86vh', minHeight: '560px', overflow: 'hidden' }}>
        <img src={heroImage} alt="Couple at golden hour" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,17,17,0.18), rgba(17,17,17,0.42))' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem' }}>
          <span style={{ ...micro, color: 'rgba(255,255,255,0.85)' }}>Photographer — Copenhagen / Worldwide</span>
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', margin: '1.25rem 0 1.5rem', lineHeight: 1 }}>Aria</h1>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'rgba(255,255,255,0.92)', maxWidth: '520px', margin: 0, lineHeight: 1.6 }}>
            Quiet, honest photographs of weddings, people, and the places in between.
          </p>
          <a href="#" style={{ ...micro, marginTop: '2.5rem', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', padding: '14px 34px', textDecoration: 'none' }}>View the Work</a>
        </div>
      </section>

      {/* ── Statement + Stats ── */}
      <section style={{ padding: '6rem 2rem 5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ ...micro, color: FAINT }}>The Approach</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)', lineHeight: 1.35, margin: '1.5rem 0 0', letterSpacing: '0.01em' }}>
              Photographs should feel the way the day felt — not the way it was posed. I work slowly, mostly in natural light, and never ask anyone to say cheese.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginTop: '5rem', borderTop: HAIRLINE }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: '2.5rem 1.5rem', textAlign: 'center', borderLeft: i === 0 ? 'none' : HAIRLINE }}>
                <div style={{ fontFamily: serif, fontSize: '2.6rem', fontWeight: 400, lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...micro, color: MUTED, marginTop: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured In ── */}
      <section style={{ borderTop: HAIRLINE, borderBottom: HAIRLINE, padding: '2.5rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap' }}>
          <span style={{ ...micro, color: FAINT }}>As Featured In</span>
          {publications.map(p => (
            <span key={p} style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '17px', color: '#b3b3b3' }}>{p}</span>
          ))}
        </div>
      </section>

      {/* ── Work: Masonry Grid with Filters ── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ ...micro, color: FAINT }}>Selected Work</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '1.25rem 0 0' }}>The Gallery</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {categories.map(c => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  style={{ ...micro, padding: '11px 24px', cursor: 'pointer', border: active ? `1px solid ${INK}` : HAIRLINE, background: active ? INK : '#fff', color: active ? '#fff' : MUTED, fontFamily: 'inherit', transition: 'all 0.2s' }}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div style={{ columnCount: 3, columnGap: '1.75rem' }}>
            {visiblePhotos.map(p => (
              <figure key={p.title} style={{ breakInside: 'avoid', margin: '0 0 1.75rem' }}>
                <img src={p.src} alt={p.title} style={{ width: '100%', height: `${p.h}px`, objectFit: 'cover', display: 'block', filter: 'saturate(0.92)' }} />
                <figcaption style={{ paddingTop: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                  <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '15.5px' }}>{p.title}</span>
                  <span style={{ ...micro, fontSize: '10px', color: FAINT, whiteSpace: 'nowrap' }}>{p.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#" style={{ ...micro, color: INK, textDecoration: 'none', borderBottom: `1px solid ${INK}`, paddingBottom: '5px' }}>View Full Archive — 1,200+ Images</a>
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ borderTop: HAIRLINE, padding: '6rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src={aboutPortrait} alt="Aria Lindholm portrait" style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', background: '#fff', padding: '14px 22px' }}>
              <span style={{ ...micro, color: MUTED }}>Aria Lindholm, est. 2014</span>
            </div>
          </div>
          <div>
            <span style={{ ...micro, color: FAINT }}>About</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', lineHeight: 1.25, margin: '1.25rem 0 1.75rem' }}>
              I photograph the moments people forget they had.
            </h2>
            <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.9, margin: '0 0 1.25rem' }}>
              I started with a borrowed film camera at my sister’s wedding twelve years ago, and the picture that mattered most was not the kiss — it was my father fixing her veil with shaking hands. I have been chasing that kind of photograph ever since.
            </p>
            <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.9, margin: '0 0 1.25rem' }}>
              Today the studio splits its year between weddings across Europe, editorial commissions for slow-living brands and magazines, and quiet portrait sessions in Copenhagen. The aesthetic stays the same everywhere: natural light, true color, no heavy retouching.
            </p>
            <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.9, margin: '0 0 2.25rem' }}>
              When I am not shooting, I am printing — every commission ends with at least one photograph on paper, because images deserve more than a feed.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', borderTop: HAIRLINE, paddingTop: '1.75rem' }}>
              <div>
                <div style={{ ...micro, color: FAINT, marginBottom: '6px' }}>Based In</div>
                <div style={{ fontFamily: serif, fontSize: '16px' }}>Copenhagen, Denmark</div>
              </div>
              <div>
                <div style={{ ...micro, color: FAINT, marginBottom: '6px' }}>Available</div>
                <div style={{ fontFamily: serif, fontSize: '16px' }}>Worldwide, 2026–27</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ ...micro, color: FAINT }}>Services</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '1.25rem 0 0' }}>What I Photograph</h2>
          </div>
          {services.map(s => (
            <div key={s.num} style={{ borderTop: HAIRLINE, padding: '3rem 0', display: 'grid', gridTemplateColumns: '90px 1fr 180px', gap: '2rem', alignItems: 'start' }}>
              <span style={{ fontFamily: serif, fontSize: '15px', color: FAINT }}>{s.num}</span>
              <div>
                <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.7rem', margin: '0 0 0.9rem', letterSpacing: '0.02em' }}>{s.name}</h3>
                <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.85, margin: 0, maxWidth: '520px' }}>{s.desc}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...micro, color: FAINT, marginBottom: '7px' }}>Investment</div>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '17px' }}>{s.price}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: HAIRLINE }} />
        </div>
      </section>

      {/* ── Client Words ── */}
      <section style={{ borderTop: HAIRLINE, padding: '6rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ ...micro, color: FAINT }}>Client Words</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '1.25rem 0 0' }}>Kind Notes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {clientWords.map(t => (
              <div key={t.name} style={{ background: '#fff', border: HAIRLINE, padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <span style={{ fontFamily: serif, fontSize: '42px', lineHeight: 0.6, color: '#d4d4d4' }}>“</span>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '15.5px', lineHeight: 1.85, margin: 0, flex: 1, color: '#333' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: HAIRLINE, paddingTop: '1.5rem' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  <div>
                    <p style={{ fontSize: '13.5px', fontWeight: 600, margin: 0 }}>{t.name}</p>
                    <p style={{ ...micro, fontSize: '10px', color: FAINT, margin: '4px 0 0' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Book a Session ── */}
      <section style={{ padding: '6rem 2rem', borderTop: HAIRLINE }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ ...micro, color: FAINT }}>Book a Session</span>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '1.25rem 0 1.25rem' }}>Let’s Make Something Quiet & True</h2>
            <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, maxWidth: '540px', margin: '0 auto' }}>
              Choose a session type below. I take a limited number of commissions each season — 2026 wedding dates are roughly 70% booked.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: HAIRLINE }}>
            {sessionTypes.map((st, i) => {
              const active = activeSession === i;
              return (
                <button
                  key={st.name}
                  onClick={() => setActiveSession(i)}
                  style={{ padding: '1.75rem 1.5rem', cursor: 'pointer', textAlign: 'left', border: 'none', borderLeft: i === 0 ? 'none' : HAIRLINE, background: active ? INK : '#fff', color: active ? '#fff' : INK, fontFamily: 'inherit', transition: 'all 0.2s' }}
                >
                  <div style={{ fontFamily: serif, fontSize: '17px', marginBottom: '8px' }}>{st.name}</div>
                  <div style={{ ...micro, fontSize: '10px', color: active ? 'rgba(255,255,255,0.7)' : FAINT }}>{st.duration}</div>
                </button>
              );
            })}
          </div>
          <div style={{ border: HAIRLINE, borderTop: 'none', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ ...micro, color: FAINT, marginBottom: '1.25rem' }}>Every {session.name} includes</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem 2rem' }}>
                {session.includes.map(item => (
                  <li key={item} style={{ fontSize: '14.5px', color: '#333', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ width: '14px', height: '1px', background: INK, flexShrink: 0, transform: 'translateY(-4px)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ textAlign: 'center', borderLeft: HAIRLINE, paddingLeft: '3rem' }}>
              <div style={{ ...micro, color: FAINT, marginBottom: '8px' }}>Starting At</div>
              <div style={{ fontFamily: serif, fontSize: '2.8rem', lineHeight: 1, marginBottom: '1.5rem' }}>{session.price}</div>
              <a href="#" style={{ ...micro, display: 'block', background: INK, color: '#fff', padding: '15px 0', textDecoration: 'none' }}>Request This Date</a>
              <p style={{ fontSize: '12px', color: FAINT, marginTop: '0.9rem', marginBottom: 0 }}>Replies within 48 hours, always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section style={{ borderTop: HAIRLINE, background: '#fafafa', padding: '4.5rem 2rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ ...micro, color: FAINT, marginBottom: '0.9rem' }}>Enquiries</div>
            <a href="#" style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '19px', color: INK, textDecoration: 'none' }}>hello@aria.photography</a>
          </div>
          <div>
            <div style={{ ...micro, color: FAINT, marginBottom: '0.9rem' }}>Studio</div>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '19px', margin: 0 }}>Værnedamsvej 12, Copenhagen</p>
          </div>
          <div>
            <div style={{ ...micro, color: FAINT, marginBottom: '0.9rem' }}>Telephone</div>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '19px', margin: 0 }}>+45 31 22 84 90</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: HAIRLINE, padding: '4.5rem 2rem 2.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ fontFamily: serif, fontSize: '22px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>Aria</div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.8, margin: 0 }}>
                Wedding, editorial, and portrait photography from Copenhagen — quiet images for people who would rather remember than perform.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ ...micro, color: FAINT, margin: '0 0 1.1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '13.5px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{ maxWidth: '260px' }}>
              <h4 style={{ ...micro, color: FAINT, margin: '0 0 1.1rem' }}>Quiet Letters</h4>
              <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: '0 0 1rem' }}>One email a season — new work, open dates, print releases.</p>
              <div style={{ display: 'flex', borderBottom: `1px solid ${INK}` }}>
                <span style={{ flex: 1, fontSize: '13px', color: FAINT, padding: '10px 0' }}>your@email.com</span>
                <span style={{ ...micro, padding: '10px 0 10px 12px', cursor: 'pointer' }}>Join</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: HAIRLINE, paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: FAINT, margin: 0, letterSpacing: '0.06em' }}>© 2026 Aria Lindholm Photography. All images are the photographer’s own.</p>
            <p style={{ ...micro, fontSize: '10px', color: '#c2c2c2', margin: 0 }}>Copenhagen — and wherever the light is good</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
