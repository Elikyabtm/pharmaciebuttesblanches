import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Politique de confidentialité",
  description: "Comment la Pharmacie des Buttes Blanches traite vos données personnelles.",
  path: "/politique-de-confidentialite",
});

export default function Page() {
  return <LegalPage title="Politique de confidentialité" todo="Politique de confidentialité (RGPD) : responsable de traitement, finalités, durées de conservation, droits des personnes" />;
}
