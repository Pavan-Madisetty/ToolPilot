import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ModuleConfig } from '@/types';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { getModuleColors, getModuleEmoji } from '@/config/modules';

interface ModuleCardProps {
  module: ModuleConfig;
}

import { ArrowRight } from 'lucide-react';

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ModuleCard({ module }: ModuleCardProps) {
  const { accent, bg, border } = getModuleColors(module.key);
  const toolCount = (TOOLS_BY_MODULE[module.key] ?? []).length;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={module.slug}
        className="module-card"
        style={{ '--accent': accent, '--bg': bg, '--border': border } as React.CSSProperties}
        aria-label={`${module.name} — ${module.description}`}
      >
        <div className="module-card__icon-wrap">
          <span className="module-card__emoji" aria-hidden="true">
            {getModuleEmoji(module.key)}
          </span>
        </div>
        <div className="module-card__body">
          <h3 className="module-card__name">{module.name}</h3>
          <p className="module-card__desc">{module.description}</p>
          <span className="module-card__count">{toolCount} tools</span>
        </div>
        <ArrowRight className="module-card__arrow" size={16} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

export default ModuleCard;
