import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/como-jogar")({
  head: () => ({
    meta: [
      { title: "Como jogar — Missão Corpo Bem Cuidado" },
      {
        name: "description",
        content: "Regras e instruções do jogo Nina e Nino: Missão Corpo Bem Cuidado.",
      },
      { property: "og:title", content: "Como jogar — Missão Corpo Bem Cuidado" },
      { property: "og:description", content: "Aprenda como jogar a missão da saúde." },
    ],
  }),
  component: ComoJogar,
});

const STEPS = [
  { icon: "🎲", title: "Jogue o dado", desc: "O dado vai de 1 a 3." },
  { icon: "👣", title: "Movimente o personagem", desc: "Leve Nina ou Nino até a casa destacada." },
  { icon: "🧠", title: "Resolva o desafio", desc: "Responda, arraste ou classifique." },
  { icon: "💡", title: "Leia a explicação", desc: "Nina e Nino contam o porquê." },
  { icon: "🏅", title: "Continue a missão", desc: "Ganhe selos para o cartaz final." },
];

function ComoJogar() {
  return (
    <div
      className="mx-auto bg-gradient-to-br from-sky-100 to-emerald-100 px-10 py-8"
      style={{ width: 1200, height: 675 }}
    >
      <h1 className="text-3xl font-black text-emerald-800">Como jogar</h1>
      <div className="mt-3 space-y-2 text-slate-700 text-base max-w-3xl">
        <p>
          Este jogo é para <b>2 jogadores</b>.
        </p>
        <p>
          Na sua vez, jogue o dado, avance pelo tabuleiro e resolva o desafio da casa. Cada resposta certa ajuda a dupla
          a ganhar <b>selos de cuidado</b>.
        </p>
        <p>
          Se errar, tudo bem! Nina e Nino explicam por que aquela escolha não é a melhor e você pode tentar novamente.
        </p>
        <p>
          Se uma casa “Você sabia?” estiver no caminho até a casa sorteada, ela será aberta automaticamente. Assim, você
          não perde nenhuma informação importante sobre a saúde.
        </p>
        <p>
          No final, a dupla monta o <b>Cartaz dos Cuidados com a Saúde</b>.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-3">
        {STEPS.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white border-4 border-slate-200 p-4 text-center shadow-md">
            <div className="text-5xl">{s.icon}</div>
            <div className="mt-2 font-bold text-slate-800">
              {i + 1}. {s.title}
            </div>
            <div className="text-xs text-slate-600 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          to="/jogar"
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 text-lg shadow-xl"
        >
          Começar missão
        </Link>
        <Link to="/" className="rounded-full bg-white border-2 border-slate-400 text-slate-700 font-bold px-6 py-3">
          Voltar
        </Link>
      </div>
    </div>
  );
}
