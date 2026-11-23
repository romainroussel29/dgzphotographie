# DGZ Photographie

Site du photographe : **Next.js** (export statique) · **TypeScript** · **Tailwind CSS 4** · **Sass** · **Supabase**,
plus un script PHP pour le formulaire de contact. Hébergement mutualisé OVH, sans Node.js.

## Mise en ligne sur OVH

1. `npm run build` : compile le site et le range dans **`public/`**.
2. **Seul `public/` part en ligne** : envoyer son contenu (pas le dossier) dans `www/`, fichier caché `.htaccess` compris.

`public/` est entièrement regénéré à chaque `npm run build` : ne rien y modifier à la main, ses sources sont dans `site/`.

## Commandes

| Commande            | Rôle                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `npm install`       | À faire une fois                                                  |
| `npm run dev`       | Site en local sur http://localhost:3000, mis à jour en direct     |
| `npm run build`     | Compile le site dans `public/`                                    |
| `npm run preview`   | Sert `public/` avec PHP sur http://localhost:4173 (formulaire OK) |
| `npm run typecheck` | Vérification TypeScript                                           |

Le formulaire ne fonctionne pas avec `npm run dev`, qui n'exécute pas le PHP. `.htaccess` n'agit que sous Apache.

## Organisation

```
public/                         GÉNÉRÉ par npm run build → seul dossier mis en ligne
site/                           projet Next.js (jamais mis en ligne)
├── next.config.ts              export statique
├── .env.example                modèle de site/.env.local (clés Supabase)
├── public/                     fichiers copiés tels quels dans public/
│   ├── .htaccess               HTTPS, cache, redirections, page 404
│   ├── contact.php             envoi du formulaire par e-mail
│   ├── assets/                 img/ (WebP), fonts/ (woff2), icons/ (svg)
│   └── favicon, manifeste, robots.txt, sitemap.xml
└── src/
    ├── app/                    une page = un dossier (page.tsx), layout.tsx = squelette commun
    ├── components/
    │   ├── layout/             Header, Footer, IntroCurtain, PageHeader
    │   ├── motion/             SplitText (titres animés), Effects + effects/ (animations)
    │   └── ui/                 Logo, Arrow, InstagramIcon, JsonLd
    ├── features/
    │   ├── gallery/            photos.ts (liste des photos), Gallery (grille + visionneuse)
    │   └── contact/            ContactForm
    ├── config/site.ts          coordonnées, citation, description : à modifier ici
    ├── lib/                    métadonnées des pages, client Supabase, utilitaires
    ├── types/database.ts       types des tables Supabase
    └── styles/
        ├── globals.css         Tailwind + ordre des couches CSS
        ├── site.scss           charge le design du site (main.scss) dans la couche « site »
        └── base/ layout/ components/ pages/   design en Sass
scripts/publier.mjs             recopie site/out/ dans public/ après la compilation
img-originales/                 images lourdes, hors git
```

## Modifier le contenu

- **Texte d'une page** : `site/src/app/<page>/page.tsx` (l'accueil : `site/src/app/page.tsx`).
- **Coordonnées** : `site/src/config/site.ts`, et l'adresse de réception dans `site/public/contact.php`.
- **Photos** : mode d'emploi en tête de `site/src/features/gallery/photos.ts`. Chaque photo existe en 3 largeurs
  (`nom-400`, `nom-640`, `nom`) dans `site/public/assets/img/`. Pour remplacer une image, lui donner un nouveau nom
  (cache de 30 jours).
- **Livre d'or** : ajouter le message dans la liste `MESSAGES` de `site/src/app/commentaires/page.tsx`.
- **Nouvelle page** : créer `site/src/app/<adresse>/page.tsx` avec `export const metadata = pageMetadata({…})`,
  l'ajouter au menu (`components/layout/Header.tsx`, `Footer.tsx`) et à `site/public/sitemap.xml`.

Après chaque modification : `npm run build`, puis envoyer `public/`.

## Styles : Sass et Tailwind

Le design existant est en Sass (`site/src/styles/`), avec des classes nommées (`.button`, `.photo-grid`…).
Tailwind s'utilise en complément, directement dans le JSX : `className="mt-8 text-muted md:flex"`.

- Les couleurs, polices et courbes du site sont disponibles en Tailwind : `bg-paper`, `text-ink`, `text-muted`,
  `border-line`, `font-serif`, `font-sans`, `ease-out`…
- Priorité : une classe Tailwind l'emporte sur le design Sass (couches CSS ordonnées dans `globals.css`).
- La remise à zéro de Tailwind (« preflight ») n'est pas chargée : celle du site (`base/_reset.scss`) suffit.
- `container` reste la classe du site (largeur et marges), pas celle de Tailwind.

## Supabase

Le client est prêt dans `site/src/lib/supabase.ts`, aucune fonctionnalité ne l'utilise encore.

1. Copier `site/.env.example` en `site/.env.local` et y mettre l'URL et la clé « anon » du projet
   (Supabase → Project Settings → API).
2. Dans un composant `'use client'` : `const { data, error } = await getSupabase().from('table').select('*');`

Le site étant statique, Supabase est appelé **depuis le navigateur** avec la clé publique « anon », intégrée au
JavaScript au moment de `npm run build`. La sécurité des données repose donc entièrement sur les règles **RLS**
configurées dans Supabase. Les données lues ainsi sont à jour sans recompiler le site.

## Animations

Les liens internes sont de vrais liens `<a>` : chaque page est chargée entièrement, avec la transition animée du
navigateur, le rideau d'introduction une fois par session (accueil), et les effets ci-dessous.

| Attribut / composant                         | Effet                                       |
| -------------------------------------------- | ------------------------------------------- |
| `data-reveal="up"` ou `fade`                 | Apparition au défilement                    |
| `data-reveal="clip"`                         | Dévoilement de bas en haut (images)         |
| `data-reveal="line"` ou `sign`               | Trait ou logo qui se dessine                |
| `data-stagger="up"`                          | Apparition des enfants en cascade           |
| `data-parallax="0.05"`                       | Parallaxe                                   |
| `data-magnetic=""`                           | Bouton qui suit la souris                   |
| `data-cursor="Voir"`                         | Libellé dans le curseur                     |
| `<SplitText mode="load">Le _mot_</SplitText>` | Titre animé mot par mot (`_…_` = italique) |
