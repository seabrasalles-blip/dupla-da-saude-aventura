## Objetivo
Eliminar a segunda tela de capa (“Missão Corpo Bem Cuidado” com botão Começar) que aparece após clicar em Jogar na tela inicial. Manter apenas a capa da home (`/`) com os botões Jogar e Como jogar.

## Mudanças

1. `src/game/store.ts`
   - Alterar a fase inicial de `"cover"` para `"intro"`.
   - Atualizar `reset()` para voltar a `"intro"` em vez de `"cover"`.
   - Remover a função `goToIntro` (não será mais usada) e manter `goToChoose` para avançar da apresentação dos personagens para a escolha de quem começa.
   - Manter `"cover"` no tipo `Phase` apenas se ainda for referenciado; caso contrário, removê-lo para evitar código morto.

2. `src/routes/jogar.tsx`
   - Remover completamente o componente `Capa` local e o bloco `{phase === "cover" && <Capa />}`.
   - Remover o import dos assets caso fiquem sem uso após a remoção (Nina/Nino ainda são usados na tela Intro e Final, então provavelmente permanecem).
   - O fluxo em `/jogar` passa a ser: `intro` (apresentação Nina e Nino) → `choose` (escolher quem começa) → `playing` (tabuleiro) → `finished`.

3. `src/routes/index.tsx`
   - Nenhuma mudança. A capa única do jogo continua sendo a home, com os botões Jogar (→ `/jogar`) e Como jogar (→ `/como-jogar`).

## Resultado esperado
- Abrir o app: tela inicial única com Jogar e Como jogar.
- Clicar em Jogar: vai direto para a apresentação de Nina e Nino, depois escolha do jogador inicial, depois tabuleiro.
- Clicar em Como jogar: abre `/como-jogar` (já existente).
- Nenhuma segunda capa com botão Começar.
- Visual, cores e imagens da tela inicial permanecem intactos.
