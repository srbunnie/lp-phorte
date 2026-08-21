/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: INTEGRAÇÃO DA PLANILHA GOOGLE SHEETS COM O KIT PHORTE
 * =========================================================================
 *
 * COMO USAR:
 * 1. Abra sua planilha do Google Sheets onde deseja receber os dados.
 * 2. No menu superior, clique em "Extensões" > "Apps Script".
 * 3. Apague qualquer código existente no editor e cole este script na íntegra.
 * 4. Clique em "Implantar" (botão azul no canto superior direito) > "Nova implantação".
 * 5. Tipo: Selecione "App da Web" (ícone de engrenagem).
 * 6. Configurações da implantação:
 *    - Descrição: "Webhook Kit Phorte"
 *    - Executar como: "Eu (seu-email@gmail.com)"
 *    - Quem pode acessar: "Qualquer pessoa" (ou "Qualquer pessoa, até mesmo anônima")
 * 7. Clique em "Implantar" e copie a "URL do app da Web" gerada.
 * 8. Cole essa URL no arquivo `src/config/integrations.ts` na variável `googleSheetsWebhookUrl`
 *    ou defina a variável de ambiente `NEXT_PUBLIC_GOOGLE_SHEETS_URL`.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a primeira linha estiver vazia, cria os cabeçalhos automaticamente
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data/Hora",
        "Protocolo",
        "Nome do Aluno",
        "CPF",
        "WhatsApp / Telefone",
        "E-mail",
        "Curso",
        "Livro Escolhido",
        "Autor do Livro",
        "Categoria do Livro",
        "Tamanho da Camiseta",
        "Medidas da Camiseta",
        "CEP",
        "Logradouro",
        "Número",
        "Complemento",
        "Bairro",
        "Cidade",
        "Estado (UF)",
        "Status do Envio"
      ]);

      // Formata a linha de cabeçalho
      var headerRange = sheet.getRange(1, 1, 1, 20);
      headerRange.setBackground("#e30613");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([
      formattedDate,
      data.protocolo || "",
      data.nome_aluno || "",
      data.cpf_aluno || "",
      data.telefone_aluno || "",
      data.email_aluno || "",
      data.curso || "",
      data.livro_escolhido || "",
      data.livro_autor || "",
      data.livro_categoria || "",
      data.tamanho_camiseta || "",
      data.medida_camiseta || "",
      data.cep || "",
      data.logradouro || "",
      data.numero || "",
      data.complemento || "",
      data.bairro || "",
      data.cidade || "",
      data.estado || "",
      "Pendente Separação"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "protocol": data.protocolo }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "online", "message": "Webhook do Kit Phorte ativo." }))
    .setMimeType(ContentService.MimeType.JSON);
}
