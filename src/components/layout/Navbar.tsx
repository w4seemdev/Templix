import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Templates',  to: '/templates'  },
  { label: 'Categories', to: '/categories' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

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
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: '14px', fontWeight: 500,
                color: pathname === link.to ? '#ffffff' : '#94a3b8',
                textDecoration: 'none', transition: 'color 0.15s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right: Sign in + Get started ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'flex-end' }}>
          <Link to="/login" style={{
            fontSize: '14px', fontWeight: 500,
            color: '#94a3b8', textDecoration: 'none',
          }}>
            Sign in
          </Link>
          <Link to="/templates" style={{
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
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>
            Sign in
          </Link>
          <Link to="/templates" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: '#38bdf8', borderRadius: '10px', padding: '10px 18px',
            fontSize: '14px', fontWeight: 600, color: '#020617', textDecoration: 'none',
          }}>
            Get started →
          </Link>
        </div>
      )}
    </header>
  );
}
