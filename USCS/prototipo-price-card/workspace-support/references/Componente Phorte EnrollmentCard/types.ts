export type CohortStatus = 'Ativo' | 'Em Espera' | 'Cancelado' | 'Finalizado' | 'Interrompido';

export interface SisCourseDTO {
    sigId: string | number;
    title: string;
    modality: string;
    modalityIconName?: string;
    workload: number;
    duration: string;
    area: string;

    valorParcela?: number;
    parcelas: number;
    valorMatricula?: number;
    valorInscricao?: number;
    ebookUrl?: string | null;
    checkoutUrl: string;

    localizacao?: {
        campus?: string;
        cidade?: string;
        uf?: string;
        enderecoCompleto?: string;
    };
    cronograma?: {
        diasSemana?: string;
        horarioInicio?: string;
        horarioFim?: string;
    };

    maxInscritos?: number;
    remainingSeats?: number;
    vagasRestantes?: number;
    status: CohortStatus;

    statusNoSite?: boolean;
    turmaEmDestaqueNoSite?: boolean;
    turmaConfirmada?: boolean;
    dataInicioNoSite?: string;
    informacoesAdicionaisData?: string;
    dataInicioAulas?: string;
    dataFimAulas?: string;
}

export interface CouponDTO {
    code: string;
    discountPercentage: number;
    description: string;
}
