'use client';

import { useState } from 'react';
import Link from 'next/link';
import InstagramIcon from '@/app/components/InstagramIcon';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/contact';

const inputClass =
  'w-full bg-paper border border-line px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition';
const labelClass = 'kicker block mb-2';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <header className="border-b border-ink pb-6 mb-14 animate-rise">
        <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight">Contact</h1>
      </header>

      <div className="grid md:grid-cols-12 gap-14 md:gap-10">
        <aside className="md:col-span-4 space-y-10">
          <p className="font-serif italic text-3xl leading-snug">
            Une question, un projet de collaboration ou une demande de tirage&nbsp;?
          </p>
          <p className="text-muted leading-relaxed">
            N&apos;hésitez pas à m&apos;écrire. Je réponds personnellement à chaque message.
          </p>

          <dl className="border-t border-ink">
            <div className="flex justify-between gap-4 py-4 border-b border-line">
              <dt className="kicker text-muted">Téléphone</dt>
              <dd>
                <a href={PHONE_LINK} className="hover:underline underline-offset-4">{PHONE_DISPLAY}</a>
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-4 border-b border-line">
              <dt className="kicker text-muted">Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="hover:underline underline-offset-4 break-all">{EMAIL}</a>
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-4 border-b border-line">
              <dt className="kicker text-muted">Instagram</dt>
              <dd>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline underline-offset-4"
                >
                  <InstagramIcon />@{INSTAGRAM_HANDLE}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-4 border-b border-line">
              <dt className="kicker text-muted">Lieu</dt>
              <dd>Marseille &amp; alentours</dd>
            </div>
            <div className="flex justify-between gap-4 py-4 border-b border-line">
              <dt className="kicker text-muted">Spécialité</dt>
              <dd>Portrait noir &amp; blanc</dd>
            </div>
          </dl>
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          {submitted ? (
            <div className="bg-ink text-paper p-10 md:p-16 animate-rise">
              <p className="font-serif italic text-5xl">Merci.</p>
              <p className="mt-6 text-white/70 leading-relaxed max-w-md">
                Votre message a bien été pris en compte. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-10 kicker border border-white/40 px-5 py-3 hover:bg-paper hover:text-ink transition"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-paper-deep p-6 md:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className={labelClass}>Nom</label>
                  <input id="nom" type="text" required autoComplete="name" className={inputClass} placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="tel" className={labelClass}>
                    Téléphone <span className="normal-case tracking-normal font-normal text-muted">(optionnel)</span>
                  </label>
                  <input id="tel" type="tel" autoComplete="tel" className={inputClass} placeholder="06 12 34 56 78" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" type="email" required autoComplete="email" className={inputClass} placeholder="votre.email@exemple.com" />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea id="message" rows={7} required className={`${inputClass} resize-none`} placeholder="Parlez-moi de votre projet…" />
              </div>

              <button type="submit" className="w-full bg-ink text-paper py-4 kicker hover:bg-black transition">
                Envoyer le message →
              </button>
              <p className="text-xs text-muted leading-relaxed">
                Les informations saisies servent uniquement à répondre à votre demande. Voir la{' '}
                <Link href="/confidentialite" className="underline underline-offset-2 hover:text-ink">
                  politique de confidentialité
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
