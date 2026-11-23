import type { ElementType, ReactNode } from 'react';
import { cssVars } from '@/lib/css';

type SplitTextProps = {
  /** Texte à animer. Les mots entre `_` sont en italique : « Le portrait _authentique_ ». */
  children: string;
  /** Balise rendue : `span` par défaut, ou `h1`, `h2`, `p`… */
  as?: ElementType;
  /** `load` : au chargement de la page. `view` : à l'entrée dans l'écran. */
  mode: 'load' | 'view';
  /** Lettre par lettre plutôt que mot par mot. */
  letters?: boolean;
  /** Écart entre deux mots ou lettres, par exemple `'100ms'`. */
  step?: string;
  /** Délai avant le premier mot, par exemple `'250ms'`. */
  delay?: string;
  className?: string;
  id?: string;
};

/**
 * Titre animé mot par mot : chaque mot remonte depuis un masque (styles dans components/_animations.scss).
 * Le découpage est fait à la compilation, le texte complet reste lisible par les lecteurs d'écran.
 */
export default function SplitText({ children, as: Tag = 'span', mode, letters, step, delay, className, id }: SplitTextProps) {
  let index = 0;

  const unit = (text: string, italic: boolean, key: string) => (
    <span key={key} className="split-w">
      <span style={cssVars({ '--i': index++ })}>{italic ? <em>{text}</em> : text}</span>
    </span>
  );

  // Seule l'espace ordinaire coupe les mots, pas l'espace insécable.
  const visual: ReactNode[] = [];
  children.split(/(_[^_]+_)/).forEach((segment, s) => {
    const italic = /^_.+_$/.test(segment);
    const text = italic ? segment.slice(1, -1) : segment;
    text.split(/([ \t\r\n]+)/).forEach((part, p) => {
      if (!part) return;
      const key = `${s}-${p}`;
      if (/^[ \t\r\n]+$/.test(part)) visual.push(' ');
      else if (letters) {
        // Lettre par lettre, un mot ne doit pas se couper en fin de ligne.
        visual.push(
          <span key={key} className="split-word">
            {Array.from(part).map((letter, l) => unit(letter, italic, `${key}-${l}`))}
          </span>,
        );
      } else visual.push(unit(part, italic, key));
    });
  });

  const vars: Record<`--${string}`, string> = {};
  if (delay) vars['--d'] = delay;
  if (step) vars['--step'] = step;

  return (
    <Tag
      id={id}
      className={className}
      data-split={mode}
      data-letters={letters ? '' : undefined}
      data-reveal={mode === 'view' ? 'split' : undefined}
      data-split-ready=""
      style={cssVars(vars)}
    >
      <span className="sr-only">{children.replace(/_/g, '')}</span>
      <span aria-hidden="true">{visual}</span>
    </Tag>
  );
}
