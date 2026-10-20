import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = file => readFileSync(path.join(root, file), 'utf8');
assert.ok(existsSync(path.join(root, 'index.html')), 'A prévia HTML precisa existir.');
const html = read('index.html');
const data = JSON.parse(read('conteudo/home.json'));
const publication = JSON.parse(read('elementor/assets-publicacao.json'));
const css = ['base', 'cabecalho', 'home', 'rodape'].map(name => read('styles/' + name + '.css')).join('\n');
const js = read('js/cabecalho.js') + read('js/home.js');
const widget = {
  cabecalho: read('elementor/cabecalho/widget-html.html'),
  hero: read('elementor/home/1-hero-widget-html.html'),
  busca: read('elementor/home/2-busca-widget-shortcode.txt').trim(),
  secoes: read('elementor/home/3-secoes-widget-html.html'),
  rodape: read('elementor/rodape/widget-html.html')
};
const template = {
  cabecalho: JSON.parse(read('elementor/cabecalho/template-elementor.json')),
  home: JSON.parse(read('elementor/home/template-elementor.json')),
  rodape: JSON.parse(read('elementor/rodape/template-elementor.json'))
};
const wpSizes = existsSync(path.join(root, 'assets/tamanhos-wp.json')) ? JSON.parse(read('assets/tamanhos-wp.json')).imagens : {};
// Mesma regra do gerador: na prévia, srcset de várias larguras volta ao original (<source>) ou sai (<img>).
const previewImages = html => html.replace(/ srcset="([^"]*, [^"]*)"(?: sizes="[^"]*")?/g, (all, list, offset, str) =>
  str.startsWith('<source', str.lastIndexOf('<', offset)) ? ' srcset="' + list.split(', ').pop().split(' ')[0] + '"' : '');
const piece = (file, id) => file.match(new RegExp('<div id="' + id + '"[\\s\\S]*?<\\/div><!-- fim-' + id + ' -->'))?.[0];
const ids = file => [...file.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);

// Prévia completa: cabeçalho, home (hero, busca, seções) e rodapé na mesma página.
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página precisa de um único H1.');
assert.deepEqual(data.groups.map(g => g.items.length), [13, 9, 6]);
const previewIds = ids(html);
assert.equal(new Set(previewIds).size, previewIds.length, 'IDs precisam ser únicos na página completa.');
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(previewIds.includes(anchor), `Âncora inexistente: ${anchor}`);
assert.ok(!/href="#"|href=""/.test(html), 'Sem links vazios.');
assert.ok(/<div id="hp-home-hero"[\s\S]*<div id="hp-busca" class="hp-search-slot">[\s\S]*<div id="hp-home-secoes"/.test(html), 'Busca entre o hero e as seções.');

// Cada peça do Elementor corresponde à prévia, com URLs absolutas de assets.
for (const [name, id] of [['cabecalho', 'hp-cabecalho'], ['hero', 'hp-home-hero'], ['secoes', 'hp-home-secoes'], ['rodape', 'hp-rodape']]) {
  const preview = piece(html, id), fragment = piece(widget[name], id);
  assert.ok(preview && fragment, `Peça ${name} ausente.`);
  assert.equal(preview, previewImages(fragment.replaceAll(publication.imagens, 'assets/images/')), `A peça ${name} precisa ter o mesmo conteúdo da prévia.`);
  for (const [, attr] of widget[name].matchAll(/(?:src|srcset)="([^"]+)"/g)) for (const entry of attr.split(', ')) {
    const [url, descriptor] = entry.split(' ');
    const file = url.slice(publication.imagens.length);
    assert.ok(url.startsWith(publication.imagens), `${name}: imagem fora da pasta publicada: ${url}`);
    // Versões menores existem só no site: precisam constar nos tamanhos lidos do WordPress.
    const known = existsSync(path.join(root, 'assets/images', file)) || Object.values(wpSizes).some(i => i.sizes.some(s => s.file === file && descriptor === s.width + 'w'));
    assert.ok(known, `${name}: imagem sem arquivo local nem tamanho do WordPress: ${entry}`);
  }
  if (publication.fontes) for (const [, url] of widget[name].matchAll(/url\("([^"]+\.woff2)"\)/g)) assert.ok(url.startsWith(publication.fontes), `${name}: fonte fora da pasta publicada.`);
  else assert.ok(!/\.woff2|font-family:PhorteHomePoppins;/.test(widget[name]), `${name}: sem fontes publicadas, o widget usa a Poppins do site.`);
  if (/<style>/.test(widget[name])) assert.ok(/font-family:PhortePoppinsFallback;src:local\("Arial"\)/.test(widget[name]), `${name}: fallback da Poppins ajustado para evitar mudança de layout.`);
  assert.ok(!/(?:src|href|srcset)="(?:\.\/)?assets\/|\.\.\/assets\//.test(widget[name]), `${name}: o Elementor precisa de URLs absolutas.`);
  for (const [tag] of widget[name].matchAll(/<img\b[^>]*>/g)) assert.ok(/class="[^"]*\bno-lazyload\b/.test(tag), `${name}: imagem sem no-lazyload (o Smush descartaria o srcset): ${tag.slice(0, 80)}`);
  assert.ok(!/<html|<body|<head>|<link|<main\b/.test(widget[name]), `${name}: o widget precisa ser um fragmento.`);
  assert.ok(!/<form\b|type="submit"/.test(widget[name]), `${name}: sem formulário próprio; a busca vem do shortcode.`);
  assert.ok(!/R\$|pravatar|Matrículas Abertas 2024|admin-ajax|Busca demonstrativa/.test(widget[name]));
}
assert.equal(widget.busca, '<div id="hp-busca" class="hp-search-slot">[phorte_pos_search]</div>', 'Widget Shortcode da busca.');
assert.ok(!/category_dropdown/.test(Object.values(widget).join('')), 'Não usar o shortcode antigo.');

// Cabeçalho e rodapé funcionam fora da home: sem âncoras locais além do atalho de conteúdo.
for (const [, anchor] of widget.cabecalho.matchAll(/href="#([^"]+)"/g)) assert.equal(anchor, 'hp-main', 'Cabeçalho só pode usar o atalho #hp-main.');
assert.ok(!/href="#/.test(widget.rodape), 'Rodapé sem âncoras locais.');
assert.equal((widget.cabecalho.match(/class="hp-dropdown-chevron"/g) || []).length, 4, 'Menus precisam das setas SVG.');
assert.ok(/<style>[\s\S]*#hp-cabecalho[\s\S]*<\/style>[\s\S]*<script>/.test(widget.cabecalho), 'Cabeçalho com estilos e script próprios.');
assert.ok(/<style>[\s\S]*#hp-rodape[\s\S]*<\/style>/.test(widget.rodape) && !/<script/.test(widget.rodape), 'Rodapé com estilos próprios, sem script.');
assert.ok(/<style>[\s\S]*<script>/.test(widget.hero) && !/<style|<script/.test(widget.secoes), 'Estilos e script da home no widget do hero.');
// Os estilos de um widget não podem atingir as peças dos outros (a ordem na página mudaria o resultado).
const styleOf = file => file.match(/<style>([\s\S]*?)<\/style>/)[1];
for (const [name, foreign] of [['cabecalho', /#hp-(home-hero|home-secoes|rodape)\b/], ['hero', /#hp-(cabecalho|rodape)\b/], ['rodape', /#hp-(cabecalho|home-hero|home-secoes)\b/]]) {
  assert.ok(!foreign.test(styleOf(widget[name])), `${name}: CSS precisa ficar restrito à própria peça.`);
}

// Conteúdo da home.
const home = widget.hero + widget.secoes;
assert.equal((home.match(/data-course-card/g) || []).length, 28);
assert.equal((home.match(/data-highlight-card/g) || []).length, 6);
assert.equal((home.match(/data-coordinator/g) || []).length, 5);
assert.equal((home.match(/data-video=/g) || []).length, 4);
assert.equal((home.match(/data-news-card/g) || []).length, 3);
for (const group of data.groups) for (const c of group.items) assert.ok(home.includes(c.url));
assert.equal((html.match(/data-hero-slide data-active=/g) || []).length, 3, 'O hero precisa dos três slides aprovados.');
assert.ok(!/>ÁREA 0?[123]</.test(html), 'Sem numeração das áreas no catálogo.');

// Templates JSON importáveis.
const widgetsOf = t => t.content.flatMap(c => c.elements);
assert.deepEqual(widgetsOf(template.cabecalho).map(w => w.widgetType), ['html']);
assert.deepEqual(widgetsOf(template.rodape).map(w => w.widgetType), ['html']);
assert.deepEqual(widgetsOf(template.home).map(w => w.widgetType), ['html', 'shortcode', 'html']);
assert.equal(widgetsOf(template.cabecalho)[0].settings.html, widget.cabecalho);
assert.equal(widgetsOf(template.rodape)[0].settings.html, widget.rodape);
assert.deepEqual(widgetsOf(template.home).map(w => w.settings.html ?? w.settings.shortcode), [widget.hero, widget.busca, widget.secoes]);
const elementIds = Object.values(template).flatMap(t => [...t.content, ...widgetsOf(t)].map(e => e.id));
assert.equal(new Set(elementIds).size, elementIds.length, 'IDs dos elementos Elementor precisam ser únicos.');

// Assets e scripts.
for (const [, relative] of html.matchAll(/(?:src|poster|srcset)="(assets\/[^"?#]+)"/g)) assert.ok(existsSync(path.join(root, relative)), `Asset ausente: ${relative}`);
for (const [, relative] of css.matchAll(/url\(["']?(?:\.\.\/)?(assets\/[^"')]+)["']?\)/g)) assert.ok(existsSync(path.join(root, relative)), 'Fonte ou imagem CSS ausente: ' + relative);
for (const list of Object.values(publication.pecas)) for (const relative of list) assert.ok(existsSync(path.join(root, relative)), 'Asset da peça ausente: ' + relative);
assert.ok(!css.includes('#home-posphorte') && !css.includes('transition: all'));
assert.ok(!/fetch\(|XMLHttpRequest|dataLayer|gtag\(/.test(js), 'Protótipo sem integração de produção.');
console.log('PASS: cabeçalho, home e rodapé separados; busca via [phorte_pos_search]; conteúdo, âncoras, assets, templates e equivalência Elementor.');
