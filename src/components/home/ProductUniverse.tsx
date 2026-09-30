import { ProductCategoryCard } from "@/components/cards/ProductCategoryCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productCategories } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Grille éditoriale « magazine » :
 * desktop → 12 colonnes, cartes de tailles variées sur deux rangées décalées.
 */
const layout = [
  { variant: "tall", className: "sm:col-span-2 lg:col-span-5 lg:row-span-2", sizes: "(min-width: 1024px) 40vw, 100vw" },
  { variant: "wide", className: "lg:col-span-7", sizes: "(min-width: 1024px) 56vw, 100vw" },
  { variant: "default", className: "lg:col-span-3 lg:col-start-6", sizes: "(min-width: 1024px) 24vw, 50vw" },
  { variant: "default", className: "lg:col-span-4", sizes: "(min-width: 1024px) 32vw, 50vw" },
  { variant: "default", className: "lg:col-span-4 lg:col-start-2", sizes: "(min-width: 1024px) 32vw, 50vw" },
  { variant: "wide", className: "sm:col-span-2 lg:col-span-6", sizes: "(min-width: 1024px) 48vw, 100vw" },
] as const;

export function ProductUniverse() {
  return (
    <section aria-labelledby="univers-title" className="section-y bg-cream">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="univers-title"
            eyebrow="Nos produits"
            title="Découvrez nos univers"
            description="Découvrez nos différents univers et retrouvez les produits sélectionnés par votre pharmacie."
            serif
          />
          <AnimatedSection className="shrink-0">
            <ButtonLink href="/produits" variant="secondary" arrow>
              Tous nos produits
            </ButtonLink>
          </AnimatedSection>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-14">
          {productCategories.map((category, i) => {
            const cell = layout[i % layout.length];
            return (
              <AnimatedSection
                as="li"
                key={category.slug}
                delay={(i % 3) * 0.08}
                className={cn("flex flex-col", cell.className)}
              >
                <ProductCategoryCard category={category} variant={cell.variant} sizes={cell.sizes} />
              </AnimatedSection>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
