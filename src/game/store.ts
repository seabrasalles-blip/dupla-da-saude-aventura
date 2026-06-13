import { create } from "zustand";
import type { SealId, SquareData } from "./types";
import { SQUARE_VARIANTS } from "./squares";

export type Player = "nina" | "nino";
export type Phase =
  | "cover"
  | "intro"
  | "choose"
  | "playing"
  | "rolling"
  | "moving"
  | "landing"
  | "card"
  | "finished";

type GameState = {
  phase: Phase;
  turn: Player;
  positions: Record<Player, number>;
  seals: SealId[];
  dice: number | null;
  destination: number | null; // square to drag to (kept internal; UI hides it)
  activeSquare: number | null; // currently open card (house number)
  activeVariantIndex: number | null; // which variant of that house is active
  usedCardsByHouse: Record<number, number[]>; // variant indices already shown per house
  keySeen: number[]; // key squares already opened
  pendingKey: number | null; // a destination to continue to after a key square
  soundOn: boolean;

  setPhase: (p: Phase) => void;
  goToIntro: () => void;
  goToChoose: () => void;
  chooseStarter: (p: Player) => void;
  rollDice: () => void;
  movePawnTo: (target: number) => boolean;
  closeCardAndProceed: () => void;
  awardSeal: (s: SealId) => void;
  reset: () => void;
  toggleSound: () => void;
  getActiveSquare: () => SquareData | null;
};

// Pick the next unused variant index for a house, resetting the cycle when exhausted.
function pickVariantIndex(n: number, used: Record<number, number[]>): {
  index: number;
  nextUsed: Record<number, number[]>;
} {
  const variants = SQUARE_VARIANTS[n - 1] ?? [];
  const total = Math.max(1, variants.length);
  const alreadyUsed = used[n] ?? [];
  let pool = Array.from({ length: total }, (_, i) => i).filter((i) => !alreadyUsed.includes(i));
  let reset = false;
  if (pool.length === 0) {
    pool = Array.from({ length: total }, (_, i) => i);
    reset = true;
  }
  const index = pool[0];
  const nextUsed = {
    ...used,
    [n]: reset ? [index] : [...alreadyUsed, index],
  };
  return { index, nextUsed };
}

export const useGame = create<GameState>((set, get) => ({
  phase: "choose",
  turn: "nina",
  positions: { nina: 1, nino: 1 },
  seals: [],
  dice: null,
  destination: null,
  activeSquare: null,
  activeVariantIndex: null,
  usedCardsByHouse: {},
  keySeen: [],
  pendingKey: null,
  soundOn: true,

  setPhase: (p) => set({ phase: p }),
  chooseStarter: (p) => set({ turn: p, phase: "intro" }),
  startGame: () => set({ phase: "playing" }),

  rollDice: () => {
    // D6 limited to 1–4
    const value = 1 + Math.floor(Math.random() * 4);
    const { turn, positions } = get();
    const from = positions[turn];
    const target = Math.min(30, from + value);
    set({ dice: value, destination: target, phase: "moving" });
  },

  movePawnTo: (target) => {
    const { destination, turn, positions, keySeen, usedCardsByHouse } = get();
    if (target !== destination) return false;
    const from = positions[turn];
    const KEYS = [3, 5, 12, 15, 19, 23, 26];
    const passed = KEYS.find((k) => k > from && k < target && !keySeen.includes(k));
    if (passed) {
      const { index, nextUsed } = pickVariantIndex(passed, usedCardsByHouse);
      set({
        positions: { ...positions, [turn]: passed },
        pendingKey: target,
        activeSquare: passed,
        activeVariantIndex: index,
        usedCardsByHouse: nextUsed,
        keySeen: [...keySeen, passed],
        phase: "landing",
      });
    } else {
      const { index, nextUsed } = pickVariantIndex(target, usedCardsByHouse);
      set({
        positions: { ...positions, [turn]: target },
        activeSquare: target,
        activeVariantIndex: index,
        usedCardsByHouse: nextUsed,
        keySeen: keySeen.includes(target) ? keySeen : [...keySeen, target],
        phase: "landing",
      });
    }
    return true;
  },

  closeCardAndProceed: () => {
    const { pendingKey, turn, positions, keySeen, usedCardsByHouse } = get();
    if (pendingKey !== null) {
      const KEYS = [3, 5, 12, 15, 19, 23, 26];
      const from = positions[turn];
      const target = pendingKey;
      const nextKey = KEYS.find((k) => k > from && k < target && !keySeen.includes(k));
      if (nextKey) {
        const { index, nextUsed } = pickVariantIndex(nextKey, usedCardsByHouse);
        set({
          positions: { ...positions, [turn]: nextKey },
          activeSquare: nextKey,
          activeVariantIndex: index,
          usedCardsByHouse: nextUsed,
          keySeen: [...keySeen, nextKey],
          phase: "landing",
        });
        return;
      }
      const { index, nextUsed } = pickVariantIndex(target, usedCardsByHouse);
      set({
        positions: { ...positions, [turn]: target },
        activeSquare: target,
        activeVariantIndex: index,
        usedCardsByHouse: nextUsed,
        keySeen: keySeen.includes(target) ? keySeen : [...keySeen, target],
        pendingKey: null,
        phase: "landing",
      });
      return;
    }
    // End turn
    const pos = get().positions;
    if (pos.nina >= 30 && pos.nino >= 30) {
      set({
        phase: "finished",
        activeSquare: null,
        activeVariantIndex: null,
        dice: null,
        destination: null,
      });
      return;
    }
    const nextTurn: Player = turn === "nina" ? "nino" : "nina";
    const finalTurn: Player = pos[nextTurn] >= 30 ? turn : nextTurn;
    set({
      turn: finalTurn,
      activeSquare: null,
      activeVariantIndex: null,
      dice: null,
      destination: null,
      phase: "playing",
    });
  },

  awardSeal: (s) =>
    set((st) => (st.seals.includes(s) ? st : { seals: [...st.seals, s] })),

  reset: () =>
    set({
      phase: "choose",
      turn: "nina",
      positions: { nina: 1, nino: 1 },
      seals: [],
      dice: null,
      destination: null,
      activeSquare: null,
      activeVariantIndex: null,
      usedCardsByHouse: {},
      keySeen: [],
      pendingKey: null,
    }),

  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

  getActiveSquare: () => {
    const { activeSquare, activeVariantIndex } = get();
    if (activeSquare == null) return null;
    const variants = SQUARE_VARIANTS[activeSquare - 1] ?? [];
    if (variants.length === 0) return null;
    const idx = activeVariantIndex ?? 0;
    return variants[Math.min(idx, variants.length - 1)] ?? variants[0];
  },
}));
