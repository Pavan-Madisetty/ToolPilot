import type { ToolConfig } from '@/types';
import { SEO_CONTENTS } from '@/config/seoContents';
import { TOOL_FAQS } from '@/config/faqs';
import { getFallbackSEOContent } from '@/utils/seoGenerator';

type Faq = { question: string; answer: string };

const MAX_FAQS = 10;

/** Specific FAQs first, generic (privacy / pricing) ones last, de-duplicated by question. */
export function mergeFaqs(...lists: (Faq[] | undefined)[]): Faq[] {
  const seen = new Set<string>();
  const out: Faq[] = [];
  for (const list of lists) {
    for (const f of list ?? []) {
      const key = f.question.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(f);
    }
  }
  return out.slice(0, MAX_FAQS);
}

/**
 * Single source of truth for a tool's page content, shared by the React page
 * and the build-time prerender so what Google reads matches what users see.
 */
export function resolveToolContent(base: ToolConfig): ToolConfig {
  const seo = SEO_CONTENTS[base.id] ?? {};
  const fallback = getFallbackSEOContent(base);
  return {
    ...base,
    ...fallback,
    ...seo,
    faq: mergeFaqs(TOOL_FAQS[base.id], seo.faq, base.faq, fallback.faq),
  };
}
