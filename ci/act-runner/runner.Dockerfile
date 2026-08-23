# ==============================================================================
# FaruTech — Contenedor del agente act_runner de Gitea.
# Solo añadimos utilidades de depuración; el grueso (docker CLI + kubectl) vive
# en la imagen de trabajo ci-base.Dockerfile que usan los JOBS.
# ==============================================================================
FROM gitea/act_runner:latest

USER root
RUN apk add --no-cache curl bash ca-certificates docker-cli
ENV DOCKER_HOST="unix:///var/run/docker.sock"
ENV KUBECONFIG="/opt/runner/kube/config"
WORKDIR /opt/runner