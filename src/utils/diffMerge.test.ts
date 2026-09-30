import { describe, it, expect } from 'vitest';
import { computeDiff, intraLine, joinLines, resolveHunk, splitLines, unifiedPatch } from './diffMerge';
import { buildSplitRows, buildUnifiedRows } from '@/components/diff/rows';

describe('splitLines', () => {
  it('handles empty text, CRLF and trailing newlines', () => {
    expect(splitLines('')).toEqual([]);
    expect(splitLines('a\r\nb')).toEqual(['a', 'b']);
    expect(splitLines('a\n')).toEqual(['a', '']);
  });
});

describe('computeDiff', () => {
  it('reports identical texts', () => {
    const d = computeDiff('a\nb', 'a\nb');
    expect(d.identical).toBe(true);
    expect(d.stats.similarity).toBe(100);
  });

  it('aligns an inserted line instead of marking everything after it', () => {
    const d = computeDiff('one\ntwo\nthree\nfour', 'one\nNEW\ntwo\nthree\nfour');
    expect(d.hunks).toHaveLength(1);
    expect(d.hunks[0]).toMatchObject({ leftStart: 1, leftEnd: 1, rightStart: 1, rightEnd: 2 });
    expect(d.stats).toMatchObject({ added: 1, removed: 0, changes: 1 });
  });

  it('groups a replacement into one hunk', () => {
    const d = computeDiff('a\nb\nc', 'a\nB\nc');
    expect(d.hunks).toEqual([{ index: 0, leftStart: 1, leftEnd: 2, rightStart: 1, rightEnd: 2 }]);
  });

  it('honours ignore whitespace and ignore case', () => {
    expect(computeDiff('  foo  bar', 'foo bar', { ignoreWhitespace: true }).identical).toBe(true);
    expect(computeDiff('Hello', 'hello', { ignoreCase: true }).identical).toBe(true);
    expect(computeDiff('Hello', 'hello').identical).toBe(false);
  });

  it('handles one empty side', () => {
    const d = computeDiff('', 'x\ny');
    expect(d.stats).toMatchObject({ added: 2, removed: 0, changes: 1 });
  });
});

describe('resolveHunk', () => {
  const left = 'a\nold\nc';
  const right = 'a\nnew\nextra\nc';
  const d = computeDiff(left, right);
  const h = d.hunks[0];

  it('keeps the left version on both sides', () => {
    const r = resolveHunk(d.left, d.right, h, 'left');
    expect(joinLines(r.left)).toBe(left);
    expect(joinLines(r.right)).toBe(left);
  });

  it('keeps the right version on both sides', () => {
    const r = resolveHunk(d.left, d.right, h, 'right');
    expect(joinLines(r.left)).toBe(right);
    expect(joinLines(r.right)).toBe(right);
  });

  it('keeps both versions, left first', () => {
    const r = resolveHunk(d.left, d.right, h, 'both');
    expect(r.left).toEqual(['a', 'old', 'new', 'extra', 'c']);
    expect(r.right).toEqual(r.left);
    expect(computeDiff(joinLines(r.left), joinLines(r.right)).identical).toBe(true);
  });
});

describe('intraLine', () => {
  it('highlights only the changed word and keeps exact text', () => {
    const res = intraLine('the quick fox', 'the slow fox', 'word');
    if (!res) throw new Error('expected a highlight');
    expect(res.left.map((s) => s.text).join('')).toBe('the quick fox');
    expect(res.right.map((s) => s.text).join('')).toBe('the slow fox');
    expect(res.left.filter((s) => s.changed).map((s) => s.text)).toEqual(['quick']);
  });

  it('gives up on completely different lines', () => {
    expect(intraLine('abcdef', 'uvwxyz', 'char')).toBeNull();
  });
});

describe('rows', () => {
  it('pads the shorter side of a hunk in split view', () => {
    const d = computeDiff('a\nb\nc', 'a\nX\nY\nc');
    const rows = buildSplitRows(d, false, new Set());
    const change = rows.filter((r) => r.kind === 'change');
    expect(change).toHaveLength(2);
    expect(change[1]).toMatchObject({ l: undefined, r: 2 });
  });

  it('folds long unchanged runs when collapsing', () => {
    const base = Array.from({ length: 40 }, (_, i) => `line ${i}`);
    const changed = [...base];
    changed[20] = 'changed';
    const d = computeDiff(base.join('\n'), changed.join('\n'));
    const rows = buildUnifiedRows(d, true, new Set());
    expect(rows.filter((r) => r.kind === 'fold')).toHaveLength(2);
    expect(rows.length).toBeLessThan(20);
  });
});

describe('unifiedPatch', () => {
  it('produces a git-style patch', () => {
    const p = unifiedPatch('a\nb\n', 'a\nc\n', 'x.txt', 'y.txt');
    expect(p).toContain('--- x.txt');
    expect(p).toContain('-b');
    expect(p).toContain('+c');
  });
});
