import Link from "next/link";
import type { ReactNode } from "react";
import { isConfigured } from "@/config/pharmacy";
import { cn, isExternalHref } from "@/lib/utils";

export type SmartLinkProps = {
  /** Lien interne, externe, tel:, mailto:… Vide = lien non configuré (désactivé proprement). */
  href: string;
  children: ReactNode;
  className?: string;
  /** Classes ajoutées quand le lien n'est pas encore configuré. */
  disabledClassName?: string;
  /** Texte d'aide affiché au survol quand le lien est désactivé. */
  disabledHint?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

/**
 * Lien universel :
 * - interne → next/link
 * - externe → nouvel onglet, rel="noopener noreferrer"
 * - non configuré → rendu désactivé, jamais de "#".
 */
export function SmartLink({
  href,
  children,
  className,
  disabledClassName = "cursor-not-allowed opacity-60",
  disabledHint = "Bientôt disponible",
  onClick,
  ...rest
}: SmartLinkProps) {
  if (!isConfigured(href)) {
    return (
      <span aria-disabled="true" title={disabledHint} className={cn(className, disabledClassName)} {...rest}>
        {children}
        <span className="sr-only"> ({disabledHint})</span>
      </span>
    );
  }

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick} {...rest}>
        {children}
        <span className="sr-only"> (ouvre un nouvel onglet)</span>
      </a>
    );
  }

  if (/^(tel|sms|mailto):/.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/** Petite pastille « Bientôt » pour un lien pas encore disponible. */
export function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "rounded-full bg-forest/8 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.12em] text-forest/70 uppercase",
        className,
      )}
    >
      Bientôt
    </span>
  );
}
