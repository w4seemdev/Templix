/**
 * `isSupabaseConfigured` is the only logic in constants.ts, and it decides
 * whether LoginPage offers auth at all - get it wrong in the optimistic
 * direction and a visitor is handed a sign-up form that can never succeed.
 *
 * CONTACT_EMAIL and MIN_PASSWORD_LENGTH are plain values: any assertion about
 * them would just restate the literal, so they are deliberately untested.
 *
 * The flag is computed at module scope, so each case re-imports the module with
 * a different environment rather than calling a function.
 */
const loadFlag = async (): Promise<boolean> =>
  (await import('./constants')).isSupabaseConfigured;

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('isSupabaseConfigured', () => {
  it('is true when both Supabase env vars are set', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

    await expect(loadFlag()).resolves.toBe(true);
  });

  it('is false when the anon key is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', undefined);

    await expect(loadFlag()).resolves.toBe(false);
  });

  it('is false when the project URL is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', undefined);
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

    await expect(loadFlag()).resolves.toBe(false);
  });

  it('is false when the env vars exist but are blank', async () => {
    // A blank value in a hosting dashboard is the realistic misconfiguration:
    // the variable is defined, so a presence check would pass, but there are no
    // credentials behind it.
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

    await expect(loadFlag()).resolves.toBe(false);
  });
});
