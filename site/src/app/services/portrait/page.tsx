import PageHeader from '@/components/layout/PageHeader';
import Arrow from '@/components/ui/Arrow';
import JsonLd from '@/components/ui/JsonLd';
import { PHOTOS, photoSrc, photoSrcSet } from '@/features/gallery/photos';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Séance photo portrait à Marseille | DGZ',
  description:
    'Séance portrait en noir et blanc à Marseille et alentours, avec un mini studio nomade qui se déplace où vous voulez, pour artistes, comédiens, musiciens, créateurs, professionnels et particuliers.',
  path: '/services/portrait/',
});

const PRINCIPLES = [
  { title: "N° 01 — L'approche", text: 'Un regard, une expression, un silence. La photographie comme une rencontre.' },
  { title: 'N° 02 — La lumière', text: "Contrastes, textures, matière : le noir et blanc pour révéler l'humain." },
  { title: 'N° 03 — La sincérité', text: "Des portraits nés de l'échange et de la confiance, loin des poses forcées." },
];

const photo = PHOTOS.find((item) => item.file === 'portrait-noir-blanc-grand-sourire') ?? PHOTOS[0];

export default function PortraitSessionPage() {
  return (
    <div className="page container">
      <JsonLd
        data={breadcrumb(
          { name: 'Services', path: '/services/' },
          { name: 'Séance portrait', path: '/services/portrait/' },
        )}
      />
      <PageHeader title="Séance _portrait_">
        <p>Portrait noir et blanc, à Marseille et alentours, avec un studio nomade.</p>
      </PageHeader>

      <section className="intro-split" aria-label="La séance portrait">
        <div className="intro-split__image">
          <div className="photo" data-reveal="clip">
            <img
              src={photoSrc(photo)}
              srcSet={photoSrcSet(photo)}
              sizes="(min-width: 80rem) 480px, (min-width: 48rem) 40vw, calc(100vw - 2.5rem)"
              width={photo.width}
              height={photo.height}
              fetchPriority="high"
              alt={photo.alt}
            />
          </div>
        </div>
        <div className="intro-split__text" data-stagger="up">
          <p className="lead">Envie d&apos;un portrait qui vous ressemble ?</p>
          <p>
            Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi que
            toute personne qui souhaite se reconnaître dans une image.
          </p>
          <p>
            Je travaille avec un mini studio portable et nomade : fond, lumières, tout voyage avec moi. Chez vous, sur
            votre lieu de travail, en extérieur ou dans un endroit qui vous ressemble, je réalise vos portraits là où
            vous le souhaitez.
          </p>
          <p>
            Je privilégie des portraits sincères et naturels, nés de l&apos;échange, de la confiance et de la
            spontanéité, loin des poses forcées.
          </p>
          <p>Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l&apos;humain.</p>
          <a className="button kicker" href="/contact/" data-magnetic="">
            Prendre rendez-vous <Arrow />
          </a>
        </div>
      </section>

      <div className="principles content-block" data-stagger="up">
        {PRINCIPLES.map((principle) => (
          <article key={principle.title} className="principle">
            <h2 className="kicker">{principle.title}</h2>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>

      <div className="content-action">
        <a className="button kicker" href="/galerie/" data-magnetic="">
          Voir les portraits <Arrow />
        </a>
      </div>
    </div>
  );
}
