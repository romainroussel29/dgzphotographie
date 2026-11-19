import ButtonLink from '@/components/ui/ButtonLink';
import SplitText from '@/components/motion/SplitText';

/** Page affichée quand une galerie ou une page n'existe pas. */
export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-36 text-center">
      <p className="kicker text-muted animate-rise">Erreur 404</p>
      <SplitText as="h1" text="Page _introuvable_" step={110} className="block mt-6 font-serif text-5xl md:text-8xl leading-none" />
      <p className="mt-8 text-muted max-w-md mx-auto leading-relaxed animate-rise [--d:300ms]">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-10 animate-rise [--d:450ms]">
        <ButtonLink href="/galerie">Voir les galeries</ButtonLink>
      </div>
    </section>
  );
}
