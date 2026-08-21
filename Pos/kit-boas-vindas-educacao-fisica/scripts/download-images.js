const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    name: 'logo-phorte-branco.webp',
    url: 'https://posphorte.com.br/wp-content/uploads/2025/01/LOGO_GRADUACAO-E-POS-FACULDADE-PHORTE_Branco.webp'
  },
  {
    name: 'kit-boas-vindas-phorte.webp',
    url: 'https://posphorte.com.br/wp-content/uploads/2026/08/kit-boas-vindas-phorte.webp'
  },
  {
    name: 'manual-de-musculacao.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/manual-de-musculacao.jpg'
  },
  {
    name: 'cinesiologia-e-biomecanica.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/cinesiologia-e-biomecanica.jpg'
  },
  {
    name: 'periodizacao-do-treinamento-de-forca.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/periodizacao-do-treinamento-de-forca.jpg'
  },
  {
    name: 'hipertrofia-muscular.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/hipertrofia-muscular.jpg'
  },
  {
    name: 'fisiologia-do-exercicio.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/fisiologia-do-exercicio.jpg'
  },
  {
    name: 'treinamento-funcional.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/treinamento-funcional.jpg'
  },
  {
    name: 'futebol-tatica-e-estrategia.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/futebol-tatica-e-estrategia.jpg'
  },
  {
    name: 'basquetebol-moderno.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/basquetebol-moderno.jpg'
  },
  {
    name: 'natacao-da-iniciacao-ao-alto-rendimento.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/natacao-da-iniciacao-ao-alto-rendimento.jpg'
  },
  {
    name: 'voleibol-sistemas-de-jogo.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/voleibol-sistemas-de-jogo.jpg'
  },
  {
    name: 'nutricao-esportiva-aplicada.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/nutricao-esportiva-aplicada.jpg'
  },
  {
    name: 'reabilitacao-de-lesoes-esportivas.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/reabilitacao-de-lesoes-esportivas.jpg'
  },
  {
    name: 'exercicio-e-envelhecimento-saudavel.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/exercicio-e-envelhecimento-saudavel.jpg'
  },
  {
    name: 'psicologia-do-esporte.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/psicologia-do-esporte.jpg'
  },
  {
    name: 'didatica-da-educacao-fisica.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/didatica-da-educacao-fisica.jpg'
  },
  {
    name: 'recreacao-e-jogos-escolares.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/recreacao-e-jogos-escolares.jpg'
  },
  {
    name: 'avaliacao-fisica-e-antropometria.jpg',
    url: 'https://editoraphorte.com.br/wp-content/uploads/2025/01/avaliacao-fisica-e-antropometria.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`[OK] Baixado: ${path.basename(dest)}`);
            resolve(true);
          });
        });
      } else {
        // Se a imagem remota não responder 200, cria um placeholder SVG com estilo
        file.close();
        fs.unlinkSync(dest);
        console.warn(`[WARN] HTTP ${res.statusCode} ao baixar ${url}. Gerando fallback SVG.`);
        createFallback(dest, path.basename(dest));
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.warn(`[ERROR] Erro ao baixar ${url}: ${err.message}. Gerando fallback SVG.`);
      createFallback(dest, path.basename(dest));
      resolve(false);
    });
  });
}

function createFallback(dest, filename) {
  const title = filename.replace(/\.(jpg|webp|png)$/, '').replace(/-/g, ' ').toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="15" y="15" width="370" height="530" fill="none" stroke="#e30613" stroke-width="2" stroke-dasharray="4 4" rx="12"/>
    <text x="200" y="240" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">EDITORA PHORTE</text>
    <text x="200" y="280" fill="#e30613" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${title}</text>
    <text x="200" y="320" fill="#a1a1aa" font-family="sans-serif" font-size="12" text-anchor="middle">Livro Acadêmico Oficial</text>
  </svg>`;
  const svgPath = dest.replace(/\.(jpg|webp)$/, '.svg');
  fs.writeFileSync(svgPath, svg, 'utf8');
}

async function run() {
  console.log(`Baixando ${images.length} imagens para ${targetDir}...`);
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    await download(img.url, dest);
  }
  console.log('Todas as imagens foram processadas com sucesso na pasta public/images/!');
}

run();
