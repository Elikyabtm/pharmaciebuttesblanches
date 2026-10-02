"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { SiteImage } from "@/config/images";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  image: SiteImage;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Image au-dessus de la ligne de flottaison */
  preload?: boolean;
};

/**
 * Image avec révélation subtile (léger dézoom + fondu) à l'entrée dans le viewport.
 * Le conteneur doit définir sa taille (aspect-ratio ou hauteur).
 */
export function RevealImage({ image, sizes, className, imageClassName, preload }: RevealImageProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduce || preload ? false : { opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition: image.position }}
        />
      </motion.div>
    </div>
  );
}
