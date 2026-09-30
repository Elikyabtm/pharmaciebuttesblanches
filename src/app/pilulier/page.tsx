import { Building2, CalendarCheck, HeartHandshake, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { AudienceCard } from "@/components/cards/AudienceCard";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList } from "@/components/sections/FeatureList";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Service Pilulier",
  description:
    "Votre pilulier préparé par votre pharmacie : un service adapté aux particuliers, aux infirmier·ère·s et aux EHPAD à Herblay-sur-Seine.",
  path: "/pilulier",
});

const audiences = [
  {
    icon: Building2,
    label: "EHPAD",
    title: "Je représente un EHPAD",
    text: "Une solution adaptée à l'organisation et aux besoins de votre établissement.",
    href: "/pilulier/ehpad",
  },
  {
    icon: Stethoscope,
    label: "Infirmier·ère",
    title: "Je suis infirmier·ère",
    text: "Vous accompagnez des patients nécessitant une préparation régulière de leurs traitements.",
    href: "/pilulier/infirmier",
    featured: true,
  },
  {
    icon: UserRound,
    label: "Particulier",
    title: "Je suis un particulier",
    text: "Vous souhaitez bénéficier du service pour vous-même ou pour l'un de vos proches.",
    href: "/pilulier/particulier",
  },
];

const benefits = [
  { icon: CalendarCheck, title: "Une organisation simplifiée", text: "Les prises sont organisées dans un pilulier clair et lisible." },
  { icon: ShieldCheck, title: "Préparé par la pharmacie", text: "La préparation est réalisée par l'équipe officinale." },
  { icon: HeartHandshake, title: "Un accompagnement humain", text: "Un interlocuteur à votre écoute pour toute question." },
];

export default function PilulierPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Pilulier"
        title="Votre pilulier, préparé par votre pharmacie"
        description="Notre pharmacie vous accompagne dans la préparation et l'organisation des traitements grâce à un service adapté aux particuliers comme aux professionnels."
        image={images.pillbox}
        tone="sage"
        breadcrumb={[{ label: "Services" }, { label: "Pilulier" }]}
      />

      <section aria-labelledby="vous-etes-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            id="vous-etes-title"
            eyebrow="Faire une demande"
            title="Vous êtes ?"
            description="Choisissez votre profil : le formulaire est adapté à votre situation."
            align="center"
            serif
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
            {audiences.map((a, i) => (
              <AnimatedSection as="li" key={a.href} delay={i * 0.1} className={i === 1 ? "md:-mt-6 md:mb-6" : undefined}>
                <AudienceCard {...a} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pilulier-benefices-title" className="section-y bg-cream">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="pilulier-benefices-title"
              eyebrow="Pourquoi un pilulier ?"
              title="Un quotidien plus serein"
              description="Le pilulier aide à s'organiser au fil de la semaine. Notre équipe définit avec vous les modalités du service lors d'un premier échange."
            />
            <AnimatedSection delay={0.1} className="mt-10">
              <FeatureList items={benefits} />
            </AnimatedSection>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <RevealImage
              image={images.counsel}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] rounded-card-lg lg:aspect-[5/6]"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
