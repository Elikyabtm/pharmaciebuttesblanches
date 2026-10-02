import { Phone, ShoppingBag, Truck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { isConfigured, pharmacy, telHref } from "@/config/pharmacy";

/**
 * Bandeau d'achat.
 * - Boutique configurée → redirection vers la boutique EXTERNE (pas d'e-commerce ici).
 * - Sinon → canaux réels : appel et demande de livraison.
 */
export function ShopBanner({ categoryName }: { categoryName?: string }) {
  const shopReady = isConfigured(pharmacy.links.shop);

  return (
    <section aria-labelledby="boutique-title" className="bg-white pt-16 pb-6 md:pt-20">
      <div className="container-site">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-12 text-white sm:px-12 md:py-14">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow light>{shopReady ? "Boutique en ligne" : "Commander"}</Eyebrow>
              <h2 id="boutique-title" className="mt-4 font-serif text-3xl leading-tight font-normal text-white md:text-4xl">
                {shopReady
                  ? categoryName
                    ? `Retrouvez l'univers ${categoryName} en ligne`
                    : "Commandez vos produits en ligne"
                  : "Un produit vous intéresse ?"}
              </h2>
              <p className="mt-3 text-white/70">
                {shopReady
                  ? "Consultez la sélection de la pharmacie sur notre boutique en ligne, puis retirez vos produits en officine ou faites-vous livrer."
                  : "Appelez-nous pour connaître sa disponibilité, ou faites une demande de livraison : l'équipe vous recontacte."}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              {shopReady ? (
                <ButtonLink href={pharmacy.links.shop} icon={ShoppingBag} size="lg" arrow>
                  Acheter en ligne
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink href={telHref} icon={Phone} size="lg">
                    {pharmacy.phone.display}
                  </ButtonLink>
                  <ButtonLink href="/livraison" icon={Truck} size="lg" variant="light" arrow>
                    Demander une livraison
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
          <div aria-hidden className="absolute -right-16 -bottom-24 size-72 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-4 -bottom-12 size-52 rounded-full border border-white/10" />
        </AnimatedSection>
      </div>
    </section>
  );
}
