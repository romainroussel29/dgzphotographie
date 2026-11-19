'use client';

import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ButtonArrow, buttonClass } from '@/components/ui/ButtonLink';
import { inputClass, labelClass } from '@/components/ui/form';
import { MAX_AUTHOR_LENGTH, MAX_CONTENT_LENGTH, insertComment } from '@/lib/data/comments';
import type { Comment } from '@/lib/types';

type FormState = { status: 'idle' | 'success' | 'error'; message?: string };

/** Formulaire du livre d'or. Le message est enregistré dans Supabase puis ajouté en tête de liste. */
export default function CommentForm({ onPublished }: { onPublished: (comment: Comment) => void }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    const author = String(formData.get('author') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();

    if (!author || !content) {
      return { status: 'error', message: 'Merci de renseigner votre nom et votre message.' };
    }
    if (author.length > MAX_AUTHOR_LENGTH || content.length > MAX_CONTENT_LENGTH) {
      return { status: 'error', message: 'Votre nom ou votre message est trop long.' };
    }

    try {
      onPublished(await insertComment(author, content));
      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: "Une erreur est survenue lors de l'envoi. Merci de réessayer." };
    }
  }, { status: 'idle' });

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state]);

  return (
    <section aria-labelledby="titre-formulaire" className="border border-ink p-6 md:p-8">
      <h2 id="titre-formulaire" className="font-serif text-3xl">
        Laisser un mot
      </h2>

      <div aria-live="polite">
        {state.status === 'success' && (
          <p className="mt-4 bg-ink text-paper px-4 py-3 text-sm animate-rise">
            Merci&nbsp;! Votre commentaire a bien été publié.
          </p>
        )}
        {state.status === 'error' && (
          <p className="mt-4 border border-red-800 text-red-800 px-4 py-3 text-sm animate-rise">{state.message}</p>
        )}
      </div>

      <form ref={formRef} action={formAction} className="mt-6 space-y-5">
        <div>
          <label htmlFor="author" className={labelClass}>
            Nom / pseudo
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            maxLength={MAX_AUTHOR_LENGTH}
            autoComplete="nickname"
            className={inputClass}
            placeholder="Ex : Jean Dupont"
          />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Commentaire
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            required
            maxLength={MAX_CONTENT_LENGTH}
            className={`${inputClass} resize-none`}
            placeholder="Partagez votre avis…"
          />
        </div>

        <button type="submit" disabled={pending} className={`${buttonClass} w-full disabled:opacity-50`}>
          {pending ? (
            'Publication…'
          ) : (
            <>
              Publier <ButtonArrow />
            </>
          )}
        </button>
        <p className="text-xs text-muted leading-relaxed">
          Votre nom et votre commentaire seront visibles publiquement sur cette page. Voir la{' '}
          <Link href="/confidentialite" className="underline underline-offset-2 hover:text-ink">
            politique de confidentialité
          </Link>
          .
        </p>
      </form>
    </section>
  );
}
