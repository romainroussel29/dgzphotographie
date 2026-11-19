import Image from 'next/image';
import Link from 'next/link';
import InstagramIcon from '@/app/components/InstagramIcon';
import Split from '@/app/components/motion/Split';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/contact';

const MARQUEE = ['Portrait', 'Street', 'Paysage', 'Marseille', 'Noir & blanc', 'Lumière', 'Rencontre'];

export default function Home() {
  return (
    <>
      {/* Couverture */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-20 overflow-x-clip">
        <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
          {/* Colonne gauche */}
          <div className="md:col-span-3 order-2 md:order-1 space-y-8">
            <div className="border-t border-ink pt-3 animate-rise [--d:500ms]">
              <p className="kicker">N° 01 — L&apos;approche</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Un regard, une expression, un silence. La photographie comme une rencontre.
              </p>
            </div>
            <div className="border-t border-ink pt-3 animate-rise [--d:620ms]">
              <p className="kicker">N° 02 — La lumière</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Contrastes, textures, matière : le noir et blanc pour révéler l&apos;humain.
              </p>
            </div>
          </div>

          {/* Portrait */}
          <figure className="md:col-span-6 order-1 md:order-2 relative">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden animate-unveil">
                <div data-parallax="-0.06" className="scale-110">
                  <Image
                    src="/images/portrait-dgz.jpg"
                    alt="Portrait du photographe DGZ derrière son appareil photo"
                    width={1638}
                    height={2048}
                    priority
                    sizes="(min-width: 768px) 448px, 90vw"
                    className="w-full h-auto grayscale animate-settle"
                  />
                </div>
              </div>
              <span className="absolute -left-3 md:-left-10 top-6 kicker [writing-mode:vertical-rl] rotate-180 text-muted animate-rise [--d:900ms]">
                Autoportrait — Marseille
              </span>
            </div>
          </figure>

          {/* Colonne droite */}
          <div className="md:col-span-3 order-3 space-y-8 md:text-right">
            <div className="border-t border-ink pt-3 animate-rise [--d:740ms]">
              <p className="kicker">N° 03 — La sincérité</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Des portraits nés de l&apos;échange et de la confiance, loin des poses forcées.
              </p>
            </div>
            <div className="animate-rise [--d:860ms]">
              <Link
                href="/galerie"
                data-magnetic
                className="btn-wipe inline-flex items-center gap-3 bg-ink text-paper px-6 py-4 kicker"
              >
                Feuilleter les galeries <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Titre de couverture */}
        <div className="mt-16 md:mt-24 pt-10 md:pt-14 relative">
          <span className="absolute inset-x-0 top-0 h-px bg-ink origin-left animate-[grow_1.4s_var(--ease-io)_both] [animation-delay:calc(var(--intro)+200ms)]" />
          <Split
            as="h1"
            text="Le portrait _juste_"
            delay={250}
            step={110}
            className="block font-serif leading-[0.9] tracking-tighter text-center text-[15vw] md:text-[9rem] lg:text-[10.5rem]"
          />
        </div>
      </section>

      {/* Bandeau défilant */}
      <div className="marquee bg-ink text-paper py-5 md:py-7 border-y border-ink" aria-hidden>
        {[0, 1].map((n) => (
          <div key={n} className="marquee-track">
            {MARQUEE.map((w, i) => (
              <span key={i} className="flex items-center shrink-0 font-serif italic text-4xl md:text-6xl px-6 md:px-10">
                {w}
                <span className="not-italic text-xl md:text-2xl ml-12 md:ml-20 opacity-40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Texte d'introduction */}
      <section className="border-b border-ink bg-paper-deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="kicker" data-reveal="up">Portrait authentique en noir et blanc</p>
            <Split
              as="p"
              mode="view"
              step={45}
              text="« Je ne cherche pas le portrait parfait. Je cherche le portrait juste. »"
              className="block mt-6 font-serif italic text-3xl md:text-4xl leading-tight"
            />
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
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="relative p-8 md:p-16 grid md:grid-cols-12 gap-8 items-center" data-reveal="fade">
          {/* Cadre qui se dessine */}
          <span className="absolute inset-x-0 top-0 h-px bg-ink" data-reveal="line" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-ink" data-reveal="line" style={{ '--d': '200ms' } as React.CSSProperties} />
          <span className="absolute inset-y-0 left-0 w-px bg-ink" data-reveal="fade" />
          <span className="absolute inset-y-0 right-0 w-px bg-ink" data-reveal="fade" />

          <Split
            as="h2"
            mode="view"
            step={60}
            text="Envie d'un portrait qui vous _ressemble_ ?"
            className="block md:col-span-8 font-serif text-4xl md:text-6xl leading-tight"
          />
          <div className="md:col-span-4 md:text-right" data-reveal="up">
            <Link
              href="/contact"
              data-magnetic
              className="btn-wipe inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 kicker"
            >
              Prendre rendez-vous <span className="btn-arrow">→</span>
            </Link>
          </div>

          <div
            className="md:col-span-12 border-t border-line pt-6 flex flex-wrap gap-x-10 gap-y-3 text-[15px]"
            data-stagger="up"
          >
            <a href={PHONE_LINK} className="link-draw w-fit">
              <span className="kicker text-muted mr-3">Tél.</span>
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="link-draw w-fit break-all">
              <span className="kicker text-muted mr-3">Email</span>
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-2 w-fit"
            >
              <InstagramIcon />@{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
