import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, AlertCircle, ArrowRight } from 'lucide-react';
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

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function ModulePage({ moduleKey }: ModulePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const tools = useMemo(() => TOOLS_BY_MODULE[moduleKey] || [], [moduleKey]);
  const moduleConfig = MODULES.find((m) => m.key === moduleKey);
  const metadata = MODULE_METADATA[moduleKey];
  const colors = getModuleColors(moduleKey);

  // "/" focuses the search field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!moduleConfig || !metadata) {
    return (
      <div className="sk-container sk-empty">
        <AlertCircle size={40} aria-hidden="true" />
        <h2>Category not found</h2>
        <p>We couldn't load “{moduleKey}”.</p>
        <Link to="/" className="sk-btn sk-btn--primary">Back to home</Link>
      </div>
    );
  }

  const endsWithTools = moduleConfig.name.toLowerCase().endsWith('tools');
  const displayName = endsWithTools ? moduleConfig.name : `${moduleConfig.name} Tools`;
  const searchNoun = endsWithTools ? moduleConfig.name.toLowerCase() : `${moduleConfig.name.toLowerCase()} tools`;

  const q = searchQuery.toLowerCase().trim();
  const filtered = tools.filter(
    (t) =>
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(q))
  );

  const featuredList = tools.filter((t) => metadata.featuredTools.includes(t.id));
  const featured = featuredList.length > 0 ? featuredList : tools.slice(0, 3);

  const groups = (() => {
    const cats = (metadata.categories ?? [])
      .map((c) => ({ title: c.title, tools: filtered.filter((t) => c.toolIds.includes(t.id)) }))
      .filter((g) => g.tools.length > 0);
    const seen = new Set((metadata.categories ?? []).flatMap((c) => c.toolIds));
    const rest = filtered.filter((t) => !seen.has(t.id));
    if (rest.length > 0) cats.push({ title: cats.length ? `More ${moduleConfig.name}` : `All ${displayName}`, tools: rest });
    return cats;
  })();

  const showGroups = !q && groups.length > 0;

  return (
    <ModulePageWrapper moduleKey={moduleKey} moduleName={moduleConfig.name} description={moduleConfig.description}>
      {/* ── Hero ── */}
      <section className="sk-modhero" style={{ ['--mod-accent' as string]: colors.accent, ['--mod-bg' as string]: colors.bg }}>
        <div className="sk-modhero__head">
          <span className="sk-modhero__icon" aria-hidden="true">
            <LucideIcon name={moduleConfig.icon} size={30} strokeWidth={2} />
          </span>
          <div>
            <h1 className="sk-modhero__title">{displayName}</h1>
            <p className="sk-modhero__desc">{moduleConfig.description}</p>
          </div>
          <span className="sk-chip sk-modhero__count">{tools.length} free tools</span>
        </div>

        <div className="sk-modhero__search">
          <Search size={18} aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${tools.length} ${searchNoun}…`}
            aria-label={`Search ${searchNoun}`}
          />
          {searchQuery ? (
            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={16} aria-hidden="true" />
            </button>
          ) : (
            <kbd>/</kbd>
          )}
        </div>

        {metadata.popularSearches.length > 0 && !searchQuery && (
          <div className="sk-modhero__quick">
            <span>Popular:</span>
            {metadata.popularSearches.map((term) => (
              <button key={term} type="button" className="sk-pill" onClick={() => setSearchQuery(term)}>
                {term}
              </button>
            ))}
          </div>
        )}

        {showGroups && groups.length > 1 && (
          <nav className="sk-jump" aria-label="Jump to section">
            {groups.map((g) => (
              <a key={g.title} href={`#${slugify(g.title)}`} className="sk-jump__link">
                {g.title}
                <em>{g.tools.length}</em>
              </a>
            ))}
          </nav>
        )}
      </section>

      {/* ── Featured ── */}
      {!q && !showGroups && featured.length > 0 && (
        <section id="featured" className="sk-section sk-section--tight">
          <div className="sk-section__head">
            <h2 className="sk-section__title">Featured</h2>
          </div>
          <div className="sk-grid">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} hideModule />
            ))}
          </div>
        </section>
      )}

      {/* ── All tools ── */}
      <section id="all-tools" className="sk-section sk-section--tight">
        {q && (
          <div className="sk-section__head">
            <h2 className="sk-section__title">
              {filtered.length} result{filtered.length === 1 ? '' : 's'} for “{searchQuery}”
            </h2>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="sk-empty sk-empty--card">
            <Search size={28} aria-hidden="true" />
            <h3>No tools match “{searchQuery}”</h3>
            <p>Try a different keyword, or search every category at once.</p>
            <div className="sk-empty__actions">
              <button type="button" className="sk-btn sk-btn--ghost" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
              <Link to={`/search?q=${encodeURIComponent(searchQuery)}`} className="sk-btn sk-btn--primary">
                Search all tools
              </Link>
            </div>
          </div>
        ) : showGroups ? (
          groups.map((g) => (
            <div key={g.title} id={slugify(g.title)} className="sk-group">
              <div className="sk-group__head">
                <h2 className="sk-group__title">{g.title}</h2>
                <span className="sk-group__count">{g.tools.length}</span>
              </div>
              <div className="sk-grid">
                {g.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} hideModule />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="sk-grid">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} hideModule />
            ))}
          </div>
        )}
      </section>

      {/* ── Why use ── */}
      {metadata.whyUse.length > 0 && (
        <section id="why-use" className="sk-section">
          <div className="sk-section__head">
            <div>
              <h2 className="sk-section__title">Why use Toolskyt {displayName}?</h2>
              <p className="sk-section__sub">Fast, private and free — with nothing to install or sign up for.</p>
            </div>
          </div>
          <div className="sk-features sk-features--3">
            {metadata.whyUse.map((b, i) => (
              <div key={i} className="sk-feature" style={{ ['--feature-accent' as string]: colors.accent, ['--feature-bg' as string]: colors.bg }}>
                <span className="sk-feature__icon" aria-hidden="true">
                  <LucideIcon name={b.icon} size={22} strokeWidth={2} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ + related ── */}
      {((metadata.faqs && metadata.faqs.length > 0) || metadata.relatedModules.length > 0) && (
        <section className="sk-split">
          {metadata.faqs && metadata.faqs.length > 0 && (
            <div id="faq" className="sk-split__main">
              <h2 className="sk-section__title">Frequently asked questions</h2>
              <Accordion items={metadata.faqs.map((f) => ({ title: f.question, content: f.answer }))} />
            </div>
          )}
          {metadata.relatedModules.length > 0 && (
            <aside className="sk-split__side">
              <h2 className="sk-section__title">Explore more</h2>
              <div className="sk-related">
                {metadata.relatedModules.map((key) => {
                  const rel = MODULES.find((m) => m.key === key);
                  if (!rel) return null;
                  const rc = getModuleColors(key);
                  return (
                    <Link key={key} to={rel.slug} className="sk-related__item">
                      <span className="sk-mega__icon" style={{ background: rc.bg, color: rc.accent }} aria-hidden="true">
                        <LucideIcon name={rel.icon} size={18} strokeWidth={2.2} />
                      </span>
                      <span>{rel.name}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </aside>
          )}
        </section>
      )}
    </ModulePageWrapper>
  );
}

export default ModulePage;
