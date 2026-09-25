import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { parseDateInput, toDateInputValue } from '@/utils/loanSchedule';
import { monthGrid, parseTypedDate } from '@/utils/calendar';

export interface DatePickerProps {
  /** yyyy-mm-dd, or '' for no date (same format as <input type="date">). */
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  id?: string;
  'aria-label'?: string;
  disabled?: boolean;
  /** Fill the available width instead of the compact default. */
  block?: boolean;
  /** Allow clearing the date. */
  clearable?: boolean;
  className?: string;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const pad = (n: number) => String(n).padStart(2, '0');
const show = (v: string) => {
  const d = parseDateInput(v);
  return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : '';
};

export function DatePicker({
  value,
  onChange,
  min = '1990-01-01',
  max = '2100-12-31',
  id,
  disabled,
  clearable,
  block,
  className,
  ...rest
}: DatePickerProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const wantFocus = useRef(false);
  const selected = parseDateInput(value);
  const minD = parseDateInput(min);
  const maxD = parseDateInput(max);

  // The month being viewed and the day that has keyboard focus.
  const [focusDate, setFocusDate] = useState<Date>(() => selected ?? new Date());
  const cells = useMemo(() => monthGrid(focusDate.getFullYear(), focusDate.getMonth()), [focusDate]);
  const todayStr = toDateInputValue(new Date());

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const disabledDay = (d: Date) => (minD ? d < minD : false) || (maxD ? d > maxD : false);

  const openPicker = () => {
    if (disabled) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    setAlignRight(!!rect && rect.left + 320 > window.innerWidth);
    setFocusDate(selected ?? new Date());
    wantFocus.current = true;
    setOpen(true);
  };

  const choose = (d: Date) => {
    if (disabledDay(d)) return;
    onChange(toDateInputValue(d));
    setDraft(null);
    setOpen(false);
  };

  const moveFocus = (days: number) => setFocusDate((f) => new Date(f.getFullYear(), f.getMonth(), f.getDate() + days));
  const moveMonth = (months: number) =>
    setFocusDate((f) => {
      const target = new Date(f.getFullYear(), f.getMonth() + months, 1);
      const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(f.getDate(), last));
      return target;
    });

  const onGridKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, () => void> = {
      ArrowLeft: () => moveFocus(-1),
      ArrowRight: () => moveFocus(1),
      ArrowUp: () => moveFocus(-7),
      ArrowDown: () => moveFocus(7),
      PageUp: () => moveMonth(-1),
      PageDown: () => moveMonth(1),
      Home: () => moveFocus(-((focusDate.getDay() + 6) % 7)),
      End: () => moveFocus(6 - ((focusDate.getDay() + 6) % 7)),
    };
    if (map[e.key]) {
      e.preventDefault();
      wantFocus.current = true;
      map[e.key]();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  const commitDraft = () => {
    if (draft === null) return;
    if (draft.trim() === '' && clearable) onChange('');
    else {
      const v = parseTypedDate(draft);
      const d = v ? parseDateInput(v) : null;
      if (v && d && !disabledDay(d)) onChange(v);
    }
    setDraft(null);
  };

  const years: number[] = [];
  const y0 = minD ? minD.getFullYear() : 1990;
  const y1 = maxD ? maxD.getFullYear() : 2100;
  for (let y = y0; y <= y1; y++) years.push(y);

  return (
    <div className={clsx('sk-dp', block && 'sk-dp--block', className)} ref={wrapRef}>
      <div className="sk-dp__field">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="DD/MM/YYYY"
          disabled={disabled}
          aria-label={rest['aria-label']}
          value={draft ?? show(value)}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commitDraft();
              e.currentTarget.blur();
            } else if (e.key === 'ArrowDown' && e.altKey) openPicker();
          }}
          aria-invalid={draft !== null && draft.trim() !== '' && parseTypedDate(draft) === null}
        />
        <button
          type="button"
          className="sk-dp__toggle"
          aria-label={open ? 'Close calendar' : 'Open calendar'}
          aria-expanded={open}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openPicker())}
        >
          <CalendarDays size={17} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className={clsx('sk-dp__pop', alignRight && 'is-right')} role="dialog" aria-label="Choose date">
          <div className="sk-dp__head">
            <button type="button" className="sk-dp__nav" aria-label="Previous month" onClick={() => moveMonth(-1)}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="sk-dp__selects">
              <select
                aria-label="Month"
                value={focusDate.getMonth()}
                onChange={(e) => setFocusDate(new Date(focusDate.getFullYear(), Number(e.target.value), 1))}
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                aria-label="Year"
                value={focusDate.getFullYear()}
                onChange={(e) => setFocusDate(new Date(Number(e.target.value), focusDate.getMonth(), 1))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="sk-dp__nav" aria-label="Next month" onClick={() => moveMonth(1)}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="sk-dp__week" aria-hidden="true">
            {DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="sk-dp__grid" role="grid" onKeyDown={onGridKey}>
            {cells.map((d) => {
              const str = toDateInputValue(d);
              const inMonth = d.getMonth() === focusDate.getMonth();
              const isFocus = str === toDateInputValue(focusDate);
              return (
                <button
                  key={str}
                  type="button"
                  role="gridcell"
                  tabIndex={isFocus ? 0 : -1}
                  ref={(el) => {
                    if (el && isFocus && wantFocus.current) {
                      wantFocus.current = false;
                      el.focus();
                    }
                  }}
                  disabled={disabledDay(d)}
                  aria-selected={str === value}
                  aria-label={`${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`}
                  className={clsx(
                    'sk-dp__day',
                    !inMonth && 'is-out',
                    str === value && 'is-selected',
                    str === todayStr && 'is-today'
                  )}
                  onClick={() => choose(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="sk-dp__foot">
            <button type="button" onClick={() => choose(new Date())}>
              Today
            </button>
            {clearable && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
