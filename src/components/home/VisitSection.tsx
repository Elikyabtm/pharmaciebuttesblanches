import { MapPin, Navigation, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { OpeningHoursList } from "@/components/ui/OpeningHoursList";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { directionsUrl, pharmacy, telHref } from "@/config/pharmacy";

/** Adresse + horaires réels, accessibles en un coup d'œil depuis l'accueil. */
export function VisitSection() {
  return (
    <section aria-labelledby="visite-title" className="section-y bg-cream">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <SectionHeading
            id="visite-title"
            eyebrow="Nous rendre visite"
            title="Au cœur des Buttes Blanches"
            description="L'équipe vous accueille du lundi au samedi pour vous conseiller et vous accompagner."
          />
          <AnimatedSection delay={0.1} className="mt-8">
            <p className="flex items-start gap-3 text-forest">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-strong" />
              <span className="font-semibold">
                {pharmacy.address.street}
                <span className="block font-normal text-muted">
                  {pharmacy.address.postalCode} {pharmacy.address.city}
                </span>
              </span>
            </p>
            <div className="mt-6 rounded-card border border-line bg-white px-5 py-2 sm:px-6">
              <OpeningHoursList />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={directionsUrl} icon={Navigation} size="lg">
                Itinéraire
              </ButtonLink>
              <ButtonLink href={telHref} icon={Phone} size="lg" variant="secondary">
                {pharmacy.phone.display}
              </ButtonLink>
            </div>
          </AnimatedSection>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <div className="grid grid-cols-5 gap-4">
            <RevealImage
              image={images.parapharmacie}
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="col-span-3 aspect-[3/4] rounded-card-lg"
            />
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <RevealImage
                image={{ ...images.herboristerie, position: "30% 70%" }}
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="aspect-square rounded-card-lg"
              />
              <RevealImage
                image={{ ...images.complements, position: "70% 55%" }}
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="aspect-[4/5] rounded-card-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
