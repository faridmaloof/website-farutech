// ============================================================================
// FaruTech — Configuración maestra del sitio (Arquitectura Lego)
// Única fuente de verdad para navegación, soluciones y contenido dinámico.
// IMPORTANTE: cada solution.slug DEBE coincidir con los selectores
// [data-service="..."] definidos en src/styles/global.css
// ============================================================================

import type { SiteConfig, SolutionConfig } from '../types';

// ---------------------------------------------------------------------------
// 1) DESARROLLO A MEDIDA
// ---------------------------------------------------------------------------
const customDevelopment: SolutionConfig = {
  id: 'desarrollo-a-medida',
  slug: 'desarrollo-a-medida',
  title: 'Desarrollo de Software a Medida',
  subtitle: 'Soluciones core para tu negocio',
  description:
    'Construimos plataformas empresariales, aplicaciones web y sistemas core diseñados específicamente para resolver los retos operativos de tu organización.',
  shortDescription: 'Sistemas a medida para escalar tu operación.',
  icon: 'Code2',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-[--color-accent]',
  shape: 'origami-left',
  seo: {
    title: 'Desarrollo de Software a Medida | FaruTech',
    description: 'Ingeniería de software a medida. Construimos plataformas robustas y escalables.',
    keywords: ['desarrollo a medida', 'software factory', 'desarrollo web', 'arquitectura de software'],
    canonical: 'https://farutech.com/capacidades/desarrollo-a-medida',
    ogImage: '/og/desarrollo-a-medida.jpg',
  },
  isActive: true,
  order: 1,
  blocks: [
    {
      id: 'dev-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'origami-left',
      title: 'Software que se adapta a tu negocio, no al revés',
      subtitle: 'Desarrollo a Medida',
      content: 'Construimos sistemas core robustos que potencian tus operaciones y te preparan para escalar, usando tecnologías modernas y mejores prácticas de ingeniería.',
      cta: { text: 'Agenda un diagnóstico técnico', href: '/contacto?servicio=desarrollo-a-medida', variant: 'primary' },
      animation: 'fade-up',
    },
    {
      id: 'dev-intro',
      type: 'intro',
      position: 'left',
      title: 'No empaquetamos soluciones genéricas',
      content: 'Entendemos que cada negocio tiene flujos únicos. Nos especializamos en traducir tu complejidad operativa en software eficiente, mantenible y escalable.',
      animation: 'fade-in',
    },
    {
      id: 'dev-features',
      type: 'features',
      position: 'right',
      title: 'Nuestro enfoque',
      items: [
        { title: 'Arquitectura escalable', description: 'Sistemas diseñados para crecer contigo, no para ser reemplazados en 2 años.', icon: 'Layers' },
        { title: 'Código mantenible', description: 'Pruebas automatizadas, CI/CD y documentación desde el día uno.', icon: 'CheckCircle' },
        { title: 'Integración nativa', description: 'Conectamos tu nuevo software con tus sistemas legacy existentes.', icon: 'Link' },
      ],
      animation: 'slide-right',
    },
  ],
};

// ---------------------------------------------------------------------------
// 2) PLATAFORMAS SAAS
// ---------------------------------------------------------------------------
const saasPlatforms: SolutionConfig = {
  id: 'plataformas-saas',
  slug: 'plataformas-saas',
  title: 'Desarrollo de Plataformas SaaS',
  subtitle: 'De la idea al producto escalable',
  description:
    'Arquitectura y desarrollo de productos multi-tenant (SaaS) con facturación recurrente, seguridad y aislamiento de datos garantizado.',
  shortDescription: 'Construimos tu producto SaaS multi-tenant.',
  icon: 'Layers',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-[--color-accent]',
  shape: 'origami-right',
  seo: {
    title: 'Desarrollo de Plataformas SaaS | FaruTech',
    description: 'Construimos productos SaaS escalables, multi-tenant y listos para facturar.',
    keywords: ['desarrollo saas', 'plataformas saas', 'software como servicio', 'producto digital'],
    canonical: 'https://farutech.com/capacidades/plataformas-saas',
    ogImage: '/og/plataformas-saas.jpg',
  },
  isActive: true,
  order: 2,
  blocks: [
    {
      id: 'saas-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'origami-right',
      title: 'Arquitectura SaaS lista para tus primeros 1,000 clientes',
      subtitle: 'Plataformas SaaS',
      content: 'Diseñamos la base correcta desde el día cero: multi-tenancy real, cobros recurrentes y seguridad de grado empresarial.',
      cta: { text: 'Conversemos sobre tu producto', href: '/contacto?servicio=plataformas-saas', variant: 'primary' },
      animation: 'fade-up',
    },
  ],
};

// ---------------------------------------------------------------------------
// 3) MODERNIZACIÓN DE SISTEMAS
// ---------------------------------------------------------------------------
const modernization: SolutionConfig = {
  id: 'modernizacion',
  slug: 'modernizacion',
  title: 'Modernización de Sistemas (Legacy)',
  subtitle: 'Actualiza tu core sin detener el negocio',
  description:
    'Refactorización y migración de sistemas heredados a arquitecturas modernas, nube y microservicios, mitigando el riesgo operativo.',
  shortDescription: 'Migra tus sistemas legacy a arquitecturas modernas.',
  icon: 'ArrowUpRight',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-black',
  shape: 'dark-authority',
  seo: {
    title: 'Modernización de Sistemas y Software Legacy | FaruTech',
    description: 'Migramos y modernizamos sistemas heredados (legacy) a tecnologías actuales y cloud.',
    keywords: ['modernización de software', 'migración cloud', 'sistemas legacy', 'refactorización'],
    canonical: 'https://farutech.com/capacidades/modernizacion',
    ogImage: '/og/modernizacion.jpg',
  },
  isActive: true,
  order: 3,
  blocks: [
    {
      id: 'mod-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'dark-authority',
      title: 'El software viejo te cuesta más de lo que crees',
      subtitle: 'Modernización de Sistemas',
      content: 'Migramos tus monolitos frágiles y tecnologías obsoletas hacia plataformas cloud escalables y seguras, sin interrumpir tu operación diaria.',
      cta: { text: 'Auditar sistema actual', href: '/contacto?servicio=modernizacion', variant: 'primary' },
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
  title: 'UX Engineering & Diseño',
  subtitle: 'Interfaces profesionales que convierten',
  description:
    'Cierre de la brecha entre el diseño visual y la implementación técnica. Construimos interfaces de usuario de alto nivel con accesibilidad y performance integrados.',
  shortDescription: 'Diseño de experiencia e interfaces premium.',
  icon: 'Palette',
  color: 'var(--color-primary)',
  gradient: 'from-[--color-primary] to-[--color-accent]',
  shape: 'organic',
  seo: {
    title: 'UX Engineering y Diseño de Interfaces | FaruTech',
    description: 'Diseño y desarrollo frontend avanzado. Interfaces profesionales y accesibles.',
    keywords: ['ux engineering', 'diseño de interfaces', 'frontend avanzado', 'ui/ux'],
    canonical: 'https://farutech.com/capacidades/ux-engineering',
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
      title: 'Diseño que funciona tan bien como se ve',
      subtitle: 'UX Engineering',
      content: 'No hacemos mockups imposibles de programar. Entregamos componentes reales en React/Tailwind listos para producción, garantizando accesibilidad y performance.',
      cta: { text: 'Mejorar mi interfaz', href: '/contacto?servicio=ux-engineering', variant: 'primary' },
      animation: 'fade-up',
    },
  ],
};

// ---------------------------------------------------------------------------
// 5) STAFF AUGMENTATION & IT PROJECT MANAGEMENT
// ---------------------------------------------------------------------------
const staffAugmentation: SolutionConfig = {
  id: 'staff-augmentation',
  slug: 'staff-augmentation',
  title: 'Staff Augmentation & Gestión de Proyectos',
  subtitle: 'Acelera tu roadmap técnico',
  description:
    'Potencia a tu equipo interno con nuestros ingenieros senior o confíanos la gestión técnica completa de tus proyectos para garantizar entregas a tiempo.',
  shortDescription: 'Ingenieros expertos y gestión técnica para tus proyectos.',
  icon: 'Users',
  color: 'var(--color-primary)',
  gradient: 'from-gray-800 to-black',
  shape: 'dark-authority',
  seo: {
    title: 'IT Staff Augmentation y Gestión de Proyectos | FaruTech',
    description: 'Aumenta tu capacidad técnica con nuestros ingenieros de software senior y project managers.',
    keywords: ['staff augmentation', 'it outsourcing', 'gestión de proyectos it', 'ingenieros de software'],
    canonical: 'https://farutech.com/capacidades/staff-augmentation',
    ogImage: '/og/staff-augmentation.jpg',
  },
  isActive: true,
  order: 5,
  blocks: [
    {
      id: 'staff-hero',
      type: 'hero',
      position: 'full',
      heroLayout: 'dark-authority',
      title: 'El talento y la disciplina para llegar a producción',
      subtitle: 'Gestión de Proyectos y Staffing',
      content: 'Te proveemos ingenieros de software de alto rendimiento y metodologías ágiles comprobadas para desatascar tu backlog y entregar valor real.',
      cta: { text: 'Agendar consultoría', href: '/contacto?servicio=staff-augmentation', variant: 'primary' },
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
  solutions: [customDevelopment, saasPlatforms, modernization, uxEngineering, staffAugmentation],
};

export default siteConfig;
