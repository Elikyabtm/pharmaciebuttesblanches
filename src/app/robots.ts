import type { MetadataRoute } from "next";
import { pharmacy } from "@/config/pharmacy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${pharmacy.siteUrl}/sitemap.xml`,
    host: pharmacy.siteUrl,
  };
}
