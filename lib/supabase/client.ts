import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase pour le navigateur (espace admin : envoi de photos, gestion des galeries).
 * Les pages publiques lisent les données côté serveur : voir `lib/supabase/server.ts`.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
