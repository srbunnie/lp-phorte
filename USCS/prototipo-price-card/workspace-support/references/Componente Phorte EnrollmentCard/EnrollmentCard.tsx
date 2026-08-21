import React, { useState, useMemo } from "react";
import { Copy, MessageCircle, Tag, Users } from "lucide-react";
import { Badge } from "./Badge";
import type { SisCourseDTO, CouponDTO } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (value?: number) =>
  value == null
    ? "Consulte"
    : value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const getCohortTotalPrice = (cohort: SisCourseDTO) => {
  const installments = cohort.parcelas || 0;
  const installmentValue = cohort.valorParcela || 0;
  if (!installments || !installmentValue) return 0;
  return Number((installments * installmentValue).toFixed(2));
};

const getStartLabel = (cohort: SisCourseDTO) =>
  cohort.dataInicioNoSite || cohort.dataInicioAulas || "A definir";

const getPoloLabel = (cohort: SisCourseDTO) => {
  const campus = cohort.localizacao?.campus?.trim();
  const city = cohort.localizacao?.cidade?.trim();
  const state = cohort.localizacao?.uf?.trim();
  if (campus) {
    if (/online|ead/i.test(campus)) return "Polo Online";
    return campus;
  }
  if (city && state) return `Polo ${city}/${state}`;
  if (city) return `Polo ${city}`;
  return "Polo a confirmar";
};

const getStudyFormatLabel = (cohort: SisCourseDTO) => {
  const modality = cohort.modality?.toLowerCase() || "";
  if (modality.includes("online") || modality.includes("ead") || modality.includes("dist"))
    return "Online ao vivo";
  if (modality.includes("semi")) return "Semipresencial";
  return "Presencial";
};

const getScheduleLabel = (cohort: SisCourseDTO) => {
  if (!cohort.cronograma?.horarioInicio && !cohort.cronograma?.diasSemana) {
    return cohort.informacoesAdicionaisData || "Cronograma detalhado divulgado com a turma.";
  }
  return [
    cohort.cronograma?.diasSemana,
    cohort.cronograma?.horarioInicio && cohort.cronograma?.horarioFim
      ? `${cohort.cronograma.horarioInicio} às ${cohort.cronograma.horarioFim}`
      : null,
  ]
    .filter(Boolean)
    .join(" - ");
};

const SANDBOX_OBSERVATION_ADDRESS = "R. Rui Barbosa, 422 - Bela Vista São Paulo - SP, 01326-010";

const getObservationLabel = (cohort: SisCourseDTO) =>
  `${getScheduleLabel(cohort)} | ${SANDBOX_OBSERVATION_ADDRESS}`;

const getRegistrationFeeValue = (cohort: SisCourseDTO) => {
  if (cohort.valorInscricao != null) return cohort.valorInscricao;
  return null;
};

const getRemainingSeatsCount = (cohort: SisCourseDTO) => {
  if (typeof cohort.remainingSeats === "number") return cohort.remainingSeats;
  if (typeof cohort.vagasRestantes === "number") return cohort.vagasRestantes;
  if (typeof cohort.maxInscritos === "number" && cohort.maxInscritos <= 10) return cohort.maxInscritos;
  return null;
};

const shouldShowLastSeatsWarning = (cohort: SisCourseDTO) => {
  const remainingSeats = getRemainingSeatsCount(cohort);
  return remainingSeats != null && remainingSeats > 0 && remainingSeats <= 10;
};

const getLastSeatsWarningLabel = (cohort: SisCourseDTO) => {
  const remainingSeats = getRemainingSeatsCount(cohort);
  if (remainingSeats == null) return "Últimas vagas";
  return `Últimas ${remainingSeats} vagas`;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface EnrollmentCardProps {
  cohorts: SisCourseDTO[];
  coupon?: CouponDTO | null;
}

export function EnrollmentCard({ cohorts, coupon = null }: EnrollmentCardProps) {
  const [selectedCohort, setSelectedCohort] = useState<SisCourseDTO>(cohorts[0]);
  const [showAllCohorts, setShowAllCohorts] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  const decisionCohorts = cohorts;
  const highlightedCohortId = useMemo(() => {
    const confirmed = decisionCohorts.find((c) => c.turmaConfirmada);
    if (confirmed) return String(confirmed.sigId);
    const featured = decisionCohorts.find((c) => c.turmaEmDestaqueNoSite);
    if (featured) return String(featured.sigId);
    return String(decisionCohorts[0]?.sigId ?? "");
  }, [decisionCohorts]);

  const totalPrice = getCohortTotalPrice(selectedCohort);
  const registrationFeeValue = getRegistrationFeeValue(selectedCohort);

  const handleCopyCoupon = async () => {
    if (!coupon || typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(coupon.code);
    setCouponCopied(true);
    window.setTimeout(() => setCouponCopied(false), 1800);
  };

  const onSelectCohort = (cohortId: SisCourseDTO["sigId"]) => {
    const found = decisionCohorts.find((c) => String(c.sigId) === String(cohortId));
    if (found) setSelectedCohort(found);
  };

  if (!cohorts || cohorts.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl text-slate-900">
      <div className="overflow-hidden rounded-[2rem] border border-[#ddd4c7] bg-white">
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          {/* ── Left panel: cohort selection ── */}
          <div className="border-b border-[#ece5da] p-6 lg:border-b-0 lg:border-r lg:p-8">
            <h4 className="text-2xl font-black tracking-tight text-slate-950">
              {decisionCohorts.length === 1
                ? "Garanta sua vaga na próxima turma"
                : "Escolha como você quer estudar"}
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              {decisionCohorts.length === 1
                ? "As turmas têm vagas limitadas para garantir a qualidade do ensino e networking."
                : "Defina o formato que melhor se encaixa na sua rotina."}
            </p>

            {decisionCohorts.length === 1 ? (
              <div className="mt-4 grid gap-3">
                {shouldShowLastSeatsWarning(selectedCohort) ? (
                  <div>
                    <Badge className="border-none bg-[#fff1ef] px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#d94b48]">
                      {getLastSeatsWarningLabel(selectedCohort)}
                    </Badge>
                  </div>
                ) : null}
                <article className="rounded-[1.35rem] border border-orange-200 bg-orange-50 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <Users size={12} strokeWidth={3} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-orange-600">
                      Alta procura
                    </p>
                  </div>
                  <p className="mt-2 text-[0.95rem] font-bold leading-relaxed text-orange-950">
                    Turma com{" "}
                    {shouldShowLastSeatsWarning(selectedCohort)
                      ? "últimas vagas disponíveis"
                      : "vagas limitadas"}
                    .
                  </p>
                </article>
                <article className="rounded-[1.35rem] border border-[#ece5da] bg-white px-4 py-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Formato das aulas
                  </p>
                  <p className="mt-2 text-base font-bold leading-relaxed text-slate-950">
                    {getStudyFormatLabel(selectedCohort)} &middot; {getPoloLabel(selectedCohort)}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Inicia em: {getStartLabel(selectedCohort)}
                  </p>
                </article>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center justify-center gap-2 rounded-[1rem] border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-sm font-black text-emerald-800 transition-colors hover:border-emerald-300 hover:bg-emerald-100"
                >
                  <MessageCircle size={16} />
                  Alguma dúvida? Fale com um Consultor
                </a>
              </div>
            ) : (
              <div className="mt-4 space-y-3" role="radiogroup" aria-label="Seleção de turma">
                {(showAllCohorts ? decisionCohorts : decisionCohorts.slice(0, 2)).map(
                  (cohort) => {
                    const isSelected = String(cohort.sigId) === String(selectedCohort.sigId);
                    const isHighlighted =
                      String(cohort.sigId) === highlightedCohortId && !cohort.turmaConfirmada;

                    return (
                      <button
                        key={`mini-${String(cohort.sigId)}`}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => onSelectCohort(cohort.sigId)}
                        className={`relative w-full rounded-[1.35rem] border px-4 py-4 transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-[0_4px_16px_-8px_rgba(225,29,72,0.4)]"
                            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_34px_-30px_rgba(15,23,42,0.4)]"
                        }`}
                      >
                        <div
                          className={`absolute right-4 top-4 h-5 w-5 rounded-full border-2 transition-colors ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-slate-300 bg-white"
                          }`}
                        />

                        {cohort.turmaConfirmada || isHighlighted || (isSelected && shouldShowLastSeatsWarning(cohort)) ? (
                          <div className="mb-2 flex min-h-5 flex-wrap items-center gap-2 pr-8">
                            {cohort.turmaConfirmada ? (
                              <Badge
                                variant="success"
                                className="border-none px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em]"
                              >
                                Turma Confirmada
                              </Badge>
                            ) : (
                              <Badge className="border-none bg-slate-200 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-700">
                                Mais indicada
                              </Badge>
                            )}
                            {isSelected && shouldShowLastSeatsWarning(cohort) ? (
                              <Badge className="border-none bg-[#fff1ef] px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#d94b48]">
                                {getLastSeatsWarningLabel(cohort)}
                              </Badge>
                            ) : null}
                          </div>
                        ) : null}

                        <div className="pr-8 text-left">
                          <p className="text-[1.02rem] font-black leading-tight text-slate-950">
                            {getPoloLabel(cohort)}
                          </p>
                          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                            {getStudyFormatLabel(cohort)}
                          </p>
                        </div>

                        <div className="mt-3 text-left text-[11px] leading-relaxed text-slate-500">
                          <p>Data de início das aulas: {getStartLabel(cohort)}</p>
                        </div>
                      </button>
                    );
                  },
                )}

                {decisionCohorts.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllCohorts((prev) => !prev)}
                    className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    {showAllCohorts
                      ? "VER MENOS TURMAS"
                      : `VER MAIS TURMAS (${decisionCohorts.length - 2})`}
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* ── Right panel: pricing summary ── */}
          <div className="p-6 lg:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Resumo da inscrição
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Valor do investimento</h3>
            <div className="mt-4 rounded-[1.1rem] border border-[#ece5da] bg-[#fcfbf7] px-5 py-5">
              <p className="text-sm font-semibold text-slate-500">
                até {selectedCohort.parcelas}x de
              </p>
              <p className="mt-1 text-4xl font-black leading-none text-slate-950 lg:text-[2.5rem]">
                {formatCurrency(selectedCohort.valorParcela)}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Valor total estimado: {formatCurrency(totalPrice)}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Taxa de inscrição:{" "}
                {registrationFeeValue && registrationFeeValue > 0
                  ? formatCurrency(registrationFeeValue)
                  : "Isenta"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Carga horária: {selectedCohort.workload}h
              </p>
              <p className="mt-1 text-sm text-slate-500">Curso registrado pelo E-MEC</p>
            </div>

            {coupon ? (
              <div className="relative mt-4 overflow-hidden rounded-[0.85rem] border border-[#f3d7d5] bg-[#fdf2f2] px-4 py-3.5">
                <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#f8dedd]/70" />
                <div className="relative flex items-start gap-3">
                  <Tag size={16} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[1.03rem] font-black leading-none text-primary">
                        Cupom: {coupon.code}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyCoupon}
                        className="inline-flex items-center text-slate-400 transition-colors hover:text-primary"
                        aria-label={couponCopied ? "Cupom copiado" : "Copiar cupom"}
                        title={couponCopied ? "Cupom copiado" : "Copiar cupom"}
                      >
                        <Copy size={15} />
                      </button>
                    </div>
                    <p className="mt-1.5 max-w-[30ch] text-[11px] font-semibold leading-relaxed text-slate-500">
                      Aplique no carrinho para 20% OFF na matrícula
                    </p>
                    {couponCopied ? (
                      <p className="mt-1 text-[11px] font-bold text-primary">Cupom copiado.</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Modalidade:{" "}
                {getStudyFormatLabel(selectedCohort)}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Início:{" "}
                {getStartLabel(selectedCohort)}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" /> Observações:{" "}
                {getObservationLabel(selectedCohort)}
              </li>
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={selectedCohort.checkoutUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-[1rem] bg-emerald-600 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-22px_rgba(5,150,105,0.55)]"
              >
                Matricule-se agora
              </a>
              <button
                type="button"
                className="flex-1 rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.28)]"
              >
                Ver simulação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
