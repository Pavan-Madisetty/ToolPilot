import { clsx } from 'clsx';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
}

export function Switch({ label, checked, onChange, description, disabled = false }: SwitchProps) {
  const switchId = `switch_${label.replace(/\s+/g, '_').toLowerCase()}`;

  return (
    <div className="flex items-center justify-between gap-4 py-1">
      {/* Label and description details */}
      <div className="flex flex-col">
        <label
          htmlFor={switchId}
          className={clsx('text-sm font-medium cursor-pointer', {
            'opacity-50 cursor-not-allowed': disabled,
          })}
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </span>
        )}
      </div>

      {/* Switch Toggle Control */}
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none',
          checked ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700',
          {
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}

export default Switch;
