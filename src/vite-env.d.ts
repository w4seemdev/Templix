/// <reference types="vite/client" />

// Declares the env keys this app actually reads so `import.meta.env.X` is typed
// as `string | undefined` instead of falling back to vite/client's `any` index
// signature. Keys are optional on purpose — a build without a .env is valid and
// is handled by `isSupabaseConfigured` in src/lib/supabase.ts.
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}
