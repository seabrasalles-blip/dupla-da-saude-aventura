import { useMemo, useState, type DragEvent } from "react";
import { SEAL_LABELS, type SealId, type SquareData } from "@/game/types";
import { useGame } from "@/game/store";
import ninaAsset from "@/assets/nina.png.asset.json";
import ninoAsset from "@/assets/nino.png.asset.json";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle ensuring result is not strictly equal to the original sequence [0..n-1]
function shuffleNotIdentity(n: number): number[] {
  if (n <= 1) return Array.from({ length: n }, (_, i) => i);
  let out = shuffle(Array.from({ length: n }, (_, i) => i));
  let tries = 0;
  while (out.every((v, i) => v === i) && tries < 10) {
    out = shuffle(out);
    tries++;
  }
  if (out.every((v, i) => v === i)) {
    [out[0], out[1]] = [out[1], out[0]];
  }
  return out;
}

export function ActiveCard() {
  const phase = useGame((s) => s.phase);
  const sq = useGame((s) => s.getActiveSquare());
  if (phase !== "card" || !sq) return null;
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[760px] max-h-[600px] overflow-auto rounded-2xl bg-white border-4 border-slate-800 shadow-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full bg-slate-800 text-white px-2.5 py-0.5 text-xs font-bold">
            Casa {sq.n}
          </span>
          <h3 className="text-lg font-bold text-slate-800">{sq.title}</h3>
        </div>
        <CardBody sq={sq} />
      </div>
    </div>
  );
}

function CardBody({ sq }: { sq: SquareData }) {
  if (sq.kind === "question" || sq.kind === "alert") return <QuestionCard sq={sq} />;
  if (sq.kind === "drag") return <DragCard sq={sq} />;
  if (sq.kind === "classify") return <ClassifyCard sq={sq} />;
  if (sq.kind === "sequence") return <SequenceCard sq={sq} />;
  if (sq.kind === "didyouknow") return <DidYouKnowCard sq={sq} />;
  if (sq.kind === "final") return <FinalCard sq={sq} />;
  return null;
}

function ContinueBtn({ disabled }: { disabled?: boolean }) {
  const proceed = useGame((s) => s.closeCardAndProceed);
  return (
    <button
      onClick={proceed}
      disabled={disabled}
      className="mt-3 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 shadow-md"
    >
      Continuar
    </button>
  );
}

function Feedback({ kind, text }: { kind: "ok" | "err"; text: string }) {
  return (
    <div
      className={`mt-3 rounded-xl p-3 border-2 text-sm font-medium ${
        kind === "ok"
          ? "bg-emerald-50 border-emerald-400 text-emerald-900"
          : "bg-rose-50 border-rose-400 text-rose-900"
      }`}
    >
      {text}
    </div>
  );
}

type QuestionSq = Extract<SquareData, { kind: "question" | "alert" }>;
function QuestionCard({ sq }: { sq: QuestionSq }) {
  const award = useGame((s) => s.awardSeal);
  const [chosen, setChosen] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const order = useMemo(() => shuffle(sq.options.map((_, i) => i)), [sq]);

  const choose = (origIdx: number) => {
    setChosen(origIdx);
    if (sq.options[origIdx].correct) {
      setSolved(true);
      const seal = sq.options[origIdx].awardSeal;
      if (seal) award(seal);
    }
  };

  return (
    <div>
      <p className="text-base text-slate-700 mb-3">{sq.prompt}</p>
      <div className="space-y-2">
        {order.map((origIdx, displayIdx) => {
          const o = sq.options[origIdx];
          const picked = chosen === origIdx;
          const showState = picked || (solved && o.correct);
          return (
            <button
              key={origIdx}
              disabled={solved}
              onClick={() => choose(origIdx)}
              className={`w-full text-left rounded-xl border-2 px-4 py-2.5 font-medium transition ${
                showState
                  ? o.correct
                    ? "bg-emerald-100 border-emerald-500"
                    : "bg-rose-100 border-rose-500"
                  : "bg-white border-slate-300 hover:border-slate-500"
              }`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + displayIdx)}.</span>
              {o.label}
            </button>
          );
        })}
      </div>
      {chosen !== null && !sq.options[chosen].correct && !solved && (
        <>
          <Feedback kind="err" text={sq.options[chosen].feedback} />
          <button
            onClick={() => setChosen(null)}
            className="mt-2 text-sm rounded-full border-2 border-slate-400 px-4 py-1.5 font-semibold hover:bg-slate-100"
          >
            Tentar novamente
          </button>
        </>
      )}
      {solved && <Feedback kind="ok" text={sq.successFeedback} />}
      <ContinueBtn disabled={!solved} />
    </div>
  );
}

type DragSq = Extract<SquareData, { kind: "drag" }>;
function DragCard({ sq }: { sq: DragSq }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const correctIdxs = sq.items.map((it, i) => (it.correct ? i : -1)).filter((i) => i >= 0);
  const allDone = correctIdxs.every((i) => placed.includes(i));

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const i = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(i)) return;
    const item = sq.items[i];
    if (item.correct) {
      if (!placed.includes(i)) setPlaced([...placed, i]);
      setErrMsg(null);
    } else {
      setErrMsg(item.feedback);
    }
  };

  const order = useMemo(() => shuffle(sq.items.map((_, i) => i)), [sq]);

  return (
    <div>
      <p className="text-base text-slate-700 mb-3">{sq.prompt}</p>
      <div className="grid grid-cols-[1fr_220px] gap-4">
        <div className="flex flex-wrap gap-2 content-start">
          {order.map((i) =>
            placed.includes(i) ? null : (
              <div
                key={i}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
                className="cursor-grab rounded-lg bg-white border-2 border-slate-400 px-3 py-1.5 text-sm font-semibold shadow-sm hover:border-slate-700"
              >
                {sq.items[i].label}
              </div>
            ),
          )}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="min-h-[160px] rounded-2xl border-4 border-dashed border-emerald-500 bg-emerald-50 p-3 flex flex-col"
        >
          <div className="font-bold text-emerald-800 text-sm mb-2">{sq.targetLabel}</div>
          <div className="flex flex-wrap gap-1.5 content-start">
            {placed.map((i) => (
              <span
                key={i}
                className="rounded-md bg-emerald-200 border border-emerald-500 px-2 py-1 text-xs font-semibold"
              >
                {sq.items[i].label}
              </span>
            ))}
          </div>
        </div>
      </div>
      {errMsg && <Feedback kind="err" text={errMsg} />}
      {allDone && <Feedback kind="ok" text={sq.successFeedback} />}
      <ContinueBtn disabled={!allDone} />
    </div>
  );
}

type ClassifySq = Extract<SquareData, { kind: "classify" }>;
function ClassifyCard({ sq }: { sq: ClassifySq }) {
  const [placed, setPlaced] = useState<Record<number, "A" | "B">>({});
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const allDone = sq.items.every((it, i) => placed[i] === it.group);

  const onDrop = (group: "A" | "B") => (e: DragEvent) => {
    e.preventDefault();
    const i = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(i)) return;
    const item = sq.items[i];
    if (item.group === group) {
      setPlaced({ ...placed, [i]: group });
      setErrMsg(null);
    } else {
      setErrMsg(item.feedbackWrong);
    }
  };

  const order = useMemo(() => shuffle(sq.items.map((_, i) => i)), [sq]);

  return (
    <div>
      <p className="text-base text-slate-700 mb-3">{sq.prompt}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {order.map((i) =>
          placed[i] ? null : (
            <div
              key={i}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
              className="cursor-grab rounded-lg bg-white border-2 border-slate-400 px-3 py-1.5 text-sm font-semibold shadow-sm hover:border-slate-700"
            >
              {sq.items[i].label}
            </div>
          ),
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(["A", "B"] as const).map((g) => (
          <div
            key={g}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop(g)}
            className={`min-h-[120px] rounded-2xl border-4 border-dashed p-2.5 ${
              g === "A" ? "border-emerald-500 bg-emerald-50" : "border-rose-500 bg-rose-50"
            }`}
          >
            <div className={`text-sm font-bold ${g === "A" ? "text-emerald-800" : "text-rose-800"}`}>
              {g === "A" ? sq.groupALabel : sq.groupBLabel}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {Object.entries(placed)
                .filter(([, gr]) => gr === g)
                .map(([i]) => (
                  <span
                    key={i}
                    className="rounded-md bg-white border border-slate-400 px-2 py-1 text-xs font-semibold"
                  >
                    {sq.items[Number(i)].label}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      {errMsg && <Feedback kind="err" text={errMsg} />}
      {allDone && <Feedback kind="ok" text={sq.successFeedback} />}
      <ContinueBtn disabled={!allDone} />
    </div>
  );
}

type SequenceSq = Extract<SquareData, { kind: "sequence" }>;
function SequenceCard({ sq }: { sq: SequenceSq }) {
  const n = sq.cards.length;
  const initialPool = () => shuffleNotIdentity(n);
  const [order, setOrder] = useState<(number | null)[]>(() => Array(n).fill(null));
  const [pool, setPool] = useState<number[]>(initialPool);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const filled = order.every((x) => x !== null);
  const correct = filled && order.every((x, i) => x === i);

  const placeAt = (slot: number, idx: number) => {
    if (order[slot] !== null) return;
    const newOrder = [...order];
    newOrder[slot] = idx;
    setOrder(newOrder);
    setPool(pool.filter((p) => p !== idx));
    setErrMsg(null);
  };

  const findFeedback = (keys: string[]) =>
    sq.wrongFeedbacks.find((f) => keys.includes(f.when))?.feedback;

  const check = () => {
    if (!filled || correct) return;
    const pos = (idx: number) => order.indexOf(idx);
    let msg: string | undefined;
    // Casa 6 rules (5 cards) — also tolerated for other sequences via key fallback
    if (n >= 5 && pos(4) >= 0 && pos(2) >= 0 && pos(4) < pos(2)) {
      msg = findFeedback(["guardar-antes", "flush-last"]);
    } else if (n >= 4 && pos(3) >= 0 && pos(2) >= 0 && pos(3) < pos(2)) {
      msg = findFeedback(["enxaguar-antes"]);
    } else if (
      pos(2) >= 0 &&
      ((pos(0) >= 0 && pos(2) < pos(0)) || (pos(1) >= 0 && pos(2) < pos(1)))
    ) {
      msg = findFeedback(["escovar-sem-preparar", "wash-first"]);
    }
    // Casa 12 legacy rules (3 cards)
    if (!msg && n === 3) {
      if (order[0] === 2) msg = findFeedback(["wash-first"]);
      else if (order[2] === 1) msg = findFeedback(["flush-last"]);
      else msg = findFeedback(["no-wash-end"]);
    }
    setErrMsg(msg ?? sq.wrongFeedbacks[0]?.feedback ?? "Tente outra ordem.");
  };

  const reset = () => {
    setOrder(Array(n).fill(null));
    setPool(initialPool());
    setErrMsg(null);
  };

  const slotCols =
    n <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5";

  return (
    <div>
      <p className="text-base text-slate-700 mb-3">{sq.prompt}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {pool.map((i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
            className="cursor-grab rounded-lg bg-white border-2 border-slate-400 px-3 py-2 text-sm font-semibold shadow-sm"
          >
            {sq.cards[i].label}
          </div>
        ))}
      </div>
      <div className={`grid ${slotCols} gap-2`}>
        {order.map((idx, slot) => (
          <div
            key={slot}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const i = Number(e.dataTransfer.getData("text/plain"));
              if (!Number.isNaN(i)) placeAt(slot, i);
            }}
            className="relative min-h-[70px] rounded-xl border-4 border-dashed border-sky-400 bg-sky-50 p-2 text-sm font-semibold flex items-center justify-center text-center"
          >
            <span className="absolute -top-5 left-1 text-xs text-sky-700 font-bold">{slot + 1}º</span>
            {idx !== null ? sq.cards[idx].label : `Solte aqui`}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        {filled && !correct && (
          <button
            onClick={check}
            className="rounded-full bg-slate-800 text-white px-4 py-1.5 text-sm font-semibold"
          >
            Verificar
          </button>
        )}
        {filled && !correct && (
          <button
            onClick={reset}
            className="rounded-full border-2 border-slate-400 px-4 py-1.5 text-sm font-semibold"
          >
            Tentar novamente
          </button>
        )}
      </div>
      {errMsg && <Feedback kind="err" text={errMsg} />}
      {correct && <Feedback kind="ok" text={sq.successFeedback} />}
      <ContinueBtn disabled={!correct} />
    </div>
  );
}

type DidYouKnowSq = Extract<SquareData, { kind: "didyouknow" }>;
function DidYouKnowCard({ sq }: { sq: DidYouKnowSq }) {
  const award = useGame((s) => s.awardSeal);
  const seals = useGame((s) => s.seals);
  const has = sq.seal ? seals.includes(sq.seal) : true;

  return (
    <div>
      <div className="rounded-xl bg-sky-50 border-2 border-sky-300 p-4">
        <div className="font-bold text-sky-900 mb-1">Você sabia?</div>
        <p className="text-slate-800">{sq.text}</p>
      </div>
      {sq.seal && (
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => award(sq.seal!)}
            disabled={has}
            className={`relative h-24 w-24 rounded-full border-4 font-bold text-xs text-center leading-tight p-2 transition ${
              has
                ? "bg-amber-300 border-amber-600 text-amber-900"
                : "bg-amber-200 border-amber-500 text-amber-900 hover:scale-110 cursor-pointer animate-pulse"
            }`}
          >
            {has ? "✓ " : ""}
            {SEAL_LABELS[sq.seal]}
          </button>
          <div className="text-sm text-slate-700">
            {has
              ? sq.sealMessage
              : "Toque no selo para guardar no Cartaz dos Cuidados com a Saúde."}
          </div>
        </div>
      )}
      <ContinueBtn disabled={sq.seal ? !has : false} />
    </div>
  );
}

type FinalSq = Extract<SquareData, { kind: "final" }>;
function FinalCard({ sq }: { sq: FinalSq }) {
  const seals = useGame((s) => s.seals);
  const [placed, setPlaced] = useState<SealId[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const allItems: { id: string; label: string; correct: boolean; sealId?: SealId }[] = useMemo(
    () => [
      ...sq.correctSeals.map((s) => ({ id: s, label: SEAL_LABELS[s], correct: true, sealId: s as SealId })),
      ...sq.wrongActions.map((w) => ({ id: w.label, label: w.label, correct: false })),
    ],
    [sq],
  );
  const shuffledItems = useMemo(() => shuffle(allItems), [allItems]);
  const visible = shuffledItems.filter((it) => !it.correct || (it.sealId && seals.includes(it.sealId)));
  const allDone = sq.correctSeals.filter((s) => seals.includes(s)).every((s) => placed.includes(s));

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = allItems.find((it) => it.id === id);
    if (!item) return;
    if (item.correct && item.sealId) {
      if (!placed.includes(item.sealId)) setPlaced([...placed, item.sealId]);
      setErrMsg(null);
    } else {
      setErrMsg(sq.wrongGenericFeedback);
    }
  };

  return (
    <div>
      <p className="text-base text-slate-700 mb-3">{sq.prompt}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {visible
          .filter((it) => !(it.sealId && placed.includes(it.sealId)))
          .map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
              className="cursor-grab rounded-lg border-2 border-slate-400 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm hover:border-slate-700"
            >
              {it.label}
            </div>
          ))}
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="min-h-[140px] rounded-2xl border-4 border-dashed border-violet-500 bg-violet-50 p-3"
      >
        <div className="font-bold text-violet-800 mb-2">Cartaz dos Cuidados com a Saúde</div>
        <div className="flex flex-wrap gap-1.5">
          {placed.map((s) => (
            <span
              key={s}
              className="rounded-full bg-amber-300 border-2 border-amber-600 px-2.5 py-1 text-xs font-bold"
            >
              🏅 {SEAL_LABELS[s]}
            </span>
          ))}
        </div>
      </div>
      {errMsg && <Feedback kind="err" text={errMsg} />}
      {allDone && <Feedback kind="ok" text={sq.successFeedback} />}
      <ContinueBtn disabled={!allDone} />
    </div>
  );
}
