'use client';

import React from 'react';
import Link from 'next/link';

export default function Step0Home() {
  return (
    <section id="pk-home">
      <div className="pk-home-container">
        {/* Header Escuro Institucional */}
        <header className="pk-home-header">
          <div className="pk-home-logo">
            <img
              src="/images/logo-phorte-branco.webp"
              alt="Faculdade Phorte"
            />
          </div>

          <div className="pk-home-student">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
            >
              <path d="M3 10l9-5 9 5-9 5z"></path>
              <path d="M7 12v5c3 2 7 2 10 0v-5"></path>
            </svg>
            <span>Exclusivo para alunos matriculados</span>
          </div>
        </header>

        {/* Hero Principal */}
        <div className="pk-home-hero">
          <div className="pk-home-copy">
            <div className="pk-home-eyebrow">
              PERSONALIZAÇÃO
            </div>

            <h1 className="pk-home-title">
              Personalize seu
              <span>Kit Phorte</span>
            </h1>

            <p className="pk-home-subtitle">
              Escolha seu livro da Editora Phorte, selecione o tamanho da sua camiseta,
              confirme seus dados e informe o endereço de entrega.
            </p>

            <div className="pk-home-time">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 7v5l3 2"></path>
              </svg>
              <span>Leva menos de 3 minutos</span>
            </div>

            <Link href="/personalizar" className="pk-home-button">
              <span>Começar agora</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14"></path>
                <path d="M13 6l6 6-6 6"></path>
              </svg>
            </Link>
          </div>

          {/* Lado Direito com Arte do Kit */}
          <div className="pk-kit-side">
            <div className="pk-kit-dots"></div>
            <div className="pk-home-word">PHORTE</div>

            <img
              className="pk-kit-image"
              src="/images/kit-boas-vindas-phorte.webp"
              alt="Kit de boas-vindas Faculdade Phorte"
            />

            <div className="pk-kit-message">
              <strong>Sua jornada começa</strong> com escolhas que têm a sua cara.
            </div>
          </div>
        </div>

        {/* Barra de Progresso Inferior */}
        <div className="pk-home-progress-wrap">
          <div className="pk-home-progress">
            <div className="pk-home-progress-item">
              <div className="pk-home-progress-circle">1</div>
              <div className="pk-home-progress-label">Livro</div>
            </div>

            <div className="pk-home-progress-item">
              <div className="pk-home-progress-circle">2</div>
              <div className="pk-home-progress-label">Camiseta</div>
            </div>

            <div className="pk-home-progress-item">
              <div className="pk-home-progress-circle">3</div>
              <div className="pk-home-progress-label">Seus dados</div>
            </div>

            <div className="pk-home-progress-item">
              <div className="pk-home-progress-circle">4</div>
              <div className="pk-home-progress-label">Endereço</div>
            </div>

            <div className="pk-home-progress-item">
              <div className="pk-home-progress-circle">5</div>
              <div className="pk-home-progress-label">Confirmação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
