import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { pharmacy } from "@/config/pharmacy";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${pharmacy.siteUrl}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.label} className="inline-flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="rounded transition-colors hover:text-forest">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last && "font-semibold text-forest")}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 opacity-50" />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
