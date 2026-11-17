'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simulation de connexion (on branchera Supabase Auth ici plus tard)
    if (email === 'admin@dgz.com' && password === 'password123') {
      // Redirection vers le dashboard admin
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      {/* En-tête */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <Link href="/" className="text-xl font-light tracking-widest uppercase hover:text-neutral-400 transition">
          DGZ Photographie
        </Link>
        <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300 tracking-wider transition">
          ← Retour au site
        </Link>
      </header>

      {/* Formulaire de connexion */}
      <main className="max-w-md mx-auto px-6 py-20 flex-grow w-full flex flex-col justify-center">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extralight tracking-wide mb-2">Administration</h2>
          <p className="text-neutral-500 text-xs tracking-wider uppercase">
            Espace réservé à l'administration du portfolio
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8">
          {error && (
            <div className="mb-6 p-3 bg-neutral-950 border border-red-900/50 text-xs text-red-400 text-center tracking-wider">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="admin@dgz.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Mot de passe</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center text-[10px] text-neutral-600 tracking-wider">
            Test : admin@dgz.com / password123
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 DGZ Photographie - Tous droits réservés.
      </footer>
    </div>
  );
}