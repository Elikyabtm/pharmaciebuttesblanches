"use client";

import { useSyncExternalStore } from "react";
import { pharmacy, slotLabels } from "@/config/pharmacy";
import { cn } from "@/lib/utils";

/** Jour courant à Herblay (Europe/Paris), en anglais : "Monday"… */
function parisWeekday(): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Europe/Paris" }).format(new Date());
}

const subscribe = () => () => {};

/**
 * Tableau des horaires (source : src/config/pharmacy.ts).
 * Le jour courant est mis en évidence côté navigateur uniquement
 * (rendu serveur neutre → pas d'écart d'hydratation).
 */
export function OpeningHoursList({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const today = useSyncExternalStore(subscribe, parisWeekday, () => "");
  const dark = tone === "dark";

  return (
    <dl className={cn("divide-y", dark ? "divide-white/10" : "divide-line", className)}>
      {pharmacy.openingHours.map((d) => {
        const isToday = d.key === today;
        const closed = d.slots.length === 0;
        return (
          <div
            key={d.key}
            className={cn(
              "flex items-baseline justify-between gap-4 py-2.5 text-[0.95rem]",
              isToday && "font-semibold",
            )}
          >
            <dt className={cn("flex items-center gap-2", dark ? "text-white/90" : "text-forest")}>
              {d.day}
              {isToday && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase",
                    dark ? "bg-brand/25 text-brand-soft" : "bg-sage text-brand-strong",
                  )}
                >
                  Aujourd&apos;hui
                </span>
              )}
            </dt>
            <dd
              className={cn(
                "flex flex-wrap justify-end text-right tabular-nums",
                dark ? (closed ? "text-white/45" : "text-white/70") : closed ? "text-muted/70" : "text-muted",
              )}
            >
              {slotLabels(d.slots).map((label, i) => (
                <span key={label} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden className="mx-1.5 opacity-50">·</span>}
                  {label}
                </span>
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
