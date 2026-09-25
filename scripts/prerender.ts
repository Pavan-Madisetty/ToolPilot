/* eslint-disable no-console */
/**
 * Build-time prerender. The app is a client-side SPA, so without this every URL would
 * serve the same empty shell to search engines. After `vite build` we write one static
 * HTML file per route with its own <title>, description, canonical, Open Graph tags,
 * JSON-LD and crawlable body copy + internal links. React replaces the body on load and
 * removes the [data-prerender] head tags (see src/main.tsx).
 *
 * GitHub Pages serves /foo from foo.html and /foo/ from foo/index.html.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { TOOLS, isComingSoon, LIVE_TOOL_COUNT } from '../src/config/tools';
import { MODULES } from '../src/config/modules';
import { MODULE_METADATA } from '../src/config/moduleMetadata';
import { SEO_CONTENTS } from '../src/config/seoContents';
import { getFallbackSEOContent } from '../src/utils/seoGenerator';
import {
  SITE_URL,
  OG_IMAGE,
  ALL_TOOLS_TITLE,
  allToolsDescription,
  fitTitle,
  moduleTitle,
  moduleUrl,
  toolUrl,
  webAppSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  collectionSchema,
} from '../src/utils/seo';

const DIST = resolve('dist');
const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

interface Page {
  file: string; // path inside dist
  title: string;
  description: string;
  canonical: string;
  robots: string;
  keywords?: string[];
  jsonLd: object[];
  body: string;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonScript = (o: object) =>
  `<script type="application/ld+json" data-prerender>${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`;
const stripColon = (s: string) => s;

function clip(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '') + '…';
}

const liveTools = TOOLS.filter((t) => !isComingSoon(t.id));
const moduleName = (key: string) => MODULES.find((m) => m.key === key)?.name ?? key;
const moduleSlug = (key: string) => MODULES.find((m) => m.key === key)?.slug ?? `/${key}`;

function siteNav(): string {
  return `<nav aria-label="Site">${link('/', 'Toolskyt')} · ${link('/all-tools', 'All tools')} · ${MODULES.map((m) =>
    link(m.slug + '/', m.name)
  ).join(' · ')}</nav>`;
}
function crumbs(items: { label: string; href?: string }[]): string {
  return `<nav aria-label="Breadcrumb">${[{ label: 'Home', href: '/' }, ...items]
    .map((i) => (i.href ? link(i.href, i.label) : esc(i.label)))
    .join(' › ')}</nav>`;
}
function wrap(inner: string): string {
  return `<div class="prerender" style="max-width:880px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6;color:#0f172a">${siteNav()}${inner}<footer><p>Toolskyt — free, private, browser-based tools. No sign-up. No uploads.</p></footer></div>`;
}

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Toolskyt',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/pwa-512x512.png`, width: 512, height: 512 },
  description: 'Fast, private, browser-based online tools and web utilities.',
};
const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Toolskyt',
  description: 'Free online tools for finance, developers, PDF, images, text and more. No sign-up, everything runs in your browser.',
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

// ────────────────────────── page builders ──────────────────────────
function homePage(): Page {
  const seo = JSON.parse(readFileSync(resolve('public/config/seo.json'), 'utf-8')).homepage;
  const popular = liveTools.filter((t) => t.isPopular || t.isFeatured).slice(0, 18);
  const body = wrap(`
<header><h1>Free online tools that run in your browser</h1>
<p>Toolskyt has ${LIVE_TOOL_COUNT} free tools — finance calculators, PDF and image tools, JSON formatter, converters, text utilities and more. No sign-up, no uploads, no tracking: everything runs on your device.</p></header>
<section><h2>Browse by category</h2><ul>${MODULES.map(
    (m) => `<li>${link(m.slug + '/', m.name)} — ${esc(m.description)}</li>`
  ).join('')}</ul></section>
<section><h2>Popular tools</h2><ul>${popular
    .map((t) => `<li>${link(t.slug, t.name)} — ${esc(t.description)}</li>`)
    .join('')}</ul><p>${link('/all-tools', `See all ${LIVE_TOOL_COUNT} tools`)}</p></section>`);
  return {
    file: 'index.html',
    title: seo.metaTitle,
    description: seo.metaDescription,
    canonical: `${SITE_URL}/`,
    robots: ROBOTS_INDEX,
    keywords: seo.keywords,
    jsonLd: [ORG, WEBSITE],
    body,
  };
}

function allToolsPage(): Page {
  const body = wrap(`${crumbs([{ label: 'All tools' }])}
<h1>All ${LIVE_TOOL_COUNT} free online tools</h1>
<p>Every Toolskyt tool grouped by category. All free, no sign-up, all run in your browser.</p>
${MODULES.map((m) => {
  const list = liveTools.filter((t) => t.module === m.key);
  if (!list.length) return '';
  return `<section><h2>${link(m.slug + '/', m.name)}</h2><ul>${list
    .map((t) => `<li>${link(t.slug, t.name)} — ${esc(t.description)}</li>`)
    .join('')}</ul></section>`;
}).join('')}`);
  return {
    file: 'all-tools.html',
    title: ALL_TOOLS_TITLE,
    description: allToolsDescription(LIVE_TOOL_COUNT),
    canonical: `${SITE_URL}/all-tools`,
    robots: ROBOTS_INDEX,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'All tools', url: `${SITE_URL}/all-tools` },
      ]),
      collectionSchema({
        name: 'All Toolskyt tools',
        description: allToolsDescription(LIVE_TOOL_COUNT),
        url: `${SITE_URL}/all-tools`,
        tools: liveTools,
      }),
    ],
    body,
  };
}

function modulePage(m: (typeof MODULES)[number]): Page {
  const tools = liveTools.filter((t) => t.module === m.key);
  const meta = MODULE_METADATA[m.key];
  const url = moduleUrl(m.slug);
  const description = clip(
    `${m.description.replace(/\.?$/, '.')} ${tools.length} free ${m.name.toLowerCase()} tools — no sign-up, private, runs in your browser.`,
    158
  );
  const body = wrap(`${crumbs([{ label: m.name }])}
<h1>${esc(m.name)} — free online tools</h1>
<p>${esc(m.description)}</p>
<section><h2>All ${esc(m.name)} tools (${tools.length})</h2><ul>${tools
    .map((t) => `<li>${link(t.slug, t.name)} — ${esc(t.description)}</li>`)
    .join('')}</ul></section>
${
  meta?.whyUse?.length
    ? `<section><h2>Why use Toolskyt ${esc(m.name)}</h2><ul>${meta.whyUse
        .map((w) => `<li><strong>${esc(w.title)}</strong> — ${esc(w.description)}</li>`)
        .join('')}</ul></section>`
    : ''
}
${
  meta?.faqs?.length
    ? `<section><h2>Frequently asked questions</h2>${meta.faqs
        .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
        .join('')}</section>`
    : ''
}`);
  return {
    file: `${m.slug.replace(/^\//, '')}/index.html`,
    title: moduleTitle(m.name),
    description,
    canonical: url,
    robots: ROBOTS_INDEX,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: m.name, url },
      ]),
      collectionSchema({ name: `${m.name} tools`, description, url, tools }),
      ...(faqSchema(meta?.faqs) ? [faqSchema(meta?.faqs) as object] : []),
    ],
    body,
  };
}

function toolPage(base: (typeof TOOLS)[number]): Page {
  const tool = { ...base, ...getFallbackSEOContent(base), ...(SEO_CONTENTS[base.id] || {}) };
  const url = toolUrl(tool.slug);
  const mName = moduleName(tool.module);
  const related = (tool.relatedTools || [])
    .map((id) => liveTools.find((t) => t.id === id))
    .filter((t): t is (typeof TOOLS)[number] => Boolean(t))
    .slice(0, 8);
  const sameModule = liveTools.filter((t) => t.module === tool.module && t.id !== tool.id).slice(0, 8);
  const more = related.length ? related : sameModule;
  const body = wrap(`${crumbs([{ label: mName, href: moduleSlug(tool.module) + '/' }, { label: tool.name }])}
<h1>${esc(tool.name)}</h1>
<p>${esc(tool.description)}</p>
${tool.longDescription ? `<p>${esc(tool.longDescription)}</p>` : ''}
${
  tool.howToSteps?.length
    ? `<section><h2>How to use ${esc(tool.name)}</h2><ol>${tool.howToSteps
        .map((s) => `<li><strong>${esc(s.name)}.</strong> ${esc(s.text)}</li>`)
        .join('')}</ol></section>`
    : ''
}
${
  tool.features?.length
    ? `<section><h2>Features</h2><ul>${tool.features.map((f) => `<li>${esc(stripColon(f))}</li>`).join('')}</ul></section>`
    : ''
}
${
  tool.benefits?.length
    ? `<section><h2>Why use this tool</h2><ul>${tool.benefits.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>`
    : ''
}
${
  tool.faq?.length
    ? `<section><h2>Frequently asked questions</h2>${tool.faq
        .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
        .join('')}</section>`
    : ''
}
${
  more.length
    ? `<section><h2>Related tools</h2><ul>${more
        .map((t) => `<li>${link(t.slug, t.name)} — ${esc(t.description)}</li>`)
        .join('')}</ul></section>`
    : ''
}`);
  const faq = faqSchema(tool.faq);
  const howTo = howToSchema(tool.name, tool.description, tool.howToSteps);
  return {
    file: `${tool.slug.replace(/^\//, '')}.html`,
    title: fitTitle(tool.metaTitle),
    description: clip(tool.metaDescription, 160),
    canonical: url,
    robots: isComingSoon(tool.id) ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    keywords: tool.keywords,
    jsonLd: [
      webAppSchema(tool),
      breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: mName, url: moduleUrl(moduleSlug(tool.module)) },
        { name: tool.name, url },
      ]),
      ...(faq ? [faq] : []),
      ...(howTo ? [howTo] : []),
    ],
    body,
  };
}

function staticPage(
  slug: string,
  title: string,
  description: string,
  h1: string,
  lead: string,
  extra = ''
): Page {
  const url = `${SITE_URL}/${slug}`;
  return {
    file: `${slug}.html`,
    title,
    description,
    canonical: url,
    robots: ROBOTS_INDEX,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: h1, url },
      ]),
    ],
    body: wrap(`${crumbs([{ label: h1 }])}<h1>${esc(h1)}</h1><p>${esc(lead)}</p>${extra}`),
  };
}

function utilityPage(file: string, title: string, robots: string, canonical: string, h1: string, lead: string): Page {
  return {
    file,
    title,
    description: lead,
    canonical,
    robots,
    jsonLd: [],
    body: wrap(`<h1>${esc(h1)}</h1><p>${esc(lead)}</p><p>${link('/', 'Go to the Toolskyt home page')} or ${link('/all-tools', 'browse all tools')}.</p>`),
  };
}

// ────────────────────────── rendering ──────────────────────────
function render(template: string, p: Page, noCanonical = false): string {
  const t = esc(p.title);
  const d = esc(p.description);
  const tags = [
    `<meta name="description" content="${d}" data-prerender>`,
    ...(p.keywords?.length ? [`<meta name="keywords" content="${esc(p.keywords.join(', '))}" data-prerender>`] : []),
    `<meta name="robots" content="${p.robots}" data-prerender>`,
    ...(noCanonical ? [] : [`<link rel="canonical" href="${p.canonical}" data-prerender>`]),
    `<meta property="og:type" content="website" data-prerender>`,
    `<meta property="og:site_name" content="Toolskyt" data-prerender>`,
    `<meta property="og:locale" content="en_US" data-prerender>`,
    `<meta property="og:title" content="${t}" data-prerender>`,
    `<meta property="og:description" content="${d}" data-prerender>`,
    `<meta property="og:url" content="${p.canonical}" data-prerender>`,
    `<meta property="og:image" content="${OG_IMAGE}" data-prerender>`,
    `<meta property="og:image:width" content="1200" data-prerender>`,
    `<meta property="og:image:height" content="630" data-prerender>`,
    `<meta property="og:image:alt" content="Toolskyt — free online tools that run in your browser" data-prerender>`,
    `<meta name="twitter:card" content="summary_large_image" data-prerender>`,
    `<meta name="twitter:title" content="${t}" data-prerender>`,
    `<meta name="twitter:description" content="${d}" data-prerender>`,
    `<meta name="twitter:image" content="${OG_IMAGE}" data-prerender>`,
    ...p.jsonLd.map(jsonScript),
  ].join('\n    ');
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace('<!--SEO_HEAD-->', tags);
  html = html.replace('<div id="root"></div>', `<div id="root">${p.body}</div>`);
  if (!html.includes(p.canonical) && !noCanonical) throw new Error(`prerender failed for ${p.file}`);
  return html;
}

function write(rel: string, content: string) {
  const out = resolve(DIST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content, 'utf-8');
}

function main() {
  const tplPath = resolve(DIST, 'index.html');
  if (!existsSync(tplPath)) throw new Error('dist/index.html not found — run vite build first');
  const template = readFileSync(tplPath, 'utf-8');
  if (!template.includes('<!--SEO_HEAD-->') || !template.includes('<div id="root"></div>'))
    throw new Error('index.html template markers missing (already prerendered?)');

  const pages: Page[] = [
    homePage(),
    allToolsPage(),
    staticPage(
      'about',
      'About Toolskyt — Private, Browser-Based Tools | Toolskyt',
      'Learn about Toolskyt, a private, offline-first toolbox of free browser tools for finance, developers, PDF, images and text.',
      'About Toolskyt',
      `Toolskyt is a collection of ${LIVE_TOOL_COUNT} free tools across ${MODULES.length} categories that all run inside your browser.`
    ),
    staticPage(
      'blog',
      'Toolskyt Blog — Guides & Updates | Toolskyt',
      'Guides, release notes and tutorials from the Toolskyt team on free, client-side online tools.',
      'Blog',
      'Guides, release notes and tutorials on client-side tools.'
    ),
    staticPage(
      'privacy',
      'Privacy Policy | Toolskyt',
      'Toolskyt is a client-side platform: your files and inputs are processed in your browser and never sent to our servers.',
      'Privacy Policy',
      'The short version: your files and inputs stay in your browser.'
    ),
    staticPage(
      'terms',
      'Terms of Service | Toolskyt',
      'Plain-language terms of service for using the free Toolskyt online tools.',
      'Terms of Service',
      'Plain-language terms for using Toolskyt.'
    ),
    staticPage(
      'contact',
      'Contact & Support | Toolskyt',
      'Contact the Toolskyt team with suggestions for new tools, bug reports or questions.',
      'Contact & support',
      "Have a suggestion for a new tool, or found a bug? We'd love to hear from you."
    ),
    ...MODULES.map(modulePage),
    ...TOOLS.map(toolPage),
  ];

  for (const p of pages) write(p.file, render(template, p));

  write(
    'search.html',
    render(
      template,
      utilityPage(
        'search.html',
        'Search Tools | Toolskyt',
        ROBOTS_NOINDEX,
        `${SITE_URL}/search`,
        'Search tools',
        'Search all Toolskyt tools by name or task.'
      )
    )
  );
  write(
    '404.html',
    render(
      template,
      utilityPage(
        '404.html',
        'Page not found | Toolskyt',
        'noindex, nofollow',
        `${SITE_URL}/`,
        'Page not found',
        'The page you are looking for does not exist or has moved.'
      ),
      true
    )
  );

  console.log(`Prerendered ${pages.length + 2} pages into dist/`);
}

main();
