# Ajustes: variações de cards, novos conteúdos, dado D6 (1–4) e destino oculto

Mantém layout 1200×675, tabuleiro Duolingo, personagens, drag-and-drop, e os fluxos do `ActiveCard` atuais. As mudanças são de **dados/conteúdo** e dois pequenos ajustes de UI/mecânica.

## 1. Banco de variações por casa (anti-repetição)

Cada casa interativa (kinds: `question`, `drag`, `classify`, `sequence`, `alert`, `didyouknow`, `final`) passa a ter **uma ou mais variações** do mesmo tipo.

### Estrutura

- `src/game/squares.ts` deixa de exportar `SQUARES: SquareData[]` e passa a exportar `SQUARE_VARIANTS: SquareVariant[][]` onde `SQUARE_VARIANTS[n-1]` é a lista de variações daquela casa.
- Cada variação compartilha `n`, `title`, `color` (definidos no header da casa) e tem seu próprio corpo (`kind`, `prompt`, `options`, `successFeedback`, etc.).
- Casas atuais ganham pelo menos 1 variação adicional onde fizer sentido (foco nas casas de pergunta/desafio mais usadas: 1, 2, 4, 7, 10, 11, 13, 14, 16, 17, 20, 22, 24, 28). Casas-chave “Você sabia?” (3, 5, 12, 15, 19, 23, 26) também ganham variantes.
- Compatibilidade: um helper `getSquareHeader(n)` devolve `{ n, title, color }` para o `Board` continuar funcionando sem mudanças.

### Seleção em runtime (store)

- Novo estado em `useGame`:
  - `usedCardsByHouse: Record<number, number[]>` — índices de variações já usadas naquela casa.
  - `activeVariantIndex: number | null` — variante aberta no momento (para o `ActiveCard` ler).
- Novo seletor `getActiveSquare()` que devolve a variação correta combinando header + corpo.
- Ao abrir um card (em `movePawnTo` e `closeCardAndProceed` quando há `pendingKey`), o store:
  1. Lê `variants = SQUARE_VARIANTS[n-1]`.
  2. Filtra os índices ainda não usados.
  3. Se a lista filtrada está vazia, **reseta** `usedCardsByHouse[n] = []` e usa todos novamente.
  4. Escolhe o próximo índice de forma determinística (primeiro não usado) — garante ordem A → B → C entre jogadores.
  5. Marca como usado e grava `activeVariantIndex`.
- `reset()` zera `usedCardsByHouse` e `activeVariantIndex`.
- `ActiveCard.tsx` passa a ler `useGame(s => s.getActiveSquare())` em vez de indexar `SQUARES` direto.

Importante: nada disso altera movimentação, dado ou drag-and-drop.

## 2. Novos conteúdos

Adicionar as variações descritas na mensagem:

### Cards de pergunta novos (distribuídos como variantes de casas existentes)
- **Assoar o nariz** (3 alternativas) → variante extra da casa 1 ou 4.
- **Depois de assoar o nariz** → variante extra da casa 2 ou 7.
- **Espirro cuidadoso** → variante extra da casa 10 ou 11.
- **Tosse e cuidado com os outros** → variante extra da casa 13 ou 14.

Cada uma com os 3 feedbacks específicos por alternativa (incluindo o de acerto), exatamente como no texto enviado.

### Cards “Você sabia?” novos (com selo)
- **Vacinas ajudam a proteger** → selo `vacina-em-dia`.
- **Por que ir ao médico?** → selo `cuidado-medico`.
- **Por que ir ao dentista?** → selo `dentista-amigo`.
- **Saúde não é só quando estamos doentes** → selo `prevencao`.

Distribuídos como variantes adicionais das casas-chave existentes (3, 5, 12, 15, 19, 23). Assim, quando o segundo jogador cair numa casa-chave, vê um “Você sabia?” diferente do primeiro e ainda pode conquistar selos novos.

### Selos adicionais (sem necessariamente vincular a card específico nesta rodada)
- `nariz-limpo` → premiado ao acertar o card “Assoar o nariz” OU “Depois de assoar o nariz”.
- `espirro-cuidadoso` → premiado ao acertar “Espirro cuidadoso” OU “Tosse e cuidado”.

Total de selos: **14**.

### Atualizações em tipos
- `src/game/types.ts`:
  - `SealId` ganha: `"vacina-em-dia" | "cuidado-medico" | "dentista-amigo" | "prevencao" | "nariz-limpo" | "espirro-cuidadoso"`.
  - `SEAL_LABELS` ganha os rótulos correspondentes.
  - `QuestionOption` ganha campo opcional `awardSeal?: SealId` para permitir que perguntas premiem selos (usado nos cards de nariz/espirro). `ActiveCard` chama `awardSeal` ao acertar.

### Cartaz final (`jogar.tsx` → `FinalScreen`)
- Lista de cuidados expandida com 4 novas linhas:
  - “Usar lenço para assoar o nariz e jogar no lixo, depois lavar as mãos.”
  - “Cobrir nariz e boca com o braço dobrado ao espirrar ou tossir.”
  - “Manter as vacinas em dia.”
  - “Visitar médico e dentista para prevenir, não só quando estamos doentes.”
- Texto “Selos conquistados: X/8” passa a `X/14`.

## 3. Dado: voltar para D6 com resultado 1–4

- Em `useGame.rollDice`: `1 + Math.floor(Math.random() * 4)` (1–4).
- Em `Board.tsx`:
  - Renomear `DiceD3` para `DiceD6` (manter `export const Dice = DiceD6` para o `jogar.tsx`).
  - Trocar o SVG triangular por um **cubo** (face frontal + faces superior/lateral em perspectiva isométrica leve) com pontos (pips) representando o valor 1, 2, 3 ou 4. Pode-se também manter o número grande no centro da face para crianças pequenas.
  - Rótulo abaixo: “Dado · 1 a 4”.
  - Animação de roll continua (spin 600ms + `setTimeout` do `onClick`).

## 4. Esconder pistas de destino

Mantém o destino calculado internamente (a lógica de validação `movePawnTo` continua igual), mas a criança não vê mais onde soltar:

- Em `Board.tsx`: remover o anel pulsante `ring-8` e a seta `⬇️` da casa de destino quando `phase === "moving"`.
- Em `jogar.tsx` (painel lateral): remover a caixa “Arraste {Nina/Nino} até a casa N”.
- Feedback de erro (“Ops! Essa não é a casa sorteada…”) continua, agora reformulado para: **“Conte as casas a partir da sua posição. O valor do dado foi N. Tente arrastar até a casa certa.”** — assim a criança aprende a contar sem receber a resposta pronta.

## 5. Garantir que o personagem aparece antes do card

Comportamento atual: ao soltar na casa, o store entra em `phase: "card"` e o `ActiveCard` abre imediatamente. A regra pede um pequeno “respiro” para a criança ver o personagem na casa nova antes do card.

- Em `store.movePawnTo` e `closeCardAndProceed`, em vez de setar `phase: "card"` direto, setar `phase: "landing"` (nova fase) com a posição já atualizada e `activeSquare` definido.
- Em `Board.tsx`: ao detectar `phase === "landing"`, animar levemente o peão (bounce de ~700 ms) e então `setTimeout` chama `useGame.getState().setPhase("card")`.
- `ActiveCard` só renderiza quando `phase === "card"`.
- Isso garante o efeito visual sem alterar nenhuma regra do jogo.

## Arquivos afetados

- `src/game/types.ts` — novos `SealId`s, rótulos, `awardSeal?` em `QuestionOption`, novo tipo `SquareHeader` / `SquareVariant`.
- `src/game/squares.ts` — refatorar para `SQUARE_VARIANTS`, adicionar novas variantes e novos cards “Você sabia?”.
- `src/game/store.ts` — `usedCardsByHouse`, `activeVariantIndex`, `getActiveSquare()`, fase `landing`, dado 1–4, reset.
- `src/components/game/Board.tsx` — DiceD6 (1–4), remover destaque/seta de destino, animação de landing.
- `src/components/game/ActiveCard.tsx` — usar `getActiveSquare()` em vez de `SQUARES[n-1]`; respeitar `awardSeal` em `QuestionOption`.
- `src/routes/jogar.tsx` — remover dica de destino, mensagem reformulada de erro, cartaz final com 14 selos, contador `X/14`.

## Fora do escopo (não mexer)

- Imagens de Nina e Nino (intocadas).
- Tabuleiro visual e trilha amarela.
- Mecânica de drag-and-drop nativa.
- Layout 1200×675 sem scroll.
- Casas-chave continuam abrindo ao passar por elas.

Posso seguir?