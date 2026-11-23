import type { ReactNode } from 'react';
import SplitText from '@/components/motion/SplitText';
import { cssVars } from '@/lib/css';

type PageHeaderProps = {
  /** Titre de la page ; les mots entre `_` sont en italique : « Livre _d'or_ ». */
  title: string;
  /** Titre animé lettre par lettre (titres d'un seul mot). */
  letters?: boolean;
  /** Texte sous le trait. */
  children?: ReactNode;
  /** Titre long (page de confidentialité). */
  long?: boolean;
};

/** En-tête des pages intérieures : grand titre animé, trait, texte d'introduction. */
export default function PageHeader({ title, letters, children, long }: PageHeaderProps) {
  return (
    <header className={long ? 'page-header page-header--long' : 'page-header'}>
      <SplitText as="h1" mode="load" letters={letters} step={letters ? '50ms' : '100ms'}>
        {title}
      </SplitText>
      <span className="page-header__rule" aria-hidden="true" />
      {children && (
        <div className="page-header__intro animate-rise" style={cssVars({ '--d': '400ms' })}>
          {children}
        </div>
      )}
    </header>
  );
}
