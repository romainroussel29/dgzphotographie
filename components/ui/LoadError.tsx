'use client';

/** Message affiché quand des données n'ont pas pu être chargées (Supabase injoignable, connexion coupée…). */
export default function LoadError({ what = 'Le contenu' }: { what?: string }) {
  return (
    <div role="alert" className="py-20 text-center">
      <p className="font-serif italic text-3xl md:text-4xl">Un contretemps…</p>
      <p className="mt-4 text-muted">{what} n&apos;a pas pu être chargé. Vérifiez votre connexion puis réessayez.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-8 kicker border-b border-ink pb-1 hover:opacity-70 transition"
      >
        Réessayer
      </button>
    </div>
  );
}
