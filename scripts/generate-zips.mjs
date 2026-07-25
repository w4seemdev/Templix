/**
 * generate-zips.mjs
 * Generates downloadable zip files for all 61 Templix templates.
 *
 * Each zip is a complete, buildable Vite + React 19 + TypeScript project whose
 * src/App.tsx IS the template's preview component. The previews are fully
 * self-contained (they import only from 'react' and style themselves with inline
 * style objects), so `npm install && npm run build` succeeds with no extra deps.
 *
 * Output: the 9 FREE templates -> public/templates/<id>.zip (served by Vercel)
 *         the 52 PAID templates -> dist-zips/<id>.zip (gitignored build output,
 *         uploaded to the private Supabase bucket by upload-premium-zips.mjs)
 * Run:    node scripts/generate-zips.mjs
 *
 * The split is the point: everything under public/ is copied verbatim into
 * dist/ and served to anyone who guesses the URL. A paid zip written there is
 * the entire product given away for free, which has already happened once in
 * this repository. Paid zips therefore never touch the web root at all.
 */

import AdmZip from 'adm-zip';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const PREVIEWS  = join(ROOT, 'src', 'pages', 'previews');
// Free zips are public by design. Paid zips are build output, never committed
// and never served - see .gitignore.
const PUBLIC_DIR  = join(ROOT, 'public', 'templates');
const PRIVATE_DIR = join(ROOT, 'dist-zips');

for (const dir of [PUBLIC_DIR, PRIVATE_DIR]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ─── Route slug → preview filename mapping ───────────────────────────────────
const SLUG_TO_FILE = {
  'luminary':         'LuminarySaasPreview.tsx',
  'folio':            'FolioPortfolioPreview.tsx',
  'shopdrop':         'ShopDropEcommercePreview.tsx',
  'bloom':            'BloomBlogPreview.tsx',
  'agency-pro':       'AgencyProPreview.tsx',
  'launchpad':        'LaunchPadPreview.tsx',
  'dashify':          'DashifyPreview.tsx',
  'saveur':           'SaveurRestaurantPreview.tsx',
  'nexus':            'NexusCorporatePreview.tsx',
  'crm':              'CRMDashboardPreview.tsx',
  'fashion':          'FashionStorePreview.tsx',
  'app-landing':      'AppLandingPreview.tsx',
  'coffee':           'CoffeeShopPreview.tsx',
  'techblog':         'TechBlogPreview.tsx',
  'real-estate':      'RealEstatePreview.tsx',
  'fitness':          'FitnessPreview.tsx',
  'podcast':          'PodcastPreview.tsx',
  'event':            'EventPreview.tsx',
  'wedding':          'WeddingPreview.tsx',
  'music':            'MusicPreview.tsx',
  'photography':      'PhotographyPreview.tsx',
  'hotel':            'HotelPreview.tsx',
  'travel-blog':      'TravelBlogPreview.tsx',
  'beauty-spa':       'BeautySpaPreview.tsx',
  'web3':             'Web3Preview.tsx',
  'legal':            'LegalPreview.tsx',
  'architecture':     'ArchitecturePreview.tsx',
  'construction':     'ConstructionPreview.tsx',
  'job-board':        'JobBoardPreview.tsx',
  'finance-dashboard':'FinanceDashboardPreview.tsx',
  'healthcare':       'HealthcarePreview.tsx',
  'email-marketing':  'EmailMarketingPreview.tsx',
  'vault-finance':    'VaultFinancePreview.tsx',
  'creative-studio':  'CreativeStudioPreview.tsx',
  'bookstore':        'BookstorePreview.tsx',
  'florist':          'FloristPreview.tsx',
  'newsletter':       'NewsletterPreview.tsx',
  'productivity':     'ProductivityPreview.tsx',
  'startkit':         'StartKitStartupPreview.tsx',
  'medcare':          'MedCareHealthcarePreview.tsx',
  'coursify':         'CoursifyEducationPreview.tsx',
  'estatly':          'EstatlyRealEstatePreview.tsx',
  'pulse-analytics':  'PulseAnalyticsPreview.tsx',
  'atlas-maps':       'AtlasMapSaasPreview.tsx',
  'forge-devtools':   'ForgeDevToolsPreview.tsx',
  'verde-eco':        'VerdeEcoPreview.tsx',
  'swift-delivery':   'SwiftDeliveryPreview.tsx',
  'ironpeak':         'IronPeakGymPreview.tsx',
  'launchconf':       'LaunchConfEventPreview.tsx',
  'aria-photography': 'AriaPhotographyPreview.tsx',
  'nomad-jobs':       'NomadRemoteJobsPreview.tsx',
  'verse-lit':        'VersePoetryPreview.tsx',
  'roam-rentals':     'RoamRentalsPreview.tsx',
  'pixel-games':      'PixelGameStudioPreview.tsx',
  'scout-talent':     'ScoutTalentPreview.tsx',
  'hope-nonprofit':   'HopeNonprofitPreview.tsx',
  'neuron-ai':        'NeuronAiPreview.tsx',
  'velocity-auto':    'VelocityAutoPreview.tsx',
  'paws-petcare':     'PawsPetCarePreview.tsx',
  'haven-interior':   'HavenInteriorPreview.tsx',
  'daily-news':       'DailyNewsPreview.tsx',
};

// ─── Template metadata (id, title, demoUrl, description) ─────────────────────
// SOURCE OF TRUTH: src/data/templates.ts. Title, description and demo slug are
// parsed out of that file at run time rather than mirrored here, so renaming a
// template in the catalog can never leave the shipped zip selling a
// differently-named product. templates.ts is TypeScript and this is a plain
// .mjs script, so it cannot be imported - the object literal is parsed instead.
// The parser is deliberately strict and throws unless it recovers exactly
// EXPECTED_TEMPLATE_COUNT entries, which makes silent drift impossible.
// Every template's TRUE stack is React 19 + TypeScript + Vite (see TRUE_STACK
// below); techStack/pages are deliberately NOT read from the catalog because
// those earlier per-template stacks (Next.js/Tailwind/Stripe/…) and multi-page
// lists were inaccurate. Each template is ONE responsive single-page site made
// of sections, not a multi-route app.
const DATA_FILE = join(ROOT, 'src', 'data', 'templates.ts');
const EXPECTED_TEMPLATE_COUNT = 61;
// 2, 6, 14, 19, 23, 28, 45, 51, 59. Parsed from the catalog rather than listed
// here, but the count is asserted: if the parser ever stops seeing `isFree`,
// every template would look paid (or worse, free) and the split below would be
// wrong in silence.
const EXPECTED_FREE_COUNT = 9;

// A single-quoted TypeScript string literal, escape sequences included.
const TS_STRING = String.raw`'((?:[^'\\]|\\.)*)'`;
// One catalog entry. `[^{}]` cannot run past the end of an entry (no entry
// contains a nested object literal), so isFree and demoUrl always belong to
// this entry.
const ENTRY_RE = new RegExp(
  `\\{\\s*id: ${TS_STRING},\\s*title: ${TS_STRING},\\s*description: ${TS_STRING},` +
  `[^{}]*?isFree: (true|false),[^{}]*?demoUrl: ${TS_STRING},`,
  'g',
);

function unescapeTsString(s) {
  return s.replace(/\\(.)/g, '$1');
}

function readTemplates() {
  const source = readFileSync(DATA_FILE, 'utf8');
  const templates = [];

  for (const m of source.matchAll(ENTRY_RE)) {
    templates.push({
      id:          unescapeTsString(m[1]),
      title:       unescapeTsString(m[2]),
      description: unescapeTsString(m[3]),
      isFree:      m[4] === 'true',
      demoUrl:     unescapeTsString(m[5]),
    });
  }

  if (templates.length !== EXPECTED_TEMPLATE_COUNT) {
    throw new Error(
      `Parsed ${templates.length} templates from src/data/templates.ts, expected ${EXPECTED_TEMPLATE_COUNT}. ` +
      `The catalog's shape changed - fix this parser before regenerating, or buyers get mislabelled downloads.`,
    );
  }

  const freeCount = templates.filter(t => t.isFree).length;
  if (freeCount !== EXPECTED_FREE_COUNT) {
    throw new Error(
      `Parsed ${freeCount} free templates from src/data/templates.ts, expected ${EXPECTED_FREE_COUNT}. ` +
      `Refusing to generate: this number decides which zips are written to the public web root.`,
    );
  }

  return templates;
}

const TEMPLATES = readTemplates();

// The one true stack of every downloadable template.
const TRUE_STACK = ['React 19', 'TypeScript', 'Vite'];

// Truthful "What's included" list (identical everywhere - see CANONICAL FACTS).
const INCLUDED = [
  'Complete React + TypeScript source (Vite)',
  'Fully responsive mobile-first layout',
  'Quick-start README with setup steps',
  'Templix Standard License',
];

// ─── Templix Standard License ────────────────────────────────────────────────
// SOURCE OF TRUTH: src/pages/LicensePage.tsx (mirrored in section 2 of
// src/pages/TermsPage.tsx). The buyer agrees to that page, so the LICENSE.txt
// shipped in the zip is derived from it verbatim in substance - a bundled file
// that contradicted the page would be worse than no file at all.
// The page draws NO free/paid distinction ("Free templates are covered by the
// exact same usage terms as paid ones - the only difference is that no purchase
// is required to download them"), so there is ONE licence and every zip,
// free or paid, receives the identical file.
const SITE_URL = 'https://templix-peach.vercel.app';

// The canonical grant, hard-wrapped so it reads correctly in the plain-text
// LICENSE.txt. Markdown re-flows the soft breaks, so the README quotes the same
// constant rather than keeping a second copy that could drift.
const LICENSE_GRANT = `The purchaser may use this template in unlimited personal and commercial
end-products and may modify it freely. You may NOT resell, redistribute,
sublicense, or offer the template itself for download. Free templates carry
the same usage terms with no purchase required.`;

const LICENSE_TEXT = `Templix Standard License
Last updated: July 2026

Every template on Templix - free or paid - is covered by the single Templix
Standard License below. There are no separate personal and commercial tiers:
one license covers both. By downloading a template you agree to these terms.


THE GRANT

${LICENSE_GRANT}


WHAT YOU CAN DO

  - Use the template in unlimited personal and commercial end-products
  - Modify, customize, and extend it freely
  - Use it in paid client and freelance work - no attribution required


WHAT YOU CANNOT DO

  - Resell or redistribute the template itself
  - Sublicense the template to another party
  - Offer the template (or a lightly-modified copy) for download or as a
    competing product


FREE TEMPLATES

Free templates are covered by the exact same usage terms as paid ones - the
only difference is that no purchase is required to download them. The
restriction on reselling or redistributing the template itself still applies.


OWNERSHIP

A license grants you the right to use the template - it does not transfer
ownership of the underlying design or source code. You may not claim the
original template as your own work.


This license forms part of the Templix Terms of Service.

  License terms     ${SITE_URL}/license
  Terms of Service  ${SITE_URL}/terms
  Support           ${SITE_URL}/support

© Templix. All rights reserved except as granted above.
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── Scaffold file generators ────────────────────────────────────────────────

function makePackageJson(title) {
  return JSON.stringify({
    name: slugify(title) || 'templix-template',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
    },
    devDependencies: {
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@vitejs/plugin-react': '^4.3.0',
      typescript: '~5.7.0',
      vite: '^6.0.0',
    },
  }, null, 2) + '\n';
}

function makeIndexHtml(title) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function makeViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;
}

function makeTsConfig() {
  return JSON.stringify({
    files: [],
    references: [
      { path: './tsconfig.app.json' },
      { path: './tsconfig.node.json' },
    ],
  }, null, 2) + '\n';
}

function makeTsConfigApp() {
  // Mirrors the standard Vite react-ts scaffold. noUnusedLocals /
  // noUnusedParameters are intentionally OFF: these are starter templates meant
  // to be edited, and leaving a stray variable while customising should never
  // break `npm run build`. `strict` stays on so real type errors are caught.
  return JSON.stringify({
    compilerOptions: {
      tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
      target: 'ES2022',
      useDefineForClassFields: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: 'force',
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['src'],
  }, null, 2) + '\n';
}

function makeTsConfigNode() {
  return JSON.stringify({
    compilerOptions: {
      tsBuildInfoFile: './node_modules/.tmp/tsconfig.node.tsbuildinfo',
      target: 'ES2022',
      lib: ['ES2023'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: 'force',
      noEmit: true,
      strict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['vite.config.ts'],
  }, null, 2) + '\n';
}

function makeViteEnv() {
  // Brings in Vite's ambient client types so `import './index.css'` type-checks.
  return `/// <reference types="vite/client" />\n`;
}

function makeMainTsx() {
  return `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;
}

function makeIndexCss() {
  // Base page styles only - every template styles itself with inline React
  // style objects, so this just provides the reset and default font.
  return `*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  min-height: 100%;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
`;
}

function makeReadme(title, description) {
  return `# ${title}

> ${description}

A responsive single-page website template built with ${TRUE_STACK.join(', ')}. The whole
site lives in \`src/App.tsx\` as one component composed of multiple sections (header, hero,
content sections, and footer). Styling uses self-contained inline React style objects - there
is no CSS framework or design tooling to configure.

## What's included

${INCLUDED.map(i => `- ${i}`).join('\n')}

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or newer.

\`\`\`bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production (outputs to dist/)
npm run preview  # preview the production build locally
\`\`\`

## Customising

Everything lives in \`src/App.tsx\`. Each section is a small function component inside that
file - edit the copy, colors, and images there. Base page styles (font and reset) are in
\`src/index.css\`.

## Project structure

\`\`\`
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx        # entry point
    ├── App.tsx         # the template - all sections live here
    ├── index.css       # base page styles
    └── vite-env.d.ts   # Vite client types
\`\`\`

## License

Covered by the Templix Standard License - the same terms for free and paid
templates alike.

${LICENSE_GRANT}

The full terms are in \`LICENSE.txt\` next to this file, and online at
${SITE_URL}/license.

---
© Templix
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

let free    = 0;
let paid    = 0;
let skipped = 0;

for (const tpl of TEMPLATES) {
  const slug = tpl.demoUrl.replace('/preview/', '');
  const previewFile = SLUG_TO_FILE[slug];

  if (!previewFile) {
    console.warn(`!  No preview file mapped for slug "${slug}" (template ${tpl.id})`);
    skipped++;
    continue;
  }

  const previewPath = join(PREVIEWS, previewFile);
  let previewSource;
  try {
    previewSource = readFileSync(previewPath, 'utf8');
  } catch {
    console.warn(`!  Preview file not found: ${previewFile} (template ${tpl.id})`);
    skipped++;
    continue;
  }

  // Rename the default export to "App" so it works as src/App.tsx.
  const appSource = previewSource
    .replace(/export default function \w+/, 'export default function App');

  const zip = new AdmZip();
  const dir = `${slugify(tpl.title) || 'templix-template'}/`;

  zip.addFile(`${dir}README.md`,          Buffer.from(makeReadme(tpl.title, tpl.description)));
  zip.addFile(`${dir}LICENSE.txt`,        Buffer.from(LICENSE_TEXT));
  zip.addFile(`${dir}package.json`,       Buffer.from(makePackageJson(tpl.title)));
  zip.addFile(`${dir}index.html`,         Buffer.from(makeIndexHtml(tpl.title)));
  zip.addFile(`${dir}vite.config.ts`,     Buffer.from(makeViteConfig()));
  zip.addFile(`${dir}tsconfig.json`,      Buffer.from(makeTsConfig()));
  zip.addFile(`${dir}tsconfig.app.json`,  Buffer.from(makeTsConfigApp()));
  zip.addFile(`${dir}tsconfig.node.json`, Buffer.from(makeTsConfigNode()));
  zip.addFile(`${dir}.gitignore`,         Buffer.from('node_modules\ndist\n*.local\n.DS_Store\n'));
  zip.addFile(`${dir}src/main.tsx`,       Buffer.from(makeMainTsx()));
  zip.addFile(`${dir}src/index.css`,      Buffer.from(makeIndexCss()));
  zip.addFile(`${dir}src/vite-env.d.ts`,  Buffer.from(makeViteEnv()));
  zip.addFile(`${dir}src/App.tsx`,        Buffer.from(appSource));

  // The whole safety property of this script: paid zips are written outside
  // public/, so no regenerate can republish them.
  const outDir = tpl.isFree ? PUBLIC_DIR : PRIVATE_DIR;
  zip.writeZip(join(outDir, `${tpl.id}.zip`));

  console.log(`OK [${tpl.id.padStart(2)}] ${tpl.isFree ? 'free' : 'paid'}  ${tpl.title}`);
  if (tpl.isFree) free++; else paid++;
}

console.log(`\nDone. ${free} free zips -> public/templates/, ${paid} paid zips -> dist-zips/`);
if (skipped > 0) console.log(`   ! Skipped ${skipped} templates (missing preview files)`);
console.log('Next: node scripts/upload-premium-zips.mjs   (uploads dist-zips/ to the private bucket)');
