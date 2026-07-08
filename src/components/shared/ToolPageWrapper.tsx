import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from './RelatedTools';
import { TOOL_BY_ID } from '@/config/tools';
import { useHistoryStore, useFavoritesStore } from '@/stores/userStore';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ShareIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/stores/uiStore';

interface ToolPageWrapperProps {
  toolId: string;
  children: ReactNode;
}

export function ToolPageWrapper({ toolId, children }: ToolPageWrapperProps) {
  const tool = TOOL_BY_ID[toolId];
  const { recordVisit } = useHistoryStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    if (tool) {
      recordVisit(tool.id);
    }
  }, [tool, recordVisit]);
  if (!tool) {
    return (
      <div className="container-app py-16 text-center">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Tool Not Found</h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>The requested tool could not be loaded.</p>
      </div>
    );
  }

  const favorited = isFavorite(tool.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.metaTitle,
          text: tool.description,
          url,
        });
      } catch (err) {
        // Ignored or handled gracefully
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        addToast({
          type: 'success',
          title: 'Link Copied',
          message: 'Tool link copied to clipboard!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Copy Failed',
          message: 'Could not copy link to clipboard.',
        });
      }
    }
  };

  const breadcrumbItems = [
    { label: tool.module.charAt(0).toUpperCase() + tool.module.slice(1), href: `/${tool.module}` },
    { label: tool.name },
  ];

  // Dynamic sitelinks/structured JSON-LD data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://toolpilot.app${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  return (
    <>
      <Helmet>
        <title>{tool.metaTitle}</title>
        <meta name="description" content={tool.metaDescription} />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <link rel="canonical" href={`https://toolpilot.app${tool.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={tool.metaTitle} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolpilot.app${tool.slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={tool.metaTitle} />
        <meta name="twitter:description" content={tool.metaDescription} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {tool.name}
            </h1>
            <p className="text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
              {tool.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(tool.id)}
              className="btn btn-secondary flex items-center gap-1.5"
              style={{
                borderColor: favorited ? '#EF4444' : 'var(--border-strong)',
                color: favorited ? '#EF4444' : 'var(--text-secondary)',
              }}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorited ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span>{favorited ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleShare}
              className="btn btn-secondary flex items-center gap-1.5"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}
              aria-label="Share tool"
            >
              <ShareIcon className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Tool Application sandbox */}
        <div className="min-h-[400px]">
          {children}
        </div>

        {/* Related Tools */}
        {tool.relatedTools && tool.relatedTools.length > 0 && (
          <RelatedTools toolIds={tool.relatedTools} />
        )}
      </div>
    </>
  );
}
export default ToolPageWrapper;
