const { chromium } = require('../../../../Phorte/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, '../../output/playwright/home-graduacao-phorte/implementacao');
const base = process.env.HG_PREVIEW_BASE || 'http://127.0.0.1:4177/Graduacao/home-graduacao-phorte';
const axePath = path.resolve(__dirname, '../../../../Phorte/node_modules/axe-core/axe.min.js');
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { variants: [], checks: [], errors: [], date: new Date().toISOString() };
  const check = (condition, message) => { assert(condition, message); report.checks.push(message); };
  try {
    for (const variant of ['a']) {
      const page = await browser.newPage({ viewport:{ width:1440,height:960 }, reducedMotion:'reduce' });
      const pageErrors=[];
      page.on('pageerror', e => pageErrors.push(e.message));
      const response = await page.goto(base + '/previa-' + variant + '/', { waitUntil:'load' });
      check(response.status() === 200, 'Prévia ' + variant + ' responde 200');
      await page.evaluate(() => document.fonts.ready);
      check(await page.locator('.hg-course').count() === 7, variant + ': sete cursos no HTML');
      check(await page.locator('h1').count() === 1, variant + ': um título principal');
      const formGap = await page.evaluate(() => document.querySelector('#hg-formulario').getBoundingClientRect().top - document.querySelector('.hg-contact-panel').getBoundingClientRect().bottom);
      check(Math.abs(formGap) < 1,variant+': atendimento e formulário sem faixa vazia');
      check(await page.locator('.hg-hero').evaluate(e=>getComputedStyle(e).paddingTop==='0px'),variant+': hero sem padding extra de outra peça');
      const layouts=[];
      for (const width of [320,390,768,1024,1440]) {
        await page.setViewportSize({ width,height:960 });
        await page.evaluate(async () => { document.querySelectorAll('img').forEach(i => { i.loading='eager'; }); await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
        const layout=await page.evaluate(() => ({ width:innerWidth, scrollWidth:document.documentElement.scrollWidth, broken:[...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src) }));
        check(layout.scrollWidth <= width, variant + ': sem overflow em ' + width);
        check(layout.broken.length === 0, variant + ': imagens carregam em ' + width);
        layouts.push(layout);
        if ([390,1440].includes(width)) await page.screenshot({ path:path.join(output, variant + '-' + width + '.png'),fullPage:true });
      }
      if (variant === 'a') {
        await page.getByLabel('Nome do curso').fill('educacao fisica');
        check(await page.locator('.hg-course:not([hidden])').count() === 1, 'A: busca sem acento encontra Educação Física');
        await page.getByLabel('Modalidade de estudo').selectOption('241');
        check(await page.locator('.hg-course:not([hidden])').count() === 0, 'A: interseção incompatível fica vazia');
        check(await page.locator('[data-empty]').isVisible(), 'A: informa ausência de resultados');
        await page.getByRole('button',{name:'Limpar filtros'}).click();
        check(await page.locator('.hg-course:not([hidden])').count() === 7, 'A: limpar recupera sete cursos');
      } else {
        const tabs=page.getByRole('tab');
        check(await tabs.count()===7,'B: sete abas');
        await page.locator('#hg-aba-32014').focus();
        await page.keyboard.press('End');
        check(await page.locator('#hg-aba-32012').getAttribute('aria-selected')==='true','B: End seleciona última aba');
        await page.keyboard.press('ArrowRight');
        check(await page.locator('#hg-aba-32014').getAttribute('aria-selected')==='true','B: seta circula para primeira aba');
        check(await page.getByRole('tabpanel').count()===1,'B: somente painel selecionado acessível');
      }
      const hero=page.locator('#phorte-header-2027');
      check(await hero.locator('[data-carousel-slide]').count()===1&&(await page.content()).indexOf('dia-do-professor-2026')<0,variant+': só o slide Graduação 2027 (Dia do Professor removido)');
      check(await hero.locator('[data-carousel-controls]').isHidden(),variant+': slide único sem controles de carrossel');
      await page.setViewportSize({ width:390,height:844 });
      const menu=page.getByRole('button',{name:'Abrir menu'});
      await menu.click();
      check(await menu.getAttribute('aria-expanded')==='true',variant+': menu mobile abre');
      await page.keyboard.press('Escape');
      check(await menu.getAttribute('aria-expanded')==='false',variant+': Escape fecha menu');
      const postRequests=[];
      page.on('request',r=>{if(r.method()==='POST')postRequests.push(r.url());});
      await page.locator('#hg-formulario input[type=text]').fill('Pessoa de teste');
      await page.locator('#hg-formulario input[type=text]').press('Enter');
      check(postRequests.length===0 && !page.url().includes('?'),'Formulário '+variant+': Enter não envia dados');
      check(await page.locator('iframe').count()===0,variant+': vídeos não carregam antes do clique');
      await page.route('https://www.youtube-nocookie.com/embed/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html lang="pt-BR"><head><title>Player simulado para QA</title></head><body>Player</body></html>'}));
      await page.locator('[data-video-play]').first().click();
      check(await page.locator('iframe').count()===1,variant+': vídeo carrega após clique');
      await page.evaluate(()=>{ window.PhorteGraduacao?.init(); window.PhorteGraduacao?.init(); });
      check(await hero.locator('[data-carousel-slide]').count()===1&&await hero.locator('[data-carousel-controls]').isHidden(),variant+': reinicialização mantém slide único');
      await page.addScriptTag({ path:axePath });
      const axe=await page.evaluate(async()=>{const r=await axe.run(document,{rules:{'color-contrast':{enabled:true}}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});
      check(axe.length===0,variant+': axe sem violações — '+JSON.stringify(axe));
      check(pageErrors.length===0,variant+': nenhum erro JavaScript — '+pageErrors.join('; '));
      report.variants.push({ variant,layouts,axe,pageErrors });
      await page.close();
    }
    const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
    for(const v of ['a']){await noJs.goto(base+'/previa-'+v+'/');check(await noJs.locator('.hg-course:visible').count()===7,v+': sete cursos visíveis sem JS');}
    await noJs.close();
    report.result='PASS';
  } catch(e) { report.result='FAIL';report.errors.push(e.stack);process.exitCode=1; }
  finally { await browser.close();await fs.writeFile(path.join(output,'qa.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors},null,2)); }
})();
