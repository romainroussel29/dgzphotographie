'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Gallery = { id: string; title: string };
type Photo = { id: string; url: string; name: string | null };

export default function GalleryView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ data: gal }, { data: pics, error }] = await Promise.all([
          supabase.from('galleries').select('id, title').eq('id', id).maybeSingle(),
          supabase.from('photos').select('id, url, name').eq('gallery_id', id).order('created_at', { ascending: true }),
        ]);
        if (error) throw error;
        if (!cancelled) {
          setGallery(gal);
          setPhotos(pics || []);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de la galerie:', (err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : (c - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === null ? c : (c + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [current, close, prev, next]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <Link
        href="/galerie"
        className="inline-block text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition mb-10"
      >
        ← Toutes les galeries
      </Link>

      <header className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10 animate-fade-up">
        <h1 className="font-serif font-light text-5xl md:text-7xl text-white leading-none">
          {loading ? '…' : gallery?.title ?? 'Galerie introuvable'}
        </h1>
        {!loading && photos.length > 0 && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            {photos.length} photographie{photos.length > 1 ? 's' : ''}
          </p>
        )}
      </header>

      {loading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {[320, 420, 280, 380, 300, 400].map((h, i) => (
            <div key={i} className="mb-6 bg-neutral-900 animate-pulse" style={{ height: h }} />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <p className="text-sm text-neutral-500 font-light text-center py-24 border border-dashed border-neutral-800">
          Aucune photo dans cette galerie pour le moment.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setCurrent(i)}
              className="group relative block w-full mb-6 break-inside-avoid overflow-hidden bg-neutral-900 cursor-zoom-in"
              aria-label={`Agrandir la photo ${i + 1}`}
            >
              <img
                src={photo.url}
                alt={photo.name || `${gallery?.title ?? 'Photo'} ${i + 1}`}
                loading="lazy"
                className="w-full h-auto grayscale transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      )}

      {current !== null && photos[current] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-up"
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse"
          onClick={close}
        >
          <img
            src={photos[current].url}
            alt={photos[current].name || ''}
            className="max-h-[85vh] max-w-[90vw] object-contain grayscale shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 text-[11px] uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition"
          >
            Fermer ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 text-3xl font-light text-neutral-500 hover:text-white transition"
                aria-label="Photo précédente"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 text-3xl font-light text-neutral-500 hover:text-white transition"
                aria-label="Photo suivante"
              >
                ›
              </button>
            </>
          )}

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-neutral-500">
            {current + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
