import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { pharmacy } from "@/config/pharmacy";

export type LegalSection = { id: string; title: string; content: ReactNode };

type LegalPageProps = {
  title: string;
  intro?: string;
  sections: LegalSection[];
  /** Affiche la date de mise à jour (pages juridiques) */
  showUpdated?: boolean;
};

/**
 * Gabarit éditorial des pages d'information et juridiques :
 * sommaire collant sur desktop, sections numérotées, typographie très lisible.
 */
export function LegalPage({ title, intro, sections, showUpdated = true }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} description={intro} breadcrumb={[{ label: "Informations" }, { label: title }]} />
      <section className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Sommaire" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <p className="text-[0.72rem] font-bold tracking-[0.18em] text-brand-strong uppercase">Sommaire</p>
              <ol className="mt-5 space-y-1 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-brand hover:text-forest"
                    >
                      <span aria-hidden className="font-serif text-brand-strong">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="legal-prose max-w-3xl lg:col-span-8 lg:col-start-5">
            {showUpdated && (
              <p className="mb-10 text-sm text-muted">Dernière mise à jour : {pharmacy.legal.lastUpdated}</p>
            )}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="border-t border-line py-10 first:border-0 first:pt-0">
                <h2 id={`${s.id}-title`} className="flex items-baseline gap-4 text-2xl font-bold md:text-[1.7rem]">
                  <span aria-hidden className="font-serif text-xl font-normal text-brand-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-muted">{s.content}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}

/** Liste « libellé : valeur » pour les informations d'identification. */
export function InfoList({ items }: { items: Array<[string, ReactNode]> }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-cream/60">
      {items.map(([label, value]) => (
        <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="text-sm font-semibold text-forest">{label}</dt>
          <dd className="min-w-0 break-words text-[0.97rem] text-muted">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
