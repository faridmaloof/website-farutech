import { useEffect } from "react";

const SITE_NAME = "FaruTech";
const ORIGIN = "https://www.farutech.com";

interface MetaInput {
  /** Título de la página (sin el sufijo del sitio). */
  title?: string;
  description: string;
  /** Ruta interna, p. ej. "/capacidades". Se usa para canonical y og:url. */
  path?: string;
}

/**
 * SEO por ruta en el cliente: title, description, Open Graph y canonical.
 * Nota: esto cubre crawlers que ejecutan JS. El prerender estático
 * (siguiente fase) hará el HTML indexable sin JS — ver README.
 */
export function useDocumentMeta({ title, description, path }: MetaInput) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · ${SITE_NAME}`
      : `${SITE_NAME} · Desarrollo de software a medida y plataformas SaaS`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:site_name", SITE_NAME);

    if (path) {
      const url = `${ORIGIN}${path}`;
      upsertMeta("property", "og:url", url);
      upsertLink("canonical", url);
    }
  }, [title, description, path]);
}

function upsertMeta(kind: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
