# Implementação local — Live Educação

Projeto correspondente à tarefa ClickUp [86ajx185e](https://app.clickup.com/t/9013299512/86ajx185e).

## Estrutura

- `index.html`: índice local para abrir as duas páginas.
- `registro-e-documentacao-live/`: landing page principal com formulário, conteúdo da live e certificado.
- `registro-e-documentacao-agradecimento/`: página pós-inscrição com confirmação, convite ao WhatsApp e vídeo.
- `canva-exports/`: PDFs originais exportados do Canva — preservados sem alteração.
- `principal/assets/` e `agradecimento/assets/`: cópias PNG de páginas específicas dos PDFs usadas na implementação.

## Como abrir

Abra diretamente `index.html` no navegador ou sirva a pasta com um servidor estático:

```powershell
cd "C:\Users\Marcelo.vignola\Desktop\Git Projects\ClickUp WebDesign\landing-page-live-educacao-registro-documentacao"
python -m http.server 8080
```

Depois acesse `http://localhost:8080/`.

## Fluxo atual

1. A pessoa acessa `registro-e-documentacao-live/registro-e-documentacao-live.html`.
2. O formulário valida nome, e-mail, telefone, atuação em educação infantil, objetivo e consentimento.
3. Nesta prévia local, o cadastro é salvo apenas no `localStorage` do navegador e a pessoa é encaminhada para `registro-e-documentacao-agradecimento/registro-e-documentacao-agradecimento.html`.
4. A página de agradecimento apresenta a confirmação, o convite para o grupo do WhatsApp e o link do vídeo no YouTube.

## Pendências para publicação

- Substituir o comportamento demonstrativo do `registro-e-documentacao-live/script.js` pelo formulário/endpoint real do RD Station, preservando os campos e a página de conversão.
- Validar com a equipe o texto final de data, horário, política de privacidade e mensagens de confirmação antes de publicar.
- Confirmar se o vídeo da página de agradecimento deve usar thumbnail oficial do YouTube ou um asset exportado do Canva.
- Revisar metadados, tags de campanha, consentimento e evento de conversão no ambiente do RD Station.
- Fazer teste final em desktop, mobile, teclado, leitor de tela e conexão lenta.

## Decisões de implementação

- A cor indicada no briefing, `#a40da2`, foi usada como cor principal de ação e navegação.
- A linguagem visual creme/laranja e os recortes orgânicos foram mantidos com os assets locais extraídos dos PDFs; o fundo manuscrito repetitivo foi removido das áreas de conteúdo para melhorar leitura, contraste e navegação.
- A landing page principal foi reorganizada como um funil de conversão: promessa no hero, formulário no primeiro viewport, barra de benefícios, problema, mecanismo da live, autoridade, público, passos, FAQ e CTA final.
- A direção visual usa contraste editorial entre carvão, creme, laranja e magenta, tipografia display com personalidade, composição assimétrica e CTA fixo no mobile.
- O conteúdo foi mantido dentro do briefing; não foram criadas promessas comerciais, preços ou informações adicionais não confirmadas.
- O formulário foi desenhado para baixo atrito, com labels persistentes, foco visível, mensagens por campo e navegação por teclado.
