# Deployment

How to take Templix from a green local build to a working live site.

**Why this file exists:** the front-end deploys itself on every push to Vercel,
but the parts that make money - the RLS migration, the three edge functions, and
the private storage bucket - are all deployed by hand. None of that happens
automatically. If the private bucket is empty, checkout still succeeds and every
paid download then returns 404 with *"Download unavailable. The template file has
not been uploaded to the private storage bucket yet."* That is a customer who paid
and got nothing.

> **Status honesty.** This document was written by reading the scripts, the
> migration, and the three edge functions in this repository. No command in it
> was run against the live Supabase project - the project was paused at the time
> of writing, so nothing here about the *current* state of the hosted database,
> the deployed functions, or the bucket's contents has been verified. See
> [Unverified](#unverified) at the end. Treat every step as something to confirm,
> not something already done.

---

## 1. Prerequisites

| Tool | Notes |
|---|---|
| Node.js 22 | 20.19+ also works; CI pins 22. Node 18 cannot run this repo's toolchain - vite 8, eslint 10, and jsdom 29 all refuse it, so `npm run lint` and `npm run build` fail on the first step below |
| Supabase CLI | `npm i -g supabase` - needed for `db push`, `functions deploy`, `secrets set` |
| Stripe dashboard access | To register the webhook endpoint and read its signing secret |
| Vercel project | Already connected to `github.com/w4seemdev/Templix` |

You also need the Supabase **project ref** and the **service role key**
(Supabase → Project Settings → API). The project ref currently referenced in
this repo is `ushrtscqtwlrxiwcguwl` - it appears in the `connect-src` directive
of `vercel.json` and in the usage comment at the top of
`scripts/upload-premium-zips.mjs`. Confirm it against the dashboard before
relying on it.

---

## 2. Pre-deploy checklist

Run all four from the repo root. All must pass before anything ships.

```bash
npm run lint          # eslint .
npm run test          # vitest run - unit + integration suite (jsdom)
npm run check:prices  # catalog prices vs the create-checkout CATALOG
npm run build         # tsc -b && vite build  - type-check + production build
```

`.github/workflows/ci.yml` enforces the same set on every push and pull request
to `main`, as five named steps - lint, typecheck (`npx tsc -b --force`), tests
(`npm run test:coverage`), price sync, build. See
[docs/CONTRIBUTING.md](CONTRIBUTING.md#quality-gates) for what each one
protects. CI is not a substitute for running them here: it reports after the
fact, and pushing to the default branch is also what triggers the Vercel deploy
(section 9). Unless Vercel is configured to wait for the workflow, anything CI
catches has already shipped.

`npm run check:prices` is the one people forget. `src/data/templates.ts` is the
authoritative price and title; `supabase/functions/create-checkout/index.ts`
holds the trusted server-side copy. If they drift, buyers are charged an amount
that differs from the one displayed on the page. Run it after touching either
file, and re-run it before every deploy.

`npm run test` covers the purchase and download path on the client side -
`src/lib/downloads.ts`, `src/pages/PurchaseSuccessPage.tsx`, the catalog
invariants, and the contents of `public/templates/`. It does **not** cover the
three edge functions; nothing automated does. Section 10's smoke test is the
only check that `verify-download` still refuses a non-owner, so run it after any
change under `supabase/functions/`.

---

## 3. Environment variables

Three separate places, three separate sets. Mixing them up is the most common
cause of a broken deploy.

### 3a. Front-end - Vercel project settings, and local `.env`

These are bundled into the client and are public by design.

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon / publishable key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_live_…` in production) |

Set them for the Production environment in Vercel, then redeploy - Vite inlines
`VITE_*` at build time, so changing them does nothing until a new build runs.

Never put the service role key or a Stripe secret key behind a `VITE_` prefix.
Anything so prefixed ends up in the JavaScript bundle.

### 3b. Edge function secrets - Supabase

```bash
supabase secrets set SITE_URL=https://templix-peach.vercel.app
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are
injected into functions by the platform. Do not set them yourself.

**`SITE_URL` must be the exact deployed origin, with no trailing slash.** Both
`create-checkout` and `verify-download` build their CORS allowlist from it
(`ALLOWED_ORIGINS = { SITE_URL, http://localhost:5173 }`), and `create-checkout`
uses it as the fallback base for the Stripe `success_url` / `cancel_url`. Get it
wrong and the browser blocks the function call as a CORS failure, or the buyer
is redirected somewhere that does not exist after paying. Both functions fall
back to `https://templix-peach.vercel.app` if the secret is unset - convenient,
and exactly why a wrong custom domain fails silently rather than loudly.

### 3c. Script environment - your shell, at upload time only

```powershell
$env:SUPABASE_URL="https://<project-ref>.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="<service_role_key>"
```

`scripts/upload-premium-zips.mjs` exits immediately if either is missing. The
service role key bypasses RLS entirely - keep it out of the repo, out of shell
history where practical, and never in a `VITE_` variable.

---

## 4. Database - apply the RLS migration

`supabase/migrations/20260724120000_enable_rls_purchases_profiles.sql` is what
stops an authenticated user from inserting their own `purchases` row and
granting themselves any paid template for free. Until it is applied, the
download gate is decorative.

```bash
supabase link --project-ref <project-ref>
supabase db push
```

It also adds `unique (stripe_session_id)` on `purchases`, which is what makes
the webhook's `upsert … onConflict: 'stripe_session_id'` genuinely idempotent
rather than merely racy. Without the constraint, Stripe webhook retries can
create duplicate ownership rows.

Verify afterwards:

- Supabase → Database → Policies: `purchases` and `profiles` both show RLS
  enabled.
- `purchases` has exactly one policy, `read own purchases` (SELECT). It must
  have **no** INSERT policy - with RLS on and no policy for a command, that
  command is denied, and denial is the intended behaviour.
- `profiles` has `read own profile`, `insert own profile`, `update own profile`.
- Supabase → Advisors reports no "RLS disabled in public" warnings.

---

## 5. Storage - the private bucket

Supabase → Storage → New bucket:

- Name: **`templates`** (exact - `verify-download` hard-codes it)
- Public: **OFF**

Objects are keyed `<templateId>.zip` (`3.zip`, `57.zip`, …) at the bucket root.
`verify-download` signs `<id>.zip` with a 60-second expiry, and only after the
ownership check passes.

No storage policies are required for this path: the function uses the service
role key, which bypasses RLS. The bucket must simply stay private.

---

## 6. Populate the bucket - the step that unblocks paid downloads

This is the blocking one. Two commands, in this order.

```bash
# 1. Regenerate all 61 zips. Free ones go to public/templates/ (9 files, served
#    publicly). Paid ones go to dist-zips/ (52 files, gitignored, never served).
node scripts/generate-zips.mjs

# 2. Upload the 52 zips in dist-zips/ to the private bucket.
node scripts/upload-premium-zips.mjs
```

> ### Why paid zips are written outside `public/`
>
> Everything Vite finds under `public/` is copied verbatim into `dist/` and
> served with no auth in front of it. The generator used to write all 61 zips
> there, so a regenerate republished all 52 paid templates to anyone who guessed
> `/templates/57.zip` - no account, no payment. That was a real defect here and
> the fix is structural: paid zips now land in `dist-zips/`, which is gitignored
> and outside the web root, so no regenerate can reintroduce it. `src/lib/public-zips.test.ts`
> asserts that `public/templates/` holds exactly the nine free ids, so a stray
> paid zip fails `npm run test` and CI. **After any regenerate, `public/templates/`
> must still contain exactly 9 zips.**

How `upload-premium-zips.mjs` decides what is free: it parses
`src/data/templates.ts` and treats any entry with `isFree: true` or `price: 0`
as free. Free ids found in `dist-zips/` are skipped rather than uploaded - they
belong in the web root. The free ids are `2, 6, 14, 19, 23, 28, 45, 51, 59`.

A failed upload logs `FAIL <file>` and `continue`s. Read the summary line it
prints; if `Uploaded` is not 52, re-run it before deploying.

`--prune-public` is now only a cleanup for a tree that still has paid zips in
`public/templates/` from the old generator. It deletes the web-root copy, never
`dist-zips/`, and only after that file's upload succeeded. On a clean tree it
finds nothing.

Verify the web root afterwards:

```powershell
Get-ChildItem public\templates -Filter *.zip |
  ForEach-Object { [int][System.IO.Path]::GetFileNameWithoutExtension($_.Name) } |
  Sort-Object
```

Expected output, and nothing else: `2, 6, 14, 19, 23, 28, 45, 51, 59`.

Then verify the bucket in the Supabase dashboard: Storage → `templates` should
list 52 objects, one per paid id.

Every zip - free and paid - now contains `LICENSE.txt` with the Templix Standard
License, generated from the same wording as `src/pages/LicensePage.tsx`. If you
change the licence page, regenerate and re-upload so the file customers receive
does not contradict the page they agreed to.

The generated projects ship `vite ^6` and their README states Node.js 18 or
newer - that is the requirement placed on the **customer** who unzips one. It
says nothing about the Node version needed to operate this repository, which is
22 (see [Prerequisites](#1-prerequisites)).

---

## 7. Deploy the three edge functions

Redeploy all three after any change to `supabase/functions/`, and after the
first-time setup above.

```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy verify-download
```

`--no-verify-jwt` on `stripe-webhook` is required, not optional: Stripe calls
the endpoint with a Stripe signature, not a Supabase JWT, so JWT verification
would reject every event before the handler ran. The function is not
unauthenticated as a result - it verifies `stripe-signature` via
`constructEventAsync` and rejects anything that fails, and it is the only writer
of `purchases` rows.

The other two must keep JWT verification on. They both derive the caller's
identity from the verified token rather than the request body - that is what
stops a caller from buying as, or downloading as, somebody else.

---

## 8. Stripe webhook endpoint

Stripe dashboard → Developers → Webhooks → Add endpoint.

- URL: `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`
- Event: `checkout.session.completed` (the only event the function handles)
- Copy the generated signing secret into
  `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_…`, then redeploy the
  function so it picks the secret up.

If the signing secret does not match, every event fails with
`Webhook signature failed` and no purchase is ever recorded - buyers are charged
and receive nothing. Use the dashboard's "Send test webhook" and confirm a 200.

---

## 9. Front-end deploy (Vercel)

Pushing to the default branch deploys. Two things to know:

- `vercel.json` `rewrites` send every path to `/index.html`. That is required
  for a React Router SPA - without it, deep links 404 on refresh.
- The CSP in `vercel.json` hard-codes
  `connect-src 'self' https://ushrtscqtwlrxiwcguwl.supabase.co`. **If the
  Supabase project ref ever changes, this string must change too**, or the
  browser silently blocks every Supabase and edge-function request and the site
  appears broken with no server-side error.

If you move to a custom domain, update in the same change: `SITE_URL` (Supabase
secret), the Stripe webhook URL if the project ref changed, and `SITE_URL` in
`src/hooks/useSEO.ts` (used for canonicals and `og:url`).

---

## 10. Post-deploy smoke test

Run against the deployed site, in this order. Each step exercises a different
link in the chain.

Do the first full pass with Stripe in **test** mode (test secret key, test
webhook endpoint and signing secret) so step 4 can use a test card. Then switch
the secrets to live keys, redeploy the functions, and repeat at least steps 1-3
and 7 - the ones that need no real charge.

1. **Free download.** Open a free template (id 2, 6, 14, 19, 23, 28, 45, 51, or
   59) and download it. Serves straight from `/templates/<id>.zip`. Unzip it and
   confirm `LICENSE.txt` is present.
2. **Paid zip is NOT public.** Request `/templates/57.zip` directly in the
   browser. It must 404. If it downloads, step 6 was skipped - stop and prune.
3. **Signed-out paid download.** Sign out, try to download a paid template. The
   `verify-download` call must fail (401) rather than returning a URL.
4. **Checkout.** Sign in, buy a cheap template. In test mode use card
   `4242 4242 4242 4242`. Confirm the redirect lands on
   `/purchase-success?session_id=…`.
5. **Fulfilment.** Stripe dashboard → the webhook event shows 200. Supabase →
   Table editor → `purchases` has exactly one new row with the right
   `user_id`, `template_id`, and `stripe_session_id`.
6. **Owned download.** Download the template you just bought. It must succeed
   and the URL must be a signed Supabase storage URL, not `/templates/<id>.zip`.
7. **Ownership isolation.** From a second account, attempt the same paid
   download. Must be 403 *"You do not own this template"*.

If step 6 returns *"Download unavailable. The template file has not been
uploaded…"*, the bucket is missing that object - go back to section 6.

---

## 11. Routine redeploys

| You changed | Do this |
|---|---|
| Front-end code only | `npm run lint`, `npm run test`, `npm run build`. Then push. Vercel builds. |
| `src/data/templates.ts` price or title | `npm run check:prices`, update the `CATALOG` in `create-checkout`, redeploy that function, `npm run test`, push. |
| A template preview component | `node scripts/generate-zips.mjs`, then `node scripts/upload-premium-zips.mjs`, then `npm run test`, then push. |
| `scripts/generate-zips.mjs` (incl. licence text) | Same as above - the zips are build output, not source. |
| An edge function | Redeploy that function. `stripe-webhook` keeps `--no-verify-jwt`. |
| A migration | `supabase db push`. |
| `SITE_URL` / custom domain | Supabase secret, Stripe webhook URL, `vercel.json` CSP, `src/hooks/useSEO.ts`. |

---

## Unverified

Stated plainly so nobody mistakes this document for a report of the live system.
Nothing below has been checked against the running project.

- **The private `templates` bucket's contents are unconfirmed.** The Supabase
  project was paused when this was written, so whether all 52 paid zips are
  present - or whether the bucket exists at all - is unknown. Until someone
  confirms it, assume paid downloads are broken.
- **Whether the RLS migration has been applied to the live database is
  unconfirmed.** The file exists in the repo; that says nothing about the hosted
  schema.
- **Whether the deployed edge functions match the code in this repository is
  unconfirmed.** The current sources include hardening changes; if the functions
  were last deployed before those landed, the live behaviour differs from what
  you read here.
- **Whether the Stripe webhook endpoint is registered and its signing secret
  current is unconfirmed.**
- **The whole purchase flow has not been exercised end to end against live
  Stripe.** The smoke test in section 10 is the procedure for doing so, not a
  record of it having been done.
- **Any zips already in the bucket predate the `LICENSE.txt` change** and will
  contain the older bare `LICENSE` file instead. Re-upload after regenerating.
