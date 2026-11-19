'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ButtonArrow } from '@/components/ui/ButtonLink';
import { pad2 } from '@/lib/format';
import type { Photo } from '@/lib/types';

type LightboxProps = {
  photos: Photo[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Visionneuse plein écran.
 * Clavier : Échap pour fermer, flèches pour naviguer. Mobile : balayage gauche / droite.
 * Le focus est placé sur « Fermer » à l'ouverture et rendu à la vignette à la fermeture.
 */
export default function Lightbox({ photos, index, title, onClose, onPrev, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = photos[index];

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-paper flex flex-col [animation:unveil_0.8s_var(--ease-io)_both]"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — visionneuse`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-16 border-b border-line kicker">
        <p aria-live="polite">
          {title} — Pl.{' '}
          <span key={index} className="inline-block animate-[rise_0.5s_var(--ease-out)_both]">
            {pad2(index + 1)}
          </span>{' '}
          / {pad2(photos.length)}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="link-draw">
          Fermer <span aria-hidden>✕</span>
        </button>
      </div>

      {/* Cliquer à côté de la photo ferme la visionneuse. */}
      <div
        className="relative flex-1 min-h-0 m-6 md:m-12"
        onClick={onClose}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        data-cursor="Fermer"
      >
        <Image
          key={photo.id}
          src={photo.url}
          alt={`${title}, photographie ${index + 1} sur ${photos.length}`}
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-contain grayscale animate-photo-in"
        />
      </div>

      {photos.length > 1 && (
        <nav
          className="flex justify-between px-5 md:px-10 h-16 items-center border-t border-line kicker"
          aria-label="Navigation entre les photos"
        >
          <button type="button" onClick={onPrev} className="group link-draw">
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">
              ←
            </span>{' '}
            Précédente
          </button>
          <button type="button" onClick={onNext} className="group link-draw">
            Suivante <ButtonArrow />
          </button>
        </nav>
      )}
    </div>
  );
}
