export type SealId =
  | "maos-limpas"
  | "dentes-bem-cuidados"
  | "agua-segura"
  | "alimentos-lavados"
  | "corpo-protegido"
  | "ambiente-saudavel"
  | "quintal-cuidado"
  | "objeto-pessoal"
  | "vacina-em-dia"
  | "cuidado-medico"
  | "dentista-amigo"
  | "prevencao"
  | "nariz-limpo"
  | "espirro-cuidadoso";

export const SEAL_LABELS: Record<SealId, string> = {
  "maos-limpas": "Mãos limpas",
  "dentes-bem-cuidados": "Dentes bem cuidados",
  "agua-segura": "Água segura",
  "alimentos-lavados": "Alimentos lavados",
  "corpo-protegido": "Corpo protegido",
  "ambiente-saudavel": "Ambiente saudável",
  "quintal-cuidado": "Quintal cuidado",
  "objeto-pessoal": "Objeto pessoal",
  "vacina-em-dia": "Vacina em dia",
  "cuidado-medico": "Cuidado médico",
  "dentista-amigo": "Dentista amigo",
  prevencao: "Prevenção",
  "nariz-limpo": "Nariz limpo",
  "espirro-cuidadoso": "Espirro cuidadoso",
};

export const ALL_SEALS: SealId[] = Object.keys(SEAL_LABELS) as SealId[];

export type QuestionOption = {
  label: string;
  correct: boolean;
  feedback: string;
  awardSeal?: SealId;
};

export type DragItem = {
  label: string;
  correct: boolean;
  feedback: string;
};

export type ClassifyItem = {
  label: string;
  group: "A" | "B";
  feedbackWrong: string;
};

export type SequenceCard = { label: string };

export type BaseSquare = {
  n: number;
  title: string;
  color: "verde" | "azul" | "amarelo" | "laranja" | "roxo";
};

export type SquareData = BaseSquare &
  (
    | {
        kind: "question" | "alert";
        prompt: string;
        options: QuestionOption[];
        successFeedback: string;
      }
    | {
        kind: "drag";
        prompt: string;
        targetLabel: string;
        items: DragItem[];
        successFeedback: string;
      }
    | {
        kind: "classify";
        prompt: string;
        groupALabel: string;
        groupBLabel: string;
        items: ClassifyItem[];
        successFeedback: string;
      }
    | {
        kind: "sequence";
        prompt: string;
        cards: SequenceCard[]; // correct order
        wrongFeedbacks: { when: string; feedback: string }[];
        successFeedback: string;
      }
    | {
        kind: "didyouknow";
        text: string;
        seal?: SealId;
        sealMessage?: string;
        keySquare?: boolean;
      }
    | {
        kind: "final";
        prompt: string;
        correctSeals: SealId[];
        wrongActions: { label: string; feedback: string }[];
        successFeedback: string;
        wrongGenericFeedback: string;
      }
  );

export const KEY_SQUARES = [3, 5, 12, 15, 19, 23, 26] as const;
