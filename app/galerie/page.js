'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function GaleriePage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('position', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des galeries:', error.message);
    } finally {
      setLoading(false);
    }
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
          <Link href="/galerie" className="text-white font-medium">Galeries</Link>
          <Link href="/contact" className="hover:text-neutral-400 transition">Contact</Link>
          <Link href="/commentaires" className="hover:text-neutral-400 transition">Commentaires</Link>
          <Link href="/admin/login" className="hover:text-neutral-400 transition text-neutral-600">Admin</Link>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex-grow w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide mb-4">Les Galeries</h2>
          <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide">
            Exploration visuelle à travers différentes thématiques en noir et blanc.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-neutral-600 italic text-center py-12">Chargement des galeries...</p>
        ) : galleries.length === 0 ? (
          <p className="text-xs text-neutral-600 italic text-center py-12">Aucune galerie disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {galleries.map((gal) => (
              <Link 
                key={gal.id} 
                href={`/galerie/${gal.id}`}
                className="group flex flex-col space-y-4"
              >
                {/* Miniature de la photo */}
                <div className="w-full h-72 bg-neutral-900 border border-neutral-800 overflow-hidden relative">
                  {gal.cover_image ? (
                  <img 
  src={gal.cover_image} 
  alt={gal.title}
  className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700 text-xs uppercase tracking-widest">
                      Aucune image
                    </div>
                  )}
                </div>

                {/* Nom centré en dessous */}
                <h3 className="text-lg font-light tracking-wide text-white text-center group-hover:text-neutral-400 transition">
                  {gal.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}