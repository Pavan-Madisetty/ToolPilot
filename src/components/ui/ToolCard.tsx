import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ToolConfig } from '@/types';
import { getModuleColors } from '@/config/modules';

interface ToolCardProps {
  tool: ToolConfig;
  compact?: boolean;
}

function getToolEmoji(icon: string): string {
  const emojiMap: Record<string, string> = {
    CurrencyRupeeIcon: '₹', HomeIcon: '🏠', TruckIcon: '🚗', UserIcon: '👤',
    AcademicCapIcon: '🎓', CheckBadgeIcon: '✅', ChartBarIcon: '📊', BanknotesIcon: '💳',
    ArrowTrendingUpIcon: '📈', ShieldCheckIcon: '🛡', BuildingOfficeIcon: '🏢',
    SunIcon: '☀️', ReceiptPercentIcon: '🧾', DocumentChartBarIcon: '📃', CreditCardIcon: '💳',
    HomeModernIcon: '🏡', CalculatorIcon: '🧮', GlobeAltIcon: '🌍', GiftIcon: '🎁',
    ChartBarSquareIcon: '📊', ArrowsRightLeftIcon: '↔️', UsersIcon: '👥',
    ClipboardDocumentListIcon: '📋', PresentationChartBarIcon: '📑', ScaleIcon: '⚖️',
    StarIcon: '⭐', CurrencyBitcoinIcon: '₿', ArrowPathIcon: '🔄', ChartPieIcon: '🥧',
    CodeBracketIcon: '{ }', LinkIcon: '🔗', ShieldCheck: '🔒', FingerPrintIcon: '🔑',
    LockClosedIcon: '🔒', MagnifyingGlassIcon: '🔍', ClockIcon: '⏰', SwatchIcon: '🎨',
    CircleStackIcon: '🗄', DocumentDuplicateIcon: '📋', KeyIcon: '🔑', DocumentTextIcon: '📝',
    PaintBrushIcon: '🖌', ArrowsPointingOutIcon: '↔', ArchiveBoxIcon: '📦',
    ScissorsIcon: '✂️', QrCodeIcon: '⬛', PhotoIcon: '🖼', WindowIcon: '🖥',
    SparklesIcon: '✨', HeartIcon: '❤️', WrenchScrewdriverIcon: '🔧',
    MapIcon: '🗺', BriefcaseIcon: '💼', DocumentIcon: '📄', PresentationChartLineIcon: '📉',
  };
  return emojiMap[icon] ?? '🔧';
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const { accent, bg } = getModuleColors(tool.module);

  return (
    <motion.div variants={cardVariant} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.98 }} className="h-full">
      <Link
        to={tool.slug}
        className={`tool-card h-full ${compact ? 'tool-card--compact' : ''}`}
        aria-label={`${tool.name}: ${tool.description}`}
      >
        <div className="tool-card__icon" style={{ background: bg, color: accent }} aria-hidden="true">
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
