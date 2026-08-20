import { KitSubmissionPayload } from '@/types';
import { INTEGRATIONS_CONFIG } from '@/config/integrations';

/**
 * Envia o evento de conversão para o RD Station Marketing
 */
export async function sendToRDStation(payload: KitSubmissionPayload): Promise<{ success: boolean; message?: string }> {
  const webhookUrl = INTEGRATIONS_CONFIG.rdStationWebhookUrl;

  const conversionPayload = {
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: {
      conversion_identifier: INTEGRATIONS_CONFIG.rdStationEventIdentifier,
      name: payload.student.name,
      email: payload.student.email || `${payload.student.cpf.replace(/\D/g, '')}@aluno.posphorte.com.br`,
      personal_phone: payload.student.phone,
      cf_cpf: payload.student.cpf,
      cf_curso_pos: payload.student.course,
      cf_livro_kit_phorte: payload.book.title,
      cf_camiseta_tamanho: payload.shirt.size,
      cf_protocolo_kit: payload.protocol,
      cf_cidade: payload.address.city,
      cf_estado: payload.address.state,
      cf_cep: payload.address.cep,
      tags: ['kit-boas-vindas', 'pos-educacao-fisica', 'aluno-matriculado'],
    },
  };

  // Se o endpoint do RD Station não estiver configurado, loga e simula
  if (!webhookUrl) {
    console.info('[RD Station] Webhook do RD Station não configurado. Payload pronto para conversão:', conversionPayload);
    return { success: true, message: 'Simulação RD Station (configure NEXT_PUBLIC_RD_STATION_URL)' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversionPayload),
    });

    if (response.ok || response.status === 201 || response.status === 200) {
      return { success: true, message: 'Conversão registrada com sucesso no RD Station.' };
    }

    return { success: false, message: `RD Station retornou status ${response.status}` };
  } catch (error) {
    console.error('[RD Station] Erro no envio:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Falha na comunicação com RD Station',
    };
  }
}
