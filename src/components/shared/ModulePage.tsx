import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, AlertCircle, ChevronRight } from 'lucide-react';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { MODULES, getModuleColors } from '@/config/modules';
import { MODULE_METADATA } from '@/config/moduleMetadata';
import { ToolCard } from '@/components/ui/ToolCard';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { Accordion } from '@/components/ui/Accordion';
import { LucideIcon } from '@/components/shared/LucideIcon';

interface ModulePageProps {
  moduleKey: string;
}

export function ModulePage({ moduleKey }: ModulePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const heroSearchRef = useRef<HTMLInputElement>(null);

  // Retrieve configurations and tools
  const tools = TOOLS_BY_MODULE[moduleKey] || [];
  const moduleConfig = MODULES.find((m) => m.key === moduleKey);
  const metadata = MODULE_METADATA[moduleKey];

  const colors = getModuleColors(moduleKey);

  // Scroll handler for sticky sub-header visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky sub-header when user scrolls past the main hero title (100px threshold)
      setIsStickyVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shortcut key listener for '/' search input focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        heroSearchRef.current?.focus();
        heroSearchRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!moduleConfig || !metadata) {
    return (
      <div className="py-20 text-center">
        <AlertCircle className="mx-auto text-danger mb-4" size={48} />
        <h2 className="text-xl font-bold">Module Configuration Missing</h2>
        <p className="text-sm text-text-secondary mt-2">Could not load details for module key: "{moduleKey}"</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Title & Placeholder Sanitizers (Prevents duplicate "Tools Tools" suffix)
  // ─────────────────────────────────────────────
  const isToolsConfig = moduleConfig.name.toLowerCase().endsWith('tools');
  const moduleDisplayName = isToolsConfig ? moduleConfig.name : `${moduleConfig.name} Tools`;
  const searchPlaceholderName = isToolsConfig ? moduleConfig.name.toLowerCase() : `${moduleConfig.name.toLowerCase()} tools`;
  const whyUseName = isToolsConfig ? moduleConfig.name : `${moduleConfig.name} Tools`;
  const ctaTasksLabel = isToolsConfig ? moduleConfig.name.toLowerCase() : `${moduleConfig.name.toLowerCase()} tasks`;

  // Filter tools based on query
  const queryClean = searchQuery.toLowerCase().trim();
  const filteredTools = tools.filter((t) => {
    if (!queryClean) return true;
    return (
      t.name.toLowerCase().includes(queryClean) ||
      t.description.toLowerCase().includes(queryClean) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(queryClean))
    );
  });

  // Extract featured tools
  const featuredToolsList = tools.filter((t) => metadata.featuredTools.includes(t.id));
  // If no specific featured tools matched but we have tools, fallback to the first 3
  const featuredTools = featuredToolsList.length > 0 ? featuredToolsList : tools.slice(0, 3);

  // Group by category if defined
  const categorizedIds = new Set(metadata.categories?.flatMap((c) => c.toolIds) || []);
  const uncategorizedTools = tools.filter((t) => !categorizedIds.has(t.id));

  // Focus utility for search boxes
  const focusSearch = () => {
    if (heroSearchRef.current) {
      heroSearchRef.current.focus();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // offset for sticky main header + sticky sub-header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ModulePageWrapper
      moduleKey={moduleKey}
      moduleName={moduleConfig.name}
      description={moduleConfig.description}
    >
      {/* ── STICKY SUB-HEADER ── */}
      {isStickyVisible && (
        <div
          className="sticky top-[64px] z-40 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 border-b shadow-sm bg-[var(--bg-elevated)] border-[var(--border-default)] transition-all duration-200"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <div className="max-w-[1216px] mx-auto h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  background: colors.bg,
                  color: colors.accent,
                  borderColor: colors.border,
                }}
              >
                <LucideIcon name={moduleConfig.icon} size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm truncate text-[var(--text-primary)]">
                {moduleConfig.name} <span className="font-medium text-xs text-[var(--text-secondary)]">({tools.length} Tools)</span>
              </span>
            </div>

            <div className="flex items-center gap-6 shrink-0 text-xs font-semibold">
              <nav className="hidden md:flex items-center gap-4 text-[var(--text-secondary)]">
                {featuredTools.length > 0 && !searchQuery && (
                  <a
                    href="#featured"
                    onClick={(e) => handleSmoothScroll(e, 'featured')}
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Featured
                  </a>
                )}
                <a
                  href="#all-tools"
                  onClick={(e) => handleSmoothScroll(e, 'all-tools')}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  All Tools
                </a>
                <a
                  href="#why-use"
                  onClick={(e) => handleSmoothScroll(e, 'why-use')}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Why Us
                </a>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothScroll(e, 'faq')}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  FAQ
                </a>
              </nav>

              <button
                onClick={focusSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-all cursor-pointer text-[var(--text-secondary)] bg-[var(--bg-base)]"
              >
                <Search size={12} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section className="pt-8 pb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
        {/* Module Icon Container with Glow */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border relative shadow-sm"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: colors.accent,
            boxShadow: `0 4px 20px ${colors.bg}`,
          }}
        >
          <LucideIcon name={moduleConfig.icon} size={28} strokeWidth={2} style={{ color: colors.accent }} />
        </div>

        {/* Title & Description */}
        <h1 className="text-h2 font-extrabold tracking-tight text-[var(--text-primary)]">
          {moduleDisplayName}
        </h1>
        <p className="text-body-large mt-3 max-w-2xl leading-relaxed">
          {moduleConfig.description}
        </p>

        {/* Search input container */}
        <div className="w-full max-w-xl mt-8 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors">
            <Search size={20} />
          </div>
          <input
            ref={heroSearchRef}
            type="text"
            placeholder={`Search ${tools.length} ${searchPlaceholderName}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-16 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all font-medium"
            style={{ borderRadius: '16px', height: '60px', fontSize: '1.125rem' }}
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-2">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X size={18} />
              </button>
            ) : (
              <kbd className="workspace-header__search-kbd">/</kbd>
            )}
          </div>
        </div>

        {/* Popular Searches */}
        {metadata.popularSearches.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-tertiary)]">Popular:</span>
            {metadata.popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-strong)] transition-all cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── FEATURED TOOLS SECTION ── */}
      {featuredTools.length > 0 && !searchQuery && (
        <section id="featured" className="py-12 md:py-16 bg-[var(--bg-surface-container-low)] border-y border-[var(--border-default)] rounded-2xl mb-12 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 rounded-full" style={{ background: 'var(--primary)' }} />
            <h2 className="text-h3 font-display font-bold tracking-tight text-[var(--text-primary)]">
              Featured {moduleDisplayName}
            </h2>
          </div>
          <div className="tools-grid">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* ── ALL TOOLS GRID SECTION ── */}
      <section id="all-tools" className="py-12 md:py-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full" style={{ background: 'var(--primary)' }} />
            <h2 className="text-h3 font-display font-bold tracking-tight text-[var(--text-primary)]">
              {searchQuery ? 'Search Results' : `All ${moduleDisplayName}`}
            </h2>
          </div>
          <span className="text-sm font-semibold text-[var(--text-secondary)] shrink-0">
            {filteredTools.length} {filteredTools.length === 1 ? 'Tool' : 'Tools'}
          </span>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center border border-[var(--border-default)] rounded-2xl bg-[var(--bg-surface)] max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center mx-auto mb-4">
              <Search size={20} />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">No tools matched your search</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5 px-6 leading-relaxed">
              We couldn't find any tools matching "{searchQuery}". Try adjusting your keywords or clearing the search.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all cursor-pointer"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          /* Grid list rendering */
          <>
            {/* Split by categories if registered and search is empty */}
            {!searchQuery && metadata.categories && metadata.categories.length > 0 ? (
              <div className="space-y-16">
                {metadata.categories.map((cat, idx) => {
                  const catTools = filteredTools.filter((t) => cat.toolIds.includes(t.id));
                  if (catTools.length === 0) return null;

                  return (
                    <div key={idx} className="mb-16 last:mb-0">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-5 rounded-full" style={{ background: 'var(--primary)' }} />
                        <h3 className="text-h4 font-display font-bold text-[var(--text-primary)]">
                          {cat.title}
                        </h3>
                      </div>
                      <div className="tools-grid">
                        {catTools.map((tool) => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Render any uncategorized tools in a separate section */}
                {uncategorizedTools.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-5 rounded-full" style={{ background: 'var(--primary)' }} />
                      <h3 className="text-h4 font-display font-bold text-[var(--text-primary)]">
                        More {moduleConfig.name} Utilities
                      </h3>
                    </div>
                    <div className="tools-grid">
                      {uncategorizedTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Flat grid rendering */
              <div className="tools-grid">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── WHY USE THESE TOOLS ── */}
      <section id="why-use" className="py-12 md:py-16 bg-[var(--bg-surface-container-low)] border-y border-[var(--border-default)] rounded-2xl mb-12 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Why Use Toolskyt {whyUseName}?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
            All utilities in our library are fine-tuned for high-performance developer workflows, privacy-first actions, and modern standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metadata.whyUse.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-container-lowest)] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                style={{
                  background: colors.bg,
                  color: colors.accent,
                  borderColor: colors.border,
                }}
              >
                <LucideIcon name={benefit.icon} size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">{benefit.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ & RELATED CATEGORIES SECTION ── */}
      {((metadata.faqs && metadata.faqs.length > 0) || metadata.relatedModules.length > 0) && (
        <section className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Column (Left - 7 cols) */}
          {metadata.faqs && metadata.faqs.length > 0 && (
            <div id="faq" className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm"
                  style={{ background: 'var(--primary)' }}
                >
                  ?
                </div>
                <h2 className="text-h3 font-display font-bold tracking-tight text-[var(--text-primary)]">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion
                items={metadata.faqs.map((faq) => ({
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          )}

          {/* Related Categories Column (Right - 5 cols) */}
          {metadata.relatedModules.length > 0 && (
            <div className="lg:col-span-5">
              <h2 className="text-h3 font-bold tracking-tight text-[var(--text-primary)] mb-6">
                Explore Related Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {metadata.relatedModules.map((key) => {
                  const relConf = MODULES.find((m) => m.key === key);
                  if (!relConf) return null;

                  const relColors = getModuleColors(key);

                  return (
                    <Link
                      key={key}
                      to={relConf.slug}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] hover:shadow-sm hover:border-[var(--primary)] transition-all bg-[var(--bg-elevated)]"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0"
                        style={{
                          background: relColors.bg,
                          color: relColors.accent,
                        }}
                      >
                        <LucideIcon name={relConf.icon} size={12} strokeWidth={2.5} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{relConf.name}</span>
                      <ChevronRight size={12} className="text-[var(--text-tertiary)]" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── CTA SECTION ── */}
      <section className="py-12 md:py-16">
        <div className="cta-banner">
          {/* Accent light glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none opacity-20"
            style={{ background: colors.accent }}
          />

          <div className="max-w-xl text-center lg:text-left">
            <h2 className="cta-banner__title text-h3 font-extrabold tracking-tight mb-2">
              Ready to experience lightning-fast productivity?
            </h2>
            <p className="cta-banner__desc">
              Toolskyt provides {tools.length} private utilities for {ctaTasksLabel} right in your browser tab. No registrations, no fee requirements, and no data tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
            <Link
              to="/"
              className="cta-banner__btn"
              style={{ background: 'var(--primary)', color: '#ffffff' }}
            >
              <span>Explore All Categories</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="#all-tools"
              onClick={(e) => handleSmoothScroll(e, 'all-tools')}
              className="cta-banner__btn"
              style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }}
            >
              Browse All Tools
            </a>
          </div>
        </div>
      </section>
    </ModulePageWrapper>
  );
}

export default ModulePage;
