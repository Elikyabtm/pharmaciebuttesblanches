import { Clock, Phone } from "lucide-react";
import Link from "next/link";
import { pharmacy, telHref } from "@/config/pharmacy";

/** Encart de réassurance à côté des formulaires : appel direct + horaires. */
export function HelpAside({ steps }: { steps?: string[] }) {
  return (
    <div className="space-y-6">
      {steps && (
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage font-serif text-sm text-brand-strong">
                {i + 1}
              </span>
              <span className="pt-1 text-[0.95rem] leading-relaxed text-muted">{step}</span>
            </li>
          ))}
        </ol>
      )}
      <div className="rounded-card border border-line bg-cream p-6">
        <p className="font-bold text-forest">Vous préférez nous appeler ?</p>
        <a
          href={telHref}
          className="mt-3 inline-flex items-center gap-2.5 font-serif text-2xl text-forest transition-colors hover:text-brand-strong"
        >
          <Phone aria-hidden className="size-5 text-brand-strong" />
          {pharmacy.phone.display}
        </a>
        <Link
          href="/contact#horaires"
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-strong hover:text-forest"
        >
          <Clock aria-hidden className="size-4" />
          Voir nos horaires
        </Link>
      </div>
    </div>
  );
}
