import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import IntroCurtain from '@/components/layout/IntroCurtain';
import Effects from '@/components/motion/Effects';
import { SITE_NAME, SITE_URL } from '@/config/site';
import '@/styles/globals.css';
import '@/styles/site.scss';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  icons: {
    icon: [{ url: '/favicon.ico?v=2', sizes: 'any' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#141414',
};

/**
 * Exécuté avant le premier affichage :
 * - data-js : les animations peuvent masquer le contenu en attendant de le révéler ;
 * - data-intro : le rideau d'introduction ne joue qu'une fois par session.
 * Si le JavaScript du site n'a pas démarré peu après le chargement (Effects pose data-ready),
 * data-js est retiré pour que tout le contenu reste visible.
 */
const BOOT_SCRIPT = `(function (d) {
  d.setAttribute('data-js', '');
  try {
    d.setAttribute('data-intro', sessionStorage.getItem('dgz-intro') ? 'seen' : 'play');
    sessionStorage.setItem('dgz-intro', '1');
  } catch (e) {
    d.setAttribute('data-intro', 'seen');
  }
  addEventListener('load', function () {
    setTimeout(function () {
      if (!d.hasAttribute('data-ready')) d.removeAttribute('data-js');
    }, 2000);
  });
})(document.documentElement);`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Le script de démarrage ajoute des attributs à <html> avant que React ne prenne la main.
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <div className="site">
          <a className="skip-link kicker" href="#contenu">
            Aller au contenu
          </a>

          <IntroCurtain />
          <div className="scroll-progress" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <div className="cursor" aria-hidden="true">
            <div className="cursor__ball">
              <span className="cursor__label" />
            </div>
          </div>

          <Header />
          <main className="site-main" id="contenu">
            {children}
          </main>
          <Footer />
        </div>
        <Effects />
      </body>
    </html>
  );
}
