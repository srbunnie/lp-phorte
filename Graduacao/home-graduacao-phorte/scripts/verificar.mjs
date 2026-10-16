import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const expectedIds = [32014, 39176, 31985, 32006, 32008, 32010, 32012];
const orders = {
  a: ['hero','catalog','modalities','admissions','testimonials','institution','units','partners','contact','faq','news'],
  b: ['hero','paths','catalog','learning','institution','units','testimonials','contact','partners','news','faq'],
  c: ['hero','paths','catalog','banners','learning','institution','units','testimonials','contact','partners','news','faq'],
};
const json = async p => JSON.parse(await readFile(path.join(root, p), 'utf8'));
let assertions = 0;
function check(condition, message) { assert(condition, message); assertions++; }
try {
  try { await access(path.join(root, 'conteudo/home.json')); } catch { assert.fail('Base editorial home.json ainda não existe.'); }
  const data = await json('conteudo/home.json');
  const variants = await json('conteudo/variantes.json');
  check(data.courses.length === 7, 'Devem existir sete cursos.');
  check(JSON.stringify(data.courses.map(c => c.id)) === JSON.stringify(expectedIds), 'IDs dos sete cursos institucionais divergem.');
  check(new Set(data.courses.map(c => c.href)).size === 7, 'Destinos de cursos duplicados.');
  check(!data.courses.some(c => c.id === 57540 || /teste/i.test(c.title)), 'Curso de teste não pode aparecer.');
  for (const c of data.courses) {
    check(c.href.startsWith('https://faculdadephorte.edu.br/graduacao/'), 'Destino de curso fora do WordPress.');
    check(c.modalities.length > 0 && c.source, 'Curso precisa de modalidade e origem.');
    check(!c.price, 'Preço não confirmado deve ficar ausente.');
    check((!c.duration && !c.degree) || (c.duration && c.degree && c.area && c.metaSource), 'Grau/duração só com área e fonte registrada.');
  }
  check(data.testimonials.length === 6, 'Seleção fixa de seis relatos esperada.');
  check(new Set(data.testimonials.map(t => t.youtubeId)).size === 6, 'Vídeos repetidos.');
  check(data.testimonials.every(t => t.quote && t.name && /^[\w-]{11}$/.test(t.youtubeId)), 'Depoimento incompleto.');
  check(data.partners.length === 8 && data.news.length === 3, 'Parceiros/notícias incompletos.');
  check(data.units.length === 2 && data.units[0].address.includes('Rui Barbosa, 422') && data.units[1].address.includes('Martiniano de Carvalho, 170'), 'Duas unidades confirmadas pelo usuário.');
  for (const v of ['a','b','c']) check(JSON.stringify(variants[v].sections) === JSON.stringify(orders[v]), 'Ordem da variante ' + v + ' diverge.');
  const manifest = await json('assets/manifest.json');
  for (const asset of manifest) { await access(path.join(root, asset.path)); check(asset.source && asset.width > 0 && asset.height > 0, 'Asset sem origem/dimensões: ' + asset.path); }
  if (!process.argv.includes('--conteudo')) {
    for (const v of ['a','b','c']) {
      const html = await readFile(path.join(root, 'previa-' + v + '/index.html'), 'utf8');
      check((html.match(/<h1\b/g) || []).length === 1, 'Um h1 por prévia.');
      const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
      check(ids.length === new Set(ids).size, 'IDs duplicados na versão ' + v);
      check(!html.includes('Curso Teste') && !html.includes('phorte_pos_search') && !html.includes('category_dropdown'), 'Conteúdo de teste/pós na graduação.');
      const renderedOrder = [...html.matchAll(/data-section="([^"]+)"/g)].map(m => m[1]);
      check(JSON.stringify(renderedOrder) === JSON.stringify(orders[v]), 'Ordem HTML diverge da variante.');
      for (const c of data.courses) check(html.includes('data-course-id="' + c.id + '"') && html.includes(c.href), 'Curso ausente na versão ' + v);
      check(html.includes('noindex,nofollow') && html.includes('Prévia visual'), 'Prévia deve informar limite e impedir indexação.');
      for (const m of html.matchAll(/(?:src|href)="(\.\.[^"]+)"/g)) await access(path.resolve(root, 'previa-' + v, m[1].split('#')[0]));
      for (const m of html.matchAll(/href="#([^"]+)"/g)) check(ids.includes(m[1]), 'Âncora sem destino: ' + m[1]);
    }
    for (const piece of ['cabecalho','cabecalho-c','home-a','home-b','home-c','rodape']) {
      const file = piece.startsWith('home') ? '1-antes-atendimento.html' : 'widget-html.html';
      const html = await readFile(path.join(root, 'elementor', piece, file), 'utf8');
      check(!/<(?:html|head|body)\b/i.test(html), 'Fragmento contém documento completo.');
      check(!/(?:src|href)="\.\./.test(html), 'Fragmento com asset local relativo.');
    }
  }
  console.log('PASS — ' + assertions + ' verificações; 7 cursos, 3 variantes e assets locais consistentes.');
} catch (e) { console.error('FAIL — ' + e.message); process.exitCode = 1; }
