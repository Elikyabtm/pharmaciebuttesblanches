# Pharmacie des Buttes Blanches — site vitrine

Site de la Pharmacie des Buttes Blanches (Herblay-sur-Seine) : Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion et Lucide.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Coordonnées, horaires, Doctolib, boutique, WhatsApp/SMS, informations légales, hébergeur | `src/config/pharmacy.ts` |
| Images (remplacer les visuels temporaires) | `src/config/images.ts`, voir `docs/IMAGES.md` |
| Menus et liens du footer | `src/config/navigation.ts` |
| Univers produits et sous-catégories | `src/data/products.ts` |
| Cartes services de l'accueil | `src/data/services.ts` |
| Champs des formulaires | `src/data/forms.ts` |
| Envoi des formulaires | `src/app/api/demande/route.ts` + `src/lib/forms.ts` |
| Couleurs, typographies, rayons (design system) | `src/app/globals.css` (`@theme`) |

Une valeur vide (`""`) dans `pharmacy.ts` signifie « non configuré ». Le canal correspondant (WhatsApp, SMS, réseaux sociaux) n'est alors pas affiché, ou le lien est désactivé proprement (boutique en ligne). Aucun lien ne pointe vers `#`.

## Variables d'environnement (Vercel → Settings → Environment Variables)

Voir `.env.example`.

- `NEXT_PUBLIC_SITE_URL` : domaine définitif (SEO, sitemap). À défaut, le domaine de production Vercel est utilisé.
- `RESEND_API_KEY` et `FORM_FROM_EMAIL` (facultatif) : envoi des formulaires par e-mail via [Resend](https://resend.com). Sans elles, la messagerie du visiteur s'ouvre avec la demande pré-remplie, adressée à la pharmacie. La politique de confidentialité s'adapte automatiquement au mode utilisé (redéploiement nécessaire après modification).

## Principes

- **Pas d'e-commerce** : pas de panier, de paiement ni de compte client. « Acheter en ligne » renvoie vers la boutique externe.
- **Données de santé** : les formulaires ne demandent aucune information médicale. Avant d'en collecter, il faudra une solution conforme (hébergeur HDS).
- **Aucune donnée inventée** : pas d'avis, de note, d'ancienneté ni de marque partenaire fictifs.
- **Accessibilité** : HTML sémantique, focus visible, navigation au clavier, `prefers-reduced-motion` respecté, contrastes AA (le vert `#8EB55C` sert de fond sous du texte vert forêt ; le texte vert utilise `#4A7328`).
- **Carte** : Google Maps, chargée seulement après un clic sur « Afficher la carte » (consentement). Le site ne dépose aucun cookie : pas de bandeau nécessaire. Tout ajout d'outil de mesure d'audience ou de contenu tiers devra passer par un vrai consentement préalable.

## Structure

```
src/
  app/                 routes (App Router), sitemap, robots, icon, OG image
  components/
    layout/            Header, NavDropdown, MobileMenu, Footer
    home/              sections de la page d'accueil
    sections/          PageHero, CTASection, ProductCategoryPage, FormSection, MapEmbed…
    cards/             ServiceCard, ProductCategoryCard, ContactCard, AudienceCard
    forms/             RequestForm, FormField, HealthDataNotice
    chat/              ChatWidget (assistant de navigation)
    ui/                Button, SmartLink, SectionHeading, AnimatedSection, RevealImage, Breadcrumb…
  config/              pharmacy.ts, images.ts, navigation.ts
  data/                products.ts, services.ts, forms.ts
  lib/                 forms.ts (validation), seo.ts, utils.ts
```
