'use client';

import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import Arrow from '@/components/ui/Arrow';
import { PHOTOS, photoSrc, photoSrcSet, plate } from './photos';

const pad = (number: number) => String(number).padStart(2, '0');

/**
 * Grille de la galerie et visionneuse plein écran.
 * Clavier : Échap et flèches. Mobile : balayage. Sans JavaScript, chaque lien ouvre l'image.
 */
export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const touchX = useRef<number | null>(null);
  const open = current !== null;

  const show = (index: number) => setCurrent((index + PHOTOS.length) % PHOTOS.length);
  const close = () => {
    setCurrent(null);
    opener.current?.focus();
  };

  // La visionneuse est placée à la fin de la page, hors du contenu principal.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('lightbox-open');
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') setCurrent((index) => ((index ?? 0) - 1 + PHOTOS.length) % PHOTOS.length);
      if (event.key === 'ArrowRight') setCurrent((index) => ((index ?? 0) + 1) % PHOTOS.length);
      if (event.key !== 'Tab' || !box.current) return;

      // Le focus reste dans la visionneuse.
      const buttons = [...box.current.querySelectorAll('button')];
      const position = buttons.indexOf(document.activeElement as HTMLButtonElement);
      event.preventDefault();
      buttons[(position + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openPhoto = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    show(index);
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null || current === null) return;
    const distance = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(distance) < 50) return;
    event.preventDefault();
    show(current + (distance < 0 ? 1 : -1));
  };

  const photo = current === null ? null : PHOTOS[current];

  return (
    <>
      <ul className="photo-grid">
        {PHOTOS.map((item, index) => (
          <li key={item.file}>
            <figure>
              <a
                className="photo"
                href={photoSrc(item)}
                data-reveal="clip"
                data-cursor="Voir"
                onClick={(event) => openPhoto(event, index)}
              >
                <img
                  src={photoSrc(item)}
                  srcSet={photoSrcSet(item)}
                  sizes="(min-width: 80rem) 379px, (min-width: 64rem) 30vw, (min-width: 48rem) 43vw, calc(50vw - 1.75rem)"
                  width={item.width}
                  height={item.height}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  alt={item.alt}
                />
              </a>
              <figcaption className="photo-caption kicker muted" data-reveal="fade">
                <span>{plate(index)}</span>
                <span>{item.title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {mounted &&
        createPortal(
          <div
            ref={box}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galerie — visionneuse"
            hidden={!open}
          >
            <div className="lightbox__bar lightbox__bar--top kicker">
              <p aria-live="polite">
                Galerie — Pl. <span>{current === null ? '' : `${pad(current + 1)} / ${pad(PHOTOS.length)}`}</span>
              </p>
              <button ref={closeButton} className="link-draw" type="button" onClick={close}>
                Fermer <span aria-hidden="true">✕</span>
              </button>
            </div>
            {/* Cliquer à côté de la photo ferme la visionneuse. */}
            <div
              className="lightbox__stage"
              data-cursor="Fermer"
              onClick={close}
              onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
              onTouchEnd={onTouchEnd}
            >
              {/* Une nouvelle clé remplace l'image et relance son animation. */}
              {photo && <img key={photo.file} src={photoSrc(photo)} alt={photo.alt} />}
            </div>
            <nav className="lightbox__bar lightbox__bar--bottom kicker" aria-label="Navigation entre les photos">
              <button className="link-draw" type="button" onClick={() => current !== null && show(current - 1)}>
                <Arrow back /> Précédente
              </button>
              <button className="link-draw" type="button" onClick={() => current !== null && show(current + 1)}>
                Suivante <Arrow />
              </button>
            </nav>
          </div>,
          document.querySelector('.site') ?? document.body,
        )}
    </>
  );
}
