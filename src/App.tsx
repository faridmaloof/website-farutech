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
import { WorkPage } from "./pages/WorkPage";
import { StudioPage } from "./pages/StudioPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
// Landing pages individuales por servicio
import { DesarrolloSoftwarePage } from "./pages/services/DesarrolloSoftwarePage";
import { PlataformasSaaSPage } from "./pages/services/PlataformasSaaSPage";
import { SolucionesEmpresarialesPage } from "./pages/services/SolucionesEmpresarialesPage";
import { IAAutomatizacionPage } from "./pages/services/IAAutomatizacionPage";
import { UXEngineeringPage } from "./pages/services/UXEngineeringPage";

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
            <Route path="/servicios" element={<CapabilitiesPage />} />
            {/* Landing pages únicas por servicio */}
            <Route path="/servicios/desarrollo-software" element={<DesarrolloSoftwarePage />} />
            <Route path="/servicios/plataformas-saas" element={<PlataformasSaaSPage />} />
            <Route path="/servicios/soluciones-empresariales" element={<SolucionesEmpresarialesPage />} />
            <Route path="/servicios/ia-automatizacion" element={<IAAutomatizacionPage />} />
            <Route path="/servicios/ux-engineering" element={<UXEngineeringPage />} />
            <Route path="/casos-exito" element={<WorkPage />} />
            <Route path="/nosotros" element={<StudioPage />} />
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
