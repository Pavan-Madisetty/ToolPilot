import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ModuleConfig } from '@/types';
import { TOOLS_BY_MODULE } from '@/config/tools';

interface ModuleCardProps {
  module: ModuleConfig;
}

const MODULE_COLOR_MAP: Record<string, { accent: string; bg: string; border: string }> = {
  finance:      { accent: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  developer:    { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)'  },
  pdf:          { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
  image:        { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
  text:         { accent: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.2)'   },
  ai:           { accent: '#ec4899', bg: 'rgba(236,72,153,0.08)',  border: 'rgba(236,72,153,0.2)'  },
  business:     { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)'  },
  productivity: { accent: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)'  },
  education:    { accent: '#84cc16', bg: 'rgba(132,204,22,0.08)',  border: 'rgba(132,204,22,0.2)'  },
  travel:       { accent: '#14b8a6', bg: 'rgba(20,184,166,0.08)',  border: 'rgba(20,184,166,0.2)'  },
  health:       { accent: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)'   },
  utilities:    { accent: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)'  },
  conversion:   { accent: '#64748b', bg: 'rgba(100,116,139,0.08)', border: 'rgba(100,116,139,0.2)' },
  calculators:  { accent: '#a855f7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.2)'  },
};

export function getModuleColors(key: string) {
  return MODULE_COLOR_MAP[key] ?? { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' };
}

export function getModuleEmoji(key: string): string {
  const map: Record<string, string> = {
    finance: '💰', developer: '⚡', pdf: '📄', image: '🖼️', text: '✍️',
    ai: '🤖', business: '💼', productivity: '⏰', education: '🎓', travel: '✈️',
    health: '❤️', utilities: '🔧', conversion: '🔄', calculators: '🧮',
  };
  return map[key] ?? '🔧';
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ModuleCard({ module }: ModuleCardProps) {
  const { accent, bg, border } = getModuleColors(module.key);
  const toolCount = (TOOLS_BY_MODULE[module.key] ?? []).length;

  return (
    <motion.div variants={cardVariant} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
