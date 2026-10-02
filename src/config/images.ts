/**
 * Registre central des images du site.
 *
 * - Photographies : public/images/photos/ (direction photo commune : lumière
 *   naturelle, tons crème et verts, pharmacie contemporaine).
 * - Visuels TEMPORAIRES (`placeholder: true`) : public/images/placeholders/,
 *   à remplacer par des photos — voir docs/IMAGES.md (prompts de génération inclus).
 *
 * Pour remplacer une image : déposer le fichier dans public/images/ puis
 * modifier `src`, `alt` et éventuellement `position` ci-dessous.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Point focal pour les recadrages (CSS object-position) */
  position?: string;
  /** true tant qu'il s'agit d'un visuel temporaire */
  placeholder: boolean;
};

const photo = (file: string, alt: string, position = "50% 50%"): SiteImage => ({
  src: `/images/photos/${file}.webp`,
  alt,
  position,
  placeholder: false,
});

const ph = (file: string, alt: string): SiteImage => ({
  src: `/images/placeholders/${file}.webp`,
  alt,
  placeholder: true,
});

export const images = {
  // Photographies
  counsel: photo("conseil", "Une pharmacienne conseille une cliente au comptoir de la pharmacie", "56% 45%"),
  pillbox: photo("pilulier", "Préparation d'un pilulier hebdomadaire au comptoir de la pharmacie", "68% 50%"),
  herboristerie: photo("herboristerie", "Bocaux de plantes séchées et tasse d'infusion dans l'espace herboristerie", "42% 60%"),
  parapharmacie: photo("parapharmacie", "Soins dermo-cosmétiques présentés sur un comptoir clair", "35% 60%"),
  hygieneSoins: photo("hygiene-soins", "Produits d'hygiène et de soin du quotidien dans un décor lumineux", "52% 55%"),
  complements: photo("complements", "Compléments alimentaires et plantes présentés en pharmacie", "45% 60%"),
  materielMedical: photo("materiel-medical", "Espace matériel médical : fauteuil, déambulateur et aides au confort", "58% 55%"),
  bebeEnfant: photo("bebe-enfant", "Univers bébé : peluche, linge doux et soins pour les tout-petits", "22% 55%"),

  // Visuels temporaires (à remplacer — voir docs/IMAGES.md)
  delivery: ph("delivery", "Sac de la pharmacie prêt à être livré à domicile"),
  madagascar: ph("madagascar", "Baobab et colis évoquant les envois vers Madagascar"),
} satisfies Record<string, SiteImage>;
