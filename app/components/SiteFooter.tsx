import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <p className="font-serif text-2xl tracking-[0.2em] text-white">DGZ</p>
          <p className="mt-2 text-xs text-neutral-500 tracking-wider leading-relaxed">
            Portrait authentique en noir et blanc.
            <br />
            Basé à Marseille.
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.25em] text-neutral-400" aria-label="Pied de page">
          <Link href="/galerie" className="hover:text-white transition w-fit">Galeries</Link>
          <Link href="/commentaires" className="hover:text-white transition w-fit">Livre d&apos;or</Link>
          <Link href="/contact" className="hover:text-white transition w-fit">Contact</Link>
        </nav>

        <div className="md:text-right">
          <a
            href="mailto:contact@dgz-photographie.com"
            className="text-sm text-neutral-300 hover:text-white transition border-b border-neutral-700 hover:border-white pb-0.5"
          >
            contact@dgz-photographie.com
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row gap-3 justify-between text-[10px] uppercase tracking-[0.25em] text-neutral-600">
          <span>© 2026 DGZ Photographie — Tous droits réservés</span>
          <Link href="/admin/login" className="hover:text-neutral-400 transition">Espace admin</Link>
        </div>
      </div>
    </footer>
  );
}
