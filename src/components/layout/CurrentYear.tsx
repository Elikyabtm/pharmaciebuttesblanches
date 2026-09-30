"use client";

/** Année courante, calculée côté navigateur pour rester juste sur une page statique. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
