// Types des tables Supabase utilisées par le site.

export type Gallery = {
  id: string;
  title: string;
  cover_image: string | null;
  position: number | null;
  created_at: string;
};

export type Photo = {
  id: string;
  gallery_id: string;
  url: string;
  name: string | null;
  created_at: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};
