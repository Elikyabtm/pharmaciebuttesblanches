"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronDown, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/config/navigation";
import { pharmacy, telHref } from "@/config/pharmacy";
import { cn } from "@/lib/utils";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Piège de focus simple dans le panneau
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-forest/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-lift"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-20 items-center justify-between border-b border-line px-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-forest hover:bg-sage"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-line">
                {mainNav.map((item) =>
                  item.children ? (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between py-4 text-lg font-semibold text-forest"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn("size-5 text-muted transition-transform", expanded === item.label && "rotate-180")}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {[...(item.overview ? [item.overview] : []), ...item.children].map((child) => {
                              const Icon = child.icon;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex min-h-12 items-center gap-3 rounded-2xl px-2 text-[0.98rem] text-muted hover:bg-sage hover:text-forest"
                                  >
                                    <span className="flex size-9 items-center justify-center rounded-xl bg-sage text-brand-strong">
                                      {Icon ? (
                                        <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                                      ) : (
                                        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                                      )}
                                    </span>
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                            <li aria-hidden className="h-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="flex items-center py-4 text-lg font-semibold text-forest"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="grid gap-3 border-t border-line bg-cream p-5">
              <ButtonLink href={pharmacy.links.doctolib} icon={CalendarDays} size="lg" disabledHint="Lien Doctolib bientôt disponible">
                Prendre rendez-vous
              </ButtonLink>
              <ButtonLink href={telHref} variant="secondary" size="lg" icon={Phone}>
                Appeler le {pharmacy.phone.display}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
