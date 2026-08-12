const defaultControls = {
  campusCount: 4,
  campusPaymentCount: 2,
  campusConfirmed: true,
  campusLastSeats: true,
  campusConfirmedOthers: false,
  campusLastSeatsOthers: false,
  eadConfirmed: true,
  eadLastSeats: true,
  eadPaymentCount: 2,
  eadInfoCount: 3,
  isModified: false,
};


function clonePayment(payment, index) {
  const nextInstallments = Math.max(1, (payment?.installments ?? 12) - index * 3);
  const nextAmount = Math.round((payment?.amount ?? 900) + index * 140);

  return {
    ...payment,
    label: `Opção ${index + 1}`,
    installments: nextInstallments,
    amount: nextAmount,
  };
}

function buildPayments(sourcePayments = [], count = 1) {
  const basePayments = sourcePayments.length ? sourcePayments : [{}];
  const result = [];

  for (let index = 0; index < count; index += 1) {
    const seed = basePayments[index] ?? basePayments[index % basePayments.length] ?? {};
    result.push(clonePayment(seed, index));
  }

  return result;
}

function buildCampusOffer(offer, index, controls) {
  const isPrimaryOffer = index === 0;

  return {
    ...offer,
    confirmed: isPrimaryOffer ? controls.campusConfirmed : controls.campusConfirmedOthers,
    remainingSeats: isPrimaryOffer
      ? (controls.campusLastSeats ? 6 : null)
      : (controls.campusLastSeatsOthers ? 6 : null),
    payments: buildPayments(offer.payments, controls.campusPaymentCount),
  };
}

function buildCampusOffers(offers, controls) {
  return offers
    .slice(0, controls.campusCount)
    .map((offer, index) => buildCampusOffer(offer, index, controls));
}

function buildEadOffer(eadOffer, controls) {
  return {
    ...eadOffer,
    infoItems: (eadOffer.infoItems ?? []).slice(0, controls.eadInfoCount),
    compactCard: {
      ...eadOffer.compactCard,
      confirmed: controls.eadConfirmed,
      remainingSeats: controls.eadLastSeats ? 6 : null,
      payments: buildPayments(eadOffer.compactCard?.payments, controls.eadPaymentCount),
    },
  };
}

export function buildPlaygroundScenario({
  campusOffers = [],
  eadOffer = {},
  controls = {},
}) {
  const resolvedControls = { ...defaultControls, ...controls };

  return {
    offers: buildCampusOffers(campusOffers, resolvedControls),
    eadOffer: buildEadOffer(eadOffer, resolvedControls),
  };
}

export { defaultControls };
