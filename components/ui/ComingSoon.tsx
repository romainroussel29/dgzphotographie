import SplitText from '@/components/motion/SplitText';

/** Message « À venir… » affiché quand une galerie (ou la liste des galeries) est vide. */
export default function ComingSoon({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="py-24 md:py-32 text-center" aria-label="Contenu à venir">
      <SplitText as="p" text="_À_ _venir…_" step={120} className="block font-serif text-5xl md:text-7xl" />
      <p className="mt-6 text-muted max-w-md mx-auto leading-relaxed animate-rise [--d:300ms]">{children}</p>
      {action && <div className="mt-10 animate-rise [--d:450ms]">{action}</div>}
    </section>
  );
}
