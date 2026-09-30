// Shared JSON helpers for the JSON ⇄ TOON converter and JSON Compare.

export interface JsonParseResult {
  ok: boolean;
  value?: unknown;
  error?: string;
  line?: number;
  column?: number;
}

/** Parse JSON and turn engine-specific error messages into a line/column. */
export function parseJson(text: string): JsonParseResult {
  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  try {
    return { ok: true, value: JSON.parse(src) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Invalid JSON';
    let line: number | undefined;
    let column: number | undefined;
    const pos = msg.match(/at position (\d+)/i);
    const lc = msg.match(/line (\d+) column (\d+)/i);
    if (lc) {
      line = Number(lc[1]);
      column = Number(lc[2]);
    } else if (pos) {
      const before = src.slice(0, Number(pos[1])).split('\n');
      line = before.length;
      column = before[before.length - 1].length + 1;
    }
    const clean = msg.replace(/^JSON\.parse:\s*/i, '').replace(/\s*\(line \d+ column \d+.*\)$/i, '');
    return { ok: false, error: clean, line, column };
  }
}

/**
 * Rough LLM token estimate. Mimics a BPE pre-tokeniser: words (with their
 * leading space), numbers in groups of up to three digits, each punctuation
 * mark, and runs of whitespace/newlines. Real counts vary by model; this is
 * meant for comparing formats, not billing.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  const m = text.match(/ ?[\p{L}\p{M}]+| ?\p{N}{1,3}| ?[^\s\p{L}\p{M}\p{N}]|\s+(?!\S)|\s+/gu);
  return m ? m.length : 0;
}

/** Recursively sort object keys (arrays keep their order unless `sortArrays`). */
export function sortKeysDeep(value: unknown, sortArrays = false): unknown {
  if (Array.isArray(value)) {
    const items = value.map((v) => sortKeysDeep(v, sortArrays));
    if (!sortArrays) return items;
    return items
      .map((v) => [JSON.stringify(v), v] as const)
      .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
      .map(([, v]) => v);
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      out[k] = sortKeysDeep((value as Record<string, unknown>)[k], sortArrays);
    }
    return out;
  }
  return value;
}

export type JsonChangeKind = 'added' | 'removed' | 'changed' | 'type';

export interface JsonChange {
  path: string;
  kind: JsonChangeKind;
  before?: unknown;
  after?: unknown;
}

function typeOf(v: unknown): string {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

const IDENT = /^[A-Za-z_$][\w$]*$/;
function childPath(base: string, key: string | number): string {
  if (typeof key === 'number') return `${base}[${key}]`;
  if (IDENT.test(key)) return base ? `${base}.${key}` : key;
  return `${base}[${JSON.stringify(key)}]`;
}

/** Structural JSON diff: a flat list of path-level changes. */
export function diffJson(a: unknown, b: unknown, limit = 2000): JsonChange[] {
  const out: JsonChange[] = [];
  const walk = (x: unknown, y: unknown, path: string) => {
    if (out.length >= limit) return;
    const tx = typeOf(x);
    const ty = typeOf(y);
    if (tx !== ty) {
      out.push({ path: path || '(root)', kind: 'type', before: x, after: y });
      return;
    }
    if (tx === 'array') {
      const xa = x as unknown[];
      const ya = y as unknown[];
      const n = Math.max(xa.length, ya.length);
      for (let i = 0; i < n; i++) {
        const p = childPath(path, i);
        if (i >= xa.length) out.push({ path: p, kind: 'added', after: ya[i] });
        else if (i >= ya.length) out.push({ path: p, kind: 'removed', before: xa[i] });
        else walk(xa[i], ya[i], p);
      }
      return;
    }
    if (tx === 'object') {
      const xo = x as Record<string, unknown>;
      const yo = y as Record<string, unknown>;
      for (const k of Object.keys(xo)) {
        const p = childPath(path, k);
        if (!Object.prototype.hasOwnProperty.call(yo, k)) out.push({ path: p, kind: 'removed', before: xo[k] });
        else walk(xo[k], yo[k], p);
      }
      for (const k of Object.keys(yo)) {
        if (!Object.prototype.hasOwnProperty.call(xo, k)) out.push({ path: childPath(path, k), kind: 'added', after: yo[k] });
      }
      return;
    }
    if (x !== y) out.push({ path: path || '(root)', kind: 'changed', before: x, after: y });
  };
  walk(a, b, '');
  return out;
}

/** Short one-line preview of a JSON value. */
export function previewJson(v: unknown, max = 80): string {
  const s = v === undefined ? '—' : JSON.stringify(v);
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
