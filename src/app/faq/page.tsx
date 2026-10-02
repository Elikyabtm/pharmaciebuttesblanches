import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { groupedOpeningHours, pharmacy, telHref } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: `Questions fréquentes sur la ${pharmacy.name} : horaires, rendez-vous, livraison, pilulier, Empressa.`,
  path: "/faq",
});

/** Réponses limitées au fonctionnement du site et aux informations réelles. */
const sections: LegalSection[] = [
  {
    id: "horaires",
    title: "Quels sont vos horaires ?",
    content: (
      <>
        <ul>
          {groupedOpeningHours().map((g) => (
            <li key={g.label}>
              <strong>{g.label}</strong> : {g.hours}
            </li>
          ))}
        </ul>
        <p>
          Adresse : {pharmacy.address.street}, {pharmacy.address.postalCode} {pharmacy.address.city}.
        </p>
      </>
    ),
  },
  {
    id: "rendez-vous",
    title: "Comment prendre rendez-vous ?",
    content: (
      <p>
        En ligne sur{" "}
        <a href={pharmacy.links.doctolib} target="_blank" rel="noopener noreferrer">
          la page Doctolib de la pharmacie
        </a>
        , ou par téléphone au <a href={telHref}>{pharmacy.phone.display}</a>.
      </p>
    ),
  },
  {
    id: "livraison",
    title: "Comment demander une livraison ?",
    content: (
      <p>
        Remplissez le formulaire de la page <Link href="/livraison">Livraison</Link>. La pharmacie vous recontacte pour
        organiser votre demande.
      </p>
    ),
  },
  {
    id: "pilulier",
    title: "À qui s'adresse le service pilulier ?",
    content: (
      <p>
        Aux particuliers, aux infirmier·ère·s et aux EHPAD. Choisissez votre profil sur la page{" "}
        <Link href="/pilulier">Service Pilulier</Link>.
      </p>
    ),
  },
  {
    id: "empressa",
    title: "Qu'est-ce qu'Empressa ?",
    content: (
      <p>
        Empressa est le service de la pharmacie dédié aux demandes d&apos;envoi vers Madagascar. Plus d&apos;informations
        sur la page <Link href="/empressa-madagascar">Empressa Madagascar</Link>.
      </p>
    ),
  },
  {
    id: "ordonnance",
    title: "Puis-je envoyer mon ordonnance via le site ?",
    content: (
      <p>
        Non. Les formulaires ne sont pas conçus pour recevoir des données de santé. Pour toute question relative à votre
        traitement, contactez directement la pharmacie au <a href={telHref}>{pharmacy.phone.display}</a> ou passez à
        l&apos;officine.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <LegalPage
      title="Questions fréquentes"
      intro="Les réponses aux questions les plus courantes sur la pharmacie et ses services."
      sections={sections}
      showUpdated={false}
    />
  );
}
