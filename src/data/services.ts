import type { LucideIcon } from "lucide-react";
import { Globe, Pill, ShoppingBag, Truck } from "lucide-react";
import { pharmacy } from "@/config/pharmacy";

export type Service = {
  title: string;
  description: string;
  cta: string;
  /** Vide = lien pas encore configuré (carte affichée « Bientôt disponible ») */
  href: string;
  icon: LucideIcon;
};

export const homeServices: Service[] = [
  {
    title: "Acheter en ligne",
    description: "Retrouvez vos produits directement sur notre boutique en ligne.",
    cta: "Accéder à la boutique",
    href: pharmacy.links.shop,
    icon: ShoppingBag,
  },
  {
    title: "Demander une livraison",
    description: "Profitez de notre service de livraison pour recevoir vos produits directement à domicile.",
    cta: "Faire une demande",
    href: "/livraison",
    icon: Truck,
  },
  {
    title: "Service Pilulier",
    description: "Un service de préparation adapté aux particuliers, infirmiers et établissements.",
    cta: "Découvrir le service",
    href: "/pilulier",
    icon: Pill,
  },
  {
    title: "Empressa Madagascar",
    description: "Un service dédié à vos demandes d'envoi à destination de Madagascar.",
    cta: "Découvrir le service",
    href: "/empressa-madagascar",
    icon: Globe,
  },
];
