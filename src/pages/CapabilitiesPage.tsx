import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { siteConfig } from "../content/site.config";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export function CapabilitiesPage() {
  useDocumentMeta({
    title: "Soluciones y Capacidades",
    description: "Conoce nuestras capacidades de ingeniería de software a medida.",
    path: "/capacidades",
  });
  return (
    <>
      <div className="relative overflow-hidden border-b border-border pb-16 pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            ~/farutech/capacidades
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Ingeniería que <span className="text-gradient">resuelve</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Construimos plataformas modulares adaptadas a cada necesidad técnica y de negocio.</p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.solutions.map((c, i) => (
              <div
                key={c.slug}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-elevated",
                  i === 0 || i === 3 ? "md:col-span-2" : ""
                )}
              >
                <div className="h-44 shrink-0 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.color}1f, transparent 70%)` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 font-mono text-[10px] font-semibold tracking-[0.35em] text-foreground/70">{c.slug.toUpperCase()}</span>
                  <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} aria-hidden="true" />
                </div>
                <div className="flex flex-col p-6 flex-1">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em]" style={{ color: c.color }}>[ 0{i + 1} ]</span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">{c.shortDescription}</p>
                  <a href={`/capacidades/${c.slug}`} className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-80" style={{ color: c.color }}>
                    VER SOLUCIÓN <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
