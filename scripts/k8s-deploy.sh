#!/usr/bin/env bash
# ==============================================================================
# FaruTech — Despliegue (o actualización) de toda la app en K3s (namespace hosting)
#
# Uso (desde la raíz del repo, con kubectl hacia el clúster):
#   ./scripts/k8s-deploy.sh
#
# Orden: namespace -> secret -> configmap -> pvc -> deployments -> services
#        -> ingress -> rollout status + verificación.
# ==============================================================================
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
K8S="$ROOT/deploy/k3s"

kubectl apply -f "$K8S/namespace.yaml"

# El Secret lo crea el script (no se versiona). Se re-aplica solo si falta.
if ! kubectl -n hosting get secret backend-secrets >/dev/null 2>&1; then
  echo "==> Creando Secret backend-secrets a partir de infra/mysql-secret"
  "$ROOT/scripts/copy-mysql-secret.sh"
fi

kubectl apply -f "$K8S/backend-configmap.yaml"
kubectl apply -f "$K8S/backend-storage-pvc.yaml"
kubectl apply -f "$K8S/backend-deployment.yaml"
kubectl apply -f "$K8S/backend-service.yaml"
kubectl apply -f "$K8S/frontend-deployment.yaml"
kubectl apply -f "$K8S/frontend-service.yaml"
kubectl apply -f "$K8S/ingress.yaml"

echo "==> Esperando rollout de Deployments (hasta 300s)"
kubectl rollout status deployment/backend  -n hosting --timeout=300s
kubectl rollout status deployment/frontend -n hosting --timeout=300s

echo "==> Estado final"
kubectl -n hosting get pods,svc,ingress