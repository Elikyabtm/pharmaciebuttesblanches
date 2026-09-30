import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section-y bg-cream">
      <div className="container-site flex flex-col items-center text-center">
        <LogoMark className="size-14" />
        <p className="mt-8 text-xs font-bold tracking-[0.18em] text-brand-strong uppercase">Erreur 404</p>
        <h1 className="mt-4 font-serif text-4xl font-normal md:text-5xl">Cette page est introuvable</h1>
        <p className="mt-5 max-w-md text-muted">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Retour à l&apos;accueil
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Nous contacter
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
