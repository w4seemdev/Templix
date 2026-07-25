# Contributing to Templix

Templix is a commercial marketplace. Real money moves through it, so the bar for a
change is higher than "it renders". Everything below is enforced by CI
(`.github/workflows/ci.yml`) except the judgement calls in
[Non-negotiables](#non-negotiables), which are enforced by review.

## Prerequisites

- **Node 22** (Node 20.19+ also satisfies every dependency, but CI runs 22 — match it to avoid surprises)
- **npm** (the repo ships a `package-lock.json`; do not switch package managers)

## Running the app

```bash
git clone https://github.com/w4seemdev/Templix.git
cd Templix
npm install

cp .env.example .env   # then fill in the values below

npm run dev            # http://localhost:5173
```

The storefront, catalog, and all 61 template previews render without any backend
configuration. Auth, checkout, and gated downloads need the Supabase and Stripe
values below.

## Environment variables

Copy `.env.example` to `.env` and fill in your own project's values. `.env` is
gitignored; `.env.example` is committed and must only ever contain placeholders.

| Variable | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API (the anon/publishable key, never the service-role key) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Developers → API keys (`pk_test_...` while developing) |

Anything prefixed `VITE_` is compiled into the client bundle and is therefore
**public**. Never put a secret behind that prefix.

### Edge function secrets — not in this repo, not in `.env`

`create-checkout`, `stripe-webhook`, and `verify-download` run on Supabase and
read their secrets from the platform, set once with the CLI:

```bash
supabase secrets set SITE_URL=https://your-site.example
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are injected
by the platform automatically. `SITE_URL` must match the deployed origin exactly,
with no trailing slash — the functions allow only it (plus `http://localhost:5173`)
for CORS and for the post-payment redirect.

## Quality gates

CI runs these five as separate steps so a failure names itself. Run them locally
before opening a PR — in this order, cheapest first:

| Gate | Command | What it protects |
|---|---|---|
| Lint | `npm run lint` | ESLint across the repo, including the React hooks rules |
| Typecheck | `npx tsc -b` | TypeScript strict mode over `src` and the config files |
| Tests | `npm run test` | Vitest + jsdom + Testing Library |
| Price sync | `npm run check:prices` | Advertised price === charged price (see below) |
| Build | `npm run build` | `tsc -b` then the real production Vite build |

Extra commands that are not gates:

```bash
npm run test:watch      # vitest in watch mode while developing
npm run test:coverage   # writes ./coverage (CI uploads this as an artifact)
```

**Coverage can fail your build.** `vitest.config.ts` sets thresholds of
**statements 53 / branches 57 / functions 46 / lines 55**, and the CI "Tests"
step runs `npm run test:coverage`, so falling under any one of them turns `main`
red exactly like a failing test.

Those numbers are a ratchet, not a target: each sits just under what the suite
actually reaches today (53.30 / 57.06 / 46.68 / 55.42), so deleting or gutting a
test fails loudly instead of quietly lowering the bar. The headroom is thin —
branches has about 0.06pp of slack, which is a single uncovered `if`. New code
that is not covered must arrive with tests, or the build goes red. Raise the
thresholds as coverage grows, toward the 80% house standard; never lower one to
make a build pass.

`supabase/functions/**` is outside both the `include` globs, so the three edge
functions have no automated coverage at all — the ownership check in
`verify-download` and the signature check in `stripe-webhook` are verified only
by the manual smoke test in [docs/DEPLOYMENT.md](DEPLOYMENT.md#10-post-deploy-smoke-test).
Treat a change there as untested until you have run it.

## Non-negotiables

These are not style preferences. Breaking one of them either costs a customer
money or costs the project its credibility.

### 1. Honesty

No fake statistics, fake testimonials, invented review counts, made-up customer or
download numbers, fictional team members, or claims about capabilities the product
does not actually ship. This codebase has had such content removed more than once;
do not reintroduce it in any form, including in marketing copy, meta descriptions,
or JSON-LD.

If a number appears in user-facing copy, you must be able to point at where it
comes from. "61 templates" is true and countable. "Trusted by 10,000 developers"
is not, and does not go in.

### 2. `src/data/templates.ts` is the source of truth for price and title

The buyer sees what is in `src/data/templates.ts`. Stripe charges what is in the
`CATALOG` in `supabase/functions/create-checkout/index.ts`. Nothing in the type
system links them, and they have already drifted apart once — 34 of the 52 paid
templates disagreed, 21 of them overcharging the customer against the advertised
price.

So: change the price or title in `src/data/templates.ts` **first**, mirror it into
the edge-function `CATALOG`, then run `npm run check:prices` until it is green.
The script is read-only; it never edits either file for you.

### 3. Exactly 9 templates are free, and only those are publicly served

The free ids are **2, 6, 14, 19, 23, 28, 45, 51, 59**. Their zips live in
`public/templates/` and are downloadable by anyone.

The other 52 are paid. Their zips live in a **private** Supabase storage bucket and
are released only by `verify-download`, which authenticates the caller, checks
ownership, and returns a signed URL that expires in 60 seconds. A paid zip under
`public/` is a product giveaway — never add one, and never widen the free list
without also updating `isFree` in `src/data/templates.ts` and the `CATALOG`.

`scripts/generate-zips.mjs` enforces the split at the source: free zips go to
`public/templates/`, paid zips to the gitignored `dist-zips/`, which is outside
the web root. `src/lib/public-zips.test.ts` then asserts that
`public/templates/` holds exactly the free ids, so a stray paid zip fails CI
rather than shipping.

### 4. No secrets in the repo

No keys, tokens, service-role credentials, `.pem`/`.key` files, or real `.env`
contents, in source or in tests or in fixtures. `.env.example` carries
placeholders only. If something leaks, rotate it before anything else.

### 5. Obsidian Gallery, via tokens only

The design language is a premium dark editorial look driven by CSS custom
properties defined in `src/index.css` (`--color-canvas`, `--color-surface-*`,
`--color-accent`, `--color-border-strong`, `--color-danger*`, ...), consumed
through Tailwind utility classes. Never hardcode a hex colour in app code — a
literal breaks theming and drifts from the rest of the catalog.

## Pull requests

Fill in `.github/pull_request_template.md`. Keep diffs surgical: touch what the
change requires and leave adjacent working code alone. CI must be green before
review.
