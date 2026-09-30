"use client";

import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { isConfigured, pharmacy } from "@/config/pharmacy";

/**
 * Carte chargée À LA DEMANDE : l'iframe (OpenStreetMap) n'est insérée qu'après
 * un clic, ce qui ne bloque pas le chargement de la page et évite tout cookie tiers.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const { latitude, longitude } = pharmacy.map;
  const hasCoords = isConfigured(latitude) && isConfigured(longitude);

  const query = encodeURIComponent(`${pharmacy.name} ${pharmacy.address.postalCode} ${pharmacy.address.city}`);
  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${query}`;

  const d = 0.004;
  const embedUrl = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${Number(longitude) - d},${Number(latitude) - d},${Number(longitude) + d},${Number(latitude) + d}&layer=mapnik&marker=${latitude},${longitude}`
    : null;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card-lg border border-line bg-sage sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
      {loaded && embedUrl ? (
        <iframe
          title={`Carte — ${pharmacy.name}`}
          src={embedUrl}
          loading="lazy"
          className="absolute inset-0 size-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          {/* Fond graphique évoquant un plan */}
          <svg aria-hidden className="absolute inset-0 size-full text-brand/20" preserveAspectRatio="none" viewBox="0 0 400 300">
            <path d="M0 80 C 120 60 180 140 400 110" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M60 300 C 90 200 200 170 260 0" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M0 220 C 140 230 260 200 400 240" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <span className="relative flex size-14 items-center justify-center rounded-full bg-white text-brand-strong shadow-soft">
            <MapPin aria-hidden className="size-6" />
          </span>
          <p className="relative max-w-xs text-sm text-muted">
            {pharmacy.name}
            <br />
            {pharmacy.address.postalCode} {pharmacy.address.city}
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            {embedUrl && (
              <Button variant="light" onClick={() => setLoaded(true)}>
                Afficher la carte
              </Button>
            )}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-white transition-colors hover:bg-forest-soft"
            >
              <Navigation aria-hidden className="size-4" />
              Itinéraire
              <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
