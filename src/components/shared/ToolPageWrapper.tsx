import { ReactNode, useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from './RelatedTools';
import { TOOL_BY_ID } from '@/config/tools';
import { useHistoryStore, useFavoritesStore } from '@/stores/userStore';
import { HeartIcon, ShareIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useUIStore } from '@/stores/uiStore';
import { SEO_CONTENTS } from '@/config/seoContents';
import { getFallbackSEOContent } from '@/utils/seoGenerator';

interface ToolPageWrapperProps {
  toolId: string;
  children: ReactNode;
}

export function ToolPageWrapper({ toolId, children }: ToolPageWrapperProps) {
  // Merge core config with fallback generated copy and rich override details
  const tool = useMemo(() => {
    const baseTool = TOOL_BY_ID[toolId];
    if (!baseTool) return null;
    const seoDetails = SEO_CONTENTS[baseTool.id] || {};
    const fallbackDetails = getFallbackSEOContent(baseTool);
    return { ...baseTool, ...fallbackDetails, ...seoDetails };
  }, [toolId]);

  const { recordVisit } = useHistoryStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { addToast } = useUIStore();

  // FAQ Accordion local expanded state tracking
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

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
      } catch {
        // Ignored or handled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        addToast({
          type: 'success',
          title: 'Link Copied',
          message: 'Tool link copied to clipboard!',
        });
      } catch {
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

  // ─────────────────────────────────────────────
  // Structured Data Schema Generators
  // ─────────────────────────────────────────────
  
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://toolpilot.app${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolpilot.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.module.charAt(0).toUpperCase() + tool.module.slice(1),
        item: `https://toolpilot.app/${tool.module}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://toolpilot.app${tool.slug}`,
      },
    ],
  };

  const faqSchema = tool.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  const howToSchema = tool.howToSteps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use ${tool.name}`,
        description: tool.description,
        step: tool.howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{tool.metaTitle}</title>
        <meta name="description" content={tool.metaDescription} />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <link rel="canonical" href={`https://toolpilot.app${tool.slug}`} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={tool.metaTitle} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolpilot.app${tool.slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={tool.metaTitle} />
        <meta name="twitter:description" content={tool.metaDescription} />

        {/* Structured Data Scripts */}
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
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

        {/* Rich SEO Content Explanatory Copy Section */}
        {(tool.longDescription || tool.benefits || tool.howToSteps || tool.faq) && (
          <article className="mt-16 pt-12 border-t flex flex-col gap-12" style={{ borderColor: 'var(--border-default)' }}>
            
            {/* Long intro summary */}
            {tool.longDescription && (
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  About {tool.name}
                </h2>
                <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
                  {tool.longDescription}
                </p>
              </section>
            )}

            {/* Benefits & Features Grid */}
            {(tool.benefits || tool.features) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tool.benefits && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Key Benefits
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {tool.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.features && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-indigo-500 font-bold shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* How to use / Step by Step instructions */}
            {tool.howToSteps && (
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  How to Use {tool.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tool.howToSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl p-4 flex flex-col gap-2 bg-slate-50/50 dark:bg-slate-900/10"
                      style={{ borderColor: 'var(--border-default)' }}
                    >
                      <span className="text-xs font-bold text-indigo-500 uppercase font-mono">
                        Step {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        {step.name}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tips & Examples Callouts */}
            {(tool.tips || tool.examples) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.tips && (
                  <div
                    className="border rounded-xl p-6 bg-amber-50/10 dark:bg-amber-950/5 flex flex-col gap-4 border-l-4"
                    style={{ borderColor: 'var(--border-default)', borderLeftColor: 'var(--warning)' }}
                  >
                    <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
                      <span>💡</span>
                      <span>Pro Tips</span>
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {tool.tips.map((tip, idx) => (
                        <li key={idx} className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tool.examples && (
                  <div
                    className="border rounded-xl p-6 bg-blue-50/10 dark:bg-blue-950/5 flex flex-col gap-4 border-l-4"
                    style={{ borderColor: 'var(--border-default)', borderLeftColor: 'var(--info)' }}
                  >
                    <h3 className="text-sm font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                      <span>📊</span>
                      <span>Calculation Examples</span>
                    </h3>
                    {tool.examples.map((example, idx) => (
                      <div key={idx} className="flex flex-col gap-2 text-xs">
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          Input: <span className="font-mono bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">{example.input}</span>
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          Output: <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{example.output}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Frequently Asked Questions */}
            {tool.faq && (
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {tool.faq.map((item, idx) => {
                    const isExpanded = expandedFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border rounded-xl overflow-hidden bg-slate-50/30 dark:bg-slate-900/5 transition-all duration-200"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-colors"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <span className="pr-4">{item.question}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-6 pt-4 text-sm leading-relaxed border-t" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </article>
        )}

        {/* Related Tools */}
        {tool.relatedTools && tool.relatedTools.length > 0 && (
          <div className="mt-16 pb-16">
            <RelatedTools toolIds={tool.relatedTools} />
          </div>
        )}
      </div>
    </>
  );
}
export default ToolPageWrapper;
