const DEFAULT_MODALITY_LABELS = {
  presencial: "Presencial",
  ead: "EAD - 100% online",
};

export const FALLBACK_PAYMENT = Object.freeze({
  label: "Opcao 1",
  installments: 0,
  amount: 0,
  enrollmentFee: 0,
  modalityLabel: DEFAULT_MODALITY_LABELS.presencial,
  startLabel: "A definir",
});

export const FALLBACK_CAMPUS_OFFER = Object.freeze({
  id: "offer-fallback",
  locationLabel: "Local a confirmar",
  modalityLabel: DEFAULT_MODALITY_LABELS.presencial,
  dateLabel: "A definir",
  addressLabel: "Endereco a confirmar",
  confirmed: false,
  remainingSeats: null,
  highlighted: false,
  payments: [FALLBACK_PAYMENT],
});

export const FALLBACK_EAD_OFFER = Object.freeze({
  id: "ead-fallback",
  headline: "Quanto investir",
  description: "As informacoes desta oferta ainda estao sendo preparadas.",
  infoItems: [
    { label: "Modalidade", value: DEFAULT_MODALITY_LABELS.ead, icon: "monitor" },
    { label: "Proxima turma", value: "Inicio: A definir", icon: "calendar" },
    { label: "Carga horaria", value: "Carga horaria a confirmar", icon: "clock" },
  ],
  compactCard: {
    id: "ead-fallback-card",
    locationLabel: "Polo online",
    modalityLabel: DEFAULT_MODALITY_LABELS.ead,
    dateLabel: "Inicio imediato",
    addressLabel: null,
    confirmed: false,
    remainingSeats: null,
    highlighted: false,
    payments: [
      {
        ...FALLBACK_PAYMENT,
        modalityLabel: DEFAULT_MODALITY_LABELS.ead,
        startLabel: "Inicio imediato",
      },
    ],
  },
});

function toStringValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumberValue(value, fallback = 0) {
  const normalized = Number.parseFloat(value);
  return Number.isFinite(normalized) ? normalized : fallback;
}

function toIntegerValue(value, fallback = 0) {
  const normalized = Number.parseInt(value, 10);
  return Number.isFinite(normalized) ? normalized : fallback;
}

function resolveLocationLabel(offer, modality) {
  if (modality === "ead") return "Polo online";

  const city = toStringValue(offer?.city);
  const state = toStringValue(offer?.state);

  if (city && state) return `${city} - ${state}`;
  if (city) return city;
  if (state) return state;

  return FALLBACK_CAMPUS_OFFER.locationLabel;
}

function resolveAddressLabel(offer, modality) {
  if (modality === "ead") return null;

  const address = toStringValue(offer?.address);
  if (address) return address;

  const city = toStringValue(offer?.city);
  const state = toStringValue(offer?.state);
  if (city && state) return `${city} - ${state}`;
  if (city) return city;

  return FALLBACK_CAMPUS_OFFER.addressLabel;
}

function resolveDateLabel(offer) {
  return (
    toStringValue(offer?.dateLabel) ||
    toStringValue(offer?.date) ||
    toStringValue(offer?.startLabel) ||
    FALLBACK_CAMPUS_OFFER.dateLabel
  );
}

function resolvePaymentLabel(rawPayment, index) {
  return toStringValue(rawPayment?.label) || `Opcao ${index + 1}`;
}

export function mapPhortePayment(rawPayment, index, options = {}) {
  const modality = options.modality === "ead" ? "ead" : "presencial";
  const modalityLabel =
    options.modalityLabel ??
    DEFAULT_MODALITY_LABELS[modality] ??
    FALLBACK_PAYMENT.modalityLabel;
  const startLabel = options.startLabel ?? FALLBACK_PAYMENT.startLabel;

  return {
    label: resolvePaymentLabel(rawPayment, index),
    installments: toIntegerValue(
      rawPayment?.quantidadeParcela ?? rawPayment?.installments,
      FALLBACK_PAYMENT.installments,
    ),
    amount: toNumberValue(rawPayment?.valorParcela ?? rawPayment?.amount, FALLBACK_PAYMENT.amount),
    enrollmentFee: toNumberValue(
      rawPayment?.valorInscricao ?? rawPayment?.enrollmentFee ?? rawPayment?.valorMatricula,
      FALLBACK_PAYMENT.enrollmentFee,
    ),
    modalityLabel,
    startLabel,
  };
}

export function mapPhorteOfferToCampusOffer(rawOffer, index = 0, options = {}) {
  const modality = options.modality === "ead" ? "ead" : "presencial";
  const dateLabel = resolveDateLabel(rawOffer);
  const paymentsSource = Array.isArray(rawOffer?.payments) && rawOffer.payments.length
    ? rawOffer.payments
    : [null];

  return {
    id: String(rawOffer?.id ?? rawOffer?.classId ?? rawOffer?.codeClass ?? `offer-${index + 1}`),
    locationLabel: resolveLocationLabel(rawOffer, modality),
    modalityLabel:
      options.modalityLabel ??
      DEFAULT_MODALITY_LABELS[modality] ??
      FALLBACK_CAMPUS_OFFER.modalityLabel,
    dateLabel,
    addressLabel: resolveAddressLabel(rawOffer, modality),
    confirmed: Boolean(rawOffer?.confirmed),
    remainingSeats: rawOffer?.remainingSeats ?? null,
    highlighted: false,
    payments: paymentsSource.map((payment, paymentIndex) =>
      mapPhortePayment(payment, paymentIndex, {
        modality,
        startLabel: dateLabel,
        modalityLabel:
          options.modalityLabel ??
          DEFAULT_MODALITY_LABELS[modality] ??
          FALLBACK_CAMPUS_OFFER.modalityLabel,
      }),
    ),
  };
}

export function mapPhorteOffersToCampusOffers(rawOffers = [], options = {}) {
  if (!Array.isArray(rawOffers) || rawOffers.length === 0) {
    return [FALLBACK_CAMPUS_OFFER];
  }

  return rawOffers.map((offer, index) =>
    mapPhorteOfferToCampusOffer(offer, index, options),
  );
}

export function mapPhorteOfferToEadOffer(rawOffer = {}, options = {}) {
  const dateLabel = resolveDateLabel(rawOffer);
  const description =
    options.description || FALLBACK_EAD_OFFER.description;
  const workloadLabel =
    toStringValue(rawOffer?.workloadLabel) ||
    toStringValue(rawOffer?.workload) ||
    FALLBACK_EAD_OFFER.infoItems[2].value;
  const compactStartLabel =
    options.compactStartLabel ||
    toStringValue(rawOffer?.compactStartLabel) ||
    toStringValue(rawOffer?.startLabel) ||
    FALLBACK_EAD_OFFER.compactCard.dateLabel;

  const compactCard = mapPhorteOfferToCampusOffer(rawOffer, 0, {
    modality: "ead",
    modalityLabel: DEFAULT_MODALITY_LABELS.ead,
  });

  return {
    id: String(rawOffer?.id ?? rawOffer?.classId ?? "ead-online"),
    headline: options.headline || FALLBACK_EAD_OFFER.headline,
    description,
    infoItems: [
      { label: "Modalidade", value: DEFAULT_MODALITY_LABELS.ead, icon: "monitor" },
      { label: "Proxima turma", value: `Inicio: ${dateLabel}`, icon: "calendar" },
      { label: "Carga horaria", value: workloadLabel, icon: "clock" },
    ],
    compactCard: {
      ...compactCard,
      locationLabel: "Polo online",
      dateLabel: compactStartLabel,
      payments: compactCard.payments.map((payment) => ({
        ...payment,
        modalityLabel: DEFAULT_MODALITY_LABELS.ead,
        startLabel: compactStartLabel,
      })),
    },
  };
}
