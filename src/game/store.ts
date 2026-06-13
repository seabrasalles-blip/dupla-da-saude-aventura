import { create } from "zustand";
import type { SealId } from "./types";

export type Player = "nina" | "nino";
export type Phase =
  | "choose"
  | "intro"
  | "playing"
  | "rolling"
  | "moving"
  | "card"
  | "finished";

type GameState = {
  phase: Phase;
  turn: Player;
  positions: Record<Player, number>;
  seals: SealId[];
  dice: number | null;
  destination: number | null; // square to drag to
  activeSquare: number | null; // currently open card
  keySeen: number[]; // key squares already opened
  pendingKey: number | null; // a key square to open before destination
  soundOn: boolean;

  setPhase: (p: Phase) => void;
  chooseStarter: (p: Player) => void;
  startGame: () => void;
  rollDice: () => void;
  movePawnTo: (target: number) => boolean; // returns true if correct
  openCard: (n: number) => void;
  closeCardAndProceed: () => void;
  awardSeal: (s: SealId) => void;
  reset: () => void;
  toggleSound: () => void;
};

export const useGame = create<GameState>((set, get) => ({
  phase: "choose",
  turn: "nina",
  positions: { nina: 1, nino: 1 },
  seals: [],
  dice: null,
  destination: null,
  activeSquare: null,
  keySeen: [],
  pendingKey: null,
  soundOn: true,

  setPhase: (p) => set({ phase: p }),
  chooseStarter: (p) => set({ turn: p, phase: "intro" }),
  startGame: () => set({ phase: "playing" }),

  rollDice: () => {
    const value = 1 + Math.floor(Math.random() * 3);
    const { turn, positions } = get();
    const from = positions[turn];
    const target = Math.min(30, from + value);
    set({ dice: value, destination: target, phase: "moving" });
  },

  movePawnTo: (target) => {
    const { destination, turn, positions, keySeen } = get();
    if (target !== destination) return false;
    const from = positions[turn];
    // Check if any key square in (from, target) range hasn't been seen
    const KEYS = [3, 5, 12, 15, 19, 23, 26];
    const passed = KEYS.find((k) => k > from && k < target && !keySeen.includes(k));
    const newPositions = { ...positions, [turn]: target };
    if (passed) {
      // open the key square card first, but advance position only to passed
      set({
        positions: { ...positions, [turn]: passed },
        pendingKey: target,
        activeSquare: passed,
        keySeen: [...keySeen, passed],
        phase: "card",
      });
    } else {
      set({
        positions: newPositions,
        activeSquare: target,
        keySeen: keySeen.includes(target) ? keySeen : [...keySeen, target],
        phase: "card",
      });
    }
    return true;
  },

  openCard: (n) => set({ activeSquare: n, phase: "card" }),

  closeCardAndProceed: () => {
    const { pendingKey, turn, positions, keySeen } = get();
    if (pendingKey !== null) {
      // continue to final destination
      const KEYS = [3, 5, 12, 15, 19, 23, 26];
      const from = positions[turn];
      const target = pendingKey;
      const nextKey = KEYS.find((k) => k > from && k < target && !keySeen.includes(k));
      if (nextKey) {
        set({
          positions: { ...positions, [turn]: nextKey },
          activeSquare: nextKey,
          keySeen: [...keySeen, nextKey],
          phase: "card",
        });
        return;
      }
      set({
        positions: { ...positions, [turn]: target },
        activeSquare: target,
        keySeen: keySeen.includes(target) ? keySeen : [...keySeen, target],
        pendingKey: null,
        phase: "card",
      });
      return;
    }
    // End turn
    const pos = get().positions;
    if (pos.nina >= 30 && pos.nino >= 30) {
      set({ phase: "finished", activeSquare: null, dice: null, destination: null });
      return;
    }
    const nextTurn: Player = turn === "nina" ? "nino" : "nina";
    // skip if nextTurn finished
    const finalTurn: Player = pos[nextTurn] >= 30 ? turn : nextTurn;
    set({
      turn: finalTurn,
      activeSquare: null,
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
      positions: { nina: 0, nino: 0 },
      seals: [],
      dice: null,
      destination: null,
      activeSquare: null,
      keySeen: [],
      pendingKey: null,
    }),

  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
}));
