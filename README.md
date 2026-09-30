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
| Coordonnées, horaires, liens Doctolib / boutique / WhatsApp, carte | `src/config/pharmacy.ts` |
| Images (remplacer les visuels temporaires) | `src/config/images.ts`, voir `docs/IMAGES.md` |
| Menus et liens du footer | `src/config/navigation.ts` |
| Univers produits et sous-catégories | `src/data/products.ts` |
| Cartes services de l'accueil | `src/data/services.ts` |
| Champs des formulaires | `src/data/forms.ts` |
| Envoi des formulaires (actuellement simulé) | `src/lib/forms.ts` → `submitRequest` |
| Couleurs, typographies, rayons (design system) | `src/app/globals.css` (`@theme`) |

Toutes les informations manquantes sont marquées **`TODO_REPLACE`** : `grep -rn TODO_REPLACE src`.
Un lien externe qui vaut encore `TODO_REPLACE` est désactivé proprement : il n'envoie jamais vers `#`.

## Principes

- **Pas d'e-commerce** : pas de panier, de paiement ni de compte client. « Acheter en ligne » renvoie vers la boutique externe.
- **Données de santé** : les formulaires ne demandent aucune information médicale. Avant d'en collecter, il faudra une solution conforme (hébergeur HDS).
- **Aucune donnée inventée** : pas d'avis, de note, d'ancienneté ni de marque partenaire fictifs.
- **Accessibilité** : HTML sémantique, focus visible, navigation au clavier, `prefers-reduced-motion` respecté, contrastes AA (le vert `#8EB55C` sert de fond sous du texte vert forêt ; le texte vert utilise `#4A7328`).
- **Carte** : chargée seulement au clic (OpenStreetMap). Elle ne ralentit pas la page.

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
