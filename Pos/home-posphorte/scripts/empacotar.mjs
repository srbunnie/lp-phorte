// Gera um ZIP por peça (cabeçalho, home, rodapé) com os arquivos do Elementor, o guia e as fontes, se publicadas.
// Executar depois de gerar.mjs e verificar.mjs. Usa o tar.exe do Windows, que grava caminhos com barra normal.
import { mkdtemp, mkdir, cp, rm, readdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const elementor = path.join(root, 'elementor');
const { pecas } = JSON.parse(readFileSync(path.join(elementor, 'assets-publicacao.json'), 'utf8'));
const staging = await mkdtemp(path.join(tmpdir(), 'posphorte-elementor-'));
try {
  for (const [name, assets] of Object.entries(pecas)) {
    const dir = path.join(staging, name);
    await mkdir(dir);
    await cp(path.join(elementor, name), path.join(dir, name), { recursive: true });
    for (const file of ['INSTALACAO.md', 'assets-publicacao.json']) await cp(path.join(elementor, file), path.join(dir, file));
    // Imagens já estão na biblioteca de mídia; o pacote leva só as fontes, quando configuradas.
    for (const asset of assets.filter(a => !a.startsWith('assets/images/'))) await cp(path.join(root, asset), path.join(dir, asset), { recursive: true });
    const zip = path.join(elementor, 'pacote-' + name + '.zip');
    await rm(zip, { force: true });
    execFileSync(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe'), ['-a', '-c', '-f', zip, '-C', dir, ...await readdir(dir)], { stdio: 'inherit' });
    console.log('Pacote gerado: elementor/pacote-' + name + '.zip');
  }
} finally {
  await rm(staging, { recursive: true, force: true });
}
