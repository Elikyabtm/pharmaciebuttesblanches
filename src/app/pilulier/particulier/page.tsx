import { PilulierRequestPage } from "@/components/sections/PilulierRequestPage";
import { pilulierParticulierForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pilulier pour les particuliers",
  description: "Bénéficiez du service pilulier pour vous-même ou pour l'un de vos proches.",
  path: "/pilulier/particulier",
});

export default function Page() {
  return (
    <PilulierRequestPage
      crumb="Particulier"
      title="Pilulier pour les particuliers"
      description="Bénéficiez du service pilulier pour vous-même ou pour l'un de vos proches."
      formId="pilulier-particulier"
      fields={pilulierParticulierForm}
      currentHref="/pilulier/particulier"
    />
  );
}
