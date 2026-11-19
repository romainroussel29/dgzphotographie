'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { supabase } from '@/lib/supabase/client';
import { SITE_NAME } from '@/lib/site';
import type { Gallery, Photo } from '@/lib/types';

/** Transforme un titre en identifiant d'URL : « Portraits d'été » → « portraits-d-ete ». */
const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '-');

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));

/**
 * Tableau de bord : gestion des galeries (création, ordre, suppression) et de leurs photos.
 * Les pages publiques lisent Supabase directement : les changements y sont visibles immédiatement.
 */
export default function AdminDashboardPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchGalleries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('position', { ascending: true })
        .order('created_at', { ascending: true });
      if (error) throw error;

      const list = data ?? [];
      setGalleries(list);
      setSelectedGalleryId((current) =>
        list.some((g) => g.id === current) ? current : (list[0]?.id ?? ''),
      );
    } catch (error) {
      console.error('Erreur chargement galeries :', errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPhotos = useCallback(async (galleryId: string) => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPhotos(data ?? []);
    } catch (error) {
      console.error('Erreur chargement photos :', errorMessage(error));
    }
  }, []);

  useEffect(() => {
    // Chargement initial depuis Supabase : la mise à jour d'état est volontaire.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGalleries();
  }, [fetchGalleries]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedGalleryId) fetchPhotos(selectedGalleryId);
  }, [selectedGalleryId, fetchPhotos]);

  const handleAddGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newGalleryTitle.trim();
    if (!title) return;

    try {
      const { error } = await supabase
        .from('galleries')
        .insert([{ id: slugify(title), title, position: galleries.length }]);
      if (error) throw error;

      setNewGalleryTitle('');
      await fetchGalleries();
    } catch (error) {
      console.error('Erreur création galerie :', errorMessage(error));
      alert('Erreur : cette galerie existe peut-être déjà.');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Supprimer cette galerie et ses photos associées ?')) return;
    try {
      const { error } = await supabase.from('galleries').delete().eq('id', id);
      if (error) throw error;
      await fetchGalleries();
    } catch (error) {
      console.error('Erreur suppression :', errorMessage(error));
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= galleries.length) return;

    const reordered = [...galleries];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setGalleries(reordered);

    try {
      for (let i = 0; i < reordered.length; i++) {
        const { error } = await supabase.from('galleries').update({ position: i }).eq('id', reordered[i].id);
        if (error) throw error;
      }
    } catch (error) {
      console.error('Erreur lors du réordonnancement :', errorMessage(error));
      fetchGalleries();
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const extension = file.name.split('.').pop();
      const filePath = `${selectedGalleryId}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage.from('photos').upload(filePath, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('photos').getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('photos')
        .insert([{ gallery_id: selectedGalleryId, name: file.name, url: publicUrl }]);
      if (dbError) throw dbError;

      // La première photo d'une galerie devient sa couverture.
      const gallery = galleries.find((g) => g.id === selectedGalleryId);
      if (gallery && !gallery.cover_image) {
        await supabase.from('galleries').update({ cover_image: publicUrl }).eq('id', selectedGalleryId);
        await fetchGalleries();
      }

      await fetchPhotos(selectedGalleryId);
      alert('Photo téléchargée avec succès !');
    } catch (error) {
      console.error('Erreur upload :', errorMessage(error));
      alert('Erreur lors du téléchargement de la photo.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Supprimer cette photo ?')) return;
    try {
      const { error } = await supabase.from('photos').delete().eq('id', photoId);
      if (error) throw error;
      await fetchPhotos(selectedGalleryId);
    } catch (error) {
      console.error('Erreur suppression photo :', errorMessage(error));
    }
  };

  const currentGallery = galleries.find((g) => g.id === selectedGalleryId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <div className="flex items-center space-x-4">
          <h1 className="flex items-center gap-3 text-xl font-light tracking-widest uppercase">
            <Logo light decorative sizes="96px" className="w-24" />
            <span>Admin</span>
            <span className="sr-only">{SITE_NAME}</span>
          </h1>
          <span className="text-[10px] uppercase tracking-widest bg-neutral-900 text-neutral-400 px-2.5 py-1 border border-neutral-800">
            Connecté à Supabase
          </span>
        </div>
        <nav className="space-x-8 text-sm tracking-wider" aria-label="Administration">
          <Link href="/" className="text-neutral-500 hover:text-white transition">
            Voir le site
          </Link>
          <Link href="/admin/login" className="text-red-400 hover:text-red-300 transition">
            Déconnexion
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 flex-grow w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-extralight tracking-wide mb-2">Panneau d&apos;administration</h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light">
            Gérez vos dossiers, réordonnez-les et ajoutez vos photographies en direct.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-neutral-600 italic">Chargement des données…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Galeries : sélection, ordre, suppression, création */}
            <section aria-labelledby="titre-galeries" className="bg-neutral-900 border border-neutral-800 p-6">
              <h3 id="titre-galeries" className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Galeries ({galleries.length})
              </h3>

              <ul className="space-y-1 mb-6 max-h-72 overflow-y-auto pr-1">
                {galleries.map((gallery, index) => (
                  <li
                    key={gallery.id}
                    className="flex items-center justify-between bg-neutral-950/40 border border-neutral-900 px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryId(gallery.id)}
                      aria-pressed={selectedGalleryId === gallery.id}
                      className={`text-left text-xs tracking-wider truncate flex-grow transition ${
                        selectedGalleryId === gallery.id ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {gallery.title}
                    </button>

                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        type="button"
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="text-[10px] text-neutral-500 hover:text-white disabled:opacity-20 transition px-1"
                        aria-label={`Monter « ${gallery.title} »`}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === galleries.length - 1}
                        className="text-[10px] text-neutral-500 hover:text-white disabled:opacity-20 transition px-1"
                        aria-label={`Descendre « ${gallery.title} »`}
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGallery(gallery.id)}
                        className="text-[10px] text-neutral-600 hover:text-red-400 ml-1 transition px-1"
                        aria-label={`Supprimer « ${gallery.title} »`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddGallery} className="pt-4 border-t border-neutral-800">
                <label
                  htmlFor="new-gallery"
                  className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2"
                >
                  Ajouter un dossier
                </label>
                <div className="flex space-x-2">
                  <input
                    id="new-gallery"
                    type="text"
                    required
                    value={newGalleryTitle}
                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                    placeholder="Nom du dossier…"
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                  />
                  <button
                    type="submit"
                    aria-label="Créer le dossier"
                    className="bg-white text-black px-4 text-xs font-medium hover:bg-neutral-200 transition"
                  >
                    +
                  </button>
                </div>
              </form>
            </section>

            {/* Photos du dossier sélectionné */}
            <section
              aria-labelledby="titre-photos"
              className="md:col-span-2 bg-neutral-900 border border-neutral-800 p-8"
            >
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6">
                <h3 id="titre-photos" className="text-sm uppercase tracking-widest text-white">
                  Dossier actif : <span className="text-neutral-400">{currentGallery?.title ?? 'Aucun'}</span>
                </h3>

                <label
                  className={`cursor-pointer bg-white text-black px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-neutral-200 transition focus-within:outline focus-within:outline-white ${
                    uploading || !selectedGalleryId ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {uploading ? 'Envoi…' : '+ Ajouter une photo'}
                  <input type="file" accept="image/*" onChange={handleUploadPhoto} className="sr-only" />
                </label>
              </div>

              {photos.length === 0 ? (
                <p className="text-xs text-neutral-500 italic py-12 text-center">
                  Aucune photo dans ce dossier pour le moment. Cliquez sur « Ajouter une photo » ci-dessus.
                </p>
              ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                  {photos.map((photo) => (
                    <li
                      key={photo.id}
                      className="relative group bg-neutral-950 border border-neutral-800 h-32 overflow-hidden"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.name ?? ''}
                        fill
                        sizes="200px"
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2 right-2 bg-neutral-950/80 text-white w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition hover:bg-red-600"
                        aria-label={`Supprimer la photo ${photo.name ?? ''}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 {SITE_NAME} - Tous droits réservés.
      </footer>
    </div>
  );
}
