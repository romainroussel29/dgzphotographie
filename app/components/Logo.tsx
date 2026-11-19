import Image from 'next/image';

/**
 * Logo DGZ Photographie (signature + « Photographie »).
 * Le fichier est noir sur fond transparent : `light` l'affiche en clair, pour les fonds sombres.
 */
export default function Logo({
  className = '',
  light = false,
  priority = false,
  sizes = '240px',
  decorative = false,
}: {
  className?: string;
  light?: boolean;
  priority?: boolean;
  sizes?: string;
  /** À activer quand le logo est purement décoratif (un autre élément porte déjà le nom). */
  decorative?: boolean;
}) {
  return (
    <Image
      src="/images/logo-dgz.png"
      alt={decorative ? '' : 'DGZ Photographie'}
      width={1257}
      height={745}
      priority={priority}
      sizes={sizes}
      draggable={false}
      className={`h-auto select-none ${light ? 'invert' : ''} ${className}`}
    />
  );
}
