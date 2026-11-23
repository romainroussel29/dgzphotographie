import SplitText from '@/components/motion/SplitText';
import Arrow from '@/components/ui/Arrow';
import InstagramIcon from '@/components/ui/InstagramIcon';
import JsonLd from '@/components/ui/JsonLd';
import {
  DESCRIPTION,
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE,
  PHONE_LINK,
  QUOTE,
  SHARE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '@/config/site';
import { PHOTOS, photoSrc, photoSrcSet, plate } from '@/features/gallery/photos';
import { cssVars } from '@/lib/css';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Photographe portrait à Marseille, noir et blanc | DGZ',
  description: DESCRIPTION,
  path: '/',
});

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: DESCRIPTION,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${SHARE_IMAGE.url}`,
      logo: `${SITE_URL}/assets/img/logo-dgz-photographie.webp`,
      email: EMAIL,
      telephone: '+33689284852',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marseille',
        addressRegion: "Provence-Alpes-Côte d'Azur",
        addressCountry: 'FR',
      },
      areaServed: { '@type': 'City', name: 'Marseille' },
      knowsAbout: [
        'Photographie de portrait',
        'Photographie noir et blanc',
        'Street photography',
        'Photographie de paysage',
      ],
      sameAs: [INSTAGRAM_URL],
    },
  ],
};

const PRINCIPLES = [
  { title: "N° 01 — L'approche", text: 'Un regard, une expression, un silence. La photographie comme une rencontre.' },
  { title: 'N° 02 — La lumière', text: "Contrastes, textures, matière : le noir et blanc pour révéler l'humain." },
  { title: 'N° 03 — La sincérité', text: "Des portraits nés de l'échange et de la confiance, loin des poses forcées." },
];

const MARQUEE = ['Portrait', 'Street', 'Paysage', 'Marseille', 'Noir & blanc', 'Lumière', 'Rencontre'];

/** Vitesse de parallaxe de chaque photo de la sélection, dans l'ordre de PHOTOS. */
const SELECTION_PARALLAX = ['0.04', '-0.03', '0.05', '-0.04', '0.03'];

export default function HomePage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />

      {/* Couverture */}
      <section className="hero container" aria-labelledby="titre-accueil">
        <div className="hero__title">
          <span className="hero__rule" aria-hidden="true" />
          <h1 id="titre-accueil">
            <span className="hero__subject kicker animate-rise">Photographe portrait à Marseille</span>{' '}
            <SplitText className="hero__headline" mode="load" delay="250ms" step="110ms">
              Le portrait _authentique_
            </SplitText>
          </h1>
        </div>

        <div className="hero__grid">
          <div className="hero__side hero__side--left">
            {PRINCIPLES.slice(0, 2).map((principle, index) => (
              <article key={principle.title} className="principle animate-rise" style={cssVars({ '--d': `${500 + index * 120}ms` })}>
                <h2 className="kicker">{principle.title}</h2>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>

          <figure className="hero__portrait">
            <div className="hero__frame">
              <div className="hero__mask animate-unveil">
                <div data-parallax="-0.06">
                  <img
                    className="animate-settle"
                    src="/assets/img/autoportrait-photographe-dgz.webp"
                    srcSet="/assets/img/autoportrait-photographe-dgz-480.webp 480w, /assets/img/autoportrait-photographe-dgz-750.webp 750w, /assets/img/autoportrait-photographe-dgz.webp 1100w"
                    sizes="(min-width: 48rem) 493px, calc(100vw - 2.5rem)"
                    width={1100}
                    height={1375}
                    fetchPriority="high"
                    alt="Autoportrait du photographe DGZ derrière son appareil photo"
                  />
                </div>
              </div>
              <figcaption className="kicker animate-rise" style={cssVars({ '--d': '900ms' })}>
                Autoportrait — Marseille
              </figcaption>
            </div>
          </figure>

          <div className="hero__side hero__side--right">
            <article className="principle animate-rise" style={cssVars({ '--d': '740ms' })}>
              <h2 className="kicker">{PRINCIPLES[2].title}</h2>
              <p>{PRINCIPLES[2].text}</p>
            </article>
            <div className="animate-rise" style={cssVars({ '--d': '860ms' })}>
              <a className="button kicker button--compact" href="/galerie/" data-magnetic="">
                Feuilleter la galerie <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau défilant : la piste est en double pour boucler sans coupure. */}
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((track) => (
          <div key={track} className="marquee__track">
            {MARQUEE.map((word) => (
              <span key={word}>
                {word}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Sélection de portraits */}
      <section className="selection" aria-labelledby="titre-regards">
        <div className="selection__head container">
          <div>
            <p className="kicker muted" data-reveal="up">Sélection — Portraits</p>
            <h2 id="titre-regards">
              <SplitText mode="view" step="120ms">
                Des _regards_
              </SplitText>
            </h2>
          </div>
          <p className="selection__text" data-reveal="up">
            Cinq portraits, cinq lumières. Des visages saisis dans l&apos;instant, sans artifice.
          </p>
        </div>

        <ul className="selection__list container">
          {PHOTOS.slice(0, 5).map((photo, index) => (
            <li key={photo.file}>
              <figure>
                <a
                  className="photo"
                  href="/galerie/"
                  data-reveal="clip"
                  data-cursor="Voir"
                  aria-label={`${photo.title} — voir la galerie`}
                >
                  <div data-parallax={SELECTION_PARALLAX[index]}>
                    <img
                      src={photoSrc(photo)}
                      srcSet={photoSrcSet(photo)}
                      sizes="(min-width: 80rem) 260px, (min-width: 48rem) 21vw, (min-width: 40rem) 47vw, 79vw"
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      alt={photo.alt}
                    />
                  </div>
                </a>
                <figcaption className="photo-caption kicker muted" data-reveal="fade">
                  <span>{plate(index)}</span>
                  <span>{photo.title}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="selection__action container" data-reveal="up">
          <a className="button kicker" href="/galerie/" data-magnetic="">
            Voir les portraits <Arrow />
          </a>
        </div>
      </section>

      {/* Présentation */}
      <section className="approach" aria-labelledby="titre-approche">
        <div className="approach__grid container section">
          <div className="approach__intro">
            <h2 className="kicker" id="titre-approche" data-reveal="up">
              Portrait authentique en noir et blanc
            </h2>
            <blockquote>
              <SplitText as="p" mode="view" step="45ms">
                {QUOTE}
              </SplitText>
            </blockquote>
          </div>
          <div className="approach__text" data-stagger="up">
            <p className="drop-cap">
              Ma photographie repose sur la rencontre : un regard, une expression, une émotion ou un silence qui
              révèlent la personne telle qu&apos;elle est.
            </p>
            <p>Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l&apos;humain.</p>
            <p>
              Je privilégie des portraits sincères et naturels, nés de l&apos;échange, de la confiance et de la
              spontanéité, loin des poses forcées.
            </p>
            <p>
              Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi
              que toute personne qui souhaite se reconnaître dans une image.
            </p>
            <p className="kicker">L&apos;authenticité avant tout.</p>
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section className="booking container section" aria-labelledby="titre-reservation">
        <div className="booking__frame" data-reveal="fade">
          <span className="booking__edge booking__edge--top" data-reveal="line" aria-hidden="true" />
          <span className="booking__edge booking__edge--bottom" data-reveal="line" aria-hidden="true" />
          <span className="booking__edge booking__edge--left" data-reveal="fade" aria-hidden="true" />
          <span className="booking__edge booking__edge--right" data-reveal="fade" aria-hidden="true" />

          <SplitText as="h2" id="titre-reservation" mode="view" step="60ms">
            Envie d&apos;un portrait qui vous _ressemble_ ?
          </SplitText>
          <div className="booking__action" data-reveal="up">
            <a className="button kicker" href="/contact/" data-magnetic="">
              Prendre rendez-vous <Arrow />
            </a>
          </div>

          <address>
            <ul data-stagger="up">
              <li>
                <a className="link-draw" href={PHONE_LINK}>
                  <span className="kicker muted">Tél.</span>
                  {PHONE}
                </a>
              </li>
              <li>
                <a className="link-draw break-all" href={`mailto:${EMAIL}`}>
                  <span className="kicker muted">Email</span>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a className="link-draw link-inline" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />@{INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </address>
        </div>
      </section>
    </>
  );
}
