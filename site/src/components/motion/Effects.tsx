'use client';

import { useEffect } from 'react';
import { initCursor } from './effects/cursor';
import { initMagnetic } from './effects/magnetic';
import { initParallax } from './effects/parallax';
import { initReveal } from './effects/reveal';

/**
 * Lance les effets du site une fois la page affichée, sans rien afficher lui-même.
 * Les liens internes sont de vrais liens <a> : chaque page est chargée entièrement, avec la transition
 * animée du navigateur (@view-transition dans globals.css), et ces effets repartent de zéro.
 */
export default function Effects() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = matchMedia('(pointer: fine)').matches;

    const stops = [initReveal(reduce)];
    if (!reduce) {
      stops.push(initParallax());
      if (mouse) stops.push(initMagnetic(), initCursor());
    }

    // Sans ce marqueur, le script de démarrage (app/layout.tsx) réaffiche le contenu masqué par les animations.
    document.documentElement.dataset.ready = '';
    return () => stops.forEach((stop) => stop());
  }, []);

  return null;
}
