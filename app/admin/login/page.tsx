'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { SITE_NAME } from '@/lib/site';

const inputClass =
  'w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

/**
 * Connexion à l'espace admin.
 * ⚠ Connexion simulée côté navigateur : elle ne protège rien. À remplacer par Supabase Auth.
 */
export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@dgz.com' && password === 'password123') {
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <Link href="/" aria-label={`${SITE_NAME} — Accueil`} className="hover:opacity-70 transition">
          <Logo light decorative sizes="96px" className="w-24" />
        </Link>
        <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300 tracking-wider transition">
          ← Retour au site
        </Link>
      </header>

      <main className="max-w-md mx-auto px-6 py-20 flex-grow w-full flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-extralight tracking-wide mb-2">Administration</h1>
          <p className="text-neutral-500 text-xs tracking-wider uppercase">
            Espace réservé à l&apos;administration du portfolio
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8">
          {error && (
            <p
              role="alert"
              className="mb-6 p-3 bg-neutral-950 border border-red-900/50 text-xs text-red-400 text-center tracking-wider"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="admin-email" className={labelClass}>
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@dgz.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className={labelClass}>
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
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

          <p className="mt-6 text-center text-[10px] text-neutral-600 tracking-wider">
            Test : admin@dgz.com / password123
          </p>
        </div>
      </main>

      <footer className="text-center py-8 border-t border-neutral-900 text-xs text-neutral-600 tracking-wider">
        © 2026 {SITE_NAME} - Tous droits réservés.
      </footer>
    </div>
  );
}
