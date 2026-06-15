# Casa final colaborativa: esperar a dupla para montar o Cartaz

## Objetivo

A atividade final de arrastar os selos (casa 30, `kind: "final"`) deve abrir uma única vez, quando Nina **e** Nino estiverem juntos na casa final. O primeiro a chegar fica parado na casa final, com uma mensagem de espera, e a vez passa para o outro jogador. Quando o segundo também chegar, abre o Cartaz para a dupla.

## Mudanças

### 1. `src/game/store.ts` — nova fase de espera

- Adicionar a fase `"waiting-partner"` ao tipo `Phase`.
- Adicionar action `continueAfterWaiting: () => void` que troca o turno para o outro jogador e volta para `phase: "playing"` (zera `dice`, `destination`, `activeSquare`, `activeVariantIndex`).
- Em `movePawnTo`, quando `target === 30`:
  - Atualizar `positions[turn] = 30`.
  - Se o **outro** jogador ainda não está em 30 → não abrir card: setar `phase: "waiting-partner"`, `activeSquare: null`, `activeVariantIndex: null`, `pendingKey: null`.
  - Se o outro jogador já está em 30 → abrir o card final normalmente (comportamento atual: `activeSquare: 30`, `phase: "landing"`).
- Em `closeCardAndProceed`, no ramo `pendingKey !== null` em que o `target` resolve para 30 sem mais keys intermediárias, aplicar a mesma bifurcação acima em vez de sempre abrir o card.
- O ramo final de `closeCardAndProceed` (quando ambos `>= 30`) continua transicionando para `phase: "finished"` — esse caminho só será atingido pela conclusão real do `FinalCard` do segundo jogador.

### 2. `src/routes/jogar.tsx` — tela de espera

- Incluir `phase === "waiting-partner"` na lista de fases que renderizam `<GameScreen />` (para manter tabuleiro, dado e personagens visíveis).
- Em `GameScreen`, quando `phase === "waiting-partner"`, sobrepor um cartão central (sobre o tabuleiro, sem alterar layout) com:
  - Imagem do personagem que chegou (`turn`).
  - Texto: **"Você chegou ao final! Agora espere seu amigo chegar para vocês montarem juntos o Cartaz dos Cuidados com a Saúde."**
  - Botão "Passar a vez" que chama `continueAfterWaiting()`.
- No painel lateral, desabilitar o dado durante `waiting-partner` (já é natural pois `phase !== "playing"`).

### 3. `src/components/game/ActiveCard.tsx` — mensagem da atividade final

- No `FinalCard`, substituir/antepor o `sq.prompt` por:
  **"Agora a Dupla da Saúde está completa! Arrastem juntos os selos para montar o Cartaz dos Cuidados com a Saúde."**
- Mostrar as imagens da Nina e do Nino lado a lado no topo do card, reforçando a dupla (sem mexer em mais nada da mecânica de drag).
- Ao concluir (`allDone`) e clicar em Continuar, o `closeCardAndProceed` atual já detecta `nina >= 30 && nino >= 30` e vai para `phase: "finished"` → tela "Missão cumprida". Sem mudança nesse caminho.

## Fora do escopo

- Layout do tabuleiro, dado, painel lateral, imagens de Nina/Nino, mecânica de arrastar peões, telas Intro/Choose/Final, design da tela "Missão cumprida".
