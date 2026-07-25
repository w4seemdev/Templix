/// <reference types="node" />
/**
 * Covers scripts/check-price-sync.mjs - the guard that stands between
 * src/data/templates.ts (what the buyer is shown) and the CATALOG in the
 * create-checkout edge function (what Stripe actually charges). Before it
 * existed 34 of 52 paid templates were mismatched, 21 of them overcharging, so
 * "the guard still catches X" is a claim worth a test per failure class.
 *
 * The real script is copied - never edited - into a throwaway repo shaped like
 * this one and run as a child process, so the fixtures exercise the shipped
 * parser end to end without the real templates.ts or edge function being
 * touched. It lives under src/ because vitest.config.ts only collects
 * `src/**` and that file belongs to another owner.
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

// Vitest runs with the project root as cwd. `import.meta.url` is not usable
// here: under the jsdom environment it is an http URL, not a file one.
const REPO_ROOT = process.cwd();
const GUARD = join(REPO_ROOT, 'scripts', 'check-price-sync.mjs');

interface TemplateRow {
  id: string;
  title: string;
  price: number;
  isFree: boolean;
}

interface CatalogRow {
  id: string;
  title: string;
  priceCents: number;
}

/** templates.ts writes apostrophes escaped inside single-quoted titles. */
const esc = (value: string): string => value.replace(/'/g, "\\'");

const templatesSource = (rows: readonly TemplateRow[]): string =>
  `import type { Template } from '../types';\n\nexport const templates: readonly Template[] = [\n${rows
    .map(
      (row) =>
        `  {\n    id: '${row.id}',\n    title: '${esc(row.title)}',\n` +
        `    price: ${row.price},\n    isFree: ${row.isFree},\n  },`,
    )
    .join('\n')}\n];\n`;

const catalogSource = (rows: readonly CatalogRow[]): string =>
  `const CATALOG: Record<string, { title: string; priceCents: number }> = {\n${rows
    .map((row) => `  '${row.id}': { title: '${esc(row.title)}', priceCents: ${row.priceCents} },`)
    .join('\n')}\n};\n`;

const workspaces: string[] = [];

/** Runs the real guard against a fixture repo and returns its exit code + output. */
const runGuard = (templates: readonly TemplateRow[], catalog: readonly CatalogRow[]) => {
  const root = mkdtempSync(join(tmpdir(), 'templix-price-guard-'));
  workspaces.push(root);

  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, 'src', 'data'), { recursive: true });
  mkdirSync(join(root, 'supabase', 'functions', 'create-checkout'), { recursive: true });

  const script = join(root, 'scripts', 'check-price-sync.mjs');
  copyFileSync(GUARD, script);
  writeFileSync(join(root, 'src', 'data', 'templates.ts'), templatesSource(templates));
  writeFileSync(
    join(root, 'supabase', 'functions', 'create-checkout', 'index.ts'),
    catalogSource(catalog),
  );

  return spawnSync(process.execPath, [script], { encoding: 'utf8' });
};

/** Two paid templates (one with an apostrophe) and one free - all consistent. */
const TEMPLATES: readonly TemplateRow[] = [
  { id: '1', title: 'Luminary - SaaS', price: 59, isFree: false },
  { id: '2', title: 'Folio - Portfolio', price: 0, isFree: true },
  { id: '3', title: "Chef's Table - Restaurant", price: 69, isFree: false },
];

const CATALOG: readonly CatalogRow[] = [
  { id: '1', title: 'Luminary - SaaS', priceCents: 5900 },
  { id: '3', title: "Chef's Table - Restaurant", priceCents: 6900 },
];

afterAll(() => {
  for (const workspace of workspaces) {
    rmSync(workspace, { recursive: true, force: true });
  }
});

describe('check:prices', () => {
  it('exits 0 for the templates.ts and CATALOG committed in this repo', () => {
    const result = spawnSync(process.execPath, [GUARD], { encoding: 'utf8' });

    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('check:prices OK');
  });

  it('exits 0 when prices and titles agree and free ids are absent from CATALOG', () => {
    const result = runGuard(TEMPLATES, CATALOG);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('2 paid templates match on price and title');
  });

  it('fails with the id and both amounts when CATALOG overcharges', () => {
    const result = runGuard(TEMPLATES, [
      { id: '1', title: 'Luminary - SaaS', priceCents: 6900 },
      ...CATALOG.slice(1),
    ]);

    expect(result.status).toBe(1);
    expect(result.stdout).not.toContain('check:prices OK');
    expect(result.stderr).toContain('PRICE');
    expect(result.stderr).toContain('id 1');
    expect(result.stderr).toContain('5900 cents');
    expect(result.stderr).toContain('6900 cents');
    expect(result.stderr).toContain('OVERCHARGES by $10');
  });

  it('fails when CATALOG undercharges', () => {
    const result = runGuard(TEMPLATES, [
      { id: '1', title: 'Luminary - SaaS', priceCents: 900 },
      ...CATALOG.slice(1),
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('id 1');
    expect(result.stderr).toContain('undercharges by $50');
  });

  it('fails with both names when the CATALOG title has drifted', () => {
    const result = runGuard(TEMPLATES, [
      CATALOG[0],
      { id: '3', title: 'Chez Table - Restaurant', priceCents: 6900 },
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('TITLE');
    expect(result.stderr).toContain('id 3');
    expect(result.stderr).toContain("Chef's Table - Restaurant");
    expect(result.stderr).toContain('Chez Table - Restaurant');
  });

  it('fails when a paid template is missing from CATALOG', () => {
    const result = runGuard(TEMPLATES, CATALOG.slice(0, 1));

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('MISSING');
    expect(result.stderr).toContain('id 3');
    expect(result.stderr).toContain('absent from CATALOG');
  });

  it('fails when a free template is purchasable through CATALOG', () => {
    const result = runGuard(TEMPLATES, [
      ...CATALOG,
      { id: '2', title: 'Folio - Portfolio', priceCents: 4900 },
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('FREE');
    expect(result.stderr).toContain('id 2');
    expect(result.stderr).toContain('must not be purchasable');
  });

  it('fails when CATALOG sells an id that no longer exists in templates.ts', () => {
    const result = runGuard(TEMPLATES, [
      ...CATALOG,
      { id: '99', title: 'Retired - Template', priceCents: 4900 },
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('UNKNOWN');
    expect(result.stderr).toContain('id 99');
  });

  it('reports every mismatch in one run instead of stopping at the first', () => {
    const result = runGuard(TEMPLATES, [
      { id: '1', title: 'Luminary - SaaS', priceCents: 100 },
      { id: '3', title: 'Wrong Name', priceCents: 6900 },
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('2 mismatch(es)');
  });

  it('fails when the same template id is declared twice', () => {
    const result = runGuard([...TEMPLATES, TEMPLATES[0]], CATALOG);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('declared twice');
  });

  it('fails loudly instead of passing when templates.ts no longer parses', () => {
    const root = mkdtempSync(join(tmpdir(), 'templix-price-guard-'));
    workspaces.push(root);
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'src', 'data'), { recursive: true });
    mkdirSync(join(root, 'supabase', 'functions', 'create-checkout'), { recursive: true });
    const script = join(root, 'scripts', 'check-price-sync.mjs');
    copyFileSync(GUARD, script);
    writeFileSync(join(root, 'src', 'data', 'templates.ts'), 'export const nothing = [];\n');
    writeFileSync(
      join(root, 'supabase', 'functions', 'create-checkout', 'index.ts'),
      catalogSource(CATALOG),
    );

    const result = spawnSync(process.execPath, [script], { encoding: 'utf8' });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('could not locate');
  });
});
