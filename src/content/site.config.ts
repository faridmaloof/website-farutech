import type { SiteConfig, SolutionConfig } from "../types";

const seo = (title: string, description: string, slug: string) => ({
  title,
  description,
  keywords: ["FaruTech", title, "ingeniería de software"],
  canonical: `https://www.farutech.com/trabajo#${slug}`,
  ogImage: "https://www.farutech.com/logo.webp",
});

const afilamos: SolutionConfig = {
  id: "afilamos-hermanos", slug: "afilamos-hermanos", title: "Afilamos Hermanos", subtitle: "Web, POS y gestión de órdenes", shortDescription: "Operación industrial digitalizada.", description: "Sitio corporativo, punto de venta y trazabilidad de órdenes para una operación de afilado industrial.", icon: "Wrench", color: "#3FC1FF", gradient: "from-primary to-accent", shape: "arch", isActive: true, order: 1,
  seo: seo("Afilamos Hermanos | FaruTech", "Caso de éxito de web, POS y órdenes.", "afilamos-hermanos"),
  blocks: [
    { id: "afilamos-hero", type: "hero", position: "centered", title: "Afilamos Hermanos", subtitle: "Web, POS y gestión de órdenes", content: "Digitalizamos el flujo completo de pedidos, desde la solicitud hasta la entrega.", cta: { text: "Visitar sitio", href: "https://www.afilamoshermanos.com/", variant: "outline" }, animation: "fade-up" },
    { id: "afilamos-features", type: "features", position: "left", title: "Una operación conectada", content: "Herramientas construidas para el trabajo diario de la empresa.", items: [{ title: "Sitio corporativo", description: "Presencia digital clara para sus sectores industriales." }, { title: "POS personalizado", description: "Registro de ventas adaptado a la operación." }, { title: "Gestión de órdenes", description: "Seguimiento y trazabilidad en tiempo real." }], animation: "slide-left" },
    { id: "afilamos-stack", type: "logos", position: "centered", title: "Stack tecnológico", items: [{ title: "React + TypeScript", description: "Interfaz de la plataforma." }, { title: "Node.js + PostgreSQL", description: "Servicios y datos operativos." }, { title: "Tailwind CSS", description: "Sistema de interfaz." }], animation: "fade-in" },
    { id: "afilamos-metrics", type: "metrics", position: "centered", title: "Impacto operativo", items: [{ value: "+40%", title: "Eficiencia", description: "en el flujo operativo." }, { value: "-90%", title: "Errores", description: "manuales en órdenes." }, { value: "100%", title: "Trazabilidad", description: "del pedido a la entrega." }], animation: "fade-up" },
  ],
};

const supraeventos: SolutionConfig = {
  id: "supraeventos", slug: "supraeventos", title: "Supraeventos", subtitle: "Cloud y seguridad", shortDescription: "Infraestructura preparada para escalar.", description: "Infraestructura cloud, hardening de seguridad y arquitectura escalable para aplicaciones internas.", icon: "Cloud", color: "#22E07C", gradient: "from-accent to-primary", shape: "hex", isActive: true, order: 2,
  seo: seo("Supraeventos | FaruTech", "Caso de éxito de infraestructura cloud y seguridad.", "supraeventos"),
  blocks: [
    { id: "supra-hero", type: "hero", position: "centered", title: "Supraeventos", subtitle: "Infraestructura cloud y seguridad", content: "Arquitectura escalable y segura para aplicaciones internas críticas.", animation: "fade-up" },
    { id: "supra-features", type: "features", position: "right", title: "Base cloud resiliente", content: "Automatización e infraestructura diseñada para continuidad operativa.", items: [{ title: "Cloud AWS / GCP", description: "Servicios escalables para aplicaciones internas." }, { title: "Hardening", description: "Controles de seguridad y buenas prácticas de acceso." }, { title: "CI/CD", description: "Entrega consistente de cambios." }], animation: "slide-right" },
    { id: "supra-stack", type: "logos", position: "centered", title: "Stack tecnológico", items: [{ title: "AWS / GCP", description: "Infraestructura cloud." }, { title: "Docker + Kubernetes", description: "Contenedores y orquestación." }, { title: "Terraform", description: "Infraestructura como código." }], animation: "fade-in" },
    { id: "supra-metrics", type: "metrics", position: "centered", title: "Resultados", items: [{ value: "99.9%", title: "Uptime", description: "objetivo de disponibilidad." }, { value: "0", title: "Brechas", description: "reportadas durante el alcance." }, { value: "24/7", title: "Operación", description: "preparada para eventos." }], animation: "fade-up" },
  ],
};

const catalog: SolutionConfig[] = [
  afilamos, supraeventos,
  { id: "saas-platforms", slug: "saas-platforms", title: "SaaS Platforms", subtitle: "Productos multi-tenant", shortDescription: "Plataformas listas para crecer.", description: "Diseño y construcción de productos SaaS.", icon: "Layers", color: "#3FC1FF", gradient: "from-primary to-accent", shape: "diagonal", seo: seo("SaaS Platforms | FaruTech", "Plataformas SaaS.", "saas-platforms"), blocks: [], isActive: true, order: 3 },
  { id: "ux-engineering", slug: "ux-engineering", title: "UX Engineering", subtitle: "Experiencias accesibles", shortDescription: "Interfaces que funcionan para todos.", description: "Diseño e implementación de interfaces de producto.", icon: "PanelsTopLeft", color: "#B66BFF", gradient: "from-primary to-accent", shape: "blob", seo: seo("UX Engineering | FaruTech", "UX Engineering.", "ux-engineering"), blocks: [], isActive: true, order: 4 },
  { id: "product-engineering", slug: "product-engineering", title: "Product Engineering", subtitle: "Software a medida", shortDescription: "Productos de producción.", description: "Ingeniería de producto de punta a punta.", icon: "Code2", color: "#FF7A1A", gradient: "from-primary to-accent", shape: "arch", seo: seo("Product Engineering | FaruTech", "Product Engineering.", "product-engineering"), blocks: [], isActive: true, order: 5 },
  { id: "architecture-consulting", slug: "architecture-consulting", title: "Architecture Consulting", subtitle: "Decisiones técnicas", shortDescription: "Arquitectura pragmática.", description: "Consultoría de arquitectura y modernización.", icon: "Network", color: "#22E07C", gradient: "from-primary to-accent", shape: "hex", seo: seo("Architecture Consulting | FaruTech", "Architecture Consulting.", "architecture-consulting"), blocks: [], isActive: true, order: 6 },
];

export const siteConfig: SiteConfig = { siteName: "FaruTech", url: "https://www.farutech.com", language: "es", languages: ["es", "en"], social: { linkedin: "https://www.linkedin.com/company/farutech/?viewAsMember=true", website: "https://www.farutech.com" }, contact: { email: "hello@farutech.com", address: "Bogotá · Cali · Remoto" }, solutions: catalog, featureFlags: { analytics: false, newsletter: false, blog: false, testimonials: false } };
export const caseStudies = [afilamos, supraeventos];
