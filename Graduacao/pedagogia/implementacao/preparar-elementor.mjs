import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectDir, 'implementacao', 'elementor');
const versions = [
  { key: '2026-2', source: 'index claro 2026-2.html', turma: '2026.2' },
  { key: '2027-1', source: 'index claro 2027-1.html', turma: '2027.1' },
];

function matchingBrace(source, start) {
  let depth = 0;
  let quote = '';
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) { if (char === quote && source[i - 1] !== '\\') quote = ''; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === '{') depth += 1;
    if (char === '}') { depth -= 1; if (depth === 0) return i; }
  }
  throw new Error('Bloco CSS sem fechamento.');
}

function scopeCss(source, root) {
  let output = '';
  let cursor = 0;
  while (cursor < source.length) {
    const open = source.indexOf('{', cursor);
    if (open === -1) { output += source.slice(cursor); break; }
    const close = matchingBrace(source, open);
    const prelude = source.slice(cursor, open);
    const body = source.slice(open + 1, close);
    const trimmed = prelude.trim();
    if (/^@(media|supports|container|layer)\b/i.test(trimmed)) output += `${prelude}{${scopeCss(body, root)}}`;
    else if (/^@(font-face|keyframes|-webkit-keyframes|page|property)\b/i.test(trimmed)) output += `${prelude}{${body}}`;
    else {
      const selectors = trimmed.split(',').map((selector) => {
        const normalized = selector.trim();
        if (!normalized) return normalized;
        if (normalized === ':root') return root;
        if (normalized.startsWith('body') || normalized.startsWith('html')) return `${root}${normalized.slice(4)}`;
        return `${root} ${normalized}`;
      });
      output += `${prelude.slice(0, prelude.length - prelude.trimStart().length)}${selectors.join(', ')}{${body}}`;
    }
    cursor = close + 1;
  }
  return output;
}

function extract(source) {
  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const scriptMatch = source.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/i);
  if (!styleMatch || !bodyMatch || !scriptMatch) throw new Error('HTML, CSS ou JS não encontrado.');
  return {
    css: styleMatch[1].trim(),
    content: bodyMatch[1].replace(/<script>[\s\S]*?<\/script>\s*$/i, '').trim(),
    js: scriptMatch[1].trim(),
  };
}

function splitForElementor(content) {
  const enrollmentStart = content.indexOf('<section class="section enroll" id="inscricao">');
  const afterStart = content.indexOf('<div class="video-modal"', enrollmentStart);
  const enrollment = content.slice(enrollmentStart, afterStart);
  const copyMatch = enrollment.match(/<div class="enroll-copy">([\s\S]*?)<\/div>\s*<div class="enroll-card-wrap">/i);
  if (enrollmentStart < 0 || afterStart < 0 || !copyMatch) throw new Error('Seção de inscrição não encontrada.');
  return {
    before: content.slice(0, enrollmentStart).trim(),
    copy: `<div class="enroll-copy">${copyMatch[1]}</div>`,
    after: content.slice(afterStart).trim(),
  };
}

function mediaMap(content) {
  return [...content.matchAll(/fotos(?:%20|\/)[^"')]+/g)].map((match) => match[0]);
}

fs.mkdirSync(outputDir, { recursive: true });
const imageDir = path.join(outputDir, 'assets', 'images');
fs.mkdirSync(imageDir, { recursive: true });
if (fs.readdirSync(imageDir).length === 0) fs.cpSync(path.join(projectDir, 'fotos professores'), imageDir, { recursive: true });
const imageList = fs.readdirSync(imageDir).map((item) => `- ${item}`).join('\n');

for (const version of versions) {
  const extracted = extract(fs.readFileSync(path.join(projectDir, version.source), 'utf8'));
  const root = `.phorte-pedagogia-${version.key}`;
  const css = scopeCss(extracted.css.replace(/\/\*[\s\S]*?\*\//g, ''), root);
  const split = splitForElementor(extracted.content);
  const versionDir = path.join(outputDir, version.key);
  const beforeContent = split.before.replace(/class="testimonial-video-slot"/g, 'class="testimonial-video-slot skip-lazy" data-no-lazy="1" data-skip-lazy="1"');
  const beforeWidget = `<!-- Pedagogia ${version.turma} — bloco antes da inscrição. -->\n<div class="phorte-pedagogia-${version.key}">\n${beforeContent}\n</div>\n`;
  const copyWidget = `<!-- Pedagogia ${version.turma} — coluna esquerda da inscrição. -->\n${split.copy}\n`;
  const formIntro = '<div class="form-intro"><h3>Inscreva-se em Pedagogia</h3><p>Preencha seus dados. Nossa equipe entrará em contato para dar sequência à sua inscrição.</p></div>\n';
  const formDisclaimer = '<p class="form-disclaimer">Condições sujeitas à disponibilidade de vagas, regulamento institucional e período de ingresso vigente.</p>\n';
  const afterWidget = `<!-- Pedagogia ${version.turma} — bloco depois do Form widget. -->\n<div class="phorte-pedagogia-${version.key}">\n${split.after}\n</div>\n<script>\n${extracted.js}\n</script>\n`;
  const nativeFormCss = `${root} .phorte-enrollment-form{background:#fff;border:1px solid rgba(201,45,45,.22);border-top:5px solid var(--red);border-radius:var(--radius);padding:27px;box-shadow:0 14px 35px rgba(201,45,45,.1)}\n${root} .phorte-enrollment-form .elementor-form-fields-wrapper{margin:0 -5px}\n${root} .phorte-enrollment-form .elementor-field-group{padding:0 5px;margin-bottom:14px}\n${root} .phorte-enrollment-form .elementor-field-label{font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:6px}\n${root} .phorte-enrollment-form .elementor-field,${root} .phorte-enrollment-form input,${root} .phorte-enrollment-form select{border:1px solid #d9d2cb!important;border-radius:10px!important;padding:12px 14px!important;background:#fff!important;color:var(--ink)!important;font-size:.92rem!important;min-height:46px}\n${root} .phorte-enrollment-form .elementor-field:focus{outline:2px solid var(--red)!important;outline-offset:1px}\n${root} .phorte-enrollment-form .elementor-button{width:100%;border:0;border-radius:999px;background:var(--yellow)!important;color:var(--ink)!important;font:700 .9rem var(--title);padding:15px 24px;transition:.2s transform,.2s background}\n${root} .phorte-enrollment-form .elementor-button:hover{background:var(--red)!important;color:#fff!important;transform:translateY(-2px)}\n@media(max-width:760px){${root} .phorte-enrollment-form{padding:22px 18px}}\n`;
  const nativeFormExtras = `${root} .form-intro h3,.phorte-enrollment-form .form-intro h3{font-size:22px!important;line-height:1.2!important;margin:0 0 6px;color:var(--ink)}\n${root} .form-intro p,.phorte-enrollment-form .form-intro p{font-size:14px!important;line-height:1.45!important;margin:0 0 18px;color:var(--muted)}\n${root} .form-disclaimer,.phorte-enrollment-form .form-disclaimer{font-size:14px!important;color:#957e70;margin:14px 0 0;text-align:center;line-height:1.45}\n.phorte-enrollment-form{width:100%!important;max-width:465px!important;padding:28px 27px 36px!important;box-sizing:border-box}\n.phorte-enrollment-form .elementor-field-group{margin-bottom:16px!important}\n.phorte-enrollment-form .elementor-field-label{font-size:14px!important;line-height:1.2!important;margin-bottom:7px!important}\n.phorte-enrollment-form .elementor-field{height:48px!important;min-height:48px!important;line-height:1.35!important;font-size:16px!important;padding:12px 16px!important}\n.phorte-enrollment-form .elementor-button{min-height:52px!important;font-size:16px!important;padding:15px 24px!important}\n@media(max-width:760px){.phorte-enrollment-form{max-width:100%!important;padding:24px 20px 30px!important}.phorte-enrollment-form .elementor-field-label{font-size:13px!important}.phorte-enrollment-form .elementor-field{font-size:15px!important}}\n`;
  const nativeFormSuccessCss = `${root} .phorte-enrollment-form .elementor-message.elementor-message-success,${root} .phorte-enrollment-form .elementor-message-success{margin:16px 0 0!important;padding:13px 14px!important;border:0!important;border-radius:12px!important;background:#e8f8ed!important;color:#176b32!important;font-size:14px!important;font-weight:600!important;line-height:1.45!important;text-align:center!important}`;
  const nativeSelectCss = `${root} .phorte-enrollment-form .elementor-select-wrapper{position:relative;width:100%}\n${root} .phorte-enrollment-form .elementor-select-wrapper select{width:100%!important;appearance:none!important;-webkit-appearance:none!important;background:#fff!important;border:1px solid #d9d2cb!important;border-radius:10px!important;color:var(--ink)!important;cursor:pointer;padding:12px 42px 12px 16px!important;min-height:48px!important;font-size:16px!important;line-height:1.35!important}\n${root} .phorte-enrollment-form .elementor-select-wrapper:after{content:'⌄';position:absolute;right:16px;top:50%;transform:translateY(-58%);color:var(--ink);font-size:18px;font-weight:700;line-height:1;pointer-events:none}\n${root} .phorte-enrollment-form .elementor-select-wrapper select:focus{outline:2px solid var(--red)!important;outline-offset:1px}\n@media(max-width:760px){${root} .phorte-enrollment-form .elementor-select-wrapper select{font-size:15px!important}}`;
  const nativeSelectResetCss = `${root} .phorte-enrollment-form .elementor-select-wrapper{height:auto!important;min-height:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}`;
  const mediaList = [...new Set(mediaMap(extracted.content))].map((item) => `- ${item}`).join('\n');
  const readme = [
    `# Pedagogia ${version.turma} no Elementor`, '',
    '## Estrutura recomendada', '',
    'Container — Página Pedagogia',
    '- HTML: widget-before-form.html',
    '- Container: phorte-enrollment',
    '  - Container: phorte-enrollment-grid',
    '    - HTML: enrollment-copy.html',
    '    - Container: phorte-enrollment-form',
    '      - HTML: form-intro.html',
    '      - Form widget nativo',
    '      - HTML: form-disclaimer.html',
    '- HTML: widget-after-form.html', '',
    '## Publicação', '',
    `1. Aplique a classe phorte-pedagogia-${version.key} no container principal.`,
    '2. Cole o CSS compartilhado de elementor/2026-2/styles.css no CSS personalizado/global do Elementor.',
    '3. Configure o widget Form com os campos e ações abaixo.',
    '4. Envie as imagens de elementor/assets/images para a Biblioteca de Mídia e substitua os caminhos relativos.', '',
    '## Form widget', '',
    `Nome do formulário: pedagogia_${version.key.replace('-', '_')}`,
    'Campos: nome, email, whatsapp, ingresso e curso oculto = Pedagogia.',
    'Mensagem de sucesso: Recebemos seus dados! Nossa equipe vai entrar em contato pelo WhatsApp em breve.',
    'Ações: Collect Submissions + Email; conecte o CRM oficial quando definido.', '',
    '## Imagens reunidas', '', imageList, '',
  ].join('\n');

  fs.mkdirSync(versionDir, { recursive: true });
  fs.rmSync(path.join(versionDir, 'widget-html.html'), { force: true });
  fs.writeFileSync(path.join(versionDir, 'widget-before-form.html'), beforeWidget);
  fs.writeFileSync(path.join(versionDir, 'enrollment-copy.html'), copyWidget);
  fs.writeFileSync(path.join(versionDir, 'widget-after-form.html'), afterWidget);
  fs.writeFileSync(path.join(versionDir, 'form-intro.html'), formIntro);
  fs.writeFileSync(path.join(versionDir, 'form-disclaimer.html'), formDisclaimer);
  fs.writeFileSync(path.join(versionDir, 'styles.css'), `${css}\n`);
  fs.writeFileSync(path.join(versionDir, 'elementor-form.css'), `${nativeFormCss}${nativeFormExtras}${nativeFormSuccessCss}${nativeSelectCss}${nativeSelectResetCss}`);
  fs.writeFileSync(path.join(versionDir, 'script.js'), `${extracted.js}\n`);
  fs.writeFileSync(path.join(versionDir, 'README.md'), `${readme}\n`);
}

const sharedCss = versions.map((version) => {
  const versionDir = path.join(outputDir, version.key);
  return `/* Pedagogia ${version.turma} */\n${fs.readFileSync(path.join(versionDir, 'styles.css'), 'utf8')}\n${fs.readFileSync(path.join(versionDir, 'elementor-form.css'), 'utf8')}`;
}).join('\n');
fs.writeFileSync(path.join(outputDir, '2026-2', 'styles.css'), `${sharedCss}\n`);
fs.rmSync(path.join(outputDir, '2026-2', 'elementor-form.css'), { force: true });
fs.rmSync(path.join(outputDir, '2027-1', 'styles.css'), { force: true });
fs.rmSync(path.join(outputDir, '2027-1', 'elementor-form.css'), { force: true });

console.log(`Pacotes Elementor gerados em ${outputDir}`);
