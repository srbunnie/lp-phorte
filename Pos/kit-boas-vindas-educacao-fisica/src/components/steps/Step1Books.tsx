'use client';

import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '@/types';
import { BOOKS_DATA, CATEGORY_LABELS } from '@/data/books';
import { Search, X, Check, ArrowRight, ArrowLeft, BookOpen, Layers } from 'lucide-react';

interface Step1BooksProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
  onNext: () => void;
  onBack: () => void;
}

const CATEGORIES: { id: BookCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos os Livros' },
  { id: 'treinamento', label: 'Treinamento & Força' },
  { id: 'esportes', label: 'Esportes' },
  { id: 'saude', label: 'Saúde & Reabilitação' },
  { id: 'educacao', label: 'Educação Física & Dança' },
];

export default function Step1Books({
  selectedBook,
  onSelectBook,
  onNext,
  onBack,
}: Step1BooksProps) {
  const [activeCategory, setActiveCategory] = useState<BookCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      const matchCategory =
        activeCategory === 'todos' || book.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        CATEGORY_LABELS[book.category]?.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="pk-step-screen" aria-labelledby="step1-title">
      <div className="pk-container">
        {/* Intro */}
        <div className="pk-step-intro">
          <div className="pk-step-eyebrow">Etapa 1 de 5</div>
          <h2 id="step1-title" className="pk-step-title">Escolha seu Livro da Editora Phorte</h2>
          <p className="pk-step-desc">
            Selecione 1 obra de referência em Educação Física para compor seu Kit de Boas-Vindas. O exemplar físico será enviado diretamente para seu endereço com frete 100% gratuito.
          </p>
        </div>

        {/* Barra de Filtros & Busca */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
          }}
        >
          {/* Categorias */}
          <nav aria-label="Categorias de livros" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: isActive ? '#e30613' : '#e5e5e5',
                    background: isActive ? '#e30613' : '#ffffff',
                    color: isActive ? '#ffffff' : '#595959',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(227,6,19,0.25)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Campo de Busca */}
          <div
            style={{
              position: 'relative',
              minWidth: '280px',
              maxWidth: '100%',
              flex: '1',
            }}
          >
            <label htmlFor="book-search-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
              Buscar livros por título ou autor
            </label>
            <Search
              size={18}
              color="#9ca3af"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
            <input
              id="book-search-input"
              type="text"
              placeholder="Buscar por título ou autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pk-input"
              style={{
                paddingLeft: '40px',
                paddingRight: searchQuery ? '36px' : '14px',
                fontSize: '0.9rem',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Contador de Resultados */}
        <div
          aria-live="polite"
          style={{
            fontSize: '0.85rem',
            color: '#595959',
            marginBottom: '20px',
            fontWeight: 600,
          }}
        >
          Exibindo {filteredBooks.length} {filteredBooks.length === 1 ? 'título disponível' : 'títulos disponíveis'}
        </div>

        {/* Grid de Livros */}
        {filteredBooks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed #d1d5db',
            }}
          >
            <BookOpen size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#1a1a1a' }}>
              Nenhum livro encontrado
            </h3>
            <p style={{ color: '#595959', fontSize: '0.92rem' }}>
              Tente buscar por outro termo ou selecione a categoria &quot;Todos os Livros&quot;.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
              paddingBottom: selectedBook ? '100px' : '0',
            }}
          >
            {filteredBooks.map((book) => {
              const isSelected = selectedBook?.id === book.id;

              return (
                <article
                  key={book.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #e30613' : '1px solid #e5e5e5',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isSelected
                      ? '0 12px 30px -5px rgba(227, 6, 19, 0.22)'
                      : '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.18s ease',
                    position: 'relative',
                  }}
                >
                  {/* Badge de Selecionado */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#e30613',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                      <span>Selecionado</span>
                    </div>
                  )}

                  {/* Capa do Livro */}
                  <div
                    style={{
                      height: '280px',
                      background: '#f4f4f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                      borderBottom: '1px solid #e5e5e5',
                    }}
                  >
                    <img
                      src={book.image}
                      alt={`Capa do livro ${book.title}`}
                      loading="lazy"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.18))',
                      }}
                    />
                  </div>

                  {/* Informações do Livro */}
                  <div
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: '#e30613',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '6px',
                      }}
                    >
                      {CATEGORY_LABELS[book.category]}
                    </span>

                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: '#1a1a1a',
                        lineHeight: 1.3,
                        marginBottom: '6px',
                      }}
                    >
                      {book.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: '#71717a',
                        marginBottom: '12px',
                      }}
                    >
                      Por: <strong>{book.author}</strong>
                    </p>

                    {book.description && (
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: '#595959',
                          lineHeight: 1.5,
                          marginBottom: '20px',
                          flex: '1',
                        }}
                      >
                        {book.description}
                      </p>
                    )}

                    {/* Botão de Escolher */}
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      aria-label={`Selecionar o livro ${book.title}`}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #e30613' : '1px solid #e5e5e5',
                        background: isSelected ? '#fff1f2' : '#ffffff',
                        color: isSelected ? '#e30613' : '#1a1a1a',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check size={16} color="#e30613" />
                          <span>Livro Selecionado</span>
                        </>
                      ) : (
                        <span>Escolher Este Livro</span>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Barra Flutuante de Seleção (Dock) */}
        {selectedBook && (
          <aside className="pk-selection-dock" aria-label="Livro selecionado">
            <div className="pk-dock-info">
              <span className="pk-dock-badge">Livro Selecionado</span>
              <div style={{ minWidth: 0 }}>
                <div className="pk-dock-title">{selectedBook.title}</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.78rem' }}>{selectedBook.author}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="pk-btn pk-btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.9rem', flexShrink: 0 }}
            >
              <span>Continuar para Camiseta</span>
              <ArrowRight size={16} />
            </button>
          </aside>
        )}

        {/* Rodapé de Navegação */}
        <div className="pk-step-footer">
          <button
            type="button"
            onClick={onBack}
            className="pk-btn pk-btn-secondary"
          >
            <ArrowLeft size={18} />
            <span>Voltar ao Início</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!selectedBook}
            className="pk-btn pk-btn-primary"
          >
            <span>Continuar para Camiseta</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
