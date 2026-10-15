async (page) => {
  const base = 'http://127.0.0.1:4177/Pos/home-posphorte/';
  const check = (value, message) => { if (!value) throw new Error(message); };
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  const hero = page.locator('[data-hero-carousel]');
  check(await hero.locator('[data-hero-slide]').count() === 3, 'Devem existir três slides');
  check(await hero.locator('.hp-hero-dot').count() === 3, 'Devem existir três indicadores');
  check(await hero.locator('[data-hero-rotation]').getAttribute('aria-pressed') === 'false', 'Movimento reduzido inicia pausado');
  const typography = await page.locator('#hp-hero-title').evaluate(e => ({
    family: getComputedStyle(e).fontFamily, weight: getComputedStyle(e).fontWeight,
    spacing: getComputedStyle(e).letterSpacing, synthesis: getComputedStyle(e).fontSynthesis
  }));
  check(typography.spacing === 'normal' && typography.synthesis === 'none', 'Poppins precisa manter espaçamento natural e não sintetizar pesos');
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const doc = await cdp.send('DOM.getDocument');
  const node = await cdp.send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '#hp-hero-title' });
  const platformFonts = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: node.nodeId });
  check(platformFonts.fonts.some(f => /Poppins/i.test(f.familyName) && f.isCustomFont), 'A fonte efetivamente renderizada precisa ser Poppins');
  const layouts = [];
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (let slide = 0; slide < 3; slide++) {
      await hero.locator('.hp-hero-dot').nth(slide).click();
      await page.waitForFunction(i => document.querySelectorAll('[data-hero-slide]')[i].dataset.active === 'true', slide);
      const measurements = await page.evaluate(() => {
        const active = document.querySelector('[data-hero-slide][data-active="true"]');
        const controls = document.querySelector('[data-hero-rotation]').getBoundingClientRect();
        const panel = document.querySelector('#hp-busca .phorte-pos-search__panel').getBoundingClientRect();
        return {
          width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          active: document.querySelectorAll('[data-hero-slide][data-active="true"]').length,
          inactiveAccessible: [...document.querySelectorAll('[data-hero-slide][data-active="false"]')].some(e => !e.inert || e.getAttribute('aria-hidden') !== 'true'),
          controlsClearOfSearch: controls.bottom <= panel.top,
          imageSrc: active.querySelector('picture img')?.currentSrc
        };
      });
      check(measurements.scrollWidth <= width, 'Overflow no slide ' + slide + ' em ' + width);
      check(measurements.active === 1 && !measurements.inactiveAccessible, 'Slides inativos precisam ficar inertes');
      check(measurements.controlsClearOfSearch, 'Busca não pode cobrir os controles');
      if (slide === 2) check(measurements.imageSrc.includes(width < 768 ? '-mobile.webp' : '-phorte.webp'), 'Arte responsiva correta');
      await hero.screenshot({ path: 'output/playwright/home-posphorte/hero-' + width + '-slide-' + (slide + 1) + '.png', animations: 'disabled' });
      layouts.push({ width, slide: slide + 1, ...measurements });
    }
  }
  await hero.locator('.hp-hero-dot').first().click();
  const firstLink = hero.locator('.hp-hero-actions a').first();
  await firstLink.focus();
  await firstLink.press('ArrowRight');
  check(await firstLink.evaluate(e => e === document.activeElement), 'Setas nos links devem preservar o foco');
  check(await hero.locator('[data-hero-slide]').first().getAttribute('data-active') === 'true', 'Atalho de troca restrito aos controles estáveis');
  await hero.locator('[data-hero-next]').click();
  await hero.locator('[data-hero-next]').press('ArrowRight');
  check(await hero.locator('[data-hero-slide]').nth(2).getAttribute('data-active') === 'true', 'Setas do teclado');
  check(await hero.locator('[data-hero-next]').evaluate(e => e === document.activeElement), 'Troca por teclado preserva o foco nos controles');
  const track = hero.locator('.hp-hero-track');
  await track.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 300, clientY: 100 });
  await track.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 100, clientY: 105 });
  check(await hero.locator('[data-hero-slide]').first().getAttribute('data-active') === 'true', 'Swipe deve avançar e retornar ao primeiro');
  const live = await page.context().newPage();
  await live.emulateMedia({ reducedMotion: 'no-preference' });
  await live.setViewportSize({ width: 1440, height: 1000 });
  await live.goto(base);
  await live.mouse.move(0, 0);
  await live.waitForFunction(() => document.querySelectorAll('[data-hero-slide]')[1].dataset.active === 'true', null, { timeout: 7000 });
  const rotation = live.locator('[data-hero-rotation]');
  await rotation.click();
  check(await rotation.getAttribute('aria-pressed') === 'false', 'Clique em pausar precisa realmente pausar');
  await live.mouse.move(0, 0);
  const pausedIndex = await live.locator('[data-hero-slide][data-active="true"]').getAttribute('aria-label');
  await live.waitForTimeout(5200);
  check(await live.locator('[data-hero-slide][data-active="true"]').getAttribute('aria-label') === pausedIndex, 'Pausa precisa impedir avanço');
  await rotation.click();
  await live.mouse.move(0, 0);
  check(await rotation.getAttribute('aria-pressed') === 'true', 'Retomar troca automática');
  await live.locator('.hp-hero-course-preview').first().focus();
  check(await rotation.getAttribute('aria-pressed') === 'false', 'Foco no conteúdo deve parar a rotação');
  await live.close();
  return { status: 'PASS', typography, platformFonts: platformFonts.fonts, layouts, controls: ['manual', 'autoplay 5s', 'pausa e retomada', 'teclado', 'swipe por eventos', 'movimento reduzido', 'slides inertes'] };
}
