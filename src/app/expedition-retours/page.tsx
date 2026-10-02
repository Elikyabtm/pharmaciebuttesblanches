import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { pharmacy, telHref } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Expédition et retours",
  description: `Livraison, expédition et retours : comment fonctionnent les demandes auprès de la ${pharmacy.name}.`,
  path: "/expedition-retours",
});

const sections: LegalSection[] = [
  {
    id: "vente",
    title: "Pas de vente en ligne sur ce site",
    content: (
      <p>
        Ce site est un site d&apos;information : aucune commande ni aucun paiement n&apos;y est effectué. Il n&apos;y a
        donc pas d&apos;expédition déclenchée depuis ce site.
      </p>
    ),
  },
  {
    id: "livraison",
    title: "Livraison à domicile",
    content: (
      <p>
        La pharmacie propose un service de livraison sur demande. Après l&apos;envoi du formulaire de la page{" "}
        <Link href="/livraison">Livraison</Link>, l&apos;équipe vous recontacte pour convenir des modalités (produits,
        créneau, conditions).
      </p>
    ),
  },
  {
    id: "madagascar",
    title: "Envois vers Madagascar",
    content: (
      <p>
        Les modalités des envois Empressa (produits acceptés, délais, tarifs) vous sont présentées lors de l&apos;étude de
        votre demande. Voir la page <Link href="/empressa-madagascar">Empressa Madagascar</Link>.
      </p>
    ),
  },
  {
    id: "retours",
    title: "Retours",
    content: (
      <p>
        Pour toute question sur un produit acheté à l&apos;officine, adressez-vous directement à l&apos;équipe, au
        comptoir ou au <a href={telHref}>{pharmacy.phone.display}</a>. Pour des raisons de sécurité sanitaire, un
        médicament délivré ne peut pas être remis en circulation.
      </p>
    ),
  },
];

export default function ShippingPage() {
  return (
    <LegalPage
      title="Expédition et retours"
      intro="Comment fonctionnent la livraison et les envois proposés par la pharmacie."
      sections={sections}
      showUpdated={false}
    />
  );
}
