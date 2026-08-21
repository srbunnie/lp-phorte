const FALLBACK_THEME_VARS = {
  "--uscs-color-brand-surface": "#EFF6FD",
  "--uscs-color-brand-panel": "#DDE4EB",
  "--uscs-color-brand-600": "#3773FF",
  "--uscs-color-brand-800": "#093AA8",
  "--uscs-color-brand-hero": "#101D41",
  "--uscs-color-cta-600": "#F1BB18",
  "--uscs-color-cta-800": "#FB8425",
  "--uscs-color-confirm-600": "#11B859",
  "--uscs-color-confirm-800": "#009966",
  "--uscs-color-neutral-100": "#FAFAFA",
  "--uscs-color-neutral-200": "#EEEEEE",
  "--uscs-color-neutral-400": "#D7D7D7",
  "--uscs-color-neutral-600": "#8E8E8E",
  "--uscs-color-neutral-900": "#161616",
  "--uscs-gradient-cta": "linear-gradient(90deg, #FB8425 0%, #F1BB18 100%)",
  "--uscs-gradient-confirm": "linear-gradient(90deg, #11B859 0%, #009966 100%)",
  "--uscs-gradient-info": "linear-gradient(90deg, #093AA8 0%, #3773FF 100%)",
  "--uscs-shadow-d1": "8px 8px 10px 0px rgba(22, 22, 22, 0.08)",
  "--uscs-shadow-d2": "0px 0px 8px 0px #d7d7d7",
  "--uscs-shadow-d3": "3px 3px 4px 0px rgba(22, 22, 22, 0.1)",
  "--uscs-space-2xs": "8px",
  "--uscs-space-xs": "16px",
  "--uscs-space-s": "24px",
  "--uscs-space-m": "32px",
  "--uscs-radius-tag": "4px",
  "--uscs-radius-pill": "16px",
  "--uscs-radius-card": "24px",
  "--uscs-radius-panel": "32px",
  "--uscs-radius-full": "999px",
  "--uscs-font-family": '"Poppins", sans-serif',
  "--uscs-text-heading-h2": "700 24px/1.2 var(--uscs-font-family)",
  "--uscs-text-price": "700 32px/1.2 var(--uscs-font-family)",
  "--uscs-text-title": "700 20px/1.2 var(--uscs-font-family)",
  "--uscs-text-body": "400 16px/1.2 var(--uscs-font-family)",
  "--uscs-text-label": "600 12px/1.2 var(--uscs-font-family)",
  "--uscs-text-micro": "700 8px/1.2 var(--uscs-font-family)",
};

function getHex(tokenNode) {
  return tokenNode?.$value?.hex ?? null;
}

function getNumber(tokenNode) {
  return tokenNode?.$value ?? null;
}

function getEffectValue(styles, token) {
  return styles?.effectStyles?.find((entry) => entry.token === token)?.value?.replace(/^box-shadow:\s*/, "") ?? null;
}

export function buildPriceCardThemeVars(tokens, figmaExport) {
  const vars = { ...FALLBACK_THEME_VARS };
  const uscs = tokens?.USCS;
  if (!uscs) return vars;

  vars["--uscs-color-brand-surface"] = getHex(uscs.Color?.Brand?.[200]) ?? vars["--uscs-color-brand-surface"];
  vars["--uscs-color-brand-panel"] = getHex(uscs.Color?.Brand?.[300]) ?? vars["--uscs-color-brand-panel"];
  vars["--uscs-color-brand-600"] = getHex(uscs.Color?.Brand?.[600]) ?? vars["--uscs-color-brand-600"];
  vars["--uscs-color-brand-800"] = getHex(uscs.Color?.Brand?.[800]) ?? vars["--uscs-color-brand-800"];
  vars["--uscs-color-brand-hero"] = getHex(uscs.Color?.Brand?.["Blue Uscs"]) ?? vars["--uscs-color-brand-hero"];
  vars["--uscs-color-cta-600"] = getHex(uscs.Color?.Matricula?.[600]) ?? vars["--uscs-color-cta-600"];
  vars["--uscs-color-cta-800"] = getHex(uscs.Color?.Matricula?.[800]) ?? vars["--uscs-color-cta-800"];
  vars["--uscs-color-confirm-600"] = getHex(uscs.Color?.Confirmar?.[600]) ?? vars["--uscs-color-confirm-600"];
  vars["--uscs-color-confirm-800"] = getHex(uscs.Color?.Confirmar?.[800]) ?? vars["--uscs-color-confirm-800"];
  vars["--uscs-color-neutral-100"] = getHex(uscs.Color?.Neutral?.[100]) ?? vars["--uscs-color-neutral-100"];
  vars["--uscs-color-neutral-200"] = getHex(uscs.Color?.Neutral?.[200]) ?? vars["--uscs-color-neutral-200"];
  vars["--uscs-color-neutral-400"] = getHex(uscs.Color?.Neutral?.[400]) ?? vars["--uscs-color-neutral-400"];
  vars["--uscs-color-neutral-600"] = getHex(uscs.Color?.Neutral?.[600]) ?? vars["--uscs-color-neutral-600"];
  vars["--uscs-color-neutral-900"] = getHex(uscs.Color?.Neutral?.[900]) ?? vars["--uscs-color-neutral-900"];

  vars["--uscs-space-2xs"] = `${getNumber(uscs.Spacing?.["2xs"]) ?? 8}px`;
  vars["--uscs-space-xs"] = `${getNumber(uscs.Spacing?.xs) ?? 16}px`;
  vars["--uscs-space-s"] = `${getNumber(uscs.Spacing?.s) ?? 24}px`;
  vars["--uscs-space-m"] = `${getNumber(uscs.Spacing?.m) ?? 32}px`;
  vars["--uscs-radius-tag"] = `${getNumber(uscs.Radius?.xxs) ?? 4}px`;
  vars["--uscs-radius-pill"] = `${getNumber(uscs.Radius?.xs) ?? 16}px`;
  vars["--uscs-radius-card"] = `${getNumber(uscs.Radius?.s) ?? 24}px`;
  vars["--uscs-radius-panel"] = `${getNumber(uscs.Radius?.m) ?? 32}px`;
  vars["--uscs-radius-full"] = `${getNumber(uscs.Radius?.full) ?? 999}px`;

  vars["--uscs-gradient-cta"] =
    `linear-gradient(90deg, ${vars["--uscs-color-cta-800"]} 0%, ${vars["--uscs-color-cta-600"]} 100%)`;
  vars["--uscs-gradient-confirm"] =
    `linear-gradient(90deg, ${vars["--uscs-color-confirm-600"]} 0%, ${vars["--uscs-color-confirm-800"]} 100%)`;
  vars["--uscs-gradient-info"] =
    `linear-gradient(90deg, ${vars["--uscs-color-brand-800"]} 0%, ${vars["--uscs-color-brand-600"]} 100%)`;

  vars["--uscs-shadow-d1"] = getEffectValue(figmaExport?.styles, "uscs-global-tokens-d1") ?? vars["--uscs-shadow-d1"];
  vars["--uscs-shadow-d2"] = getEffectValue(figmaExport?.styles, "uscs-global-tokens-d2") ?? vars["--uscs-shadow-d2"];
  vars["--uscs-shadow-d3"] = getEffectValue(figmaExport?.styles, "d3") ?? vars["--uscs-shadow-d3"];

  return vars;
}

export function formatCurrencyBR(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value ?? 0);
}

export function getVisibleOffers(offers, showAll, limit = 2) {
  if (showAll) return offers;
  return offers.slice(0, limit);
}


export function getOfferBadges(offer) {
  const badges = [];
  if (offer.confirmed) badges.push({ kind: "confirmed", label: "TURMA CONFIRMADA" });
  if (offer.remainingSeats && offer.remainingSeats <= 10) {
    badges.push({ kind: "lastSeats", label: "ÚLTIMAS VAGAS" });
  }
  return badges;
}

export function createInitialSelectionState(offers) {
  return {
    selectedOfferId: offers[0]?.id ?? null,
    selectedPaymentIndex: 0,
    showAllOffers: false,
  };
}

export function getSelectedOffer(offers, selectedOfferId) {
  return offers.find((offer) => offer.id === selectedOfferId) ?? offers[0] ?? null;
}

export function getSelectedPayment(offer, selectedPaymentIndex) {
  return offer?.payments?.[selectedPaymentIndex] ?? offer?.payments?.[0] ?? null;
}

export function isEadVariant(variant) {
  return variant === "ead";
}

export { FALLBACK_THEME_VARS };
