'use client';

import ComingSoon from '@/components/ui/ComingSoon';
import InstagramIcon from '@/components/ui/InstagramIcon';
import LoadError from '@/components/ui/LoadError';
import GalleryIndex from './GalleryIndex';
import { fetchGalleries } from '@/lib/data/galleries';
import { useAsync } from '@/lib/hooks/useAsync';
import { INSTAGRAM_URL } from '@/lib/site';

/** Charge la liste des galeries depuis Supabase et l'affiche. */
export default function GalleriesSection() {
  const state = useAsync(fetchGalleries);

  if (state.status === 'loading') {
    return (
      <div className="mt-6 space-y-px" aria-busy="true" aria-label="Chargement des galeries">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 bg-paper-deep animate-pulse" />
        ))}
      </div>
    );
  }

  if (state.status === 'error') return <LoadError what="La liste des galeries" />;

  if (state.data.length === 0) {
    return (
      <ComingSoon
        action={
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 kicker border-b border-ink pb-1 hover:opacity-70 transition"
          >
            <InstagramIcon /> En attendant, suivez-moi sur Instagram
          </a>
        }
      >
        Les galeries sont en cours de préparation. De nouvelles photographies arrivent très bientôt.
      </ComingSoon>
    );
  }

  return <GalleryIndex galleries={state.data} />;
}
