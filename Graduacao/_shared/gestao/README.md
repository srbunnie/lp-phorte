# Componentes estáticos das LPs de gestão

Fontes comuns de [CSS](styles.css) e [JavaScript](script.js) para Administração, Marketing, Processos Gerenciais e Recursos Humanos. O [renderizador](../../../scripts/build-lps-gestao.py) lê as copys e os destinos dos respectivos dossiês, compõe os blocos e grava páginas estáticas independentes.

## Gerar

Na raiz do repositório, executar `python scripts/build-lps-gestao.py` com Python 3.9 ou posterior. Não há bibliotecas externas. O processo grava `index.html`, `preview.css`, `styles.css`, `script.js` e `implementacao/elementor/` nas quatro pastas. Não consultar serviços, instalar dependências ou enviar dados é parte do contrato do gerador.

Editar a copy do curso para mudar textos; editar o renderizador para alterar estrutura; editar os arquivos desta pasta para alterar aparência/comportamento. Regenerar as quatro páginas após mudanças. Arquivos gerados recebem o mesmo conteúdo de componentes, mas não precisam desta pasta para serem abertos.

## Contratos

- Classes e tokens começam com `gestao-`; todos os seletores do CSS são isolados por `.phorte-lp-gestao`.
- `preview.css` contém apenas o reset de margem do documento completo e não integra o pacote Elementor.
- Grade e FAQ usam `details/summary` sem depender de JavaScript.
- Painel claro de salários é incorporado após atuação profissional; [copy, fontes e estilos próprios](../salarios/README.md). O gerador agrega o CSS isolado desse componente ao CSS de cada página e pacote.
- JavaScript inicializa comportamentos por raiz; observers/listeners da barra fixa são substituídos quando o Elementor altera os fragmentos e liberados quando remove uma raiz.
- Formulário de preview não possui campos com `name`, usa `method="dialog"` e botão `type="button"`; o script apenas verifica preenchimento e mostra a mensagem demonstrativa. Não coleta, envia ou persiste valores.
- No Elementor, o formulário nativo é configurado na operação oficial. O script da LP não intercepta seu envio.
- Mídia e fontes usam URLs públicas; o preview necessita de rede para carregá-las. Não houve download de mídia. Cada dossiê mantém as referências e pendências de uso.
- Ícones são SVGs decorativos; avatares com iniciais não representam retratos validados.

Referência: [arquitetura e componentes](../../docs/arquitetura-lps-gestao.md). Estado da produção: [registro](../../docs/producao-lps-gestao.md).
