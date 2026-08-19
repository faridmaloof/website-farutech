/**
 * Landing Page: Soluciones Empresariales
 * Identidad: Naranja/Rojo, enfoque en integración y robustez empresarial
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export function EnterpriseSolutionsPage() {
  const t = useT();
  useDocumentMeta({
    title: "Soluciones Empresariales",
    description: "Soluciones empresariales a medida: ERP, CRM, BI y sistemas de gestión integrados con tu operación.",
    path: "/services/soluciones-empresariales",
    type: "service",
    keywords: ["soluciones empresariales", "ERP", "CRM", "sistemas de gestión", "BI"],
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/enterprise-hero.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-500/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium mb-6">
              {t({ es: "Integración empresarial", en: "Enterprise integration" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "Soluciones Empresariales", en: "Enterprise Solutions" })}
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              {t({ es: "Sistemas internos, integraciones ERP/CRM y automatización de la operación crítica de tu empresa, con rigor de ingeniería.", en: "Internal systems, ERP/CRM integrations and automation of your company's critical operations, with engineering rigor." })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30">{t({ es: "Optimizar operaciones", en: "Optimize operations" })}</a>
              <Link to="/casos-exito" className="px-8 py-4 bg-transparent border-2 border-orange-400/50 hover:border-orange-400 text-orange-300 hover:text-white font-semibold rounded-lg transition-all">{t({ es: "Ver casos de éxito", en: "View case studies" })}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas que Resolvemos */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">{t({ es: "Qué resolvemos", en: "What we solve" })}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: { es: "Sistemas que no se hablan", en: "Systems that don't talk to each other" }, desc: { es: "ERP, CRM y herramientas internas que no comparten datos.", en: "ERP, CRM and internal tools that don't share data." } },
              { title: { es: "Procesos manuales", en: "Manual processes" }, desc: { es: "Operaciones críticas que dependen de personas y hojas de cálculo.", en: "Critical operations that depend on people and spreadsheets." } },
              { title: { es: "Datos duplicados", en: "Duplicated data" }, desc: { es: "La misma información en varios lugares, sin fuente única de verdad.", en: "The same information in several places, with no single source of truth." } },
              { title: { es: "Falta de trazabilidad", en: "Lack of traceability" }, desc: { es: "No se sabe quién hizo qué ni cuándo en los procesos clave.", en: "No one knows who did what and when in key processes." } }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-orange-500/50 transition-all">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-orange-100">{t(item.title)}</h3>
                <p className="text-slate-400">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="py-20 bg-gradient-to-b from-orange-950/30 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">{t({ es: "Cómo lo hacemos", en: "How we do it" })}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { title: { es: "Integraciones robustas", en: "Robust integrations" }, desc: { es: "Conectores y APIs que mantienen tus sistemas sincronizados, con monitoreo.", en: "Connectors and APIs that keep your systems in sync, with monitoring." } },
              { title: { es: "Automatización de flujos", en: "Workflow automation" }, desc: { es: "Los procesos repetitivos se automatizan; las personas deciden.", en: "Repetitive processes are automated; people make the decisions." } },
              { title: { es: "Fuente única de verdad", en: "Single source of truth" }, desc: { es: "Modelos de datos claros para que la información sea confiable.", en: "Clear data models so information is trustworthy." } },
              { title: { es: "Auditoría y trazabilidad", en: "Audit and traceability" }, desc: { es: "Cada acción queda registrada para cumplir y mejorar.", en: "Every action is logged for compliance and improvement." } }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">{i + 1}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-100">{t(item.title)}</h3>
                  <p className="text-slate-400">{t(item.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t({ es: "¿Operaciones desconectadas?", en: "Disconnected operations?" })}</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">{t({ es: "Conectamos y automatizamos tu operación para que funcione como un reloj.", en: "We connect and automate your operation to run like clockwork." })}</p>
          <a href="#contacto" className="inline-block px-10 py-5 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl">{t({ es: "Hablemos", en: "Let's talk" })}</a>
        </div>
      </section>
    </div>
  );
}
