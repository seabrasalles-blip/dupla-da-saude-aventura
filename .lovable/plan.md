## Objetivo
Na tela do tabuleiro, substituir todas as cores marrons/âmbar do dado pelo verde esmeralda usado nos botões principais do jogo. Manter formato, tamanho, posição e o restante do layout intactos.

## Arquivo alterado
`src/components/game/Board.tsx` — somente o componente `DiceD6` (placeholder do dado) e `DieFace` (face com pontinhos). Nada mais é tocado: tabuleiro, casas, Nina e Nino permanecem iguais.

## Mudanças

1. **Placeholder do dado (linha 289)** — quando ainda não há valor / está girando:
   - `bg-amber-100` → `bg-emerald-50`
   - `border-amber-900` → `border-emerald-600`
   - `text-amber-900` → `text-emerald-700`
   - O ícone 🎲 fica como está (emoji), apenas a moldura/cor do texto muda para esmeralda.

2. **Face do dado com pontinhos (`DieFace`, linhas 228–253)**:
   - Gradiente de fundo `#fffbeb → #fde68a` → `#ecfdf5 → #a7f3d0` (tons claros de esmeralda) para manter contraste com os pontinhos.
   - `stroke="#7c2d12"` (borda marrom) → `stroke="#047857"` (emerald-700).
   - `fill="#7c2d12"` dos pontinhos → `fill="#047857"` (emerald-700).

## Fora de escopo
- Layout, tamanho (74×74) e posicionamento do dado.
- Rótulo "Dado · 1 a 4" (continua slate).
- Caixa "Você tirou…" em âmbar no `jogar.tsx` (não faz parte do dado em si).
- Imagens de Nina e Nino, casas do tabuleiro, demais cores da tela.
