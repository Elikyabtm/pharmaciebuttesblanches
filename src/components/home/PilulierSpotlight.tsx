import { Building2, Stethoscope, UserRound } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink, CtaArrow } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";

const audiences = [
  { icon: UserRound, label: "Particuliers", href: "/pilulier/particulier" },
  { icon: Stethoscope, label: "Infirmier·ère·s", href: "/pilulier/infirmier" },
  { icon: Building2, label: "EHPAD", href: "/pilulier/ehpad" },
];

/** Focus éditorial sur le service pilulier : grande photo + vignette secondaire. */
export function PilulierSpotlight() {
  return (
    <section aria-labelledby="pilulier-spotlight-title" className="overflow-hidden bg-white pt-4 pb-20 md:pb-28 lg:pb-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-7">
          <RevealImage
            image={images.pillbox}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3] rounded-card-lg lg:aspect-[5/4]"
          />
          {/* Vignette secondaire décalée */}
          <AnimatedSection
            delay={0.2}
            className="absolute -bottom-10 -left-4 hidden w-[38%] rounded-card-lg border-[6px] border-white shadow-lift sm:block lg:-left-10"
          >
            <RevealImage
              image={{ ...images.hygieneSoins, position: "88% 40%" }}
              sizes="(min-width: 1024px) 20vw, 35vw"
              className="aspect-[4/5] rounded-[1.25rem]"
            />
          </AnimatedSection>
        </div>

        <div className="lg:col-span-5">
          <SectionHeading
            id="pilulier-spotlight-title"
            eyebrow="Service pilulier"
            title="Vos prises de la semaine, préparées avec soin"
            description="Notre équipe prépare votre pilulier pour vous aider à vous organiser au quotidien. Un service pensé pour les particuliers comme pour les professionnels de santé."
            serif
          />
          <AnimatedSection delay={0.1} className="mt-10">
            <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Faire une demande en tant que</p>
            <ul className="mt-4 grid gap-2.5">
              {audiences.map(({ icon: Icon, label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group/btn flex min-h-14 items-center justify-between rounded-2xl border border-line px-4 transition-colors hover:border-brand/50 hover:bg-sage"
                  >
                    <span className="flex items-center gap-3 font-semibold text-forest">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-sage text-brand-strong">
                        <Icon aria-hidden className="size-4.5" strokeWidth={1.6} />
                      </span>
                      {label}
                    </span>
                    <CtaArrow className="text-brand-strong" />
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/pilulier" variant="ghost" arrow className="mt-6">
              Découvrir le service pilulier
            </ButtonLink>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
