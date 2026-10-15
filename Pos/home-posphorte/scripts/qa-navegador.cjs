// Executar via playwright-cli run-code --filename=... (sem @playwright/test).
async (page) => {
  const results = [];
  const base = 'http://127.0.0.1:4177/Pos/home-posphorte/';
  const output = 'output/playwright/home-posphorte/';
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  await page.goto(base);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(async () => {
      for (const image of document.images) {
        image.loading = 'eager';
      }
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      const track = document.querySelector('.hp-track');
      const card = track.firstElementChild;
      return {
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        columns: Number(getComputedStyle(document.querySelector('#hp-home-secoes')).getPropertyValue('--hp-columns')),
        track: track.clientWidth, card: card.getBoundingClientRect().width,
        broken: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
        h1: document.querySelectorAll('h1').length,
        headings: [...document.querySelectorAll('#hp-home-secoes > section')].map(s => s.getAttribute('aria-labelledby'))
      };
    });
    check(layout.scrollWidth <= width, 'Overflow em ' + width + 'px');
    check(layout.broken.length === 0, 'Imagens quebradas: ' + layout.broken.join(', '));
    check(layout.h1 === 1, 'Hierarquia do H1');
    check(layout.columns === (width >= 1024 ? 3 : width >= 768 ? 2 : 1), 'Quantidade de cards');
    await page.screenshot({ path: output + width + '-completa.png', fullPage: true, animations: 'disabled' });
    await page.locator('.hp-highlights').screenshot({ path: output + width + '-destaques.png', animations: 'disabled' });
    // Verificar a primeira, uma página intermediária e a última de cada trilho.
    for (const carousel of await page.locator('[data-carousel]').all()) {
      const dots = carousel.locator('.hp-carousel-dots button');
      const total = await dots.count();
      await dots.nth(Math.floor(total / 2)).click();
      await page.waitForFunction(id => Number(document.getElementById(id).scrollLeft) > 2, await carousel.locator('.hp-track').getAttribute('id'));
      await dots.last().click();
      await page.waitForFunction(id => {
        const t = document.getElementById(id);
        return Math.abs(t.scrollLeft - (t.scrollWidth - t.clientWidth)) < 3;
      }, await carousel.locator('.hp-track').getAttribute('id'));
      await page.waitForFunction(id => document.getElementById(id).closest('[data-carousel]').querySelector('[data-next]').disabled, await carousel.locator('.hp-track').getAttribute('id'));
      await dots.first().click();
      await page.waitForFunction(id => document.getElementById(id).closest('[data-carousel]').querySelector('[data-prev]').disabled, await carousel.locator('.hp-track').getAttribute('id'));
    }
    if (width < 1200) {
      const menu = page.getByRole('button', { name: 'Abrir menu', exact: true });
      await menu.click();
      check(await page.locator('#hp-navigation').isVisible(), 'Menu precisa abrir');
      await page.locator('#hp-navigation summary').first().click();
      await page.keyboard.press('Escape');
      check(!await page.locator('#hp-navigation details').first().getAttribute('open'), 'Escape fecha submenu');
      await page.keyboard.press('Escape');
      check(await menu.getAttribute('aria-expanded') === 'false', 'Escape fecha navegação');
    }
    results.push(layout);
  }
  // Busca: na prévia, a marcação de teste do [phorte_pos_search] ocupa o espaço entre o hero e as seções.
  const order = await page.evaluate(() => {
    const hero = document.getElementById('hp-home-hero'), slot = document.getElementById('hp-busca'), sections = document.getElementById('hp-home-secoes');
    return Boolean(hero.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING && slot.compareDocumentPosition(sections) & Node.DOCUMENT_POSITION_FOLLOWING && slot.querySelector('.phorte-pos-search__panel'));
  });
  check(order, 'Busca precisa ficar entre o hero e as seções');
  await page.locator('#hp-busca input[type="search"]').fill('educação');
  await page.locator('#hp-busca button[type="submit"]').click();
  check(page.url() === base, 'Busca da prévia não deve navegar');
  // Submenu do cabeçalho precisa ficar acima do hero, que é outro widget.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => scrollTo(0, 0));
  const firstMenu = page.locator('#hp-navigation details').first();
  await firstMenu.locator('summary').click();
  const lastItem = firstMenu.locator('li a').last();
  const box = await lastItem.boundingBox();
  check(await page.evaluate(([x, y]) => Boolean(document.elementFromPoint(x, y)?.closest('#hp-navigation')), [box.x + box.width / 2, box.y + box.height / 2]), 'Submenu precisa ficar acima do conteúdo');
  await page.keyboard.press('Escape');
  const quote = page.locator('.hp-quote-more').first();
  await quote.locator('summary').click();
  check(await quote.getAttribute('open') !== null, 'Relato completo precisa expandir');
  const track = page.locator('.hp-track').first();
  await track.focus();
  await page.keyboard.press('End');
  await page.waitForFunction(() => {
    const t = document.querySelector('.hp-track');
    return Math.abs(t.scrollLeft - (t.scrollWidth - t.clientWidth)) < 3;
  });
  await page.keyboard.press('Home');
  await track.scrollIntoViewIfNeeded();
  const dragBox = await track.boundingBox();
  await page.mouse.move(dragBox.x + dragBox.width - 25, dragBox.y + 35);
  await page.mouse.down();
  await page.mouse.move(dragBox.x + 25, dragBox.y + 35, { steps: 12 });
  await page.mouse.up();
  check(page.url() === base, 'Arraste não deve abrir link do curso');
  check(await track.evaluate(t => t.scrollLeft > 0), 'Arraste deve mover o trilho');
  await page.setViewportSize({ width: 768, height: 900 });
  check(await track.evaluate(t => t.scrollLeft <= t.scrollWidth - t.clientWidth), 'Resize deve preservar posição válida');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.keyboard.press('Tab');
  const cardLink = page.locator('.hp-course-card > a').first();
  await cardLink.focus();
  const focus = await cardLink.evaluate(e => ({ visible: e.matches(':focus-visible'), style: getComputedStyle(e).outlineStyle, offset: parseFloat(getComputedStyle(e).outlineOffset) }));
  check(focus.visible && focus.style !== 'none' && focus.offset < 0, 'Foco precisa permanecer visível dentro do card');
  check(await page.locator('[data-video] iframe').count() === 0, 'Não carregar iframes antes do clique');
  await page.route('https://www.youtube-nocookie.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Player verificado sem carregar rede externa</title>' }));
  const play = page.locator('[data-video]').first();
  await play.locator('.hp-video-play').click();
  check(await play.locator('iframe').count() === 1, 'Clique deve abrir player');
  check((await play.locator('iframe').getAttribute('src')).includes('wrZ4t0rCSog'), 'Vídeo correto');
  check(await play.locator('.hp-video-fallback').count() === 0, 'Link alternativo não pode cobrir o player');
  check(failures.length === 0, 'Erros de JavaScript: ' + failures.join(', '));
  return { status: 'PASS', layouts: results, interactions: ['carrosséis início/meio/fim', 'menu e Escape', 'busca [phorte_pos_search] entre hero e seções', 'submenu acima do hero', 'relato completo', 'teclado Home/End e foco visível', 'arraste sem navegação', 'resize após navegação', 'player sob demanda sem sobreposição'], pageErrors: failures };
}
