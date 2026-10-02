"use client";

import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { directionsUrl, fullAddress, mapEmbedUrl, pharmacy } from "@/config/pharmacy";

/**
 * Carte Google Maps chargée UNIQUEMENT après un clic explicite.
 * Avant ce clic, aucune requête n'est faite vers Google (pas de cookie,
 * pas de traceur) : c'est le recueil du consentement prévu par la
 * politique de cookies. Le choix n'est pas mémorisé.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card-lg border border-line bg-sage sm:aspect-[16/10] lg:aspect-[4/3]">
      {loaded ? (
        <iframe
          title={`Carte — ${pharmacy.name}, ${fullAddress}`}
          src={mapEmbedUrl}
          loading="lazy"
          className="absolute inset-0 size-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {/* Fond graphique évoquant un plan */}
          <svg aria-hidden className="absolute inset-0 size-full text-brand/20" preserveAspectRatio="none" viewBox="0 0 400 300">
            <path d="M0 80 C 120 60 180 140 400 110" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M60 300 C 90 200 200 170 260 0" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M0 220 C 140 230 260 200 400 240" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <span className="relative flex size-12 items-center justify-center rounded-full bg-white text-brand-strong shadow-soft">
            <MapPin aria-hidden className="size-5.5" />
          </span>
          <p className="relative text-sm font-semibold text-forest">
            {pharmacy.address.street}
            <span className="block font-normal text-muted">
              {pharmacy.address.postalCode} {pharmacy.address.city}
            </span>
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button variant="light" onClick={() => setLoaded(true)}>
              Afficher la carte
            </Button>
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
          <p className="relative max-w-xs text-[0.72rem] leading-snug text-muted">
            La carte est fournie par Google Maps, qui peut déposer des cookies.{" "}
            <Link href="/politique-de-cookies" className="underline underline-offset-2 hover:text-forest">
              En savoir plus
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
