import { useEffect, useState, type DragEvent } from "react";
import { SQUARES } from "@/game/squares";
import type { SquareData } from "@/game/types";
import { useGame, type Player } from "@/game/store";
import ninaAsset from "@/assets/nina.png.asset.json";
import ninoAsset from "@/assets/nino.png.asset.json";

// Board geometry (fits inside a ~900x600 area)
const COLS = 6;
const ROWS = 5;
const CX0 = 70;
const CY0 = 60;
const DX = 140;
const DY = 118;
const R = 40; // circle radius

function cellCenter(n: number): { x: number; y: number } {
  const idx = n - 1;
  const row = Math.floor(idx / COLS);
  const colInRow = idx % COLS;
  const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
  return { x: CX0 + col * DX, y: CY0 + row * DY };
}

// Visual mapping based on the original square.color taxonomy
const NODE_STYLE: Record<
  SquareData["color"],
  { fill: string; ring: string; icon: string; textColor: string }
> = {
  verde: { fill: "from-sky-400 to-sky-600", ring: "ring-sky-300", icon: "?", textColor: "text-white" },
  azul: { fill: "from-violet-400 to-violet-600", ring: "ring-violet-300", icon: "💡", textColor: "text-white" },
  amarelo: { fill: "from-orange-400 to-orange-600", ring: "ring-orange-300", icon: "✨", textColor: "text-white" },
  laranja: { fill: "from-amber-500 to-orange-600", ring: "ring-amber-300", icon: "🔄", textColor: "text-white" },
  roxo: { fill: "from-orange-500 to-rose-600", ring: "ring-orange-300", icon: "🏆", textColor: "text-white" },
};

const SPECIAL_ICONS: Record<number, string> = {
  26: "🔗",
  27: "⭐",
  28: "✨",
  29: "📘",
  30: "🏆",
};

export function CHAR(p: Player) {
  return p === "nina" ? ninaAsset.url : ninoAsset.url;
}

export function Board() {
  const positions = useGame((s) => s.positions);
  const phase = useGame((s) => s.phase);
  const turn = useGame((s) => s.turn);
  const movePawnTo = useGame((s) => s.movePawnTo);
  const setPhase = useGame((s) => s.setPhase);
  const dice = useGame((s) => s.dice);
  const [navError, setNavError] = useState<string | null>(null);

  // Auto-transition: landing → card after a short bounce so the child sees
  // the pawn arrive before the card appears.
  useEffect(() => {
    if (phase === "landing") {
      const t = setTimeout(() => setPhase("card"), 750);
      return () => clearTimeout(t);
    }
  }, [phase, setPhase]);

  const width = CX0 * 2 + (COLS - 1) * DX;
  const height = CY0 * 2 + (ROWS - 1) * DY;

  // Build polyline points 1..30 for the trail
  const points: { x: number; y: number }[] = [];
  for (let n = 1; n <= 30; n++) points.push(cellCenter(n));
  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  const onDrop = (n: number) => (e: DragEvent) => {
    e.preventDefault();
    const ok = movePawnTo(n);
    if (!ok) {
      const valueTxt = dice != null ? ` O valor do dado foi ${dice}.` : "";
      setNavError(
        `Conte as casas a partir da sua posição.${valueTxt} Tente arrastar até a casa certa.`
      );
      setTimeout(() => setNavError(null), 3200);
    }
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Trail */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          points={pointsStr}
          fill="none"
          stroke="#FCD34D"
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={pointsStr}
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 10"
        />
      </svg>

      {/* Nodes */}
      {SQUARES.map((sq) => {
        const { x, y } = cellCenter(sq.n);
        const style = NODE_STYLE[sq.color];
        const icon = SPECIAL_ICONS[sq.n] ?? style.icon;
        const ninaHere = positions.nina === sq.n;
        const ninoHere = positions.nino === sq.n;
        const bouncing = phase === "landing" && (ninaHere || ninoHere) && positions[turn] === sq.n;
        return (
          <div
            key={sq.n}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop(sq.n)}
            className="absolute"
            style={{ left: x - R, top: y - R, width: R * 2, height: R * 2 }}
          >
            <div
              className={`relative h-full w-full rounded-full bg-gradient-to-b ${style.fill} border-[4px] border-white shadow-lg flex items-center justify-center select-none`}
              title={sq.title}
            >
              <span className="text-3xl text-white drop-shadow-sm" aria-hidden>
                {icon}
              </span>
              <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-slate-700 text-[11px] font-black flex items-center justify-center shadow border border-slate-200">
                {sq.n}
              </span>
            </div>

            {/* Pawns */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 z-10">
              {ninaHere && (
                <Pawn
                  player="nina"
                  draggable={turn === "nina" && phase === "moving"}
                  active={turn === "nina"}
                  bouncing={bouncing && turn === "nina"}
                />
              )}
              {ninoHere && (
                <Pawn
                  player="nino"
                  draggable={turn === "nino" && phase === "moving"}
                  active={turn === "nino"}
                  bouncing={bouncing && turn === "nino"}
                />
              )}
            </div>
          </div>
        );
      })}

      {navError && (
        <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-900 shadow-md border-2 border-orange-300 z-20 text-center max-w-[90%]">
          {navError}
        </div>
      )}
    </div>
  );
}

function Pawn({
  player,
  draggable,
  active,
  bouncing,
}: {
  player: Player;
  draggable: boolean;
  active: boolean;
  bouncing?: boolean;
}) {
  return (
    <div
      className={`relative rounded-full bg-white border-[3px] ${
        active ? "border-emerald-400 ring-2 ring-emerald-200" : "border-slate-300"
      } shadow-md ${draggable ? "cursor-grab active:cursor-grabbing animate-pulse" : ""} ${
        bouncing ? "animate-bounce" : ""
      }`}
      style={{ width: 48, height: 48 }}
    >
      <img
        src={CHAR(player)}
        alt={player}
        draggable={draggable}
        onDragStart={(e) => e.dataTransfer.setData("text/plain", player)}
        className={`h-full w-full object-contain rounded-full ${
          draggable ? "hover:scale-110 transition-transform" : ""
        }`}
      />
    </div>
  );
}

// Pip positions on a die face (0..1 coords)
const PIPS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [
    [0.28, 0.28],
    [0.72, 0.72],
  ],
  3: [
    [0.25, 0.25],
    [0.5, 0.5],
    [0.75, 0.75],
  ],
  4: [
    [0.28, 0.28],
    [0.72, 0.28],
    [0.28, 0.72],
    [0.72, 0.72],
  ],
};

function DieFace({ value }: { value: number }) {
  const pips = PIPS[value] ?? [];
  return (
    <svg viewBox="0 0 100 100" width="74" height="74">
      <defs>
        <linearGradient id="d6face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="16"
        fill="url(#d6face)"
        stroke="#047857"
        strokeWidth="5"
      />
      {pips.map(([px, py], i) => (
        <circle key={i} cx={6 + px * 88} cy={6 + py * 88} r="8" fill="#047857" />
      ))}
    </svg>
  );
}

export function DiceD6() {
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

  const display = spin ? null : dice;

  return (
    <button
      onClick={onClick}
      disabled={!canRoll}
      className={`relative flex flex-col items-center justify-center ${
        canRoll ? "hover:scale-105 cursor-pointer" : "opacity-70"
      } transition-transform`}
      title="Clique para rolar o dado"
    >
      <div
        className={`relative ${spin ? "animate-spin" : ""}`}
        style={{ width: 74, height: 74 }}
      >
        {display ? (
          <DieFace value={display} />
        ) : (
          <div className="h-full w-full rounded-2xl bg-emerald-50 border-4 border-emerald-600 flex items-center justify-center text-3xl font-black text-emerald-700">
            {spin ? "?" : "🎲"}
          </div>
        )}
      </div>
      <span className="mt-1 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
        Dado · 1 a 4
      </span>
    </button>
  );
}

// Back-compat alias
export const Dice = DiceD6;
