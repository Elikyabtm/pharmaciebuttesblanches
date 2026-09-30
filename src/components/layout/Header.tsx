"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CalendarDays, Clock, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/config/navigation";
import { pharmacy, telHref } from "@/config/pharmacy";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";

function TopBar() {
  return (
    <div className="bg-brand text-forest">
      <div className="container-site flex min-h-9 items-center justify-center gap-6 text-[0.78rem] font-semibold md:justify-between">
        <p className="tracking-wide">
          Livraison <span aria-hidden className="mx-1.5 opacity-60">•</span> Piluliers{" "}
          <span aria-hidden className="mx-1.5 opacity-60">•</span> Conseils &amp; accompagnement
        </p>
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/contact#horaires" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
            <Clock aria-hidden className="size-3.5" /> Horaires
          </Link>
          <a href={telHref} className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
            <Phone aria-hidden className="size-3.5" /> {pharmacy.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Fermer le menu mobile à chaque navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 24));

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <TopBar />
      <motion.header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
          compact ? "border-line shadow-soft" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-6 transition-[height] duration-300 ease-(--ease-soft)",
            compact ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <NavDropdown
                      label={item.label}
                      items={item.children}
                      overview={item.overview}
                      active={item.children.some((c) => isActive(c.href))}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center rounded-full px-4 text-[0.92rem] font-semibold transition-colors",
                        isActive(item.href) ? "text-forest" : "text-muted hover:text-forest",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <span aria-hidden className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-brand" />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href={pharmacy.links.doctolib} icon={CalendarDays} disabledHint="Lien Doctolib bientôt disponible">
                Prendre rendez-vous
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-forest transition-colors hover:bg-sage lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
