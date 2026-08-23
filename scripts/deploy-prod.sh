#!/usr/bin/env bash
# ==========================================================================
# FaruTech — Despliegue a producción (VPS Hostinger)
#
# Requiere: rsync, scp, ssh y las credenciales del VPS. Ejecutar desde la
# raíz del repositorio. El .env local se copia al servidor.
#
#   Uso: ./scripts/deploy-prod.sh
#   Env: DEPLOY_USER (root), DEPLOY_HOST (IP del VPS), DEPLOY_DIR (opcional)
# ==========================================================================
set -euo pipefail

REMOTE_USER="${DEPLOY_USER:-root}"
REMOTE_HOST="${DEPLOY_HOST:-tu_ip_vps}"
REMOTE_DIR="${DEPLOY_DIR:-/var/www/farutech}"
REMOTE_URL="${REMOTE_USER}@${REMOTE_HOST}"

echo "==> Sincronizando código hacia ${REMOTE_URL}:${REMOTE_DIR}"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude 'vendor' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '*/storage/logs/*' \
  -e ssh ./ "${REMOTE_URL}:${REMOTE_DIR}/"

if [ -f .env ]; then
  echo "==> Copiando .env al servidor"
  scp .env "${REMOTE_URL}:${REMOTE_DIR}/.env"
else
  echo "!! No existe .env local. Aborta para no desplegar sin configuración." >&2
  exit 1
fi

echo "==> Reconstruyendo y levantando contenedores (producción)"
ssh -t "${REMOTE_URL}" "cd ${REMOTE_DIR} && docker compose -f docker-compose.prod.yml up -d --build"

echo "==> Despliegue completado"