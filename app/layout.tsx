import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "DGZ Photographie — Portrait noir et blanc à Marseille",
    template: "%s — DGZ Photographie",
  },
  description:
    "Photographe noir et blanc basé à Marseille. Portraits authentiques d'artistes, comédiens, musiciens et créateurs, street photography et paysages.",
};

// Exécuté avant l'affichage : active les animations pilotées par JS
// et ne montre le rideau d'introduction qu'une fois par session.
const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{if(sessionStorage.getItem('dgz-intro')){d.setAttribute('data-intro','seen')}else{sessionStorage.setItem('dgz-intro','1');d.setAttribute('data-intro','play')}}catch(e){d.setAttribute('data-intro','seen')}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${bodoni.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
