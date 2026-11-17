import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Les catégories principales basées sur son univers
  const categories = [
    { id: 'portrait', name: 'Portraits', description: 'L\'émotion et le naturel' },
    { id: 'street', name: 'Street Photography', description: 'Saisir l\'imprévu et les scènes de vie' },
    { id: 'paysage', name: 'Paysages', description: 'Atmosphère et lumière' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800">
      {/* En-tête du site */}
<header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
  <Link href="/" className="text-xl font-light tracking-widest uppercase hover:text-neutral-400 transition">
    DGZ Photographie
  </Link>
  <nav className="space-x-8 text-sm tracking-wider">
    <Link href="/" className="hover:text-neutral-400 transition">Accueil</Link>
    <Link href="/galerie" className="hover:text-neutral-400 transition">Galeries</Link>
    <Link href="/contact" className="hover:text-neutral-400 transition">Contact</Link>
    <Link href="/commentaires" className="hover:text-neutral-400 transition">Commentaires</Link>
    <Link href="/admin/login" className="hover:text-neutral-400 transition text-neutral-600">Admin</Link>
  </nav>
</header>

      {/* Section Héro / Présentation */}
      <section className="text-center py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extralight tracking-wide mb-4">DGZ Photographie</h2>
        <p className="text-neutral-400 text-base md:text-lg font-light tracking-wide uppercase mb-8">
          Photographe noir et blanc, portrait et street
        </p>

        {/* Portrait du photographe */}
        <div className="mx-auto mb-10 w-40 md:w-56">
          <Image
            src="/images/portrait-dgz.jpg"
            alt="Portrait du photographe DGZ derrière son appareil photo"
            width={1638}
            height={2048}
            priority
            sizes="(min-width: 768px) 224px, 160px"
            className="w-full h-auto border border-neutral-800 shadow-2xl grayscale"
          />
        </div>

        {/* Accroche principale (ancien site artfolio) */}
        <h3 className="text-2xl md:text-3xl font-extralight tracking-wide text-neutral-200 mb-6">
          Le portrait authentique en noir et blanc
        </h3>
        <blockquote className="text-lg md:text-xl font-light italic text-neutral-300">
          « Je ne cherche pas le portrait parfait. Je cherche le portrait juste. »
        </blockquote>

        {/* Présentation */}
        <div className="text-neutral-400 text-sm md:text-base font-light leading-relaxed space-y-4 text-left md:text-center border-t border-neutral-900 pt-8 mt-8">
          <p>
            Ma photographie repose sur la rencontre : un regard, une expression, une émotion ou un silence qui révèlent la personne telle qu&apos;elle est.
          </p>
          <p>
            Le noir et blanc met en valeur la lumière, les contrastes, les textures et, surtout, l&apos;humain.
          </p>
          <p>
            Je privilégie des portraits sincères et naturels, nés de l&apos;échange, de la confiance et de la spontanéité, loin des poses forcées.
          </p>
          <p>
            Basé à Marseille, je photographie artistes, comédiens, musiciens, créateurs et professionnels, ainsi que toute personne qui souhaite se reconnaître dans une image.
          </p>
          <p className="text-neutral-200 uppercase tracking-widest text-xs pt-4">
            L&apos;authenticité avant tout.
          </p>
        </div>
      </section>

      {/* Grille des catégories de photos */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-8 text-center">Explorer les galeries</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative h-96 bg-neutral-900 border border-neutral-900 rounded-none overflow-hidden cursor-pointer shadow-lg flex flex-col justify-end p-8 transition duration-500 hover:border-neutral-700"
            >
              {/* Zone pour l'image de fond (placeholder stylisé en attendant Supabase) */}
              <div className="absolute inset-0 bg-neutral-900 group-hover:scale-105 transition duration-700 flex items-center justify-center text-neutral-700">
                <span className="tracking-widest uppercase text-xs opacity-40">[ {cat.name} ]</span>
              </div>
              
              {/* Overlay sombre dégradé pour faire ressortir le texte */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition"></div>
              
              {/* Titre et description de la catégorie */}
              <div className="relative z-10">
                <h4 className="text-xl font-light tracking-wide text-white mb-1">{cat.name}</h4>
                <p className="text-xs text-neutral-400 font-light">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}