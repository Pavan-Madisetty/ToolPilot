import type { ToolConfig } from '@/types';

export const SITE_URL = 'https://toolskyt.com';
export const SITE_NAME = 'Toolskyt';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Keep <title> within ~60 chars so Google doesn't truncate it: drop the brand suffix when needed. */
export function fitTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  const stripped = title.replace(/\s*[|–—-]\s*Toolskyt$/i, '');
  return stripped;
}

/** Canonical URL for a module page (always with a trailing slash, matching how GitHub Pages serves it). */
export function moduleUrl(slug: string): string {
  return `${SITE_URL}${slug.replace(/\/?$/, '/')}`;
}

export function toolUrl(slug: string): string {
  return `${SITE_URL}${slug}`;
}

export function moduleTitle(name: string): string {
  const label = name.replace(/ Tools$/, '');
  return /s$/.test(label)
    ? `Free Online ${label} — Fast & Private | Toolskyt`
    : `Free ${label} Tools Online — Fast & Private | Toolskyt`;
}

type Faq = { question: string; answer: string };
type Step = { name: string; text: string };

export function webAppSchema(tool: Pick<ToolConfig, 'name' | 'description' | 'slug'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: toolUrl(tool.slug),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any (runs in the browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    isAccessibleForFree: true,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(faq: Faq[] | undefined) {
  if (!faq?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function howToSchema(name: string, description: string, steps: Step[] | undefined) {
  if (!steps?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${name}`,
    description,
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
  };
}

export function collectionSchema(opts: {
  name: string;
  description: string;
  url: string;
  tools: { name: string; slug: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.tools.length,
      itemListElement: opts.tools.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: toolUrl(t.slug),
      })),
    },
  };
}

export const ALL_TOOLS_TITLE = 'All Free Online Tools — Complete A–Z Directory | Toolskyt';
export function allToolsDescription(count: number) {
  return `Browse all ${count} free online tools on Toolskyt: calculators, PDF and image tools, JSON formatter, converters and more. No sign-up, everything runs in your browser.`;
}

