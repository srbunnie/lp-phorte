# Revisão de segurança antes do commit

Antes de adicionar ou enviar qualquer arquivo para este repositório, faça uma revisão de variáveis de ambiente e valores hardcoded.

## Checklist obrigatório

- Não incluir arquivos `.env`, `.env.*`, chaves privadas, certificados ou arquivos de configuração local.
- Não incluir senhas, tokens, API keys, webhooks, cookies ou credenciais de serviços.
- Não incluir dados pessoais reais de leads, alunos, stakeholders ou usuários.
- Conferir HTML, CSS, JavaScript, JSON, YAML, Markdown e nomes de arquivos em busca de segredos.
- Usar valores fictícios ou placeholders, como `SEU_TOKEN_AQUI`, nos protótipos.
- Se um segredo aparecer, removê-lo do arquivo e avisar a equipe; se já tiver sido enviado, revogá-lo imediatamente.

## Verificação local

Na raiz do repositório, execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-sensitive-data.ps1
```

O script retorna erro quando encontra arquivos sensíveis ou padrões suspeitos. A revisão manual continua obrigatória: ferramentas automáticas podem gerar falsos positivos e não identificam todos os tipos de segredo.

Não faça `git add` ou `git push` enquanto a verificação apresentar ocorrências não justificadas.
