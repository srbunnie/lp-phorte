'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxReachedStep: number;
}

const STEPS = [
  { step: 1, label: 'Livro' },
  { step: 2, label: 'Camiseta' },
  { step: 3, label: 'Seus Dados' },
  { step: 4, label: 'Endereço' },
  { step: 5, label: 'Confirmação' },
];

export default function ProgressBar({
  currentStep,
  onStepClick,
  maxReachedStep,
}: ProgressBarProps) {
  if (currentStep === 0 || currentStep === 6) {
    return null;
  }

  return (
    <div className="pk-progress-bar-wrap">
      <div className="pk-container">
        <div className="pk-progress-steps">
          {STEPS.map((s, index) => {
            const isCurrent = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            const isClickable = s.step <= maxReachedStep;

            return (
              <React.Fragment key={s.step}>
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick && onStepClick(s.step)}
                  disabled={!isClickable}
                  className={`pk-step-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <span className="pk-step-circle">
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : s.step}
                  </span>
                  <span>{s.label}</span>
                </button>
                {index < STEPS.length - 1 && <div className="pk-step-divider" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
