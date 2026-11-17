'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full bg-transparent border-0 border-b border-neutral-800 px-0 py-3 text-base text-white placeholder:text-neutral-700 focus:outline-none focus:border-white transition';
const labelClass = 'block text-[10px] uppercase tracking-[0.3em] text-neutral-500';

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
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <header className="mb-16 md:mb-24 animate-fade-up">
        <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">Livre d&apos;or</p>
        <h1 className="font-serif font-light text-5xl md:text-7xl text-white leading-none">Vos mots.</h1>
        <p className="mt-8 text-neutral-400 font-light leading-relaxed max-w-lg">
          Laissez un commentaire, une impression ou un mot sur l&apos;univers photographique.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-16 md:gap-12">
        {/* Formulaire */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-neutral-300 mb-8">Laisser un message</h2>

            {successMessage && (
              <p className="mb-8 border-l border-white pl-4 text-sm text-neutral-300 font-light animate-fade-up" role="status">
                Merci&nbsp;! Votre commentaire a bien été publié.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label htmlFor="author" className={labelClass}>Votre nom / pseudo</label>
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
                <label htmlFor="content" className={labelClass}>Votre commentaire</label>
                <textarea
                  id="content"
                  rows={4}
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
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-200 transition disabled:opacity-50"
              >
                {sending ? 'Publication…' : 'Publier'}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Liste des commentaires */}
        <section className="md:col-span-6 md:col-start-7">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-8 pb-4 border-b border-neutral-900">
            Messages ({comments.length})
          </h2>

          {loading ? (
            <div className="space-y-10" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-1/3 bg-neutral-900 animate-pulse" />
                  <div className="h-3 w-full bg-neutral-900 animate-pulse" />
                  <div className="h-3 w-2/3 bg-neutral-900 animate-pulse" />
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-neutral-500 font-light py-12">
              Aucun commentaire pour le moment. Soyez le premier à laisser un mot&nbsp;!
            </p>
          ) : (
            <ul className="divide-y divide-neutral-900">
              {comments.map((comment) => (
                <li key={comment.id} className="py-8 first:pt-0">
                  <p className="font-serif font-light text-xl md:text-2xl leading-relaxed text-neutral-200">
                    « {comment.content} »
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
                    <span className="text-neutral-300">{comment.author}</span>
                    <span className="w-6 h-px bg-neutral-700" aria-hidden />
                    <span className="text-neutral-600">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
