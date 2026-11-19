import { cacheLife, cacheTag } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { CACHE_TAGS } from '@/lib/cache-tags';
import type { Comment } from '@/lib/types';

/** Messages du livre d'or, du plus récent au plus ancien. Le cache est vidé à chaque nouveau message. */
export async function getComments(): Promise<Comment[]> {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.comments);

  const { data, error } = await createServerClient()
    .from('comments')
    .select('id, author, content, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Chargement des commentaires impossible : ${error.message}`);
  return data ?? [];
}
