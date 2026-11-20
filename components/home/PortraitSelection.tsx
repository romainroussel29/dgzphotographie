import Image from 'next/image';
import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';
import SplitText from '@/components/motion/SplitText';
import { pad2 } from '@/lib/format';

/** Galerie Supabase vers laquelle renvoie la sélection. */
const GALLERY_HREF = '/galerie/voir/?id=portraits';

/** Sélection de portraits affichée sur l'accueil (fichiers statiques dans public/images/portraits). */
const PORTRAITS = [
  { src: '/images/portraits/portrait-01.webp', title: 'Le regard', alt: 'Portrait souriant, le visage posé entre les mains, sur fond sombre' },
  { src: '/images/portraits/portrait-02.webp', title: "L'éclat", alt: 'Portrait rapproché, grand sourire et mèches sur le front' },
  { src: '/images/portraits/portrait-03.webp', title: 'Le geste', alt: 'Personne âgée concentrée sur son crochet, en pull rayé, éclairée de côté' },
  { src: '/images/portraits/portrait-04.webp', title: 'La pensée', alt: "Portrait à lunettes, la joue appuyée sur la main, regard tourné vers l'objectif" },
  { src: '/images/portraits/portrait-05.webp', title: "L'enfance", alt: "Enfant aux cheveux bouclés souriant contre l'encadrement d'une fenêtre" },
];

/** Vitesse de parallaxe par portrait : les colonnes décalées glissent à des rythmes différents. */
const PARALLAX = ['0.04', '-0.03', '0.05', '-0.04', '0.03'];

export default function PortraitSelection() {
  return (
    <section aria-labelledby="titre-regards" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
        <div>
          <p className="kicker text-muted" data-reveal="up">
            Sélection — Portraits
          </p>
          <h2 id="titre-regards" className="mt-4 font-serif text-5xl md:text-7xl leading-none tracking-tight">
            <SplitText mode="view" text="Des _regards_" step={120} />
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right" data-reveal="up">
          Cinq rencontres, cinq lumières. Des visages saisis dans l&apos;instant, sans artifice.
        </p>
      </div>

      {/* Mobile : carrousel à faire glisser. Ordinateur : 5 colonnes en quinconce. */}
      <ul className="max-w-7xl mx-auto px-5 md:px-10 flex md:grid md:grid-cols-5 md:items-start gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] pb-4 md:pb-0">
        {PORTRAITS.map((portrait, i) => (
          <li key={portrait.src} className={`shrink-0 w-[68vw] sm:w-[40vw] md:w-auto snap-center ${i % 2 === 1 ? 'md:mt-28' : ''}`}>
            <figure>
              <Link
                href={GALLERY_HREF}
                data-reveal="clip"
                data-cursor="Voir"
                className="group relative block aspect-[2/3] overflow-hidden bg-paper-deep"
                aria-label={`${portrait.title} — voir la galerie Portraits`}
              >
                <div data-parallax={PARALLAX[i]} className="absolute -inset-y-[8%] inset-x-0">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    sizes="(min-width: 768px) 20vw, 68vw"
                    className="object-cover grayscale transition-[scale] duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.06]"
                  />
                </div>
              </Link>
              <figcaption className="mt-3 flex justify-between kicker text-muted" data-reveal="fade">
                <span>Pl. {pad2(i + 1)}</span>
                <span>{portrait.title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="max-w-7xl mx-auto px-5 md:px-10 mt-12 md:mt-16 flex justify-center" data-reveal="up">
        <ButtonLink href={GALLERY_HREF}>Voir la galerie Portraits</ButtonLink>
      </div>
    </section>
  );
}
