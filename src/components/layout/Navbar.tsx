import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Templates',  to: '/templates'  },
  { label: 'Categories', to: '/categories' },
  { label: 'Wishlist',   to: '/wishlist'   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials    = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      borderBottom: '1px solid #1e293b',
      background: 'rgba(2,6,23,0.92)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        paddingLeft: '2rem', paddingRight: '2rem',
        height: '64px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}>

        {/* ── Left: Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', background: '#38bdf8', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="16" height="16" fill="#020617" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Templix
          </span>
        </Link>

        {/* ── Center: Nav links ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              fontSize: '14px', fontWeight: 500,
              color: pathname === link.to ? '#ffffff' : '#94a3b8',
              textDecoration: 'none', transition: 'color 0.15s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right: Auth state ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
          {user ? (
            /* ── Logged in: avatar + dropdown ── */
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'none', border: '1px solid #1e293b',
                  borderRadius: '10px', padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #38bdf8, #0891b2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#020617', flexShrink: 0,
                }}>
                  {initials}
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayName.split(' ')[0]}
                </span>
                <svg width="12" height="12" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  minWidth: '180px', borderRadius: '12px',
                  border: '1px solid #1e293b', background: '#0f172a',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  overflow: 'hidden', zIndex: 100,
                }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{displayName}</p>
                    <p style={{ fontSize: '11px', color: '#475569', margin: '2px 0 0' }}>{user.email}</p>
                  </div>
                  {[
                    { label: 'Dashboard', to: '/dashboard' },
                    { label: 'My purchases', to: '/dashboard' },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setUserMenuOpen(false)} style={{
                      display: 'block', padding: '10px 14px',
                      fontSize: '14px', color: '#94a3b8', textDecoration: 'none',
                      borderBottom: '1px solid #1e293b',
                    }}>
                      {item.label}
                    </Link>
                  ))}
                  <button onClick={handleSignOut} style={{
                    width: '100%', padding: '10px 14px', textAlign: 'left',
                    background: 'none', border: 'none', fontSize: '14px',
                    color: '#ef4444', cursor: 'pointer',
                  }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged out: Sign in + Get started ── */
            <>
              <Link to="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link to="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#38bdf8', borderRadius: '10px',
                padding: '8px 18px', fontSize: '14px', fontWeight: 600,
                color: '#020617', textDecoration: 'none',
              }}>
                Get started
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid #1e293b', background: '#020617',
          padding: '1.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{
              fontSize: '14px', fontWeight: 500,
              color: pathname === link.to ? '#ffffff' : '#94a3b8',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #1e293b', margin: '4px 0' }} />
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <button onClick={handleSignOut} style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '14px', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#38bdf8', borderRadius: '10px', padding: '10px 18px',
                fontSize: '14px', fontWeight: 600, color: '#020617', textDecoration: 'none',
              }}>
                Get started →
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
