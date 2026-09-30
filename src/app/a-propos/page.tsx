import { HeartHandshake, Leaf, MessagesSquare } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoContent } from "@/components/ui/TodoContent";
import { images } from "@/config/images";
import { pharmacy } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "À propos",
  description: `Découvrez la ${pharmacy.name}, votre pharmacie de quartier à Herblay-sur-Seine : proximité, écoute et accompagnement.`,
  path: "/a-propos",
});

const values = [
  {
    icon: HeartHandshake,
    title: "Proximité",
    text: "Une pharmacie de quartier, attentive à chacun et présente au quotidien.",
  },
  {
    icon: MessagesSquare,
    title: "Écoute & conseil",
    text: "Prendre le temps d'échanger et d'orienter vers la bonne solution.",
  },
  {
    icon: Leaf,
    title: "Bien-être",
    text: "Une sélection de produits pensée pour prendre soin de vous durablement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une pharmacie de quartier, à votre écoute"
        description={`La ${pharmacy.name} accompagne les habitants de ${pharmacy.address.city} au quotidien, avec des conseils attentifs et des services pensés pour simplifier la vie de chacun.`}
        image={images.team}
        breadcrumb={[{ label: "À propos" }]}
      />

      <section aria-labelledby="equipe-title" className="section-y bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <RevealImage
              image={images.counsel}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-card-lg"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              id="equipe-title"
              eyebrow="L'équipe"
              title="Une équipe proche de vous"
              description="Au comptoir, par téléphone ou en ligne, notre équipe vous accueille et vous accompagne dans vos démarches du quotidien."
            />
            <AnimatedSection delay={0.1} className="mt-8">
              {/* TODO_REPLACE : présentation réelle de l'équipe (noms, rôles) — ne rien inventer */}
              <TodoContent title="Présentation de l'équipe">
                <p>Ajouter ici la présentation de l&apos;équipe et, si souhaité, une photo de groupe.</p>
              </TodoContent>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section aria-labelledby="philosophie-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading
            id="philosophie-title"
            eyebrow="Notre philosophie"
            title="Prendre soin, simplement"
            align="center"
            serif
          />
          <ul className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
            {values.map(({ icon: Icon, title, text }, i) => (
              <AnimatedSection as="li" key={title} delay={i * 0.08} className="text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white text-brand-strong shadow-soft">
                  <Icon aria-hidden className="size-7" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="accompagnement-title" className="section-y bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="accompagnement-title"
            eyebrow="Accompagnement"
            title="Des services pour vous faciliter la vie"
            description="Livraison à domicile, préparation de piluliers, envois vers Madagascar : découvrez comment la pharmacie peut vous accompagner."
            className="lg:col-span-7"
          />
          <AnimatedSection className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/livraison" variant="secondary" arrow>
              Livraison
            </ButtonLink>
            <ButtonLink href="/pilulier" variant="secondary" arrow>
              Pilulier
            </ButtonLink>
            <ButtonLink href="/empressa-madagascar" variant="secondary" arrow>
              Empressa
            </ButtonLink>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
