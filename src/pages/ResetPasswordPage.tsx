import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';

const inputClass =
  'h-11 w-full rounded-lg border border-border-default bg-surface-2 px-3.5 text-[15px] text-text-primary transition-[border-color,box-shadow] duration-150 focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)] focus:outline-none';

export default function ResetPasswordPage() {
  useSEO({ title: 'Reset Password' });

  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sets a session from the URL hash automatically
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidSession(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    }
  };

  return (
    <div className="aurora aurora--dim grain flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <Link to="/" className="mb-10 flex items-center justify-center gap-2.5 no-underline">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-glow-cta)' }}
          >
            <svg width="15" height="15" fill="#FFFFFF" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-[-0.01em] text-text-primary">Templix</span>
        </Link>

        {/* Card */}
        <div className="glass p-8 max-sm:p-6">

          {success ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-success-soft-border bg-success-soft">
                <svg width="22" height="22" fill="none" stroke="var(--color-success)" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-semibold tracking-[-0.015em] text-text-primary">
                Password updated!
              </h2>
              <p className="text-sm text-text-tertiary">Redirecting you to the dashboard…</p>
            </div>
          ) : !validSession ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-warning-soft-border bg-warning-soft">
                <svg width="22" height="22" fill="none" stroke="var(--color-warning)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-semibold tracking-[-0.015em] text-text-primary">
                Link expired
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-text-tertiary">
                This password reset link is invalid or has expired.
              </p>
              <Link to="/login" className="btn btn-primary glow-cta">
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="mb-1 text-2xl font-semibold tracking-[-0.015em] text-text-primary">
                Set new password
              </h1>
              <p className="mb-6 text-[13px] text-text-tertiary">
                Choose a strong password for your account.
              </p>

              {error && (
                <div className="mb-4 rounded-lg border border-danger-soft-border bg-danger-soft px-3.5 py-2.5 text-[13px] text-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="tmx-new-password" className="mb-1.5 block text-[13px] font-medium text-text-secondary">
                    New password
                  </label>
                  <input
                    id="tmx-new-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="tmx-confirm-password" className="mb-1.5 block text-[13px] font-medium text-text-secondary">
                    Confirm password
                  </label>
                  <input
                    id="tmx-confirm-password"
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    className={inputClass}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary glow-cta mt-2 h-11 w-full">
                  {loading ? 'Updating…' : 'Update password'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[13px]">
          <Link to="/login" className="text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
