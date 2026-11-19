import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import ComingSoon from '@/components/ui/ComingSoon';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getGalleryWithPhotos } from '@/lib/data/galleries';
import { pad2 } from '@/lib/format';

export async function generateMetadata({ params }: PageProps<'/galerie/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const data = await getGalleryWithPhotos(id);
  return data
    ? { title: data.gallery.title, description: `Galerie « ${data.gallery.title} » — photographies en noir et blanc.` }
    : { title: 'Galerie introuvable' };
}

export default function GalleryPage({ params }: PageProps<'/galerie/[id]'>) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <Link href="/galerie" className="group kicker text-muted hover:text-ink transition-colors animate-rise">
        <span aria-hidden className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">
          ←
        </span>{' '}
        Index des galeries
      </Link>

      {/* L'identifiant de la galerie n'est connu qu'à la requête : le squelette s'affiche instantanément. */}
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent params={params} />
      </Suspense>
    </div>
  );
}

async function GalleryContent({ params }: { params: PageProps<'/galerie/[id]'>['params'] }) {
  const { id } = await params;
  const data = await getGalleryWithPhotos(id);
  if (!data) notFound();

  const { gallery, photos } = data;
  const count = photos.length;

  return (
    <>
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

function GallerySkeleton() {
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
