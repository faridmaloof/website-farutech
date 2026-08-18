export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
}

export const seededInsights: Insight[] = [{
  slug: "software-que-llega-a-produccion",
  title: "Software que llega a producción: las decisiones que evitan reescribir",
  excerpt: "Una plataforma sostenible empieza antes del primer componente: alcance claro, arquitectura documentada, entrega gradual y responsabilidad operativa.",
  publishedAt: "2026-08-17",
  readTime: "4 min de lectura",
}];
