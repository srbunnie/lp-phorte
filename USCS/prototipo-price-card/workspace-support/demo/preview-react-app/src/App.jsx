import { useMemo, useState } from "react";
import { PriceCardUscs } from "../../../../site-final/PriceCardUscs/PriceCardUscs.jsx";
import { buildPlaygroundScenario, defaultControls } from "./playground-data.js";
import { buildDynamicDataset } from "./dynamic-demo-data.js";

const variants = [
  { id: "default", label: "Default" },
  { id: "expanded", label: "Expanded" },
  { id: "ead", label: "EAD" },
];

const dataStates = [
  { id: "complete", label: "Dinamicos completos" },
  { id: "partial", label: "Dinamicos parciais" },
  { id: "loading", label: "Loading API" },
  { id: "error", label: "Erro API" },
];

const countOptions = [1, 2, 3, 4];

function ControlCard({ title, children }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#2F2F2F] p-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative h-7 w-14 rounded-full border transition-all",
          checked ? "border-[#FB8425] bg-[#FB8425]" : "border-white/20 bg-white/10",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-[22px] w-[22px] rounded-full bg-white transition-all",
            checked ? "left-[30px]" : "left-0.5",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-white/10 bg-[#3A3A3A] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/35"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function App() {
  const [variant, setVariant] = useState("default");
  const [dataState, setDataState] = useState("complete");
  const [controls, setControls] = useState(defaultControls);

  const baseDataset = useMemo(
    () => buildDynamicDataset(dataState === "partial" ? "partial" : "complete"),
    [dataState],
  );

  const scenario = useMemo(
    () =>
      buildPlaygroundScenario({
        campusOffers: baseDataset.offers,
        eadOffer: baseDataset.eadOffer,
        controls,
      }),
    [baseDataset, controls],
  );

  const updateControl = (key, value) => {
    setControls((current) => ({ ...current, [key]: value }));
  };

  return (
    <main className="min-h-screen bg-[#454545] px-6 py-10 text-white">
      <div className="mx-auto max-w-[1680px]">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              USCS Preview
            </p>
            <h1 className="mt-2 text-4xl font-bold">Price Card Playground</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75">
              Ambiente React para validar layout, tokens e combinacoes de estado do componente
              USCS no estilo dos controles do Storybook.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {variants.map((item) => {
              const selected = item.id === variant;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVariant(item.id)}
                  className={[
                    "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                    selected
                      ? "border-white bg-white text-[#101D41]"
                      : "border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="mb-6 flex flex-wrap gap-3">
          {dataStates.map((item) => {
            const selected = item.id === dataState;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDataState(item.id)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  selected
                    ? "border-[#FB8425] bg-[#FB8425] text-white"
                    : "border-white/20 bg-white/5 text-white hover:border-white/45 hover:bg-white/10",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <section className="min-w-0">
          <PriceCardUscs
            offers={scenario.offers}
            eadOffer={scenario.eadOffer}
            variant={variant}
            status={dataState === "loading" ? "loading" : dataState === "error" ? "error" : "ready"}
            errorTitle="Nao foi possivel exibir a oferta"
            errorMessage="A API nao retornou os campos dinamicos esperados. Exiba um fallback seguro e tente novamente."
          />
        </section>

        <aside className="mt-8 grid gap-5 xl:grid-cols-2">
          <ControlCard title="Turmas presenciais">
            <SelectField
              label="Quantidade de turmas"
              value={controls.campusCount}
              options={countOptions}
              onChange={(value) => updateControl("campusCount", value)}
            />
            <SelectField
              label="Parcelamentos por turma"
              value={controls.campusPaymentCount}
              options={[1, 2, 3]}
              onChange={(value) => updateControl("campusPaymentCount", value)}
            />
            <ToggleField
              label="Turma confirmada"
              checked={controls.campusConfirmed}
              onChange={(value) => updateControl("campusConfirmed", value)}
            />
            <ToggleField
              label="Outras turmas confirmadas"
              checked={controls.campusConfirmedOthers}
              onChange={(value) => updateControl("campusConfirmedOthers", value)}
            />
            <ToggleField
              label="Ultimas vagas"
              checked={controls.campusLastSeats}
              onChange={(value) => updateControl("campusLastSeats", value)}
            />
            <ToggleField
              label="Outras turmas com ultimas vagas"
              checked={controls.campusLastSeatsOthers}
              onChange={(value) => updateControl("campusLastSeatsOthers", value)}
            />
          </ControlCard>

          <ControlCard title="Card EAD">
            <SelectField
              label="Parcelamentos no EAD"
              value={controls.eadPaymentCount}
              options={[1, 2, 3]}
              onChange={(value) => updateControl("eadPaymentCount", value)}
            />
            <SelectField
              label="Itens de informacao"
              value={controls.eadInfoCount}
              options={[1, 2, 3]}
              onChange={(value) => updateControl("eadInfoCount", value)}
            />
            <ToggleField
              label="Turma confirmada"
              checked={controls.eadConfirmed}
              onChange={(value) => updateControl("eadConfirmed", value)}
            />
            <ToggleField
              label="Ultimas vagas"
              checked={controls.eadLastSeats}
              onChange={(value) => updateControl("eadLastSeats", value)}
            />
          </ControlCard>
        </aside>
      </div>
    </main>
  );
}
