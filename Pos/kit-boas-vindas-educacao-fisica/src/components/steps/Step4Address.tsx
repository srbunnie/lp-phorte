'use client';

import React, { useState } from 'react';
import { AddressData } from '@/types';
import { maskCEP, cleanDigits } from '@/utils/masks';
import { isValidCEP } from '@/utils/validators';
import { fetchAddressByCEP } from '@/services/viacep';
import { ArrowRight, ArrowLeft, MapPin, Loader2, AlertCircle, CheckCircle2, Truck } from 'lucide-react';

interface Step4AddressProps {
  addressData: AddressData;
  onUpdateAddressData: (data: Partial<AddressData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export default function Step4Address({
  addressData,
  onUpdateAddressData,
  onNext,
  onBack,
}: Step4AddressProps) {
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepStatus, setCepStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cepMessage, setCepMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCEPChange = async (value: string) => {
    const masked = maskCEP(value);
    onUpdateAddressData({ cep: masked });

    const digits = cleanDigits(value);
    if (errors.cep) setErrors((prev) => ({ ...prev, cep: '' }));

    if (digits.length === 8) {
      setLoadingCEP(true);
      setCepStatus('idle');
      setCepMessage('Consultando ViaCEP...');

      const result = await fetchAddressByCEP(digits);
      setLoadingCEP(false);

      if (result.success) {
        setCepStatus('success');
        setCepMessage('Endereço preenchido automaticamente!');
        onUpdateAddressData({
          street: result.street || addressData.street,
          neighborhood: result.neighborhood || addressData.neighborhood,
          city: result.city || addressData.city,
          state: result.state || addressData.state,
        });
      } else {
        setCepStatus('error');
        setCepMessage(result.error || 'CEP não encontrado. Preencha manualmente.');
      }
    } else {
      setCepStatus('idle');
      setCepMessage('');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!addressData.cep || !isValidCEP(addressData.cep)) {
      newErrors.cep = 'Informe um CEP válido com 8 dígitos.';
    }

    if (!addressData.street.trim()) {
      newErrors.street = 'Informe o logradouro / rua.';
    }

    if (!addressData.number.trim()) {
      newErrors.number = 'Informe o número do imóvel.';
    }

    if (!addressData.neighborhood.trim()) {
      newErrors.neighborhood = 'Informe o bairro.';
    }

    if (!addressData.city.trim()) {
      newErrors.city = 'Informe a cidade.';
    }

    if (!addressData.state.trim()) {
      newErrors.state = 'Selecione o estado (UF).';
    }

    if (!addressData.confirmedAddress) {
      newErrors.confirmedAddress = 'Confirme que você conferiu o endereço de entrega.';
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
    <section className="pk-step-screen" aria-labelledby="step4-title">
      <div className="pk-container">
        {/* Intro */}
        <div className="pk-step-intro">
          <div className="pk-step-eyebrow">Etapa 4 de 5</div>
          <h2 id="step4-title" className="pk-step-title">Endereço para Envio do Kit</h2>
          <p className="pk-step-desc">
            Informe onde você deseja receber seu livro e sua camiseta oficial. O frete é 100% gratuito para todo o Brasil.
          </p>
        </div>

        <form onSubmit={handleContinue} noValidate>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Lado Esquerdo: Formulário de Endereço */}
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
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Dados de Entrega</h3>
                  <p style={{ fontSize: '0.82rem', color: '#71717a' }}>
                    Digite seu CEP para preenchimento automático via ViaCEP
                  </p>
                </div>
              </div>

              {/* CEP com Busca Automática */}
              <div className="pk-form-group">
                <label htmlFor="cep" className="pk-label">
                  CEP <span className="pk-label-required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="cep"
                    type="text"
                    inputMode="numeric"
                    placeholder="00000-000"
                    maxLength={9}
                    value={addressData.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    aria-invalid={!!errors.cep}
                    aria-describedby={errors.cep ? 'cep-error' : undefined}
                    className={`pk-input ${errors.cep ? 'error' : ''}`}
                    style={{ paddingRight: '40px' }}
                  />
                  {loadingCEP && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Loader2 size={18} color="#e30613" className="animate-spin" />
                    </div>
                  )}
                  {!loadingCEP && cepStatus === 'success' && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircle2 size={18} color="#16a34a" />
                    </div>
                  )}
                </div>

                {cepMessage && (
                  <div
                    aria-live="polite"
                    style={{
                      fontSize: '0.8rem',
                      marginTop: '6px',
                      color: cepStatus === 'success' ? '#15803d' : '#b91c1c',
                      fontWeight: 600,
                    }}
                  >
                    {cepMessage}
                  </div>
                )}
                {errors.cep && (
                  <div id="cep-error" className="pk-field-error-text">
                    <AlertCircle size={14} />
                    <span>{errors.cep}</span>
                  </div>
                )}
              </div>

              {/* Rua e Número */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr',
                  gap: '14px',
                }}
              >
                <div className="pk-form-group">
                  <label htmlFor="street" className="pk-label">
                    Rua / Avenida <span className="pk-label-required">*</span>
                  </label>
                  <input
                    id="street"
                    type="text"
                    placeholder="Ex: Av. Paulista"
                    value={addressData.street}
                    onChange={(e) => {
                      onUpdateAddressData({ street: e.target.value });
                      if (errors.street) setErrors({ ...errors, street: '' });
                    }}
                    aria-invalid={!!errors.street}
                    className={`pk-input ${errors.street ? 'error' : ''}`}
                  />
                  {errors.street && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.street}</span>
                    </div>
                  )}
                </div>

                <div className="pk-form-group">
                  <label htmlFor="number" className="pk-label">
                    Nº <span className="pk-label-required">*</span>
                  </label>
                  <input
                    id="number"
                    type="text"
                    placeholder="123"
                    value={addressData.number}
                    onChange={(e) => {
                      onUpdateAddressData({ number: e.target.value });
                      if (errors.number) setErrors({ ...errors, number: '' });
                    }}
                    aria-invalid={!!errors.number}
                    className={`pk-input ${errors.number ? 'error' : ''}`}
                  />
                  {errors.number && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Complemento e Bairro */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '14px',
                }}
              >
                <div className="pk-form-group">
                  <label htmlFor="complement" className="pk-label">Complemento (Opcional)</label>
                  <input
                    id="complement"
                    type="text"
                    placeholder="Ex: Bloco B, Apto 42"
                    value={addressData.complement || ''}
                    onChange={(e) => onUpdateAddressData({ complement: e.target.value })}
                    className="pk-input"
                  />
                </div>

                <div className="pk-form-group">
                  <label htmlFor="neighborhood" className="pk-label">
                    Bairro <span className="pk-label-required">*</span>
                  </label>
                  <input
                    id="neighborhood"
                    type="text"
                    placeholder="Ex: Bela Vista"
                    value={addressData.neighborhood}
                    onChange={(e) => {
                      onUpdateAddressData({ neighborhood: e.target.value });
                      if (errors.neighborhood) setErrors({ ...errors, neighborhood: '' });
                    }}
                    aria-invalid={!!errors.neighborhood}
                    className={`pk-input ${errors.neighborhood ? 'error' : ''}`}
                  />
                  {errors.neighborhood && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.neighborhood}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cidade e Estado */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr',
                  gap: '14px',
                }}
              >
                <div className="pk-form-group">
                  <label htmlFor="city" className="pk-label">
                    Cidade <span className="pk-label-required">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={addressData.city}
                    onChange={(e) => {
                      onUpdateAddressData({ city: e.target.value });
                      if (errors.city) setErrors({ ...errors, city: '' });
                    }}
                    aria-invalid={!!errors.city}
                    className={`pk-input ${errors.city ? 'error' : ''}`}
                  />
                  {errors.city && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.city}</span>
                    </div>
                  )}
                </div>

                <div className="pk-form-group">
                  <label htmlFor="state" className="pk-label">
                    UF <span className="pk-label-required">*</span>
                  </label>
                  <select
                    id="state"
                    value={addressData.state}
                    onChange={(e) => {
                      onUpdateAddressData({ state: e.target.value });
                      if (errors.state) setErrors({ ...errors, state: '' });
                    }}
                    aria-invalid={!!errors.state}
                    className={`pk-input ${errors.state ? 'error' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">UF</option>
                    {BRAZIL_STATES.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <div className="pk-field-error-text">
                      <AlertCircle size={14} />
                      <span>{errors.state}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Checkbox de Confirmação */}
              <label className="pk-checkbox-label">
                <input
                  type="checkbox"
                  checked={addressData.confirmedAddress}
                  onChange={(e) => {
                    onUpdateAddressData({ confirmedAddress: e.target.checked });
                    if (errors.confirmedAddress) setErrors({ ...errors, confirmedAddress: '' });
                  }}
                  className="pk-checkbox-input"
                />
                <span>
                  Conferi meu endereço e confirmo que há alguém para receber a encomenda no local.
                </span>
              </label>
              {errors.confirmedAddress && (
                <div className="pk-field-error-text" style={{ marginTop: '8px' }}>
                  <AlertCircle size={14} />
                  <span>{errors.confirmedAddress}</span>
                </div>
              )}
            </div>

            {/* Lado Direito: Informações de Envio */}
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
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <Truck size={14} />
                <span>Envio & Rastreamento</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '12px' }}>
                Como funciona a entrega?
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.55, marginBottom: '20px' }}>
                Seu kit é separado individualmente pela equipe da Editora e Faculdade Phorte.
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      height: 'fit-content',
                    }}
                  >
                    01
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: '#ffffff', marginBottom: '2px' }}>
                      Validação Cadastral
                    </strong>
                    <span style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>
                      Conferência dos dados com a secretaria acadêmica em até 48 horas úteis.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      height: 'fit-content',
                    }}
                  >
                    02
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: '#ffffff', marginBottom: '2px' }}>
                      Separação & Embalagem
                    </strong>
                    <span style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>
                      O livro escolhido e a camiseta são embalados no kit oficial da Phorte.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      background: 'rgba(227, 6, 19, 0.2)',
                      color: '#e30613',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      height: 'fit-content',
                    }}
                  >
                    03
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: '#ffffff', marginBottom: '2px' }}>
                      Envio com Rastreio
                    </strong>
                    <span style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>
                      Você receberá o código de rastreamento no seu WhatsApp e e-mail cadastrado.
                    </span>
                  </div>
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
              <span>Voltar aos Dados</span>
            </button>

            <button
              type="submit"
              className="pk-btn pk-btn-primary"
            >
              <span>Revisar e Finalizar Pedido</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
