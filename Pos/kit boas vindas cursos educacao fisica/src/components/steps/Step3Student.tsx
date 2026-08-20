'use client';

import React, { useState } from 'react';
import { StudentData } from '@/types';
import { maskCPF, maskPhone } from '@/utils/masks';
import { isValidCPF, isValidPhone, isValidEmail } from '@/utils/validators';
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle, Lock, Mail } from 'lucide-react';

interface Step3StudentProps {
  studentData: StudentData;
  onUpdateStudentData: (data: Partial<StudentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const COURSES_ED_FISICA = [
  'Pós-Graduação em Fisiologia do Exercício e Treinamento de Força',
  'Pós-Graduação em Biomecânica, Cinesiologia e Reabilitação',
  'Pós-Graduação em Musculação e Condicionamento Físico',
  'Pós-Graduação em Treinamento Funcional e Alta Performance',
  'Pós-Graduação em Futebol e Futsal: Da Base ao Rendimento',
  'Pós-Graduação em Educação Física Escolar e Psicomotricidade',
  'Pós-Graduação em Fisiologia e Prescrição de Exercício para Grupos Especiais',
  'Pós-Graduação em Gestão e Marketing de Negócios Fitness e Esportivos',
  'Outro curso de Pós-Graduação Phorte',
];

export default function Step3Student({
  studentData,
  onUpdateStudentData,
  onNext,
  onBack,
}: Step3StudentProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!studentData.name.trim() || studentData.name.trim().length < 5) {
      newErrors.name = 'Informe seu nome completo (mínimo de 5 caracteres).';
    }

    if (!studentData.cpf || !isValidCPF(studentData.cpf)) {
      newErrors.cpf = 'CPF inválido. Por favor, verifique os 11 dígitos.';
    }

    if (!studentData.phone || !isValidPhone(studentData.phone)) {
      newErrors.phone = 'Informe um WhatsApp/telefone válido com DDD.';
    }

    if (!studentData.email || !studentData.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório para o envio do protocolo e rastreamento.';
    } else if (!isValidEmail(studentData.email)) {
      newErrors.email = 'Informe um endereço de e-mail válido (ex: seu@email.com).';
    }

    if (!studentData.course.trim()) {
      newErrors.course = 'Selecione o seu curso de Pós-Graduação.';
    }

    if (!studentData.confirmedMatricula) {
      newErrors.confirmedMatricula = 'Você deve confirmar que os dados correspondem à sua matrícula acadêmica.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <section className="pk-step-screen">
      <div className="pk-container">
        {/* Intro */}
        <div className="pk-step-intro">
          <div className="pk-step-eyebrow">Etapa 3 de 5</div>
          <h2 className="pk-step-title">Confirme seus Dados de Matrícula</h2>
          <p className="pk-step-desc">
            Seus dados serão validados com a secretaria acadêmica para liberação do kit oficial.
          </p>
        </div>

        <form onSubmit={handleContinue}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Lado Esquerdo: Formulário */}
            <div className="pk-card" style={{ background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(227, 6, 19, 0.1)',
                    color: '#e30613',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lock size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Identificação do Aluno</h3>
                  <p style={{ fontSize: '0.82rem', color: '#71717a' }}>
                    Todos os campos são obrigatórios (*)
                  </p>
                </div>
              </div>

              {/* Nome Completo */}
              <div className="pk-form-group">
                <label className="pk-label">
                  Nome Completo <span className="pk-label-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Eduardo de Oliveira"
                  value={studentData.name}
                  onChange={(e) => {
                    onUpdateStudentData({ name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  className={`pk-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && (
                  <div className="pk-field-error-text">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* CPF e Telefone Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                }}
              >
                {/* CPF com Validação Real */}
                <div className="pk-form-group">
                  <label className="pk-label">
                    CPF <span className="pk-label-required">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    value={studentData.cpf}
                    onChange={(e) => {
                      const masked = maskCPF(e.target.value);
                      onUpdateStudentData({ cpf: masked });
                      if (errors.cpf) setErrors({ ...errors, cpf: '' });
                    }}
                    onBlur={() => setTouched({ ...touched, cpf: true })}
                    className={`pk-input ${errors.cpf ? 'error' : ''}`}
                  />
                  {errors.cpf && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.cpf}</span>
                    </div>
                  )}
                </div>

                {/* Telefone / WhatsApp */}
                <div className="pk-form-group">
                  <label className="pk-label">
                    WhatsApp <span className="pk-label-required">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    value={studentData.phone}
                    onChange={(e) => {
                      const masked = maskPhone(e.target.value);
                      onUpdateStudentData({ phone: masked });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    onBlur={() => setTouched({ ...touched, phone: true })}
                    className={`pk-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* E-mail Obrigatório e Visível */}
              <div className="pk-form-group">
                <label className="pk-label">
                  E-mail para Notificações de Envio e Rastreio <span className="pk-label-required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com.br"
                    value={studentData.email}
                    onChange={(e) => {
                      onUpdateStudentData({ email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className={`pk-input ${errors.email ? 'error' : ''}`}
                  />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '4px' }}>
                  Você receberá o protocolo, confirmação do pedido e atualizações da entrega neste endereço.
                </div>
                {errors.email && (
                  <div className="pk-field-error-text">
                    <AlertCircle size={14} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Curso de Pós-Graduação */}
              <div className="pk-form-group">
                <label className="pk-label">
                  Curso de Pós-Graduação <span className="pk-label-required">*</span>
                </label>
                <select
                  value={studentData.course}
                  onChange={(e) => {
                    onUpdateStudentData({ course: e.target.value });
                    if (errors.course) setErrors({ ...errors, course: '' });
                  }}
                  className={`pk-input ${errors.course ? 'error' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Selecione o seu curso...</option>
                  {COURSES_ED_FISICA.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <div className="pk-field-error-text">
                    <AlertCircle size={14} />
                    <span>{errors.course}</span>
                  </div>
                )}
              </div>

              {/* Checkbox de Confirmação */}
              <label className="pk-checkbox-label">
                <input
                  type="checkbox"
                  checked={studentData.confirmedMatricula}
                  onChange={(e) => {
                    onUpdateStudentData({ confirmedMatricula: e.target.checked });
                    if (errors.confirmedMatricula) {
                      setErrors({ ...errors, confirmedMatricula: '' });
                    }
                  }}
                  className="pk-checkbox-input"
                />
                <span>
                  Declaro que estou matriculado(a) em curso de Pós-Graduação da Faculdade Phorte e que os dados informados acima são verídicos.
                </span>
              </label>
              {errors.confirmedMatricula && (
                <div className="pk-field-error-text" style={{ marginTop: '8px' }}>
                  <AlertCircle size={14} />
                  <span>{errors.confirmedMatricula}</span>
                </div>
              )}
            </div>

            {/* Lado Direito: Card de Segurança */}
            <div
              style={{
                background: 'linear-gradient(145deg, #18181b 0%, #09090b 100%)',
                borderRadius: '16px',
                padding: '28px',
                color: '#ffffff',
                border: '1px solid #27272a',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(227, 6, 19, 0.2)',
                  color: '#ff8a93',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={14} />
                <span>Validação Acadêmica</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '12px' }}>
                Segurança dos seus Dados
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.55, marginBottom: '20px' }}>
                O benefício do Kit de Boas-Vindas é exclusivo para alunos devidamente matriculados na Faculdade Phorte.
              </p>

              <div style={{ display: 'grid', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e4e7', lineHeight: 1.4 }}>
                    O <strong>CPF</strong> é verificado na base acadêmica de matrículas ativas.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e4e7', lineHeight: 1.4 }}>
                    O <strong>E-mail</strong> e <strong>WhatsApp</strong> recebem atualizações de envio e rastreio.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e4e7', lineHeight: 1.4 }}>
                    Seus dados estão protegidos em total conformidade com a <strong>LGPD</strong>.
                  </span>
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
              <span>Voltar para Camiseta</span>
            </button>

            <button
              type="submit"
              className="pk-btn pk-btn-primary"
            >
              <span>Continuar para Endereço</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
