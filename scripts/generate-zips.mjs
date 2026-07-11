/**
 * generate-zips.mjs
 * Generates downloadable zip files for all 61 Templix templates.
 *
 * Each zip is a complete, buildable Vite + React 19 + TypeScript project whose
 * src/App.tsx IS the template's preview component. The previews are fully
 * self-contained (they import only from 'react' and style themselves with inline
 * style objects), so `npm install && npm run build` succeeds with no extra deps.
 *
 * Output: public/templates/<id>.zip
 * Run:    node scripts/generate-zips.mjs
 */

import AdmZip from 'adm-zip';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const PREVIEWS  = join(ROOT, 'src', 'pages', 'previews');
const OUT_DIR   = join(ROOT, 'public', 'templates');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

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
// SOURCE OF TRUTH: src/data/templates.ts. This is a build-time mirror of the
// title/description/slug for each template — keep it in sync with that file.
// Every template's TRUE stack is React 19 + TypeScript + Vite (see TRUE_STACK
// below); there is intentionally NO techStack/pages field here because those
// earlier per-template stacks (Next.js/Tailwind/Stripe/…) and multi-page lists
// were inaccurate. Each template is ONE responsive single-page site made of
// sections, not a multi-route app.
const TEMPLATES = [
  { id: '1',  title: 'Luminary — SaaS',              demoUrl: '/preview/luminary',          description: 'A clean, modern SaaS landing page with pricing, features, and testimonial sections.' },
  { id: '2',  title: 'Folio — Portfolio',            demoUrl: '/preview/folio',             description: 'Minimal and elegant portfolio template for designers and developers.' },
  { id: '3',  title: 'ShopDrop — Ecommerce',         demoUrl: '/preview/shopdrop',          description: 'Full-featured ecommerce template with product, cart, and checkout sections.' },
  { id: '4',  title: 'Bloom — Blog',                 demoUrl: '/preview/bloom',             description: 'Beautiful blog template with article listing, categories, and newsletter signup.' },
  { id: '5',  title: 'Agency Pro',                   demoUrl: '/preview/agency-pro',        description: 'Bold and professional agency website with case studies and team sections.' },
  { id: '6',  title: 'StartKit — Startup',           demoUrl: '/preview/startkit',          description: 'Free startup landing page with hero, features, and call-to-action sections.' },
  { id: '7',  title: 'LaunchPad — Landing Page',     demoUrl: '/preview/launchpad',         description: 'High-converting landing page template with hero, social proof, and CTA sections.' },
  { id: '8',  title: 'Dashify — Dashboard',          demoUrl: '/preview/dashify',           description: 'Modern admin dashboard UI with charts, tables, and data-visualization sections.' },
  { id: '9',  title: 'Saveur — Restaurant',          demoUrl: '/preview/saveur',            description: 'Elegant restaurant website with menu, reservations, and gallery sections.' },
  { id: '10', title: 'Nexus — Corporate',            demoUrl: '/preview/nexus',             description: 'Professional corporate website with services, team, and contact sections.' },
  { id: '11', title: 'MedCare — Healthcare',         demoUrl: '/preview/medcare',           description: 'Clean and trustworthy healthcare website for clinics and medical practices.' },
  { id: '12', title: 'Coursify — Education',         demoUrl: '/preview/coursify',          description: 'Feature-rich online course and education platform with enrollment and progress sections.' },
  { id: '13', title: 'Estatly — Real Estate',        demoUrl: '/preview/estatly',           description: 'Sophisticated real estate listing website with property search and agents.' },
  { id: '14', title: 'Lens — Photography',           demoUrl: '/preview/photography',       description: 'Stunning photography portfolio with gallery grid, lightbox, and booking sections.' },
  { id: '15', title: 'Eventful — Events',            demoUrl: '/preview/event',             description: 'Beautiful event and conference website with schedule, speakers, and tickets.' },
  { id: '16', title: 'Relate — CRM',                 demoUrl: '/preview/crm',               description: 'Full-featured CRM dashboard UI with contacts, pipeline, and activity sections.' },
  { id: '17', title: 'Maison — Fashion Store',       demoUrl: '/preview/fashion',           description: 'Sleek and minimal fashion ecommerce store with lookbook and cart sections.' },
  { id: '18', title: 'Floww — App Landing',          demoUrl: '/preview/app-landing',       description: 'High-converting app landing page with download buttons and reviews.' },
  { id: '19', title: 'Grind & Co. — Coffee Shop',    demoUrl: '/preview/coffee',            description: 'Warm and inviting coffee shop website with menu and online-ordering sections.' },
  { id: '20', title: 'DevLog — Tech Blog',           demoUrl: '/preview/techblog',          description: 'Developer-focused tech blog with featured posts, categories, and newsletter.' },
  { id: '21', title: 'Vault — Finance SaaS',         demoUrl: '/preview/vault-finance',     description: 'Modern personal finance dashboard with budgets and investment-tracking sections.' },
  { id: '22', title: 'Pixel — Creative Studio',      demoUrl: '/preview/creative-studio',   description: 'Bold and creative studio portfolio with case studies and animated sections.' },
  { id: '23', title: 'Scout — Job Board',            demoUrl: '/preview/job-board',         description: 'Clean job board UI with listings, filters, and company-profile sections.' },
  { id: '24', title: 'Pulse — Analytics SaaS',       demoUrl: '/preview/pulse-analytics',   description: 'Beautiful web analytics dashboard with real-time visitors and funnel sections.' },
  { id: '25', title: 'Nomad — Travel Blog',          demoUrl: '/preview/travel-blog',       description: 'Visually stunning travel blog with destination guides and photo stories.' },
  { id: '26', title: 'Brix — Construction',          demoUrl: '/preview/construction',      description: 'Strong and professional construction company website with project sections.' },
  { id: '27', title: 'Glow — Beauty & Spa',          demoUrl: '/preview/beauty-spa',        description: 'Elegant beauty salon and spa website with service menu and booking sections.' },
  { id: '28', title: 'Brick — Newsletter',           demoUrl: '/preview/newsletter',        description: 'Clean and minimal newsletter landing page optimized for email list growth.' },
  { id: '29', title: 'Atlas — Map SaaS',             demoUrl: '/preview/atlas-maps',        description: 'Location intelligence SaaS UI with map, data-layer, and territory sections.' },
  { id: '30', title: 'Forge — Dev Tools',            demoUrl: '/preview/forge-devtools',    description: 'Technical SaaS landing page for developer tools with code-preview sections.' },
  { id: '31', title: 'Ora — Productivity App',       demoUrl: '/preview/productivity',      description: 'Pomodoro and time-tracking app landing with dashboard preview and feature sections.' },
  { id: '32', title: 'Luxe — Hotel',                 demoUrl: '/preview/hotel',             description: 'Sophisticated luxury hotel website with rooms, amenities, and reservation sections.' },
  { id: '33', title: 'Fit — Gym & Fitness',          demoUrl: '/preview/fitness',           description: 'High-energy gym and fitness website with classes and membership sections.' },
  { id: '34', title: 'Archi — Architecture',         demoUrl: '/preview/architecture',      description: 'Minimalist architecture firm portfolio with projects, process, and team sections.' },
  { id: '35', title: 'Crypto — Web3 Landing',        demoUrl: '/preview/web3',              description: 'Web3 and crypto project landing page with tokenomics and roadmap sections.' },
  { id: '36', title: 'Shelf — Bookstore',            demoUrl: '/preview/bookstore',         description: 'Charming online bookstore with categories, featured books, and reading-list sections.' },
  { id: '37', title: 'Verde — Eco & Sustainability', demoUrl: '/preview/verde-eco',         description: 'Clean and purpose-driven sustainability brand website with impact-metric sections.' },
  { id: '38', title: 'Swift — Delivery App',         demoUrl: '/preview/swift-delivery',    description: 'Food delivery app landing page with restaurant listings and app-preview sections.' },
  { id: '39', title: 'Law & Co — Legal Firm',        demoUrl: '/preview/legal',             description: 'Professional law firm website with practice areas, attorneys, and results sections.' },
  { id: '40', title: 'Spark — Email Marketing',      demoUrl: '/preview/email-marketing',   description: 'Email marketing SaaS UI with campaign builder, analytics, and audience sections.' },
  { id: '41', title: 'NestFind — Real Estate',       demoUrl: '/preview/real-estate',       description: 'Premium real estate marketplace with property listings and agent-profile sections.' },
  { id: '42', title: 'IronPeak — Gym & Fitness',     demoUrl: '/preview/ironpeak',          description: 'Modern gym and fitness studio website with class booking and plan sections.' },
  { id: '43', title: 'Signal — Podcast',             demoUrl: '/preview/podcast',           description: 'Sleek podcast website with episode player, guests, and newsletter sections.' },
  { id: '44', title: 'LaunchConf — Event',           demoUrl: '/preview/launchconf',        description: 'Conference and event landing page with speakers, schedule, and ticket sections.' },
  { id: '45', title: 'Bloom — Wedding',              demoUrl: '/preview/wedding',           description: 'Romantic wedding website with ceremony details, gallery, and RSVP sections.' },
  { id: '46', title: 'Vega — Music Artist',          demoUrl: '/preview/music',             description: 'Striking music artist website with discography, tour dates, and merch sections.' },
  { id: '47', title: 'Aria — Photography',           demoUrl: '/preview/aria-photography',  description: 'Stunning masonry portfolio for photographers with gallery and booking sections.' },
  { id: '48', title: 'Finwise — Personal Finance',   demoUrl: '/preview/finance-dashboard', description: 'Personal finance dashboard UI with budgeting, expense, and investment sections.' },
  { id: '49', title: 'Petal — Florist',              demoUrl: '/preview/florist',           description: 'Beautiful floral shop with seasonal collections and same-day delivery sections.' },
  { id: '50', title: 'Nomad — Remote Jobs',          demoUrl: '/preview/nomad-jobs',        description: 'Remote job board for digital nomads with filters and company-profile sections.' },
  { id: '51', title: 'Verse — Poetry & Lit',         demoUrl: '/preview/verse-lit',         description: 'Literary magazine template with featured poems and author-profile sections.' },
  { id: '52', title: 'Roam — Airbnb Style',          demoUrl: '/preview/roam-rentals',      description: 'Vacation rental platform UI with map search, property cards, and booking sections.' },
  { id: '53', title: 'Clinic — Healthcare',          demoUrl: '/preview/healthcare',        description: 'Healthcare clinic website with doctor profiles and appointment-booking sections.' },
  { id: '54', title: 'Pixel — Game Studio',          demoUrl: '/preview/pixel-games',       description: 'Video game studio website with game showcases, trailers, and press-kit sections.' },
  { id: '55', title: 'Scout — Talent Agency',        demoUrl: '/preview/scout-talent',      description: 'Talent and modeling agency website with portfolio grid and booking sections.' },
  { id: '56', title: 'Hope — Nonprofit & Charity',   demoUrl: '/preview/hope-nonprofit',    description: 'Heartfelt nonprofit and charity website with causes, donation tiers, and impact stories.' },
  { id: '57', title: 'Neuron — AI Platform',         demoUrl: '/preview/neuron-ai',         description: 'Futuristic AI platform landing page with playground demo, benchmarks, and pricing sections.' },
  { id: '58', title: 'Velocity — Auto Dealership',   demoUrl: '/preview/velocity-auto',     description: 'High-octane car dealership website with inventory, financing, and test-drive sections.' },
  { id: '59', title: 'Paws — Pet Care & Vet',        demoUrl: '/preview/paws-petcare',      description: 'Friendly veterinary clinic and pet care website with services, team, and booking sections.' },
  { id: '60', title: 'Haven — Interior Design',      demoUrl: '/preview/haven-interior',    description: 'Elegant interior design studio portfolio with projects, process, and consultation sections.' },
  { id: '61', title: 'The Daily — News & Magazine',  demoUrl: '/preview/daily-news',        description: 'Classic news and magazine template with breaking stories, category sections, and trending list.' },
];

// The one true stack of every downloadable template.
const TRUE_STACK = ['React 19', 'TypeScript', 'Vite'];

// Truthful "What's included" list (identical everywhere — see CANONICAL FACTS).
const INCLUDED = [
  'Complete React + TypeScript source (Vite)',
  'Fully responsive mobile-first layout',
  'Quick-start README with setup steps',
  'Templix Standard License',
];

// Templix Standard License — identical for every template (free or paid).
const LICENSE_TEXT = `Templix Standard License

The purchaser may use this template in unlimited personal and commercial end-products and may modify it freely. You may NOT resell, redistribute, sublicense, or offer the template itself for download. Free templates carry the same usage terms with no purchase required.
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
  // Base page styles only — every template styles itself with inline React
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
content sections, and footer). Styling uses self-contained inline React style objects — there
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
file — edit the copy, colors, and images there. Base page styles (font and reset) are in
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
    ├── App.tsx         # the template — all sections live here
    ├── index.css       # base page styles
    └── vite-env.d.ts   # Vite client types
\`\`\`

## License

${LICENSE_TEXT.trim()}

---
© Templix
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

let generated = 0;
let skipped   = 0;

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
  zip.addFile(`${dir}LICENSE`,            Buffer.from(LICENSE_TEXT));
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

  const outPath = join(OUT_DIR, `${tpl.id}.zip`);
  zip.writeZip(outPath);

  console.log(`OK [${tpl.id.padStart(2)}] ${tpl.title}`);
  generated++;
}

console.log(`\nDone. Generated ${generated} zips -> public/templates/`);
if (skipped > 0) console.log(`   ! Skipped ${skipped} templates (missing preview files)`);
