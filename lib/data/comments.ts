import { supabase } from '@/lib/supabase/client';
import type { Comment } from '@/lib/types';

// Livre d'or : lecture et publication depuis le navigateur.

export const MAX_AUTHOR_LENGTH = 80;
export const MAX_CONTENT_LENGTH = 2000;

/** Messages du livre d'or, du plus récent au plus ancien. */
export async function fetchComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, author, content, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Chargement des commentaires impossible : ${error.message}`);
  return data ?? [];
}

/** Publie un message et renvoie le message enregistré. */
export async function insertComment(author: string, content: string): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ author, content }])
    .select('id, author, content, created_at')
    .single();

  if (error) throw new Error(`Envoi du commentaire impossible : ${error.message}`);
  return data;
}
