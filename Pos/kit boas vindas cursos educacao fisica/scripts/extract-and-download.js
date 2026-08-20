const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const legacyPath = path.join(__dirname, '../legacy/index.legacy.html');
const targetDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const content = fs.readFileSync(legacyPath, 'utf8');
const urlRegex = /https?:\/\/[^\s"'<>]+\.(?:webp|jpg|jpeg|png|svg)/gi;
const matches = content.match(urlRegex) || [];
const uniqueUrls = Array.from(new Set(matches));

console.log(`Encontradas ${uniqueUrls.length} URLs de imagens únicas no arquivo legado:`);
uniqueUrls.forEach(u => console.log(' - ' + u));

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Redirecionamento
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`[OK] Baixado com sucesso: ${path.basename(dest)}`);
            resolve(true);
          });
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.warn(`[HTTP ${res.statusCode}] Falha ao baixar ${url}`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.warn(`[ERR] ${err.message} para ${url}`);
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.warn(`[TIMEOUT] Timeout para ${url}`);
      resolve(false);
    });
  });
}

async function start() {
  for (const url of uniqueUrls) {
    const parsed = new URL(url);
    const filename = path.basename(parsed.pathname);
    const dest = path.join(targetDir, filename);
    await downloadFile(url, dest);
  }
  console.log('Download de todas as imagens concluído!');
}

start();
