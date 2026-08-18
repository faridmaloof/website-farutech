/**
 * Sections — bloques de la home, fieles a la estética del refactor
 * (mesh + glow + noise, texto con gradiente, botones rounded-full).
 */
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { hero, ecosystem, tickerItems, finalCta } from "../content/home";
import { siteConfig } from "../content/site.config";
import { caseStudies } from "../content/work";
import { methodSteps, methodPage } from "../content/methodology";
import { site } from "../content/site";
import { LOGO_URL } from "../components/Logo";
import { Button, SectionHeading, Reveal, StatusBadge } from "../components/primitives";
import { Marquee } from "../components/patterns";
import { useContact } from "../components/contact";
import { useT } from "../i18n";
import { cn } from "../lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];



/* ---------- Hero ---------- */
export function Hero() {
  const t = useT();
  const { open } = useContact();
  return (
    <section className="noise relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-44" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-glow opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          {t(hero.badge)}
        </motion.div>

        <div className="mt-8 grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]"
            >
              {t(hero.title1)}
              <br />
              <span className="text-gradient">{t(hero.title2)}</span>
              <br />
              <span className="text-gradient">{t(hero.title3)}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {t(hero.sub)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button onClick={open} size="lg">
                {t(hero.primary)} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/metodologia" size="lg" variant="outline">
                {t(hero.secondary)}
              </Button>
            </motion.div>

            <p className="mt-6 font-mono text-xs text-muted-foreground">{t(hero.note)}</p>
          </div>

          {/* Visual: logo oficial con glow + chips flotantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative hidden items-center justify-center md:flex"
            aria-hidden="true"
          >
            <div className="border-gradient relative rounded-3xl bg-surface/40 p-12 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-glow opacity-50" />
              <img src={LOGO_URL} alt="" className="relative h-40 w-40 animate-float" />
            </div>
            <span className="absolute -left-4 top-10 animate-float rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur" style={{ animationDelay: "0.5s" }}>
              Multi-tenant
            </span>
            <span className="absolute -right-2 bottom-12 animate-float rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur" style={{ animationDelay: "1.2s" }}>
              SSO · OIDC
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee de disciplinas ---------- */
export function MarqueeSection() {
  return <Marquee items={tickerItems} />;
}

/* ---------- Capacidades (mosaico) ---------- */
export function CapabilitiesSection() {
  return (
    <section className="relative py-24 md:py-32" id="capacidades" aria-labelledby="cap-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Soluciones"
          index="[ 01 ]"
          title={<>Ingeniería que <span className="text-gradient">resuelve</span></>}
          lede="Construimos plataformas modulares adaptadas a cada necesidad."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.solutions.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={(i % 3) * 0.06}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trabajo (caso real) ---------- */
export function WorkSection() {
  const featuredCases = caseStudies.filter(c => c.featured).slice(0, 3);
  return (
    <section className="relative py-24 md:py-32" id="trabajo" aria-labelledby="work-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading 
          eyebrow="Casos de Éxito" 
          index="[ 02 ]" 
          title="Resultados que hablan" 
          lede="Proyectos en los que hemos implementado soluciones clave." 
        />
        <div className="mt-12 grid gap-8">
          {featuredCases.map((c) => (
            <Reveal key={c.id}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent" aria-hidden="true" />
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
                  <div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      <span className="text-accent">CASO REAL</span>
                      <span>{c.industry}</span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{c.client}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{c.solution}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button to={`/casos-de-exito`} variant="outline" size="sm">
                        Ver caso <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 self-center">
                    {c.metrics.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
                      >
                        <span className="text-sm font-medium">{item.label}</span>
                        <StatusBadge status="live" label={item.value} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Metodología ---------- */
export function MethodSection() {
  const t = useT();
  return (
    <section className="relative py-24 md:py-32" id="metodologia" aria-labelledby="method-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={t(methodPage.eyebrow)} index="[ 03 ]" title={t(methodPage.title)} lede={t(methodPage.lede)} />
        <Reveal className="mt-12">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {methodSteps.map((s) => (
              <div key={s.num} className="group bg-card p-7 transition-colors hover:bg-surface">
                <span className="font-mono text-sm font-semibold text-spark">{s.num}</span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.desc)}</p>
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t(s.tag)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-8">
          <Button to="/metodologia" variant="outline">
            {t(methodPage.conocer)} <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ecosistema (teaser honesto) ---------- */
export function EcosystemSection() {
  const t = useT();
  return (
    <section className="relative py-24 md:py-32" id="ecosistema" aria-labelledby="eco-title">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="border-gradient relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
            <div className="relative">
              <SectionHeading eyebrow={t(ecosystem.eyebrow)} index="[ 04 ]" title={t(ecosystem.title)} lede={t(ecosystem.lede)} />
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {ecosystem.items.map((item) => (
                  <div key={item.name.es} className="rounded-2xl border border-border bg-background/50 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold">{t(item.name)}</h3>
                      <StatusBadge status={item.tone} label={t(item.status)} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(item.desc)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button to="/ecosistema" variant="outline">
                  {t(ecosystem.cta)} <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CTA final ---------- */
export function FinalCTA() {
  const t = useT();
  const { open } = useContact();
  return (
    <section className="relative py-24 md:py-32" id="contacto" aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" aria-hidden="true" />
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 bg-glow opacity-60"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-title" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {t(finalCta.title1)} <span className="text-gradient">{t(finalCta.title2)}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t(finalCta.desc)}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={open} size="lg">
                  {t(site.ui.empezar)} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`mailto:${site.email}`} size="lg" variant="outline">
                  {site.email}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
