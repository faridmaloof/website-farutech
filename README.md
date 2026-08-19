# FaruTech Web

Sitio corporativo de FaruTech, construido con React, TypeScript, Vite y Tailwind CSS v4.

## Stack

- **Frontend**: React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + Framer Motion
- **Backend**: PHP 8 (API REST) + MySQL (PDO)
- **SEO**: Prerender estático (SSR) + JSON-LD + Sitemap + Open Graph
- **Hosting**: Estático (dist/) + API PHP (Hostinger o similar)

## Desarrollo

```bash
npm install
npm run dev          # Servidor de desarrollo (puerto 4321)
npm run typecheck    # Verificar tipos (tsc --noEmit)
npm run build        # Build de producción
npm run build:seo    # Build + prerender estático (22 rutas)
npm run preview      # Preview del build
npm audit            # Verificar vulnerabilidades
```

## Estructura

```
├── src/
│   ├── components/     # Design system (primitives, patterns, layout, contact)
│   ├── content/        # Contenido bilingüe (services, home, about, work, site)
│   ├── hooks/          # useDocumentMeta (SEO por ruta)
│   ├── i18n/           # Sistema de internacionalización (es/en)
│   ├── lib/            # Utilidades (cn, etc.)
│   ├── pages/          # Páginas (Home, Services, CaseStudies, About, Legal, 404)
│   │   └── services/   # Landing pages por servicio (6 servicios)
│   ├── sections/       # Secciones reutilizables
│   ├── styles/         # Global CSS (tokens Tailwind v4)
│   └── types/          # Tipos TypeScript
├── api/                # Backend PHP (SOLID: config, models, services, controllers, routes)
├── database/           # Schema SQL
├── public/             # Assets estáticos (favicon, images, sitemap, _redirects, robots)
├── scripts/            # prerender.mjs, generate-sitemap.mjs
├── docs/               # Documentación técnica
├── index.html          # HTML base + JSON-LD (Organization, WebSite, Service, FAQPage)
├── vite.config.ts
├── tsconfig.json
└── .env.example        # Variables de entorno para la API
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/services` | Hub de servicios |
| `/services/desarrollo-software` | Desarrollo de Software a Medida |
| `/services/plataformas-saas` | Plataformas SaaS y Multi-Tenant |
| `/services/soluciones-empresariales` | Soluciones Empresariales |
| `/services/ia-automatizacion` | IA y Automatización |
| `/services/ux-engineering` | UX Engineering |
| `/services/modernizacion` | Modernización de Sistemas |
| `/case-studies` | Casos de éxito |
| `/about-us` | Nosotros |
| `/ecosistema` | Ecosistema |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos de uso |

Rutas en español (`/servicios/*`, `/casos-exito`, `/nosotros`) redirigen 301 a las rutas en inglés.

## SEO

- **Prerender**: `npm run build:seo` genera HTML estático para 22 rutas (11 en inglés + 11 en español).
- **JSON-LD**: Organization, WebSite, Service y FAQPage en `index.html`.
- **Sitemap**: `public/sitemap.xml` con 13 URLs y prioridades.
- **Meta por ruta**: `useDocumentMeta` hook actualiza title, description, canonical, OG y Twitter Cards.
- **Redirecciones**: `public/_redirects` con 301s para URLs legacy.

## API (Backend PHP)

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/leads` | Crear lead (formulario de contacto) |
| POST | `/api/subscribers` | Suscribir a newsletter |

### Despliegue en Hostinger

1. Publica la carpeta `dist/` como contenido web.
2. Publica la carpeta `api/` junto al contenido.
3. Ejecuta `database/schema.sql` en MySQL.
4. Configura variables de entorno (ver `.env.example`):
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
   - `ALLOWED_ORIGINS` (CORS)
5. No subas credenciales al repositorio.

### Seguridad

- Prepared statements (PDO) en todas las consultas.
- Sanitización de inputs (trim, strip_tags).
- CORS configurado por origen.
- Scoring automático de leads (país, servicio, longitud mensaje).

## Contenido

El contenido corporativo bilingüe está en `src/content/`. Todos los textos son objetos `{ es: string; en: string }`. Los 6 servicios tienen identidad visual propia (color, icono, imagen).

## Validación antes de publicar

```bash
npm run typecheck   # 0 errores
npm run build       # JS < 150KB gzip, CSS < 11KB gzip
npm run build:seo   # 22 rutas prerenderizadas
npm audit           # 0 vulnerabilidades
```

Verificar también:
- Navegación con teclado (Tab, Enter, Escape)
- `prefers-reduced-motion` en animaciones
- Enlaces externos con `rel="noopener noreferrer"`
- Contraste de colores ≥ 4.5:1