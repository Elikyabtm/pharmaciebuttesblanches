import { ShoppingBag } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { pharmacy } from "@/config/pharmacy";

/** Bandeau de redirection vers la boutique en ligne EXTERNE (pas d'e-commerce sur ce site). */
export function ShopBanner({ categoryName }: { categoryName?: string }) {
  return (
    <section aria-labelledby="boutique-title" className="bg-white pb-6">
      <div className="container-site">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-12 text-white sm:px-12 md:py-14">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow light>Boutique en ligne</Eyebrow>
              <h2 id="boutique-title" className="mt-4 font-serif text-3xl leading-tight font-normal text-white md:text-4xl">
                {categoryName ? `Retrouvez l'univers ${categoryName} en ligne` : "Commandez vos produits en ligne"}
              </h2>
              <p className="mt-3 text-white/70">
                Consultez la sélection de la pharmacie sur notre boutique en ligne, puis retirez vos produits en officine ou
                faites-vous livrer.
              </p>
            </div>
            <ButtonLink
              href={pharmacy.links.shop}
              icon={ShoppingBag}
              size="lg"
              arrow
              className="shrink-0"
              disabledHint="Lien de la boutique bientôt disponible"
            >
              Acheter en ligne
            </ButtonLink>
          </div>
          <div aria-hidden className="absolute -right-16 -bottom-24 size-72 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-4 -bottom-12 size-52 rounded-full border border-white/10" />
        </AnimatedSection>
      </div>
    </section>
  );
}
