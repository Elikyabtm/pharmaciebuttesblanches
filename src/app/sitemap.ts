import type { MetadataRoute } from "next";
import { footerInfoLinks } from "@/config/navigation";
import { pharmacy } from "@/config/pharmacy";
import { productCategories, productHref } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = [
    { path: "/", priority: 1 },
    { path: "/produits", priority: 0.9 },
    { path: "/livraison", priority: 0.9 },
    { path: "/pilulier", priority: 0.9 },
    { path: "/pilulier/ehpad", priority: 0.7 },
    { path: "/pilulier/infirmier", priority: 0.7 },
    { path: "/pilulier/particulier", priority: 0.7 },
    { path: "/empressa-madagascar", priority: 0.8 },
    { path: "/a-propos", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  const products = productCategories.map((c) => ({ path: productHref(c.slug), priority: 0.7 }));
  const info = footerInfoLinks.map((l) => ({ path: l.href, priority: 0.3 }));

  return [...main, ...products, ...info].map(({ path, priority }) => ({
    url: `${pharmacy.siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
