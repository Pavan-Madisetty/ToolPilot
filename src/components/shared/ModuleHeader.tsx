import { ReactNode } from 'react';

interface ModuleHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconColorClass: string;
  accentBgColor: string;
  toolCount?: number;
}

export function ModuleHeader({
  title,
  description,
  icon,
  iconColorClass,
  accentBgColor,
  toolCount,
}: ModuleHeaderProps) {
  return (
    <div
      className="p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 mt-4"
      style={{
        borderColor: 'var(--border-default)',
        background: `linear-gradient(135deg, ${accentBgColor} 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[var(--border-default)] ${iconColorClass}`}
          style={{ background: 'var(--bg-elevated)' }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>
          <p className="text-sm mt-2 leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
      </div>
      {toolCount !== undefined && (
        <div className="shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              background: 'rgba(79, 70, 229, 0.08)',
              color: 'var(--text-link)',
              borderColor: 'rgba(79, 70, 229, 0.15)',
            }}
          >
            {toolCount} Utilities Online
          </span>
        </div>
      )}
    </div>
  );
}

export default ModuleHeader;
