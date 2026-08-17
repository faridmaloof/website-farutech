import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { workPage } from "../content/work";
import { caseStudies } from "../content/site.config";
import { PageBuilder } from "../components/PageBuilder";
import { useContact } from "../components/contact";

export function WorkPage() {
  const t = useT();
  const { open } = useContact();
  useDocumentMeta({
    title: t(workPage.eyebrow),
    description: t(workPage.lede),
    path: "/trabajo",
  });
  return (
    <>
      <div className="relative overflow-hidden border-b border-border pb-16 pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            ~/farutech/trabajo
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t(workPage.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(workPage.lede)}</p>
        </div>
      </div>

      {caseStudies.map((caseStudy) => <PageBuilder key={caseStudy.id} blocks={caseStudy.blocks} />)}
      <section className="pb-20"><div className="mx-auto max-w-7xl px-6"><button onClick={open} className="text-primary underline-offset-4 hover:underline">¿Quieres ser el próximo caso? Hablemos.</button></div></section>
    </>
  );
}
