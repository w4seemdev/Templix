/**
 * supabase.ts runs at import time on every route, so its only real job is to
 * never throw: `createClient` rejects a falsy URL or key with
 * "supabaseUrl is required.", and an exception here white-screens the whole
 * site before React mounts. That is why the module carries placeholder
 * credentials for the unconfigured case.
 *
 * The mock below mirrors supabase-js's own guard rather than accepting
 * anything, so "the app still boots" is actually being asserted instead of
 * assumed.
 */
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));

vi.mock('@supabase/supabase-js', () => ({ createClient }));

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-anon-key';

beforeEach(() => {
  vi.resetModules();
  createClient.mockReset();
  createClient.mockImplementation((url: unknown, key: unknown) => {
    // Same guard supabase-js applies - see SupabaseClient's constructor.
    if (typeof url !== 'string' || url.trim() === '') throw new Error('supabaseUrl is required.');
    if (typeof key !== 'string' || key === '') throw new Error('supabaseKey is required.');
    return { url, key };
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('the Supabase client module', () => {
  it('passes the configured credentials straight through', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

    const { supabase, isSupabaseConfigured } = await import('./supabase');

    expect(createClient).toHaveBeenCalledWith('https://project.supabase.co', 'anon-key');
    expect(supabase).toBeDefined();
    expect(isSupabaseConfigured).toBe(true);
  });

  it('boots with placeholder credentials when the env vars are absent', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', undefined);
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', undefined);

    const { supabase, isSupabaseConfigured } = await import('./supabase');

    expect(createClient).toHaveBeenCalledWith(PLACEHOLDER_URL, PLACEHOLDER_KEY);
    expect(supabase).toBeDefined();
    expect(isSupabaseConfigured).toBe(false);
  });

  it('boots with placeholder credentials when the env vars are defined but blank', async () => {
    // A blank variable in the Vercel dashboard reaches the bundle as "", which
    // is defined - so a `??` fallback keeps it and supabase-js throws at import,
    // taking the entire site down before the first render.
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

    const { supabase, isSupabaseConfigured } = await import('./supabase');

    expect(createClient).toHaveBeenCalledWith(PLACEHOLDER_URL, PLACEHOLDER_KEY);
    expect(supabase).toBeDefined();
    expect(isSupabaseConfigured).toBe(false);
  });

  it('boots with placeholder credentials when only one of the two vars is set', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', undefined);

    const { isSupabaseConfigured } = await import('./supabase');

    expect(createClient).toHaveBeenCalledWith(PLACEHOLDER_URL, PLACEHOLDER_KEY);
    expect(isSupabaseConfigured).toBe(false);
  });

  it('warns the developer in dev when Supabase is not configured', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubEnv('DEV', true);
    vi.stubEnv('VITE_SUPABASE_URL', undefined);
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', undefined);

    await import('./supabase');

    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain('VITE_SUPABASE_URL');
  });

  it('stays quiet in a production build', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubEnv('DEV', false);
    vi.stubEnv('VITE_SUPABASE_URL', undefined);
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', undefined);

    await import('./supabase');

    expect(warn).not.toHaveBeenCalled();
  });
});
