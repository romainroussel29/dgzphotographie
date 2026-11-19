import SplitText from '@/components/motion/SplitText';

/**
 * En-tête de page : grand titre animé (h1), filet qui se dessine et texte d'accompagnement facultatif.
 * Dans `title`, un mot entouré de `_` est mis en italique.
 */
export default function PageHeader({
  title,
  letters = false,
  children,
  className = 'mb-14',
}: {
  title: string;
  /** Anime lettre par lettre (titres d'un seul mot). */
  letters?: boolean;
  /** Texte affiché à droite du titre sur grand écran. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 ${className}`}>
      <SplitText
        as="h1"
        text={title}
        letters={letters}
        step={letters ? 50 : 100}
        className="block font-serif text-6xl md:text-8xl leading-none tracking-tight"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-ink origin-left animate-[grow_1.4s_var(--ease-io)_both] [animation-delay:calc(var(--intro)+150ms)]"
      />
      {children && <div className="max-w-sm text-sm text-muted md:text-right animate-rise [--d:400ms]">{children}</div>}
    </header>
  );
}
