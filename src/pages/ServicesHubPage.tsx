import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { capabilities, capUI } from "../content/capabilities";
import { CapabilityCard } from "../components/patterns";

export function CapabilitiesPage() {
  const t = useT();
  useDocumentMeta({
    title: t(capUI.eyebrow),
    description: t(capUI.lede),
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
            {t(capUI.titleA)} <span className="text-gradient">{t(capUI.titleB)}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(capUI.lede)}</p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <CapabilityCard key={c.slug} cap={c} delay={(i % 3) * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
