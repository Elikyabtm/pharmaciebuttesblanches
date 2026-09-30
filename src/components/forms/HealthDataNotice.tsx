import { Info } from "lucide-react";
import { pharmacy, telHref } from "@/config/pharmacy";

/** Note discrète : pas de données de santé sensibles via les formulaires. */
export function HealthDataNotice() {
  return (
    <p className="flex gap-3">
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-strong" />
      <span>
        Merci de ne pas transmettre d&apos;informations médicales sensibles (ordonnance, traitement, diagnostic) via ce
        formulaire. Pour toute question relative à votre santé, contactez directement la pharmacie au{" "}
        <a href={telHref} className="font-semibold whitespace-nowrap text-forest underline underline-offset-2">
          {pharmacy.phone.display}
        </a>
        .
      </span>
    </p>
  );
}
