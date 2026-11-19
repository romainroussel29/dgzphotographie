import type { CSSProperties, ElementType } from 'react';

type SplitProps = {
  /** Texte à animer. Un mot entouré de `_` est mis en italique : « Le portrait _juste_ ». */
  text: string;
  as?: ElementType;
  className?: string;
  /** `load` : anime au chargement de la page. `view` : anime à l'entrée dans l'écran. */
  mode?: 'load' | 'view';
  /** Découpe lettre par lettre plutôt que mot par mot. */
  letters?: boolean;
  /** Délai avant le premier mot (ms). */
  delay?: number;
  /** Écart entre deux mots (ms). */
  step?: number;
};

/**
 * Titre animé mot par mot : chaque mot remonte depuis un masque.
 * Le texte complet reste lisible par les lecteurs d'écran.
 */
export default function Split({
  text,
  as: Tag = 'span',
  className = '',
  mode = 'load',
  letters = false,
  delay = 0,
  step,
}: SplitProps) {
  const words = text.split(' ').map((raw) => {
    const m = raw.match(/^_(.+)_(.*)$/);
    return m ? { italic: m[1], rest: m[2] } : { italic: '', rest: raw };
  });
  const plain = words.map((w) => w.italic + w.rest).join(' ');

  let i = 0;
  const piece = (content: string, italic: boolean, key: string) => {
    const units = letters ? Array.from(content) : [content];
    return units.map((u, j) => {
      const style = { '--i': i++ } as CSSProperties;
      const inner = italic ? <em>{u}</em> : u;
      return (
        <span key={`${key}-${j}`} className="split-w">
          <span style={style}>{inner}</span>
        </span>
      );
    });
  };

  const style = {
    '--d': `${delay}ms`,
    ...(step !== undefined ? { '--step': `${step}ms` } : {}),
  } as CSSProperties;

  return (
    <Tag
      className={`${mode === 'load' ? 'split-load' : ''} ${className}`}
      data-reveal={mode === 'view' ? 'split' : undefined}
      style={style}
    >
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map((w, k) => (
          <span key={k}>
            {k > 0 && ' '}
            {w.italic && piece(w.italic, true, `${k}i`)}
            {w.rest && piece(w.rest, false, `${k}r`)}
          </span>
        ))}
      </span>
    </Tag>
  );
}
