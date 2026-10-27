import { useState } from 'react';
import { ArrowRight, List, X, WhatsappLogo } from '@phosphor-icons/react';
import { HomePage } from './HomePage.jsx';

const pageBase = import.meta.env.BASE_URL;
const catalogUrl = 'https://faculdadephorte.edu.br/todos-os-cursos/';
const contactUrl = 'https://wa.me/551122221222?text=Quero%20conhecer%20os%20cursos%20livres%20da%20Faculdade%20Phorte';
const institutionalUrl = 'https://faculdadephorte.edu.br/sobre-nos/';
const blogUrl = 'https://faculdadephorte.edu.br/blog/';
const logoUrl = `${pageBase}images/logo-phorte.svg`;

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href={pageBase} aria-label="Faculdade Phorte — Cursos Livres">
          <img src={logoUrl} alt="Faculdade Phorte" />
        </a>

        <button
          className="site-header__menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>

        <nav id="primary-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegação principal">
          <a className="is-current" href={pageBase} aria-current="page" onClick={() => setMenuOpen(false)}>Cursos Livres</a>
          <a href={institutionalUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Institucional</a>
          <a href={blogUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Blog</a>
          <a className="site-nav__contact" href={contactUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Fale Conosco <WhatsappLogo size={17} weight="fill" aria-hidden="true" />
          </a>
          <a className="site-header__catalog" href={catalogUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Conheça todos os cursos <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href={pageBase} aria-label="Voltar para Cursos Livres Phorte">
        <img src={logoUrl} alt="Faculdade Phorte" />
      </a>
      <p>Faculdade Phorte · Educação para abrir novos caminhos.</p>
      <a href={institutionalUrl} target="_blank" rel="noreferrer">Conheça a Phorte</a>
    </footer>
  );
}

export function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <SiteHeader />
      <div id="main-content"><HomePage /></div>
      <SiteFooter />
    </div>
  );
}
