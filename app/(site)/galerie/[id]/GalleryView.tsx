'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Gallery = { id: string; title: string };
type Photo = { id: string; url: string; name: string | null };

const num = (n: number) => String(n).padStart(2, '0');

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
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <Link href="/galerie" className="kicker text-muted hover:text-ink transition">
        ← Index des galeries
      </Link>

      <header className="mt-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink pb-6 animate-rise">
        <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight">
          {loading ? '…' : gallery?.title ?? 'Galerie introuvable'}
        </h1>
        {!loading && photos.length > 0 && (
          <p className="kicker text-muted">
            {num(photos.length)} photographie{photos.length > 1 ? 's' : ''}
          </p>
        )}
      </header>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[4/5] bg-paper-deep animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <p className="py-24 text-center text-muted">Aucune photo dans cette galerie pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12">
          {photos.map((photo, i) => (
            <figure key={photo.id}>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                className="group block w-full aspect-[4/5] bg-paper-deep overflow-hidden cursor-zoom-in"
                aria-label={`Agrandir la photo ${i + 1}`}
              >
                <img
                  src={photo.url}
                  alt={photo.name || `${gallery?.title ?? 'Photo'} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale transition duration-700 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="mt-3 flex justify-between kicker text-muted">
                <span>Pl. {num(i + 1)}</span>
                <span>{gallery?.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {current !== null && photos[current] && (
        <div
          className="fixed inset-0 z-50 bg-paper flex flex-col animate-rise"
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse"
        >
          <div className="flex items-center justify-between px-5 md:px-10 h-16 border-b border-line kicker">
            <span>
              {gallery?.title} — Pl. {num(current + 1)} / {num(photos.length)}
            </span>
            <button type="button" onClick={close} className="hover:underline underline-offset-4">
              Fermer ✕
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-6 md:p-12 min-h-0" onClick={close}>
            <img
              src={photos[current].url}
              alt={photos[current].name || ''}
              className="max-h-full max-w-full object-contain grayscale"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {photos.length > 1 && (
            <div className="flex justify-between px-5 md:px-10 h-16 items-center border-t border-line kicker">
              <button type="button" onClick={prev} className="hover:underline underline-offset-4">
                ← Précédente
              </button>
              <button type="button" onClick={next} className="hover:underline underline-offset-4">
                Suivante →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
