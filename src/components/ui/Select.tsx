import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { clsx } from 'clsx';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  requiredMark?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, requiredMark = false, id, ...props }, ref) => {
    const defaultId = useId();
    const selectId = id ?? defaultId;
    const errorId = `${selectId}_error`;
    const helperId = `${selectId}_helper`;

    return (
      <div className="form-group w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={clsx('label', {
              'label-required': requiredMark,
            })}
          >
            {label}
          </label>
        )}

        {/* Dropdown Select wrapper for custom arrow */}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={clsx({
              [errorId]: !!error,
              [helperId]: !!helperText && !error,
            })}
            className={clsx(
              'input-base pr-10 cursor-pointer appearance-none bg-no-repeat bg-[right_10px_center]',
              {
                'input-error': !!error,
              },
              className
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundSize: '1.25rem',
            }}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {error && (
          <span id={errorId} role="alert" className="error-message">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {error}
          </span>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <span id={helperId} className="helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
