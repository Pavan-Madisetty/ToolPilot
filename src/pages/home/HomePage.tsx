import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Shield, Wifi, ArrowRight, Star, Clock } from 'lucide-react';

import { useSearchStore } from '@/stores/uiStore';
import { useFavoritesStore, useHistoryStore } from '@/stores/userStore';
import { MODULES } from '@/config/modules';
import { POPULAR_TOOLS, TOOLS_BY_MODULE, TOOL_BY_ID } from '@/config/tools';
import type { ToolConfig, ModuleConfig } from '@/types';

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────
const STATS: { label: string; value: string }[] = [
  { value: '500+', label: 'Tools' },
  { value: '14', label: 'Modules' },
  { value: '100%', label: 'Free' },
  { value: 'Offline', label: 'Works Offline' },
];

// ─────────────────────────────────────────────
// Feature Highlights
// ─────────────────────────────────────────────
const FEATURES = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens in your browser. No data ever leaves your device. We have zero tracking, zero ads, zero analytics.',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with Lighthouse score 95+. Instant results with no server round-trips. Everything runs locally.',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  {
    icon: Wifi,
    title: 'Works Offline',
    description: 'Full PWA support — install ToolPilot on your device and use all 500+ tools without an internet connection.',
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.2)',
  },
];

// ─────────────────────────────────────────────
// Module color map (CSS-custom-property safe)
// ─────────────────────────────────────────────
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

function getModuleColors(key: string) {
  return MODULE_COLOR_MAP[key] ?? { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' };
}

// ─────────────────────────────────────────────
// ModuleCard
// ─────────────────────────────────────────────
interface ModuleCardProps {
  module: ModuleConfig;
}

function ModuleCard({ module }: ModuleCardProps) {
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

function getModuleEmoji(key: string): string {
  const map: Record<string, string> = {
    finance: '💰', developer: '⚡', pdf: '📄', image: '🖼️', text: '✍️',
    ai: '🤖', business: '💼', productivity: '⏰', education: '🎓', travel: '✈️',
    health: '❤️', utilities: '🔧', conversion: '🔄', calculators: '🧮',
  };
  return map[key] ?? '🔧';
}

// ─────────────────────────────────────────────
// ToolCard
// ─────────────────────────────────────────────
interface ToolCardProps {
  tool: ToolConfig;
  compact?: boolean;
}

function ToolCard({ tool, compact = false }: ToolCardProps) {
  const { accent, bg } = getModuleColors(tool.module);

  return (
    <motion.div variants={cardVariant} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={tool.slug}
        className={`tool-card ${compact ? 'tool-card--compact' : ''}`}
        aria-label={`${tool.name}: ${tool.description}`}
      >
        <div className="tool-card__icon" style={{ background: bg, color: accent }} aria-hidden="true">
          {getToolEmoji(tool.icon)}
        </div>
        <div className="tool-card__content">
          <div className="tool-card__header">
            <h4 className="tool-card__name">{tool.name}</h4>
            {tool.isNew && <span className="tool-card__badge tool-card__badge--new">New</span>}
            {tool.isPopular && !tool.isNew && (
              <span className="tool-card__badge tool-card__badge--popular">Popular</span>
            )}
          </div>
          {!compact && <p className="tool-card__desc">{tool.description}</p>}
          <span className="tool-card__module">{tool.module}</span>
        </div>
      </Link>
    </motion.div>
  );
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

// ─────────────────────────────────────────────
// JSON-LD Schema
// ─────────────────────────────────────────────
const JSON_LD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolPilot',
  url: 'https://toolpilot.app',
  description: '500+ free browser tools for finance, developer, PDF, image, text and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://toolpilot.app/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// ─────────────────────────────────────────────
// HomePage
// ─────────────────────────────────────────────
export default function HomePage() {
  const setIsOpen = useSearchStore((s) => s.setIsOpen);
  const { favorites } = useFavoritesStore();
  const { history } = useHistoryStore();

  const openSearch = useCallback(() => setIsOpen(true), [setIsOpen]);

  const recentTools = history
    .slice(0, 6)
    .map((h) => TOOL_BY_ID[h.toolId])
    .filter(Boolean) as ToolConfig[];

  const favoriteTools = favorites
    .map((f) => TOOL_BY_ID[f.toolId])
    .filter(Boolean) as ToolConfig[];

  return (
    <>
      <Helmet>
        <title>ToolPilot — 500+ Free Online Tools for Finance, Developer, PDF &amp; More</title>
        <meta
          name="description"
          content="ToolPilot offers 500+ free browser tools — EMI calculators, JSON formatters, PDF tools, image compressors, text utilities, and more. No signup. No tracking. Works offline."
        />
        <meta name="keywords" content="free online tools, emi calculator, json formatter, pdf tools, image compressor, text tools, developer tools" />
        <link rel="canonical" href="https://toolpilot.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/" />
        <meta property="og:title" content="ToolPilot — 500+ Free Online Tools" />
        <meta
          property="og:description"
          content="500+ free browser tools. No signup. No tracking. Works offline."
        />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ToolPilot — 500+ Free Online Tools" />
        <meta name="twitter:description" content="500+ free browser tools. No signup. No tracking. Works offline." />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(JSON_LD_WEBSITE)}</script>
      </Helmet>

      <main id="main-content" className="homepage">
        {/* ── Hero ─────────────────────────────── */}
        <section className="hero" aria-labelledby="hero-headline">
          <div className="hero__bg-pattern" aria-hidden="true" />
          <div className="hero__glow hero__glow--left" aria-hidden="true" />
          <div className="hero__glow hero__glow--right" aria-hidden="true" />

          <motion.div
            className="hero__content container"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="hero__eyebrow">
              <span className="hero__badge">
                <Star size={12} aria-hidden="true" />
                500+ Free Tools
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} id="hero-headline" className="hero__headline">
              Your Complete{' '}
              <span className="hero__gradient-text">Digital Toolkit</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="hero__subheadline">
              500+ free browser tools. No signup. No tracking. Works offline.
            </motion.p>

            {/* Search trigger */}
            <motion.div variants={fadeUp} className="hero__search-wrap">
              <button
                type="button"
                className="hero__search-bar"
                onClick={openSearch}
                aria-label="Open search — search for any tool"
                id="hero-search-btn"
              >
                <Search size={20} className="hero__search-icon" aria-hidden="true" />
                <span className="hero__search-placeholder">Search 500+ tools…</span>
                <kbd className="hero__search-kbd" aria-label="Keyboard shortcut: Control K">
                  ⌘K
                </kbd>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="hero__stats" role="list" aria-label="Platform statistics">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero__stat" role="listitem">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Recently Used ─────────────────────── */}
        <AnimatePresence>
          {recentTools.length > 0 && (
            <motion.section
              className="section container"
              aria-labelledby="recent-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="section__header">
                <div>
                  <h2 id="recent-heading" className="section__title">
                    <Clock size={20} aria-hidden="true" className="section__title-icon" />
                    Recently Used
                  </h2>
                  <p className="section__subtitle">Pick up where you left off</p>
                </div>
              </div>
              <motion.div
                className="tools-grid tools-grid--compact"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {recentTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} compact />
                ))}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Favorites ─────────────────────────── */}
        <AnimatePresence>
          {favoriteTools.length > 0 && (
            <motion.section
              className="section container"
              aria-labelledby="favorites-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="section__header">
                <div>
                  <h2 id="favorites-heading" className="section__title">
                    <Star size={20} aria-hidden="true" className="section__title-icon" style={{ color: '#f59e0b' }} />
                    Your Favorites
                  </h2>
                  <p className="section__subtitle">Tools you've starred for quick access</p>
                </div>
              </div>
              <motion.div
                className="tools-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {favoriteTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Explore by Category ───────────────── */}
        <section className="section container" aria-labelledby="modules-heading">
          <motion.div
            className="section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <div>
              <h2 id="modules-heading" className="section__title">Explore by Category</h2>
              <p className="section__subtitle">14 powerful modules covering every digital need</p>
            </div>
            <Link to="/search" className="section__view-all" aria-label="Browse all categories">
              All categories <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            className="modules-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {MODULES.map((mod) => (
              <ModuleCard key={mod.key} module={mod} />
            ))}
          </motion.div>
        </section>

        {/* ── Popular Tools ─────────────────────── */}
        <section className="section section--alt" aria-labelledby="popular-heading">
          <div className="container">
            <motion.div
              className="section__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <div>
                <h2 id="popular-heading" className="section__title">Most Popular Tools</h2>
                <p className="section__subtitle">Trusted by millions of users every day</p>
              </div>
              <Link to="/search?filter=popular" className="section__view-all" aria-label="View all popular tools">
                View all <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              className="tools-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {POPULAR_TOOLS.slice(0, 12).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Feature Highlights ────────────────── */}
        <section className="section container" aria-labelledby="features-heading">
          <motion.div
            className="section__header section__header--center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <div>
              <h2 id="features-heading" className="section__title">Why ToolPilot?</h2>
              <p className="section__subtitle">Built with your privacy and performance in mind</p>
            </div>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                className="feature-card"
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{
                  '--feature-color': feat.color,
                  '--feature-bg': feat.bg,
                  '--feature-border': feat.border,
                } as React.CSSProperties}
              >
                <div className="feature-card__icon-wrap" aria-hidden="true">
                  <feat.icon size={24} />
                </div>
                <h3 className="feature-card__title">{feat.title}</h3>
                <p className="feature-card__desc">{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA Banner ────────────────────────── */}
        <section className="cta-banner" aria-labelledby="cta-heading">
          <motion.div
            className="cta-banner__inner container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <h2 id="cta-heading" className="cta-banner__title">
              Ready to explore 500+ tools?
            </h2>
            <p className="cta-banner__desc">
              All free. All private. All right here in your browser.
            </p>
            <button
              type="button"
              onClick={openSearch}
              className="cta-banner__btn"
              id="cta-search-btn"
              aria-label="Search for tools"
            >
              <Search size={18} aria-hidden="true" />
              Search Tools
            </button>
          </motion.div>
        </section>
      </main>

      <style>{`
        /* ── Hero ──────────────────────────────── */
        .hero {
          position: relative;
          overflow: hidden;
          padding: 6rem 1.5rem 5rem;
          background: var(--bg-base);
          text-align: center;
        }
        .hero__bg-pattern {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, var(--border-default) 1px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.4;
          pointer-events: none;
        }
        .hero__glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.15;
        }
        .hero__glow--left  { top: -100px; left: -100px;  background: #3b82f6; }
        .hero__glow--right { top: -100px; right: -100px; background: #8b5cf6; }

        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .hero__eyebrow { display: flex; justify-content: center; }
        .hero__badge {
          display: inline-flex; align-items: center; gap: 0.375rem;
          padding: 0.35rem 0.9rem;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 9999px;
          color: #3b82f6;
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.02em;
        }
        .hero__headline {
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero__gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__subheadline {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 550px;
          line-height: 1.6;
          margin: 0;
        }

        /* Search bar */
        .hero__search-wrap { width: 100%; max-width: 580px; }
        .hero__search-bar {
          display: flex; align-items: center; gap: 0.75rem;
          width: 100%;
          padding: 0.9rem 1.25rem;
          background: var(--bg-elevated);
          border: 1.5px solid var(--border-default);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-md);
        }
        .hero__search-bar:hover {
          border-color: var(--border-focus);
          box-shadow: var(--shadow-lg), 0 0 0 3px rgba(59,130,246,0.1);
        }
        .hero__search-bar:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }
        .hero__search-icon { color: var(--text-tertiary); flex-shrink: 0; }
        .hero__search-placeholder {
          flex: 1;
          text-align: left;
          color: var(--text-tertiary);
          font-size: 1rem;
        }
        .hero__search-kbd {
          padding: 0.2rem 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          white-space: nowrap;
        }

        /* Stats */
        .hero__stats {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 0.5rem 2.5rem;
          margin-top: 0.5rem;
        }
        .hero__stat { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
        .hero__stat-value { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; }
        .hero__stat-label { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── Sections ─────────────────────────── */
        .section { padding: 4rem 1.5rem; }
        .section--alt { background: var(--bg-surface); }
        .container { max-width: 1280px; margin: 0 auto; }

        .section__header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 2rem; gap: 1rem;
          flex-wrap: wrap;
        }
        .section__header--center { justify-content: center; text-align: center; }
        .section__title {
          font-size: 1.75rem; font-weight: 700;
          color: var(--text-primary); margin: 0 0 0.25rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .section__title-icon { color: var(--text-secondary); }
        .section__subtitle { font-size: 0.95rem; color: var(--text-secondary); margin: 0; }
        .section__view-all {
          display: inline-flex; align-items: center; gap: 0.3rem;
          color: #3b82f6; font-size: 0.9rem; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          transition: gap 0.2s ease;
        }
        .section__view-all:hover { gap: 0.5rem; }

        /* ── Module Grid ─────────────────────── */
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .module-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.25rem;
          background: var(--bg-elevated);
          border: 1px solid var(--accent, var(--border-default));
          border-color: var(--border, var(--border-default));
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .module-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--bg);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .module-card:hover::before { opacity: 1; }
        .module-card:hover { border-color: var(--accent); box-shadow: var(--shadow-md); }
        .module-card__icon-wrap {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 10px;
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          position: relative;
          z-index: 1;
        }
        .module-card__emoji { line-height: 1; }
        .module-card__body { flex: 1; min-width: 0; position: relative; z-index: 1; }
        .module-card__name {
          font-size: 0.95rem; font-weight: 600;
          color: var(--text-primary); margin: 0 0 0.15rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .module-card__desc {
          font-size: 0.78rem; color: var(--text-secondary);
          margin: 0 0 0.35rem; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .module-card__count {
          font-size: 0.72rem; font-weight: 600;
          color: var(--accent); text-transform: uppercase; letter-spacing: 0.04em;
        }
        .module-card__arrow {
          flex-shrink: 0; color: var(--text-tertiary);
          transition: transform 0.2s ease, color 0.2s ease;
          position: relative; z-index: 1;
        }
        .module-card:hover .module-card__arrow { transform: translateX(3px); color: var(--accent); }

        /* ── Tools Grid ──────────────────────── */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.85rem;
        }
        .tools-grid--compact {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .tool-card {
          display: flex; align-items: flex-start; gap: 0.85rem;
          padding: 1rem 1.1rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .tool-card:hover { border-color: var(--border-focus); box-shadow: var(--shadow-md); }
        .tool-card__icon {
          flex-shrink: 0; width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; font-weight: 700;
        }
        .tool-card__content { flex: 1; min-width: 0; }
        .tool-card__header { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.2rem; }
        .tool-card__name {
          font-size: 0.9rem; font-weight: 600;
          color: var(--text-primary); margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tool-card__badge {
          font-size: 0.65rem; font-weight: 700;
          padding: 0.1rem 0.4rem; border-radius: 4px;
          text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;
        }
        .tool-card__badge--new { background: rgba(16,185,129,0.12); color: #10b981; }
        .tool-card__badge--popular { background: rgba(245,158,11,0.12); color: #f59e0b; }
        .tool-card__desc {
          font-size: 0.8rem; color: var(--text-secondary);
          margin: 0 0 0.3rem; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tool-card__module {
          font-size: 0.7rem; color: var(--text-tertiary);
          text-transform: capitalize; font-weight: 500;
        }
        .tool-card--compact .tool-card__icon { width: 34px; height: 34px; font-size: 0.95rem; }
        .tool-card--compact .tool-card__name { font-size: 0.85rem; }

        /* ── Features ────────────────────────── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .feature-card {
          padding: 2rem 1.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--feature-border, var(--border-default));
          border-radius: 16px;
          transition: all 0.25s ease;
        }
        .feature-card:hover { box-shadow: var(--shadow-lg); }
        .feature-card__icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--feature-bg);
          color: var(--feature-color);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
        }
        .feature-card__title {
          font-size: 1.1rem; font-weight: 700;
          color: var(--text-primary); margin: 0 0 0.6rem;
        }
        .feature-card__desc {
          font-size: 0.9rem; color: var(--text-secondary);
          line-height: 1.65; margin: 0;
        }

        /* ── CTA Banner ──────────────────────── */
        .cta-banner {
          padding: 5rem 1.5rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .cta-banner__inner { position: relative; z-index: 1; }
        .cta-banner__title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800; color: #fff; margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
        }
        .cta-banner__desc {
          font-size: 1.1rem; color: rgba(255,255,255,0.75); margin: 0 0 2rem;
        }
        .cta-banner__btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: #fff; color: #1e3a8a;
          border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .cta-banner__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
        .cta-banner__btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* ── Responsive ──────────────────────── */
        @media (max-width: 640px) {
          .hero { padding: 4rem 1rem 3rem; }
          .modules-grid { grid-template-columns: 1fr; }
          .tools-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .section__header { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .hero__stats { gap: 0.5rem 1.5rem; }
          .hero__stat-value { font-size: 1.3rem; }
        }
      `}</style>
    </>
  );
}
