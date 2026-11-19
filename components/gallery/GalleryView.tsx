'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import ComingSoon from '@/components/ui/ComingSoon';
import LoadError from '@/components/ui/LoadError';
import GalleryGrid from './GalleryGrid';
import { fetchGalleryWithPhotos } from '@/lib/data/galleries';
import { useAsync } from '@/lib/hooks/useAsync';
import { pad2 } from '@/lib/format';
import { SITE_NAME } from '@/lib/site';

/**
 * Page d'une galerie. L'identifiant est lu dans l'adresse (`/galerie/voir/?id=portraits`) :
 * le site étant statique, une même page sert toutes les galeries, y compris celles créées après la mise en ligne.
 */
export default function GalleryView() {
  const id = useSearchParams().get('id') ?? '';
  // Changer de galerie remonte le composant, ce qui relance le chargement.
  return <GalleryContent key={id} id={id} />;
}

function GalleryContent({ id }: { id: string }) {
  const state = useAsync(() => (id ? fetchGalleryWithPhotos(id) : Promise.resolve(null)));

  if (state.status === 'loading') return <GallerySkeleton />;
  if (state.status === 'error') return <LoadError what="Cette galerie" />;

  if (!state.data) {
    return (
      <>
        <title>{`Galerie introuvable — ${SITE_NAME}`}</title>
        <ComingSoon
          action={
            <Link href="/galerie" className="inline-block kicker border-b border-ink pb-1 hover:opacity-70 transition">
              Voir les galeries
            </Link>
          }
        >
          Cette galerie n&apos;existe pas ou a été retirée.
        </ComingSoon>
      </>
    );
  }

  const { gallery, photos } = state.data;
  const count = photos.length;

  return (
    <>
      <title>{`${gallery.title} — ${SITE_NAME}`}</title>
      <PageHeader title={gallery.title} className="mt-8 mb-12">
        {count > 0 && (
          <p className="kicker">
            {pad2(count)} photographie{count > 1 ? 's' : ''}
          </p>
        )}
      </PageHeader>

      {count === 0 ? (
        <ComingSoon
          action={
            <Link href="/galerie" className="inline-block kicker border-b border-ink pb-1 hover:opacity-70 transition">
              Voir les autres galeries
            </Link>
          }
        >
          Cette série est en cours de préparation. Les photographies seront bientôt en ligne.
        </ComingSoon>
      ) : (
        <GalleryGrid photos={photos} title={gallery.title} />
      )}
    </>
  );
}

export function GallerySkeleton() {
  return (
    <div aria-busy="true" aria-label="Chargement de la galerie">
      <div className="mt-8 mb-12 h-24 w-2/3 max-w-md bg-paper-deep animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[4/5] bg-paper-deep animate-pulse" />
        ))}
      </div>
    </div>
  );
}
