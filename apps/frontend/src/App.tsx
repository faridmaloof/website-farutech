/**
 * App — providers (i18n + drawer de contacto) + rutas + layout.
 * El router lo pone el entrypoint: BrowserRouter en cliente, StaticRouter en el prerender SSR.
 * El contacto ya no es una página: es un drawer que se abre desde cualquier CTA.
 */
import { useEffect } from "react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { I18nProvider } from "./i18n";
import type { Lang } from "./i18n";
import { ContactProvider } from "./components/contact";
import { SiteLayout } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { ServicesHubPage } from "./pages/ServicesHubPage";
import { ServiceLandingPage } from "./pages/services/ServiceLandingPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLeadsPage from "./pages/AdminLeadsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App({ initialLang }: { initialLang?: Lang }) {
  return (
    <I18nProvider initialLang={initialLang}>
      <ContactProvider>
        <Routes>
          {/* Admin Panel Routes - sin layout del sitio */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/leads" element={<AdminLeadsPage />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Main Site Routes — ruta layout sin `path`: envuelve a todos los hijos
              con SiteLayout sin romper el matching de URLs profundas. Las rutas
              anidadas dentro de un elemento NO participan del matching del padre,
              por lo que un `<Routes>` descendiente bajo path="/" dejaba todas las
              rutas profundas sin match ("No routes matched location ..."). */}
          <Route
            element={
              <SiteLayout>
                <ScrollToTop />
                <Outlet />
              </SiteLayout>
            }
          >
            <Route path="/" element={<HomePage />} />

            {/* Servicios — rutas EN canónicas (slugs en inglés) */}
            <Route path="/services" element={<ServicesHubPage />} />
            <Route path="/services/:slug" element={<ServiceLandingPage />} />

            {/* Servicios — rutas ES alternas (slugs en español) */}
            <Route path="/servicios" element={<ServicesHubPage />} />
            <Route path="/servicios/:slug" element={<ServiceLandingPage />} />

            {/* Casos de éxito y Nosotros */}
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/casos-exito" element={<CaseStudiesPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/nosotros" element={<AboutUsPage />} />

            {/* Otras páginas */}
            <Route path="/ecosistema" element={<EcosystemPage />} />
            <Route path="/privacidad" element={<LegalPage kind="privacidad" />} />
            <Route path="/terminos" element={<LegalPage kind="terminos" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ContactProvider>
    </I18nProvider>
  );
}
