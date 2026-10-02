import Link from "next/link";
import { InfoList, LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { fullAddress, mailHref, pharmacy, telHref } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site de la ${pharmacy.name} (${pharmacy.legal.companyName}), ${fullAddress}.`,
  path: "/mentions-legales",
});

const { legal, hosting } = pharmacy;

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le présent site est édité par la pharmacie d&apos;officine exploitée sous le nom commercial{" "}
          <strong>{pharmacy.name}</strong>.
        </p>
        <InfoList
          items={[
            ["Nom commercial", pharmacy.name],
            ["Raison sociale", legal.companyName],
            ["Capital social", legal.shareCapital],
            ["Siège social", fullAddress],
            ["SIRET", legal.siret],
            ["RCS", legal.rcs],
            ["TVA intracommunautaire", legal.vatNumber],
            ["Téléphone", <a key="tel" href={telHref}>{pharmacy.phone.display}</a>],
            ["E-mail", <a key="mail" href={mailHref}>{pharmacy.email}</a>],
          ]}
        />
      </>
    ),
  },
  {
    id: "publication",
    title: "Directrice de la publication",
    content: (
      <p>
        La direction de la publication est assurée par <strong>{legal.publicationDirector}</strong>, joignable à
        l&apos;adresse <a href={mailHref}>{pharmacy.email}</a>.
      </p>
    ),
  },
  {
    id: "reglementation",
    title: "Informations réglementaires",
    content: (
      <>
        <p>
          L&apos;activité de pharmacie d&apos;officine est une profession de santé réglementée, exercée dans le respect
          du Code de la santé publique, notamment des règles de déontologie des pharmaciens (articles R.4235-1 et
          suivants).
        </p>
        <InfoList
          items={[
            ["N° d'inscription à l'Ordre", legal.ordreNumber],
            [
              "Ordre professionnel",
              <a key="onp" href="https://www.ordre.pharmacien.fr" target="_blank" rel="noopener noreferrer">
                Ordre national des pharmaciens
              </a>,
            ],
            [
              "Autorité de tutelle",
              <a key="ars" href="https://www.iledefrance.ars.sante.fr" target="_blank" rel="noopener noreferrer">
                Agence régionale de santé Île-de-France
              </a>,
            ],
          ]}
        />
        <p>
          Ce site est un site d&apos;information. Il ne permet ni la vente de médicaments en ligne, ni le paiement, ni
          la création de compte client.
        </p>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé et déployé par :</p>
        <InfoList
          items={[
            ["Hébergeur", hosting.name],
            ["Adresse", hosting.address],
            [
              "Site web",
              <a key="web" href={hosting.website} target="_blank" rel="noopener noreferrer">
                {hosting.website.replace("https://", "")}
              </a>,
            ],
            ["Contact", hosting.contact],
          ]}
        />
      </>
    ),
  },
  {
    id: "conception",
    title: "Conception et développement du site",
    content: (
      <p>
        Conception UI/UX et développement : <strong>{pharmacy.credits.designer}</strong>. La conceptrice du site
        n&apos;en est pas l&apos;éditrice : l&apos;édition et le contenu du site relèvent de la pharmacie, identifiée
        ci-dessus.
      </p>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble des éléments de ce site (textes, mise en page, éléments graphiques, logo, photographies et
          visuels) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou
          adaptation, totale ou partielle, sans autorisation écrite préalable de l&apos;éditeur est interdite.
        </p>
        <p>
          Les marques et logos éventuellement cités appartiennent à leurs propriétaires respectifs.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <>
        <p>
          Les informations publiées sur ce site sont fournies à titre informatif. Elles ne remplacent en aucun cas une
          consultation, un diagnostic ou un conseil personnalisé d&apos;un professionnel de santé. Pour toute question
          relative à votre santé ou à un traitement, adressez-vous directement à votre pharmacien ou à votre médecin.
        </p>
        <p>
          L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations (horaires,
          services…), sans pouvoir garantir l&apos;absence d&apos;erreur ou d&apos;interruption du site. En cas de doute,
          contactez la pharmacie au <a href={telHref}>{pharmacy.phone.display}</a>.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    title: "Liens externes",
    content: (
      <>
        <p>Le site propose des liens vers des services tiers, qui s&apos;ouvrent dans un nouvel onglet :</p>
        <ul>
          <li>
            <strong>Doctolib</strong>, pour la prise de rendez-vous en ligne ;
          </li>
          <li>
            <strong>Google Maps</strong>, pour la carte et le calcul d&apos;itinéraire.
          </li>
        </ul>
        <p>
          Ces services sont soumis à leurs propres conditions d&apos;utilisation et politiques de confidentialité.
          L&apos;éditeur n&apos;exerce aucun contrôle sur leur contenu. Voir aussi notre{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    id: "credits",
    title: "Crédits",
    content: (
      <ul>
        <li>Conception UI/UX et développement : {pharmacy.credits.designer}</li>
        <li>Photographies et visuels : visuels d&apos;illustration réalisés pour la {pharmacy.name}</li>
        <li>
          Icônes :{" "}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">
            Lucide
          </a>{" "}
          (licence ISC)
        </li>
        <li>Polices : Manrope et DM Serif Display (SIL Open Font License)</li>
      </ul>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    content: (
      <p>
        Les présentes mentions légales sont régies par le droit français. Pour toute question, vous pouvez contacter
        la pharmacie à l&apos;adresse <a href={mailHref}>{pharmacy.email}</a>.
      </p>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro={`Informations légales relatives au site de la ${pharmacy.name}.`}
      sections={sections}
    />
  );
}
