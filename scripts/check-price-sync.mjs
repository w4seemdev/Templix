/**
 * check-price-sync.mjs
 * Guards the one place where a mistake silently takes the wrong amount of money:
 * the CATALOG in supabase/functions/create-checkout/index.ts is the sole source
 * of truth for what Stripe actually charges, while src/data/templates.ts is what
 * the buyer was shown (cards, detail page, Product JSON-LD). If they drift, the
 * customer is charged a price they never agreed to, or the receipt names a
 * template that no longer exists under that name.
 *
 * src/data/templates.ts is AUTHORITATIVE. This script never edits anything — it
 * just fails loudly on drift.
 *
 * Fails (exit 1) when, for any template:
 *   - price * 100 !== CATALOG priceCents
 *   - title !== CATALOG title
 *   - a paid template (isFree:false, price>0) is missing from CATALOG
 *   - a free template is present in CATALOG (free templates are not purchasable)
 *
 * Usage:
 *   npm run check:prices
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATES_FILE = join(ROOT, 'src', 'data', 'templates.ts');
const CATALOG_FILE = join(ROOT, 'supabase', 'functions', 'create-checkout', 'index.ts');

const fail = (message) => {
  console.error(`check:prices — ${message}`);
  process.exit(1);
};

/**
 * Slice a source file into one chunk per object literal, anchored on `anchorRe`.
 * Fields are then read from within a single chunk, so a lazy match can never
 * bleed a value in from the neighbouring entry.
 */
const chunkBy = (src, anchorRe) => {
  const starts = [];
  let match;
  while ((match = anchorRe.exec(src)) !== null) {
    starts.push({ key: match[1], at: match.index });
  }
  return starts.map((start, i) => ({
    key: start.key,
    body: src.slice(start.at, i + 1 < starts.length ? starts[i + 1].at : src.length),
  }));
};

/** Parsed rows from src/data/templates.ts — the advertised price and title. */
const readTemplates = () => {
  const src = readFileSync(TEMPLATES_FILE, 'utf8');
  // Scope to the `templates` array — the `categories` list further down the file
  // also has `id:` keys and must not be mistaken for a template.
  const array = /export const templates[^=]*=\s*\[([\s\S]*?)\n\];/.exec(src);
  if (!array) {
    fail(`could not locate the exported \`templates\` array in ${TEMPLATES_FILE} — update this script`);
  }

  const chunks = chunkBy(array[1], /\{\s*id:\s*'([^']+)',/g);
  if (chunks.length === 0) {
    fail(`parsed 0 templates from ${TEMPLATES_FILE} — the file shape changed, update this script`);
  }

  const rows = new Map();
  for (const { key, body } of chunks) {
    const title = /\btitle:\s*'((?:[^'\\]|\\.)*)'/.exec(body);
    const price = /\bprice:\s*([\d.]+)\s*,/.exec(body);
    const isFree = /\bisFree:\s*(true|false)\s*,/.exec(body);
    if (!title || !price || !isFree) {
      fail(`template id ${key} is missing a title/price/isFree field — update this script`);
    }
    if (rows.has(key)) {
      fail(`template id ${key} is declared twice in ${TEMPLATES_FILE}`);
    }
    rows.set(key, {
      id: key,
      title: title[1].replace(/\\'/g, "'"),
      price: Number(price[1]),
      isFree: isFree[1] === 'true',
    });
  }
  return rows;
};

/** Parsed CATALOG from the create-checkout edge function — what Stripe charges. */
const readCatalog = () => {
  const src = readFileSync(CATALOG_FILE, 'utf8');
  const block = /const CATALOG[^=]*=\s*\{([\s\S]*?)\n\};/.exec(src);
  if (!block) {
    fail(`could not locate the CATALOG object in ${CATALOG_FILE} — update this script`);
  }

  const chunks = chunkBy(block[1], /'([^']+)':\s*\{/g);
  if (chunks.length === 0) {
    fail(`parsed 0 entries from the CATALOG in ${CATALOG_FILE} — update this script`);
  }

  const rows = new Map();
  for (const { key, body } of chunks) {
    const title = /\btitle:\s*'((?:[^'\\]|\\.)*)'/.exec(body);
    const priceCents = /\bpriceCents:\s*(\d+)/.exec(body);
    if (!title || !priceCents) {
      fail(`CATALOG entry '${key}' is missing a title/priceCents field — update this script`);
    }
    if (rows.has(key)) {
      fail(`CATALOG entry '${key}' is declared twice in ${CATALOG_FILE}`);
    }
    rows.set(key, { id: key, title: title[1].replace(/\\'/g, "'"), priceCents: Number(priceCents[1]) });
  }
  return rows;
};

const templates = readTemplates();
const catalog = readCatalog();

const paid = [...templates.values()].filter((t) => !t.isFree && t.price > 0);
const free = [...templates.values()].filter((t) => t.isFree || t.price === 0);
const problems = [];

for (const template of paid) {
  const entry = catalog.get(template.id);
  if (!entry) {
    problems.push(
      `MISSING  id ${template.id}  "${template.title}" ($${template.price}) is paid but absent from CATALOG — checkout will reject it as unpurchasable`,
    );
    continue;
  }

  const expectedCents = Math.round(template.price * 100);
  if (entry.priceCents !== expectedCents) {
    const delta = entry.priceCents - expectedCents;
    const direction = delta > 0 ? 'OVERCHARGES' : 'undercharges';
    problems.push(
      `PRICE    id ${template.id}  "${template.title}"\n` +
        `           shown  $${template.price} (${expectedCents} cents, templates.ts)\n` +
        `           charged ${entry.priceCents} cents (CATALOG) — ${direction} by $${Math.abs(delta) / 100}`,
    );
  }

  if (entry.title !== template.title) {
    problems.push(
      `TITLE    id ${template.id}  Stripe checkout + receipt would show the wrong name\n` +
        `           templates.ts "${template.title}"\n` +
        `           CATALOG      "${entry.title}"`,
    );
  }
}

for (const template of free) {
  if (catalog.has(template.id)) {
    problems.push(
      `FREE     id ${template.id}  "${template.title}" is free but present in CATALOG — it must not be purchasable`,
    );
  }
}

for (const id of catalog.keys()) {
  if (!templates.has(id)) {
    problems.push(`UNKNOWN  id ${id}  present in CATALOG but no such template exists in templates.ts`);
  }
}

if (problems.length > 0) {
  console.error(`check:prices FAILED — ${problems.length} mismatch(es) between templates.ts and the create-checkout CATALOG:\n`);
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  console.error('\ntemplates.ts is authoritative: fix the CATALOG in supabase/functions/create-checkout/index.ts.');
  process.exit(1);
}

console.log(
  `check:prices OK — ${paid.length} paid templates match on price and title, ${free.length} free ids correctly absent from CATALOG.`,
);
