const { chromium }=require('../../../../Phorte/node_modules/playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const output=path.resolve(root,'../../output/playwright/home-graduacao-phorte/implementacao');
const base=process.env.HG_PREVIEW_BASE||'http://127.0.0.1:4177/Graduacao/home-graduacao-phorte';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const report={checks:[],result:'RUNNING'};
 const check=(ok,text)=>{assert(ok,text);report.checks.push(text);};
 try{
  const assets=JSON.parse(await fs.readFile(path.join(root,'elementor/assets-publicacao.json'),'utf8')).assets;
  const content=JSON.parse(await fs.readFile(path.join(root,'conteudo/home.json'),'utf8'));
  for(const v of ['a']){
   const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('https://**',async route=>{
    const asset=assets.find(a=>a.url===route.request().url());
    if(asset)await route.fulfill({status:200,body:await fs.readFile(path.join(root,asset.path)),contentType:asset.path.endsWith('.svg')?'image/svg+xml':'image/webp',headers:{'access-control-allow-origin':'*'}});
    else await route.abort();
   });
   const read=relative=>fs.readFile(path.join(root,'elementor',relative),'utf8');
   const header=await read('cabecalho/widget-html.html'),footer=await read('rodape/widget-html.html');
   const before=await read('home-'+v+'/1-antes-atendimento.html'),after=await read('home-'+v+'/3-depois-atendimento.html');
   const form='<div class="hg-scope hg-form-block" id="hg-formulario"><div class="hg-container"><div class="hg-form-panel"><div class="elementor-widget elementor-widget-form"><div class="elementor-widget-container"><form class="elementor-form" onsubmit="return false"><div class="elementor-form-fields-wrapper"><div class="elementor-field-group"><label class="elementor-field-label" for="native-name">Nome</label><input class="elementor-field" id="native-name" type="text"></div><div class="elementor-field-group"><label class="elementor-field-label" for="native-email">E-mail</label><input class="elementor-field" id="native-email" type="email"></div><div class="elementor-field-group"><label class="elementor-field-label" for="native-phone">Telefone</label><input class="elementor-field" id="native-phone" type="tel"></div><div class="elementor-field-group elementor-field-type-submit"><button class="elementor-button" type="button" disabled>Prévia sem envio</button></div></div></form></div></div></div></div></div>';
   const widget=html=>'<div class="elementor-widget elementor-widget-html" style="width:100%"><div class="elementor-widget-container">'+html+'</div></div>';
   const html='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Fixture de integração</title><style>body{margin:0;background:#fafafa;font-family:Georgia}h2{color:purple;font:700 50px/2 Georgia;text-transform:uppercase}button{border-radius:0;background:orange}img{max-width:100%;height:auto}#outside{font:21px Georgia;color:rgb(22,44,88)}.elementor-widget{width:100%;min-width:0}</style></head><body><p id="outside">Texto externo ao componente</p>'+widget(header)+'<div class="elementor e-con" style="display:flex;flex-direction:column;gap:0;width:100%">'+widget(before)+form+widget(after)+'</div>'+widget(footer)+'</body></html>';
   await page.route('**/hg-fixture',r=>r.fulfill({status:200,body:html,contentType:'text/html'}));
   await page.goto('http://127.0.0.1:4177/hg-fixture',{waitUntil:'load'});
   await page.evaluate(()=>document.fonts.ready);
   check(await page.locator('#hg-main[role=main]').count()===1,v+': identifica contêiner Elementor como região principal');
   const beforeStyle=await page.locator('#outside').evaluate(e=>({color:getComputedStyle(e).color,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize}));
   check(beforeStyle.color==='rgb(22, 44, 88)'&&beforeStyle.font==='Georgia'&&beforeStyle.size==='21px',v+': elemento externo preservado');
   check(await page.locator('#hg-catalog-title').evaluate(e=>getComputedStyle(e).fontFamily.startsWith('PhorteGraduacaoPoppins')&&getComputedStyle(e).textTransform==='none'),v+': tipografia resiste ao tema');
   for(const width of [390,1440]){
    await page.setViewportSize({width,height:960});
    await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),v+': fragmentos sem overflow em '+width);
    const gap=await page.evaluate(()=>document.querySelector('#hg-formulario').getBoundingClientRect().top-document.querySelector('.hg-contact-panel').getBoundingClientRect().bottom);
    check(Math.abs(gap)<1,v+': sem faixa vazia entre widgets em '+width);
    check(await page.locator('#native-name').evaluate(e=>{const r=e.getBoundingClientRect();return r.width>100&&r.width<1200;}),v+': formulário nativo fica no painel em '+width);
   }
   await page.evaluate(()=>{document.querySelector('#hg-home-after').remove();window.PhorteGraduacao.init();window.PhorteGraduacao.init();});
   check(await page.locator('#phorte-header-2027').count()===1&&await page.locator('#phorte-header-2027 [data-carousel-slide]').count()===1,v+': bloco removido e reinicialização não duplicam hero');
   check(errors.length===0,v+': fragmentos sem erros — '+errors.join('; '));
   await page.close();
  }
  const headerOnly=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const headerErrors=[];headerOnly.on('pageerror',e=>headerErrors.push(e.message));
  await headerOnly.route('https://**',r=>r.abort());
  await headerOnly.setContent('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Cabeçalho independente</title></head><body>'+await fs.readFile(path.join(root,'elementor/cabecalho/widget-html.html'),'utf8')+'<main>Conteúdo da página hospedeira</main></body></html>');
  await headerOnly.locator('.hg-skip').focus();await headerOnly.keyboard.press('Enter');
  check(await headerOnly.locator('main').evaluate(e=>e===document.activeElement),'Cabeçalho independente encontra main da página hospedeira');
  await headerOnly.locator('main').evaluate(e=>e.remove());
  await headerOnly.locator('.hg-skip').focus();await headerOnly.keyboard.press('Enter');
  await headerOnly.getByRole('button',{name:'Abrir menu'}).click();
  check(headerErrors.length===0 && await headerOnly.locator('.hg-menu-toggle').getAttribute('aria-expanded')==='true','Cabeçalho sem região principal continua funcionando sem erro');
  await headerOnly.close();
  const fallback=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await fallback.route('**/assets/**',r=>r.abort());
  for(const v of ['a']){
   await fallback.goto(base+'/previa-'+v+'/');
   if(v==='b')await fallback.getByRole('tab').last().click();
   check(await fallback.getByRole('link',{name:/Conhecer o curso|Ver detalhes do curso/}).count()>=1,v+': curso acessível com falha de mídia/fonte');
   check(await fallback.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),v+': fallback legível sem overflow');
  }
  await fallback.close();
  const blockedVideo=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await blockedVideo.route('https://www.youtube-nocookie.com/**',r=>r.abort());
  await blockedVideo.goto(base+'/previa-a/');
  const video=blockedVideo.locator('[data-video]').first();
  await video.locator('[data-video-play]').click();
  check(await video.getByRole('link',{name:/Assistir no YouTube/}).count()===1,'Player bloqueado mantém link alternativo do YouTube');
  check(await video.getByRole('link',{name:/Assistir no YouTube/}).evaluate(e=>e.getBoundingClientRect().top>=e.parentElement.querySelector('iframe').getBoundingClientRect().bottom-1),'Link alternativo fica abaixo do player sem cobrir controles');
  await blockedVideo.close();
  const still=await browser.newPage({viewport:{width:1440,height:960}});
  await still.goto(base+'/previa-a/');
  await still.waitForTimeout(6000);
  check(await still.locator('#phorte-header-2027 [data-carousel-slide]').first().getAttribute('data-active')!=='false','Slide único permanece ativo, sem rotação');
  await still.close();
  report.result='PASS';
 }catch(e){report.result='FAIL';report.error=e.stack;process.exitCode=1;}
 finally{await browser.close();await fs.mkdir(output,{recursive:true});await fs.writeFile(path.join(output,'qa-integracao.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
})();
