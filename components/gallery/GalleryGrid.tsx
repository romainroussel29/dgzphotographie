'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { pad2 } from '@/lib/format';
import type { Photo } from '@/lib/types';

/** Grille des photos d'une galerie ; un clic ouvre la visionneuse. */
export default function GalleryGrid({ photos, title }: { photos: Photo[]; title: string }) {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : (c - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(() => setCurrent((c) => (c === null ? c : (c + 1) % photos.length)), [photos.length]);

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <figure>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                data-reveal="clip"
                data-cursor="Voir"
                className="group relative block w-full aspect-[4/5] bg-paper-deep overflow-hidden cursor-zoom-in"
                aria-label={`Agrandir la photographie ${i + 1}`}
              >
                <Image
                  src={photo.url}
                  alt={`${title}, photographie ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  priority={i < 3}
                  className="object-cover grayscale transition-[scale] duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.06]"
                />
              </button>
              <figcaption className="mt-3 flex justify-between kicker text-muted" data-reveal="fade">
                <span>Pl. {pad2(i + 1)}</span>
                <span>{title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {current !== null && photos[current] && (
        <Lightbox photos={photos} index={current} title={title} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  );
}
