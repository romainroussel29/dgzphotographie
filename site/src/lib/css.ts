import type { CSSProperties } from 'react';

/** Variables CSS en ligne, par exemple `style={cssVars({ '--d': '400ms' })}` pour un délai d'animation. */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
