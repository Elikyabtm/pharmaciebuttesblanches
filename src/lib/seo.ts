import type { Metadata } from "next";
import { isConfigured, pharmacy } from "@/config/pharmacy";

type PageMeta = {
  title: string;
  description: string;
  /** Chemin de la page, ex. "/livraison" */
  path: string;
};

/** Metadata homogènes pour chaque page (title, description, canonical, Open Graph). */
export function createMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${pharmacy.name}`,
      description,
      url: path,
      siteName: pharmacy.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${pharmacy.name}`, description },
  };
}

/**
 * Données structurées schema.org/Pharmacy.
 * N'inclut QUE les informations réelles de src/config/pharmacy.ts :
 * aucune note, aucun avis, aucune donnée inventée.
 */
export function pharmacyJsonLd() {
  const { address, legal } = pharmacy;

  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacy.name,
    legalName: legal.companyName,
    description: pharmacy.description,
    url: pharmacy.siteUrl,
    telephone: pharmacy.phone.e164,
    email: pharmacy.email,
    vatID: legal.vatNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.country,
    },
    openingHoursSpecification: pharmacy.openingHours.flatMap((d) =>
      d.slots.map(([opens, closes]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.key}`,
        opens,
        closes,
      })),
    ),
    sameAs: [pharmacy.links.doctolib, ...Object.values(pharmacy.social)].filter((u) => isConfigured(u)),
  };
}
