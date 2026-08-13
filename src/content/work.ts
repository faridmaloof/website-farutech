/**
 * Trabajo (bilingüe). Casos reales y verificables.
 * Regla: solo se publica lo que existe y se puede demostrar.
 * Afilamos Hermanos es el caso ancla actual (cliente real, en curso).
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
    es: "Empresa de afilado industrial para los sectores maderero, metalmecánico, textil y alimentario, con fabricación de herramientas, venta de maquinaria y mantenimiento. FaruTech administra su presencia digital y ejecuta su modernización, del sitio web a la gestión de solicitudes.",
    en: "An industrial sharpening company serving the woodworking, metalworking, textile and food sectors, with tool manufacturing, machinery sales and maintenance. FaruTech runs its digital presence and is executing its modernization, from the website to request management.",
  } satisfies L,
  items: [
    {
      label: { es: "Administración del sitio web", en: "Website management" } satisfies L,
      status: "live",
      statusLabel: { es: "Activo", en: "Active" } satisfies L,
    },
    {
      label: { es: "Refactor del sitio web", en: "Website refactor" } satisfies L,
      status: "wip",
      statusLabel: { es: "En curso", en: "In progress" } satisfies L,
    },
    {
      label: { es: "Solución de gestión de solicitudes", en: "Request management solution" } satisfies L,
      status: "dev",
      statusLabel: { es: "En desarrollo", en: "In development" } satisfies L,
    },
  ] as WorkItem[],
  tags: [
    { es: "Sitio web", en: "Website" },
    { es: "Refactor", en: "Refactor" },
    { es: "Gestión de solicitudes", en: "Request management" },
    { es: "Operación industrial", en: "Industrial operation" },
  ] satisfies L[],
  honesty: {
    es: "Caso en curso. Los resultados se documentarán cuando cada frente entre en producción, sin cifras infladas.",
    en: "Ongoing case. Results will be documented as each workstream reaches production, with no inflated numbers.",
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
    es: "No mostramos logos genéricos ni métricas imposibles de verificar. Mostramos trabajo real, con clientes reales y su estado honesto.",
    en: "We don't show generic logos or impossible-to-verify metrics. We show real work, with real clients and their honest status.",
  } satisfies L,
};
