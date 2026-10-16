import { readFile, writeFile, mkdir, copyFile, mkdtemp, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root=fileURLToPath(new URL('..',import.meta.url));
const manifest=JSON.parse(await readFile(path.join(root,'elementor/assets-publicacao.json'),'utf8'));
const staging=await mkdtemp(path.join(tmpdir(),'hg-elementor-'));
const results=[];
for(const piece of ['cabecalho','cabecalho-c','home-a','home-b','home-c','rodape']){
 const dest=path.join(staging,piece);await mkdir(path.join(dest,piece),{recursive:true});
 const sourceFiles=await readdir(path.join(root,'elementor',piece));
 let combined='';
 for(const file of sourceFiles){const buffer=await readFile(path.join(root,'elementor',piece,file));await writeFile(path.join(dest,piece,file),buffer);if(file.endsWith('.html'))combined+=buffer.toString();}
 const required=manifest.assets.filter(a=>combined.includes(a.url));
 const uploads=required.filter(a=>a.status==='Upload pendente');
 await mkdir(path.join(dest,'assets-para-upload'),{recursive:true});
 for(const a of uploads)await copyFile(path.join(root,a.path),path.join(dest,'assets-para-upload',path.basename(a.path)));
 await writeFile(path.join(dest,'assets-publicacao.json'),JSON.stringify({...manifest,assets:required},null,2));
 await copyFile(path.join(root,'elementor/INSTALACAO.md'),path.join(dest,'INSTALACAO.md'));
 await copyFile(path.join(root,'assets/fonts/OFL.txt'),path.join(dest,'OFL.txt'));
 const zip=path.join(root,'elementor','pacote-'+piece+'.zip');
 const tar=process.platform==='win32'?path.join(process.env.SystemRoot,'System32/tar.exe'):'tar';
 execFileSync(tar,['-a','-c','-f',zip,'-C',dest,...await readdir(dest)]);
 // Comparação dos bytes do ZIP extraído, não apenas confirmação de que o arquivo existe.
 const extracted=path.join(staging,'verificar-'+piece);await mkdir(extracted);
 execFileSync(tar,['-x','-f',zip,'-C',extracted]);
 for(const file of sourceFiles){const a=await readFile(path.join(root,'elementor',piece,file)),b=await readFile(path.join(extracted,piece,file));if(!a.equals(b))throw new Error('ZIP divergente: '+piece+'/'+file);}
 results.push({piece,zip:path.relative(root,zip).replaceAll('\\','/'),files:sourceFiles.length,pendingUploads:uploads.length,sha256:createHash('sha256').update(await readFile(zip)).digest('hex')});
}
await writeFile(path.join(root,'elementor/pacotes.json'),JSON.stringify({generatedAt:new Date().toISOString(),verifiedByExtraction:true,packages:results},null,2));
console.log(JSON.stringify({result:'PASS',packages:results.map(({piece,files,pendingUploads})=>({piece,files,pendingUploads}))},null,2));
// Staging de validação é pequeno e mantido no temporário para inspeção, sem limpeza recursiva.
