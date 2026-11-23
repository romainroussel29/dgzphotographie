// Lancé par `npm run build` après `next build` : recopie l'export statique (site/out/) dans public/,
// le seul dossier à envoyer sur OVH. public/ est entièrement regénéré : ne rien y modifier à la main.
import { cpSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const from = fileURLToPath(new URL('../site/out/', import.meta.url));
const to = fileURLToPath(new URL('../public/', import.meta.url));

if (!existsSync(`${from}index.html`)) {
  console.error('Export introuvable dans site/out/ : public/ n’a pas été modifié.');
  process.exit(1);
}

rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true });
console.log('Site prêt dans public/ : envoyer son contenu dans www/ sur OVH (fichier caché .htaccess compris).');
