import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  action: string;
  href: string;
  highlight?: string;
  featured?: boolean;
};

export function ContactCard({ icon: Icon, title, text, action, href, highlight, featured }: ContactCardProps) {
  return (
    <article
      className={
        featured
          ? "flex h-full flex-col rounded-card-lg bg-forest p-7 text-white sm:p-8"
          : "flex h-full flex-col rounded-card-lg border border-line bg-white p-7 sm:p-8"
      }
    >
      <span
        className={
          featured
            ? "flex size-13 items-center justify-center rounded-2xl bg-brand text-forest"
            : "flex size-13 items-center justify-center rounded-2xl bg-sage text-brand-strong"
        }
      >
        <Icon aria-hidden className="size-6" strokeWidth={1.5} />
      </span>
      <h2 className={featured ? "mt-7 text-xl font-bold text-white" : "mt-7 text-xl font-bold"}>{title}</h2>
      {highlight && (
        <p className={featured ? "mt-2 font-serif text-3xl text-brand-soft" : "mt-2 font-serif text-3xl text-forest"}>
          {highlight}
        </p>
      )}
      <p className={featured ? "mt-3 flex-1 text-white/70" : "mt-3 flex-1 text-muted"}>{text}</p>
      <ButtonLink href={href} variant={featured ? "primary" : "secondary"} arrow className="mt-7 self-start">
        {action}
      </ButtonLink>
    </article>
  );
}
