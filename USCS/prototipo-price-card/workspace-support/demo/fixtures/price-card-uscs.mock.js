export const uscsCampusOffers = [
  {
    id: "scs",
    locationLabel: "São Caetano do Sul - SP",
    modalityLabel: "Presencial",
    dateLabel: "12 de Março de 2026",
    addressLabel: "R. Santo Antônio, 50 - Centro",
    confirmed: true,
    remainingSeats: 3,
    highlighted: false,
    payments: [
      {
        label: "Opção 1",
        installments: 24,
        amount: 1734,
        enrollmentFee: 165,
        modalityLabel: "Presencial",
        startLabel: "12 de Março de 2026",
      },
      {
        label: "Opção 2",
        installments: 18,
        amount: 1944,
        enrollmentFee: 165,
        modalityLabel: "Presencial",
        startLabel: "12 de Março de 2026",
      },
    ],
  },
  {
    id: "for",
    locationLabel: "Fortaleza - CE",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    addressLabel: "Av. Beira Mar, 1260 - Meireles",
    confirmed: false,
    highlighted: false,
    payments: [
      {
        label: "Opção 1",
        installments: 24,
        amount: 1734,
        enrollmentFee: 165,
        modalityLabel: "Presencial",
        startLabel: "24 de Março de 2026",
      },
    ],
  },
  {
    id: "rio",
    locationLabel: "Rio de Janeiro - RJ",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    addressLabel: "Rua do Catete, 210 - Catete",
    confirmed: false,
    highlighted: false,
    payments: [
      {
        label: "Opção 1",
        installments: 20,
        amount: 1600,
        enrollmentFee: 165,
        modalityLabel: "Presencial",
        startLabel: "24 de Março de 2026",
      },
    ],
  },
  {
    id: "sp",
    locationLabel: "São Paulo - SP",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    addressLabel: "Av. Paulista, 1001 - Bela Vista",
    confirmed: false,
    highlighted: false,
    payments: [
      {
        label: "Opção 1",
        installments: 20,
        amount: 1690,
        enrollmentFee: 165,
        modalityLabel: "Presencial",
        startLabel: "24 de Março de 2026",
      },
    ],
  },
];

export const uscsEadOffer = {
  id: "ead-online",
  headline: "Quanto investir",
  description:
    "Invista no seu futuro com uma educação de excelência. Mensalidades que cabem no seu bolso.",
  infoItems: [
    { label: "Modalidade", value: "EAD - 100% online", icon: "monitor" },
    { label: "Próxima turma", value: "Início: 12 de março de 2026", icon: "calendar" },
    { label: "Carga horária", value: "420h", icon: "clock" },
  ],
  compactCard: {
    locationLabel: "Polo online",
    dateLabel: "Início imediato",
    confirmed: true,
    payments: [
      {
        label: "Opção 1",
        installments: 24,
        amount: 900,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "Início imediato",
      },
      {
        label: "Opção 2",
        installments: 18,
        amount: 1080,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "Início imediato",
      },
    ],
  },
};
