/**
 * generate-zips.mjs
 * Generates downloadable zip files for all 61 Templix templates.
 * Each zip contains a complete, runnable Vite + React + TypeScript scaffold
 * with the template's preview component as the main App.
 *
 * Output: public/templates/<id>.zip
 *
 * Run: node scripts/generate-zips.mjs
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

// ─── All templates (id, title, description, demoUrl, techStack, pages) ───────
const TEMPLATES = [
  { id: '1',  title: 'Luminary — SaaS',           demoUrl: '/preview/luminary',          techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], pages: ['Home', 'Features', 'Login', 'Dashboard'],                          description: 'A clean, modern SaaS landing page with pricing, features, and testimonial sections.' },
  { id: '2',  title: 'Folio — Portfolio',          demoUrl: '/preview/folio',             techStack: ['React', 'TypeScript', 'CSS Modules'],                     pages: ['Home', 'Projects', 'About', 'Contact'],                            description: 'Minimal and elegant portfolio template for designers and developers.' },
  { id: '3',  title: 'ShopDrop — Ecommerce',       demoUrl: '/preview/shopdrop',          techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],         pages: ['Home', 'Shop', 'Product Detail', 'Cart', 'Checkout'],              description: 'Full-featured ecommerce template with product pages, cart, and checkout flow.' },
  { id: '4',  title: 'Bloom — Blog',               demoUrl: '/preview/bloom',             techStack: ['Next.js', 'MDX', 'Tailwind CSS'],                          pages: ['Home', 'Blog Index', 'Article', 'Category', 'Newsletter'],        description: 'Beautiful blog template with article listing, categories, and newsletter signup.' },
  { id: '5',  title: 'Agency Pro',                 demoUrl: '/preview/agency-pro',        techStack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],             pages: ['Home', 'Services', 'Case Studies', 'Team', 'Contact'],            description: 'Bold and professional agency website with case studies and team sections.' },
  { id: '6',  title: 'StartKit — Startup',         demoUrl: '/preview/startkit',          techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Features', 'Contact'],                                     description: 'Free startup landing page with hero, features, and call-to-action sections.' },
  { id: '7',  title: 'LaunchPad — Landing Page',   demoUrl: '/preview/launchpad',         techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Landing Page', 'Thank You', 'Privacy Policy'],                    description: 'High-converting landing page template with hero, social proof, and CTA sections.' },
  { id: '8',  title: 'Dashify — Dashboard',        demoUrl: '/preview/dashify',           techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],         pages: ['Overview', 'Analytics', 'Orders', 'Customers', 'Settings'],       description: 'Modern admin dashboard with charts, tables, and data visualization components.' },
  { id: '9',  title: 'Saveur — Restaurant',        demoUrl: '/preview/saveur',            techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Menu', 'Reservations', 'Gallery', 'About'],               description: 'Elegant restaurant website with menu, reservations, and gallery sections.' },
  { id: '10', title: 'Nexus — Corporate',          demoUrl: '/preview/nexus',             techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'About', 'Services', 'Team', 'Careers', 'Contact'],        description: 'Professional corporate website with services, team, and contact sections.' },
  { id: '11', title: 'MedCare — Healthcare',       demoUrl: '/preview/medcare',             techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],                   pages: ['Home', 'Services', 'Doctors', 'Appointments', 'Contact'],         description: 'Clean and trustworthy healthcare website for clinics and medical practices.' },
  { id: '12', title: 'Coursify — Education',       demoUrl: '/preview/coursify',           techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],         pages: ['Home', 'Courses', 'Dashboard', 'Profile', 'Checkout'],            description: 'Feature-rich online course and education platform with enrollment and progress.' },
  { id: '13', title: 'Estatly — Real Estate',      demoUrl: '/preview/estatly',             techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Mapbox'],         pages: ['Home', 'Listings', 'Property Detail', 'Agents', 'Contact'],       description: 'Sophisticated real estate listing website with property search and agents.' },
  { id: '14', title: 'Lens — Photography',         demoUrl: '/preview/photography',       techStack: ['React', 'TypeScript', 'CSS Grid'],                         pages: ['Home', 'Portfolio', 'About', 'Booking', 'Contact'],               description: 'Stunning photography portfolio with gallery grid, lightbox, and booking.' },
  { id: '15', title: 'Eventful — Events',          demoUrl: '/preview/event',             techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Schedule', 'Speakers', 'Tickets', 'Venue'],               description: 'Beautiful event and conference website with schedule, speakers, and tickets.' },
  { id: '16', title: 'Relate — CRM',               demoUrl: '/preview/crm',               techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],         pages: ['Dashboard', 'Contacts', 'Deals', 'Pipeline', 'Calendar'],         description: 'Full-featured CRM dashboard with contacts, pipeline, and activity tracking.' },
  { id: '17', title: 'Maison — Fashion Store',     demoUrl: '/preview/fashion',           techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],         pages: ['Home', 'Shop', 'Product', 'Cart', 'Checkout', 'Lookbook'],        description: 'Sleek and minimal fashion ecommerce store with lookbook and cart.' },
  { id: '18', title: 'Floww — App Landing',        demoUrl: '/preview/app-landing',       techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'Features', 'Download', 'Reviews', 'FAQ'],                 description: 'High-converting app landing page with download buttons and reviews.' },
  { id: '19', title: 'Grind & Co. — Coffee Shop',  demoUrl: '/preview/coffee',            techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Menu', 'Locations', 'Our Story', 'Order Online'],         description: 'Warm and inviting coffee shop website with menu and online ordering.' },
  { id: '20', title: 'DevLog — Tech Blog',         demoUrl: '/preview/techblog',          techStack: ['Next.js', 'MDX', 'Tailwind CSS', 'TypeScript'],            pages: ['Home', 'Articles', 'Tutorials', 'Newsletter', 'About'],           description: 'Developer-focused tech blog with featured posts, categories, and newsletter.' },
  { id: '21', title: 'Vault — Finance SaaS',       demoUrl: '/preview/vault-finance',     techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],       pages: ['Dashboard', 'Transactions', 'Budgets', 'Investments', 'Reports'], description: 'Modern personal finance dashboard with budgets and investment tracking.' },
  { id: '22', title: 'Pixel — Creative Studio',    demoUrl: '/preview/creative-studio',   techStack: ['React', 'TypeScript', 'GSAP', 'Framer Motion'],            pages: ['Home', 'Work', 'Studio', 'Process', 'Contact'],                   description: 'Bold and creative studio portfolio with case studies and animations.' },
  { id: '23', title: 'Scout — Job Board',          demoUrl: '/preview/job-board',         techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],                   pages: ['Home', 'Jobs', 'Job Detail', 'Companies', 'Post a Job'],          description: 'Clean job board platform with listings, filters, and company profiles.' },
  { id: '24', title: 'Pulse — Analytics SaaS',     demoUrl: '/preview/pulse-analytics',           techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],         pages: ['Dashboard', 'Realtime', 'Pages', 'Sources', 'Funnels'],           description: 'Beautiful web analytics dashboard with real-time visitors and funnels.' },
  { id: '25', title: 'Nomad — Travel Blog',        demoUrl: '/preview/travel-blog',       techStack: ['Next.js', 'MDX', 'Tailwind CSS'],                          pages: ['Home', 'Destinations', 'Stories', 'Guide', 'About'],              description: 'Visually stunning travel blog with destination guides and photo stories.' },
  { id: '26', title: 'Brix — Construction',        demoUrl: '/preview/construction',      techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Projects', 'Services', 'About', 'Team', 'Contact'],       description: 'Strong and professional construction company website with projects.' },
  { id: '27', title: 'Glow — Beauty & Spa',        demoUrl: '/preview/beauty-spa',        techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Services', 'Book', 'Gallery', 'About', 'Contact'],        description: 'Elegant beauty salon and spa website with service menu and booking.' },
  { id: '28', title: 'Brick — Newsletter',         demoUrl: '/preview/newsletter',        techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Landing Page', 'Confirmation', 'Archive'],                        description: 'Clean and minimal newsletter landing page optimized for email list growth.' },
  { id: '29', title: 'Atlas — Map SaaS',           demoUrl: '/preview/atlas-maps',          techStack: ['React', 'TypeScript', 'Mapbox', 'Tailwind CSS'],           pages: ['Home', 'Map', 'Layers', 'Reports', 'Settings'],                   description: 'Location intelligence SaaS with maps, data layers, and territory management.' },
  { id: '30', title: 'Forge — Dev Tools',          demoUrl: '/preview/forge-devtools',          techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Shiki'],            pages: ['Home', 'Docs', 'Pricing', 'Changelog', 'Blog'],                   description: 'Technical SaaS landing page for developer tools with code previews.' },
  { id: '31', title: 'Ora — Productivity App',     demoUrl: '/preview/productivity',      techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Features', 'Download', 'Pricing'],                        description: 'Pomodoro and time-tracking app landing with dashboard preview and features.' },
  { id: '32', title: 'Luxe — Hotel',               demoUrl: '/preview/hotel',             techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],                   pages: ['Home', 'Rooms', 'Amenities', 'Dining', 'Reservations'],           description: 'Sophisticated luxury hotel website with rooms, amenities, and reservations.' },
  { id: '33', title: 'Fit — Gym & Fitness',        demoUrl: '/preview/fitness',           techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Classes', 'Trainers', 'Membership', 'Schedule'],          description: 'High-energy gym and fitness website with classes and membership plans.' },
  { id: '34', title: 'Archi — Architecture',       demoUrl: '/preview/architecture',      techStack: ['React', 'TypeScript', 'Framer Motion'],                    pages: ['Home', 'Projects', 'Studio', 'Process', 'Contact'],               description: 'Minimalist architecture firm portfolio with projects, process, and team.' },
  { id: '35', title: 'Crypto — Web3 Landing',      demoUrl: '/preview/web3',              techStack: ['React', 'TypeScript', 'Tailwind CSS', 'wagmi'],            pages: ['Home', 'Tokenomics', 'Roadmap', 'Team', 'FAQ'],                   description: 'Web3 and crypto project landing page with tokenomics and roadmap.' },
  { id: '36', title: 'Shelf — Bookstore',          demoUrl: '/preview/bookstore',         techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],                   pages: ['Home', 'Browse', 'Book Detail', 'Cart', 'Checkout'],              description: 'Charming online bookstore with categories, featured books, and reading lists.' },
  { id: '37', title: 'Verde — Eco & Sustainability', demoUrl: '/preview/verde-eco',     techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Mission', 'Products', 'Impact', 'Blog', 'Contact'],       description: 'Clean and purpose-driven sustainability brand website with impact metrics.' },
  { id: '38', title: 'Swift — Delivery App',       demoUrl: '/preview/swift-delivery',       techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'How It Works', 'Restaurants', 'Download', 'FAQ'],         description: 'Food delivery app landing page with restaurant listings and app preview.' },
  { id: '39', title: 'Law & Co — Legal Firm',      demoUrl: '/preview/legal',             techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Practice Areas', 'Attorneys', 'Results', 'Contact'],      description: 'Professional law firm website with practice areas, attorneys, and results.' },
  { id: '40', title: 'Spark — Email Marketing',    demoUrl: '/preview/email-marketing',   techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],       pages: ['Home', 'Campaigns', 'Audience', 'Analytics', 'Settings'],         description: 'Email marketing SaaS with campaign builder, analytics, and audience mgmt.' },
  { id: '41', title: 'NestFind — Real Estate',     demoUrl: '/preview/real-estate',       techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Mapbox'],           pages: ['Home', 'Listings', 'Property Detail', 'Agents', 'Saved Homes'],   description: 'Premium real estate marketplace with property listings and agent profiles.' },
  { id: '42', title: 'IronPeak — Gym & Fitness',   demoUrl: '/preview/ironpeak',           techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'Classes', 'Trainers', 'Plans', 'Book', 'Locations'],      description: 'Modern gym and fitness studio website with class booking and plans.' },
  { id: '43', title: 'Signal — Podcast',           demoUrl: '/preview/podcast',           techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Episodes', 'Guests', 'Newsletter', 'About'],              description: 'Sleek podcast website with episode player, guests, and newsletter.' },
  { id: '44', title: 'LaunchConf — Event',         demoUrl: '/preview/launchconf',             techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'Speakers', 'Schedule', 'Tickets', 'Venue'],               description: 'Conference and event landing page with speakers, schedule, and tickets.' },
  { id: '45', title: 'Bloom — Wedding',            demoUrl: '/preview/wedding',           techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Our Story', 'Gallery', 'Schedule', 'RSVP'],               description: 'Romantic wedding website with ceremony details, gallery, and RSVP form.' },
  { id: '46', title: 'Vega — Music Artist',        demoUrl: '/preview/music',             techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Howler.js'],        pages: ['Home', 'Music', 'Tour', 'Videos', 'Store', 'Press'],              description: 'Striking music artist website with discography, tour dates, and merch.' },
  { id: '47', title: 'Aria — Photography',         demoUrl: '/preview/aria-photography',       techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Lightgallery'],     pages: ['Home', 'Work', 'About', 'Services', 'Contact', 'Book Session'],   description: 'Stunning masonry portfolio for photographers with gallery and booking.' },
  { id: '48', title: 'Finwise — Personal Finance', demoUrl: '/preview/finance-dashboard', techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],         pages: ['Dashboard', 'Budget', 'Expenses', 'Investments', 'Reports'],      description: 'Personal finance dashboard with budgeting, expense tracking, and investments.' },
  { id: '49', title: 'Petal — Florist',            demoUrl: '/preview/florist',           techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],         pages: ['Home', 'Shop', 'Arrangements', 'Occasions', 'Cart', 'Checkout'],  description: 'Beautiful floral shop with seasonal collections and same-day delivery.' },
  { id: '50', title: 'Nomad — Remote Jobs',        demoUrl: '/preview/nomad-jobs',         techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],       pages: ['Home', 'Jobs', 'Companies', 'Post a Job', 'Saved Jobs'],          description: 'Remote job board for digital nomads with filters and company profiles.' },
  { id: '51', title: 'Verse — Poetry & Lit',       demoUrl: '/preview/verse-lit',        techStack: ['Next.js', 'MDX', 'Tailwind CSS'],                          pages: ['Home', 'Poetry', 'Fiction', 'Authors', 'Submit', 'About'],        description: 'Literary magazine template with featured poems and author profiles.' },
  { id: '52', title: 'Roam — Airbnb Style',        demoUrl: '/preview/roam-rentals',       techStack: ['Next.js', 'TypeScript', 'Mapbox', 'Stripe', 'Supabase'],   pages: ['Home', 'Search', 'Listing', 'Book', 'Dashboard', 'Messages'],     description: 'Vacation rental platform with map search, property cards, and booking.' },
  { id: '53', title: 'Clinic — Healthcare',        demoUrl: '/preview/healthcare',        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Cal.com'],          pages: ['Home', 'Doctors', 'Services', 'Book Appointment', 'Contact'],     description: 'Healthcare clinic website with doctor profiles and appointment booking.' },
  { id: '54', title: 'Pixel — Game Studio',        demoUrl: '/preview/pixel-games',          techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],         pages: ['Home', 'Games', 'Game Detail', 'Team', 'Press', 'Careers'],       description: 'Video game studio website with game showcases, trailers, and press kit.' },
  { id: '55', title: 'Scout — Talent Agency',      demoUrl: '/preview/scout-talent',        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'Talent', 'Profile', 'Book', 'News', 'Contact'],           description: 'Talent and modeling agency website with portfolio grid and booking form.' },
  { id: '56', title: 'Hope — Nonprofit & Charity', demoUrl: '/preview/hope-nonprofit',      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],           pages: ['Home', 'Causes', 'Donate', 'Volunteer', 'Stories', 'Contact'],    description: 'Heartfelt nonprofit and charity website with causes, donation tiers, and impact stories.' },
  { id: '57', title: 'Neuron — AI Platform',       demoUrl: '/preview/neuron-ai',           techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI'],         pages: ['Home', 'Playground', 'Pricing', 'Docs', 'Blog'],                  description: 'Futuristic AI platform landing page with playground demo, benchmarks, and pricing.' },
  { id: '58', title: 'Velocity — Auto Dealership', demoUrl: '/preview/velocity-auto',       techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Inventory', 'Vehicle Detail', 'Financing', 'Trade-In', 'Contact'], description: 'High-octane car dealership website with inventory, financing, and test-drive booking.' },
  { id: '59', title: 'Paws — Pet Care & Vet',      demoUrl: '/preview/paws-petcare',        techStack: ['React', 'TypeScript', 'Tailwind CSS'],                     pages: ['Home', 'Services', 'Vets', 'Book a Visit', 'Pricing', 'FAQ'],     description: 'Friendly veterinary clinic and pet care website with services, team, and appointment booking.' },
  { id: '60', title: 'Haven — Interior Design',    demoUrl: '/preview/haven-interior',      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],    pages: ['Home', 'Projects', 'Services', 'Process', 'Studio', 'Contact'],   description: 'Elegant interior design studio portfolio with projects, process, and consultation booking.' },
  { id: '61', title: 'The Daily — News & Magazine', demoUrl: '/preview/daily-news',         techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],            pages: ['Home', 'Politics', 'Tech', 'Culture', 'Article', 'Newsletter'],   description: 'Classic news and magazine template with breaking stories, category sections, and trending list.' },
];

// ─── Scaffold file generators ────────────────────────────────────────────────

function makePackageJson(title, techStack) {
  const name = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const hasTailwind = techStack.includes('Tailwind CSS');
  const hasFramer  = techStack.includes('Framer Motion');
  const hasSWC     = true;

  return JSON.stringify({
    name,
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
      ...(hasTailwind ? { tailwindcss: '^4.0.0' } : {}),
      ...(hasFramer   ? { 'framer-motion': '^11.0.0' } : {}),
    },
    devDependencies: {
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@vitejs/plugin-react': '^4.0.0',
      typescript: '~5.7.0',
      vite: '^6.0.0',
      ...(hasTailwind ? { '@tailwindcss/vite': '^4.0.0' } : {}),
    },
  }, null, 2);
}

function makeIndexHtml(title) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
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

function makeViteConfig(hasTailwind) {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
${hasTailwind ? "import tailwindcss from '@tailwindcss/vite';\n" : ''}
export default defineConfig({
  plugins: [
    react(),
    ${hasTailwind ? 'tailwindcss(),' : ''}
  ],
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
  }, null, 2);
}

function makeTsConfigApp() {
  return JSON.stringify({
    compilerOptions: {
      tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: 'force',
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['src'],
  }, null, 2);
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
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['vite.config.ts'],
  }, null, 2);
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

function makeIndexCss(hasTailwind) {
  if (hasTailwind) {
    return `@import 'tailwindcss';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
`;
  }
  return `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
`;
}

function makeReadme(title, description, techStack, pages) {
  return `# ${title}

> ${description}

A premium React + TypeScript template from [Templix](https://templix-peach.vercel.app/).

## Tech Stack

${techStack.map(t => `- ${t}`).join('\n')}

## Pages / Sections

${pages.map(p => `- ${p}`).join('\n')}

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
\`\`\`

## Project Structure

\`\`\`
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx       # Entry point
    ├── App.tsx        # Main component (your template)
    └── index.css      # Global styles
\`\`\`

## Customisation

All styles are written as inline React style objects — no external CSS dependencies.
Edit \`src/App.tsx\` to change colors, copy, images, and layout.

## License

This template is licensed for use by the purchaser only.
Redistribution or resale is not permitted.

---
© Templix — https://templix-peach.vercel.app/
`;
}

function makeEnvExample(techStack) {
  const lines = ['# Environment variables — rename this file to .env.local'];
  if (techStack.includes('Stripe')) {
    lines.push('VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...');
  }
  if (techStack.includes('Supabase')) {
    lines.push('VITE_SUPABASE_URL=https://your-project.supabase.co');
    lines.push('VITE_SUPABASE_ANON_KEY=eyJ...');
  }
  if (techStack.includes('Mapbox')) {
    lines.push('VITE_MAPBOX_TOKEN=pk.eyJ...');
  }
  return lines.join('\n') + '\n';
}

// ─── Main ────────────────────────────────────────────────────────────────────

let generated = 0;
let skipped   = 0;

for (const tpl of TEMPLATES) {
  const slug = tpl.demoUrl.replace('/preview/', '');
  const previewFile = SLUG_TO_FILE[slug];

  if (!previewFile) {
    console.warn(`⚠  No preview file mapped for slug "${slug}" (template ${tpl.id})`);
    skipped++;
    continue;
  }

  const previewPath = join(PREVIEWS, previewFile);
  let previewSource;
  try {
    previewSource = readFileSync(previewPath, 'utf8');
  } catch {
    console.warn(`⚠  Preview file not found: ${previewFile} (template ${tpl.id})`);
    skipped++;
    continue;
  }

  // Rename the default export to "App" so it works as App.tsx
  const appSource = previewSource
    .replace(/export default function \w+/, 'export default function App');

  const hasTailwind = tpl.techStack.includes('Tailwind CSS');

  const zip = new AdmZip();
  const dir = `${tpl.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`;

  zip.addFile(`${dir}README.md`,           Buffer.from(makeReadme(tpl.title, tpl.description, tpl.techStack, tpl.pages)));
  zip.addFile(`${dir}package.json`,        Buffer.from(makePackageJson(tpl.title, tpl.techStack)));
  zip.addFile(`${dir}index.html`,          Buffer.from(makeIndexHtml(tpl.title)));
  zip.addFile(`${dir}vite.config.ts`,      Buffer.from(makeViteConfig(hasTailwind)));
  zip.addFile(`${dir}tsconfig.json`,       Buffer.from(makeTsConfig()));
  zip.addFile(`${dir}tsconfig.app.json`,   Buffer.from(makeTsConfigApp()));
  zip.addFile(`${dir}tsconfig.node.json`,  Buffer.from(makeTsConfigNode()));
  zip.addFile(`${dir}.env.example`,        Buffer.from(makeEnvExample(tpl.techStack)));
  zip.addFile(`${dir}src/main.tsx`,        Buffer.from(makeMainTsx()));
  zip.addFile(`${dir}src/index.css`,       Buffer.from(makeIndexCss(hasTailwind)));
  zip.addFile(`${dir}src/App.tsx`,         Buffer.from(appSource));

  const outPath = join(OUT_DIR, `${tpl.id}.zip`);
  zip.writeZip(outPath);

  console.log(`✅ [${tpl.id.padStart(2)}] ${tpl.title}`);
  generated++;
}

console.log(`\n🎉 Done! Generated ${generated} zips → public/templates/`);
if (skipped > 0) console.log(`   ⚠  Skipped ${skipped} templates (missing preview files)`);
