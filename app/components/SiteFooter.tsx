import Link from 'next/link';
import InstagramIcon from './InstagramIcon';
import Split from './motion/Split';
import Logo from './Logo';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/contact';

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-3 pb-14 border-b border-white/15">
          <Split
            as="p"
            mode="view"
            step={40}
            text="« Je ne cherche pas le portrait parfait. Je cherche le portrait juste. »"
            className="block font-serif italic text-2xl leading-snug max-w-xs"
          />
          <nav className="flex flex-col gap-3 kicker text-white/60" aria-label="Pied de page" data-stagger="up">
            <Link href="/galerie" className="link-draw hover:text-white transition-colors w-fit">Galeries</Link>
            <Link href="/commentaires" className="link-draw hover:text-white transition-colors w-fit">Livre d&apos;or</Link>
            <Link href="/contact" className="link-draw hover:text-white transition-colors w-fit">Contact</Link>
          </nav>
          <div className="md:text-right space-y-2" data-stagger="up">
            <p className="kicker text-white/50 mb-3">Me joindre</p>
            <p>
              <a href={PHONE_LINK} className="text-lg link-draw">{PHONE_DISPLAY}</a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="text-lg link-draw break-all">{EMAIL}</a>
            </p>
            <p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg link-draw"
              >
                <InstagramIcon />@{INSTAGRAM_HANDLE}
              </a>
            </p>
          </div>
        </div>

        <div className="py-10 md:py-14 flex justify-center">
          <div data-reveal="sign" className="w-[75vw] max-w-[640px]">
            <Logo light sizes="(min-width: 860px) 640px, 75vw" className="w-full" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between kicker text-white/40">
          <span>© 2026 DGZ Photographie</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Informations légales">
            <Link href="/mentions-legales" className="link-draw hover:text-white/80 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="link-draw hover:text-white/80 transition-colors">Confidentialité</Link>
            <Link href="/admin/login" className="link-draw hover:text-white/80 transition-colors">Espace admin</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
