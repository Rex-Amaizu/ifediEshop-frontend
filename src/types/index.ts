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
  _error?: boolean;
}

export interface ClassificationEntry {
  _id?: string;
  Topic: string;
  SubTopic: string;
  Industry: string;
  Classification: string;
}

export interface ValidationError {
  rowIndex: number;
  message: string;
}
