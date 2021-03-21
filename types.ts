export type Dictionary<T> = { [key: string]: T };

export type AntiPattern = {
  name: string;
  aka?: string[];
  problem: string;
  solution: string;
};
export type Pattern = {
  name: string;
  intent: string;
  problem: string;
  structure: string;
};
