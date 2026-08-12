---
name: preparar-commit-phorte
description: Prepare e publique commits do repositório estático Phorte e USCS com validação de segurança, escopo explícito, mensagem clara e push controlado. Use somente quando o usuário autorizar commit, push ou sincronização no GitHub.
---

# Preparar commit Phorte

Nunca crie commit ou faça push apenas porque há alterações pendentes. Exija autorização explícita do usuário no turno atual.

## Fluxo obrigatório

1. Execute `git status --short --branch`, `git diff --stat` e revise o diff.
2. Confirme que o escopo pertence ao pedido e que não há arquivos incidentais.
3. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\check-sensitive-data.ps1`.
4. Pare se houver segredo, dado pessoal, `.env`, chave, token ou arquivo sensível sem justificativa.
5. Execute validações relevantes: `git diff --check`, links do índice e verificação estática disponível.
6. Faça `git add` somente dos arquivos aprovados.
7. Crie uma mensagem curta e descritiva, no padrão `tipo: descrição`.
8. Confira o commit criado e faça `git push -u origin <branch>` somente se o usuário também autorizou o envio.
9. Informe commit, branch, resultado das validações e status final.

## Regras

- Preserve alterações não relacionadas; nunca use `git add -A` em worktree misto sem revisar.
- Não use reset destrutivo, force push ou sobrescrita remota.
- A branch padrão é `main`; mudanças grandes devem preferir branch própria e Pull Request.
- Este repositório publica objetos estáticos; confirme `.nojekyll` e o GitHub Pages quando o pedido envolver publicação.
- Se a revisão reprovar, não faça commit nem push.
