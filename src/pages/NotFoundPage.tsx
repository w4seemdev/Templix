import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '2rem',
    }}>
      <div>
        <p style={{ fontSize: '8rem', fontWeight: 900, color: '#1e293b', margin: 0, lineHeight: 1 }}>404</p>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: '1rem 0 0.5rem' }}>
          Page not found
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '2rem' }}>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            borderRadius: '12px', background: '#38bdf8',
            padding: '12px 24px', fontSize: '14px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            ← Back to home
          </Link>
          <Link to="/templates" style={{
            display: 'inline-flex', alignItems: 'center',
            borderRadius: '12px', border: '1px solid #334155',
            padding: '12px 24px', fontSize: '14px', fontWeight: 600,
            color: '#94a3b8', textDecoration: 'none',
          }}>
            Browse templates
          </Link>
        </div>
      </div>
    </div>
  );
}
