import type { LucideIcon } from "lucide-react";
import { Baby, Droplets, Leaf, PillBottle, Sparkles, Stethoscope } from "lucide-react";
import { images, type SiteImage } from "@/config/images";

/**
 * Univers produits.
 *
 * Les sous-catégories ci-dessous sont des FAMILLES GÉNÉRIQUES servant à
 * structurer les pages (PLACEHOLDER — à valider avec la pharmacie). Elles ne
 * désignent aucune référence ni marque réellement vendue, et ne constituent
 * pas des recommandations de santé.
 */

export type ProductSubcategory = {
  title: string;
  description: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  /** Accroche courte (cartes, menus) */
  tagline: string;
  /** Introduction de la page catégorie */
  intro: string;
  icon: LucideIcon;
  image: SiteImage;
  subcategories: ProductSubcategory[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "herboristerie",
    name: "Herboristerie",
    tagline: "Plantes, tisanes et savoir-faire naturel.",
    intro:
      "Un univers dédié aux plantes : tisanes, infusions et produits d'origine naturelle, sélectionnés par votre pharmacie. Notre équipe vous oriente vers les produits adaptés à vos habitudes.",
    icon: Leaf,
    image: images.herboristerie,
    subcategories: [
      { title: "Tisanes & infusions", description: "Des plantes à infuser pour vos moments de pause." },
      { title: "Plantes en vrac", description: "Une sélection de plantes séchées, conseillées au comptoir." },
      { title: "Huiles essentielles", description: "À utiliser avec précaution : demandez conseil à l'équipe." },
      { title: "Gemmothérapie & autres", description: "D'autres produits naturels à découvrir en pharmacie." },
    ],
  },
  {
    slug: "parapharmacie",
    name: "Parapharmacie",
    tagline: "Soins du visage, du corps et des cheveux.",
    intro:
      "Des soins du quotidien pour prendre soin de votre peau et de vos cheveux, choisis pour leur qualité. Venez découvrir la sélection en officine ou sur notre boutique en ligne.",
    icon: Sparkles,
    image: images.parapharmacie,
    subcategories: [
      { title: "Soins du visage", description: "Nettoyants, hydratants et soins ciblés." },
      { title: "Soins du corps", description: "Laits, huiles et crèmes pour tous les jours." },
      { title: "Cheveux", description: "Shampooings et soins adaptés à chaque type de cheveux." },
      { title: "Solaires", description: "Protection de la peau au soleil, toute l'année." },
    ],
  },
  {
    slug: "hygiene-soins",
    name: "Hygiène & soins",
    tagline: "L'essentiel du quotidien, pour toute la famille.",
    intro:
      "Les incontournables de l'hygiène et des petits soins : tout ce qu'il faut pour la salle de bain et la trousse familiale, avec les conseils de votre pharmacie.",
    icon: Droplets,
    image: images.hygieneSoins,
    subcategories: [
      { title: "Hygiène bucco-dentaire", description: "Brosses à dents, dentifrices et accessoires." },
      { title: "Hygiène corporelle", description: "Gels douche, savons doux et déodorants." },
      { title: "Premiers soins", description: "Pansements, compresses et trousse de secours." },
      { title: "Hygiène intime", description: "Des produits doux et adaptés." },
    ],
  },
  {
    slug: "complements",
    name: "Compléments alimentaires",
    tagline: "Un complément à une alimentation variée.",
    intro:
      "Une sélection de compléments alimentaires, à utiliser dans le cadre d'une alimentation variée et équilibrée et d'un mode de vie sain. Demandez conseil à votre pharmacien avant toute utilisation.",
    icon: PillBottle,
    image: images.complements,
    subcategories: [
      { title: "Vitalité", description: "Des produits pour accompagner votre quotidien." },
      { title: "Sommeil & détente", description: "Une sélection à découvrir avec nos conseils." },
      { title: "Articulations", description: "Des références choisies par l'équipe." },
      { title: "Beauté", description: "Cheveux, peau et ongles." },
    ],
  },
  {
    slug: "materiel-medical",
    name: "Matériel médical",
    tagline: "Confort et maintien à domicile.",
    intro:
      "Du matériel pour faciliter la vie à domicile et le suivi du quotidien. Notre équipe vous aide à choisir l'équipement adapté à votre situation.",
    icon: Stethoscope,
    image: images.materielMedical,
    subcategories: [
      { title: "Automesure", description: "Tensiomètres, thermomètres et appareils de mesure." },
      { title: "Maintien à domicile", description: "Aides techniques pour le confort au quotidien." },
      { title: "Orthopédie", description: "Chevillères, genouillères et contention — sur conseil." },
      { title: "Aide à la mobilité", description: "Cannes, déambulateurs et accessoires." },
    ],
  },
  {
    slug: "bebe-enfant",
    name: "Bébé & enfant",
    tagline: "Douceur et soins pour les tout-petits.",
    intro:
      "Tout pour accompagner les premières années avec douceur : soins, toilette et accessoires, avec les conseils bienveillants de votre pharmacie.",
    icon: Baby,
    image: images.bebeEnfant,
    subcategories: [
      { title: "Toilette & change", description: "Soins lavants, liniments et crèmes pour le change." },
      { title: "Alimentation", description: "Biberons, tétines et accessoires de repas." },
      { title: "Soins du quotidien", description: "Hydratation et protection de la peau délicate." },
      { title: "Maman", description: "Des produits pour accompagner la grossesse et l'allaitement." },
    ],
  },
];

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export const productHref = (slug: string) => `/produits/${slug}`;
