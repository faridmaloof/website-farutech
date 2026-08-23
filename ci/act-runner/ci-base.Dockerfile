# ==============================================================================
# FaruTech — Imagen de trabajo para los JOBS de Gitea Actions.
# Contiene lo necesario para el pipeline de dev:
#   - git + bash + curl  (actions/checkout y pasos)
#   - docker CLI         (construye y empuja imágenes al daemon del host)
#   - kubectl            (actualiza los deployments en K3s)
# Constrúyela en la Raspberry Pi y tágala como:
#   docker build -t farutech-ci:latest -f ci/act-runner/ci-base.Dockerfile .
# La etiqueta del runner (container) usa esta imagen; asegúrate de que el
# daemon Docker la tenga local o accesible.
# ==============================================================================
FROM debian:12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
        curl ca-certificates git bash jq openssh-client \
    && rm -rf /var/lib/apt/lists/*

# kubectl (versión fija, estable)
ENV KUBECTL_VERSION=v1.30.0
RUN curl -L -o /usr/local/bin/kubectl \
        "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/arm64/kubectl" \
    && chmod +x /usr/local/bin/kubectl

# Docker CLI (cliente) desde el repo oficial de Docker
RUN curl -fsSL https://get.docker.com | sh \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

ENV DOCKER_HOST="unix:///var/run/docker.sock"
ENV KUBECONFIG="/workspace/kube/config"
WORKDIR /workspace