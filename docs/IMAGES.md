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
| `livraison.webp` | `delivery` | Page Livraison (hero), section « Un service de proximité » de l'accueil |
| `empressa.webp` | `madagascar` | Page Empressa Madagascar (hero) |

Fournies en 1672 × 941 px, converties en WebP (95 à 190 Ko). Pas de photo d'équipe : le hero de la page À propos utilise la photo `hygiene-soins`.

## Direction photographique

Pour toute nouvelle image : lumière naturelle douce, tons crème, bois clair et verts sauge, pharmacie contemporaine française, ambiance humaine et rassurante. Format paysage 16:9 (≥ 1600 px de large). À éviter : esthétique hôpital, visuels anxiogènes, logos de marques.

## Autres éléments provisoires

- **Logo** : `src/components/brand/Logo.tsx` (logo typographique en attendant le logo officiel).
- **Favicon** : `src/app/icon.svg`.
- **Image Open Graph** : `src/app/opengraph-image.tsx` (générée automatiquement aux couleurs du site).
