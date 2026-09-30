import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Expédition et retours",
  description: "Informations sur l'expédition et les retours des commandes de la Pharmacie des Buttes Blanches.",
  path: "/expedition-retours",
});

export default function Page() {
  return <LegalPage title="Expédition et retours" todo="Conditions d'expédition et de retour (à aligner avec la boutique en ligne)" />;
}
