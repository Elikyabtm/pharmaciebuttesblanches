import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { isConfigured } from "@/config/pharmacy";
import { cn } from "@/lib/utils";
import { SmartLink, SoonBadge } from "./SmartLink";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-300 ease-(--ease-soft) select-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-forest hover:bg-brand-hover shadow-[inset_0_-1px_0_rgb(21_48_31/0.12)]",
  secondary: "border border-forest/15 bg-white text-forest hover:border-forest/35 hover:bg-cream",
  ghost: "text-brand-strong hover:text-forest",
  light: "bg-white text-forest hover:bg-sage",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

/** Flèche qui glisse légèrement au survol du CTA parent. */
export function CtaArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-(--ease-soft) group-hover/btn:translate-x-1 group-hover/card:translate-x-1",
        className,
      )}
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant,
  size,
  icon: Icon,
  arrow,
  className,
  children,
  disabledHint,
  "aria-label": ariaLabel,
}: CommonProps & { href: string; disabledHint?: string; "aria-label"?: string }) {
  const ready = isConfigured(href);
  return (
    <SmartLink
      href={href}
      className={buttonClasses(variant, size, className)}
      // Lien non configuré : rendu atténué + pastille « Bientôt », sans action
      disabledClassName="cursor-not-allowed opacity-75 saturate-50"
      disabledHint={disabledHint}
      aria-label={ariaLabel}
    >
      {Icon && <Icon aria-hidden className="size-4.5 shrink-0" />}
      {children}
      {ready ? arrow && <CtaArrow /> : <SoonBadge />}
    </SmartLink>
  );
}

export function Button({
  variant,
  size,
  icon: Icon,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {Icon && <Icon aria-hidden className="size-4.5 shrink-0" />}
      {children}
      {arrow && <CtaArrow />}
    </button>
  );
}
