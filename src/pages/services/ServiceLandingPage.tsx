/**
 * ServiceLandingPage — resuelve el servicio por params, aceptando tanto el slug
 * en inglés (`/services/software-development`) como el español (`/servicios/desarrollo-software`).
 */
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../NotFoundPage";
import { services } from "../../content/servicesData";
import { ServiceLanding } from "./ServiceLanding";

export function ServiceLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const cap = services.find((s) => s.slug === slug || s.slugEs === slug);
  if (!cap) return <NotFoundPage />;
  return <ServiceLanding cap={cap} />;
}