/**
 * Trabajo (bilingüe). Casos reales y verificables.
 * Regla: solo se publica lo que existe y se puede demostrar.
 * Casos ancla: Afilamos Hermanos (sitio web + POS + gestión de órdenes) y Supraeventos (infraestructura + seguridad).
 */
import type { L } from "../i18n";

export type WorkStatus = "live" | "wip" | "dev";

export interface WorkItem {
  label: L;
  status: WorkStatus;
  statusLabel: L;
}

export const afilamos = {
  client: "Afilamos Hermanos S.A.S.",
  sector: {
    es: "Afilado industrial de herramientas · Cali, Valle del Cauca",
    en: "Industrial tool sharpening · Cali, Valle del Cauca",
  } satisfies L,
  url: "https://www.afilamoshermanos.com/",
  urlLabel: "afilamoshermanos.com",
  summary: {
    es: "Empresa de afilado industrial para los sectores maderero, metalmecánico, textil y alimentario. FaruTech desarrolló su sitio web corporativo, un sistema POS personalizado y una plataforma de gestión de órdenes con seguimiento en tiempo real.",
    en: "An industrial sharpening company serving the woodworking, metalworking, textile and food sectors. FaruTech developed their corporate website, a custom POS system, and a real-time order management platform.",
  } satisfies L,
  items: [
    {
      label: { es: "Sitio web corporativo", en: "Corporate website" } satisfies L,
      status: "live",
      statusLabel: { es: "En producción", en: "Live" } satisfies L,
    },
    {
      label: { es: "Sistema POS personalizado", en: "Custom POS system" } satisfies L,
      status: "live",
      statusLabel: { es: "En producción", en: "Live" } satisfies L,
    },
    {
      label: { es: "Gestión de órdenes", en: "Order management" } satisfies L,
      status: "live",
      statusLabel: { es: "En producción", en: "Live" } satisfies L,
    },
  ] as WorkItem[],
  tags: [
    { es: "Sitio web", en: "Website" },
    { es: "POS", en: "POS System" },
    { es: "Gestión de órdenes", en: "Order Management" },
    { es: "Operación industrial", en: "Industrial operation" },
  ] satisfies L[],
  techStack: [
    { es: "React + TypeScript", en: "React + TypeScript" },
    { es: "Node.js Backend", en: "Node.js Backend" },
    { es: "PostgreSQL", en: "PostgreSQL" },
    { es: "Tailwind CSS", en: "Tailwind CSS" },
  ] satisfies L[],
  impact: {
    es: "Digitalización completa del flujo de pedidos, reducción de errores manuales y trazabilidad total desde la solicitud hasta la entrega.",
    en: "Complete digitization of the order flow, reduction of manual errors, and full traceability from request to delivery.",
  } satisfies L,
};

export const supraeventos = {
  client: "Supraeventos",
  sector: {
    es: "Producción de eventos corporativos · Colombia",
    en: "Corporate event production · Colombia",
  } satisfies L,
  url: null,
  urlLabel: null,
  summary: {
    es: "Empresa líder en producción de eventos corporativos. FaruTech implementó soluciones de infraestructura cloud, hardening de seguridad y arquitecturas escalables para aplicaciones internas de gestión.",
    en: "Leading corporate event production company. FaruTech implemented cloud infrastructure solutions, security hardening, and scalable architectures for internal management applications.",
  } satisfies L,
  items: [
    {
      label: { es: "Infraestructura Cloud", en: "Cloud Infrastructure" } satisfies L,
      status: "live",
      statusLabel: { es: "En producción", en: "Live" } satisfies L,
    },
    {
      label: { es: "Hardening de seguridad", en: "Security Hardening" } satisfies L,
      status: "live",
      statusLabel: { es: "En producción", en: "Live" } satisfies L,
    },
    {
      label: { es: "Aplicaciones internas", en: "Internal Applications" } satisfies L,
      status: "wip",
      statusLabel: { es: "En mejora continua", en: "Continuous improvement" } satisfies L,
    },
  ] as WorkItem[],
  tags: [
    { es: "Infraestructura", en: "Infrastructure" },
    { es: "Seguridad", en: "Security" },
    { es: "Cloud", en: "Cloud" },
    { es: "Enterprise", en: "Enterprise" },
  ] satisfies L[],
  techStack: [
    { es: "AWS / GCP", en: "AWS / GCP" },
    { es: "Docker + Kubernetes", en: "Docker + Kubernetes" },
    { es: "Terraform", en: "Terraform" },
    { es: "CI/CD Pipelines", en: "CI/CD Pipelines" },
  ] satisfies L[],
  impact: {
    es: "Infraestructura escalable con 99.9% uptime, cumplimiento de estándares de seguridad enterprise y reducción de costos operativos.",
    en: "Scalable infrastructure with 99.9% uptime, compliance with enterprise security standards, and reduced operational costs.",
  } satisfies L,
};

/** Textos de la tarjeta de caso y de la página /trabajo. */
export const work = {
  casoReal: { es: "Caso real", en: "Real case" } satisfies L,
  visitar: { es: "Visitar sitio", en: "Visit site" } satisfies L,
  nextCase: { es: "¿Quieres ser el próximo caso?", en: "Want to be the next case?" } satisfies L,
  hablemos: { es: "Hablemos", en: "Let's talk" } satisfies L,
};

export const workPage = {
  eyebrow: { es: "Trabajo", en: "Work" } satisfies L,
  title: { es: "Lo que estamos construyendo, con nombre propio.", en: "What we're building, by name." } satisfies L,
  lede: {
    es: "No mostramos logos genéricos ni métricas imposibles de verificar. Mostramos trabajo real, con clientes reales, stack tecnológico y resultados honestos.",
    en: "We don't show generic logos or impossible-to-verify metrics. We show real work, with real clients, tech stacks, and honest results.",
  } satisfies L,
};
