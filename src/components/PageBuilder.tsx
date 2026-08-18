// ============================================================================
// FaruTech — PageBuilder: motor de renderizado de bloques "Lego"
// ----------------------------------------------------------------------------
// SOLID:
// - Single Responsibility: este archivo solo decide QUÉ renderizar y CÓMO
//   posicionarlo/animarlo. No conoce el contenido de negocio (eso vive en
//   src/content/site.config.ts).
// - Open/Closed: agregar un nuevo BlockType nuevo no obliga a modificar
//   el motor, solo a agregar un caso en blockRenderers.
// - Nota de escalado: cuando el proyecto crezca, cada renderer de este
//   objeto se puede mover a su propio archivo en src/components/blocks/
//   sin cambiar el contrato de PageBuilder.
// ============================================================================

import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { cn } from '../lib/utils';
import type { ContentBlock, BlockPosition, AnimationType, HeroLayout } from '../types';

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function getPositionClasses(position: BlockPosition): string {
  switch (position) {
    case 'left':
      return 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center';
    case 'right':
      return 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:[direction:rtl] [&>*]:[direction:ltr]';
    case 'centered':
      return 'flex flex-col items-center text-center max-w-3xl mx-auto';
    case 'full':
    default:
      return 'w-full';
  }
}

function getAnimationVariants(animation: AnimationType = 'fade-up'): Variants {
  switch (animation) {
    case 'fade-in':
      return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
    case 'slide-left':
      return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
    case 'slide-right':
      return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
    case 'none':
      return { hidden: {}, visible: {} };
    case 'fade-up':
    default:
      return { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  }
}

/**
 * Clip-path por heroLayout — evita el "grid 2 columnas genérico".
 * Los ángulos están inspirados en el pliegue del isotipo de FaruTech,
 * NO son diagonales arbitrarias de 45°.
 */
function getHeroClipPath(layout: HeroLayout = 'origami-left'): string {
  switch (layout) {
    case 'origami-left':
      return 'polygon(0 0, 62% 0, 48% 100%, 0% 100%)';
    case 'origami-right':
      return 'polygon(38% 0, 100% 0, 100% 100%, 52% 100%)';
    case 'dark-authority':
      return 'none'; // fondo oscuro completo, sin recorte — la autoridad viene del vacío, no de la forma
    case 'organic':
      return 'none'; // se resuelve con blobs SVG en el propio HeroBlock, no con clip-path
    default:
      return 'none';
  }
}

// ---------------------------------------------------------------------------
// Sub-renderers por tipo de bloque
// ---------------------------------------------------------------------------

function HeroBlock({ block }: { block: ContentBlock }) {
  const clipPath = getHeroClipPath(block.heroLayout);
  const isDark = block.heroLayout === 'dark-authority';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-none md:rounded-3xl min-h-[70vh] flex items-center',
        isDark ? 'bg-[--color-charcoal] text-white' : 'bg-[--color-primary]/5'
      )}
    >
      <div className="relative z-10 max-w-2xl px-6 md:px-16 py-16">
        {block.subtitle && (
          <p className="text-sm uppercase tracking-widest font-semibold text-[--color-primary] mb-4">
            {block.subtitle}
          </p>
        )}
        {block.title && (
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.05] mb-6">{block.title}</h1>
        )}
        {block.content && <p className="text-lg opacity-80 mb-8 max-w-xl">{block.content}</p>}
        {block.cta && (
          <a
            href={block.cta.href}
            className={cn(
              'inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors',
              block.cta.variant === 'outline'
                ? 'border border-current'
                : 'bg-[--color-primary] text-white hover:opacity-90'
            )}
          >
            {block.cta.text}
          </a>
        )}
      </div>

      {block.image && (
        <div
          className="absolute inset-y-0 right-0 w-full md:w-[60%] bg-cover bg-center"
          style={{ backgroundImage: `url(${block.image.src})`, clipPath }}
          role="img"
          aria-label={block.image.alt}
        />
      )}
    </div>
  );
}

function ItemsGrid({ block }: { block: ContentBlock }) {
  if (!block.items?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {block.items.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl border border-black/5 bg-white/50">
          {item.value && <p className="text-3xl font-display font-bold text-[--color-primary] mb-2">{item.value}</p>}
          <h3 className="font-semibold mb-1">{item.title}</h3>
          <p className="text-sm opacity-70">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function TextBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      {block.title && <h2 className="text-3xl font-display font-bold mb-4">{block.title}</h2>}
      {block.subtitle && <p className="text-[--color-primary] font-medium mb-2">{block.subtitle}</p>}
      {block.content && <p className="text-lg opacity-80 mb-6">{block.content}</p>}
      {block.items && <ItemsGrid block={block} />}
      {block.cta && (
        <a href={block.cta.href} className="inline-flex items-center font-medium text-[--color-primary] mt-4 hover:underline">
          {block.cta.text} →
        </a>
      )}
    </div>
  );
}

function CtaBlock({ block }: { block: ContentBlock }) {
  return (
    <div className="text-center bg-[--color-charcoal] text-white rounded-3xl px-8 py-16">
      {block.title && <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{block.title}</h2>}
      {block.content && <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">{block.content}</p>}
      {block.cta && (
        <a
          href={block.cta.href}
          className="inline-flex items-center px-8 py-4 rounded-full font-medium bg-[--color-primary] hover:opacity-90 transition-opacity"
        >
          {block.cta.text}
        </a>
      )}
    </div>
  );
}

/**
 * Mapa tipo -> componente. Agregar un BlockType nuevo = agregar una línea
 * aquí, sin tocar el resto del motor (Open/Closed Principle).
 */
const blockRenderers: Record<string, (props: { block: ContentBlock }) => JSX.Element | null> = {
  hero: HeroBlock,
  intro: TextBlock,
  problems: TextBlock,
  approach: TextBlock,
  useCases: TextBlock,
  metrics: TextBlock,
  testimonials: TextBlock,
  faq: TextBlock,
  timeline: TextBlock,
  team: TextBlock,
  pricing: TextBlock,
  contact: TextBlock,
  gallery: TextBlock,
  video: TextBlock,
  stats: TextBlock,
  logos: TextBlock,
  features: TextBlock,
  cta: CtaBlock,
};

// ---------------------------------------------------------------------------
// PageBuilder — componente público
// ---------------------------------------------------------------------------

export interface PageBuilderProps {
  blocks: ContentBlock[];
  /** slug de la solución/servicio, se inyecta como data-service para theming (ver global.css) */
  serviceTheme?: string;
}

export default function PageBuilder({ blocks, serviceTheme }: PageBuilderProps) {
  return (
    <div data-service={serviceTheme} className="flex flex-col gap-20 md:gap-32">
      {blocks.map((block) => {
        const Renderer = block.type === 'hero' ? HeroBlock : blockRenderers[block.type] ?? TextBlock;
        const headingId = `${block.id}-heading`;

        return (
          <motion.section
            key={block.id}
            id={block.id}
            role="region"
            aria-labelledby={block.title ? headingId : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={getAnimationVariants(block.animation)}
            className={cn(
              block.type !== 'hero' && block.type !== 'cta' && 'px-6 md:px-0',
              block.type !== 'hero' && getPositionClasses(block.position),
              block.bgClass
            )}
          >
            <Renderer block={block} />
          </motion.section>
        );
      })}
    </div>
  );
}
