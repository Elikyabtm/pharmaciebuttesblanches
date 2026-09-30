import { ServiceCard } from "@/components/cards/ServiceCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeServices } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y bg-white">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Nos services"
            title="Bien plus qu'une pharmacie"
            className="lg:col-span-6"
          />
          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Au-delà du comptoir, notre équipe vous accompagne avec des services concrets : commande en ligne, livraison
              à domicile, préparation de piluliers et envois vers Madagascar.
            </p>
          </AnimatedSection>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {homeServices.map((service, i) => (
            <AnimatedSection as="li" key={service.title} delay={i * 0.08}>
              <ServiceCard service={service} index={i} />
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
