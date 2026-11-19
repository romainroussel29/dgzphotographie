# DGZ Photographie

Site portfolio d'un photographe portraitiste noir et blanc basé à Marseille.

**Stack** : [Next.js 16](https://nextjs.org) (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · [Supabase](https://supabase.com) (base de données et stockage des photos).

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés Supabase
npm run dev                  # http://localhost:3000
```

| Script              | Rôle                                          |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Serveur de développement                      |
| `npm run build`     | Build de production                           |
| `npm start`         | Sert le build de production                   |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Vérification TypeScript                       |

### Variables d'environnement

| Variable                        | Description                          |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL du projet Supabase               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique (anon) du projet        |

## Organisation du code

```
app/                     Routes uniquement (pages, layouts, métadonnées)
├── layout.tsx           Document HTML, polices, métadonnées, script de démarrage
├── globals.css          Jetons de design + import des feuilles de style
├── styles/              CSS découpé par thème (animations, effets, composants, accessibilité)
├── (site)/              Pages publiques (groupe de routes : n'apparaît pas dans l'URL)
│   ├── layout.tsx       En-tête, pied de page, effets
│   ├── template.tsx     Transition animée entre les pages
│   ├── page.tsx         Accueil
│   ├── galerie/         Index des galeries et page d'une galerie ([id])
│   ├── commentaires/    Livre d'or
│   ├── contact/
│   ├── mentions-legales/ · confidentialite/
│   └── not-found.tsx · error.tsx
└── admin/               Espace d'administration (login, dashboard)

components/              Composants React, rangés par domaine
├── layout/              SiteHeader, SiteFooter, IntroCurtain
├── ui/                  Briques réutilisables : Logo, PageHeader, ButtonLink, ComingSoon, styles de formulaire
├── motion/              Animations : Motion (défilement, parallaxe), Cursor, SplitText
├── gallery/             GalleryIndex, GalleryGrid, Lightbox
├── guestbook/           CommentList, CommentForm
├── contact/             ContactDetails, ContactForm
└── legal/               Mise en page des pages légales

lib/                     Code sans interface
├── site.ts              Coordonnées, nom du site, citation : à modifier ici uniquement
├── types.ts             Types des tables Supabase
├── data/                Lecture des données, mise en cache avec 'use cache'
├── actions/             Actions serveur (écriture + invalidation du cache)
├── supabase/            Clients Supabase (navigateur / serveur)
├── cache-tags.ts        Étiquettes de cache partagées entre data/ et actions/
└── format.ts            Petites fonctions de mise en forme

public/images/           Images statiques (portrait, logo)
```

Conventions :

- **Composants serveur par défaut.** `'use client'` uniquement pour l'interactivité (survol, formulaires, visionneuse, animations).
- **Une page = une route** dans `app/`, la logique et l'affichage vivent dans `components/` et `lib/`.
- **Alias d'import** `@/` vers la racine du projet (`@/components/...`, `@/lib/...`).
- Les noms de fichiers de composants sont en `PascalCase`, le reste en `kebab-case`.

## Données et cache

Les pages publiques lisent Supabase **côté serveur** via `lib/data/*`. Chaque fonction est mise en cache
(`'use cache'`, durée `hours`) et étiquetée (`cacheTag`) :

| Donnée             | Étiquette   | Invalidée par                                                 |
| ------------------ | ----------- | ------------------------------------------------------------- |
| Galeries et photos | `galleries` | `refreshGalleries()`, appelée par l'admin après chaque modification |
| Livre d'or         | `comments`  | `addComment()`, à chaque nouveau message                       |

Résultat : `/galerie` et `/commentaires` sont servies en HTML statique et se mettent à jour dès qu'un contenu change.

## Performance

- Images servies par `next/image` en **AVIF / WebP**, aux bonnes dimensions, mises en cache 31 jours.
- **Compression gzip** activée (`compress: true`) ; Vercel sert en Brotli.
- JavaScript et CSS versionnés : cache navigateur d'un an (`immutable`). Fichiers de `public/images` : 30 jours.
- Polices auto-hébergées par `next/font`.
- Animations en CSS (aucune bibliothèque), désactivées si le visiteur a réglé « réduire les animations ».

## Animations : mode d'emploi

Dans n'importe quel composant, sans JavaScript à écrire :

| Attribut                 | Effet                                                 |
| ------------------------ | ----------------------------------------------------- |
| `data-reveal="up"`       | Monte en fondu à l'entrée dans l'écran                |
| `data-reveal="fade"`     | Fondu                                                 |
| `data-reveal="clip"`     | Dévoilement de bas en haut (images)                   |
| `data-reveal="line"`     | Trait qui se dessine                                  |
| `data-reveal="sign"`     | Dévoilement de gauche à droite (logo)                 |
| `data-stagger="up"`      | Applique l'effet aux enfants, en cascade              |
| `data-parallax="0.1"`    | Parallaxe (vitesse)                                   |
| `data-magnetic`          | Bouton qui suit légèrement la souris                  |
| `data-cursor="Voir"`     | Libellé affiché dans le curseur au survol             |
| `className="animate-rise [--d:300ms]"` | Apparition au chargement, avec délai     |

Titres animés mot par mot : `<SplitText text="Le portrait _authentique_" />` (les mots entre `_` sont en italique).

## Points en attente

- **Connexion admin simulée** (`app/admin/login`) : identifiants en dur et tableau de bord non protégé. À remplacer par Supabase Auth.
- **Formulaire de contact** non relié : aucun message n'est envoyé (voir `components/contact/ContactForm.tsx`).
- Mentions légales : informations surlignées à compléter.
