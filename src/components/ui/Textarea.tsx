import { TextareaHTMLAttributes, forwardRef, ReactNode, useId } from 'react';
import { clsx } from 'clsx';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  helperText?: string;
  requiredMark?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, requiredMark = false, id, rows = 4, ...props }, ref) => {
    const defaultId = useId();
    const textareaId = id ?? defaultId;
    const errorId = `${textareaId}_error`;
    const helperId = `${textareaId}_helper`;

    return (
      <div className="form-group w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx('label', {
              'label-required': requiredMark,
            })}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={clsx({
            [errorId]: !!error,
            [helperId]: !!helperText && !error,
          })}
          className={clsx(
            'input-base min-h-[100px] resize-y py-2.5',
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
            <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
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

Textarea.displayName = 'Textarea';
export default Textarea;
