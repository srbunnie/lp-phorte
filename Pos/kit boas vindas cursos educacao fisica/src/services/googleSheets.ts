import { KitSubmissionPayload } from '@/types';
import { INTEGRATIONS_CONFIG } from '@/config/integrations';

/**
 * Envia os dados do kit para a planilha do Google Sheets via Google Apps Script Web App
 */
export async function sendToGoogleSheets(payload: KitSubmissionPayload): Promise<{ success: boolean; message?: string }> {
  const url = INTEGRATIONS_CONFIG.googleSheetsWebhookUrl;

  // Se a URL não estiver configurada ou contiver o placeholder, registra log e simula sucesso
  if (!url || url.includes('SEU_ID_DO_APPS_SCRIPT_AQUI')) {
    console.warn('[Google Sheets] URL do Apps Script não configurada. Simulando envio com sucesso.', payload);
    return { success: true, message: 'Simulação de envio (Configure NEXT_PUBLIC_GOOGLE_SHEETS_URL)' };
  }

  const flattenedData = {
    protocolo: payload.protocol,
    data_hora: payload.timestamp,
    nome_aluno: payload.student.name,
    cpf_aluno: payload.student.cpf,
    telefone_aluno: payload.student.phone,
    email_aluno: payload.student.email,
    curso: payload.student.course,
    livro_escolhido: payload.book.title,
    livro_autor: payload.book.author,
    livro_categoria: payload.book.category,
    tamanho_camiseta: payload.shirt.size,
    medida_camiseta: payload.shirt.measure,
    cep: payload.address.cep,
    logradouro: payload.address.street,
    numero: payload.address.number,
    complemento: payload.address.complement || '',
    bairro: payload.address.neighborhood,
    cidade: payload.address.city,
    estado: payload.address.state,
  };

  try {
    // Tentativa com fetch padrão POST JSON
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors', // Apps Script web app redirect handling
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flattenedData),
    });

    return { success: true, message: 'Dados enviados com sucesso para o Google Sheets.' };
  } catch (error) {
    console.error('[Google Sheets] Erro ao enviar dados:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao conectar ao Google Sheets',
    };
  }
}
