# FaruTech web

Sitio corporativo de FaruTech, construido con React, TypeScript, Vite y Tailwind CSS v4.

## Desarrollo

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run build:seo
npm audit
```

`npm run build:seo` genera el build cliente y el prerender estático de las rutas del sitio.

## Contenido

El contenido corporativo bilingüe permanece en `src/content`. La configuración de bloques del sistema Lego está en `src/content/site.config.ts`; actualmente renderiza los casos de Afilamos Hermanos y Supraeventos en `/trabajo` mediante `PageBuilder`.

Los enlaces corporativos publicados son el sitio web de FaruTech y su perfil de LinkedIn. No se deben añadir redes ni métricas sin una fuente verificable.

## Contacto en Hostinger

El frontend envía el formulario a `POST /api/contact`. Al desplegar, publica la carpeta `api/` junto al contenido generado de `dist/`, ejecuta `api/schema.sql` una vez en la base de datos MySQL y configura en PHP/Hostinger las variables `FARUTECH_DB_HOST`, `FARUTECH_DB_NAME`, `FARUTECH_DB_USER`, `FARUTECH_DB_PASSWORD` y `FARUTECH_ALLOWED_ORIGINS`. No subas credenciales al repositorio.

## Validación antes de publicar

Ejecuta `npm run typecheck`, `npm run build`, `npm run build:seo` y `npm audit`. Revisa también `/trabajo` con teclado y lector de pantalla, incluidos los enlaces externos y la preferencia de movimiento reducido.
