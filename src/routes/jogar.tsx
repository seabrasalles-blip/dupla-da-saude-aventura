import { createFileRoute, Link } from "@tanstack/react-router";
import { useGame, type Player } from "@/game/store";
import { SEAL_LABELS } from "@/game/types";
import { Board, Dice, CHAR } from "@/components/game/Board";
import { ActiveCard } from "@/components/game/ActiveCard";
import ninaAsset from "@/assets/nina.png.asset.json";
import ninoAsset from "@/assets/nino.png.asset.json";

export const Route = createFileRoute("/jogar")({
  head: () => ({
    meta: [
      { title: "Jogar — Corpo Bem Cuidado" },
      {
        name: "description",
        content: "Tabuleiro do jogo Nina e Nino: ajude a Dupla da Saúde a descobrir os cuidados com o corpo.",
      },
      { property: "og:title", content: "Jogar — Corpo Bem Cuidado" },
      { property: "og:description", content: "Tabuleiro do jogo da Dupla da Saúde." },
    ],
  }),
  component: Jogar,
});

function Jogar() {
  const phase = useGame((s) => s.phase);
  return (
    <div
      className="relative mx-auto bg-gradient-to-br from-sky-50 to-emerald-50 overflow-hidden"
      style={{ width: 1200, height: 675 }}
    >
      {phase === "intro" && <Intro />}
      {phase === "choose" && <ChooseStarter />}
      {(phase === "playing" ||
        phase === "rolling" ||
        phase === "moving" ||
        phase === "landing" ||
        phase === "card" ||
        phase === "waiting-partner") && <GameScreen />}
      {phase === "finished" && <FinalScreen />}
    </div>
  );
}

function ChooseStarter() {
  const choose = useGame((s) => s.chooseStarter);
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <h2 className="text-3xl font-black text-emerald-800">Escolha quem começa a missão</h2>
      <div className="mt-8 grid grid-cols-2 gap-10">
        {(["nina", "nino"] as Player[]).map((p) => (
          <button
            key={p}
            onClick={() => choose(p)}
            className="rounded-3xl bg-white border-4 border-slate-300 hover:border-emerald-500 hover:scale-105 transition p-6 shadow-xl"
          >
            <img src={CHAR(p)} alt={p} className="h-56 mx-auto" />
            <div className="mt-3 text-2xl font-black text-slate-800 capitalize">{p}</div>
            <div className="text-sm text-slate-500">Jogador {p === "nina" ? 1 : 2}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  const goToChoose = useGame((s) => s.goToChoose);
  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      <h2 className="text-3xl font-black text-emerald-800 mb-4">A Dupla da Saúde</h2>
      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        <div className="flex items-end gap-3">
          <img src={ninaAsset.url} alt="Nina" className="h-44" />
          <div className="rounded-2xl bg-orange-100 border-2 border-orange-300 p-5 text-[18px] leading-relaxed mb-2 flex-1 max-w-sm min-h-[110px]">
            Olá! Eu sou a Nina. Hoje vamos descobrir cuidados importantes para o corpo.
          </div>
        </div>
        <div className="flex items-end gap-3 flex-row-reverse">
          <img src={ninoAsset.url} alt="Nino" className="h-44" />
          <div className="rounded-2xl bg-sky-100 border-2 border-sky-300 p-5 text-[18px] leading-relaxed mb-2 flex-1 max-w-sm min-h-[110px]">
            E eu sou o Nino! Vamos aprender por que higiene, água segura e ambiente limpo ajudam a proteger a saúde.
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-lg leading-relaxed text-slate-700 max-w-2xl">
        Algumas sujeiras e microrganismos são tão pequenos que não conseguimos ver. Por isso, cuidar do corpo e do
        ambiente é muito importante.
      </p>

      <button
        onClick={goToChoose}
        className="mt-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-3 text-lg shadow-xl"
      >
        Vamos jogar!
      </button>
    </div>
  );
}

function GameScreen() {
  const turn = useGame((s) => s.turn);
  const dice = useGame((s) => s.dice);
  const phase = useGame((s) => s.phase);
  const seals = useGame((s) => s.seals);
  const reset = useGame((s) => s.reset);
  const sound = useGame((s) => s.soundOn);
  const toggleSound = useGame((s) => s.toggleSound);
  const positions = useGame((s) => s.positions);

  const continueAfterWaiting = useGame((s) => s.continueAfterWaiting);

  return (
    <div className="grid grid-cols-[1fr_280px] gap-3 p-3 h-full">
      <div className="relative">
        <Board />
        <ActiveCard />
        {phase === "waiting-partner" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-2xl z-30">
            <div className="bg-white border-4 border-emerald-500 rounded-3xl shadow-2xl p-6 max-w-md text-center flex flex-col items-center gap-3">
              <img src={CHAR(turn)} alt={turn} className="h-28" />
              <p className="text-lg font-bold text-slate-800 leading-snug">
                Você chegou ao final! Agora espere seu amigo chegar para vocês montarem juntos o Cartaz dos Cuidados com a Saúde.
              </p>
              <button
                onClick={continueAfterWaiting}
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 text-base shadow-lg"
              >
                Passar a vez
              </button>
            </div>
          </div>
        )}
      </div>
      <aside className="flex flex-col gap-3">
        <div className="rounded-2xl bg-white border-2 border-slate-200 p-3 shadow text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Vez de</div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <img src={CHAR(turn)} alt={turn} className="h-12" />
            <span className="text-xl font-black capitalize text-slate-800">{turn}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Nina: casa {positions.nina} • Nino: casa {positions.nino}
          </div>
        </div>

        <div className="rounded-2xl bg-white border-2 border-slate-200 p-3 shadow flex flex-col items-center">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Dado</div>
          <Dice />
          {phase === "moving" && (
            <div className="mt-2 text-center text-xs font-semibold text-slate-600 bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-2">
              Conte as casas e movimente {turn === "nina" ? "a Nina" : "o Nino"} até a casa certa.
            </div>
          )}
          {phase === "playing" && (
            <div className="mt-2 text-center text-xs text-slate-500">Clique no dado para começar.</div>
          )}
        </div>

        <div className="rounded-2xl bg-white border-2 border-slate-200 p-3 shadow flex-1 overflow-auto">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Selos da Dupla ({seals.length}/14)</div>

          <div className="flex flex-wrap gap-1">
            {(Object.keys(SEAL_LABELS) as (keyof typeof SEAL_LABELS)[]).map((s) => {
              const has = seals.includes(s);
              return (
                <span
                  key={s}
                  className={`text-[10px] font-bold rounded-full px-2 py-1 border-2 ${
                    has
                      ? "bg-amber-200 border-amber-500 text-amber-900"
                      : "bg-slate-100 border-slate-300 text-slate-400"
                  }`}
                >
                  {has ? "🏅 " : "○ "}
                  {SEAL_LABELS[s]}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleSound}
            className="flex-1 rounded-xl bg-white border-2 border-slate-300 px-3 py-1.5 text-xs font-semibold"
          >
            {sound ? "🔊 Som" : "🔇 Mudo"}
          </button>
          <button
            onClick={reset}
            className="flex-1 rounded-xl bg-white border-2 border-slate-300 px-3 py-1.5 text-xs font-semibold"
          >
            ↻ Reiniciar
          </button>
          <Link to="/" className="rounded-xl bg-white border-2 border-slate-300 px-3 py-1.5 text-xs font-semibold">
            🏠
          </Link>
        </div>
      </aside>
    </div>
  );
}

function FinalScreen() {
  const seals = useGame((s) => s.seals);
  const reset = useGame((s) => s.reset);
  const stamps: { icon: string; title: string; phrase: string; color: string }[] = [
    { icon: "🧼", title: "Mãos limpas", phrase: "Água e sabonete.", color: "border-sky-400 bg-sky-50" },
    { icon: "🪥", title: "Dentes cuidados", phrase: "Escovar todos os dias.", color: "border-sky-400 bg-sky-50" },
    { icon: "🛁", title: "Banho e roupa limpa", phrase: "Cuidar do corpo.", color: "border-sky-400 bg-sky-50" },
    { icon: "💧", title: "Água segura", phrase: "Tratada, filtrada ou fervida.", color: "border-emerald-400 bg-emerald-50" },
    { icon: "🥬", title: "Alimentos lavados", phrase: "Frutas e verduras limpas.", color: "border-emerald-400 bg-emerald-50" },
    { icon: "👟", title: "Calçados", phrase: "Protegem os pés.", color: "border-emerald-400 bg-emerald-50" },
    { icon: "🗑️", title: "Lixo no lugar certo", phrase: "Ambiente mais limpo.", color: "border-amber-400 bg-amber-50" },
    { icon: "⚠️", title: "Longe de riscos", phrase: "Esgoto, lixo, água suja.", color: "border-amber-400 bg-amber-50" },
    { icon: "🙋", title: "Avise um adulto", phrase: "Peça ajuda quando precisar.", color: "border-amber-400 bg-amber-50" },
    { icon: "🚫", title: "Higiene é pessoal", phrase: "Não compartilhe escova.", color: "border-violet-400 bg-violet-50" },
    { icon: "🤧", title: "Lenço no nariz", phrase: "Use e jogue no lixo.", color: "border-violet-400 bg-violet-50" },
    { icon: "💪", title: "Espirro cuidadoso", phrase: "Cubra com o braço.", color: "border-violet-400 bg-violet-50" },
    { icon: "💉", title: "Vacinas em dia", phrase: "Protegem a saúde.", color: "border-rose-400 bg-rose-50" },
    { icon: "🩺", title: "Médico e dentista", phrase: "Cuidado e prevenção.", color: "border-rose-400 bg-rose-50" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-3">
      <div className="flex items-end gap-6">
        <img src={ninaAsset.url} alt="Nina" className="h-32" />
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-emerald-700">Missão cumprida, Dupla da Saúde!</h2>
          <p className="mt-1 text-slate-700 text-sm leading-snug">
            Vocês ajudaram Nina e Nino a completar a missão! Agora já sabem que cuidar do corpo, da água, dos alimentos
            e do ambiente ajuda a proteger a saúde.
          </p>
        </div>
        <img src={ninoAsset.url} alt="Nino" className="h-32" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-800 font-black px-4 py-1">
        🏅 Selos conquistados: {seals.length} de 14
      </div>

      <div className="rounded-2xl bg-violet-50 border-4 border-violet-400 p-3 shadow-xl max-w-5xl w-full">
        <div className="text-center font-black text-violet-800 text-base mb-2">Cartaz dos Cuidados com a Saúde</div>
        <div className="grid grid-cols-4 gap-2">
          {stamps.map((s) => (
            <div
              key={s.title}
              className={`rounded-xl border-2 ${s.color} px-2 py-1.5 flex flex-col items-center text-center`}
            >
              <div className="text-2xl leading-none">{s.icon}</div>
              <div className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{s.title}</div>
              <div className="text-[11px] text-slate-600 leading-tight">{s.phrase}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-2.5 text-base"
        >
          Jogar novamente
        </button>
        <Link
          to="/"
          className="rounded-full bg-white border-2 border-slate-400 text-slate-700 font-bold px-7 py-2.5 text-base"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
