import { Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from "lucide-react";
import { ContactCard } from "@/components/cards/ContactCard";
import { HealthDataNotice } from "@/components/forms/HealthDataNotice";
import { RequestForm } from "@/components/forms/RequestForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FALLBACK_TEXT, formatAddress, isConfigured, pharmacy, smsHref, telHref } from "@/config/pharmacy";
import { contactForm } from "@/data/forms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Contactez la ${pharmacy.name} à Herblay-sur-Seine : téléphone ${pharmacy.phone.display}, SMS, WhatsApp ou formulaire en ligne.`,
  path: "/contact",
});

function InfoRow({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-5 last:border-0">
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

export default function ContactPage() {
  const address = formatAddress();

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
            <AnimatedSection as="li">
              <ContactCard
                icon={Phone}
                title="Téléphone"
                highlight={pharmacy.phone.display}
                text="Appelez-nous aux heures d'ouverture, nous vous répondons avec plaisir."
                action="Appeler"
                href={telHref}
                featured
              />
            </AnimatedSection>
            <AnimatedSection as="li" delay={0.08}>
              <ContactCard
                icon={MessageSquare}
                title="SMS"
                text="Une question rapide ? Envoyez-nous un message."
                action="Envoyer un SMS"
                href={smsHref}
              />
            </AnimatedSection>
            <AnimatedSection as="li" delay={0.16}>
              <ContactCard
                icon={MessageCircle}
                title="WhatsApp"
                text="Discutez directement avec notre équipe."
                action="Ouvrir WhatsApp"
                href={pharmacy.links.whatsapp}
              />
            </AnimatedSection>
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
                  {address ?? (
                    <>
                      {pharmacy.address.postalCode} {pharmacy.address.city}
                      <span className="block text-sm opacity-70">Adresse complète : {FALLBACK_TEXT.toLowerCase()}</span>
                    </>
                  )}
                </InfoRow>
                <InfoRow icon={Phone} title="Téléphone">
                  <a href={telHref} className="font-semibold text-forest hover:text-brand-strong">
                    {pharmacy.phone.display}
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} title="E-mail">
                  {isConfigured(pharmacy.email) ? (
                    <a href={`mailto:${pharmacy.email}`} className="break-all text-forest hover:text-brand-strong">
                      {pharmacy.email}
                    </a>
                  ) : (
                    FALLBACK_TEXT
                  )}
                </InfoRow>
                <div id="horaires">
                  <InfoRow icon={Clock} title="Horaires">
                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
                      {pharmacy.openingHours.map((slot) => (
                        <div key={slot.days} className="contents">
                          <dt className="text-forest">{slot.days}</dt>
                          <dd>{isConfigured(slot.hours) ? slot.hours : FALLBACK_TEXT}</dd>
                        </div>
                      ))}
                    </dl>
                  </InfoRow>
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
