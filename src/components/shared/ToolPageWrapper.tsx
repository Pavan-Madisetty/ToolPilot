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
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {tool.name}
              </h1>
              <span className={`badge module-badge-${tool.module} capitalize text-xs font-semibold px-2.5 py-0.5 rounded-md`}>
                {tool.module}
              </span>
            </div>
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
                borderColor: favorited ? 'var(--danger)' : 'var(--border-default)',
                color: favorited ? 'var(--danger)' : 'var(--text-secondary)',
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
          <article className="mt-16 pt-12 border-t flex flex-col gap-16" style={{ borderColor: 'var(--border-default)' }}>
            
            {/* Long intro summary */}
            {tool.longDescription && (
              <section className="flex flex-col gap-4">
                <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
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
                    <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>
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
                    <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>
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
                <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                  How to Use {tool.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tool.howToSteps.map((step, idx) => {
                    const getStepIcon = (index: number) => {
                      switch (index) {
                        case 0:
                          return (
                            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          );
                        case 1:
                          return (
                            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                          );
                        case 2:
                          return (
                            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          );
                        default:
                          return (
                            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          );
                      }
                    };

                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className="relative border rounded-xl p-4 flex items-center gap-4 bg-white dark:bg-slate-900/40 shadow-sm flex-1"
                          style={{ borderColor: 'var(--border-default)' }}
                        >
                          {/* Icon with overlapping step number */}
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                              {getStepIcon(idx)}
                            </div>
                            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold flex items-center justify-center border border-white dark:border-slate-900">
                              {idx + 1}
                            </span>
                          </div>
                          
                          {/* Texts */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                              {step.name}
                            </h4>
                            <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                              {step.text}
                            </p>
                          </div>
                        </div>

                        {/* Dashed Line / Arrow separator if not last */}
                        {idx < (tool.howToSteps?.length ?? 0) - 1 && (
                          <div className="hidden lg:flex items-center text-slate-300 dark:text-slate-700 select-none px-0.5 shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Tips & Examples Callouts */}
            {(tool.tips || tool.examples) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.tips && (
                  <div
                    className="rounded-2xl p-6 flex flex-col gap-4"
                    style={{
                      background: 'rgba(251, 191, 36, 0.06)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                        <span className="text-xl">💡</span>
                      </div>
                      <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>
                        Pro Tips
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-1">
                      {tool.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tool.examples && (
                  <div
                    className="rounded-2xl p-6 flex flex-col gap-4"
                    style={{
                      background: 'rgba(99, 102, 241, 0.04)',
                      border: '1px solid rgba(99, 102, 241, 0.15)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>
                        Calculation Examples
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 pl-1">
                      {tool.examples.map((example, idx) => (
                        <div key={idx} className="flex flex-col gap-2 text-sm">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>Input:</span>
                            <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md" style={{ color: 'var(--text-primary)' }}>{example.input}</code>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>Output:</span>
                            <code className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-md">{example.output}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Frequently Asked Questions */}
            {tool.faq && (
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0"
                    style={{ background: '#6366F1', color: '#fff' }}
                    aria-hidden="true"
                  >
                    ?
                  </span>
                  <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                    Frequently Asked Questions
                  </h2>
                </div>
                <div
                  className="rounded-xl border overflow-hidden divide-y"
                  style={{ borderColor: 'var(--border-default)', '--tw-divide-opacity': '1' } as React.CSSProperties}
                >
                  {tool.faq.map((item, idx) => {
                    const isExpanded = expandedFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="transition-colors duration-150"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <span className="pr-4">{item.question}</span>
                          <ChevronDownIcon
                            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                        </button>
                        {isExpanded && (
                          <div
                            className="px-5 pb-5 pt-1 text-sm leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                          >
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
          <div className="mt-12 pb-16">
            <RelatedTools toolIds={tool.relatedTools} />
          </div>
        )}
      </div>
    </>
  );
}
export default ToolPageWrapper;
