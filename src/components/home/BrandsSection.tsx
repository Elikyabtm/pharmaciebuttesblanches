import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * PLACEHOLDER — logos des marques.
 * Aucune marque n'est affichée tant que la pharmacie n'a pas fourni sa liste.
 * Pour ajouter une marque : { name: "Nom", logo: "/images/marques/nom.svg" }
 * (puis remplacer le rendu du placeholder par <Image src={logo} alt={name} />).
 */
const brands: Array<{ name: string; logo?: string }> = Array.from({ length: 6 }, (_, i) => ({
  name: `Logo marque ${i + 1}`,
}));

export function BrandsSection() {
  return (
    <section aria-labelledby="marques-title" className="border-y border-line bg-white py-16 md:py-20">
      <div className="container-site">
        <AnimatedSection className="flex flex-col items-center text-center">
          <Eyebrow>Sélection</Eyebrow>
          <h2 id="marques-title" className="mt-3 font-serif text-3xl font-normal md:text-4xl">
            Nos marques
          </h2>
        </AnimatedSection>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, i) => (
            <AnimatedSection as="li" key={brand.name} delay={i * 0.05}>
              <div className="flex h-24 items-center justify-center gap-2.5 rounded-2xl border border-dashed border-line bg-cream/60 text-muted/70">
                <span aria-hidden className="size-6 rounded-full border-2 border-current opacity-50" />
                <span className="text-xs font-semibold tracking-[0.14em] uppercase">Logo à venir</span>
                <span className="sr-only">{brand.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
