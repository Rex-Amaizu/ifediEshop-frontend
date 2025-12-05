export interface StringEntry {
  _id?: string;
  Tier: string;
  Industry: string;
  Topic: string;
  Subtopic: string;
  Prefix: string;
  "Fuzzing-Idx": string;
  Prompt: string;
  Risks: string;
  Keywords: string;
  _error?: boolean | string;
}

export interface ClassificationEntry {
  _id?: string;
  Topic: string;
  SubTopic: string;
  Industry: string;
  Classification: string;
  _error?: boolean | string;
}

export interface ValidationError {
  rowIndex: number;
  message: string;
}

export type ResponseState = {
  status: "success" | "error" | null;
  message: string;
};

export type FormDataState = {
  Tier: string;
  FuzzingIdx: string;
  Industry: string;
  Keywords: string;
  Prefix: string;
  Prompt: string;
  Risks: string;
  Topic: string;
  Subtopic: string;
};

export type ClassificationFormDataState = {
  Topic: string;
  Subtopic: string;
  Industry: string;
  Classification: string;
};

export type SelectedRowType = StringEntry | ClassificationEntry | null;
