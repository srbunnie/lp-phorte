import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EnrollmentCard } from "./EnrollmentCard";
import type { SisCourseDTO, CouponDTO } from "./types";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const baseCohort: SisCourseDTO = {
  sigId: 459,
  title: "MEDICINA ESPORTIVA",
  modality: "Online/Ao vivo",
  modalityIconName: "cast_for_education",
  workload: 400,
  duration: "24 Meses",
  area: "Medicina,Saúde",
  valorParcela: 800.0,
  parcelas: 24,
  checkoutUrl: "https://phorte.com.br/checkout/459",
  localizacao: {
    campus: "Campus Bela Vista",
    cidade: "São Paulo",
    uf: "SP",
  },
  dataInicioNoSite: "10 de Março, 2026",
  status: "Ativo",
  turmaConfirmada: false,
  turmaEmDestaqueNoSite: true,
  cronograma: {
    diasSemana: "Sábados quinzenais",
    horarioInicio: "08:00",
    horarioFim: "17:00",
  },
};

const secondCohort: SisCourseDTO = {
  sigId: 21,
  title: "MEDICINA ESPORTIVA",
  modality: "Presencial",
  modalityIconName: "group",
  workload: 360,
  duration: "18 Meses",
  area: "Medicina,Saúde",
  valorParcela: 199.0,
  parcelas: 18,
  valorInscricao: 150.0,
  checkoutUrl: "https://phorte.com.br/checkout/21",
  status: "Ativo",
  localizacao: {
    campus: "Campus Bela Vista",
    cidade: "São Paulo",
    uf: "SP",
  },
  dataInicioNoSite: "05 de Agosto, 2026",
  cronograma: {
    diasSemana: "Sábados e Domingos",
    horarioInicio: "08:00",
    horarioFim: "18:00",
  },
};

const thirdCohort: SisCourseDTO = {
  sigId: 9993,
  title: "MEDICINA ESPORTIVA",
  modality: "SemiPresencial",
  modalityIconName: "group",
  workload: 360,
  duration: "24 Meses",
  area: "Medicina,Saúde",
  valorParcela: 2239.0,
  parcelas: 15,
  valorInscricao: 149.0,
  checkoutUrl: "https://phorte.com.br/checkout/9993",
  status: "Ativo",
  localizacao: {
    campus: "Polo Campinas",
    cidade: "Campinas",
    uf: "SP",
  },
  dataInicioNoSite: "08 de Maio, 2026",
  cronograma: {
    diasSemana: "Sabados",
    horarioInicio: "08:00",
    horarioFim: "17:00",
  },
};

const mockCoupon: CouponDTO = {
  code: "PH20",
  discountPercentage: 20,
  description: "Cupom Mês do Calouro",
};

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta = {
  title: "Components/Complex/EnrollmentCard",
  component: EnrollmentCard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seção de matrícula da página de curso. Exibe seleção de turmas à esquerda e resumo de investimento à direita, com suporte a cupons, múltiplas turmas e avisos de últimas vagas.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-[400px] bg-[#f7f5ef] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EnrollmentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// ── Stories ──

export const MultipleCohorts: Story = {
  name: "Múltiplas Turmas (Padrão)",
  args: {
    cohorts: [baseCohort, secondCohort],
    coupon: mockCoupon,
  },
};

export const SingleCohort: Story = {
  name: "Turma Única",
  args: {
    cohorts: [baseCohort],
    coupon: mockCoupon,
  },
};

export const ThreeOrMoreCohorts: Story = {
  name: "3+ Turmas (Ver Mais)",
  args: {
    cohorts: [baseCohort, secondCohort, thirdCohort],
    coupon: mockCoupon,
  },
};

export const WithoutCoupon: Story = {
  name: "Sem Cupom",
  args: {
    cohorts: [baseCohort, secondCohort],
    coupon: null,
  },
};

export const ConfirmedCohort: Story = {
  name: "Turma Confirmada",
  args: {
    cohorts: [
      { ...baseCohort, turmaConfirmada: true, turmaEmDestaqueNoSite: false },
      secondCohort,
    ],
    coupon: mockCoupon,
  },
};

export const LastSeats: Story = {
  name: "Últimas Vagas",
  args: {
    cohorts: [
      { ...baseCohort, remainingSeats: 3, turmaEmDestaqueNoSite: true },
      secondCohort,
    ],
    coupon: mockCoupon,
  },
};
