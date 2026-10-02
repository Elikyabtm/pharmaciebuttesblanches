# Images du site

Toutes les images sont déclarées dans **`src/config/images.ts`**. Pour en remplacer une : déposer le fichier dans `public/images/`, puis modifier `src`, `alt` et `position` (point focal du recadrage) dans ce fichier. Les images passent toutes par `next/image` : redimensionnement automatique, `sizes` adaptés, lazy loading hors hero.

## Photographies en place (`public/images/photos/`)

| Fichier | Clé | Utilisée sur |
|---|---|---|
| `conseil.webp` | `counsel` | Hero de l'accueil, À propos, bloc « conseil » des pages produits |
| `pilulier.webp` | `pillbox` | Focus pilulier (accueil), page Pilulier et ses 3 formulaires |
| `herboristerie.webp` | `herboristerie` | Univers produits, page Herboristerie, vignettes |
| `parapharmacie.webp` | `parapharmacie` | Univers produits, page Parapharmacie, « Nous rendre visite » |
| `hygiene-soins.webp` | `hygieneSoins` | Univers produits, page Hygiène & soins, hero À propos |
| `complements.webp` | `complements` | Univers produits, page Compléments |
| `materiel-medical.webp` | `materielMedical` | Univers produits, page Matériel médical |
| `bebe-enfant.webp` | `bebeEnfant` | Univers produits, page Bébé & enfant, À propos |

Fournies en 1672 × 941 px, converties en WebP (95 à 190 Ko).

## Visuels encore temporaires (`public/images/placeholders/`)

Ce sont des illustrations graphiques aux couleurs du site. Elles sont à remplacer par des photos.

| Clé | Utilisée sur |
|---|---|
| `delivery` | Page Livraison (hero), section « Un service de proximité » de l'accueil |
| `madagascar` | Page Empressa Madagascar (hero) |

### Direction photographique commune

Lumière naturelle douce, tons crème, bois clair et verts sauge, pharmacie contemporaine française, plantes, ambiance humaine et rassurante, premium mais accessible. Format paysage 16:9 (≥ 1600 px de large), sujet principal centré, sans texte incrusté. À éviter : esthétique hôpital, blouses cliniques en gros plan, seringues, visuels anxiogènes, logos de marques.

### Prompts proposés pour générer les visuels manquants

**Livraison** (`public/images/photos/livraison.webp`)
> Photographie éditoriale, lumière naturelle douce du matin. Sur le pas de la porte d'une maison française, une personne de la pharmacie (tenue simple, pas de blouse) remet un sac en papier kraft orné d'une petite croix verte sauge à une dame âgée souriante. Plantes vertes, tons crème et bois clair, faible profondeur de champ, ambiance chaleureuse et rassurante, format 16:9, sans texte.

**Empressa Madagascar** (`public/images/photos/empressa.webp`)
> Photographie éditoriale lumineuse sur un comptoir de pharmacie contemporaine en bois clair : cartons d'expédition soigneusement fermés, étiquettes manuscrites, ficelle naturelle, quelques feuilles vertes. Arrière-plan flou évoquant le voyage (carte ancienne de Madagascar encadrée, baobab en illustration). Tons crème, sable et vert sauge, lumière naturelle douce, format 16:9, sans texte lisible.

**Équipe** (facultatif : `public/images/photos/equipe.webp`, hero de la page À propos)
> De préférence une vraie photo de l'équipe ou de la façade (avec accord des personnes photographiées).

Après ajout, remplacer dans `src/config/images.ts` l'entrée `ph("delivery", …)` par `photo("livraison", "…")` (même principe pour `madagascar`).

## Autres éléments provisoires

- **Logo** : `src/components/brand/Logo.tsx` (logo typographique en attendant le logo officiel).
- **Favicon** : `src/app/icon.svg`.
- **Image Open Graph** : `src/app/opengraph-image.tsx` (générée automatiquement aux couleurs du site).
