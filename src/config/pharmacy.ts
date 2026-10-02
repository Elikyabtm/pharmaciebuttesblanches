/**
 * Configuration centrale de la pharmacie.
 *
 * TOUTES les informations affichées sur le site (coordonnées, horaires,
 * liens externes, mentions légales…) proviennent de ce fichier.
 * Pour modifier une information, il suffit de la changer ici.
 *
 * Une valeur vide ("") signifie « non configuré » : l'élément correspondant
 * n'est pas affiché (ex. WhatsApp, SMS, réseaux sociaux) ou le lien est
 * désactivé proprement (jamais de lien vers "#").
 */

export type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type DayHours = {
  day: string;
  /** Jour schema.org (données structurées) */
  key: DayKey;
  /** Plages d'ouverture au format 24 h ["09:00", "12:30"]. Tableau vide = fermé. */
  slots: Array<[string, string]>;
};

/** URL de production : variable d'environnement, sinon domaine Vercel, sinon local. */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const pharmacy = {
  name: "Pharmacie des Buttes Blanches",
  shortName: "Buttes Blanches",
  description:
    "Votre pharmacie de proximité à Herblay-sur-Seine : conseils, parapharmacie, livraison à domicile, service pilulier et accompagnement au quotidien.",

  siteUrl: resolveSiteUrl(),

  address: {
    street: "54 Allée des Bois",
    postalCode: "95220",
    city: "Herblay-sur-Seine",
    country: "FR",
  },

  phone: {
    display: "09 61 59 27 15",
    e164: "+33961592715",
  },

  email: "buttesblanchespharma@gmail.com",

  /**
   * Horaires — repris de la fiche Doctolib de la pharmacie.
   * Modifier ici : le footer, la page contact, l'accueil et les données
   * structurées se mettent à jour automatiquement.
   */
  openingHours: [
    { day: "Lundi", key: "Monday", slots: [["09:00", "12:30"], ["14:00", "19:30"]] },
    { day: "Mardi", key: "Tuesday", slots: [["09:00", "12:30"], ["14:00", "19:30"]] },
    { day: "Mercredi", key: "Wednesday", slots: [["09:00", "12:30"], ["14:00", "19:30"]] },
    { day: "Jeudi", key: "Thursday", slots: [["09:00", "12:30"], ["14:00", "19:30"]] },
    { day: "Vendredi", key: "Friday", slots: [["09:00", "12:30"], ["14:00", "19:30"]] },
    { day: "Samedi", key: "Saturday", slots: [["09:30", "13:30"], ["17:30", "19:00"]] },
    { day: "Dimanche", key: "Sunday", slots: [] },
  ] satisfies DayHours[],

  links: {
    doctolib: "https://www.doctolib.fr/pharmacie/herblay/pharmacie-buttes-blanches",
    /** Boutique en ligne externe. Vide tant que l'URL n'est pas confirmée. */
    shop: "",
    /** Lien wa.me — à renseigner uniquement si WhatsApp est réellement utilisé. */
    whatsapp: "",
  },

  /** Numéro mobile recevant les SMS — vide : le canal SMS n'est pas proposé. */
  smsNumber: "",

  /** Ne renseigner que des comptes réels. Vide = rien n'est affiché. */
  social: {
    facebook: "",
    instagram: "",
  },

  /** Informations légales (page Mentions légales, données structurées). */
  legal: {
    companyName: "PHARMACIE MIORA PEREIRA",
    siret: "93074466900019",
    rcs: "930 744 669 R.C.S. Pontoise",
    shareCapital: "5 000 €",
    vatNumber: "FR70930744669",
    ordreNumber: "10102126918",
    publicationDirector: "Tiarifaliana Rakotonomenjanahary",
    /** Date affichée en haut des pages juridiques — à mettre à jour à chaque modification. */
    lastUpdated: "2 octobre 2026",
  },

  /** Hébergeur du site (déploiement Vercel). */
  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
    contact: "privacy@vercel.com",
  },

  /** Conception et développement du site (crédit). */
  credits: {
    designer: "Elikya Botomba",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Vrai si la valeur est renseignée (non vide). */
export function isConfigured(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim() !== "";
}

export const telHref = `tel:${pharmacy.phone.e164}`;
export const mailHref = `mailto:${pharmacy.email}`;
export const smsHref = isConfigured(pharmacy.smsNumber) ? `sms:${pharmacy.smsNumber}` : "";

export const fullAddress = `${pharmacy.address.street}, ${pharmacy.address.postalCode} ${pharmacy.address.city}`;

/** Itinéraire Google Maps vers l'adresse de la pharmacie. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${pharmacy.name}, ${fullAddress}`,
)}`;

/** Carte Google Maps intégrable (chargée uniquement après action de l'utilisateur). */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`;

const formatTime = (t: string) => t.replace(":", "h");

/** ["09h00 – 12h30", "14h00 – 19h30"] ou ["Fermé"]. */
export function slotLabels(slots: ReadonlyArray<readonly [string, string]>): string[] {
  if (slots.length === 0) return ["Fermé"];
  return slots.map(([a, b]) => `${formatTime(a)} – ${formatTime(b)}`);
}

/** « 09h00 – 12h30 · 14h00 – 19h30 » ou « Fermé ». */
export function formatSlots(slots: ReadonlyArray<readonly [string, string]>): string {
  return slotLabels(slots).join(" · ");
}

/** Regroupe les jours consécutifs aux horaires identiques (ex. « Lundi – Vendredi »). */
export function groupedOpeningHours(): Array<{ label: string; hours: string; slots: string[] }> {
  const groups: Array<{ from: string; to: string; hours: string; slots: string[] }> = [];
  for (const d of pharmacy.openingHours) {
    const hours = formatSlots(d.slots);
    const last = groups[groups.length - 1];
    if (last && last.hours === hours) last.to = d.day;
    else groups.push({ from: d.day, to: d.day, hours, slots: slotLabels(d.slots) });
  }
  return groups.map((g) => ({
    label: g.from === g.to ? g.from : `${g.from} – ${g.to}`,
    hours: g.hours,
    slots: g.slots,
  }));
}
