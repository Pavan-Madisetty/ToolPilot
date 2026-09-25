import { useNumericDraft } from '@/hooks/useNumericDraft';

export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  error?: string;
  disabled?: boolean;
}

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(n);
const decimalsOf = (step: number) => {
  const s = String(step);
  return s.includes('.') ? s.split('.')[1].length : 0;
};

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = '',
  error,
  disabled = false,
}: SliderProps) {
  const sliderId = `slider_${label.replace(/\s+/g, '_').toLowerCase()}`;
  const pct = max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;
  const draft = useNumericDraft({ value, onChange, min, max, decimals: Math.max(2, decimalsOf(step)) });

  return (
    <div className="form-group w-full">
      {/* Label and number box side by side */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <label htmlFor={sliderId} className="label mb-0">
          {label}
        </label>
        <div className={`sk-numfield sk-numfield--slider ${draft.outOfRange ? 'is-out' : ''}`}>
          <input
            {...draft.inputProps}
            disabled={disabled}
            value={draft.display}
            className="sk-numfield__input"
            aria-label={`${label} value`}
            aria-invalid={draft.outOfRange || undefined}
          />
          {suffix && <span className="sk-numfield__affix">{suffix}</span>}
        </div>
      </div>

      {/* Slider Control */}
      <div className="flex items-center gap-4">
        <input
          id={sliderId}
          type="range"
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={Math.min(max, Math.max(min, value))}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-lg bg-bg-surface appearance-none cursor-pointer accent-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, var(--border-default) ${pct}%, var(--border-default) 100%)`,
          }}
        />
      </div>

      {/* Min / Max values display */}
      <div className="flex items-center justify-between text-[11px] mt-1 text-text-tertiary">
        <span>
          {fmt(min)}
          {suffix}
        </span>
        <span>
          {fmt(max)}
          {suffix}
        </span>
      </div>

      {/* Range hint while the typed value is outside the allowed range */}
      {draft.outOfRange && !error && (
        <span className="sk-numfield__hint" role="status">
          Allowed range: {fmt(min)}
          {suffix} to {fmt(max)}
          {suffix}. It will be adjusted when you finish typing.
        </span>
      )}

      {/* Error Message */}
      {error && (
        <span className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default Slider;
