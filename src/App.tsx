import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ui/ProtectedRoute';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ScrollToTop from './components/ui/ScrollToTop';
import Container from './components/ui/Container';
import HomePage from './pages/HomePage';

// Secondary pages — lazy so the initial bundle stays small (homepage only).
const TemplatesPage        = lazy(() => import('./pages/TemplatesPage'));
const TemplateDetailPage   = lazy(() => import('./pages/TemplateDetailPage'));
const CategoriesPage       = lazy(() => import('./pages/CategoriesPage'));
const LoginPage            = lazy(() => import('./pages/LoginPage'));
const DashboardPage        = lazy(() => import('./pages/DashboardPage'));
const PurchaseSuccessPage  = lazy(() => import('./pages/PurchaseSuccessPage'));
const NotFoundPage         = lazy(() => import('./pages/NotFoundPage'));
const TermsPage            = lazy(() => import('./pages/TermsPage'));
const PrivacyPage          = lazy(() => import('./pages/PrivacyPage'));
const WishlistPage         = lazy(() => import('./pages/WishlistPage'));
const AboutPage            = lazy(() => import('./pages/AboutPage'));
const ResetPasswordPage    = lazy(() => import('./pages/ResetPasswordPage'));
const SupportPage          = lazy(() => import('./pages/SupportPage'));
const FaqPage              = lazy(() => import('./pages/FaqPage'));
const LicensePage          = lazy(() => import('./pages/LicensePage'));

// Template previews — one lazy chunk each so a visitor loads only the demo
// they open, not all 61. Route paths are unchanged.
const LuminarySaasPreview      = lazy(() => import('./pages/previews/LuminarySaasPreview'));
const FolioPortfolioPreview    = lazy(() => import('./pages/previews/FolioPortfolioPreview'));
const ShopDropEcommercePreview = lazy(() => import('./pages/previews/ShopDropEcommercePreview'));
const BloomBlogPreview         = lazy(() => import('./pages/previews/BloomBlogPreview'));
const AgencyProPreview         = lazy(() => import('./pages/previews/AgencyProPreview'));
const LaunchPadPreview         = lazy(() => import('./pages/previews/LaunchPadPreview'));
const DashifyPreview           = lazy(() => import('./pages/previews/DashifyPreview'));
const SaveurRestaurantPreview  = lazy(() => import('./pages/previews/SaveurRestaurantPreview'));
const NexusCorporatePreview    = lazy(() => import('./pages/previews/NexusCorporatePreview'));
const CRMDashboardPreview      = lazy(() => import('./pages/previews/CRMDashboardPreview'));
const FashionStorePreview      = lazy(() => import('./pages/previews/FashionStorePreview'));
const AppLandingPreview        = lazy(() => import('./pages/previews/AppLandingPreview'));
const CoffeeShopPreview        = lazy(() => import('./pages/previews/CoffeeShopPreview'));
const TechBlogPreview          = lazy(() => import('./pages/previews/TechBlogPreview'));
const RealEstatePreview        = lazy(() => import('./pages/previews/RealEstatePreview'));
const FitnessPreview           = lazy(() => import('./pages/previews/FitnessPreview'));
const PodcastPreview           = lazy(() => import('./pages/previews/PodcastPreview'));
const EventPreview             = lazy(() => import('./pages/previews/EventPreview'));
const WeddingPreview           = lazy(() => import('./pages/previews/WeddingPreview'));
const MusicPreview             = lazy(() => import('./pages/previews/MusicPreview'));
const PhotographyPreview       = lazy(() => import('./pages/previews/PhotographyPreview'));
const HotelPreview             = lazy(() => import('./pages/previews/HotelPreview'));
const TravelBlogPreview        = lazy(() => import('./pages/previews/TravelBlogPreview'));
const BeautySpaPreview         = lazy(() => import('./pages/previews/BeautySpaPreview'));
const Web3Preview              = lazy(() => import('./pages/previews/Web3Preview'));
const LegalPreview             = lazy(() => import('./pages/previews/LegalPreview'));
const ArchitecturePreview      = lazy(() => import('./pages/previews/ArchitecturePreview'));
const ConstructionPreview      = lazy(() => import('./pages/previews/ConstructionPreview'));
const JobBoardPreview          = lazy(() => import('./pages/previews/JobBoardPreview'));
const FinanceDashboardPreview  = lazy(() => import('./pages/previews/FinanceDashboardPreview'));
const HealthcarePreview        = lazy(() => import('./pages/previews/HealthcarePreview'));
const EmailMarketingPreview    = lazy(() => import('./pages/previews/EmailMarketingPreview'));
const VaultFinancePreview      = lazy(() => import('./pages/previews/VaultFinancePreview'));
const CreativeStudioPreview    = lazy(() => import('./pages/previews/CreativeStudioPreview'));
const BookstorePreview         = lazy(() => import('./pages/previews/BookstorePreview'));
const FloristPreview           = lazy(() => import('./pages/previews/FloristPreview'));
const NewsletterPreview        = lazy(() => import('./pages/previews/NewsletterPreview'));
const ProductivityPreview      = lazy(() => import('./pages/previews/ProductivityPreview'));
const StartKitStartupPreview   = lazy(() => import('./pages/previews/StartKitStartupPreview'));
const MedCareHealthcarePreview = lazy(() => import('./pages/previews/MedCareHealthcarePreview'));
const CoursifyEducationPreview = lazy(() => import('./pages/previews/CoursifyEducationPreview'));
const EstatlyRealEstatePreview = lazy(() => import('./pages/previews/EstatlyRealEstatePreview'));
const PulseAnalyticsPreview    = lazy(() => import('./pages/previews/PulseAnalyticsPreview'));
const AtlasMapSaasPreview      = lazy(() => import('./pages/previews/AtlasMapSaasPreview'));
const ForgeDevToolsPreview     = lazy(() => import('./pages/previews/ForgeDevToolsPreview'));
const VerdeEcoPreview          = lazy(() => import('./pages/previews/VerdeEcoPreview'));
const SwiftDeliveryPreview     = lazy(() => import('./pages/previews/SwiftDeliveryPreview'));
const IronPeakGymPreview       = lazy(() => import('./pages/previews/IronPeakGymPreview'));
const LaunchConfEventPreview   = lazy(() => import('./pages/previews/LaunchConfEventPreview'));
const AriaPhotographyPreview   = lazy(() => import('./pages/previews/AriaPhotographyPreview'));
const NomadRemoteJobsPreview   = lazy(() => import('./pages/previews/NomadRemoteJobsPreview'));
const VersePoetryPreview       = lazy(() => import('./pages/previews/VersePoetryPreview'));
const RoamRentalsPreview       = lazy(() => import('./pages/previews/RoamRentalsPreview'));
const PixelGameStudioPreview   = lazy(() => import('./pages/previews/PixelGameStudioPreview'));
const ScoutTalentPreview       = lazy(() => import('./pages/previews/ScoutTalentPreview'));
const HopeNonprofitPreview     = lazy(() => import('./pages/previews/HopeNonprofitPreview'));
const NeuronAiPreview          = lazy(() => import('./pages/previews/NeuronAiPreview'));
const VelocityAutoPreview      = lazy(() => import('./pages/previews/VelocityAutoPreview'));
const PawsPetCarePreview       = lazy(() => import('./pages/previews/PawsPetCarePreview'));
const HavenInteriorPreview     = lazy(() => import('./pages/previews/HavenInteriorPreview'));
const DailyNewsPreview         = lazy(() => import('./pages/previews/DailyNewsPreview'));

// Route fallback — echoes the catalog shell (title, toolbar, card grid) so a
// lazy chunk settles into the real layout instead of swapping a bare spinner
// for a full page. Blocks are decorative; the wrapper carries the a11y status.
function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="animate-pulse motion-reduce:animate-none"
    >
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px' }}>
        <div className="mb-10 h-11 w-[min(320px,60%)] rounded-lg bg-surface-2" />
        <div className="mb-8 h-11 rounded-lg border border-border-subtle bg-surface-2" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="aspect-[16/10] rounded-xl border border-border-subtle bg-surface-2"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

// Hide navbar/footer on login, dashboard, and preview pages
function Layout() {
  const { pathname } = useLocation();
  const isShell = pathname === '/login' || pathname === '/reset-password' || pathname.startsWith('/preview/') || pathname === '/purchase-success';

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-border-strong focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-primary focus:shadow-lg"
      >
        Skip to content
      </a>
      {!isShell && <Navbar />}
      <main id="main" tabIndex={-1} className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/"                   element={<HomePage />}                                              />
              <Route path="/templates"          element={<TemplatesPage />}                                         />
              <Route path="/templates/:id"      element={<TemplateDetailPage />}                                    />
              <Route path="/categories"         element={<CategoriesPage />}                                        />
              <Route path="/login"              element={<LoginPage />}                                             />
              <Route path="/purchase-success"   element={<PurchaseSuccessPage />}                                   />
              <Route path="/dashboard"          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}        />
              <Route path="/wishlist"           element={<WishlistPage />}                                          />
              <Route path="/about"              element={<AboutPage />}                                             />
              <Route path="/terms"              element={<TermsPage />}                                             />
              <Route path="/privacy"            element={<PrivacyPage />}                                           />
              <Route path="/support"            element={<SupportPage />}                                           />
              <Route path="/faq"                element={<FaqPage />}                                               />
              <Route path="/license"            element={<LicensePage />}                                           />
              <Route path="/reset-password"     element={<ResetPasswordPage />}                                     />
              {/* ── Template previews ── */}
              <Route path="/preview/luminary"   element={<LuminarySaasPreview />}      />
              <Route path="/preview/folio"      element={<FolioPortfolioPreview />}    />
              <Route path="/preview/shopdrop"   element={<ShopDropEcommercePreview />} />
              <Route path="/preview/bloom"      element={<BloomBlogPreview />}         />
              <Route path="/preview/agency-pro" element={<AgencyProPreview />}         />
              <Route path="/preview/launchpad"  element={<LaunchPadPreview />}         />
              <Route path="/preview/dashify"    element={<DashifyPreview />}           />
              <Route path="/preview/saveur"     element={<SaveurRestaurantPreview />}  />
              <Route path="/preview/nexus"        element={<NexusCorporatePreview />}    />
              <Route path="/preview/crm"          element={<CRMDashboardPreview />}      />
              <Route path="/preview/fashion"      element={<FashionStorePreview />}      />
              <Route path="/preview/app-landing"  element={<AppLandingPreview />}        />
              <Route path="/preview/coffee"       element={<CoffeeShopPreview />}        />
              <Route path="/preview/techblog"     element={<TechBlogPreview />}          />
              <Route path="/preview/real-estate"  element={<RealEstatePreview />}        />
              <Route path="/preview/fitness"      element={<FitnessPreview />}           />
              <Route path="/preview/podcast"      element={<PodcastPreview />}           />
              <Route path="/preview/event"        element={<EventPreview />}             />
              <Route path="/preview/wedding"      element={<WeddingPreview />}           />
              <Route path="/preview/music"        element={<MusicPreview />}             />
              <Route path="/preview/photography"    element={<PhotographyPreview />}       />
              <Route path="/preview/hotel"         element={<HotelPreview />}             />
              <Route path="/preview/travel-blog"   element={<TravelBlogPreview />}        />
              <Route path="/preview/beauty-spa"    element={<BeautySpaPreview />}         />
              <Route path="/preview/web3"          element={<Web3Preview />}              />
              <Route path="/preview/legal"         element={<LegalPreview />}             />
              <Route path="/preview/architecture"  element={<ArchitecturePreview />}      />
              <Route path="/preview/construction"  element={<ConstructionPreview />}      />
              <Route path="/preview/job-board"     element={<JobBoardPreview />}          />
              <Route path="/preview/finance-dashboard" element={<FinanceDashboardPreview />} />
              <Route path="/preview/healthcare"    element={<HealthcarePreview />}        />
              <Route path="/preview/email-marketing" element={<EmailMarketingPreview />}  />
              <Route path="/preview/vault-finance" element={<VaultFinancePreview />}      />
              <Route path="/preview/creative-studio" element={<CreativeStudioPreview />}  />
              <Route path="/preview/bookstore"     element={<BookstorePreview />}         />
              <Route path="/preview/florist"       element={<FloristPreview />}           />
              <Route path="/preview/newsletter"    element={<NewsletterPreview />}        />
              <Route path="/preview/productivity"  element={<ProductivityPreview />}      />
              <Route path="/preview/startkit"      element={<StartKitStartupPreview />}   />
              <Route path="/preview/medcare"       element={<MedCareHealthcarePreview />} />
              <Route path="/preview/coursify"      element={<CoursifyEducationPreview />} />
              <Route path="/preview/estatly"       element={<EstatlyRealEstatePreview />} />
              <Route path="/preview/pulse-analytics" element={<PulseAnalyticsPreview />}  />
              <Route path="/preview/atlas-maps"    element={<AtlasMapSaasPreview />}      />
              <Route path="/preview/forge-devtools" element={<ForgeDevToolsPreview />}    />
              <Route path="/preview/verde-eco"     element={<VerdeEcoPreview />}          />
              <Route path="/preview/swift-delivery" element={<SwiftDeliveryPreview />}    />
              <Route path="/preview/ironpeak"      element={<IronPeakGymPreview />}       />
              <Route path="/preview/launchconf"    element={<LaunchConfEventPreview />}   />
              <Route path="/preview/aria-photography" element={<AriaPhotographyPreview />} />
              <Route path="/preview/nomad-jobs"    element={<NomadRemoteJobsPreview />}   />
              <Route path="/preview/verse-lit"     element={<VersePoetryPreview />}       />
              <Route path="/preview/roam-rentals"  element={<RoamRentalsPreview />}       />
              <Route path="/preview/pixel-games"   element={<PixelGameStudioPreview />}   />
              <Route path="/preview/scout-talent"  element={<ScoutTalentPreview />}       />
              <Route path="/preview/hope-nonprofit" element={<HopeNonprofitPreview />}    />
              <Route path="/preview/neuron-ai"     element={<NeuronAiPreview />}          />
              <Route path="/preview/velocity-auto" element={<VelocityAutoPreview />}      />
              <Route path="/preview/paws-petcare"  element={<PawsPetCarePreview />}       />
              <Route path="/preview/haven-interior" element={<HavenInteriorPreview />}    />
              <Route path="/preview/daily-news"    element={<DailyNewsPreview />}         />
              <Route path="*"                   element={<NotFoundPage />}             />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isShell && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
