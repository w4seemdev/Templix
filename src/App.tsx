import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ui/ProtectedRoute';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateDetailPage from './pages/TemplateDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LuminarySaasPreview      from './pages/previews/LuminarySaasPreview';
import FolioPortfolioPreview    from './pages/previews/FolioPortfolioPreview';
import ShopDropEcommercePreview from './pages/previews/ShopDropEcommercePreview';
import BloomBlogPreview         from './pages/previews/BloomBlogPreview';
import AgencyProPreview         from './pages/previews/AgencyProPreview';
import LaunchPadPreview         from './pages/previews/LaunchPadPreview';
import DashifyPreview           from './pages/previews/DashifyPreview';
import SaveurRestaurantPreview  from './pages/previews/SaveurRestaurantPreview';
import NexusCorporatePreview    from './pages/previews/NexusCorporatePreview';
import CRMDashboardPreview      from './pages/previews/CRMDashboardPreview';
import FashionStorePreview      from './pages/previews/FashionStorePreview';
import AppLandingPreview        from './pages/previews/AppLandingPreview';
import CoffeeShopPreview        from './pages/previews/CoffeeShopPreview';
import TechBlogPreview          from './pages/previews/TechBlogPreview';
import RealEstatePreview        from './pages/previews/RealEstatePreview';
import FitnessPreview           from './pages/previews/FitnessPreview';
import PodcastPreview           from './pages/previews/PodcastPreview';
import EventPreview             from './pages/previews/EventPreview';
import WeddingPreview           from './pages/previews/WeddingPreview';
import MusicPreview             from './pages/previews/MusicPreview';
import PhotographyPreview       from './pages/previews/PhotographyPreview';
import HotelPreview             from './pages/previews/HotelPreview';
import TravelBlogPreview        from './pages/previews/TravelBlogPreview';
import BeautySpaPreview         from './pages/previews/BeautySpaPreview';
import Web3Preview              from './pages/previews/Web3Preview';
import LegalPreview             from './pages/previews/LegalPreview';
import ArchitecturePreview      from './pages/previews/ArchitecturePreview';
import ConstructionPreview      from './pages/previews/ConstructionPreview';
import JobBoardPreview          from './pages/previews/JobBoardPreview';
import FinanceDashboardPreview  from './pages/previews/FinanceDashboardPreview';
import HealthcarePreview        from './pages/previews/HealthcarePreview';
import EmailMarketingPreview    from './pages/previews/EmailMarketingPreview';
import VaultFinancePreview      from './pages/previews/VaultFinancePreview';
import CreativeStudioPreview    from './pages/previews/CreativeStudioPreview';
import BookstorePreview         from './pages/previews/BookstorePreview';
import FloristPreview           from './pages/previews/FloristPreview';
import NewsletterPreview        from './pages/previews/NewsletterPreview';
import ProductivityPreview      from './pages/previews/ProductivityPreview';
import StartKitStartupPreview   from './pages/previews/StartKitStartupPreview';
import MedCareHealthcarePreview from './pages/previews/MedCareHealthcarePreview';
import CoursifyEducationPreview from './pages/previews/CoursifyEducationPreview';
import EstatlyRealEstatePreview from './pages/previews/EstatlyRealEstatePreview';
import PulseAnalyticsPreview    from './pages/previews/PulseAnalyticsPreview';
import AtlasMapSaasPreview      from './pages/previews/AtlasMapSaasPreview';
import ForgeDevToolsPreview     from './pages/previews/ForgeDevToolsPreview';
import VerdeEcoPreview          from './pages/previews/VerdeEcoPreview';
import SwiftDeliveryPreview     from './pages/previews/SwiftDeliveryPreview';
import IronPeakGymPreview       from './pages/previews/IronPeakGymPreview';
import LaunchConfEventPreview   from './pages/previews/LaunchConfEventPreview';
import AriaPhotographyPreview   from './pages/previews/AriaPhotographyPreview';
import NomadRemoteJobsPreview   from './pages/previews/NomadRemoteJobsPreview';
import VersePoetryPreview       from './pages/previews/VersePoetryPreview';
import RoamRentalsPreview       from './pages/previews/RoamRentalsPreview';
import PixelGameStudioPreview   from './pages/previews/PixelGameStudioPreview';
import ScoutTalentPreview       from './pages/previews/ScoutTalentPreview';
import HopeNonprofitPreview     from './pages/previews/HopeNonprofitPreview';
import NeuronAiPreview          from './pages/previews/NeuronAiPreview';
import VelocityAutoPreview      from './pages/previews/VelocityAutoPreview';
import PawsPetCarePreview       from './pages/previews/PawsPetCarePreview';
import HavenInteriorPreview     from './pages/previews/HavenInteriorPreview';
import DailyNewsPreview         from './pages/previews/DailyNewsPreview';

// Hide navbar/footer on login, dashboard, and preview pages
function Layout() {
  const { pathname } = useLocation();
  const isShell = pathname === '/login' || pathname === '/reset-password' || pathname.startsWith('/preview/') || pathname === '/purchase-success';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#020617' }}>
      {!isShell && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"                   element={<HomePage />}                                              />
          <Route path="/templates"          element={<TemplatesPage />}                                         />
          <Route path="/templates/:id"      element={<TemplateDetailPage />}                                    />
          <Route path="/categories"         element={<CategoriesPage />}                                        />
          <Route path="/login"              element={<LoginPage />}                                             />
          <Route path="/purchase-success"   element={<PurchaseSuccessPage />}                                   />
          <Route path="/dashboard"          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}        />
          <Route path="/wishlist"           element={<WishlistPage />}                                          />
          <Route path="/about"             element={<AboutPage />}                                             />
          <Route path="/terms"              element={<TermsPage />}                                             />
          <Route path="/privacy"            element={<PrivacyPage />}                                           />
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
      </main>
      {!isShell && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
