import { CalendarDays } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { pharmacy, telHref } from "@/config/pharmacy";

/** Section CTA Doctolib — fond vert très pâle, composition centrée. */
export function CTASection() {
  return (
    <section aria-labelledby="rdv-title" className="section-y bg-white">
      <div className="container-site">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] bg-sage px-6 py-16 text-center sm:px-12 md:py-20">
          {/* Détails graphiques : arcs concentriques discrets */}
          <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -top-40 -left-40 size-[30rem] text-brand/25">
            <circle cx="300" cy="300" r="180" fill="none" stroke="currentColor" />
            <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" />
            <circle cx="300" cy="300" r="298" fill="none" stroke="currentColor" />
          </svg>
          <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -right-48 -bottom-48 size-[30rem] text-brand/25">
            <circle cx="300" cy="300" r="180" fill="none" stroke="currentColor" />
            <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" />
          </svg>

          <div className="relative mx-auto max-w-xl">
            <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-brand-strong shadow-soft">
              <CalendarDays aria-hidden className="size-7" strokeWidth={1.5} />
            </span>
            <h2 id="rdv-title" className="mt-8 font-serif text-[2.1rem] leading-tight font-normal md:text-5xl">
              Besoin d&apos;un rendez-vous ?
            </h2>
            <p className="mt-5 text-base text-muted md:text-lg">
              Prenez rendez-vous directement en ligne avec votre pharmacie.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={pharmacy.links.doctolib} size="lg" arrow disabledHint="Lien Doctolib bientôt disponible">
                Prendre rendez-vous sur Doctolib
              </ButtonLink>
              <ButtonLink href={telHref} size="lg" variant="ghost">
                ou appelez le {pharmacy.phone.display}
              </ButtonLink>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
