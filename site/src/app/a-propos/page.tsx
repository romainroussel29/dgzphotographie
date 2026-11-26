import PageHeader from '@/components/layout/PageHeader';
import Arrow from '@/components/ui/Arrow';
import JsonLd from '@/components/ui/JsonLd';
import { QUOTE } from '@/config/site';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Didier Zolezzi, photographe à Marseille | DGZ',
  description:
    'Didier Zolezzi, DGZ Photographie : photographe portraitiste à Marseille, pour des portraits authentiques en noir et blanc.',
  path: '/a-propos/',
});

export default function AboutPage() {
  return (
    <div className="page container">
      <JsonLd data={breadcrumb({ name: 'À propos', path: '/a-propos/' })} />
      <PageHeader title="À _propos_">
        <p>Didier Zolezzi, photographe portraitiste à Marseille.</p>
      </PageHeader>

      <section className="intro-split" aria-label="Présentation">
        <div className="intro-split__image">
          <div className="photo" data-reveal="clip">
            <img
              src="/assets/img/autoportrait-photographe-dgz.webp"
              srcSet="/assets/img/autoportrait-photographe-dgz-480.webp 480w, /assets/img/autoportrait-photographe-dgz-750.webp 750w, /assets/img/autoportrait-photographe-dgz.webp 1100w"
              sizes="(min-width: 80rem) 480px, (min-width: 48rem) 40vw, calc(100vw - 2.5rem)"
              width={1100}
              height={1375}
              fetchPriority="high"
              alt="Portrait de Didier Zolezzi derrière son appareil photo, réalisé par le Studio Clotis"
            />
          </div>
          <p className="photo-caption photo-caption--credit kicker muted">
            Photo :{' '}
            <a className="link-draw" href="https://studio-clotis.com/" target="_blank" rel="noopener">
              Studio Clotis, Marseille<span className="sr-only"> (nouvel onglet)</span>
            </a>
          </p>
        </div>
        <div className="intro-split__text" data-stagger="up">
          <p className="lead">{QUOTE}</p>
          <p>
            Ma photographie repose sur la rencontre : un regard, une expression, une émotion ou un silence qui révèlent
            la personne telle qu&apos;elle est.
          </p>
          <p>Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l&apos;humain.</p>
          <p>
            Je privilégie des portraits sincères et naturels, nés de l&apos;échange, de la confiance et de la
            spontanéité, loin des poses forcées.
          </p>
          <p>
            Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi que
            toute personne qui souhaite se reconnaître dans une image.
          </p>
          <p>
            Je travaille avec un mini studio portable et nomade : fond, lumières, tout voyage avec moi. Chez vous, sur
            votre lieu de travail, en extérieur ou dans un endroit qui vous ressemble, je réalise vos portraits là où
            vous le souhaitez.
          </p>
          <p className="kicker">L&apos;authenticité avant tout.</p>
        </div>
      </section>

      <div className="content-action">
        <a className="button kicker" href="/services/portrait/" data-magnetic="">
          Découvrir la séance portrait <Arrow />
        </a>
      </div>
    </div>
  );
}
