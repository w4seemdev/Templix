/// <reference types="node" />
/**
 * The web root is a product boundary, so it gets a test.
 *
 * Everything in public/ is copied verbatim into dist/ and served by Vercel with
 * no auth in front of it. Nine templates are free and belong there; the other 52
 * are the inventory, and a single stray `<paid id>.zip` under public/templates/
 * hands one of them to anyone who guesses the URL. That has happened once
 * already - 52 paid zips were publicly served until commit 97542c6 deleted them.
 *
 * Nothing else in the pipeline notices: lint, tsc, the price guard and the build
 * all pass with a paid zip sitting in the web root. This is the check that
 * doesn't, which is why it reads the filesystem rather than the catalog alone.
 *
 * Lives under src/ because vitest.config.ts only collects `src/**`.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { templates } from '../data/templates';

// Vitest runs with the project root as cwd. `import.meta.url` is not usable
// here: under the jsdom environment it is an http URL, not a file one.
const PUBLIC_ZIPS = join(process.cwd(), 'public', 'templates');

const byId = (a: string, b: string) => Number(a) - Number(b);

const zipIdsOnDisk = (): string[] =>
  readdirSync(PUBLIC_ZIPS)
    .filter((name) => name.endsWith('.zip'))
    .map((name) => name.slice(0, -'.zip'.length))
    .sort(byId);

describe('public/templates (the publicly served web root)', () => {
  it('contains a zip for every free template and for no paid one', () => {
    const free = templates
      .filter((t) => t.isFree)
      .map((t) => t.id)
      .sort(byId);

    // toEqual both ways round on purpose: an extra id is a paid template being
    // given away, a missing id is a free download that 404s.
    expect(zipIdsOnDisk()).toEqual(free);
  });

  it('names every paid template as absent from the web root', () => {
    const onDisk = new Set(zipIdsOnDisk());
    const leaked = templates.filter((t) => !t.isFree && onDisk.has(t.id)).map((t) => t.id);

    expect(leaked).toEqual([]);
  });
});
