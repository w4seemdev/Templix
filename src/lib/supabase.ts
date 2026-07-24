import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True only when both env vars are present. Consumers gate auth/data UI on this
 * (LoginPage disables its forms and explains why). When false, the exported
 * `supabase` client below is a harmless placeholder so the app still boots
 * instead of white-screening at import time (supabase-js throws if it's
 * constructed with an undefined URL).
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnon);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // Deliberate: dev-only misconfiguration warning, stripped from production builds.
  console.warn(
    '[Templix] Supabase is not configured — set VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY. Auth, purchases, and downloads are disabled until then.',
  );
}

// Sessions persist in localStorage (supabase-js default). That is the accepted
// tradeoff for a pure SPA with no backend of its own; the compensating control
// is the Content-Security-Policy shipped in vercel.json, which is what keeps an
// injected script from reading the tokens. Don't re-litigate one without the other.
export const supabase = createClient(
  supabaseUrl  ?? 'https://placeholder.supabase.co',
  supabaseAnon ?? 'placeholder-anon-key',
);

/* ─── Database types ─────────────────────────────────────── */
// These are the single source of truth for row shapes until the schema is
// generated: run `supabase gen types typescript --project-id <id>` (Supabase
// CLI, no npm dependency), commit the result, and pass it as
// `createClient<Database>(...)` so `.from()` is typed end to end. Until then,
// type each query at the call site with `.returns<...>()` — never re-declare a
// row shape locally.
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
