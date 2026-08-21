import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Headphones,
  MapPin,
  Menu,
  MessageCircle,
  Star,
  UsersRound,
} from "lucide-react";
import { PriceCardUscs } from "../../site-final/PriceCardUscs/PriceCardUscs.jsx";
import { mapPhorteOffersToCampusOffers } from "../../site-final/PriceCardUscs/price-card-uscs.mapper.js";
import { buildPlaygroundScenario, defaultControls } from "./playground-data.js";
import { buildDynamicDataset } from "./dynamic-demo-data.js";

const asset = (name) =>
  `/preview%20live%20page/P%C3%B3s%20em%20Psicologia%20Junguiana%20na%20Pr%C3%A1tica%20Cl%C3%ADnica%20-%20P%C3%B3s-gradua%C3%A7%C3%A3o%20USCS_files/${encodeURIComponent(name)}`;

const previewModes = [
  { id: "original", label: "Réplica original" },
  { id: "modified", label: "Versão modificada" },
  { id: "exact-new-card", label: "Versão 3" },
  { id: "playground", label: "Playground" },
];

function getInitialPreviewMode() {
  const searchMode = new URLSearchParams(window.location.search).get("mode");
  const hashMode = window.location.hash.replace("#", "");
  const requestedMode = searchMode || hashMode;
  return previewModes.some((item) => item.id === requestedMode) ? requestedMode : "original";
}

function getCleanPreviewMode() {
  return new URLSearchParams(window.location.search).get("clean") === "1";
}

const variants = [
  { id: "default", label: "Default" },
  { id: "expanded", label: "Expanded" },
  { id: "ead", label: "EAD" },
];

const dataStates = [
  { id: "complete", label: "Dinâmicos completos" },
  { id: "partial", label: "Dinâmicos parciais" },
  { id: "loading", label: "Loading API" },
  { id: "error", label: "Erro API" },
];

const countOptions = [1, 2, 3, 4];

const campusOffers = mapPhorteOffersToCampusOffers(
  [
    {
      classId: 6601,
      city: "São Paulo",
      state: "SP",
      address: "CAMPUS SÃO PAULO: Rua Treze de Maio, 681 - Bela Vista - São Paulo/SP",
      date: "15 de Agosto de 2026",
      confirmed: true,
      remainingSeats: 6,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
        { label: "Opção 2", quantidadeParcela: "18", valorParcela: "845", valorInscricao: "165" },
        { label: "Opção 3", quantidadeParcela: "12", valorParcela: "1234", valorInscricao: "165" },
      ],
    },
    {
      classId: 6602,
      city: "São Caetano do Sul",
      state: "SP",
      address: "CAMPUS CENTRO: Rua Santo Antônio, 50 - Centro - São Caetano do Sul/SP",
      date: "26 de Setembro de 2026",
      confirmed: false,
      remainingSeats: null,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
      ],
    },
    {
      classId: 6603,
      city: "Santo André",
      state: "SP",
      address: "UNIDADE SANTO ANDRÉ: Av. Industrial, 1455 - Jardim - Santo André/SP",
      date: "10 de Outubro de 2026",
      confirmed: true,
      remainingSeats: 4,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
      ],
    },
    {
      classId: 6604,
      city: "Mauá",
      state: "SP",
      address: "UNIDADE MAUÁ: Rua General Osório, 75 - Vila Bocaina - Mauá/SP",
      date: "05 de Novembro de 2026",
      confirmed: false,
      remainingSeats: null,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
      ],
    },
    {
      classId: 6605,
      city: "Diadema",
      state: "SP",
      address: "UNIDADE DIADEMA: Av. Alda, 209 - Centro - Diadema/SP",
      date: "12 de Dezembro de 2026",
      confirmed: true,
      remainingSeats: 2,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
      ],
    },
    {
      classId: 6606,
      city: "Ribeirão Pires",
      state: "SP",
      address: "UNIDADE RIBEIRÃO PIRES: Av. Santo André, 121 - Centro - Ribeirão Pires/SP",
      date: "20 de Janeiro de 2027",
      confirmed: false,
      remainingSeats: null,
      payments: [
        { label: "Opção 1", quantidadeParcela: "24", valorParcela: "650", valorInscricao: "165" },
      ],
    },
  ],
  { modality: "presencial" },
);

const eadJunguianaOffer = {
  id: "ead-junguiana",
  headline: "Quanto investir",
  description: "Curso online ao vivo com a mesma base clínica e simbólica da formação presencial.",
  infoItems: [
    { label: "Modalidade", value: "EAD - 100% online", icon: "monitor" },
    { label: "Próxima turma", value: "Início: 15 de Agosto de 2026", icon: "calendar" },
    { label: "Carga horária", value: "460h", icon: "clock" },
  ],
  compactCard: {
    id: "ead-junguiana-card",
    locationLabel: "Polo online",
    modalityLabel: "EAD - 100% online",
    dateLabel: "15 de Agosto de 2026",
    addressLabel: null,
    confirmed: true,
    remainingSeats: 6,
    highlighted: false,
    payments: [
      {
        label: "Opção 1",
        installments: 24,
        amount: 650,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "15 de Agosto de 2026",
      },
      {
        label: "Opção 2",
        installments: 18,
        amount: 845,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "15 de Agosto de 2026",
      },
      {
        label: "Opção 3",
        installments: 12,
        amount: 1234,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "15 de Agosto de 2026",
      },
    ],
  },
};

const stats = [
  { icon: Clock3, value: "460", label: "Horas" },
  { icon: CalendarDays, value: "22 meses", label: "Duração" },
  { icon: UsersRound, value: "80 horas", label: "Supervisão clínica" },
];

const objectives = [
  "Explorar símbolos, mitos e imagens arquetípicas",
  "Integrar teoria junguiana à condução clínica",
  "Aplicar amplificação, mandalas e projetivas",
  "Desenvolver escuta simbólica e presença clínica",
];

const differentials = [
  "Formação com foco na prática clínica",
  "Integração entre teoria e contexto contemporâneo",
  "Referências clássicas e aplicabilidade prática",
  "Capacitação para atuação ética",
];

const audience = [
  "Aprofundar a compreensão teórica e prática da Psicologia Junguiana aplicada à clínica",
  "Desenvolver habilidades para intervenções terapêuticas baseadas na abordagem analítica",
  "Atuar com profundidade e sensibilidade na promoção do autoconhecimento e no tratamento dos pacientes",
];

function PreviewSwitcher({ mode, onChange }) {
  return (
    <div className="preview-switcher">
      <div className="preview-switcher-inner">
        <strong>Preview Price Card USCS</strong>
        <div className="preview-tabs">
          {previewModes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={mode === item.id ? "active" : ""}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ original = false }) {
  if (original) {
    return (
      <header className="site-header original-header">
        <div className="topbar original-topbar">
          <div className="container topbar-inner original-topbar-inner">
            <div className="original-social-links" aria-label="Redes sociais">
              <a aria-label="TikTok">♪</a>
              <a aria-label="Facebook">f</a>
              <a aria-label="LinkedIn">in</a>
              <a aria-label="Instagram">◎</a>
              <a aria-label="YouTube">▶</a>
            </div>
            <div className="original-service-links">
              <a className="whatsapp-link" href="https://wa.me/551127145699">
                <MessageCircle size={17} />
                Fale Conosco via Whatsapp
              </a>
              <a href="https://www.posuscs.com.br/ouvidoria">
                <Headphones size={17} />
                Ouvidoria
              </a>
            </div>
          </div>
        </div>
        <div className="container nav original-nav">
          <img src={asset("logo-posuscs.png")} alt="Pós USCS" className="brand-logo" />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a>Institucional</a>
            <a>
              Pós-graduação <ChevronDown size={14} />
            </a>
            <a>
              Capacitação <ChevronDown size={14} />
            </a>
            <a>Cursos Gratuitos</a>
            <a>Blog</a>
            <a>
              Minha USCS <ChevronDown size={14} />
            </a>
            <a>Contato</a>
          </nav>
          <button className="menu-button" type="button" aria-label="Abrir menu">
            <Menu size={24} />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <a href="mailto:faleconosco@posuscs.com.br">faleconosco@posuscs.com.br</a>
          <span>(11) 2714-5699</span>
          <a className="whatsapp-link" href="https://wa.me/551127145699">
            <MessageCircle size={16} />
            Fale Conosco via Whatsapp
          </a>
        </div>
      </div>
      <div className="container nav">
        <img src={asset("logo-posuscs-preta.png")} alt="Pós USCS" className="brand-logo" />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a>Institucional</a>
          <a>Pós-graduação</a>
          <a>Capacitação</a>
          <a>Cursos Gratuitos</a>
          <a>Blog</a>
          <a>Minha USCS</a>
          <a>Contato</a>
        </nav>
        <button className="menu-button" type="button" aria-label="Abrir menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

function PriceSection({ original = false, variant = "default", isModified = false }) {
  return (
    <section className={original ? "original-price-section" : "investment-section"} id="investimento">
      <div className="container">
        {original ? <div className="original-price-heading">
          <div>
            <p className="section-kicker">Quanto Investir</p>
          </div>
          <p>
            Aula presencial: sábado e domingo, das 8h às 18h, uma vez por mês.
            Aula ao vivo: sábado e domingo, das 8h30 às 16h30.
          </p>
        </div> : null}
        <PriceCardUscs
          offers={campusOffers}
          eadOffer={eadJunguianaOffer}
          variant={variant}
          isModified={isModified}
          title="Escolha onde você quer estudar:"
        />
      </div>
    </section>
  );
}

function OriginalReplicaPage({
  priceVariant = "default",
  priceCardModified = false,
  className = "",
}) {
  const objectiveCards = [
    {
      title: "Explorar símbolos, mitos e imagens arquetípicas",
      image: "img-134cf73c-e1ed-4756-856c-e4ef87ad5bc1.jpg",
    },
    {
      title: "Integrar teoria junguiana à condução clínica",
      image: "img-2a68780c-4df3-4938-b942-229323d50d73.jpg",
    },
    {
      title: "Aplicar amplificação, mandalas e projetivas",
      image: "img-818da323-1f4f-4a0f-8b4e-ec91461e2e00.jpg",
    },
    {
      title: "Desenvolver escuta simbólica e presença clínica",
      image: "img-1c8e29bf-5c64-4d4d-b8f6-a16d427d0e58.jpg",
    },
  ];

  const audienceCards = [
    {
      title: "Aprofundar a compreensão teórica e prática da Psicologia Junguiana aplicada à clínica",
      image: "img-012abea0-19f5-4978-a9e8-dd5d333aff8a.jpg",
    },
    {
      title: "Desenvolver habilidades para intervenções terapêuticas baseadas na abordagem analítica",
      image: "img-5cc136ec-9965-4543-a3de-fe4ef4bedca8.jpg",
    },
    {
      title: "Atuar com profundidade e sensibilidade na promoção do autoconhecimento",
      image: "img-a6b4f2e0-d16f-4320-ba06-6407277403a0.jpg",
    },
  ];

  return (
    <div className={`original-page ${className}`}>
      <Header original />
      <main>
        <section className="original-hero">
          <div className="original-hero-bg" aria-hidden="true">
            <img src={asset("proxy-banner (1).webp")} alt="" />
          </div>
          <div className="container original-hero-content">
            <div>
              <p className="original-category">
                Pós-graduação <span>Presencial</span>
              </p>
              <h1>Psicologia Junguiana na Prática Clínica</h1>
              <p>
                Integre os princípios Junguianos na prática clínica e eleve seu trabalho terapêutico
              </p>
              <div className="stats-row" style={{ marginTop: '28px' }}>
                {stats.map(({ icon: Icon, value, label }) => (
                  <div className="stat-card" key={label}>
                    <Icon size={22} />
                    <div>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        <PriceSection original variant={priceVariant} isModified={priceCardModified} />

        <section className="original-intro-section">
          <div className="container original-intro-card">
            <div>
              <h2>Especialize-se em Psicologia Junguiana</h2>
              <p>e transforme sua escuta clínica com base simbólica e sensível</p>
            </div>
            <p>
              O curso de Psicologia Junguiana na Prática Clínica da USCS oferece formação sólida
              nos fundamentos da psicologia analítica, aliando teoria e supervisão clínica.
            </p>
          </div>
          <div className="original-video">
            <img src={asset("img-e3b3966f-e996-4a08-bfa3-d6afda96d421.webp")} alt="Vídeo Pós-graduação USCS" />
            <span>▶</span>
          </div>
        </section>

        <section className="original-tab-band">
          <h3>Escolha a aba que quer conferir:</h3>
          <div className="container original-tabs">
            {["Objetivo do curso", "Diferenciais", "Para quem é o curso", "Corpo Docente", "Matriz Curricular"].map(
              (item) => (
                <a href={item === "Corpo Docente" ? "#corpo-docente" : undefined} key={item}>
                  {item}
                </a>
              ),
            )}
          </div>
        </section>

        <section className="original-objectives-section">
          <div className="container">
            <div className="original-section-title">
              <h2>Objetivos do curso</h2>
            </div>
            <div className="original-objective-grid">
              {objectiveCards.map((item) => (
                <article className="original-image-card" key={item.title}>
                  <img src={asset(item.image)} alt="" />
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="original-differentials-section">
          <div className="container original-differentials-grid">
            <div>
              <h2>Quais os diferenciais do curso?</h2>
              <ul>
                {differentials.map((item) => (
                  <li key={item}><CheckCircle2 size={18} /> {item}</li>
                ))}
              </ul>
            </div>
            <img src={asset("proxy-banner.webp")} alt="" />
          </div>
        </section>

        <section className="original-audience-section">
          <div className="container">
            <div className="original-centered-title">
              <span />
              <h2>O curso de Psicologia Junguiana foi desenvolvido para</h2>
            </div>
            <div className="original-audience-grid">
              <p>Graduados em Psicologia e Medicina que desejam:</p>
              {audienceCards.map((item) => (
                <article key={item.title}>
                  <img src={asset(item.image)} alt="" />
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="original-coordinator-section" id="corpo-docente">
          <div className="container original-coordinator-grid">
            <article>
              <h2>Conheça a coordenadora do curso</h2>
              <h3>Ma. Eugenia Cordeiro Curvêlo</h3>
              <p>
                À frente da coordenação do curso, está a experiente Mestra Eugenia Curvêlo,
                referência nacional em Psicologia Analítica com vasta atuação clínica, docente e
                supervisora.
              </p>
              <p>
                Bacharel e licenciada em Psicologia, é mestre pela Universidade Metodista de São
                Paulo, especialista e analista junguiana didata, e membro da IAAP.
              </p>
            </article>
            <img src={asset("img-1374abe5-dad6-49ef-a787-2773612dbe1b.jpg")} alt="Ma. Eugenia Cordeiro Curvêlo" />
          </div>
        </section>

        <section className="original-details-section">
          <div className="container">
            <nav>
              <a>Apresentação</a>
              <a>Matriz Curricular</a>
              <a>Como se matricular na Pós?</a>
            </nav>
            <p><strong>Duração:</strong> 22 meses</p>
            <p><strong>Carga Horária:</strong> 460h</p>
            <p><strong>Dia e Horário:</strong> Sábado e domingo</p>
            <p>
              O curso objetiva proporcionar aos participantes uma compreensão aprofundada dos
              princípios e práticas da psicologia analítica desenvolvida por Carl Jung.
            </p>
          </div>
        </section>

        <img className="original-campus-image" src={asset("campus-uscs-001.webp")} alt="Campus USCS" />

        <section className="original-why-section">
          <div className="container">
            <h2>Por que escolher a USCS?</h2>
            <p>
              Na USCS, você encontra um ambiente acadêmico preparado para transformar conhecimento
              em prática. Nossa proposta é oferecer uma formação de qualidade, com professores
              experientes, infraestrutura moderna e metodologias que acompanham as demandas do
              mercado.
            </p>
          </div>
        </section>

        <section className="original-testimonial-section">
          <div className="container">
            <div className="original-centered-title">
              <span />
              <h2>Quem faz transição de carreira com a USCS recomenda!</h2>
            </div>
            <div className="original-testimonial-grid">
              <div>
                <p>"Aluno da Pós EAD"</p>
                <img src={asset("dacc0-zanetti-1-.jpg")} alt="Arthur Zanetti" />
              </div>
              <article>
                <p>
                  Eu me formei em educação física, fiz licenciatura e bacharel na USCS, e comecei
                  uma Pós-graduação em fisiologia do exercício. Para mim, foi muito bom pelo fato de
                  me ajudar nos treinos e a obter mais conhecimento técnico.
                </p>
                <h3>Arthur Zanetti | Fisiologia do Exercício</h3>
              </article>
            </div>
            <div className="original-dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="original-news-section">
          <div className="container">
            <div className="original-news-heading">
              <h2>Notícias</h2>
              <p>Confira aqui as notícias mais atuais para ficar dentro das novidades</p>
            </div>
            <div className="original-news-grid">
              {[
                {
                  image: "a6b77-transcendente_jung_simbolos_posuscs-1-.jpg",
                  title: "Função transcendente em Jung: integração psíquica",
                  text: "Na psicologia analítica, conflitos internos não são apenas obstáculos...",
                },
                {
                  image: "0787f-arteterapia_desenvolvimento-emocional_posuscs.jpg",
                  title: "Arteterapia e desenvolvimento emocional",
                  text: "A arteterapia utiliza o fazer artístico e o processo criativo dentro de uma relação...",
                },
                {
                  image: "388dd-jung_inconsciente_posuscs.jpg",
                  title: "Participação mística em Jung: o que significa",
                  text: "Alguns estados psíquicos não se organizam a partir de uma separação n...",
                },
              ].map((item) => (
                <article key={item.title}>
                  <img src={asset(item.image)} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <button type="button" className="original-news-button">Confira todas as notícias</button>
          </div>
        </section>

        <section className="original-enroll-section">
          <div className="container original-enroll-grid">
            <div>
              <h2>Como se matricular?</h2>
              <ol>
                <li><strong>1</strong> Escolha o curso que deseja.</li>
                <li><strong>2</strong> Preencha seus dados no formulário.</li>
                <li><strong>3</strong> Confirme a matrícula e pronto!</li>
              </ol>
            </div>
            <div>
              <p>
                Se preferir, entre em contato diretamente com nosso time de vendas pelo número
                <strong> (11) 2714-5699</strong> ou clicando no ícone de WhatsApp a seguir:
              </p>
              <a href="https://wa.me/551127145699"><MessageCircle size={18} /> CONTATO NO WHATSAPP</a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}

function ModifiedHero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={asset("proxy-banner.webp")} alt="" />
      </div>
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="course-type">PÓS-GRADUAÇÃO - PRESENCIAL</p>
          <h1>Psicologia Junguiana na Prática Clínica</h1>
          <p className="hero-subtitle">
            Integre os princípios Junguianos na prática clínica e eleve seu trabalho terapêutico
          </p>
          <div className="stats-row">
            {stats.map(({ icon: Icon, value, label }) => (
              <div className="stat-card" key={label}>
                <Icon size={22} />
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro-section">
      <div className="container intro-grid">
        <div>
          <p className="section-kicker">Especialize-se em Psicologia Junguiana</p>
          <h2>Transforme sua escuta clínica com base simbólica e sensível</h2>
        </div>
        <p>
          O curso oferece formação sólida nos fundamentos da psicologia analítica, aliando teoria
          e supervisão clínica para capacitar psicólogos e médicos a atuarem com escuta simbólica,
          ética e sensível nas demandas contemporâneas da saúde mental.
        </p>
      </div>
      <div className="container tab-row" aria-label="Seções do curso">
        {["Objetivo do curso", "Diferenciais", "Para quem é o curso", "Corpo Docente", "Matriz Curricular"].map(
          (item, index) => (
            <button className={index === 0 ? "active" : ""} type="button" key={item}>
              {item}
              {index === 0 ? <ChevronDown size={16} /> : null}
            </button>
          ),
        )}
      </div>
    </section>
  );
}

function ObjectivesSection() {
  return (
    <section className="objectives-section">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Objetivos do curso</p>
          <h2>Aprenda a conduzir a clínica com profundidade simbólica</h2>
        </div>
        <div className="objectives-grid">
          {objectives.map((objective, index) => (
            <article className="objective-card" key={objective}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <BookOpen size={26} />
              <h3>{objective}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentialsSection() {
  return (
    <section className="differentials-section">
      <div className="container differentials-grid">
        <div>
          <p className="section-kicker">Diferenciais</p>
          <h2>Quais os diferenciais do curso?</h2>
          <ul className="check-list">
            {differentials.map((item) => (
              <li key={item}>
                <CheckCircle2 size={22} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={asset("388dd-jung_inconsciente_posuscs.jpg")}
          alt="Imagem sobre Jung e inconsciente"
          className="feature-image"
        />
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience-section">
      <div className="container">
        <div className="section-heading centered">
          <p className="section-kicker">Para quem é o curso</p>
          <h2>Graduados em Psicologia e Medicina que desejam</h2>
        </div>
        <div className="audience-grid">
          {audience.map((item) => (
            <article className="audience-card" key={item}>
              <GraduationCap size={26} />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoordinatorSection() {
  return (
    <section className="coordinator-section">
      <div className="container coordinator-grid">
        <img
          src={asset("img-107dc14b-e536-4531-a4ad-e7dd11dad37b.webp")}
          alt="Ma. Eugenia Cordeiro Curvêlo"
          className="coordinator-photo"
        />
        <div>
          <p className="section-kicker">Conheça a coordenadora do curso</p>
          <h2>Ma. Eugenia Cordeiro Curvêlo</h2>
          <p>
            À frente da coordenação do curso, está a Mestra Eugenia Curvêlo, referência nacional
            em Psicologia Analítica com vasta atuação clínica, docente e supervisora.
          </p>
          <p>
            Bacharel e licenciada em Psicologia, mestre pela Universidade Metodista de São Paulo,
            especialista e analista junguiana didata, é membro da IAAP.
          </p>
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const blocks = [
    "Supervisão Clínica e discussão de casos clínicos",
    "Conceitos fundamentais da Psicologia Analítica",
    "Técnicas Junguianas: sonhos, imaginação ativa e Sandplay",
    "Psicopatologia, tipos psicológicos e processo de individuação",
    "Aspectos legais, ética e manejo na clínica Junguiana",
  ];

  return (
    <section className="curriculum-section">
      <div className="container curriculum-grid">
        <div>
          <p className="section-kicker">Matriz Curricular</p>
          <h2>Uma formação pensada para a prática clínica</h2>
          <p>
            O curso objetiva proporcionar compreensão aprofundada dos princípios e práticas da
            psicologia analítica desenvolvida por Carl Jung, com foco específico em sua aplicação
            na clínica.
          </p>
        </div>
        <div className="curriculum-list">
          {blocks.map((item) => (
            <div className="curriculum-item" key={item}>
              <Star size={18} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModifiedPage({ priceVariant = "default" }) {
  return (
    <div className="course-page">
      <Header />
      <main>
        <ModifiedHero />
        <PriceSection variant={priceVariant} isModified={true} />
        <IntroSection />
        <ObjectivesSection />
        <DifferentialsSection />
        <AudienceSection />
        <CoordinatorSection />
        <CurriculumSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function ControlCard({ title, children }) {
  return (
    <section className="playground-control-card">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="playground-toggle">
      <span>{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}>
        <i className={checked ? "checked" : ""} />
      </button>
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="playground-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PlaygroundPage({ variant, setVariant }) {
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
    <main className="playground-page">
      <div className="playground-container">
        <header className="playground-header">
          <div>
            <p>USCS Preview</p>
            <h1>Price Card Playground</h1>
            <span>
              Ambiente React para validar layout, tokens e combinações de estado do componente
              USCS no estilo dos controles do Storybook.
            </span>
          </div>

          <div className="playground-button-row">
            {variants.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVariant(item.id)}
                className={item.id === variant ? "active" : ""}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <div className="playground-button-row playground-state-row">
          {dataStates.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDataState(item.id)}
              className={item.id === dataState ? "active orange" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section className="playground-card-stage">
          <PriceCardUscs
            offers={scenario.offers}
            eadOffer={scenario.eadOffer}
            variant={variant}
            isModified={controls.isModified}
            status={dataState === "loading" ? "loading" : dataState === "error" ? "error" : "ready"}
            errorTitle="Não foi possível exibir a oferta"
            errorMessage="A API não retornou os campos dinâmicos esperados. Exiba um fallback seguro e tente novamente."
          />
        </section>

        <aside className="playground-controls">
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
              label="Últimas vagas"
              checked={controls.campusLastSeats}
              onChange={(value) => updateControl("campusLastSeats", value)}
            />
            <ToggleField
              label="Outras turmas com últimas vagas"
              checked={controls.campusLastSeatsOthers}
              onChange={(value) => updateControl("campusLastSeatsOthers", value)}
            />
            <ToggleField
              label="Versão Modificada"
              checked={controls.isModified}
              onChange={(value) => updateControl("isModified", value)}
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
              label="Itens de informação"
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
              label="Últimas vagas"
              checked={controls.eadLastSeats}
              onChange={(value) => updateControl("eadLastSeats", value)}
            />
          </ControlCard>
        </aside>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src={asset("logo-posuscs.png")} alt="Pós USCS" className="footer-logo" />
          <p>© 2026 Pós USCS. Todos os direitos reservados.</p>
        </div>
        <div>
          <h3>Cidades</h3>
          <p>Fortaleza - CE</p>
          <p>Santos - SP</p>
          <p>São Caetano do Sul - SP</p>
          <p>São Paulo - SP</p>
        </div>
        <div>
          <h3>Contato</h3>
          <p>faleconosco@posuscs.com.br</p>
          <p>(11) 2714-5699</p>
          <p className="footer-address">
            <MapPin size={16} />
            Rua Santo Antônio, 50 - Centro
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href="https://wa.me/551127145699" aria-label="WhatsApp">
      <MessageCircle size={28} />
    </a>
  );
}

export default function App() {
  const [mode, setMode] = useState(getInitialPreviewMode);
  const [priceVariant, setPriceVariant] = useState("default");
  const cleanPreview = getCleanPreviewMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mode]);

  useEffect(() => {
    document.body.classList.toggle("clean-preview", cleanPreview);
    return () => document.body.classList.remove("clean-preview");
  }, [cleanPreview]);

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", nextMode);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {cleanPreview ? null : <PreviewSwitcher mode={mode} onChange={handleModeChange} />}
      {mode === "original" ? <OriginalReplicaPage priceVariant={priceVariant} /> : null}
      {mode === "modified" ? <ModifiedPage priceVariant={priceVariant} /> : null}
      {mode === "exact-new-card" ? (
        <OriginalReplicaPage
          priceVariant={priceVariant}
          priceCardModified
          className="exact-clone-page"
        />
      ) : null}
      {mode === "playground" ? (
        <PlaygroundPage variant={priceVariant} setVariant={setPriceVariant} />
      ) : null}
    </>
  );
}
