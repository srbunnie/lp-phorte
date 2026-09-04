# Graduação em Tradução e Interpretação — Faculdade Phorte

Pacote local de pré-publicação para a landing page de **Tradução e Interpretação Português / Inglês**, preparado a partir do padrão de implementação Elementor usado em `Graduacao/pedagogia`.

## Status

**Em desenvolvimento / pronto para revisão de conteúdo e montagem no Elementor.** Nada foi publicado em produção.

## O que está neste pacote

- `index.html` — preview estático navegável, com formulário apenas demonstrativo;
- `styles.css` — design system local e CSS escopado ao wrapper Elementor;
- `script.js` — acordeões da grade, navegação mobile e comportamento do formulário de demonstração;
- `implementacao/elementor/` — blocos para colagem em widgets HTML e orientação da estrutura de Containers;
- `COPYPHORTE_Tradução_2026.08.md` — briefing/copy-base já existente na pasta de destino, usado como fonte editorial e pendência de aprovação;
- `referencias/asset-inventory.md` — inventário das fontes, mídias e itens que precisam de validação.

## Como visualizar

Abra `index.html` em um navegador ou sirva a raiz do repositório com um servidor HTTP local. As imagens de referência usam URLs públicas da Biblioteca de Mídia Phorte para que o preview fique próximo da futura publicação; a versão Elementor deve apontar para os itens equivalentes da Biblioteca de Mídia.

## Arquitetura de Containers no Elementor

```text
Container — phorte-traducao-interpretacao-2027-1
├── HTML — implementacao/elementor/widget-before-form.html
├── Container — enrollment-section
│   └── Container — enrollment-grid
│       ├── HTML — enrollment-copy.html
│       └── Container — enrollment-form
│           ├── HTML — form-intro.html
│           ├── Form widget nativo do Elementor
│           └── HTML — form-disclaimer.html
└── HTML — implementacao/elementor/widget-after-form.html
```

Aplicar `phorte-traducao-interpretacao-2027-1` no Container principal. Inserir o conteúdo de `styles.css` no CSS personalizado global ou no CSS da página. O formulário deve ser configurado no widget nativo, conforme `implementacao/elementor/README.md`.

## Dados confirmados usados na implementação

- Curso: Tradução e Interpretação Português / Inglês;
- formação: Bacharelado;
- modalidade: EAD on-line ao vivo;
- duração: 6 semestres;
- turno: noturno, segunda a sexta-feira, das 20h às 22h;
- campus/sede para atividades presenciais: Bela Vista, São Paulo;
- nota máxima no MEC, conforme a página oficial consultada;
- oferta de referência: R$ 529,00/mês;
- turma de referência: 2027.1;
- opção disponível no catálogo local: Polo Bela Vista; a oferta do Polo Lapa está marcada como indisponível no JSON do projeto.
- copy-base local: `COPYPHORTE_Tradução_2026.08.md`, com seções sobre proposta, prática, mercado, perfil do aluno, docentes, grade, FAQ e CTAs.

## Pendências antes da publicação

1. Confirmar turma, preço, disponibilidade por polo e texto comercial vigente.
2. Validar URL final do CTA de inscrição e eventuais opções de ingresso (vestibular, ENEM, transferência e segunda graduação).
3. Confirmar grade curricular oficial, nomenclatura dos semestres e revisão ortográfica final.
4. Confirmar docentes exibidos, bios e autorização/seleção das fotos.
5. Subir ou localizar os assets na Biblioteca de Mídia e substituir as URLs de referência.
6. Configurar o widget Form, ações oficiais de CRM/e-mail, mensagem de sucesso, consentimento LGPD e campos ocultos.
7. Revisar o reconhecimento/nota do curso no e-MEC e todas as condições comerciais com a equipe responsável.

## Fontes consultadas

- Página oficial do curso: <https://faculdadephorte.edu.br/graduacao/traducao-e-interpretacao-ingles-portugues/>;
- catálogo local de ofertas: `Graduacao/prototipo-pricecard/data/modelo-cursos-ofertas.json`;
- referência de implementação Elementor: `Graduacao/pedagogia/implementacao/elementor/2027-1/`.
