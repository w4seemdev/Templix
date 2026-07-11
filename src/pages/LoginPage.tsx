import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const inputClass =
  'h-11 w-full rounded-lg border border-border-default bg-surface-2 px-3.5 text-[15px] text-text-primary transition-[border-color,box-shadow] duration-150 focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)] focus:outline-none';

const isUnconfirmed = (msg: string) => /not confirmed|confirm your email/i.test(msg);

export default function LoginPage() {
  const [mode, setMode]         = useState<'login' | 'register'>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading]   = useState(false);
  const [needsConfirm, setNeedsConfirm]   = useState(false);
  const [resending, setResending]         = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Return-intent: a buy action navigates to /login with { state: { next } }.
  const next = (location.state as { next?: string } | null)?.next ?? '/dashboard';

  const resetBanners = () => { setError(''); setSuccess(''); setNeedsConfirm(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetBanners();
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        if (isUnconfirmed(error)) { setNeedsConfirm(true); setError('Please confirm your email before signing in.'); }
        else setError(error);
        return;
      }
      navigate(next, { replace: true });
    } else {
      if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      setLoading(false);
      if (error) {
        if (isUnconfirmed(error)) { setNeedsConfirm(true); setError('Almost there — confirm your email to finish creating your account.'); }
        else setError(error);
        return;
      }
      navigate(next, { replace: true });
    }
  };

  const handleGoogle = async () => {
    resetBanners();
    setGoogleLoading(true);
    // OAuth does a full-page redirect, so the return-intent must ride on
    // redirectTo. Preserve the live origin (localhost / preview / prod).
    const redirectPath = next.startsWith('/') ? next : '/dashboard';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${redirectPath}` },
    });
    if (error) { setError(error.message); setGoogleLoading(false); }
    // On success the browser is redirected away; no further state needed.
  };

  const handleForgotPassword = async () => {
    if (!email) { resetBanners(); setError('Enter your email first.'); return; }
    resetBanners();
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);
    if (error) setError(error.message);
    else setSuccess('Password reset email sent! Check your inbox.');
  };

  const handleResend = async () => {
    if (!email) { setError('Enter your email first.'); return; }
    setResending(true);
    setSuccess('');
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    setResending(false);
    if (error) setError(error.message);
    else { setNeedsConfirm(false); setError(''); setSuccess('Confirmation email sent. Check your inbox.'); }
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

        {/* Auth card */}
        <div className="glass p-8 max-sm:p-6">

          {/* Mode tabs */}
          <div className="mb-7 flex rounded-lg border border-border-subtle bg-surface-2 p-1">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); resetBanners(); }}
                aria-pressed={mode === m}
                className={`flex-1 cursor-pointer rounded-md border-0 py-2 text-sm font-medium transition-colors duration-150 ${
                  mode === m
                    ? 'bg-surface-3 text-text-primary shadow-sm'
                    : 'bg-transparent text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {m === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <h1 className="mb-1 text-2xl font-semibold tracking-[-0.015em] text-text-primary">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mb-6 text-[13px] text-text-tertiary">
            {mode === 'login' ? 'Sign in to access your templates and purchases.' : 'Start browsing and buying templates today.'}
          </p>

          {/* OAuth first */}
          <button onClick={handleGoogle} disabled={googleLoading} className="btn btn-secondary mb-5 h-11 w-full">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-4">
            <div className="hairline flex-1" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">or</span>
            <div className="hairline flex-1" />
          </div>

          {/* Banners */}
          {error && (
            <div role="alert" aria-live="assertive" className="mb-4 rounded-lg border border-danger-soft-border bg-danger-soft px-3.5 py-2.5 text-[13px] text-danger">
              {error}
              {needsConfirm && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="ml-1.5 cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-danger underline disabled:opacity-60"
                >
                  {resending ? 'Sending…' : 'Resend confirmation email'}
                </button>
              )}
            </div>
          )}
          {success && (
            <div role="status" className="mb-4 rounded-lg border border-success-soft-border bg-success-soft px-3.5 py-2.5 text-[13px] text-success">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label htmlFor="tmx-name" className="mb-1.5 block text-[13px] font-medium text-text-secondary">Full name</label>
                <input id="tmx-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" autoComplete="name" required className={inputClass} />
              </div>
            )}
            <div>
              <label htmlFor="tmx-email" className="mb-1.5 block text-[13px] font-medium text-text-secondary">Email address</label>
              <input id="tmx-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className={inputClass} />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="tmx-password" className="text-[13px] font-medium text-text-secondary">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover hover:underline disabled:opacity-60"
                  >
                    {resetLoading ? 'Sending…' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <input id="tmx-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required className={inputClass} />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary glow-cta mt-2 h-11 w-full">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-[13px] text-text-tertiary">
            {mode === 'login' ? "New to Templix? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); resetBanners(); }}
              className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover hover:underline"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-[13px]">
          <Link to="/" className="text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
            ← Back to Templix
          </Link>
        </p>
      </div>
    </div>
  );
}
