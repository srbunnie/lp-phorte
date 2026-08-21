"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useSubscribeClick } from "@/app/posphorte/analytics/useAnalytics";
import { SIGClient } from "@/lib/api/sig";
import turmasUscs from "@/data/posuscs/turmasUscs.json";

import { formatDateBR } from "@/lib/utils";

const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor);

function aplicarDesconto(valor, categoria, convenio) {
  if (!convenio || !convenio.descontos) return valor;
  const descontos = Object.values(convenio.descontos);
  const desconto = descontos.find(
    (d) => parseInt(d.ID_CategoriaContaReceber) === categoria
  );
  if (!desconto) return valor;
  const tipo = parseInt(desconto.ID_ConvenioTipoPagamento);
  const valorDesconto = parseFloat(desconto.Valor_ConvenioDescontoAluno);
  if (tipo === 1) return Math.max(0, valor - valorDesconto);
  if (tipo === 2) return valor * ((100 - valorDesconto) / 100);
  return valor;
}

function getLocalLabel(offer, modality) {
  if (modality === "ead") return "Polo Online";
  const city = offer.city?.trim();
  const state = offer.state?.trim();
  if (city && state) return `${city} / ${state}`;
  if (city) return city;
  return "A confirmar";
}

export default function Ofertas({ offers = [] }) {
  const params = useParams();
  const slugCurso = params.slug;
  const area_id = params.area_id;
  const modality = params.modality;

  const trackSubscribeClick = useSubscribeClick();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [cupom, setCupom] = useState(null);
  const [convenio, setConvenio] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const valor = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cupom="))
      ?.split("=")[1];
    setCupom(valor || null);

    if (valor) {
      SIGClient("V2")
        .get("/conveniosDescontos", { codigo_promocional: valor })
        .then((res) => {
          setConvenio(res);
          localStorage.setItem("convenio_dados", JSON.stringify(res));
        })
        .catch((err) => {
          console.error("Erro buscando convênio:", err instanceof Error ? err.message : String(err));
        });
    }
  }, []);

  // Reset payment option when offer changes
  useEffect(() => {
    setSelectedPaymentIndex(0);
  }, [selectedIndex]);

  if (!offers.length) return null;

  const selectedOffer = offers[selectedIndex] ?? offers[0];
  const selectedPayment = selectedOffer?.payments?.[selectedPaymentIndex] ?? selectedOffer?.payments?.[0];

  const matchFormLink = turmasUscs.find(
    (item) => String(item.codigo_turma) === String(selectedOffer.codeClass)
  );
  const isExternal = !!matchFormLink;
  const enrollUrl = matchFormLink
    ? matchFormLink.link
    : cupom
      ? `https://inscricao.posphorte.com.br/inscricao/pre-cadastro/${slugCurso}/${selectedOffer.classId}/${area_id}/convenio/${cupom}`
      : `https://inscricao.posphorte.com.br/inscricao/pre-cadastro/${slugCurso}/${selectedOffer.classId}/${area_id}`;

  const parcelas = parseInt(selectedPayment?.quantidadeParcela ?? 0);
  const valorParcela = parseFloat(selectedPayment?.valorParcela ?? 0);
  const valorMatricula = parseFloat(selectedPayment?.valorMatricula ?? 0);
  const valorInscricao = parseFloat(selectedPayment?.valorInscricao ?? 0);

  const valorParcelaFinal = convenio ? aplicarDesconto(valorParcela, 1, convenio) : valorParcela;
  const valorMatriculaFinal = convenio ? aplicarDesconto(valorMatricula, 2, convenio) : valorMatricula;
  const valorInscricaoFinal = convenio ? aplicarDesconto(valorInscricao, 3, convenio) : valorInscricao;
  const totalEstimado = parcelas * valorParcelaFinal;

  const visibleOffers = showAll ? offers : offers.slice(0, 2);
  const isEad = modality === "ead";

  return (
    <section id="modality-selector" className="scroll-mt-28 py-6 lg:py-8">
      <div className="container mx-auto px-6 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[#ddd4c7] bg-white">
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">

            {/* ── Coluna esquerda: seleção de turma ── */}
            <div className="border-b border-[#ece5da] p-6 lg:border-b-0 lg:border-r lg:p-8">
              <h4 className="text-2xl font-black tracking-tight text-slate-950">
                Escolha como quer estudar
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Selecione a turma que melhor se encaixa na sua rotina.
              </p>

              {/* Lista de turmas */}
              <div className="mt-4 space-y-3" role="radiogroup" aria-label="Seleção de turma">
                {visibleOffers.map((offer, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${isSelected
                        ? "border-primary bg-primary/5 shadow-[0_4px_16px_-8px_rgba(225,29,72,0.4)]"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_34px_-30px_rgba(15,23,42,0.4)]"
                        }`}
                    >
                      <div
                        className={`absolute right-4 top-4 h-5 w-5 rounded-full border-2 transition-colors ${isSelected ? "border-primary bg-primary" : "border-slate-300 bg-white"
                          }`}
                      />
                      <div className="pr-8">
                        <p className="text-[1.02rem] font-black leading-tight text-slate-950">
                          {getLocalLabel(offer, modality)}
                        </p>
                        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                          {isEad ? "Online ao Vivo" : "Presencial"}
                        </p>
                      </div>
                      <div className="mt-3 text-left text-[11px] leading-relaxed text-slate-500">
                        <p>Início previsto: {formatDateBR(offer.date, false) || "A definir"}</p>
                        {offer.horario && <p className="mt-0.5">Horário: {offer.horario}</p>}
                      </div>
                    </button>
                  );
                })}

                {offers.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {showAll ? "VER MENOS TURMAS" : `VER MAIS TURMAS (${offers.length - 2})`}
                  </button>
                )}
              </div>

              {/* Opções de pagamento (quando há mais de uma) */}
              {selectedOffer.payments?.length > 1 && (
                <div className="mt-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Opção de pagamento
                  </p>
                  <div className="space-y-2" role="radiogroup" aria-label="Opção de pagamento">
                    {selectedOffer.payments.map((payment, pIdx) => {
                      const isPSelected = pIdx === selectedPaymentIndex;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          role="radio"
                          aria-checked={isPSelected}
                          onClick={() => setSelectedPaymentIndex(pIdx)}
                          className={`relative w-full rounded-[1.1rem] border px-4 py-3 text-left transition-colors ${isPSelected
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                          <div
                            className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 transition-colors ${isPSelected ? "border-primary bg-primary" : "border-slate-300"
                              }`}
                          />
                          <p className="pr-6 text-sm font-black text-slate-950">
                            Opção {pIdx + 1} — {payment.quantidadeParcela}x{" "}
                            {formatarMoeda(parseFloat(payment.valorParcela))}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Coluna direita: resumo do investimento ── */}
            <div className="p-6 lg:p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Resumo da inscrição
              </p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">Valor do investimento</h3>

              <div className="mt-4 rounded-[1.1rem] border border-[#ece5da] bg-[#fcfbf7] px-5 py-5">
                {selectedOffer.gratuito == 1 ? (
                  <p className="text-4xl font-black leading-none text-slate-950">GRÁTIS</p>
                ) : valorParcela === 0 ? (
                  <p className="text-4xl font-black leading-none text-slate-950">ISENTO</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-slate-500">até {parcelas}x de</p>
                    {convenio ? (
                      <>
                        <s className="text-base font-bold text-[#ff4d4f]">
                          {formatarMoeda(valorParcela)}
                        </s>
                        <p className="mt-1 text-4xl font-black leading-none text-slate-950 lg:text-[2.5rem]">
                          {formatarMoeda(valorParcelaFinal)}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-4xl font-black leading-none text-slate-950 lg:text-[2.5rem]">
                        {formatarMoeda(valorParcela)}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-slate-500">
                      Valor total estimado: {formatarMoeda(totalEstimado)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Matrícula:{" "}
                      {valorMatricula === 0 ? (
                        "Isenta"
                      ) : convenio ? (
                        <>
                          <s>{formatarMoeda(valorMatricula)}</s>{" "}
                          <strong className="text-slate-700">{formatarMoeda(valorMatriculaFinal)}</strong>
                        </>
                      ) : (
                        formatarMoeda(valorMatricula)
                      )}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Inscrição:{" "}
                      {valorInscricao === 0 ? (
                        "Isenta"
                      ) : convenio && valorInscricao !== valorInscricaoFinal ? (
                        <>
                          <s>{formatarMoeda(valorInscricao)}</s>{" "}
                          <strong className="text-slate-700">{formatarMoeda(valorInscricaoFinal)}</strong>
                        </>
                      ) : (
                        formatarMoeda(valorInscricao)
                      )}
                    </p>
                  </>
                )}
              </div>

              {/* Detalhes da turma */}
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  Modalidade: {isEad ? "Online ao Vivo" : "Presencial"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  Início: {formatDateBR(selectedOffer.date, false) || "A definir"}
                </li>
                {(selectedOffer.horario || selectedOffer.schedule || selectedOffer.time) && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    Horário: {selectedOffer.horario || selectedOffer.schedule || selectedOffer.time}
                  </li>
                )}
                {!isEad && (selectedOffer.city || selectedOffer.state) && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    Local: {getLocalLabel(selectedOffer, modality)}
                  </li>
                )}
              </ul>

              {/* CTA */}
              <div className="mt-5">
                <a
                  href={enrollUrl}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "nofollow noopener noreferrer" : undefined}
                  onClick={() => trackSubscribeClick({ label: "Matricule-se agora" })}
                  className="block w-1/2 rounded-[1rem] bg-emerald-600 px-4 py-3.5 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-22px_rgba(5,150,105,0.55)]"
                >
                  Matricule-se agora
                </a>
              </div>

              <div className="mt-5 border-t border-[#ece5da] pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ShieldCheck size={16} className="text-primary" />
                  Pagamento seguro
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
