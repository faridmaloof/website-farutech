#!/usr/bin/env bash
# ==============================================================================
# FaruTech — Genera ci/kubeconfig a partir del kubeconfig de K3s para que el
# runner/act_runner (contenedor) pueda hablar con la API de K3s por IP, no por
# 127.0.0.1 (que dentro de un contenedor apuntaría al propio contenedor).
#
# Ejecutar EN LA RASPBERRY PI, con acceso de sudo:
#   sudo bash scripts/prepare-kubeconfig.sh
# ==============================================================================
set -euo pipefail

SRC="/etc/rancher/k3s/k3s.yaml"
OUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/ci/kubeconfig"
SERVER="https://192.168.1.5:6443"    # IP de la Raspberry Pi

[ -r "$SRC" ] || { echo "No existe $SRC (¿K3s está instalado?)."; exit 1; }

# Cambia solo la línea `server:` por la versión por-IP. K3s expone la API en
# 127.0.0.1 y en la IP de la red vía el mismo token admin.
rm -f "$OUT"
sed "s#server: https://127.0.0.1:6443#server: $SERVER#; s#server: https://localhost:6443#server: $SERVER#" "$SRC" > "$OUT"
chmod 600 "$OUT"

echo "==> kubeconfig generado en ci/kubeconfig (server: $SERVER)"
echo "    Pruébalo en un contenedor:"
echo "    docker run --rm -v $(pwd)/ci/kubeconfig:/config kubectl ... --kubeconfig=/config"