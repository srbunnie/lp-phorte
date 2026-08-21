import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'elementor');
const imageDir = path.join(root, 'assets', 'images');
const backupDir = path.join(root, 'assets-originals');
const tempDir = path.join(root, 'assets-webp-temp');
const limit = 200 * 1024;

fs.mkdirSync(backupDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });
const files = fs.readdirSync(imageDir).map((name) => path.join(imageDir, name));

for (const input of files) {
  const name = path.basename(input);
  fs.copyFileSync(input, path.join(backupDir, name));
  const output = path.join(tempDir, `${path.parse(name).name}.webp`);
  let quality = 45;
  let size = Infinity;
  while (size > limit && quality >= 15) {
    if (fs.existsSync(output)) fs.rmSync(output);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', input, '-vf', "scale='min(1600,iw)':-2", '-c:v', 'libwebp', '-q:v', String(quality), '-compression_level', '6', output], { stdio: 'inherit' });
    size = fs.statSync(output).size;
    quality -= 5;
  }
  if (size > limit) {
    fs.rmSync(output);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', input, '-vf', "scale='min(1200,iw)':-2", '-c:v', 'libwebp', '-q:v', '20', '-compression_level', '6', output], { stdio: 'inherit' });
  }
}

for (const input of files) fs.rmSync(input);
for (const name of fs.readdirSync(tempDir)) fs.renameSync(path.join(tempDir, name), path.join(imageDir, name));
fs.rmSync(tempDir, { recursive: true, force: true });

const result = fs.readdirSync(imageDir).map((name) => ({ name, bytes: fs.statSync(path.join(imageDir, name)).size }));
console.log(JSON.stringify(result, null, 2));
