# PLAN MAESTRO DE IMPLEMENTACIÓN - FaruTech Platform v3.0

**Versión:** 3.0 (Integración de arquitectura híbrida React + Laravel Lumen, Mini CRM, notificaciones y SEO avanzado)  
**Última actualización:** 2025-08-22  
**Propósito:** Este documento unifica y sustituye todos los planes previos. Define el camino completo para llevar la plataforma FaruTech desde su estado actual hasta una solución profesional, segura, performante y escalable, con un enfoque en la calidad del código, la seguridad y la experiencia de usuario.

---

## 📌 CONTEXTO Y ALCANCE

La plataforma FaruTech debe evolucionar de un sitio estático informativo a una **plataforma de conversión y gestión de leads** con:

- **Frontend:** React 18 + TypeScript + Vite + Tailwind v4, con prerender estático (SSG) y enrutamiento bilingüe (ES/EN, canónico en inglés).  
  El código del frontend reside en la **raíz del proyecto** (directorio actual) con estructura `src/`, `public/`, etc.

- **Backend:** API RESTful construida con **Laravel Lumen** (por su soporte nativo de colas, tareas programadas, ORM y testing) que gestiona leads, suscriptores, blog y un Mini CRM.  
  El código del backend reside en el directorio **`/api`** (ya existe y debe ser auditado y mejorado).

- **Mini CRM:** Gestión de leads con estados (new, contacted, qualified, proposal, negotiation, closed_won, closed_lost, unreachable), prioridades (low, medium, high, urgent), notas, historial y asignación a usuarios.

- **Notificaciones híbridas:** Telegram (gratuito) + WhatsApp Business (Twilio) para alertas en tiempo real a los administradores.

- **Blog avanzado:** Publicación programada, estadísticas de vistas, categorías jerárquicas y editor WYSIWYG en el panel de administración.

- **Panel de administración:** SPA en React con rutas protegidas, dashboard, gestión de leads, blog, newsletters y configuración.

- **SEO técnico:** Meta tags dinámicos, JSON‑LD (Schema.org), sitemap XML, redirecciones 301 y canonicalización.

- **Seguridad y privacidad:** Cumplimiento de GDPR, políticas de cookies, consentimiento explícito, encriptación de datos sensibles y protección contra vulnerabilidades comunes (SQLi, XSS, CSRF).

Este plan se organiza en **Fases** que agrupan **Épicas**, cada una con **Historias de Usuario** y **Tareas** concretas. Al final de cada fase se ejecutan validaciones obligatorias que garantizan la integridad del sistema.

---

## 🔍 HALLAZGOS DE AUDITORÍA INICIAL (Categorizados)

Antes de comenzar la implementación, se ha realizado una auditoría del código existente (basado en los documentos previos y en el estado actual del repositorio). A continuación se listan los hallazgos, clasificados por severidad, que serán corregidos en la **Fase 0**.

| ID | Severidad | Descripción | Ubicación | Solución Propuesta |
|----|-----------|-------------|-----------|---------------------|
| A‑C‑01 | **CRÍTICO** | `servicesData.ts` contenía errores de sintaxis que impedían la compilación. | `src/content/servicesData.ts` | Corregir la sintaxis y tipado. |
| A‑C‑02 | **CRÍTICO** | Faltaban componentes `StaticRouter` y `BrowserRouter` correctamente cerrados, causando errores de hidratación. | `src/entry-server.tsx`, `src/main.tsx` | Asegurar el cierre correcto de los enrutadores. |
| A‑C‑03 | **CRÍTICO** | No se ejecutaba `npm run typecheck` en el pipeline, permitiendo errores TypeScript silenciosos. | CI/CD | Integrar `typecheck` en los scripts de build y pre-commit. |
| A‑C‑04 | **CRÍTICO** | El backend Laravel Lumen en `/api` no tiene estructura de carpetas consistente ni se usa Composer correctamente. | `/api` | Reorganizar siguiendo el estándar de Lumen, actualizar dependencias y corregir autoload. |
| A‑C‑05 | **CRÍTICO** | No se validan ni sanitizan los inputs en el backend, exponiendo a inyección SQL y XSS. | Controladores y modelos | Usar Eloquent con prepared statements y agregar validación con Requests. |
| A‑H‑01 | **ALTO** | Las rutas legacy (`/capacidades/*`, `/trabajo`, `/studio`) no redirigían 301, causando duplicación de contenido. | Servidor / `_redirects` | Configurar redirecciones 301 en el servidor o en `_redirects`. |
| A‑H‑02 | **ALTO** | No se aplicaban políticas de seguridad CORS en el backend (PHP nativo). | API Laravel | Implementar middleware CORS en Lumen. |
| A‑H‑03 | **ALTO** | El formulario de contacto usaba `mailto:` en lugar de una API, exponiendo el email y sin almacenamiento. | Componente `ContactForm` | Reemplazar por envío a API REST con almacenamiento en BD. |
| A‑H‑04 | **ALTO** | No se sanitizaban ni validaban los inputs del formulario, exponiendo a XSS e inyección SQL. | Frontend y Backend | Implementar validación en ambos lados y prepared statements. |
| A‑H‑05 | **ALTO** | Las imágenes no estaban optimizadas (no WebP/AVIF, sin lazy loading). | `public/` y componentes | Convertir imágenes, aplicar `loading="lazy"` y `srcset`. |
| A‑H‑06 | **ALTO** | El archivo `.env` del backend está en el repositorio (sin `.gitignore` adecuado). | `/api/.env` | Mover a `.env.example` y asegurar que `.env` esté en `.gitignore`. |
| A‑M‑01 | **MEDIO** | El bundle de JavaScript superaba los 500KB sin code splitting. | Build de Vite | Configurar `chunkSizeWarningLimit` y lazy loading de rutas. |
| A‑M‑02 | **MEDIO** | Faltaban meta tags dinámicos y Schema.org en las páginas. | `index.html` y componentes | Implementar `useSeoMeta` y JSON‑LD dinámico. |
| A‑M‑03 | **MEDIO** | No se respetaba `prefers-reduced-motion` en animaciones. | Componentes con Framer Motion | Añadir hook `useReducedMotion`. |
| A‑M‑04 | **MEDIO** | El sistema de internacionalización no persistía la preferencia del usuario. | `I18nProvider` | Almacenar en `localStorage` y leer al inicio. |
| A‑M‑05 | **MEDIO** | No existían pruebas automatizadas (unitarias, de integración). | Proyecto | Configurar Vitest y PHPUnit. |
| A‑M‑06 | **MEDIO** | El directorio `/api` no tiene un `README` ni documentación de instalación. | `/api` | Agregar documentación básica. |
| A‑L‑01 | **BAJO** | Algunas dependencias estaban desactualizadas (`npm audit` mostraba vulnerabilidades bajas). | `package.json` | Actualizar dependencias y ejecutar `npm audit fix`. |
| A‑L‑02 | **BAJO** | Faltaba el archivo `robots.txt` y el sitemap no se generaba automáticamente. | `public/` | Crear `robots.txt` y generar `sitemap.xml` dinámicamente. |
| A‑L‑03 | **BAJO** | No se incluía un `health check` para la API. | Backend | Agregar endpoint `/api/health`. |

---

## 🧩 FASES Y ÉPICAS

El desarrollo se divide en **10 Fases**, cada una con sus Épicas, Historias de Usuario y Tareas. Se debe completar cada fase en orden, validando que los criterios de aceptación se cumplan antes de pasar a la siguiente.

### Resumen de Fases

| Fase | Nombre | Duración estimada | Dependencias |
|------|--------|-------------------|--------------|
| 0 | Auditoría y Corrección Inicial | 3h | Ninguna |
| 1 | Configuración del Proyecto y Base Técnica | 3h | Fase 0 |
| 2 | Backend API + Mini CRM + Notificaciones | 8h | Fase 1 |
| 3 | Sistema de Contenidos y Servicios | 4h | Fase 1 |
| 4 | Experiencia de Usuario y UI | 5h | Fase 3 |
| 5 | SEO Técnico Avanzado | 3h | Fase 4 |
| 6 | Lead Generation y API (Frontend) | 3h | Fase 2 |
| 7 | Panel de Administración en React | 6h | Fase 2, 6 |
| 8 | Performance y Optimización | 2h | Fase 7 |
| 9 | Testing y Calidad | 4h | Fase 8 |
| 10 | Despliegue y Operaciones | 2h | Fase 9 |

---

### FASE 0: Auditoría y Corrección Inicial

**Objetivo:** Corregir todos los hallazgos críticos y altos identificados, establecer las bases para el desarrollo limpio y organizar la estructura de directorios.

#### Épica E0.1: Reorganización y Limpieza de Directorios

- **HU0.1.1:** Revisar y ajustar la estructura de carpetas del proyecto
  - **Tareas:**
    - [ ] Verificar que el frontend esté en la raíz y el backend en `/api`.
    - [ ] Si se decide separar en repositorios independientes, documentar la decisión y crear los nuevos repositorios. Por ahora, mantener monorepo con carpetas separadas.
    - [ ] Asegurar que `/api` tenga una estructura estándar de Lumen: `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `storage/`, `tests/`.
    - [ ] Crear un archivo `README.md` en `/api` con instrucciones de instalación y configuración.
  - **Criterios de Aceptación:**
    - ✅ La estructura de directorios es clara y sigue las mejores prácticas.
    - ✅ El frontend y backend están aislados (pueden desplegarse por separado).

#### Épica E0.2: Corrección de Errores de Compilación y Tipado (Frontend)

- **HU0.2.1:** Corregir errores de sintaxis en `servicesData.ts`
  - **Tareas:**
    - [ ] Revisar y reparar la estructura del array de servicios.
    - [ ] Asegurar que todos los campos requeridos existen y tienen el tipo correcto.
    - [ ] Verificar que los textos bilingües estén correctamente definidos.
  - **Criterios de Aceptación:**
    - ✅ `npx tsc --noEmit` retorna 0 errores.

- **HU0.2.2:** Arreglar errores de enrutamiento en `entry-server.tsx` y `main.tsx`
  - **Tareas:**
    - [ ] Verificar que `StaticRouter` y `BrowserRouter` envuelven correctamente la aplicación.
    - [ ] Asegurar que no haya elementos sin cerrar.
  - **Criterios de Aceptación:**
    - ✅ El prerender (`npm run build:seo`) se completa sin errores.

- **HU0.2.3:** Configurar scripts de validación en `package.json`
  - **Tareas:**
    - [ ] Agregar `"typecheck": "tsc --noEmit"`.
    - [ ] Agregar `"build:seo": "node scripts/prerender.mjs"`.
    - [ ] Agregar `"validate": "npm run typecheck && npm run build && npm run build:seo"`.
  - **Criterios de Aceptación:**
    - ✅ El comando `npm run validate` se ejecuta sin errores.

#### Épica E0.3: Seguridad y Configuración Inicial

- **HU0.3.1:** Implementar redirecciones 301 para rutas legacy
  - **Tareas:**
    - [ ] Crear archivo `public/_redirects` (para CDN) o configurar en el servidor.
    - [ ] Definir reglas: `/capacidades/*` → `/services/*`, `/trabajo` → `/`, `/studio` → `/about-us`, `/metodologia` → `/about-us`.
  - **Criterios de Aceptación:**
    - ✅ Al acceder a una URL legacy, se redirige (301) a la nueva URL.

- **HU0.3.2:** Sanitización y validación en el frontend (preparación para API)
  - **Tareas:**
    - [ ] Crear utilidades de validación (email, required, etc.) en `src/utils/validation.ts`.
    - [ ] Implementar sanitización básica de inputs (trim, escape).
  - **Criterios de Aceptación:**
    - ✅ Los formularios validan los datos antes de enviar.

- **HU0.3.3:** Optimización de imágenes crítica
  - **Tareas:**
    - [ ] Convertir imágenes principales (hero, logos) a WebP/AVIF.
    - [ ] Agregar `loading="lazy"` a imágenes no críticas.
    - [ ] Definir `width` y `height` para evitar CLS.
  - **Criterios de Aceptación:**
    - ✅ Lighthouse Performance en móvil mejora a ≥ 80.

- **HU0.3.4:** Configurar el archivo `.env` del backend
  - **Tareas:**
    - [ ] Crear `/api/.env.example` con todas las variables necesarias.
    - [ ] Asegurar que `/api/.env` esté en `.gitignore`.
    - [ ] Validar que la aplicación Lumen pueda leer las variables.
  - **Criterios de Aceptación:**
    - ✅ El backend funciona con variables de entorno y no expone credenciales.

#### Épica E0.4: Actualización de Dependencias y Limpieza

- **HU0.4.1:** Actualizar dependencias del frontend
  - **Tareas:**
    - [ ] Ejecutar `npm outdated` y actualizar paquetes.
    - [ ] Ejecutar `npm audit fix` para corregir vulnerabilidades.
  - **Criterios de Aceptación:**
    - ✅ `npm audit` reporta 0 vulnerabilidades.

- **HU0.4.2:** Actualizar dependencias del backend (Composer)
  - **Tareas:**
    - [ ] Revisar `composer.json` y actualizar paquetes a versiones estables.
    - [ ] Ejecutar `composer update` y `composer audit`.
  - **Criterios de Aceptación:**
    - ✅ No hay vulnerabilidades conocidas en las dependencias.

- **HU0.4.3:** Eliminar código muerto y dependencias no utilizadas
  - **Tareas:**
    - [ ] Revisar `package.json` y eliminar paquetes no usados.
    - [ ] Eliminar archivos obsoletos (ej. `src/content/old-content.ts`).
    - [ ] En el backend, revisar controladores y modelos no utilizados.
  - **Criterios de Aceptación:**
    - ✅ El proyecto queda limpio y reducido.

---

### FASE 1: Configuración del Proyecto y Base Técnica

**Objetivo:** Establecer la infraestructura frontend con Vite, React, TypeScript, Tailwind v4, i18n, prerender y build optimizado. También se verifica que el backend Lumen esté correctamente configurado.

#### Épica E1.1: Configuración de Vite + React + TypeScript

- **HU1.1.1:** Inicializar proyecto con Vite
  - **Tareas:**
    - [ ] Si no existe, `npm create vite@latest . -- --template react-ts`
    - [ ] Configurar `tsconfig.json` con `strict: true`, `noUnusedLocals`, `noUnusedParameters`.
    - [ ] Instalar ESLint y configurar reglas recomendadas.
  - **Criterios de Aceptación:**
    - ✅ `npm run dev` levanta servidor en `localhost:5173`.
    - ✅ `npm run typecheck` pasa sin errores.

- **HU1.1.2:** Estructura de directorios (frontend)
  - **Tareas:**
    - [ ] Crear carpetas: `src/components`, `src/pages`, `src/hooks`, `src/services`, `src/utils`, `src/content`, `src/i18n`, `src/styles`.
  - **Criterios de Aceptación:**
    - ✅ Estructura definida y documentada.

#### Épica E1.2: Sistema de Diseño con Tailwind CSS v4

- **HU1.2.1:** Instalar y configurar Tailwind v4
  - **Tareas:**
    - [ ] `npm install tailwindcss @tailwindcss/vite`
    - [ ] Configurar `vite.config.ts` con el plugin.
    - [ ] Crear `src/styles.css` con `@import "tailwindcss"` y `@theme inline`.
  - **Criterios de Aceptación:**
    - ✅ Las clases de Tailwind funcionan en componentes.

- **HU1.2.2:** Definir tokens de diseño (colores, tipografía)
  - **Tareas:**
    - [ ] Definir colores en espacio OKLCH: primary, accent, spark, surface.
    - [ ] Crear utilidades: `text-gradient`, `bg-mesh`, `bg-glow`, `noise`, `border-gradient`.
    - [ ] Cargar fuentes Geist y Geist Mono desde Google Fonts con `preconnect`.
  - **Criterios de Aceptación:**
    - ✅ Utilidad `text-gradient` aplica degradado correctamente.
    - ✅ Fuentes se cargan sin bloqueo del renderizado.

#### Épica E1.3: Internacionalización y Enrutamiento Bilingüe

- **HU1.3.1:** Implementar contexto de i18n
  - **Tareas:**
    - [ ] Crear `src/i18n/index.tsx` con tipo `L = { es: string; en: string }`.
    - [ ] Implementar `I18nProvider` con contexto y persistencia en `localStorage`.
    - [ ] Crear hook `useT()`.
  - **Criterios de Aceptación:**
    - ✅ Cambio de idioma actualiza todos los textos sin recarga.
    - ✅ Preferencia persiste en `localStorage`.

- **HU1.3.2:** Language Switcher y canonicalización
  - **Tareas:**
    - [ ] Componente `LanguageSwitcher` con botones ES/EN.
    - [ ] Asegurar que las URLs en inglés sean canónicas.
    - [ ] Redirigir rutas en español a su equivalente en inglés (301).
  - **Criterios de Aceptación:**
    - ✅ Las URLs en español redirigen 301 a la versión en inglés.

#### Épica E1.4: Prerender Estático (SSG)

- **HU1.4.1:** Configurar renderizado estático
  - **Tareas:**
    - [ ] Crear `src/entry-server.tsx` con `renderToString` y `StaticRouter`.
    - [ ] Escribir `scripts/prerender.mjs` que recorra `routeMeta` y genere HTML por ruta.
    - [ ] Inyectar contenido renderizado en `<div id="root">` y reemplazar meta tags.
  - **Criterios de Aceptación:**
    - ✅ `npm run build:seo` genera `dist/` con HTML estático para cada ruta.
    - ✅ Cada archivo contiene el contenido completo y meta tags específicos.

#### Épica E1.5: Build Optimizado y Code Splitting

- **HU1.5.1:** Configurar Vite para producción
  - **Tareas:**
    - [ ] Establecer `chunkSizeWarningLimit: 600` en `vite.config.ts`.
    - [ ] Implementar lazy loading en rutas de servicios (`React.lazy`).
    - [ ] Usar `rollup-plugin-visualizer` para análisis.
  - **Criterios de Aceptación:**
    - ✅ Build genera múltiples chunks.
    - ✅ JS gzip <150KB; CSS gzip <10KB.
    - ✅ No hay warnings de chunk size.

#### Épica E1.6: Verificación del Backend Lumen

- **HU1.6.1:** Comprobar que el backend en `/api` esté funcional
  - **Tareas:**
    - [ ] Ejecutar `composer install` en `/api`.
    - [ ] Verificar que el endpoint `/api/health` devuelve `{ "status": "ok" }`.
    - [ ] Asegurar que la conexión a la base de datos esté configurada.
  - **Criterios de Aceptación:**
    - ✅ El backend responde correctamente.

---

### FASE 2: Backend API + Mini CRM + Notificaciones

**Objetivo:** Migrar/refinar el backend Laravel Lumen, implementar el Mini CRM, sistema de notificaciones (Telegram + WhatsApp), blog avanzado y endpoints REST.

#### Épica E2.1: Modelos y Migraciones

- **HU2.1.1:** Crear migraciones para todas las tablas (si no existen)
  - **Tareas:**
    - [ ] `users` (administradores)
    - [ ] `services`
    - [ ] `application_types`
    - [ ] `locations` (países, estados, ciudades)
    - [ ] `blog_categories`
    - [ ] `blog_posts`
    - [ ] `leads`
    - [ ] `lead_notes`
    - [ ] `contact_messages`
    - [ ] `newsletter_subscribers`
    - [ ] `newsletter_campaigns`
    - [ ] `notification_settings`
    - [ ] `audit_logs`
  - **Criterios de Aceptación:**
    - ✅ `php artisan migrate` ejecuta todas las tablas sin errores.

- **HU2.1.2:** Definir relaciones y seeders
  - **Tareas:**
    - [ ] Definir relaciones en modelos (Eloquent).
    - [ ] Crear seeders para servicios, tipos de aplicación, ubicaciones, etc.
  - **Criterios de Aceptación:**
    - ✅ Los seeders llenan la base de datos con datos de prueba.

#### Épica E2.2: Mini CRM

- **HU2.2.1:** Implementar estados y prioridades de leads
  - **Tareas:**
    - [ ] Definir enum de estados en `Lead.php`.
    - [ ] Definir enum de prioridades.
    - [ ] Agregar campos `assigned_to`, `source`, `last_contact_date`, `next_follow_up_date`, `conversion_value`.
  - **Criterios de Aceptación:**
    - ✅ Un lead puede transicionar entre estados siguiendo el flujo definido.

- **HU2.2.2:** Endpoints CRUD para leads
  - **Tareas:**
    - [ ] `GET /api/admin/leads` (listar con filtros y paginación)
    - [ ] `GET /api/admin/leads/{id}` (detalle con notas e historial)
    - [ ] `PATCH /api/admin/leads/{id}/status`
    - [ ] `POST /api/admin/leads/{id}/note`
  - **Criterios de Aceptación:**
    - ✅ Los endpoints devuelven respuestas JSON correctas con autenticación JWT.

#### Épica E2.3: Sistema de Notificaciones Híbrido

- **HU2.3.1:** Integrar Telegram Bot
  - **Tareas:**
    - [ ] Crear bot en Telegram y obtener token.
    - [ ] Implementar `TelegramService` que envíe mensajes a `TELEGRAM_CHAT_IDS`.
    - [ ] Endpoint de prueba `POST /api/admin/notifications/test-telegram`.
  - **Criterios de Aceptación:**
    - ✅ Al enviar un mensaje de prueba, el grupo de Telegram recibe la notificación.

- **HU2.3.2:** Integrar WhatsApp Business (Twilio)
  - **Tareas:**
    - [ ] Configurar cuenta Twilio y habilitar WhatsApp.
    - [ ] Implementar `WhatsAppService` con límite de mensajes diarios y horario laboral.
    - [ ] Endpoint de prueba `POST /api/admin/notifications/test-whatsapp`.
  - **Criterios de Aceptación:**
    - ✅ Los mensajes de prueba llegan al número configurado.

- **HU2.3.3:** Eventos y listeners para notificaciones automáticas
  - **Tareas:**
    - [ ] Crear evento `NewLeadReceived`.
    - [ ] Listener `SendLeadNotifications` que envía a Telegram y, si es urgente, a WhatsApp.
    - [ ] Programar tarea diaria de resumen de actividad.
  - **Criterios de Aceptación:**
    - ✅ Al crear un nuevo lead, se disparan las notificaciones correspondientes.

#### Épica E2.4: Blog Avanzado

- **HU2.4.1:** Modelo y CRUD de blog
  - **Tareas:**
    - [ ] Modelo `BlogPost` con campos: `title`, `slug`, `content`, `excerpt`, `category_id`, `status` (draft, scheduled, published, archived), `published_at`, `views_count`, `last_viewed_at`.
    - [ ] Modelo `BlogCategory` con jerarquía (parent_id).
    - [ ] Endpoints públicos: `GET /api/blog/posts`, `GET /api/blog/posts/{slug}`, `GET /api/blog/categories`.
    - [ ] Endpoints admin: `GET /api/admin/blog`, `POST /api/admin/blog`, `PUT /api/admin/blog/{id}`, `DELETE /api/admin/blog/{id}`.
  - **Criterios de Aceptación:**
    - ✅ Los posts publicados son accesibles desde el frontend.
    - ✅ Los posts programados no se muestran hasta su fecha.

- **HU2.4.2:** Publicación programada con Jobs
  - **Tareas:**
    - [ ] Crear Job `PublishScheduledBlogPost` que publique posts con `published_at <= now()`.
    - [ ] Configurar scheduler en `app/Console/Kernel.php` para ejecutar el job cada minuto.
  - **Criterios de Aceptación:**
    - ✅ Un post con fecha futura se publica automáticamente en el momento indicado.

- **HU2.4.3:** Estadísticas de vistas
  - **Tareas:**
    - [ ] Crear evento `BlogPostViewed` y listener que incremente `views_count` y actualice `last_viewed_at`.
    - [ ] Endpoint público no autenticado que dispare el evento al ver un post.
  - **Criterios de Aceptación:**
    - ✅ Las vistas se contabilizan sin duplicados por sesión (opcional).

#### Épica E2.5: Formulario de Contacto y Newsletter

- **HU2.5.1:** Endpoint de contacto
  - **Tareas:**
    - [ ] `POST /api/contact` recibe nombre, email, mensaje, servicio, etc.
    - [ ] Guarda en `contact_messages` y dispara evento `NewLeadReceived`.
    - [ ] Validación con checkboxes legales obligatorios.
  - **Criterios de Aceptación:**
    - ✅ El mensaje se almacena y se notifica a los administradores.

- **HU2.5.2:** Suscripción a newsletter
  - **Tareas:**
    - [ ] `POST /api/newsletter/subscribe` guarda email en `newsletter_subscribers`.
    - [ ] Generar token único para unsubscribe.
    - [ ] `GET /api/unsubscribe/{token}` da de baja al suscriptor.
  - **Criterios de Aceptación:**
    - ✅ La suscripción y baja funcionan correctamente.

#### Épica E2.6: Autenticación y Autorización

- **HU2.6.1:** JWT con Lumen
  - **Tareas:**
    - [ ] Instalar `tymon/jwt-auth`.
    - [ ] Crear `AuthController` con `login` y `refresh`.
    - [ ] Middleware `JwtMiddleware` para proteger rutas admin.
  - **Criterios de Aceptación:**
    - ✅ Un usuario puede iniciar sesión y obtener un token.
    - ✅ Las rutas protegidas requieren token válido.

---

### FASE 3: Sistema de Contenidos y Servicios

**Objetivo:** Centralizar todo el contenido bilingüe, definir los 5 servicios con landing pages individuales y casos de éxito integrados.

#### Épica E3.1: Definición de Servicios

- **HU3.1.1:** Crear `src/content/services.ts` con 5 servicios
  - **Tareas:**
    - [ ] Definir cada servicio con: `slug`, `name`, `short`, `fullDescription`, `problems`, `solution`, `benefits`, `faq`, `caseStudy`, `image`, `accent`, `icon`.
    - [ ] Todos los textos en formato `{ es, en }`.
  - **Criterios de Aceptación:**
    - ✅ 5 servicios definidos, cada uno con todos los campos requeridos.
    - ✅ Slugs únicos en kebab-case.

- **HU3.1.2:** Contenido de Home y About Us
  - **Tareas:**
    - [ ] `src/content/home.ts` con hero, trustBanner, servicesPreview, ecosystem, finalCta.
    - [ ] `src/content/about.ts` con misión, visión, valores, metodología, equipo, presencia.
  - **Criterios de Aceptación:**
    - ✅ Home muestra Trust Banner con logos de clientes reales.
    - ✅ About Us integra metodología y estudio.

#### Épica E3.2: Landing Pages de Servicio

- **HU3.2.1:** Crear componente `ServiceLanding`
  - **Tareas:**
    - [ ] Estructura: Hero específico, Problemas, Solución, Beneficios, Caso de Éxito relacionado, FAQ, CTA.
    - [ ] Usar colores y iconografía propios de cada servicio.
    - [ ] No usar PageBuilder genérico; cada sección es un componente específico.
  - **Criterios de Aceptación:**
    - ✅ Cada ruta `/services/:slug` muestra contenido único.
    - ✅ Diseño refleja la identidad visual del servicio.

---

### FASE 4: Experiencia de Usuario y UI

**Objetivo:** Construir componentes reutilizables, patrones, accesibilidad WCAG 2.2 AA y animaciones fluidas.

#### Épica E4.1: Componentes Primitivos y Patrones

- **HU4.1.1:** Crear primitivos (`primitives.tsx`)
  - **Tareas:**
    - [ ] `Button` (variantes por servicio), `Eyebrow`, `SectionHeading`, `Tag`, `StatusBadge`, `Reveal`.
  - **Criterios de Aceptación:**
    - ✅ Todos aceptan `className` y son accesibles.

- **HU4.1.2:** Crear patrones (`patterns.tsx`)
  - **Tareas:**
    - [ ] `ServiceCard`, `CaseCard`, `TrustBanner` (carrusel con logos), `Marquee`.
  - **Criterios de Aceptación:**
    - ✅ TrustBanner anima logos en carrusel automático pausable.

#### Épica E4.2: Header, Footer y Navegación

- **HU4.2.1:** Header y menú
  - **Tareas:**
    - [ ] Logo, enlaces: Services (dropdown), About Us, Contact (futuro).
    - [ ] Botón "Empezar un proyecto" (abre formulario).
    - [ ] Menú hamburguesa para móvil y LanguageSwitcher.
  - **Criterios de Aceptación:**
    - ✅ Sticky y cambio de fondo al scroll.
    - ✅ Dropdown de servicios al hover/clic.

- **HU4.2.2:** Footer
  - **Tareas:**
    - [ ] Columnas: descripción, servicios, enlaces legales, contacto, redes sociales.
    - [ ] LanguageSwitcher.
  - **Criterios de Aceptación:**
    - ✅ Visible en todas las páginas, enlaces funcionales.

#### Épica E4.3: Accesibilidad WCAG 2.2 AA

- **HU4.3.1:** Implementar accesibilidad
  - **Tareas:**
    - [ ] Skip link al inicio.
    - [ ] ARIA labels y landmarks.
    - [ ] Contraste de colores ≥4.5:1.
    - [ ] Focus visible y orden lógico de tabulación.
    - [ ] `useReducedMotion` para animaciones.
  - **Criterios de Aceptación:**
    - ✅ Sin violaciones críticas en axe.

#### Épica E4.4: Animaciones y Transiciones

- **HU4.4.1:** Framer Motion para scroll reveal y hover
  - **Tareas:**
    - [ ] Efectos sutiles en tarjetas y botones.
    - [ ] Marquee con animación CSS pausable.
  - **Criterios de Aceptación:**
    - ✅ Animaciones fluidas y respetan `prefers-reduced-motion`.

#### Épica E4.5: Medios para Heroes (imagen/video)

- **HU4.5.1:** Implementar el comportamiento de imagen estática con fallback a video (según `hero-media-plan.md`)
  - **Tareas:**
    - [ ] Asegurar que la imagen estática (poster) sea la primera en cargar y sea el LCP.
    - [ ] Implementar el ciclo de crossfade (imagen → video → imagen) con tiempos definidos, respetando `prefers-reduced-motion`.
    - [ ] Incluir los formatos .mp4 y .webm para cada hero.
  - **Criterios de Aceptación:**
    - ✅ El hero muestra imagen estática inicialmente y, si el navegador lo soporta, cambia a video después de 10-14 segundos.
    - ✅ El video no bloquea el LCP.

---

### FASE 5: SEO Técnico Avanzado

**Objetivo:** Meta datos dinámicos, Schema.org, Sitemap, robots.txt y redirecciones 301.

#### Épica E5.1: Meta Tags Dinámicos y JSON-LD

- **HU5.1.1:** Hook `useSeoMeta`
  - **Tareas:**
    - [ ] Actualizar title, description, canonical, og:title, og:description, og:image.
    - [ ] Definir `routeMeta` para cada ruta en `prerender.mjs`.
  - **Criterios de Aceptación:**
    - ✅ Cada página tiene título y descripción únicos.

- **HU5.1.2:** Schema.org JSON-LD
  - **Tareas:**
    - [ ] Agregar script para Organization y WebSite en `index.html`.
    - [ ] Inyectar `Service` y `FAQPage` dinámicamente en landing pages de servicios.
  - **Criterios de Aceptación:**
    - ✅ Validador de Google reconoce todos los tipos.

#### Épica E5.2: Sitemap y Robots

- **HU5.2.1:** Generar `sitemap.xml` dinámicamente
  - **Tareas:**
    - [ ] Script que recorra todas las rutas y genere sitemap.
    - [ ] Incluir prioridades y changefreq.
  - **Criterios de Aceptación:**
    - ✅ Sitemap incluye todas las URLs en inglés.

- **HU5.2.2:** Crear `robots.txt`
  - **Tareas:**
    - [ ] Permitir `Allow: /` y apuntar al sitemap absoluto.
  - **Criterios de Aceptación:**
    - ✅ Robots.txt accesible en la raíz.

#### Épica E5.3: Redirecciones 301 (ya en Fase 0, se verifica)

- **HU5.3.1:** Verificar redirecciones
  - **Criterios de Aceptación:**
    - ✅ Todas las rutas legacy redirigen 301.

---

### FASE 6: Lead Generation y API (Frontend)

**Objetivo:** Conectar el frontend con la API de leads y newsletter, asegurando seguridad y experiencia de usuario.

#### Épica E6.1: Formulario de Contacto

- **HU6.1.1:** Componente `ContactForm`
  - **Tareas:**
    - [ ] Campos: nombre, email, empresa (opcional), servicio (dropdown), mensaje.
    - [ ] Checkboxes obligatorios: aceptación de privacidad y comunicaciones.
    - [ ] Envío asíncrono a `/api/contact` con `fetch`.
    - [ ] Manejo de errores y mensaje de éxito.
  - **Criterios de Aceptación:**
    - ✅ Formulario envía datos y recibe confirmación.
    - ✅ Validación en cliente y servidor.

#### Épica E6.2: Newsletter

- **HU6.2.1:** Componente `Newsletter`
  - **Tareas:**
    - [ ] Campo email y botón de suscripción.
    - [ ] Envío a `/api/newsletter/subscribe`.
  - **Criterios de Aceptación:**
    - ✅ Suscripción exitosa y mensaje de agradecimiento.

#### Épica E6.3: Seguridad en el Frontend

- **HU6.3.1:** Sanitización y validación
  - **Tareas:**
    - [ ] Utilizar las utilidades de validación creadas en Fase 0.
    - [ ] Escapar outputs para prevenir XSS.
  - **Criterios de Aceptación:**
    - ✅ No hay inyección de scripts en los mensajes.

---

### FASE 7: Panel de Administración en React

**Objetivo:** Construir una SPA de administración con rutas protegidas, dashboard, gestión de leads, blog y configuración.

#### Épica E7.1: Estructura y Autenticación

- **HU7.1.1:** Rutas protegidas y layout
  - **Tareas:**
    - [ ] Crear `AdminLayout` con sidebar y header.
    - [ ] Implementar `PrivateRoute` que verifique token JWT.
    - [ ] Página de login `/admin/login`.
  - **Criterios de Aceptación:**
    - ✅ Solo usuarios autenticados acceden al panel.

#### Épica E7.2: Dashboard y Estadísticas

- **HU7.2.1:** Componentes de métricas
  - **Tareas:**
    - [ ] `StatCard` para leads totales, nuevos, por estado, conversión.
    - [ ] Gráficos simples (Chart.js) de tendencias.
    - [ ] Lista de últimas actividades.
  - **Criterios de Aceptación:**
    - ✅ El dashboard muestra datos reales desde la API.

#### Épica E7.3: Gestión de Leads (CRM)

- **HU7.3.1:** Listado y detalle de leads
  - **Tareas:**
    - [ ] Tabla con filtros (estado, prioridad, fecha, asignado).
    - [ ] Paginación y ordenamiento.
    - [ ] Detalle con historial de cambios y notas.
    - [ ] Formulario para agregar notas y cambiar estado.
  - **Criterios de Aceptación:**
    - ✅ El usuario puede navegar y actualizar leads eficientemente.

#### Épica E7.4: Gestión de Blog

- **HU7.4.1:** Listado y editor de posts
  - **Tareas:**
    - [ ] Tabla de posts con estado y fecha de publicación.
    - [ ] Editor WYSIWYG (Tiptap) para crear/editar posts.
    - [ ] Selector de categoría y fecha de publicación programada.
  - **Criterios de Aceptación:**
    - ✅ Los posts se guardan con el estado correspondiente y se programan correctamente.

#### Épica E7.5: Gestión de Newsletter y Configuración

- **HU7.5.1:** Lista de suscriptores y campañas
  - **Tareas:**
    - [ ] Tabla de suscriptores con opción de exportar.
    - [ ] Formulario para crear campañas y programar envíos.
  - **Criterios de Aceptación:**
    - ✅ Las campañas se envían según lo programado (uso de Jobs).

- **HU7.5.2:** Configuración de notificaciones
  - **Tareas:**
    - [ ] Formulario para configurar Telegram y WhatsApp (tokens, números, horarios).
  - **Criterios de Aceptación:**
    - ✅ La configuración se guarda en `notification_settings`.

---

### FASE 8: Performance y Optimización

**Objetivo:** Mejorar Core Web Vitals, reducir el tamaño del bundle y asegurar un buen rendimiento en dispositivos de gama baja.

#### Épica E8.1: Core Web Vitals

- **HU8.1.1:** Optimizar LCP, FID, CLS
  - **Tareas:**
    - [ ] Preconnect a Google Fonts.
    - [ ] Imágenes con `loading="lazy"`, `srcset`, y formatos modernos.
    - [ ] Reducir el tamaño de las imágenes del hero.
  - **Criterios de Aceptación:**
    - ✅ LCP < 2.5s, FID < 100ms, CLS < 0.1.

#### Épica E8.2: Bundle Size

- **HU8.2.1:** Análisis y reducción de dependencias
  - **Tareas:**
    - [ ] Usar `rollup-plugin-visualizer`.
    - [ ] Eliminar dependencias no usadas.
    - [ ] Confirmar que el code splitting funciona.
  - **Criterios de Aceptación:**
    - ✅ JS gzip < 150KB, CSS gzip < 10KB.

#### Épica E8.3: Rendimiento en Baja Gama

- **HU8.3.1:** Limitar animaciones y usar `will-change` solo donde sea necesario
  - **Criterios de Aceptación:**
    - ✅ Framerate > 30fps en dispositivos de gama baja.

---

### FASE 9: Testing y Calidad

**Objetivo:** Automatizar pruebas unitarias, de integración, accesibilidad y rendimiento.

#### Épica E9.1: Pruebas Unitarias (React)

- **HU9.1.1:** Configurar Vitest
  - **Tareas:**
    - [ ] `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
    - [ ] Escribir pruebas para `Button`, `LanguageSwitcher`, `ContactForm`.
  - **Criterios de Aceptación:**
    - ✅ Todas las pruebas pasan en CI.

#### Épica E9.2: Pruebas de API (PHP)

- **HU9.2.1:** Configurar PHPUnit
  - **Tareas:**
    - [ ] Escribir pruebas para endpoints `/leads`, `/subscribers`, `/blog`.
  - **Criterios de Aceptación:**
    - ✅ Todas las pruebas pasan.

#### Épica E9.3: Auditoría de Accesibilidad

- **HU9.3.1:** Integrar axe en el pipeline
  - **Tareas:**
    - [ ] Usar `cypress-axe` o `playwright` para pruebas de accesibilidad.
  - **Criterios de Aceptación:**
    - ✅ Sin violaciones críticas.

#### Épica E9.4: Lighthouse CI

- **HU9.4.1:** Configurar GitHub Action para Lighthouse
  - **Criterios de Aceptación:**
    - ✅ Performance ≥ 90, Accessibility ≥ 95.

---

### FASE 10: Despliegue y Operaciones

**Objetivo:** Preparar el proyecto para producción, documentar el despliegue híbrido y asegurar el monitoreo.

#### Épica E10.1: Build de Producción

- **HU10.1.1:** Validar `npm run build` y `npm run build:seo`
  - **Criterios de Aceptación:**
    - ✅ `dist/` completa y funcional.

#### Épica E10.2: Despliegue en CDN (Frontend)

- **HU10.2.1:** Documentar despliegue en Cloudflare Pages, Vercel o Netlify
  - **Criterios de Aceptación:**
    - ✅ Sitio sirve correctamente con SPA fallback.

#### Épica E10.3: Despliegue de Backend (PHP/MySQL)

- **HU10.3.1:** Configurar hosting
  - **Tareas:**
    - [ ] Configurar base de datos y variables de entorno.
    - [ ] Asegurar que `api/` sea accesible.
  - **Criterios de Aceptación:**
    - ✅ API responde en `/api/health`.

#### Épica E10.4: Documentación de Despliegue

- **HU10.4.1:** Actualizar README con instrucciones claras
  - **Criterios de Aceptación:**
    - ✅ Cualquier desarrollador puede desplegar siguiendo la guía.

---

## 📝 PROMPTS PARA SOLICITAR LA IMPLEMENTACIÓN DE CADA FASE

A continuación se detallan los prompts que se deben utilizar para solicitar la implementación de cada fase. Cada prompt incluye instrucciones específicas para validar la fase anterior y ejecutar las tareas, así como los comandos de verificación obligatorios.

---

### 🔹 Prompt para la **FASE 0: Auditoría y Corrección Inicial**

```
Necesito que implementes la **FASE 0: Auditoría y Corrección Inicial** del plan maestro.

**Contexto:** Se han identificado hallazgos críticos, altos, medios y bajos en el código existente. Debes corregir TODOS los hallazgos listados en el documento, priorizando los críticos y altos. Además, reorganiza la estructura de directorios si es necesario.

**Tareas específicas:**
- Revisar y ajustar la estructura de carpetas (frontend en raíz, backend en /api).
- Corregir errores de sintaxis en `servicesData.ts` y en los archivos de enrutamiento.
- Configurar scripts de validación (`typecheck`, `build:seo`, `validate`).
- Implementar redirecciones 301 para rutas legacy.
- Añadir validación y sanitización básica en el frontend.
- Optimizar imágenes críticas (WebP/AVIF, lazy loading).
- Actualizar dependencias (npm y composer) y ejecutar `npm audit fix`.
- Eliminar código muerto.
- Configurar el archivo `.env` del backend y asegurar que `.gitignore` lo excluya.

**Validaciones obligatorias al finalizar:**
- Ejecutar `npx tsc --noEmit` y confirmar que no hay errores.
- Ejecutar `npm run build` y verificar que no hay warnings.
- Ejecutar `npm run build:seo` y confirmar que se generan todas las páginas.
- Ejecutar `npm audit` y reportar 0 vulnerabilidades.
- Verificar que el endpoint `/api/health` responde correctamente.

**Entrega:** Marca todas las tareas como completadas en este documento y proporciona un informe de los hallazgos corregidos. Si encuentras algún problema adicional, documéntalo en la sección de comentarios.
```

---

### 🔹 Prompt para la **FASE 1: Configuración del Proyecto y Base Técnica**

```
Necesito que implementes la **FASE 1: Configuración del Proyecto y Base Técnica**.

**Requisitos previos:** La Fase 0 debe estar completamente validada (sin errores de compilación, redirecciones funcionando, dependencias actualizadas).

**Tareas:**
- Configurar Vite + React + TypeScript con estructura de directorios.
- Instalar y configurar Tailwind CSS v4 con tokens OKLCH y utilidades.
- Implementar i18n (ES/EN) con persistencia en localStorage y LanguageSwitcher.
- Configurar prerender estático (SSG) para todas las rutas.
- Optimizar build con code splitting y lazy loading.
- Verificar que el backend Lumen esté funcionando correctamente (composer install, health check).

**Validaciones:**
- `npm run typecheck` → 0 errores.
- `npm run build` → bundle < 150KB gzip (JS) y < 10KB (CSS).
- `npm run build:seo` → genera HTML para todas las rutas.
- Verificar que el cambio de idioma funciona sin recarga.
- Probar que el prerender incluye los meta tags correctos.
- Confirmar que `/api/health` devuelve `{ "status": "ok" }`.

**Observación:** Asegúrate de que el archivo `src/entry-server.tsx` esté correctamente configurado para el renderizado estático.
```

---

### 🔹 Prompt para la **FASE 2: Backend API + Mini CRM + Notificaciones**

```
Implementa la **FASE 2: Backend API + Mini CRM + Notificaciones** utilizando Laravel Lumen.

**Pre-requisitos:** La Fase 1 debe estar completa y validada.

**Entregables:**
- Instalación/configuración de Laravel Lumen en `/api` con estructura de carpetas.
- Todas las migraciones y modelos definidos (13 tablas).
- Mini CRM funcional con endpoints para leads (listar, detalle, cambiar estado, agregar nota).
- Sistema de notificaciones: Telegram + WhatsApp (Twilio), con listeners para nuevos leads.
- Blog avanzado: modelos, CRUD, publicación programada (Jobs), estadísticas de vistas.
- Formulario de contacto y newsletter con endpoints.
- Autenticación JWT para rutas admin.

**Validaciones:**
- `php artisan migrate` sin errores.
- `php artisan db:seed` llena la base de datos.
- Probar endpoints con Postman (o similar) para leads, blog, contacto y newsletter.
- Verificar que al crear un lead se recibe notificación en Telegram.
- Comprobar que un post con fecha futura se publica automáticamente (puedes simular el scheduler).

**Asegúrate de:** 
- Usar prepared statements (Eloquent lo hace por defecto).
- Configurar correctamente CORS.
- Proteger las rutas admin con JWT.
- Incluir un endpoint `/api/health` para monitoreo.
```

---

### 🔹 Prompt para la **FASE 3: Sistema de Contenidos y Servicios**

```
Implementa la **FASE 3: Sistema de Contenidos y Servicios**.

**Contexto:** Debes centralizar todo el contenido bilingüe para los 5 servicios, home y about us.

**Tareas:**
- Definir los 5 servicios en `src/content/services.ts` con todos sus campos.
- Crear `src/content/home.ts` y `src/content/about.ts`.
- Construir el componente `ServiceLanding` que renderice páginas únicas para cada servicio.
- Integrar casos de éxito en home y en las páginas de servicios.

**Validaciones:**
- Cada ruta `/services/:slug` muestra contenido único con el color y la iconografía correspondiente.
- El Trust Banner en home muestra logos de clientes reales.
- La página About Us fusiona metodología y estudio.
- Todos los textos son bilingües y el cambio de idioma funciona.
- `npm run build:seo` debe generar las páginas de servicios correctamente.

**Nota:** No uses un PageBuilder genérico; cada sección debe ser un componente específico para garantizar la identidad visual.
```

---

### 🔹 Prompt para la **FASE 4: Experiencia de Usuario y UI**

```
Implementa la **FASE 4: Experiencia de Usuario y UI**.

**Tareas:**
- Crear componentes primitivos (`Button`, `Tag`, `Badge`, `Reveal`, etc.).
- Crear patrones (`ServiceCard`, `CaseCard`, `TrustBanner`, `Marquee`).
- Implementar Header y Footer completos con navegación y LanguageSwitcher.
- Garantizar accesibilidad WCAG 2.2 AA (skip link, ARIA, contraste, focus, `useReducedMotion`).
- Añadir animaciones con Framer Motion (scroll reveal, hover) y marquee pausable.
- Implementar el comportamiento de medios para heroes (imagen estática + video con crossfade, respetando `prefers-reduced-motion`).

**Validaciones:**
- Navegación funciona en todos los tamaños de pantalla.
- El menú hamburguesa es accesible.
- Auditoría con axe (o Lighthouse) sin violaciones críticas.
- Las animaciones respetan `prefers-reduced-motion`.
- El Trust Banner rota automáticamente y se pausa al hacer hover.
- El hero muestra imagen estática primero y video después (si está disponible y no está en modo reducido).
- `npm run build` no muestra errores de estilo.

**Observación:** Asegúrate de que el Header sea sticky y cambie de fondo al hacer scroll.
```

---

### 🔹 Prompt para la **FASE 5: SEO Técnico Avanzado**

```
Implementa la **FASE 5: SEO Técnico Avanzado**.

**Tareas:**
- Crear hook `useSeoMeta` para manejar meta tags dinámicos (title, description, canonical, OG).
- Definir `routeMeta` para cada ruta en `prerender.mjs`.
- Agregar JSON-LD (Organization, WebSite, Service, FAQPage) en las páginas correspondientes.
- Generar `sitemap.xml` dinámicamente con todas las rutas en inglés.
- Crear `robots.txt` que apunte al sitemap.

**Validaciones:**
- Lighthouse SEO = 100.
- Google Rich Results Test reconoce los tipos de Schema.
- El sitemap contiene todas las URLs y no incluye obsoletas.
- Los canonical apuntan a la versión en inglés.
- `npm run build:seo` incluye los meta tags y JSON-LD en cada HTML generado.
```

---

### 🔹 Prompt para la **FASE 6: Lead Generation y API (Frontend)**

```
Implementa la **FASE 6: Lead Generation y API (Frontend)**.

**Pre-requisitos:** La Fase 2 (backend) debe estar operativa.

**Tareas:**
- Crear componente `ContactForm` con campos requeridos y checkboxes legales.
- Crear componente `Newsletter` para suscripción.
- Conectar ambos al backend vía `fetch` (POST a `/api/contact` y `/api/newsletter/subscribe`).
- Manejar estados de carga, éxito y error.
- Asegurar validación en cliente y sanitización.

**Validaciones:**
- El formulario envía datos y muestra mensaje de confirmación.
- La suscripción a newsletter se guarda en la base de datos.
- Al enviar, se disparan las notificaciones correspondientes (Telegram, WhatsApp si es urgente).
- No hay errores de CORS.
- `npm run build` completa sin problemas.
```

---

### 🔹 Prompt para la **FASE 7: Panel de Administración en React**

```
Implementa la **FASE 7: Panel de Administración en React**.

**Tareas:**
- Crear rutas protegidas con JWT (página de login, layout con sidebar).
- Dashboard con estadísticas (tarjetas, gráficos, última actividad).
- Gestión de leads: listado con filtros, detalle con notas y cambio de estado.
- Gestión de blog: listado, editor WYSIWYG (Tiptap), selector de categoría y fecha de publicación programada.
- Gestión de newsletter: lista de suscriptores y creación de campañas.
- Configuración de notificaciones (Telegram, WhatsApp).

**Validaciones:**
- Solo usuarios autenticados pueden acceder.
- Las acciones de actualización de leads y posts se reflejan en la base de datos.
- El editor de blog permite guardar borradores, programar o publicar inmediatamente.
- Las campañas de newsletter se programan correctamente (puedes simular).
- Los cambios en la configuración de notificaciones persisten.
- `npm run build` no falla.
```

---

### 🔹 Prompt para la **FASE 8: Performance y Optimización**

```
Implementa la **FASE 8: Performance y Optimización**.

**Tareas:**
- Optimizar Core Web Vitals (LCP, FID, CLS): preconnect, imágenes lazy con srcset, reducir tamaño.
- Analizar y reducir el bundle size (JS < 150KB, CSS < 10KB).
- Verificar que el code splitting está funcionando correctamente.
- Limitar animaciones en dispositivos de gama baja.

**Validaciones:**
- Lighthouse Performance ≥ 90 en móvil.
- LCP < 2.5s, CLS < 0.1.
- `npm run build` no muestra warnings de chunk.
- La aplicación funciona fluidamente en dispositivos de gama baja (emular).
- `npm run typecheck` y `npm run build:seo` pasan.
```

---

### 🔹 Prompt para la **FASE 9: Testing y Calidad**

```
Implementa la **FASE 9: Testing y Calidad**.

**Tareas:**
- Configurar Vitest para pruebas unitarias de componentes React (Button, LanguageSwitcher, ContactForm).
- Configurar PHPUnit para pruebas de integración de la API (leads, blog, newsletter).
- Integrar axe para auditoría de accesibilidad (usando Cypress o Playwright).
- Configurar Lighthouse CI en GitHub Actions.

**Validaciones:**
- Todas las pruebas unitarias y de integración pasan.
- Cobertura ≥ 70% en componentes críticos.
- Sin violaciones críticas de accesibilidad.
- Lighthouse CI pasa en cada PR (Performance ≥ 90, Accessibility ≥ 95).
- `npm run build` y `npm run build:seo` continúan funcionando.
```

---

### 🔹 Prompt para la **FASE 10: Despliegue y Operaciones**

```
Implementa la **FASE 10: Despliegue y Operaciones**.

**Tareas:**
- Validar que `npm run build` y `npm run build:seo` producen `dist/` completo.
- Documentar el despliegue del frontend en CDN (Cloudflare Pages, Vercel o Netlify).
- Documentar el despliegue del backend en un servidor PHP/MySQL (cPanel, VPS, AWS).
- Crear un README actualizado con instrucciones paso a paso para el despliegue híbrido.

**Validaciones:**
- El frontend en el CDN carga correctamente sin errores 404.
- La API en el servidor responde a `/api/health` y a los endpoints públicos.
- La conexión entre frontend y backend funciona (sin CORS).
- Las variables de entorno están configuradas en producción.
- Se ha verificado que las redirecciones 301 funcionan en el entorno de producción.
```

---

## ✅ GUÍA DE VALIDACIÓN ENTRE FASES

Después de completar cada fase, se debe ejecutar el siguiente conjunto de comandos y reportar los resultados antes de pasar a la siguiente fase.

### Comandos de validación obligatorios:

```bash
# 1. Validar tipos TypeScript
npx tsc --noEmit 2>&1 && echo "✅ TYPECHECK OK" || echo "❌ TYPECHECK FAILED"

# 2. Build de producción
npm run build 2>&1 && echo "✅ BUILD OK" || echo "❌ BUILD FAILED"

# 3. Build con prerender SEO
npm run build:seo 2>&1 && echo "✅ SEO BUILD OK" || echo "❌ SEO BUILD FAILED"

# 4. Auditoría de dependencias frontend
npm audit 2>&1 && echo "✅ AUDIT OK" || echo "❌ AUDIT FAILED"

# 5. (Opcional) Comprobar estado del backend
curl -f http://localhost:8000/api/health && echo "✅ BACKEND OK" || echo "❌ BACKEND FAILED"
```

### Si alguna validación falla:

1. **Detener el avance** a la siguiente fase.
2. **Revisar los logs** de error.
3. **Corregir** los problemas encontrados.
4. **Volver a ejecutar** las validaciones hasta que todas pasen.
5. **Documentar** la corrección en los comentarios del plan.

### Espacio para comentarios y correcciones manuales:

Cada fase incluye un bloque para que el equipo registre observaciones, problemas encontrados y soluciones aplicadas.

```markdown
#### Comentarios de la Fase X:
- [ ] ... (describir incidencias o decisiones)
- [ ] ... (soluciones aplicadas)
- [ ] ... (pruebas adicionales realizadas)
```

---

## 🛡️ SEGURIDAD Y PRIVACIDAD (Consideraciones transversales)

A lo largo de todas las fases, se deben aplicar las siguientes medidas de seguridad:

- **Validación de datos:** Tanto en frontend como en backend, usando reglas estrictas.
- **Sanitización:** Escapar outputs, usar parámetros preparados en SQL.
- **Autenticación:** JWT con tiempo de expiración y refresh tokens.
- **CORS:** Configurar solo los orígenes permitidos.
- **HTTPS:** Obligatorio en producción.
- **Headers de seguridad:** X-Frame-Options, X-Content-Type-Options, Content-Security-Policy.
- **Encriptación:** Almacenar datos sensibles (ej. tokens de API) en variables de entorno, nunca en el código.
- **GDPR:** Aceptación explícita en formularios, política de privacidad clara, derecho al olvido (unsubscribe).

---

## 📚 DOCUMENTACIÓN ADICIONAL

- El README del proyecto debe incluir una sección de **Despliegue** que cubra ambos entornos.
- La documentación de la API (Swagger/OpenAPI) se generará en la Fase 2.
- Se mantendrá un **changelog** de las decisiones técnicas relevantes.

---

## 🚀 CONCLUSIÓN

Este plan maestro cubre exhaustivamente todas las áreas necesarias para transformar FaruTech en una plataforma robusta y profesional. Cada fase está diseñada para ser ejecutada de manera secuencial, con validaciones rigurosas que garantizan la calidad y estabilidad del sistema. La inclusión de prompts detallados facilita la comunicación con el equipo de desarrollo y asegura que no se omita ningún aspecto crítico.

**El proyecto está ahora listo para ser implementado fase por fase, con total visibilidad y control sobre cada paso.**
