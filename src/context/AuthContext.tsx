import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';

/**
 * supabase-js is ~190 KB (≈50 KB gzip) and AuthProvider mounts on every page, so
 * a static import would drag the whole client onto the initial critical path —
 * parsed and executed before first paint even for anonymous visitors who never
 * touch auth. Load it on demand instead. The module-level promise means every
 * caller shares one instance and the module is fetched at most once.
 *
 * Consumers must route auth calls through this context. A component that
 * imports '../lib/supabase' directly puts the chunk back on its own route —
 * that is why the OAuth, password-reset, and resend methods below exist.
 */
let clientPromise: Promise<typeof import('../lib/supabase')> | null = null;
const getSupabase = async () => {
  const pending = (clientPromise ??= import('../lib/supabase'));
  try {
    return (await pending).supabase;
  } catch (err) {
    // A rejected load must never be memoised. A visitor holding a cached
    // index.html from a previous deploy requests a hashed chunk that no longer
    // exists — if we kept the dead promise, every later sign-in/out would await
    // it forever. Drop it so the next caller re-requests the module.
    if (clientPromise === pending) clientPromise = null;
    throw err;
  }
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** True when the auth module itself could not be loaded — auth is dead until reload. */
  authUnavailable: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  /** `redirectPath` is where OAuth lands after the round trip (same-origin path). */
  signInWithGoogle: (redirectPath?: string) => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  resendConfirmation: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authUnavailable, setAuthUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    void getSupabase().then(supabase => {
      if (cancelled) return;

      const applySession = (next: Session | null) => {
        if (cancelled) return;
        setSession(next);
        setUser(next?.user ?? null);
        setLoading(false);
      };

      // Initial session, then keep it in sync with sign-in/out/token refresh.
      // getSession can reject outright (storage/lock access is blocked in some
      // private-browsing modes). Without this catch `loading` would never clear
      // and every ProtectedRoute would spin forever. The module itself loaded
      // fine, so fall through as signed-out — the subscription below stays live
      // and corrects the state if a session does turn up.
      void supabase.auth.getSession()
        .then(({ data }) => applySession(data.session))
        .catch(() => { if (!cancelled) setLoading(false); });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, next) => applySession(next),
      );
      unsubscribe = () => subscription.unsubscribe();
    }).catch(() => {
      if (cancelled) return;
      // The auth module never arrived. Clear loading so nothing waits on a
      // session that can't exist, and flag it so consumers show a real error
      // with a reload affordance instead of an endless spinner.
      setAuthUnavailable(true);
      setLoading(false);
    });

    return () => { cancelled = true; unsubscribe?.(); };
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };

    // Auto sign in right after signup (skip email confirmation)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    return { error: signInError?.message ?? null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signInWithGoogle = useCallback(async (redirectPath = '/dashboard') => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${redirectPath}` },
    });
    return { error: error?.message ?? null };
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  }, []);

  const resendConfirmation = useCallback(async (email: string) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user, session, loading, authUnavailable,
      signUp, signIn, signInWithGoogle, sendPasswordReset, resendConfirmation, signOut,
    }),
    [
      user, session, loading, authUnavailable,
      signUp, signIn, signInWithGoogle, sendPasswordReset, resendConfirmation, signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook intentionally colocated with its provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
