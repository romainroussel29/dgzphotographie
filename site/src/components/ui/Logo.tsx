import type { ImgHTMLAttributes } from 'react';

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> & {
  /** Largeur affichée, pour que le navigateur choisisse la bonne taille de fichier. */
  sizes: string;
};

/** Logo DGZ, décoratif : le lien qui l'entoure porte le nom du site. */
export default function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      className={className ? `logo ${className}` : 'logo'}
      src="/assets/img/logo-dgz-photographie.webp"
      srcSet="/assets/img/logo-dgz-photographie-320.webp 320w, /assets/img/logo-dgz-photographie-640.webp 640w, /assets/img/logo-dgz-photographie.webp 1000w"
      width={1000}
      height={593}
      alt=""
      draggable={false}
      {...props}
    />
  );
}
