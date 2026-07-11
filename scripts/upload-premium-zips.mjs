/**
 * upload-premium-zips.mjs
 * One-time (re-runnable) migration: upload every PAID template zip from
 * public/templates/<id>.zip into the PRIVATE Supabase Storage bucket 'templates',
 * so premium downloads are gated by the verify-download edge function instead of
 * being world-readable in the web root.
 *
 * Free templates stay in public/templates/ and are intentionally NOT uploaded.
 *
 * Usage (PowerShell):
 *   $env:SUPABASE_URL="https://ushrtscqtwlrxiwcguwl.supabase.co"
 *   $env:SUPABASE_SERVICE_ROLE_KEY="<service_role_key from Supabase → Project Settings → API>"
 *   node scripts/upload-premium-zips.mjs
 *
 * After it succeeds, delete the premium zips from public/templates/ (keep the
 * free ones) so they are never deployed publicly:
 *   node scripts/upload-premium-zips.mjs --prune-public
 */
import { readFileSync, readdirSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ZIPS = join(ROOT, 'public', 'templates');

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
const files = readdirSync(ZIPS).filter((f) => f.endsWith('.zip'));
let up = 0, skip = 0, pruned = 0;

for (const f of files) {
  const id = f.replace('.zip', '');
  if (freeIds.has(id)) { skip++; continue; } // free → stays public
  const buf = readFileSync(join(ZIPS, f));
  const { error } = await supabase.storage.from('templates').upload(f, buf, {
    contentType: 'application/zip',
    upsert: true,
  });
  if (error) { console.error(`FAIL ${f}: ${error.message}`); continue; }
  up++;
  if (prune && existsSync(join(ZIPS, f))) { unlinkSync(join(ZIPS, f)); pruned++; }
}
console.log(`Uploaded ${up} premium zips to private bucket; ${skip} free left public${prune ? `; pruned ${pruned} from web root` : ''}.`);
