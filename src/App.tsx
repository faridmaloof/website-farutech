/**
 * App — providers (i18n + drawer de contacto) + rutas + layout, SIN router.
 * El router lo pone el entrypoint: BrowserRouter en cliente, StaticRouter en el prerender SSR.
 * El contacto ya no es una página: es un drawer que se abre desde cualquier CTA.
 */
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { ContactProvider } from "./components/contact";
import { SiteLayout } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { CapabilitiesPage } from "./pages/CapabilitiesPage";
import { CapabilityDetailPage } from "./pages/CapabilityDetailPage";
import { WorkPage } from "./pages/WorkPage";
import { MethodologyPage } from "./pages/MethodologyPage";
import { StudioPage } from "./pages/StudioPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { InsightsPage } from "./pages/InsightsPage";
import { InsightDetailPage } from "./pages/InsightDetailPage";

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
            <Route path="/capacidades" element={<CapabilitiesPage />} />
            <Route path="/capacidades/:slug" element={<CapabilityDetailPage />} />
            <Route path="/trabajo" element={<WorkPage />} />
            <Route path="/metodologia" element={<MethodologyPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
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
