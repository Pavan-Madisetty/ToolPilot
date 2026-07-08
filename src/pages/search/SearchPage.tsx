import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TOOLS } from '@/config/tools';
import { MODULES } from '@/config/modules';
import { ToolCard } from '@/components/ui/ToolCard';
import type { ToolConfig } from '@/types';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

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

  const [prevQuery, setPrevQuery] = useState(queryParam);
  const [inputVal, setInputVal] = useState(queryParam);

  if (queryParam !== prevQuery) {
    setPrevQuery(queryParam);
    setInputVal(queryParam);
  }

  const filteredTools = useMemo(() => {
    return performSearch(queryParam, moduleParam);
  }, [queryParam, moduleParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(inputVal, moduleParam);
  };

  const handleQueryChange = (val: string) => {
    setInputVal(val);
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
    : 'Search 500+ Free Online Tools | ToolPilot';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Search and filter hundreds of free online productivity tools on ToolPilot. Find EMI calculators, JSON tools, image encoders, and more.`}
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Search' }]} />

        {/* Heading */}
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {queryParam ? 'Search Results' : 'Search Tools'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {queryParam
              ? `Found ${filteredTools.length} tools matching your query`
              : 'Explore the largest collection of free browser-based productivity tools.'}
          </p>
        </div>

        {/* Search input and keyword suggestion panel */}
        <div className="mb-8 max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div
              className="flex-1 flex items-center gap-3 px-4 py-3 border rounded-xl shadow-sm"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-default)',
              }}
            >
              <MagnifyingGlassIcon className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search tools by name, description, tags..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Search tools"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => handleQueryChange('')}
                  className="btn btn-icon btn-ghost btn-sm"
                  aria-label="Clear query"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Trending suggestions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
              <SparklesIcon className="w-3.5 h-3.5 text-yellow-500" />
              Trending:
            </span>
            {TRENDING_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => handleQueryChange(kw)}
                className="px-2.5 py-1 text-xs rounded-lg border hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 transition-colors"
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
        </div>

        {/* Main Search Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="p-5 border rounded-xl shadow-xs sticky top-24"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-default)',
              }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Filter by Category
              </h3>
              <div className="space-y-1.5">
                {MODULES.map((mod) => {
                  const isActive = moduleParam === mod.key;
                  return (
                    <button
                      key={mod.key}
                      onClick={() => handleModuleSelect(mod.key)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      style={{
                        background: isActive ? 'var(--bg-surface)' : 'transparent',
                        color: isActive ? 'var(--text-link)' : 'var(--text-secondary)',
                        border: isActive ? '1px solid var(--border-focus)' : '1px solid transparent',
                      }}
                    >
                      <span>{mod.name}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-700"
                        style={{ color: 'var(--text-tertiary)' }}
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
              <div
                className="py-16 text-center border rounded-xl"
                style={{
                  background: 'var(--bg-elevated)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  No tools found
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  No matching tools found for your query. Try clearing filters or try other keywords.
                </p>
              </div>
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
