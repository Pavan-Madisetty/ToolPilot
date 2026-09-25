import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Home, SearchX } from 'lucide-react';
import { TOOL_BY_ID, LIVE_TOOL_COUNT } from '@/config/tools';
import type { ToolConfig } from '@/types';

const SUGGESTED = ['emi-calculator', 'json-formatter', 'pdf-merge', 'image-compress', 'word-counter', 'qr-generator']
  .map((id) => TOOL_BY_ID[id])
  .filter((t): t is ToolConfig => Boolean(t));
import { ToolCard } from '@/components/ui/ToolCard';

export default function NotFoundPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <Helmet>
        <title>Page not found | Toolskyt</title>
        <meta name="description" content="The page you are looking for does not exist. Search for a tool or browse our popular ones." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="sk-container sk-404">
        <span className="sk-404__icon" aria-hidden="true">
          <SearchX size={34} />
        </span>
        <p className="sk-404__code">Error 404</p>
        <h1>We couldn't find that page</h1>
        <p className="sk-404__text">The link may be broken or the page may have moved. Try searching for the tool you need.</p>

        <form onSubmit={onSubmit} className="sk-modhero__search sk-404__search" role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${LIVE_TOOL_COUNT} tools…`}
            aria-label="Search tools"
          />
          <button type="submit" className="sk-btn sk-btn--primary sk-btn--sm">
            Search
          </button>
        </form>

        <div className="sk-404__popular">
          <h2>Popular tools</h2>
          <div className="sk-grid sk-grid--compact">
            {SUGGESTED.map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact />
            ))}
          </div>
        </div>

        <Link to="/" className="sk-btn sk-btn--ghost">
          <Home size={16} aria-hidden="true" /> Back to home
        </Link>
      </div>
    </>
  );
}
