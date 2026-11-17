import { Suspense } from 'react';
import GalleryView from './GalleryView';

export default function GalleryPage({ params }: PageProps<'/galerie/[id]'>) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="h-16 w-2/3 max-w-md bg-neutral-900 animate-pulse" />
        </div>
      }
    >
      <GalleryView params={params} />
    </Suspense>
  );
}
