import {
  mapPhorteOfferToEadOffer,
  mapPhorteOffersToCampusOffers,
} from "../../site-final/PriceCardUscs/price-card-uscs.mapper.js";

export const phorteCampusOffersComplete = [
  {
    classId: 101,
    codeClass: "USCS-SCS-01",
    city: "Sao Caetano do Sul",
    state: "SP",
    address: "R. Santo Antonio, 50 - Centro",
    date: "12 de Marco de 2026",
    confirmed: true,
    remainingSeats: 3,
    payments: [
      { quantidadeParcela: "24", valorParcela: "1734", valorInscricao: "165" },
      { quantidadeParcela: "18", valorParcela: "1944", valorInscricao: "165" },
    ],
  },
  {
    classId: 102,
    codeClass: "USCS-FOR-01",
    city: "Fortaleza",
    state: "CE",
    address: "Av. Beira Mar, 1260 - Meireles",
    date: "24 de Marco de 2026",
    confirmed: false,
    remainingSeats: null,
    payments: [{ quantidadeParcela: "24", valorParcela: "1734", valorInscricao: "165" }],
  },
  {
    classId: 103,
    codeClass: "USCS-RIO-01",
    city: "Rio de Janeiro",
    state: "RJ",
    address: "Rua do Catete, 210 - Catete",
    date: "24 de Marco de 2026",
    confirmed: false,
    remainingSeats: 8,
    payments: [{ quantidadeParcela: "20", valorParcela: "1600", valorInscricao: "165" }],
  },
  {
    classId: 104,
    codeClass: "USCS-SP-01",
    city: "Sao Paulo",
    state: "SP",
    address: "Av. Paulista, 1001 - Bela Vista",
    date: "24 de Marco de 2026",
    confirmed: false,
    remainingSeats: null,
    payments: [{ quantidadeParcela: "20", valorParcela: "1690", valorInscricao: "165" }],
  },
];

export const phorteCampusOffersPartial = [
  {
    classId: 201,
    city: "Sao Caetano do Sul",
    state: "SP",
    date: "",
    payments: [{ quantidadeParcela: "24", valorParcela: "1734", valorInscricao: "165" }],
  },
  {
    classId: 202,
    city: "",
    state: "",
    address: "",
    date: "24 de Marco de 2026",
    payments: [{ quantidadeParcela: "20", valorParcela: "1690", valorInscricao: "165" }],
  },
  {
    classId: 203,
    city: "Fortaleza",
    state: "CE",
    address: "",
    date: "",
    payments: [],
  },
];

export const phorteEadOfferComplete = {
  classId: 301,
  date: "12 de Marco de 2026",
  workloadLabel: "420h",
  confirmed: true,
  remainingSeats: 8,
  payments: [
    { quantidadeParcela: "24", valorParcela: "900", valorInscricao: "165" },
    { quantidadeParcela: "18", valorParcela: "1080", valorInscricao: "165" },
  ],
};

export const phorteEadOfferPartial = {
  classId: 302,
  date: "",
  workloadLabel: "",
  confirmed: false,
  remainingSeats: null,
  payments: [],
};

export function buildDynamicDataset(mode = "complete") {
  if (mode === "partial") {
    return {
      offers: mapPhorteOffersToCampusOffers(phorteCampusOffersPartial, { modality: "presencial" }),
      eadOffer: mapPhorteOfferToEadOffer(phorteEadOfferPartial, {
        description: "As informacoes desta oferta estao sendo preenchidas gradualmente.",
      }),
    };
  }

  return {
    offers: mapPhorteOffersToCampusOffers(phorteCampusOffersComplete, { modality: "presencial" }),
    eadOffer: mapPhorteOfferToEadOffer(phorteEadOfferComplete, {
      description: "Invista no seu futuro com uma educacao de excelencia. Mensalidades que cabem no seu bolso.",
      compactStartLabel: "Inicio imediato",
    }),
  };
}
