# Grade de professores — Medicina do Esporte

Protótipo estático da seção solicitada na tarefa do ClickUp [Inclusão da grade de professores](https://app.clickup.com/t/86ak53vvf).

## Objetivo

Criar a seção de corpo docente para ser posicionada abaixo do vídeo do Dr. Alexandre Evangelista na página do curso:

https://posphorte.com.br/pos-graduacao/medicina-do-esporte-para-profissionais-da-area-da-saude/

## O que foi implementado

- Contexto visual vertical (9:16) do Shorts do coordenador usando o vídeo informado na tarefa.
- Carrossel horizontal com os 11 professores e navegação por setas, arraste e scroll-snap.
- Área de foto padronizada em proporção 4:5 com `object-fit: cover`.
- Placeholder de silhueta para o nome sem foto disponível nos anexos da tarefa.
- Responsividade para desktop e mobile, estados de foco e suporte a `prefers-reduced-motion`.

## Assets

As fotos corretas foram convertidas para WebP com até aproximadamente 200 KB por arquivo e publicadas no WordPress em `https://posphorte.com.br/wp-content/uploads/2026/08/`. O protótipo agora utiliza essas URLs hospedadas. A cópia local permanece reunida em uma única pasta (`assets/professores/`) como backup. A pasta informada anteriormente no briefing (`professores/_po`) não existe neste workspace. Os arquivos originais dos Downloads também foram preservados como backup.

Fotos disponíveis no protótipo:

- Anderson Fonseca Aoki
- Bruna Massaroto Barros
- Danilo Farias de Morais
- Gabriela Chamusca Lopes da Silva
- Julio Benvenutti Bueno de Camargo
- Mario Luiz da Silva Tsutsui
- Pedro Gabriel Senger Braga
- Rui Anderson Costa Monteiro
- Ruy Barbosa Martins Calheiros Netto
- Solival Jose de Almeida Santos Filho
- Tiago Volpi Braz

## Visualização

Abra [`index.html`](./index.html) diretamente no navegador ou sirva a raiz do repositório com um servidor estático. O projeto não possui backend nem envio de dados.
