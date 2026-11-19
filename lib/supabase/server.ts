import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase pour le serveur (lecture des données publiques, actions serveur).
 * Pas de session ni de rafraîchissement de jeton : chaque requête est anonyme.
 */
export function createServerClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
