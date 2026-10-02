"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { pharmacy, telHref } from "@/config/pharmacy";
import { formsById } from "@/data/forms";
import {
  submitRequest,
  validateField,
  validateForm,
  type FieldConfig,
  type FormErrors,
  type FormValues,
} from "@/lib/forms";
import { cn } from "@/lib/utils";
import { FormField } from "./FormField";

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

type RequestFormProps = {
  /** Identifiant du formulaire (transmis au service d'envoi) */
  formId: string;
  fields: FieldConfig[];
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  /** Note discrète affichée sous le formulaire */
  notice?: ReactNode;
  className?: string;
};

const CONSENT = "consentement";

export function RequestForm({
  formId,
  fields,
  submitLabel = "Envoyer ma demande",
  successTitle = "Votre demande a bien été envoyée",
  successMessage = "Merci ! Notre équipe revient vers vous dans les meilleurs délais.",
  notice,
  className,
}: RequestFormProps) {
  const uid = useId();
  const domId = `${formId}-${uid.replace(/:/g, "")}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string>();
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string>();
  const [mailtoHref, setMailtoHref] = useState<string>();

  const submitting = status === "submitting";

  const handleChange = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Revalide en direct uniquement un champ déjà en erreur
    if (errors[name]) {
      const field = fields.find((f) => f.name === name);
      if (field) setErrors((e) => ({ ...e, [name]: validateField(field, value) }));
    }
  };

  const handleBlur = (name: string) => {
    const field = fields.find((f) => f.name === name);
    if (field && values[name]) setErrors((e) => ({ ...e, [name]: validateField(field, values[name]) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot anti-spam
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) return;

    const nextErrors = validateForm(fields, values);
    const nextConsentError = consent ? undefined : "Merci de confirmer avoir pris connaissance de la politique de confidentialité.";
    setErrors(nextErrors);
    setConsentError(nextConsentError);

    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid || nextConsentError) {
      const target = firstInvalid ? `${domId}-${firstInvalid.name}` : `${domId}-${CONSENT}`;
      const el =
        document.getElementById(target) ?? document.getElementById(`${target}-${firstInvalid?.options?.[0]?.value}`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitError(undefined);
    const title = formsById[formId]?.title ?? "Demande depuis le site";
    const result = await submitRequest(formId, title, fields, values, pharmacy.email);
    if (result.status === "sent") {
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } else if (result.status === "mailto") {
      setMailtoHref(result.href);
      setStatus("mailto");
      window.location.href = result.href;
      requestAnimationFrame(() => successRef.current?.focus());
    } else {
      setStatus("error");
      setSubmitError(result.message);
    }
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setConsent(false);
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus());
  };

  const errorCount = Object.values(errors).filter(Boolean).length + (consentError ? 1 : 0);

  return (
    <div className={cn("rounded-card-lg border border-line bg-white p-6 shadow-soft sm:p-8 lg:p-10", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" || status === "mailto" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center py-10 text-center outline-none"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-sage text-brand-strong">
              {status === "mailto" ? (
                <Mail aria-hidden className="size-8" strokeWidth={1.6} />
              ) : (
                <CheckCircle2 aria-hidden className="size-8" strokeWidth={1.6} />
              )}
            </span>
            {status === "mailto" ? (
              <>
                <h3 className="mt-6 text-2xl font-bold">Dernière étape : envoyez l&apos;e-mail</h3>
                <p className="mt-3 max-w-md text-muted">
                  Votre messagerie s&apos;ouvre avec votre demande pré-remplie, adressée à {pharmacy.email}. Il vous
                  suffit de l&apos;envoyer. Rien ne s&apos;est ouvert ?
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                  <a href={mailtoHref} className={buttonClasses("primary", "md")}>
                    <Mail aria-hidden className="size-4.5" />
                    Ouvrir ma messagerie
                  </a>
                  <a href={telHref} className={buttonClasses("secondary", "md")}>
                    Appeler le {pharmacy.phone.display}
                  </a>
                </div>
              </>
            ) : (
              <>
                <h3 className="mt-6 text-2xl font-bold">{successTitle}</h3>
                <p className="mt-3 max-w-md text-muted">{successMessage}</p>
                <Button variant="secondary" className="mt-8" onClick={reset}>
                  Envoyer une autre demande
                </Button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-busy={submitting}
          >
            <p className="mb-6 text-sm text-muted">
              Les champs marqués d&apos;un <span className="font-semibold text-brand-strong">*</span> sont obligatoires.
            </p>

            <div aria-live="polite">
              {errorCount > 0 && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-danger/20 bg-danger-soft p-4 text-sm text-danger">
                  <CircleAlert aria-hidden className="mt-0.5 size-4.5 shrink-0" />
                  <p>
                    {errorCount === 1
                      ? "Un champ nécessite votre attention."
                      : `${errorCount} champs nécessitent votre attention.`}
                  </p>
                </div>
              )}
              {status === "error" && submitError && (
                <div className="mb-6 rounded-2xl border border-danger/20 bg-danger-soft p-4 text-sm text-danger">
                  {submitError}
                </div>
              )}
            </div>

            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  formId={domId}
                  value={values[field.name] ?? ""}
                  error={errors[field.name]}
                  disabled={submitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}
            </div>

            {/* Honeypot — invisible pour les humains */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${domId}-website`}>Ne pas remplir</label>
              <input id={`${domId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-7">
              <label htmlFor={`${domId}-${CONSENT}`} className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                <input
                  id={`${domId}-${CONSENT}`}
                  type="checkbox"
                  checked={consent}
                  disabled={submitting}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked) setConsentError(undefined);
                  }}
                  aria-invalid={consentError ? true : undefined}
                  aria-describedby={consentError ? `${domId}-${CONSENT}-error` : undefined}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md accent-(--color-brand-strong)"
                />
                <span>
                  J&apos;ai pris connaissance de la{" "}
                  <Link href="/politique-de-confidentialite" className="font-semibold text-brand-strong underline underline-offset-2">
                    politique de confidentialité
                  </Link>
                  : mes informations sont utilisées par la pharmacie uniquement pour traiter ma demande.
                  <span aria-hidden className="text-brand-strong"> *</span>
                </span>
              </label>
              {consentError && (
                <p id={`${domId}-${CONSENT}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger">
                  <CircleAlert aria-hidden className="size-4 shrink-0" />
                  {consentError}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" disabled={submitting} arrow={!submitting} className="w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
                {submitting ? (
                  <>
                    <LoaderCircle aria-hidden className="size-4.5 animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
              <p className="flex items-center gap-2 text-xs text-muted">
                <ShieldCheck aria-hidden className="size-4 text-brand-strong" />
                Vos données restent confidentielles.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {notice && status !== "success" && status !== "mailto" && (
        <div className="mt-8 rounded-2xl bg-cream p-4 text-[0.82rem] leading-relaxed text-muted">{notice}</div>
      )}
    </div>
  );
}
