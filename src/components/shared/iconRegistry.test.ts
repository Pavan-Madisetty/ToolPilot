import { describe, it, expect } from 'vitest';
import { TOOLS } from '@/config/tools';
import { MODULES } from '@/config/modules';
import { MODULE_METADATA } from '@/config/moduleMetadata';
import { ICON_MAPPING } from './iconMapping';
import { ICON_REGISTRY } from './iconRegistry';

const resolves = (n: string) => Boolean(ICON_REGISTRY[ICON_MAPPING[n] || n]);

describe('icon registry', () => {
  it('contains every icon referenced by tools, modules and module metadata', () => {
    const missing = new Set<string>();
    TOOLS.forEach((t) => resolves(t.icon) || missing.add(t.icon));
    MODULES.forEach((m) => resolves(m.icon) || missing.add(m.icon));
    Object.values(MODULE_METADATA).forEach((m) =>
      m.whyUse.forEach((w) => resolves(w.icon) || missing.add(w.icon))
    );
    // If this fails, run: npx tsx scripts/gen-icons.ts
    expect([...missing]).toEqual([]);
  });
});
