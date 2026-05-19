import { useState } from 'react';

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', price: '$16', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80', rating: 4.8 },
  { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', price: '$18', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80', rating: 4.9 },
  { title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', price: '$14', img: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&q=80', rating: 4.7 },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', price: '$13', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80', rating: 4.8 },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology', price: '$20', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&q=80', rating: 4.6 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: '$11', img: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80', rating: 4.5 },
];

const genres = ['All', 'Fiction', 'Sci-Fi', 'Self-Help', 'Psychology', 'Classic'];

export default function BookstorePreview() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? books : books.filter(b => b.genre === active);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#faf7f3', color: '#1c1208', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#1c1208', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>📚</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#faf7f3', letterSpacing: '-0.02em' }}>Shelf</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Browse', 'New Releases', 'Bestsellers', 'Reading Lists', 'Gifts'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#a08060', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <svg width="22" height="22" fill="none" stroke="#a08060" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#c8784a', color: '#fff', fontSize: '9px', fontWeight: 700, borderRadius: '50%', width: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </div>
          <button style={{ background: '#c8784a', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1c1208 0%, #3d2512 100%)', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=80)', backgroundSize: 'cover' }} />
        <div style={{ position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#faf7f3', letterSpacing: '-0.03em', margin: '0 0 1rem', lineHeight: 1.15 }}>
            Your next great read<br />is waiting.
          </h1>
          <p style={{ fontSize: '15px', color: '#a08060', marginBottom: '2rem' }}>Curated books for curious minds. Free shipping on orders over $35.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <input placeholder="Search by title, author, or genre..." style={{ flex: 1, border: 'none', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', outline: 'none', color: '#1c1208', background: '#fff' }} />
            <button style={{ background: '#c8784a', border: 'none', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </section>

      {/* Browse */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Browse Books</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {genres.map(g => (
              <button key={g} onClick={() => setActive(g)} style={{ padding: '6px 16px', borderRadius: '9999px', border: '1px solid', borderColor: active === g ? '#c8784a' : '#d4c4b0', background: active === g ? '#c8784a' : 'transparent', color: active === g ? '#fff' : '#7a5a3a', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(book => (
            <div key={book.title} style={{ cursor: 'pointer' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '0.875rem', aspectRatio: '2/3', boxShadow: '4px 6px 20px rgba(0,0,0,0.15)' }}>
                <img src={book.img} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#c8784a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{book.genre}</span>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '3px 0 2px', lineHeight: 1.3 }}>{book.title}</h3>
              <p style={{ fontSize: '12px', color: '#7a5a3a', margin: '0 0 6px' }}>{book.author}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1c1208' }}>{book.price}</span>
                <span style={{ fontSize: '11px', color: '#f59e0b' }}>⭐ {book.rating}</span>
              </div>
              <button style={{ width: '100%', marginTop: '8px', background: '#1c1208', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '12px', fontWeight: 600, color: '#faf7f3', cursor: 'pointer' }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
