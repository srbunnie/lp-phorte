# Cursos e Polos Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Criar um modelo de planilha editavel com duas abas, `Cursos` e `Ofertas`, pronto para preenchimento manual.

**Architecture:** O modelo sera entregue como SpreadsheetML, um formato XML que o Excel abre como pasta de trabalho com varias abas. A primeira aba cadastra cursos; a segunda registra uma linha por oferta valida com modalidade, polo e valor.

**Tech Stack:** XML Spreadsheet 2003, Markdown

---

### Task 1: Registrar o desenho aprovado

**Files:**
- Create: `docs/plans/2026-04-02-cursos-modalidades-polos-design.md`

**Step 1: Descrever a estrutura final**

Documentar a justificativa da divisao em duas abas e os campos de cada uma.

**Step 2: Revisar a compatibilidade com o contrato atual**

Confirmar que a aba `Ofertas` consegue representar `curso + modalidade + polo + valor`.

### Task 2: Criar o arquivo da planilha

**Files:**
- Create: `data/templates/cursos-ofertas-template.xml`

**Step 1: Montar a aba `Cursos`**

Adicionar cabecalhos e os cursos iniciais vistos na planilha atual.

**Step 2: Montar a aba `Ofertas`**

Adicionar cabecalhos e linhas de exemplo para orientar o preenchimento manual.

**Step 3: Garantir abertura no Excel**

Usar SpreadsheetML com duas worksheets reais.

### Task 3: Criar instrucoes curtas de uso

**Files:**
- Create: `data/templates/README-planilha.md`

**Step 1: Explicar o papel de cada aba**

Descrever o que deve ser preenchido em `Cursos` e em `Ofertas`.

**Step 2: Dar um exemplo de preenchimento**

Mostrar como um curso com mais de uma modalidade e mais de um polo vira varias linhas na aba `Ofertas`.
