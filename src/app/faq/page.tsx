import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pharmacy } from "@/config/pharmacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Questions fréquentes sur les services de la Pharmacie des Buttes Blanches : livraison, pilulier, Empressa, rendez-vous.",
  path: "/faq",
});

/** Questions portant uniquement sur l'utilisation du site (aucune modalité inventée). */
const faq = [
  {
    q: "Comment demander une livraison ?",
    a: (
      <>
        Remplissez le formulaire de la page <Link href="/livraison">Livraison</Link>. La pharmacie vous recontacte pour
        organiser votre demande.
      </>
    ),
  },
  {
    q: "À qui s'adresse le service pilulier ?",
    a: (
      <>
        Aux particuliers, aux infirmier·ère·s et aux EHPAD. Choisissez votre profil sur la page{" "}
        <Link href="/pilulier">Service Pilulier</Link>.
      </>
    ),
  },
  {
    q: "Qu'est-ce qu'Empressa ?",
    a: (
      <>
        Empressa est le service de la pharmacie dédié aux demandes d&apos;envoi vers Madagascar. Plus d&apos;informations
        sur la page <Link href="/empressa-madagascar">Empressa Madagascar</Link>.
      </>
    ),
  },
  {
    q: "Puis-je envoyer mon ordonnance via les formulaires du site ?",
    a: (
      <>
        Non. Les formulaires ne sont pas conçus pour recevoir des données de santé. Pour toute question relative à votre
        traitement, contactez directement la pharmacie au{" "}
        <a href={`tel:${pharmacy.phone.e164}`}>{pharmacy.phone.display}</a>.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <LegalPage
      title="Questions fréquentes"
      intro="Les réponses aux questions les plus courantes sur nos services."
      todo="Compléter la FAQ avec les questions réellement posées à la pharmacie"
    >
      <div className="divide-y divide-line rounded-card-lg border border-line">
        {faq.map((item) => (
          <details key={item.q} className="group px-6 py-5 sm:px-8 [&_a]:font-semibold [&_a]:text-brand-strong [&_a]:underline [&_a]:underline-offset-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-forest [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden className="text-2xl leading-none text-brand-strong transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </LegalPage>
  );
}
