import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { seededInsights } from "../content/insights";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { NotFoundPage } from "./NotFoundPage";

export function InsightDetailPage() {
  const { slug } = useParams(); const seeded = seededInsights.find((item) => item.slug === slug); const [remote, setRemote] = useState<{ title: string; excerpt: string; content: string } | null>(null);
  useEffect(() => { if (!seeded && slug) fetch(`/api/posts?slug=${encodeURIComponent(slug)}`).then((response) => response.ok ? response.json() : null).then((data) => { if (data?.posts?.[0]) setRemote(data.posts[0]); }).catch(() => undefined); }, [seeded, slug]);
  const insight = remote ?? seeded;
  useDocumentMeta({ title: insight?.title, description: insight?.excerpt ?? "Nota no encontrada.", path: insight && slug ? `/insights/${slug}` : undefined });
  if (!insight && !slug) return <NotFoundPage />;
  const body = remote?.content ?? "La velocidad sostenible no viene de omitir decisiones: viene de tomar las importantes temprano, dejar su contexto escrito y validar cada entrega con quienes usarán el sistema.\n\nDefinir el problema, documentar límites, entregar por incrementos y medir la operación reducen el riesgo sin frenar al equipo.";
  return <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44"><Link to="/insights" className="font-mono text-xs uppercase tracking-wider text-primary">← Notas de ingeniería</Link><p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">Nota de ingeniería</p><h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">{insight?.title ?? "Cargando nota…"}</h1><p className="mt-8 text-xl leading-relaxed text-muted-foreground">{insight?.excerpt}</p><div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/90">{body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>;
}
