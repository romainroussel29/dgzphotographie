import type { NextConfig } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Fichiers de /public (non versionnés par Next.js) : 30 jours de cache navigateur,
// puis revalidation en arrière-plan pendant une semaine.
const PUBLIC_ASSET_CACHE = 'public, max-age=2592000, stale-while-revalidate=604800';

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },

  // Rendu : coquilles statiques + données mises en cache avec 'use cache' (voir lib/data).
  cacheComponents: true,
  partialPrefetching: true,

  // Compression gzip des pages et fichiers servis par `next start` (Vercel compresse en Brotli de lui-même).
  compress: true,
  poweredByHeader: false,

  images: {
    // AVIF en priorité (le plus léger), WebP pour les navigateurs plus anciens.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    // Les photos ne changent jamais à URL constante (noms de fichiers uniques) : cache de 31 jours.
    minimumCacheTTL: 2678400,
    // Photos stockées dans Supabase Storage.
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl}/storage/v1/object/public/**`)] : [],
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
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
