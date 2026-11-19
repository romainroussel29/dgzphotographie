/** Numéro sur deux chiffres, façon magazine : 1 → « 01 ». */
export const pad2 = (n: number) => String(n).padStart(2, '0');

/** Date courte en français : « 19 nov. 2026 ». */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
