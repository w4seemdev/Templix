## What changed

<!-- One or two sentences. Link the issue if there is one. -->

## Why

<!-- The problem this solves, or the regression it prevents. -->

## Checklist

- [ ] All five gates pass locally: `npm run lint`, `npx tsc -b`, `npm run test`, `npm run check:prices`, `npm run build` (CI runs the same five).
- [ ] Tests added or updated for the behaviour this PR changes. If none were added, the reason is stated above.
- [ ] **No unverifiable claims.** No invented stats, testimonials, review counts, customer or download numbers, or capabilities the product does not actually ship. Every number in user-facing copy traces to something real.
- [ ] **No paid template zips under `public/`.** Only the 9 free ids (2, 6, 14, 19, 23, 28, 45, 51, 59) may be served publicly; the other 52 stay in the private Supabase bucket behind `verify-download`.
- [ ] If a price or title moved, `src/data/templates.ts` and the `CATALOG` in `supabase/functions/create-checkout/index.ts` were changed **together** — `npm run check:prices` proves it.
- [ ] No secrets committed: no keys, tokens, service-role credentials, or real `.env` contents. `.env.example` holds placeholders only.
- [ ] No hardcoded hex colours. New UI consumes the Obsidian Gallery CSS custom properties (`--color-canvas`, `--color-surface-*`, `--color-accent`, ...) through Tailwind utilities.
