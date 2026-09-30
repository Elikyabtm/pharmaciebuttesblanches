/** Concatène des classes CSS en ignorant les valeurs falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}
