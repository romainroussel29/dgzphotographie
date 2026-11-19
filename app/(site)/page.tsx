import Image from 'next/image';
import InstagramIcon from '@/components/ui/InstagramIcon';
import ButtonLink from '@/components/ui/ButtonLink';
import SplitText from '@/components/motion/SplitText';
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  SIGNATURE_QUOTE,
} from '@/lib/site';

const MARQUEE_WORDS = ['Portrait', 'Street', 'Paysage', 'Marseille', 'Noir & blanc', 'Lumière', 'Rencontre'];

const PRINCIPLES = [
  { title: "N° 01 — L'approche", text: 'Un regard, une expression, un silence. La photographie comme une rencontre.' },
  { title: 'N° 02 — La lumière', text: "Contrastes, textures, matière : le noir et blanc pour révéler l'humain." },
  { title: 'N° 03 — La sincérité', text: "Des portraits nés de l'échange et de la confiance, loin des poses forcées." },
];

function Principle({ title, text, delay }: { title: string; text: string; delay: number }) {
  return (
    <article className="border-t border-ink pt-3 animate-rise" style={{ '--d': `${delay}ms` } as React.CSSProperties}>
      <h2 className="kicker">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Couverture : le titre est en premier dans le code mais affiché sous le portrait. */}
      <section
        aria-labelledby="titre-accueil"
        className="max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-20 overflow-x-clip flex flex-col"
      >
        <div className="order-last mt-16 md:mt-24 pt-10 md:pt-14 relative">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-ink origin-left animate-[grow_1.4s_var(--ease-io)_both] [animation-delay:calc(var(--intro)+200ms)]"
          />
          <h1 id="titre-accueil" className="font-serif leading-[1.05] md:leading-[0.9] tracking-tighter text-center text-[clamp(2.6rem,8vw,7.5rem)]">
            <SplitText text="Le portrait _authentique_" delay={250} step={110} />
          </h1>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
          <div className="md:col-span-3 order-2 md:order-1 space-y-8">
            <Principle {...PRINCIPLES[0]} delay={500} />
            <Principle {...PRINCIPLES[1]} delay={620} />
          </div>

          <figure className="md:col-span-6 order-1 md:order-2 relative">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden animate-unveil">
                <div data-parallax="-0.06" className="scale-110">
                  <Image
                    src="/images/portrait-dgz.webp"
                    alt="Autoportrait du photographe DGZ derrière son appareil photo"
                    width={1100}
                    height={1375}
                    priority
                    sizes="(min-width: 768px) 448px, 90vw"
                    className="w-full h-auto grayscale animate-settle"
                  />
                </div>
              </div>
              <figcaption className="absolute -left-3 md:-left-10 top-6 kicker [writing-mode:vertical-rl] rotate-180 text-muted animate-rise [--d:900ms]">
                Autoportrait — Marseille
              </figcaption>
            </div>
          </figure>

          <div className="md:col-span-3 order-3 space-y-8 md:text-right">
            <Principle {...PRINCIPLES[2]} delay={740} />
            <div className="animate-rise [--d:860ms]">
              <ButtonLink href="/galerie" className="px-6">
                Feuilleter les galeries
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau défilant (décoratif) */}
      <div className="marquee bg-ink text-paper py-5 md:py-7 border-y border-ink" aria-hidden>
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track">
            {MARQUEE_WORDS.map((word) => (
              <span key={word} className="flex items-center shrink-0 font-serif italic text-4xl md:text-6xl px-6 md:px-10">
                {word}
                <span className="not-italic text-xl md:text-2xl ml-12 md:ml-20 opacity-40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Présentation */}
      <section aria-labelledby="titre-approche" className="border-b border-ink bg-paper-deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <h2 id="titre-approche" className="kicker" data-reveal="up">
              Portrait authentique en noir et blanc
            </h2>
            <blockquote className="mt-6">
              <SplitText
                as="p"
                mode="view"
                step={45}
                text={`« ${SIGNATURE_QUOTE} »`}
                className="block font-serif italic text-3xl md:text-4xl leading-tight"
              />
            </blockquote>
          </div>
          <div
            className="md:col-span-7 md:col-start-6 md:columns-2 gap-10 text-[15px] leading-relaxed space-y-4"
            data-stagger="up"
          >
            <p className="drop-cap">
              Ma photographie repose sur la rencontre : un regard, une expression, une émotion ou un silence qui
              révèlent la personne telle qu&apos;elle est.
            </p>
            <p>
              Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l&apos;humain.
            </p>
            <p>
              Je privilégie des portraits sincères et naturels, nés de l&apos;échange, de la confiance et de la
              spontanéité, loin des poses forcées.
            </p>
            <p>
              Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi
              que toute personne qui souhaite se reconnaître dans une image.
            </p>
            <p className="kicker pt-2">L&apos;authenticité avant tout.</p>
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section aria-labelledby="titre-reservation" className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="relative p-8 md:p-16 grid md:grid-cols-12 gap-8 items-center" data-reveal="fade">
          {/* Cadre qui se dessine */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink" data-reveal="line" />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-ink [--d:200ms]"
            data-reveal="line"
          />
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink" data-reveal="fade" />
          <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-ink" data-reveal="fade" />

          <SplitText
            as="h2"
            mode="view"
            step={60}
            text="Envie d'un portrait qui vous _ressemble_ ?"
            className="block md:col-span-8 font-serif text-4xl md:text-6xl leading-tight"
          />
          <div className="md:col-span-4 md:text-right" data-reveal="up">
            <ButtonLink href="/contact">Prendre rendez-vous</ButtonLink>
          </div>

          <address className="not-italic md:col-span-12 border-t border-line pt-6">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 text-[15px]" data-stagger="up">
              <li>
                <a href={PHONE_LINK} className="link-draw">
                  <span className="kicker text-muted mr-3">Tél.</span>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="link-draw break-all">
                  <span className="kicker text-muted mr-3">Email</span>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline-flex items-center gap-2"
                >
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
