/**
 * ServiceLanding — página de servicio compartida (tema claro, data-driven).
 * Un solo layout para las 6 capacidades; el contenido, el acento, el motif y la
 * firma vienen de `servicesData`. La ruta (EN o ES) se resuelve en el hero/meta.
 */
import { useLocation, Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useT } from "../../i18n";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useContact } from "../../components/contact";
import { Button, SectionHeading, Reveal, Tag } from "../../components/primitives";
import { CapabilityMotif } from "../../components/patterns";
import { servicesUI } from "../../content/servicesData";
import type { Service } from "../../content/servicesData";

export function ServiceLanding({ cap }: { cap: Service }) {
  const t = useT();
  const { open } = useContact();
  const { pathname } = useLocation();
  const isEs = pathname.startsWith("/servicios");
  const routePath = isEs ? `/servicios/${cap.slugEs}` : `/services/${cap.slug}`;

  useDocumentMeta({
    title: t(cap.name),
    description: t(cap.intro),
    path: routePath,
    type: "service",
    keywords: [t(cap.name), ...cap.tags.map((g) => t(g))],
  });

  // Última palabra del nombre en gradiente (patrón de marca de los h1).
  const words = t(cap.name).split(" ");
  const tail = words.pop() ?? "";
  const head = words.join(" ");

  return (
    <>
      {/* ── Hero ── */}
      <section className="noise relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44" aria-labelledby="svc-title">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-80" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-glow opacity-50"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <nav aria-label="breadcrumb" className="mb-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
              <span className="text-foreground/70">~/farutech</span>
              <span className="text-muted-foreground">/ {isEs ? cap.slugEs : cap.slug}</span>
            </Link>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              {cap.flag && (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cap.accent }} aria-hidden="true" />
                  {t(cap.flag)}
                </span>
              )}
              <h1
                id="svc-title"
                className="mt-6 font-display text-4xl font-semibold leading-[0.98] tracking-tight md:text-5xl lg:text-6xl"
              >
                {head && (
                  <>
                    {head}{" "}
                  </>
                )}
                <span className="text-gradient">{tail}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t(cap.intro)}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button onClick={open} size="lg">
                  {t(servicesUI.ctaButton)} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button to="/services" size="lg" variant="outline">
                  {t(servicesUI.volver)} <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {cap.tags.map((g) => (
                  <Tag key={g.es}>{t(g)}</Tag>
                ))}
              </div>
            </div>

            {/* Visual decorativo (motif + firma + índice) */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="border-gradient relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6">
                <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
                <CapabilityMotif motif={cap.motif} accent={cap.accent} className="relative h-80 w-full" />
                <span
                  className="absolute right-5 top-5 font-mono text-[11px] font-semibold tracking-[0.3em]"
                  style={{ color: cap.accent }}
                >
                  {t(cap.signature)}
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-center gap-2">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">{cap.index}</span>
                  <span className="h-px flex-1" style={{ background: `${cap.accent}55` }} aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: cap.accent }}>
                    {isEs ? "servicios" : "services"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ── Qué resolvemos ── */}
      <section className="relative py-20 md:py-28" aria-labelledby="svc-problems">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t(servicesUI.problems)}
            index={`[ 0${cap.index} ]`}
            title={t(servicesUI.problems)}
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cap.problems.map((p, i) => (
              <Reveal key={p.title.es} delay={(i % 2) * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                  <span
                    className="pointer-events-none absolute -right-1 -top-5 font-mono text-6xl font-semibold text-foreground/[0.04]"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-semibold"
                    style={{ borderColor: `${cap.accent}55`, backgroundColor: `${cap.accent}14`, color: cap.accent }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo lo hacemos ── */}
      <section className="relative py-20 md:py-28" aria-labelledby="svc-approach">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t(servicesUI.approach)}
            index={`[${cap.index}.0]`}
            title={t(servicesUI.approach)}
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cap.approach.map((a, i) => (
              <Reveal key={a.title.es} delay={(i % 4) * 0.07}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6">
                  <span className="font-mono text-lg font-semibold" style={{ color: cap.accent }}>
                    {cap.index}.{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold tracking-tight">{t(a.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(a.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cuándo aplica ── */}
      <section className="relative py-20 md:py-28" aria-labelledby="svc-usecases">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t(servicesUI.useCases)}
            index={`[${cap.index}.00]`}
            title={t(servicesUI.useCases)}
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {cap.useCases.map((uc) => (
              <Reveal key={t(uc)}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${cap.accent}14` }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: cap.accent }} />
                  </span>
                  <span className="text-sm text-foreground">{t(uc)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="relative py-20 md:py-24" id="svc-cta" aria-labelledby="svc-cta-title">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="noise relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 text-center md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[560px] -translate-x-1/2 bg-glow opacity-50"
                aria-hidden="true"
              />
              <div className="relative mx-auto max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  ~/farutech-services/{cap.slug}
                </p>
                <h2 id="svc-cta-title" className="mt-6 font-display text-3xl font-semibold tracking-tight">
                  {t(servicesUI.ctaTitle)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t(servicesUI.ctaDesc)}</p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Button onClick={open} size="lg">
                    {t(servicesUI.ctaButton)} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}