# Guia de Deploy FTP e Configurações de Integração: Kit de Boas-Vindas Pós Phorte

Este guia explica como gerar a pasta `dist/` com as **2 páginas separadas** (Página 1: Apresentação e Página 2: Personalização) e fazer o upload dos arquivos estáticos para o seu servidor via FTP, além de conectar a planilha do **Google Sheets** e o **RD Station**.

---

## 1. Estrutura das 2 Páginas Geradas na Pasta `dist/`

Ao compilar com `npm run build`, a pasta `dist/` contém:

1. **`dist/index.html` (Página 1 - Apresentação / Começar Agora)**:
   - Apresentação visual do kit (livro + camiseta).
   - Informações dos 4 pilares e tempo estimado.
   - Botão **"Começar Agora"** com link direto para `./personalizar/`.

2. **`dist/personalizar/index.html` (Página 2 - Wizard de Personalização)**:
   - Barra de progresso com as 5 etapas.
   - **Etapa 1**: Escolha do Livro (17 títulos, busca instantânea, 4 categorias e dock flutuante).
   - **Etapa 2**: Escolha da Camiseta (tamanhos PP a XG e tabela de medidas em cm).
   - **Etapa 3**: Dados do Aluno (Nome, validação real de CPF, telefone com máscara e curso).
   - **Etapa 4**: Endereço & ViaCEP (busca e autopreenchimento automático de CEP).
   - **Etapa 5**: Revisão e envio com estado de loading.
   - **Etapa 6**: Sucesso com protocolo, oferta de 2ª Pós e link para a Comunidade Phorte.

---

## 2. Como Gerar o Build para FTP

1. Abra o terminal na pasta do projeto:
   ```bash
   cd "Pos/kit boas vindas cursos educacao fisica"
   ```
2. Execute o comando:
   ```bash
   npm run build
   ```
3. O build converterá os caminhos automaticamente para relativos (`./_next/` e `../_next/`).

---

## 3. Upload via FTP

1. Abra seu cliente de FTP (FileZilla, WinSCP ou cPanel).
2. Conecte-se ao servidor.
3. Envie todo o conteúdo de dentro de `dist/` para o diretório de destino no servidor (ex.: `public_html/kit-boas-vindas/`).

---

## 4. Configuração do Google Sheets (Planilha de Pedidos)

1. Abra o Google Drive e crie uma planilha vazia chamada **"Solicitações Kit Phorte"**.
2. Clique em **Extensões** > **Apps Script**.
3. Cole o código de [`docs/google-apps-script.js`](file:///c:/Users/Marcelo.vignola/Desktop/Git%20Projects/lp-phorte/Pos/kit%20boas%20vindas%20cursos%20educacao%20fisica/docs/google-apps-script.js).
4. Clique em **Implantar** > **Nova implantação** > **App da Web**.
5. Configure:
   - **Executar como**: *Eu (seu e-mail)*
   - **Quem pode acessar**: *Qualquer pessoa*
6. Copie a **URL do app da Web** gerada.
7. Cole no arquivo `src/config/integrations.ts` na variável `googleSheetsWebhookUrl`.
8. Execute `npm run build` novamente.

---

## 5. Configuração do RD Station Marketing

1. Identificador de conversão: `kit-boas-vindas-pos-ed-fisica`.
2. Cole a URL do webhook do RD Station (ou Zapier/n8n) no campo `rdStationWebhookUrl` de `src/config/integrations.ts`.
3. Os dados enviados incluem nome, CPF, telefone, curso, livro, tamanho da camiseta, endereço e tags.
