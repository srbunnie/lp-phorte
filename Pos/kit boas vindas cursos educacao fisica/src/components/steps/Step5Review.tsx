'use client';

import React, { useState } from 'react';
import { Book, ShirtSizeCode, StudentData, AddressData } from '@/types';
import { SHIRT_SIZES } from '@/data/shirtSizes';
import { CATEGORY_LABELS } from '@/data/books';
import { ArrowLeft, Check, Edit3, Loader2, Send, ShieldCheck, BookOpen, Shirt, User, MapPin, CheckCircle2 } from 'lucide-react';

interface Step5ReviewProps {
  book: Book;
  shirtSize: ShirtSizeCode;
  student: StudentData;
  address: AddressData;
  onSubmit: () => Promise<void>;
  onGoToStep: (step: number) => void;
  onBack: () => void;
}

export default function Step5Review({
  book,
  shirtSize,
  student,
  address,
  onSubmit,
  onGoToStep,
  onBack,
}: Step5ReviewProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shirtObj = SHIRT_SIZES.find((s) => s.code === shirtSize);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit();
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao enviar sua solicitação. Tente novamente.'
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="pk-step-screen">
      <div className="pk-container">
        {/* Intro */}
        <div className="pk-step-intro">
          <div className="pk-step-eyebrow">Etapa 5 de 5</div>
          <h2 className="pk-step-title">Revisão Final do seu Kit Phorte</h2>
          <p className="pk-step-desc">
            Confira todos os dados abaixo. Se precisar ajustar qualquer item, clique em <strong>Alterar</strong> na etapa correspondente.
          </p>
        </div>

        {/* Lista Vertical de Etapas (Uma embaixo da outra) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            marginBottom: '32px',
          }}
        >
          {/* Item 1: Livro Selecionado */}
          <div
            className="pk-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '20px',
              alignItems: 'center',
              padding: '20px 24px',
            }}
          >
            {/* Capa do Livro */}
            <div
              style={{
                width: '70px',
                height: '96px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Conteúdo do Livro */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    background: 'rgba(227, 6, 19, 0.1)',
                    color: '#e30613',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  01. Livro Escolhido
                </span>
                <span style={{ fontSize: '0.78rem', color: '#71717a' }}>
                  {CATEGORY_LABELS[book.category]}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '2px' }}>
                {book.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#595959' }}>
                Autor(es): <strong>{book.author}</strong>
              </p>
            </div>

            {/* Botão de Alteração */}
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              style={{
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#1a1a1a',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.18s ease',
              }}
            >
              <Edit3 size={14} color="#e30613" />
              <span>Alterar</span>
            </button>
          </div>

          {/* Item 2: Camiseta Oficial */}
          <div
            className="pk-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '20px',
              alignItems: 'center',
              padding: '20px 24px',
            }}
          >
            {/* Ícone / Tamanho */}
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                background: '#09090b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: 900,
                flexShrink: 0,
                border: '2px solid #27272a',
              }}
            >
              {shirtSize}
            </div>

            {/* Conteúdo da Camiseta */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    background: 'rgba(227, 6, 19, 0.1)',
                    color: '#e30613',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  02. Camiseta Oficial
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '2px' }}>
                Tamanho {shirtSize} ({shirtObj?.name})
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#595959' }}>
                Medidas: <strong>{shirtObj?.width} cm (largura)</strong> × <strong>{shirtObj?.length} cm (comprimento)</strong>
                {shirtObj?.chestCircumference && ` • Tórax: ${shirtObj.chestCircumference}`}
              </p>
            </div>

            {/* Botão de Alteração */}
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              style={{
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#1a1a1a',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.18s ease',
              }}
            >
              <Edit3 size={14} color="#e30613" />
              <span>Alterar</span>
            </button>
          </div>

          {/* Item 3: Identificação do Aluno */}
          <div
            className="pk-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '20px',
              alignItems: 'center',
              padding: '20px 24px',
            }}
          >
            {/* Ícone */}
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                background: '#fee2e2',
                color: '#e30613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <User size={28} />
            </div>

            {/* Conteúdo do Aluno */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    background: 'rgba(227, 6, 19, 0.1)',
                    color: '#e30613',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  03. Dados Acadêmicos
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '4px' }}>
                {student.name}
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '14px',
                  fontSize: '0.84rem',
                  color: '#595959',
                }}
              >
                <span>CPF: <strong style={{ color: '#1a1a1a' }}>{student.cpf}</strong></span>
                <span>WhatsApp: <strong style={{ color: '#1a1a1a' }}>{student.phone}</strong></span>
                <span>E-mail: <strong style={{ color: '#1a1a1a' }}>{student.email}</strong></span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#e30613', fontWeight: 700, marginTop: '3px' }}>
                Curso: {student.course}
              </div>
            </div>

            {/* Botão de Alteração */}
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              style={{
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#1a1a1a',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.18s ease',
              }}
            >
              <Edit3 size={14} color="#e30613" />
              <span>Alterar</span>
            </button>
          </div>

          {/* Item 4: Endereço de Entrega */}
          <div
            className="pk-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '20px',
              alignItems: 'center',
              padding: '20px 24px',
            }}
          >
            {/* Ícone */}
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                background: '#fee2e2',
                color: '#e30613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MapPin size={28} />
            </div>

            {/* Conteúdo do Endereço */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    background: 'rgba(227, 6, 19, 0.1)',
                    color: '#e30613',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  04. Endereço de Entrega (Frete Grátis)
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '2px' }}>
                {address.street}, Nº {address.number}
                {address.complement ? ` (${address.complement})` : ''}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#595959' }}>
                Bairro: <strong>{address.neighborhood}</strong> • Cidade/UF: <strong>{address.city}/{address.state}</strong> • CEP: <strong>{address.cep}</strong>
              </p>
            </div>

            {/* Botão de Alteração */}
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              style={{
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#1a1a1a',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.18s ease',
              }}
            >
              <Edit3 size={14} color="#e30613" />
              <span>Alterar</span>
            </button>
          </div>
        </div>

        {/* Mensagem de Erro se houver */}
        {submitError && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.9rem',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span>{submitError}</span>
          </div>
        )}

        {/* Card Final de Confirmação & Submissão */}
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #fee2e2',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(22, 163, 74, 0.12)',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1rem', color: '#1a1a1a' }}>
                Tudo conferido? Solicite seu Kit de Boas-Vindas
              </strong>
              <span style={{ fontSize: '0.84rem', color: '#595959' }}>
                Ao confirmar, seu protocolo de entrega será gerado imediatamente.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onBack}
              disabled={submitting}
              className="pk-btn pk-btn-secondary"
            >
              <ArrowLeft size={18} />
              <span>Voltar ao Endereço</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="pk-btn pk-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '15px 34px',
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Registrando Pedido...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Confirmar e Solicitar Envio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
