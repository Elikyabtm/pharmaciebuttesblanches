/**
 * Configuration centrale de la pharmacie.
 *
 * Toutes les informations modifiables du site sont ici.
 * Les valeurs encore inconnues sont marquées `TODO_REPLACE` :
 * recherchez « TODO_REPLACE » dans le projet pour les retrouver.
 *
 * Tant qu'une valeur vaut TODO_REPLACE :
 *  - les liens externes correspondants sont désactivés proprement (jamais de "#") ;
 *  - l'interface affiche « Information à venir » au lieu de la valeur.
 */

export const TODO = "TODO_REPLACE" as const;

export type OpeningHours = {
  /** Libellé affiché, ex. « Lundi – Vendredi » */
  days: string;
  /** Ex. « 9h00 – 19h30 » ou TODO_REPLACE */
  hours: string;
};

export const pharmacy = {
  name: "Pharmacie des Buttes Blanches",
  shortName: "Buttes Blanches",
  description:
    "Votre pharmacie de proximité à Herblay-sur-Seine : conseils, parapharmacie, livraison à domicile, service pilulier et accompagnement au quotidien.",

  /** URL de production du site (utilisée pour le SEO, le sitemap et Open Graph). */
  siteUrl: "https://www.pharmacie-buttes-blanches.fr", // TODO_REPLACE : confirmer le nom de domaine définitif

  address: {
    street: TODO, // TODO_REPLACE : numéro et rue
    postalCode: "95220",
    city: "Herblay-sur-Seine",
    country: "FR",
  },

  phone: {
    display: "06 70 50 05 63",
    /** Format international pour tel:, sms: et les données structurées */
    e164: "+33670500563",
  },

  email: TODO, // TODO_REPLACE : e-mail de contact de la pharmacie

  openingHours: [
    { days: "Lundi – Vendredi", hours: TODO }, // TODO_REPLACE
    { days: "Samedi", hours: TODO }, // TODO_REPLACE
    { days: "Dimanche", hours: TODO }, // TODO_REPLACE
  ] satisfies OpeningHours[],

  links: {
    /** Page Doctolib de la pharmacie */
    doctolib: TODO, // TODO_REPLACE
    /** Boutique en ligne externe existante */
    shop: TODO, // TODO_REPLACE
    /**
     * WhatsApp — préparé à partir du numéro de la pharmacie.
     * À CONFIRMER : vérifier que ce numéro est bien utilisé sur WhatsApp.
     */
    whatsapp: "https://wa.me/33670500563",
  },

  /** Ne renseigner que des comptes réels. Laisser vide sinon (rien n'est affiché). */
  social: {
    facebook: "",
    instagram: "",
  },

  /** Coordonnées GPS pour la carte (ex. 48.99, 2.16). */
  map: {
    latitude: TODO as number | typeof TODO, // TODO_REPLACE
    longitude: TODO as number | typeof TODO, // TODO_REPLACE
  },
} as const;

/** Vrai si la valeur est renseignée (ni vide, ni TODO_REPLACE). */
export function isConfigured<T>(value: T | typeof TODO | "" | undefined | null): value is T {
  return value !== undefined && value !== null && value !== "" && value !== TODO;
}

export const telHref = `tel:${pharmacy.phone.e164}`;
export const smsHref = `sms:${pharmacy.phone.e164}`;

export function formatAddress(): string | null {
  const { street, postalCode, city } = pharmacy.address;
  const locality = `${postalCode} ${city}`;
  return isConfigured(street) ? `${street}, ${locality}` : null;
}

export const FALLBACK_TEXT = "Information à venir";
