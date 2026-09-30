import { PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER ÉDITORIAL — contenu à compléter par la pharmacie.
 * Rechercher « <TodoContent » dans le projet pour retrouver tous les emplacements.
 */
export function TodoContent({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-card border-2 border-dashed border-brand/40 bg-sage/50 p-6 text-[0.95rem] leading-relaxed text-muted sm:p-7",
        className,
      )}
      data-todo="TODO_REPLACE"
    >
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">
        <PencilLine aria-hidden className="size-4" />
        Contenu à compléter
      </p>
      <p className="mt-3 font-semibold text-forest">{title}</p>
      {children && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}
