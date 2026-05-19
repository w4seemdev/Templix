import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useWishlist } from '../hooks/useWishlist';
import { templates } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';

export default function WishlistPage() {
  useSEO({ title: 'My Wishlist', description: 'Your saved Templix templates.' });
  const { wishlist } = useWishlist();
  const saved = templates.filter(t => wishlist.includes(t.id));

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Saved
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            My Wishlist
          </h1>
          <p style={{ marginTop: '8px', color: '#94a3b8' }}>
            {saved.length} saved template{saved.length !== 1 ? 's' : ''}
          </p>
        </div>

        {saved.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '6rem 0', textAlign: 'center',
          }}>
            {/* Heart icon */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', margin: '0 0 0.5rem' }}>
              No saved templates yet
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '360px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Click the heart icon on any template to save it here for later.
            </p>
            <Link to="/templates" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              borderRadius: '12px', background: '#38bdf8',
              padding: '12px 24px', fontSize: '14px', fontWeight: 600,
              color: '#020617', textDecoration: 'none',
            }}>
              Browse templates
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {saved.map(t => <TemplateCard key={t.id} template={t} />)}
          </div>
        )}

      </Container>
    </div>
  );
}
