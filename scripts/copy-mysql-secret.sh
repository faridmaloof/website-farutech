#!/usr/bin/env bash
# ==============================================================================
# FaruTech — Copia las credenciales de MySQL (namespace `infra`) a un Secret
# `backend-secrets` dentro del namespace `hosting`. También genera APP_KEY.
#
# Ejecutar con kubectl apuntando al clúster (shell de la Raspberry Pi o PC).
#   ./scripts/copy-mysql-secret.sh
#
# IMPORTANTE: los nombres de clave del Secret `mysql-secret` de `infra`
# dependen de cómo se desplegó MySQL. El script intenta las más habituales
# (MYSQL_USER / MYSQL_ROOT_USER, MYSQL_PASSWORD / MYSQL_ROOT_PASSWORD,
# MYSQL_DATABASE). Ajusta la función `pick` si las tuyas son distintas.
#
# Para ver las claves reales de tu Secret:
#   kubectl -n infra get secret mysql-secret -o jsonpath='{.data}' | tr ',' '\n'
# ==============================================================================
set -euo pipefail

NS=hosting
SECRET_SRC="mysql-secret"           # Secret en infra
SECRET_DST="backend-secrets"        # Secret que creamos en hosting

echo "==> Garantizando namespace '$NS'"
kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f- >/dev/null

# Leer un valor base64 del Secret de infra (devuelve '' si la clave no existe)
pick() {
  kubectl -n infra get secret "$SECRET_SRC" -o jsonpath="{.data.$1}" 2>/dev/null | base64 -d 2>/dev/null || echo ""
}

DB_USER="$(pick MYSQL_USER)";        [ -n "$DB_USER" ] || DB_USER="$(pick MYSQL_ROOT_USER)"
DB_PASS="$(pick MYSQL_PASSWORD)";    [ -n "$DB_PASS" ] || DB_PASS="$(pick MYSQL_ROOT_PASSWORD)"
DB_NAME="$(pick MYSQL_DATABASE)";    [ -n "$DB_NAME" ] || DB_NAME="farutech"

if [ -z "$DB_USER" ] || [ -z "$DB_PASS" ]; then
  echo "!! No se pudo leer usuario/contraseña del Secret '$SECRET_SRC' de 'infra'." >&2
  echo "   Comprueba las claves con el comando de arriba y edita este script." >&2
  exit 1
fi

APP_KEY="${APP_KEY:-base64:$(openssl rand -base64 32 | tr -d '\n')}"

echo "==> Creando '$SECRET_DST' en '$NS' (DB_HOST: mysql.infra.svc.cluster.local)"
kubectl -n "$NS" create secret generic "$SECRET_DST" \
  --from-literal=DB_USERNAME="$DB_USER" \
  --from-literal=DB_PASSWORD="$DB_PASS" \
  --from-literal=DB_DATABASE="$DB_NAME" \
  --from-literal=APP_KEY="$APP_KEY" \
  --dry-run=client -o yaml | kubectl apply -f-

echo "==> Hecho. $SECRET_DST en $NS:"