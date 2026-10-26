import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('materiais.html', root), 'utf8');
const jsPath = new URL('materiais.js', root);
const js = existsSync(jsPath) ? readFileSync(jsPath, 'utf8') : '';
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)].map((match) => [match[1], match[2].replaceAll('&amp;', '&')]));
const plain = (value) => value.replace(/<[^>]+>/g, '').trim();
const checks = [];
const check = (name, run) => {
  try { run(); checks.push({ name, pass: true }); }
  catch (error) { checks.push({ name, pass: false, message: error.message }); }
};
const lessons = [
  ['Conheça o Jardim Fabulinus: conceito, proposta e inspiração', 'https://www.youtube.com/watch?v=f_xTsSMG1-g&list=PLQfqUM3sJ0NVbn2krhqUlk4rJQiIJde7Z&index=4'],
  ['Os Projetos no Fabulinus: planejamento, intencionalidade e desenvolvimento', 'https://www.youtube.com/watch?v=ZPBLbvitNdo&list=PLQfqUM3sJ0NVbn2krhqUlk4rJQiIJde7Z&index=3'],
  ['Os Princípios do Fabulinus: fundamentos que orientam a prática', 'https://www.youtube.com/watch?v=1ctRt_bE1oY&list=PLQfqUM3sJ0NVbn2krhqUlk4rJQiIJde7Z&index=2'],
  ['A Vida Prática no Fabulinus: experiências do cotidiano pedagógico', 'https://www.youtube.com/watch?v=D_pHRKH3vto&list=PLQfqUM3sJ0NVbn2krhqUlk4rJQiIJde7Z&index=1&pp=iAQB'],
];
check('um único h1', () => assert.equal((html.match(/<h1\b/gi) || []).length, 1));
check('quatro aulas com títulos e destinos aprovados', () => {
  const cards = [...html.matchAll(/<article\b[^>]*class="lesson-card"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(cards.length, 4);
  lessons.forEach(([title, url], index) => {
    assert.equal(plain(cards[index][1].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1] || ''), title);
    assert.equal(attributes(cards[index][1].match(/<a\b[^>]*>/)?.[0] || '').href, url);
  });
});
check('nenhum iframe ou carregamento antecipado do YouTube', () => {
  assert.doesNotMatch(html, /<iframe\b[^>]*\bsrc\s*=\s*"[^"]+"/i);
  assert.doesNotMatch(html, /<(?:img|script|link)\b[^>]*(?:src|href)="https?:\/\/[^" ]*(?:youtube|ytimg)/i);
});
check('botão nativo com nome acessível e URL exata sob demanda', () => {
  const button = html.match(/<button\b[^>]*data-video-src="[^"]+"[^>]*>[\s\S]*?<\/button>/)?.[0] || '';
  const attrs = attributes(button);
  assert.equal(attrs.type, 'button');
  assert.equal(attrs['data-video-src'], 'https://www.youtube-nocookie.com/embed/AeRvxB_ybvY?rel=0');
  assert.match(attrs['aria-label'] || plain(button), /Assistir.*depoimento/i);
});
check('fallback externo sempre disponível para o depoimento', () => {
  const fallback = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([tag]) => ({ tag, attrs: attributes(tag) })).find(({ attrs }) => attrs.href === 'https://www.youtube.com/watch?v=AeRvxB_ybvY');
  assert.ok(fallback && !/\bhidden\b/.test(fallback.tag));
  assert.match(plain(fallback.tag), /depoimento.*YouTube/i);
  assert.match(fallback.attrs.rel, /noopener/);
});
check('CTA da pós com rótulo humano e UTMs preservadas', () => {
  const cta = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([tag]) => ({ tag, attrs: attributes(tag) })).find(({ attrs }) => attrs.href?.startsWith('https://posphorte.com.br/'));
  assert.ok(cta);
  assert.equal(plain(cta.tag).replace('↗', '').trim(), 'Conhecer a Pós em Jardim Fabulinus');
  assert.equal(cta.attrs.href, 'https://posphorte.com.br/pos-graduacao/jardim-fabulinus/?utm_source=materiaisgratuitos&utm_medium=paginademateriaisdefabulinusmanychat&utm_campaign=posemfabulinus&utm_id=posemfabulinus&utm_term=paginademateriaisdefabulinusmanychat&utm_content=paginademateriaisdefabulinusmanychat');
});
check('destinos comerciais normalizados e sem URL bruta visível', () => {
  const links = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([tag]) => ({ tag, attrs: attributes(tag) })).filter(({ attrs }) => attrs.href?.includes('posphorte.com.br'));
  assert.equal(links.length, 3);
  for (const { tag, attrs } of links) {
    assert.doesNotMatch(attrs.href, /posphorte\.com\.br\/\/|\/\/\?|\/1\?$/);
    assert.doesNotMatch(plain(tag), /https?:\/\//);
    assert.ok(plain(tag).length > 5);
  }
  assert.ok(links.some(({ attrs }) => attrs.href === 'https://inscricao.posphorte.com.br/inscricao/pre-cadastro/contribuicoes-de-neurociencia-para-o-desenvolvimento-entre-0-e-3-anos/701/1'));
  assert.ok(links.some(({ attrs }) => attrs.href === 'https://inscricao.posphorte.com.br/inscricao/pre-cadastro/aplicacao-da-psicomotricidade-na-pratica-educacional/1166/1'));
});
check('imports compartilhado e próprios existem', () => {
  for (const path of ['styles.css', 'materiais.css', 'materiais.js']) {
    assert.ok(existsSync(new URL(path, root)), `arquivo ausente: ${path}`);
    assert.ok(html.includes(`"${path}"`), `import ausente: ${path}`);
  }
});
check('três docentes com imagens locais dimensionadas, alt e loading', () => {
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));
  assert.equal(images.length, 3);
  for (const [src, name] of [['assets/alejandra-cippitelli.webp', 'Alejandra Cippitelli'], ['assets/alejandra-dubovik.jpg', 'Alejandra Dubovik'], ['assets/cristiano-final.webp', 'Cristiano Alcântara']]) {
    const image = images.find((image) => image.src === src);
    assert.ok(image && image.alt.includes(name), `imagem ou alt ausente: ${name}`);
    assert.ok(Number(image.width) > 0 && Number(image.height) > 0);
    assert.match(image.loading, /^(eager|lazy)$/);
    assert.ok(existsSync(new URL(image.src, root)));
  }
});
check('ordem confirmação, aulas, depoimento, pós e bônus', () => {
  const markers = ['class="materials-hero', 'class="lessons-section', 'class="materials-testimonial', 'class="course-promo', 'class="bonus-section'];
  const positions = markers.map((marker) => html.indexOf(marker));
  assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])));
});
check('sem coleta, rastreamento ou autoplay', () => {
  assert.doesNotMatch(html, /<(?:form|input|textarea|select)\b|(?:google-analytics|googletagmanager|rdstation|facebook\.com\/tr)/i);
  assert.doesNotMatch(js, /\b(?:FormData|fetch|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b|autoplay/i);
});
for (const result of checks) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.pass ? '' : `: ${result.message}`}`);
const failures = checks.filter((result) => !result.pass).length;
console.log(`${checks.length - failures}/${checks.length} verificações aprovadas`);
process.exitCode = failures ? 1 : 0;
