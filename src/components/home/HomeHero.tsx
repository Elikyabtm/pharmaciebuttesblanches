"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { pharmacy, telHref } from "@/config/pharmacy";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      {/* Fond crème qui ancre la composition */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[46%] bg-cream lg:block" />

      <div className="container-site relative grid items-center pt-4 pb-16 lg:min-h-[min(88vh,56rem)] lg:grid-cols-12 lg:py-12">
        {/* Photographie */}
        <motion.div
          className="relative h-[46vh] min-h-[20rem] overflow-hidden rounded-card-lg sm:h-[52vh] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[min(78vh,50rem)]"
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-end justify-between gap-3 sm:right-6 sm:bottom-6 sm:left-6">
            <p className="rounded-full bg-white/90 px-4 py-2.5 text-[0.78rem] font-semibold tracking-wide text-forest backdrop-blur">
              Conseil <span aria-hidden className="mx-1 text-brand">•</span> Proximité{" "}
              <span aria-hidden className="mx-1 text-brand">•</span> Accompagnement
            </p>
            <a
              href={telHref}
              className="group hidden items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-forest">
                <Phone aria-hidden className="size-4.5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-muted">Une question ?</span>
                <span className="text-sm font-bold text-forest">{pharmacy.phone.display}</span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bloc texte superposé */}
        <div className="relative z-10 -mt-14 mx-3 rounded-card-lg bg-cream p-7 sm:mx-8 sm:-mt-20 sm:p-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:m-0 lg:bg-transparent lg:p-0 lg:pr-10">
          <motion.div {...fadeUp(0.1)}>
            <Eyebrow>Votre pharmacie de proximité</Eyebrow>
          </motion.div>
          <motion.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="mt-5 font-serif text-[2.35rem] leading-[1.04] font-normal sm:text-5xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            Bienvenue à la Pharmacie <span className="text-brand-strong italic">des Buttes Blanches</span>
          </motion.h1>
          <motion.p {...fadeUp(0.32)} className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Notre pharmacie vous accompagne au quotidien avec une sélection de produits de qualité et des services pensés
            pour votre santé et votre bien-être.
          </motion.p>
          <motion.div {...fadeUp(0.44)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/#services" size="lg" arrow>
              Découvrir nos services
            </ButtonLink>
            <ButtonLink href={telHref} size="lg" variant="secondary" icon={Phone} className="sm:hidden">
              Appeler la pharmacie
            </ButtonLink>
            <div className="hidden sm:block">
              <ButtonLink href="/contact#horaires" size="lg" variant="ghost">
                Horaires &amp; accès
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
