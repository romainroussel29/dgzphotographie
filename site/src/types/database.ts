/**
 * Types des tables Supabase.
 *
 * Aucune table n'est encore utilisée par le site. Une fois les tables créées, régénérer ce fichier avec :
 *   npx supabase gen types typescript --project-id <identifiant-du-projet> > site/src/types/database.ts
 */
export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
