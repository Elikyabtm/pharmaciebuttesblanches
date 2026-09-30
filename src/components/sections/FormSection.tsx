import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type FormSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Colonne latérale (infos, réassurance) */
  aside?: ReactNode;
  children: ReactNode;
};

/** Mise en page commune des sections formulaire : titre + aside à gauche, formulaire à droite. */
export function FormSection({ id, eyebrow, title, description, aside, children }: FormSectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="section-y bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id={id ? `${id}-title` : undefined} eyebrow={eyebrow} title={title} description={description} />
            {aside && <AnimatedSection delay={0.1} className="mt-10">{aside}</AnimatedSection>}
          </div>
        </div>
        <AnimatedSection delay={0.05} className="lg:col-span-8">
          {children}
        </AnimatedSection>
      </div>
    </section>
  );
}
