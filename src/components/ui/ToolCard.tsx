import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ToolConfig } from '@/types';
import { MODULE_MAP, getModuleColors } from '@/config/modules';
import { LucideIcon } from '@/components/shared/LucideIcon';

interface ToolCardProps {
  tool: ToolConfig;
  /** Denser single-row variant used in "recent" lists. */
  compact?: boolean;
  /** Hide the category label (useful when already inside a category page). */
  hideModule?: boolean;
}

export function ToolCard({ tool, compact = false, hideModule = false }: ToolCardProps) {
  const { accent, bg } = getModuleColors(tool.module);
  const moduleName = MODULE_MAP[tool.module as keyof typeof MODULE_MAP]?.name ?? tool.module;
  const fallbackIcon = MODULE_MAP[tool.module as keyof typeof MODULE_MAP]?.icon;

  return (
    <Link
      to={tool.slug}
      className={`sk-tool ${compact ? 'sk-tool--compact' : ''}`}
      style={{ ['--tool-accent' as string]: accent, ['--tool-bg' as string]: bg }}
    >
      <span className="sk-tool__icon" aria-hidden="true">
        <LucideIcon name={tool.icon} fallback={fallbackIcon} size={20} strokeWidth={2} />
      </span>
      <span className="sk-tool__body">
        <span className="sk-tool__top">
          <span className="sk-tool__name">{tool.name}</span>
          {tool.isNew ? (
            <span className="sk-badge sk-badge--new">New</span>
          ) : tool.isPopular ? (
            <span className="sk-badge sk-badge--popular">Popular</span>
          ) : null}
        </span>
        {!compact && <span className="sk-tool__desc">{tool.description}</span>}
        {!hideModule && !compact && <span className="sk-tool__module">{moduleName}</span>}
      </span>
      <ArrowUpRight className="sk-tool__arrow" size={16} aria-hidden="true" />
    </Link>
  );
}

export default ToolCard;
