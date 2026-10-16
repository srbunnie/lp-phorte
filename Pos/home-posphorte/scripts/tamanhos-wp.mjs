// Lê, pela API pública de mídia do WordPress, os tamanhos que o site gerou para cada imagem publicada
// e grava assets/tamanhos-wp.json. O gerador usa esse arquivo para montar srcset nos widgets.
// Só entram tamanhos com a mesma proporção do original (recortes como thumbnail ficam de fora).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const site = 'https://posphorte.com.br/wp-json/wp/v2/media';
const imagesBase = 'https://posphorte.com.br/wp-content/uploads/2026/10/';
const manifest = JSON.parse(await readFile(path.join(root, 'assets/manifest.json'), 'utf8'));
const result = {};
for (const asset of manifest.filter(a => a.path.startsWith('assets/images/'))) {
  const file = path.basename(asset.path);
  const url = site + '?search=' + encodeURIComponent(file.replace(/\.webp$/, '')) + '&per_page=20&_fields=source_url,media_details';
  const media = await (await fetch(url)).json();
  const item = Array.isArray(media) && media.find(m => m.source_url === imagesBase + file);
  if (!item) { console.warn('Sem registro na biblioteca: ' + file); continue; }
  const { width, height, sizes = {} } = item.media_details;
  const ratio = width / height;
  const widths = Object.values(sizes)
    .filter(s => s.source_url.startsWith(imagesBase) && s.width < width && Math.abs(s.width / s.height - ratio) / ratio < 0.01)
    .map(s => ({ width: s.width, file: s.source_url.slice(imagesBase.length) }));
  result[file] = { width, height, sizes: [...new Map(widths.map(s => [s.width, s])).values()].sort((a, b) => a.width - b.width) };
}
await writeFile(path.join(root, 'assets/tamanhos-wp.json'), JSON.stringify({ imagesBase, gerado: new Date().toISOString().slice(0, 10), imagens: result }, null, 2) + '\n');
console.log('Tamanhos lidos para ' + Object.keys(result).length + ' imagens.');
