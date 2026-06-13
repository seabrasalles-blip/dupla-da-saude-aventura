Plano para corrigir o problema das cartas repetidas e completar os conteúdos enviados:

1. Corrigir a lógica anti-repetição
- Ajustar a seleção de variantes para cada casa manter uma fila/ciclo correto por casa durante a partida.
- Garantir que, quando Nina e Nino caírem na mesma casa, o jogo mostre Card 1, depois Card 2, depois Card 3 antes de repetir.
- Remover qualquer lógica que marque casas-chave como “já vistas” de uma forma que impeça a variação correta dos cards “Você sabia?”.

2. Completar os bancos de variações por casa
- Expandir as casas de pergunta, desafio, alerta e “Você sabia?” para terem mais variações úteis, não apenas uma variação extra em poucas casas.
- Incorporar explicitamente todos os conteúdos enviados:
  - Assoar o nariz com papel ou lenço.
  - Jogar papel usado no lixo.
  - Lavar as mãos depois de assoar o nariz.
  - Cobrir nariz e boca ao espirrar/tossir.
  - Usar o braço dobrado quando não houver lenço.
  - Vacinação.
  - Ir ao médico.
  - Ir ao dentista.
  - Cuidar da saúde mesmo quando não estamos doentes.

3. Corrigir os “Você sabia?”
- Inserir os quatro cards enviados como variações reais de casas “Você sabia?”:
  - Vacinas ajudam a proteger.
  - Por que ir ao médico?
  - Por que ir ao dentista?
  - Saúde não é só quando estamos doentes.
- Manter a microação de tocar no selo correspondente e a mensagem de conquista.

4. Corrigir o erro atual da capa
- Ajustar `src/routes/jogar.tsx` para eliminar o erro `Capa is not defined` que está causando renderização incorreta/hidratação.
- Manter a sequência correta já definida: Capa → apresentação dos personagens → escolha quem começa → jogo.

5. Validar no preview
- Verificar que `/jogar` abre na capa.
- Simular a mesma casa sendo visitada mais de uma vez e confirmar que a segunda visita mostra uma variação diferente.
- Conferir que os novos cards aparecem no banco de conteúdo e que os selos continuam funcionando.