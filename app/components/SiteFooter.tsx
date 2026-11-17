import Link from 'next/link';
import InstagramIcon from './InstagramIcon';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/contact';

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-3 pb-14 border-b border-white/15">
          <p className="font-serif italic text-2xl leading-snug max-w-xs">
            « Je ne cherche pas le portrait parfait. Je cherche le portrait juste. »
          </p>
          <nav className="flex flex-col gap-3 kicker text-white/60" aria-label="Pied de page">
            <Link href="/galerie" className="hover:text-white transition w-fit">Galeries</Link>
            <Link href="/commentaires" className="hover:text-white transition w-fit">Livre d&apos;or</Link>
            <Link href="/contact" className="hover:text-white transition w-fit">Contact</Link>
          </nav>
          <div className="md:text-right space-y-2">
            <p className="kicker text-white/50 mb-3">Me joindre</p>
            <p>
              <a href={PHONE_LINK} className="text-lg hover:underline underline-offset-4">{PHONE_DISPLAY}</a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="text-lg hover:underline underline-offset-4 break-all">{EMAIL}</a>
            </p>
            <p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg hover:underline underline-offset-4"
              >
                <InstagramIcon />@{INSTAGRAM_HANDLE}
              </a>
            </p>
          </div>
        </div>

        <p
          className="font-serif leading-none tracking-tighter text-center select-none py-6 text-[22vw] md:text-[17vw] lg:text-[15rem]"
          aria-hidden
        >
          DGZ
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-between kicker text-white/40">
          <span>© 2026 DGZ Photographie</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Informations légales">
            <Link href="/mentions-legales" className="hover:text-white/80 transition">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white/80 transition">Confidentialité</Link>
            <Link href="/admin/login" className="hover:text-white/80 transition">Espace admin</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
