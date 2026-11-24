import SplitText from '@/components/motion/SplitText';
import InstagramIcon from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE, PHONE_LINK, QUOTE, SITE_NAME } from '@/config/site';

/** Pied de page commun à toutes les pages. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="site-footer__columns">
          <blockquote className="site-footer__quote">
            <SplitText as="p" mode="view" step="40ms">
              {QUOTE}
            </SplitText>
          </blockquote>

          <nav className="site-footer__nav" aria-label="Pied de page">
            <ul className="kicker" data-stagger="up">
              <li><a className="link-draw" href="/galerie/">Galerie</a></li>
              <li><a className="link-draw" href="/services/">Services</a></li>
              <li><a className="link-draw" href="/a-propos/">À propos</a></li>
              <li><a className="link-draw" href="/commentaires/">Livre d&apos;or</a></li>
              <li><a className="link-draw" href="/contact/">Contact</a></li>
            </ul>
          </nav>

          <address>
            <h2 className="kicker">Me joindre</h2>
            <ul data-stagger="up">
              <li><a className="link-draw" href={PHONE_LINK}>{PHONE}</a></li>
              <li><a className="link-draw break-all" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>
                <a className="link-draw link-inline" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />@{INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="site-footer__logo">
          <div data-reveal="sign">
            <Logo sizes="(min-width: 54rem) 640px, 75vw" loading="lazy" />
          </div>
        </div>

        <div className="site-footer__bottom kicker">
          <div className="site-footer__meta">
            <p>© {new Date().getFullYear()} {SITE_NAME}</p>
            <p className="site-footer__credit">
              Site réalisé par{' '}
              <a className="link-draw" href="https://roussel-dev.fr/" target="_blank" rel="nofollow noopener">
                Roussel Dev <span aria-hidden="true">↗</span>
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
          </div>
          <nav className="site-footer__legal" aria-label="Informations légales">
            <ul>
              <li><a className="link-draw" href="/mentions-legales/">Mentions légales</a></li>
              <li><a className="link-draw" href="/politique-confidentialite/">Confidentialité</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
