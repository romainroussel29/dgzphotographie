import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/ui/JsonLd';
import Gallery from '@/features/gallery/Gallery';
import { PHOTOS } from '@/features/gallery/photos';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Portraits noir et blanc à Marseille | DGZ',
  description: 'Galerie de portraits en noir et blanc de DGZ Photographie, photographe portraitiste à Marseille.',
  path: '/galerie/',
});

/** Les photos sont dans features/gallery/photos.ts. */
export default function GalleryPage() {
  return (
    <div className="page container">
      <JsonLd data={breadcrumb({ name: 'Galerie', path: '/galerie/' })} />
      <PageHeader title="Galerie" letters>
        <p className="kicker">{String(PHOTOS.length).padStart(2, '0')} photographies</p>
      </PageHeader>
      <Gallery />
    </div>
  );
}
