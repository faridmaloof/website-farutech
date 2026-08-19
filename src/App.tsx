/**
 * App — providers (i18n + drawer de contacto) + rutas + layout.
 * El router lo pone el entrypoint: BrowserRouter en cliente, StaticRouter en el prerender SSR.
 * El contacto ya no es una página: es un drawer que se abre desde cualquier CTA.
 */
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { ContactProvider } from "./components/contact";
import { SiteLayout } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { ServicesHubPage } from "./pages/ServicesHubPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
// Landing pages individuales por servicio (en inglés)
import { SoftwareDevelopmentPage } from "./pages/services/SoftwareDevelopmentPage";
import { SaaSPlatformsPage } from "./pages/services/SaaSPlatformsPage";
import { EnterpriseSolutionsPage } from "./pages/services/EnterpriseSolutionsPage";
import { AIAutomationPage } from "./pages/services/AIAutomationPage";
import { UXEngineeringPage } from "./pages/services/UXEngineeringPage";
import { ModernizacionPage } from "./pages/services/ModernizacionPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <ContactProvider>
        <SiteLayout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Servicios - Rutas en Inglés (Estándar) */}
            <Route path="/services" element={<ServicesHubPage />} />
            <Route path="/services/desarrollo-software" element={<SoftwareDevelopmentPage />} />
            <Route path="/services/plataformas-saas" element={<SaaSPlatformsPage />} />
            <Route path="/services/soluciones-empresariales" element={<EnterpriseSolutionsPage />} />
            <Route path="/services/ia-automatizacion" element={<AIAutomationPage />} />
            <Route path="/services/ux-engineering" element={<UXEngineeringPage />} />
            <Route path="/services/modernizacion" element={<ModernizacionPage />} />
            
            {/* Redirección de rutas antiguas (Español) -> Nuevas (Inglés) */}
            <Route path="/servicios" element={<ServicesHubPage />} />
            <Route path="/servicios/desarrollo-software" element={<SoftwareDevelopmentPage />} />
            <Route path="/servicios/plataformas-saas" element={<SaaSPlatformsPage />} />
            <Route path="/servicios/soluciones-empresariales" element={<EnterpriseSolutionsPage />} />
            <Route path="/servicios/ia-automatizacion" element={<AIAutomationPage />} />
            <Route path="/servicios/ux-engineering" element={<UXEngineeringPage />} />
            <Route path="/servicios/modernizacion" element={<ModernizacionPage />} />
            
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
          </Routes>
        </SiteLayout>
      </ContactProvider>
    </I18nProvider>
  );
}
