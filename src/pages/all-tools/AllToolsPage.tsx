import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolCard } from '@/components/ui/ToolCard';
import { MODULES } from '@/config/modules';
import { TOOLS, isComingSoon, LIVE_TOOL_COUNT } from '@/config/tools';
import { SITE_URL, OG_IMAGE, breadcrumbSchema, ALL_TOOLS_TITLE, allToolsDescription } from '@/utils/seo';

export default function AllToolsPage() {
  const description = allToolsDescription(LIVE_TOOL_COUNT);
  const url = `${SITE_URL}/all-tools`;
  const groups = MODULES.map((m) => ({
    module: m,
    tools: TOOLS.filter((t) => t.module === m.key && !isComingSoon(t.id)),
  })).filter((g) => g.tools.length > 0);

  return (
    <>
      <Helmet>
        <title>{ALL_TOOLS_TITLE}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={ALL_TOOLS_TITLE} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: `${SITE_URL}/` },
              { name: 'All tools', url },
            ])
          )}
        </script>
      </Helmet>
      <div className="sk-container sk-page">
        <Breadcrumb items={[{ label: 'All tools' }]} />
        <header className="sk-page__head">
          <h1>All {LIVE_TOOL_COUNT} free online tools</h1>
          <p>
            Every Toolskyt tool in one place, grouped by category. All of them are free, need no
            sign-up and run entirely in your browser.
          </p>
        </header>
        {groups.map(({ module, tools }) => (
          <section key={module.key} className="sk-group" aria-labelledby={`grp-${module.key}`}>
            <div className="sk-group__head">
              <h2 id={`grp-${module.key}`} className="sk-group__title">
                <Link to={module.slug}>{module.name}</Link>
              </h2>
              <span className="sk-group__count">{tools.length}</span>
            </div>
            <div className="sk-grid">
              {tools.map((t) => (
                <ToolCard key={t.id} tool={t} hideModule />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
