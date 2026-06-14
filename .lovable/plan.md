# Redesign da tela final "Missão cumprida, Dupla da Saúde!"

Arquivo único: `src/routes/jogar.tsx` — função `FinalScreen` (linhas 185–242).

## Mudanças

### 1. Cabeçalho (mantém Nina + título + Nino)
- Reduzir Nina/Nino de `h-40` para `h-32` para abrir espaço vertical.
- Título permanece: "Missão cumprida, Dupla da Saúde!" (`text-3xl` para caber melhor).
- Texto de fechamento mais curto:
  > "Vocês ajudaram Nina e Nino a completar a missão! Agora já sabem que cuidar do corpo, da água, dos alimentos e do ambiente ajuda a proteger a saúde."
- Aumentar para `text-sm leading-snug`.

### 2. Conquista em destaque
- Substituir o `text-xs text-slate-500` por um badge centralizado acima da grade:
  - `🏅 Selos conquistados: {seals.length} de 14`
  - Estilo: pílula `bg-amber-100 border-2 border-amber-400 text-amber-800 font-black px-4 py-1 rounded-full`.

### 3. Cartaz como grade de selos (4 colunas × 4 linhas = 14 cards + título)
- Trocar o `<ul>` por `<div className="grid grid-cols-4 gap-2">`.
- Cada selo é um card: fundo claro (`bg-white`), borda arredondada (`rounded-xl border-2`), cor de borda alternando suavemente por categoria (higiene=sky, alimentos/água=emerald, ambiente=amber, prevenção=violet), ícone grande (emoji `text-2xl`), título curto em `text-sm font-bold`, frase em `text-[11px] text-slate-600 leading-tight`.
- Container do cartaz: `bg-violet-50 border-4 border-violet-400 rounded-2xl p-3 shadow-xl max-w-5xl`.
- Título do cartaz: "Cartaz dos Cuidados com a Saúde" `text-base font-black text-violet-800 mb-2 text-center`.

Selos (14, com ícone + título + frase curta):

| Ícone | Título | Frase |
|---|---|---|
| 🧼 | Mãos limpas | Água e sabonete. |
| 🪥 | Dentes cuidados | Escovar todos os dias. |
| 🛁 | Banho e roupa limpa | Cuidar do corpo. |
| 💧 | Água segura | Tratada, filtrada ou fervida. |
| 🥬 | Alimentos lavados | Frutas e verduras limpas. |
| 👟 | Calçados | Protegem os pés. |
| 🗑️ | Lixo no lugar certo | Ambiente mais limpo. |
| ⚠️ | Longe de riscos | Esgoto, lixo, água suja. |
| 🙋 | Avise um adulto | Peça ajuda quando precisar. |
| 🚫 | Higiene é pessoal | Não compartilhe escova. |
| 🤧 | Lenço no nariz | Use e jogue no lixo. |
| 💪 | Espirro cuidadoso | Cubra com o braço. |
| 💉 | Vacinas em dia | Protegem a saúde. |
| 🩺 | Médico e dentista | Cuidado e prevenção. |

### 4. Botões (mantidos, levemente maiores)
- "Jogar novamente" e "Voltar ao início" continuam ao final, `px-7 py-2.5 text-base`.

### 5. Layout
- Remover `overflow-auto` — a grade compacta caberá em 1200×675.
- Manter `flex flex-col items-center justify-center h-full` com `px-8` e `gap-3` entre seções.

## Fora de escopo
- Imagens de Nina e Nino não são alteradas (apenas altura ajustada).
- Nenhuma alteração em outros arquivos, lógica de jogo, ou em `seals`.
