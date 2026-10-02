import type { LucideIcon } from "lucide-react";
import { Baby, Droplets, Leaf, PillBottle, Sparkles, Stethoscope } from "lucide-react";
import { images, type SiteImage } from "@/config/images";

/**
 * Univers produits.
 *
 * Les sous-catégories reprennent les familles présentées en officine
 * (signalétique des espaces). Elles ne citent aucune référence ni marque,
 * et ne constituent pas des recommandations de santé.
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
      { title: "Plantes", description: "Une sélection de plantes séchées, présentées et conseillées au comptoir." },
      { title: "Infusions & tisanes", description: "Des plantes à infuser pour vos moments de pause." },
      { title: "Huiles essentielles", description: "À utiliser avec précaution : demandez toujours conseil à l'équipe." },
      { title: "Compléments naturels", description: "Des produits d'origine végétale, à découvrir avec nos conseils." },
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
      { title: "Dermo-cosmétique", description: "Des soins pour le visage et le corps, choisis pour leur qualité." },
      { title: "Soins quotidiens", description: "Nettoyer, hydrater, protéger : les gestes de tous les jours." },
      { title: "Cheveux", description: "Shampooings et soins adaptés à chaque type de cheveux." },
      { title: "Conseil personnalisé", description: "L'équipe vous oriente vers les soins adaptés à votre peau." },
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
      { title: "Soins quotidiens", description: "Les essentiels de la salle de bain pour toute la famille." },
      { title: "Fraîcheur", description: "Hygiène bucco-dentaire, déodorants et produits rafraîchissants." },
      { title: "Confort", description: "Des produits doux pour les peaux sensibles." },
      { title: "Premiers soins", description: "Pansements, compresses et trousse familiale." },
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
      { title: "Vitalité & équilibre", description: "Une sélection à découvrir avec les conseils de l'équipe." },
      { title: "Nutrition", description: "Des compléments à associer à une alimentation variée." },
      { title: "Bien-être", description: "Des produits choisis pour accompagner votre quotidien." },
      { title: "Conseil avant tout", description: "Demandez l'avis de votre pharmacien avant toute utilisation." },
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
      { title: "Maintien à domicile", description: "Des équipements pour faciliter la vie à la maison." },
      { title: "Confort", description: "Fauteuils, coussins et aides au repos." },
      { title: "Mobilité", description: "Cannes, déambulateurs et fauteuils roulants." },
      { title: "Autonomie", description: "Des aides techniques pour les gestes du quotidien." },
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
      { title: "Soins", description: "Hydratation et protection de la peau délicate des tout-petits." },
      { title: "Hygiène", description: "Toilette et change, avec des produits doux." },
      { title: "Alimentation", description: "Biberons, tétines et accessoires de repas." },
      { title: "Puériculture & éveil", description: "Accessoires du quotidien et jouets d'éveil." },
    ],
  },
];

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export const productHref = (slug: string) => `/produits/${slug}`;
