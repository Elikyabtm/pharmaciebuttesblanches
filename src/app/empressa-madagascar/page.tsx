import { ClipboardList, MessageSquareText, PackageCheck, Phone } from "lucide-react";
import { HealthDataNotice } from "@/components/forms/HealthDataNotice";
import { RequestForm } from "@/components/forms/RequestForm";
import { FormSection } from "@/components/sections/FormSection";
import { HelpAside } from "@/components/sections/HelpAside";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TodoContent } from "@/components/ui/TodoContent";
import { images } from "@/config/images";
import { telHref } from "@/config/pharmacy";
import { empressaForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Empressa — Envois vers Madagascar",
  description:
    "Empressa, le service de la Pharmacie des Buttes Blanches dédié à vos demandes d'envoi à destination de Madagascar.",
  path: "/empressa-madagascar",
});

/** Étapes génériques du parcours de demande (pas de modalités inventées). */
const steps = [
  { icon: ClipboardList, title: "Vous faites votre demande", text: "Via le formulaire en ligne ou directement en pharmacie." },
  { icon: MessageSquareText, title: "Nous vous recontactons", text: "L'équipe revient vers vous pour préciser votre demande." },
  { icon: PackageCheck, title: "Nous organisons l'envoi", text: "Selon les modalités du service, présentées lors de l'échange." },
];

export default function EmpressaPage() {
  return (
    <>
      {/* Hero immersif, plus chaud que les autres pages */}
      <section className="relative overflow-hidden bg-[#F3E7D6]">
        <div className="container-site grid items-center gap-10 pt-8 pb-14 md:pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-24">
          <div className="lg:col-span-6">
            <Breadcrumb items={[{ label: "Services" }, { label: "Empressa Madagascar" }]} className="mb-10 md:mb-14" />
            <AnimatedSection>
              <Eyebrow>Empressa</Eyebrow>
              <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.06] font-normal sm:text-5xl lg:text-[3.8rem]">
                Votre service d&apos;envoi vers <span className="text-brand-strong italic">Madagascar</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Un service dédié à vos demandes d&apos;envoi à destination de Madagascar, avec l&apos;accompagnement de
                votre pharmacie de proximité.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#demande" size="lg" arrow>
                  Effectuer une demande
                </ButtonLink>
                <ButtonLink href={telHref} size="lg" variant="secondary" icon={Phone}>
                  Nous appeler
                </ButtonLink>
              </div>
            </AnimatedSection>
          </div>
          <div className="relative lg:col-span-6">
            <RevealImage
              image={images.madagascar}
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-card-lg lg:aspect-[5/6] lg:max-h-[42rem]"
            />
            <p className="absolute -bottom-5 left-6 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-lift">
              France <span aria-hidden className="mx-1.5 text-brand-soft">→</span> Madagascar
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="fonctionnement-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="fonctionnement-title"
              eyebrow="Fonctionnement"
              title="Comment ça marche ?"
              description="Chaque demande est étudiée par l'équipe. Les modalités précises vous sont communiquées lors de notre échange."
            />
          </div>
          <div className="space-y-10 lg:col-span-7">
            <ol className="grid gap-5 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <AnimatedSection as="li" key={title} delay={i * 0.08} className="rounded-card border border-line bg-cream p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-strong">
                      <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                    </span>
                    <span aria-hidden className="font-serif text-3xl text-brand/60">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-bold">{title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{text}</p>
                </AnimatedSection>
              ))}
            </ol>

            <AnimatedSection>
              {/* TODO_REPLACE : texte officiel du service Empressa */}
              <TodoContent title="Présentation détaillée du service Empressa">
                <p>
                  Décrire ici le fonctionnement réel du service : types de produits acceptés, délais, tarifs, zones
                  desservies à Madagascar, conditions de dépôt et de retrait.
                </p>
              </TodoContent>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FormSection
        id="demande"
        eyebrow="Formulaire"
        title="Effectuer une demande"
        description="Décrivez votre envoi : notre équipe vous recontacte pour vous présenter les modalités."
        aside={<HelpAside />}
      >
        <RequestForm
          formId="empressa"
          fields={empressaForm}
          submitLabel="Envoyer ma demande"
          notice={<HealthDataNotice />}
        />
      </FormSection>
    </>
  );
}
