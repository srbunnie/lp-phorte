// Rebuild the five event previews and their scoped Elementor packages.
const fs = require('node:fs');
const path = require('node:path');
const projects = [
  ['meeting-de-corrida', 'run', '#07111d', '#f5f8fc', '#00f25b', '#b7c0cd'],
  ['encontro-futebol-futsal', 'football', '#0c131c', '#f5f8fc', '#6a9fff', '#bac6d5'],
  ['mecanica-na-musculacao', 'mechanics', '#090909', '#f7f7f7', '#ff4855', '#c4c4c4'],
  ['encontro-pikler', 'pikler', '#f7f0e5', '#342b29', '#a34250', '#5f514b'],
  ['encontro-phorte', 'phorte', '#0c1015', '#f7f8fa', '#68e8f4', '#bac4ce'],
];
const mediaBases = {
  'meeting-de-corrida': 'https://meetingdecorrida.com.br/wp-content/uploads/2026/10/',
  'encontro-futebol-futsal': 'https://futebolefutsal.com.br/wp-content/uploads/2026/10/',
  'mecanica-na-musculacao': 'https://mecanicadamusculacao.com.br/wp-content/uploads/2026/10/',
  'encontro-pikler': 'https://encontropikler.com.br/wp-content/uploads/2026/10/',
  'encontro-phorte': 'https://encontrophorte.com.br/wp-content/uploads/2026/10/',
};
const base = `
* { box-sizing: border-box; }
html { background: var(--page); }
body { margin: 0; font-family: Poppins, Arial, sans-serif; }
.lp-event { min-height: 100svh; color: var(--ink); background: var(--page); overflow: clip; font-family: Poppins, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
.event-frame { max-width: 1320px; min-height: 100svh; margin: auto; display: flex; flex-direction: column; }
.event-header, .top-rule { min-height: 92px; max-width: 1320px; margin: auto; padding: 24px clamp(24px, 5vw, 72px); display: flex; align-items: center; gap: 16px; border-bottom: 1px solid var(--line); font-size: 10px; font-weight: 500; letter-spacing: .12em; width: 100%; }
.event-header > :last-child, .top-rule > :last-child { margin-left: auto; }
.event-hero { flex: 1; width: min(1320px, 100%); min-height: calc(100svh - 184px); margin: auto; padding: 64px clamp(24px, 5vw, 72px); display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); align-items: center; gap: clamp(40px, 5vw, 72px); }
.hero-copy { min-width: 0; max-width: 620px; }
.eyebrow { display: flex; align-items: center; gap: 10px; margin: 0 0 24px; color: var(--accent); font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; line-height: 1.6; }
.eyebrow > span { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: var(--accent); }
.hero-copy h1 { margin: 0 0 28px; font-size: clamp(42px, 4.9vw, 68px); font-weight: 700; line-height: 1.08; letter-spacing: -.055em; }
.hero-copy h1 .headline-lead { display: block; margin-bottom: 12px; color: var(--ink); font-size: .54em; font-weight: 500; letter-spacing: -.035em; }
.hero-copy h1 .headline-main { color: var(--accent); }
.support-copy { max-width: 445px; margin: 0; color: var(--muted); font-size: 16px; line-height: 1.8; font-weight: 400; }
.event-cta { display: inline-flex; align-items: center; justify-content: space-between; gap: 24px; max-width: 100%; min-height: 56px; margin-top: 30px; padding: 16px 22px; border: 1px solid transparent; border-radius: 8px; background: #f23d43; color: #fff; text-decoration: none; font-family: Poppins, Arial, sans-serif; font-size: 14px; line-height: 1.5; font-weight: 600; box-shadow: 0 8px 24px #f23d431a; transition: background .2s, transform .2s; }
.event-cta span { font-size: 21px; line-height: 1; font-weight: 400; flex-shrink: 0; }
.event-cta:hover { background: #df3039; color: #fff; transform: translateY(-2px); }
.event-cta:focus-visible, .event-wordmark:focus-visible { outline: 3px solid var(--accent); outline-offset: 5px; }
.hero-visual { min-width: 0; position: relative; margin: 0; }
.hero-visual img { display: block; width: 100%; height: auto; }
.hero-visual figcaption, .visual-label { font-size: 10px; line-height: 1.5; letter-spacing: .1em; font-weight: 500; }
.event-footer { width: min(1320px, 100%); min-height: 92px; margin: auto; padding: 22px clamp(24px, 5vw, 72px); display: flex; align-items: center; gap: 20px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; line-height: 1.6; }
.phorte-logo { display: block; width: 104px; height: auto; flex-shrink: 0; margin-left: auto; }
@media (max-width: 960px) {
  .event-hero { min-height: auto; grid-template-columns: 1fr; gap: 48px; padding-top: 48px; padding-bottom: 48px; }
  .hero-copy { max-width: 620px; }
  .hero-copy h1 { font-size: clamp(40px, 7.4vw, 64px); }
  .hero-visual { width: 100%; max-width: 580px; justify-self: center; }
}
@media (max-width: 540px) {
  .event-header, .top-rule { min-height: 76px; padding: 20px 24px; font-size: 9px; letter-spacing: .07em; gap: 10px; }
  .event-hero { padding: 36px 24px 40px; gap: 36px; }
  .hero-copy h1 { font-size: clamp(34px, 9.4vw, 48px); letter-spacing: -.045em; margin-bottom: 22px; }
  .hero-copy h1 .headline-lead { font-size: .62em; margin-bottom: 10px; }
  .eyebrow { font-size: 9px; margin-bottom: 20px; letter-spacing: .1em; }
  .support-copy { font-size: 15px; line-height: 1.75; }
  .event-cta { width: 100%; gap: 12px; padding: 16px; font-size: 13px; margin-top: 24px; }
  .event-footer { padding: 20px 24px; font-size: 10px; gap: 16px; }
  .phorte-logo { width: 90px; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
`;
const variants = {
  run: `
.lp-event { background: radial-gradient(ellipse at 90% 35%, #00f25b0b, transparent 50%), var(--page); }
.event-wordmark { display: flex; align-items: center; gap: 14px; color: var(--ink); text-decoration: none; }
.wordmark-kicker { color: var(--accent); font-size: 30px; }
.wordmark-title { font-size: 16px; line-height: 1.15; letter-spacing: -.02em; font-weight: 800; }
.wordmark-title i { color: var(--accent); font-style: normal; font-size: .7em; }
.event-signature { color: var(--muted); text-transform: uppercase; }
.event-signature b { color: var(--accent); }
.hero-visual { padding-bottom: 26px; }
.hero-visual::before { content: ''; position: absolute; inset: 18px -12px 0 24px; border: 1px solid #00f25b66; border-radius: 8px; }
.hero-visual img { position: relative; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; }
.hero-visual figcaption { position: relative; display: flex; align-items: center; justify-content: space-between; margin: -62px 16px 0; padding: 16px; background: #07111de8; color: #fff; }
.caption-mark { color: var(--accent); font-size: 20px; }
@media (max-width: 960px) { .hero-visual img { aspect-ratio: 4/3; object-position: center 42%; } }
@media (max-width: 540px) { .event-signature { display: none; } .wordmark-title { font-size: 14px; } }
`,
  football: `
.top-rule { background: #111820; color: #fff; max-width: none; }
.top-rule > :last-child { color: #c3cbd4; }
.brand-lockup { width: 148px; height: 114px; padding: 12px; margin-bottom: 28px; background: #111820; border-radius: 6px; }
.brand-lockup img { display: block; width: 100%; height: 100%; object-fit: contain; }
.hero-visual { padding: 0 0 24px 20px; }
.hero-visual::before { content: ''; position: absolute; inset: 36px 0 0; background: #1559d8; border-radius: 6px; }
.portrait-card { position: relative; width: 100%; overflow: hidden; border-radius: 6px; background: #162331; }
.portrait-card img { aspect-ratio: 4/5; object-fit: cover; object-position: center top; filter: grayscale(1); }
.visual-label { position: relative; display: block; margin: -52px 16px 0; padding: 16px; color: #fff; background: #111820e8; }
.footer-line { width: 40px; height: 2px; background: var(--accent); flex-shrink: 0; }
@media (max-width: 960px) { .portrait-card img { aspect-ratio: 4/3; object-position: center 28%; } }
@media (max-width: 540px) { .brand-lockup { width: 116px; height: 96px; margin-bottom: 24px; } .top-rule { font-size: 8px; } .footer-line { display: none; } }
`,
  mechanics: `
.lp-event { background: radial-gradient(ellipse at 85% 40%, #ec1d2d14, transparent 45%), var(--page); }
.header-rule { width: 24px; height: 3px; background: var(--accent); flex-shrink: 0; }
.event-logo { display: block; width: 240px; max-width: 80%; height: auto; margin-bottom: 28px; }
.hero-visual { padding: 16px; border: 1px solid #ffffff24; border-top: 3px solid #f23d43; background: #ffffff04; border-radius: 4px; }
.hero-visual img { aspect-ratio: 600/585; object-fit: contain; }
.hero-visual figcaption { display: flex; align-items: center; gap: 10px; margin-top: 18px; color: var(--muted); }
.hero-visual figcaption::before { content: ''; width: 20px; height: 2px; background: var(--accent); }
.footer-emblem { display: none; }
@media (max-width: 540px) { .event-logo { width: 204px; margin-bottom: 24px; } .header-rule { width: 16px; } }
`,
  pikler: `
.lp-event { background: radial-gradient(circle at 92% 30%, #f0cb6329, transparent 35%), var(--page); }
.brand-star { color: #b98014; font-size: 26px; }
.header-note { color: var(--muted); font-size: 10px; letter-spacing: .02em; }
.hero-copy h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: clamp(48px, 5.5vw, 76px); line-height: 1.04; letter-spacing: -.045em; }
.hero-copy h1 .headline-lead { font-weight: 400; font-style: normal; }
.headline-main { font-style: italic; }
.editorial-note { margin: 24px 0 0; color: var(--muted); font: italic 14px/1.6 Georgia, serif; }
.hero-visual { padding: 16px 16px 42px; background: #fffaf1; box-shadow: 0 18px 54px #5a3e3112; border: 1px solid #342b2912; border-radius: 180px 180px 4px 4px; }
.hero-visual img { aspect-ratio: 1; object-fit: cover; border-radius: 170px 170px 2px 2px; }
.image-sticker { position: absolute; right: 16px; bottom: 16px; padding: 12px 22px; border-radius: 50px; background: #f0cb63; color: #342b29; font: italic 24px Georgia, serif; }
.sun-mark { color: #b98014; font-size: 24px; }
.event-footer .phorte-logo { margin-left: 0; margin-right: auto; }
@media (max-width: 960px) { .hero-copy h1 { font-size: clamp(48px, 8vw, 72px); } }
@media (max-width: 540px) { .header-note { display: none; } .hero-copy h1 { font-size: clamp(38px, 10.5vw, 56px); } .hero-copy h1 .headline-lead { font-size: .6em; } }
`,
  phorte: `
.lp-event { background: radial-gradient(ellipse at 85% 38%, #00c6e00d, transparent 50%), var(--page); }
.event-index { color: #fff; font-size: 12px; letter-spacing: .06em; }
.event-index i { color: #f23d43; font-style: normal; }
.header-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
.hero-visual { padding: 28px 20px 20px; border: 1px solid #68e8f438; border-radius: 8px; background: linear-gradient(145deg, #00c6e00f, #f23d4308); }
.hero-visual::before { content: ''; position: absolute; top: -1px; left: 20px; width: 72px; height: 3px; background: #f23d43; }
.hero-visual img { aspect-ratio: 768/394; object-fit: contain; filter: grayscale(1); }
.hero-visual figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding-top: 18px; margin-top: 18px; border-top: 1px solid #ffffff1a; color: var(--muted); font-size: 9px; }
.hero-visual figcaption > :last-child { color: #ff6870; }
@media (max-width: 540px) { .event-header > :last-child { display: none; } .header-dot { margin-left: auto; } .hero-visual { padding: 24px 16px 16px; } }
`,
};
function scopeCSS(css, scope) {
  return css.replace(/([^{}]+)\{/g, (match, selector) => {
    if (selector.trim().startsWith('@')) return match;
    return selector.split(',').map(part => {
      const s = part.trim();
      if ([':root', 'html', 'body', '.lp-event'].includes(s)) return scope;
      return `${scope} ${s}`;
    }).join(',\n') + ' {';
  });
}
for (const [slug, type, bg, ink, accent, muted] of projects) {
  const dir = path.join('Cursos-Livres', slug);
  const scope = `.event--${type}`;
  const line = type === 'pikler' ? '#342b2926' : '#ffffff21';
  const css = `:root { --page: ${bg}; --ink: ${ink}; --accent: ${accent}; --muted: ${muted}; --line: ${line}; }\n${base}\n${variants[type]}`;
  fs.writeFileSync(path.join(dir, 'styles.css'), css);
  let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  html = html.replace(/Em breve<br>\s*<span>divulgaremos<br>novas datas\.<\/span>/, '<span class="headline-lead">Em breve</span><span class="headline-main">divulgaremos<br>novas datas.</span>');
  html = html.replace('</span><span class="headline-main">', '</span> <span class="headline-main">');
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const uniqueId = `event-title-${slug}`;
  let widget = html.match(/<main\b[\s\S]*?<\/main>/)[0].replace('<main', '<section').replace('</main>', '</section>').replaceAll('event-title', uniqueId).replace('id="inicio"', `id="inicio-${slug}"`).replace('href="#inicio"', `href="#inicio-${slug}"`);
  widget = widget.replace('<section class=', `<section aria-labelledby="${uniqueId}" class=`);
  const font = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');\n";
  const scoped = font + scopeCSS(css, scope);
  const mediaBase = mediaBases[slug];
  fs.writeFileSync(path.join(dir, 'elementor/widget.html'), widget.replaceAll('assets/images/', mediaBase || '../assets/images/'));
  fs.writeFileSync(path.join(dir, 'elementor/widget.css'), scoped);
  const elementorPreview = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preview Elementor — ${slug}</title><style>body { margin: 0; }</style><style>${scoped}</style></head><body>${widget.replaceAll('assets/images/', '../assets/images/')}</body></html>`;
  fs.writeFileSync(path.join(dir, 'elementor/preview.html'), elementorPreview);
  const ready = mediaBase ? widget.replaceAll('assets/images/', mediaBase) : widget.replace(/assets\/images\/([^"\s]+)/g, 'COLE_AQUI_URL_DA_MIDIA__$1');
  const instructions = mediaBase ? 'Cole em um widget HTML do Elementor. Os assets usam os URLs de uploads do site; confirme que todos os arquivos foram enviados.' : 'Cole em um widget HTML do Elementor. Envie os assets para a Biblioteca de Mídia e substitua os marcadores pelos URLs.';
  fs.writeFileSync(path.join(dir, 'elementor/elementor-ready.html'), '<!-- ' + instructions + ' -->\n<style>\n' + scoped + '\n</style>\n' + ready + '\n');
  const readme = path.join(dir, 'README.md');
  let originalReadme = fs.readFileSync(readme, 'utf8').split('\n## Revisão visual —')[0];
  originalReadme = originalReadme.replace(/Para inserir a página no Elementor,[^\n]+/, 'Para inserir a página no Elementor, cole o conteúdo completo de `elementor/elementor-ready.html` em um widget HTML. Os URLs dos assets já estão configurados para o domínio do evento. Envie os arquivos de `assets/images/` à Biblioteca de Mídia mantendo os nomes.');
  originalReadme = originalReadme.replace(/## Elementor: bloco pronto para colar[\s\S]*/, '## Elementor: bloco pronto para colar\n\n`elementor/elementor-ready.html` reúne HTML e CSS isolados em um arquivo. `widget.html` e `widget.css` oferecem a opção separada. As duas versões usam os URLs de uploads do respectivo site. Os previews locais usam os assets do projeto.\n');
  fs.writeFileSync(readme, originalReadme + '\n## Revisão visual — 8 de outubro de 2026\n\nHierarquia com “Em breve” em tamanho de apoio, entrelinha mais aberta e peso 700 para o título. CTA Poppins 600, altura mínima de 56 px e largura total no celular. Layout passa para uma coluna até 960 px. Imagens e acabamento foram ajustados à identidade do evento; Pikler usa Georgia no título para preservar o caráter editorial. Preview, CSS isolado e bloco único Elementor foram sincronizados.\n\n## URLs dos assets no WordPress\n\nBase configurada: `' + mediaBase + '`. Envie os assets com os mesmos nomes de arquivo. Os uploads estão sendo realizados pelo responsável pelos sites; os URLs passam a carregar conforme cada arquivo é enviado.\n');
}
console.log('Atualizados cinco previews e pacotes Elementor.');
