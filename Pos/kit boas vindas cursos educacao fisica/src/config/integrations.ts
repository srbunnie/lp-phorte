/**
 * Configuração das integrações do Kit de Boas-Vindas Pós Phorte
 *
 * Como o projeto é compilado estaticamente para FTP, estas configurações
 * orientam as chamadas HTTP assíncronas do cliente para as APIs externas.
 */

export const INTEGRATIONS_CONFIG = {
  // URL do Web App do Google Apps Script conectado à sua Planilha Google Sheets
  // (Substitua pela URL gerada ao implantar o script da pasta docs/google-apps-script.js)
  googleSheetsWebhookUrl:
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbz_SEU_ID_DO_APPS_SCRIPT_AQUI/exec',

  // Identificador do evento no RD Station Marketing
  rdStationEventIdentifier: 'kit-boas-vindas-pos-ed-fisica',

  // Token público / Endpoint de integração do RD Station
  // (Caso utilize RD Station Conversion API via Webhook, Zapier, n8n ou endpoint direto)
  rdStationWebhookUrl:
    process.env.NEXT_PUBLIC_RD_STATION_URL || '',

  // Habilitar simulação caso a URL não esteja configurada ainda
  enableMockFallback: true,

  // Chave do localStorage para backup de segurança das submissões
  storageKeySubmissions: 'phorte_kit_submissions_backup',
};
