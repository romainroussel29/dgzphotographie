import { Suspense } from 'react';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import Motion from '@/app/components/motion/Motion';
import Cursor from '@/app/components/motion/Cursor';
import Logo from '@/app/components/Logo';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      {/* Rideau d'introduction (une fois par session) */}
      <div className="intro" aria-hidden>
        <div>
          <div className="intro-logo">
            <Logo light priority decorative sizes="(min-width: 768px) 520px, 80vw" className="w-full" />
          </div>
          <div className="intro-bar" />
          <span className="intro-sub kicker">Marseille</span>
        </div>
      </div>

      <div className="scroll-progress" aria-hidden />
      <div className="grain" aria-hidden />
      <Cursor />
      <Suspense fallback={null}>
        <Motion />
      </Suspense>

      <SiteHeader />
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
}
