## Alteração

Em `src/routes/jogar.tsx`, remover o bloco `<div className="flex gap-2">` (linhas 185–201) que contém os três botões da barra lateral:
- 🔊 Som / 🔇 Mudo (`toggleSound`)
- ↻ Reiniciar (`reset`)
- 🏠 (Link para `/`)

## Limpeza

Após remover os botões, retirar do componente também os hooks/imports que ficarem sem uso (apenas se não forem usados em outro lugar do arquivo):
- `toggleSound` e `sound` do `useGame`
- `reset` do `useGame` (verificar — `FinalScreen` também usa `reset`, então o import do store permanece)
- `Link` de `@tanstack/react-router` (se não houver outro uso)

## Fora do escopo

Layout do tabuleiro, dado, selos, imagens da Nina e do Nino, mecânicas do jogo, telas `WaitingOverlay` / `FinalScreen`.
