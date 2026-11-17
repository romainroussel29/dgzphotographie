import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'portrait', name: 'Portraits', description: "L'émotion et le naturel" },
  { id: 'street', name: 'Street', description: "Saisir l'imprévu et les scènes de vie" },
  { id: 'paysage', name: 'Paysages', description: 'Atmosphère et lumière' },
];

const principes = [
  {
    titre: 'La rencontre',
    texte:
      "Un regard, une expression, une émotion ou un silence qui révèlent la personne telle qu'elle est.",
  },
  {
    titre: 'La lumière',
    texte:
      "Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l'humain.",
  },
  {
    titre: 'La sincérité',
    texte:
      "Des portraits naturels, nés de l'échange, de la confiance et de la spontanéité, loin des poses forcées.",
  },
];

export default function Home() {
  return (
    <>
      {/* Héro */}
      <section className="relative -mt-20 pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 min-h-[calc(100svh-5rem)] grid md:grid-cols-12 gap-12 md:gap-8 items-center py-16 md:py-0">
          <div className="md:col-span-7 animate-fade-up order-2 md:order-1">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-8">
              Photographe noir et blanc · Marseille
            </p>
            <h1 className="font-serif font-light text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight text-white">
              Le portrait
              <br />
              <em className="text-neutral-400">authentique.</em>
            </h1>
            <p className="mt-8 max-w-md text-neutral-400 font-light leading-relaxed">
              Portrait, street et paysage. Des images sincères, nées de la rencontre et sculptées par la lumière.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/galerie"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-200 transition"
              >
                Voir les galeries
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-4 text-[11px] uppercase tracking-[0.25em] border border-neutral-700 text-neutral-200 hover:border-white hover:text-white transition"
              >
                Prendre contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 order-1 md:order-2 animate-fade-up [animation-delay:150ms]">
            <figure className="relative mx-auto w-3/4 sm:w-2/3 md:w-full max-w-md">
              <div className="absolute -inset-3 md:-inset-5 border border-neutral-800 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5" aria-hidden />
              <div className="relative grain overflow-hidden">
                <Image
                  src="/images/portrait-dgz.jpg"
                  alt="Portrait du photographe DGZ derrière son appareil photo"
                  width={1638}
                  height={2048}
                  priority
                  sizes="(min-width: 768px) 40vw, 75vw"
                  className="w-full h-auto grayscale contrast-110"
                />
              </div>
              <figcaption className="mt-8 text-[10px] uppercase tracking-[0.3em] text-neutral-600 text-right">
                DGZ — Autoportrait
              </figcaption>
            </figure>
          </div>
        </div>

        <a
          href="#approche"
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-300 transition"
        >
          Découvrir
          <span className="block w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent" />
        </a>
      </section>

      {/* Citation */}
      <section id="approche" className="border-y border-neutral-900 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <blockquote className="font-serif font-light italic text-3xl md:text-5xl leading-snug text-neutral-100">
            « Je ne cherche pas le portrait parfait.
            <br className="hidden md:block" /> Je cherche le portrait juste. »
          </blockquote>
          <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-neutral-500">— DGZ</p>
        </div>
      </section>

      {/* Approche */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">L&apos;approche</p>
            <h2 className="font-serif font-light text-4xl md:text-5xl leading-tight text-white">
              L&apos;authenticité avant tout.
            </h2>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-3 gap-10">
            {principes.map((p, i) => (
              <div key={p.titre} className="border-t border-neutral-800 pt-6">
                <span className="font-serif text-neutral-600 text-lg">0{i + 1}</span>
                <h3 className="mt-3 text-sm uppercase tracking-[0.2em] text-neutral-100">{p.titre}</h3>
                <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-20 md:ml-[33.333%] md:pl-4 max-w-2xl text-neutral-300 font-light leading-relaxed text-lg">
          Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi que
          toute personne qui souhaite se reconnaître dans une image.
        </p>
      </section>

      {/* Univers */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-6 mb-10 border-b border-neutral-900 pb-6">
          <h2 className="font-serif font-light text-3xl md:text-4xl text-white">Les univers</h2>
          <Link
            href="/galerie"
            className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition whitespace-nowrap"
          >
            Toutes les galeries →
          </Link>
        </div>

        <ul className="divide-y divide-neutral-900">
          {categories.map((cat, i) => (
            <li key={cat.id}>
              <Link
                href="/galerie"
                className="group grid grid-cols-12 items-baseline gap-4 py-8 md:py-10 transition"
              >
                <span className="col-span-2 md:col-span-1 font-serif text-neutral-600 text-lg">0{i + 1}</span>
                <span className="col-span-10 md:col-span-6 font-serif font-light text-4xl md:text-6xl text-neutral-300 group-hover:text-white group-hover:translate-x-2 transition duration-500">
                  {cat.name}
                </span>
                <span className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto text-sm text-neutral-500 font-light group-hover:text-neutral-300 transition">
                  {cat.description}
                </span>
                <span className="hidden md:block md:col-span-1 text-right text-neutral-600 group-hover:text-white transition">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Appel à l'action */}
      <section className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">Un projet ?</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl leading-tight text-white max-w-2xl">
              Parlons de votre portrait.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-200 transition self-start md:self-auto"
          >
            Me contacter
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
