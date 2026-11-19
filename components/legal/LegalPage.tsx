// Éléments communs aux pages légales (mentions légales, confidentialité).
import PageHeader from '@/components/ui/PageHeader';

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /** Date de dernière mise à jour, en toutes lettres. */
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title={title}>
        <p className="kicker">Mise à jour : {updated}</p>
      </PageHeader>
      <div className="max-w-3xl space-y-12 text-[15px] leading-relaxed" data-stagger="up">
        {children}
      </div>
    </article>
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
