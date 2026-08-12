import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Monitor,
} from "lucide-react";
import { uscsPriceCardThemeVars } from "./price-card-uscs.tokens.js";
import {
  FALLBACK_CAMPUS_OFFER,
  FALLBACK_EAD_OFFER,
} from "./price-card-uscs.mapper.js";
import {
  createInitialSelectionState,
  formatCurrencyBR,
  getOfferBadges,
  getSelectedOffer,
  getSelectedPayment,
  getVisibleOffers,
  isEadVariant,
} from "./price-card-uscs.model.js";

const cn = (...values) => values.filter(Boolean).join(" ");

function SkeletonBlock({ className = "", style = {} }) {
  return (
    <div
      className={cn("rounded-2xl", className)}
      style={{
        background:
          "linear-gradient(90deg, rgba(214, 223, 235, 0.95) 0%, rgba(244, 247, 251, 1) 50%, rgba(214, 223, 235, 0.95) 100%)",
        backgroundSize: "220px 100%",
        animation: "uscs-skeleton-shimmer 1.45s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function PriceCardSkeleton({ variant, themeVars }) {
  const eadMode = isEadVariant(variant);

  return (
    <section
      className="font-[var(--uscs-font-family)] text-[var(--uscs-color-neutral-900)]"
      style={themeVars}
    >
      <style>
        {`
          @keyframes uscs-skeleton-shimmer {
            0% { background-position: -220px 0; }
            100% { background-position: calc(220px + 100%) 0; }
          }
        `}
      </style>
      <div className="rounded-[var(--uscs-radius-panel)] bg-white px-4 pb-4 pt-7 shadow-[var(--uscs-shadow-d1)] sm:p-6 lg:p-8">
        {eadMode ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            {/* Top Section for Tablet (Col 1 & 2) */}
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:gap-4" style={{ flex: 0.5 }}>
              <div className="min-w-0 space-y-4" style={{ flex: 1.2 }}>
                <SkeletonBlock className="h-8 w-52" />
                <SkeletonBlock className="h-5 w-full max-w-[360px]" />
                <SkeletonBlock className="h-5 w-full max-w-[320px]" />
              </div>
              <div className="hidden h-[120px] w-px shrink-0 self-center bg-[rgba(214,223,235,0.9)] md:block" />
              <div className="min-w-0 space-y-6" style={{ flex: 1 }}>
                {[0, 1, 2].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <SkeletonBlock className="h-11 w-11 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <SkeletonBlock className="h-2.5 w-16 rounded-full" />
                      <SkeletonBlock className="h-5 w-full max-w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section for Tablet / Right for Desktop (Col 3) */}
            <div className="min-w-0" style={{ flex: 0.5 }}>
              <div className="rounded-[var(--uscs-radius-card)] border-2 border-[var(--uscs-color-neutral-200)] bg-[var(--uscs-color-brand-surface)] px-4 pb-5 pt-10 sm:px-6">
                <SkeletonBlock className="h-9 w-44 rounded-full" />
                <div className="mt-6 space-y-4">
                  <SkeletonBlock className="h-10 w-64" />
                  <SkeletonBlock className="h-5 w-40" />
                </div>
              </div>
              <SkeletonBlock
                className="mt-4 h-14 w-full rounded-[var(--uscs-radius-pill)]"
                style={{ background: "var(--uscs-gradient-cta)" }}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.98fr] xl:gap-8">
            <div>
              <SkeletonBlock className="h-8 w-64" />
              <div className="mt-6 space-y-4">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="rounded-[var(--uscs-radius-card)] border border-[rgba(214,223,235,0.95)] bg-white px-4 py-4 sm:px-5 sm:py-5"
                  >
                    <div className="flex gap-2">
                      <SkeletonBlock className="h-[28px] w-36 rounded-[10px]" />
                      <SkeletonBlock className="h-[28px] w-28 rounded-[10px]" />
                    </div>
                    <SkeletonBlock className="mt-4 h-7 w-full max-w-[320px]" />
                    <SkeletonBlock className="mt-3 h-5 w-full max-w-[250px]" />
                  </div>
                ))}
              </div>
              <SkeletonBlock className="mt-4 h-11 w-48 rounded-full" />
            </div>
            <div className="rounded-[var(--uscs-radius-panel)] bg-[var(--uscs-color-brand-surface)] p-4 sm:p-6 lg:p-8">
              <div className="flex min-h-full flex-col justify-center">
                <SkeletonBlock className="h-8 w-56" />
                <div className="mt-6 rounded-[var(--uscs-radius-card)] border border-[rgba(214,223,235,0.95)] bg-white px-4 py-5 sm:px-6 sm:py-6">
                  <SkeletonBlock className="h-8 w-[180px] rounded-full" />
                  <SkeletonBlock className="mt-5 h-10 w-48" />
                  <div className="mt-4 space-y-3">
                    <SkeletonBlock className="h-5 w-44" />
                    <SkeletonBlock className="h-5 w-full max-w-[260px]" />
                    <SkeletonBlock className="h-5 w-52" />
                  </div>
                </div>
                <SkeletonBlock
                  className="mt-4 h-14 w-full rounded-[var(--uscs-radius-pill)]"
                  style={{ background: "var(--uscs-gradient-cta)" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PriceCardErrorBanner({
  title = "Nao foi possivel carregar as informacoes",
  message = "Tente novamente em instantes ou revise os campos dinamicos enviados para o componente.",
  onRetry,
}) {
  return (
    <div className="mb-5 rounded-[var(--uscs-radius-card)] border border-[var(--uscs-color-neutral-200)] bg-[var(--uscs-color-brand-surface)] px-5 py-5 sm:px-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--uscs-color-cta-800)] shadow-[var(--uscs-shadow-d2)]">
          <AlertTriangle size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] font-bold text-[var(--uscs-color-brand-hero)] sm:text-[20px]">
            {title}
          </h3>
          <p className="mt-2 max-w-[560px] text-[14px] leading-6 text-[var(--uscs-color-neutral-600)] sm:text-[15px]">
            {message}
          </p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 rounded-full border border-[var(--uscs-color-neutral-400)] bg-white px-5 py-2 text-[14px] font-semibold text-[var(--uscs-color-brand-hero)] transition-colors hover:bg-[var(--uscs-color-neutral-100)]"
            >
              Tentar novamente
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ kind, label, className = "", isCorner = false }) {
  const palette = {
    confirmed: { background: "var(--uscs-gradient-confirm)", color: "#fff" },
    lastSeats: { background: "var(--uscs-gradient-info)", color: "#fff" },
    highlighted: { background: "var(--uscs-color-brand-600)", color: "#fff" },
  };
  const style = palette[kind] ?? palette.highlighted;

  return (
    <div 
      style={style}
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all",
        isCorner ? "rounded-tl-[22px] rounded-tr-none rounded-br-[12px] rounded-bl-none" : "rounded-[4px]",
        "min-h-[28px] max-w-full",
        className
      )}
    >
      <span className="whitespace-normal text-center leading-tight">
        {label}
      </span>
    </div>
  );
}



function PaymentSwitcher({ payments, selectedIndex, onChange, compact = false, variant = "default" }) {
  const currentLabel = payments?.[selectedIndex]?.label ?? "Opção 1";
  const isAtStart = selectedIndex <= 0;
  const isAtEnd = selectedIndex >= payments.length - 1;
  const isEad = variant === "ead";

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-full px-1",
        compact ? "scale-95 origin-left" : "",
      )}
      style={{
        width: isEad ? "220px" : "180px",
        height: isEad ? "36px" : "32px",
        background: "#EEEEEE",
        boxShadow: "inset 0 0 16px 0 #D7D7D7",
      }}
    >
      <button
        type="button"
        aria-label="Opção anterior"
        onClick={() => onChange(selectedIndex - 1)}
        disabled={isAtStart}
        className="flex h-7 w-7 items-center justify-center rounded-full disabled:cursor-default"
        style={{
          background: isAtStart ? "#D7D7D7" : "#FAFAFA",
          boxShadow: isAtStart ? "none" : "3px 3px 4px 0px rgba(22, 22, 22, 0.1)",
        }}
      >
        <ChevronLeft
          size={isEad ? 18 : 16}
          strokeWidth={2}
          color="#606060"
          style={{ opacity: isAtStart ? 0.3 : 1 }}
        />
      </button>
      <span className={cn("text-center font-bold text-[#313841]", isEad ? "min-w-[110px] text-[14px]" : "min-w-[88px] text-[12px]")}>
        {currentLabel}
      </span>
      <button
        type="button"
        aria-label="Próxima opção"
        onClick={() => onChange(selectedIndex + 1)}
        disabled={isAtEnd}
        className="flex h-7 w-7 items-center justify-center rounded-full disabled:cursor-default"
        style={{
          background: isAtEnd ? "#D7D7D7" : "#FAFAFA",
          boxShadow: isAtEnd ? "none" : "3px 3px 4px 0px rgba(22, 22, 22, 0.1)",
        }}
      >
        <ChevronRight
          size={isEad ? 18 : 16}
          strokeWidth={2}
          color="#606060"
          style={{ opacity: isAtEnd ? 0.3 : 1 }}
        />
      </button>
    </div>
  );
}

function CampusOptionCard({ offer, selected, onSelect }) {
  const badges = getOfferBadges(offer);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full rounded-[var(--uscs-radius-card)] bg-white px-4 py-3 text-left transition-all",
        selected
          ? "border-2 border-[var(--uscs-color-cta-800)] shadow-[var(--uscs-shadow-d2)]"
          : "border border-[#8A8A8A] hover:border-[#606060]",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <StatusBadge key={`${offer.id}-${badge.kind}`} kind={badge.kind} label={badge.label} />
        ))}
      </div>
      <p className="mt-2 text-[17px] font-bold leading-tight text-[var(--uscs-color-neutral-900)] sm:text-[20px]">
        {offer.locationLabel}
      </p>
      <p className="mt-1 text-[14px] text-[var(--uscs-color-neutral-600)] sm:text-[16px]">
        Data prevista:{" "}
        <strong className="font-semibold text-[var(--uscs-color-neutral-800)]">
          {offer.dateLabel}
        </strong>
      </p>
    </button>
  );
}

function InvestmentPanel({ payment, addressLabel, compact = false, header = null, variant = "default", badges = [] }) {
  const isEad = variant === "ead";
  
  return (
    <div
      className={cn(
        "relative rounded-[var(--uscs-radius-card)] border bg-white",
        isEad ? "border-[2px] border-[#FF9F2E] bg-[#F4F8FC]" : "border-[var(--uscs-color-neutral-200)]",
        compact ? (isEad ? "px-4 pb-3 pt-16 sm:px-6" : "px-4 pb-3 pt-5 sm:px-6") : "px-4 py-3 sm:px-6 sm:py-3",
      )}
    >
      {badges.length > 0 && (
        <div className={cn(
          "z-10 flex items-start gap-1",
          isEad ? "absolute left-6 top-4 flex-row flex-wrap" : "absolute -top-4 left-0 right-0 flex-row px-4"
        )}>
          {badges.map((badge, idx) => (
            <StatusBadge 
              key={idx} 
              kind={badge.kind} 
              label={badge.label} 
              isCorner={false}
              className={cn(
                isEad ? "min-h-[28px] px-3" : "",
                !isEad ? "ml-1" : "",
              )}
            />
          ))}
        </div>
      )}
      
      {header ? <div className={cn("mb-3", isEad ? "flex justify-start" : "")}>{header}</div> : null}
      
      <p className={cn(
        "font-extrabold leading-tight text-[var(--uscs-color-brand-hero)]",
        isEad ? "text-[36px] sm:text-[44px]" : "text-[24px] sm:text-[32px]"
      )}>
        {payment.installments}x {formatCurrencyBR(payment.amount)}
      </p>
      
      <div className={cn(
        "mt-2 space-y-1 text-[var(--uscs-color-neutral-900)]",
        isEad ? "text-[16px] sm:text-[18px]" : "text-[14px] sm:text-[16px]"
      )}>
        <p><strong className="font-bold">Taxa de inscrição:</strong> {formatCurrencyBR(payment.enrollmentFee)}</p>
        {addressLabel ? <p>{addressLabel}</p> : null}
        {!isEad && (
          addressLabel ? (
            <p>
              <strong className="font-semibold">Data prevista:</strong> {payment.startLabel}
            </p>
          ) : (
            <p className="text-[var(--uscs-color-neutral-600)]">{payment.startLabel}</p>
          )
        )}
      </div>
    </div>
  );
}

function CtaButton({ compact = false, variant = "default" }) {
  const isEad = variant === "ead";
  
  return (
    <button
      type="button"
      style={{ 
        background: isEad ? "var(--uscs-color-cta-800)" : "var(--uscs-gradient-cta)",
        boxShadow: isEad ? "0 4px 14px 0 rgba(251, 132, 37, 0.39)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
      }}
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-[var(--uscs-radius-pill)] font-extrabold uppercase text-white transition-all hover:brightness-110 active:scale-[0.98]",
        compact 
          ? "w-full px-5 py-2 text-[16px] sm:text-[18px]" 
          : "w-full px-5 py-2 text-[16px] sm:px-6 sm:py-2 sm:text-[24px]",
      )}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          minWidth: "22px",
          minHeight: "22px",
          maxWidth: "22px",
          maxHeight: "22px",
          flex: "0 0 22px",
          alignSelf: "center",
          border: "2px solid #fff",
          borderRadius: "4px",
          background: "transparent",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Check size={18} strokeWidth={4} />
      </span>
      <span style={{ flex: "0 1 auto" }}>MATRICULE-SE AGORA</span>
    </button>
  );
}

function EadInfoItem({ icon, label, value, noCircle = false }) {
  const Icon = icon === "monitor" ? Monitor : icon === "clock" ? Clock3 : CalendarDays;
  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        "flex shrink-0 items-center justify-center text-[var(--uscs-color-brand-800)]",
        noCircle ? "h-6 w-6" : "h-9 w-9 rounded-full bg-[#EFF6FD]"
      )}>
        <Icon size={noCircle ? 24 : 22} strokeWidth={noCircle ? 2 : 1.5} />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[var(--uscs-color-neutral-600)]">
          {label}
        </p>
        <p className="text-[16px] font-bold leading-tight text-[var(--uscs-color-brand-hero)] sm:text-[18px]">
          {value}
        </p>
      </div>
    </div>
  );
}

export function PriceCardUscs({
  offers = [],
  eadOffer = null,
  variant = "default",
  isModified = false,
  title = "Escolha onde você quer estudar:",
  themeVars = uscsPriceCardThemeVars,
  status = "ready",
  errorTitle,
  errorMessage,
  onRetry,
}) {
  const hasError = status === "error";
  const resolvedOffers = hasError ? [FALLBACK_CAMPUS_OFFER] : offers.length ? offers : [FALLBACK_CAMPUS_OFFER];
  const resolvedEadOffer = hasError ? FALLBACK_EAD_OFFER : eadOffer ?? FALLBACK_EAD_OFFER;
  const [selection, setSelection] = useState(() => createInitialSelectionState(resolvedOffers));
  const selectedOffer = useMemo(
    () => getSelectedOffer(resolvedOffers, selection.selectedOfferId),
    [resolvedOffers, selection.selectedOfferId],
  );
  const selectedPayment = useMemo(
    () => getSelectedPayment(selectedOffer, selection.selectedPaymentIndex),
    [selectedOffer, selection.selectedPaymentIndex],
  );
  const isExpanded = variant === "expanded";
  const showAllMode = isExpanded || selection.showAllOffers;
  const visibleOffers = getVisibleOffers(resolvedOffers, showAllMode, 2);
  const eadMode = isEadVariant(variant);

  const panelPayment = eadMode
    ? getSelectedPayment(resolvedEadOffer.compactCard, selection.selectedPaymentIndex)
    : selectedPayment;
  const eadBadges = eadMode ? getOfferBadges(resolvedEadOffer.compactCard) : [];

  if (status === "loading") {
    return <PriceCardSkeleton variant={variant} themeVars={themeVars} />;
  }

  const updatePaymentIndex = (nextIndex) => {
    const paymentCount = eadMode
      ? resolvedEadOffer.compactCard.payments.length
      : selectedOffer.payments.length;
    if (nextIndex < 0 || nextIndex >= paymentCount) return;
    setSelection((current) => ({ ...current, selectedPaymentIndex: nextIndex }));
  };

  return (
    <section
      className="font-[var(--uscs-font-family)] text-[var(--uscs-color-neutral-900)]"
      style={themeVars}
    >
      <div className="rounded-[24px] bg-white px-6 pb-3 pt-4 shadow-[var(--uscs-shadow-d1)] sm:p-4 lg:p-4">
        {hasError ? (
          <PriceCardErrorBanner
            title={errorTitle}
            message={errorMessage}
            onRetry={onRetry}
          />
        ) : null}
        {eadMode ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            {/* Left Section (Col 1 & 2) */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:gap-4" style={{ flex: 0.6 }}>
              {/* Column 1: Title and Description */}
              <div className="min-w-0" style={{ flex: 1.2 }}>
              <h3 className="text-[26px] font-extrabold leading-tight text-[var(--uscs-color-brand-hero)] sm:text-[30px]">
                {resolvedEadOffer.headline}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--uscs-color-neutral-600)] sm:text-[16px]">
                {resolvedEadOffer.description}
              </p>
              </div>

              {/* Separator Line */}
              <div className="hidden h-[70px] w-px shrink-0 self-center bg-[var(--uscs-color-neutral-200)] md:block" />

              {/* Column 2: Info Items */}
              <div className="min-w-0 space-y-2" style={{ flex: 1 }}>
                {resolvedEadOffer.infoItems.map((item) => (
                  <EadInfoItem 
                    key={item.label} 
                    icon={item.icon} 
                    label={item.label} 
                    value={item.value} 
                    noCircle={isModified}
                  />
                ))}
              </div>
            </div>

            {/* Right Section (Col 3) */}
            <div className="min-w-0" style={{ flex: 0.4 }}>
              <InvestmentPanel 
                variant="ead"
                compact
                payment={panelPayment} 
                badges={eadBadges}
                header={
                  <PaymentSwitcher
                    variant="ead"
                    compact
                    payments={resolvedEadOffer.compactCard.payments}
                    selectedIndex={selection.selectedPaymentIndex}
                    onChange={updatePaymentIndex}
                  />
                }
              />
              <div className="mt-3">
                <CtaButton variant="ead" compact />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.98fr] xl:gap-4">
            <div>
              <h3 className="text-[18px] font-bold leading-tight text-[var(--uscs-color-neutral-900)] sm:text-[24px]">
                {title}
              </h3>
              <div className="mt-3 space-y-2">
                {visibleOffers.map((offer) => (
                  <CampusOptionCard
                    key={offer.id}
                    offer={offer}
                    selected={offer.id === selectedOffer.id}
                    onSelect={() =>
                      setSelection((current) => ({
                        ...current,
                        selectedOfferId: offer.id,
                        selectedPaymentIndex: 0,
                      }))
                    }
                  />
                ))}
              </div>
              {resolvedOffers.length > 2 ? (
                <button
                  type="button"
                  onClick={() =>
                    setSelection((current) => ({ ...current, showAllOffers: !showAllMode }))
                  }
                  className="mt-2 inline-flex rounded-full border px-5 py-1 text-[16px] font-bold uppercase text-[var(--uscs-color-neutral-900)] transition-colors duration-200 hover:text-[var(--uscs-color-neutral-900)]"
                  style={{
                    background: "#EBEBEB",
                    borderColor: "#D9D9D9",
                    borderWidth: "2px",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#EFF6FD";
                    event.currentTarget.style.borderColor = "#DDE4EB";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "#EBEBEB";
                    event.currentTarget.style.borderColor = "#D9D9D9";
                  }}
                >
                  {showAllMode ? "VER MENOS POLOS" : `VER MAIS POLOS (${resolvedOffers.length - 2})`}
                </button>
              ) : null}
            </div>

            <div className="rounded-[var(--uscs-radius-panel)] bg-[var(--uscs-color-brand-surface)] p-3 sm:p-4 lg:p-4">
              <div className="flex min-h-full flex-col justify-center">
                <h3 className="text-[18px] font-bold leading-tight text-[var(--uscs-color-brand-hero)] sm:text-[24px]">
                  Valor do Investimento
                </h3>
                <div className="mt-3">
                  <InvestmentPanel
                    payment={selectedPayment}
                    addressLabel={selectedOffer.addressLabel}
                    header={
                      <PaymentSwitcher
                        payments={selectedOffer.payments}
                        selectedIndex={selection.selectedPaymentIndex}
                        onChange={updatePaymentIndex}
                      />
                    }
                  />
                </div>
                <div className="mt-2">
                  <CtaButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PriceCardUscs;
