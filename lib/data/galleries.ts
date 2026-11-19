import { supabase } from '@/lib/supabase/client';
import type { Gallery, Photo } from '@/lib/types';

// Lecture des galeries depuis Supabase, dans le navigateur.
// Le site étant exporté en statique (hébergement OVH), les données sont toujours à jour sans reconstruire le site.

const GALLERY_FIELDS = 'id, title, cover_image, position, created_at';

/** Toutes les galeries, dans l'ordre choisi dans l'admin. */
export async function fetchGalleries(): Promise<Gallery[]> {
  const { data, error } = await supabase
    .from('galleries')
    .select(GALLERY_FIELDS)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Chargement des galeries impossible : ${error.message}`);
  return data ?? [];
}

/** Une galerie et ses photos, ou `null` si elle n'existe pas. */
export async function fetchGalleryWithPhotos(id: string): Promise<{ gallery: Gallery; photos: Photo[] } | null> {
  const [galleryResult, photosResult] = await Promise.all([
    supabase.from('galleries').select(GALLERY_FIELDS).eq('id', id).maybeSingle(),
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
