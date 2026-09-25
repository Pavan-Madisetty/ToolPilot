import type { FaqMap } from './types';
import { FAQS as financeA } from './group-finance-a';
import { FAQS as financeB } from './group-finance-b';
import { FAQS as devConversion } from './group-dev-conversion';
import { FAQS as mediaAi } from './group-media-ai';
import { FAQS as textUtilsProductivity } from './group-text-utils-productivity';
import { FAQS as eduHealthTravelBusiness } from './group-edu-health-travel-business';

/**
 * Tool-specific FAQs, keyed by tool id. One file per group keeps each reviewable;
 * every tool id in `tools.ts` must have an entry (enforced by `faqs.test.ts`).
 * Answers target search intent: what a person would type into Google, in plain language.
 * (Static imports rather than import.meta.glob so the Node prerender script can load this.)
 */
export const TOOL_FAQS: FaqMap = {
  ...financeA,
  ...financeB,
  ...devConversion,
  ...mediaAi,
  ...textUtilsProductivity,
  ...eduHealthTravelBusiness,
};
export type { Faq, FaqMap } from './types';
