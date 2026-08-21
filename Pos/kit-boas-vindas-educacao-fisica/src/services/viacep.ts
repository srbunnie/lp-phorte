import { cleanDigits } from '@/utils/masks';

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface AddressSearchResult {
  success: boolean;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  error?: string;
}

/**
 * Consulta CEP na API pública do ViaCEP com timeout e tratamento de erros
 */
export async function fetchAddressByCEP(cep: string): Promise<AddressSearchResult> {
  const digits = cleanDigits(cep);

  if (digits.length !== 8) {
    return { success: false, error: 'CEP deve conter exatamente 8 dígitos.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { success: false, error: 'Não foi possível consultar o CEP no momento.' };
    }

    const data: ViaCEPResponse = await response.json();

    if (data.erro) {
      return { success: false, error: 'CEP não encontrado. Por favor, preencha o endereço manualmente.' };
    }

    return {
      success: true,
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || '',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, error: 'Tempo limite esgotado ao buscar o CEP. Preencha manualmente.' };
    }
    return { success: false, error: 'Falha de conexão ao consultar o CEP. Preencha manualmente.' };
  }
}
