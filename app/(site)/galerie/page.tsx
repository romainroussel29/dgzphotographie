import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ComingSoon from '@/components/ui/ComingSoon';
import InstagramIcon from '@/components/ui/InstagramIcon';
import GalleryIndex from '@/components/gallery/GalleryIndex';
import { getGalleries } from '@/lib/data/galleries';
import { INSTAGRAM_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Galeries',
  description: 'Séries photographiques en noir et blanc : portraits, street photography et paysages.',
};

export default async function GalleriesPage() {
  const galleries = await getGalleries();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title="Galeries" letters className="">
        <p>Exploration visuelle à travers différentes thématiques, toutes en noir et blanc.</p>
      </PageHeader>

      {galleries.length === 0 ? (
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
      ) : (
        <GalleryIndex galleries={galleries} />
      )}
    </div>
  );
}
