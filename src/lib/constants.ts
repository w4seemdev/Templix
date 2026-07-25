/**
 * Site-wide constants.
 *
 * CONTACT_EMAIL is the single mailbox used for support, legal, and privacy
 * requests. It must be an address that is actually monitored - the previous
 * @templix.com addresses pointed at a domain the project does not own, so
 * refund and data-deletion requests would have bounced. Change it here once
 * a branded mailbox exists and every page follows.
 */
export const CONTACT_EMAIL = 'waseemabufares@gmail.com';

/**
 * Minimum length every password form enforces - sign-up (LoginPage), the
 * dashboard password change, and the reset-password page. It was declared
 * separately in all three; they agreed, but only by luck. Change it here.
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * True only when both Supabase env vars are present. Consumers gate auth UI on
 * this (LoginPage disables its forms and explains why).
 *
 * It lives here, not in src/lib/supabase.ts, because LoginPage needs the flag
 * during render: importing it from the client module would statically pull the
 * ~197 kB supabase-js chunk onto the login route and undo the lazy load in
 * AuthContext. Vite inlines `import.meta.env` at build time, so this file has
 * no runtime dependencies. src/lib/supabase.ts re-exports it for consumers that
 * already load the client.
 */
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);
