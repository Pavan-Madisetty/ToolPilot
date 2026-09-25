import { describe, it, expect } from 'vitest';
import { monthGrid, parseTypedDate } from './calendar';

describe('calendar helpers', () => {
  it('parses typed dates in common formats', () => {
    expect(parseTypedDate('26/01/2027')).toBe('2027-01-26');
    expect(parseTypedDate('6-1-2027')).toBe('2027-01-06');
    expect(parseTypedDate('26.01.2027')).toBe('2027-01-26');
    expect(parseTypedDate('2027-01-26')).toBe('2027-01-26');
  });
  it('rejects impossible or partial dates', () => {
    expect(parseTypedDate('31/02/2027')).toBeNull();
    expect(parseTypedDate('26/01')).toBeNull();
    expect(parseTypedDate('abc')).toBeNull();
    expect(parseTypedDate('')).toBeNull();
  });
  it('builds a Monday-first 6-week grid containing the whole month', () => {
    const grid = monthGrid(2027, 0); // Jan 2027 starts on a Friday
    expect(grid).toHaveLength(42);
    expect(grid[0].getDay()).toBe(1);
    expect(grid[4].getDate()).toBe(1);
    expect(grid.filter((d) => d.getMonth() === 0)).toHaveLength(31);
  });
});
