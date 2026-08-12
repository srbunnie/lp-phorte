---
name: revisar-prototipos-phorte
description: Revise protótipos estáticos Phorte e USCS quanto a segurança, links, estrutura, status, acessibilidade básica e documentação antes de compartilhar ou publicar. Use quando pedirem revisão, auditoria, conferência, preparação ou documentação dos projetos deste repositório.
---

# Revisar protótipos Phorte

Faça uma revisão somente leitura antes de qualquer commit ou push, salvo autorização explícita para corrigir arquivos.

## Fluxo

1. Verifique `git status`, o diff e os arquivos novos. Identifique o escopo e não misture alterações externas.
2. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\check-sensitive-data.ps1`.
3. Procure `.env`, chaves privadas, tokens, senhas, cookies, dados pessoais, URLs internas e referências MCP/API.
4. Confira links relativos do `index.html` central e dos índices dos projetos; sinalize links quebrados.
5. Revise a estrutura dos projetos por categoria (`Graduacao`, `Pos`, `USCS`) e confirme que os objetos são estáticos.
6. Confira o índice: categorias, cores, acordeões, prioridade, status e subprojetos.
7. Faça uma checagem visual ou de navegador quando disponível, incluindo desktop e mobile.
8. Registre achados por severidade: bloqueador, alto, médio, baixo ou observação.

## Regras do projeto

- O repositório contém somente protótipos e objetos estáticos para stakeholders.
- Não aceitar backend, banco, credencial, dado real ou integração de produção.
- Estados válidos: `Solicitado`, `Em andamento`, `Concluído`, `Pausado` e `Cancelado`.
- Projetos em acompanhamento aparecem antes dos concluídos; prioridades devem ser explícitas.
- Não fazer commit ou push durante a revisão.

## Entrega

Informe arquivos e linhas quando possível, riscos encontrados, validações executadas e pendências. Se houver segredo ou dado pessoal, interrompa a publicação e recomende remoção/revogação.
