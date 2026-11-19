'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import { supabase } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    if (selectedGalleryId) {
      fetchPhotos(selectedGalleryId);
    }
  }, [selectedGalleryId]);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('position', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setGalleries(data);
        if (!selectedGalleryId || !data.some(g => g.id === selectedGalleryId)) {
          setSelectedGalleryId(data[0].id);
        }
      } else {
        setGalleries([]);
      }
    } catch (error) {
      console.error('Erreur chargement galeries:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async (galleryId) => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Erreur chargement photos:', error.message);
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle.trim()) return;

    const id = newGalleryTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-');
    const newPosition = galleries.length;

    try {
      const { error } = await supabase
        .from('galleries')
        .insert([{ id, title: newGalleryTitle, position: newPosition }]);

      if (error) throw error;

      setNewGalleryTitle('');
      fetchGalleries();
    } catch (error) {
      console.error('Erreur création galerie:', error.message);
      alert('Erreur : Cette galerie existe peut-être déjà.');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (confirm("Supprimer cette galerie et ses photos associées ?")) {
      try {
        const { error } = await supabase.from('galleries').delete().eq('id', id);
        if (error) throw error;
        fetchGalleries();
      } catch (error) {
        console.error('Erreur suppression:', error.message);
      }
    }
  };

  const handleMove = async (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= galleries.length) return;

    const updatedGalleries = [...galleries];
    const temp = updatedGalleries[index];
    updatedGalleries[index] = updatedGalleries[newIndex];
    updatedGalleries[newIndex] = temp;

    setGalleries(updatedGalleries);

    try {
      for (let i = 0; i < updatedGalleries.length; i++) {
        await supabase
          .from('galleries')
          .update({ position: i })
          .eq('id', updatedGalleries[i].id);
      }
    } catch (error) {
      console.error('Erreur lors du réordonnancement:', error.message);
      fetchGalleries();
    }
  };

  const handleUploadPhoto = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${selectedGalleryId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('photos')
        .insert([{ gallery_id: selectedGalleryId, name: file.name, url: publicUrl }]);

      if (dbError) throw dbError;

      const currentGal = galleries.find(g => g.id === selectedGalleryId);
      if (currentGal && !currentGal.cover_image) {
        await supabase
          .from('galleries')
          .update({ cover_image: publicUrl })
          .eq('id', selectedGalleryId);
        fetchGalleries();
      }

      fetchPhotos(selectedGalleryId);
      alert('Photo téléchargée avec succès !');
    } catch (error) {
      console.error('Erreur upload:', error.message);
      alert('Erreur lors du téléchargement de la photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (confirm("Supprimer cette photo ?")) {
      try {
        const { error } = await supabase.from('photos').delete().eq('id', photoId);
        if (error) throw error;
        fetchPhotos(selectedGalleryId);
      } catch (error) {
        console.error('Erreur suppression photo:', error.message);
      }
    }
  };

  const currentGallery = galleries.find(g => g.id === selectedGalleryId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <div className="flex items-center space-x-4">
          <h1 className="flex items-center gap-3 text-xl font-light tracking-widest uppercase">
            <Logo light decorative sizes="96px" className="w-24" />
            <span>Admin</span>
            <span className="sr-only">DGZ Photographie</span>
          </h1>
          <span className="text-[10px] uppercase tracking-widest bg-neutral-900 text-neutral-400 px-2.5 py-1 border border-neutral-800">
            Connecté à Supabase
          </span>
        </div>
        <nav className="space-x-8 text-sm tracking-wider">
          <Link href="/" className="text-neutral-500 hover:text-white transition">Voir le site</Link>
          <Link href="/admin/login" className="text-red-400 hover:text-red-300 transition">Déconnexion</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 flex-grow w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-extralight tracking-wide mb-2">Panneau d'Administration</h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light">
            Gérez vos dossiers, réordonnez-les et ajoutez vos photographies en direct.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-neutral-600 italic">Chargement des données...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* GAUCHE : Gestion et ordre des Galeries */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Galeries ({galleries.length})</h3>

                <ul className="space-y-1 mb-6 max-h-72 overflow-y-auto pr-1">
                  {galleries.map((gal, index) => (
                    <li key={gal.id} className="flex items-center justify-between group bg-neutral-950/40 border border-neutral-900 px-3 py-2">
                      <button
                        onClick={() => setSelectedGalleryId(gal.id)}
                        className={`text-left text-xs tracking-wider truncate flex-grow transition ${
                          selectedGalleryId === gal.id
                            ? 'text-white font-medium'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {gal.title}
                      </button>

                      <div className="flex items-center space-x-1 ml-2">
                        <button 
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0}
                          className="text-[10px] text-neutral-500 hover:text-white disabled:opacity-20 transition px-1"
                          title="Monter"
                        >
                          ▲
                        </button>
                        <button 
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === galleries.length - 1}
                          className="text-[10px] text-neutral-500 hover:text-white disabled:opacity-20 transition px-1"
                          title="Descendre"
                        >
                          ▼
                        </button>
                        <button 
                          onClick={() => handleDeleteGallery(gal.id)}
                          className="text-[10px] text-neutral-600 hover:text-red-400 ml-1 transition px-1"
                          title="Supprimer"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleAddGallery} className="pt-4 border-t border-neutral-800">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Ajouter un dossier</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      required
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      placeholder="Nom du dossier..."
                      className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                    />
                    <button type="submit" className="bg-white text-black px-4 text-xs font-medium hover:bg-neutral-200 transition">+</button>
                  </div>
                </form>
              </div>
            </div>

            {/* DROITE : Gestion des photos du dossier actif */}
            <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6">
                  <h3 className="text-sm uppercase tracking-widest text-white">
                    Dossier actif : <span className="text-neutral-400">{currentGallery ? currentGallery.title : 'Aucun'}</span>
                  </h3>

                  <label className={`cursor-pointer bg-white text-black px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-neutral-200 transition ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading ? 'Envoi...' : '+ Ajouter une photo'}
                    <input type="file" accept="image/*" onChange={handleUploadPhoto} className="hidden" />
                  </label>
                </div>

                {photos.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic py-12 text-center">
                    Aucune photo dans ce dossier pour le moment. Cliquez sur "Ajouter une photo" ci-dessus.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group bg-neutral-950 border border-neutral-800 h-32 overflow-hidden flex items-center justify-center">
                        <img src={photo.url} alt={photo.name} className="w-full h-full object-contain" />
                        <button 
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-2 right-2 bg-neutral-950/80 text-white w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                          title="Supprimer la photo"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}