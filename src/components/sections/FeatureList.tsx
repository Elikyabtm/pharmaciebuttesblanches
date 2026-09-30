import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Feature = { icon: LucideIcon; title: string; text?: string };

/** Liste d'avantages avec pictogrammes linéaires. */
export function FeatureList({ items, className, columns = 1 }: { items: Feature[]; className?: string; columns?: 1 | 3 }) {
  return (
    <ul className={cn("grid gap-5", columns === 3 && "md:grid-cols-3 md:gap-8", className)}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-strong shadow-soft">
            <Icon aria-hidden className="size-5.5" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block font-bold text-forest">{title}</span>
            {text && <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted">{text}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
