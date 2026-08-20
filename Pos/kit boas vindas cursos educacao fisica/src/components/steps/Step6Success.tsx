'use client';

import React from 'react';
import { Book, ShirtSizeCode, StudentData, AddressData } from '@/types';
import { CheckCircle2, Copy, Sparkles, MessageSquare, Award, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';

interface Step6SuccessProps {
  protocol: string;
  book: Book;
  shirtSize: ShirtSizeCode;
  student: StudentData;
  address: AddressData;
  onReset: () => void;
}

export default function Step6Success({
  protocol,
  book,
  shirtSize,
  student,
  address,
  onReset,
}: Step6SuccessProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyProtocol = () => {
    navigator.clipboard.writeText(protocol);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="pk-step-screen" style={{ paddingTop: '20px' }}>
      <div className="pk-container">
        {/* Banner de Sucesso Principal */}
        <div
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
            borderRadius: '24px',
            border: '2px solid #bbf7d0',
            padding: 'clamp(28px, 5vw, 56px)',
            textAlign: 'center',
            boxShadow: '0 20px 40px -15px rgba(22, 163, 74, 0.12)',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#22c55e',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 10px 25px rgba(34, 197, 94, 0.35)',
            }}
          >
            <CheckCircle2 size={42} strokeWidth={2.5} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#14532d',
              marginBottom: '12px',
              letterSpacing: '-0.03em',
            }}
          >
            Personalização Concluída com Sucesso!
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#166534',
              maxWidth: '620px',
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Parabéns, <strong>{student.name}</strong>! Recebemos a sua solicitação. O exemplar de <em>&quot;{book.title}&quot;</em> e a camiseta tamanho <strong>{shirtSize}</strong> foram registrados para envio.
          </p>

          {/* Card do Protocolo */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              border: '1.5px dashed #86efac',
              borderRadius: '12px',
              padding: '12px 24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
              Protocolo da Solicitação:
            </span>
            <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#14532d', letterSpacing: '0.05em' }}>
              {protocol}
            </strong>
            <button
              type="button"
              onClick={handleCopyProtocol}
              title="Copiar Protocolo"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#166534',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Copy size={13} />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Seção Cross-Sell: 2ª Pós-Graduação Phorte */}
        <div
          id="pk-second-post"
          style={{
            background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
            borderRadius: '24px',
            padding: 'clamp(28px, 4.5vw, 48px)',
            color: '#ffffff',
            border: '1px solid #27272a',
            boxShadow: '0 20px 45px -10px rgba(0,0,0,0.3)',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(227,6,19,0.35) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(227, 6, 19, 0.25)',
              color: '#ff8a93',
              border: '1px solid rgba(227, 6, 19, 0.4)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} />
            <span>Condição Exclusiva de Aluno</span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: '#ffffff',
              marginBottom: '14px',
              lineHeight: 1.15,
            }}
          >
            Acelere sua carreira com uma <br />
            <span style={{ color: '#e30613' }}>Segunda Pós-Graduação Phorte</span>
          </h3>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#a1a1aa',
              lineHeight: 1.6,
              maxWidth: '680px',
              marginBottom: '28px',
            }}
          >
            Alunos matriculados têm acesso à <strong>dupla certificação</strong> com condições e descontos imperdíveis nos cursos de Fisiologia, Biomecânica, Futebol, Nutrição Esportiva e Gestão.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20sou%20aluno%20da%20P%C3%B3s%20Phorte%20e%20gostaria%20de%20saber%20sobre%20a%20condi%C3%A7%C3%A3o%20especial%20para%202%C2%AA%20P%C3%B3s"
              target="_blank"
              rel="noopener noreferrer"
              className="pk-btn pk-btn-primary"
              style={{
                fontSize: '1.05rem',
                padding: '14px 32px',
                borderRadius: '14px',
              }}
            >
              <span>Quero Conhecer a 2ª Pós com Desconto</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="https://posphorte.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="pk-btn pk-btn-dark"
              style={{
                fontSize: '0.95rem',
                padding: '14px 24px',
                borderRadius: '14px',
              }}
            >
              <span>Ver Catálogo de Cursos</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Seção Comunidade Phorte */}
        <div
          id="pk-community"
          className="pk-card"
          style={{
            background: '#ffffff',
            border: '1px solid #e4e4e7',
            padding: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'rgba(227, 6, 19, 0.1)',
                color: '#e30613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MessageSquare size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', color: '#18181b' }}>
                Participe da Comunidade de Alunos Phorte
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Conecte-se com professores, especialistas e colegas de turma para trocar experiências e vagas.
              </p>
            </div>
          </div>

          <a
            href="https://posphorte.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn pk-btn-secondary"
            style={{
              padding: '12px 24px',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}
          >
            <span>Acessar Comunidade</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Rodapé / Reiniciar */}
        <div style={{ textAlign: 'center', padding: '16px 0 40px' }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#71717a',
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Voltar à página inicial do kit
          </button>
        </div>
      </div>
    </section>
  );
}
