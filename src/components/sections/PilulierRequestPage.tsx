import Link from "next/link";
import { HealthDataNotice } from "@/components/forms/HealthDataNotice";
import { RequestForm } from "@/components/forms/RequestForm";
import { FormSection } from "@/components/sections/FormSection";
import { HelpAside } from "@/components/sections/HelpAside";
import { PageHero } from "@/components/sections/PageHero";
import type { FieldConfig } from "@/lib/forms";
import { cn } from "@/lib/utils";

const profiles = [
  { label: "EHPAD", href: "/pilulier/ehpad" },
  { label: "Infirmier·ère", href: "/pilulier/infirmier" },
  { label: "Particulier", href: "/pilulier/particulier" },
];

type PilulierRequestPageProps = {
  crumb: string;
  title: string;
  description: string;
  formId: string;
  fields: FieldConfig[];
  currentHref: string;
};

/** Gabarit commun des 3 pages de demande pilulier. */
export function PilulierRequestPage({ crumb, title, description, formId, fields, currentHref }: PilulierRequestPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Service Pilulier"
        title={title}
        description={description}
        tone="sage"
        breadcrumb={[{ label: "Pilulier", href: "/pilulier" }, { label: crumb }]}
      >
        <nav aria-label="Changer de profil">
          <ul className="flex flex-wrap gap-2">
            {profiles.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={p.href === currentHref ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                    p.href === currentHref
                      ? "border-forest bg-forest text-white"
                      : "border-forest/15 bg-white text-forest hover:border-forest/40",
                  )}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <FormSection
        id="demande"
        eyebrow="Formulaire"
        title="Votre demande"
        description="Laissez-nous vos coordonnées : un membre de l'équipe vous recontacte pour définir ensemble l'organisation du service."
        aside={
          <HelpAside
            steps={[
              "Vous envoyez votre demande.",
              "La pharmacie vous recontacte pour échanger sur vos besoins.",
              "Le service est mis en place selon les modalités convenues.",
            ]}
          />
        }
      >
        <RequestForm formId={formId} fields={fields} notice={<HealthDataNotice />} />
      </FormSection>
    </>
  );
}
