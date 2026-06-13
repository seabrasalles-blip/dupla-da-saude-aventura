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
      { title: "Jogar — Missão Corpo Bem Cuidado" },
      {
        name: "description",
        content: "Tabuleiro do jogo Nina e Nino: ajude a Dupla da Saúde a cumprir a missão.",
      },
      { property: "og:title", content: "Jogar — Missão Corpo Bem Cuidado" },
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
      {phase === "choose" && <ChooseStarter />}
      {phase === "intro" && <Intro />}
      {(phase === "playing" || phase === "moving" || phase === "card" || phase === "rolling") && (
        <GameScreen />
      )}
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
  const start = useGame((s) => s.startGame);
  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      <h2 className="text-3xl font-black text-emerald-800 mb-6">A missão da Dupla da Saúde</h2>
      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        <div className="flex items-end gap-3">
          <img src={ninaAsset.url} alt="Nina" className="h-44" />
          <div className="rounded-2xl bg-orange-100 border-2 border-orange-300 p-3 text-sm mb-2">
            Olá! Eu sou a Nina. Hoje vamos descobrir cuidados importantes para o corpo.
          </div>
        </div>
        <div className="flex items-end gap-3 flex-row-reverse">
          <img src={ninoAsset.url} alt="Nino" className="h-44" />
          <div className="rounded-2xl bg-sky-100 border-2 border-sky-300 p-3 text-sm mb-2">
            E eu sou o Nino! Vamos aprender por que higiene, água segura e ambiente limpo ajudam a
            proteger a saúde.
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-slate-700 max-w-2xl">
        Algumas sujeiras e microrganismos são tão pequenos que não conseguimos ver. Por isso, cuidar
        do corpo e do ambiente é muito importante.
      </p>
      <button
        onClick={start}
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
  const destination = useGame((s) => s.destination);
  const phase = useGame((s) => s.phase);
  const seals = useGame((s) => s.seals);
  const reset = useGame((s) => s.reset);
  const sound = useGame((s) => s.soundOn);
  const toggleSound = useGame((s) => s.toggleSound);
  const positions = useGame((s) => s.positions);

  return (
    <div className="grid grid-cols-[1fr_280px] gap-3 p-3 h-full">
      <div className="relative">
        <Board />
        <ActiveCard />
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
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Dado (1 a 3)</div>
          <Dice />
          {phase === "moving" && destination && (
            <div className="mt-2 text-center text-sm font-semibold text-orange-700 bg-orange-100 border-2 border-orange-300 rounded-xl px-3 py-2">
              Arraste {turn === "nina" ? "a Nina" : "o Nino"} até a casa <b>{destination}</b>
            </div>
          )}
          {phase === "playing" && (
            <div className="mt-2 text-center text-xs text-slate-500">Clique no dado para começar.</div>
          )}
        </div>

        <div className="rounded-2xl bg-white border-2 border-slate-200 p-3 shadow flex-1 overflow-auto">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">
            Selos da Dupla ({seals.length}/8)
          </div>
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
          <Link
            to="/"
            className="rounded-xl bg-white border-2 border-slate-300 px-3 py-1.5 text-xs font-semibold"
          >
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
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 text-center overflow-auto">
      <div className="flex items-end gap-6">
        <img src={ninaAsset.url} alt="Nina" className="h-40" />
        <div>
          <h2 className="text-4xl font-black text-emerald-700">Missão cumprida, Dupla da Saúde!</h2>
          <p className="mt-1 text-slate-700 max-w-2xl text-sm">
            Vocês ajudaram Nina e Nino a completar a Missão Corpo Bem Cuidado. Agora vocês sabem que
            cuidar do corpo é mais do que ficar limpo — é também proteger a saúde, cuidar da água, dos
            alimentos e do ambiente.
          </p>
        </div>
        <img src={ninoAsset.url} alt="Nino" className="h-40" />
      </div>

      <div className="mt-4 rounded-2xl bg-white border-4 border-violet-400 p-4 shadow-xl max-w-3xl text-left">
        <div className="text-center font-black text-violet-800 text-lg mb-2">
          Cartaz dos Cuidados com a Saúde
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700">
          {[
            "Lavar as mãos com água e sabonete.",
            "Escovar os dentes todos os dias.",
            "Tomar banho e usar roupas limpas.",
            "Beber água tratada, filtrada ou fervida com ajuda de um adulto.",
            "Lavar frutas, verduras e legumes antes de comer.",
            "Usar calçados em locais com terra, lixo ou água suja.",
            "Jogar lixo no lugar certo.",
            "Ficar longe de esgoto, lixo e água suja.",
            "Avisar um adulto em situações de risco.",
            "Não compartilhar objetos pessoais de higiene, como a escova de dentes.",
          ].map((t) => (
            <li key={t} className="flex gap-1.5"><span>🏅</span>{t}</li>
          ))}
        </ul>
        <div className="mt-2 text-center text-xs text-slate-500">
          Selos conquistados: {seals.length}/8
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2"
        >
          Jogar novamente
        </button>
        <Link
          to="/"
          className="rounded-full bg-white border-2 border-slate-400 text-slate-700 font-bold px-6 py-2"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
