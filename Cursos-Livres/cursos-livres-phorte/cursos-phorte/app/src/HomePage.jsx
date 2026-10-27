import './HomePage.css';
import { ArrowRight } from '@phosphor-icons/react';
import { courses } from './courses.js';
import { CourseFinder } from './CourseFinder.jsx';

const catalogUrl = 'https://faculdadephorte.edu.br/todos-os-cursos/';

export function HomePage() {
  return (
    <main className="courses-home">
      <section className="courses-hero" aria-labelledby="courses-hero-title">
        <div className="courses-hero__content">
          <p className="courses-eyebrow">Cursos livres Phorte</p>
          <h1 id="courses-hero-title">
            Aprenda hoje.
            <span>Avance na sua carreira.</span>
          </h1>
          <p className="courses-hero__description">
            Cursos livres com conteúdo útil e prática aplicada ao seu dia a dia profissional.
          </p>
          <a className="courses-button" href={catalogUrl} target="_blank" rel="noreferrer">
            Conheça todos os cursos <ArrowRight size={19} weight="bold" aria-hidden="true" />
          </a>
        </div>
        <div className="courses-hero__visual" role="img" aria-label="Estudante sorridente com caderno em um campus" />
      </section>

      <CourseFinder courses={courses} />

      <section className="courses-story" aria-labelledby="courses-story-title">
        <div className="courses-story__visual">
          <img
            className="courses-story__image"
            src="https://phorte.com/wp-content/uploads/2026/08/ratio11-2025-faculdade-phorte-final.webp"
            alt="Peça comemorativa dos 30 anos de excelência em educação da Faculdade Phorte"
            loading="lazy"
          />
        </div>
        <div className="courses-story__content">
          <p className="courses-eyebrow">Formação que gera resultados</p>
          <h2 id="courses-story-title">Mais de 30 anos transformando carreiras.</h2>
          <p>
            A Faculdade Phorte conecta conhecimento acadêmico com a realidade prática do mercado, com cursos pensados para evolução profissional.
          </p>
          <div className="courses-story__stats" aria-label="Números da Faculdade Phorte">
            <div className="courses-story__stat">
              <strong>50k+</strong>
              <span>Alunos Ativos</span>
            </div>
            <div className="courses-story__stat">
              <strong>200+</strong>
              <span>Cursos Ativos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="courses-cta" aria-labelledby="courses-cta-title">
        <div className="courses-cta__content">
          <p className="courses-eyebrow">Seu próximo passo</p>
          <h2 id="courses-cta-title">Desenvolva novas habilidades com a Faculdade Phorte.</h2>
          <a className="courses-button" href={catalogUrl} target="_blank" rel="noreferrer">
            Conheça todos os cursos <ArrowRight size={19} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>

    </main>
  );
}
