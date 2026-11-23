import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Client Supabase, utilisable uniquement dans le navigateur (composants 'use client').
 *
 * Le site est exporté en fichiers statiques : il n'y a pas de serveur Node.js, donc toutes les lectures
 * et écritures partent du navigateur avec la clé publique « anon ». La sécurité des données repose
 * entièrement sur les règles RLS (Row Level Security) configurées dans Supabase.
 *
 * Exemple :
 *   const { data, error } = await getSupabase().from('messages').select('*');
 */
let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase non configuré : renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans site/.env.local, puis relancer npm run dev ou npm run build.',
    );
  }

  client = createClient<Database>(url, key);
  return client;
}
