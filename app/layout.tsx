import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Manrope } from 'next/font/google';
import { SITE_NAME } from '@/lib/site';
import './globals.css';

// Polices auto-hébergées par Next.js (aucune requête vers Google côté visiteur).
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const DESCRIPTION =
  "Photographe noir et blanc basé à Marseille. Portraits authentiques d'artistes, comédiens, musiciens et créateurs, street photography et paysages.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Portrait noir et blanc à Marseille`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#141414',
};

// Exécuté avant le premier affichage : active les animations pilotées par JavaScript
// et ne montre le rideau d'introduction qu'une fois par session.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{if(sessionStorage.getItem('dgz-intro')){d.setAttribute('data-intro','seen')}else{sessionStorage.setItem('dgz-intro','1');d.setAttribute('data-intro','play')}}catch(e){d.setAttribute('data-intro','seen')}})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${bodoni.variable} h-full antialiased`}
      // Le script de démarrage ajoute des attributs à <html> avant l'hydratation.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
