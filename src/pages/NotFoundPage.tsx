import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Home, HelpCircle } from 'lucide-react';
import { POPULAR_TOOLS, TOOL_COUNT_LABEL } from '@/config/tools';

export default function NotFoundPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | ToolPilot</title>
        <meta
          name="description"
          content="The page you are looking for does not exist. Use search to find standard calculators, JSON formatters, image resizers, and other tools."
        />
      </Helmet>

      <div className="container-app py-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        {/* Animated Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 text-4xl"
          style={{
            background: 'rgba(79, 70, 229, 0.08)',
            color: 'var(--text-link)',
          }}
          aria-hidden="true"
        >
          🔍
        </div>

        {/* Header */}
        <h1
          className="text-4xl font-extrabold tracking-tight mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          404 — Page Not Found
        </h1>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          The link might be broken, or the tool is currently undergoing construction. Let's help you
          find what you need.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md mb-10">
          <div
            className="flex items-center gap-3 px-4 py-3 border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-default)',
            }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${TOOL_COUNT_LABEL} tools...`}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Search tools"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </div>
        </form>

        {/* Popular Suggestions */}
        <div
          className="w-full text-left border rounded-xl p-6 mb-8"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
        >
          <h2
            className="text-sm font-semibold mb-4 flex items-center gap-1.5"
            style={{ color: 'var(--text-primary)' }}
          >
            <HelpCircle className="w-4 h-4 text-blue-500" />
            Try one of these popular tools:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {POPULAR_TOOLS.slice(0, 6).map((tool) => (
              <Link
                key={tool.id}
                to={tool.slug}
                className="px-3 py-2 text-xs font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Link to="/" className="btn btn-secondary flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </>
  );
}
