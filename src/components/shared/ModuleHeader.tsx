import { ReactNode } from 'react';
import { getModuleColors } from '@/config/modules';

interface ModuleHeaderProps {
  moduleKey: string;
  title: string;
  description: string;
  icon: ReactNode;
  toolCount?: number;
}

export function ModuleHeader({
  moduleKey,
  title,
  description,
  icon,
  toolCount,
}: ModuleHeaderProps) {
  const { accent, bg, border } = getModuleColors(moduleKey);

  return (
    <div
      className="p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 mt-4"
      style={{
        borderColor: 'var(--border-default)',
        background: `linear-gradient(135deg, ${bg} 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
          style={{
            background: 'var(--bg-elevated)',
            color: accent,
            borderColor: border,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>
          <p
            className="text-sm mt-2 leading-relaxed max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>
        </div>
      </div>
      {toolCount !== undefined && toolCount > 0 && (
        <div className="shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-default)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accent }}
              aria-hidden="true"
            />
            {toolCount} {toolCount === 1 ? 'Tool' : 'Tools'} Available
          </span>
        </div>
      )}
    </div>
  );
}

export default ModuleHeader;
