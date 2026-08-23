#!/usr/bin/env bash
# ==========================================================================
# FaruTech — Despliegue a la Raspberry Pi (entorno de desarrollo)
#
# Requiere: rsync, scp, ssh, y un alias SSH configurado (RBSV01_C) en
# ~/.ssh/config. Ejecutar desde la raíz del repositorio.
#
#   Uso:   ./scripts/deploy-dev.sh
#   Env:   DEPLOY_USER (pi), DEPLOY_HOST (RBSV01_C), DEPLOY_DIR (opcional)
# ==========================================================================
set -euo pipefail

REMOTE_USER="${DEPLOY_USER:-pi}"
REMOTE_HOST="${DEPLOY_HOST:-RBSV01_C}"                        # alias SSH
REMOTE_DIR="${DEPLOY_DIR:-~/dev-server/projects/farutech}"    # ruta remota
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
  echo "!! No existe .env local. Copia .env.example a .env o verifica que ya"
  echo "   exista en el servidor."
fi

echo "==> Reconstruyendo y levantando contenedores"
ssh -t "${REMOTE_URL}" "cd ${REMOTE_DIR} && docker compose up -d --build"

echo "==> Listo. Accede a http://${REMOTE_HOST}:8080"