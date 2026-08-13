# FaruTech — Front Door (`farutech.com`)

La puerta de entrada oficial al ecosistema tecnológico de FaruTech.
**React 18 + TypeScript + Vite + Tailwind v4**, fiel a la identidad del refactor.

## Ejecutar

```bash
npm install
npm run dev        # desarrollo → http://localhost:5173
npm run build      # producción (SPA) → dist/
npm run build:seo  # producción + prerender estático por ruta (recomendado)
npm run preview    # previsualizar el build
npm run typecheck  # verificación de tipos (tsc --noEmit)
```

## Qué incluye

- **Home** — hero con mesh/glow y el logo oficial, manifiesto animado, cinta de disciplinas,
  mosaico de capacidades, caso real, método, ecosistema y CTA final.
- **Mosaico de capacidades** — Desarrollo a Medida ocupa 2 columnas, Modernización 2 filas
  y UX Engineering 2 columnas: la cuadrícula cierra sin huecos en desktop.
- **Contacto como drawer** — no hay página `/contacto`: el formulario se despliega desde la
  derecha al pulsar cualquier CTA "Empezar un proyecto" (fiel al `ContactDrawer` del refactor).
  Envía por `mailto:` (sin backend); cierra con `Esc`, clic en el fondo o el botón ×.
- **Idioma es/en** — selector ES/EN en el header y el footer. Cada texto es `{ es, en }`
  en `src/content/*`. El prerender genera español (es-first); el cliente detecta el idioma.
- **`/capacidades`** + 6 páginas de detalle data-driven (`/capacidades/:slug`).
- **`/trabajo`** — caso **Afilamos Hermanos S.A.S.** (real, en curso, enlazado a su sitio).
- **`/metodologia`**, **`/studio`**, legales y 404.
- **`/ecosistema`** — visión "en construcción": existe y es accesible por URL, pero oculta del
  nav hasta su lanzamiento (feature flag en `src/content/site.ts`).

## Contenido: qué se quitó y qué se ocultó

**Eliminado (no verificable):** las métricas `10x / 99.9% / 50+ / 47% / 40 tenants` y el badge
"Now building: … Series B fintech". Se reemplazaron por **método demostrable** (ADRs, runbooks,
CI) y por el **caso real** de Afilamos Hermanos.

**Oculto pero habilitable:** en `src/content/site.ts` hay *feature flags*
(`showEcosystemInNav`, `showEcosystemInFooter`, `showCareers`, `showStack`).
Las rutas existen en el router; para lanzar una sección, cambia su flag a `true`.

**Estilo de redacción:** sin guiones largos ("—") en los textos; se usan comas, dos puntos,
puntos y separadores "·".

**Sin rastros de AI-builders:** no hay `.lovable/`, `@lovable.dev/*`, TanStack Start, Nitro ni
config de Cloudflare heredada. Repositorio limpio y ejecutable.

## Estructura (design-system-ready)

```
src/
├── content/        # TODO el copy bilingüe { es, en }, separado del código
├── i18n/           # provider de idioma, useT() y LanguageSwitcher
├── components/
│   ├── primitives  # Button, Eyebrow, SectionHeading, Tag, StatusBadge, Reveal
│   ├── patterns    # CapabilityMotif, CapabilityCard, CaseCard, Marquee
│   ├── layout      # Header (mega-menú), Footer, SiteLayout
│   ├── contact     # ContactDrawer + ContactProvider (drawer de contacto)
│   └── Logo        # logo oficial (logo.webp)
├── sections/       # bloques de la home
├── pages/          # una por ruta
├── hooks/          # useDocumentMeta (SEO por ruta)
├── lib/            # utilidades (cn)
└── styles.css      # design tokens (Tailwind v4 @theme) + utilidades
```

Los tokens y primitives son extraíbles a `@farutech/tokens` / `@farutech/ui` cuando la
plataforma SaaS (Producto 2) los consuma: ambos productos compartirán marca.

## SEO

- **Prerender estático por ruta** (`npm run build:seo`): genera HTML indexable sin JS para
  `/`, `/capacidades`, cada capability, `/trabajo`, `/metodologia`, `/studio` y `/ecosistema`.
- `useDocumentMeta` fija title / description / Open Graph / canonical por ruta.
- JSON-LD (Organization + WebSite) en `index.html`; `public/robots.txt` y `public/sitemap.xml`.
- HTML semántico + ARIA + `prefers-reduced-motion`.

**Siguiente fase (documentada, no incluida):** `og:image` por ruta, `hreflang` es/en y
analítica privacy-first.

## Despliegue

El build genera un sitio **estático** (`dist/`), servible desde cualquier CDN o hosting estático
(Cloudflare Pages, Netlify, Vercel, S3…). Configura el *SPA fallback* (todas las rutas →
`index.html`):

- **Cloudflare Pages / Netlify:** añade un `_redirects` con `/* /index.html 200`.
- **Vercel:** detecta Vite automáticamente; no requiere configuración.

## Roadmap

1. **F0 (este entregable):** sitio fiel al refactor, ejecutable, bilingüe, contenido veraz, SEO base.
2. **F1:** `og:image` por ruta + `hreflang` es/en + analítica privacy-first.
3. **F2:** extraer `@farutech/tokens` / `@farutech/ui` (compartido con la plataforma).
4. **F3:** conectar el ecosistema (`app.farutech.app`): enlace de login + `/ecosistema` visible.
