import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  requiredMark?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, requiredMark = false, id, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id ?? defaultId;
    const errorId = `${inputId}_error`;
    const helperId = `${inputId}_helper`;

    return (
      <div className="form-group w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={clsx('label', {
              'label-required': requiredMark,
            })}
          >
            {label}
          </label>
        )}

        {/* Input */}
        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={!!error}
          aria-describedby={clsx({
            [errorId]: !!error,
            [helperId]: !!helperText && !error,
          })}
          className={clsx(
            'input-base',
            {
              'input-error': !!error,
            },
            className
          )}
          {...props}
        />

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

Input.displayName = 'Input';
export default Input;
