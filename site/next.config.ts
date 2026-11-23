import type { NextConfig } from 'next';

/**
 * Le site est exporté en fichiers statiques pour l'hébergement mutualisé OVH, qui ne fait pas tourner Node.js.
 * `npm run build` écrit l'export dans site/out/, puis scripts/publier.mjs le recopie dans public/ à la racine :
 * c'est le seul dossier à envoyer sur le serveur.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // galerie/index.html plutôt que galerie.html : adresses propres sur Apache.
  trailingSlash: true,
  // Pas d'optimisation d'image à la volée en export statique : les images sont préparées en WebP.
  images: { unoptimized: true },
  // Pas de mention « X-Powered-By » ni d'indicateur de développement superflu.
  poweredByHeader: false,
};

export default nextConfig;
