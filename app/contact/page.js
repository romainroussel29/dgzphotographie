'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      {/* En-tête du site */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <Link href="/" className="text-xl font-light tracking-widest uppercase hover:text-neutral-400 transition">
          DGZ Photographie
        </Link>
        <nav className="space-x-8 text-sm tracking-wider">
          <Link href="/" className="hover:text-neutral-400 transition">Accueil</Link>
          <Link href="/galerie" className="hover:text-neutral-400 transition">Galeries</Link>
          <Link href="/contact" className="text-white font-medium">Contact</Link>
          <Link href="/commentaires" className="hover:text-neutral-400 transition">Commentaires</Link>
          <Link href="/admin/login" className="hover:text-neutral-400 transition text-neutral-600">Admin</Link>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-xl mx-auto px-6 py-20 flex-grow w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide mb-4">Contact</h2>
          <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide mb-4">
            Une question, un projet de collaboration ou une demande de tirage ? N'hésitez pas à m'écrire ou à m'appeler.
          </p>
          {/* Coordonnées directes */}
          <div className="text-xs text-neutral-400 tracking-wider space-x-6">
            <span>✉️ contact@dgz-photographie.com</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-neutral-900 border border-neutral-800 p-8 text-center">
            <h3 className="text-lg font-light tracking-wide text-white mb-2">Message envoyé</h3>
            <p className="text-xs text-neutral-400 font-light">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 border border-neutral-700 text-xs uppercase tracking-widest hover:bg-neutral-800 transition text-neutral-300"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Nom</label>
              <input 
                type="text" 
                required
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Téléphone (Optionnel)</label>
              <input 
                type="tel" 
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="06 12 34 56 78"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Message</label>
              <textarea 
                rows="5" 
                required
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition resize-none"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              Envoyer le message
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}