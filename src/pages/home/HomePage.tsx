import { useCallback, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Shield, Wifi, ArrowRight, Star, Clock } from 'lucide-react';

import { useSearchStore } from '@/stores/uiStore';
import { useFavoritesStore, useHistoryStore } from '@/stores/userStore';
import { MODULES, getModuleEmoji } from '@/config/modules';
import { POPULAR_TOOLS, TOOL_BY_ID, TOOLS_BY_MODULE, TOOL_COUNT_LABEL } from '@/config/tools';
import type { ToolConfig } from '@/types';
import { ToolCard } from '@/components/ui/ToolCard';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';
import { AdRenderer } from '@/components/shared/AdRenderer';

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
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─────────────────────────────────────────────
// Feature Highlights
// ─────────────────────────────────────────────
const FEATURES = [
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All processing happens in your browser. No data ever leaves your device. We have zero tracking, zero ads, zero analytics.',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized for performance with Lighthouse score 95+. Instant results with no server round-trips. Everything runs locally.',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  {
    icon: Wifi,
    title: 'Works Offline',
    description: `Full PWA support — install Toolskyt on your device and use every tool without an internet connection.`,
    color: 'var(--text-link)',
    bg: 'rgba(79, 70, 229, 0.08)',
    border: 'rgba(79, 70, 229, 0.2)',
  },
];

// ─────────────────────────────────────────────
// JSON-LD Schema
// ─────────────────────────────────────────────
const JSON_LD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolskyt',
  url: 'https://toolskyt.com',
  description: 'Free browser tools for finance, developer, PDF, image, text and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://toolskyt.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const JSON_LD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Toolskyt',
  url: 'https://toolskyt.com',
  logo: 'https://toolskyt.com/favicon.svg',
  sameAs: ['https://github.com/Pavan-Madisetty/ToolPilot'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@toolskyt.com',
  },
};

// ─────────────────────────────────────────────
// HomePage
// ─────────────────────────────────────────────
export default function HomePage() {
  const { config } = useRuntimeConfig();
  const setIsOpen = useSearchStore((s) => s.setIsOpen);
  const { favorites } = useFavoritesStore();
  const { history } = useHistoryStore();
  const [activeModuleKey, setActiveModuleKey] = useState<string>('popular');

  const openSearch = useCallback(() => setIsOpen(true), [setIsOpen]);

  const recentTools = useMemo(() => {
    return history
      .slice(0, 6)
      .map((h) => TOOL_BY_ID[h.toolId])
      .filter(Boolean) as ToolConfig[];
  }, [history]);

  const favoriteTools = useMemo(() => {
    return favorites.map((f) => TOOL_BY_ID[f.toolId]).filter(Boolean) as ToolConfig[];
  }, [favorites]);

  const trendingToolsList = useMemo(() => {
    const ids = config.homepage?.trendingTools || [];
    if (ids.length === 0) return POPULAR_TOOLS.slice(0, 12);
    return ids.map((id) => TOOL_BY_ID[id]).filter(Boolean) as ToolConfig[];
  }, [config.homepage?.trendingTools]);

  const activeModules = useMemo(() => {
    return MODULES.filter((mod) => {
      if (mod.key === 'finance' && !config.featureFlags?.financeTools) return false;
      if (mod.key === 'developer' && !config.featureFlags?.developerTools) return false;
      if (mod.key === 'ai' && !config.featureFlags?.aiTools) return false;
      return true;
    });
  }, [config.featureFlags]);

  return (
    <>
      <Helmet>
        <title>{config.seo?.homepage?.metaTitle || `Toolskyt — ${TOOL_COUNT_LABEL} Free Online Tools for Finance, Developer, PDF & More`}</title>
        <meta
          name="description"
          content={config.seo?.homepage?.metaDescription || `Toolskyt offers ${TOOL_COUNT_LABEL} free browser tools — EMI calculators, JSON formatters, PDF tools, image compressors, text utilities, and more. No signup. No tracking. Works offline.`}
        />
        <meta
          name="keywords"
          content={config.seo?.homepage?.keywords?.join(', ') || "free online tools, emi calculator, json formatter, pdf tools, image compressor, text tools, developer tools"}
        />
        <link rel="canonical" href="https://toolskyt.com/" />
        <script type="application/ld+json">{JSON.stringify(JSON_LD_WEBSITE)}</script>
        <script type="application/ld+json">{JSON.stringify(JSON_LD_ORGANIZATION)}</script>
      </Helmet>

      <div className="homepage">
        {/* Workspace section / Hero */}
        {(config.homepage?.visibleSections?.hero ?? true) && (
          <section className="workspace-header" aria-label="Hero">
            <div className="workspace-header__pattern" aria-hidden="true" />
            <div className="workspace-header__content">
              <div className="workspace-header__badge">
                <span>🚀 browser-based</span>
              </div>
              <h1 className="workspace-header__title text-h1">
                {config.homepage?.hero?.title || `${TOOL_COUNT_LABEL} Free Online Tools`}
              </h1>
              <p className="workspace-header__desc text-body-large">
                {config.homepage?.hero?.subtitle || "Secure, fast, and local browser-based utility tools. No signup, no tracking, works completely offline."}
              </p>
              <div className="workspace-header__search-wrap">
                <button
                  type="button"
                  onClick={openSearch}
                  className="workspace-header__search-bar"
                  aria-label="Search all tools"
                >
                  <Search className="workspace-header__search-icon w-5 h-5" aria-hidden="true" />
                  <span className="workspace-header__search-placeholder">
                    Search {TOOL_COUNT_LABEL} tools...
                  </span>
                  <kbd className="workspace-header__search-kbd">⌘K</kbd>
                </button>
              </div>
              
              {/* Dynamic Ad below Hero */}
              <AdRenderer slotId="homepage-hero-bottom" className="mt-8" />
            </div>
          </section>
        )}

        {/* ── Favorites ─────────────────────────── */}
        <AnimatePresence>
          {(config.homepage?.visibleSections?.favorites ?? true) && favoriteTools.length > 0 && (
            <motion.section
              id="favorites"
              className="section container-app"
              aria-labelledby="favorites-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="section__header">
                <div>
                  <h2 id="favorites-heading" className="section__title">
                    <Star
                      size={20}
                      aria-hidden="true"
                      className="section__title-icon"
                      style={{ color: '#f59e0b' }}
                    />
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

        {/* ── Workspace Categories & Tools Grid ── */}
        {(config.homepage?.visibleSections?.categories ?? true) && (
          <section className="section container-app" aria-labelledby="workspace-tools-heading">
            <motion.div
              className="section__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <div>
                <h2 id="workspace-tools-heading" className="section__title">
                  Workspace Categories
                </h2>
                <p className="section__subtitle">
                  Select a category to explore secure, browser-based productivity tools
                </p>
              </div>
              <Link to="/search" className="section__view-all" aria-label="Browse all tools index">
                Search index <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Module Selector Tabs */}
            <div className="workspace-tabs-container">
              <div className="workspace-tabs" role="tablist" aria-label="Tool modules">
                <button
                  type="button"
                  onClick={() => setActiveModuleKey('popular')}
                  className={`workspace-tab ${activeModuleKey === 'popular' ? 'workspace-tab--active' : ''}`}
                  aria-selected={activeModuleKey === 'popular'}
                  role="tab"
                >
                  <span className="workspace-tab__emoji" aria-hidden="true">
                    🔥
                  </span>
                  <span className="workspace-tab__name">Popular Tools</span>
                </button>
                {activeModules.map((mod) => {
                  const isActive = activeModuleKey === mod.key;
                  return (
                    <button
                      key={mod.key}
                      type="button"
                      onClick={() => setActiveModuleKey(mod.key)}
                      className={`workspace-tab ${isActive ? 'workspace-tab--active' : ''}`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      <span className="workspace-tab__emoji" aria-hidden="true">
                        {getModuleEmoji(mod.key)}
                      </span>
                      <span className="workspace-tab__name">{mod.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tools Grid */}
            <motion.div
              key={activeModuleKey}
              className="tools-grid mt-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {(activeModuleKey === 'popular'
                ? trendingToolsList
                : TOOLS_BY_MODULE[activeModuleKey] || []
              ).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Feature Highlights ────────────────── */}
        {(config.homepage?.visibleSections?.highlights ?? true) && (
          <section className="section container-app" aria-labelledby="features-heading">
            <motion.div
              className="section__header section__header--center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <div>
                <h2 id="features-heading" className="section__title">
                  Why Toolskyt?
                </h2>
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
                  style={
                    {
                      '--feature-color': feat.color,
                      '--feature-bg': feat.bg,
                      '--feature-border': feat.border,
                    } as React.CSSProperties
                  }
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
        )}

        {/* ── Recently Used (Bottom) ────────────── */}
        <AnimatePresence>
          {(config.homepage?.visibleSections?.recentlyUsed ?? true) && recentTools.length > 0 && (
            <motion.section
              className="section container-app"
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

        {/* ── CTA Banner ────────────────────────── */}
        <section className="cta-banner" aria-labelledby="cta-heading">
          <motion.div
            className="cta-banner__inner container-app"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <h2 id="cta-heading" className="cta-banner__title">
              Ready to explore {TOOL_COUNT_LABEL} tools?
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
      </div>
    </>
  );
}
