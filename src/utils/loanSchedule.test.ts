import { describe, it, expect } from 'vitest';
import { addMonths, buildSchedule, computeEmi, groupByYear, parseDateInput, toDateInputValue } from './loanSchedule';

const start = new Date(2026, 8, 25); // 25 Sep 2026

describe('loanSchedule', () => {
  it('matches the standard EMI for ₹10L @ 8.5% over 10 years', () => {
    expect(Math.round(computeEmi(1_000_000, 8.5, 120))).toBe(12399);
  });

  it('repays exactly the principal and ends at zero', () => {
    const s = buildSchedule({ principal: 1_000_000, annualRate: 8.5, months: 120, startDate: start });
    expect(s.rows).toHaveLength(120);
    expect(s.rows[119].balance).toBe(0);
    expect(Math.round(s.rows[119].cumPrincipal)).toBe(1_000_000);
    expect(s.totalInterest).toBeCloseTo(s.emi * 120 - 1_000_000, 4);
    expect(s.rows.every((r) => r.balance >= 0)).toBe(true);
  });

  it('dates start one month after the start date and end at the tenure', () => {
    const s = buildSchedule({ principal: 100000, annualRate: 10, months: 12, startDate: start });
    expect(toDateInputValue(s.rows[0].date)).toBe('2026-10-25');
    expect(toDateInputValue(s.endDate)).toBe('2027-09-25');
  });

  it('changing the start date shifts dates but not amounts', () => {
    const a = buildSchedule({ principal: 500000, annualRate: 9, months: 24, startDate: start });
    const b = buildSchedule({ principal: 500000, annualRate: 9, months: 24, startDate: new Date(2024, 0, 31) });
    expect(b.emi).toBeCloseTo(a.emi, 8);
    expect(b.totalInterest).toBeCloseTo(a.totalInterest, 6);
    expect(toDateInputValue(b.rows[0].date)).toBe('2024-02-29');
  });

  it('handles a 0% rate', () => {
    const s = buildSchedule({ principal: 120000, annualRate: 0, months: 12, startDate: start });
    expect(s.emi).toBe(10000);
    expect(s.totalInterest).toBeCloseTo(0, 6);
    expect(s.rows[11].balance).toBe(0);
  });

  it('capitalises interest during a moratorium', () => {
    const s = buildSchedule({ principal: 1_000_000, annualRate: 12, months: 60, moratoriumMonths: 12, startDate: start });
    expect(s.rows).toHaveLength(72);
    expect(s.rows[0].phase).toBe('moratorium');
    expect(s.rows[0].emi).toBe(0);
    expect(s.emiPrincipal).toBeCloseTo(1_000_000 * Math.pow(1.01, 12), 4);
    expect(s.rows[71].balance).toBe(0);
    // total interest = everything paid back minus the original loan
    expect(s.totalInterest).toBeCloseTo(s.emi * 60 - 1_000_000, 3);
  });

  it('clamps month ends', () => {
    expect(toDateInputValue(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28');
    expect(toDateInputValue(addMonths(new Date(2026, 10, 30), 3))).toBe('2027-02-28');
  });

  it('yearly grouping keeps totals for calendar and financial years', () => {
    const s = buildSchedule({ principal: 1_000_000, annualRate: 8.5, months: 120, startDate: start });
    for (const mode of ['calendar', 'financial'] as const) {
      const years = groupByYear(s.rows, mode);
      const sum = (f: (y: (typeof years)[number]) => number) => years.reduce((a, y) => a + f(y), 0);
      expect(sum((y) => y.principal)).toBeCloseTo(1_000_000, 3);
      expect(sum((y) => y.interest)).toBeCloseTo(s.totalInterest, 3);
      expect(sum((y) => y.months.length)).toBe(120);
      expect(years[years.length - 1].balance).toBe(0);
    }
    expect(groupByYear(s.rows, 'financial')[0].label).toBe('FY 2026-27');
    expect(groupByYear(s.rows, 'calendar')[0].label).toBe('2026');
  });

  it('parses date input values safely', () => {
    expect(parseDateInput('2026-09-25')?.getDate()).toBe(25);
    expect(parseDateInput('')).toBeNull();
    expect(parseDateInput('0001-01-01')).toBeNull();
  });
});
