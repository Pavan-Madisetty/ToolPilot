import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

type Tone = 'info' | 'success' | 'warning' | 'danger';

const TONES: Record<Tone, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: 'var(--info)', bg: 'var(--info-subtle)' },
  success: { icon: CheckCircle2, color: 'var(--success)', bg: 'var(--success-subtle)' },
  warning: { icon: AlertTriangle, color: 'var(--warning)', bg: 'var(--warning-subtle)' },
  danger: { icon: XCircle, color: 'var(--danger)', bg: 'var(--danger-subtle)' },
};

interface Props {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
}

/** Inline status message used by tools for validation, warnings and success feedback. */
export function Notice({ tone = 'info', title, children }: Props) {
  const { icon: Icon, color, bg } = TONES[tone];
  return (
    <div
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      className="flex gap-3 rounded-xl border p-4 text-sm"
      style={{ background: bg, borderColor: color, color: 'var(--text-primary)' }}
    >
      <Icon size={18} className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true" />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div style={{ color: 'var(--text-secondary)' }}>{children}</div>}
      </div>
    </div>
  );
}
