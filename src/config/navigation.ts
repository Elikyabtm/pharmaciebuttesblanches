import type { LucideIcon } from "lucide-react";
import { Globe, Pill, Truck } from "lucide-react";
import { productCategories, productHref } from "@/data/products";

export type NavLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
};

export type NavItem =
  | (NavLink & { children?: undefined })
  | { label: string; children: NavLink[]; overview?: NavLink };

export const serviceLinks: NavLink[] = [
  { label: "Livraison", href: "/livraison", icon: Truck, description: "Vos produits livrés à domicile" },
  { label: "Service Pilulier", href: "/pilulier", icon: Pill, description: "Particuliers, infirmiers, EHPAD" },
  { label: "Empressa Madagascar", href: "/empressa-madagascar", icon: Globe, description: "Envois vers Madagascar" },
];

export const productLinks: NavLink[] = productCategories.map((c) => ({
  label: c.name,
  href: productHref(c.slug),
  icon: c.icon,
  description: c.tagline,
}));

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Nos produits",
    children: productLinks,
    overview: { label: "Voir tous nos produits", href: "/produits" },
  },
  { label: "Services", children: serviceLinks },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const footerInfoLinks: NavLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Expédition et retours", href: "/expedition-retours" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Politique de cookies", href: "/politique-de-cookies" },
  { label: "Mentions légales", href: "/mentions-legales" },
];
