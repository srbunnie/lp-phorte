'use strict';
'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="pk-header">
      <div className="pk-container">
        <div className="pk-header-inner">
          <div className="pk-logo">
            <img
              src="/images/logo-phorte-branco.webp"
              alt="Faculdade Phorte - Graduação e Pós-Graduação"
              className="pk-logo-img"
            />
          </div>

          <div className="pk-header-badge">
            <span className="pk-header-badge-dot"></span>
            <GraduationCap size={15} style={{ display: 'inline-block' }} />
            <span>Exclusivo para Alunos Matriculados</span>
          </div>
        </div>
      </div>
    </header>
  );
}
