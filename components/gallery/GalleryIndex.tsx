'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonArrow } from '@/components/ui/ButtonLink';
import { pad2 } from '@/lib/format';
import type { Gallery } from '@/lib/types';

/**
 * Index des galeries : liste numérotée et, sur grand écran, aperçu de la couverture survolée.
 * Les données sont chargées côté serveur et passées en props.
 */
export default function GalleryIndex({ galleries }: { galleries: Gallery[] }) {
  const [active, setActive] = useState(0);
  const preview = galleries[active];

  return (
    <div className="grid md:grid-cols-12 gap-10 mt-2">
      <ol className="md:col-span-7" data-stagger="up">
        {galleries.map((gallery, i) => {
          const isActive = active === i;
          return (
            <li key={gallery.id} className="relative border-b border-line">
              <Link
                href={`/galerie/${gallery.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="Voir"
                className="group flex items-center gap-6 py-6 md:py-8"
              >
                {/* Trait qui se dessine au survol */}
                <span
                  aria-hidden
                  className={`absolute left-0 -bottom-px h-px w-full bg-ink origin-left transition-transform duration-700 ease-[var(--ease-io)] scale-x-0 group-hover:scale-x-100 ${
                    isActive ? 'md:scale-x-100' : ''
                  }`}
                />
                <span
                  aria-hidden
                  className={`kicker w-8 transition-colors duration-500 ${isActive ? 'md:text-ink' : 'text-muted'}`}
                >
                  {pad2(i + 1)}
                </span>

                {/* Vignette visible seulement sur mobile */}
                <span className="relative md:hidden w-16 h-20 shrink-0 bg-paper-deep overflow-hidden">
                  {gallery.cover_image && (
                    <Image src={gallery.cover_image} alt="" fill sizes="64px" className="object-cover grayscale" />
                  )}
                </span>

                <span
                  className={`font-serif text-4xl md:text-6xl leading-none transition duration-500 ease-[var(--ease-out)] group-hover:italic ${
                    isActive ? 'md:italic md:translate-x-3' : ''
                  }`}
                >
                  {gallery.title}
                </span>
                <span
                  aria-hidden
                  className="ml-auto kicker opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500"
                >
                  Voir <ButtonArrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Aperçu décoratif : les couvertures sont empilées, la nouvelle se dévoile par-dessus l'ancienne. */}
      <aside className="hidden md:block md:col-span-5" aria-hidden data-reveal="fade">
        <div className="sticky top-8 pt-6">
          <div className="aspect-[4/5] bg-paper-deep overflow-hidden relative">
            {galleries.map((gallery, i) => (
              <div key={gallery.id} className="preview-layer bg-paper-deep" data-active={active === i ? '' : undefined}>
                {gallery.cover_image ? (
                  <Image
                    src={gallery.cover_image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 500px, 40vw"
                    priority={i === 0}
                    className="object-cover grayscale"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-serif italic text-3xl text-muted">
                    À venir…
                  </span>
                )}
              </div>
            ))}
          </div>
          {preview && (
            <p className="mt-3 flex justify-between kicker text-muted">
              <span key={preview.id} className="animate-rise">
                {preview.title}
              </span>
              <span>
                {pad2(active + 1)} / {pad2(galleries.length)}
              </span>
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
