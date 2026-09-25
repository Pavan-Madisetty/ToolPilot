import { parseDateInput, toDateInputValue } from './loanSchedule';

/** Accepts dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy and yyyy-mm-dd. */
export function parseTypedDate(text: string): string | null {
  const t = text.trim();
  let m = /^(\d{1,2})[/.\-\s](\d{1,2})[/.\-\s](\d{4})$/.exec(t);
  let y: number, mo: number, d: number;
  if (m) {
    d = Number(m[1]);
    mo = Number(m[2]);
    y = Number(m[3]);
  } else if ((m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t))) {
    y = Number(m[1]);
    mo = Number(m[2]);
    d = Number(m[3]);
  } else return null;
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return parseDateInput(toDateInputValue(date)) ? toDateInputValue(date) : null;
}

/** Calendar cells for a month, Monday-first, padded with adjacent-month days to full weeks. */
export function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) cells.push(new Date(year, month, 1 - offset + i));
  return cells;
}

