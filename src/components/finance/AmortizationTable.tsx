import { Fragment, useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Download } from 'lucide-react';
import { clsx } from 'clsx';
import {
  buildSchedule,
  groupByYear,
  parseDateInput,
  toDateInputValue,
  type ScheduleRow,
} from '@/utils/loanSchedule';

interface AmortizationTableProps {
  principal: number;
  annualRate: number;
  /** Number of EMI months. */
  months: number;
  moratoriumMonths?: number;
  /** Used for the CSV file name, e.g. "Home_Loan". */
  csvName?: string;
}

const inr = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
// Fixed month names: Intl's "short" month differs between browsers ("Sep" vs "Sept").
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateFmt = { format: (d: Date) => `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` };
const monthFmt = { format: (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}` };

type View = 'monthly' | 'yearly';
type YearMode = 'calendar' | 'financial';

/**
 * Full repayment schedule for any EMI loan: monthly or yearly, driven by an editable start date.
 * Shows EMI, principal, interest, cumulative totals and outstanding balance per period.
 */
export function AmortizationTable({ principal, annualRate, months, moratoriumMonths = 0, csvName = 'Loan' }: AmortizationTableProps) {
  const [startValue, setStartValue] = useState(() => toDateInputValue(new Date()));
  const [view, setView] = useState<View>('yearly');
  const [yearMode, setYearMode] = useState<YearMode>('calendar');
  const [open, setOpen] = useState<Set<string>>(new Set());

  const startDate = useMemo(() => parseDateInput(startValue) ?? new Date(), [startValue]);
  const dateValid = parseDateInput(startValue) !== null;

  const schedule = useMemo(
    () => buildSchedule({ principal, annualRate, months, moratoriumMonths, startDate }),
    [principal, annualRate, months, moratoriumMonths, startDate]
  );
  const years = useMemo(() => groupByYear(schedule.rows, yearMode), [schedule.rows, yearMode]);

  const firstEmi = schedule.rows.find((r) => r.phase === 'repayment');

  // "As of today" position within the schedule.
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const paidRows = schedule.rows.filter((r) => r.date <= today);
  const lastPaid = paidRows[paidRows.length - 1];
  const outstandingToday = lastPaid ? lastPaid.balance : principal;

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const downloadCSV = () => {
    const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    let header: string[];
    let body: (string | number)[][];
    if (view === 'monthly') {
      header = ['No.', 'Due date', 'Phase', 'EMI paid', 'Principal', 'Interest', 'Total principal paid', 'Total interest paid', 'Balance'];
      body = schedule.rows.map((r) => [
        r.n,
        toDateInputValue(r.date),
        r.phase === 'moratorium' ? 'Moratorium' : 'Repayment',
        r.emi.toFixed(2),
        r.principal.toFixed(2),
        r.interest.toFixed(2),
        r.cumPrincipal.toFixed(2),
        r.cumInterest.toFixed(2),
        r.balance.toFixed(2),
      ]);
    } else {
      header = ['Year', 'Months', 'EMI paid', 'Principal', 'Interest', 'Total principal paid', 'Total interest paid', 'Balance'];
      body = years.map((y) => [
        y.label,
        y.months.length,
        y.emi.toFixed(2),
        y.principal.toFixed(2),
        y.interest.toFixed(2),
        y.cumPrincipal.toFixed(2),
        y.cumInterest.toFixed(2),
        y.balance.toFixed(2),
      ]);
    }
    const csv = [header, ...body].map((r) => r.map(q).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${csvName}_${view}_schedule_${toDateInputValue(startDate)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const monthRow = (r: ScheduleRow, nested = false) => (
    <tr key={r.n} className={clsx(r.date <= today && 'is-paid', nested && 'sk-amort__nested', r.phase === 'moratorium' && 'is-moratorium')}>
      <td>
        {nested ? monthFmt.format(r.date) : dateFmt.format(r.date)}
        {r.phase === 'moratorium' && <span className="sk-amort__tag">Moratorium</span>}
      </td>
      <td>{r.emi ? inr(r.emi) : '—'}</td>
      <td>{r.principal ? inr(r.principal) : '—'}</td>
      <td>{inr(r.interest)}</td>
      <td className="sk-amort__hide-sm">{inr(r.cumPrincipal)}</td>
      <td className="sk-amort__hide-sm">{inr(r.cumInterest)}</td>
      <td>{inr(r.balance)}</td>
    </tr>
  );

  return (
    <section className="sk-amort" aria-labelledby="amort-title">
      <div className="sk-amort__head">
        <div>
          <h2 id="amort-title">Repayment schedule</h2>
          <p>
            Month-by-month and year-by-year breakdown of what you pay towards principal and interest, and what
            you still owe. Pick your loan start date and the dates update.
          </p>
        </div>
        <button type="button" className="sk-btn sk-btn--ghost" onClick={downloadCSV}>
          <Download size={16} aria-hidden="true" />
          <span>Download {view} CSV</span>
        </button>
      </div>

      <div className="sk-amort__controls">
        <label className="sk-amort__field">
          <span>
            <CalendarDays size={14} aria-hidden="true" /> Loan start date
          </span>
          <input
            type="date"
            value={startValue}
            min="1990-01-01"
            max="2100-12-31"
            onChange={(e) => setStartValue(e.target.value)}
            aria-invalid={!dateValid}
          />
        </label>

        <div className="sk-amort__seg" role="group" aria-label="Schedule view">
          {(['yearly', 'monthly'] as const).map((v) => (
            <button key={v} type="button" className={clsx(view === v && 'is-on')} aria-pressed={view === v} onClick={() => setView(v)}>
              {v === 'yearly' ? 'Yearly' : 'Monthly'}
            </button>
          ))}
        </div>

        {view === 'yearly' && (
          <div className="sk-amort__seg" role="group" aria-label="Year type">
            {(['calendar', 'financial'] as const).map((m) => (
              <button key={m} type="button" className={clsx(yearMode === m && 'is-on')} aria-pressed={yearMode === m} onClick={() => setYearMode(m)}>
                {m === 'calendar' ? 'Calendar year' : 'Financial year'}
              </button>
            ))}
          </div>
        )}
      </div>

      <dl className="sk-amort__facts">
        <div>
          <dt>First EMI</dt>
          <dd>{firstEmi ? dateFmt.format(firstEmi.date) : '—'}</dd>
        </div>
        <div>
          <dt>Loan ends</dt>
          <dd>{dateFmt.format(schedule.endDate)}</dd>
        </div>
        <div>
          <dt>Total interest</dt>
          <dd>{inr(schedule.totalInterest)}</dd>
        </div>
        <div>
          <dt>Total payment</dt>
          <dd>{inr(schedule.totalPaid)}</dd>
        </div>
        {lastPaid && (
          <div className="sk-amort__facts-wide">
            <dt>As of today</dt>
            <dd>
              {paidRows.length} of {schedule.rows.length} instalments due · paid {inr(lastPaid.cumPrincipal)} principal
              + {inr(lastPaid.cumInterest)} interest · <strong>{inr(outstandingToday)} outstanding</strong>
            </dd>
          </div>
        )}
      </dl>

      <div className="sk-amort__scroll" tabIndex={0} role="region" aria-label={`${view} repayment schedule table`}>
        <table>
          <caption className="sr-only">
            {view === 'monthly' ? 'Monthly' : 'Yearly'} repayment schedule starting {dateFmt.format(startDate)}
          </caption>
          <thead>
            <tr>
              <th scope="col">{view === 'monthly' ? 'Due date' : yearMode === 'financial' ? 'Financial year' : 'Year'}</th>
              <th scope="col">EMI paid</th>
              <th scope="col">Principal</th>
              <th scope="col">Interest</th>
              <th scope="col" className="sk-amort__hide-sm">Total principal paid</th>
              <th scope="col" className="sk-amort__hide-sm">Total interest paid</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {view === 'monthly'
              ? schedule.rows.map((r) => monthRow(r))
              : years.map((y) => {
                  const isOpen = open.has(y.key);
                  return (
                    <Fragment key={y.key}>
                      <tr className={clsx('sk-amort__year', y.months.every((m) => m.date <= today) && 'is-paid')}>
                        <td>
                          <button
                            type="button"
                            className="sk-amort__expand"
                            aria-expanded={isOpen}
                            onClick={() => toggle(y.key)}
                          >
                            <ChevronDown size={15} aria-hidden="true" className={clsx(isOpen && 'is-open')} />
                            {y.label}
                            <small>{y.months.length} mo</small>
                          </button>
                        </td>
                        <td>{y.emi ? inr(y.emi) : '—'}</td>
                        <td>{y.principal ? inr(y.principal) : '—'}</td>
                        <td>{inr(y.interest)}</td>
                        <td className="sk-amort__hide-sm">{inr(y.cumPrincipal)}</td>
                        <td className="sk-amort__hide-sm">{inr(y.cumInterest)}</td>
                        <td>{inr(y.balance)}</td>
                      </tr>
                      {isOpen && y.months.map((m) => monthRow(m, true))}
                    </Fragment>
                  );
                })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{inr(schedule.totalPaid)}</td>
              <td>{inr(principal)}</td>
              <td>{inr(schedule.totalInterest)}</td>
              <td className="sk-amort__hide-sm" />
              <td className="sk-amort__hide-sm" />
              <td>{inr(0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="sk-amort__note">
        The first EMI is due one month after the start date. Dates and balances are estimates using monthly
        reducing-balance interest; your lender's statement may differ slightly because of rounding, day-count
        rules or rate changes.
      </p>
    </section>
  );
}

export default AmortizationTable;
