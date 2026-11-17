'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full bg-paper border border-line px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition';
const labelClass = 'kicker block mb-2';

export default function CommentairesPage() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setComments(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSending(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ author, content }])
        .select();

      if (error) throw error;

      if (data) {
        setComments([data[0], ...comments]);
      }

      setAuthor('');
      setContent('');
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire:", error.message);
      alert("Une erreur est survenue lors de l'envoi du commentaire.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink pb-6 mb-14 animate-rise">
        <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight">
          Livre <em>d&apos;or</em>
        </h1>
        <p className="max-w-sm text-sm text-muted md:text-right">
          Laissez un commentaire, une impression ou un mot sur l&apos;univers photographique.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-14 md:gap-10">
        {/* Messages */}
        <section className="md:col-span-8 order-2 md:order-1">
          <p className="kicker text-muted mb-8">
            {loading ? 'Chargement…' : `${comments.length} message${comments.length > 1 ? 's' : ''}`}
          </p>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-6" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-paper-deep animate-pulse" />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="py-16 text-center text-muted border border-dashed border-line">
              Aucun commentaire pour le moment. Soyez le premier à laisser un mot&nbsp;!
            </p>
          ) : (
            <ul className="sm:columns-2 gap-6">
              {comments.map((comment) => (
                <li key={comment.id} className="break-inside-avoid mb-6 bg-paper-deep p-7">
                  <span className="font-serif text-5xl leading-none text-line" aria-hidden>“</span>
                  <p className="-mt-2 font-serif text-xl leading-relaxed">{comment.content}</p>
                  <div className="mt-6 pt-4 border-t border-line flex justify-between gap-4 kicker">
                    <span>{comment.author}</span>
                    <span className="text-muted font-normal">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Formulaire */}
        <aside className="md:col-span-4 order-1 md:order-2">
          <div className="md:sticky md:top-8 border border-ink p-6 md:p-8">
            <h2 className="font-serif text-3xl">Laisser un mot</h2>

            {successMessage && (
              <p className="mt-4 bg-ink text-paper px-4 py-3 text-sm animate-rise" role="status">
                Merci&nbsp;! Votre commentaire a bien été publié.
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="author" className={labelClass}>Nom / pseudo</label>
                <input
                  id="author"
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={inputClass}
                  placeholder="Ex : Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="content" className={labelClass}>Commentaire</label>
                <textarea
                  id="content"
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Partagez votre avis…"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-ink text-paper py-4 kicker hover:bg-black transition disabled:opacity-50"
              >
                {sending ? 'Publication…' : 'Publier →'}
              </button>
              <p className="text-xs text-muted leading-relaxed">
                Votre nom et votre commentaire seront visibles publiquement sur cette page. Voir la{' '}
                <Link href="/confidentialite" className="underline underline-offset-2 hover:text-ink">
                  politique de confidentialité
                </Link>
                .
              </p>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
