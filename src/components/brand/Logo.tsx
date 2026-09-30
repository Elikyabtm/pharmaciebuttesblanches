import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LOGO TEMPORAIRE — typographique.
 * Pour intégrer le logo officiel : remplacer <LogoMark /> et le texte par
 * <Image src="/logo.svg" … /> dans ce seul composant.
 */
export function LogoMark({ className, tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  const main = tone === "light" ? "#B7D092" : "#8EB55C";
  const accent = tone === "light" ? "#FFFFFF" : "#15301F";
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-9 shrink-0", className)}>
      {/* Croix abstraite : quatre pétales arrondis + cœur */}
      <rect x="15" y="3" width="10" height="15" rx="5" fill={main} />
      <rect x="15" y="22" width="10" height="15" rx="5" fill={main} opacity=".55" />
      <rect x="3" y="15" width="15" height="10" rx="5" fill={main} opacity=".55" />
      <rect x="22" y="15" width="15" height="10" rx="5" fill={main} />
      <circle cx="20" cy="20" r="3.2" fill={accent} />
    </svg>
  );
}

export function Logo({ className, tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Pharmacie des Buttes Blanches — accueil"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark tone={tone} className="transition-transform duration-500 ease-(--ease-soft) group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[0.68rem] font-bold tracking-[0.22em] uppercase",
            tone === "light" ? "text-brand-soft" : "text-brand-strong",
          )}
        >
          Pharmacie
        </span>
        <span
          className={cn(
            "mt-1 font-serif text-[1.2rem] leading-none",
            tone === "light" ? "text-white" : "text-forest",
          )}
        >
          des Buttes Blanches
        </span>
      </span>
    </Link>
  );
}
