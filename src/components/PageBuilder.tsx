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
import type { ContentBlock, BlockPosition, AnimationType } from '../types';

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
// ---------------------------------------------------------------------------
// Sub-renderers por tipo de bloque
// ---------------------------------------------------------------------------

function HeroBlock({ block }: { block: ContentBlock }) {
  const isDark = block.heroLayout === 'dark-authority';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-none md:rounded-3xl min-h-[50vh] flex items-center border border-border',
        isDark ? 'bg-zinc-950 text-white' : 'bg-surface/50 text-foreground'
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative z-10 max-w-3xl px-6 md:px-16 py-20">
        {block.subtitle && (
          <p className="text-sm uppercase tracking-widest font-semibold text-primary mb-6">
            {block.subtitle}
          </p>
        )}
        {block.title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] mb-6 tracking-tight">{block.title}</h1>
        )}
        {block.content && <p className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">{block.content}</p>}
        {block.cta && (
          <a
            href={block.cta.href}
            className={cn(
              'inline-flex items-center px-8 py-4 rounded-xl font-medium transition-colors text-sm',
              block.cta.variant === 'outline'
                ? 'border border-border hover:bg-muted'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {block.cta.text}
          </a>
        )}
      </div>
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
