/**
 * Types, validation et envoi des formulaires.
 *
 * Aucun backend n'est branché pour le moment : `submitRequest` simule l'envoi.
 * TODO_REPLACE : brancher ici le service d'envoi (API route, Formspree, Brevo…)
 * — et, pour toute donnée de santé, une solution conforme (hébergeur HDS).
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

export type SubmitResult = { ok: true } | { ok: false; message: string };

/** Envoi simulé. TODO_REPLACE : intégrer le vrai service d'envoi. */
export async function submitRequest(formId: string, values: FormValues): Promise<SubmitResult> {
  void formId;
  void values;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}
