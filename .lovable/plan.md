# Ajustes de aleatoriedade e cor neutra no Cartaz

## Problemas relatados
1. Em perguntas de múltipla escolha (`question`/`alert`), a resposta correta quase sempre fica na letra **A**.
2. No desafio de sequência (Casa 6), os cartões já aparecem na ordem correta.
3. Nas atividades de arrastar (`drag`) e classificar (`classify`), os itens corretos aparecem antes dos errados, denunciando a resposta.
4. Na atividade final (Cartaz dos Cuidados), os selos corretos vêm em **amarelo/dourado** e as ações erradas em **vermelho**, o que entrega visualmente qual é a resposta correta.

## O que vai mudar (apenas em `src/components/game/ActiveCard.tsx`)

Todos os ajustes ficam no componente de renderização — os dados em `src/game/squares.ts` não serão alterados, então o conteúdo educacional, feedbacks e gabaritos permanecem iguais.

### 1. Helper de embaralhamento
Adicionar uma função `shuffle()` (Fisher–Yates) e usá-la dentro de `useMemo(..., [sq])` em cada card, para que a ordem seja sorteada **uma vez por abertura da casa** (não muda a cada re-render, evitando que o card "pule" enquanto o aluno pensa).

### 2. `QuestionCard` (perguntas e alertas)
- Calcular `order = useMemo(() => shuffle(sq.options.map((_,i)=>i)), [sq])`.
- Renderizar `order.map(i => sq.options[i])` e usar o índice embaralhado tanto para exibir A/B/C quanto para checar `correct` e `feedback`.
- Resultado: a alternativa correta cai aleatoriamente em A, B ou C a cada partida.

### 3. `DragCard` e `ClassifyCard`
- Embaralhar a lista de itens exibidos (`sq.items`) via `useMemo`, mantendo o mapeamento original para feedback e validação.
- Itens corretos e errados ficam misturados na origem.

### 4. `SequenceCard` (Casa 6 e Casa 12)
- O componente já tinha um "shuffle determinístico" (reverse + swap), que ainda pode coincidir com a ordem original em alguns casos. Trocar por `shuffle()` real com `useMemo`, garantindo que **nunca** seja igual à ordem correta (se sortear igual, sortear de novo).

### 5. `FinalCard` (Cartaz dos Cuidados) — cor única
- Remover o `if (it.correct) ... else ...` que aplica `bg-amber-200/border-amber-500` vs `bg-rose-100/border-rose-400` nos cartões arrastáveis.
- Aplicar **uma única cor neutra** para todos os itens (ex.: `bg-white border-slate-400 text-slate-800`), e remover também o emoji 🏅 que só aparece nos corretos.
- A área de soltar (Cartaz) e os selos **já colocados** podem continuar dourados — isso é feedback de acerto, não dica prévia.
- Embaralhar também a lista `visible` no `FinalCard` para que corretos/errados não saiam agrupados.

## O que NÃO muda
- Conteúdo, textos, feedbacks, selos, regras de pontuação.
- Layout geral, cores do tabuleiro, tipografia, fluxo do jogo.
- Arquivo `src/game/squares.ts`.

## Verificação
Abrir uma casa de pergunta várias vezes no preview e conferir que a alternativa correta aparece em posições diferentes; abrir a Casa 6 e ver os 5 cartões fora de ordem; abrir o Cartaz final e confirmar que todos os itens arrastáveis têm a mesma cor neutra.
