
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = Number(e.target.value);
    if (isNaN(num)) return;
    if (num > max) num = max;
    if (num < min) num = min;
    onChange(num);
  };

  return (
    <div className="form-group w-full">
      {/* Label and Input value side by side */}
      <div className="flex items-center justify-between gap-4 mb-1">
        <label htmlFor={sliderId} className="label mb-0">
          {label}
        </label>
        <div className="flex items-center gap-1.5 max-w-[120px]">
          <input
            type="number"
            disabled={disabled}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleInputChange}
            className="input-base text-right font-semibold py-1 px-2 text-xs disabled:opacity-50"
            aria-label={`${label} numeric input`}
          />
          {suffix && (
            <span className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
              {suffix}
            </span>
          )}
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
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-lg bg-[var(--bg-surface)] appearance-none cursor-pointer accent-[var(--primary)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${
              ((value - min) / (max - min)) * 100
            }%, var(--border-default) ${((value - min) / (max - min)) * 100}%, var(--border-default) 100%)`,
          }}
        />
      </div>

      {/* Min / Max values display */}
      <div className="flex items-center justify-between text-[11px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>

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
