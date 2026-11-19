import Link from 'next/link';

/** Classes du bouton principal (fond encre, remplissage animé au survol). Aussi utilisées par les boutons de formulaire. */
export const buttonClass = 'group btn-wipe inline-flex items-center justify-center gap-3 bg-ink text-paper px-7 py-4 kicker';

/** Lien présenté comme un bouton, avec flèche animée et effet magnétique. */
export default function ButtonLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} data-magnetic className={`${buttonClass} ${className}`}>
      {children} <ButtonArrow />
    </Link>
  );
}

export function ButtonArrow() {
  return (
    <span className="btn-arrow" aria-hidden>
      →
    </span>
  );
}
