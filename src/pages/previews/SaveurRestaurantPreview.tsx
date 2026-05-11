/* ============================================================
   SAVEUR — Restaurant Website Template
   Dark warm with gold accent — elegant dining experience
   ============================================================ */

export default function SaveurRestaurantPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#0a0703', color: '#ffffff', minHeight: '100vh' }}>
      <SaveurNav />
      <SaveurHero />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <SaveurFooter />
    </div>
  );
}

function SaveurNav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(212,163,80,0.15)', background: 'rgba(10,7,3,0.92)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.05em', color: '#f5dfa0' }}>SAVEUR</span>
          <div style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#7c6a44', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', marginTop: '-4px' }}>Restaurant &amp; Bar</div>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {['Menu', 'About', 'Gallery', 'Reserve'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '0.08em', color: '#a08050', textDecoration: 'none', textTransform: 'uppercase' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{ fontFamily: 'Inter, sans-serif', border: '1px solid rgba(212,163,80,0.4)', borderRadius: '4px', padding: '9px 20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: '#f5dfa0', textDecoration: 'none', textTransform: 'uppercase' }}>
          Reserve a table
        </a>
      </div>
    </header>
  );
}

function SaveurHero() {
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80" alt="restaurant" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,7,3,0.95) 40%, rgba(10,7,3,0.6))' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: '#d4a350', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Est. 2018 · Paris, France
          </p>
          <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.0, margin: '0 0 1.5rem' }}>
            A feast for<br />
            <span style={{ color: '#d4a350', fontStyle: 'italic' }}>the senses.</span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#8c7a5a', lineHeight: 1.8, maxWidth: '480px', marginBottom: '2.5rem' }}>
            Contemporary French cuisine crafted from seasonal ingredients sourced from local farms and artisan producers. Every dish tells a story.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ fontFamily: 'Inter, sans-serif', background: '#d4a350', borderRadius: '4px', padding: '14px 32px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', color: '#0a0703', textDecoration: 'none', textTransform: 'uppercase' }}>
              Reserve a table
            </a>
            <a href="#" style={{ fontFamily: 'Inter, sans-serif', border: '1px solid rgba(212,163,80,0.3)', borderRadius: '4px', padding: '14px 32px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', color: '#d4a350', textDecoration: 'none', textTransform: 'uppercase' }}>
              View menu
            </a>
          </div>
        </div>
      </div>
      {/* Awards strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(212,163,80,0.1)', padding: '1.25rem 2rem', background: 'rgba(10,7,3,0.8)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['★ Michelin Guide 2024', '🏆 Best Restaurant Paris 2023', '★★ Wine Spectator Award'].map(a => (
            <span key={a} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#7c6a44', letterSpacing: '0.05em' }}>{a}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '3/4' }}>
            <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80" alt="chef" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          </div>
          <div style={{ position: 'absolute', bottom: '-24px', right: '-24px', background: '#d4a350', borderRadius: '4px', padding: '1.5rem', maxWidth: '180px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0703', letterSpacing: '-0.03em' }}>12+</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#5c3d10', lineHeight: 1.4 }}>Years of culinary excellence</div>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#d4a350', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Our story</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 1.5rem' }}>
            Where tradition meets{' '}
            <span style={{ fontStyle: 'italic', color: '#d4a350' }}>innovation</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#7c6a44', lineHeight: 1.85, marginBottom: '1rem' }}>
            Chef Éric Beaumont brings together 20 years of experience in Parisian kitchens with a passion for reimagining classical French technique through a modern lens.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#7c6a44', lineHeight: 1.85, marginBottom: '2rem' }}>
            Our seasonal tasting menu changes with the harvest, ensuring every visit to Saveur offers something new, unexpected, and unforgettable.
          </p>
          <a href="#" style={{ fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#d4a350', textDecoration: 'none', letterSpacing: '0.05em' }}>
            Meet the team →
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const dishes = [
    { name: 'Foie Gras Torchon', desc: 'Brioche toast, fig compote, port wine reduction', price: '€28', type: 'Starter' },
    { name: 'Soupe à l\'Oignon', desc: 'Gruyère crust, caramelized onion broth, thyme crouton', price: '€18', type: 'Starter' },
    { name: 'Filet de Boeuf', desc: 'Black truffle sauce, pomme purée, seasonal vegetables', price: '€52', type: 'Main' },
    { name: 'Sole Meunière', desc: 'Brown butter, capers, lemon, asparagus, finger potatoes', price: '€44', type: 'Main' },
    { name: 'Tarte Tatin', desc: 'Caramelized apple, vanilla crème fraîche, calvados sauce', price: '€16', type: 'Dessert' },
    { name: 'Crème Brûlée', desc: 'Classic vanilla, Madagascar bean, seasonal berries', price: '€14', type: 'Dessert' },
  ];
  return (
    <section style={{ borderTop: '1px solid rgba(212,163,80,0.1)', padding: '6rem 2rem', background: '#0d0a05' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#d4a350', textTransform: 'uppercase', marginBottom: '1rem' }}>A la carte</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Our menu</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: 'rgba(212,163,80,0.1)' }}>
          {dishes.map((dish) => (
            <div key={dish.name} style={{ background: '#0d0a05', padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#7c6a44', textTransform: 'uppercase' }}>{dish.type}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', color: '#f5e6c8', margin: 0, lineHeight: 1.3 }}>{dish.name}</h3>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 700, color: '#d4a350', flexShrink: 0 }}>{dish.price}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b5a3a', lineHeight: 1.65, margin: 0 }}>{dish.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#" style={{ fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,163,80,0.3)', borderRadius: '4px', padding: '13px 28px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', color: '#d4a350', textDecoration: 'none', textTransform: 'uppercase' }}>
            Full menu →
          </a>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const imgs = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80',
  ];
  return (
    <section style={{ padding: '4rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        {imgs.map((src, i) => (
          <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'opacity 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.opacity = '0.85'}
              onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.opacity = '0.65'}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReservationSection() {
  return (
    <section style={{ padding: '6rem 2rem', background: '#0d0a05', borderTop: '1px solid rgba(212,163,80,0.1)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#d4a350', textTransform: 'uppercase', marginBottom: '1rem' }}>Reservations</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
          Book your table
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#7c6a44', marginBottom: '3rem', lineHeight: 1.7 }}>
          We accept reservations up to 30 days in advance. For groups of 8 or more, please contact us directly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {[{ placeholder: 'Full name', type: 'text' }, { placeholder: 'Email address', type: 'email' }, { placeholder: 'Date', type: 'date' }, { placeholder: 'Time', type: 'time' }].map((field, i) => (
            <input key={i} type={field.type} placeholder={field.placeholder} style={{ fontFamily: 'Inter, sans-serif', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,163,80,0.15)', borderRadius: '4px', padding: '13px 16px', fontSize: '14px', color: '#f5e6c8', outline: 'none' }} />
          ))}
        </div>
        <select style={{ fontFamily: 'Inter, sans-serif', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,163,80,0.15)', borderRadius: '4px', padding: '13px 16px', fontSize: '14px', color: '#7c6a44', marginBottom: '12px', outline: 'none' }}>
          <option>Number of guests</option>
          {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
        </select>
        <button style={{ fontFamily: 'Inter, sans-serif', width: '100%', background: '#d4a350', border: 'none', borderRadius: '4px', padding: '15px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', color: '#0a0703', cursor: 'pointer', textTransform: 'uppercase' }}>
          Confirm reservation
        </button>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#4a3c28', marginTop: '1rem' }}>
          Or call us: <span style={{ color: '#d4a350' }}>+33 1 23 45 67 89</span>
        </p>
      </div>
    </section>
  );
}

function SaveurFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(212,163,80,0.1)', padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em', color: '#f5dfa0' }}>SAVEUR</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#4a3c28', marginTop: '4px' }}>12 Rue de la Paix, 75001 Paris</div>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', gap: '2rem' }}>
          {['Menu', 'About', 'Gallery', 'Press', 'Contact'].map(l => <a key={l} href="#" style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#4a3c28', textDecoration: 'none', textTransform: 'uppercase' }}>{l}</a>)}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#2a1e10' }}>© {new Date().getFullYear()} Saveur. All rights reserved.</div>
      </div>
    </footer>
  );
}
