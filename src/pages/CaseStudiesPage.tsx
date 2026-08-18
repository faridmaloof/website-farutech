import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { workPage, work as workUi } from "../content/work";
import { CaseCard } from "../components/patterns";
import { Reveal } from "../components/primitives";
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

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <CaseCard />
          </Reveal>
          <p className="mt-10 text-muted-foreground">
            {t(workUi.nextCase)}{" "}
            <button onClick={open} className="text-primary underline-offset-4 hover:underline">
              {t(workUi.hablemos)}
            </button>
            .
          </p>
        </div>
      </section>
    </>
  );
}
