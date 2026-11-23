/**
 * TOUTES LES PHOTOS DU SITE (galerie et sélection de l'accueil).
 *
 * Ajouter une photo :
 * 1. copier le fichier dans site/public/assets/img/ avec un nom descriptif, en 3 largeurs :
 *    nom-400.webp, nom-640.webp et nom.webp (1066 px de large) ;
 * 2. ajouter une ligne ci-dessous (le numéro « Pl. » suit l'ordre de la liste) ;
 * 3. npm run build, puis envoyer public/ sur OVH.
 *
 * Remplacer une image : lui donner un nouveau nom, car le cache des images dure 30 jours.
 */
export type Photo = {
  /** Nom du fichier, sans la largeur ni l'extension. */
  file: string;
  title: string;
  /** Description de l'image pour les personnes qui ne la voient pas. */
  alt: string;
  width: number;
  height: number;
};

export const PHOTOS: Photo[] = [
  {
    file: 'portrait-noir-blanc-mains-visage',
    title: 'Le regard',
    alt: 'Portrait souriant, le visage posé entre les mains, sur fond sombre',
    width: 1066,
    height: 1600,
  },
  {
    file: 'portrait-noir-blanc-grand-sourire',
    title: "L'éclat",
    alt: 'Portrait rapproché, grand sourire et mèches sur le front',
    width: 1066,
    height: 1600,
  },
  {
    file: 'portrait-noir-blanc-crochet',
    title: 'Le geste',
    alt: 'Personne âgée concentrée sur son crochet, en pull rayé, éclairée de côté',
    width: 1066,
    height: 1600,
  },
  {
    file: 'portrait-noir-blanc-lunettes',
    title: 'La pensée',
    alt: "Portrait à lunettes, la joue appuyée sur la main, regard tourné vers l'objectif",
    width: 1066,
    height: 1600,
  },
  {
    file: 'portrait-noir-blanc-enfant-fenetre',
    title: "L'enfance",
    alt: "Enfant aux cheveux bouclés souriant contre l'encadrement d'une fenêtre",
    width: 1066,
    height: 1600,
  },
];

/** Adresse de la plus grande version de la photo. */
export const photoSrc = (photo: Photo) => `/assets/img/${photo.file}.webp`;

/** Les 3 largeurs disponibles, pour que le navigateur choisisse la plus légère. */
export const photoSrcSet = (photo: Photo) =>
  `/assets/img/${photo.file}-400.webp 400w, /assets/img/${photo.file}-640.webp 640w, ${photoSrc(photo)} ${photo.width}w`;

/** Numéro de planche : « Pl. 01 ». */
export const plate = (index: number) => `Pl. ${String(index + 1).padStart(2, '0')}`;
