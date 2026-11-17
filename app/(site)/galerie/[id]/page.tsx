import { Suspense } from 'react';
import GalleryView from './GalleryView';

export default function GalleryPage({ params }: PageProps<'/galerie/[id]'>) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <div className="h-20 w-2/3 max-w-md bg-paper-deep animate-pulse" />
        </div>
      }
    >
      <GalleryView params={params} />
    </Suspense>
  );
}
