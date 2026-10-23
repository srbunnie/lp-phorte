# Relatório comparativo — Consulta Pública de Diplomas

**Data da verificação:** 23/10/2026
**Objetivo:** registrar as diferenças entre a página publicada e o arquivo local de referência para orientar o setor responsável.

## Fontes comparadas

- **Página publicada:** [validadordiploma.faculdadephorte.edu.br](https://validadordiploma.faculdadephorte.edu.br/)
- **Arquivo local:** `Graduacao/consulta-publica-de-diplomas/index-funcional.html`
- **Resultado de acesso:** a página publicada respondeu com HTTP 200 durante a verificação.

## Resumo executivo

O arquivo local e a página publicada não são versões equivalentes da mesma aplicação. O arquivo local é uma página HTML estática, com estilos e JavaScript no próprio arquivo, usada como referência de conteúdo e layout. A página publicada usa arquivos CSS e JavaScript externos e envia os dados do formulário para o endpoint `POST /consulta`, que retorna os registros a serem exibidos.

As duas versões também pedem combinações diferentes de dados para a consulta. Por isso, copiar as alterações locais para a publicação sem validação do setor responsável pode mudar os critérios de busca e o fluxo funcional.

## Diferenças observadas

| Aspecto | Página publicada | Arquivo local |
| --- | --- | --- |
| **Título e texto principal** | “Consulte seu diploma”; apresenta a consulta como serviço para verificar autenticidade e consultar dados do diploma. | “Consulta de dados do registro”; distingue consulta acadêmica de validação do diploma digital. |
| **Opções** | CPF; número de registro + CPF; link “Código de validação” para o serviço externo. | CPF + data de nascimento; número de registro + RG; link “Validar diploma digital” para o mesmo serviço externo. |
| **Campos** | CPF; ou número de registro e CPF. Os campos de CPF têm máscara e limite de caracteres. | CPF e data de nascimento; ou número de registro e RG. Os campos têm validação de preenchimento, sem máscara ou validação matemática de CPF. |
| **Envio da consulta** | O formulário aponta para `POST https://validadordiploma.faculdadephorte.edu.br/consulta`. O JavaScript envia JSON com o método escolhido e os valores preenchidos, usando o token CSRF da sessão. | O formulário não tem `action` nem faz requisição. Os valores não são enviados; após o preenchimento, a página informa que não conseguiu consultar e oferece contato da secretaria. |
| **Resultados** | O JavaScript da página interpreta a resposta do servidor, apresenta registros localizados ou estado sem resultado, e pode exibir ações de visualização e download do documento conforme os dados recebidos. | Não apresenta resultados acadêmicos. Não há estados simulados de sucesso ou de registro não encontrado. |
| **Validação do diploma digital** | Link “Código de validação / Acessar validação do diploma digital”, direcionado ao serviço externo. | Link “Validar diploma digital / Informe o código do documento”, também direcionado ao serviço externo e aberto em nova aba. |
| **Estilos e scripts** | Carrega CSS e JavaScript de URLs próprias do domínio publicado. | CSS e JavaScript ficam embutidos no arquivo HTML local. |
| **Opções em telas estreitas** | A folha publicada mantém as três opções na mesma grade, com espaçamento reduzido no breakpoint mobile. | Até 620 px, as opções ficam uma por linha. |
| **Contêiner dos campos** | A folha CSS zera margem, recuo e borda padrão de `fieldset`. | A folha local aplica o mesmo reset de forma escopada ao formulário de consulta. |
| **Indexação** | Inclui `noindex, nofollow`. | Também inclui `noindex, nofollow`. |

## Impacto para as alterações solicitadas

1. As mudanças feitas em `index-funcional.html` alteram somente o arquivo local; não modificam o domínio publicado.
2. A solicitação de empilhar opções no mobile já está refletida no CSS local, mas a página publicada continua com as opções em colunas.
3. O ajuste de espaçamento local remove o estilo nativo do `fieldset`; a folha publicada já possui reset global equivalente.
4. A alteração dos critérios de busca é material: o arquivo local pede **CPF + nascimento** ou **registro + RG**, enquanto a página publicada pede **CPF** ou **registro + CPF**. O setor responsável deve confirmar qual combinação é a regra aprovada antes de qualquer mudança funcional.
5. Os textos locais de indisponibilidade e o estado após envio não devem ser transplantados para a página publicada sem avaliar o comportamento do endpoint existente.

## Limites da verificação

- A comparação foi feita a partir do HTML e dos arquivos CSS/JavaScript atualmente servidos pelo domínio, sem enviar dados pessoais nem submeter o formulário.
- O markup e o JavaScript confirmam a requisição para `/consulta` e a renderização de respostas do servidor; esta verificação não confirma a precisão dos registros retornados nem o funcionamento do serviço de documentos.
- O repositório local `lp-phorte` não contém o código que serve a página publicada nem suas folhas externas. A origem de deploy da aplicação ainda precisa ser identificada para preparar alterações no sistema correto.
- Nenhuma alteração foi publicada.

## Próxima ação recomendada

Encaminhar este relatório ao setor responsável pela aplicação de consulta para confirmar os critérios de busca e identificar o repositório ou ambiente de origem antes de implementar ajustes no endereço publicado.
