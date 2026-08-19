/**
 * Landing Page: UX Engineering
 * Identidad: Violeta/Rosa, enfoque en diseño, accesibilidad y experiencia de usuario
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";

export function UXEngineeringPage() {
  const t = useT();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/ux-hero.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              {t({ es: "WCAG 2.2 AA Certified", en: "WCAG 2.2 AA Certified" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "UX Engineering", en: "UX Engineering" })}
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              {t({ es: "Interfaces usables, accesibles (WCAG 2.2 AA) y rápidas. Design systems y experiencia de usuario con rigor de ingeniería.", en: "Usable, accessible (WCAG 2.2 AA) and fast interfaces. Design systems and user experience with engineering rigor." })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-600/30">{t({ es: "Mejorar mi UX", en: "Improve my UX" })}</a>
              <Link to="/casos-exito" className="px-8 py-4 bg-transparent border-2 border-purple-400/50 hover:border-purple-400 text-purple-300 hover:text-white font-semibold rounded-lg transition-all">{t({ es: "Ver casos de éxito", en: "View case studies" })}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t({ es: "¿Experiencia de usuario deficiente?", en: "Poor user experience?" })}</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">{t({ es: "Transformamos interfaces complejas en experiencias intuitivas y accesibles.", en: "We transform complex interfaces into intuitive and accessible experiences." })}</p>
          <a href="#contacto" className="inline-block px-10 py-5 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl">{t({ es: "Hablemos", en: "Let's talk" })}</a>
        </div>
      </section>
    </div>
  );
}
