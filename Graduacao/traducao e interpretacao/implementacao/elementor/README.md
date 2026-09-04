# Tradução e Interpretação 2027.1 no Elementor

Pacote de montagem para o Container principal da landing page. O conteúdo é estático e demonstrativo; a publicação precisa ser feita manualmente no WordPress/Elementor após revisão e aprovação.

## Estrutura recomendada

```text
Container — phorte-traducao-interpretacao-2027-1
├── HTML — widget-before-form.html
├── Container — ti-enrollment
│   └── Container — ti-enrollment-grid
│       ├── HTML — enrollment-copy.html
│       └── Container — ti-enrollment-form
│           ├── HTML — form-intro.html
│           ├── Form widget nativo do Elementor
│           └── HTML — form-disclaimer.html
└── HTML — widget-after-form.html
```

## CSS e JavaScript

1. Aplicar a classe `phorte-traducao-interpretacao-2027-1` no Container principal.
2. Colar `styles.css` no CSS personalizado global ou no CSS da página.
3. Inserir `script.js` via recurso permitido pelo projeto/Elementor. Se o site já possuir um carregador global, inicializar o script apenas uma vez.
4. O CSS é escopado ao wrapper e não usa seletores genéricos para não interferir no header, footer ou demais widgets.

## Form widget nativo

- Nome sugerido: `traducao_interpretacao_2027_1`;
- campos: `nome`, `email`, `whatsapp`, `ingresso`;
- campo oculto: `curso = Tradução e Interpretação Português / Inglês`;
- ações: Collect Submissions + Email; conectar o CRM oficial quando definido;
- mensagem sugerida: `Recebemos seus dados! Nossa equipe vai entrar em contato para dar sequência à sua inscrição.`;
- incluir consentimento LGPD e política institucional conforme a configuração vigente.

## URLs de mídia

O pacote usa URLs públicas oficiais apenas como referência. Confirmar os itens correspondentes na Biblioteca de Mídia e substituir qualquer URL antes de publicar. Não foram baixadas ou alteradas imagens no WordPress.

## Checklist de publicação

- [ ] Confirmar turma, preço, condições e disponibilidade do polo.
- [ ] Revisar copy, grade, docentes, bios e claims institucionais.
- [ ] Substituir URLs de referência por URLs da Biblioteca de Mídia.
- [ ] Configurar e testar formulário, CRM, e-mail, consentimento e mensagem de sucesso.
- [ ] Testar CTA de vestibular, teclado, foco, mobile e ausência de overflow horizontal.
- [ ] Validar nota/reconhecimento no e-MEC e liberar publicação somente após aprovação.

