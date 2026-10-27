import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('cadastro.html', root), 'utf8');
const jsPath = new URL('cadastro.js', root);
const js = existsSync(jsPath) ? readFileSync(jsPath, 'utf8') : '';
const checks = [];
const check = (name, run) => {
  try { run(); checks.push({ name, pass: true }); }
  catch (error) { checks.push({ name, pass: false, message: error.message }); }
};
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map((match) => [match[1], match[2]]));

check('um único título principal', () => assert.equal((html.match(/<h1\b/gi) || []).length, 1));
check('CTA visível leva ao formulário', () => assert.match(html, /<a\b(?![^>]*\bhidden\b)[^>]*href="#formulario"[^>]*>\s*[^<\s][\s\S]*?<\/a>/));
check('nota deixa a demonstração explícita', () => assert.ok(html.includes('não envia nem armazena dados')));
check('submissão real impedida', () => assert.ok(/<form\b[^>]*onsubmit="return false"/.test(html) || /addEventListener\(['"]submit['"][\s\S]*?preventDefault\(\)/.test(js)));
check('cada campo tem label associado', () => {
  const fields = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)];
  assert.ok(fields.length >= 2, 'campos ausentes');
  for (const [tag] of fields) {
    const field = attributes(tag);
    assert.ok(field.id && new RegExp(`<label\\b[^>]*for="${field.id}"`).test(html), `label ausente: ${field.id || tag}`);
  }
});
check('imagens têm descrição e dimensões; fora do hero são lazy', () => {
  const hero = html.match(/<section\b[^>]*class="[^"]*cadastro-hero[^"]*"[\s\S]*?<\/section>/)?.[0] || '';
  const images = [...html.matchAll(/<img\b[^>]*>/g)];
  assert.ok(images.length >= 3, 'três fotos aprovadas ausentes');
  for (const [tag] of images) {
    const image = attributes(tag);
    assert.ok(image.alt?.trim() && Number(image.width) > 0 && Number(image.height) > 0, `alt ou dimensões ausentes: ${image.src}`);
    if (image.src === 'assets/phorte-logo.svg') assert.equal(image.loading, 'eager', `logo deve carregar imediatamente: ${image.src}`);
    else if (!hero.includes(tag)) assert.equal(image.loading, 'lazy', `lazy ausente: ${image.src}`);
    assert.ok(/^assets\//.test(image.src), `imagem não local: ${image.src}`);
  }
});
check('CSS compartilhado e arquivos próprios carregados', () => {
  for (const path of ['styles.css', 'cadastro.css', 'cadastro.js']) {
    assert.ok(existsSync(new URL(path, root)), `arquivo ausente: ${path}`);
    assert.ok(html.includes(`"${path}"`), `import ausente: ${path}`);
  }
});
check('sem rastreamento ou endpoint de formulário', () => {
  assert.doesNotMatch(html + js, /(?:rdstation|rd\.services|google-analytics|googletagmanager|facebook\.com\/tr|fbq\s*\(|gtag\s*\(|analytics\.|pixel\.|<form\b[^>]*action\s*=\s*["'][^"']+)/i);
  assert.doesNotMatch(js, /\b(?:FormData|fetch|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b/);
});

for (const result of checks) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.pass ? '' : `: ${result.message}`}`);
const failures = checks.filter((check) => !check.pass).length;
console.log(`${checks.length - failures}/${checks.length} verificações aprovadas — ${fileURLToPath(root)}`);
process.exitCode = failures ? 1 : 0;
