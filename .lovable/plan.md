# Ajustes na tela "A Dupla da Saúde" (componente `Intro` em `src/routes/jogar.tsx`, linhas 65–96)

Sem mexer no layout geral (posições, imagens da Nina e Nino, cores, botão "Vamos jogar!"), atualizar somente os balões de fala e o texto explicativo central.

## Alterações

1. **Balões de fala da Nina e do Nino** (`<div className="rounded-2xl bg-orange-100 ...">` e `bg-sky-100`):
   - Fonte: `text-sm` → `text-[18px]` com `leading-relaxed`.
   - Padding: `p-3` → `p-5`.
   - Largura: adicionar `max-w-sm` e `flex-1` para alargar o balão dentro da coluna.
   - Altura: garantir altura automática usando `min-h-[110px]` (não definir `height` fixa — hoje não há, manter assim).
   - Manter `mb-2`, bordas e cores atuais.

2. **Texto explicativo central** (`<p className="mt-4 text-center text-slate-700 max-w-2xl">`):
   - Aumentar para `text-lg leading-relaxed` e `mt-6`.
   - Manter `max-w-2xl` e cor.

3. **Container** (`<div className="flex flex-col items-center justify-center h-full px-12">`):
   - Sem alterações estruturais. Se necessário, reduzir `mb-6` do título para `mb-4` para evitar barra de rolagem dentro dos 675px de altura fixa.

## Não alterar

- Tamanho das imagens da Nina/Nino (`h-44`).
- Cores dos balões (laranja/azul) e do fundo.
- Botão "Vamos jogar!".
- Demais telas (Capa, Como jogar, GameScreen).
