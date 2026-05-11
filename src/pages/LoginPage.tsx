import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <div style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '32px', height: '32px', background: '#38bdf8',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" fill="#020617" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Templix</span>
        </div>

        {/* Card */}
        <div style={{
          borderRadius: '20px', border: '1px solid #1e293b',
          background: '#0f172a', padding: '2rem',
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderRadius: '10px', background: '#020617', padding: '4px', marginBottom: '1.75rem' }}>
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '8px', borderRadius: '7px',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer', border: 'none',
                  background: mode === m ? '#1e293b' : 'transparent',
                  color: mode === m ? '#ffffff' : '#64748b',
                  textTransform: 'capitalize', transition: 'all 0.15s',
                }}
              >
                {m === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.35rem' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 1.5rem' }}>
            {mode === 'login'
              ? 'Sign in to access your templates and purchases.'
              : 'Start browsing and buying templates today.'}
          </p>

          {/* Form */}
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    borderRadius: '10px', border: '1px solid #334155',
                    background: '#020617', padding: '10px 14px',
                    fontSize: '14px', color: '#ffffff', outline: 'none',
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  borderRadius: '10px', border: '1px solid #334155',
                  background: '#020617', padding: '10px 14px',
                  fontSize: '14px', color: '#ffffff', outline: 'none',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>Password</label>
                {mode === 'login' && (
                  <Link to="#" style={{ fontSize: '13px', color: '#38bdf8', textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  borderRadius: '10px', border: '1px solid #334155',
                  background: '#020617', padding: '10px 14px',
                  fontSize: '14px', color: '#ffffff', outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%', borderRadius: '10px', background: '#38bdf8',
                border: 'none', padding: '12px', fontSize: '15px',
                fontWeight: 600, color: '#020617', cursor: 'pointer',
                marginTop: '0.5rem', transition: 'background 0.15s',
              }}
            >
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '13px', color: '#64748b' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{ color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: '#475569' }}>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Back to Templix</Link>
        </p>
      </div>
    </div>
  );
}
