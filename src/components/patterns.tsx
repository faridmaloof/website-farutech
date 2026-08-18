/**
 * Patterns — composiciones reutilizables: motifs de capacidad, cards, caso y marquee.
 * Los motifs replican la personalidad visual del refactor (grid/spectrum/blueprint/orbit/circuit).
 */
import { useId } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Capability, CapabilityMotif as MotifKind } from "../content/capabilities";
import { capUI } from "../content/capabilities";
import type { L } from "../i18n";
import { useT } from "../i18n";
import { Tag } from "./primitives";
import { cn } from "../lib/utils";

/* ---------- CapabilityMotif (patrón decorativo) ---------- */
export function CapabilityMotif({
  motif,
  accent,
  className,
}: {
  motif: MotifKind;
  accent: string;
  className?: string;
}) {
  const id = useId().replace(/[:]/g, "");
  const common = { className, "aria-hidden": true as const };

  switch (motif) {
    case "grid":
      return (
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" {...common}>
          <defs>
            <pattern id={`g${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke={accent} strokeOpacity="0.28" strokeWidth="1" />
            </pattern>
            <radialGradient id={`gf${id}`} cx="50%" cy="40%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="200" fill={`url(#g${id})`} />
          <rect width="400" height="200" fill={`url(#gf${id})`} />
        </svg>
      );
    case "spectrum":
      return (
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" {...common}>
          {Array.from({ length: 28 }).map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.7)) * 130;
            return (
              <rect
                key={i}
                x={i * 14 + 4}
                y={200 - h}
                width="7"
                height={h}
                rx="2"
                fill={accent}
                fillOpacity={0.14 + (i % 5) * 0.06}
              />
            );
          })}
        </svg>
      );
    case "blueprint":
      return (
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" {...common}>
          <defs>
            <pattern id={`b${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke={accent} strokeOpacity="0.22" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill={`url(#b${id})`} />
          <circle cx="200" cy="100" r="52" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx="200" cy="100" r="86" fill="none" stroke={accent} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M200 30v140M130 100h140" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        </svg>
      );
    case "orbit":
      return (
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" {...common}>
          {[28, 52, 78, 104].map((r, i) => (
            <ellipse key={r} cx="200" cy="100" rx={r + 40} ry={r} fill="none" stroke={accent} strokeOpacity={0.4 - i * 0.08} strokeWidth="1.2" />
          ))}
          <circle cx="200" cy="100" r="6" fill={accent} fillOpacity="0.9" />
          <circle cx="292" cy="62" r="4" fill={accent} fillOpacity="0.7" />
          <circle cx="118" cy="140" r="3" fill={accent} fillOpacity="0.6" />
        </svg>
      );
    case "circuit":
      return (
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" {...common}>
          <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.4" fill="none">
            <path d="M20 160h80v-60h70v-40h60" />
            <path d="M40 40h60v50h90v70" />
            <path d="M380 60h-70v50h-60v50" />
          </g>
          {[
            [100, 100], [170, 60], [230, 60], [190, 160], [310, 110], [250, 160], [100, 40],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={accent} fillOpacity={0.5 + (i % 3) * 0.18} />
          ))}
        </svg>
      );
  }
}

/* ---------- CapabilityCard ----------
 * `className` permite los spans del mosaico (col-span-2 / row-span-2).
 * `tall` hace que la banda visual crezca para llenar tarjetas de 2 filas.
 */
export function CapabilityCard({
  cap,
  delay = 0,
  className,
  tall = false,
}: {
  cap: Capability;
  delay?: number;
  className?: string;
  tall?: boolean;
}) {
  const t = useT();
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-foreground/20 hover:shadow-elevated",
        className
      )}
    >
      {/* Banda visual: imagen o motif, con glow del acento */}
      <div
        className={cn("relative overflow-hidden", tall ? "min-h-52 flex-1" : "h-44 shrink-0")}
        style={{ background: `linear-gradient(135deg, ${cap.accent}1f, transparent 70%)` }}
      >
        {cap.image ? (
          <img
            src={cap.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CapabilityMotif motif={cap.motif} accent={cap.accent} className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <span className="absolute right-4 top-4 font-mono text-[10px] font-semibold tracking-[0.35em] text-foreground/70">
          {t(cap.signature)}
        </span>
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}, transparent)` }}
          aria-hidden="true"
        />
      </div>

      <div className={cn("flex flex-col p-6", !tall && "flex-1")}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em]" style={{ color: cap.accent }}>
            {cap.index}
          </span>
          {cap.flag && (
            <span className="rounded-full border border-spark/30 bg-spark/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-spark">
              {t(cap.flag)}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{t(cap.name)}</h3>
        <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground", !tall && "flex-1")}>{t(cap.short)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cap.tags.map((tag) => (
            <Tag key={tag.es}>{t(tag)}</Tag>
          ))}
        </div>
        <Link
          to={`/capacidades/${cap.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-80"
          style={{ color: cap.accent }}
        >
          {t(capUI.verMas)} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}


/* ---------- Marquee (cinta de disciplinas) ---------- */
export function Marquee({ items }: { items: L[] }) {
  const t = useT();
  const row = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item.es} className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t(item)}
          <span className="mx-6 text-spark" aria-hidden="true">▸</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/30 py-4">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
