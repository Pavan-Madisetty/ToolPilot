import { forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { useNumericDraft } from '@/hooks/useNumericDraft';

export interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  decimals?: number;
  grouped?: boolean;
  id?: string;
  'aria-label'?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  /** Fill the available width (form-style field) and align text left. */
  block?: boolean;
}

/**
 * Number box you can freely clear and retype. Values are clamped to min/max as soon as they are
 * valid, but the box only snaps to the clamped value when the user leaves it.
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(function NumberField(
  { value, onChange, min, max, decimals = 2, grouped = true, className, prefix, suffix, block, ...rest },
  ref
) {
  const d = useNumericDraft({ value, onChange, min, max, decimals, grouped });
  return (
    <span className={clsx('sk-numfield', block && 'sk-numfield--block', d.outOfRange && 'is-out', className)}>
      {prefix && <span className="sk-numfield__affix">{prefix}</span>}
      <input
        ref={ref}
        {...d.inputProps}
        {...rest}
        value={d.display}
        aria-invalid={d.outOfRange || undefined}
        className="sk-numfield__input"
      />
      {suffix && <span className="sk-numfield__affix">{suffix}</span>}
    </span>
  );
});

export default NumberField;
