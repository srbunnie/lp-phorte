'use client';

import React from 'react';
import { ShirtSizeCode } from '@/types';
import { SHIRT_SIZES } from '@/data/shirtSizes';
import { ArrowRight, ArrowLeft, Check, Ruler, Info, Sparkles } from 'lucide-react';

interface Step2ShirtProps {
  selectedSize: ShirtSizeCode | null;
  onSelectSize: (size: ShirtSizeCode) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Shirt({
  selectedSize,
  onSelectSize,
  onNext,
  onBack,
}: Step2ShirtProps) {
  const currentSizeObj = SHIRT_SIZES.find((s) => s.code === selectedSize) || SHIRT_SIZES[2]; // Default M

  return (
    <section className="pk-step-screen">
      <div className="pk-container">
        {/* Intro */}
        <div className="pk-step-intro">
          <div className="pk-step-eyebrow">Etapa 2 de 5</div>
          <h2 className="pk-step-title">Escolha o Tamanho da sua Camiseta Oficial</h2>
          <p className="pk-step-desc">
            Camiseta confeccionada em tecido de alta durabilidade com corte atlético exclusivo da Pós Phorte Educação Física.
          </p>
        </div>

        {/* Layout Grid: Seletor + Visual da Camiseta com Medidas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'start',
            marginBottom: '36px',
          }}
        >
          {/* Lado Esquerdo: Cards de Tamanho */}
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#1a1a1a' }}>
              1. Selecione o tamanho desejado:
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {SHIRT_SIZES.map((size) => {
                const isSelected = selectedSize === size.code;

                return (
                  <button
                    key={size.code}
                    type="button"
                    onClick={() => onSelectSize(size.code)}
                    style={{
                      background: isSelected ? '#fff1f2' : '#ffffff',
                      border: isSelected ? '2px solid #e30613' : '1px solid #e5e5e5',
                      borderRadius: '12px',
                      padding: '16px 12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected
                        ? '0 8px 24px -4px rgba(227, 6, 19, 0.25)'
                        : '0 1px 3px rgba(0,0,0,0.04)',
                      position: 'relative',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: '#e30613',
                          color: '#ffffff',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-heading)',
                        color: isSelected ? '#e30613' : '#1a1a1a',
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}
                    >
                      {size.code}
                    </div>

                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isSelected ? '#991b1b' : '#595959',
                        marginBottom: '2px',
                      }}
                    >
                      {size.width} × {size.length} cm
                    </div>

                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: '#71717a',
                      }}
                    >
                      Largura × Altura
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detalhes do Tamanho Selecionado */}
            {selectedSize && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  color: '#ffffff',
                  border: '1px solid #27272a',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: '#e30613',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    TAMANHO {currentSizeObj.code}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {currentSizeObj.width} cm (Largura) × {currentSizeObj.length} cm (Comprimento)
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.45 }}>
                  {currentSizeObj.description}
                </p>
                {currentSizeObj.recommendedFor && (
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '0.8rem',
                      color: '#fca5a5',
                      fontWeight: 600,
                    }}
                  >
                    • Recomendado para: {currentSizeObj.recommendedFor}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Lado Direito: Visual Gráfico da Camiseta com Medidas Reais */}
          <div
            className="pk-card"
            style={{
              background: '#ffffff',
              border: '1px solid #e5e5e5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 20px',
            }}
          >
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ruler size={18} color="#e30613" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Visualização das Medidas</h3>
              </div>
              <span
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                {selectedSize ? `Tamanho ${selectedSize}` : 'Selecione um tamanho'}
              </span>
            </div>

            {/* Ilustração Visual da Camiseta Phorte com Cotas de Medição */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto 16px' }}>
              <svg
                viewBox="0 0 320 300"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <defs>
                  <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1c1c20" />
                    <stop offset="100%" stopColor="#0b0b0d" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#e30613" />
                  </marker>
                </defs>

                {/* Corpo da Camiseta */}
                <path
                  d="M 100 35 Q 160 60 220 35 L 290 85 L 255 125 L 230 110 L 230 270 L 90 270 L 90 110 L 65 125 L 30 85 Z"
                  fill="url(#shirtGrad)"
                  stroke="#3f3f46"
                  strokeWidth="2.5"
                />

                {/* Gola Vermelha Phorte */}
                <path
                  d="M 120 35 Q 160 65 200 35 Q 160 50 120 35 Z"
                  fill="#e30613"
                />

                {/* Logo Phorte no Peito */}
                <rect x="135" y="95" width="50" height="18" rx="4" fill="#e30613" opacity="0.9" />
                <text x="160" y="108" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                  PHORTE
                </text>

                {/* Linha de Cota - Largura (Horizontal) */}
                <line
                  x1="92"
                  y1="160"
                  x2="228"
                  y2="160"
                  stroke="#e30613"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)"
                />
                <rect x="125" y="148" width="70" height="22" rx="6" fill="#ffffff" stroke="#e30613" strokeWidth="1.5" />
                <text x="160" y="163" fill="#e30613" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                  {currentSizeObj.width} cm
                </text>

                {/* Linha de Cota - Comprimento (Vertical) */}
                <line
                  x1="260"
                  y1="40"
                  x2="260"
                  y2="270"
                  stroke="#e30613"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)"
                />
                <rect x="235" y="140" width="50" height="24" rx="6" fill="#ffffff" stroke="#e30613" strokeWidth="1.5" />
                <text x="260" y="156" fill="#e30613" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                  {currentSizeObj.length} cm
                </text>
              </svg>
            </div>

            {/* Legenda Explicativa */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                background: '#f4f4f5',
                borderRadius: '10px',
                fontSize: '0.8rem',
                color: '#52525b',
                lineHeight: 1.4,
              }}
            >
              <Info size={16} color="#e30613" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Dica:</strong> A largura é medida de axila a axila (tórax). O comprimento vai do ombro até a barra inferior.
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé de Navegação */}
        <div className="pk-step-footer">
          <button
            type="button"
            onClick={onBack}
            className="pk-btn pk-btn-secondary"
          >
            <ArrowLeft size={18} />
            <span>Voltar aos Livros</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!selectedSize}
            className="pk-btn pk-btn-primary"
          >
            <span>Continuar para Seus Dados</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
