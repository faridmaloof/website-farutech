/**
 * Landing Page: IA y Automatización
 * Identidad: Cyan/Rosa, enfoque en innovación y tecnología futurista
 */
import { useT } from "../../i18n";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export function AIAutomationPage() {
  const t = useT();
  useDocumentMeta({
    title: "IA y Automatización",
    description: "Inteligencia artificial y automatización para tu operación: chatbots, procesamiento de documentos, predicción y workflows inteligentes.",
    path: "/services/ia-automatizacion",
    type: "service",
    keywords: ["inteligencia artificial", "IA", "automatización", "machine learning", "chatbots", "NLP"],
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/ai-hero.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-pink-500/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-6">
              {t({ es: "IA aplicada con resultados", en: "Applied AI with results" })}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t({ es: "IA y Automatización", en: "AI & Automation" })}
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 mb-8 leading-relaxed">
              {t({ es: "IA aplicada y automatización de procesos con resultados concretos. Sin humo: solo casos de uso que generan valor real.", en: "Applied AI and process automation with concrete results. No hype: only use cases that create real value." })}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-600/30">{t({ es: "Automatizar procesos", en: "Automate processes" })}</a>
              <Link to="/casos-exito" className="px-8 py-4 bg-transparent border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-lg transition-all">{t({ es: "Ver casos de éxito", en: "View case studies" })}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t({ es: "¿Listo para automatizar?", en: "Ready to automate?" })}</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">{t({ es: "Transforma procesos manuales en flujos automatizados inteligentes.", en: "Transform manual processes into intelligent automated workflows." })}</p>
          <a href="#contacto" className="inline-block px-10 py-5 bg-white text-cyan-600 font-bold rounded-lg hover:bg-cyan-50 transition-all transform hover:scale-105 shadow-xl">{t({ es: "Hablemos", en: "Let's talk" })}</a>
        </div>
      </section>
    </div>
  );
}
