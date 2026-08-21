import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPriceCardThemeVars,
  getVisibleOffers,
  getOfferBadges,
  createInitialSelectionState,
  getSelectedPayment,
} from "../../site-final/PriceCardUscs/price-card-uscs.model.js";

const tokenFixture = {
  USCS: {
    Color: {
      Brand: {
        200: { $value: { hex: "#EFF6FD" } },
        300: { $value: { hex: "#DDE4EB" } },
        600: { $value: { hex: "#3773FF" } },
        800: { $value: { hex: "#093AA8" } },
        "Blue Uscs": { $value: { hex: "#101D41" } },
      },
      Matricula: {
        600: { $value: { hex: "#F1BB18" } },
        800: { $value: { hex: "#FB8425" } },
      },
      Confirmar: {
        600: { $value: { hex: "#11B859" } },
        800: { $value: { hex: "#009966" } },
      },
      Neutral: {
        100: { $value: { hex: "#FAFAFA", alpha: 1 } },
        200: { $value: { hex: "#EEEEEE", alpha: 1 } },
        400: { $value: { hex: "#D7D7D7", alpha: 1 } },
        600: { $value: { hex: "#8E8E8E", alpha: 1 } },
        900: { $value: { hex: "#161616", alpha: 1 } },
      },
    },
    Spacing: {
      "2xs": { $value: 8 },
      xs: { $value: 16 },
      s: { $value: 24 },
      m: { $value: 32 },
    },
    Radius: {
      xxs: { $value: 4 },
      xs: { $value: 16 },
      s: { $value: 24 },
      m: { $value: 32 },
      full: { $value: 999 },
    },
  },
};

const figmaExportFixture = {
  styles: {
    effectStyles: [
      { token: "d3", value: "box-shadow: 3px 3px 4px 0px rgba(22, 22, 22, 0.1)" },
      { token: "uscs-global-tokens-d1", value: "box-shadow: 8px 8px 10px 0px rgba(22, 22, 22, 0.08)" },
      { token: "uscs-global-tokens-d2", value: "box-shadow: 0px 0px 8px 0px #d7d7d7" },
    ],
  },
};

const offerFixture = [
  {
    id: "scs",
    locationLabel: "São Caetano do Sul - SP",
    modalityLabel: "Presencial",
    dateLabel: "12 de Março de 2026",
    confirmed: true,
    remainingSeats: 3,
    payments: [
      { label: "Opção 1", installments: 24, amount: 1734, enrollmentFee: 165, startLabel: "12 de Março de 2026" },
      { label: "Opção 2", installments: 18, amount: 1944, enrollmentFee: 165, startLabel: "12 de Março de 2026" },
    ],
  },
  {
    id: "for",
    locationLabel: "Fortaleza - CE",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    highlighted: false,
    payments: [{ label: "Opção 1", installments: 24, amount: 1734, enrollmentFee: 165, startLabel: "24 de Março de 2026" }],
  },
  {
    id: "rio",
    locationLabel: "Rio de Janeiro - RJ",
    modalityLabel: "Presencial",
    dateLabel: "24 de Março de 2026",
    payments: [{ label: "Opção 1", installments: 20, amount: 1600, enrollmentFee: 165, startLabel: "24 de Março de 2026" }],
  },
];

test("buildPriceCardThemeVars maps Figma tokens to semantic CSS variables", () => {
  const vars = buildPriceCardThemeVars(tokenFixture, figmaExportFixture);

  assert.equal(vars["--uscs-color-brand-hero"], "#101D41");
  assert.equal(vars["--uscs-color-brand-600"], "#3773FF");
  assert.equal(vars["--uscs-gradient-cta"], "linear-gradient(90deg, #FB8425 0%, #F1BB18 100%)");
  assert.equal(vars["--uscs-shadow-d1"], "8px 8px 10px 0px rgba(22, 22, 22, 0.08)");
  assert.equal(vars["--uscs-radius-panel"], "32px");
});

test("getVisibleOffers keeps two cards by default and expands when requested", () => {
  assert.equal(getVisibleOffers(offerFixture, false).length, 2);
  assert.equal(getVisibleOffers(offerFixture, true).length, 3);
});

test("getOfferBadges preserves confirmation and last seats states", () => {
  assert.deepEqual(getOfferBadges(offerFixture[0]), [
    { kind: "confirmed", label: "TURMA CONFIRMADA" },
    { kind: "lastSeats", label: "ÚLTIMAS VAGAS" },
  ]);
});

test("selection helpers default to the first offer and first payment", () => {
  const state = createInitialSelectionState(offerFixture);

  assert.equal(state.selectedOfferId, "scs");
  assert.equal(state.selectedPaymentIndex, 0);
  assert.equal(getSelectedPayment(offerFixture[0], state.selectedPaymentIndex)?.label, "Opção 1");
});
