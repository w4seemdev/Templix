-- Templix — row-level security for the two tables the browser touches directly.
--
-- Threat model
-- ------------
-- The SPA queries `purchases` with the anon key (src/hooks/usePurchases.ts,
-- DashboardPage, PurchaseSuccessPage) and upserts `profiles` from the account
-- settings form. Ownership of a paid template is what verify-download checks
-- before it signs a private zip URL, so an INSERT policy on `purchases` would be
-- a full payment bypass: any authenticated user could insert their own row and
-- then download anything.
--
-- Therefore: `purchases` gets a SELECT policy and nothing else. With RLS enabled
-- and no policy for a command, that command is denied — so INSERT/UPDATE/DELETE
-- are impossible for anon and authenticated. The stripe-webhook edge function
-- uses the service-role key, which bypasses RLS, and remains the only writer.
--
-- Apply with: supabase db push   (or paste into the SQL editor)
-- Then confirm RLS shows enabled on both tables in the Supabase advisors.

/* ─── purchases ────────────────────────────────────────────── */

alter table public.purchases enable row level security;

drop policy if exists "read own purchases" on public.purchases;
create policy "read own purchases"
  on public.purchases
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Webhook retries must not create duplicate ownership rows. The function's
-- check-then-insert was racy on its own; this constraint is what makes the
-- insert genuinely idempotent. (Postgres treats NULLs as distinct, so the free
-- / manually-granted rows without a session id are unaffected.)
alter table public.purchases
  drop constraint if exists purchases_stripe_session_id_key;
alter table public.purchases
  add constraint purchases_stripe_session_id_key unique (stripe_session_id);

/* ─── profiles ─────────────────────────────────────────────── */

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
