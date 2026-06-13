import { useState, type DragEvent } from "react";
import { SQUARES } from "@/game/squares";
import { SEAL_LABELS, type SealId, type SquareData } from "@/game/types";
import { useGame, type Player } from "@/game/store";
import ninaAsset from "@/assets/nina.png.asset.json";
import ninoAsset from "@/assets/nino.png.asset.json";

const COLOR_BG: Record<SquareData["color"], string> = {
  verde: "bg-emerald-200 border-emerald-400 text-emerald-950",
  azul: "bg-sky-200 border-sky-400 text-sky-950",
  amarelo: "bg-amber-200 border-amber-400 text-amber-950",
  laranja: "bg-orange-300 border-orange-500 text-orange-950",
  roxo: "bg-violet-300 border-violet-500 text-violet-950",
};

const COLOR_LEGEND: { color: SquareData["color"]; label: string }[] = [
  { color: "verde", label: "Pergunta" },
  { color: "amarelo", label: "Desafio" },
  { color: "azul", label: "Você sabia?" },
  { color: "laranja", label: "Alerta" },
  { color: "roxo", label: "Selo final" },
];

export function CHAR(p: Player) {
  return p === "nina" ? ninaAsset.url : ninoAsset.url;
}

export function Board() {
  const positions = useGame((s) => s.positions);
  const destination = useGame((s) => s.destination);
  const phase = useGame((s) => s.phase);
  const turn = useGame((s) => s.turn);
  const movePawnTo = useGame((s) => s.movePawnTo);
  const [navError, setNavError] = useState<string | null>(null);

  // Serpentine 6 cols x 5 rows mapping
  // row 0: 1..6 L-R; row 1: 12..7 L-R (so cell shows 12,11,10,9,8,7); row 2: 13..18; row 3: 24..19; row 4: 25..30
  const cells: number[] = [];
  for (let r = 0; r < 5; r++) {
    const start = r * 6;
    const row: number[] = [];
    for (let i = 1; i <= 6; i++) row.push(start + i);
    if (r % 2 === 1) row.reverse();
    cells.push(...row);
  }

  const onDrop = (n: number) => (e: DragEvent) => {
    e.preventDefault();
    const ok = movePawnTo(n);
    if (!ok) {
      setNavError("Ops! Essa não é a casa sorteada. Procure a casa destacada e tente arrastar de novo.");
      setTimeout(() => setNavError(null), 2800);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-1.5">
        {cells.map((n) => {
          const sq = SQUARES[n - 1];
          const isDest = destination === n && phase === "moving";
          const ninaHere = positions.nina === n;
          const ninoHere = positions.nino === n;
          return (
            <div
              key={n}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop(n)}
              className={`relative h-[112px] rounded-lg border-2 p-1.5 ${COLOR_BG[sq.color]} ${
                isDest ? "ring-4 ring-yellow-400 animate-pulse shadow-lg shadow-yellow-300/60" : ""
              }`}
            >
              <div className="flex items-start justify-between text-[10px] font-bold">
                <span className={`${isDest ? "text-2xl text-yellow-700" : ""}`}>{n}</span>
                {isDest && <span className="text-yellow-700">⬇</span>}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight font-semibold line-clamp-3">
                {sq.title}
              </div>
              <div className="absolute bottom-0.5 right-0.5 flex gap-0.5">
                {ninaHere && <Pawn player="nina" draggable={turn === "nina" && phase === "moving"} />}
                {ninoHere && <Pawn player="nino" draggable={turn === "nino" && phase === "moving"} />}
              </div>
            </div>
          );
        })}
      </div>
      {navError && (
        <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-900 shadow-md border-2 border-orange-300">
          {navError}
        </div>
      )}
    </div>
  );
}

function Pawn({ player, draggable }: { player: Player; draggable: boolean }) {
  return (
    <img
      src={CHAR(player)}
      alt={player}
      draggable={draggable}
      onDragStart={(e) => e.dataTransfer.setData("text/plain", player)}
      className={`h-9 w-9 object-contain drop-shadow ${
        draggable ? "cursor-grab hover:scale-110 transition-transform" : "opacity-90"
      }`}
    />
  );
}

export function Dice() {
  const dice = useGame((s) => s.dice);
  const phase = useGame((s) => s.phase);
  const roll = useGame((s) => s.rollDice);
  const [spin, setSpin] = useState(false);
  const canRoll = phase === "playing";

  const onClick = () => {
    if (!canRoll) return;
    setSpin(true);
    setTimeout(() => {
      roll();
      setSpin(false);
    }, 600);
  };

  return (
    <button
      onClick={onClick}
      disabled={!canRoll}
      className={`relative h-24 w-24 rounded-2xl bg-gradient-to-br from-white to-slate-100 border-4 border-slate-700 shadow-xl flex items-center justify-center text-5xl font-black text-slate-800 ${
        canRoll ? "hover:scale-105 cursor-pointer" : "opacity-70"
      } ${spin ? "animate-spin" : ""}`}
      title="Clique para rolar o dado"
    >
      {spin ? "?" : dice ?? "🎲"}
    </button>
  );
}
