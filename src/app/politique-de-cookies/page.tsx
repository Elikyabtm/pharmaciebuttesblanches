import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { pharmacy } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Politique de cookies",
  description: `Cookies et traceurs sur le site de la ${pharmacy.name} : aucun cookie déposé par le site, carte Google Maps chargée uniquement avec votre accord.`,
  path: "/politique-de-cookies",
});

/**
 * Inventaire réel (à mettre à jour si un outil est ajouté) :
 * - aucun cookie ni stockage local déposé par le site ;
 * - polices auto-hébergées (aucun appel à Google Fonts) ;
 * - aucune mesure d'audience ;
 * - carte Google Maps : iframe chargée uniquement après clic (consentement).
 * Si un outil soumis à consentement est ajouté, un vrai mécanisme de
 * consentement devra être mis en place AVANT son chargement.
 */
const sections: LegalSection[] = [
  {
    id: "principe",
    title: "Ce qu'est un cookie",
    content: (
      <p>
        Un cookie est un petit fichier déposé sur votre appareil lors de la consultation d&apos;un site. Certains sont
        nécessaires au fonctionnement du site, d&apos;autres servent à mesurer l&apos;audience ou à la publicité : ces
        derniers nécessitent votre accord préalable.
      </p>
    ),
  },
  {
    id: "site",
    title: "Les cookies de ce site",
    content: (
      <>
        <p>
          <strong>Ce site ne dépose aucun cookie</strong>, ni de fonctionnement, ni de mesure d&apos;audience, ni
          publicitaire. Il n&apos;utilise pas non plus de stockage local à des fins de suivi. C&apos;est pourquoi aucun
          bandeau de consentement ne s&apos;affiche à votre arrivée.
        </p>
        <p>Les polices de caractères sont hébergées avec le site : aucune requête n&apos;est faite vers Google Fonts.</p>
      </>
    ),
  },
  {
    id: "carte",
    title: "Carte Google Maps",
    content: (
      <>
        <p>
          La page <Link href="/contact">Contact</Link> propose une carte Google Maps. Elle n&apos;est{" "}
          <strong>jamais chargée automatiquement</strong> : tant que vous ne cliquez pas sur « Afficher la carte »,
          aucune connexion n&apos;est établie avec Google.
        </p>
        <p>
          En cliquant, vous acceptez le chargement de ce contenu, à l&apos;occasion duquel Google peut déposer des
          cookies et collecter des données de navigation, selon sa propre politique de confidentialité. Ce choix
          n&apos;est pas mémorisé : la carte n&apos;est plus affichée lors de votre prochaine visite. Pour la masquer,
          il suffit de recharger la page.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    title: "Liens vers des services externes",
    content: (
      <p>
        Les boutons « Prendre rendez-vous » (Doctolib) et « Itinéraire » (Google Maps) ouvrent ces services dans un
        nouvel onglet. Aucun cookie de ces services n&apos;est déposé par notre site ; une fois sur leur site, leurs
        propres politiques s&apos;appliquent.
      </p>
    ),
  },
  {
    id: "parametrage",
    title: "Paramétrer votre navigateur",
    content: (
      <p>
        Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies. Pour en savoir
        plus, consultez les conseils de la{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer">
          CNIL sur les cookies et traceurs
        </a>
        .
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Pour toute question, consultez notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>{" "}
        ou écrivez à <a href={`mailto:${pharmacy.email}`}>{pharmacy.email}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de cookies"
      intro="Ce site a été conçu pour respecter votre vie privée : aucun cookie n'est déposé sans votre action."
      sections={sections}
    />
  );
}
