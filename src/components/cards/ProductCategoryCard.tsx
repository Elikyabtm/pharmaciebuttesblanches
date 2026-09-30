import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/ui/Button";
import { productHref, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";

type ProductCategoryCardProps = {
  category: ProductCategory;
  /** Variante de mise en page pour la grille éditoriale */
  variant?: "tall" | "wide" | "default";
  className?: string;
  sizes?: string;
};

export function ProductCategoryCard({
  category,
  variant = "default",
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: ProductCategoryCardProps) {
  const Icon = category.icon;
  return (
    <Link
      href={productHref(category.slug)}
      className={cn("group/card flex h-full flex-col", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-card-lg bg-sage",
          variant === "tall" && "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[28rem] lg:flex-1",
          variant === "wide" && "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[19rem] lg:flex-1",
          variant === "default" && "aspect-[4/3]",
        )}
      >
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-(--ease-soft) group-hover/card:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-forest backdrop-blur">
          <Icon aria-hidden className="size-3.5 text-brand-strong" strokeWidth={1.8} />
          {category.name}
        </span>
      </div>
      <div className="flex items-end justify-between gap-6 pt-5">
        <div>
          <h3 className="text-xl font-bold transition-colors group-hover/card:text-brand-strong">{category.name}</h3>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{category.tagline}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-strong">
          Découvrir
          <CtaArrow />
        </span>
      </div>
    </Link>
  );
}
