import { ArrowRight } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { methodPage, methodSteps, principles, principlesTitle } from "../content/methodology";
import { Reveal, Button, Eyebrow } from "../components/primitives";
import { useContact } from "../components/contact";

export function MethodologyPage() {
  const t = useT();
  const { open } = useContact();
  useDocumentMeta({
    title: t(methodPage.eyebrow),
    description: t(methodPage.lede),
    path: "/metodologia",
  });
  return (
    <>
      <div className="relative overflow-hidden border-b border-border pb-16 pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            ~/farutech/metodologia
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t(methodPage.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(methodPage.lede)}</p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>{t(methodPage.eyebrow)}</Eyebrow>
          <Reveal className="mt-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              {methodSteps.map((s) => (
                <div key={s.num} className="bg-card p-7 transition-colors hover:bg-surface">
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

          <div className="mt-20">
            <Eyebrow>{t(principlesTitle)}</Eyebrow>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title.es} delay={(i % 2) * 0.06} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Button onClick={open} size="lg">
              {t(methodPage.aplicar)} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
