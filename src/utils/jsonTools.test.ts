import { describe, it, expect } from 'vitest';
import { encode, decode } from '@toon-format/toon';
import { diffJson, estimateTokens, parseJson, sortKeysDeep } from './jsonTools';

describe('parseJson', () => {
  it('reports a line and column for invalid JSON', () => {
    const r = parseJson('{\n  "a": 1,\n}');
    expect(r.ok).toBe(false);
    expect(r.line).toBeGreaterThanOrEqual(2);
  });
  it('strips a BOM', () => {
    expect(parseJson('﻿{"a":1}').value).toEqual({ a: 1 });
  });
});

describe('sortKeysDeep', () => {
  it('sorts nested keys and optionally arrays', () => {
    expect(JSON.stringify(sortKeysDeep({ b: 1, a: { d: 1, c: 2 } }))).toBe('{"a":{"c":2,"d":1},"b":1}');
    expect(sortKeysDeep([3, 1, 2], true)).toEqual([1, 2, 3]);
    expect(sortKeysDeep([3, 1, 2])).toEqual([3, 1, 2]);
  });
});

describe('diffJson', () => {
  it('lists added, removed, changed and type changes by path', () => {
    const a = { id: 1, tags: ['x'], owner: { email: 'a@x' }, beta: true, gone: 1 };
    const b = { id: 1, tags: ['x', 'y'], owner: { email: 'b@x' }, beta: 'true', 'weird key': 2 };
    const changes = diffJson(a, b);
    expect(changes).toEqual(
      expect.arrayContaining([
        { path: 'tags[1]', kind: 'added', after: 'y' },
        { path: 'owner.email', kind: 'changed', before: 'a@x', after: 'b@x' },
        { path: 'beta', kind: 'type', before: true, after: 'true' },
        { path: 'gone', kind: 'removed', before: 1 },
        { path: '["weird key"]', kind: 'added', after: 2 },
      ])
    );
    expect(changes).toHaveLength(5);
  });
});

describe('TOON round trip', () => {
  it('encodes tabular arrays compactly and decodes losslessly', () => {
    const data = { users: [{ id: 1, name: 'Ana' }, { id: 2, name: 'Luis, Jr.' }], tags: ['a', 'b'] };
    const toon = encode(data);
    expect(toon).toContain('users[2]{id,name}:');
    expect(decode(toon)).toEqual(data);
    expect(estimateTokens(toon)).toBeLessThan(estimateTokens(JSON.stringify(data, null, 2)));
  });
});
