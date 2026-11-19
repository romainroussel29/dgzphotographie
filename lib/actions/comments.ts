'use server';

import { updateTag } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { CACHE_TAGS } from '@/lib/cache-tags';

export type CommentFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const MAX_AUTHOR = 80;
const MAX_CONTENT = 2000;

/** Publie un message dans le livre d'or puis rafraîchit la liste affichée. */
export async function addComment(_prev: CommentFormState, formData: FormData): Promise<CommentFormState> {
  const author = String(formData.get('author') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  if (!author || !content) {
    return { status: 'error', message: 'Merci de renseigner votre nom et votre message.' };
  }
  if (author.length > MAX_AUTHOR || content.length > MAX_CONTENT) {
    return { status: 'error', message: 'Votre nom ou votre message est trop long.' };
  }

  const { error } = await createServerClient().from('comments').insert([{ author, content }]);
  if (error) {
    console.error("Erreur lors de l'envoi du commentaire :", error.message);
    return { status: 'error', message: "Une erreur est survenue lors de l'envoi. Merci de réessayer." };
  }

  updateTag(CACHE_TAGS.comments);
  return { status: 'success' };
}
