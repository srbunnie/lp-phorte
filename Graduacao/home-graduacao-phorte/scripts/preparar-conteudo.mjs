// Preparação editorial/mídia. Não é executado pelo build cotidiano.
import { readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require('../../../../Phorte/node_modules/sharp');
const root = fileURLToPath(new URL('..', import.meta.url));
const repo = path.resolve(root, '../..');
const sites = path.resolve(repo, '../Site Phorte/Graduação/site');
const banner = path.join(repo, 'Graduacao/header graduacao/x-house-leandro-julio-duarte-setembro/outputs/header-phorte-2027-elementor-wordpress');
const inventory = JSON.parse(await readFile(path.join(root, 'referencias/inventario-consolidado-2026-10-16.json'), 'utf8'));
await mkdir(path.join(root, 'conteudo'), { recursive: true });
await mkdir(path.join(root, 'assets/images'), { recursive: true });
await mkdir(path.join(root, 'assets/fonts'), { recursive: true });
const manifest = [];
async function localAsset(id, sourceFile, name, source, publishedUrl = null) {
  const target = 'assets/images/' + name;
  await copyFile(sourceFile, path.join(root, target));
  const { width, height } = await sharp(path.join(root, target)).metadata();
  manifest.push({ id, source, path: target, width, height, publishedUrl });
  return target;
}
async function remoteAsset(id, url, name, maxWidth = 1000) {
  const target = 'assets/images/' + name;
  const result = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!result.ok) throw new Error('Mídia indisponível: ' + result.status + ' ' + url);
  const bytes = Buffer.from(await result.arrayBuffer());
  await sharp(bytes).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(root, target));
  const { width, height } = await sharp(path.join(root, target)).metadata();
  // Widgets usam o original publicado; cópia otimizada atende a prévia local.
  manifest.push({ id, source: url, path: target, width, height, publishedUrl: url });
  return target;
}
const logo = await localAsset('logo', path.join(sites, 'public/logos/faculdade-phorte.svg'), 'logo-phorte.svg', 'https://graduacao-phorte.vercel.app/logos/faculdade-phorte.svg');
const logoWhite = await localAsset('logo-white', path.join(sites, 'public/logos/phorte-unificado-branco.svg'), 'logo-phorte-branco.svg', 'https://graduacao-phorte.vercel.app/logos/phorte-unificado-branco.svg');
for (const file of ['BANNER-SITE-background-scaled.webp','persona-masculina.webp','persona-feminina.webp','ICONE-MOUSE.webp','dia-do-professor-2026-phorte.webp','dia-do-professor-2026-phorte-mobile.webp']) {
  await localAsset('banner-' + file, path.join(banner, 'assets', file), file, 'https://faculdadephorte.edu.br/wp-content/uploads/2026/10/' + file, 'https://faculdadephorte.edu.br/wp-content/uploads/2026/10/' + file);
}
for (const weight of [400,500,600,700,800]) {
  const source = weight === 500 ? path.join(repo, 'Pos/home-posphorte/assets/fonts/poppins-500.woff2') : path.join(banner, 'assets/poppins-latin-' + weight + '.woff2');
  await copyFile(source, path.join(root, 'assets/fonts/poppins-' + weight + '.woff2'));
}
await copyFile(path.join(banner, 'assets/OFL.txt'), path.join(root, 'assets/fonts/OFL.txt'));
const descriptions = [
  'Conhecimentos para planejar, gerir organizações e tomar decisões nos negócios.',
  'Movimento humano, atividade física e suas aplicações no esporte, na educação e na saúde.',
  'Estratégias para conectar marcas e pessoas, da pesquisa à comunicação.',
  'Aprendizagem e prática pedagógica para atuar na formação de pessoas.',
  'Processos, recursos e conhecimentos para os desafios da gestão empresarial.',
  'Gestão, recrutamento e desenvolvimento de pessoas nas organizações.',
  'Idiomas, práticas e tecnologias da tradução e da interpretação.',
];
const courses = [];
for (const [index, course] of inventory.courses.entries()) {
  const imageSlug = course.slug.startsWith('traducao') ? 'traducao' : course.slug;
  const image = await localAsset('course-' + course.id, path.join(sites, 'public/img/cursos/' + imageSlug + '.webp'), 'curso-' + imageSlug + '.webp', 'https://graduacao-phorte.vercel.app/img/cursos/' + imageSlug + '.webp');
  courses.push({ ...course, description: descriptions[index], descriptionSource: 'Redação editorial baseada em Site-Phorte/Graduação/conteudo/home.ts; revisar com a instituição.', image, price: null, duration: null, degree: null });
}
const testimonials = [];
for (const [index, item] of inventory.testimonials.entries()) {
  const url = new URL(item.youtubeUrls[0]);
  const youtubeId = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).at(-1);
  const image = await remoteAsset('testimonial-' + index, item.images[0].src, 'depoimento-' + (index + 1) + '.webp', 576);
  testimonials.push({ name: item.name, course: item.roleOriginal.replace(/^Aluna\(o\) de /, ''), quote: item.quoteOriginal, youtubeId, image, source: item.source });
}
const partners = [];
for (const [index, partner] of inventory.partners.entries()) partners.push({ name: partner.sourceLabel, image: await remoteAsset('partner-' + index, partner.image, 'parceiro-' + (index + 1) + '.webp', 300), source: partner.image });
const news = [];
for (const [index, item] of inventory.news.entries()) news.push({ title: item.title, href: item.href, publishedAt: item.publishedAt, image: await remoteAsset('news-' + index, item.image, 'noticia-' + (index + 1) + '.webp', 800), source: item.source });
const unitImage = await remoteAsset('unit', 'https://faculdadephorte.edu.br/wp-content/uploads/2025/10/unidade-1-rui-barbosa.webp', 'sede-rui-barbosa.webp', 800);
const institutionPoster = await remoteAsset('institution-poster', inventory.institutionalVideo.poster, 'video-institucional.webp', 1000);
const courseBannerImage = await remoteAsset('course-banner', 'https://faculdadephorte.edu.br/wp-content/uploads/2025/10/personagraduacaophortestyled-768x565.webp', 'estudantes-graduacao.webp', 768);
const base = 'https://faculdadephorte.edu.br';
const contact = { phone: '(11) 2222-1222', phoneHref: 'tel:+551122221222', email: 'graduacao@faculdadephorte.edu.br', whatsapp: 'https://wa.me/551122221222?text=Quero%20conhecer%20os%20cursos%20de%20graduacao%20da%20Faculdade%20Phorte', enrollment: 'https://typechat.phorte.org.br/vestibular-simplificado' };
const admissionsUrl = base + '/processo-seletivo/';
const data = {
  updatedAt: '2026-10-16', source: base + '/', logo, logoWhite, courses, testimonials, partners, news, contact,
  hero: { sourceFile: path.relative(repo, path.join(banner, 'header-phorte-2027-elementor.html')).replaceAll('\\','/'), note: 'Campanha e arte sazonal preservadas para comparação das propostas; revisar validade antes da publicação.' },
  institution: { title: 'Conhecimento que se transforma em prática.', text: 'A Faculdade Phorte reúne formação, tecnologia e experiências que aproximam o aprendizado dos desafios profissionais. Conheça a instituição e encontre o próximo passo da sua trajetória.', href: base + '/sobre-nos/', youtubeId: '3sJF0DKhLOk', image: institutionPoster },
  units: [{ title: 'Sede · Bela Vista', address: 'Rua Rui Barbosa, 422 · Bela Vista · São Paulo – SP', image: unitImage, map: 'https://g.co/kgs/iyPN2Ac', source: base + '/' }],
  courseBanner: { image: courseBannerImage },
  modalities: [
    { id:91, title:'Presencial', icon:'campus', text:'Encontros no campus e atividades que aproximam a formação da prática. Consulte a rotina de cada curso.', href:base+'/modalidades/presencial/' },
    { id:199, title:'Semipresencial', icon:'laptop', text:'Atividades presenciais e a distância ao longo da formação. A distribuição varia conforme o curso.', href:base+'/modalidades/semi-presencial/' },
    { id:241, title:'EAD', icon:'screen', text:'Estudo a distância com atividades e orientações do curso. Confira também as exigências de presença e avaliação.', href:base+'/modalidades/ead-digital/' },
    { id:93, title:'Online ao vivo', icon:'play', text:'Encontros online em tempo real para acompanhar as aulas e interagir com os professores.', href:base+'/modalidades/ead-online-ao-vivo/' },
  ],
  admissions: [
    { title:'Vestibular simplificado', text:'Conheça o processo e comece sua inscrição pelo atendimento digital.', action:'Iniciar inscrição', href:contact.enrollment },
    { title:'Ingresso com ENEM', text:'Consulte as orientações para utilizar sua participação no ENEM.', action:'Consultar o processo', href:admissionsUrl },
    { title:'Transferência', text:'Converse com a equipe sobre avaliação de estudos e continuidade da formação.', action:'Falar com a equipe', href:contact.whatsapp },
    { title:'Segunda graduação', text:'Já tem uma formação superior? Conheça as orientações para um novo curso.', action:'Conhecer as opções', href:admissionsUrl },
  ],
  faq: [
    { question:'Como escolher minha graduação?', answer:'Compare os cursos, seus conteúdos e as possibilidades de atuação. Se precisar de orientação, nossa equipe pode ajudar na sua escolha.', href:base+'/graduacao/', label:'Conhecer os cursos' },
    { question:'Como funcionam as modalidades?', answer:'A rotina de aulas, as atividades presenciais e as avaliações variam conforme o curso. Consulte as informações da graduação de seu interesse.', href:base+'/graduacao/', label:'Consultar meu curso' },
    { question:'Como iniciar meu processo de ingresso?', answer:'Consulte as orientações do processo seletivo ou inicie o atendimento digital para conhecer os próximos passos.', href:admissionsUrl, label:'Ver formas de ingresso' },
    { question:'A Phorte oferece bolsas de estudo?', answer:'A instituição tem programas com critérios e etapas próprios. Consulte o regulamento e a disponibilidade antes de se inscrever.', href:base+'/bolsas-sociais/', label:'Consultar bolsas e critérios' },
  ],
  navigation: {
    institutional: [['Sobre a Phorte',base+'/sobre-nos/'],['Contato',base+'/contato/'],['Unidades',base+'/#unidades'],['Trabalhe conosco','https://vagas.phorteeducacional.org.br/']],
    services: [['Portal do Aluno / SIG','https://sis.faculdadephorte.edu.br/login'],['Secretaria Virtual','https://faculdadephorte.perseus.com.br/Servicos'],['Biblioteca','https://biblioteca.phorteeducacional.com.br/']],
    transparency: [['Documentos oficiais',base+'/documentos-oficiais/'],['Validação de diplomas','https://faculdadephorte.perseus.com.br/servicos/diplomadigital'],['Ouvidoria',base+'/ouvidoria/'],['CPA',base+'/comissao-propria-de-avaliacao-cpa/'],['Consulta ao e-MEC','https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjE5NDA=']],
    ecosystem: [['Pós-graduação','https://posphorte.com.br/'],['Cursos livres',base+'/cursos-phorte/'],['Cursos gratuitos',base+'/cursos-gratuitos-phorte/'],['Capacita Empreendedor','https://posphorte.com.br/capacita_empreendedor/']],
    social: [['Instagram','https://www.instagram.com/faculdadephorte/'],['Facebook','https://www.facebook.com/faculdadephorte'],['YouTube','https://www.youtube.com/@phortetv'],['LinkedIn','https://br.linkedin.com/company/faculdade-phorte']],
  },
  form: { title:'Vamos encontrar o seu próximo passo?', text:'Nossos consultores ajudam você a escolher o curso alinhado aos seus interesses e objetivos de carreira.', consent:'Aceito receber comunicações sobre os produtos e serviços da Faculdade Phorte, nos termos de sua Política de Privacidade.', previewNote:'Prévia visual · este formulário não envia dados.', source:base+'/' },
  editorialNotes: ['Copy institucional revisada sem indicadores ou nota MEC não comprovados.','Somente sede Rui Barbosa e telefone geral.','Descrições, ingresso e FAQ são redações propostas para revisão.','Notícias e depoimentos são uma seleção fixa da coleta de 16/10/2026.','Arte adaptada de Pedagogia veio do kit do protótipo Next e ainda depende de revisão visual institucional.'],
};
await writeFile(path.join(root, 'conteudo/home.json'), JSON.stringify(data, null, 2));
await writeFile(path.join(root, 'conteudo/variantes.json'), JSON.stringify({
  a: { label:'Jornada reorganizada', catalogMode:'grid', sections:['hero','catalog','modalities','admissions','testimonials','institution','units','partners','contact','faq','news'] },
  b: { label:'Ordem atual preservada', catalogMode:'tabs', sections:['hero','catalog','course-banner','institution','units','testimonials','contact','partners','news'] },
}, null, 2));
await writeFile(path.join(root, 'assets/manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Conteúdo e ' + manifest.length + ' assets preparados. Fontes locais com OFL.');
