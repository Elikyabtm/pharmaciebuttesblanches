import { pharmacy } from "@/config/pharmacy";
import { formsById } from "@/data/forms";
import { formatSubmission, validateForm, type FormValues } from "@/lib/forms";

/**
 * Réception des formulaires du site.
 *
 * Envoi par e-mail via l'API Resend si ces variables d'environnement sont définies :
 *   RESEND_API_KEY   — clé API Resend
 *   FORM_FROM_EMAIL  — expéditeur sur un domaine vérifié (ex. "Site Pharmacie <site@domaine.fr>")
 *   FORM_TO_EMAIL    — (facultatif) destinataire, par défaut l'e-mail de la pharmacie
 * Sans ces variables, la route répond { delivered: false } et le navigateur ouvre la messagerie
 * du visiteur avec la demande pré-remplie. Aucune donnée n'est stockée par le site.
 */
export async function POST(request: Request) {
  let payload: { formId?: unknown; values?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const form = typeof payload.formId === "string" ? formsById[payload.formId] : undefined;
  if (!form || typeof payload.values !== "object" || payload.values === null) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Ne conserve que les champs attendus, en texte borné
  const raw = payload.values as Record<string, unknown>;
  const values: FormValues = {};
  for (const f of form.fields) {
    const v = raw[f.name];
    values[f.name] = typeof v === "string" ? v.slice(0, f.maxLength ?? 300) : "";
  }
  const errors = validateForm(form.fields, values);
  if (Object.values(errors).some(Boolean)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_FROM_EMAIL;
  if (!apiKey || !from) {
    // Pas de service d'envoi : le navigateur bascule sur la messagerie du visiteur
    return Response.json({ delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.FORM_TO_EMAIL || pharmacy.email],
      subject: `[Site] ${form.title}`,
      text: `${form.title}\n\n${formatSubmission(form.fields, values)}`,
      ...(values.email ? { reply_to: values.email } : {}),
    }),
  });

  if (!res.ok) return Response.json({ ok: false }, { status: 502 });
  return Response.json({ delivered: true });
}
