/**
 * upload-premium-zips.mjs
 * Re-runnable: upload every PAID template zip from dist-zips/<id>.zip into the
 * PRIVATE Supabase Storage bucket 'templates', so premium downloads are gated by
 * the verify-download edge function instead of being world-readable in the web
 * root. Run `node scripts/generate-zips.mjs` first — it writes dist-zips/.
 *
 * Free templates are written to public/templates/ by the generator and are
 * intentionally NOT uploaded.
 *
 * Usage (PowerShell):
 *   $env:SUPABASE_URL="https://ushrtscqtwlrxiwcguwl.supabase.co"
 *   $env:SUPABASE_SERVICE_ROLE_KEY="<service_role_key from Supabase → Project Settings → API>"
 *   node scripts/upload-premium-zips.mjs
 *
 * `--prune-public` additionally deletes any paid zip left over in
 * public/templates/ by an older revision of the generator, which used to write
 * all 61 there. Current generations put nothing paid in the web root, so on a
 * clean tree the flag finds nothing to do.
 */
import { readFileSync, readdirSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ZIPS = join(ROOT, 'dist-zips');
const PUBLIC_ZIPS = join(ROOT, 'public', 'templates');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first.');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Derive free ids from the catalog so this stays in sync with src/data/templates.ts.
const catalog = readFileSync(join(ROOT, 'src', 'data', 'templates.ts'), 'utf8');
const freeIds = new Set();
for (const block of catalog.split(/\n\s*\{/)) {
  const id = block.match(/id:\s*'([^']+)'/)?.[1];
  const isFree = /isFree:\s*true/.test(block) || /price:\s*0\b/.test(block);
  if (id && isFree) freeIds.add(id);
}

const prune = process.argv.includes('--prune-public');
if (!existsSync(ZIPS)) {
  console.error(`No dist-zips/ directory. Run "node scripts/generate-zips.mjs" first.`);
  process.exit(1);
}
const files = readdirSync(ZIPS).filter((f) => f.endsWith('.zip'));
let up = 0, skip = 0, pruned = 0;

for (const f of files) {
  const id = f.replace('.zip', '');
  if (freeIds.has(id)) { skip++; continue; } // free → belongs in public/, not the bucket
  const buf = readFileSync(join(ZIPS, f));
  const { error } = await supabase.storage.from('templates').upload(f, buf, {
    contentType: 'application/zip',
    upsert: true,
  });
  if (error) { console.error(`FAIL ${f}: ${error.message}`); continue; }
  up++;
  // Prune the WEB ROOT copy, never the dist-zips source, and only after the
  // upload for that file succeeded.
  if (prune && existsSync(join(PUBLIC_ZIPS, f))) { unlinkSync(join(PUBLIC_ZIPS, f)); pruned++; }
}
console.log(`Uploaded ${up} premium zips to private bucket; skipped ${skip} free${prune ? `; pruned ${pruned} stale paid zips from web root` : ''}.`);
