import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderHeader, renderFooter, renderSection, renderForm, esc } from './renderizar.mjs';
import { renderEditorialSection } from './renderizar-c.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
const repo = path.resolve(root, '../..');
const read = file => readFile(path.join(root, file), 'utf8');
const data = JSON.parse(await read('conteudo/home.json'));
const variants = JSON.parse(await read('conteudo/variantes.json'));
const assets = JSON.parse(await read('assets/manifest.json'));
const uploadBase = process.argv[2] || 'https://faculdadephorte.edu.br/wp-content/uploads/home-graduacao-phorte/';
if (!/^https:\/\/[^?#]+\/$/.test(uploadBase)) throw new Error('Informe uma URL HTTPS de pasta terminando em /.');
data.assets = assets;
const snippet = await readFile(path.join(repo, data.hero.sourceFile), 'utf8');
let heroCSS = snippet.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1].replace(/@font-face\s*\{[\s\S]*?\}\s*/g, '').replaceAll('Phorte Header Poppins','PhorteGraduacaoPoppins');
heroCSS = heroCSS.replace('#phorte-header-2027 .phorte-carousel[data-rotation-running="false"]', '#phorte-header-2027[data-rotation-running="false"]');
let heroMarkup = snippet.slice(snippet.indexOf('<section id="phorte-header-2027"'), snippet.lastIndexOf('</section>') + '</section>'.length);
// Campanha do Dia do Professor encerrada: remove o slide de imagem e mantém só Graduação 2027.
heroMarkup = heroMarkup.replace(/\s*<article\s+class="phorte-carousel__slide phorte-carousel__slide--image"[\s\S]*?<\/article>/, '');
if (heroMarkup.includes('dia-do-professor')) throw new Error('Slide do Dia do Professor não removido.');
heroMarkup = heroMarkup.replace('<span>Garantir minha vaga</span>', '<span>Escolher meu curso</span>');
heroMarkup = heroMarkup.replace(/\s+role="region"/, '').replace('class="phorte-campaign__modalities"', 'class="phorte-campaign__modalities" role="group"').replace(/(<(?:img|source)\b[^>]*?)\s*\/>/g, '$1>');
heroMarkup = heroMarkup.replace(/<article\b/g, '<div').replaceAll('</article>', '</div>');
for (const a of assets) if (a.id.startsWith('banner-')) { heroCSS = heroCSS.replaceAll(a.source, '../'+a.path); heroMarkup = heroMarkup.replaceAll(a.source, '../'+a.path); }
data.heroMarkup = heroMarkup;
const originalHeroJS = snippet.match(/<script>([\s\S]*?)<\/script>/)[1].replace("document.querySelectorAll('[data-carousel]')", "document.querySelectorAll('#phorte-header-2027[data-carousel]')");
const heroJS = 'window.PhorteGraduacaoInitBanner = () => {\n'+originalHeroJS+'\n};\nwindow.PhorteGraduacaoInitBanner();';
const baseCSS = await read('styles/base.css');
const headerCSS = baseCSS+'\n'+await read('styles/cabecalho.css');
const sharedHomeCSS = baseCSS+'\n'+heroCSS+'\n'+await read('styles/home.css');
const footerCSS = baseCSS+'\n'+await read('styles/rodape.css');
const headerJS = await read('js/cabecalho.js');
// Opção C: cabeçalho e home editoriais, sem o banner de campanha.
const editorialHeaderCSS = headerCSS+'\n'+await read('styles/cabecalho-c.css');
const editorialCSS = await read('styles/home.css')+'\n'+await read('styles/editorial-c.css');
const editorialJS = await read('js/home.js')+'\n'+await read('js/editorial.js');
const sharedHomeJS = heroJS+'\n'+await read('js/home.js');
const fontData = {};
for (const weight of [400,500,600,700,800]) fontData['../assets/fonts/poppins-'+weight+'.woff2']='data:font/woff2;base64,'+(await readFile(path.join(root,'assets/fonts/poppins-'+weight+'.woff2'))).toString('base64');
const usedAssets = new Set();
function publicMarkup(value) {
  for (const [file,base64] of Object.entries(fontData)) value=value.replaceAll(file,base64);
  for (const a of assets) if(value.includes('../'+a.path)) { usedAssets.add(a.path); value=value.replaceAll('../'+a.path,a.publishedUrl || uploadBase+path.basename(a.path)); }
  return value;
}
const style = css=>'<style>\n'+css+'\n</style>';
const script = js=>'<script>\n'+js.replaceAll('</script','<\\/script')+'\n</script>';
async function write(file,content) { await mkdir(path.dirname(path.join(root,file)),{recursive:true}); await writeFile(path.join(root,file),content); }
const header=renderHeader(data),footer=renderFooter(data);
const editorialHeader=header.replace('<header id="hg-cabecalho" class="hg-scope">','<header id="hg-cabecalho" class="hg-scope hg-header--editorial">');
if(editorialHeader===header) throw new Error('Cabeçalho editorial não aplicado.');
for(const [piece,markup,css,js] of [['cabecalho',header,headerCSS,headerJS],['cabecalho-c',editorialHeader,editorialHeaderCSS,headerJS],['rodape',footer,footerCSS,'']]) {
  await write('elementor/'+piece+'/widget-html.html',publicMarkup(style(css)+markup+(js?script(js):'')));
}
for(const [id,variant] of Object.entries(variants)) {
  const editorial=variant.catalogMode==='editorial';
  const pageHeader=editorial?editorialHeader:header, pageHeaderCSS=editorial?editorialHeaderCSS:headerCSS;
  // Editorial com campanha (B) leva também o CSS/JS do carrossel 2027.
  const campaign=variant.hero==='campaign';
  const homeCSS=editorial?baseCSS+'\n'+(campaign?heroCSS+'\n':'')+editorialCSS:sharedHomeCSS, homeJS=editorial?(campaign?heroJS+'\n':'')+editorialJS:sharedHomeJS;
  const formPlaceholder=renderForm(data,editorial?{catalogMode:'tabs'}:variant);
  const allSections=variant.sections.map(section=>editorial?renderEditorialSection(section,data,variant):renderSection(section,data,variant)).join('\n');
  const [before,rest]=allSections.split('<!-- HG_FORM_START -->');
  const [form,after]=rest.split('<!-- HG_FORM_END -->');
  const wrapBefore='<div id="hg-home-before" class="hg-scope" data-hg-before'+(editorial?' data-hgc-home':'')+' data-variant="'+id+'">'+before+'</div>';
  const wrapAfter='<div id="hg-home-after" class="hg-scope">'+after+'</div>';
  const renderedForm=form.replace('<!-- HG_NATIVE_FORM_SLOT -->',formPlaceholder);
  const preview='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="Prévia da home da graduação Phorte: '+esc(variant.label)+'"><title>Graduação Phorte · '+variant.label+'</title>'+style('html{scroll-behavior:smooth}body{margin:0;background:'+(editorial?'#fff':'#fafafa')+'}'+pageHeaderCSS+'\n'+homeCSS.slice(baseCSS.length)+'\n'+footerCSS.slice(baseCSS.length))+'</head><body>'+pageHeader+'<main id="hg-main" class="hg-scope" tabindex="-1" data-variant="'+id+'">'+wrapBefore+renderedForm+wrapAfter+'</main>'+footer+script(headerJS)+'\n'+script(homeJS)+'</body></html>';
  await write('previa-'+id+'/index.html',preview);
  await write('elementor/home-'+id+'/1-antes-atendimento.html',publicMarkup(style(homeCSS)+wrapBefore+script(homeJS)));
  await write('elementor/home-'+id+'/3-depois-atendimento.html',publicMarkup(wrapAfter));
  await write('elementor/home-'+id+'/2-formulario-previa.html',form.replace('<!-- HG_NATIVE_FORM_SLOT -->',formPlaceholder));
  await write('elementor/home-'+id+'/2-formulario.txt','Substituir a peça de prévia por um contêiner com classe hg-scope hg-form-block, ID hg-formulario. Dentro dele: contêiner classe hg-container, depois contêiner classe hg-form-panel e o widget Form do Elementor. Reaproveitar campos e ações verificadas do formulário atual. Não há integração de leads configurada no pacote.\n');
  const htmlWidget=(suffix,html)=>({id:'hg'+id+suffix,elType:'widget',widgetType:'html',settings:{html},elements:[]});
  const template={version:'0.4',title:'Phorte Graduação — Home '+id.toUpperCase()+' — '+variant.label,type:'section',content:[{id:'hg'+id+'main',elType:'container',isInner:false,settings:{html_tag:'main',_element_id:'hg-main',css_classes:'hg-scope',content_width:'full',flex_direction:'column',flex_gap:{unit:'px',size:0,column:'0',row:'0'},padding:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true}},elements:[htmlWidget('before',publicMarkup(style(homeCSS)+wrapBefore+script(homeJS))),htmlWidget('form',publicMarkup(renderedForm)),htmlWidget('after',publicMarkup(wrapAfter))]}],page_settings:[]};
  await write('elementor/home-'+id+'/template-elementor.json',JSON.stringify(template,null,2));
}
for(const piece of ['cabecalho','cabecalho-c','rodape']){
 const html=await read('elementor/'+piece+'/widget-html.html');
 await write('elementor/'+piece+'/template-elementor.json',JSON.stringify({version:'0.4',title:'Phorte Graduação — '+piece,type:'section',content:[{id:'hg'+piece,elType:'container',isInner:false,settings:{content_width:'full',flex_direction:'column',padding:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true}},elements:[{id:'hg'+piece+'html',elType:'widget',widgetType:'html',settings:{html},elements:[]}]}],page_settings:[]},null,2));
}
await write('elementor/assets-publicacao.json',JSON.stringify({generatedAt:new Date().toISOString(),uploadBase,fonts:'Poppins incorporada nos widgets; licença OFL no pacote.',assets:assets.filter(a=>usedAssets.has(a.path)).map(a=>({...a,url:a.publishedUrl||uploadBase+path.basename(a.path),status:a.publishedUrl?'URL existente da fonte; conferir antes da instalação':'Upload pendente'}))},null,2));
await write('index.html','<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Home Graduação Phorte — três propostas</title><style>body{margin:0;background:#f4f6f9;color:#1a1a1a;font:16px/1.7 Arial,sans-serif}main{max-width:1000px;margin:8vh auto;padding:24px}h1{font-size:clamp(30px,5vw,48px);line-height:1.15}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:24px;margin-top:40px}article{background:#fff;border:1px solid #dedee3;border-radius:12px;padding:30px}a{display:inline-block;padding:12px 20px;background:#d42b2b;color:#fff;border-radius:7px;text-decoration:none;font-weight:bold}a:focus-visible{outline:3px solid #2164c5;outline-offset:4px}small{color:#595959}h2{font-size:25px}</style></head><body><main><small>FACULDADE PHORTE · ESTUDO DA HOME</small><h1>Três formas de chegar<br>ao próximo passo.</h1><p>O mesmo conteúdo, com três organizações para comparar.</p><section><article><small>VERSÃO A</small><h2>Jornada reorganizada</h2><p>Os sete cursos perto do topo. Modalidades e ingresso conduzem a escolha antes dos blocos institucionais.</p><a href="previa-a/">Abrir versão A →</a></article><article><small>VERSÃO B</small><h2>Editorial com campanha</h2><p>A estrutura editorial da C abrindo com o carrossel de campanha 2027: caminhos, catálogo com busca, formatos, instituição, unidades, relatos, contato, parceiros, blog e dúvidas.</p><a href="previa-b/">Abrir versão B →</a></article><article><small>VERSÃO C</small><h2>Editorial</h2><p>Abertura tipográfica com os sete cursos em pílulas, dois caminhos de entrada, catálogo com busca, formatos de estudo e acabamento mais leve, com cabeçalho próprio.</p><a href="previa-c/">Abrir versão C →</a></article></section></main></body></html>');
console.log('Geradas prévias A/B/C, comparação e sete peças Elementor. Uploads novos permanecem pendentes.');
