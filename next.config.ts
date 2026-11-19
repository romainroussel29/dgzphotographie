import type { NextConfig } from 'next';

/**
 * Le site est exporté en fichiers statiques (dossier `out/`) pour l'hébergement mutualisé OVH,
 * qui ne fait pas tourner Node.js. Conséquences :
 * - les données (galeries, livre d'or) sont lues dans le navigateur, directement depuis Supabase ;
 * - les images ne sont pas optimisées à la volée : elles sont préparées en WebP dans public/images ;
 * - le cache et la compression sont gérés par Apache via public/.htaccess.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // Génère galerie/index.html plutôt que galerie.html : adresses propres sur Apache.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  experimental: {
    agentFeedback: true,
  },

  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
