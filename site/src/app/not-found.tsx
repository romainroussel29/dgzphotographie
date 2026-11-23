import SplitText from '@/components/motion/SplitText';
import Arrow from '@/components/ui/Arrow';
import { pageMetadata } from '@/lib/metadata';

// Exportée dans public/404.html, que .htaccess affiche pour toute adresse inconnue.
// Next.js y ajoute de lui-même <meta name="robots" content="noindex">.
export const metadata = pageMetadata({
  title: 'Page introuvable — DGZ Photographie',
  description: "Cette page n'existe pas ou a été déplacée.",
});

export default function NotFound() {
  return (
    <section className="error-page container">
      <p className="kicker muted animate-rise">Erreur 404</p>
      <SplitText as="h1" mode="load" step="110ms">
        Page _introuvable_
      </SplitText>
      <p className="error-page__text animate-rise">Cette page n&apos;existe pas ou a été déplacée.</p>
      <div className="error-page__action animate-rise">
        <a className="button kicker" href="/galerie/" data-magnetic="">
          Voir la galerie <Arrow />
        </a>
      </div>
    </section>
  );
}
