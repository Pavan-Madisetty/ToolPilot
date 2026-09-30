import { diffArrays, diffChars, diffWordsWithSpace, createTwoFilesPatch } from 'diff';

// ============================================================
// Line diff + two-way merge engine used by the Compare & Merge
// workspace (Diff Checker, Text Diff, JSON Compare).
// Pure functions — no React — so they are unit-testable.
// ============================================================

export interface DiffOptions {
  ignoreWhitespace?: boolean;
  ignoreCase?: boolean;
}

export type Granularity = 'word' | 'char';

/** Half-open line ranges [start, end) on each side. */
export interface Hunk {
  index: number;
  leftStart: number;
  leftEnd: number;
  rightStart: number;
  rightEnd: number;
}

export type Block =
  | { type: 'equal'; leftStart: number; rightStart: number; count: number }
  | { type: 'hunk'; hunk: Hunk };

export interface DiffStats {
  added: number;
  removed: number;
  changes: number;
  /** 0–100, share of lines that are unchanged. */
  similarity: number;
}

export interface DiffResult {
  left: string[];
  right: string[];
  blocks: Block[];
  hunks: Hunk[];
  stats: DiffStats;
  identical: boolean;
  /** True when the diff took too long and was abandoned. */
  timedOut: boolean;
}

export interface Segment {
  text: string;
  changed: boolean;
}

export type Eol = '\n' | '\r\n';

/** Split text into lines. Empty text has no lines; a trailing newline yields a final empty line. */
export function splitLines(text: string): string[] {
  if (text === '') return [];
  return text.split(/\r\n|\n|\r/);
}

export function detectEol(text: string): Eol {
  return text.includes('\r\n') ? '\r\n' : '\n';
}

export function joinLines(lines: string[], eol: Eol = '\n'): string {
  return lines.join(eol);
}

function normaliser(opts: DiffOptions): (s: string) => string {
  const { ignoreWhitespace, ignoreCase } = opts;
  if (!ignoreWhitespace && !ignoreCase) return (s) => s;
  return (s) => {
    let v = s;
    if (ignoreWhitespace) v = v.replace(/\s+/g, ' ').trim();
    if (ignoreCase) v = v.toLowerCase();
    return v;
  };
}

const DIFF_TIMEOUT_MS = 2500;

export function computeDiff(leftText: string, rightText: string, opts: DiffOptions = {}): DiffResult {
  const left = splitLines(leftText);
  const right = splitLines(rightText);
  const norm = normaliser(opts);
  const lk = left.map(norm);
  const rk = right.map(norm);

  // Pre-trim common prefix / suffix: cheap and keeps the Myers search small.
  let pre = 0;
  while (pre < lk.length && pre < rk.length && lk[pre] === rk[pre]) pre++;
  let suf = 0;
  while (
    suf < lk.length - pre &&
    suf < rk.length - pre &&
    lk[lk.length - 1 - suf] === rk[rk.length - 1 - suf]
  )
    suf++;

  const midL = lk.slice(pre, lk.length - suf);
  const midR = rk.slice(pre, rk.length - suf);

  let timedOut = false;
  let changes: { count: number; added: boolean; removed: boolean }[] = [];
  if (midL.length || midR.length) {
    if (!midL.length || !midR.length) {
      changes = [
        ...(midL.length ? [{ count: midL.length, added: false, removed: true }] : []),
        ...(midR.length ? [{ count: midR.length, added: true, removed: false }] : []),
      ];
    } else {
      const res = diffArrays(midL, midR, { timeout: DIFF_TIMEOUT_MS });
      if (res) {
        changes = res.map((c) => ({ count: c.value.length, added: !!c.added, removed: !!c.removed }));
      } else {
        // Too different to compute in time — treat the middle as one replacement.
        timedOut = true;
        changes = [
          { count: midL.length, added: false, removed: true },
          { count: midR.length, added: true, removed: false },
        ];
      }
    }
  }

  const blocks: Block[] = [];
  const hunks: Hunk[] = [];
  let li = 0;
  let ri = 0;
  const pushEqual = (count: number) => {
    if (count <= 0) return;
    const last = blocks[blocks.length - 1];
    if (last && last.type === 'equal') last.count += count;
    else blocks.push({ type: 'equal', leftStart: li, rightStart: ri, count });
    li += count;
    ri += count;
  };

  pushEqual(pre);
  let open: Hunk | null = null;
  const close = () => {
    if (open) {
      hunks.push(open);
      blocks.push({ type: 'hunk', hunk: open });
      open = null;
    }
  };
  for (const c of changes) {
    if (!c.added && !c.removed) {
      close();
      pushEqual(c.count);
      continue;
    }
    if (!open) open = { index: hunks.length, leftStart: li, leftEnd: li, rightStart: ri, rightEnd: ri };
    if (c.removed) {
      li += c.count;
      open.leftEnd = li;
    } else {
      ri += c.count;
      open.rightEnd = ri;
    }
  }
  close();
  pushEqual(suf);

  let added = 0;
  let removed = 0;
  for (const h of hunks) {
    added += h.rightEnd - h.rightStart;
    removed += h.leftEnd - h.leftStart;
  }
  const total = Math.max(left.length, right.length);
  const unchanged = blocks.reduce((n, b) => (b.type === 'equal' ? n + b.count : n), 0);
  const similarity = total === 0 ? 100 : Math.round((unchanged / total) * 1000) / 10;

  return {
    left,
    right,
    blocks,
    hunks,
    stats: { added, removed, changes: hunks.length, similarity },
    identical: hunks.length === 0,
    timedOut,
  };
}

const MAX_INTRA_LEN = 4000;

/**
 * Character/word level highlight for a pair of changed lines.
 * Returns null when the lines are too long or too dissimilar to be useful
 * (then the whole line is shown as changed).
 */
export function intraLine(
  a: string,
  b: string,
  granularity: Granularity,
  ignoreCase = false
): { left: Segment[]; right: Segment[] } | null {
  if (a.length > MAX_INTRA_LEN || b.length > MAX_INTRA_LEN) return null;
  const parts =
    granularity === 'char' ? diffChars(a, b, { ignoreCase }) : diffWordsWithSpace(a, b, { ignoreCase });
  const left: Segment[] = [];
  const right: Segment[] = [];
  let common = 0;
  // Values of "common" parts come from `b`; re-slice `a` by length so the left text stays exact.
  let ai = 0;
  for (const p of parts) {
    if (p.added) {
      right.push({ text: p.value, changed: true });
    } else if (p.removed) {
      left.push({ text: a.slice(ai, ai + p.value.length), changed: true });
      ai += p.value.length;
    } else {
      left.push({ text: a.slice(ai, ai + p.value.length), changed: false });
      right.push({ text: p.value, changed: false });
      ai += p.value.length;
      common += p.value.trim().length;
    }
  }
  const longest = Math.max(a.trim().length, b.trim().length);
  // Scattered single-character matches are noise: require a real overlap.
  const minShare = granularity === 'char' ? 0.5 : 0.4;
  if (longest > 0 && common / longest < minShare) return null;
  return { left: merge(left), right: merge(right) };
}

function merge(segs: Segment[]): Segment[] {
  const out: Segment[] = [];
  for (const s of segs) {
    if (!s.text) continue;
    const last = out[out.length - 1];
    if (last && last.changed === s.changed) last.text += s.text;
    else out.push({ ...s });
  }
  return out;
}

export type Resolution = 'left' | 'right' | 'both';

/**
 * Resolve one hunk so both sides agree on it:
 *  - `left`  → keep the left version (copied into the right side)
 *  - `right` → keep the right version (copied into the left side)
 *  - `both`  → keep both, left lines first, on both sides
 */
export function resolveHunk(
  left: string[],
  right: string[],
  hunk: Hunk,
  resolution: Resolution
): { left: string[]; right: string[] } {
  const L = left.slice(hunk.leftStart, hunk.leftEnd);
  const R = right.slice(hunk.rightStart, hunk.rightEnd);
  const merged = resolution === 'left' ? L : resolution === 'right' ? R : [...L, ...R];
  const nextLeft = resolution === 'left' ? left : [...left];
  const nextRight = resolution === 'right' ? right : [...right];
  if (resolution !== 'left') nextLeft.splice(hunk.leftStart, L.length, ...merged);
  if (resolution !== 'right') nextRight.splice(hunk.rightStart, R.length, ...merged);
  return { left: nextLeft, right: nextRight };
}

/** Build a unified .patch of the raw texts (independent of the ignore options). */
export function unifiedPatch(leftText: string, rightText: string, leftName: string, rightName: string): string {
  return createTwoFilesPatch(leftName, rightName, leftText, rightText, undefined, undefined, { context: 3 });
}
