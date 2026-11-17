'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import InstagramIcon from '@/app/components/InstagramIcon';
import { INSTAGRAM_URL } from '@/lib/contact';

export default function GaleriePage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(0);

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

  const preview = galleries[hovered];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink pb-6 animate-rise">
        <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight">Galeries</h1>
        <p className="max-w-sm text-sm text-muted md:text-right">
          Exploration visuelle à travers différentes thématiques, toutes en noir et blanc.
        </p>
      </header>

      {loading ? (
        <div className="mt-6 space-y-px" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 bg-paper-deep animate-pulse" />
          ))}
        </div>
      ) : galleries.length === 0 ? (
        <div className="py-24 md:py-32 text-center">
          <p className="font-serif italic text-5xl md:text-7xl">À venir…</p>
          <p className="mt-6 text-muted max-w-md mx-auto leading-relaxed">
            Les galeries sont en cours de préparation. De nouvelles photographies arrivent très bientôt.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 kicker border-b border-ink pb-1 hover:opacity-70 transition"
          >
            <InstagramIcon /> En attendant, suivez-moi sur Instagram
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-12 gap-10 mt-2">
          {/* Index */}
          <ol className="md:col-span-7">
            {galleries.map((gal, i) => (
              <li key={gal.id} className="border-b border-line">
                <Link
                  href={`/galerie/${gal.id}`}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  className="group flex items-center gap-6 py-6 md:py-8"
                >
                  <span className="kicker text-muted w-8">{String(i + 1).padStart(2, '0')}</span>

                  {/* Vignette visible seulement sur mobile */}
                  <span className="md:hidden w-16 h-20 shrink-0 bg-paper-deep overflow-hidden">
                    {gal.cover_image && (
                      <img src={gal.cover_image} alt="" className="w-full h-full object-cover grayscale" />
                    )}
                  </span>

                  <span
                    className={`font-serif text-4xl md:text-6xl leading-none transition duration-300 ${
                      hovered === i ? 'md:italic md:translate-x-3' : ''
                    } group-hover:italic`}
                  >
                    {gal.title}
                  </span>
                  <span className="ml-auto kicker opacity-0 group-hover:opacity-100 transition">Voir →</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Aperçu */}
          <aside className="hidden md:block md:col-span-5">
            <div className="sticky top-8 pt-6">
              <div className="aspect-[4/5] bg-paper-deep overflow-hidden relative">
                {preview?.cover_image ? (
                  <img
                    key={preview.id}
                    src={preview.cover_image}
                    alt={preview.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale animate-rise"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-serif italic text-3xl text-muted">
                    À venir…
                  </span>
                )}
              </div>
              {preview && (
                <p className="mt-3 flex justify-between kicker text-muted">
                  <span>{preview.title}</span>
                  <span>
                    {String(hovered + 1).padStart(2, '0')} / {String(galleries.length).padStart(2, '0')}
                  </span>
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
