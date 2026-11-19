'use client';

import { useEffect } from 'react';
import { buttonClass } from '@/components/ui/ButtonLink';

/** Affichée si une page ne peut pas se charger (par exemple si Supabase ne répond pas). */
export default function SiteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-36 text-center" role="alert">
      <p className="kicker text-muted">Erreur</p>
      <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-none">
        Un <em>contretemps</em>
      </h1>
      <p className="mt-8 text-muted max-w-md mx-auto leading-relaxed">
        Le contenu n&apos;a pas pu être chargé. Merci de réessayer dans quelques instants.
      </p>
      <button type="button" onClick={() => retry()} className={`${buttonClass} mt-10`}>
        Réessayer
      </button>
    </section>
  );
}
