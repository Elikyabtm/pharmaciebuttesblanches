import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { footerInfoLinks } from "@/config/navigation";
import { FALLBACK_TEXT, formatAddress, isConfigured, pharmacy, telHref } from "@/config/pharmacy";
import { CurrentYear } from "./CurrentYear";

const quickLinks = [
  { label: "Nos produits", href: "/produits" },
  { label: "Livraison", href: "/livraison" },
  { label: "Service Pilulier", href: "/pilulier" },
  { label: "Empressa", href: "/empressa-madagascar" },
  { label: "Prendre rendez-vous", href: pharmacy.links.doctolib },
  { label: "Contact", href: "/contact" },
];

const linkClass = "rounded text-white/70 transition-colors hover:text-white";

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="mb-5 text-[0.72rem] font-bold tracking-[0.18em] text-brand-soft uppercase">{children}</h2>;
}

export function Footer() {
  const address = formatAddress();
  const socials = Object.entries(pharmacy.social).filter(([, url]) => isConfigured(url));

  return (
    <footer className="relative overflow-hidden bg-forest text-white">
      {/* Détail graphique discret */}
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] opacity-[0.06]">
        <rect x="150" y="0" width="100" height="170" rx="50" fill="#8EB55C" />
        <rect x="150" y="230" width="100" height="170" rx="50" fill="#8EB55C" />
        <rect x="0" y="150" width="170" height="100" rx="50" fill="#8EB55C" />
        <rect x="230" y="150" width="170" height="100" rx="50" fill="#8EB55C" />
      </svg>

      <div className="container-site relative pt-20 pb-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr_1.1fr] lg:gap-10">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-white/70">
              Votre pharmacie de proximité à {pharmacy.address.city}. Conseil, accompagnement et services pensés pour
              votre quotidien.
            </p>
          </div>

          <div>
            <ColumnTitle>Nous trouver</ColumnTitle>
            <ul className="space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <span className="text-white/70">
                  {address ?? (
                    <>
                      {pharmacy.address.postalCode} {pharmacy.address.city}
                      <span className="block text-sm text-white/45">Adresse complète : {FALLBACK_TEXT.toLowerCase()}</span>
                    </>
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <a href={telHref} className={linkClass}>
                  {pharmacy.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                {isConfigured(pharmacy.email) ? (
                  <a href={`mailto:${pharmacy.email}`} className={linkClass}>
                    {pharmacy.email}
                  </a>
                ) : (
                  <span className="text-white/45">E-mail : {FALLBACK_TEXT.toLowerCase()}</span>
                )}
              </li>
            </ul>
          </div>

          <div>
            <ColumnTitle>Horaires</ColumnTitle>
            <ul className="space-y-3 text-[0.95rem]">
              {pharmacy.openingHours.map((slot) => (
                <li key={slot.days} className="flex gap-3">
                  <Clock aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                  <span>
                    <span className="block text-white/90">{slot.days}</span>
                    <span className="text-white/55">{isConfigured(slot.hours) ? slot.hours : FALLBACK_TEXT}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-2 lg:contents">
            <nav aria-label="Liens rapides">
              <ColumnTitle>Liens rapides</ColumnTitle>
              <ul className="space-y-3 text-[0.95rem]">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className={linkClass} disabledHint="Lien Doctolib bientôt disponible">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Informations">
              <ColumnTitle>Informations</ColumnTitle>
              <ul className="space-y-3 text-[0.95rem]">
                {footerInfoLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {pharmacy.name}. Tous droits réservés.
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-4">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <SmartLink href={url} className={`${linkClass} capitalize`}>
                    {name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
          <p>Pour toute question médicale, adressez-vous directement à votre pharmacien.</p>
        </div>
      </div>
    </footer>
  );
}
