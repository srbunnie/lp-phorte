import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const data = JSON.parse(await readFile(path.join(root, 'conteudo/home.json')));
// Tamanhos que o WordPress gerou para cada imagem publicada (scripts/tamanhos-wp.mjs) viram srcset nos widgets.
// A prévia local usa só o original, porque as versões menores existem apenas no site.
const wpSizesPath = path.join(root, 'assets/tamanhos-wp.json');
const wpSizes = existsSync(wpSizesPath) ? JSON.parse(await readFile(wpSizesPath, 'utf8')).imagens : {};
const srcsetList = a => {
  const info = wpSizes[path.basename(a.path)];
  if (!info?.sizes.length) return '';
  const dir = path.posix.dirname(a.path) + '/';
  return [...info.sizes.map(s => dir + s.file + ' ' + s.width + 'w'), a.path + ' ' + info.width + 'w'].join(', ');
};
const responsive = (a, sizes) => (sizes && srcsetList(a) ? ' srcset="' + srcsetList(a) + '" sizes="' + sizes + '"' : '');
const imageSizes = {
  highlight: '(min-width: 1240px) 384px, (min-width: 1024px) calc(33vw - 29px), (min-width: 768px) calc(50vw - 32px), calc(100vw - 40px)',
  heroPreview: '92px',
  heroArt: '(max-width: 767px) min(330px, calc(100vw - 40px)), 480px',
  full: '100vw'
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const chevron = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 4 8 8-8 8"/></svg>';
const chevronDown = '<svg class="hp-dropdown-chevron" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
const search = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="7.3"/><path d="m16 16 5 5"/></svg>';
const image = (a, alt = '', cls = '', eager = false, sizes = '') => '<img src="' + esc(a.path) + '"' + responsive(a, sizes) + ' width="' + a.width + '" height="' + a.height + '" alt="' + esc(alt) + '" class="' + cls + '" decoding="async"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + '>';
const link = (text, url, cls = '') => '<a class="' + cls + '" href="' + esc(url) + '">' + esc(text) + '</a>';
const buttonLink = (text, url, cls = '') => '<a class="hp-button ' + cls + '" href="' + esc(url) + '">' + esc(text) + arrow + '</a>';
const socialIcons = {
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.1"/>',
  Facebook: '<path d="M14 22v-9h3l.5-3.5H14V7.3c0-1 .3-1.8 1.8-1.8h1.9V2.3A23 23 0 0 0 15 2c-2.7 0-4.5 1.7-4.5 4.8v2.7H7.5V13h3v9Z"/>',
  YouTube: '<path d="M21.6 7.1a3 3 0 0 0-2.1-2.2C17.7 4.4 12 4.4 12 4.4s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.2A32 32 0 0 0 2 12a32 32 0 0 0 .4 4.9 3 3 0 0 0 2.1 2.2c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.2A32 32 0 0 0 22 12a32 32 0 0 0-.4-4.9ZM10 15.5v-7l6 3.5Z"/>'
};
const socialLink = (name, url) => '<a href="' + esc(url) + '" aria-label="' + name + ' da Pós Phorte" title="' + name + '"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + socialIcons[name] + '</svg></a>';
const modalities = [
  ['EAD', 'https://posphorte.com.br/pos/ead-online-areas/'],
  ['Presencial', 'https://posphorte.com.br/pos/presencial-areas/'],
  ['Online/Ao Vivo', 'https://posphorte.com.br/pos/ao-vivo-online-areas/'],
  ['Presencial Híbrido', 'https://posphorte.com.br/pos/semipresencial-areas/']
];
const events = [
  ['Encontro Nacional de Futebol e Futsal', 'https://futebolefutsal.com.br/'],
  ['Encontro Internacional Pikler', 'https://encontropikler.com.br/'],
  ['Meeting de Corrida de Rua', 'https://meetingdecorrida.com.br/'],
  ['TRADUSHOW', 'https://faculdadephorte.edu.br/cursos/cursos-livres/tradushow/']
];
const courseLinks = [
  ['Cursos Livres', 'https://faculdadephorte.edu.br/cursos-phorte/'],
  ['Cursos Gratuitos', 'https://posphorte.com.br/cursos-gratuitos/'],
  ['Capacita Empreendedor', 'https://posphorte.com.br/capacita_empreendedor/']
];
const portals = [
  ['Portal do Aluno/Professor', 'https://sis.posphorte.com.br/login'],
  ['Portal do Candidato', 'https://inscricao.posphorte.com.br/minha-conta/login?']
];
function dropdown(label, items) {
  return '<details class="hp-dropdown"><summary>' + label + chevronDown + '</summary><ul>' +
    items.map(([title, href]) => '<li>' + link(title, href) + '</li>').join('') + '</ul></details>';
}
function heading(kicker, title, description = '', id = '') {
  return '<div class="hp-section-title"><p class="hp-eyebrow">' + kicker + '</p><h2' + (id ? ' id="' + id + '"' : '') + '>' + title + '</h2>' +
    (description ? '<p class="hp-intro">' + description + '</p>' : '') + '</div>';
}
function video(id, name, poster, institutional = false) {
  return '<div class="hp-video' + (institutional ? ' hp-video--institution' : '') + '" data-video="' + id + '">' +
    image(poster, '', 'hp-video-poster') +
    '<button type="button" class="hp-video-play" aria-label="Assistir ' + esc(name) + '"><span class="hp-play-icon" aria-hidden="true">▶</span><span>Assistir ao vídeo</span></button>' +
    '<a class="hp-video-fallback" href="https://www.youtube.com/watch?v=' + id + '" target="_blank" rel="noopener noreferrer">Assistir no YouTube <span class="hp-sr-only">(abre em nova aba)</span></a></div>';
}
function catalog(group) {
  const trackId = 'hp-track-' + group.id;
  return '<section class="hp-course-group" aria-labelledby="hp-title-' + group.id + '" data-carousel>' +
    '<div class="hp-group-heading"><div><h3 id="hp-title-' + group.id + '">' + group.title + '</h3></div>' +
    '<div class="hp-carousel-arrows" hidden><button type="button" data-prev aria-label="Cursos anteriores de ' + group.area + '" aria-controls="' + trackId + '">' + chevron + '</button><button type="button" data-next aria-label="Próximos cursos de ' + group.area + '" aria-controls="' + trackId + '">' + chevron + '</button></div></div>' +
    '<ul class="hp-track" id="' + trackId + '" tabindex="0" aria-label="Cursos de ' + group.area + '">' + group.items.map(c =>
      '<li class="hp-course-card" data-course-card>' + '<a href="' + esc(c.url) + '">' +
      '<div class="hp-course-image">' + image(c.asset) + '<span class="hp-course-tag">Pós-graduação</span></div>' +
      '<div class="hp-course-copy"><p class="hp-course-area">' + group.area + '</p><h4>' + esc(c.title) + '</h4><span class="hp-card-link">Conhecer o curso ' + arrow + '</span></div></a></li>'
    ).join('') + '</ul><div class="hp-carousel-bottom" hidden><p class="hp-carousel-status" aria-live="polite" aria-atomic="true"></p><div class="hp-carousel-dots" role="group" aria-label="Páginas de ' + group.area + '"></div></div></section>';
}
const quoteCards = data.testimonials.map((t, i) => {
  const splitAt = t.quote.indexOf('. ', 180);
  const opening = splitAt > 0 ? t.quote.slice(0, splitAt + 1) : t.quote;
  const rest = splitAt > 0 ? t.quote.slice(splitAt + 2) : '';
  return '<figure class="hp-quote"><span class="hp-quote-mark" aria-hidden="true">“</span><blockquote><p>' + esc(opening) + '</p>' +
    (rest ? '<details class="hp-quote-more"><summary>Ler depoimento completo</summary><p>' + esc(rest) + '</p></details>' : '') +
    '</blockquote><figcaption><span class="hp-initial" aria-hidden="true">' + esc(t.name.split(' ').slice(0, 2).map(n => n[0]).join('')) +
    '</span><div><strong>' + esc(t.name) + '</strong><span>' + esc(t.role) + '</span></div></figcaption></figure>';
}).join('');
// Cabeçalho e rodapé são publicados em todas as páginas: links internos usam a URL da home.
const homeUrl = 'https://posphorte.com.br/';
const searchShortcode = '[phorte_pos_search]';
const searchSlot = content => '<div id="hp-busca" class="hp-search-slot">' + content + '</div>';
const headerMarkup = [
  '<div id="hp-cabecalho" lang="pt-BR">',
  '<a class="hp-skip" href="#hp-main">Pular para o conteúdo</a>',
  '<div class="hp-utility"><div class="hp-container"><p>Conhecimento que acompanha o seu próximo passo.</p><a href="tel:+551122221222">(11) 2222-1222</a><a href="https://sis.posphorte.com.br/login">Área do Aluno ' + arrow + '</a></div></div>',
  '<header class="hp-header"><div class="hp-container hp-header-row"><a class="hp-brand" href="' + homeUrl + '" aria-label="Faculdade Phorte — início">' + image(data.logo, 'Faculdade Phorte', '', true) + '</a><span class="hp-brand-divider" aria-hidden="true"></span><span class="hp-brand-label">PÓS-GRADUAÇÃO<br><b>Especializações e MBA</b></span>',
  '<button class="hp-menu-toggle" type="button" aria-expanded="false" aria-controls="hp-navigation" hidden><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h18M3 12h18M3 18h18"/></svg><span class="hp-sr-only">Abrir menu</span></button>',
  '<nav id="hp-navigation" class="hp-navigation" aria-label="Navegação principal">' + dropdown('Pós-graduação', [['Todas as pós', 'https://posphorte.com.br/pos/'], ...modalities]) +
  link('Graduação', 'https://faculdadephorte.edu.br/') + dropdown('Cursos Phorte', courseLinks) + dropdown('Eventos', events) + dropdown('Portal', portals) +
  buttonLink('Encontre sua pós', 'https://posphorte.com.br/pos/', 'hp-button--small') + '</nav></div></header>',
  '</div><!-- fim-hp-cabecalho -->'
];
const heroMarkup = [
  '<div id="hp-home-hero" lang="pt-BR">',
  '<section class="hp-hero" data-hero-carousel aria-label="Destaques da Pós Phorte" aria-roledescription="carrossel"><div class="hp-hero-track"><div class="hp-hero-slide" data-hero-slide data-active="true" role="group" aria-roledescription="slide" aria-label="1 de 3: Pós-graduação Phorte"><div class="hp-container hp-hero-grid"><div class="hp-hero-copy"><p class="hp-eyebrow">FACULDADE PHORTE · PÓS-GRADUAÇÃO</p><h1 id="hp-hero-title">Há mais de 30 anos formando profissionais para <em>o mercado de trabalho.</em></h1><p class="hp-hero-description">Conheça nossas pós-graduações com aulas presenciais, online ao vivo e EAD. Encontre a formação que acompanha o seu momento profissional.</p>' +
  '<div class="hp-hero-actions">' + buttonLink('Encontrar minha pós', '#hp-busca') + link('Explorar as áreas ' , '#hp-catalogo', 'hp-text-link') + '</div><ul class="hp-hero-modalities">' +
  modalities.map(([name, href]) => '<li>' + link(name, href) + '</li>').join('') + '</ul></div><div class="hp-hero-art">' + image(data.hero.asset, 'Imagem institucional Phorte com profissionais de diferentes áreas', '', true, imageSizes.heroArt) +
  '<div class="hp-hero-note"><span class="hp-note-line" aria-hidden="true"></span><p>Seu conhecimento.<br><strong>Novas possibilidades.</strong></p></div></div></div></div>' +
  '<div class="hp-hero-slide hp-hero-slide--courses" data-hero-slide data-active="false" aria-hidden="true" inert role="group" aria-roledescription="slide" aria-label="2 de 3: Conheça nossos cursos"><div class="hp-container hp-hero-grid"><div class="hp-hero-copy"><p class="hp-eyebrow">' + esc(data.hero.coursesSlide.eyebrow) + '</p><h2>' + esc(data.hero.coursesSlide.title) + '</h2><p class="hp-hero-description">' + esc(data.hero.coursesSlide.description) + '</p><div class="hp-hero-actions">' + buttonLink('Explorar os cursos', '#hp-catalogo') + link('Encontrar minha pós', '#hp-busca', 'hp-text-link') + '</div><ul class="hp-hero-modalities">' + data.groups.map(g => '<li>' + link(g.area, '#hp-title-' + g.id) + '</li>').join('') + '</ul></div><div class="hp-hero-course-list">' +
  [data.highlights[0], data.highlights[1], data.highlights[3]].map((h, i) => '<a class="hp-hero-course-preview" href="' + esc(h.url) + '">' + (h.asset ? image(h.asset, '', '', false, imageSizes.heroPreview) : '<span class="hp-hero-mba" aria-hidden="true">MBA</span>') + '<span><small>' + (i === 2 ? 'MBA' : 'PÓS-GRADUAÇÃO') + '</small><strong>' + esc(h.title.replace(/^Pós em /, '')) + '</strong></span>' + arrow + '</a>').join('') +
  '</div></div></div><div class="hp-hero-slide hp-hero-slide--image" data-hero-slide data-active="false" aria-hidden="true" inert role="group" aria-roledescription="slide" aria-label="3 de 3: Dia dos Professores"><picture><source media="(max-width: 767px)" srcset="' + esc(srcsetList(data.hero.teachersDay.mobile) || data.hero.teachersDay.mobile.path) + '"' + (srcsetList(data.hero.teachersDay.mobile) ? ' sizes="' + imageSizes.full + '"' : '') + ' width="' + data.hero.teachersDay.mobile.width + '" height="' + data.hero.teachersDay.mobile.height + '">' + image(data.hero.teachersDay.desktop, data.hero.teachersDay.alt, '', false, imageSizes.full) + '</picture></div></div>' +
  '<div class="hp-hero-controls" role="group" aria-label="Controles dos destaques" hidden><button type="button" class="hp-hero-control" data-hero-prev aria-label="Exibir destaque anterior">' + chevron + '</button><div class="hp-hero-pagination" role="group" aria-label="Selecionar destaque"></div><button type="button" class="hp-hero-control" data-hero-next aria-label="Exibir próximo destaque">' + chevron + '</button><button type="button" class="hp-hero-control hp-hero-rotation" data-hero-rotation aria-pressed="false" aria-label="Ativar troca automática"><svg class="hp-hero-pause" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5v14M15 5v14"/></svg><svg class="hp-hero-play" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7z"/></svg></button><p class="hp-sr-only hp-hero-status" aria-live="polite" aria-atomic="true"></p></div></section>',
  '</div><!-- fim-hp-home-hero -->'
];
const sectionsMarkup = [
  '<div id="hp-home-secoes" lang="pt-BR">',
  '<section class="hp-section hp-highlights" aria-labelledby="hp-highlight-title"><div class="hp-container">' + heading('MAIS PROCURADOS', 'Sua próxima especialização começa aqui', 'Conheça alguns dos destaques da Pós Phorte.', 'hp-highlight-title') +
  '<div class="hp-highlight-grid">' + data.highlights.map((h, i) => '<article class="hp-highlight' + (!h.asset ? ' hp-highlight--type' : '') + '" data-highlight-card><a href="' + esc(h.url) + '">' +
    (h.asset ? '<div class="hp-highlight-image">' + image(h.asset, '', '', false, imageSizes.highlight) + '</div>' : '<div class="hp-highlight-image hp-visagismo" aria-hidden="true"><span>Imagem.<br>Comportamento.<br><em>Negócios.</em></span><b>MBA</b></div>') +
    '<div class="hp-highlight-copy"><span class="hp-highlight-number">0' + (i + 1) + ' / ' + (i === 3 ? 'MBA' : i === 5 ? 'ÁREA DE CONHECIMENTO' : 'PÓS-GRADUAÇÃO') + '</span><h3>' + esc(h.title.replace(/^Pós em /, '')) + '</h3><p>' + esc(h.description) + '</p><span class="hp-card-link">' + (i === 5 ? 'Explorar os cursos' : 'Conhecer a formação') + arrow + '</span></div></a></article>').join('') +
  '</div></div></section>',
  '<section id="hp-catalogo" class="hp-section hp-catalog" aria-labelledby="hp-catalog-title"><div class="hp-container">' + heading('CONHECIMENTO PARA COLOCAR EM PRÁTICA', 'Conheça nossos cursos de pós-graduação', 'Formações desenvolvidas para conectar o que você aprende aos desafios do trabalho, com aplicação das habilidades e competências adquiridas.', 'hp-catalog-title') +
  '<nav class="hp-area-nav" aria-label="Áreas do catálogo">' + data.groups.map(g => link(g.area, '#hp-title-' + g.id)).join('') + '</nav>' + data.groups.map(catalog).join('') + '</div></section>',
  '<section id="hp-coordenadores" class="hp-section hp-coordinators" aria-labelledby="hp-coordinator-title"><div class="hp-container">' + heading('QUEM CONDUZ O CONHECIMENTO', 'Coordenadores de pós-graduação', 'Conheça profissionais à frente das nossas formações.', 'hp-coordinator-title') +
  '<ul class="hp-coordinator-grid">' + data.coordinators.map(c => '<li data-coordinator>' + '<div class="hp-portrait">' + image(c.asset, c.name) + '</div><h3>' + esc(c.name) + '</h3><p>Pós em ' + esc(c.area) + '</p></li>').join('') + '</ul></div></section>',
  '<section id="hp-depoimentos" class="hp-section hp-testimonials" aria-labelledby="hp-testimonial-title"><div class="hp-container">' + heading('EXPERIÊNCIAS QUE INSPIRAM', 'Quem estuda aqui conta melhor', 'Depoimentos de alunos e profissionais que fazem parte da história da Phorte.', 'hp-testimonial-title') +
  '<div class="hp-video-grid">' + data.videos.map(v => '<article>' + video(v.youtubeId, 'ao depoimento de ' + v.name, v.poster) + '<h3>' + esc(v.name) + '</h3><p>' + esc(v.role) + ' · Educação Infantil numa Perspectiva Pikleriana</p></article>').join('') + '</div><div class="hp-quote-grid">' + quoteCards + '</div></div></section>',
  '<section id="hp-institucional" class="hp-section hp-institution" aria-labelledby="hp-institution-title"><div class="hp-container hp-institution-grid"><div>' + heading('NOSSA HISTÓRIA CONTINUA COM VOCÊ', 'Conheça mais sobre a Phorte', '', 'hp-institution-title') +
  '<p class="hp-institution-stat"><strong>+ de 250 mil</strong><span>alunos formados</span></p><p>Com mais de 30 anos de experiência, a Phorte reúne uma trajetória de formação e parcerias educacionais. Nossos cursos aproximam conhecimento e prática para acompanhar as demandas profissionais.</p>' +
  buttonLink('Conhecer as pós-graduações', 'https://posphorte.com.br/pos/', 'hp-button--light') + '</div>' + video(data.institutionVideo, 'ao vídeo institucional da Faculdade Phorte', data.institutionPoster, true) + '</div></section>',
  '<section id="hp-noticias" class="hp-section hp-news" aria-labelledby="hp-news-title"><div class="hp-container"><div class="hp-news-heading">' + heading('REVISTA PHORTE', 'Últimas notícias', '', 'hp-news-title') +
  buttonLink('Ver todas as notícias', 'https://posphorte.com.br/noticias-atuais-em-destaque/', 'hp-button--outline') + '</div><div class="hp-news-grid">' + data.news.map(n => '<article class="hp-news-card" data-news-card><a href="' + esc(n.url) + '">' + image(n.asset) + '<div><p class="hp-eyebrow">EDUCAÇÃO E CARREIRA</p><h3>' + esc(n.title) + '</h3><span class="hp-card-link">Ler artigo ' + arrow + '</span></div></a></article>').join('') +
  '</div></div></section>',
  '</div><!-- fim-hp-home-secoes -->'
];
const footerMarkup = [
  '<div id="hp-rodape" lang="pt-BR">',
  '<footer class="hp-footer"><div class="hp-container"><div class="hp-footer-top"><a class="hp-footer-brand" href="' + homeUrl + '" aria-label="Faculdade Phorte — página inicial">' + image(data.logo, 'Faculdade Phorte') + '</a><p>Conhecimento para ampliar possibilidades.<br><strong>Seu próximo passo pode começar aqui.</strong></p>' + buttonLink('Encontre sua pós', 'https://posphorte.com.br/pos/', 'hp-button--light') + '</div>' +
  '<div class="hp-footer-columns"><div><h2>Pós-graduação</h2><ul>' + modalities.map(([t, u]) => '<li>' + link(t, u) + '</li>').join('') + '</ul><h2 class="hp-footer-subtitle">Cursos Phorte</h2><ul>' + courseLinks.map(([t, u]) => '<li>' + link(t, u) + '</li>').join('') + '</ul></div><div><h2>Explore a Phorte</h2><ul><li>' + link('Graduação', 'https://faculdadephorte.edu.br/') + '</li><li>' + link('Conheça as áreas', homeUrl + '#hp-catalogo') + '</li><li>' + link('Coordenadores', homeUrl + '#hp-coordenadores') + '</li><li>' + link('Depoimentos', homeUrl + '#hp-depoimentos') + '</li><li>' + link('Notícias', homeUrl + '#hp-noticias') + '</li></ul></div>' +
  '<div><h2>Portais</h2><ul>' + portals.map(([t, u]) => '<li>' + link(t, u) + '</li>').join('') + '</ul></div>' +
  '<div><h2>Fale com a Phorte</h2><a class="hp-footer-phone" href="tel:+551122221222">(11) 2222-1222</a><address>Rua Rui Barbosa, 422<br>Bela Vista · São Paulo – SP</address>' + link('Falar pelo WhatsApp ↗', 'https://api.whatsapp.com/send?phone=551122221222', 'hp-footer-whatsapp') +
  '<p class="hp-social-label">Acompanhe a Pós Phorte</p><div class="hp-socials">' + socialLink('Instagram', 'https://www.instagram.com/posphorte/') + socialLink('Facebook', 'https://www.facebook.com/posfaculdadephorte') + socialLink('YouTube', 'https://www.youtube.com/@phortetv') + '</div></div></div>' +
  '<div class="hp-footer-legal"><p>© 2026 Associação de Educação e Novas Tecnologias Phorte<br>CNPJ 42.098.615/0001-42 · Todos os direitos reservados.</p><div>' + link('Privacidade', 'https://posphorte.com.br/politica-de-privacidade/') + link('Cookies', 'https://posphorte.com.br/politica-de-cookies/') + '</div></div></div></footer>',
  '</div><!-- fim-hp-rodape -->'
];
const join = lines => lines.join('\n').replace(/\(11\) 2222-1222/g, '(11)&nbsp;2222&#8209;1222');
const parts = { cabecalho: join(headerMarkup), hero: join(heroMarkup), secoes: join(sectionsMarkup), rodape: join(footerMarkup) };
// Prévia: srcset com várias larguras volta ao original (<source>) ou sai (<img>), pois as versões menores só existem no site.
const previewImages = html => html.replace(/ srcset="([^"]*, [^"]*)"(?: sizes="[^"]*")?/g, (all, list, offset, str) =>
  str.startsWith('<source', str.lastIndexOf('<', offset)) ? ' srcset="' + list.split(', ').pop().split(' ')[0] + '"' : '');
const previewParts = Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, previewImages(v)]));

const read = file => readFile(path.join(root, file), 'utf8');
const css = { base: await read('styles/base.css'), cabecalho: await read('styles/cabecalho.css'), home: await read('styles/home.css'), rodape: await read('styles/rodape.css') };
const js = { cabecalho: await read('js/cabecalho.js'), home: await read('js/home.js') };

// Prévia local: a busca usa a marcação de teste do componente, sem consultar a API do WordPress.
const fixturePath = path.join(root, 'angie-busca-posphorte/tests/render-fixture.html');
const fixture = existsSync(fixturePath) ? (await readFile(fixturePath, 'utf8')).match(/<section[\s\S]*<\/section>/)?.[0] : '';
const previewSearch = fixture
  ? fixture.replace(/ data-phorte-pos-search data-endpoint="[^"]*"/, '').replaceAll('phorte-pos-search-fixture-01', 'hp-busca-previa').trim()
  : '<p>Shortcode ' + searchShortcode + '</p>';
const previewNote = '<script>document.querySelector("#hp-busca form")?.addEventListener("submit",e=>{e.preventDefault();const s=document.querySelector("#hp-busca [data-status]");if(s)s.textContent="Prévia local: no WordPress, o shortcode [phorte_pos_search] consulta o catálogo real.";});</script>';
const preview = '<!DOCTYPE html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="Prévia da nova home de pós-graduação da Faculdade Phorte."><title>Pós-graduação Phorte — prévia da nova home</title><link rel="icon" href="data:,"><link rel="preload" href="assets/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin>' +
  ['styles/base.css', 'styles/cabecalho.css', 'styles/home.css', 'styles/rodape.css', 'angie-busca-posphorte/style.css'].map(href => '<link rel="stylesheet" href="' + href + '">').join('') +
  '<style>body{margin:0;background:#fafafa}</style><script src="js/cabecalho.js" defer></script><script src="js/home.js" defer></script></head><body>\n' +
  '<!-- peça: cabeçalho -->\n' + previewParts.cabecalho + '\n<main id="hp-main" tabindex="-1">\n<!-- peça: home -->\n' + previewParts.hero + '\n' + searchSlot(previewSearch) + '\n' + previewParts.secoes + '\n</main>\n<!-- peça: rodapé -->\n' + previewParts.rodape + '\n' + previewNote + '\n</body></html>\n';

// Uso: node gerar.mjs [URL das imagens] [--fontes=URL das fontes]
// As imagens foram enviadas pela biblioteca de mídia (pasta plana do mês). As fontes .woff2 não foram
// publicadas: sem --fontes, os widgets usam a Poppins que o site já carrega e omitem @font-face.
const args = process.argv.slice(2);
const httpsFolder = (value, label) => {
  const url = value.replace(/\/?$/, '/');
  if (!/^https:\/\/[^"'<>\s]+\/$/.test(url)) throw new Error('Informe uma URL HTTPS absoluta para ' + label + '.');
  return url;
};
const imagesBase = httpsFolder(args.find(a => !a.startsWith('--')) || 'https://posphorte.com.br/wp-content/uploads/2026/10/', 'as imagens');
const fontsArg = args.find(a => a.startsWith('--fontes='));
const fontsBase = fontsArg ? httpsFolder(fontsArg.slice(9), 'as fontes') : '';
// CSS em styles/ referencia ../assets/fonts/; a marcação referencia assets/images/.
// Sem fontes publicadas, saem só os @font-face com arquivo; o fallback ajustado em Arial (local) continua.
const replaceAssets = s => (fontsBase ? s.replace(/(?:\.\.\/)?assets\/fonts\//g, fontsBase) : s.replace(/@font-face\{[^}]*assets\/fonts\/[^}]*\}\n?/g, ''))
  .replace(/assets\/images\//g, imagesBase);
const scriptTag = source => '<script>\n' + source.replace(/<\/script/gi, '<\\/script') + '\n</script>\n';
const widgetHtml = (label, styles, markup, script = '') => '<!-- Gerado por scripts/gerar.mjs — Pós Phorte: ' + label + '. Colar inteiro em um widget HTML do Elementor. -->\n<style>\n' + replaceAssets(styles.join('\n')) + '\n</style>\n' + replaceAssets(markup) + '\n' + (script ? scriptTag(script) : '');
// Cada widget leva sua cópia da base restrita às próprias peças; uma cópia posterior na página
// (por exemplo, a do rodapé) não pode redefinir tokens como --hp-columns da home.
const baseScope = ':is(#hp-cabecalho,#hp-home-hero,#hp-home-secoes,#hp-rodape)';
if (!css.base.includes(baseScope)) throw new Error('Escopo da base não encontrado em styles/base.css.');
const baseFor = scope => css.base.replaceAll(baseScope, scope);
const widgets = {
  cabecalho: widgetHtml('Cabeçalho', [baseFor('#hp-cabecalho'), css.cabecalho], parts.cabecalho, js.cabecalho),
  // Estilos e script da home ficam no primeiro widget e também atendem o widget das seções.
  hero: widgetHtml('Home 1/3, hero (inclui estilos e script da home)', [baseFor(':is(#hp-home-hero,#hp-home-secoes)'), css.home], parts.hero, js.home),
  busca: searchSlot(searchShortcode),
  secoes: '<!-- Gerado por scripts/gerar.mjs — Pós Phorte: Home 3/3, seções. Usa estilos e script do widget Home 1/3 na mesma página. -->\n' + replaceAssets(parts.secoes) + '\n',
  rodape: widgetHtml('Rodapé', [baseFor('#hp-rodape'), css.rodape], parts.rodape)
};

// O WordPress expande shortcodes em todo o conteúdo, até dentro de <style>, <script> e comentários.
// Um "[phorte_pos_search]" num comentário do hero já despejou o widget da busca no meio do CSS e do JS
// (busca sem estilo e carrosséis parados). Só o widget Shortcode pode conter um shortcode.
for (const [nome, html] of Object.entries(widgets)) {
  if (nome === 'busca') continue;
  const achado = html.match(/\[(phorte_pos_search|category_dropdown)\b[^\]]*\]/);
  if (achado) throw new Error('Shortcode ' + achado[0] + ' dentro do widget "' + nome + '": o WordPress vai expandi-lo. Escreva sem colchetes.');
}

// Templates importáveis em Elementor > Modelos > Importar. IDs estáveis derivados do nome.
const elementId = seed => createHash('sha1').update('posphorte:' + seed).digest('hex').slice(0, 7);
const zero = { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true };
const container = (seed, settings, elements) => ({
  id: elementId(seed), elType: 'container', isInner: false,
  settings: { content_width: 'full', flex_direction: 'column', flex_gap: { unit: 'px', size: 0, column: '0', row: '0', isLinked: true }, padding: zero, margin: zero, ...settings },
  elements
});
const widget = (seed, widgetType, settings) => ({ id: elementId(seed), elType: 'widget', isInner: false, settings, elements: [], widgetType });
const template = (title, type, content, pageSettings = []) => JSON.stringify({ version: '0.4', title, type, page_settings: pageSettings, content }, null, 2) + '\n';
const templates = {
  cabecalho: template('Pós Phorte — Cabeçalho', 'section', [container('cabecalho', { html_tag: 'div' }, [widget('cabecalho-html', 'html', { html: widgets.cabecalho })])]),
  home: template('Pós Phorte — Home', 'page', [container('home', { html_tag: 'main', _element_id: 'hp-main' }, [
    widget('home-hero', 'html', { html: widgets.hero }),
    widget('home-busca', 'shortcode', { shortcode: widgets.busca }),
    widget('home-secoes', 'html', { html: widgets.secoes })
  ])], { template: 'elementor_header_footer' }),
  rodape: template('Pós Phorte — Rodapé', 'section', [container('rodape', { html_tag: 'div' }, [widget('rodape-html', 'html', { html: widgets.rodape })])])
};

const out = (...p) => path.join(root, 'elementor', ...p);
for (const dir of ['cabecalho', 'home', 'rodape']) await mkdir(out(dir), { recursive: true });
await writeFile(path.join(root, 'index.html'), preview);
await writeFile(out('cabecalho/widget-html.html'), widgets.cabecalho);
await writeFile(out('cabecalho/template-elementor.json'), templates.cabecalho);
await writeFile(out('home/1-hero-widget-html.html'), widgets.hero);
await writeFile(out('home/2-busca-widget-shortcode.txt'), widgets.busca + '\n');
await writeFile(out('home/3-secoes-widget-html.html'), widgets.secoes);
await writeFile(out('home/template-elementor.json'), templates.home);
await writeFile(out('rodape/widget-html.html'), widgets.rodape);
await writeFile(out('rodape/template-elementor.json'), templates.rodape);
const manifest = JSON.parse(await readFile(path.join(root, 'assets/manifest.json')));
const usedBy = text => manifest.filter(a => text.includes(a.path)).map(a => a.path);
const license = fontsBase ? ['assets/fonts/OFL.txt'] : [];
const published = a => a.path.startsWith('assets/images/') ? imagesBase + path.basename(a.path) : fontsBase ? fontsBase + path.basename(a.path) : null;
const used = text => [...new Set([...usedBy(fontsBase ? text : text.replace(/@font-face\{[^}]*assets\/fonts\/[^}]*\}/g, '')), ...license])];
await writeFile(out('assets-publicacao.json'), JSON.stringify({
  imagens: imagesBase,
  fontes: fontsBase || null,
  note: fontsBase
    ? 'Imagens na pasta de mídia do WordPress; fontes Poppins self-hosted na pasta indicada.'
    : 'Imagens na pasta de mídia do WordPress. Fontes não publicadas: os widgets usam a Poppins carregada pelo site (Google Fonts).',
  pecas: {
    cabecalho: used(css.base + css.cabecalho + parts.cabecalho),
    home: used(css.base + css.home + parts.hero + parts.secoes),
    rodape: used(css.base + css.rodape + parts.rodape)
  },
  assets: manifest.map(a => ({ local: a.path, destination: published(a) })).filter(a => a.destination)
}, null, 2) + '\n');
console.log('Prévia e pacotes Elementor (cabeçalho, home, rodapé) gerados. Imagens: ' + imagesBase + ' · Fontes: ' + (fontsBase || 'Poppins do site'));
