'use client';

import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

/**
 * Rideau d'introduction : le logo se dessine puis le rideau se lève.
 * Uniquement sur l'accueil, une fois par session (voir le script de démarrage dans app/layout.tsx).
 */
export default function IntroCurtain() {
  if (usePathname() !== '/') return null;

  return (
    <div className="intro" aria-hidden="true">
      <div>
        <div className="intro__logo">
          <Logo sizes="(min-width: 41rem) 520px, 80vw" />
        </div>
        <div className="intro__bar" />
        <span className="intro__city kicker">Marseille</span>
      </div>
    </div>
  );
}
