/**
 * Prerender estático. Genera HTML indexable por ruta (SEO-first).
 *
 * Uso:  npm run build:seo
 *   = vite build                       (cliente)
 *   + vite build --ssr entry-server    (bundle SSR)
 *   + node scripts/prerender.mjs       (este script)
 *
 * Resultado: dist/<ruta>/index.html con el contenido ya renderizado + meta por ruta,
 * listo para servir desde cualquier hosting estático/CDN.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

const template = fs.readFileSync(path.resolve(dist, "index.html"), "utf-8");
const { render } = await import(path.resolve(dist, "server", "entry-server.js"));

const SITE = "https://www.farutech.com";
const BRAND = "FaruTech";

const capNames = {
  "desarrollo-software": "Desarrollo de Software a Medida",
  "plataformas-saas": "Plataformas SaaS y Multi-Tenant",
  "soluciones-empresariales": "Soluciones Empresariales",
  "ia-automatizacion": "IA y Automatización",
  "ux-engineering": "UX Engineering",
};

/** title + description por ruta (se inyectan en el HTML estático). */
const routeMeta = {
  "/": {
    title: `${BRAND} · Desarrollo de software a medida y plataformas SaaS`,
    description:
      "Desarrollo de software a medida, plataformas SaaS multi-tenant y soluciones empresariales. Ingeniería senior desde Colombia. Bogotá · Cali · Remoto.",
  },
  "/servicios": {
    title: `Servicios · ${BRAND}`,
    description:
      "Cinco disciplinas de ingeniería: desarrollo a medida, SaaS multi-tenant, soluciones empresariales, IA y automatización, y UX Engineering.",
  },
  "/casos-exito": {
    title: `Casos de Éxito · ${BRAND}`,
    description: "Trabajo real con clientes reales: Afilamos Hermanos y Supraeventos. Stack tecnológico e impacto medible.",
  },
  "/nosotros": {
    title: `Nosotros · ${BRAND}`,
    description: "Un colectivo de ingeniería, primero. Distribuidos por diseño, con presencia en Bogotá y Cali.",
  },
  "/ecosistema": {
    title: `Ecosistema · ${BRAND}`,
    description:
      "El front door de un ecosistema en construcción: plataforma multi-tenant, marketplace y portal de clientes.",
  },
  "/privacidad": {
    title: `Privacidad · ${BRAND}`,
    description: "Política de privacidad de FaruTech. Sin cookies de rastreo, sin venta de datos.",
  },
  "/terminos": {
    title: `Términos de uso · ${BRAND}`,
    description: "Términos de uso del sitio de FaruTech.",
  },
};

for (const [slug, name] of Object.entries(capNames)) {
  routeMeta[`/servicios/${slug}`] = {
    title: `${name} · ${BRAND}`,
    description: `${name} en ${BRAND}. Ingeniería senior, desde el primer commit hasta el runbook.`,
  };
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function buildHtml(url) {
  const appHtml = render(url);
  const meta = routeMeta[url] || routeMeta["/"];
  const canonical = `${SITE}${url}`;

  let html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = html.replace(/<meta[^>]*name="description"[^>]*>/, `<meta name="description" content="${esc(meta.description)}" />`);
  html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta[^>]*property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta[^>]*property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  html = html.replace(/<meta[^>]*property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  return html;
}

let count = 0;
for (const url of Object.keys(routeMeta)) {
  const html = buildHtml(url);
  const dir = url === "/" ? dist : path.resolve(dist, url.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.resolve(dir, "index.html"), html);
  count++;
  console.log(`  ✓ ${url}`);
}

console.log(`\nPrerender completado: ${count} rutas con HTML estático → dist/`);
