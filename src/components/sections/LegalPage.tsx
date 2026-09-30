import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { TodoContent } from "@/components/ui/TodoContent";

type LegalPageProps = {
  title: string;
  intro?: string;
  /** Contenu réel ; à défaut un placeholder « à compléter » est affiché. */
  children?: ReactNode;
  todo: string;
};

/** Gabarit sobre pour les pages d'information (légales, FAQ…). */
export function LegalPage({ title, intro, children, todo }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} description={intro} breadcrumb={[{ label: "Informations" }, { label: title }]} />
      <section className="section-y bg-white">
        <div className="container-site max-w-3xl space-y-8">
          {children}
          {/* TODO_REPLACE : contenu officiel à fournir */}
          <TodoContent title={todo} />
        </div>
      </section>
    </>
  );
}
