'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function GaleriePage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchGalleries();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <header className="mb-16 md:mb-24 grid md:grid-cols-12 gap-8 items-end animate-fade-up">
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">Portfolio</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl text-white leading-none">Les galeries</h1>
        </div>
        <p className="md:col-span-5 text-neutral-400 font-light leading-relaxed">
          Exploration visuelle à travers différentes thématiques, toutes en noir et blanc.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <div className="aspect-[4/5] bg-neutral-900 animate-pulse" />
              <div className="mt-5 h-5 w-1/2 bg-neutral-900 animate-pulse" />
            </div>
          ))}
        </div>
      ) : galleries.length === 0 ? (
        <p className="text-sm text-neutral-500 font-light text-center py-24 border border-dashed border-neutral-800">
          Aucune galerie disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {galleries.map((gal, i) => (
            <Link key={gal.id} href={`/galerie/${gal.id}`} className="group block">
              <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                {gal.cover_image ? (
                  <img
                    src={gal.cover_image}
                    alt={gal.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover grayscale transition duration-[1200ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 text-[10px] uppercase tracking-[0.3em]">
                    Bientôt
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                <span className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.3em] text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                  Ouvrir →
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-serif text-neutral-600">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-200 group-hover:text-white transition">
                  {gal.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
