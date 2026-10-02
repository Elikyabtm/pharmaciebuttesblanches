/**
 * Types, validation et envoi des formulaires.
 *
 * Acheminement (voir src/app/api/demande/route.ts) :
 * 1. Si un service d'envoi est configuré (RESEND_API_KEY + FORM_FROM_EMAIL),
 *    la demande est envoyée par e-mail à la pharmacie depuis le serveur.
 * 2. Sinon, la messagerie du visiteur s'ouvre avec la demande pré-remplie,
 *    adressée à la pharmacie : rien n'est stocké ni perdu silencieusement.
 *
 * Ces formulaires ne sont PAS conçus pour des données de santé
 * (pas d'hébergement certifié HDS).
 */

export type FieldType = "text" | "email" | "tel" | "postal" | "number" | "textarea" | "select" | "radio";

export type FieldOption = { value: string; label: string };

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: FieldOption[];
  hint?: string;
  /** Occupe toute la largeur sur desktop (par défaut : textarea, radio) */
  full?: boolean;
  maxLength?: number;
};

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:(?:\+|00)\d{2,3}[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const POSTAL_RE = /^\d{5}$/;

export function validateField(field: FieldConfig, raw: string | undefined): string | undefined {
  const value = (raw ?? "").trim();

  if (!value) {
    if (!field.required) return undefined;
    return field.type === "radio" || field.type === "select"
      ? "Merci de sélectionner une option."
      : "Ce champ est obligatoire.";
  }

  switch (field.type) {
    case "email":
      return EMAIL_RE.test(value) ? undefined : "Merci d'indiquer une adresse e-mail valide.";
    case "tel":
      return PHONE_RE.test(value) ? undefined : "Merci d'indiquer un numéro de téléphone valide (ex. 06 12 34 56 78).";
    case "postal":
      return POSTAL_RE.test(value) ? undefined : "Le code postal doit contenir 5 chiffres.";
    case "number":
      return /^\d{1,6}$/.test(value) ? undefined : "Merci d'indiquer un nombre.";
    case "select":
    case "radio":
      return field.options?.some((o) => o.value === value) ? undefined : "Merci de sélectionner une option valide.";
    default:
      if (field.maxLength && value.length > field.maxLength)
        return `Merci de ne pas dépasser ${field.maxLength} caractères.`;
      return undefined;
  }
}

export function validateForm(fields: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of fields) {
    const error = validateField(field, values[field.name]);
    if (error) errors[field.name] = error;
  }
  return errors;
}

/** Texte lisible de la demande (corps d'e-mail). */
export function formatSubmission(fields: FieldConfig[], values: FormValues): string {
  return fields
    .map((f) => {
      const raw = (values[f.name] ?? "").trim();
      const value = f.options?.find((o) => o.value === raw)?.label ?? raw;
      return `${f.label} : ${value || "—"}`;
    })
    .join("\n");
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "mailto"; href: string }
  | { status: "error"; message: string };

/** Envoie la demande au serveur ; bascule sur la messagerie si aucun service n'est configuré. */
export async function submitRequest(
  formId: string,
  title: string,
  fields: FieldConfig[],
  values: FormValues,
  to: string,
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/demande", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId, values }),
    });
    const data: { delivered?: boolean } = res.ok ? await res.json() : {};
    if (res.ok && data.delivered) return { status: "sent" };
    if (res.ok) {
      const body = `${title}\n\n${formatSubmission(fields, values)}\n\n— Envoyé depuis le site de la pharmacie`;
      const href = `mailto:${to}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
      return { status: "mailto", href };
    }
    if (res.status === 400) return { status: "error", message: "Certaines informations sont invalides. Merci de vérifier le formulaire." };
  } catch {
    // réseau indisponible : message ci-dessous
  }
  return {
    status: "error",
    message: "L'envoi n'a pas pu aboutir. Merci de réessayer ou de nous contacter par téléphone.",
  };
}
