/**
 * Registre central des images du site.
 *
 * - Photographies : public/images/photos/ (direction photo commune : lumière
 *   naturelle, tons crème et verts, pharmacie contemporaine).
 * - Liste complète et emplacements : docs/IMAGES.md.
 *
 * Pour remplacer une image : déposer le fichier dans public/images/ puis
 * modifier `src`, `alt` et éventuellement `position` ci-dessous.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Point focal pour les recadrages (CSS object-position) */
  position?: string;
};

const photo = (file: string, alt: string, position = "50% 50%"): SiteImage => ({
  src: `/images/photos/${file}.webp`,
  alt,
  position,
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
  delivery: photo("livraison", "Une pharmacienne remet un colis de la pharmacie à une cliente, devant le véhicule de livraison", "58% 45%"),
  madagascar: photo("empressa", "Espace Madagascar de la pharmacie : affiche de baobabs, vanille, savons et produits naturels", "55% 55%"),
} satisfies Record<string, SiteImage>;
