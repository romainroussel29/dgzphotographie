import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryView, { GallerySkeleton } from '@/components/gallery/GalleryView';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Série photographique en noir et blanc.',
};

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <Link href="/galerie" className="group kicker text-muted hover:text-ink transition-colors animate-rise">
        <span aria-hidden className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">
          ←
        </span>{' '}
        Index des galeries
      </Link>

      {/* L'identifiant est lu dans l'adresse côté navigateur : Suspense est requis pour l'export statique. */}
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryView />
      </Suspense>
    </div>
  );
}
