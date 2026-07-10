import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Search } from 'lucide-react';
import { TOOLS, TOOL_COUNT_LABEL } from '@/config/tools';
import { MODULES } from '@/config/modules';
import { ToolCard } from '@/components/ui/ToolCard';
import { EmptyState } from '@/components/ui/EmptyState';
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
    ? `Search Results for "${queryParam}" | ToolPilot`
    : `Search ${TOOL_COUNT_LABEL} Free Online Tools | ToolPilot`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Search and filter hundreds of free online productivity tools on ToolPilot. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://toolpilot.app/search" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Search and filter hundreds of free online productivity tools on ToolPilot. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/search" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content="Search and filter hundreds of free online productivity tools on ToolPilot. Find EMI calculators, JSON tools, image encoders, and more."
        />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Search' }]} />

        {/* Heading */}
        <div className="mb-6 mt-4">
          <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {queryParam ? 'Search Results' : 'Search Tools'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {queryParam
              ? `Found ${filteredTools.length} tools matching your query`
              : 'Explore the largest collection of free browser-based productivity tools.'}
          </p>
        </div>

        {/* Search input field */}
        <div className="mb-6 w-full max-w-xl">
          <div
            className="flex items-center gap-3 px-4 py-3 border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)]"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-default)',
            }}
          >
            <Search className="w-5 h-5 shrink-0 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={queryParam}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={`Search ${TOOL_COUNT_LABEL} tools...`}
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Search tools input"
            />
          </div>
        </div>

        {/* Trending suggestions */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span
            className="text-xs font-semibold flex items-center gap-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <Sparkles size={14} className="text-yellow-500" />
            Trending:
          </span>
          {TRENDING_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => handleQueryChange(kw)}
              className="px-2.5 py-1 text-xs rounded-lg border hover:border-[var(--border-focus)] hover:text-[var(--text-link)] transition-colors cursor-pointer"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Main Search Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card lg:sticky lg:top-24 hover:translate-y-0 hover:shadow-md p-5 md:p-6">
              <div
                className="text-xs font-bold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}
              >
                Filter by Category
              </div>
              <div className="space-y-1">
                {MODULES.map((mod) => {
                  const isActive = moduleParam === mod.key;
                  return (
                    <button
                      key={mod.key}
                      onClick={() => handleModuleSelect(mod.key)}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl text-left transition-all duration-150 cursor-pointer',
                        isActive
                          ? 'bg-[rgba(99,102,241,0.08)] text-[var(--primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      <span>{mod.name}</span>
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded-full text-[10px] font-bold',
                          isActive
                            ? 'bg-[rgba(99,102,241,0.15)] text-[var(--primary)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-tertiary)]'
                        )}
                      >
                        {mod.toolCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tool Grid Results */}
          <div className="lg:col-span-3">
            {filteredTools.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No tools found"
                description="No matching tools found for your query. Try clearing filters or try other keywords."
                action={
                  (queryParam || moduleParam) && (
                    <button
                      onClick={() => setSearchParams({})}
                      className="btn btn-secondary btn-sm cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )
                }
              />
            ) : (
              <div className="tools-grid">
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
