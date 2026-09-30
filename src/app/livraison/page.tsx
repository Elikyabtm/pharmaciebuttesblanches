import { HeartHandshake, House, MousePointerClick } from "lucide-react";
import { HealthDataNotice } from "@/components/forms/HealthDataNotice";
import { RequestForm } from "@/components/forms/RequestForm";
import { FeatureList } from "@/components/sections/FeatureList";
import { FormSection } from "@/components/sections/FormSection";
import { HelpAside } from "@/components/sections/HelpAside";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/config/images";
import { deliveryForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Livraison à domicile",
  description:
    "Faites-vous livrer par votre pharmacie à Herblay-sur-Seine. Effectuez votre demande de livraison en ligne, simplement et rapidement.",
  path: "/livraison",
});

const advantages = [
  { icon: House, title: "Livraison à domicile", text: "Recevez votre commande directement chez vous." },
  { icon: HeartHandshake, title: "Service de proximité", text: "Une équipe disponible pour vous accompagner." },
  { icon: MousePointerClick, title: "Demande simple et rapide", text: "Effectuez votre demande directement en ligne." },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Livraison"
        title="Faites-vous livrer par votre pharmacie"
        description="Parce que se déplacer n'est pas toujours possible, notre pharmacie vous propose un service de livraison simple et pratique."
        image={images.delivery}
        breadcrumb={[{ label: "Services" }, { label: "Livraison" }]}
      >
        <FeatureList items={advantages} />
        <ButtonLink href="#demande" size="lg" arrow className="mt-10">
          Demander une livraison
        </ButtonLink>
      </PageHero>

      <FormSection
        id="demande"
        eyebrow="Formulaire"
        title="Demander une livraison"
        description="Indiquez vos coordonnées et le type de demande : nous vous recontactons pour organiser la livraison."
        aside={
          <HelpAside
            steps={[
              "Vous remplissez le formulaire ci-contre.",
              "La pharmacie vous recontacte pour confirmer votre demande.",
              "Vos produits vous sont livrés à domicile.",
            ]}
          />
        }
      >
        <RequestForm formId="livraison" fields={deliveryForm} notice={<HealthDataNotice />} />
      </FormSection>
    </>
  );
}
