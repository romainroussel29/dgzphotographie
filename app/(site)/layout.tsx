import { Suspense, type CSSProperties } from 'react';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import Motion from '@/app/components/motion/Motion';
import Cursor from '@/app/components/motion/Cursor';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      {/* Rideau d'introduction (une fois par session) */}
      <div className="intro" aria-hidden>
        <div>
          <p className="intro-word">
            {Array.from('DGZ').map((c, i) => (
              <span key={i} style={{ '--i': i } as CSSProperties}>
                {c}
              </span>
            ))}
          </p>
          <div className="intro-bar" />
          <span className="intro-sub kicker">Photographie — Marseille</span>
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
