import type { Metadata } from 'next';
import { SHARE_IMAGE, SITE_NAME, SITE_URL } from '@/config/site';

type PageInfo = {
  title: string;
  description: string;
  /** Adresse de la page, avec la barre finale : `/galerie/`. */
  path?: string;
};

/** Titre, description, adresse canonique et aperçu de partage d'une page. */
export function pageMetadata({ title, description, path }: PageInfo): Metadata {
  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary_large_image' },
  };
}

/** Fil d'Ariane pour les moteurs de recherche (JSON-LD). */
export function breadcrumb(...items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
