const fs = require('fs');
const path = require('path');

function replaceInDir(dir, baseDir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, baseDir);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.txt')) {
      const relToRoot = path.relative(path.dirname(fullPath), baseDir).replace(/\\/g, '/');
      const prefixNext = relToRoot ? `${relToRoot}/_next/` : './_next/';
      const prefixImg = relToRoot ? `${relToRoot}/images/` : './images/';

      let content = fs.readFileSync(fullPath, 'utf8');

      // Corrige referências de _next
      content = content.replace(/(['"])\/_next\//g, `$1${prefixNext}`);

      // Corrige referências de imagens
      content = content.replace(/(['"])\/images\//g, `$1${prefixImg}`);
      content = content.replace(/(['"])\.\/images\//g, `$1${prefixImg}`);

      // Corrige links entre páginas no HTML
      if (file.endsWith('.html')) {
        if (!relToRoot) {
          // Estamos na raiz (dist/index.html)
          content = content.replace(/href="\/personalizar\/?"/g, 'href="./personalizar/"');
          content = content.replace(/href="\/personalizar"/g, 'href="./personalizar/"');
        } else {
          // Estamos em subpasta (ex: dist/personalizar/index.html)
          content = content.replace(/href="\/"/g, 'href="../"');
          content = content.replace(/href="\/personalizar\/?"/g, 'href="./"');
        }
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

const publicImgDir = path.join(__dirname, '../public/images');
const distDir = path.join(__dirname, '../dist');
const distImgDir = path.join(distDir, 'images');

// Garante que dist/images exista e contenha todas as imagens
if (fs.existsSync(publicImgDir) && fs.existsSync(distDir)) {
  fs.cpSync(publicImgDir, distImgDir, { recursive: true });
  console.log('[Postbuild] Imagens copiadas para dist/images.');
}

if (fs.existsSync(distDir)) {
  replaceInDir(distDir, distDir);
  console.log('[Postbuild] Caminhos convertidos para relativos para 2 páginas e todas as imagens.');
}
