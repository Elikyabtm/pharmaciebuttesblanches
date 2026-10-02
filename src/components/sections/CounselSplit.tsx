import { MessageCircle, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, type SiteImage } from "@/config/images";
import { pharmacy, telHref } from "@/config/pharmacy";

type CounselSplitProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  /** Vignette secondaire (facultative) */
  detail?: SiteImage;
};

/** Split-screen éditorial « conseil au comptoir » : grande photo + texte + vignette. */
export function CounselSplit({
  eyebrow = "Le conseil",
  title = "Un échange au comptoir, avant tout",
  text = "Chaque produit mérite d'être bien choisi. Notre équipe prend le temps de vous écouter et de vous orienter, en officine comme par téléphone.",
  detail,
}: CounselSplitProps) {
  return (
    <section aria-labelledby="conseil-title" className="section-y overflow-hidden bg-cream">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <RevealImage
            image={images.counsel}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] rounded-card-lg lg:aspect-[6/5]"
          />
          {detail && (
            <AnimatedSection
              delay={0.2}
              className="absolute -right-4 -bottom-10 hidden w-[34%] rounded-card-lg border-[6px] border-cream shadow-lift sm:block lg:-right-10"
            >
              <RevealImage image={detail} sizes="(min-width: 1024px) 18vw, 30vw" className="aspect-square rounded-[1.25rem]" />
            </AnimatedSection>
          )}
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading id="conseil-title" eyebrow={eyebrow} title={title} description={text} serif />
          <AnimatedSection delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={telHref} icon={Phone} size="lg">
              {pharmacy.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact" icon={MessageCircle} size="lg" variant="secondary">
              Nous écrire
            </ButtonLink>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
