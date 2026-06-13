
# Nina e Nino em: Missão Corpo Bem Cuidado

Jogo digital de tabuleiro colaborativo para 2 jogadores (Nina e Nino), com 30 casas, dado de 1–3, arrastar personagem, feedbacks pedagógicos específicos e Cartaz final dos Cuidados com a Saúde.

## Telas

1. **Capa** — título, subtítulo, Nina e Nino, botões Jogar / Como jogar / Som.
2. **Como jogar** — regras visuais em 5 passos.
3. **Escolha do jogador inicial** — Nina ou Nino começa.
4. **Apresentação da missão** — falas da Nina e do Nino + texto de mediação.
5. **Tabuleiro principal** — 30 casas coloridas por tipo, dado 3D (1–3), turno indicado, contador de selos, pinos arrastáveis.
6. **Carta de casa** (modal sobreposto) — renderiza Pergunta / Desafio / Você sabia? / Alerta / Selo conforme tipo.
7. **Tela final** — Cartaz dos Cuidados montado, Nina e Nino lado a lado, botões Jogar novamente / Ver cartaz / Voltar ao início.

## Mecânica do turno

```text
[Vez do jogador] -> clica no dado -> sorteia 1, 2 ou 3
   -> casa de destino destacada (contorno brilhante, animação, número grande, seta)
   -> instrução "Arraste a Nina até a casa X"
   -> só o pino da vez é arrastável
   -> soltar na casa certa  -> abre a carta da casa
   -> soltar em casa errada -> volta pra casa anterior + dica de navegação
   -> ao passar por casa-chave durante o trajeto, abre carta da casa-chave antes
   -> resolver desafio: acerto avança, erro mostra feedback específico + "Tentar novamente"
   -> selos conquistados vão pro contador
   -> passa a vez
```

Casas-chave (abrem ao cair OU ao passar): 3, 5, 12, 15, 19, 23, 26.

## Tipos de casa (componentes de carta)

- **Pergunta** (verde) — 3 alternativas, feedback específico por alternativa errada.
- **Desafio** (amarelo) — arrastar itens, classificar em grupos, ou ordenar sequência.
- **Você sabia?** (azul) — texto + microação de tocar no selo.
- **Alerta** (laranja) — situação de risco, 3 escolhas com feedback específico.
- **Selo** (roxo) — conquista para o cartaz.

Todos os 30 enunciados, alternativas e feedbacks do briefing são incluídos literalmente em um arquivo de dados (`src/game/squares.ts`).

## Selos (8 no total)

Mãos limpas · Dentes bem cuidados · Água segura · Alimentos lavados · Corpo protegido · Ambiente saudável · Quintal cuidado · Objeto pessoal.

A casa 30 é o desafio final de montar o Cartaz arrastando os 8 selos corretos (e rejeitando ações incorretas), com feedback pedagógico.

## Personagens (assets do usuário)

- `nino.png` e `nina.png` enviados via upload viram assets via `lovable-assets` (sem redesenhar, sem filtros, só redimensionar/posicionar/sombra leve).
- Aparecem em: capa, apresentação, tabuleiro (como pinos arrastáveis), feedbacks, tela final.

## Regras pedagógicas

- Feedback de acerto explica o porquê.
- Cada alternativa errada tem feedback próprio explicando por que não protege a saúde.
- Botão "Tentar novamente" após erro; só avança após acerto (ou após 2ª tentativa com explicação).
- Linguagem acolhedora, sem culpa.
- Erro de navegação (soltar na casa errada) tem feedback separado e não conta como erro pedagógico.

## Layout

- Container fixo 1200×675, sem rolagem.
- Tabuleiro ocupa a área principal; coluna lateral com dado, turno, selos, som, reiniciar.
- Cartas abrem em modal sobre o tabuleiro.

## Detalhes técnicos

- Stack: TanStack Start já configurada, React 19, Tailwind v4, shadcn/ui.
- Rotas (file-based em `src/routes/`):
  - `index.tsx` — capa
  - `como-jogar.tsx`
  - `jogar.tsx` — escolha + apresentação + tabuleiro + final (controlado por estado de fase para evitar reset; tudo client-side, sem backend).
- Estado do jogo via Zustand (`src/game/store.ts`): `turn`, `positions`, `seals`, `phase`, `pendingDestination`, `seenKeySquares`, `diceValue`.
- Dados das 30 casas em `src/game/squares.ts` (tipado por união discriminada).
- Componentes:
  - `Board` (grid 30 casas serpenteado), `Square`, `Pawn` (drag), `Dice3D` (CSS 3D, sorteia 1–3), `TurnIndicator`, `SealTray`.
  - Cartas: `QuestionCard`, `DragChallengeCard`, `ClassifyCard`, `SequenceCard`, `DidYouKnowCard`, `AlertCard`, `SealCard`, `FinalPosterCard`.
- Drag & drop: HTML5 DnD nativo para pinos e itens das cartas (sem libs externas).
- Animações via Tailwind/CSS (destaque da casa, dado 3D, transições suaves). Sem dependências novas.
- Som: alternável (placeholder mute/unmute; sons opcionais leves se houver).
- Sem Lovable Cloud (jogo é totalmente local; estado em memória, opcional persistir progresso por sessão no localStorage).
- SEO: title/description únicos por rota; H1 na capa.

## Entregáveis

- Implementação completa das 7 telas e dos 30 desafios com textos e feedbacks do briefing.
- Personagens preservados como assets.
- Tela 1200×675 sem rolagem.
- Casas-chave abrem mesmo ao passar pelo trajeto.

Posso seguir e implementar?
