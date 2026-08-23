# ==========================================================================
# FaruTech — Frontend (Vite + React)
#
# Etapa 1: compila la SPA con Node 22 (Vite 8 requiere Node ^20.19 || >=22.12)
# Etapa 2: Nginx sirve los estáticos y proxyea /api al contenedor backend.
# ==========================================================================

# --------------------------------------------------------------------------
# Etapa 1 — Build
# --------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Instalar dependencias con el lockfile (builds reproducibles)
COPY apps/frontend/package.json apps/frontend/package-lock.json* ./
RUN npm ci

# Código fuente y compilación
COPY apps/frontend ./
RUN npm run build

# --------------------------------------------------------------------------
# Etapa 2 — Servidor web (SPA + proxy de la API)
# --------------------------------------------------------------------------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80