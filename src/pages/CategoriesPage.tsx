import { Link } from 'react-router-dom';
import { templates, categories } from '../data/templates';
import Container from '../components/ui/Container';

const categoryIcons: Record<string, string> = {
  saas:       '⚡',
  portfolio:  '🎨',
  ecommerce:  '🛍️',
  blog:       '✍️',
  agency:     '🏢',
  landing:    '🚀',
  dashboard:  '📊',
  restaurant: '🍽️',
  corporate:  '💼',
};

export default function CategoriesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Browse by category
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            Find your perfect template
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.0625rem', maxWidth: '500px', margin: '0 auto' }}>
            Every template is organized by category so you can find exactly what you need.
          </p>
        </div>

        {/* Category cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {categories
            .filter(c => c.id !== 'all')
            .map(cat => {
              const count    = templates.filter(t => t.category === cat.id).length;
              const previews = templates.filter(t => t.category === cat.id).slice(0, 3);

              return (
                <Link
                  key={cat.id}
                  to="/templates"
                  style={{
                    display: 'flex', flexDirection: 'column',
                    borderRadius: '16px', border: '1px solid #1e293b',
                    background: '#0f172a', padding: '1.5rem',
                    textDecoration: 'none', transition: 'border-color 0.2s',
                  }}
                >
                  {/* Icon + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '24px' }}>{categoryIcons[cat.id] ?? '📁'}</span>
                    <div>
                      <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                        {cat.label}
                      </h2>
                      <p style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                        {count} template{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Mini previews */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {previews.map(t => (
                      <div key={t.id} style={{
                        flex: 1, aspectRatio: '16/10',
                        borderRadius: '8px', overflow: 'hidden',
                        background: '#1e293b',
                      }}>
                        <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                      </div>
                    ))}
                  </div>

                  <span style={{ marginTop: '1.25rem', fontSize: '14px', fontWeight: 500, color: '#38bdf8' }}>
                    Browse {cat.label} →
                  </span>
                </Link>
              );
            })}
        </div>

      </Container>
    </div>
  );
}
