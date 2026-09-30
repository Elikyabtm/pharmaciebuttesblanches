import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.18em] uppercase",
        light ? "text-brand-soft" : "text-brand-strong",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", light ? "bg-brand-soft" : "bg-brand")} />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Titre en serif éditoriale */
  serif?: boolean;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  serif = false,
  as: Tag = "h2",
  className,
  id,
  children,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && <Eyebrow className={cn("mb-4", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          serif
            ? "font-serif text-[2.1rem] leading-[1.08] font-normal md:text-5xl"
            : "text-[1.95rem] leading-[1.12] font-bold md:text-[2.6rem]",
        )}
      >
        {title}
      </Tag>
      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
      {children}
    </AnimatedSection>
  );
}
