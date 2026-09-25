import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Search, X } from 'lucide-react';
import { TOOLS, TOOL_COUNT_LABEL } from '@/config/tools';
import { MODULES } from '@/config/modules';
import { ToolCard } from '@/components/ui/ToolCard';
import type { ToolConfig } from '@/types';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { clsx } from 'clsx';

// Client-side fuzzy search function
function performSearch(query: string, selectedModule: string): ToolConfig[] {
  const q = query.toLowerCase().trim();
  if (!q && !selectedModule) return TOOLS;

  return TOOLS.filter((tool) => {
    // Module filter matching
    if (selectedModule && tool.module !== selectedModule) return false;
    if (!q) return true;

    // Term matching
    const inName = tool.name.toLowerCase().includes(q);
    const inDesc = tool.description.toLowerCase().includes(q);
    const inTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));
    const inKeywords = tool.keywords.some((kw) => kw.toLowerCase().includes(q));

    return inName || inDesc || inTags || inKeywords;
  });
}

const TRENDING_KEYWORDS = ['EMI', 'JSON', 'Base64', 'QR', 'Tip', 'Password', 'BMI', 'Word Counter'];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const moduleParam = searchParams.get('module') ?? '';

  const filteredTools = useMemo(() => {
    return performSearch(queryParam, moduleParam);
  }, [queryParam, moduleParam]);

  const handleQueryChange = (val: string) => {
    updateSearchParams(val, moduleParam);
  };

  const handleModuleSelect = (modKey: string) => {
    const nextMod = moduleParam === modKey ? '' : modKey; // Toggle filter
    updateSearchParams(queryParam, nextMod);
  };

  const updateSearchParams = (q: string, mod: string) => {
    const params: Record<string, string> = {};
    if (q.trim()) params.q = q.trim();
    if (mod) params.module = mod;
    setSearchParams(params);
  };

  const pageTitle = queryParam
    ? `Search Results for "${queryParam}" | Toolskyt`
    : `Search ${TOOL_COUNT_LABEL} Free Online Tools | Toolskyt`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Search and filter hundreds of free online productivity tools on Toolskyt. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://toolskyt.com/search" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Search and filter hundreds of free online productivity tools on Toolskyt. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/search" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content="Search and filter hundreds of free online productivity tools on Toolskyt. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>

      <div className="sk-container sk-modpage">
        <Breadcrumb items={[{ label: 'Search' }]} />

        <header className="sk-page__head sk-page__head--tight">
          <h1>{queryParam ? `Results for “${queryParam}”` : 'Search all tools'}</h1>
          <p>
            {queryParam || moduleParam
              ? `${filteredTools.length} ${filteredTools.length === 1 ? 'tool' : 'tools'} found`
              : `Browse all ${TOOLS.length} free tools, or narrow them down with a keyword or category.`}
          </p>
        </header>

        <div className="sk-modhero__search sk-search-page__input">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={queryParam}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={`Search ${TOOLS.length} tools by name or keyword…`}
            aria-label="Search tools"
            autoFocus
          />
          {queryParam && (
            <button type="button" onClick={() => handleQueryChange('')} aria-label="Clear search">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="sk-modhero__quick sk-search-page__trending">
          <span>
            <Sparkles size={14} aria-hidden="true" /> Trending:
          </span>
          {TRENDING_KEYWORDS.map((kw) => (
            <button key={kw} type="button" className="sk-pill" onClick={() => handleQueryChange(kw)}>
              {kw}
            </button>
          ))}
        </div>

        <div className="sk-search-page__layout">
          <aside className="sk-filter" aria-label="Filter by category">
            <h2 className="sk-filter__title">Categories</h2>
            <div className="sk-filter__list">
              <button
                type="button"
                className={clsx('sk-filter__item', !moduleParam && 'is-active')}
                onClick={() => updateSearchParams(queryParam, '')}
              >
                <span>All tools</span>
                <em>{TOOLS.length}</em>
              </button>
              {MODULES.map((mod) => (
                <button
                  key={mod.key}
                  type="button"
                  className={clsx('sk-filter__item', moduleParam === mod.key && 'is-active')}
                  aria-pressed={moduleParam === mod.key}
                  onClick={() => handleModuleSelect(mod.key)}
                >
                  <span>{mod.name}</span>
                  <em>{TOOLS.filter((t) => t.module === mod.key).length}</em>
                </button>
              ))}
            </div>
          </aside>

          <div>
            {filteredTools.length === 0 ? (
              <div className="sk-empty sk-empty--card">
                <Search size={28} aria-hidden="true" />
                <h3>No tools found</h3>
                <p>Try a different keyword or clear the filters.</p>
                {(queryParam || moduleParam) && (
                  <button type="button" onClick={() => setSearchParams({})} className="sk-btn sk-btn--ghost">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="sk-grid sk-grid--results">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
