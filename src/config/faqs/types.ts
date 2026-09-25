export interface Faq {
  question: string;
  answer: string;
}
export type FaqMap = Record<string, Faq[]>;
