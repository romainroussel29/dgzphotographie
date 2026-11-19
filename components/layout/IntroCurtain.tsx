import Logo from '@/components/ui/Logo';

/**
 * Rideau d'introduction : le logo se dessine puis le rideau s'ouvre vers le haut.
 * Affiché une seule fois par session (voir le script de démarrage dans app/layout.tsx).
 */
export default function IntroCurtain() {
  return (
    <div className="intro" aria-hidden>
      <div>
        <div className="intro-logo">
          <Logo light priority decorative sizes="(min-width: 768px) 520px, 80vw" className="w-full" />
        </div>
        <div className="intro-bar" />
        <span className="intro-sub kicker">Marseille</span>
      </div>
    </div>
  );
}
