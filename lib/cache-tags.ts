// Étiquettes de cache : elles relient les données mises en cache (lib/data)
// aux actions qui les invalident (lib/actions).
export const CACHE_TAGS = {
  galleries: 'galleries',
  comments: 'comments',
} as const;
