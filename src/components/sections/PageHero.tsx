import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { SiteImage } from "@/config/images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  /** Si fourni : hero split-screen avec photographie à droite */
  image?: SiteImage;
  children?: ReactNode;
  tone?: "cream" | "sage" | "white";
};

const tones = { cream: "bg-cream", sage: "bg-sage", white: "bg-white" };

export function PageHero({ eyebrow, title, description, breadcrumb, image, children, tone = "cream" }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", tones[tone])}>
      <div
        className={cn(
          "container-site pt-8 pb-14 md:pt-10 md:pb-20",
          image && "grid items-center gap-10 lg:grid-cols-12 lg:gap-14 lg:pb-24",
        )}
      >
        <div className={cn(image ? "lg:col-span-6" : "max-w-3xl")}>
          {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-10 md:mb-14" />}
          <AnimatedSection>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className="font-serif text-[2.4rem] leading-[1.06] font-normal sm:text-5xl lg:text-[3.6rem]">{title}</h1>
            {description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            )}
          </AnimatedSection>
          {children && (
            <AnimatedSection delay={0.12} className="mt-10">
              {children}
            </AnimatedSection>
          )}
        </div>

        {image && (
          <div className="lg:col-span-6">
            <RevealImage
              image={image}
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-card-lg lg:aspect-[5/6] lg:max-h-[42rem] lg:w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
