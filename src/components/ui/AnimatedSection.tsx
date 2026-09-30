"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  /** Délai en secondes (pour échelonner des éléments voisins) */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-up discret au scroll. Désactivé si prefers-reduced-motion. */
export function AnimatedSection({ children, className, delay = 0, as = "div", ...rest }: AnimatedSectionProps) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
