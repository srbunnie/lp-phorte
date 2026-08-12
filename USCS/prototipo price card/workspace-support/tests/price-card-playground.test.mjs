import test from "node:test";
import assert from "node:assert/strict";

import { buildPlaygroundScenario } from "../demo/preview-react-app/src/playground-data.js";

const campusOffersFixture = [
  {
    id: "scs",
    locationLabel: "São Caetano do Sul - SP",
    modalityLabel: "Presencial",
    dateLabel: "12 de Março de 2026",
    addressLabel: "Rua Santo Antônio, 50 - Centro",
    confirmed: true,
    remainingSeats: 3,
    highlighted: false,
    payments: [
      { label: "Opção 1", installments: 24, amount: 1734, enrollmentFee: 165, modalityLabel: "Presencial", startLabel: "12 de Março de 2026" },
      { label: "Opção 2", installments: 18, amount: 1944, enrollmentFee: 165, modalityLabel: "Presencial", startLabel: "12 de Março de 2026" },
    ],
  },
  {
    id: "for",
    locationLabel: "Fortaleza - CE",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    addressLabel: "Av. Beira Mar, 1260 - Meireles",
    confirmed: false,
    remainingSeats: null,
    highlighted: false,
    payments: [
      { label: "Opção 1", installments: 24, amount: 1734, enrollmentFee: 165, modalityLabel: "Presencial", startLabel: "24 de Março de 2026" },
    ],
  },
];

const eadOfferFixture = {
  id: "ead-online",
  headline: "Quanto Investir",
  description: "Descrição",
  infoItems: [
    { label: "Modalidade", value: "EAD - 100% Online", icon: "monitor" },
    { label: "Próxima turma", value: "Início: 12 de março de 2026", icon: "calendar" },
    { label: "Carga horária", value: "420h", icon: "clock" },
  ],
  compactCard: {
    confirmed: true,
    remainingSeats: 4,
    payments: [
      { label: "Opção 1", installments: 24, amount: 900, enrollmentFee: 165, modalityLabel: "EAD - 100% Online", startLabel: "Início imediato" },
    ],
  },
};

test("buildPlaygroundScenario can reduce campuses and hide campus badges", () => {
  const scenario = buildPlaygroundScenario({
    campusOffers: campusOffersFixture,
    eadOffer: eadOfferFixture,
    controls: {
      campusCount: 1,
      campusPaymentCount: 1,
      campusConfirmed: false,
      campusLastSeats: false,
      eadConfirmed: true,
      eadLastSeats: true,
      eadPaymentCount: 1,
      eadInfoCount: 3,
    },
  });

  assert.equal(scenario.offers.length, 1);
  assert.equal(scenario.offers[0].payments.length, 1);
  assert.equal(scenario.offers[0].confirmed, false);
  assert.equal(scenario.offers[0].remainingSeats, null);
  assert.equal(scenario.offers[0].highlighted, false);
});

test("buildPlaygroundScenario can synthesize extra payments and ead badges", () => {
  const scenario = buildPlaygroundScenario({
    campusOffers: campusOffersFixture,
    eadOffer: eadOfferFixture,
    controls: {
      campusCount: 2,
      campusPaymentCount: 3,
      campusConfirmed: true,
      campusLastSeats: true,
      eadConfirmed: true,
      eadLastSeats: true,
      eadPaymentCount: 3,
      eadInfoCount: 2,
    },
  });

  assert.equal(scenario.offers[0].payments.length, 3);
  assert.equal(scenario.offers[0].payments[2].label, "Opção 3");
  assert.equal(scenario.eadOffer.compactCard.confirmed, true);
  assert.equal(scenario.eadOffer.compactCard.remainingSeats, 6);
  assert.equal(scenario.eadOffer.compactCard.payments.length, 3);
  assert.equal(scenario.eadOffer.infoItems.length, 2);
});

test("buildPlaygroundScenario can apply badges to other campus offers", () => {
  const scenario = buildPlaygroundScenario({
    campusOffers: campusOffersFixture,
    eadOffer: eadOfferFixture,
    controls: {
      campusCount: 2,
      campusPaymentCount: 1,
      campusConfirmed: false,
      campusLastSeats: false,
      campusConfirmedOthers: true,
      campusLastSeatsOthers: true,
      eadConfirmed: true,
      eadLastSeats: true,
      eadPaymentCount: 1,
      eadInfoCount: 3,
    },
  });

  assert.equal(scenario.offers[0].confirmed, false);
  assert.equal(scenario.offers[0].remainingSeats, null);
  assert.equal(scenario.offers[1].confirmed, true);
  assert.equal(scenario.offers[1].remainingSeats, 6);
});
