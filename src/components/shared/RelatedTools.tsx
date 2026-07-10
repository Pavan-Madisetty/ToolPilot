import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOOL_BY_ID } from '@/config/tools';
import { getModuleColors } from '@/config/modules';

interface RelatedToolsProps {
  toolIds: string[];
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

/** Shared card renderer for a single related tool */
function ToolCard({ tool }: { tool: { id: string; slug: string; icon: string; name: string; module: string; description: string } }) {
  const { accent, bg } = getModuleColors(tool.module);
  return (
    <Link
      key={tool.id}
      to={tool.slug}
      className="flex items-center gap-4 p-4 rounded-xl border bg-white dark:bg-slate-900/40 hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all text-decoration-none group"
      style={{ borderColor: 'var(--border-default)' }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
        style={{ backgroundColor: bg, color: accent }}
      >
        {getToolEmoji(tool.icon)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold group-hover:text-indigo-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
            {tool.name}
          </span>
          <span className={`badge module-badge-${tool.module} capitalize text-[10px] font-bold px-2 py-0.5 rounded-md`}>
            {tool.module}
          </span>
        </div>
        <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {tool.description}
        </p>
      </div>
    </Link>
  );
}

export function RelatedTools({ toolIds }: RelatedToolsProps) {
  const tools = toolIds.map((id) => TOOL_BY_ID[id]).filter(Boolean);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const useCarousel = tools.length > 3;

  useEffect(() => {
    if (!useCarousel) return;
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 4);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [tools.length, useCarousel]);

  if (tools.length === 0) return null;

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className="pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          {/* Filled star icon */}
          <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          Related Tools
        </h3>
      </div>

      {/* Grid layout for ≤3 tools */}
      {!useCarousel && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* Carousel layout for >3 tools */}
      {useCarousel && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="shrink-0"
                style={{ width: 'calc(33.333% - 11px)', minWidth: 280, scrollSnapAlign: 'start' }}
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          {/* Right scroll arrow — floats outside cards */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center transition-all hover:shadow-xl hover:scale-105 z-10"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default RelatedTools;
