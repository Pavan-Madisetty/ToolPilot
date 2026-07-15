import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ToolConfig } from '@/types';
import { getModuleColors } from '@/config/modules';
import { LucideIcon } from '@/components/shared/LucideIcon';

interface ToolCardProps {
  tool: ToolConfig;
  compact?: boolean;
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const { accent, bg } = getModuleColors(tool.module);

  if (compact) {
    return (
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Link
          to={tool.slug}
          className="tool-card tool-card--compact h-full flex flex-row items-center gap-4"
          aria-label={`${tool.name}: ${tool.description}`}
        >
          <div
            className="tool-card__icon rounded-[var(--radius-lg)] border border-transparent"
            style={{ 
              background: bg, 
              color: accent, 
            }}
            aria-hidden="true"
          >
            <LucideIcon name={tool.icon} size={16} strokeWidth={2} />
          </div>
          <div className="tool-card__content flex-1 min-w-0">
            <h4 className="tool-card__name text-[14px] font-bold truncate text-[var(--text-primary)]">{tool.name}</h4>
            <span className="tool-card__module text-[var(--text-tertiary)] uppercase text-[10px] font-bold tracking-wider">{tool.module}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={tool.slug}
        className="tool-card tool-card--vertical h-full border border-[var(--border-default)] hover:border-[var(--primary)]/30 rounded-[var(--radius-xl)] bg-[var(--bg-surface-container-lowest)] p-6 transition-all duration-200"
        aria-label={`${tool.name}: ${tool.description}`}
      >
        <div className="tool-card__top flex justify-between items-start w-full mb-4">
          <div
            className="tool-card__icon rounded-[var(--radius-lg)] border border-transparent"
            style={{ 
              background: bg, 
              color: accent, 
            }}
            aria-hidden="true"
          >
            <LucideIcon name={tool.icon} size={20} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {tool.isNew && <span className="tool-card__badge tool-card__badge--new bg-[var(--success-subtle)] text-[var(--success)] px-2 py-0.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider">New</span>}
            {tool.isPopular && !tool.isNew && (
              <span className="tool-card__badge tool-card__badge--popular bg-[var(--warning-subtle)] text-[var(--warning)] px-2 py-0.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider">Popular</span>
            )}
          </div>
        </div>
        <div className="tool-card__content w-full flex flex-col gap-2">
          <h4 className="tool-card__name font-display text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{tool.name}</h4>
          <p className="tool-card__desc text-[14px] text-[var(--text-secondary)] line-clamp-3 leading-relaxed">{tool.description}</p>
          <span className="tool-card__module text-[var(--text-tertiary)] uppercase text-[10px] font-bold tracking-wider mt-2">{tool.module}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default ToolCard;
