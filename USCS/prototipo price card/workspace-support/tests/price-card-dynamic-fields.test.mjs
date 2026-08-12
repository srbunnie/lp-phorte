import test from "node:test";
import assert from "node:assert/strict";

import {
  FALLBACK_CAMPUS_OFFER,
  FALLBACK_EAD_OFFER,
  mapPhorteOffersToCampusOffers,
  mapPhorteOfferToEadOffer,
} from "../../site-final/PriceCardUscs/price-card-uscs.mapper.js";

const rawCampusOffers = [
  {
    classId: 101,
    codeClass: "SCS-01",
    city: "Sao Caetano do Sul",
    state: "SP",
    address: "R. Santo Antonio, 50 - Centro",
    date: "12 de Marco de 2026",
    confirmed: true,
    remainingSeats: 3,
    payments: [
      {
        quantidadeParcela: "24",
        valorParcela: "1734",
        valorInscricao: "165",
      },
      {
        quantidadeParcela: "18",
        valorParcela: "1944",
        valorInscricao: "165",
      },
    ],
  },
];

test("mapPhorteOffersToCampusOffers maps current Phorte fields to the USCS contract", () => {
  const offers = mapPhorteOffersToCampusOffers(rawCampusOffers, {
    modality: "presencial",
  });

  assert.equal(offers.length, 1);
  assert.equal(offers[0].id, "101");
  assert.equal(offers[0].locationLabel, "Sao Caetano do Sul - SP");
  assert.equal(offers[0].dateLabel, "12 de Marco de 2026");
  assert.equal(offers[0].addressLabel, "R. Santo Antonio, 50 - Centro");
  assert.equal(offers[0].confirmed, true);
  assert.equal(offers[0].remainingSeats, 3);
  assert.equal(offers[0].payments[0].label, "Opcao 1");
  assert.equal(offers[0].payments[0].installments, 24);
  assert.equal(offers[0].payments[0].amount, 1734);
  assert.equal(offers[0].payments[0].enrollmentFee, 165);
});

test("mapPhorteOffersToCampusOffers falls back when dynamic fields are missing", () => {
  const offers = mapPhorteOffersToCampusOffers(
    [
      {
        classId: null,
        city: "",
        state: "",
        payments: [],
      },
    ],
    { modality: "presencial" },
  );

  assert.equal(offers[0].locationLabel, FALLBACK_CAMPUS_OFFER.locationLabel);
  assert.equal(offers[0].dateLabel, FALLBACK_CAMPUS_OFFER.dateLabel);
  assert.equal(offers[0].payments.length, 1);
  assert.equal(offers[0].payments[0].label, FALLBACK_CAMPUS_OFFER.payments[0].label);
  assert.equal(offers[0].payments[0].amount, FALLBACK_CAMPUS_OFFER.payments[0].amount);
});

test("mapPhorteOfferToEadOffer builds the EAD card and preserves fallbacks", () => {
  const eadOffer = mapPhorteOfferToEadOffer(
    {
      classId: 202,
      date: "12 de Marco de 2026",
      workloadLabel: "420h",
      confirmed: true,
      remainingSeats: 8,
      payments: [
        {
          quantidadeParcela: "24",
          valorParcela: "900",
          valorInscricao: "165",
        },
      ],
    },
    {
      description: "Mensalidades que cabem no seu bolso.",
      compactStartLabel: "Inicio imediato",
    },
  );

  assert.equal(eadOffer.headline, "Quanto investir");
  assert.equal(eadOffer.infoItems[1].value, "Inicio: 12 de Marco de 2026");
  assert.equal(eadOffer.infoItems[2].value, "420h");
  assert.equal(eadOffer.compactCard.confirmed, true);
  assert.equal(eadOffer.compactCard.remainingSeats, 8);
  assert.equal(eadOffer.compactCard.payments[0].amount, 900);

  const fallbackEad = mapPhorteOfferToEadOffer({}, {});
  assert.equal(fallbackEad.headline, FALLBACK_EAD_OFFER.headline);
  assert.equal(fallbackEad.compactCard.payments[0].label, FALLBACK_EAD_OFFER.compactCard.payments[0].label);
});
