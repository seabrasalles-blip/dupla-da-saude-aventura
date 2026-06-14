import type { SquareData } from "./types";

const BASE_SQUARES: SquareData[] = [
  {
    n: 1,
    title: "Mãos limpas antes de comer",
    color: "verde",
    kind: "question",
    prompt: "Antes de comer o lanche, qual cuidado ajuda a proteger a saúde?",
    successFeedback:
      "Muito bem! Lavar as mãos antes de comer ajuda a tirar sujeiras e microrganismos que podem chegar à boca.",
    options: [
      { label: "Lavar as mãos com água e sabonete.", correct: true, feedback: "" },
      {
        label: "Passar a mão na roupa.",
        correct: false,
        feedback:
          "Passar a mão na roupa não limpa de verdade. A sujeira pode continuar nas mãos e até passar para a roupa. Para cuidar da saúde, o melhor é lavar com água e sabonete.",
      },
      {
        label: "Comer primeiro e lavar as mãos depois, se lembrar.",
        correct: false,
        feedback:
          "Lavar as mãos depois não protege o lanche que já foi comido. Antes de comer, é importante limpar as mãos para evitar que sujeiras cheguem à boca.",
      },
    ],
  },
  {
    n: 2,
    title: "O que usamos para lavar as mãos?",
    color: "amarelo",
    kind: "drag",
    prompt: "Arraste para a pia os itens que ajudam a lavar bem as mãos.",
    targetLabel: "Pia",
    successFeedback:
      "Isso mesmo! Para lavar bem as mãos, usamos água e sabonete. Depois, secamos com uma toalha limpa.",
    items: [
      { label: "Água", correct: true, feedback: "" },
      { label: "Sabonete", correct: true, feedback: "" },
      { label: "Toalha limpa", correct: true, feedback: "" },
      { label: "Terra", correct: false, feedback: "Terra não limpa as mãos. Ela pode trazer mais sujeira." },
      {
        label: "Brinquedo",
        correct: false,
        feedback: "O brinquedo pode estar sujo e não serve para lavar as mãos.",
      },
      {
        label: "Bala",
        correct: false,
        feedback: "Bala é alimento, não item de higiene. Para lavar as mãos, precisamos de água e sabonete.",
      },
    ],
  },
  {
    n: 3,
    title: "Microrganismos",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "Microrganismos são seres muito pequenos, que não conseguimos ver só com os olhos. Alguns vivem no ambiente e podem causar doenças. Lavar as mãos, beber água segura e cuidar da limpeza ajudam a proteger o corpo.",
    seal: "maos-limpas",
    sealMessage:
      "Selo conquistado! A Dupla da Saúde aprendeu que alguns cuidados ajudam a proteger o corpo de microrganismos.",
  },
  {
    n: 4,
    title: "Dentes bem cuidados",
    color: "verde",
    kind: "question",
    prompt: "Qual objeto usamos para cuidar dos dentes?",
    successFeedback: "Isso mesmo! A escova ajuda a limpar os dentes e proteger a boca.",
    options: [
      { label: "Escova de dentes.", correct: true, feedback: "" },
      {
        label: "Pente.",
        correct: false,
        feedback:
          "O pente ajuda a arrumar os cabelos, mas não limpa os dentes. Para cuidar da boca, usamos escova de dentes.",
      },
      {
        label: "Sabonete.",
        correct: false,
        feedback:
          "O sabonete é usado para lavar as mãos e o corpo, mas não deve ser usado para escovar os dentes. Para os dentes, usamos escova e creme dental adequado.",
      },
    ],
  },
  {
    n: 5,
    title: "O que são cáries?",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "A cárie é um problema que pode aparecer nos dentes quando restos de alimentos ficam na boca e a limpeza não é feita direitinho. Escovar os dentes ajuda a proteger os dentes.",
    seal: "dentes-bem-cuidados",
    sealMessage: "Selo conquistado! Cuidar dos dentes também faz parte dos cuidados com a saúde.",
  },
  {
    n: 6,
    title: "Depois de comer doce",
    color: "verde",
    kind: "sequence",
    prompt:
      "Depois de comer doce, ajude Nino a organizar os passos para cuidar dos dentes. Arraste os cartões para a ordem correta.",
    cards: [
      { label: "Pegar a escova de dentes" },
      { label: "Colocar creme dental na escova" },
      { label: "Escovar todos os dentes com cuidado" },
      { label: "Enxaguar a boca" },
      { label: "Guardar a escova no lugar certo" },
    ],
    wrongFeedbacks: [
      {
        when: "guardar-antes",
        feedback:
          "Guardar a escova antes de usar não limpa os dentes. Primeiro precisamos escovar com cuidado; depois guardamos a escova.",
      },
      {
        when: "enxaguar-antes",
        feedback:
          "Enxaguar antes pode até molhar a boca, mas não substitui a escovação. A limpeza acontece quando escovamos os dentes com atenção.",
      },
      {
        when: "escovar-sem-preparar",
        feedback:
          "Para escovar bem, primeiro precisamos preparar a escova. Pegue a escova, coloque o creme dental e depois faça a escovação.",
      },
      {
        when: "escovar-fora-de-ordem",
        feedback:
          "Escovar todos os dentes é a parte principal do cuidado. É esse passo que ajuda a limpar restos de alimentos e proteger a boca.",
      },
    ],
    successFeedback:
      "Muito bem! Depois de comer doce, escovar os dentes ajuda a retirar restos de alimentos e proteger a boca contra cáries.",
  },
  {
    n: 7,
    title: "Banho e roupa limpa",
    color: "verde",
    kind: "question",
    prompt: "Depois de brincar, suar e se sujar, qual cuidado ajuda o corpo?",
    successFeedback: "Isso mesmo! O banho ajuda a tirar suor, sujeira e microrganismos da pele.",
    options: [
      { label: "Tomar banho e vestir roupa limpa.", correct: true, feedback: "" },
      {
        label: "Dormir com a roupa suja.",
        correct: false,
        feedback:
          "Dormir com a roupa suja não ajuda a limpar o corpo. Depois de brincar e suar, o banho e a roupa limpa ajudam no cuidado com a pele.",
      },
      {
        label: "Passar perfume no lugar do banho.",
        correct: false,
        feedback:
          "O perfume pode deixar cheiro bom, mas não tira sujeira, suor nem microrganismos. Para limpar o corpo, o banho é importante.",
      },
    ],
  },
  {
    n: 8,
    title: "Mão suja na boca",
    color: "laranja",
    kind: "alert",
    prompt: "Nino brincou no chão e colocou a mão na boca. O que seria mais cuidadoso?",
    successFeedback:
      "Muito bem! Evitar mãos sujas na boca ajuda a impedir que sujeiras e microrganismos entrem no corpo.",
    options: [
      { label: "Lavar as mãos antes de colocar a mão no rosto ou comer.", correct: true, feedback: "" },
      {
        label: "Continuar brincando e comer com a mão suja.",
        correct: false,
        feedback:
          "Comer com a mão suja pode levar sujeiras para a boca. O cuidado mais seguro é lavar as mãos antes de comer.",
      },
      {
        label: "Limpar a mão na camiseta e comer.",
        correct: false,
        feedback:
          "A camiseta não limpa as mãos de verdade. Ela também pode estar suja. Para limpar bem, precisamos de água e sabonete.",
      },
    ],
  },
  {
    n: 9,
    title: "Frutas e verduras",
    color: "azul",
    kind: "didyouknow",
    text: "Frutas, verduras e legumes podem trazer sujeirinhas da terra, do transporte ou do lugar onde ficaram guardados. Por isso, eles precisam ser lavados antes de comer.",
    seal: "alimentos-lavados",
    sealMessage: "Selo conquistado! Alimentos lavados ajudam a proteger a saúde.",
  },
  {
    n: 10,
    title: "Lancheira segura",
    color: "amarelo",
    kind: "drag",
    prompt: "Arraste para a lancheira apenas os alimentos e bebidas prontos para consumir.",
    targetLabel: "Lancheira",
    successFeedback: "Parabéns! Comer alimentos limpos e beber água segura são cuidados importantes para o corpo.",
    items: [
      { label: "Fruta lavada", correct: true, feedback: "" },
      { label: "Sanduíche guardado", correct: true, feedback: "" },
      { label: "Garrafa com água tratada", correct: true, feedback: "" },
      {
        label: "Fruta suja",
        correct: false,
        feedback: "A fruta suja pode ter terra e microrganismos. Antes de comer, ela precisa ser lavada.",
      },
      {
        label: "Alimento caído no chão",
        correct: false,
        feedback: "O alimento que caiu no chão pode pegar sujeira. O mais seguro é não colocá-lo na lancheira.",
      },
      {
        label: "Copo com água de poça",
        correct: false,
        feedback: "Água de poça não é segura para beber. Ela pode ter sujeira e microrganismos.",
      },
    ],
  },
  {
    n: 11,
    title: "Água para beber",
    color: "verde",
    kind: "question",
    prompt: "Qual água é mais segura para beber?",
    successFeedback: "Muito bem! A água própria para consumo ajuda a proteger o corpo de doenças.",
    options: [
      {
        label: "Água tratada, filtrada ou fervida com ajuda de um adulto.",
        correct: true,
        feedback: "",
      },
      {
        label: "Água de rio sem tratamento.",
        correct: false,
        feedback:
          "A água de rio pode parecer limpa, mas pode ter sujeiras e microrganismos que não conseguimos ver. Para beber, a água precisa ser segura.",
      },
      {
        label: "Água de poça no quintal.",
        correct: false,
        feedback:
          "Água de poça não é própria para beber. Ela pode misturar terra, lixo, microrganismos e outras sujeiras.",
      },
    ],
  },
  {
    n: 12,
    title: "Água tratada",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "Água tratada é a água que passa por cuidados para ficar mais segura para o uso das pessoas. Para beber, também podemos usar água filtrada ou fervida com ajuda de um adulto.",
    seal: "agua-segura",
    sealMessage: "Selo conquistado! Beber água segura é um cuidado essencial para a saúde.",
  },
  {
    n: 13,
    title: "Água de poça, rio ou enxurrada",
    color: "laranja",
    kind: "alert",
    prompt: "Nina viu água acumulada depois da chuva. O que ela deve fazer?",
    successFeedback:
      "Isso mesmo! Água de poça, rio ou enxurrada pode ter sujeiras e microrganismos. O mais seguro é avisar um adulto.",
    options: [
      { label: "Não beber nem brincar ali e avisar um adulto.", correct: true, feedback: "" },
      {
        label: "Beber um pouco para experimentar.",
        correct: false,
        feedback:
          "Experimentar água acumulada não é seguro. Mesmo parecendo clara, ela pode ter microrganismos que fazem mal.",
      },
      {
        label: "Encher uma garrafa para levar para casa.",
        correct: false,
        feedback:
          "Levar essa água para casa não a torna segura. Água de poça, rio ou enxurrada não deve ser usada para beber.",
      },
    ],
  },
  {
    n: 14,
    title: "Água segura ou não segura?",
    color: "amarelo",
    kind: "classify",
    prompt: "Separe as imagens em dois grupos: mais segura para beber e não segura para beber.",
    groupALabel: "Mais segura para beber",
    groupBLabel: "Não segura para beber",
    successFeedback: "Muito bem! Nem toda água é própria para beber. Água segura ajuda a proteger o corpo.",
    items: [
      {
        label: "Água filtrada",
        group: "A",
        feedbackWrong: "A água filtrada é uma opção mais segura para beber, quando vem de uma fonte adequada.",
      },
      {
        label: "Água tratada",
        group: "A",
        feedbackWrong: "A água tratada passa por cuidados para ficar mais segura para o uso das pessoas.",
      },
      {
        label: "Água fervida com ajuda de um adulto",
        group: "A",
        feedbackWrong: "Ferver a água, com ajuda de um adulto, pode torná-la mais segura para beber.",
      },
      {
        label: "Água de poça",
        group: "B",
        feedbackWrong: "Água de poça não é segura para beber. Ela pode ter terra, lixo e microrganismos.",
      },
      {
        label: "Água de rio sem tratamento",
        group: "B",
        feedbackWrong:
          "Água de rio sem tratamento pode ter sujeiras invisíveis. Ela não deve ser bebida sem tratamento.",
      },
      {
        label: "Água de enxurrada",
        group: "B",
        feedbackWrong:
          "Água de enxurrada passa por ruas e terrenos, misturando muitas sujeiras. Não é segura para beber.",
      },
    ],
  },
  {
    n: 15,
    title: "O que são verminoses?",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "Verminoses são doenças causadas por alguns vermes que podem entrar no corpo pela água sem tratamento, por alimentos mal lavados, pelas mãos sujas ou pelo contato com solo contaminado.",
    seal: "corpo-protegido",
    sealMessage:
      "Selo conquistado! Agora a Dupla da Saúde sabe que higiene, água segura e calçados ajudam na prevenção de verminoses.",
  },
  {
    n: 16,
    title: "Prevenção de verminoses",
    color: "verde",
    kind: "question",
    prompt: "Qual cuidado ajuda a prevenir verminoses?",
    successFeedback:
      "Muito bem! Esses cuidados ajudam a impedir que sujeiras, microrganismos e alguns vermes entrem no corpo.",
    options: [
      { label: "Lavar as mãos, lavar os alimentos e beber água segura.", correct: true, feedback: "" },
      {
        label: "Beber água de qualquer lugar.",
        correct: false,
        feedback:
          "Beber água de qualquer lugar não é seguro. A água pode ter microrganismos ou vermes que não conseguimos ver.",
      },
      {
        label: "Comer frutas sem lavar.",
        correct: false,
        feedback:
          "Frutas sem lavar podem ter sujeira da terra, do transporte ou do lugar onde ficaram guardadas. Lavar os alimentos ajuda na prevenção de doenças.",
      },
    ],
  },
  {
    n: 17,
    title: "Calçados em lugares de risco",
    color: "laranja",
    kind: "alert",
    prompt: "Nino vai passar perto de terra, lixo e água suja. Qual atitude é mais segura?",
    successFeedback:
      "Isso mesmo! Calçados ajudam a proteger os pés de machucados, sujeiras e alguns riscos do solo contaminado.",
    options: [
      { label: "Usar calçados e chamar um adulto se o local estiver perigoso.", correct: true, feedback: "" },
      {
        label: "Andar descalço para sentir o chão.",
        correct: false,
        feedback:
          "Em locais com terra, lixo ou água suja, andar descalço pode machucar os pés e aumentar o contato com sujeiras.",
      },
      {
        label: "Sentar no chão molhado para brincar.",
        correct: false,
        feedback:
          "Chão molhado e sujo pode ter microrganismos e outras sujeiras. O mais seguro é se afastar e chamar um adulto.",
      },
    ],
  },
  {
    n: 18,
    title: "Cuidados contra verminoses",
    color: "amarelo",
    kind: "drag",
    prompt: "Arraste para o escudo da saúde os cuidados que ajudam a prevenir verminoses.",
    targetLabel: "Escudo da Saúde",
    successFeedback:
      "Parabéns! A prevenção de verminoses envolve cuidados com o corpo, com a água, com os alimentos e com o ambiente.",
    items: [
      { label: "Lavar as mãos", correct: true, feedback: "" },
      { label: "Usar calçados em locais de risco", correct: true, feedback: "" },
      { label: "Beber água segura", correct: true, feedback: "" },
      { label: "Lavar alimentos", correct: true, feedback: "" },
      {
        label: "Beber água de poça",
        correct: false,
        feedback: "Água de poça pode ter sujeira, microrganismos e formas de contaminação que não vemos.",
      },
      {
        label: "Comer fruta suja",
        correct: false,
        feedback: "Fruta suja pode levar sujeiras para dentro do corpo. Lavar os alimentos ajuda a prevenir doenças.",
      },
      {
        label: "Andar descalço no lixo",
        correct: false,
        feedback: "Andar descalço no lixo pode machucar os pés e aumentar o contato com sujeiras e contaminações.",
      },
    ],
  },
  {
    n: 19,
    title: "O que é saneamento básico?",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "Saneamento básico é um conjunto de cuidados que ajuda a proteger a saúde das pessoas. Ele inclui água tratada, coleta de lixo e tratamento do esgoto.",
    seal: "ambiente-saudavel",
    sealMessage:
      "Selo conquistado! Quando a água, o lixo e o esgoto recebem cuidado, o ambiente fica mais seguro para todos.",
  },
  {
    n: 20,
    title: "Lixo no lugar certo",
    color: "verde",
    kind: "question",
    prompt: "O que devemos fazer com embalagens, papéis e restos de alimentos?",
    successFeedback:
      "Muito bem! Jogar lixo no lugar certo ajuda a manter o ambiente limpo e a evitar problemas de saúde.",
    options: [
      { label: "Jogar na lixeira correta.", correct: true, feedback: "" },
      {
        label: "Deixar no chão do quintal.",
        correct: false,
        feedback: "Lixo no chão pode juntar mau cheiro, atrair animais indesejados e deixar o ambiente menos seguro.",
      },
      {
        label: "Jogar perto da água.",
        correct: false,
        feedback: "Jogar lixo perto da água pode sujar o ambiente e contaminar a água. O lixo deve ir para a lixeira.",
      },
    ],
  },
  {
    n: 21,
    title: "Esgoto, lixo e água suja",
    color: "laranja",
    kind: "alert",
    prompt: "Nina viu lixo, esgoto ou água suja perto do local de brincar. O que ela deve fazer?",
    successFeedback:
      "Isso mesmo! Locais com lixo, esgoto ou água suja podem trazer riscos para a saúde. O melhor é se afastar e pedir ajuda.",
    options: [
      { label: "Ficar longe e avisar um adulto.", correct: true, feedback: "" },
      {
        label: "Brincar descalça no local.",
        correct: false,
        feedback:
          "Brincar descalça perto de lixo, esgoto ou água suja não é seguro. Pode haver sujeiras, objetos que machucam e microrganismos.",
      },
      {
        label: "Mexer no lixo para investigar.",
        correct: false,
        feedback:
          "Mexer no lixo pode ser perigoso. Pode haver objetos cortantes, sujeira e microrganismos. O melhor é chamar um adulto.",
      },
    ],
  },
  {
    n: 22,
    title: "Quintal mais limpo",
    color: "amarelo",
    kind: "drag",
    prompt: "Ajude Nina e Nino a deixar o quintal mais seguro. Arraste para a lixeira o que é lixo.",
    targetLabel: "Lixeira",
    successFeedback: "Muito bem! Um ambiente limpo ajuda a proteger as pessoas e torna a brincadeira mais segura.",
    items: [
      { label: "Papel usado", correct: true, feedback: "" },
      { label: "Casca de fruta", correct: true, feedback: "" },
      { label: "Garrafa vazia", correct: true, feedback: "" },
      {
        label: "Pote com água parada",
        correct: false,
        feedback:
          "Pote com água parada precisa de atenção. Ele pode virar lugar de criação de mosquitos. O certo é avisar um adulto.",
      },
      {
        label: "Brinquedo limpo",
        correct: false,
        feedback: "Brinquedo limpo não é lixo. Ele deve ser guardado na caixa de brinquedos.",
      },
    ],
  },
  {
    n: 23,
    title: "Água parada",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "Água parada pode virar lugar de criação de mosquitos. Por isso, é importante avisar um adulto quando encontrar potes, pneus, garrafas ou pratos de planta com água acumulada.",
    seal: "quintal-cuidado",
    sealMessage: "Selo conquistado! A Dupla da Saúde sabe que água parada precisa de atenção.",
  },
  {
    n: 24,
    title: "Chamar um adulto",
    color: "verde",
    kind: "question",
    prompt: "Quando a criança vê uma situação de risco, como lixo, esgoto, água suja ou machucado, o que deve fazer?",
    successFeedback: "Muito bem! Chamar um adulto é uma atitude cuidadosa e segura.",
    options: [
      { label: "Avisar um adulto.", correct: true, feedback: "" },
      {
        label: "Resolver tudo sozinha.",
        correct: false,
        feedback:
          "Algumas situações podem ser perigosas para a criança resolver sozinha. Um adulto pode ajudar com segurança.",
      },
      {
        label: "Esconder o problema.",
        correct: false,
        feedback:
          "Esconder o problema pode fazer a situação continuar ou piorar. Avisar um adulto é uma forma de se cuidar.",
      },
    ],
  },
  {
    n: 25,
    title: "Depois de usar o banheiro",
    color: "amarelo",
    kind: "sequence",
    prompt: "Coloque as ações na ordem correta.",
    cards: [{ label: "Usar o banheiro" }, { label: "Dar descarga" }, { label: "Lavar as mãos com água e sabonete" }],
    successFeedback:
      "Isso mesmo! Depois de usar o banheiro, lavar as mãos é um dos cuidados mais importantes para proteger a saúde.",
    wrongFeedbacks: [
      {
        when: "wash-first",
        feedback:
          "Lavar as mãos antes pode ser bom em algumas situações, mas depois de usar o banheiro é essencial lavar novamente.",
      },
      {
        when: "flush-last",
        feedback: "A descarga deve vir antes da lavagem das mãos, para que as mãos sejam limpas no final.",
      },
      {
        when: "no-wash-end",
        feedback:
          "Depois de usar o banheiro, lavar as mãos com água e sabonete é o cuidado principal para proteger a saúde.",
      },
    ],
  },
  {
    n: 26,
    title: "Escova de dentes é pessoal",
    color: "azul",
    kind: "didyouknow",
    keySquare: true,
    text: "A escova de dentes é um objeto pessoal. Cada pessoa deve usar a sua, porque ela entra em contato com a boca.",
    seal: "objeto-pessoal",
    sealMessage: "Selo conquistado! Alguns objetos de higiene não devem ser compartilhados.",
  },
  {
    n: 27,
    title: "Depois de brincar com animais",
    color: "verde",
    kind: "question",
    prompt: "Depois de brincar com um animal de estimação, o que é importante fazer antes de comer?",
    successFeedback:
      "Muito bem! Brincar com animais pode ser muito divertido, mas lavar as mãos antes de comer ajuda a proteger a saúde.",
    options: [
      { label: "Lavar as mãos.", correct: true, feedback: "" },
      {
        label: "Comer logo, sem lavar as mãos.",
        correct: false,
        feedback:
          "Depois de brincar com animais, as mãos podem ficar com pelos, terra ou microrganismos. Antes de comer, é importante lavar as mãos.",
      },
      {
        label: "Colocar a mão na boca para limpar.",
        correct: false,
        feedback: "Colocar a mão na boca não limpa. Pelo contrário: pode levar sujeiras para dentro do corpo.",
      },
    ],
  },
  {
    n: 28,
    title: "Machucado na pele",
    color: "laranja",
    kind: "alert",
    prompt: "Nino machucou o joelho durante a brincadeira. O que ele deve fazer?",
    successFeedback: "Isso mesmo! Um adulto pode ajudar a limpar o machucado e cuidar para que ele não piore.",
    options: [
      { label: "Avisar um adulto para ajudar a limpar e cuidar.", correct: true, feedback: "" },
      {
        label: "Passar terra no machucado.",
        correct: false,
        feedback:
          "Terra não deve ser colocada em machucados. Ela pode ter sujeiras e microrganismos que atrapalham a cicatrização.",
      },
      {
        label: "Esconder o machucado e continuar brincando.",
        correct: false,
        feedback: "Esconder o machucado pode fazer o problema piorar. Avisar um adulto é a atitude mais segura.",
      },
    ],
  },
  {
    n: 29,
    title: "Mochila da Saúde",
    color: "amarelo",
    kind: "drag",
    prompt: "Arraste para a Mochila da Saúde os cuidados que ajudam a proteger o corpo.",
    targetLabel: "Mochila da Saúde",
    successFeedback: "Parabéns! A Mochila da Saúde está cheia de cuidados importantes para o dia a dia.",
    items: [
      { label: "Lavar as mãos", correct: true, feedback: "" },
      { label: "Beber água segura", correct: true, feedback: "" },
      { label: "Lavar frutas", correct: true, feedback: "" },
      { label: "Escovar os dentes", correct: true, feedback: "" },
      { label: "Usar calçados em locais de risco", correct: true, feedback: "" },
      { label: "Jogar lixo na lixeira", correct: true, feedback: "" },
      {
        label: "Beber água de poça",
        correct: false,
        feedback: "Água de poça não é segura para beber e pode fazer mal à saúde.",
      },
      {
        label: "Comer fruta suja",
        correct: false,
        feedback: "Fruta suja pode levar sujeiras e microrganismos para dentro do corpo.",
      },
      {
        label: "Brincar perto de esgoto",
        correct: false,
        feedback: "Esgoto pode ter microrganismos e outros riscos. O melhor é ficar longe e avisar um adulto.",
      },
      {
        label: "Andar descalço no lixo",
        correct: false,
        feedback: "O lixo pode ter sujeira, objetos cortantes e contaminações. Calçados ajudam a proteger os pés.",
      },
    ],
  },
  {
    n: 30,
    title: "Cartaz dos Cuidados com a Saúde",
    color: "roxo",
    kind: "final",
    prompt: "Arraste para o Cartaz dos Cuidados todos os selos conquistados na missão.",
    correctSeals: [
      "maos-limpas",
      "dentes-bem-cuidados",
      "agua-segura",
      "alimentos-lavados",
      "corpo-protegido",
      "ambiente-saudavel",
      "quintal-cuidado",
      "objeto-pessoal",
      "vacina-em-dia",
      "cuidado-medico",
      "dentista-amigo",
      "prevencao",
      "nariz-limpo",
      "espirro-cuidadoso",
    ],
    wrongActions: [
      { label: "Beber água de poça", feedback: "" },
      { label: "Comer fruta suja", feedback: "" },
      { label: "Brincar perto de esgoto", feedback: "" },
      { label: "Dormir sem escovar os dentes", feedback: "" },
      { label: "Passar perfume no lugar do banho", feedback: "" },
    ],
    successFeedback: "Missão cumprida! Cuidar do corpo, da água, dos alimentos e do ambiente ajuda a proteger a saúde.",
    wrongGenericFeedback:
      "Essa ação não combina com o Cartaz dos Cuidados, porque não ajuda a proteger a saúde. Observe se ela cuida do corpo, da água, dos alimentos ou do ambiente.",
  },
];

// Variant cards: extra variations per house so the second player gets a different card.
// Maps n -> additional variants (besides the base one).
const EXTRA_VARIANTS: Record<number, SquareData[]> = {
  1: [
    {
      n: 1,
      title: "Antes da merenda",
      color: "verde",
      kind: "question",
      prompt: "Nina vai comer a merenda na escola. O que ela faz primeiro?",
      successFeedback: "Isso mesmo! Lavar as mãos antes de comer ajuda a evitar que sujeiras cheguem à boca.",
      options: [
        { label: "Lava as mãos com água e sabonete.", correct: true, feedback: "", awardSeal: "maos-limpas" },
        {
          label: "Limpa as mãos no cabelo.",
          correct: false,
          feedback: "O cabelo não limpa as mãos. Pode até trazer mais sujeira. O certo é lavar com água e sabonete.",
        },
        {
          label: "Sopra as mãos para espantar a sujeira.",
          correct: false,
          feedback: "Soprar não tira microrganismos nem sujeira. Para limpar mesmo, é preciso água e sabonete.",
        },
      ],
    },
  ],
  2: [
    {
      n: 2,
      title: "Para limpar as mãos",
      color: "amarelo",
      kind: "drag",
      prompt: "Arraste para a pia somente o que serve para lavar as mãos.",
      targetLabel: "Pia",
      successFeedback: "Muito bem! Água e sabonete fazem a limpeza. Toalha limpa ajuda a secar.",
      items: [
        { label: "Água", correct: true, feedback: "" },
        { label: "Sabonete líquido", correct: true, feedback: "" },
        { label: "Toalha limpa", correct: true, feedback: "" },
        { label: "Refrigerante", correct: false, feedback: "Refrigerante é bebida, não limpa as mãos." },
        { label: "Areia", correct: false, feedback: "Areia traz mais sujeira para as mãos." },
        { label: "Pano sujo", correct: false, feedback: "Um pano sujo pode passar mais microrganismos para as mãos." },
      ],
    },
  ],
  3: [
    {
      n: 3,
      title: "Vacinas",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "As vacinas ajudam o corpo a se preparar para se defender de algumas doenças. Elas são uma forma importante de cuidado com a saúde.",
      seal: "vacina-em-dia",
      sealMessage:
        "Selo conquistado! Vacinar é uma forma de proteger a saúde individual e também ajudar a proteger outras pessoas.",
    },
    {
      n: 3,
      title: "Mãos espalham microrganismos",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "As mãos tocam em muitas coisas durante o dia. Por isso, elas podem carregar microrganismos de um lugar para outro. Lavar as mãos várias vezes ao dia é um cuidado importante.",
      seal: "maos-limpas",
      sealMessage: "Selo conquistado! Mãos limpas ajudam a proteger todo o corpo.",
    },
  ],
  4: [
    {
      n: 4,
      title: "Hora da escovação",
      color: "verde",
      kind: "question",
      prompt: "Quantas vezes por dia é recomendado escovar os dentes?",
      successFeedback:
        "Isso mesmo! Escovar os dentes várias vezes ao dia, principalmente após as refeições e antes de dormir, ajuda a evitar cáries.",
      options: [
        {
          label: "Várias vezes ao dia, sempre após as refeições e antes de dormir.",
          correct: true,
          feedback: "",
          awardSeal: "dentes-bem-cuidados",
        },
        {
          label: "Uma vez por semana.",
          correct: false,
          feedback:
            "Escovar só uma vez por semana deixa restos de comida acumularem por muito tempo. Os dentes precisam de cuidado diário.",
        },
        {
          label: "Só quando os dentes doem.",
          correct: false,
          feedback: "Escovar só quando dói é tarde demais. O cuidado todo dia ajuda a evitar a dor.",
        },
      ],
    },
  ],
  5: [
    {
      n: 5,
      title: "Dentista amigo",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "O dentista ajuda a cuidar dos dentes e da boca. Ele pode ver se está tudo bem, orientar a escovação e ajudar a prevenir cáries.",
      seal: "dentista-amigo",
      sealMessage: "Selo conquistado! Cuidar dos dentes também faz parte da saúde.",
    },
  ],
  6: [
    {
      n: 6,
      title: "Doce e cuidado com a boca",
      color: "verde",
      kind: "question",
      prompt: "Nino comeu balas na festa. Qual é o melhor cuidado em seguida?",
      successFeedback:
        "Muito bem! Escovar os dentes depois de comer doces ajuda a tirar o açúcar que pode causar cáries.",
      options: [
        {
          label: "Escovar os dentes assim que possível.",
          correct: true,
          feedback: "",
          awardSeal: "dentes-bem-cuidados",
        },
        {
          label: "Comer mais doces para disfarçar.",
          correct: false,
          feedback: "Mais doces aumentam o açúcar na boca e o risco de cáries.",
        },
        {
          label: "Bochechar com refrigerante.",
          correct: false,
          feedback: "Refrigerante também tem açúcar e não limpa os dentes.",
        },
      ],
    },
  ],
  7: [
    {
      n: 7,
      title: "Depois de assoar o nariz",
      color: "verde",
      kind: "question",
      prompt: "Depois de assoar o nariz, qual cuidado é importante?",
      successFeedback:
        "Isso mesmo! Depois de assoar o nariz, jogar o papel no lixo e lavar as mãos ajuda a manter a higiene.",
      options: [
        { label: "Jogar o papel no lixo e lavar as mãos.", correct: true, feedback: "", awardSeal: "nariz-limpo" },
        {
          label: "Guardar o papel usado no bolso para usar depois.",
          correct: false,
          feedback:
            "Guardar papel usado no bolso não é higiênico. O papel pode estar com secreções e deve ir para o lixo.",
        },
        {
          label: "Mexer nos alimentos logo em seguida.",
          correct: false,
          feedback:
            "Mexer nos alimentos depois de assoar o nariz, sem lavar as mãos, pode levar sujeirinhas e microrganismos para a comida.",
        },
      ],
    },
    {
      n: 7,
      title: "Banho depois de brincar",
      color: "verde",
      kind: "question",
      prompt: "Nina brincou na terra a tarde toda. O que ajuda o corpo dela agora?",
      successFeedback: "Isso mesmo! O banho tira suor e sujeira. Roupa limpa completa o cuidado.",
      options: [
        { label: "Tomar banho e colocar roupa limpa.", correct: true, feedback: "", awardSeal: "corpo-protegido" },
        {
          label: "Colocar mais perfume sobre a sujeira.",
          correct: false,
          feedback: "Perfume disfarça o cheiro, mas não tira a sujeira nem os microrganismos.",
        },
        {
          label: "Continuar com a roupa suja até amanhã.",
          correct: false,
          feedback: "Ficar com roupa suja não cuida da pele. Suor e sujeira podem incomodar e causar problemas.",
        },
      ],
    },
  ],
  8: [
    {
      n: 8,
      title: "Brincando no parque",
      color: "laranja",
      kind: "alert",
      prompt: "Nina pegou no balanço, na grade e no escorregador. Antes de comer a fruta, ela deve:",
      successFeedback:
        "Muito bem! Lavar as mãos depois de tocar em muitos lugares ajuda a evitar que sujeiras cheguem ao lanche.",
      options: [
        { label: "Lavar as mãos antes de pegar a fruta.", correct: true, feedback: "", awardSeal: "maos-limpas" },
        {
          label: "Comer rápido para ninguém ver.",
          correct: false,
          feedback: "Comer com a mão suja pode levar microrganismos para a boca, mesmo que ninguém veja.",
        },
        {
          label: "Esfregar a fruta na camiseta.",
          correct: false,
          feedback: "A camiseta pode estar suja e não limpa de verdade nem a fruta nem as mãos.",
        },
      ],
    },
  ],
  9: [
    {
      n: 9,
      title: "Lavando frutas",
      color: "azul",
      kind: "didyouknow",
      text: "Mesmo as frutas que parecem limpas podem ter restos de terra, agrotóxico ou microrganismos na casca. Por isso, lavar bem em água corrente antes de comer é um cuidado importante.",
      seal: "alimentos-lavados",
      sealMessage: "Selo conquistado! Lavar os alimentos é um cuidado simples que protege a saúde.",
    },
  ],
  10: [
    {
      n: 10,
      title: "Lanche seguro",
      color: "amarelo",
      kind: "drag",
      prompt: "Arraste para a lancheira o que é seguro para levar à escola.",
      targetLabel: "Lancheira",
      successFeedback: "Muito bem! Alimentos limpos e água segura cuidam do corpo.",
      items: [
        { label: "Maçã lavada", correct: true, feedback: "" },
        { label: "Pão guardado em saquinho", correct: true, feedback: "" },
        { label: "Garrafa de água filtrada", correct: true, feedback: "" },
        {
          label: "Bolacha que caiu no chão",
          correct: false,
          feedback: "O que cai no chão pode pegar sujeira e microrganismos.",
        },
        {
          label: "Suco aberto há vários dias",
          correct: false,
          feedback: "Suco aberto há muito tempo pode estragar. O melhor é jogar fora.",
        },
        {
          label: "Banana com casca quebrada e suja",
          correct: false,
          feedback: "Se a casca está quebrada e suja, a parte de dentro pode ter sido contaminada.",
        },
      ],
    },
  ],
  11: [
    {
      n: 11,
      title: "Espirro cuidadoso",
      color: "verde",
      kind: "question",
      prompt: "Nino vai espirrar. O que ele deve fazer?",
      successFeedback: "Muito bem! Cobrir nariz e boca ao espirrar ajuda a proteger as outras pessoas.",
      options: [
        {
          label: "Cobrir o nariz e a boca com o braço dobrado ou com um lenço.",
          correct: true,
          feedback: "",
          awardSeal: "espirro-cuidadoso",
        },
        {
          label: "Espirrar perto do rosto de outra pessoa.",
          correct: false,
          feedback:
            "Espirrar perto do rosto de outra pessoa pode espalhar gotinhas. O mais cuidadoso é cobrir nariz e boca.",
        },
        {
          label: "Espirrar nas mãos e continuar brincando.",
          correct: false,
          feedback:
            "Espirrar nas mãos pode deixar gotinhas nelas. Depois, essas gotinhas podem passar para objetos e alimentos. Melhor usar o braço dobrado ou um lenço.",
        },
      ],
    },
    {
      n: 11,
      title: "Água do bebedouro",
      color: "verde",
      kind: "question",
      prompt: "Na escola, qual é a melhor escolha para beber água?",
      successFeedback: "Muito bem! Bebedouro com água tratada é uma forma segura de beber água.",
      options: [
        { label: "Água do bebedouro, na garrafinha limpa.", correct: true, feedback: "", awardSeal: "agua-segura" },
        {
          label: "Água da torneira do jardim.",
          correct: false,
          feedback: "Água da torneira do jardim nem sempre é própria para beber.",
        },
        {
          label: "Água do balde de limpeza.",
          correct: false,
          feedback: "Água de balde de limpeza não é para beber. Ela pode ter produtos e sujeira.",
        },
      ],
    },
  ],
  12: [
    {
      n: 12,
      title: "Prevenção",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "Cuidar da saúde também acontece antes de ficar doente. Lavar as mãos, beber água segura, escovar os dentes, tomar vacina e visitar profissionais de saúde são cuidados importantes.",
      seal: "prevencao",
      sealMessage: "Selo conquistado! Prevenir é cuidar antes que o problema apareça.",
    },
    {
      n: 12,
      title: "Você sabia? Ferver a água",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "Quando não há água tratada ou filtrada, um adulto pode ferver a água em fogo alto por alguns minutos. Isso ajuda a eliminar muitos microrganismos.",
      seal: "agua-segura",
      sealMessage: "Selo conquistado! Saber escolher água segura protege a Dupla da Saúde.",
    },
  ],
  13: [
    {
      n: 13,
      title: "Chuva forte na rua",
      color: "laranja",
      kind: "alert",
      prompt: "Choveu muito e há enxurrada na rua. O que Nino faz?",
      successFeedback: "Isso mesmo! Enxurrada pode esconder buracos, lixo e microrganismos. O melhor é ficar longe.",
      options: [
        { label: "Fica longe da água e avisa um adulto.", correct: true, feedback: "", awardSeal: "ambiente-saudavel" },
        {
          label: "Brinca de pular dentro da enxurrada.",
          correct: false,
          feedback: "A enxurrada pode esconder objetos cortantes, esgoto e correnteza forte. É perigoso.",
        },
        {
          label: "Mergulha a mão para pegar coisas que passam.",
          correct: false,
          feedback: "Mexer na enxurrada pode contaminar as mãos com sujeira e microrganismos.",
        },
      ],
    },
  ],
  15: [
    {
      n: 15,
      title: "Calçados protegem",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "Alguns vermes vivem no solo e podem entrar no corpo pelos pés descalços. Usar calçados em quintais, terrenos e locais com lixo ajuda a proteger contra verminoses.",
      seal: "corpo-protegido",
      sealMessage: "Selo conquistado! Pés protegidos também são saúde.",
    },
  ],
  16: [
    {
      n: 16,
      title: "Antes de comer salada",
      color: "verde",
      kind: "question",
      prompt: "Qual cuidado a família deve ter antes de servir uma salada de folhas?",
      successFeedback: "Muito bem! Lavar bem as folhas ajuda a tirar terra e microrganismos.",
      options: [
        {
          label: "Lavar as folhas uma a uma em água corrente.",
          correct: true,
          feedback: "",
          awardSeal: "alimentos-lavados",
        },
        {
          label: "Servir direto do mercado, sem lavar.",
          correct: false,
          feedback: "Mesmo as folhas embaladas podem ter sujeirinhas. Lavar é importante.",
        },
        {
          label: "Passar apenas um pano por cima.",
          correct: false,
          feedback: "Um pano não tira microrganismos. Água corrente faz uma limpeza melhor.",
        },
      ],
    },
  ],
  17: [
    {
      n: 17,
      title: "Quintal com terra",
      color: "laranja",
      kind: "alert",
      prompt: "Nina vai ajudar a cuidar das plantas no quintal. Qual cuidado é importante?",
      successFeedback: "Isso mesmo! Calçados e mãos lavadas depois protegem contra verminoses.",
      options: [
        { label: "Usar calçados e lavar as mãos depois.", correct: true, feedback: "", awardSeal: "corpo-protegido" },
        {
          label: "Andar descalça e colocar a mão na boca.",
          correct: false,
          feedback: "Andar descalça em terra e levar a mão à boca pode trazer vermes e microrganismos para o corpo.",
        },
        {
          label: "Comer fruta caída do pé sem lavar.",
          correct: false,
          feedback: "Fruta caída no chão pode estar suja. Antes de comer, é preciso lavar.",
        },
      ],
    },
  ],
  19: [
    {
      n: 19,
      title: "Cuidado médico",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "O médico ajuda a cuidar da saúde. Ele pode examinar, orientar a família e indicar o melhor cuidado quando a criança não está bem.",
      seal: "cuidado-medico",
      sealMessage: "Selo conquistado! Pedir ajuda a um profissional de saúde é uma atitude de cuidado.",
    },
    {
      n: 19,
      title: "Coleta de lixo",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "Quando o lixo é recolhido e tem destino certo, ele para de acumular nas ruas. Isso ajuda a manter o ambiente limpo e a saúde de todos protegida.",
      seal: "ambiente-saudavel",
      sealMessage: "Selo conquistado! Cuidar do lixo é cuidar do ambiente e das pessoas.",
    },
  ],
  20: [
    {
      n: 20,
      title: "Lixo separado",
      color: "verde",
      kind: "question",
      prompt: "Por que é importante jogar o lixo nas lixeiras certas?",
      successFeedback: "Muito bem! Lixo no lugar certo ajuda a coleta e mantém o ambiente limpo.",
      options: [
        {
          label: "Para o ambiente ficar limpo e a coleta funcionar bem.",
          correct: true,
          feedback: "",
          awardSeal: "ambiente-saudavel",
        },
        {
          label: "Para os animais comerem o lixo.",
          correct: false,
          feedback: "Lixo não é comida de animais. Pode fazer mal a eles e atrair bichos indesejados.",
        },
        {
          label: "Não é importante, tanto faz.",
          correct: false,
          feedback: "Quando o lixo fica fora do lugar, atrai bichos e suja o ambiente.",
        },
      ],
    },
  ],
  21: [
    {
      n: 21,
      title: "Cano vazando na rua",
      color: "laranja",
      kind: "alert",
      prompt: "Nino vê um cano de esgoto vazando perto da escola. O que ele faz?",
      successFeedback: "Muito bem! Esgoto a céu aberto traz riscos. Avisar um adulto ajuda todos.",
      options: [
        {
          label: "Não chega perto e avisa um adulto da escola.",
          correct: true,
          feedback: "",
          awardSeal: "ambiente-saudavel",
        },
        {
          label: "Tenta tapar com o pé.",
          correct: false,
          feedback: "Mexer no esgoto pode contaminar Nino com microrganismos. Adulto deve resolver.",
        },
        {
          label: "Brinca na poça que se formou.",
          correct: false,
          feedback: "Poça de esgoto é muito perigosa para brincar. Tem microrganismos e sujeira.",
        },
      ],
    },
  ],
  23: [
    {
      n: 23,
      title: "Dengue e água parada",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "O mosquito da dengue coloca seus ovos em água parada limpa. Por isso, tampar caixas d'água, virar baldes vazios e trocar a água dos vasinhos das plantas ajuda muito.",
      seal: "quintal-cuidado",
      sealMessage: "Selo conquistado! Cuidar do quintal evita mosquitos e doenças.",
    },
  ],
  24: [
    {
      n: 24,
      title: "Tosse e cuidado com os outros",
      color: "verde",
      kind: "question",
      prompt: "Qual atitude mostra cuidado ao tossir?",
      successFeedback: "Isso mesmo! Tossir no braço dobrado ajuda a diminuir a espalhação de gotinhas.",
      options: [
        { label: "Tossir no braço dobrado.", correct: true, feedback: "", awardSeal: "espirro-cuidadoso" },
        {
          label: "Tossir sobre o lanche.",
          correct: false,
          feedback: "Tossir sobre o lanche não é higiênico. Gotinhas podem cair no alimento.",
        },
        {
          label: "Tossir perto do colega.",
          correct: false,
          feedback: "Tossir perto do colega pode espalhar gotinhas. O mais cuidadoso é cobrir nariz e boca.",
        },
      ],
    },
    {
      n: 24,
      title: "Vi alguém se machucar",
      color: "verde",
      kind: "question",
      prompt: "Nina vê um coleguinha que caiu e se machucou. O que ela faz?",
      successFeedback: "Isso mesmo! Chamar um adulto é a forma segura de ajudar.",
      options: [
        { label: "Chama rapidamente um adulto para ajudar.", correct: true, feedback: "", awardSeal: "cuidado-medico" },
        {
          label: "Tenta tratar o machucado sozinha com terra.",
          correct: false,
          feedback: "Terra no machucado pode contaminar. Adulto sabe limpar do jeito certo.",
        },
        {
          label: "Continua brincando e finge que não viu.",
          correct: false,
          feedback: "Quando alguém se machuca, pedir ajuda a um adulto é a coisa certa.",
        },
      ],
    },
  ],
  26: [
    {
      n: 26,
      title: "Toalha pessoal",
      color: "azul",
      kind: "didyouknow",
      keySquare: true,
      text: "Toalha de rosto e toalha de banho também são objetos pessoais. Cada um deve usar a sua, principalmente quando alguém está com algum problema de pele ou resfriado.",
      seal: "objeto-pessoal",
      sealMessage: "Selo conquistado! Itens pessoais cuidam de cada um.",
    },
  ],
  27: [
    {
      n: 27,
      title: "Cocô de animal no quintal",
      color: "verde",
      kind: "question",
      prompt: "Nina viu cocô do cachorro no quintal antes da brincadeira. O que é melhor fazer?",
      successFeedback: "Muito bem! Avisar um adulto para recolher protege todo mundo.",
      options: [
        {
          label: "Avisar um adulto para recolher e jogar no lixo.",
          correct: true,
          feedback: "",
          awardSeal: "ambiente-saudavel",
        },
        {
          label: "Pisar em cima de propósito.",
          correct: false,
          feedback: "Pisar no cocô pode espalhar microrganismos pelo quintal e pela casa.",
        },
        {
          label: "Continuar a brincadeira por perto.",
          correct: false,
          feedback: "Brincar perto de cocô não é seguro. Pode haver vermes e microrganismos.",
        },
      ],
    },
  ],
  28: [
    {
      n: 28,
      title: "Joelho ralado",
      color: "laranja",
      kind: "alert",
      prompt: "Nina caiu e o joelho está sangrando. Qual o primeiro cuidado?",
      successFeedback: "Isso mesmo! Lavar com água limpa e pedir ajuda do adulto é o cuidado certo.",
      options: [
        {
          label: "Pedir ajuda do adulto e lavar com água limpa e sabonete.",
          correct: true,
          feedback: "",
          awardSeal: "cuidado-medico",
        },
        {
          label: "Passar saliva no machucado.",
          correct: false,
          feedback: "Saliva tem microrganismos da boca. Não é boa ideia colocá-la em machucados.",
        },
        {
          label: "Esconder dentro da calça e continuar correndo.",
          correct: false,
          feedback: "Machucado escondido não recebe cuidado e pode piorar.",
        },
      ],
    },
  ],
};

// SQUARE_VARIANTS[n-1] = list of variants for that house. First entry is the base card.
export const SQUARE_VARIANTS: SquareData[][] = BASE_SQUARES.map((base) => {
  const extras = EXTRA_VARIANTS[base.n] ?? [];
  return [base, ...extras];
});

// Legacy export: headers (color/title/kind from first variant) used by Board.
export const SQUARES: SquareData[] = BASE_SQUARES;
