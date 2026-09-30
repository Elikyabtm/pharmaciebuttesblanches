import { ProductCategoryCard } from "@/components/cards/ProductCategoryCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ShopBanner } from "@/components/sections/ShopBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { productCategories } from "@/data/products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Nos produits",
  description:
    "Herboristerie, parapharmacie, hygiène, compléments alimentaires, matériel médical, bébé & enfant : découvrez les univers de la Pharmacie des Buttes Blanches.",
  path: "/produits",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos produits"
        title="Nos produits"
        description="Une sélection pensée par votre pharmacie pour prendre soin de vous et de vos proches au quotidien. Explorez nos six univers et retrouvez-les en officine ou sur notre boutique en ligne."
        breadcrumb={[{ label: "Nos produits" }]}
      />

      <section aria-label="Univers produits" className="section-y bg-white">
        <div className="container-site">
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, i) => (
              <AnimatedSection as="li" key={category.slug} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:mt-16" : undefined}>
                <ProductCategoryCard category={category} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <ShopBanner />
      <CTASection />
    </>
  );
}
