# Ajustes no jogo Nina e Nino

## 1. Personagens visíveis e arrastáveis no tabuleiro

**Problema atual:** Nina e Nino começam em `position = 0`, ou seja, em nenhuma casa do tabuleiro (casas vão de 1 a 30). Por isso eles não aparecem em lugar nenhum para serem arrastados.

**Correção:**
- Posição inicial passa a ser `1` (ambos começam na casa 1).
- Na casa 1, ambos os peões aparecem lado a lado.
- O peão do jogador da vez fica destacado (anel colorido + leve pulsar) para deixar claro quem pode ser arrastado.
- Aumentar o tamanho do peão (de 36px para ~52px) para crianças pequenas conseguirem agarrar com facilidade.
- Adicionar feedback visual ao arrastar (cursor grab/grabbing, sombra).

## 2. Tabuleiro estilo Duolingo (referência da imagem)

Em vez de quadrados coloridos numa grid, o tabuleiro passa a ser **círculos grandes conectados por uma trilha amarela pontilhada**, em formato serpentina (6 colunas × 5 linhas, alternando direção).

Visual de cada casa:
- Círculo grande (~92px) com borda branca grossa e sombra.
- Cor do círculo segue o tipo da casa:
  - Azul = Pergunta (`?`)
  - Roxo = Você sabia? (`💡`)
  - Laranja = Desafio / Alerta (`✨` ou `🔄`)
  - Laranja escuro = Selo final (`🏆`, `⭐`, `📘`, `🔗`)
- Número da casa num badge branco no canto superior direito.
- Ícone grande e amigável no centro (sem texto — o título da casa só aparece ao abrir a carta).

Trilha:
- Faixa amarela (~14px) com bolinhas brancas pontilhadas conectando o centro de cada círculo na ordem 1→30.
- Curvas suaves nas dobras da serpentina (cantos arredondados).
- Implementada com um `<svg>` absoluto atrás dos círculos (paths com `stroke-dasharray` para o efeito pontilhado).

Layout:
- Container 1200×675 mantido sem scroll.
- Tabuleiro ocupa a área principal à esquerda; coluna lateral (vez, dado, selos) continua à direita.
- Casa de destino destacada com anel amarelo pulsante e seta.

Legenda de cores removida do tabuleiro (vira mini-legenda compacta na lateral, opcional).

## 3. Dado D3 (3 faces)

A lógica já sorteia 1–3, mas o visual atual é um quadrado com número. Trocar por um **D3 real**: prisma triangular estilizado.

Implementação:
- Componente `DiceD3` desenhado em SVG/CSS mostrando um triângulo (vista frontal de um prisma de 3 faces) com o número grande no centro.
- Três estados visuais (1, 2, 3) — pode ser o mesmo triângulo com rotação leve diferente por valor para reforçar a ideia de "lados".
- Animação de "rolagem": rotaciona/balança por ~600ms antes de mostrar o resultado (mantém o `setTimeout` já existente).
- Rótulo abaixo: "Dado de 3 lados (D3)".
- Cores vivas (gradiente amarelo/laranja) com borda escura e sombra, mesma linguagem visual do tabuleiro Duolingo.

## Arquivos afetados

- `src/game/store.ts` — `positions` inicial `{ nina: 1, nino: 1 }`; ajustar `reset()` igual; revisar `movePawnTo` para considerar saída da casa 1 (chaves passadas continuam funcionando).
- `src/components/game/Board.tsx` — reescrita do layout: posicionamento absoluto dos círculos sobre um SVG de trilha; novo `Pawn` maior com destaque do turno; novo componente `DiceD3` substituindo `Dice`.
- `src/routes/jogar.tsx` — trocar import/uso de `Dice` por `DiceD3`; pequeno ajuste no painel lateral (legenda compacta de cores opcional).
- `src/game/squares.ts` — adicionar campo `icon` (emoji) por casa para o novo visual de círculo.
- `src/game/types.ts` — adicionar `icon?: string` em `BaseSquare`.

## Detalhes técnicos

- A serpentina mantém ordem 1..6, 12..7, 13..18, 24..19, 25..30 (igual à atual).
- Posições dos círculos calculadas a partir de `cols=6, rows=5`, com `cx`/`cy` derivados em px dentro do container do tabuleiro (largura ~880, altura ~600).
- Trilha SVG: um `<path>` por linha (horizontal) + um arco curto nas dobras (linhas 6↔7, 12↔13, 18↔19, 24↔25), tudo num único `<svg>` com `stroke="#FCD34D"`, `stroke-width="14"`, `stroke-linecap="round"`, segundo `<path>` por cima com `stroke="white"` e `stroke-dasharray="2 10"` para as bolinhas.
- Drag & drop nativo HTML5 continua igual; o `onDrop`/`onDragOver` vai no círculo.
- Sem novas dependências.

Posso seguir e implementar?