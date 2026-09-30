import Link from "next/link";
import type { ReactNode } from "react";
import { isConfigured, TODO } from "@/config/pharmacy";
import { cn, isExternalHref } from "@/lib/utils";

export type SmartLinkProps = {
  /** Lien interne, externe, tel:, sms:… ou TODO_REPLACE (lien désactivé proprement). */
  href: string | typeof TODO;
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
 * - externe → nouvel onglet sécurisé
 * - non configuré (TODO_REPLACE) → rendu désactivé, jamais de "#".
 */
export function SmartLink({
  href,
  children,
  className,
  disabledClassName = "cursor-not-allowed opacity-60",
  disabledHint = "Lien bientôt disponible",
  onClick,
  ...rest
}: SmartLinkProps) {
  if (!isConfigured(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={disabledHint}
        className={cn(className, disabledClassName)}
        {...rest}
      >
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
