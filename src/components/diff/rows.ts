import type { DiffResult, Hunk } from '@/utils/diffMerge';

export const CONTEXT_LINES = 3;

/** A side-by-side row. `l` / `r` are 0-based line indexes (undefined = filler). */
export type SplitRow =
  | { kind: 'equal'; l: number; r: number }
  | { kind: 'change'; hunk: Hunk; l?: number; r?: number; first: boolean; pair?: number }
  | { kind: 'fold'; id: string; count: number };

/** A unified row: equal lines carry both numbers, changed lines one side. */
export type UnifiedRow =
  | { kind: 'equal'; l: number; r: number }
  | { kind: 'del'; hunk: Hunk; l: number; first: boolean; pairR?: number }
  | { kind: 'add'; hunk: Hunk; r: number; first: boolean; pairL?: number }
  | { kind: 'fold'; id: string; count: number };

interface EqualRange {
  id: string;
  leftStart: number;
  rightStart: number;
  count: number;
}

/** Split an equal block into visible lines and (optionally) a folded middle. */
function foldEqual(
  b: EqualRange,
  isFirst: boolean,
  isLast: boolean,
  collapse: boolean,
  expanded: ReadonlySet<string>
): { head: number; fold: number; tail: number } {
  if (!collapse || expanded.has(b.id)) return { head: b.count, fold: 0, tail: 0 };
  const head = isFirst ? 0 : CONTEXT_LINES;
  const tail = isLast ? 0 : CONTEXT_LINES;
  if (b.count <= head + tail + 1) return { head: b.count, fold: 0, tail: 0 };
  return { head, fold: b.count - head - tail, tail };
}

function forEachBlock(
  diff: DiffResult,
  collapse: boolean,
  expanded: ReadonlySet<string>,
  onEqual: (l: number, r: number) => void,
  onFold: (id: string, count: number) => void,
  onHunk: (h: Hunk) => void
) {
  // With no changes there is nothing to give context to — never fold.
  const doCollapse = collapse && diff.hunks.length > 0;
  diff.blocks.forEach((b, i) => {
    if (b.type === 'hunk') {
      onHunk(b.hunk);
      return;
    }
    const range: EqualRange = { id: `${b.leftStart}:${b.rightStart}`, ...b };
    const { head, fold, tail } = foldEqual(range, i === 0, i === diff.blocks.length - 1, doCollapse, expanded);
    for (let k = 0; k < head; k++) onEqual(b.leftStart + k, b.rightStart + k);
    if (fold) onFold(range.id, fold);
    for (let k = b.count - tail; k < b.count; k++) onEqual(b.leftStart + k, b.rightStart + k);
  });
}

export function buildSplitRows(diff: DiffResult, collapse: boolean, expanded: ReadonlySet<string>): SplitRow[] {
  const rows: SplitRow[] = [];
  forEachBlock(
    diff,
    collapse,
    expanded,
    (l, r) => rows.push({ kind: 'equal', l, r }),
    (id, count) => rows.push({ kind: 'fold', id, count }),
    (h) => {
      const nl = h.leftEnd - h.leftStart;
      const nr = h.rightEnd - h.rightStart;
      const n = Math.max(nl, nr);
      for (let k = 0; k < n; k++) {
        rows.push({
          kind: 'change',
          hunk: h,
          l: k < nl ? h.leftStart + k : undefined,
          r: k < nr ? h.rightStart + k : undefined,
          first: k === 0,
          pair: k < nl && k < nr ? k : undefined,
        });
      }
    }
  );
  return rows;
}

export function buildUnifiedRows(diff: DiffResult, collapse: boolean, expanded: ReadonlySet<string>): UnifiedRow[] {
  const rows: UnifiedRow[] = [];
  forEachBlock(
    diff,
    collapse,
    expanded,
    (l, r) => rows.push({ kind: 'equal', l, r }),
    (id, count) => rows.push({ kind: 'fold', id, count }),
    (h) => {
      const nl = h.leftEnd - h.leftStart;
      const nr = h.rightEnd - h.rightStart;
      for (let k = 0; k < nl; k++)
        rows.push({ kind: 'del', hunk: h, l: h.leftStart + k, first: k === 0, pairR: k < nr ? h.rightStart + k : undefined });
      for (let k = 0; k < nr; k++)
        rows.push({ kind: 'add', hunk: h, r: h.rightStart + k, first: nl === 0 && k === 0, pairL: k < nl ? h.leftStart + k : undefined });
    }
  );
  return rows;
}
