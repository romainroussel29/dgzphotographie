// Éléments communs aux pages légales.

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
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink pb-6 mb-14">
        <h1 className="font-serif text-5xl md:text-7xl leading-none tracking-tight">{title}</h1>
        <p className="kicker text-muted">Mise à jour : {updated}</p>
      </header>
      <div className="max-w-3xl space-y-12 text-[15px] leading-relaxed">{children}</div>
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
