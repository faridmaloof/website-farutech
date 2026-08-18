import { useParams } from "react-router-dom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { siteConfig } from "../content/site.config";
import PageBuilder from "../components/PageBuilder";
import { NotFoundPage } from "./NotFoundPage";

export function CapabilityDetailPage() {
  const { slug } = useParams();
  const solution = siteConfig.solutions.find((s) => s.slug === slug);

  useDocumentMeta({
    title: solution ? solution.seo.title : "No encontrado",
    description: solution ? solution.seo.description : "",
    path: solution ? `/capacidades/${solution.slug}` : undefined,
  });

  if (!solution) return <NotFoundPage />;

  return (
    <div className="pt-24 pb-16">
      <PageBuilder blocks={solution.blocks} serviceTheme={solution.slug} />
    </div>
  );
}
