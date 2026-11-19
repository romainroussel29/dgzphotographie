import { cacheLife, cacheTag } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { CACHE_TAGS } from '@/lib/cache-tags';
import type { Gallery, Photo } from '@/lib/types';

/**
 * Toutes les galeries, dans l'ordre choisi dans l'admin.
 * Mises en cache une heure ; l'admin vide le cache dès qu'il modifie quelque chose.
 */
export async function getGalleries(): Promise<Gallery[]> {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.galleries);

  const { data, error } = await createServerClient()
    .from('galleries')
    .select('id, title, cover_image, position, created_at')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Chargement des galeries impossible : ${error.message}`);
  return data ?? [];
}

/** Une galerie et ses photos, ou `null` si elle n'existe pas. */
export async function getGalleryWithPhotos(id: string): Promise<{ gallery: Gallery; photos: Photo[] } | null> {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.galleries);

  const supabase = createServerClient();
  const [galleryResult, photosResult] = await Promise.all([
    supabase.from('galleries').select('id, title, cover_image, position, created_at').eq('id', id).maybeSingle(),
    supabase
      .from('photos')
      .select('id, gallery_id, url, name, created_at')
      .eq('gallery_id', id)
      .order('created_at', { ascending: true }),
  ]);

  if (galleryResult.error) throw new Error(`Chargement de la galerie impossible : ${galleryResult.error.message}`);
  if (photosResult.error) throw new Error(`Chargement des photos impossible : ${photosResult.error.message}`);
  if (!galleryResult.data) return null;

  return { gallery: galleryResult.data, photos: photosResult.data ?? [] };
}
