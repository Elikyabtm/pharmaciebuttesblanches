import { CtaArrow } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Carte service entièrement cliquable.
 * Hover : élévation douce, icône qui s'inverse, flèche qui glisse.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <SmartLink
      href={service.href}
      disabledHint="Lien de la boutique bientôt disponible"
      disabledClassName="cursor-not-allowed"
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-card-lg border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-soft) sm:p-8",
        "hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lift",
      )}
    >
      <span aria-hidden className="absolute top-7 right-7 font-serif text-sm text-muted/50 sm:top-8 sm:right-8">
        0{index + 1}
      </span>
      <span className="flex size-14 items-center justify-center rounded-2xl bg-sage text-brand-strong transition-colors duration-500 group-hover/card:bg-brand group-hover/card:text-forest">
        <Icon aria-hidden className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-8 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.description}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-brand-strong transition-colors group-hover/card:text-forest">
        {service.cta}
        <CtaArrow />
      </span>
      {/* Liseré vert qui se déploie */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-(--ease-soft) group-hover/card:scale-x-100"
      />
    </SmartLink>
  );
}
