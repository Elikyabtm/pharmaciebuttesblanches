import { MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { ProductCategoryCard } from "@/components/cards/ProductCategoryCard";
import { CounselSplit } from "@/components/sections/CounselSplit";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ShopBanner } from "@/components/sections/ShopBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isConfigured, pharmacy, telHref } from "@/config/pharmacy";
import { productCategories, type ProductCategory } from "@/data/products";

/** Page catégorie générique : utilisée par les 6 univers produits. */
export function ProductCategoryPage({ category }: { category: ProductCategory }) {
  const Icon = category.icon;
  const others = productCategories.filter((c) => c.slug !== category.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Nos produits"
        title={category.name}
        description={category.intro}
        image={category.image}
        breadcrumb={[{ label: "Nos produits", href: "/produits" }, { label: category.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {isConfigured(pharmacy.links.shop) ? (
            <ButtonLink href={pharmacy.links.shop} icon={ShoppingBag} size="lg" arrow>
              Acheter en ligne
            </ButtonLink>
          ) : (
            <ButtonLink href={telHref} icon={Phone} size="lg">
              {pharmacy.phone.display}
            </ButtonLink>
          )}
          <ButtonLink href="/contact" size="lg" variant="secondary" icon={MessageCircle}>
            Demander conseil
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="sous-categories-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            id="sous-categories-title"
            eyebrow="En officine"
            title={`L'univers ${category.name.toLowerCase()}`}
            description="Retrouvez en pharmacie une sélection organisée autour de ces familles de produits. Notre équipe est là pour vous orienter."
          />

          {/* PLACEHOLDER : familles génériques — voir src/data/products.ts */}
          <ul className="mt-14 grid gap-px overflow-hidden rounded-card-lg border border-line bg-line sm:grid-cols-2">
            {category.subcategories.map((sub, i) => (
              <AnimatedSection as="li" key={sub.title} delay={(i % 2) * 0.08} className="group bg-white p-7 sm:p-9">
                <div className="flex items-start gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sage text-brand-strong transition-colors group-hover:bg-brand group-hover:text-forest">
                    <Icon aria-hidden className="size-5.5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p aria-hidden className="font-serif text-sm text-muted/60">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold">{sub.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{sub.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </ul>

          <AnimatedSection className="mt-8 rounded-2xl bg-cream p-5 text-sm leading-relaxed text-muted">
            Les produits présentés en officine peuvent évoluer. Pour savoir si un produit est disponible ou pour être
            conseillé, contactez la pharmacie. Pour toute question relative à votre santé, adressez-vous à votre
            pharmacien ou à votre médecin.
          </AnimatedSection>
        </div>
      </section>

      <CounselSplit
        eyebrow="Besoin d'un avis ?"
        title="Choisir avec les conseils de l'équipe"
        text={`Une question sur un produit de l'univers ${category.name.toLowerCase()} ? Notre équipe vous écoute et vous oriente, au comptoir comme par téléphone.`}
        detail={{ ...category.image, position: "80% 50%" }}
      />

      <ShopBanner categoryName={category.name} />

      <section aria-labelledby="autres-univers-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeading id="autres-univers-title" eyebrow="À découvrir aussi" title="Nos autres univers" serif />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c, i) => (
              <AnimatedSection as="li" key={c.slug} delay={i * 0.08}>
                <ProductCategoryCard category={c} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
