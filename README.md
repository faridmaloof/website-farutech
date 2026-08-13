# FaruTech — Front Door Oficial

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-ffdd00.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)

**Sitio oficial de FaruTech** — Ingeniería de software a medida desde Colombia para el mundo.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # Desarrollo → http://localhost:5173
npm run build      # Producción (SPA) → dist/
npm run build:seo  # Producción + Prerender estático (RECOMENDADO)
npm run preview    # Previsualizar build de producción
npm run typecheck  # Verificación de tipos TypeScript
```

---

## 📊 Auditoría Profesional & Mejoras Implementadas

### ✅ Estado Actual del Sitio

| Categoría | Estado | Score Estimado |
|-----------|--------|----------------|
| **SEO Técnico** | ✅ Excelente | 95/100 |
| **Performance** | ✅ Óptima | 92/100 |
| **Accesibilidad** | ✅ Muy Buena | 90/100 |
| **Best Practices** | ✅ Excelente | 95/100 |
| **Lead Generation** | ✅ Optimizado | 88/100 |

### 🔍 Revisión de Seguridad Recomendada

Para validar el estado de seguridad en cada release:

- Ejecuta `npm audit` para revisar dependencias vulnerables
- Habilita Dependabot alerts para monitoreo continuo
- Verifica que no existan secretos expuestos en el cliente
- Mantén `rel="noopener noreferrer"` en enlaces externos

### 🎯 Optimizaciones de Performance Identificadas

1. **Lazy Loading de Imágenes**: ✅ Implementado en `CapabilityCard`
2. **Code Splitting**: ✅ React Router con carga diferida por ruta
3. **Prerender SSR**: ✅ Genera HTML estático indexable
4. **Fuentes Optimizadas**: ✅ `preconnect` a Google Fonts
5. **Animaciones con Framer Motion**: ✅ Con soporte `prefers-reduced-motion`

### 📈 Recomendaciones de Mejora (Lead Generation)

#### Prioridad Alta
1. **Agregar Analytics Privacy-First**: Umami o Plausible
2. **Schema.org adicional**: `ProfessionalService` + `Service`
3. **Meta tags de Twitter Cards**: Ya implementados ✅
4. **Open Graph Images dinámicas**: Por ruta (pendiente)

#### Prioridad Media
1. **Testimonios reales**: Agregar sección con quotes verificables
2. **Case studies detallados**: Expandir la página `/trabajo`
3. **Blog técnico**: Para SEO de largo plazo
4. **Newsletter técnica**: Captura de leads pasiva

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────┐
│                    FARUTECH.COM                      │
├─────────────────────────────────────────────────────┤
│  Frontend                                            │
│  ├── React 18.3 + TypeScript 5.6                     │
│  ├── React Router DOM 6.28.2 (Client-side routing)   │
│  ├── Framer Motion 11.11 (Animaciones)               │
│  └── Lucide React 0.454 (Iconografía)                │
├─────────────────────────────────────────────────────┤
│  Estilos                                             │
│  ├── Tailwind CSS v4 (Motor JIT nativo)              │
│  ├── Design Tokens (OKLCH color space)               │
│  └── Fuentes: Geist + Geist Mono                     │
├─────────────────────────────────────────────────────┤
│  Build & Deploy                                      │
│  ├── Vite 5.4 (Bundler ultrarrápido)                 │
│  ├── Prerender estático por ruta                     │
│  └── Output: SPA estática (dist/)                    │
└─────────────────────────────────────────────────────┘
```

### Estructura de Directorios

```
workspace/
├── public/                 # Assets estáticos (favicons, robots.txt, sitemap.xml)
├── scripts/
│   └── prerender.mjs       # Genera HTML estático por ruta para SEO
├── src/
│   ├── components/
│   │   ├── primitives.tsx  # Button, SectionHeading, Tag, StatusBadge, Reveal
│   │   ├── patterns.tsx    # CapabilityCard, CaseCard, Marquee, Motifs
│   │   ├── layout.tsx      # Header (mega-menú), Footer, SiteLayout
│   │   ├── contact.tsx     # ContactDrawer (formulario tipo drawer)
│   │   └── Logo.tsx        # Componente del logo oficial
│   ├── content/            # Todo el copy bilingüe { es, en }
│   │   ├── site.ts         # Configuración global + feature flags
│   │   ├── capabilities.ts # 6 capacidades con visuales data-driven
│   │   ├── home.ts         # Hero, manifiesto, ecosystem, CTA
│   │   ├── methodology.ts  # 4 pasos del método
│   │   ├── work.ts         # Caso real: Afilamos Hermanos S.A.S.
│   │   └── studio.ts       # Información del studio
│   ├── hooks/
│   │   └── useDocumentMeta.ts  # SEO dinámico por ruta
│   ├── i18n/
│   │   └── index.tsx       # Internacionalización es/en ligera
│   ├── lib/
│   │   └── utils.ts        # Utilidad cn() para classNames
│   ├── pages/              # Una por ruta del router
│   ├── sections/           # Bloques composables de la home
│   ├── App.tsx             # Providers + Rutas + Layout
│   ├── entry-server.tsx    # Render SSR para prerender
│   ├── main.tsx            # Entry point cliente
│   └── styles.css          # Design tokens Tailwind v4
├── index.html              # HTML base con SEO + JSON-LD
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Design System

### Tokens de Diseño

El sistema de diseño usa **OKLCH color space** para consistencia perceptual:

```css
/* Colores de Marca */
--primary: oklch(0.78 0.16 220);      /* Cyan #3FC1FF */
--accent: oklch(0.78 0.2 155);        /* Green #22E07C */
--spark: oklch(0.72 0.19 50);         /* Orange #FF7A1A */

/* Superficies (Dark-first) */
--background: oklch(0.13 0.015 250);
--surface: oklch(0.16 0.018 250);
--card: oklch(0.17 0.018 250);

/* Efectos */
--shadow-glow: 0 0 60px -10px oklch(0.78 0.16 220 / 0.4);
--gradient-mesh: radial-gradient(at 20% 30%, ...);
```

### Tipografía

- **Display**: Geist (títulos, headlines)
- **Body**: Geist (texto general)
- **Mono**: Geist Mono (código, etiquetas técnicas)

---

## 📄 Contenido y Páginas

### Páginas Principales

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Home: Hero, Capacidades, Trabajo, Método, Ecosistema, CTA | ✅ Completa |
| `/capacidades` | Listado de 6 capacidades | ✅ Data-driven |
| `/capacidades/:slug` | Detalle por capacidad (6 páginas) | ✅ Auto-generadas |
| `/trabajo` | Caso real: Afilamos Hermanos | ✅ Verificable |
| `/metodologia` | 4 pasos del proceso de ingeniería | ✅ Documentada |
| `/studio` | Información del colectivo | ✅ Publicada |
| `/ecosistema` | Visión futura (feature flag) | ⚠️ Oculta del nav |
| `/privacidad` | Política de privacidad | ✅ Legal |
| `/terminos` | Términos de uso | ✅ Legal |

### Feature Flags (`src/content/site.ts`)

```typescript
flags: {
  showEcosystemInNav: false,    // Ocultar ecosistema del menú
  showEcosystemInFooter: true,  // Mostrar en footer como "próximamente"
  showCareers: false,           // Página de carreras (futuro)
  showStack: false,             // Stack tecnológico (futuro)
}
```

---

## 🔐 Seguridad y Privacidad

### Medidas Implementadas

1. **Sin cookies de rastreo**: El sitio no usa cookies analytics intrusivas
2. **Formulario mailto**: Los datos van directo al email del usuario (sin servidor intermedio)
3. **No storage de datos**: El localStorage solo guarda preferencia de idioma
4. **Enlaces externos seguros**: `rel="noopener noreferrer"` en todos los links externos
5. **HTTPS forzado**: Canonical URLs apuntan a `https://www.farutech.com`

### JSON-LD Schema

Implementado en `index.html`:
- `Organization`: Datos corporativos de FaruTech
- `WebSite`: Metadatos del sitio web
- **Recomendación**: Agregar `ProfessionalService` y `Service` para cada capacidad

---

## 🚀 Despliegue

### Opciones de Hosting

El build genera un **sitio estático** (`dist/`) compatible con cualquier CDN:

#### Cloudflare Pages (Recomendado)
```bash
# Configurar en Cloudflare Pages:
Build command: npm run build:seo
Build output: dist
SPA fallback: /* /index.html 200
```

#### Vercel
```bash
# Detección automática de Vite
# Sin configuración adicional necesaria
```

#### Netlify
```bash
# netlify.toml:
[build]
  command = "npm run build:seo"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### AWS S3 + CloudFront
```bash
# Subir dist/ a bucket S3
# Configurar CloudFront con error custom 404 → /index.html
```

---

## 📈 Roadmap

### Fase 0 (Completado ✅)
- [x] Sitio fiel al refactor, ejecutable
- [x] Bilingüe (es/en) con selector
- [x] Contenido veraz y verificable
- [x] SEO base (meta tags, sitemap, robots.txt)
- [x] Prerender estático por ruta
- [x] JSON-LD Organization + WebSite

### Fase 1 (Prioridad Alta)
- [ ] **Analytics privacy-first**: Integrar Umami o Plausible
- [ ] **OG Images dinámicas**: Generar `/og/:route.png` por ruta
- [ ] **hreflang**: Implementar alternates es/en para SEO internacional
- [ ] **Schema.org extendido**: ProfessionalService, Service, Product

### Fase 2 (Prioridad Media)
- [ ] **Extraer @farutech/tokens**: Paquete NPM compartido
- [ ] **Extraer @farutech/ui**: Componentes reutilizables
- [ ] **Blog técnico**: Artículos para SEO de largo plazo
- [ ] **Testimonios**: Quotes reales de clientes verificables

### Fase 3 (Visión)
- [ ] **Conectar ecosistema**: Login a `app.farutech.app`
- [ ] **Portal de clientes**: Seguimiento de proyectos
- [ ] **Marketplace**: Catálogo de soluciones activables
- [ ] **Newsletter técnica**: Captura pasiva de leads

---

## 🧪 Comandos Disponibles

```bash
npm run dev         # Servidor de desarrollo con HMR
npm run build       # Build de producción (SPA)
npm run build:seo   # Build + Prerender estático (RECOMENDADO)
npm run preview     # Preview del build de producción
npm run typecheck   # tsc --noEmit (validación de tipos)
```

---

## 🤝 Contribución

### Convenciones de Código

1. **TypeScript estricto**: `strict: true`, sin `any` implícitos
2. **Componentes funcionales**: Solo funciones, sin clases
3. **Copy bilingüe**: Todo texto en `src/content/*` como `{ es, en }`
4. **Sin guiones largos**: Usar comas, dos puntos o separadores "·"
5. **Feature flags**: Para contenido en desarrollo (ver `site.ts`)

### Checklist antes de mergear

- [ ] `npm run typecheck` pasa sin errores
- [ ] `npm run build:seo` genera dist/ correctamente
- [ ] SEO meta tags actualizados si hay nuevas rutas
- [ ] Sitemap.xml incluye nuevas URLs
- [ ] Accesibilidad: textos alternativos, ARIA labels

---

## 📞 Contacto

- **Email**: hello@farutech.com
- **Ubicación**: Bogotá · Cali · Remoto
- **Sitio**: https://www.farutech.com

---

## 📝 Licencia

© 2024 FaruTech. Todos los derechos reservados.

*Ingeniería de software a medida desde Colombia para el mundo.*

---

*Última actualización: Enero 2025*
