import Link from 'next/link';
import InstagramIcon from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';
import SplitText from '@/components/motion/SplitText';
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  SIGNATURE_QUOTE,
  SITE_NAME,
} from '@/lib/site';

const linkClass = 'link-draw hover:text-white transition-colors';

/** Pied de page : citation, navigation secondaire, coordonnées et liens légaux. */
export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-3 pb-14 border-b border-white/15">
          <blockquote className="max-w-xs">
            <SplitText
              as="p"
              mode="view"
              step={40}
              text={`« ${SIGNATURE_QUOTE} »`}
              className="block font-serif italic text-2xl leading-snug"
            />
          </blockquote>

          <nav aria-label="Pied de page">
            <ul className="flex flex-col gap-3 kicker text-white/60" data-stagger="up">
              <li>
                <Link href="/galerie" className={linkClass}>Galeries</Link>
              </li>
              <li>
                <Link href="/commentaires" className={linkClass}>Livre d&apos;or</Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </li>
            </ul>
          </nav>

          <address className="not-italic md:text-right">
            <h2 className="kicker text-white/50 mb-5">Me joindre</h2>
            <ul className="space-y-2 text-lg" data-stagger="up">
              <li>
                <a href={PHONE_LINK} className="link-draw">{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="link-draw break-all">{EMAIL}</a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 link-draw"
                >
                  <InstagramIcon />@{INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="py-10 md:py-14 flex justify-center">
          <div data-reveal="sign" className="w-[75vw] max-w-[640px]">
            <Logo light decorative sizes="(min-width: 860px) 640px, 75vw" className="w-full" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between kicker text-white/40">
          <p>© 2026 {SITE_NAME}</p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href="/mentions-legales" className="link-draw hover:text-white/80 transition-colors">Mentions légales</Link>
              </li>
              <li>
                <Link href="/confidentialite" className="link-draw hover:text-white/80 transition-colors">Confidentialité</Link>
              </li>
              <li>
                <Link href="/admin/login" className="link-draw hover:text-white/80 transition-colors">Espace admin</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
