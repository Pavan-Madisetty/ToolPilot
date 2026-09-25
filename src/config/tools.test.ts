import { describe, it, expect } from 'vitest';
import { TOOLS, TOOL_BY_ID, IMPLEMENTED_TOOL_IDS } from './tools';
import { EXTRA_TOOLS } from './extraTools';
import { EXTRA_ROUTES } from '@/pages/tools/extraRoutes';
import { MODULES } from './modules';

describe('tool registry integrity', () => {
  it('has unique ids and slugs', () => {
    expect(new Set(TOOLS.map((t) => t.id)).size).toBe(TOOLS.length);
    expect(new Set(TOOLS.map((t) => t.slug)).size).toBe(TOOLS.length);
  });

  it('every tool belongs to a known module and its slug starts with a route prefix', () => {
    const keys = new Set(MODULES.map((m) => m.key));
    for (const t of TOOLS) {
      expect(keys.has(t.module), `${t.id} module`).toBe(true);
      expect(t.slug.startsWith('/'), `${t.id} slug`).toBe(true);
    }
  });

  it('relatedTools only reference tools that exist', () => {
    for (const t of TOOLS) {
      for (const rid of t.relatedTools ?? []) expect(TOOL_BY_ID[rid], `${t.id} → ${rid}`).toBeDefined();
    }
  });

  it('every extra tool has a route and is marked implemented', () => {
    const paths = new Set(EXTRA_ROUTES.map((r) => `/${r.path}`));
    for (const t of EXTRA_TOOLS) {
      expect(paths.has(t.slug), `${t.id} route`).toBe(true);
      expect(IMPLEMENTED_TOOL_IDS.has(t.id), `${t.id} implemented`).toBe(true);
    }
    expect(EXTRA_ROUTES.length).toBe(EXTRA_TOOLS.length);
  });

  it('implemented ids all exist in the registry', () => {
    for (const id of IMPLEMENTED_TOOL_IDS) expect(TOOL_BY_ID[id], id).toBeDefined();
  });

  it('every tool has SEO fields within sensible limits', () => {
    for (const t of TOOLS) {
      expect(t.metaTitle.length, `${t.id} metaTitle`).toBeLessThanOrEqual(90);
      expect(t.metaDescription.length, `${t.id} metaDescription`).toBeGreaterThan(30);
    }
  });
});
