import type { FieldConfig } from "@/lib/forms";

/**
 * Définition des formulaires du site.
 * Volontairement : aucun champ ne demande d'information médicale détaillée
 * (ordonnance, traitement, diagnostic).
 */

const firstName: FieldConfig = { name: "prenom", label: "Prénom", type: "text", required: true, autoComplete: "given-name" };
const lastName: FieldConfig = { name: "nom", label: "Nom", type: "text", required: true, autoComplete: "family-name" };
const phone: FieldConfig = {
  name: "telephone",
  label: "Téléphone",
  type: "tel",
  required: true,
  autoComplete: "tel",
  placeholder: "06 12 34 56 78",
};
const email: FieldConfig = {
  name: "email",
  label: "E-mail",
  type: "email",
  required: true,
  autoComplete: "email",
  placeholder: "vous@exemple.fr",
};
const proEmail: FieldConfig = { ...email, name: "email", label: "E-mail professionnel", placeholder: "contact@structure.fr" };
const message = (label = "Message", placeholder?: string): FieldConfig => ({
  name: "message",
  label,
  type: "textarea",
  maxLength: 1500,
  placeholder,
});

export const deliveryForm: FieldConfig[] = [
  firstName,
  lastName,
  phone,
  email,
  { name: "adresse", label: "Adresse", type: "text", required: true, autoComplete: "street-address", full: true },
  { name: "codePostal", label: "Code postal", type: "postal", required: true, autoComplete: "postal-code", placeholder: "95220" },
  { name: "ville", label: "Ville", type: "text", required: true, autoComplete: "address-level2" },
  {
    name: "typeDemande",
    label: "Type de demande",
    type: "select",
    required: true,
    full: true,
    placeholder: "Sélectionnez le type de demande",
    options: [
      { value: "pharmacie", label: "Produits de pharmacie" },
      { value: "parapharmacie", label: "Parapharmacie" },
      { value: "autre", label: "Autre" },
    ],
  },
  message("Message / Informations complémentaires", "Créneau souhaité, digicode, étage…"),
];

export const pilulierEhpadForm: FieldConfig[] = [
  { name: "etablissement", label: "Nom de l'établissement", type: "text", required: true, autoComplete: "organization", full: true },
  { name: "responsable", label: "Nom et prénom du responsable", type: "text", required: true, autoComplete: "name" },
  { name: "fonction", label: "Fonction", type: "text", autoComplete: "organization-title" },
  proEmail,
  phone,
  { name: "adresse", label: "Adresse de l'établissement", type: "text", required: true, autoComplete: "street-address", full: true },
  { name: "nbResidents", label: "Nombre de résidents concernés", type: "number" },
  message("Message / besoins particuliers", "Organisation souhaitée, fréquence, contraintes…"),
];

export const pilulierInfirmierForm: FieldConfig[] = [
  lastName,
  firstName,
  { name: "structure", label: "Nom du cabinet / structure", type: "text", autoComplete: "organization", full: true },
  proEmail,
  phone,
  { name: "zone", label: "Ville / zone d'intervention", type: "text" },
  { name: "nbPatients", label: "Nombre de patients concernés", type: "number" },
  message(),
];

export const pilulierParticulierForm: FieldConfig[] = [
  lastName,
  firstName,
  phone,
  email,
  {
    name: "concerne",
    label: "Cette demande concerne :",
    type: "radio",
    required: true,
    options: [
      { value: "moi", label: "Moi-même" },
      { value: "proche", label: "Un proche" },
    ],
  },
  {
    name: "livraison",
    label: "Souhaitez-vous également une livraison ?",
    type: "radio",
    required: true,
    options: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
    ],
  },
  message("Message", "Précisez vos disponibilités pour être recontacté(e)…"),
];

export const empressaForm: FieldConfig[] = [
  lastName,
  firstName,
  phone,
  email,
  { name: "destinataire", label: "Nom du destinataire", type: "text" },
  { name: "villeDestination", label: "Ville de destination à Madagascar", type: "text", required: true, placeholder: "Antananarivo, Toamasina…" },
  { name: "typeProduits", label: "Type de produits à envoyer", type: "text" },
  { name: "quantite", label: "Quantité approximative", type: "text", placeholder: "Ex. 2 colis, 5 kg…" },
  message("Message / Informations complémentaires"),
];

export const contactForm: FieldConfig[] = [
  { ...firstName, required: false },
  { ...lastName, required: false },
  email,
  { ...phone, required: false },
  { name: "objet", label: "Objet", type: "text", required: true, full: true },
  { ...message(), required: true },
];

/** Registre des formulaires : utilisé pour la validation côté serveur et l'objet des e-mails. */
export const formsById: Record<string, { title: string; fields: FieldConfig[] }> = {
  livraison: { title: "Demande de livraison", fields: deliveryForm },
  "pilulier-ehpad": { title: "Demande pilulier — EHPAD", fields: pilulierEhpadForm },
  "pilulier-infirmier": { title: "Demande pilulier — Infirmier·ère", fields: pilulierInfirmierForm },
  "pilulier-particulier": { title: "Demande pilulier — Particulier", fields: pilulierParticulierForm },
  empressa: { title: "Demande Empressa Madagascar", fields: empressaForm },
  contact: { title: "Message depuis le formulaire de contact", fields: contactForm },
};
