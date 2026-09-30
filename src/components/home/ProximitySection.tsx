import { HeartHandshake, MousePointerClick, Truck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";

const indicators = [
  { icon: Truck, label: "Livraison à domicile" },
  { icon: HeartHandshake, label: "Équipe à votre écoute" },
  { icon: MousePointerClick, label: "Demande en ligne" },
];

export function ProximitySection() {
  return (
    <section aria-labelledby="proximite-title" className="section-y overflow-hidden bg-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <RevealImage
            image={images.delivery}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] rounded-card-lg sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          {/* Détail graphique : pastille verte décalée */}
          <div aria-hidden className="absolute -right-6 -bottom-6 -z-10 hidden size-48 rounded-card-lg bg-sage lg:block" />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading
            id="proximite-title"
            eyebrow="Un service de proximité"
            title="Votre pharmacie, toujours plus proche de vous"
            description="Parce que se déplacer n'est pas toujours simple, nous vous proposons de recevoir vos produits chez vous. Une demande en ligne, et notre équipe organise la suite avec vous."
          />
          <AnimatedSection delay={0.1}>
            <ul className="mt-10 grid gap-3">
              {indicators.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 border-b border-line pb-3 last:border-0">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage text-brand-strong">
                    <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-semibold text-forest">{label}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/livraison" size="lg" arrow className="mt-10">
              Découvrir la livraison
            </ButtonLink>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
