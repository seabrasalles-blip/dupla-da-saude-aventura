## Ajuste da mensagem de espera por personagem

Alterar apenas o overlay de espera em `src/routes/jogar.tsx` (linhas 117–132) para que a mensagem mencione o nome do parceiro que ainda precisa chegar.

### Mudança

Substituir o texto fixo "espere seu amigo" por um texto dinâmico baseado em `turn` (o jogador que acabou de chegar à casa final):

- Se `turn === "nina"` → "Você chegou ao final! Agora espere **Nino** chegar para vocês montarem juntos o Cartaz dos Cuidados com a Saúde."
- Se `turn === "nino"` → "Você chegou ao final! Agora espere **Nina** chegar para vocês montarem juntos o Cartaz dos Cuidados com a Saúde."

Implementação: `const partner = turn === "nina" ? "Nino" : "Nina";` e interpolar no `<p>`.

### Fora de escopo

- Lógica de fases / store (`waiting-partner`, `continueAfterWaiting`) — já correta: atividade final só abre quando ambos chegam, aparece uma única vez, com a mensagem "Agora a Dupla da Saúde está completa! Arrastem juntos os selos..." já implementada no `FinalCard`.
- Tabuleiro, personagens, layout, dado, botão "Passar a vez" e imagem do personagem no overlay permanecem inalterados.
