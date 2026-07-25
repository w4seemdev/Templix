import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './constants';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Re-exported from ./constants, where it is defined. Anything that only needs
 * the flag (LoginPage) must import it from there instead: importing it from
 * this module drags supabase-js along with it. When it is false the exported
 * `supabase` client below is a harmless placeholder so the app still boots
 * instead of white-screening at import time (supabase-js throws if it's
 * constructed with an undefined URL).
 */
export { isSupabaseConfigured };

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
//
// Falls back on falsiness — the same predicate as isSupabaseConfigured — not on
// `?? `: a blank env var in the hosting dashboard reaches the bundle as '',
// which `??` keeps, and createClient throws "supabaseUrl is required." at
// import, white-screening the site before React mounts.
export const supabase =
  supabaseUrl && supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : createClient('https://placeholder.supabase.co', 'placeholder-anon-key');

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
