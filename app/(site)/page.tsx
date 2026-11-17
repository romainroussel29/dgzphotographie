import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'portrait', name: 'Portraits', description: "L'émotion et le naturel" },
  { id: 'street', name: 'Street', description: "Saisir l'imprévu et les scènes de vie" },
  { id: 'paysage', name: 'Paysages', description: 'Atmosphère et lumière' },
];

export default function Home() {
  return (
    <>
      {/* Couverture */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
          {/* Colonne gauche */}
          <div className="md:col-span-3 order-2 md:order-1 space-y-8 animate-rise">
            <div className="border-t border-ink pt-3">
              <p className="kicker">N° 01 — L&apos;approche</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Un regard, une expression, un silence. La photographie comme une rencontre.
              </p>
            </div>
            <div className="border-t border-ink pt-3">
              <p className="kicker">N° 02 — La lumière</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Contrastes, textures, matière : le noir et blanc pour révéler l&apos;humain.
              </p>
            </div>
          </div>

          {/* Portrait */}
          <figure className="md:col-span-6 order-1 md:order-2 relative animate-rise [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <Image
                src="/images/portrait-dgz.jpg"
                alt="Portrait du photographe DGZ derrière son appareil photo"
                width={1638}
                height={2048}
                priority
                sizes="(min-width: 768px) 448px, 90vw"
                className="w-full h-auto grayscale"
              />
              <span className="absolute -left-3 md:-left-10 top-6 kicker [writing-mode:vertical-rl] rotate-180 text-muted">
                Autoportrait — Marseille
              </span>
            </div>
          </figure>

          {/* Colonne droite */}
          <div className="md:col-span-3 order-3 space-y-8 md:text-right animate-rise [animation-delay:240ms]">
            <div className="border-t border-ink pt-3">
              <p className="kicker">N° 03 — La sincérité</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Des portraits nés de l&apos;échange et de la confiance, loin des poses forcées.
              </p>
            </div>
            <Link
              href="/galerie"
              className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-4 kicker hover:bg-black transition"
            >
              Feuilleter les galeries →
            </Link>
          </div>
        </div>

        {/* Titre de couverture */}
        <h1 className="mt-12 md:-mt-16 relative font-serif leading-[0.85] tracking-tighter text-center text-[17vw] md:text-[11rem] lg:text-[13rem] animate-rise [animation-delay:200ms]">
          Le portrait <em className="font-normal">juste</em>
        </h1>
      </section>

      {/* Texte d'introduction */}
      <section className="border-y border-ink bg-paper-deep">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="kicker">Portrait authentique en noir et blanc</p>
            <p className="mt-6 font-serif italic text-3xl md:text-4xl leading-tight">
              « Je ne cherche pas le portrait parfait. Je cherche le portrait juste. »
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6 md:columns-2 gap-10 text-[15px] leading-relaxed space-y-4">
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

      {/* Sommaire */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="flex items-baseline justify-between border-b border-ink pb-4 mb-2">
          <h2 className="font-serif text-4xl md:text-5xl">Sommaire</h2>
          <Link href="/galerie" className="kicker hover:underline underline-offset-4">Tout voir</Link>
        </div>

        <div className="grid md:grid-cols-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href="/galerie"
              className="group border-b md:border-b-0 md:border-r last:border-r-0 border-line py-10 md:px-8 first:md:pl-0 transition"
            >
              <span className="font-serif text-7xl md:text-8xl text-line group-hover:text-ink transition duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-serif text-3xl group-hover:italic">{cat.name}</h3>
              <p className="mt-2 text-sm text-muted">{cat.description}</p>
              <span className="mt-6 inline-block kicker border-b border-ink pb-1 opacity-0 group-hover:opacity-100 transition">
                Découvrir
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Réservation */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
        <div className="border border-ink p-8 md:p-16 grid md:grid-cols-12 gap-8 items-center">
          <h2 className="md:col-span-8 font-serif text-4xl md:text-6xl leading-tight">
            Envie d&apos;un portrait qui vous <em>ressemble</em>&nbsp;?
          </h2>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 kicker hover:bg-black transition"
            >
              Prendre rendez-vous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
