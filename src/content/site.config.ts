// ============================================================================
// FaruTech — Configuración maestra del sitio (Arquitectura Lego)
// Única fuente de verdad para navegación, soluciones y contenido dinámico.
// IMPORTANTE: cada solution.slug DEBE coincidir con los selectores
// [data-service="..."] definidos en src/styles/global.css
// ============================================================================

import type { SiteConfig, SolutionConfig } from '../types';

// ---------------------------------------------------------------------------
// 1) WEB + POS — Caso real: Afilamos Hermanos
// ---------------------------------------------------------------------------
const webPos: SolutionConfig = {
  id: 'web-pos',
  slug: 'web-pos',
  title: 'Web + POS + Gestión de Órdenes',
  subtitle: 'Del mostrador al checkout, todo conectado',
  description:
    'Plataformas web comerciales conectadas a sistemas de punto de venta (POS) y gestión de órdenes en tiempo real, pensadas para negocios que venden en mostrador y en línea sin duplicar procesos.',
  shortDescription: 'Web comercial + POS + órdenes en tiempo real.',
  icon: 'ShoppingCart',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-[--color-accent]',
  shape: 'origami-fold-top',
  seo: {
    title: 'Desarrollo Web y POS para Comercio | FaruTech',
    description:
      'Diseñamos e implementamos plataformas web con punto de venta (POS) integrado y gestión de órdenes en tiempo real. Caso real: Afilamos Hermanos.',
    keywords: ['desarrollo web comercial', 'sistema pos', 'gestión de órdenes', 'punto de venta', 'e-commerce colombia'],
    canonical: 'https://farutech.com/servicios/web-pos',
    ogImage: '/og/web-pos.jpg',
  },
  isActive: true,
  order: 1,
  blocks: [
    {
      id: 'web-pos-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'origami-left',
      title: 'Tu mostrador y tu tienda en línea, en el mismo sistema',
      subtitle: 'Web + POS + Gestión de Órdenes',
      content:
        'Construimos plataformas comerciales donde cada venta —física o digital— se registra en un solo lugar, sin dobles procesos ni inventarios desincronizados.',
      cta: { text: 'Agenda un diagnóstico', href: '/contacto?servicio=web-pos', variant: 'primary' },
      image: { src: '/media/web-pos/hero.jpg', alt: 'Sistema POS y plataforma web integrados en un mostrador comercial' },
      animation: 'fade-up',
    },
    {
      id: 'web-pos-intro',
      type: 'intro',
      position: 'left',
      title: 'El problema de vender en dos mundos separados',
      content:
        'La mayoría de comercios operan su tienda física y su canal digital con sistemas que no se hablan entre sí: inventario duplicado, precios desactualizados y errores humanos en cada turno.',
      animation: 'fade-in',
    },
    {
      id: 'web-pos-problems',
      type: 'problems',
      position: 'right',
      title: 'Lo que resolvemos',
      items: [
        { title: 'Inventario duplicado', description: 'Stock que no coincide entre mostrador y tienda en línea.', icon: 'PackageX' },
        { title: 'Errores en caja', description: 'Cobros manuales propensos a error humano y descuadres.', icon: 'AlertTriangle' },
        { title: 'Órdenes perdidas', description: 'Pedidos que se traspapelan entre canales y turnos.', icon: 'FileX' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'web-pos-approach',
      type: 'approach',
      position: 'centered',
      title: 'Nuestro enfoque',
      content:
        'Implementamos un sistema único de inventario y órdenes, con una capa web moderna encima y un POS operado desde el mismo mostrador — sin curva de aprendizaje larga para el equipo del negocio.',
      animation: 'fade-up',
    },
    {
      id: 'web-pos-usecase-afilamos',
      type: 'useCases',
      position: 'left',
      title: 'Caso real: Afilamos Hermanos',
      content:
        'Rediseñamos la operación comercial de Afilamos Hermanos integrando su punto de venta físico con una plataforma web de pedidos y un panel único de gestión de órdenes.',
      items: [
        { title: 'Eficiencia operativa', description: 'Reducción del tiempo de gestión por pedido.', value: '+40%' },
        { title: 'Errores de inventario', description: 'Disminución de descuadres y errores manuales.', value: '-90%' },
      ],
      cta: { text: 'Ver caso completo', href: '/casos-de-exito/afilamos-hermanos', variant: 'outline' },
      animation: 'slide-left',
    },
    {
      id: 'web-pos-metrics',
      type: 'metrics',
      position: 'centered',
      title: 'Resultados que se sostienen en el tiempo',
      items: [
        { title: 'Eficiencia', description: 'en gestión de pedidos', value: '+40%' },
        { title: 'Errores', description: 'de inventario y caja', value: '-90%' },
        { title: 'Tiempo', description: 'de implementación promedio', value: '6-8 sem' },
      ],
      animation: 'fade-up',
    },
    {
      id: 'web-pos-cta',
      type: 'cta',
      position: 'full',
      title: '¿Tu negocio vende en varios canales?',
      content: 'Hablemos de cómo unificar tu operación sin detener las ventas.',
      cta: { text: 'Escríbenos', href: '/contacto?servicio=web-pos', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

// ---------------------------------------------------------------------------
// 2) CLOUD + SECURITY — Caso real: Supraeventos
// ---------------------------------------------------------------------------
const cloudSecurity: SolutionConfig = {
  id: 'cloud-security',
  slug: 'cloud-security',
  title: 'Infraestructura Cloud y Seguridad',
  subtitle: 'AWS / GCP, disponibilidad y protección real',
  description:
    'Diseño, migración y operación de infraestructura en la nube con foco en disponibilidad, seguridad y costos controlados — para negocios donde una caída no es una opción.',
  shortDescription: 'Infraestructura AWS/GCP + seguridad + alta disponibilidad.',
  icon: 'ShieldCheck',
  color: 'var(--color-charcoal)',
  gradient: 'from-[--color-charcoal] to-[--color-primary]',
  shape: 'origami-fold-dark',
  seo: {
    title: 'Infraestructura Cloud AWS/GCP y Seguridad | FaruTech',
    description:
      'Arquitectura cloud de alta disponibilidad y seguridad gestionada en AWS y GCP. Caso real: Supraeventos, 99.9% de uptime y 0 brechas de seguridad.',
    keywords: ['infraestructura cloud', 'aws', 'gcp', 'seguridad informática', 'alta disponibilidad', 'devops'],
    canonical: 'https://farutech.com/servicios/cloud-security',
    ogImage: '/og/cloud-security.jpg',
  },
  isActive: true,
  order: 2,
  blocks: [
    {
      id: 'cloud-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'dark-authority',
      title: 'Infraestructura que no se cae cuando más la necesitas',
      subtitle: 'Cloud AWS / GCP + Seguridad gestionada',
      content:
        'Arquitecturas cloud diseñadas para picos de tráfico, eventos críticos y cero tolerancia a brechas de seguridad.',
      cta: { text: 'Solicita una auditoría', href: '/contacto?servicio=cloud-security', variant: 'primary' },
      image: { src: '/media/cloud-security/hero.jpg', alt: 'Visualización abstracta de infraestructura cloud distribuida' },
      animation: 'fade-in',
    },
    {
      id: 'cloud-intro',
      type: 'intro',
      position: 'left',
      title: 'Cuando la infraestructura es el negocio',
      content:
        'Para operaciones con eventos en vivo o tráfico impredecible, la infraestructura no es un detalle técnico: es la diferencia entre vender y perder al cliente en el peor momento.',
      animation: 'fade-in',
    },
    {
      id: 'cloud-problems',
      type: 'problems',
      position: 'right',
      title: 'Riesgos que eliminamos',
      items: [
        { title: 'Caídas en picos de tráfico', description: 'Infraestructura que no escala a tiempo.', icon: 'ServerCrash' },
        { title: 'Superficie de ataque abierta', description: 'Configuraciones expuestas sin monitoreo.', icon: 'ShieldAlert' },
        { title: 'Costos impredecibles', description: 'Facturas cloud sin control ni optimización.', icon: 'TrendingUp' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'cloud-approach',
      type: 'approach',
      position: 'centered',
      title: 'Nuestro enfoque',
      content:
        'Arquitecturas multi-AZ, autoescalado, monitoreo activo 24/7 y hardening de seguridad desde el diseño (no como parche posterior).',
      animation: 'fade-up',
    },
    {
      id: 'cloud-usecase-supra',
      type: 'useCases',
      position: 'left',
      title: 'Caso real: Supraeventos',
      content:
        'Migramos y aseguramos la infraestructura de Supraeventos para soportar picos masivos de tráfico durante lanzamientos de eventos, con cero incidentes de seguridad desde la implementación.',
      items: [
        { title: 'Disponibilidad', description: 'Uptime sostenido en producción.', value: '99.9%' },
        { title: 'Brechas de seguridad', description: 'Incidentes registrados desde la migración.', value: '0' },
      ],
      cta: { text: 'Ver caso completo', href: '/casos-de-exito/supraeventos', variant: 'outline' },
      animation: 'slide-left',
    },
    {
      id: 'cloud-metrics',
      type: 'metrics',
      position: 'centered',
      title: 'Números que respaldan la operación',
      items: [
        { title: 'Uptime', description: 'disponibilidad garantizada', value: '99.9%' },
        { title: 'Brechas', description: 'de seguridad reportadas', value: '0' },
        { title: 'Monitoreo', description: 'cobertura de infraestructura', value: '24/7' },
      ],
      animation: 'fade-up',
    },
    {
      id: 'cloud-cta',
      type: 'cta',
      position: 'full',
      title: '¿Tu infraestructura está lista para tu próximo pico de tráfico?',
      content: 'Hagamos una auditoría antes de que sea un problema.',
      cta: { text: 'Solicitar auditoría', href: '/contacto?servicio=cloud-security', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

// ---------------------------------------------------------------------------
// 3) SAAS PLATFORMS
// ---------------------------------------------------------------------------
const saasPlatforms: SolutionConfig = {
  id: 'saas-platforms',
  slug: 'saas-platforms',
  title: 'Plataformas SaaS',
  subtitle: 'De la idea al producto que factura',
  description:
    'Diseño y desarrollo de plataformas SaaS multi-tenant, con facturación recurrente, control de acceso por planes y arquitectura pensada para escalar desde el primer cliente.',
  shortDescription: 'Producto SaaS multi-tenant listo para escalar.',
  icon: 'Layers',
  color: 'var(--color-emerald)',
  gradient: 'from-[--color-emerald] to-[--color-primary]',
  shape: 'floating-layers',
  seo: {
    title: 'Desarrollo de Plataformas SaaS | FaruTech',
    description: 'Construimos plataformas SaaS multi-tenant con facturación recurrente y arquitectura escalable desde el día uno.',
    keywords: ['desarrollo saas', 'plataforma multi-tenant', 'software como servicio', 'producto digital'],
    canonical: 'https://farutech.com/servicios/saas-platforms',
    ogImage: '/og/saas-platforms.jpg',
  },
  isActive: true,
  order: 3,
  blocks: [
    {
      id: 'saas-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'organic',
      title: 'Tu producto SaaS, construido para crecer',
      subtitle: 'Plataformas SaaS multi-tenant',
      content: 'Del MVP al producto con clientes pagando: arquitectura, facturación y experiencia de usuario en un solo equipo.',
      cta: { text: 'Cuéntanos tu producto', href: '/contacto?servicio=saas-platforms', variant: 'primary' },
      image: { src: '/media/saas-platforms/hero.jpg', alt: 'Capas de interfaz de un dashboard SaaS' },
      animation: 'fade-up',
    },
    {
      id: 'saas-intro',
      type: 'intro',
      position: 'left',
      title: 'La mayoría de los SaaS no fallan por falta de idea',
      content: 'Fallan por arquitectura que no soporta crecimiento, o por meses perdidos en infraestructura antes de tener el primer cliente pagando.',
      animation: 'fade-in',
    },
    {
      id: 'saas-features',
      type: 'features',
      position: 'right',
      title: 'Lo que incluye',
      items: [
        { title: 'Multi-tenancy', description: 'Aislamiento de datos por cliente desde el diseño.', icon: 'Building2' },
        { title: 'Facturación recurrente', description: 'Planes, upgrades y cobros automatizados.', icon: 'CreditCard' },
        { title: 'Control de acceso', description: 'Roles y permisos por plan contratado.', icon: 'KeyRound' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'saas-approach',
      type: 'approach',
      position: 'centered',
      title: 'Nuestro enfoque',
      content: 'Empezamos por el modelo de datos y el ciclo de facturación —no por la interfaz— para que el producto no requiera reescribirse al primer cliente grande.',
      animation: 'fade-up',
    },
    {
      id: 'saas-cta',
      type: 'cta',
      position: 'full',
      title: '¿Tienes la idea y necesitas el equipo técnico?',
      content: 'Hablemos de arquitectura antes que de pantallas.',
      cta: { text: 'Agendar llamada', href: '/contacto?servicio=saas-platforms', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

// ---------------------------------------------------------------------------
// 4) UX ENGINEERING
// ---------------------------------------------------------------------------
const uxEngineering: SolutionConfig = {
  id: 'ux-engineering',
  slug: 'ux-engineering',
  title: 'UX Engineering',
  subtitle: 'Diseño que se puede construir',
  description:
    'Investigación, diseño de experiencia e implementación en el mismo flujo de trabajo — eliminando la brecha entre lo que se diseña y lo que realmente se construye.',
  shortDescription: 'Investigación + diseño + implementación, sin brechas.',
  icon: 'Palette',
  color: 'var(--color-accent)',
  gradient: 'from-[--color-accent] to-[--color-charcoal]',
  shape: 'organic-blob',
  seo: {
    title: 'UX Engineering: Diseño e Implementación | FaruTech',
    description: 'Investigación de usuarios, diseño de experiencia e implementación técnica en un solo flujo de trabajo continuo.',
    keywords: ['ux engineering', 'diseño de experiencia', 'investigación de usuarios', 'diseño de producto'],
    canonical: 'https://farutech.com/servicios/ux-engineering',
    ogImage: '/og/ux-engineering.jpg',
  },
  isActive: true,
  order: 4,
  blocks: [
    {
      id: 'ux-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'organic',
      title: 'Diseño que no se pierde en la traducción',
      subtitle: 'UX Engineering',
      content: 'El mismo equipo que investiga, diseña y construye — sin handoffs que diluyen la idea original.',
      cta: { text: 'Ver proceso de diseño', href: '/contacto?servicio=ux-engineering', variant: 'primary' },
      image: { src: '/media/ux-engineering/hero.jpg', alt: 'Proceso de diseño desde wireframe hasta producto final' },
      animation: 'fade-up',
    },
    {
      id: 'ux-intro',
      type: 'intro',
      position: 'left',
      title: 'El problema del "eso no se ve como el diseño"',
      content: 'Cuando diseño e implementación son equipos separados, algo siempre se pierde. Nosotros cerramos esa brecha desde el proceso.',
      animation: 'fade-in',
    },
    {
      id: 'ux-approach',
      type: 'approach',
      position: 'right',
      title: 'Cómo trabajamos',
      items: [
        { title: 'Investigación', description: 'Entrevistas y datos reales antes de diseñar.', icon: 'Search' },
        { title: 'Prototipado', description: 'Validación rápida con usuarios reales.', icon: 'Layout' },
        { title: 'Implementación', description: 'El mismo equipo construye lo que diseñó.', icon: 'Code2' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'ux-cta',
      type: 'cta',
      position: 'full',
      title: '¿Tu producto necesita sentirse tan bien como funciona?',
      content: 'Hablemos de tu experiencia de usuario actual.',
      cta: { text: 'Agendar diagnóstico UX', href: '/contacto?servicio=ux-engineering', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

// ---------------------------------------------------------------------------
// 5) PRODUCT ENGINEERING
// ---------------------------------------------------------------------------
const productEngineering: SolutionConfig = {
  id: 'product-engineering',
  slug: 'product-engineering',
  title: 'Product Engineering',
  subtitle: 'Ingeniería con criterio de producto',
  description:
    'Equipos de ingeniería que entienden el negocio, no solo el ticket técnico — desarrollo de producto digital de principio a fin con estándares de código sostenibles.',
  shortDescription: 'Ingeniería de producto de principio a fin.',
  icon: 'Blocks',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-[--color-emerald]',
  shape: 'blueprint-grid-broken',
  seo: {
    title: 'Product Engineering: Desarrollo de Producto Digital | FaruTech',
    description: 'Ingeniería de software con criterio de producto: arquitectura sostenible, código mantenible y foco en el negocio.',
    keywords: ['product engineering', 'desarrollo de software', 'ingeniería de producto', 'arquitectura de software'],
    canonical: 'https://farutech.com/servicios/product-engineering',
    ogImage: '/og/product-engineering.jpg',
  },
  isActive: true,
  order: 5,
  blocks: [
    {
      id: 'pe-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'origami-right',
      title: 'Ingeniería que entiende para qué sirve lo que construye',
      subtitle: 'Product Engineering',
      content: 'No tomamos tickets, entendemos el problema de negocio antes de escribir la primera línea de código.',
      cta: { text: 'Hablemos de tu producto', href: '/contacto?servicio=product-engineering', variant: 'primary' },
      image: { src: '/media/product-engineering/hero.jpg', alt: 'Código y terminal con un build corriendo' },
      animation: 'fade-up',
    },
    {
      id: 'pe-intro',
      type: 'intro',
      position: 'left',
      title: 'Código que sobrevive al equipo que lo escribió',
      content: 'Construimos con estándares que permiten que cualquier desarrollador entienda, mantenga y escale el producto sin depender de una sola persona.',
      animation: 'fade-in',
    },
    {
      id: 'pe-approach',
      type: 'approach',
      position: 'right',
      title: 'Principios que seguimos',
      items: [
        { title: 'Arquitectura sostenible', description: 'Principios SOLID y componentes reutilizables.', icon: 'Blocks' },
        { title: 'Calidad medible', description: 'Testing, typecheck y CI en cada entrega.', icon: 'CheckCircle2' },
        { title: 'Documentación viva', description: 'El código se entiende sin depender de quien lo escribió.', icon: 'BookOpen' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'pe-cta',
      type: 'cta',
      position: 'full',
      title: '¿Tu producto necesita un equipo de ingeniería serio?',
      content: 'Conversemos sobre el estado actual de tu código.',
      cta: { text: 'Solicitar diagnóstico técnico', href: '/contacto?servicio=product-engineering', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

// ---------------------------------------------------------------------------
// 6) ARCHITECTURE CONSULTING
// ---------------------------------------------------------------------------
const architectureConsulting: SolutionConfig = {
  id: 'architecture-consulting',
  slug: 'architecture-consulting',
  title: 'Architecture Consulting',
  subtitle: 'Decisiones técnicas que no se pagan dos veces',
  description:
    'Consultoría de arquitectura de software para equipos que necesitan tomar decisiones técnicas de largo plazo con criterio experto y sin sesgo comercial.',
  shortDescription: 'Consultoría de arquitectura de software senior.',
  icon: 'Building',
  color: 'var(--color-charcoal)',
  gradient: 'from-[--color-charcoal] to-black',
  shape: 'minimal-lines',
  seo: {
    title: 'Consultoría de Arquitectura de Software | FaruTech',
    description: 'Consultoría senior de arquitectura de software: decisiones técnicas de largo plazo, sin sesgo comercial.',
    keywords: ['consultoría de arquitectura', 'arquitectura de software', 'consultoría técnica', 'due diligence técnico'],
    canonical: 'https://farutech.com/servicios/architecture-consulting',
    ogImage: '/og/architecture-consulting.jpg',
  },
  isActive: true,
  order: 6,
  blocks: [
    {
      id: 'ac-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'dark-authority',
      title: 'Antes de construir, decide bien',
      subtitle: 'Architecture Consulting',
      content: 'Evaluamos tu arquitectura actual o futura con criterio senior, sin conflicto de interés en la implementación.',
      cta: { text: 'Solicitar evaluación', href: '/contacto?servicio=architecture-consulting', variant: 'primary' },
      image: { src: '/media/architecture-consulting/hero.jpg', alt: 'Diagrama de arquitectura de software dibujándose en una pizarra' },
      animation: 'fade-in',
    },
    {
      id: 'ac-intro',
      type: 'intro',
      position: 'left',
      title: 'La decisión más cara es la que se toma sin criterio experto',
      content: 'Evaluamos escalabilidad, seguridad, costos de mantenimiento y riesgos técnicos antes de que se conviertan en deuda técnica irreversible.',
      animation: 'fade-in',
    },
    {
      id: 'ac-usecases',
      type: 'useCases',
      position: 'right',
      title: 'Cuándo nos necesitas',
      items: [
        { title: 'Due diligence técnico', description: 'Evaluación previa a inversión o adquisición.', icon: 'FileSearch' },
        { title: 'Revisión de arquitectura', description: 'Antes de escalar o migrar un sistema crítico.', icon: 'GitBranch' },
        { title: 'Segunda opinión técnica', description: 'Validación independiente de decisiones ya tomadas.', icon: 'MessageSquareText' },
      ],
      animation: 'slide-right',
    },
    {
      id: 'ac-cta',
      type: 'cta',
      position: 'full',
      title: '¿Necesitas una opinión técnica independiente?',
      content: 'Conversemos antes de que la decisión se vuelva costosa.',
      cta: { text: 'Agendar consultoría', href: '/contacto?servicio=architecture-consulting', variant: 'primary' },
      animation: 'fade-in',
    },
  ],
};

export const siteConfig: SiteConfig = {
  siteName: 'FaruTech',
  url: 'https://farutech.com',
  language: 'es',
  languages: ['es'],
  social: {
    linkedin: 'https://www.linkedin.com/company/farutech',
    website: 'https://farutech.com',
  },
  contact: {
    email: 'contacto@farutech.com',
  },
  featureFlags: {
    analytics: true,
    newsletter: true,
    blog: true,
    testimonials: true,
  },
  solutions: [webPos, cloudSecurity, saasPlatforms, uxEngineering, productEngineering, architectureConsulting],
};

export default siteConfig;
