# Nova ordem de telas: Capa → Apresentação → Escolha → Jogo

## Causa

A home `/` já existe como "capa", mas quando o jogador vai para `/jogar` o fluxo começa direto na escolha de personagem. O usuário quer que `/jogar` seja autocontido na sequência:

1. Capa (título + botão "Começar")
2. Apresentação dos personagens (Nina e Nino se apresentam)
3. Escolha quem começa (Nina ou Nino)
4. Jogo (tabuleiro)

Hoje a fase inicial é `choose` e depois `intro` → `playing`.

## Mudanças

### `src/game/store.ts`
- Adicionar a fase `cover` ao tipo `Phase`.
- Trocar a fase inicial (`phase`) de `"choose"` para `"cover"`.
- Atualizar `reset()` para voltar a `"cover"`.
- Trocar `chooseStarter` para apenas definir o jogador e ir para `phase: "playing"` (a apresentação não vem mais depois da escolha).
- Trocar `startGame` por uma transição da capa para a apresentação: renomear para `goToIntro` (ou manter `startGame` mudando o destino para `"choose"`). Para minimizar alterações, vou usar dois callbacks:
  - `goToIntro()` — de `cover` para `intro`.
  - `goToChoose()` — de `intro` para `choose`.
  - `chooseStarter(p)` — de `choose` para `playing` direto.

### `src/routes/jogar.tsx`
- Renderizar `<Capa />` quando `phase === "cover"` (nova função local, simplificada — só título, subtítulo e botão "Começar"; sem duplicar a home).
- Em `Intro`, trocar o botão "Vamos jogar!" para chamar `goToChoose()` e levar a `ChooseStarter`.
- Em `ChooseStarter`, ao clicar, chamar `chooseStarter(p)` que agora vai direto ao jogo.
- Atualizar a ordem de renderização condicional.

### Conteúdo da nova Capa em `/jogar`
Reaproveitar o visual da home (gradiente, ícones decorativos, Nina/Nino, título "Nina e Nino em: Missão Corpo Bem Cuidado") com apenas um botão "Começar" que dispara `goToIntro()`. Sem link "Como jogar" (essa navegação já está na home).

## Verificação

- Ao entrar em `/jogar` aparece a Capa com título e botão Começar.
- Clicar em Começar leva à apresentação dos personagens (Nina e Nino falando).
- Clicar em "Vamos jogar!" leva à tela de escolher quem começa.
- Escolher Nina ou Nino vai direto ao tabuleiro.
- Reiniciar (botão ↻) volta para a Capa.
- Caber em 1200×675 sem rolagem.

## Arquivos afetados

- `src/game/store.ts`
- `src/routes/jogar.tsx`
