"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CtaArrow } from "@/components/ui/Button";
import type { NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  label: string;
  items: NavLink[];
  overview?: NavLink;
  active?: boolean;
};

/** Menu déroulant desktop : survol, clic et clavier (Échap, flèche bas). */
export function NavDropdown({ label, items, overview, active }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Fermer à la navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const wide = items.length > 4;

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => rootRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
          }
        }}
        className={cn(
          "relative inline-flex h-11 items-center gap-1 rounded-full px-4 text-[0.92rem] font-semibold transition-colors",
          active || open ? "text-forest" : "text-muted hover:text-forest",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
        />
        {active && <span aria-hidden className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-brand" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3",
              wide ? "w-[36rem]" : "w-[22rem]",
            )}
          >
            <div className="origin-top overflow-hidden rounded-card border border-line bg-white p-2.5 shadow-lift">
              <ul className={cn("grid gap-1", wide && "grid-cols-2")}>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-sage focus-visible:bg-sage"
                      >
                        {Icon && (
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sage text-brand-strong transition-colors group-hover:bg-white">
                            <Icon aria-hidden className="size-[1.15rem]" strokeWidth={1.6} />
                          </span>
                        )}
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-forest">{item.label}</span>
                          {item.description && (
                            <span className="mt-0.5 text-[0.8rem] leading-snug text-muted">{item.description}</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {overview && (
                <Link
                  href={overview.href}
                  className="group/btn mt-2 flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sand"
                >
                  {overview.label}
                  <CtaArrow />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
