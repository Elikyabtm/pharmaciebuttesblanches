import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { CtaArrow } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AudienceCardProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
  featured?: boolean;
};

/** Grande carte « Vous êtes ? » entièrement cliquable. */
export function AudienceCard({ icon: Icon, label, title, text, href, cta = "Faire une demande", featured }: AudienceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-card-lg border p-8 transition-[transform,box-shadow,border-color,background-color] duration-500 ease-(--ease-soft) hover:-translate-y-1.5 hover:shadow-lift sm:p-10",
        featured ? "border-transparent bg-forest text-white" : "border-line bg-white hover:border-brand/40",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex size-16 items-center justify-center rounded-2xl transition-colors duration-500",
            featured ? "bg-brand text-forest" : "bg-sage text-brand-strong group-hover/card:bg-brand group-hover/card:text-forest",
          )}
        >
          <Icon aria-hidden className="size-7" strokeWidth={1.4} />
        </span>
        <span
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] uppercase",
            featured ? "bg-white/10 text-brand-soft" : "bg-cream text-brand-strong",
          )}
        >
          {label}
        </span>
      </div>
      <h3 className={cn("mt-12 font-serif text-[1.75rem] leading-tight font-normal", featured && "text-white")}>{title}</h3>
      <p className={cn("mt-4 flex-1 leading-relaxed", featured ? "text-white/70" : "text-muted")}>{text}</p>
      <span
        className={cn(
          "mt-10 inline-flex items-center gap-2 font-semibold",
          featured ? "text-brand-soft" : "text-brand-strong group-hover/card:text-forest",
        )}
      >
        {cta}
        <CtaArrow />
      </span>
    </Link>
  );
}
