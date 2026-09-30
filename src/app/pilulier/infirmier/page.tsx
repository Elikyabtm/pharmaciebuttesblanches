import { PilulierRequestPage } from "@/components/sections/PilulierRequestPage";
import { pilulierInfirmierForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pilulier pour les infirmier·ère·s",
  description: "Vous accompagnez des patients nécessitant une préparation régulière de leurs traitements : faites votre demande en ligne.",
  path: "/pilulier/infirmier",
});

export default function Page() {
  return (
    <PilulierRequestPage
      crumb="Infirmier·ère"
      title="Pilulier pour les infirmier·ère·s"
      description="Vous accompagnez des patients nécessitant une préparation régulière de leurs traitements : faites votre demande en ligne."
      formId="pilulier-infirmier"
      fields={pilulierInfirmierForm}
      currentHref="/pilulier/infirmier"
    />
  );
}
