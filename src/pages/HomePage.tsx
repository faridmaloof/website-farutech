import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useT } from "../i18n";
import { hero } from "../content/home";
import {
  Hero,
  MarqueeSection,
  CapabilitiesSection,
  WorkSection,
  MethodSection,
  EcosystemSection,
  FinalCTA,
} from "../sections/home";

export function HomePage() {
  const t = useT();
  useDocumentMeta({
    description: t(hero.sub),
    path: "/",
  });
  return (
    <>
      <Hero />
      <MarqueeSection />
      <CapabilitiesSection />
      <WorkSection />
      <MethodSection />
      <EcosystemSection />
      <FinalCTA />
    </>
  );
}
