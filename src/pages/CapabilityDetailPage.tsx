import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { getCapability, capUI } from "../content/capabilities";
import { Button, Tag, Reveal } from "../components/primitives";
import { useContact } from "../components/contact";
import { NotFoundPage } from "./NotFoundPage";

export function CapabilityDetailPage() {
  const { slug } = useParams();
  const cap = getCapability(slug);
  const t = useT();
  const { open } = useContact();

  useDocumentMeta({
    title: cap ? t(cap.name) : t(capUI.notFound),
    description: cap ? t(cap.short) : t(capUI.notFoundDesc),
    path: cap ? `/servicios/${cap.slug}` : undefined,
  });

  if (!cap) return <NotFoundPage />;

  return (
    <>
      <div className="relative overflow-hidden border-b border-border pb-16 pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t(capUI.volver)}
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="font-mono text-sm font-semibold" style={{ color: cap.accent }}>
              {cap.index}
            </span>
            {cap.flag && (
              <span className="rounded-full border border-spark/30 bg-spark/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-spark">
                {t(cap.flag)}
              </span>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t(cap.name)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(cap.intro)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cap.tags.map((tag) => (
              <Tag key={tag.es}>{t(tag)}</Tag>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{t(capUI.problems)}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {cap.problems.map((p, i) => (
              <Reveal key={p.title.es} delay={(i % 2) * 0.06} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{t(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight md:text-3xl">{t(capUI.approach)}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {cap.approach.map((a, i) => (
              <Reveal key={a.title.es} delay={(i % 2) * 0.06} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{t(a.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(a.desc)}</p>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight md:text-3xl">{t(capUI.useCases)}</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {cap.useCases.map((uc) => (
              <li key={uc.es} className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm text-foreground">
                <span className="mt-0.5 text-spark" aria-hidden="true">▸</span>
                {t(uc)}
              </li>
            ))}
          </ul>

          <Reveal className="mt-20 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative px-8 py-12 md:px-14">
              <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="font-display text-3xl font-semibold tracking-tight">{t(capUI.ctaTitle)}</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">{t(capUI.ctaDesc)}</p>
                <div className="mt-6">
                  <Button onClick={open} size="lg">
                    {t(capUI.ctaButton)} <ArrowRight className="h-4 w-4" />
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
