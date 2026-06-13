import { useState, type DragEvent } from "react";
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

// Special end-game icons by square number for extra delight
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
  const destination = useGame((s) => s.destination);
  const phase = useGame((s) => s.phase);
  const turn = useGame((s) => s.turn);
  const movePawnTo = useGame((s) => s.movePawnTo);
  const [navError, setNavError] = useState<string | null>(null);

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
      setNavError("Ops! Essa não é a casa sorteada. Procure a casa destacada e tente arrastar de novo.");
      setTimeout(() => setNavError(null), 2800);
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
        {/* Yellow base path */}
        <polyline
          points={pointsStr}
          fill="none"
          stroke="#FCD34D"
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dotted white overlay */}
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
        const isDest = destination === sq.n && phase === "moving";
        const icon = SPECIAL_ICONS[sq.n] ?? style.icon;
        const ninaHere = positions.nina === sq.n;
        const ninoHere = positions.nino === sq.n;
        return (
          <div
            key={sq.n}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop(sq.n)}
            className="absolute"
            style={{ left: x - R, top: y - R, width: R * 2, height: R * 2 }}
          >
            <div
              className={`relative h-full w-full rounded-full bg-gradient-to-b ${style.fill} border-[4px] border-white shadow-lg flex items-center justify-center select-none ${
                isDest ? `ring-8 ${style.ring} animate-pulse` : ""
              }`}
              title={sq.title}
            >
              <span className={`text-3xl ${style.textColor} drop-shadow-sm`} aria-hidden>
                {icon}
              </span>
              {/* Number badge */}
              <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-slate-700 text-[11px] font-black flex items-center justify-center shadow border border-slate-200">
                {sq.n}
              </span>
              {isDest && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                  ⬇️
                </span>
              )}
            </div>

            {/* Pawns */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 z-10">
              {ninaHere && (
                <Pawn player="nina" draggable={turn === "nina" && phase === "moving"} active={turn === "nina"} />
              )}
              {ninoHere && (
                <Pawn player="nino" draggable={turn === "nino" && phase === "moving"} active={turn === "nino"} />
              )}
            </div>
          </div>
        );
      })}

      {navError && (
        <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-900 shadow-md border-2 border-orange-300 z-20">
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
}: {
  player: Player;
  draggable: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`relative rounded-full bg-white border-[3px] ${
        active ? "border-emerald-400 ring-2 ring-emerald-200" : "border-slate-300"
      } shadow-md ${draggable ? "cursor-grab active:cursor-grabbing animate-pulse" : ""}`}
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

export function DiceD3() {
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

  const value = spin ? "?" : dice ?? "🎲";
  // small rotation per face for visual variety
  const faceRotation = dice === 2 ? "rotate(120deg)" : dice === 3 ? "rotate(240deg)" : "rotate(0deg)";

  return (
    <button
      onClick={onClick}
      disabled={!canRoll}
      className={`relative flex flex-col items-center justify-center ${
        canRoll ? "hover:scale-105 cursor-pointer" : "opacity-70"
      } transition-transform`}
      title="Clique para rolar o dado de 3 lados"
    >
      <div
        className={`relative ${spin ? "animate-spin" : ""}`}
        style={{ width: 100, height: 90, transform: spin ? undefined : faceRotation }}
      >
        <svg viewBox="0 0 100 90" width="100" height="90">
          <defs>
            <linearGradient id="d3grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <polygon
            points="50,6 94,82 6,82"
            fill="url(#d3grad)"
            stroke="#7c2d12"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* tiny dots at corners to suggest 3 vertices/faces */}
          <circle cx="50" cy="14" r="2.5" fill="#7c2d12" />
          <circle cx="88" cy="78" r="2.5" fill="#7c2d12" />
          <circle cx="12" cy="78" r="2.5" fill="#7c2d12" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-orange-900 drop-shadow-sm pt-3">
          {value}
        </span>
      </div>
      <span className="mt-1 text-[10px] font-bold text-slate-600 uppercase tracking-wide">D3 · 1 a 3</span>
    </button>
  );
}

// Back-compat alias
export const Dice = DiceD3;
