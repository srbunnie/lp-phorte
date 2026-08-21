import { KitSubmissionPayload, SubmissionResponse } from '@/types';
import { INTEGRATIONS_CONFIG } from '@/config/integrations';
import { sendToGoogleSheets } from './googleSheets';
import { sendToRDStation } from './rdStation';

/**
 * Salva cópia de segurança no localStorage do navegador do aluno
 */
function saveBackupSubmission(payload: KitSubmissionPayload) {
  try {
    const raw = localStorage.getItem(INTEGRATIONS_CONFIG.storageKeySubmissions);
    const list: KitSubmissionPayload[] = raw ? JSON.parse(raw) : [];
    list.unshift(payload);
    localStorage.setItem(
      INTEGRATIONS_CONFIG.storageKeySubmissions,
      JSON.stringify(list.slice(0, 50))
    );
  } catch (err) {
    console.warn('[Storage] Não foi possível salvar backup local:', err);
  }
}

/**
 * Submissão orquestrada do Kit de Boas-Vindas
 */
export async function submitKitCustomization(
  payload: KitSubmissionPayload
): Promise<SubmissionResponse> {
  // Salva backup local antes de disparar requisições de rede
  saveBackupSubmission(payload);

  // Executa envios em paralelo
  const [sheetsResult, rdResult] = await Promise.allSettled([
    sendToGoogleSheets(payload),
    sendToRDStation(payload),
  ]);

  const googleSheetsSuccess =
    sheetsResult.status === 'fulfilled' && sheetsResult.value.success;
  const rdStationSuccess =
    rdResult.status === 'fulfilled' && rdResult.value.success;

  return {
    success: true, // Sempre consideramos concluído no front após salvar backup e disparar
    protocol: payload.protocol,
    googleSheetsSuccess,
    rdStationSuccess,
  };
}
