'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Import de votre client Supabase

export default function CommentairesPage() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  // Charger les commentaires depuis Supabase au chargement de la page
  useEffect(() => {
    fetchComments();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    try {
      // Envoyer le commentaire dans la base de données Supabase
      const { data, error } = await supabase
        .from('comments')
        .insert([{ author, content }])
        .select();

      if (error) throw error;

      // Ajouter le nouveau commentaire en haut de la liste locale
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
      console.error('Erreur lors de l\'envoi du commentaire:', error.message);
      alert('Une erreur est survenue lors de l\'envoi du commentaire.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      {/* En-tête du site */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <Link href="/" className="text-xl font-light tracking-widest uppercase hover:text-neutral-400 transition">
          DGZ Photographie
        </Link>
        <nav className="space-x-8 text-sm tracking-wider">
          <Link href="/" className="hover:text-neutral-400 transition">Accueil</Link>
          <Link href="/galerie" className="hover:text-neutral-400 transition">Galeries</Link>
          <Link href="/contact" className="hover:text-neutral-400 transition">Contact</Link>
          <Link href="/commentaires" className="text-white font-medium">Commentaires</Link>
          <Link href="/admin/login" className="hover:text-neutral-400 transition text-neutral-600">Admin</Link>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-2xl mx-auto px-6 py-20 flex-grow w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-wide mb-4">Livre d'or</h2>
          <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide">
            Laissez un commentaire, une impression ou un mot sur l'univers photographique.
          </p>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 mb-16">
          <h3 className="text-sm uppercase tracking-widest text-neutral-300 mb-6">Laisser un message</h3>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-neutral-950 border border-neutral-700 text-xs text-neutral-300 tracking-wider text-center">
              Merci ! Votre commentaire a bien été publié sur Supabase.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Votre nom / pseudo</label>
              <input 
                type="text" 
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="Ex: Jean Dupont"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Votre commentaire</label>
              <textarea 
                rows="4" 
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition resize-none"
                placeholder="Partagez votre avis..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              Publier le commentaire
            </button>
          </form>
        </div>

        {/* Liste des commentaires */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Messages ({comments.length})</h3>
          
          {loading ? (
            <p className="text-xs text-neutral-600 italic text-center py-8">Chargement des messages...</p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-neutral-600 italic text-center py-8">
              Aucun commentaire pour le moment. Soyez le premier à laisser un mot !
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-neutral-900/50 border border-neutral-900 p-6 transition hover:border-neutral-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-light text-white tracking-wide">{comment.author}</span>
                  <span className="text-[10px] text-neutral-500 tracking-wider uppercase">
                    {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}