import Link from "next/link";
import { InfoList, LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { fullAddress, mailHref, pharmacy } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Politique de confidentialité",
  description: `Comment la ${pharmacy.name} traite les données personnelles transmises via son site : finalités, bases légales, durées de conservation et droits.`,
  path: "/politique-de-confidentialite",
});

/**
 * Le texte reflète le fonctionnement RÉEL du site :
 * - pas de base de données, pas de compte, pas de mesure d'audience ;
 * - formulaires acheminés par e-mail (service d'envoi Resend si configuré,
 *   sinon messagerie du visiteur) vers la boîte de la pharmacie ;
 * - carte Google Maps chargée uniquement après clic ;
 * - Doctolib : simple lien sortant.
 */
const relayEnabled = Boolean(process.env.RESEND_API_KEY && process.env.FORM_FROM_EMAIL);

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <>
        <p>Les données personnelles collectées via ce site sont traitées par :</p>
        <InfoList
          items={[
            ["Responsable", `${pharmacy.legal.companyName} — ${pharmacy.name}`],
            ["Adresse", fullAddress],
            ["Contact", <a key="mail" href={mailHref}>{pharmacy.email}</a>],
          ]}
        />
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées",
    content: (
      <>
        <p>
          Le site ne comporte ni compte client, ni base de données, ni outil de mesure d&apos;audience. Les seules
          données personnelles collectées sont celles que vous saisissez volontairement dans les formulaires :
        </p>
        <ul>
          <li>
            <strong>Contact</strong> : nom, prénom, e-mail, téléphone, objet et message ;
          </li>
          <li>
            <strong>Demande de livraison</strong> : identité, téléphone, e-mail, adresse postale, type de demande et
            informations complémentaires ;
          </li>
          <li>
            <strong>Service pilulier</strong> : identité et coordonnées ; pour les professionnels, le nom de la structure,
            la fonction, la zone d&apos;intervention et le nombre de patients ou de résidents concernés ; pour les
            particuliers, si la demande concerne un proche et si une livraison est souhaitée ;
          </li>
          <li>
            <strong>Empressa Madagascar</strong> : identité, coordonnées, nom du destinataire, ville de destination,
            type de produits et quantité approximative.
          </li>
        </ul>
        <p>
          <strong>Aucune donnée de santé n&apos;est demandée.</strong> Les formulaires ne sont pas hébergés par un
          prestataire certifié pour les données de santé (HDS) : merci de ne pas y indiquer d&apos;ordonnance, de
          traitement ou de diagnostic. Ces échanges se font directement avec la pharmacie, au comptoir ou par
          téléphone.
        </p>
        <p>
          Lors de la consultation du site, l&apos;hébergeur enregistre des données techniques (adresse IP, date et
          heure, page demandée, navigateur) dans des journaux nécessaires au fonctionnement et à la sécurité du site.
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    content: (
      <ul>
        <li>
          <strong>Traiter vos demandes</strong> de livraison, de pilulier ou d&apos;envoi Empressa : mesures
          précontractuelles prises à votre demande (article 6.1.b du RGPD) ;
        </li>
        <li>
          <strong>Répondre à vos messages</strong> envoyés via le formulaire de contact : intérêt légitime de la
          pharmacie à répondre aux personnes qui la sollicitent (article 6.1.f) ;
        </li>
        <li>
          <strong>Assurer la sécurité et le bon fonctionnement du site</strong> (journaux techniques) : intérêt légitime
          (article 6.1.f) ;
        </li>
        <li>
          <strong>Afficher la carte Google Maps</strong> : votre consentement, exprimé en cliquant sur « Afficher la
          carte » (article 6.1.a).
        </li>
      </ul>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires et sous-traitants",
    content: (
      <>
        <p>
          Vos données sont destinées exclusivement à l&apos;équipe de la pharmacie habilitée à traiter votre demande.
          Elles ne sont ni vendues, ni louées, ni utilisées à des fins publicitaires.
        </p>
        <p>Interviennent techniquement :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (États-Unis), hébergeur du site ;
          </li>
          <li>
            <strong>Google</strong> (service Gmail), fournisseur de la messagerie de la pharmacie, qui reçoit les
            demandes ;
          </li>
          {relayEnabled && (
            <li>
              <strong>Resend</strong> (États-Unis), service technique d&apos;envoi qui achemine les formulaires vers la
              messagerie de la pharmacie.
            </li>
          )}
        </ul>
        {!relayEnabled && (
          <p>
            Lorsque vous validez un formulaire, votre propre logiciel de messagerie s&apos;ouvre avec la demande
            pré-remplie : c&apos;est vous qui l&apos;envoyez, via votre fournisseur de messagerie.
          </p>
        )}
        <p>
          Certains de ces prestataires sont situés hors de l&apos;Union européenne. Les transferts sont encadrés par les
          garanties prévues par le RGPD (décision d&apos;adéquation « EU-US Data Privacy Framework » ou clauses
          contractuelles types de la Commission européenne).
        </p>
      </>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    content: (
      <ul>
        <li>
          <strong>Demandes et messages</strong> : le temps nécessaire à leur traitement, puis supprimés au plus tard
          3 ans après le dernier échange ;
        </li>
        <li>
          <strong>Journaux techniques</strong> : durée limitée fixée par l&apos;hébergeur pour la sécurité du service.
        </li>
      </ul>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Le site est servi exclusivement en HTTPS. Il ne stocke aucune donnée de formulaire : les demandes sont
        transmises par e-mail à la pharmacie, dont l&apos;accès est réservé aux personnes habilitées. Un dispositif
        anti-spam limite les envois automatisés.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants :</p>
        <ul>
          <li>droit d&apos;accès à vos données et d&apos;en obtenir une copie ;</li>
          <li>droit de rectification des données inexactes ;</li>
          <li>droit à l&apos;effacement ;</li>
          <li>droit à la limitation du traitement ;</li>
          <li>droit d&apos;opposition, pour les traitements fondés sur l&apos;intérêt légitime ;</li>
          <li>droit à la portabilité, pour les données traitées dans le cadre de mesures précontractuelles ;</li>
          <li>droit de retirer votre consentement à tout moment (carte Google Maps) ;</li>
          <li>droit de définir des directives relatives au sort de vos données après votre décès.</li>
        </ul>
      </>
    ),
  },
  {
    id: "exercice",
    title: "Exercer vos droits",
    content: (
      <>
        <p>
          Écrivez à <a href={mailHref}>{pharmacy.email}</a> ou par courrier à {pharmacy.legal.companyName},{" "}
          {fullAddress}. Une réponse vous sera apportée dans un délai d&apos;un mois. Un justificatif d&apos;identité
          pourra vous être demandé en cas de doute raisonnable.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
          CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>, 3 place de
          Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </>
    ),
  },
  {
    id: "tiers",
    title: "Services tiers",
    content: (
      <ul>
        <li>
          <strong>Doctolib</strong> : les boutons « Prendre rendez-vous » sont de simples liens vers la page Doctolib de
          la pharmacie. Le site ne transmet aucune donnée à Doctolib ; une fois sur Doctolib, vos données sont traitées
          selon sa propre politique de confidentialité.
        </li>
        <li>
          <strong>Google Maps</strong> : la carte de la page Contact n&apos;est chargée qu&apos;après un clic sur
          « Afficher la carte ». Google peut alors collecter des données de navigation et déposer des cookies, selon sa
          propre politique. Le bouton « Itinéraire » ouvre Google Maps dans un nouvel onglet.
        </li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Le site lui-même ne dépose aucun cookie. Le détail figure dans notre{" "}
        <Link href="/politique-de-cookies">politique de cookies</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="La protection de vos données personnelles nous tient à cœur. Voici, simplement, ce que fait ce site de vos informations."
      sections={sections}
    />
  );
}
