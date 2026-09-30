import { PilulierRequestPage } from "@/components/sections/PilulierRequestPage";
import { pilulierEhpadForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pilulier pour les EHPAD",
  description: "Une solution de préparation des piluliers adaptée à l'organisation et aux besoins de votre établissement.",
  path: "/pilulier/ehpad",
});

export default function Page() {
  return (
    <PilulierRequestPage
      crumb="EHPAD"
      title="Pilulier pour les EHPAD"
      description="Une solution de préparation des piluliers adaptée à l'organisation et aux besoins de votre établissement."
      formId="pilulier-ehpad"
      fields={pilulierEhpadForm}
      currentHref="/pilulier/ehpad"
    />
  );
}
