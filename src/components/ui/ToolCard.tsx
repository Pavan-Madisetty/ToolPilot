import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ToolConfig } from '@/types';
import { getModuleColors } from '@/config/modules';
import { getToolEmoji } from '@/utils/toolIcons';

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

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={tool.slug}
        className={`tool-card h-full ${compact ? 'tool-card--compact' : ''}`}
        aria-label={`${tool.name}: ${tool.description}`}
      >
        <div
          className="tool-card__icon"
          style={{ background: bg, color: accent }}
          aria-hidden="true"
        >
          {getToolEmoji(tool.icon)}
        </div>
        <div className="tool-card__content w-full">
          <div className="tool-card__header flex items-start justify-between gap-2 w-full">
            <h4 className="tool-card__name flex-1">{tool.name}</h4>
            <div className="flex items-center gap-1 shrink-0">
              {tool.isNew && <span className="tool-card__badge tool-card__badge--new">New</span>}
              {tool.isPopular && !tool.isNew && (
                <span className="tool-card__badge tool-card__badge--popular">Popular</span>
              )}
            </div>
          </div>
          {!compact && <p className="tool-card__desc">{tool.description}</p>}
          <span className="tool-card__module">{tool.module}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default ToolCard;
