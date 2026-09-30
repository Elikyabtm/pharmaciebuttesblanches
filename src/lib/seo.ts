import type { Metadata } from "next";
import { formatAddress, isConfigured, pharmacy } from "@/config/pharmacy";

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
 * N'inclut QUE les informations réelles renseignées dans src/config/pharmacy.ts :
 * aucune note, aucun avis, aucune donnée inventée.
 */
export function pharmacyJsonLd() {
  const { address, map } = pharmacy;
  const hasGeo = isConfigured(map.latitude) && isConfigured(map.longitude);

  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacy.name,
    description: pharmacy.description,
    url: pharmacy.siteUrl,
    telephone: pharmacy.phone.e164,
    ...(isConfigured(pharmacy.email) ? { email: pharmacy.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...(formatAddress() ? { streetAddress: address.street } : {}),
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.country,
    },
    ...(hasGeo ? { geo: { "@type": "GeoCoordinates", latitude: map.latitude, longitude: map.longitude } } : {}),
    // TODO_REPLACE : ajouter `openingHoursSpecification` une fois les horaires réels renseignés.
  };
}
