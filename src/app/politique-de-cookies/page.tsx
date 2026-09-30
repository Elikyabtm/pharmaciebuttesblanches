import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Politique de cookies",
  description: "Informations sur l'utilisation des cookies sur le site de la Pharmacie des Buttes Blanches.",
  path: "/politique-de-cookies",
});

export default function Page() {
  return <LegalPage title="Politique de cookies" todo="Politique de cookies (à adapter selon les outils de mesure d'audience éventuellement installés)" />;
}
