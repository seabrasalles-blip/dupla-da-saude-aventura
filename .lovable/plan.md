# Correção: tela em branco ao arrastar o personagem

## Causa

Em `src/routes/jogar.tsx`, o `GameScreen` só é renderizado para as fases `playing`, `moving`, `card` e `rolling`:

```tsx
{(phase === "playing" || phase === "moving" || phase === "card" || phase === "rolling") && (
  <GameScreen />
)}
```

Mas, na última iteração, foi introduzida a fase `landing` (personagem aparece na casa com bounce antes do card abrir). Como `landing` não está na lista, ao soltar o personagem na casa correta a tela fica totalmente vazia (só o gradiente do fundo) — exatamente o que aparece no print.

A "tela inicial" some pelo mesmo motivo logo após o primeiro movimento, porque a fase nunca volta para `playing` enquanto o usuário está preso em `landing`.

## Correção

Em `src/routes/jogar.tsx`, incluir `landing` na condição do `GameScreen`:

```tsx
{(phase === "playing" ||
  phase === "rolling" ||
  phase === "moving" ||
  phase === "landing" ||
  phase === "card") && <GameScreen />}
```

Nada mais muda: `Board.tsx` já trata a animação de bounce durante `landing` e dispara a transição para `card` após ~750 ms; `ActiveCard` continua só renderizando quando `phase === "card"`.

## Verificação

- Abrir `/jogar`, escolher personagem, ver intro e tabuleiro normalmente.
- Rolar o dado, arrastar o personagem até a casa correta: o tabuleiro permanece visível, o personagem dá o bounce na casa, e em seguida o card abre.
- Conferir que não há barra de rolagem em 1200×675.

## Arquivos afetados

- `src/routes/jogar.tsx` (1 linha na condição de renderização)
