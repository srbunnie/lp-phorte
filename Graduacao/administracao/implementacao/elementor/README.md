# Administração no Elementor

**Estado:** primeira montagem estática, pronta para revisão. Conteúdo acadêmico/comercial e mídia ainda sujeitos às pendências do [dossiê](../../referencias/fontes-e-pendencias.md). Não publicado.

## Containers

```text
Container principal — phorte-lp-gestao phorte-lp-gestao--administracao
├── HTML: widget-before-form.html
├── Container: gestao-section gestao-enrollment (ID: administracao-inscricao)
│   └── Container: gestao-container gestao-enrollment-grid
│       ├── HTML: enrollment-copy.html
│       └── Container: gestao-enrollment-form
│           ├── HTML: form-intro.html
│           ├── Form widget nativo do Elementor
│           └── HTML: form-disclaimer.html
└── HTML: widget-after-form.html
```

Atributo adicional da seção de contato: `aria-labelledby="administracao-inscricao-title"`. Configurar a grade com duas colunas no desktop e uma no mobile. Desativar gaps/paddings padrão dos containers que duplicarem os espaçamentos do CSS. Se o container intermediário ocupar toda a largura, aplicar `gestao-container` ao container externo de conteúdo e deixar a grade interna sem largura duplicada.

## Estilos, script e fontes

- Inserir [styles.css](styles.css) no local permitido pelo projeto. O wrapper isola todos os seletores.
- Inserir [script.js](script.js) uma única vez por página, após os fragmentos ou via carregador com defer. Grade e FAQ funcionam sem JavaScript.
- Carregar Montserrat 600/700/800 e Inter 400/500/600/700/800 pelo Elementor ou pelo tema; não duplicar importações.
- Não colar o HTML completo do preview ou `preview.css` no Elementor. Header e footer são fornecidos pelo site.
- Usar IDs únicos como nos fragmentos; âncoras de informações apontam para `#administracao-inscricao`.

## Form widget nativo

Nome sugerido: `gestao_administracao`. Campos com labels visíveis: `nome`, `email`, `whatsapp`, `ingresso`. Opções: Vestibular, Segunda graduação, Quero orientação. Campo oculto: `curso = Administração`. Os quatro campos do preview são obrigatórios; confirmar a obrigatoriedade operacional antes de publicar.

Botão: **Quero receber informações**.

Mensagem após sucesso real: **Recebemos sua solicitação. Nossa equipe entrará em contato para orientar você sobre o curso.**

Configurar ações nativas, destinatário de e-mail e eventual CRM somente na operação autorizada. Definir consentimento, aviso de privacidade e link institucional conforme a política vigente. Não colar o formulário demonstrativo de `index.html`: o widget nativo ocupa esse espaço.

## Mídia e ações

As URLs públicas das imagens são referências do dossiê, sem download. Validar enquadramento e substituir pelas URLs aprovadas da Biblioteca de Mídia na montagem. Docentes não usam retratos com identidade pendente.

O painel claro de salários já está em `widget-before-form.html`, após atuação profissional; [salary-panel.html](salary-panel.html) é o fragmento isolado, para uso alternativo sem duplicar o bloco. Conteúdo em [salarios.md](../../copy/salarios.md), reproduzido do protótipo por solicitação do usuário; confirmação das fontes e períodos antes da publicação permanece pendente.

- Inscrição: [https://typechat.phorte.org.br/phorte-administracao](https://typechat.phorte.org.br/phorte-administracao).
- Segunda graduação: [https://typechat.phorte.org.br/phorte-adm-segunda](https://typechat.phorte.org.br/phorte-adm-segunda).
- Contato: `#administracao-inscricao`.

## Atualização

Editar [copy.md](../../copy/copy.md) e as fontes comuns; executar `python scripts/build-lps-gestao.py` a partir da raiz do repositório para regenerar os quatro pacotes. Ajustes manuais nos arquivos gerados serão sobrescritos.

Revisão prevista: desktop/mobile, grade/FAQ por teclado, CTA fixo, formulário nativo, destinos e aprovação acadêmica/comercial antes da publicação. Esta geração não executa testes ou publica arquivos.
