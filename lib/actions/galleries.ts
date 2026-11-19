'use server';

import { updateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/cache-tags';

/**
 * Vide le cache des galeries : appelée par l'admin après chaque modification
 * (création, suppression, réordonnancement, ajout ou suppression de photo).
 */
export async function refreshGalleries() {
  updateTag(CACHE_TAGS.galleries);
}
