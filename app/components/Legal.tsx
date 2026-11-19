// Éléments communs aux pages légales.
import Split from './motion/Split';

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-14">
        <Split as="h1" text={title} step={90} className="block font-serif text-5xl md:text-7xl leading-none tracking-tight" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-ink origin-left animate-[grow_1.4s_var(--ease-io)_both] [animation-delay:calc(var(--intro)+150ms)]" />
        <p className="kicker text-muted animate-rise [--d:400ms]">Mise à jour : {updated}</p>
      </header>
      <div className="max-w-3xl space-y-12 text-[15px] leading-relaxed" data-stagger="up">
        {children}
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl mb-4">{title}</h2>
      <div className="space-y-3 [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}

/** Information à compléter par le propriétaire du site (surlignée pour être repérée facilement). */
export function ACompleter({ children }: { children: React.ReactNode }) {
  return <mark className="bg-amber-200/70 text-ink px-1">[{children}]</mark>;
}
