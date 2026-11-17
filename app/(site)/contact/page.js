'use client';

import { useState } from 'react';

const inputClass =
  'w-full bg-transparent border-0 border-b border-neutral-800 px-0 py-3 text-base text-white placeholder:text-neutral-700 focus:outline-none focus:border-white transition';
const labelClass = 'block text-[10px] uppercase tracking-[0.3em] text-neutral-500';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-16 md:gap-12">
        {/* Colonne d'information */}
        <aside className="md:col-span-5 animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">Contact</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl text-white leading-none">
            Écrivez-moi.
          </h1>
          <p className="mt-8 text-neutral-400 font-light leading-relaxed max-w-sm">
            Une question, un projet de collaboration ou une demande de tirage&nbsp;? N&apos;hésitez pas à m&apos;écrire.
          </p>

          <dl className="mt-14 space-y-8 border-t border-neutral-900 pt-10">
            <div>
              <dt className={labelClass}>Email</dt>
              <dd className="mt-2">
                <a
                  href="mailto:contact@dgz-photographie.com"
                  className="text-neutral-200 hover:text-white border-b border-neutral-700 hover:border-white pb-0.5 transition"
                >
                  contact@dgz-photographie.com
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Studio</dt>
              <dd className="mt-2 text-neutral-200">Marseille &amp; alentours</dd>
            </div>
          </dl>
        </aside>

        {/* Formulaire */}
        <div className="md:col-span-6 md:col-start-7">
          {submitted ? (
            <div className="border border-neutral-800 p-10 md:p-14 animate-fade-up">
              <p className="font-serif italic text-3xl text-white">Merci.</p>
              <p className="mt-4 text-neutral-400 font-light leading-relaxed">
                Votre message a bien été pris en compte. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-10 text-[11px] uppercase tracking-[0.25em] text-neutral-300 hover:text-white border-b border-neutral-700 hover:border-white pb-1 transition"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="nom" className={labelClass}>Nom</label>
                  <input id="nom" type="text" required autoComplete="name" className={inputClass} placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="tel" className={labelClass}>Téléphone <span className="normal-case tracking-normal text-neutral-700">(optionnel)</span></label>
                  <input id="tel" type="tel" autoComplete="tel" className={inputClass} placeholder="06 12 34 56 78" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" type="email" required autoComplete="email" className={inputClass} placeholder="votre.email@exemple.com" />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea id="message" rows={6} required className={`${inputClass} resize-none`} placeholder="Parlez-moi de votre projet…" />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-200 transition"
              >
                Envoyer le message
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
