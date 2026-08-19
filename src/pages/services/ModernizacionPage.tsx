/**
 * Landing Page: Modernización de Sistemas
 * Identidad: Ámbar, enfoque en transformación de sistemas legacy
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export function ModernizacionPage() {
  const t = useT();
  useDocumentMeta({
    title: "Modernización de Sistemas",
    description: "Convertimos sistemas legacy en plataformas modernas sin detener tu operación. Migración incremental, cero downtime, valor desde la primera semana.",
    path: "/services/modernizacion",
    type: "service",
    keywords: ["modernización", "sistemas legacy", "migración", "transformación digital", "strangler fig"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-500/20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-sm font-medium mb-6">
              {t({ es: "Transformación digital", en: "Digital transformation" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "Modernización de Sistemas", en: "System Modernization" })}
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              {t({
                es: "Convertimos sistemas legacy en plataformas modernas sin detener tu operación. Migración incremental, cero downtime, valor desde la primera semana.",
                en: "We turn legacy systems into modern platforms without stopping your operation. Incremental migration, zero downtime, value from week one.",
              })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-600/30"
              >
                {t({ es: "Iniciar proyecto", en: "Start project" })}
              </a>
              <Link
                to="/casos-exito"
                className="px-8 py-4 bg-transparent border-2 border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-white font-semibold rounded-lg transition-all"
              >
                {t({ es: "Ver casos de éxito", en: "View case studies" })}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas que Resolvemos */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t({ es: "Qué resolvemos", en: "What we solve" })}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: { es: "Sistemas que no escalan", en: "Systems that can't scale" },
                desc: { es: "Arquitecturas monolíticas que colapsan ante el crecimiento.", en: "Monolithic architectures that collapse under growth." }
              },
              {
                title: { es: "Tecnología obsoleta", en: "Obsolete technology" },
                desc: { es: "Stacks sin soporte, sin seguridad y sin desarrolladores disponibles.", en: "Stacks without support, security, or available developers." }
              },
              {
                title: { es: "Integraciones imposibles", en: "Impossible integrations" },
                desc: { es: "Sistemas que no hablan entre sí y generan procesos manuales.", en: "Systems that don't talk to each other, creating manual processes." }
              },
              {
                title: { es: "Costo de mantenimiento creciente", en: "Rising maintenance costs" },
                desc: { es: "Cada cambio cuesta más y tarda más con el tiempo.", en: "Every change costs more and takes longer over time." }
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-amber-100">{t(item.title)}</h3>
                <p className="text-slate-400">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="py-20 bg-gradient-to-b from-amber-950/30 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t({ es: "Cómo lo hacemos", en: "How we do it" })}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: { es: "Auditoría y mapa de ruta", en: "Audit and roadmap" },
                desc: { es: "Análisis del sistema actual, identificación de riesgos y plan de migración incremental.", en: "Analysis of the current system, risk identification, and incremental migration plan." }
              },
              {
                title: { es: "Migración incremental (Strangler Fig)", en: "Incremental migration (Strangler Fig)" },
                desc: { es: "Reemplazamos módulos uno a uno sin detener la operación. Cero big-bang.", en: "We replace modules one by one without stopping operations. No big-bang." }
              },
              {
                title: { es: "Arquitectura moderna", en: "Modern architecture" },
                desc: { es: "Microservicios, APIs, cloud-native y observabilidad desde el inicio.", en: "Microservices, APIs, cloud-native and observability from the start." }
              },
              {
                title: { es: "Transferencia de conocimiento", en: "Knowledge transfer" },
                desc: { es: "Tu equipo aprende el nuevo stack durante la migración, no después.", en: "Your team learns the new stack during migration, not after." }
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-amber-100">{t(item.title)}</h3>
                  <p className="text-slate-400">{t(item.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t({ es: "Cuándo aplica", en: "When it applies" })}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { es: "Sistemas ERP/CRM legacy que necesitan integrarse", en: "Legacy ERP/CRM systems that need integration" },
              { es: "Aplicaciones mainframe o desktop que deben ir a la nube", en: "Mainframe or desktop apps that need to go to the cloud" },
              { es: "Monolitos que necesitan escalar a microservicios", en: "Monoliths that need to scale to microservices" },
              { es: "Sistemas con stack EOL que representan riesgo de seguridad", en: "Systems with EOL stack representing security risk" }
            ].map((useCase, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-amber-900/30 to-slate-800/50 border border-amber-500/20 rounded-xl">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-amber-100 font-medium">{t(useCase)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t({ es: "¿Tu sistema te frena?", en: "Is your system holding you back?" })}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            {t({ es: "Cuéntanos sobre tu sistema actual y te proponemos una ruta de modernización realista.", en: "Tell us about your current system and we'll propose a realistic modernization path." })}
          </p>
          <a
            href="#contacto"
            className="inline-block px-10 py-5 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl"
          >
            {t({ es: "Hablemos", en: "Let's talk" })}
          </a>
        </div>
      </section>
    </div>
  );
}