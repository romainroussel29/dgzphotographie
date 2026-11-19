import { Suspense } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import IntroCurtain from '@/components/layout/IntroCurtain';
import Motion from '@/components/motion/Motion';
import Cursor from '@/components/motion/Cursor';

/** Mise en page commune aux pages publiques du site. */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:bg-paper focus:text-ink focus:px-4 focus:py-3 kicker"
      >
        Aller au contenu
      </a>

      <IntroCurtain />

      {/* Effets décoratifs */}
      <div className="scroll-progress" aria-hidden />
      <div className="grain" aria-hidden />
      <Cursor />
      <Suspense fallback={null}>
        <Motion />
      </Suspense>

      <SiteHeader />
      <main id="contenu" className="flex-grow">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
