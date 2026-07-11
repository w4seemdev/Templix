import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string | undefined;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * True only when both env vars are present. Consumers should gate auth/data
 * calls on this. When false, the exported `supabase` client below is a harmless
 * placeholder so the app still boots instead of white-screening at import time
 * (supabase-js throws if it's constructed with an undefined URL).
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnon);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Templix] Supabase is not configured — set VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY. Auth, purchases, and downloads are disabled until then.',
  );
}

export const supabase = createClient(
  supabaseUrl  ?? 'https://placeholder.supabase.co',
  supabaseAnon ?? 'placeholder-anon-key',
);

/* ─── Database types ─────────────────────────────────────── */
// NOTE: a generated `Database` generic (supabase gen types) would give
// `.from()` calls full type safety, but the schema isn't committed to the repo
// yet, so the client stays ungeneric for now.
export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  template_id: string;
  stripe_session_id: string | null;
  amount: number;
  created_at: string;
}
