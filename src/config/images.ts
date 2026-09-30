/**
 * Registre central des images du site.
 *
 * Toutes les images actuelles sont des VISUELS TEMPORAIRES
 * (public/images/placeholders, générés par scripts/generate-placeholders.mjs).
 * Pour remplacer une image : déposez la vraie photo dans public/images/
 * puis modifiez `src` (et `alt`) ci-dessous. La liste détaillée des photos
 * attendues se trouve dans docs/IMAGES.md.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** true tant qu'il s'agit d'un visuel temporaire */
  placeholder: boolean;
};

const ph = (file: string, alt: string): SiteImage => ({
  src: `/images/placeholders/${file}.webp`,
  alt,
  placeholder: true,
});

export const images = {
  hero: ph("hero", "Comptoir lumineux de la pharmacie avec produits de soin et plantes"),
  counsel: ph("counsel", "Espace conseil chaleureux de la pharmacie"),
  delivery: ph("delivery", "Sac de livraison de la pharmacie prêt à être remis à domicile"),
  pillbox: ph("pillbox", "Pilulier hebdomadaire préparé par la pharmacie"),
  madagascar: ph("madagascar", "Baobab et colis évoquant les envois vers Madagascar"),
  team: ph("team", "L'officine de la Pharmacie des Buttes Blanches"),

  herboristerie: ph("herbal", "Plantes et herbes séchées pour tisanes"),
  parapharmacie: ph("skincare", "Flacons de soins et cosmétiques de parapharmacie"),
  hygieneSoins: ph("hygiene", "Produits d'hygiène et de soin du quotidien"),
  complements: ph("supplements", "Compléments alimentaires et plantes"),
  materielMedical: ph("equipment", "Matériel médical pour le maintien à domicile"),
  bebeEnfant: ph("baby", "Produits doux pour bébé et enfant"),
} satisfies Record<string, SiteImage>;
