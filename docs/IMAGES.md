# Images à remplacer

Toutes les images actuelles du site sont des **visuels temporaires** : des compositions graphiques aux couleurs de la pharmacie, générées par `scripts/generate-placeholders.mjs` et stockées dans `public/images/placeholders/`.

## Comment remplacer une image

1. Déposer la photo dans `public/images/` (format `.webp` ou `.jpg`, 2000 px de large minimum pour les grands visuels).
2. Dans `src/config/images.ts`, remplacer le `src` et l'`alt` de l'entrée concernée, et passer `placeholder` à `false`.

Toutes les images passent par `next/image` : elles sont redimensionnées et optimisées automatiquement.

## Photos attendues

| Clé (`images.ts`) | Où elle apparaît | Ce qu'elle doit montrer | Format conseillé |
|---|---|---|---|
| `hero` | Accueil (hero) | Comptoir ou intérieur lumineux de la pharmacie, ambiance chaleureuse | Paysage 3:2, sujet centré |
| `counsel` | Pilulier, À propos | Membre de l'équipe en conseil avec un·e patient·e (avec son accord) | Paysage 4:3 |
| `delivery` | Accueil (proximité), Livraison | Sac ou paquet de la pharmacie remis à domicile | Portrait 4:5 |
| `pillbox` | Pilulier | Pilulier hebdomadaire préparé, rendu propre et rassurant | Portrait ou carré |
| `madagascar` | Empressa | Colis prêts à partir / paysage de Madagascar (baobabs) | Portrait 5:6 |
| `team` | À propos (hero) | Photo de l'équipe ou façade de la pharmacie | Portrait 5:6 |
| `herboristerie` | Univers produits | Plantes séchées, tisanes, rayon herboristerie | Portrait/paysage, sujet centré |
| `parapharmacie` | Univers produits | Rayon soins visage/corps | idem |
| `hygieneSoins` | Univers produits | Produits d'hygiène du quotidien | idem |
| `complements` | Univers produits | Rayon compléments, sans mise en avant de marque | idem |
| `materielMedical` | Univers produits | Matériel de maintien à domicile, ambiance douce | idem |
| `bebeEnfant` | Univers produits | Soins bébé, textile doux | idem |

**À éviter** : photos médicales froides ou anxiogènes (seringues, blouses en gros plan), visages identifiables sans autorisation, marques visibles sans accord.

## Autres visuels temporaires

- **Logo** : `src/components/brand/Logo.tsx` (logo typographique provisoire).
- **Favicon** : `src/app/icon.svg`.
- **Image Open Graph** : `src/app/opengraph-image.tsx` (générée automatiquement).
- **Logos des marques** : `src/components/home/BrandsSection.tsx` (emplacements « Logo à venir »).
