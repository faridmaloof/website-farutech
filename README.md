# FaruTech — Web

Sitio corporativo de FaruTech en **monorepo**: `apps/` separa el backend
(API Laravel/Lumen) del frontend (React + Vite), y `docker/` concentra la
infraestructura de contenedores reutilizable en desarrollo y producción.

## Stack

- **Frontend**: React 18 + TypeScript + Vite 8 + Tailwind CSS v4 + Framer Motion
- **Backend**: Laravel Lumen 10 (PHP 8.3) + MariaDB 10.11
- **Infra**: Docker Compose (dev y prod), Nginx (SPA + proxy API), Supervisor
- **SEO**: prerender estático + JSON-LD + sitemap + Open Graph

## Estructura del repositorio

```
farutech/
├── apps/
│   ├── backend/                # API Laravel/Lumen
│   └── frontend/               # SPA React + Vite (+ scripts de prerender)
├── docker/
│   ├── backend.Dockerfile      # build multi-stage (composer → php-fpm+nginx)
│   ├── frontend.Dockerfile     # build multi-stage (node → nginx)
│   ├── backend/                # nginx.conf y supervisord.conf del backend
│   ├── mysql/init/             # schema + seeds (primer arranque del volumen)
│   └── nginx/default.conf      # SPA + proxy /api al backend
├── scripts/
│   ├── deploy-dev.sh           # despliegue a la Raspberry Pi
│   └── deploy-prod.sh          # despliegue al VPS de producción
├── docs/                       # documentación técnica
├── docker-compose.yml          # stack de desarrollo
├── docker-compose.prod.yml     # stack de producción
├── .env.example
├── .dockerignore
└── README.md
```

## Arranque rápido

### Frontend (desarrollo local con hot-reload)

```bash
cd apps/frontend
npm ci
npm run dev         # servidor de desarrollo
npm run typecheck   # tsc --noEmit
npm run build       # build de producción
npm run build:seo   # build + prerender estático (22 rutas)
```

### Stack completo con Docker

```bash
cp .env.example .env   # luego edita APP_KEY (ver abajo)
docker compose up -d --build
# Frontend (SPA + API) en http://localhost:8080
```

El contenedor `db` se inicializa **una sola vez** (volumen vacío) con el
schema y los seeds de `docker/mysql/init/`. Si necesitas reiniciar la BD
desde cero:

```bash
docker compose down -v && docker compose up -d --build
```

### Generar APP_KEY

```bash
php -r "echo 'base64:'.base64_encode(random_bytes(32));"
```

## Despliegue

### Raspberry Pi (entorno de desarrollo)

```bash
./scripts/deploy-dev.sh
```

### VPS Hostinger (producción)

```bash
./scripts/deploy-prod.sh
```

### Proxy inverso con dominios reales

El contenedor `frontend` (puerto 80 interno) sirve la SPA y enruta `/api/`
al backend. Con Nginx Proxy Manager crea dos Proxy Hosts:

- `www.farutech.com` → `farutech_frontend:80`
- `api.farutech.com` → `farutech_frontend:80` (recomendado: conserva el
  prefijo `/api`) o `farutech_backend:80` (rutas sin el prefijo `/api`)

## Cómo funciona

1. **Nginx del frontend** sirve el build (`/usr/share/nginx/html`) con SPA
   fallback y proxyea `location ^~ /api/` a `http://backend:80`.
2. **Contenedor backend** ejecuta PHP-FPM (FastCGI en `:9000`) y Nginx
   (`:80`) bajo Supervisor; Nginx traduce HTTP → FastCGI.
3. **MariaDB** arranca con el schema y seeds de `docker/mysql/init/`.

> ⚠️ **El proxy conserva el prefijo `/api`** porque el backend registra sus
> rutas bajo ese prefijo (p. ej. `/api/blog/...`). Si en el futuro la API
> vive en la raíz, quita el `^~` y añade una `/` al `proxy_pass` de
> `docker/nginx/default.conf`.

## Rutas principales (frontend)

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/services` | Hub de servicios (6 servicios con landing propia) |
| `/case-studies` | Casos de éxito |
| `/about-us` | Nosotros |
| `/ecosistema` | Ecosistema |

Los alias en español (`/servicios/*`, `/casos-exito`, `/nosotros`) redirigen
301 a las rutas canónicas en inglés.

## Contenido

Contenido corporativo bilingüe (`{ es, en }`) en
`apps/frontend/src/content/`. Los 6 servicios tienen identidad visual propia
(color, icono, imagen) definida en `servicesData.ts`.

## Validación antes de publicar

```bash
cd apps/frontend
npm run typecheck   # 0 errores
npm run build       # build de producción
npm run build:seo   # prerender estático
docker compose config -q        # valida el compose de dev
docker compose -f docker-compose.prod.yml config -q   # valida el de prod
```