import { CalendarDays, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { footerInfoLinks } from "@/config/navigation";
import { directionsUrl, groupedOpeningHours, isConfigured, mailHref, pharmacy, telHref } from "@/config/pharmacy";
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
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1.2fr_0.9fr_1.1fr] lg:gap-10">
          <div>
            <Logo tone="light" />
            <address className="mt-7 space-y-1 text-[0.95rem] leading-relaxed text-white/70 not-italic">
              <span className="block font-semibold text-white">{pharmacy.name}</span>
              <span className="block">{pharmacy.address.street}</span>
              <span className="block">
                {pharmacy.address.postalCode} {pharmacy.address.city}
              </span>
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-soft transition-colors hover:text-white"
            >
              <Navigation aria-hidden className="size-4" />
              Itinéraire
              <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
            </a>
          </div>

          <div>
            <ColumnTitle>Nous contacter</ColumnTitle>
            <ul className="space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <a href={telHref} className={linkClass}>
                  {pharmacy.phone.display}
                </a>
              </li>
              <li className="flex min-w-0 gap-3">
                <Mail aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <a href={mailHref} className={linkClass} title={pharmacy.email}>
                  Écrire un e-mail
                </a>
              </li>
              <li className="flex gap-3">
                <CalendarDays aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <SmartLink href={pharmacy.links.doctolib} className={linkClass}>
                  Rendez-vous sur Doctolib
                </SmartLink>
              </li>
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                <Link href="/contact" className={linkClass}>
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnTitle>Horaires</ColumnTitle>
            <ul className="space-y-3 text-[0.95rem]">
              {groupedOpeningHours().map((slot) => (
                <li key={slot.label} className="flex gap-3">
                  <Clock aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                  <span>
                    <span className="block text-white/90">{slot.label}</span>
                    {slot.slots.map((label) => (
                      <span key={label} className="block whitespace-nowrap text-white/60">
                        {label}
                      </span>
                    ))}
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
                    <SmartLink href={l.href} className={linkClass}>
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CurrentYear /> {pharmacy.name} — {pharmacy.legal.companyName}
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

        <p className="mt-6 text-xs tracking-wide text-white/45">
          Conception &amp; développement —{" "}
          <span className="font-serif text-[0.85rem] tracking-normal text-brand-soft">{pharmacy.credits.designer}</span>
        </p>
      </div>
    </footer>
  );
}
