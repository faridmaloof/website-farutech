import { motion, useReducedMotion } from "framer-motion";
import type { ContentBlock } from "../types";

const positionClasses = { left: "text-left", right: "text-left", centered: "text-center", full: "text-left" } as const;
const motionVariants = { "fade-up": { opacity: 0, y: 24 }, "fade-in": { opacity: 0 }, "slide-left": { opacity: 0, x: -32 }, "slide-right": { opacity: 0, x: 32 }, none: { opacity: 1 } } as const;

function Action({ block }: { block: ContentBlock }) {
  if (!block.cta) return null;
  const primary = block.cta.variant === "primary";
  return <a href={block.cta.href} className={`mt-7 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition-colors ${primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-surface"}`} {...(block.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{block.cta.text}</a>;
}

function Items({ block }: { block: ContentBlock }) {
  if (!block.items?.length) return null;
  return <ul className={`mt-8 grid gap-4 ${block.type === "metrics" ? "sm:grid-cols-3" : "md:grid-cols-3"}`}>
    {block.items.map((item) => <li key={item.title} className="rounded-2xl border border-border bg-card p-5">
      {item.value && <p className="font-display text-4xl font-semibold text-primary">{item.value}</p>}
      <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </li>)}
  </ul>;
}

export function PageBuilder({ blocks }: { blocks: ContentBlock[] }) {
  const reducedMotion = useReducedMotion();
  return <div>{blocks.map((block) => {
    const initial = reducedMotion || block.animation === "none" ? false : motionVariants[block.animation ?? "fade-in"];
    return <section key={block.id} id={block.id} aria-labelledby={`${block.id}-title`} className={`relative overflow-hidden py-14 md:py-20 ${block.bgClass ?? ""}`}>
      <motion.div initial={initial} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.55 }} className={`mx-auto max-w-7xl px-6 ${positionClasses[block.position]}`}>
        <div className={block.position === "full" ? "" : "mx-auto max-w-3xl"}>
          {block.type === "hero" && <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Caso de éxito</p>}
          {block.title && <h2 id={`${block.id}-title`} className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">{block.title}</h2>}
          {block.subtitle && <p className="mt-4 text-xl text-foreground">{block.subtitle}</p>}
          {block.content && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{block.content}</p>}
          <Action block={block} />
        </div>
        <Items block={block} />
      </motion.div>
    </section>;
  })}</div>;
}
