import { cp, readdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appDirectory = resolve(scriptDirectory, '..');
const projectDirectory = resolve(appDirectory, '..');
const buildDirectory = resolve(appDirectory, 'dist');

for (const outputName of ['index.html', 'assets', 'images']) {
  await rm(resolve(projectDirectory, outputName), { recursive: true, force: true });
}

for (const entry of await readdir(buildDirectory)) {
  await cp(resolve(buildDirectory, entry), resolve(projectDirectory, entry), { recursive: true });
}
