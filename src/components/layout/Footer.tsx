import { Link } from 'react-router-dom';

const links = {
  Product: [
    { label: 'Browse Templates', to: '/templates' },
    { label: 'Categories',       to: '/categories' },
    { label: 'Pricing',          to: '/pricing'    },
    { label: 'Wishlist',         to: '/wishlist'   },
  ],
  Company: [
    { label: 'About',     to: '/about'     },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Sign in',   to: '/login'     },
  ],
  Legal: [
    { label: 'Terms of Service', to: '/terms'   },
    { label: 'Privacy Policy',   to: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1e293b', background: '#020617' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
      }}>

        {/* Top row: brand + columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: '3rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '0.875rem' }}>
              <div style={{
                width: '28px', height: '28px', background: '#38bdf8',
                borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" fill="#020617" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
                </svg>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Templix</span>
            </Link>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, maxWidth: '240px', margin: 0 }}>
              Professionally designed website templates for developers and designers.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '0.875rem', margin: '0 0 0.875rem' }}>
                {group}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffffff'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
          paddingTop: '1.5rem', borderTop: '1px solid #0f172a',
        }}>
          <p style={{ fontSize: '13px', color: '#334155', margin: 0 }}>
            © {new Date().getFullYear()} Templix. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/terms"   style={{ fontSize: '13px', color: '#334155', textDecoration: 'none' }}>Terms</Link>
            <Link to="/privacy" style={{ fontSize: '13px', color: '#334155', textDecoration: 'none' }}>Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
