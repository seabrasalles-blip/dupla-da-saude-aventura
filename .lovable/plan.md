# Adicionar "Decorative board trail" na tela inicial

Vou portar o elemento decorativo do projeto `nina-cuida-bem` para a `Capa` em `src/routes/index.tsx`, mantendo o layout, cores, imagens da Nina/Nino e botões atuais intactos.

## O que é o elemento

Uma trilha decorativa em SVG sobreposta ao fundo, formada por:
- Um caminho ondulado tracejado em amarelo (`#ffd93d`) atravessando a parte inferior.
- 6 "casas" do tabuleiro: círculos coloridos alternando azul (`#3fa9f5`), verde (`#7ed957`) e o último laranja (`#ff8c42`), com borda branca e sombra suave.

## Alteração

Em `src/routes/index.tsx`, dentro do container `relative w-full h-full overflow-hidden`, adicionar — logo após os ícones decorativos (🧼🪥…) e antes do bloco `absolute inset-0 flex flex-col…` — um `<svg>` com:

- `viewBox="0 0 1200 675"`, `className="absolute inset-0 w-full h-full pointer-events-none"`.
- `<path>` tracejado (`strokeDasharray="4 18"`, `opacity="0.55"`) com `d="M -20 540 Q 200 460 380 520 T 760 500 T 1180 460"`.
- 6 grupos `<g>` com sombra (círculo escuro `opacity=0.12`) + círculo colorido com `stroke="#fff" strokeWidth="4"`, nas posições `[120,530] [320,510] [520,510] [720,498] [920,480] [1100,466]`.

Por estar posicionado entre os ícones de fundo e o conteúdo central (texto/botões/Nina/Nino), a trilha fica visualmente atrás dos personagens e não interfere com cliques (`pointer-events-none`).

## Não será alterado

- Cores, tipografia, gradiente de fundo.
- Imagens e posições da Nina e do Nino.
- Títulos, parágrafos e botões "Jogar" / "Como jogar".
- Demais rotas (`/jogar`, `/como-jogar`) e lógica do jogo.
