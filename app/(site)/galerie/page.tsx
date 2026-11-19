import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import GalleriesSection from '@/components/gallery/GalleriesSection';

export const metadata: Metadata = {
  title: 'Galeries',
  description: 'Séries photographiques en noir et blanc : portraits, street photography et paysages.',
};

export default function GalleriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title="Galeries" letters className="">
        <p>Exploration visuelle à travers différentes thématiques, toutes en noir et blanc.</p>
      </PageHeader>
      <GalleriesSection />
    </div>
  );
}
