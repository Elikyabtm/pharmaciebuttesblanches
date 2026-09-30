import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site de la Pharmacie des Buttes Blanches.",
  path: "/mentions-legales",
});

export default function Page() {
  return <LegalPage title="Mentions légales" todo="Mentions légales : éditeur, pharmacien titulaire, n° RPPS / inscription à l'Ordre, SIRET, hébergeur, autorités compétentes (ARS)" />;
}
