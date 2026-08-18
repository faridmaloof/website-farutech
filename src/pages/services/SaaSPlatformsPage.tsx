/**
 * Landing Page: Plataformas SaaS y Multi-Tenant
 * Identidad: Violeta/Verde, enfoque en escalabilidad y tecnología moderna
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";

export function PlataformasSaaSPage() {
  const t = useT();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-violet-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/saas-hero.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-emerald-500/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-violet-500/20 border border-violet-400/30 rounded-full text-violet-300 text-sm font-medium mb-6">
              {t({ es: "Escalabilidad garantizada", en: "Guaranteed scalability" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "Plataformas SaaS y Multi-Tenant", en: "SaaS & Multi-Tenant Platforms" })}
            </h1>
            <p className="text-xl md:text-2xl text-violet-100 mb-8 leading-relaxed">
              {t({ es: "Productos multi-tenant listos para escalar: aislamiento por organización, autenticación única y una sola base de código para todos tus clientes.", en: "Multi-tenant products ready to scale: per-organization isolation, single sign-on and one codebase for all your customers." })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-violet-600/30">
                {t({ es: "Escalar mi producto", en: "Scale my product" })}
              </a>
              <Link to="/casos-exito" className="px-8 py-4 bg-transparent border-2 border-violet-400/50 hover:border-violet-400 text-violet-300 hover:text-white font-semibold rounded-lg transition-all">
                {t({ es: "Ver casos de éxito", en: "View case studies" })}
              </Link>
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
              { title: { es: "Un despliegue por cliente", en: "One deployment per customer" }, desc: { es: "Cada cliente nuevo implica más infraestructura, más costo y más riesgo.", en: "Every new customer means more infrastructure, more cost and more risk." } },
              { title: { es: "Datos sin aislamiento", en: "Data without isolation" }, desc: { es: "El riesgo de que un tenant vea datos de otro es inaceptable.", en: "The risk of one tenant seeing another's data is unacceptable." } },
              { title: { es: "Provisioning manual", en: "Manual provisioning" }, desc: { es: "Dar de alta un cliente toma días y depende de una persona.", en: "Onboarding a customer takes days and depends on one person." } },
              { title: { es: "Autenticación repetida", en: "Repeated authentication" }, desc: { es: "Usuarios que deben iniciar sesión en cada instancia por separado.", en: "Users forced to log in to each instance separately." } }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-violet-500/50 transition-all">
                <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-violet-100">{t(item.title)}</h3>
                <p className="text-slate-400">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="py-20 bg-gradient-to-b from-violet-950/30 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">{t({ es: "Cómo lo hacemos", en: "How we do it" })}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { title: { es: "Aislamiento por diseño", en: "Isolation by design" }, desc: { es: "Row-Level Security y scopes por organización: el aislamiento lo garantiza la base de datos.", en: "Row-Level Security and per-organization scopes: isolation enforced by the database." } },
              { title: { es: "Autenticación única (SSO)", en: "Single sign-on (SSO)" }, desc: { es: "OIDC con un IdP central: entras una vez y accedes a tus instancias sin re-autenticarte.", en: "OIDC with a central IdP: sign in once and access your instances without re-authenticating." } },
              { title: { es: "Provisioning automatizado", en: "Automated provisioning" }, desc: { es: "Alta de tenants en minutos, no en días, con configuración por organización.", en: "Tenant onboarding in minutes, not days, with per-organization configuration." } },
              { title: { es: "Una base de código", en: "One codebase" }, desc: { es: "Todos los clientes sobre la misma versión: menos bugs, más velocidad.", en: "All customers on the same version: fewer bugs, more speed." } }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">{i + 1}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-100">{t(item.title)}</h3>
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
          <h2 className="text-4xl font-bold mb-12 text-center">{t({ es: "Cuándo aplica", en: "When it applies" })}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { es: "SaaS B2B con múltiples organizaciones", en: "B2B SaaS with multiple organizations" },
              { es: "Plataformas con instancias por cliente", en: "Platforms with per-customer instances" },
              { es: "Productos que requieren aislamiento de datos", en: "Products requiring data isolation" },
              { es: "Ecosistemas con portal y marketplace", en: "Ecosystems with portal and marketplace" }
            ].map((useCase, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-violet-900/30 to-slate-800/50 border border-violet-500/20 rounded-xl">
                <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-violet-100 font-medium">{t(useCase)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-emerald-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t({ es: "¿Listo para escalar?", en: "Ready to scale?" })}</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">{t({ es: "Transforma tu producto en una plataforma SaaS escalable y segura.", en: "Transform your product into a scalable and secure SaaS platform." })}</p>
          <a href="#contacto" className="inline-block px-10 py-5 bg-white text-violet-600 font-bold rounded-lg hover:bg-violet-50 transition-all transform hover:scale-105 shadow-xl">{t({ es: "Hablemos", en: "Let's talk" })}</a>
        </div>
      </section>
    </div>
  );
}
