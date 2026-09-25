/**
 * Loan amortization maths shared by every EMI-style calculator.
 * Pure functions only — no React, no Date.now — so everything here is unit-tested.
 */

export interface ScheduleRow {
  /** 1-based instalment / month number (moratorium months included). */
  n: number;
  /** Due date of this instalment. */
  date: Date;
  phase: 'moratorium' | 'repayment';
  /** Amount paid this month (0 during a moratorium). */
  emi: number;
  /** Principal repaid this month. */
  principal: number;
  /** Interest for the month (added to the balance during a moratorium). */
  interest: number;
  /** Outstanding balance after this month. */
  balance: number;
  cumPrincipal: number;
  cumInterest: number;
}

export interface ScheduleInput {
  principal: number;
  /** Annual interest rate in percent, e.g. 8.5 */
  annualRate: number;
  /** Number of EMI (repayment) months. */
  months: number;
  /** Months at the start where interest accrues and is added to the principal (education loans). */
  moratoriumMonths?: number;
  /** Loan start / disbursal date. The first instalment falls one month later. */
  startDate: Date;
}

export interface Schedule {
  emi: number;
  /** Principal on which EMIs are calculated (original principal + capitalised moratorium interest). */
  emiPrincipal: number;
  rows: ScheduleRow[];
  totalInterest: number;
  /** Everything the borrower pays back (sum of EMIs). */
  totalPaid: number;
  endDate: Date;
}

export interface YearRow {
  key: string;
  label: string;
  months: ScheduleRow[];
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  cumPrincipal: number;
  cumInterest: number;
}

/** Add calendar months, clamping the day (31 Jan + 1 month = 28/29 Feb). */
export function addMonths(date: Date, months: number): Date {
  const day = date.getDate();
  const result = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

export function computeEmi(principal: number, annualRate: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export function buildSchedule(input: ScheduleInput): Schedule {
  const { principal, annualRate, months, startDate } = input;
  const moratorium = Math.max(0, Math.floor(input.moratoriumMonths ?? 0));
  const n = Math.max(0, Math.floor(months));
  const r = annualRate / 12 / 100;

  const rows: ScheduleRow[] = [];
  let balance = principal;
  let cumPrincipal = 0;
  let cumInterest = 0;
  let k = 0;

  // Moratorium: interest accrues and is capitalised, nothing is paid.
  for (let i = 0; i < moratorium; i++) {
    const interest = balance * r;
    balance += interest;
    cumInterest += interest;
    k++;
    rows.push({
      n: k,
      date: addMonths(startDate, k),
      phase: 'moratorium',
      emi: 0,
      principal: 0,
      interest,
      balance,
      cumPrincipal,
      cumInterest,
    });
  }

  const emiPrincipal = balance;
  const emi = computeEmi(emiPrincipal, annualRate, n);

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const last = i === n;
    const princ = last ? balance : Math.min(balance, emi - interest);
    balance = last ? 0 : Math.max(0, balance - princ);
    cumPrincipal += princ;
    cumInterest += interest;
    k++;
    rows.push({
      n: k,
      date: addMonths(startDate, k),
      phase: 'repayment',
      emi: princ + interest,
      principal: princ,
      interest,
      balance,
      cumPrincipal,
      cumInterest,
    });
  }

  const totalPaid = rows.reduce((s, x) => s + x.emi, 0);
  return {
    emi,
    emiPrincipal,
    rows,
    totalInterest: totalPaid - principal,
    totalPaid,
    endDate: rows.length ? rows[rows.length - 1].date : startDate,
  };
}

/** Group monthly rows by calendar year, or by Indian financial year (April–March). */
export function groupByYear(rows: ScheduleRow[], mode: 'calendar' | 'financial'): YearRow[] {
  const map = new Map<string, YearRow>();
  for (const row of rows) {
    const y = row.date.getFullYear();
    const m = row.date.getMonth();
    let key: string;
    let label: string;
    if (mode === 'financial') {
      const start = m >= 3 ? y : y - 1;
      key = String(start);
      label = `FY ${start}-${String((start + 1) % 100).padStart(2, '0')}`;
    } else {
      key = String(y);
      label = String(y);
    }
    let g = map.get(key);
    if (!g) {
      g = { key, label, months: [], emi: 0, principal: 0, interest: 0, balance: 0, cumPrincipal: 0, cumInterest: 0 };
      map.set(key, g);
    }
    g.months.push(row);
    g.emi += row.emi;
    g.principal += row.principal;
    g.interest += row.interest;
    g.balance = row.balance;
    g.cumPrincipal = row.cumPrincipal;
    g.cumInterest = row.cumInterest;
  }
  return [...map.values()];
}

/** yyyy-mm-dd in local time (what <input type="date"> expects). */
export function toDateInputValue(d: Date): string {
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function parseDateInput(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) || d.getFullYear() < 1990 || d.getFullYear() > 2100 ? null : d;
}
