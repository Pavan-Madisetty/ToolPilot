import { ReactNode, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from './RelatedTools';
import { AdRenderer } from './AdRenderer';
import { TOOL_BY_ID, isComingSoon } from '@/config/tools';
import { useHistoryStore, useFavoritesStore } from '@/stores/userStore';
import { Heart, Share2, FileText, Sliders, Eye, Download } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { clsx } from 'clsx';
import { useUIStore } from '@/stores/uiStore';
import { SEO_CONTENTS } from '@/config/seoContents';
import { getFallbackSEOContent } from '@/utils/seoGenerator';
import { MODULE_MAP } from '@/config/modules';

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

  useEffect(() => {
    if (tool) {
      recordVisit(tool.id);
    }
  }, [tool, recordVisit]);

  if (!tool) {
    return (
      <div className="container-app py-16 text-center">
        <h2 className="text-2xl font-bold text-text-primary">
          Tool Not Found
        </h2>
        <p className="mt-2 text-text-secondary">
          The requested tool could not be loaded.
        </p>
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

  const moduleConfig = MODULE_MAP[tool.module as keyof typeof MODULE_MAP];
  const moduleName = moduleConfig ? moduleConfig.name : tool.module.charAt(0).toUpperCase() + tool.module.slice(1);
  const moduleSlug = moduleConfig ? moduleConfig.slug : `/${tool.module}`;

  const breadcrumbItems = [
    { label: moduleName, href: moduleSlug },
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
    url: `https://toolskyt.com${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolskyt.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: moduleName,
        item: `https://toolskyt.com${moduleSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://toolskyt.com${tool.slug}`,
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
        <link rel="canonical" href={`https://toolskyt.com${tool.slug}`} />

        {/* Robots — placeholder tools stay out of the index until shipped */}
        <meta name="robots" content={isComingSoon(tool.id) ? 'noindex, follow' : 'index, follow'} />

        {/* Open Graph */}
        <meta property="og:title" content={tool.metaTitle} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolskyt.com${tool.slug}`} />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={tool.metaTitle} />
        <meta name="twitter:description" content={tool.metaDescription} />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />

        {/* Structured Data Scripts */}
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
      </Helmet>

      <div className="container-module py-8 font-sans text-left">
        <Breadcrumb items={breadcrumbItems} />

        {/* Tool Header */}
        <header className="mb-10 mt-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {tool.name}
                </h1>
                <span className="tool-header-badge">
                  {tool.module}
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center font-sans">
              <button
                onClick={() => toggleFavorite(tool.id)}
                className={clsx(
                  'btn-favorite',
                  favorited && 'is-active',
                  'px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5'
                )}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={16}
                  strokeWidth={2.5}
                  className={clsx({ 'fill-current text-danger': favorited })}
                />
                <span>{favorited ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                onClick={handleShare}
                className="btn-share px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 shadow-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
                aria-label="Share tool"
              >
                <Share2 size={16} strokeWidth={2.5} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Tool Application sandbox */}
        <div className="min-h-[400px]">{children}</div>

        {/* Rich SEO Content Explanatory Copy Section */}
        {(tool.longDescription || tool.benefits || tool.howToSteps || tool.faq) && (
          <article className="tool-about-article">
            {/* Long intro summary */}
            {tool.longDescription && (
              <section className="flex flex-col gap-4">
                <h2 className="text-h2 font-display text-text-primary">
                  About {tool.name}
                </h2>
                <p className="text-base leading-relaxed max-w-3xl text-text-secondary">
                  {tool.longDescription}
                </p>
              </section>
            )}

            {/* Benefits & Features Grid */}
            {(tool.benefits || tool.features) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tool.benefits && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-h3 font-display text-text-primary">
                      Key Benefits
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {tool.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                        >
                          <span className="text-success font-bold shrink-0">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.features && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-h3 font-display text-text-primary">
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {tool.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                        >
                          <span className="text-primary font-bold shrink-0">✓</span>
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
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-slate-100">
                  How to Use {tool.name}
                </h2>
                <div className="step-cards-grid">
                  {tool.howToSteps.map((step, idx) => {
                    const getStepIcon = (index: number) => {
                      switch (index) {
                        case 0:
                          return <FileText size={20} strokeWidth={2.5} />;
                        case 1:
                          return <Sliders size={20} strokeWidth={2.5} />;
                        case 2:
                          return <Eye size={20} strokeWidth={2.5} />;
                        default:
                          return <Download size={20} strokeWidth={2.5} />;
                      }
                    };

                    return (
                      <div key={idx} className="step-card-item">
                        {/* Icon with overlapping step number */}
                        <div className="step-icon-container">
                          {getStepIcon(idx)}
                          <span className="step-number-badge">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Texts */}
                        <div className="step-text-content">
                          <h4 className="step-title">
                            {step.name}
                          </h4>
                          <p className="step-description">
                            {step.text}
                          </p>
                        </div>
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
                  <div className="callout-card callout-card-tips">
                    <div className="callout-header">
                      <div className="callout-icon-wrapper callout-card-tips-icon">
                        <span className="text-sm">💡</span>
                      </div>
                      <h3 className="callout-title">
                        Pro Tips
                      </h3>
                    </div>
                    <ul className="callout-list">
                      {tool.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="callout-list-item"
                        >
                          <span className="callout-check-icon">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tool.examples && (
                  <div className="callout-card callout-card-examples">
                    <div className="callout-header">
                      <div className="callout-icon-wrapper callout-card-examples-icon">
                        <svg
                          className="w-4 h-4 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="callout-title">
                        Calculation Examples
                      </h3>
                    </div>
                    <div className="example-item">
                      {tool.examples.map((example, idx) => (
                        <div key={idx} className="example-item">
                          <div className="example-row">
                            <span className="example-label">
                              Input:
                            </span>
                            <code className="example-code">
                              {example.input}
                            </code>
                          </div>
                          <div className="example-row">
                            <span className="example-label">
                              Output:
                            </span>
                            <code className="example-code example-code-output">
                              {example.output}
                            </code>
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
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0 bg-primary text-text-inverse" aria-hidden="true">
                    ?
                  </span>
                  <h2 className="text-h2 font-display text-text-primary">
                    Frequently Asked Questions
                  </h2>
                </div>
                <Accordion
                  items={tool.faq.map((item) => ({
                    title: item.question,
                    content: item.answer,
                  }))}
                />
              </section>
            )}
          </article>
        )}

        {/* Dynamic Ad Slot */}
        <AdRenderer slotId="tools-sidebar-top" className="mt-12" />

        {/* Related Tools */}
        {tool.relatedTools && tool.relatedTools.length > 0 && (
          <RelatedTools toolIds={tool.relatedTools} />
        )}
      </div>
    </>
  );
}
export default ToolPageWrapper;
