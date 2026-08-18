/**
 * Landing Page: Desarrollo de Software a Medida
 * Identidad: Azul profesional, enfoque en ingeniería robusta
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";

export function DesarrolloSoftwarePage() {
  const t = useT();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/software-hero.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              {t({ es: "Servicio principal", en: "Core service" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "Desarrollo de Software a Medida", en: "Custom Software Development" })}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t({ es: "Sistemas diseñados y construidos para tu operación: desde el primer commit hasta producción, sin atajos ni deuda escondida.", en: "Systems designed and built for your operation: from the first commit to production, with no shortcuts and no hidden debt." })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                {t({ es: "Iniciar proyecto", en: "Start project" })}
              </a>
              <Link
                to="/casos-exito"
                className="px-8 py-4 bg-transparent border-2 border-blue-400/50 hover:border-blue-400 text-blue-300 hover:text-white font-semibold rounded-lg transition-all"
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
                title: { es: "Software genérico que no encaja", en: "Generic software that doesn't fit" },
                desc: { es: "Los paquetes comerciales obligan a adaptar tu operación a sus límites.", en: "Off-the-shelf packages force your operation to adapt to their limits." }
              },
              {
                title: { es: "Desarrollos que no llegan a producción", en: "Projects that never reach production" },
                desc: { es: "Prototipos eternos y proyectos que se estancan antes de generar valor.", en: "Endless prototypes and projects that stall before creating value." }
              },
              {
                title: { es: "Deuda técnica acumulada", en: "Accumulated technical debt" },
                desc: { es: "Código frágil que frena cada nuevo cambio y encarece el futuro.", en: "Fragile code that slows every change and makes the future more expensive." }
              },
              {
                title: { es: "Decisiones sin documentar", en: "Undocumented decisions" },
                desc: { es: "Conocimiento que vive en la cabeza de una persona y se pierde.", en: "Knowledge that lives in one person's head and gets lost." }
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-100">{t(item.title)}</h3>
                <p className="text-slate-400">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="py-20 bg-gradient-to-b from-blue-950/30 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t({ es: "Cómo lo hacemos", en: "How we do it" })}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: { es: "Producción desde el primer commit", en: "Production from the first commit" },
                desc: { es: "CI/CD, pruebas y despliegue continuo desde el inicio; el software se usa, no se espera.", en: "CI/CD, tests and continuous deployment from day one; the software is used, not waited for." }
              },
              {
                title: { es: "Decisiones documentadas (ADR)", en: "Documented decisions (ADR)" },
                desc: { es: "Cada elección de arquitectura queda registrada: qué, por qué y qué se descartó.", en: "Every architecture choice is recorded: what, why, and what was discarded." }
              },
              {
                title: { es: "Deuda técnica controlada", en: "Controlled technical debt" },
                desc: { es: "Se identifica, se presupuesta y se paga; no se acumula en silencio.", en: "It's identified, budgeted and paid down; never silently accumulated." }
              },
              {
                title: { es: "Código que tu equipo puede heredar", en: "Code your team can inherit" },
                desc: { es: "Estándares claros y documentación para que el sistema sobreviva a sus autores.", en: "Clear standards and documentation so the system outlives its authors." }
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-100">{t(item.title)}</h3>
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
              { es: "Aplicaciones web internas y de cara al cliente", en: "Internal and customer-facing web apps" },
              { es: "APIs y servicios para integrar sistemas existentes", en: "APIs and services to integrate existing systems" },
              { es: "Productos digitales desde cero (MVP a producción)", en: "Digital products from scratch (MVP to production)" },
              { es: "Sistemas críticos que no pueden fallar", en: "Critical systems that can't fail" }
            ].map((useCase, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-blue-900/30 to-slate-800/50 border border-blue-500/20 rounded-xl">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-blue-100 font-medium">{t(useCase)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t({ es: "¿Tienes un proyecto así?", en: "Have a project like this?" })}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t({ es: "Cuéntanos y te decimos con honestidad si podemos ayudarte, y cómo.", en: "Tell us and we'll honestly tell you if we can help, and how." })}
          </p>
          <a
            href="#contacto"
            className="inline-block px-10 py-5 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
          >
            {t({ es: "Hablemos", en: "Let's talk" })}
          </a>
        </div>
      </section>
    </div>
  );
}
