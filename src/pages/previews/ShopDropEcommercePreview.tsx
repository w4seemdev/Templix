/* ============================================================
   SHOPDROP — Ecommerce Template
   Dark with orange accent — modern fashion/lifestyle store
   ============================================================ */

import { useState } from 'react';

export default function ShopDropEcommercePreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#080808', color: '#ffffff', minHeight: '100vh' }}>
      <ShopNav />
      <HeroBanner />
      <CategoriesStrip />
      <ProductsGrid />
      <PromoSection />
      <CustomerReviews />
      <TrendingSection />
      <FeaturesBar />
      <ShopFooter />
    </div>
  );
}

function ShopNav() {
  const [cart] = useState(3);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.04em' }}>SHOP<span style={{ color: '#f97316' }}>DROP</span></span>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['New Arrivals', 'Men', 'Women', 'Accessories', 'Sale'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#a3a3a3', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="#" style={{ color: '#a3a3a3', textDecoration: 'none' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </a>
          <a href="#" style={{ color: '#a3a3a3', textDecoration: 'none', position: 'relative' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#f97316', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>{cart}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroBanner() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '580px', display: 'flex', alignItems: 'center' }}>
      <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80" alt="hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.95) 40%, transparent)' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
        <span style={{ display: 'inline-block', background: '#f97316', borderRadius: '4px', padding: '3px 12px', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          New Collection 2024
        </span>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem', maxWidth: '600px' }}>
          Wear what<br />moves you.
        </h1>
        <p style={{ fontSize: '1.0625rem', color: '#a3a3a3', lineHeight: 1.7, maxWidth: '420px', marginBottom: '2rem' }}>
          Discover our latest drop — designed for those who refuse to blend in. Bold, minimal, unapologetic.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ background: '#f97316', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
            Shop Now
          </a>
          <a href="#" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>
            View Lookbook
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoriesStrip() {
  const cats = [
    { label: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80' },
    { label: 'Hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80' },
    { label: 'Pants', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80' },
    { label: 'Sneakers', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
    { label: 'Bags', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
  ];
  return (
    <section style={{ padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Shop by category</h2>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '8px' }}>
          {cats.map(c => (
            <a key={c.label} href="#" style={{
              flexShrink: 0, width: '140px', borderRadius: '12px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', position: 'relative',
            }}>
              <div style={{ aspectRatio: '3/4' }}>
                <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{c.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const products = [
  { name: 'Oversized Drop Tee', price: 45, originalPrice: null, badge: 'New', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { name: 'Street Cargo Pants', price: 89, originalPrice: 120, badge: 'Sale', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
  { name: 'Arch Logo Hoodie', price: 110, originalPrice: null, badge: null, img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
  { name: 'Air Runner 2.0', price: 160, originalPrice: null, badge: 'New', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { name: 'Mini Shoulder Bag', price: 65, originalPrice: 85, badge: 'Sale', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { name: 'Ribbed Knit Vest', price: 55, originalPrice: null, badge: null, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80' },
];

function ProductsGrid() {
  return (
    <section style={{ padding: '3rem 0 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>New arrivals</h2>
          <a href="#" style={{ fontSize: '13px', color: '#f97316', textDecoration: 'none' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {products.map(p => (
            <div key={p.name} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#111111' }}>
              <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.badge && (
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: p.badge === 'Sale' ? '#ef4444' : '#f97316',
                    borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 700, color: '#fff',
                  }}>{p.badge}</span>
                )}
                <button style={{
                  position: 'absolute', bottom: '12px', left: '12px', right: '12px',
                  background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 600,
                  color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(8px)',
                  opacity: 0,
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0'}
                >
                  Add to cart
                </button>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px' }}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: p.originalPrice ? '#f97316' : '#ffffff' }}>${p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: '13px', color: '#525252', textDecoration: 'line-through' }}>${p.originalPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoSection() {
  return (
    <section style={{ background: '#f97316', padding: '4rem 2rem', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)', marginBottom: '0.75rem' }}>Limited time</p>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#000000', margin: '0 0 1rem' }}>
        30% off your first order
      </h2>
      <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.0625rem', marginBottom: '2rem' }}>Use code NEWDROP at checkout</p>
      <a href="#" style={{ display: 'inline-block', background: '#000000', borderRadius: '10px', padding: '13px 32px', fontSize: '14px', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
        Claim offer
      </a>
    </section>
  );
}

function CustomerReviews() {
  const reviews = [
    { text: "Literally the most comfortable hoodie I own. The quality is insane for the price.", author: 'Jordan K.', item: 'Arch Logo Hoodie', rating: 5 },
    { text: "Fast shipping, perfect fit. The cargo pants are fire — everyone asks me where they're from.", author: 'Mia T.', item: 'Street Cargo Pants', rating: 5 },
    { text: "ShopDrop has completely replaced my old go-to brands. Obsessed with everything I've ordered.", author: 'Alex R.', item: 'Air Runner 2.0', rating: 5 },
  ];
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Customer reviews</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f97316', fontSize: '14px' }}>★</span>)}</div>
              <span style={{ fontSize: '13px', color: '#737373' }}>4.9 out of 5 · 2,847 reviews</span>
            </div>
          </div>
          <a href="#" style={{ fontSize: '13px', color: '#f97316', textDecoration: 'none' }}>All reviews →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {reviews.map(r => (
            <div key={r.author} style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', background: '#111111', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f97316', fontSize: '13px' }}>★</span>)}
              </div>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.7, margin: '0 0 1rem' }}>"{r.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{r.author}</span>
                <span style={{ fontSize: '11px', color: '#404040', background: '#1a1a1a', padding: '2px 8px', borderRadius: '4px' }}>{r.item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trending = [
  { name: 'Vintage Wash Tee', price: 42, rating: 4.8, reviews: 312, img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80', hot: true },
  { name: 'Track Jacket', price: 95, rating: 4.9, reviews: 204, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8a?w=400&q=80', hot: false },
  { name: 'Corduroy Cap', price: 35, rating: 4.7, reviews: 178, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', hot: false },
  { name: 'High-Top Canvas', price: 120, rating: 4.9, reviews: 521, img: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400&q=80', hot: true },
];

function TrendingSection() {
  return (
    <section style={{ padding: '2rem 0 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>🔥 Trending now</h2>
          <a href="#" style={{ fontSize: '13px', color: '#f97316', textDecoration: 'none' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {trending.map(p => (
            <div key={p.name} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#111111' }}>
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.hot && <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#ef4444', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 700, color: '#fff' }}>Hot</span>}
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px' }}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700 }}>${p.price}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#f97316', fontSize: '12px' }}>★ {p.rating}</span>
                    <span style={{ fontSize: '11px', color: '#525252' }}>({p.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesBar() {
  const items = [
    { icon: '🚚', title: 'Free shipping', desc: 'On orders over $80' },
    { icon: '↩️', title: 'Free returns', desc: '30-day return policy' },
    { icon: '🔒', title: 'Secure payment', desc: 'SSL encrypted checkout' },
    { icon: '💬', title: '24/7 support', desc: 'Real humans, always' },
  ];
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
        {items.map(i => (
          <div key={i.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>{i.icon}</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{i.title}</div>
              <div style={{ fontSize: '13px', color: '#525252', marginTop: '2px' }}>{i.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShopFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.04em' }}>SHOP<span style={{ color: '#f97316' }}>DROP</span></span>
          <p style={{ fontSize: '13px', color: '#525252', marginTop: '0.75rem', maxWidth: '220px', lineHeight: 1.7 }}>Bold streetwear for those who refuse to blend in.</p>
        </div>
        {[
          { title: 'Shop', links: ['New Arrivals', 'Men', 'Women', 'Sale'] },
          { title: 'Help', links: ['Sizing Guide', 'Shipping', 'Returns', 'FAQ'] },
          { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#525252', marginBottom: '1rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: '#404040', textDecoration: 'none' }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 2rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '13px', color: '#262626' }}>© {new Date().getFullYear()} ShopDrop. All rights reserved.</span>
        <span style={{ fontSize: '13px', color: '#262626' }}>Visa · Mastercard · PayPal · Apple Pay</span>
      </div>
    </footer>
  );
}
