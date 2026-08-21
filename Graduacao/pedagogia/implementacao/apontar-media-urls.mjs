import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://faculdadephorte.edu.br/wp-content/uploads/2026/08/';
const media = {
  'https://faculdadephorte.edu.br/wp-content/uploads/2026/06/desenvolvimento-infantil-na-abordagem-pikler-scaled.jpg': `${base}educacao-infantil-pikler.webp`,
  'https://faculdadephorte.edu.br/wp-content/uploads/2026/06/257e51401c0e6442b77f222a6804a34b.jpg': `${base}hero-pedagogia.webp`,
  'https://faculdadephorte.edu.br/wp-content/uploads/2026/02/rubia-professora-phorte.webp': `${base}rubia-professora-phorte.webp`,
  'fotos%20professores/Cristiano%20Alc%C3%A2ntara_.webp': `${base}Cristiano-Alcantara_.webp`,
  'fotos%20professores/Fatima%20Bonif%C3%A1cio_.webp': `${base}Fatima-Bonifacio_.webp`,
  'fotos%20professores/Agleide%20Vicente_.webp': `${base}Agleide-Vicente_.webp`,
  'fotos%20professores/Let%C3%ADcia%20Streit.webp': `${base}Leticia-Streit.webp`,
  'fotos%20professores/Lisette%20Rocha.webp': `${base}Lisette-Rocha.webp`,
  'fotos%20professores/Andrea%20Costa.webp': `${base}Andrea-Costa.webp`,
  'fotos%20professores/Matilde%20Aparecida_.webp': `${base}Matilde-Aparecida_.webp`,
  'fotos%20professores/M%C3%A1rcia%20Aparecida_.webp': `${base}Marcia-Aparecida_.webp`,
  'fotos%20professores/Mariama%20Palhares.webp': `${base}Mariama-Palhares.webp`,
  'fotos%20professores/Ana%20Lucia_.webp': `${base}Ana-Lucia_.webp`,
  'https://img.youtube.com/vi/bJwRpDj-5hI/hqdefault.jpg': `${base}rosangela.webp`,
  'https://img.youtube.com/vi/lB8999z0MsA/hqdefault.jpg': `${base}kelly.webp`,
  'https://img.youtube.com/vi/vLShG2rvk84/hqdefault.jpg': `${base}paulo-santos.webp`,
  'https://img.youtube.com/vi/lv7DbONmZwY/hqdefault.jpg': `${base}lilia.webp`,
  'https://img.youtube.com/vi/F5N7LOW_U9s/hqdefault.jpg': `${base}luciana.webp`,
  'https://img.youtube.com/vi/MID84OkOslo/hqdefault.jpg': `${base}marcela.webp`,
};

const targets = [
  path.join(projectDir, 'index claro 2026-2.html'),
  path.join(projectDir, 'index claro 2027-1.html'),
  ...['2026-2', '2027-1'].flatMap((version) => [
    path.join(projectDir, 'implementacao', 'elementor', version, 'widget-before-form.html'),
    path.join(projectDir, 'implementacao', 'elementor', version, 'enrollment-copy.html'),
    path.join(projectDir, 'implementacao', 'elementor', version, 'widget-after-form.html'),
  ]),
];

for (const file of targets) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [from, to] of Object.entries(media)) content = content.split(from).join(to);
  fs.writeFileSync(file, content);
}

console.log(`URLs de mídia atualizadas em ${targets.length} arquivos.`);
