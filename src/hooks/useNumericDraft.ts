import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

export interface NumericDraftOptions {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Max digits after the decimal point (0 = whole numbers only). */
  decimals?: number;
  /** Show thousands separators (Indian grouping) while not editing. */
  grouped?: boolean;
}

const clamp = (n: number, min?: number, max?: number) => {
  let v = n;
  if (max !== undefined && v > max) v = max;
  if (min !== undefined && v < min) v = min;
  return v;
};

export function formatNumber(n: number, decimals = 2, grouped = true): string {
  if (!Number.isFinite(n)) return '';
  const rounded = Number(n.toFixed(decimals));
  return grouped
    ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals }).format(rounded)
    : String(rounded);
}

/** Remove everything except digits, one decimal point and (if allowed) a leading minus. */
export function sanitizeNumeric(raw: string, decimals: number, allowNegative: boolean): string {
  let s = raw.replace(/[,\s₹$€£]/g, '');
  const neg = allowNegative && s.startsWith('-');
  s = s.replace(/[^0-9.]/g, '');
  const dot = s.indexOf('.');
  if (dot !== -1) {
    s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, '');
    if (decimals === 0) s = s.slice(0, dot);
    else s = s.slice(0, dot + 1 + decimals);
  }
  return (neg ? '-' : '') + s;
}

/**
 * Editing model for numeric text boxes that feels natural:
 *  - while typing, the box shows exactly what the user typed (they can clear it, retype, use "8.")
 *  - every valid number is passed on immediately, clamped to [min, max], so results stay live
 *  - when the box loses focus (or Enter is pressed) it snaps to the clamped, formatted value
 */
export function useNumericDraft({ value, onChange, min, max, decimals = 2, grouped = true }: NumericDraftOptions) {
  const [draft, setDraft] = useState<string | null>(null);
  const allowNegative = min === undefined || min < 0;

  const parsed = draft === null || draft === '' || draft === '-' || draft === '.' || draft === '-.' ? null : Number(draft);
  const outOfRange = parsed !== null && Number.isFinite(parsed) && (parsed !== clamp(parsed, min, max));

  return {
    display: draft ?? formatNumber(value, decimals, grouped),
    editing: draft !== null,
    outOfRange,
    inputProps: {
      type: 'text' as const,
      inputMode: (decimals > 0 ? 'decimal' : 'numeric') as 'decimal' | 'numeric',
      autoComplete: 'off',
      spellCheck: false,
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        setDraft(Number.isFinite(value) ? String(Number(value.toFixed(decimals))) : '');
        // select everything so typing replaces the value
        const el = e.currentTarget;
        requestAnimationFrame(() => el.select());
      },
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const s = sanitizeNumeric(e.target.value, decimals, allowNegative);
        setDraft(s);
        if (s === '' || s === '-' || s === '.' || s === '-.') return;
        const n = Number(s);
        if (Number.isFinite(n)) onChange(clamp(n, min, max));
      },
      onBlur: () => {
        if (draft !== null && parsed !== null && Number.isFinite(parsed)) onChange(clamp(parsed, min, max));
        setDraft(null);
      },
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.currentTarget.blur();
        if (e.key === 'Escape') {
          setDraft(null);
          e.currentTarget.blur();
        }
      },
    },
  };
}
