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
          <Route path="/preview/nexus"      element={<NexusCorporatePreview />}    />
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
