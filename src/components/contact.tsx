/**
 * Contact — drawer que se despliega desde la derecha (fiel al ContactDrawer del refactor).
 * Reemplaza la página /contacto: se abre desde cualquier CTA "Empezar un proyecto".
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { site } from "../content/site";
import { useT } from "../i18n";

const copy = {
  title: { es: "Empezar un proyecto", en: "Start a project" },
  subtitle: {
    es: "Cuéntanos qué necesitas. Respondemos con un diagnóstico honesto, no con un pitch.",
    en: "Tell us what you need. We reply with an honest diagnosis, not a pitch.",
  },
  nombre: { es: "Nombre", en: "Name" },
  nombrePh: { es: "Tu nombre", en: "Your name" },
  email: { es: "Email", en: "Email" },
  emailPh: { es: "tu@empresa.com", en: "you@company.com" },
  empresa: { es: "Empresa (opcional)", en: "Company (optional)" },
  empresaPh: { es: "Nombre de tu empresa", en: "Your company name" },
  mensaje: { es: "Cuéntanos del proyecto", en: "Tell us about the project" },
  mensajePh: {
    es: "Qué necesitas, en qué etapa estás, qué te frena…",
    en: "What you need, what stage you're at, what's holding you back…",
  },
  enviar: { es: "Enviar", en: "Send" },
  nota: {
    es: "Se abrirá tu cliente de correo con el mensaje listo. No almacenamos tus datos.",
    en: "Your mail client will open with the message ready. We don't store your data.",
  },
  directo: { es: "Directo", en: "Direct" },
  ubicacion: { es: "Ubicación", en: "Location" },
  respuesta: { es: "Respuesta", en: "Response" },
  respuestaVal: { es: "De un ingeniero, no de un bot", en: "From an engineer, not a bot" },
  cerrar: { es: "Cerrar", en: "Close" },
};

interface ContactValue {
  open: () => void;
  close: () => void;
}

const ContactContext = createContext<ContactValue>({ open: () => {}, close: () => {} });

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Cerrar con Escape + bloquear el scroll del body mientras está abierto
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <ContactContext.Provider value={{ open, close }}>
      {children}
      <ContactDrawer isOpen={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}

function ContactDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useT();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", mensaje: "" });
  const firstField = useRef<HTMLInputElement>(null);

  // Foco al primer campo al abrir
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => firstField.current?.focus(), 280);
    return () => clearTimeout(id);
  }, [isOpen]);

  const set =
    (k: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Proyecto: ${form.nombre || "Consulta"}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\nEmpresa: ${form.empresa}\n\n${form.mensaje}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col overflow-y-auto border-l border-border bg-card shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                ~/contacto
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t(copy.cerrar)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6">
              <h2 id="contact-drawer-title" className="font-display text-2xl font-semibold tracking-tight">
                {t(copy.title)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(copy.subtitle)}</p>

              <form onSubmit={handleSubmit} aria-label={t(copy.title)} className="mt-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cd-nombre" className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t(copy.nombre)}
                  </label>
                  <input id="cd-nombre" ref={firstField} required value={form.nombre} onChange={set("nombre")} placeholder={t(copy.nombrePh)} className={inputCls} />
                </div>
                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="cd-email" className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t(copy.email)}
                  </label>
                  <input id="cd-email" type="email" required value={form.email} onChange={set("email")} placeholder={t(copy.emailPh)} className={inputCls} />
                </div>
                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="cd-empresa" className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t(copy.empresa)}
                  </label>
                  <input id="cd-empresa" value={form.empresa} onChange={set("empresa")} placeholder={t(copy.empresaPh)} className={inputCls} />
                </div>
                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="cd-mensaje" className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t(copy.mensaje)}
                  </label>
                  <textarea id="cd-mensaje" required value={form.mensaje} onChange={set("mensaje")} placeholder={t(copy.mensajePh)} className={`${inputCls} min-h-32 resize-y`} />
                </div>
                <button
                  type="submit"
                  className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-base font-medium text-background shadow-[0_0_24px_-6px_rgba(255,255,255,0.3)] transition-all hover:bg-foreground/90"
                >
                  {t(copy.enviar)} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">{t(copy.nota)}</p>
              </form>

              <div className="mt-8 border-t border-border pt-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t(copy.directo)}
                </span>
                <div className="mt-4 space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="min-w-20 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Email</span>
                    <a href={`mailto:${site.email}`} className="text-sm font-semibold text-primary hover:underline">
                      {site.email}
                    </a>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="min-w-20 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t(copy.ubicacion)}</span>
                    <span className="text-sm font-semibold">{t(site.location)}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="min-w-20 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t(copy.respuesta)}</span>
                    <span className="text-sm font-semibold">{t(copy.respuestaVal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
