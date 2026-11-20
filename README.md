# DGZ Photographie

Site portfolio d'un photographe portraitiste noir et blanc basé à Marseille.

**Stack** : [Next.js 16](https://nextjs.org) (App Router, export statique) · React 19 · TypeScript · Tailwind CSS 4 · [Supabase](https://supabase.com) (base de données et stockage des photos).

**Hébergement** : mutualisé OVH. Le site est exporté en fichiers statiques (HTML, CSS, JS) : aucun serveur Node.js n'est nécessaire.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés Supabase
npm run dev                  # http://localhost:3000
```

| Script              | Rôle                                                  |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Serveur de développement                              |
| `npm run build`     | Export statique du site dans le dossier `out/`        |
| `npm run lint`      | ESLint                                                |
| `npm run typecheck` | Vérification TypeScript                               |

### Variables d'environnement

| Variable                        | Description                          |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL du projet Supabase               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique (anon) du projet        |

Ces valeurs sont intégrées au JavaScript lors du build : elles doivent être présentes dans `.env.local` avant `npm run build`.
La clé « anon » est publique par nature ; la sécurité des données repose sur les règles RLS configurées dans Supabase.

## Mise en ligne sur OVH

1. `npm run build` : génère le dossier `out/` (quelques Mo).
2. Avec Cyberduck ou FileZilla (FTP/SFTP de l'hébergement), envoyer **le contenu** de `out/` dans le dossier `www/`
   (pas le dossier `out` lui-même, et jamais `node_modules`, `app`, etc.).
3. Vérifier que le fichier caché `.htaccess` a bien été envoyé (afficher les fichiers cachés dans le client FTP).

Le fichier [`public/.htaccess`](public/.htaccess) configure Apache : compression, cache navigateur, page 404 et en-têtes de sécurité.
La redirection vers HTTPS y est prête mais commentée : à activer une fois le certificat SSL actif chez OVH.

Tout ce qui doit être en ligne est dans `out/` : `public/` y est copié tel quel, y compris `.htaccess` et `contact.php`.

## Formulaire de contact

Le formulaire (`components/contact/ContactForm.tsx`) envoie ses champs à [`public/contact.php`](public/contact.php),
exécuté par le PHP de l'hébergement OVH, qui transmet le message par e-mail :

- destinataire : `RECIPIENT` dans `contact.php` (même adresse que `EMAIL` dans `lib/site.ts`) ;
- expéditeur technique `contact@dgzphotographie.fr`, « Répondre » renvoie vers le visiteur ;
- anti-spam : champ piège invisible et délai minimal de 3 secondes avant l'envoi.

En local, `npm run dev` ne sait pas exécuter de PHP : le formulaire y affiche une erreur, c'est normal.
Pour tester le script : `npm run build`, puis `php -S 127.0.0.1:8000` dans le dossier `out/`.

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
│   ├── galerie/         Index des galeries ; galerie/voir/?id=… pour une galerie
│   ├── commentaires/    Livre d'or
│   ├── contact/
│   ├── mentions-legales/ · confidentialite/
│   └── not-found.tsx · error.tsx
└── admin/               Espace d'administration (login, dashboard)

components/              Composants React, rangés par domaine
├── layout/              SiteHeader, SiteFooter, IntroCurtain
├── ui/                  Briques réutilisables : Logo, PageHeader, ButtonLink, ComingSoon, LoadError, styles de formulaire
├── motion/              Animations : Motion (défilement, parallaxe), Cursor, SplitText
├── gallery/             GalleriesSection, GalleryIndex, GalleryView, GalleryGrid, Lightbox
├── guestbook/           Guestbook, CommentList, CommentForm
├── contact/             ContactDetails, ContactForm
└── legal/               Mise en page des pages légales

lib/                     Code sans interface
├── site.ts              Coordonnées, nom du site, citation : à modifier ici uniquement
├── types.ts             Types des tables Supabase
├── data/                Lecture et écriture Supabase (galeries, livre d'or)
├── hooks/useAsync.ts    Chargement de données dans un composant
├── supabase/client.ts   Client Supabase
└── format.ts            Petites fonctions de mise en forme

public/                  Copié tel quel dans out/ : images WebP, .htaccess
design/                  Fichiers sources (logo original) : local, ni versionné ni publié
```

Conventions :

- **Composants serveur par défaut** : ils sont rendus en HTML au moment du build. `'use client'` uniquement pour
  l'interactivité et pour les données lues dans le navigateur.
- **Une page = une route** dans `app/`, la logique et l'affichage vivent dans `components/` et `lib/`.
- **Alias d'import** `@/` vers la racine du projet (`@/components/...`, `@/lib/...`).
- Les noms de fichiers de composants sont en `PascalCase`, le reste en `kebab-case`.

## Données

Le site étant statique, le contenu modifiable (galeries, photos, livre d'or) est lu **dans le navigateur**, directement
depuis Supabase (`lib/data/*`). Tout changement fait dans l'admin est donc visible immédiatement, sans reconstruire
ni renvoyer le site. Seuls les textes et la mise en page nécessitent un nouveau `npm run build` et un envoi sur OVH.

Une galerie s'affiche à l'adresse `/galerie/voir/?id=<identifiant>` : une seule page statique sert toutes les galeries,
y compris celles créées après la mise en ligne.

## Performance

- Images de `public/images` préparées en **WebP** (portrait 83 Ko, logo 26 Ko). L'optimisation automatique de
  `next/image` n'existe pas en export statique (`images.unoptimized`).
- **Compression** gzip et **cache navigateur** configurés dans `.htaccess` : un an pour les fichiers de `_next/static`
  (leur nom change à chaque build), 30 jours pour les images, revalidation systématique des pages HTML.
- Polices auto-hébergées par `next/font`.
- Animations en CSS (aucune bibliothèque), désactivées si le visiteur a réglé « réduire les animations ».

Conseil : les photos envoyées depuis l'admin sont publiées telles quelles. Les redimensionner avant envoi
(2 000 px de large, JPEG ou WebP) accélère nettement les galeries.

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
- Mentions légales : informations surlignées à compléter.
