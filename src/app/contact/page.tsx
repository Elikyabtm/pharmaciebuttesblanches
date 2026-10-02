import { CalendarDays, Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone, type LucideIcon } from "lucide-react";
import { ContactCard } from "@/components/cards/ContactCard";
import { HealthDataNotice } from "@/components/forms/HealthDataNotice";
import { RequestForm } from "@/components/forms/RequestForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { OpeningHoursList } from "@/components/ui/OpeningHoursList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isConfigured, mailHref, pharmacy, smsHref, telHref } from "@/config/pharmacy";
import { contactForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Contactez la ${pharmacy.name}, ${pharmacy.address.street} à ${pharmacy.address.city} : téléphone ${pharmacy.phone.display}, e-mail, rendez-vous Doctolib ou formulaire en ligne.`,
  path: "/contact",
});

function InfoRow({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage text-brand-strong">
        <Icon aria-hidden className="size-5" strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-bold tracking-wide text-forest">{title}</h3>
        <div className="mt-1 text-[0.95rem] text-muted">{children}</div>
      </div>
    </div>
  );
}

type Channel = {
  icon: LucideIcon;
  title: string;
  text: string;
  action: string;
  href: string;
  highlight?: string;
  featured?: boolean;
};

/** Seuls les canaux réellement configurés sont affichés (SMS / WhatsApp optionnels). */
const channels: Channel[] = [
  {
    icon: Phone,
    title: "Téléphone",
    highlight: pharmacy.phone.display,
    text: "Appelez-nous aux heures d'ouverture, nous vous répondons avec plaisir.",
    action: "Appeler",
    href: telHref,
    featured: true,
  },
  {
    icon: Mail,
    title: "E-mail",
    text: `Écrivez-nous à ${pharmacy.email}, nous vous répondons dans les meilleurs délais.`,
    action: "Envoyer un e-mail",
    href: mailHref,
  },
  {
    icon: CalendarDays,
    title: "Rendez-vous",
    text: "Prenez rendez-vous en ligne avec la pharmacie sur Doctolib.",
    action: "Ouvrir Doctolib",
    href: pharmacy.links.doctolib,
  },
  ...(isConfigured(smsHref)
    ? [{ icon: MessageSquare, title: "SMS", text: "Une question rapide ? Envoyez-nous un message.", action: "Envoyer un SMS", href: smsHref }]
    : []),
  ...(isConfigured(pharmacy.links.whatsapp)
    ? [{ icon: MessageCircle, title: "WhatsApp", text: "Discutez directement avec notre équipe.", action: "Ouvrir WhatsApp", href: pharmacy.links.whatsapp }]
    : []),
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contactez-nous"
        description="Une question ? Notre équipe est à votre disposition pour vous renseigner et vous accompagner."
        breadcrumb={[{ label: "Contact" }]}
      />

      <section aria-label="Moyens de contact" className="bg-cream pb-16 md:pb-24">
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-3">
            {channels.map((c, i) => (
              <AnimatedSection as="li" key={c.title} delay={i * 0.08}>
                <ContactCard {...c} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="formulaire-contact-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="formulaire-contact-title"
              eyebrow="Écrivez-nous"
              title="Envoyer un message"
              description="Remplissez le formulaire, nous vous répondons dans les meilleurs délais."
            />
            <AnimatedSection delay={0.05} className="mt-10">
              <RequestForm
                formId="contact"
                fields={contactForm}
                submitLabel="Envoyer"
                successTitle="Message envoyé"
                successMessage="Merci pour votre message. Notre équipe vous répond dans les meilleurs délais."
                notice={<HealthDataNotice />}
              />
            </AnimatedSection>
          </div>

          <aside aria-label="Coordonnées de la pharmacie" className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6 lg:sticky lg:top-32 lg:h-auto">
              <AnimatedSection className="rounded-card-lg border border-line bg-white px-6 py-2 sm:px-8">
                <h2 className="sr-only">Coordonnées</h2>
                <InfoRow icon={MapPin} title="Adresse">
                  <span className="text-forest">{pharmacy.address.street}</span>
                  <span className="block">
                    {pharmacy.address.postalCode} {pharmacy.address.city}
                  </span>
                </InfoRow>
                <InfoRow icon={Phone} title="Téléphone">
                  <a href={telHref} className="font-semibold text-forest hover:text-brand-strong">
                    {pharmacy.phone.display}
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} title="E-mail">
                  <a href={mailHref} className="break-all text-forest hover:text-brand-strong">
                    {pharmacy.email}
                  </a>
                </InfoRow>
                <div id="horaires" className="py-5">
                  <h3 className="flex items-center gap-3 text-sm font-bold tracking-wide text-forest">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage text-brand-strong">
                      <Clock aria-hidden className="size-5" strokeWidth={1.6} />
                    </span>
                    Horaires d&apos;ouverture
                  </h3>
                  <OpeningHoursList className="mt-3" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <MapEmbed />
              </AnimatedSection>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
