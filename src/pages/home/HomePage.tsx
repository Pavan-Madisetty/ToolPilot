import { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Zap, WifiOff, ArrowRight, Star, Clock, Sparkles, Lock, Layers } from 'lucide-react';

import { useSearchStore } from '@/stores/uiStore';
import { useFavoritesStore, useHistoryStore } from '@/stores/userStore';
import { MODULES, getModuleColors } from '@/config/modules';
import { LucideIcon } from '@/components/shared/LucideIcon';
import { POPULAR_TOOLS, TOOL_BY_ID, TOOLS_BY_MODULE, TOOL_COUNT_LABEL, LIVE_TOOL_COUNT } from '@/config/tools';
import type { ToolConfig } from '@/types';
import { ToolCard } from '@/components/ui/ToolCard';
import { AdRenderer } from '@/components/shared/AdRenderer';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';

// ─────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────
const QUICK_LINKS = [
  { label: 'EMI Calculator', to: '/finance/emi-calculator' },
  { label: 'JSON Formatter', to: '/developer/json-formatter' },
  { label: 'Merge PDF', to: '/pdf/merge' },
  { label: 'Compress Image', to: '/image/image-compress' },
  { label: 'Word Counter', to: '/text/word-counter' },
  { label: 'QR Code', to: '/image/qr-generator' },
];

const FEATURES = [
  {
    icon: Lock,
    title: 'Private by design',
    description:
      'Files and text are processed on your device. Nothing is uploaded, so sensitive documents never leave your browser.',
  },
  {
    icon: Zap,
    title: 'Instant results',
    description: 'No queues, no waiting on a server. Results update as you type, even for large inputs.',
  },
  {
    icon: WifiOff,
    title: 'Works offline',
    description: 'Install Toolskyt as an app and keep using your favourite tools without a connection.',
  },
  {
    icon: Layers,
    title: 'Free, no account',
    description: 'Every tool is free to use with no sign-up, no limits and no watermarks.',
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

      <div className="sk-home">
        {/* ── Hero ───────────────────────────────── */}
        {(config.homepage?.visibleSections?.hero ?? true) && (
          <section className="sk-hero" aria-label="Welcome">
            <div className="sk-container sk-hero__inner">
              <span className="sk-eyebrow">
                <Sparkles size={14} aria-hidden="true" /> Free · Private · Works offline
              </span>
              <h1 className="sk-hero__title">
                {config.homepage?.hero?.title || (
                  <>
                    Free online tools that run <span className="sk-gradient-text">right in your browser</span>
                  </>
                )}
              </h1>
              <p className="sk-hero__sub">
                {config.homepage?.hero?.subtitle ||
                  'Calculators, converters, PDF and image utilities, developer tools and more. No sign-up, no uploads, no tracking.'}
              </p>

              <button type="button" onClick={openSearch} className="sk-hero__search" aria-label="Search all tools">
                <Search size={20} aria-hidden="true" />
                <span>
                  Search {LIVE_TOOL_COUNT} tools<em className="sk-hide-xs"> — try “EMI”, “JSON” or “merge pdf”</em>
                </span>
                <kbd>⌘K</kbd>
              </button>

              <div className="sk-hero__quick">
                <span>Popular:</span>
                {QUICK_LINKS.map((q) => (
                  <Link key={q.to} to={q.to} className="sk-pill">
                    {q.label}
                  </Link>
                ))}
              </div>

              <dl className="sk-stats">
                <div>
                  <dt>Free tools</dt>
                  <dd>{LIVE_TOOL_COUNT}</dd>
                </div>
                <div>
                  <dt>Categories</dt>
                  <dd>{MODULES.length}</dd>
                </div>
                <div>
                  <dt>Files uploaded</dt>
                  <dd>0</dd>
                </div>
                <div>
                  <dt>Sign-ups required</dt>
                  <dd>0</dd>
                </div>
              </dl>
            </div>
          </section>
        )}

        <div className="sk-container sk-home__sections">
          {/* ── Favorites ───────────────────────── */}
          {(config.homepage?.visibleSections?.favorites ?? true) && favoriteTools.length > 0 && (
            <section id="favorites" className="sk-section" aria-labelledby="favorites-heading">
              <div className="sk-section__head">
                <div>
                  <h2 id="favorites-heading" className="sk-section__title">
                    <Star size={20} aria-hidden="true" className="text-warning" /> Your favorites
                  </h2>
                  <p className="sk-section__sub">Tools you've saved for quick access</p>
                </div>
              </div>
              <div className="sk-grid">
                {favoriteTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* ── Recently used ───────────────────── */}
          {(config.homepage?.visibleSections?.recentlyUsed ?? true) && recentTools.length > 0 && (
            <section className="sk-section" aria-labelledby="recent-heading">
              <div className="sk-section__head">
                <div>
                  <h2 id="recent-heading" className="sk-section__title">
                    <Clock size={20} aria-hidden="true" className="text-primary" /> Pick up where you left off
                  </h2>
                </div>
              </div>
              <div className="sk-grid sk-grid--compact">
                {recentTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} compact />
                ))}
              </div>
            </section>
          )}

          {/* ── Categories ──────────────────────── */}
          {(config.homepage?.visibleSections?.categories ?? true) && (
            <section className="sk-section" aria-labelledby="categories-heading">
              <div className="sk-section__head">
                <div>
                  <h2 id="categories-heading" className="sk-section__title">Browse by category</h2>
                  <p className="sk-section__sub">Find the right tool faster — every category is a click away</p>
                </div>
                <Link to="/search" className="sk-link-arrow">
                  View all tools <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="sk-cat-grid">
                {activeModules.map((mod) => {
                  const c = getModuleColors(mod.key);
                  const count = TOOLS_BY_MODULE[mod.key]?.length ?? 0;
                  return (
                    <Link
                      key={mod.key}
                      to={mod.slug}
                      className="sk-cat"
                      style={{ ['--cat-accent' as string]: c.accent, ['--cat-bg' as string]: c.bg }}
                    >
                      <span className="sk-cat__icon" aria-hidden="true">
                        <LucideIcon name={mod.icon} size={22} strokeWidth={2} />
                      </span>
                      <span className="sk-cat__name">{mod.name}</span>
                      <span className="sk-cat__desc">{mod.description}</span>
                      <span className="sk-cat__foot">
                        {count} tools <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
                <Link to="/search" className="sk-cat sk-cat--all">
                  <span className="sk-cat__name">Not sure where to look?</span>
                  <span className="sk-cat__desc">
                    Search all {LIVE_TOOL_COUNT} tools by name or keyword and jump straight to the one you need.
                  </span>
                  <span className="sk-cat__foot">
                    Search all tools <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </section>
          )}

          {/* ── Popular tools ───────────────────── */}
          {(config.homepage?.visibleSections?.popularTools ?? true) && (
            <section className="sk-section" aria-labelledby="popular-heading">
              <div className="sk-section__head">
                <div>
                  <h2 id="popular-heading" className="sk-section__title">Most-used tools</h2>
                  <p className="sk-section__sub">What people reach for every day</p>
                </div>
              </div>
              <div className="sk-grid">
                {trendingToolsList.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          <AdRenderer slotId="home-inline" />

          {/* ── Why Toolskyt ────────────────────── */}
          {(config.homepage?.visibleSections?.highlights ?? true) && (
            <section className="sk-section" aria-labelledby="features-heading">
              <div className="sk-section__head sk-section__head--center">
                <div>
                  <h2 id="features-heading" className="sk-section__title">Why people choose Toolskyt</h2>
                  <p className="sk-section__sub">Simple, fast and respectful of your data</p>
                </div>
              </div>
              <div className="sk-features">
                {FEATURES.map((feat) => (
                  <div key={feat.title} className="sk-feature">
                    <span className="sk-feature__icon" aria-hidden="true">
                      <feat.icon size={22} />
                    </span>
                    <h3>{feat.title}</h3>
                    <p>{feat.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── CTA ───────────────────────────────── */}
        <section className="sk-container sk-cta-wrap" aria-labelledby="cta-heading">
          <div className="sk-cta">
            <div>
              <h2 id="cta-heading">Can't find what you need?</h2>
              <p>Search across all {LIVE_TOOL_COUNT} tools — results appear as you type.</p>
            </div>
            <button type="button" onClick={openSearch} className="sk-btn sk-btn--light sk-btn--lg">
              <Search size={18} aria-hidden="true" /> Search tools
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
