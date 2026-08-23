# ==========================================================================
# FaruTech — Backend (Laravel/Lumen + PHP-FPM + Nginx)
#
# Etapa 1: instala dependencias PHP con Composer.
# Etapa 2: imagen de producción con PHP-FPM y Nginx, ambos gestionados por
#          Supervisor (un contenedor, dos procesos: HTTP en :80, FPM en :9000).
# ==========================================================================

# --------------------------------------------------------------------------
# Etapa 1 — Dependencias PHP (solo producción, sin scripts)
# --------------------------------------------------------------------------
FROM composer:2 AS vendor

WORKDIR /app

COPY apps/backend/composer.json apps/backend/composer.lock* ./
RUN composer install \
        --no-dev \
        --prefer-dist \
        --optimize-autoloader \
        --no-interaction \
        --no-scripts

# --------------------------------------------------------------------------
# Etapa 2 — Runtime: PHP-FPM + Nginx
# --------------------------------------------------------------------------
FROM php:8.3-fpm-alpine

# Extensiones PHP + nginx + supervisor
RUN apk add --no-cache \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        zip \
        libzip-dev \
        oniguruma-dev \
        libxml2-dev \
        curl-dev \
        nginx \
        supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Aplicación
WORKDIR /var/www/html
COPY --from=vendor /app/vendor ./vendor
COPY apps/backend ./

# Configuración de procesos (nginx + supervisor)
COPY docker/backend/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/backend/supervisord.conf /etc/supervisord.conf

# Permisos para storage y bootstrap/cache (www-data = usuario de php-fpm)
# Se crean los directorios porque Lumen no trae bootstrap/cache por defecto
# y storage puede llegar montado como volumen vacío.
RUN mkdir -p /run/nginx \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]