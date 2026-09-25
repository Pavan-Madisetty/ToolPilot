import { describe, it, expect } from 'vitest';
import { TOOLS } from '@/config/tools';
import { TOOL_FAQS } from '@/config/faqs';
import { resolveToolContent } from '@/utils/toolContent';

describe('tool FAQs', () => {
  it('has no entries for unknown tools', () => {
    const ids = new Set(TOOLS.map((t) => t.id));
    expect(Object.keys(TOOL_FAQS).filter((id) => !ids.has(id))).toEqual([]);
  });

  it.each(TOOLS.map((t) => [t.id]))('%s has 5–8 specific, well-formed FAQs', (id) => {
    const faqs = TOOL_FAQS[id];
    expect(faqs, `missing FAQs for ${id}`).toBeDefined();
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(8);
    const seen = new Set<string>();
    for (const f of faqs) {
      expect(f.question.trim().endsWith('?'), `${id}: "${f.question}" must end with ?`).toBe(true);
      expect(f.question.length).toBeGreaterThan(15);
      expect(f.question.length).toBeLessThan(140);
      expect(f.answer.length, `${id}: answer too short: ${f.question}`).toBeGreaterThanOrEqual(60);
      expect(f.answer.length, `${id}: answer too long: ${f.question}`).toBeLessThanOrEqual(650);
      expect(f.answer).not.toMatch(/\*\*|^#|TODO|lorem ipsum dolor|as an ai/i);
      const k = f.question.toLowerCase();
      expect(seen.has(k), `${id}: duplicate question ${f.question}`).toBe(false);
      seen.add(k);
    }
  });

  it('resolves to at most 10 unique FAQs with specific ones first', () => {
    for (const t of TOOLS) {
      const faq = resolveToolContent(t).faq ?? [];
      expect(faq.length).toBeLessThanOrEqual(10);
      expect(faq[0]).toEqual(TOOL_FAQS[t.id][0]);
      expect(new Set(faq.map((f) => f.question.toLowerCase())).size).toBe(faq.length);
    }
  });
});
