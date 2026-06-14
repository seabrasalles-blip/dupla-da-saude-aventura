# Casa 6 — Depois de comer doce (sequência de 5 passos)

## Objetivo
Substituir a pergunta de múltipla escolha da Casa 6 por um desafio de arrastar 5 cartões na ordem correta da escovação. O componente de sequência atual só suporta 3 slots, então precisa ser generalizado.

## Mudanças

### 1. `src/game/squares.ts` — Casa 6
Trocar o objeto atual (`kind: "question"`) por `kind: "sequence"`:

- `title`: "Depois de comer doce"
- `prompt`: "Depois de comer doce, ajude Nino a organizar os passos para cuidar dos dentes. Arraste os cartões para a ordem correta."
- `cards` (ordem correta):
  1. Pegar a escova de dentes
  2. Colocar creme dental na escova
  3. Escovar todos os dentes com cuidado
  4. Enxaguar a boca
  5. Guardar a escova no lugar certo
- `successFeedback`: "Muito bem! Depois de comer doce, escovar os dentes ajuda a retirar restos de alimentos e proteger a boca contra cáries."
- `wrongFeedbacks` (novos identificadores `when`):
  - `guardar-antes`: "Guardar a escova antes de usar não limpa os dentes. Primeiro precisamos escovar com cuidado; depois guardamos a escova."
  - `enxaguar-antes`: "Enxaguar antes pode até molhar a boca, mas não substitui a escovação. A limpeza acontece quando escovamos os dentes com atenção."
  - `escovar-sem-preparar`: "Para escovar bem, primeiro precisamos preparar a escova. Pegue a escova, coloque o creme dental e depois faça a escovação."
  - `escovar-fora-de-ordem`: "Escovar todos os dentes é a parte principal do cuidado. É esse passo que ajuda a limpar restos de alimentos e proteger a boca."

### 2. `src/components/game/ActiveCard.tsx` — `SequenceCard` genérico
Tornar o componente independente do número de cartões:

- Derivar `n = sq.cards.length` em vez de assumir 3.
- Inicializar `order` como `Array(n).fill(null)` e `pool` como um array embaralhado dos índices `0..n-1` (embaralhamento determinístico simples, ex.: rotação/inversão, para manter consistência sem dependências novas).
- Layout dos slots: trocar `grid-cols-3` por algo responsivo (`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2`) para acomodar 5 alvos sem quebrar a Casa 12 (que continua com 3).
- Substituir a lógica de `check()` atual (hardcoded para Casa 12) por um seletor que escolhe a feedback pelo `when` correspondente à infração detectada na ordem do jogador. Regras, aplicadas na ordem:
  1. Se "Guardar a escova" (índice 4) aparece antes de "Escovar todos os dentes" (índice 2) → procurar `wrongFeedbacks` com `when` em `["guardar-antes", "flush-last"]` (mantém compat com Casa 12 que usa `flush-last`).
  2. Se "Enxaguar a boca" (índice 3) aparece antes de "Escovar todos os dentes" (índice 2) → `when` em `["enxaguar-antes"]`.
  3. Se "Escovar" (índice 2) aparece antes de "Pegar a escova" (0) ou "Colocar creme dental" (1) → `when` em `["escovar-sem-preparar", "wash-first"]`.
  4. Caso contrário → primeiro item de `wrongFeedbacks` (fallback), cobrindo `escovar-fora-de-ordem` / `no-wash-end` da Casa 12.

  Implementação prática: como os identificadores `when` ficam diferentes entre Casa 6 e Casa 12, mapear por posição dos índices envolvidos (acima) e usar `wrongFeedbacks.find` com a lista de `when` aceitos por regra. Isso preserva o comportamento da Casa 12 sem mudar seus textos.

### 3. Nada mais
- Tipos em `src/game/types.ts` já permitem qualquer quantidade de `cards` e `wrongFeedbacks` — sem alterações.
- Casa 12 (que também é `sequence` com 3 cartões) continua funcionando porque a nova lógica é compatível.
- Sem mudanças de layout/estilo da tela inicial nem de outras casas.

## Resultado esperado
Na Casa 6, o jogador arrasta 5 cartões para slots numerados de 1º a 5º, recebe feedback específico para cada erro descrito e o feedback de sucesso ao acertar a ordem.
